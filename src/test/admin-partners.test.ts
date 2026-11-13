import { describe, expect, it, beforeEach } from "vitest";
import {
  verifyAdminPasswordAndCreateToken,
  verifyAdminToken,
  resetFailedAttempts,
  recordFailedAttempt,
  checkRateLimit,
} from "@/lib/admin-auth.server";
import {
  loadPartnersFromStore,
  upsertPartnerInStore,
  togglePartnerInStore,
  deletePartnerFromStore,
  sanitizeAndValidatePartner,
  getLiveMatchingPartners,
} from "@/lib/partners.storage";

describe("Admin Authentication & Security (관리자 인증 및 보안)", () => {
  beforeEach(() => {
    resetFailedAttempts("test-client");
  });

  it("authenticates successfully with valid admin secret and generates HMAC token", () => {
    const res = verifyAdminPasswordAndCreateToken("clearphadmin2026", "test-client");
    expect(res.success).toBe(true);
    expect(res.token).toBeDefined();

    // Verify token
    const isValid = verifyAdminToken(res.token);
    expect(isValid).toBe(true);
  });

  it("rejects invalid password and increments failed attempts", () => {
    const res = verifyAdminPasswordAndCreateToken("wrong-password", "test-client");
    expect(res.success).toBe(false);
    expect(res.error).toContain("암호가 일치하지 않습니다");
    expect(res.token).toBeUndefined();
  });

  it("rejects tampered or forged tokens", () => {
    const validRes = verifyAdminPasswordAndCreateToken("clearphadmin2026", "test-client");
    expect(validRes.token).toBeDefined();

    // Tamper with signature
    const parts = validRes.token!.split(".");
    const tamperedToken = `${parts[0]}.${parts[1]}.tampered_signature_12345`;
    expect(verifyAdminToken(tamperedToken)).toBe(false);
    expect(verifyAdminToken("invalid-token-format")).toBe(false);
    expect(verifyAdminToken("12345.badnonce.badsig")).toBe(false);
    expect(verifyAdminToken(null)).toBe(false);
  });

  it("enforces rate limiting after 5 failed attempts", () => {
    for (let i = 0; i < 5; i++) {
      recordFailedAttempt("rate-test");
    }
    const check = checkRateLimit("rate-test");
    expect(check.allowed).toBe(false);
    expect(check.waitMinutes).toBeGreaterThan(0);

    const loginRes = verifyAdminPasswordAndCreateToken("clearphadmin2026", "rate-test");
    expect(loginRes.success).toBe(false);
    expect(loginRes.error).toContain("시도 횟수를 초과했습니다");
    resetFailedAttempts("rate-test");
  });
});

describe("Partner Storage & CRUD Validation (파트너 데이터 관리 및 위생 처리)", () => {
  it("rejects unsafe URLs like javascript: or embedded credentials (XSS/Phishing 방지)", () => {
    expect(() => {
      sanitizeAndValidatePartner({
        name: "악성 광고",
        title: "제목",
        description: "설명",
        ctaText: "클릭",
        linkUrl: "javascript:alert(document.cookie)",
      });
    }).toThrow("http:// 또는 https://");

    expect(() => {
      sanitizeAndValidatePartner({
        name: "피싱 광고",
        title: "제목",
        description: "설명",
        ctaText: "클릭",
        linkUrl: "https://user:pass@example.com",
      });
    }).toThrow("인증 정보");
  });

  it("rejects invalid date ranges where endDate precedes startDate", () => {
    expect(() => {
      sanitizeAndValidatePartner({
        name: "날짜 오류",
        title: "제목",
        description: "설명",
        ctaText: "클릭",
        linkUrl: "https://example.com",
        startDate: "2026-12-31",
        endDate: "2026-01-01",
      });
    }).toThrow("종료일");
  });

  it("sanitizes and defaults tag to Sponsored when invalid tag provided", () => {
    const input: Record<string, unknown> = {
      name: "테스트 파트너",
      title: "헤드라인 제목",
      description: "상세 설명",
      ctaText: "상담하기",
      linkUrl: "https://example.com/counsel",
      tag: "InvalidTag",
      id: "!!!",
    };
    const sanitized = sanitizeAndValidatePartner(
      input as Parameters<typeof sanitizeAndValidatePartner>[0],
    );
    expect(sanitized.tag).toBe("Sponsored");
    expect(sanitized.name).toBe("테스트 파트너");
    expect(sanitized.id.startsWith("partner-")).toBe(true);
  });

  it("supports live On/Off toggle switch via togglePartnerInStore", () => {
    const testId = `test-toggle-${Date.now()}`;
    upsertPartnerInStore({
      id: testId,
      name: "토글 테스트 기업",
      title: "토글 테스트 제목",
      description: "토글 테스트 설명",
      ctaText: "바로가기",
      linkUrl: "https://example.com",
      enabled: false,
      targetProblemCodes: ["H001"],
    });

    // Verify initial is OFF
    let live = getLiveMatchingPartners({ problemCode: "H001" });
    expect(live.some((p) => p.id === testId)).toBe(false);

    // Toggle to ON
    togglePartnerInStore(testId, true);
    live = getLiveMatchingPartners({ problemCode: "H001" });
    expect(live.some((p) => p.id === testId)).toBe(true);

    // Toggle back to OFF
    togglePartnerInStore(testId, false);
    live = getLiveMatchingPartners({ problemCode: "H001" });
    expect(live.some((p) => p.id === testId)).toBe(false);

    // Clean up
    deletePartnerFromStore(testId);
  });

  it("creates, updates, and deletes partner cleanly", () => {
    const testId = `test-crud-${Date.now()}`;
    const created = upsertPartnerInStore({
      id: testId,
      name: "신규 등록 파트너",
      title: "신규 등록 제목",
      description: "신규 등록 설명",
      ctaText: "상담",
      linkUrl: "https://example.com",
      enabled: true,
      priority: 50,
    });
    expect(created.id).toBe(testId);

    // Update
    const updated = upsertPartnerInStore({
      id: testId,
      name: "수정된 파트너명",
      title: "수정된 제목",
      description: "수정된 설명",
      ctaText: "상담",
      linkUrl: "https://example.com/updated",
      enabled: true,
      priority: 80,
    });
    expect(updated.name).toBe("수정된 파트너명");

    // Delete
    const deleted = deletePartnerFromStore(testId);
    expect(deleted).toBe(true);

    const all = loadPartnersFromStore();
    expect(all.some((p) => p.id === testId)).toBe(false);
  });
});
