import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/integrations/supabase/types";

const ROOT_SECTORS: Tables<"sectors">[] = [
  {
    id: "game",
    name: "게임·디지털 콘텐츠",
    slug: "game",
    description: "게임 결제, 계정과 디지털 콘텐츠 이용 문제",
    icon: "gamepad",
    display_order: 1,
    parent_id: null,
    status: "published",
    created_at: "2026-11-01T00:00:00Z",
    updated_at: "2026-11-01T00:00:00Z",
  },
  {
    id: "consumer",
    name: "소비자·거래",
    slug: "consumer",
    description: "구매, 배송, 환불과 거래 피해",
    icon: "shopping",
    display_order: 2,
    parent_id: null,
    status: "published",
    created_at: "2026-11-01T00:00:00Z",
    updated_at: "2026-11-01T00:00:00Z",
  },
  {
    id: "finance",
    name: "금융·보험",
    slug: "finance",
    description: "금융상품, 보험과 금융 피해",
    icon: "landmark",
    display_order: 3,
    parent_id: null,
    status: "published",
    created_at: "2026-11-01T00:00:00Z",
    updated_at: "2026-11-01T00:00:00Z",
  },
  {
    id: "tax",
    name: "세금·재정",
    slug: "tax",
    description: "세금 신고, 납부와 환급",
    icon: "receipt",
    display_order: 4,
    parent_id: null,
    status: "published",
    created_at: "2026-11-01T00:00:00Z",
    updated_at: "2026-11-01T00:00:00Z",
  },
  {
    id: "housing",
    name: "주거·부동산",
    slug: "housing",
    description: "임대차, 보증금과 주거 문제",
    icon: "home",
    display_order: 5,
    parent_id: null,
    status: "published",
    created_at: "2026-11-01T00:00:00Z",
    updated_at: "2026-11-01T00:00:00Z",
  },
  {
    id: "labor",
    name: "노동·고용",
    slug: "labor",
    description: "임금, 근로조건과 고용지원",
    icon: "briefcase",
    display_order: 6,
    parent_id: null,
    status: "published",
    created_at: "2026-11-01T00:00:00Z",
    updated_at: "2026-11-01T00:00:00Z",
  },
  {
    id: "business",
    name: "사업·창업",
    slug: "business",
    description: "사업 시작, 인허가와 경영지원",
    icon: "store",
    display_order: 7,
    parent_id: null,
    status: "published",
    created_at: "2026-11-01T00:00:00Z",
    updated_at: "2026-11-01T00:00:00Z",
  },
  {
    id: "government",
    name: "행정·정부서비스",
    slug: "government",
    description: "행정절차, 증명서와 공공서비스",
    icon: "building",
    display_order: 8,
    parent_id: null,
    status: "published",
    created_at: "2026-11-01T00:00:00Z",
    updated_at: "2026-11-01T00:00:00Z",
  },
  {
    id: "legal",
    name: "법률·분쟁",
    slug: "legal",
    description: "권리구제, 상담과 분쟁 절차",
    icon: "scale",
    display_order: 9,
    parent_id: null,
    status: "published",
    created_at: "2026-11-01T00:00:00Z",
    updated_at: "2026-11-01T00:00:00Z",
  },
  {
    id: "education",
    name: "교육·자격",
    slug: "education",
    description: "교육, 장학금과 자격시험",
    icon: "graduation",
    display_order: 10,
    parent_id: null,
    status: "published",
    created_at: "2026-11-01T00:00:00Z",
    updated_at: "2026-11-01T00:00:00Z",
  },
  {
    id: "safety",
    name: "안전·환경·보건",
    slug: "safety",
    description: "생활안전, 환경과 보건 관련 문제",
    icon: "shield",
    display_order: 11,
    parent_id: null,
    status: "published",
    created_at: "2026-11-01T00:00:00Z",
    updated_at: "2026-11-01T00:00:00Z",
  },
  {
    id: "participation",
    name: "정책참여·사회제안",
    slug: "participation",
    description: "정책 개선과 사회참여",
    icon: "messages",
    display_order: 12,
    parent_id: null,
    status: "published",
    created_at: "2026-11-01T00:00:00Z",
    updated_at: "2026-11-01T00:00:00Z",
  },
];

