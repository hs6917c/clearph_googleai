/**
 * 해결경로 프리미엄 파트너 / 스폰서십 데이터 모듈
 *
 * [광고 및 파트너 온/오프 관리 가이드]
 * 1. 각 파트너 항목의 `enabled: true/false`로 언제든 노출을 즉시 On/Off 할 수 있습니다.
 * 2. `startDate`와 `endDate`를 설정하면 광고 기간 만료 시 자동으로 비노출 처리됩니다.
 * 3. `targetProblemCodes`에 특정 문제 코드(예: ["H001", "H004"])를 지정하면 해당 문제에만 정밀 노출됩니다.
 *    (문제 코드가 지정된 경우 동일 분야의 다른 무관한 문제에는 노출되지 않습니다.)
 * 4. 브랜드명 뒤에 (Sponsored, 프리미엄, Brand) 등 공정위 규정에 맞는 태그를 자유롭게 지정할 수 있습니다.
 */

export type PartnerTag = "Sponsored" | "프리미엄" | "Brand" | "공식 파트너" | "제휴 솔루션";

export interface PremiumPartner {
  id: string;
  name: string; // 기업명 / 브랜드명 (예: "로톡 법률상담", "삼성전자 케어", "삼쩜삼 세무")
  tag: PartnerTag; // 브랜드명 뒤에 붙는 태그 (Sponsored, 프리미엄, Brand 등)
  enabled: boolean; // 활성화 여부 (현재 광고가 없는 경우 false로 가볍게 제어)
  title: string; // 광고/솔루션 헤드라인
  description: string; // 상세 설명 문구
  highlightPoints?: string[]; // 핵심 혜택 불릿 포인트 (선택사항)
  ctaText: string; // 버튼 문구 (예: "빠른 상담 신청", "공식 전담센터 이동")
  linkUrl: string; // 이동할 공식 링크
  // 타겟팅 조건 (해당 문제 유형에만 정확히 매칭)
  targetProblemCodes?: string[]; // 매칭할 문제 코드 (예: ["H001", "H004"])
  targetCategories?: string[]; // 매칭할 카테고리 ID
  targetSectors?: string[]; // 분야 분류 (문제 코드 미지정 시에만 분야 전체 매칭)
  // 광고 집행 기간 (선택사항: 기간 경과 시 자동 비활성화)
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  priority?: number; // 정렬 우선순위 (높을수록 먼저 노출)
}

/**
 * 등록된 파트너 / 광고 목록
 * 현재는 수주된 광고가 없으므로 모든 항목의 `enabled`가 false로 설정되어 있습니다.
 * 광고 집행 시 관리자 페이지(/admin) 또는 본 파일에서 `enabled: true`로 전환하면 즉시 반영됩니다.
 */
export const PREMIUM_PARTNERS: PremiumPartner[] = [
  {
    id: "partner-law-jeonse",
    name: "로톡 전세피해 전담센터",
    tag: "Sponsored",
    enabled: false, // 광고 수주 시 true로 전환
    title: "보증금 미반환·전세사기, 전문 변호사 15분 긴급 전화상담",
    description:
      "공공조정 대기시간이 길거나 내용증명·지급명령 등 신속한 법적 조치가 필요할 때, 전세사기·임대차 분쟁 전문 변호사에게 1:1로 해결 전략을 진단받으세요.",
    highlightPoints: [
      "내용증명 작성 및 임차권등기명령 절차 1:1 가이드",
      "보증금 반환 소송 착수 전 승소 가능성 및 실익 사전진단",
      "야간·주말 비대면 전화 상담 지원",
    ],
    ctaText: "전문 변호사 상담 신청",
    linkUrl: "https://www.lawtalk.co.kr",
    targetProblemCodes: ["H001", "H004"], // H001 전세보증금 미반환, H004 전세사기 피해
    targetSectors: ["housing"],
    priority: 10,
  },
  {
    id: "partner-tax-refund",
    name: "택스리펀드 세무센터",
    tag: "프리미엄",
    enabled: false,
    title: "종합소득세·연말정산 놓친 환급금 5개년 치 원스톱 경정청구",
    description:
      "복잡한 홈택스 세무 서식 작성 없이, 최근 5년간 과오납된 세금을 간편 인증 한 번으로 전문 세무사가 전액 검토하여 국세청 환급을 대행합니다.",
    highlightPoints: [
      "최근 5개년 세금 누락분 무료 진단",
      "환급 성공 시에만 수수료 발생하는 안심 후불제",
    ],
    ctaText: "예상 환급액 무료 조회",
    linkUrl: "https://www.hometax.go.kr",
    targetProblemCodes: ["T001", "T003"], // T001 종합소득세 환급, T003 지방세 환급
    targetSectors: ["tax"],
    priority: 10,
  },
  {
    id: "partner-labor-care",
    name: "노무법인 권익지원센터",
    tag: "공식 파트너",
    enabled: false,
    title: "임금체불·부당해고, 공인노무사 무료 초기 진단 및 진정 대행",
    description:
      "퇴직금·주휴수당 미지급이나 부당해고 구제신청 시, 노동청 진정서 및 대지급금 청구 절차를 전담 공인노무사와 함께 신속하게 준비할 수 있습니다.",
    highlightPoints: [
      "체불임금 산정 및 간이대지급금 수령 가능 여부 진단",
      "부당해고 구제신청(3개월 제척기간) 긴급 대응",
    ],
    ctaText: "공인노무사 상담 예약",
    linkUrl: "https://www.moel.go.kr",
    targetProblemCodes: ["L001", "L002"], // L001 임금체불, L002 부당해고
    targetSectors: ["labor"],
    priority: 10,
  },
  {
    id: "partner-fitness-dispute",
    name: "소비자안심 피트니스",
    tag: "Sponsored",
    enabled: false,
    title: "헬스장·PT 위약금 과다청구 분쟁 전담 협의 지원",
    description:
      "체육시설 표준약관보다 과도한 위약금을 청구받았을 때, 카드사 할부 철회 및 위약금 반환 공문을 전문 지원팀과 함께 발송하세요.",
    ctaText: "위약금 계산기 및 상담",
    linkUrl: "https://www.ccn.go.kr",
    targetProblemCodes: ["C004"], // C004 헬스장·PT 중도해지 위약금
    targetSectors: ["consumer"],
    priority: 10,
  },
];

