import fs from "node:fs";
import path from "node:path";
import {
  PREMIUM_PARTNERS,
  getMatchingPartners,
  type PremiumPartner,
  type PartnerTag,
  type MatchPartnerOptions,
} from "@/data/partners";

/**
 * 해결경로 프리미엄 파트너 영구 데이터 저장소
 *
 * 서버 구동 환경에서 `data/partners-store.json`을 사용하여
 * 관리자가 등록, 수정, 삭제, On/Off 한 광고 데이터를 안전하게 보존합니다.
 * 파일이 없는 경우 기본 `PREMIUM_PARTNERS` 템플릿으로 자동 초기화됩니다.
 */

const DATA_DIR = path.resolve(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "partners-store.json");

let memoryCache: PremiumPartner[] | null = null;

function ensureDataDirectory(): void {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch (err) {
      console.error("[partners.storage] Failed to create data directory", err);
    }
  }
}

/**
 * 저장소에서 전체 파트너 목록 로드
 */
export function loadPartnersFromStore(): PremiumPartner[] {
  if (memoryCache) {
    return memoryCache.map((p) => ({ ...p }));
  }

  ensureDataDirectory();

  if (fs.existsSync(STORE_FILE)) {
    try {
      const raw = fs.readFileSync(STORE_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        memoryCache = parsed;
        return memoryCache.map((p) => ({ ...p }));
      }
    } catch (err) {
      console.error(
        "[partners.storage] Failed to parse partners-store.json, falling back to seed",
        err,
      );
    }
  }

  // 초기 파일 생성
  memoryCache = PREMIUM_PARTNERS.map((p) => ({ ...p }));
  persistPartnersToStore(memoryCache);
  return memoryCache.map((p) => ({ ...p }));
}

/**
 * 저장소에 파트너 목록 원자적 저장 (Atomic Write)
 */
