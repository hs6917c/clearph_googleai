import { describe, expect, it } from "vitest";
import { problems, getProblem, buildInquiry, searchProblems } from "@/data/catalog";
import { codesForSector, type SectorCatalog } from "@/lib/sectors";

describe("legacy compatibility and sector connections", () => {
  it("preserves all 20 original problem codes", () => {
    const originalCodes = Array.from(
      { length: 20 },
      (_, i) => `G${String(i + 1).padStart(3, "0")}`,
    );
    expect(problems.slice(0, 20).map((p) => p.code)).toEqual(originalCodes);
    expect(originalCodes.every((code) => problems.some((p) => p.code === code))).toBe(true);
  });
  it("allows one problem in multiple sectors without duplicates", () => {
    const catalog = {
      sectors: [],
      links: [
        { sector_id: "game", problem_code: "G003" },
        { sector_id: "consumer", problem_code: "G003" },
        { sector_id: "game", problem_code: "G003" },
      ],
    } as SectorCatalog;
    expect(codesForSector(catalog, "game")).toEqual(["G003"]);
    expect(codesForSector(catalog, "consumer")).toEqual(["G003"]);
  });
  it("keeps search and user-entered inquiry details", () => {
    expect(searchProblems("영구정지").some((p) => p.code === "G005")).toBe(true);
    const problem = getProblem("G005");
    if (!problem) throw new Error("Missing original problem");
    const text = buildInquiry(problem, "고객센터 문의문", {
      game: "테스트 게임",
      date: "11월 9일",
      facts: "계정 정지 사유 미안내",
      request: "재검토 요청",
    });
    expect(text).toContain("테스트 게임");
    expect(text).toContain("계정 정지 사유 미안내");
    expect(text).toContain("재검토 요청");
  });

  it("ensures all 12 root sectors have registered problems", async () => {
    const { FALLBACK_SECTORS, FALLBACK_LINKS } = await import("@/lib/sectors.functions");
    const catalog = { sectors: FALLBACK_SECTORS, links: FALLBACK_LINKS };
    const rootSectors = catalog.sectors.filter((s) => !s.parent_id);
    expect(rootSectors).toHaveLength(12);
    for (const sector of rootSectors) {
      const codes = codesForSector(catalog, sector.id);
      expect(codes.length, `Sector ${sector.id} must have registered problems`).toBeGreaterThan(0);
    }
  });

  it("verifies all problems have valid step inquiry methods and contact orgs", () => {
    expect(problems.length).toBe(75);
    for (const p of problems) {
      expect(p.steps.length).toBeGreaterThanOrEqual(2);
      expect(p.primary.length).toBeGreaterThan(0);
      expect(p.steps.some((s) => s.method !== undefined)).toBe(true);
    }
  });
});