export interface MatchPartnerOptions {
  problemCode?: string;
  category?: string;
  sectorIds?: string[];
  forcePreview?: boolean; // 모든 매칭 파트너 미리보기 허용 (?preview_partner=1)
  previewPartnerId?: string; // 특정 파트너 ID만 단독 미리보기 (?preview_partner=partner-id)
}

/**
 * 파트너가 현재 문제(코드/분야/카테고리)와 정확히 일치하는지 판정합니다.
 * - 특정 문제 코드(`targetProblemCodes`)가 지정된 경우 해당 코드에만 정밀 매칭합니다.
 * - `targetProblemCodes`가 비어 있는 경우에만 분야(`targetSectors`) 또는 카테고리(`targetCategories`) 전체 매칭을 적용합니다.
 */
export function isPartnerMatchingProblem(
  partner: PremiumPartner,
  {
    problemCode,
    category,
    sectorIds = [],
  }: Pick<MatchPartnerOptions, "problemCode" | "category" | "sectorIds">,
): boolean {
  const hasSpecificCodes =
    Array.isArray(partner.targetProblemCodes) && partner.targetProblemCodes.length > 0;

  if (hasSpecificCodes) {
    return Boolean(problemCode && partner.targetProblemCodes!.includes(problemCode));
  }

  if (
    partner.targetSectors &&
    partner.targetSectors.length > 0 &&
    partner.targetSectors.some((sec) => sectorIds.includes(sec))
  ) {
    return true;
  }

  if (
    partner.targetCategories &&
    partner.targetCategories.length > 0 &&
    category &&
    partner.targetCategories.includes(category)
  ) {
    return true;
  }

  return false;
}

/**
 * 현재 문제 상황과 일치하며, 광고 기간이 유효하고 활성화된 파트너 목록을 반환합니다.
 */
export function getMatchingPartners(
  partnersList: PremiumPartner[],
  options: MatchPartnerOptions,
): PremiumPartner[];
export function getMatchingPartners(options: MatchPartnerOptions): PremiumPartner[];
export function getMatchingPartners(
  arg1: PremiumPartner[] | MatchPartnerOptions,
  arg2?: MatchPartnerOptions,
): PremiumPartner[] {
  const partnersList = Array.isArray(arg1) ? arg1 : PREMIUM_PARTNERS;
  const {
    problemCode,
    category,
    sectorIds = [],
    forcePreview = false,
    previewPartnerId,
  } = Array.isArray(arg1) ? (arg2 ?? {}) : arg1;

  const today = new Date().toISOString().slice(0, 10);

  return partnersList
    .filter((partner) => {
      const isTargetedPreview = Boolean(previewPartnerId && partner.id === previewPartnerId);

      // 1. 활성화 여부 확인 (전체 미리보기 또는 해당 파트너 지정 미리보기 제외)
      if (!partner.enabled && !forcePreview && !isTargetedPreview) {
        return false;
      }

      // 2. 광고 집행 기간 확인 (지정 미리보기가 아닌 경우)
      if (!isTargetedPreview) {
        if (partner.startDate && partner.startDate > today) {
          return false;
        }
        if (partner.endDate && partner.endDate < today) {
          return false;
        }
      }

      // 3. 문제 유형 정밀 매칭 확인
      return isPartnerMatchingProblem(partner, {
        ...(problemCode !== undefined ? { problemCode } : {}),
        ...(category !== undefined ? { category } : {}),
        sectorIds,
      });
    })
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
}