export function persistPartnersToStore(partners: PremiumPartner[]): void {
  ensureDataDirectory();
  memoryCache = partners.map((p) => ({ ...p }));

  try {
    const tempFile = `${STORE_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(partners, null, 2), "utf-8");
    fs.renameSync(tempFile, STORE_FILE);
  } catch (err) {
    console.error("[partners.storage] Failed to persist partners to store file", err);
  }
}

/**
 * 안전한 HTTP/HTTPS URL 검증 (XSS, javascript:, data:, 인증정보 포함 URL 차단)
 */
function validateSafeHttpUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw new Error("유효한 링크 URL 형식이 아닙니다.");
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("보안을 위해 이동 링크는 http:// 또는 https:// 로 시작해야 합니다.");
  }
  if (parsed.username || parsed.password) {
    throw new Error("URL에 인증 정보를 포함할 수 없습니다.");
  }
  if (!parsed.hostname || parsed.hostname.length < 2) {
    throw new Error("유효한 도메인 주소를 입력해주세요.");
  }
  return trimmed.slice(0, 500);
}

/**
 * 보안 입력값 검증 및 위생 처리 (XSS 및 인젝션 방지)
 */
export function sanitizeAndValidatePartner(raw: Partial<PremiumPartner>): PremiumPartner {
  if (!raw.name || typeof raw.name !== "string" || !raw.name.trim()) {
    throw new Error("파트너(기업/브랜드)명은 필수 항목입니다.");
  }
  if (!raw.title || typeof raw.title !== "string" || !raw.title.trim()) {
    throw new Error("광고 헤드라인 제목은 필수 항목입니다.");
  }
  if (!raw.description || typeof raw.description !== "string" || !raw.description.trim()) {
    throw new Error("광고 상세 설명은 필수 항목입니다.");
  }
  if (!raw.ctaText || typeof raw.ctaText !== "string" || !raw.ctaText.trim()) {
    throw new Error("버튼 문구(CTA)는 필수 항목입니다.");
  }
  if (!raw.linkUrl || typeof raw.linkUrl !== "string" || !raw.linkUrl.trim()) {
    throw new Error("이동할 링크 URL은 필수 항목입니다.");
  }

  const safeUrl = validateSafeHttpUrl(raw.linkUrl);

  const allowedTags: PartnerTag[] = [
    "Sponsored",
    "프리미엄",
    "Brand",
    "공식 파트너",
    "제휴 솔루션",
  ];
  const tag = (allowedTags.includes(raw.tag as PartnerTag) ? raw.tag : "Sponsored") as PartnerTag;

  const highlights = Array.isArray(raw.highlightPoints)
    ? raw.highlightPoints.map((s) => String(s).trim()).filter((s) => s.length > 0)
    : [];

  const targetProblemCodes = Array.isArray(raw.targetProblemCodes)
    ? raw.targetProblemCodes
        .map((c) => String(c).trim().toUpperCase())
        .filter((c) => /^[A-Z][0-9]{3}$/.test(c))
    : [];

  const targetSectors = Array.isArray(raw.targetSectors)
    ? raw.targetSectors.map((s) => String(s).trim().toLowerCase()).filter((s) => s.length > 0)
    : [];

  const targetCategories = Array.isArray(raw.targetCategories)
    ? raw.targetCategories.map((c) => String(c).trim()).filter((c) => c.length > 0)
    : [];

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const startDate =
    raw.startDate && typeof raw.startDate === "string" && dateRegex.test(raw.startDate)
      ? raw.startDate
      : undefined;
  const endDate =
    raw.endDate && typeof raw.endDate === "string" && dateRegex.test(raw.endDate)
      ? raw.endDate
      : undefined;

  if (startDate && endDate && startDate > endDate) {
    throw new Error("광고 종료일은 시작일 이후여야 합니다.");
  }

  const cleanedRawId =
    raw.id && typeof raw.id === "string" ? raw.id.trim().replace(/[^a-zA-Z0-9_-]/g, "") : "";
  const id =
    cleanedRawId.length > 0
      ? cleanedRawId.slice(0, 80)
      : `partner-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  const sanitized: PremiumPartner = {
    id,
    name: raw.name.trim().slice(0, 100),
    tag,
    enabled: Boolean(raw.enabled),
    title: raw.title.trim().slice(0, 200),
    description: raw.description.trim().slice(0, 1000),
    highlightPoints: highlights.slice(0, 5),
    ctaText: raw.ctaText.trim().slice(0, 50),
    linkUrl: safeUrl,
    priority:
      typeof raw.priority === "number" && Number.isFinite(raw.priority)
        ? Math.max(0, Math.min(100, Math.round(raw.priority)))
        : 10,
    ...(targetProblemCodes.length > 0 ? { targetProblemCodes } : {}),
    ...(targetSectors.length > 0 ? { targetSectors } : {}),
    ...(targetCategories.length > 0 ? { targetCategories } : {}),
    ...(startDate ? { startDate } : {}),
    ...(endDate ? { endDate } : {}),
  };

  return sanitized;
}

/**
 * 파트너 등록 또는 업데이트
 */
export function upsertPartnerInStore(raw: Partial<PremiumPartner>): PremiumPartner {
  const sanitized = sanitizeAndValidatePartner(raw);
  const partners = loadPartnersFromStore();
  const existingIdx = partners.findIndex((p) => p.id === sanitized.id);

  if (existingIdx >= 0) {
    partners[existingIdx] = sanitized;
  } else {
    partners.unshift(sanitized);
  }

  partners.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
  persistPartnersToStore(partners);
  return sanitized;
}

/**
 * 파트너 On/Off 토글
 */
export function togglePartnerInStore(id: string, enabled: boolean): PremiumPartner {
  const partners = loadPartnersFromStore();
  const idx = partners.findIndex((p) => p.id === id);
  if (idx < 0) {
    throw new Error(`존재하지 않는 파트너 ID입니다: ${id}`);
  }

  const updated: PremiumPartner = {
    ...partners[idx]!,
    enabled: Boolean(enabled),
  };
  partners[idx] = updated;
  persistPartnersToStore(partners);
  return updated;
}

/**
 * 파트너 삭제
 */
export function deletePartnerFromStore(id: string): boolean {
  const partners = loadPartnersFromStore();
  const filtered = partners.filter((p) => p.id !== id);
  if (filtered.length === partners.length) {
    return false;
  }
  persistPartnersToStore(filtered);
  return true;
}

/**
 * 실시간 공개용 매칭 파트너 조회 (문제 상황과 일치하고 활성화된 파트너만 반환)
 */
export function getLiveMatchingPartners(options: MatchPartnerOptions): PremiumPartner[] {
  const partners = loadPartnersFromStore();
  return getMatchingPartners(partners, options);
}
