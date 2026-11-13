import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import {
  loadPartnersFromStore,
  upsertPartnerInStore,
  togglePartnerInStore,
  deletePartnerFromStore,
  getLiveMatchingPartners,
} from "./partners.storage";
import { verifyAdminPasswordAndCreateToken, verifyAdminToken } from "./admin-auth.server";
import type { PremiumPartner } from "@/data/partners";

/**
 * 요청 헤더에서 클라이언트 식별 키 추출 (IP 기반 레이트 리밋용)
 */
function getClientRateLimitKey(): string {
  try {
    const req = getRequest();
    if (!req?.headers) return "global";
    const xff = req.headers.get("x-forwarded-for");
    if (xff) {
      const firstIp = xff.split(",")[0]?.trim();
      if (firstIp) return `ip:${firstIp}`;
    }
    const realIp = req.headers.get("x-real-ip")?.trim();
    if (realIp) return `ip:${realIp}`;
    return "global";
  } catch {
    return "global";
  }
}

/**
 * 공개용: 특정 문제에 매칭되는 활성 파트너 목록 조회
 */
export const getLivePublicPartnersFn = createServerFn({ method: "POST" })
  .validator(
    (d: {
      problemCode?: string;
      category?: string;
      sectorIds?: string[];
      forcePreview?: boolean;
      previewPartnerId?: string;
    }) => d,
  )
  .handler(async ({ data }) => {
    return getLiveMatchingPartners({
      ...(typeof data.problemCode === "string" ? { problemCode: data.problemCode } : {}),
      ...(typeof data.category === "string" ? { category: data.category } : {}),
      sectorIds: Array.isArray(data.sectorIds) ? data.sectorIds.map(String) : [],
      forcePreview: Boolean(data.forcePreview),
      ...(typeof data.previewPartnerId === "string" && data.previewPartnerId.trim()
        ? { previewPartnerId: data.previewPartnerId.trim() }
        : {}),
    });
  });

/**
 * 관리자 로그인: 마스터 암호 확인 후 서명된 24시간 세션 토큰 발급
 */
export const adminLoginFn = createServerFn({ method: "POST" })
  .validator((d: { password: string }) => d)
  .handler(async ({ data }) => {
    if (!data.password || typeof data.password !== "string") {
      return { success: false, error: "비밀번호를 입력해주세요." };
    }
    const clientKey = getClientRateLimitKey();
    return verifyAdminPasswordAndCreateToken(data.password, clientKey);
  });

/**
 * 관리자 세션 유효성 검증
 */
export const adminVerifySessionFn = createServerFn({ method: "POST" })
  .validator((d: { token: string }) => d)
  .handler(async ({ data }) => {
    const isValid = verifyAdminToken(data.token);
    return { valid: isValid };
  });

/**
 * 관리자용: 전체 파트너 목록 조회 (보안 토큰 필수)
 */
export const adminGetPartnersFn = createServerFn({ method: "POST" })
  .validator((d: { token: string }) => d)
  .handler(async ({ data }) => {
    if (!verifyAdminToken(data.token)) {
      throw new Error("접근 권한이 없습니다. 관리자 로그인이 필요합니다.");
    }
    return loadPartnersFromStore();
  });

/**
 * 관리자용: 파트너 On/Off 상태 즉시 토글 (보안 토큰 필수)
 */
export const adminTogglePartnerFn = createServerFn({ method: "POST" })
  .validator((d: { token: string; partnerId: string; enabled: boolean }) => d)
  .handler(async ({ data }) => {
    if (!verifyAdminToken(data.token)) {
      throw new Error("접근 권한이 없습니다. 관리자 로그인이 필요합니다.");
    }
    if (!data.partnerId || typeof data.partnerId !== "string") {
      throw new Error("유효하지 않은 파트너 ID입니다.");
    }
    return togglePartnerInStore(data.partnerId, Boolean(data.enabled));
  });

/**
 * 관리자용: 파트너 등록 및 수정 (보안 토큰 필수)
 */
export const adminSavePartnerFn = createServerFn({ method: "POST" })
  .validator((d: { token: string; partner: Partial<PremiumPartner> }) => d)
  .handler(async ({ data }) => {
    if (!verifyAdminToken(data.token)) {
      throw new Error("접근 권한이 없습니다. 관리자 로그인이 필요합니다.");
    }
    return upsertPartnerInStore(data.partner);
  });

/**
 * 관리자용: 파트너 삭제 (보안 토큰 필수)
 */
export const adminDeletePartnerFn = createServerFn({ method: "POST" })
  .validator((d: { token: string; partnerId: string }) => d)
  .handler(async ({ data }) => {
    if (!verifyAdminToken(data.token)) {
      throw new Error("접근 권한이 없습니다. 관리자 로그인이 필요합니다.");
    }
    if (!data.partnerId || typeof data.partnerId !== "string") {
      throw new Error("유효하지 않은 파트너 ID입니다.");
    }
    const success = deletePartnerFromStore(data.partnerId);
    return { success };
  });