const SUB_SECTORS_DEF: [string, string, string, number][] = [
  ["game-payment", "게임 결제 및 환불", "game", 1],
  ["game-account", "계정 정지 및 해킹", "game", 2],
  ["game-items", "게임 아이템 및 확률형 아이템", "game", 3],
  ["game-content", "디지털 콘텐츠 구매 및 이용 문제", "game", 4],
  ["game-platform", "플랫폼 서비스 분쟁", "game", 5],
  ["consumer-shopping", "온라인 쇼핑 및 배송", "consumer", 1],
  ["consumer-refund", "환불 및 교환", "consumer", 2],
  ["consumer-fraud", "중고거래 사기", "consumer", 3],
  ["consumer-contract", "계약 불이행", "consumer", 4],
  ["consumer-defect", "제품 하자 및 소비자 피해", "consumer", 5],
  ["finance-fraud", "금융사기 및 보이스피싱", "finance", 1],
  ["finance-insurance", "보험금 지급 및 보험 분쟁", "finance", 2],
  ["finance-loan", "대출 및 금융상품", "finance", 3],
  ["finance-complaint", "금융회사 민원", "finance", 4],
  ["finance-relief", "금융 관련 피해구제", "finance", 5],
  ["tax-income", "종합소득세", "tax", 1],
  ["tax-vat", "부가가치세", "tax", 2],
  ["tax-pay", "세금 신고 및 납부", "tax", 3],
  ["tax-refund", "세금 환급 및 과오납", "tax", 4],
  ["tax-process", "세무 관련 행정절차", "tax", 5],
  ["housing-deposit", "임대차 및 보증금", "housing", 1],
  ["housing-repair", "주택 하자 및 수리", "housing", 2],
  ["housing-contract", "부동산 계약", "housing", 3],
  ["housing-dispute", "전월세 분쟁", "housing", 4],
  ["housing-support", "주거 관련 지원제도", "housing", 5],
  ["labor-wage", "임금체불", "labor", 1],
  ["labor-contract", "근로계약 및 근로조건", "labor", 2],
  ["labor-dismissal", "해고 및 퇴직", "labor", 3],
  ["labor-accident", "산업재해", "labor", 4],
  ["labor-support", "실업급여 및 고용지원", "labor", 5],
  ["business-register", "사업자등록", "business", 1],
  ["business-permit", "인허가 및 신고", "business", 2],
  ["business-startup", "창업지원사업", "business", 3],
  ["business-subsidy", "정부지원금", "business", 4],
  ["business-management", "기업 운영 및 경영지원", "business", 5],
  ["government-complaint", "정부 민원", "government", 1],
  ["government-appeal", "행정처분 및 이의신청", "government", 2],
  ["government-certificate", "각종 증명서", "government", 3],
  ["government-service", "공공서비스 신청", "government", 4],
  ["government-welfare", "복지 및 행정지원", "government", 5],
  ["legal-process", "민사 및 형사 관련 절차", "legal", 1],
  ["legal-contract", "계약 분쟁", "legal", 2],
  ["legal-consult", "법률 상담", "legal", 3],
  ["legal-mediate", "분쟁조정", "legal", 4],
  ["legal-relief", "권리구제 절차", "legal", 5],
  ["education-dispute", "교육기관 관련 분쟁", "education", 1],
  ["education-scholarship", "학자금 및 장학금", "education", 2],
  ["education-exam", "국가자격시험", "education", 3],
  ["education-certificate", "자격증 발급 및 갱신", "education", 4],
  ["education-support", "교육지원제도", "education", 5],
  ["safety-report", "생활안전 신고", "safety", 1],
  ["safety-environment", "환경오염", "safety", 2],
  ["safety-facility", "시설물 위험", "safety", 3],
  ["safety-health", "공중보건 관련 신고", "safety", 4],
  ["safety-relief", "안전 관련 피해구제", "safety", 5],
  ["participation-petition", "국민신문고", "participation", 1],
  ["participation-policy", "정책 제안", "participation", 2],
  ["participation-assembly", "국회 입법 의견", "participation", 3],
  ["participation-hearing", "공청회 및 의견수렴", "participation", 4],
  ["participation-improve", "공공정책 개선 제안", "participation", 5],
];

const SUB_SECTORS: Tables<"sectors">[] = SUB_SECTORS_DEF.map(([id, name, parent_id, order]) => ({
  id,
  name,
  slug: id,
  description: "",
  icon: "folder",
  display_order: order,
  parent_id,
  status: "published",
  created_at: "2026-11-01T00:00:00Z",
  updated_at: "2026-11-01T00:00:00Z",
}));

const FALLBACK_SECTORS: Tables<"sectors">[] = [...ROOT_SECTORS, ...SUB_SECTORS];

const FALLBACK_LINKS: Tables<"problem_sectors">[] = [
  ...Array.from({ length: 20 }, (_, i) => ({
    problem_code: `G${String(i + 1).padStart(3, "0")}`,
    sector_id: "game",
  })),
  { problem_code: "G003", sector_id: "consumer" },
  { problem_code: "G004", sector_id: "consumer" },
  { problem_code: "G011", sector_id: "consumer" },
  { problem_code: "G012", sector_id: "consumer" },
  { problem_code: "G013", sector_id: "consumer" },
  { problem_code: "G014", sector_id: "consumer" },
  { problem_code: "G019", sector_id: "consumer" },
  { problem_code: "G020", sector_id: "consumer" },
];

export const getSectorCatalog = createServerFn({ method: "GET" }).handler(async () => {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) {
    return { sectors: FALLBACK_SECTORS, links: FALLBACK_LINKS };
  }
  try {
    const client = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`)
            headers.delete("Authorization");
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });
    const [sectors, links] = await Promise.all([
      client.from("sectors").select("*").order("display_order").range(0, 999),
      client.from("problem_sectors").select("problem_code, sector_id").range(0, 999),
    ]);
    if (sectors.error || links.error || !sectors.data || !links.data) {
      console.warn("[sectors] Error loading from Supabase, falling back to local catalog");
      return { sectors: FALLBACK_SECTORS, links: FALLBACK_LINKS };
    }
    return { sectors: sectors.data, links: links.data };
  } catch (err) {
    console.warn("[sectors] Exception connecting to Supabase, falling back to local catalog", err);
    return { sectors: FALLBACK_SECTORS, links: FALLBACK_LINKS };
  }
});
