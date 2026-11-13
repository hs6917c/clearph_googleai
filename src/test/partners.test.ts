import { describe, expect, it } from "vitest";
import { PREMIUM_PARTNERS, getMatchingPartners, type PremiumPartner } from "@/data/partners";

describe("Premium Partners (프리미엄 파트너 / 스폰서십 광고 시스템)", () => {
  it("defaults to disabled when no active contracts exist", () => {
    const matched = getMatchingPartners({ problemCode: "H001" });
    expect(matched).toHaveLength(0);
  });

  it("supports forcePreview query flag for admin/internal review", () => {
    const matched = getMatchingPartners({
      problemCode: "H001",
      sectorIds: ["housing"],
      forcePreview: true,
    });
    expect(matched.length).toBeGreaterThan(0);
    const partner = matched[0];
    if (!partner) throw new Error("Expected matching partner");
    expect(partner.name).toBe("로톡 전세피해 전담센터");
    expect(partner.tag).toBe("Sponsored");
    expect(partner.targetProblemCodes).toContain("H001");
  });

  it("does NOT bleed into unrelated problems within the same sector when targetProblemCodes is specified", () => {
    // C004(헬스장 위약금) 파트너는 consumer 분야에 속해 있더라도 C002(배송 지연)나 C001(쇼핑몰 환불)에 절대 노출되면 안 됨
    const c002Matches = getMatchingPartners({
      problemCode: "C002",
      sectorIds: ["consumer"],
      forcePreview: true,
    });
    expect(c002Matches.some((p) => p.id === "partner-fitness-dispute")).toBe(false);

    const c001Matches = getMatchingPartners({
      problemCode: "C001",
      sectorIds: ["consumer"],
      forcePreview: true,
    });
    expect(c001Matches.some((p) => p.id === "partner-fitness-dispute")).toBe(false);

    // 반대로 C004에서는 정상 매칭되어야 함
    const c004Matches = getMatchingPartners({
      problemCode: "C004",
      sectorIds: ["consumer"],
      forcePreview: true,
    });
    expect(c004Matches.some((p) => p.id === "partner-fitness-dispute")).toBe(true);
  });

  it("isolates targeted previewPartnerId so other disabled partners stay hidden", () => {
    const customList: PremiumPartner[] = [
      {
        id: "partner-a",
        name: "파트너 A",
        tag: "Sponsored",
        enabled: false,
        title: "A",
        description: "A",
        ctaText: "이동",
        linkUrl: "https://example.com",
        targetProblemCodes: ["H001"],
      },
      {
        id: "partner-b",
        name: "파트너 B",
        tag: "Brand",
        enabled: false,
        title: "B",
        description: "B",
        ctaText: "이동",
        linkUrl: "https://example.com",
        targetProblemCodes: ["H001"],
      },
    ];

    const matched = getMatchingPartners(customList, {
      problemCode: "H001",
      previewPartnerId: "partner-a",
    });
    expect(matched.map((p) => p.id)).toEqual(["partner-a"]);
  });

  it("matches by targetSectors only when targetProblemCodes is empty", () => {
    const sectorWidePartner: PremiumPartner = {
      id: "sector-wide",
      name: "소비자 분야 전체 파트너",
      tag: "Brand",
      enabled: true,
      title: "소비자 분쟁",
      description: "설명",
      ctaText: "이동",
      linkUrl: "https://example.com",
      targetSectors: ["consumer"],
    };

    const matched = getMatchingPartners([sectorWidePartner], {
      problemCode: "C002",
      sectorIds: ["consumer"],
    });
    expect(matched.map((p) => p.id)).toEqual(["sector-wide"]);
  });

  it("filters out unrelated problem codes strictly", () => {
    const matched = getMatchingPartners({
      problemCode: "G001",
      sectorIds: ["game"],
      forcePreview: true,
    });
    const hasTaxPartner = matched.some((p) => p.id === "partner-tax-refund");
    expect(hasTaxPartner).toBe(false);
  });

  it("respects startDate and endDate expiration windows", () => {
    const expiredPartner: PremiumPartner = {
      id: "expired-test",
      name: "만료된 파트너",
      tag: "Sponsored",
      enabled: true,
      title: "만료된 광고",
      description: "노출되지 않아야 합니다.",
      ctaText: "바로가기",
      linkUrl: "https://example.com",
      targetProblemCodes: ["TEST01"],
      startDate: "2020-01-01",
      endDate: "2020-12-31",
    };

    const matched = getMatchingPartners([expiredPartner], { problemCode: "TEST01" });
    expect(matched).toHaveLength(0);
  });

  it("validates all registered partners have required compliance fields and valid tags", () => {
    const allowedTags = ["Sponsored", "프리미엄", "Brand", "공식 파트너", "제휴 솔루션"];
    for (const p of PREMIUM_PARTNERS) {
      expect(allowedTags).toContain(p.tag);
      expect(p.name.length).toBeGreaterThan(0);
      expect(p.title.length).toBeGreaterThan(0);
      expect(p.ctaText.length).toBeGreaterThan(0);
      expect(p.linkUrl.startsWith("http")).toBe(true);
      expect(p.enabled).toBe(false);
    }
  });
});
