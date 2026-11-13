import crypto from "node:crypto";

/**
 * 해결경로 관리자 인증 및 세션 보안 모듈
 *
 * 1. 환경변수 ADMIN_SECRET을 통해 마스터 암호를 관리합니다.
 * 2. SHA-256 정규화 + crypto.timingSafeEqual로 타이밍 공격 및 길이 추론 공격을 방지합니다.
 * 3. 브루트포스(무차별 대입 공격) 방지를 위한 IP/클라이언트 기반 Rate Limiter를 적용합니다.
 * 4. 도메인 분리된 파생 키로 HMAC-SHA256 서명 토큰을 발급하고 유효시간(24시간)을 검증합니다.
 */

const DEFAULT_DEV_ADMIN_SECRET = "clearphadmin2026";
const SESSION_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24시간
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000; // 15분
const MAX_RATE_LIMIT_ENTRIES = 1000;

interface AttemptRecord {
  count: number;
  lastAttempt: number;
}
const failedAttempts = new Map<string, AttemptRecord>();

export function getAdminSecret(): string {
  const secret = process.env["ADMIN_SECRET"];
  if (secret && secret.trim().length > 0) {
    return secret.trim();
  }
  return DEFAULT_DEV_ADMIN_SECRET;
}

/**
 * 세션 토큰 서명용 파생 비밀키 (원본 암호 직접 재사용 방지)
 */
function getSigningKey(): Buffer {
  const secret = getAdminSecret();
  return crypto.createHmac("sha256", "clearph-admin-session-v1").update(secret, "utf8").digest();
}

/**
 * 고정 길이 SHA-256 해시 후 상수 시간 비교 (타이밍 공격 및 길이 노출 방지)
 */
function safeCompare(a: string, b: string): boolean {
  const hashA = crypto.createHash("sha256").update(a, "utf8").digest();
  const hashB = crypto.createHash("sha256").update(b, "utf8").digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

/**
 * 오래된 레이트 리밋 레코드 정리 (메모리 누수 방지)
 */
function pruneExpiredRateLimits(): void {
  if (failedAttempts.size < MAX_RATE_LIMIT_ENTRIES) return;
  const now = Date.now();
  for (const [key, record] of failedAttempts.entries()) {
    if (now - record.lastAttempt > LOCKOUT_WINDOW_MS) {
      failedAttempts.delete(key);
    }
  }
}

/**
 * 브루트포스 방지 검사
 */
export function checkRateLimit(clientKey = "global"): { allowed: boolean; waitMinutes?: number } {
  const record = failedAttempts.get(clientKey);
  if (!record) return { allowed: true };

  const now = Date.now();
  if (now - record.lastAttempt > LOCKOUT_WINDOW_MS) {
    failedAttempts.delete(clientKey);
    return { allowed: true };
  }

  if (record.count >= MAX_FAILED_ATTEMPTS) {
    const remainingMs = LOCKOUT_WINDOW_MS - (now - record.lastAttempt);
    return {
      allowed: false,
      waitMinutes: Math.max(1, Math.ceil(remainingMs / 60000)),
    };
  }

  return { allowed: true };
}

export function recordFailedAttempt(clientKey = "global"): void {
  pruneExpiredRateLimits();
  const now = Date.now();
  const existing = failedAttempts.get(clientKey);
  if (existing && now - existing.lastAttempt <= LOCKOUT_WINDOW_MS) {
    existing.count += 1;
    existing.lastAttempt = now;
    failedAttempts.set(clientKey, existing);
  } else {
    failedAttempts.set(clientKey, { count: 1, lastAttempt: now });
  }
}

export function resetFailedAttempts(clientKey = "global"): void {
  failedAttempts.delete(clientKey);
}

/**
 * 관리자 로그인 검증 및 서명된 세션 토큰 생성
 */
export function verifyAdminPasswordAndCreateToken(
  password: string,
  clientKey = "global",
): { success: boolean; token?: string; error?: string } {
  const rateLimit = checkRateLimit(clientKey);
  if (!rateLimit.allowed) {
    return {
      success: false,
      error: `로그인 시도 횟수를 초과했습니다. 보안을 위해 ${rateLimit.waitMinutes}분 후 다시 시도해주세요.`,
    };
  }

  const adminSecret = getAdminSecret();
  if (!safeCompare(password, adminSecret)) {
    recordFailedAttempt(clientKey);
    return {
      success: false,
      error: "관리자 인증 암호가 일치하지 않습니다.",
    };
  }

  resetFailedAttempts(clientKey);

  // HMAC-SHA256 기반 서명 토큰 발급: [issuedAtTimestamp].[randomNonce].[signature]
  const issuedAt = Date.now();
  const nonce = crypto.randomBytes(16).toString("hex");
  const payload = `${issuedAt}:${nonce}`;
  const signature = crypto.createHmac("sha256", getSigningKey()).update(payload).digest("hex");

  const token = `${issuedAt}.${nonce}.${signature}`;
  return { success: true, token };
}

/**
 * 세션 토큰 유효성 검증
 */
export function verifyAdminToken(token: string | null | undefined): boolean {
  if (!token || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [timestampStr, nonce, receivedSig] = parts;
  if (!timestampStr || !nonce || !receivedSig) return false;
  if (!/^\d+$/.test(timestampStr)) return false;
  if (!/^[0-9a-f]{32}$/i.test(nonce)) return false;
  if (!/^[0-9a-f]{64}$/i.test(receivedSig)) return false;

  const issuedAt = Number.parseInt(timestampStr, 10);
  if (!Number.isFinite(issuedAt)) return false;

  const now = Date.now();
  if (now < issuedAt || now - issuedAt > SESSION_EXPIRATION_MS) {
    return false;
  }

  const payload = `${issuedAt}:${nonce}`;
  const expectedSig = crypto.createHmac("sha256", getSigningKey()).update(payload).digest("hex");

  return safeCompare(receivedSig, expectedSig);
}
