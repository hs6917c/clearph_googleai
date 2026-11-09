export type Verification = "확인 완료" | "확인 필요" | "변경 의심" | "사용 중지";

export type InquiryMethod =
  | "전화문의"
  | "해당 사이트 문의"
  | "국민신문고 문의"
  | "방문문의"
  | "우편/내용증명"
  | "온라인 접수";

export interface Organization {
  id: string;
  name: string;
  category: string;
  scope: string;
  phone?: string;
  website: string;
  onlineUrl?: string;
  hours?: string;
  methods?: string[];
  limitations: string;
  sourceUrl: string;
  verifiedAt: string;
  status: Verification;
}

export interface Step {
  title: string;
  detail: string;
  orgId?: string;
  method?: InquiryMethod;
}

export interface Problem {
  code: string;
  title: string;
  category: CategoryId;
  summary: string;
  keywords: string[];
  cases: string[];
  checks: string[];
  primary: string[];
  secondary: string[];
  steps: Step[];
  documents: string[];
}

export type CategoryId = "contact" | "payment" | "account" | "probability" | "service" | "fraud";

export const categories: { id: CategoryId; label: string; desc: string }[] = [
  { id: "payment", label: "결제·환불", desc: "환불 거부, 미지급, 무단 결제" },
  { id: "account", label: "계정·이용제한", desc: "정지, 해킹, 아이템 회수" },
  { id: "probability", label: "확률형 아이템", desc: "확률 미표시·불일치·허위" },
  { id: "contact", label: "해외 게임사 연락", desc: "연락처, 국내대리인" },
  { id: "service", label: "서비스·개인정보", desc: "서비스 종료, 유출, 등급" },
  { id: "fraud", label: "불법·사기", desc: "사설 서버, 거래 사기" },
];

const CHECKED = "2026-11-08";

export const organizations: Organization[] = [
  // --- 공공기관 및 주요 상담센터 ---
  {
    id: "ccn",
    name: "소비자상담센터 1372",
    category: "공공서비스",
    scope: "전국 통합 소비자 피해 상담 및 한국소비자원 피해구제 연계",
    phone: "1372",
    website: "https://www.ccn.go.kr",
    onlineUrl: "https://www.ccn.go.kr",
    hours: "평일 09:00~18:00",
    methods: [
      "전화문의 (국번없이 1372)",
      "해당 사이트 온라인 상담 (ccn.go.kr)",
      "한국소비자원 피해구제 연계",
    ],
    limitations: "상담 및 피해구제 절차 안내 중심이며 사법상 강제 처분권은 없습니다.",
    sourceUrl: "https://www.ccn.go.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "kca",
    name: "한국소비자원",
    category: "공공기관",
    scope: "소비자 피해구제 신청 접수 및 소비자분쟁조정위원회 분쟁조정",
    phone: "043-880-5500",
    website: "https://www.kca.go.kr",
    onlineUrl: "https://www.kca.go.kr",
    hours: "평일 09:00~18:00 (1372 상담 연계)",
    methods: ["해당 사이트 온라인 피해구제 신청", "방문 접수 (본원/서울지원)", "우편 접수"],
    limitations:
      "사업자에게 결정을 강제할 수 없으나, 성립된 조정안은 재판상 화해와 동일한 효력을 갖습니다.",
    sourceUrl: "https://www.kca.go.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "fss",
    name: "금융감독원 (FSS) 금융민원센터",
    category: "공공기관",
    scope: "보이스피싱 계좌지급정지, 금융회사 분쟁조정, 불법사금융 피해신고, 보험금 지급 분쟁",
    phone: "1332",
    website: "https://www.fss.or.kr",
    onlineUrl: "https://fine.fss.or.kr",
    hours: "평일 09:00~18:00 (보이스피싱 신고는 24시간 0번 연결)",
    methods: [
      "전화문의 (국번없이 1332)",
      "해당 사이트 온라인 민원접수 (e-금융민원센터)",
      "금융민원센터 방문문의",
    ],
    limitations: "금융회사의 위법행위나 약관 분쟁을 조사하며, 형사 처벌이나 수사 권한은 없습니다.",
    sourceUrl: "https://www.fss.or.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "moel",
    name: "고용노동부 고객상담센터",
    category: "정부부처",
    scope: "임금체불 진정, 부당해고 상담, 근로계약 위반 감독, 고용지원제도 안내",
    phone: "1350",
    website: "https://www.moel.go.kr",
    onlineUrl: "https://minwon.moel.go.kr",
    hours: "평일 09:00~18:00",
    methods: [
      "전화문의 (국번없이 1350)",
      "해당 사이트 온라인 진정 (노동포털 민원마당)",
      "관할 지방고용노동청 방문문의",
    ],
    limitations:
      "민사상 강제집행 권한은 없으며 근로감독관 조사를 통해 시정지시 또는 검찰 송치를 진행합니다.",
    sourceUrl: "https://www.moel.go.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "comwel",
    name: "근로복지공단",
    category: "공공기관",
    scope: "산업재해 보상 신청(요양·휴업급여), 대지급금(체당금) 청구, 고용·산재보험 관리",
    phone: "1588-0075",
    website: "https://www.comwel.or.kr",
    onlineUrl: "https://total.comwel.or.kr",
    hours: "평일 09:00~18:00",
    methods: [
      "전화문의 (1588-0075)",
      "해당 사이트 온라인 접수 (고용·산재보험 토탈서비스)",
      "지사 방문접수",
    ],
    limitations:
      "산재 인정은 업무상 재해 인정 기준에 대한 질병판정위원회 또는 공단 심사를 거쳐 결정됩니다.",
    sourceUrl: "https://www.comwel.or.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "klac",
    name: "대한법률구조공단",
    category: "공공기관",
    scope: "무료 법률상담, 민사 지급명령·소송대리 지원, 형사변호 지원",
    phone: "132",
    website: "https://www.klac.or.kr",
    onlineUrl: "https://www.klac.or.kr",
    hours: "평일 09:00~18:00 (점심시간 12:00~13:00 제외)",
    methods: ["전화문의 (국번없이 132)", "해당 사이트 온라인 사전예약", "전국 지부 방문상담"],
    limitations: "소송대리는 기준 중위소득 등 자격요건(취약계층, 저소득자 등)에 따라 지원됩니다.",
    sourceUrl: "https://www.klac.or.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "hldcc",
    name: "주택임대차분쟁조정위원회",
    category: "공공기관",
    scope: "보증금 반환, 계약갱신요구권, 주택 하자 수리의무 등 임대차 계약 분쟁 조정",
    phone: "132",
    website: "https://www.hldcc.or.kr",
    onlineUrl: "https://www.hldcc.or.kr",
    hours: "평일 09:00~18:00 (대한법률구조공단 및 한국부동산원 지부 운영)",
    methods: [
      "전화문의 (국번없이 132)",
      "해당 사이트 온라인 조정신청 (hldcc.or.kr)",
      "지부 방문접수",
    ],
    limitations: "성립된 조정안은 재판상 화해와 동일한 집행력을 갖습니다.",
    sourceUrl: "https://www.hldcc.or.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "nts",
    name: "국세청 국세상담센터",
    category: "정부부처",
    scope: "종합소득세·부가가치세·연말정산 세법 상담, 과오납 세금 환급(경정청구), 홈택스 지원",
    phone: "126",
    website: "https://www.hometax.go.kr",
    onlineUrl: "https://www.hometax.go.kr",
    hours: "평일 09:00~18:00 (전자신고 및 탈세제보는 홈택스 24시간)",
    methods: [
      "전화문의 (국번없이 126)",
      "해당 사이트 온라인 접수 (홈택스 경정청구/탈세신고)",
      "세무서 민원실 방문문의",
    ],
    limitations:
      "전화 상담은 법적 효력이 있는 유권해석이 아니며 개별 과세처분 변경은 경정청구를 거쳐야 합니다.",
    sourceUrl: "https://www.nts.go.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "gov24",
    name: "정부24",
    category: "공공서비스",
    scope: "주민등록표 등·초본, 통신판매업 신고 등 행정서비스 온라인 즉시 발급 및 안내",
    phone: "1588-2188",
    website: "https://www.gov.kr",
    onlineUrl: "https://www.gov.kr",
    hours: "평일 09:00~18:00 (온라인 민원 신청·발급은 24시간)",
    methods: ["해당 사이트 온라인 신청 (gov.kr)", "정부24 모바일 앱 발급", "전화문의 (1588-2188)"],
    limitations: "시스템 발급 기술 안내를 지원하며, 개별 인허가 심사는 소관 지자체가 담당합니다.",
    sourceUrl: "https://www.gov.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "epeople",
    name: "국민신문고 (국민권익위원회)",
    category: "정부기관",
    scope: "정부 부처·지자체 고충민원 접수, 제도개선 국민제안, 온라인 행정심판 연계",
    phone: "110",
    website: "https://www.epeople.go.kr",
    onlineUrl: "https://www.epeople.go.kr",
    hours: "국민콜 110: 365일 24시간 연중무휴 (국민신문고 시스템 문의: 1600-8172)",
    methods: [
      "국민신문고 온라인 접수 (epeople.go.kr)",
      "전화문의 (국번없이 110)",
      "정부합동민원센터 방문접수",
    ],
    limitations:
      "재판 또는 수사 중인 사건 등 법정 배제 사유가 있는 민원은 처리가 제한될 수 있습니다.",
    sourceUrl: "https://www.epeople.go.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "mss1357",
    name: "중소기업·소상공인 통합콜센터 (1357)",
    category: "공공서비스",
    scope: "소상공인 정책자금 신청, 경영안정지원금, 창업지원 및 전통시장 육성 상담",
    phone: "1357",
    website: "https://www.sbiz.or.kr",
    onlineUrl: "https://ols.sbiz.or.kr",
    hours: "평일 09:00~18:00 (점심시간 12:00~13:00 제외)",
    methods: [
      "전화문의 (국번없이 1357)",
      "해당 사이트 온라인 신청 (소상공인정책자금 포털)",
      "지역신용보증재단 방문문의",
    ],
    limitations:
      "자격 요건 상담 및 절차 안내 중심이며, 대출 보증 심사는 지역신용보증재단 등이 수행합니다.",
    sourceUrl: "https://www.mss.go.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "safetyreport",
    name: "안전신문고 (행정안전부)",
    category: "공공서비스",
    scope: "도로·교통시설 파손, 포트홀, 생활안전 위험요소 및 환경오염 신고",
    phone: "1600-8172",
    website: "https://www.safetyreport.go.kr",
    onlineUrl: "https://www.safetyreport.go.kr",
    hours: "앱/웹 신고 접수 24시간 (시스템 문의: 평일 09:00~18:00)",
    methods: [
      "안전신문고 모바일 앱 신고",
      "해당 사이트 온라인 접수 (safetyreport.go.kr)",
      "전화문의 (1600-8172)",
    ],
    limitations: "현장 긴급 출동이 필요한 즉각적 사고·범죄는 112나 119로 신고해야 합니다.",
    sourceUrl: "https://www.safetyreport.go.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "kosaf",
    name: "한국장학재단",
    category: "공공기관",
    scope: "국가장학금 신청, 학자금 대출(취업후상환/일반), 주거지원 장학금 안내",
    phone: "1599-2000",
    website: "https://www.kosaf.go.kr",
    onlineUrl: "https://www.kosaf.go.kr",
    hours: "평일 09:00~18:00",
    methods: [
      "해당 사이트 온라인 신청 (kosaf.go.kr)",
      "한국장학재단 모바일 앱 접수",
      "전화문의 (1599-2000)",
    ],
    limitations: "소득구간 산정 및 대학별 학사 요건 충족 여부에 따라 지원 대상이 결정됩니다.",
    sourceUrl: "https://www.kosaf.go.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "hrdkorea",
    name: "한국산업인력공단 (Q-Net)",
    category: "공공기관",
    scope: "국가기술자격 시험 접수, 자격증 발급·재발급, 확인서 신청, 시험일정 안내",
    phone: "1644-8000",
    website: "https://www.q-net.or.kr",
    onlineUrl: "https://www.q-net.or.kr",
    hours: "평일 09:00~18:00",
    methods: [
      "해당 사이트 온라인 접수 (q-net.or.kr)",
      "큐넷 모바일 앱 신청",
      "전화문의 (1644-8000)",
    ],
    limitations: "시험 원서접수 마감 시간은 지정된 접수기간 내에만 가능합니다.",
    sourceUrl: "https://www.q-net.or.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "kdic",
    name: "예금보험공사 착오송금반환지원센터",
    category: "공공기관",
    scope: "실수로 잘못 보낸 돈(착오송금)에 대해 금융회사 자진반환 실패 시 회수 지원",
    phone: "1588-0037",
    website: "https://www.kdic.or.kr",
    onlineUrl: "https://kmrs.kdic.or.kr",
    hours: "평일 09:00~18:00",
    methods: [
      "해당 사이트 온라인 신청 (kmrs.kdic.or.kr)",
      "전화문의 (1588-0037)",
      "예금보험공사 본사 방문접수",
    ],
    limitations: "착오송금일로부터 1년 이내, 5만원 이상 5천만원 이하 송금 건만 지원 대상입니다.",
    sourceUrl: "https://kmrs.kdic.or.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "noise",
    name: "층간소음 이웃사이센터 (한국환경공단)",
    category: "공공기관",
    scope: "공동주택 층간소음 갈등 전화상담, 현장진단 및 방문 소음측정 서비스",
    phone: "1661-2642",
    website: "https://www.noiseinfo.or.kr",
    onlineUrl: "https://www.noiseinfo.or.kr",
    hours: "평일 09:00~18:00",
    methods: ["전화문의 (1661-2642)", "해당 사이트 온라인 접수 (국가소음정보시스템)", "우편 접수"],
    limitations: "합의 유도 및 조정 기구이며 벌금이나 과태료를 부과하는 사법권은 없습니다.",
    sourceUrl: "https://www.noiseinfo.or.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "bokji129",
    name: "보건복지상담센터",
    category: "정부기관",
    scope: "긴급복지지원(생계·의료비), 기초생활보장, 아동·노인·장애인 복지 서비스 종합 안내",
    phone: "129",
    website: "https://www.129.go.kr",
    onlineUrl: "https://www.129.go.kr",
    hours: "위기상담 및 긴급지원 24시간 (일반상담 평일 09:00~18:00)",
    methods: ["전화문의 (국번없이 129)", "해당 사이트 채팅·수어 상담", "주민센터 방문신청 안내"],
    limitations: "상담 및 복지 연계 중심이며 최종 급여 수급 심사는 지자체 복지과에서 진행합니다.",
    sourceUrl: "https://www.129.go.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "kfair",
    name: "한국공정거래조정원",
    category: "공공기관",
    scope: "가맹사업(프랜차이즈), 하도급, 대리점, 대규모유통업 등 불공정거래 분쟁조정",
    phone: "1588-1490",
    website: "https://www.kfair.or.kr",
    onlineUrl: "https://www.kfair.or.kr",
    hours: "평일 09:00~18:00 (공정위 상담실: 1670-0007)",
    methods: [
      "해당 사이트 온라인 분쟁조정 접수 (kfair.or.kr)",
      "전화문의 (1588-1490)",
      "우편 및 방문 접수",
    ],
    limitations:
      "조정 성립 시 법원 화해와 같은 효력이 발생하나, 상대방이 조정을 거부하면 종결됩니다.",
    sourceUrl: "https://www.kfair.or.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "kotech",
    name: "노란우산공제 (중소기업중앙회)",
    category: "공공기관",
    scope: "소상공인·자영업자 폐업·노령 대비 공제금 적립 및 소득공제, 공제금 지급",
    phone: "1666-9988",
    website: "https://www.8899.or.kr",
    onlineUrl: "https://www.8899.or.kr",
    hours: "평일 09:00~18:00 (점심시간 12:00~13:00 제외)",
    methods: [
      "해당 사이트 온라인 청구 (8899.or.kr)",
      "전화문의 (1666-9988)",
      "중소기업중앙회 지역본부 방문접수",
    ],
    limitations:
      "공제금은 법률에 의해 압류·양도가 금지되며 폐업, 사망 등 법정 지급 사유 발생 시 지급됩니다.",
    sourceUrl: "https://www.8899.or.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "childsupport",
    name: "양육비이행관리원",
    category: "공공기관",
    scope: "미지급 양육비 청구 소송, 강제집행 지원, 양육비 채권 추심 및 면접교섭 지원",
    phone: "1644-6621",
    website: "https://www.childsupport.or.kr",
    onlineUrl: "https://www.childsupport.or.kr",
    hours: "평일 09:00~18:00 (점심시간 12:00~13:00 제외)",
    methods: [
      "전화문의 (1644-6621)",
      "해당 사이트 온라인 신청 (childsupport.or.kr)",
      "방문 및 우편 접수",
    ],
    limitations:
      "양육비 청구 소송 및 이행확보 지원 기관이며, 직접 대지급금을 대신 지급하지는 않습니다.",
    sourceUrl: "https://www.childsupport.or.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "food1399",
    name: "불량식품 통합신고센터",
    category: "정부기관",
    scope: "부정·불량식품, 유통기한 변조, 식품 내 이물(벌레, 쇠붙이 등) 혼입 신고",
    phone: "1399",
    website: "https://www.foodsafetykorea.go.kr",
    onlineUrl: "https://www.foodsafetykorea.go.kr",
    hours: "평일 09:00~18:00 (인터넷 신고 24시간)",
    methods: [
      "전화문의 (국번없이 1399)",
      "해당 사이트 온라인 신고 (식품안전나라)",
      "국민신문고 민원 연계",
    ],
    limitations:
      "행정처분을 위한 조사 및 과태료 부과 절차이며, 소비자 개인의 치료비 보상은 민사합의나 소비자원을 거쳐야 합니다.",
    sourceUrl: "https://www.foodsafetykorea.go.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "kdca",
    name: "질병관리청 콜센터",
    category: "정부기관",
    scope: "법정 감염병 의심 신고, 예방접종 안내, 해외 감염병 정보, 공중보건 상담",
    phone: "1339",
    website: "https://www.kdca.go.kr",
    onlineUrl: "https://www.kdca.go.kr",
    hours: "365일 24시간 연중무휴",
    methods: ["전화문의 (국번없이 1339)", "보건소 선별진료 방문문의", "카카오톡 챗봇 상담"],
    limitations: "의료기관 응급환자 이송은 119 구급대를 통하여 요청해야 합니다.",
    sourceUrl: "https://www.kdca.go.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "police",
    name: "경찰청 사이버범죄 신고시스템 (ECRM)",
    category: "수사기관",
    scope: "사이버 사기, 해킹, 스미싱, 불법 사설 서버 등 정보통신망 침해 범죄 수사",
    phone: "182",
    website: "https://ecrm.police.go.kr",
    onlineUrl: "https://ecrm.police.go.kr",
    hours: "온라인 접수 24시간 연중무휴 (민원상담 182, 긴급 112)",
    methods: [
      "해당 사이트 온라인 접수 (ECRM)",
      "경찰서 민원실 방문문의",
      "전화문의 (국번없이 182)",
    ],
    limitations: "형사처벌을 위한 수사 절차이며, 민사상 환불이나 손해배상을 대행하지 않습니다.",
    sourceUrl: "https://ecrm.police.go.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "grac",
    name: "게임물관리위원회",
    category: "공공기관",
    scope: "게임물 등급분류 사후관리, 불법 게임물 및 확률형 아이템 표시 의무 관련 신고",
    phone: "051-720-6800",
    website: "https://www.grac.or.kr",
    onlineUrl: "https://www.grac.or.kr",
    hours: "평일 09:00~18:00 (민원실: 1670-0775)",
    methods: ["해당 사이트 불법게임물 신고센터", "전화문의 (051-720-6800)", "국민신문고 민원 연계"],
    limitations: "개별 이용자 간 손해배상이나 환불을 직접 강제하지 않습니다.",
    sourceUrl: "https://www.grac.or.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "mcst",
    name: "문화체육관광부",
    category: "정부부처",
    scope: "게임산업 정책 및 게임산업진흥에 관한 법률 소관 부처",
    phone: "044-203-2000",
    website: "https://www.mcst.go.kr",
    onlineUrl: "https://www.mcst.go.kr",
    hours: "평일 09:00~18:00 (정부민원: 110)",
    methods: ["국민신문고 전자민원 접수", "전화문의 (044-203-2000)", "우편 민원 접수"],
    limitations: "개별 분쟁 조정 기관이 아니며 법령 유권해석 및 정책을 총괄합니다.",
    sourceUrl: "https://www.mcst.go.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "kisa",
    name: "한국인터넷진흥원 (KISA)",
    category: "공공기관",
    scope: "개인정보 침해 신고, 스팸·스미싱 상담, 해킹 피해 분석",
    phone: "118",
    website: "https://www.kisa.or.kr",
    onlineUrl: "https://privacy.kisa.or.kr",
    hours: "신고 접수 24시간 연중무휴 (전문상담: 평일 09:00~18:00)",
    methods: [
      "전화문의 (국번없이 118)",
      "해당 사이트 온라인 신고 (privacy.kisa.or.kr)",
      "이메일 신고",
    ],
    limitations: "계정 복구 및 손해배상은 해당 사업자 또는 분쟁조정위원회를 통해 진행해야 합니다.",
    sourceUrl: "https://privacy.kisa.or.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "kopico",
    name: "개인정보 분쟁조정위원회",
    category: "공공기관",
    scope: "개인정보 유출, 무단 수집, 제3자 제공 등 개인정보 관련 민사 분쟁 조정",
    phone: "1833-6972",
    website: "https://www.kopico.go.kr",
    onlineUrl: "https://www.kopico.go.kr",
    hours: "평일 09:00~18:00",
    methods: [
      "해당 사이트 온라인 분쟁조정 신청 (kopico.go.kr)",
      "전화문의 (1833-6972)",
      "우편 신청",
    ],
    limitations: "형사 처벌 절차가 아닌 민사 조정 절차입니다.",
    sourceUrl: "https://www.kopico.go.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "kcc",
    name: "통신분쟁조정위원회",
    category: "공공기관",
    scope: "통신서비스 및 결제(휴대폰 소액결제 등) 관련 이용자 분쟁 조정",
    phone: "142-246",
    website: "https://www.ucdr.or.kr",
    onlineUrl: "https://www.ucdr.or.kr",
    hours: "평일 09:00~18:00",
    methods: ["해당 사이트 온라인 접수 (ucdr.or.kr)", "전화문의 (국번없이 142-246)", "우편 접수"],
    limitations: "전기통신사업법에 따른 통신사업자와 이용자 간 분쟁을 주로 다룹니다.",
    sourceUrl: "https://www.ucdr.or.kr",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "apple",
    name: "Apple 환불 지원",
    category: "결제 플랫폼",
    scope: "App Store 인앱 결제, 유료 앱 및 구독 환불 심사 요청",
    phone: "080-333-4000",
    website: "https://support.apple.com/ko-kr",
    onlineUrl: "https://reportaproblem.apple.com",
    hours: "매일 09:00~21:00 (전화 및 실시간 채팅)",
    methods: [
      "해당 사이트 온라인 문제신고 (reportaproblem.apple.com)",
      "전화문의 (080-333-4000)",
      "Apple 지원 앱 채팅",
    ],
    limitations: "환불 승인 여부는 Apple 자체 심사 규정에 따릅니다.",
    sourceUrl: "https://support.apple.com/ko-kr/HT204084",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "googleplay",
    name: "Google Play 환불 지원",
    category: "결제 플랫폼",
    scope: "Google Play 인앱 결제, 유료 콘텐츠 환불 요청 및 정기결제 관리",
    phone: "080-234-0051",
    website: "https://support.google.com/googleplay",
    onlineUrl: "https://play.google.com",
    hours: "평일 09:00~18:00 (온라인 환불 요청은 24시간 접수)",
    methods: [
      "해당 사이트 온라인 환불 요청 (play.google.com)",
      "Play 스토어 앱 고객센터 채팅",
      "전화문의 (080-234-0051)",
    ],
    limitations: "구매 48시간 이후 환불은 개발사 정책에 따를 수 있습니다.",
    sourceUrl: "https://support.google.com/googleplay/answer/2479637",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
  {
    id: "steam",
    name: "Steam 환불 지원",
    category: "결제 플랫폼",
    scope: "Steam 구매 게임 및 아이템 환불 요청",
    website: "https://help.steampowered.com",
    onlineUrl: "https://help.steampowered.com",
    hours: "온라인 티켓 접수 24시간",
    methods: ["해당 사이트 고객지원 티켓 접수 (help.steampowered.com)"],
    limitations: "구매 후 14일 이내, 플레이 시간 2시간 미만 기본 기준이 적용됩니다.",
    sourceUrl: "https://store.steampowered.com/steam_refunds",
    verifiedAt: CHECKED,
    status: "확인 완료",
  },
];

const payDocs = [
  "결제 영수증 또는 결제 내역 캡처",
  "주문번호·거래번호",
  "게임 계정 ID",
  "고객센터 문의 내역 및 답변",
];

const paySteps = (extra?: Step): Step[] => [
  {
    title: "결제 경로 확인",
    detail:
      "Google Play, Apple App Store, Steam, 게임사 자체 결제 중 어디서 결제했는지 확인합니다. 환불 창구가 달라집니다.",
    method: "해당 사이트 문의",
  },
  {
    title: "증거자료 준비",
    detail: "영수증, 주문번호, 화면 캡처, 문의 내역을 날짜순으로 정리합니다.",
    method: "온라인 접수",
  },
  extra ?? {
    title: "사업자에게 환불 요청",
    detail:
      "게임사 고객센터 또는 결제 플랫폼에 문의문을 제출합니다. 아래 문의문 작성 기능을 활용하세요.",
    method: "해당 사이트 문의",
  },
  {
    title: "소비자상담센터 1372 상담",
    detail: "사업자가 답변하지 않거나 거부하면 국번없이 1372에 상담을 신청합니다.",
    orgId: "ccn",
    method: "전화문의",
  },
  {
    title: "피해구제 절차 검토",
    detail: "상담 후에도 해결되지 않으면 한국소비자원 피해구제 신청을 검토합니다.",
    orgId: "kca",
    method: "온라인 접수",
  },
];

const accountSteps: Step[] = [
  {
    title: "제한 사유 확인",
    detail: "게임사 공지, 이메일, 게임 내 메시지에서 제한 사유와 기간을 확인합니다.",
    method: "해당 사이트 문의",
  },
  {
    title: "자료 정리",
    detail: "계정 정보, 최근 접속 기록, 결제 내역, 제한 통지 화면을 캡처합니다.",
    method: "온라인 접수",
  },
  {
    title: "게임사에 이의 제기",
    detail: "고객센터를 통해 구체적 사유 공개와 재검토를 요청합니다.",
    method: "해당 사이트 문의",
  },
  {
    title: "1372 상담",
    detail: "부당하다고 판단되면 소비자상담센터에 상담합니다.",
    orgId: "ccn",
    method: "전화문의",
  },
];

const probSteps: Step[] = [
  {
    title: "표시 내용 기록",
    detail: "확률 표시 화면, 공지, 실제 획득 결과를 날짜와 함께 캡처합니다.",
    method: "온라인 접수",
  },
  {
    title: "게임사에 문의",
    detail: "확률 정보와 근거를 고객센터에 문의합니다.",
    method: "해당 사이트 문의",
  },
  {
    title: "게임물관리위원회 신고",
    detail: "확률형 아이템 표시 의무 위반이 의심되면 신고를 검토합니다.",
    orgId: "grac",
    method: "해당 사이트 문의",
  },
  {
    title: "소비자 피해 상담",
    detail: "금전적 피해가 있다면 1372 상담을 함께 진행합니다.",
    orgId: "ccn",
    method: "전화문의",
  },
];

const fraudSteps: Step[] = [
  {
    title: "증거 보존",
    detail: "대화 내역, 거래 게시글, 송금 내역, 상대방 정보를 삭제하지 말고 보관합니다.",
    method: "온라인 접수",
  },
  {
    title: "거래 플랫폼·게임사 신고",
    detail: "거래 사이트와 게임사에 상대 계정을 신고합니다.",
    method: "해당 사이트 문의",
  },
  {
    title: "사이버범죄 신고",
    detail: "경찰청 사이버범죄 신고시스템에 온라인 접수하거나 경찰서 민원실을 방문합니다.",
    orgId: "police",
    method: "온라인 접수",
  },
];

const P = (
  code: string,
  title: string,
  category: CategoryId,
  summary: string,
  keywords: string[],
  cases: string[],
  checks: string[],
  primary: string[],
  secondary: string[],
  steps: Step[],
  documents: string[],
): Problem => ({
  code,
  title,
  category,
  summary,
  keywords,
  cases,
  checks,
  primary,
  secondary,
  steps,
  documents,
});

export const problems: Problem[] = [
  // --- Legacy G001 to G020 preserved in original order ---
  P(
    "G001",
    "해외 게임사 연락처 확인",
    "contact",
    "해외 게임사의 공식 고객지원 창구를 찾는 방법을 안내합니다.",
    ["해외", "게임사", "연락처", "고객센터", "외국"],
    ["해외 게임사에 문의하고 싶은데 연락처를 모름", "앱 내 고객센터가 영어로만 되어 있음"],
    [
      "앱 스토어 상세 페이지의 개발자 연락처",
      "게임 내 설정 > 고객지원 메뉴",
      "공식 홈페이지 하단 Contact 항목",
    ],
    ["grac"],
    ["ccn"],
    [
      {
        title: "공식 창구 찾기",
        detail: "앱 스토어 개발자 정보와 게임 내 고객지원 메뉴를 확인합니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "국내대리인 여부 확인",
        detail: "일정 규모 이상 해외 게임사는 국내대리인을 둘 수 있습니다. G002를 참고하세요.",
        method: "국민신문고 문의",
      },
      {
        title: "결제 플랫폼 문의 검토",
        detail: "결제 관련 문제라면 앱 스토어(Apple/Google)를 통해 문의할 수도 있습니다.",
        method: "전화문의",
      },
    ],
    ["앱 스토어 영수증", "게임 계정 ID", "문의 내용 캡처"],
  ),
  P(
    "G002",
    "해외 게임사 국내대리인 확인",
    "contact",
    "해외 게임사의 국내대리인 지정 여부와 연락처를 확인하는 방법입니다.",
    ["국내대리인", "해외게임사", "대리인", "대행"],
    ["해외 게임사에 연락이 닿지 않음", "국내대리인을 통해 문제를 해결하고 싶음"],
    ["게임산업법상 국내대리인 지정 의무 대상 여부", "약관 또는 홈페이지 내 대리인 표시"],
    ["grac", "mcst"],
    [],
    [
      {
        title: "약관·홈페이지 확인",
        detail: "게임 이용약관이나 공식 홈페이지 하단에서 국내대리인 정보를 찾습니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "게임물관리위원회 확인",
        detail: "국내대리인 지정 현황은 게임물관리위원회 등을 통해 확인할 수 있습니다.",
        orgId: "grac",
        method: "전화문의",
      },
      {
        title: "대리인에게 문의 제출",
        detail: "확인된 대리인 연락처로 문의문을 발송합니다.",
        method: "해당 사이트 문의",
      },
    ],
    ["게임사 상호", "이용약관 캡처", "문의 내역"],
  ),
  P(
    "G003",
    "게임 결제 환불 거부",
    "payment",
    "게임사나 결제 플랫폼이 환불을 거부할 때 대응하는 절차입니다.",
    ["환불 거부", "환불", "결제 취소", "청약철회"],
    ["아이템 미사용인데 환불을 거부당함", "단순 변심인데 7일 이내 환불이 안 됨"],
    ["결제일로부터 7일 이내 여부", "재화·아이템의 사용 여부", "청약철회 불가 사전 고지 여부"],
    ["ccn", "kca"],
    ["apple"],
    paySteps({
      title: "환불 거부 사유 확인",
      detail:
        "게임사가 제시한 환불 거부 사유(사용 완료, 이벤트 재화 등)가 타당한지 약관을 확인합니다.",
      method: "해당 사이트 문의",
    }),
    payDocs,
  ),
  P(
    "G004",
    "결제 후 아이템 미지급",
    "payment",
    "결제는 완료되었으나 게임 내 재화나 아이템이 들어오지 않은 경우입니다.",
    ["미지급", "아이템 안 들어옴", "결제 오류", "재화 누락"],
    ["돈은 빠져나갔는데 아이템이 없음", "결제 중 오류로 튕김"],
    [
      "결제 영수증의 결제 상태(완료 여부)",
      "게임 내 우편함·보관함 재확인",
      "네트워크 재접속 후 확인",
    ],
    ["ccn"],
    ["apple"],
    paySteps({
      title: "지급 요청 문의",
      detail: "주문번호와 결제 시간을 적어 게임사 고객센터에 재화 지급을 요청합니다.",
      method: "해당 사이트 문의",
    }),
    payDocs,
  ),
  P(
    "G005",
    "게임 계정 영구정지 및 이용제한",
    "account",
    "부당하거나 사유를 알 수 없는 계정 제재에 대해 이의를 제기하는 절차입니다.",
    ["영구정지", "정지", "이용제한", "밴", "계정"],
    ["비인가 프로그램을 쓰지 않았는데 정지당함", "정지 사유를 알려주지 않음"],
    ["제재 통지문에 적힌 제재 사유", "약관상 제재 기준과 일치하는지 여부"],
    ["ccn"],
    ["kca"],
    accountSteps,
    ["제재 안내 화면 캡처", "계정 가입 정보", "최근 플레이 기록 또는 결제 내역"],
  ),
  P(
    "G006",
    "게임 계정 해킹 및 도용",
    "account",
    "계정이 해킹되거나 도용되어 피해를 입었을 때의 대응 방법입니다.",
    ["해킹", "도용", "계정 탈취", "비밀번호 변경됨"],
    ["로그인이 안 되고 비밀번호가 바뀌어 있음", "내가 하지 않은 접속 기록이 있음"],
    ["본인인증을 통한 비밀번호 재설정 가능 여부", "2차 인증 설정 여부"],
    ["kisa", "police"],
    ["ccn"],
    [
      {
        title: "즉시 비밀번호 재설정",
        detail: "연동된 이메일이나 본인인증으로 비밀번호를 바꾸고 2차 인증을 겁니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "게임사에 해킹 신고",
        detail: "고객센터에 해킹 피해를 접수하고 임시 보호 조치를 요청합니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "개인정보 침해 신고 검토",
        detail: "개인정보 유출이 의심되면 한국인터넷진흥원(118)에 상담합니다.",
        orgId: "kisa",
        method: "전화문의",
      },
      {
        title: "사이버수사대 신고 검토",
        detail: "금전적 피해가 크거나 재화가 도난당했다면 경찰에 신고합니다.",
        orgId: "police",
        method: "온라인 접수",
      },
    ],
    ["비정상 로그인 기록 캡처", "계정 본인인증 자료", "피해 내역 정리"],
  ),
  P(
    "G007",
    "게임 아이템 및 게임머니 임의 회수",
    "account",
    "보유 중이던 아이템이나 재화가 사전 안내 없이 회수된 경우입니다.",
    ["회수", "아이템 사라짐", "임의 회수", "롤백"],
    ["버그 악용이라며 정상 획득한 재화를 회수함", "사전 안내 없이 재화가 줄어듦"],
    ["게임사 공지사항에 관련 회수 안내가 있는지", "회수 사유가 약관에 명시되어 있는지"],
    ["ccn"],
    ["kca"],
    accountSteps,
    ["회수 전후 재화 보유 캡처", "고객센터 답변", "약관 해당 조항"],
  ),
  P(
    "G008",
    "확률형 아이템 확률 미표시",
    "probability",
    "게임 내 확률형 아이템의 획득 확률이 표시되지 않은 경우 신고 절차입니다.",
    ["확률 미표시", "확률형 아이템", "확률 어디", "뽑기"],
    ["뽑기 화면에 확률 정보가 없음", "홈페이지에도 확률이 나와 있지 않음"],
    ["게임산업법상 확률 표시 의무 대상 게임 여부", "게임 내외 어디에도 표시가 없는지 확인"],
    ["grac"],
    ["mcst"],
    probSteps,
    ["아이템 구매 화면 캡처", "상점 화면 캡처", "확률 미표시 확인 영상 또는 사진"],
  ),
  P(
    "G009",
    "표시 확률과 실제 확률 불일치 의심",
    "probability",
    "공시된 확률보다 실제 획득 확률이 현저히 낮다고 의심되는 경우입니다.",
    ["확률 조작", "확률 불일치", "체감 확률", "뽑기 사기"],
    ["수백 번 뽑았는데 공시 확률상 나와야 할 아이템이 안 나옴"],
    ["뽑기 시도 횟수와 획득 결과의 객관적 기록 여부"],
    ["grac"],
    ["ccn"],
    probSteps,
    ["뽑기 시도 내역 캡처", "획득 결과 전체 목록", "공시 확률 화면 캡처"],
  ),
  P(
    "G010",
    "확률형 아이템 정보 허위 표시",
    "probability",
    "공지된 확률 정보가 거짓이거나 잘못 안내된 경우의 신고 절차입니다.",
    ["허위 표시", "확률 거짓", "거짓 공지"],
    ["확률표에 있는 아이템이 실제로는 안 나오는 것으로 밝혀짐"],
    ["게임사의 정정 공지 또는 오류 인정 여부"],
    ["grac"],
    ["ccn", "kca"],
    probSteps,
    ["게임사 정정 공지 캡처", "기존 확률표와 변경된 확률표 비교 자료", "결제 영수증"],
  ),
  P(
    "G011",
    "게임 내 기만적 결제 유도",
    "payment",
    "다크패턴 등 사용자를 착각하게 만들어 결제를 유도한 경우입니다.",
    ["기만 결제", "다크패턴", "착각 결제", "자동 결제"],
    ["무료인 줄 알았는데 결제됨", "취소 버튼을 찾기 어렵게 숨겨둠"],
    ["결제 전 최종 금액과 결제 여부가 명확히 표시되었는지"],
    ["ccn"],
    ["kca"],
    paySteps(),
    ["결제 유도 화면 캡처", "결제 확인 창 캡처", "영수증"],
  ),
  P(
    "G012",
    "게임 서비스 조기 종료",
    "service",
    "게임이 예고 없이 또는 짧은 예고 후 서비스를 종료하는 경우입니다.",
    ["서비스 종료", "섭종", "게임 종료", "조기 종료"],
    ["출시한 지 얼마 안 된 게임이 갑자기 종료 공지를 올림"],
    ["표준약관상 종료 30일 전 공지 의무 준수 여부", "잔여 유료 재화 환급 방안 안내 여부"],
    ["ccn", "kca"],
    ["grac"],
    [
      {
        title: "종료 공지 확인",
        detail: "종료일, 환급 기준, 신청 기간을 확인합니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "보유 재화 정리",
        detail: "남은 유료 재화와 무료 재화를 구분하여 캡처합니다.",
        method: "온라인 접수",
      },
      {
        title: "게임사에 환급 신청",
        detail: "게임사가 제시한 창구로 미사용 유료 재화 환급을 신청합니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "소비자 피해구제 검토",
        detail: "환급 기준이 부당하거나 연락이 닿지 않으면 한국소비자원에 접수합니다.",
        orgId: "kca",
        method: "온라인 접수",
      },
    ],
    ["서비스 종료 공지 캡처", "잔여 유료 재화 보유 화면", "최근 결제 영수증"],
  ),
  P(
    "G013",
    "유료 재화 잔액 환급 거부",
    "payment",
    "서비스 종료나 회원 탈퇴 시 남은 유료 재화 환급을 거부당한 경우입니다.",
    ["잔액 환급", "유료 재화 환불", "탈퇴 환불"],
    ["서비스 종료 후 남은 캐시를 환불해주지 않음", "탈퇴 시 잔액 포기를 강요함"],
    ["유료로 구매한 재화와 무료로 받은 재화의 구분", "약관상 환급 조항"],
    ["ccn", "kca"],
    [],
    paySteps(),
    ["유료 재화 충전 내역", "잔액 확인 화면", "환급 거부 답변 캡처"],
  ),
  P(
    "G014",
    "미성년자 무단 결제",
    "payment",
    "법정대리인의 동의 없이 미성년자가 결제한 경우의 취소 절차입니다.",
    ["미성년자 결제", "자녀 결제", "애가 결제", "무단 결제"],
    ["자녀가 부모 폰으로 게임 아이템을 수십만 원 결제함"],
    ["결제 당시 미성년자 명의 기기 또는 부모 기기 여부", "법정대리인 동의 절차 존재 여부"],
    ["ccn", "kca"],
    ["apple", "googleplay"],
    [
      {
        title: "결제 내역 확인",
        detail: "결제 시간, 금액, 결제 수단을 정확히 확인합니다.",
        method: "온라인 접수",
      },
      {
        title: "결제 플랫폼에 취소 요청",
        detail:
          "Google Play나 Apple에 미성년자 결제 취소를 요청합니다. 민법상 법정대리인 미동의 결제는 취소할 수 있습니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "게임사에 문의",
        detail: "플랫폼에서 거부당하면 게임사에 직접 가족관계증명서 등을 제출해 취소를 요청합니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "1372 상담",
        detail: "양쪽 모두 거부하면 소비자상담센터에 상담을 신청합니다.",
        orgId: "ccn",
        method: "전화문의",
      },
    ],
    ["가족관계증명서", "결제 영수증 전체", "미성년자 진술서 또는 경위서"],
  ),
  P(
    "G015",
    "게임 이용 중 개인정보 유출",
    "service",
    "게임사나 커뮤니티에서 개인정보가 유출된 정황이 있는 경우입니다.",
    ["개인정보 유출", "정보 유출", "해킹 유출", "개인정보"],
    ["게임사에서 정보 유출 통지를 받음", "내 개인정보가 다른 곳에 돌아다님"],
    ["유출 통지문의 유출 항목 확인", "동일 비밀번호를 쓰는 다른 사이트 변경"],
    ["kisa", "kopico"],
    [],
    [
      {
        title: "비밀번호 변경",
        detail: "해당 게임 및 동일 계정 정보를 사용하는 모든 사이트의 비밀번호를 즉시 변경합니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "유출 통지문 확인",
        detail: "게임사가 보낸 유출 통지서에서 유출된 항목과 시점을 확인합니다.",
        method: "온라인 접수",
      },
      {
        title: "KISA 신고",
        detail: "한국인터넷진흥원 개인정보침해신고센터(118)에 신고합니다.",
        orgId: "kisa",
        method: "전화문의",
      },
      {
        title: "분쟁조정 신청 검토",
        detail: "유출로 인한 손해배상을 원한다면 개인정보 분쟁조정위원회에 신청합니다.",
        orgId: "kopico",
        method: "온라인 접수",
      },
    ],
    ["유출 통지 이메일 또는 문자", "게임 계정 정보", "피해 사실 입증 자료"],
  ),
  P(
    "G016",
    "불법 사설 서버 운영 의심",
    "fraud",
    "공식 서버가 아닌 불법 복제·변조 서버를 발견했거나 피해를 입은 경우입니다.",
    ["사설 서버", "프리 서버", "불법 서버"],
    ["사설 서버에서 유료 결제를 유도함", "사설 서버가 갑자기 닫혀 돈을 날림"],
    ["해당 서버가 공식 라이선스를 취득하지 않은 사설 서버인지"],
    ["grac", "police"],
    [],
    [
      {
        title: "정보 수집",
        detail: "사설 서버 홈페이지 주소, 홍보 게시글, 계좌번호 등을 기록합니다.",
        method: "온라인 접수",
      },
      {
        title: "게임물관리위원회 신고",
        detail: "불법 게임물 유통으로 게임물관리위원회에 신고합니다.",
        orgId: "grac",
        method: "해당 사이트 문의",
      },
      {
        title: "금전 피해 시 경찰 신고",
        detail: "사설 서버 운영자에게 사기를 당했다면 사이버수사대에 고소합니다.",
        orgId: "police",
        method: "온라인 접수",
      },
    ],
    ["사설 서버 웹사이트 캡처", "송금 내역", "대화 내용"],
  ),
  P(
    "G017",
    "불법 게임물 유통 의심",
    "fraud",
    "등급분류를 받지 않은 불법 게임물이나 변조된 게임물을 신고하는 절차입니다.",
    ["불법 게임물", "미등급", "불법 복제"],
    ["심의를 받지 않은 성인 게임이 유통됨", "불법 복제 게임을 판매함"],
    ["게임물 등급분류 번호 존재 여부"],
    ["grac"],
    [],
    [
      {
        title: "증거 확보",
        detail: "유통 사이트 주소, 판매 화면 등을 캡처합니다.",
        method: "온라인 접수",
      },
      {
        title: "게임물관리위원회 신고",
        detail: "불법게임물 신고센터를 통해 온라인으로 신고합니다.",
        orgId: "grac",
        method: "해당 사이트 문의",
      },
    ],
    ["유통 화면 캡처", "판매처 링크"],
  ),
  P(
    "G018",
    "게임 등급 및 표시 문제",
    "service",
    "이용 연령 등급이 부적절하거나 표시 내용이 실제와 다른 경우입니다.",
    ["등급", "연령 등급", "등급 표시", "이용가"],
    ["전체이용가 게임에 지나치게 폭력적인 장면이 나옴"],
    ["현재 표시된 등급과 게임물관리위원회 등급분류 결과 비교"],
    ["grac"],
    [],
    [
      {
        title: "등급 정보 확인",
        detail: "게임물관리위원회 웹사이트에서 공식 등급을 조회합니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "의견 제출 또는 신고",
        detail: "등급이 부적절하다고 판단되면 등급재분류 신청이나 의견을 제출합니다.",
        orgId: "grac",
        method: "국민신문고 문의",
      },
    ],
    ["게임 내 문제 장면 캡처", "현재 등급 표시 화면"],
  ),
  P(
    "G019",
    "게임 아이템 현금거래 사기",
    "fraud",
    "아이템이나 게임머니를 현금으로 거래하다 대금을 떼인 경우입니다.",
    ["현금거래", "아이템 사기", "머니 사기", "먹튀"],
    ["돈을 보냈는데 아이템을 안 줌", "아이템을 넘겼는데 돈을 입금하지 않음"],
    ["거래 상대방의 연락처, 계좌번호, 대화 내역 보존 여부"],
    ["police"],
    ["ccn"],
    fraudSteps,
    ["송금 확인증(은행 발급)", "대화 내역 전체 캡처", "거래 게시글 캡처"],
  ),
  P(
    "G020",
    "게임 계정 거래 사기",
    "fraud",
    "계정 거래 후 회수당하거나 사기를 당한 경우입니다.",
    ["계정 거래", "사기", "회수"],
    ["구매한 계정을 판매자가 다시 가져감"],
    ["게임사 약관의 계정 거래 금지 여부"],
    ["police"],
    [],
    fraudSteps,
    ["송금 내역", "대화 내역", "계정 정보"],
  ),

  // ==========================================
  // 1. 소비자·거래 (consumer) - 5건
  // ==========================================
  P(
    "C001",
    "온라인 쇼핑몰 주문 취소 및 환불 거부",
    "payment",
    "전자상거래로 구매한 물품의 7일 이내 청약철회 요구를 판매자가 거부할 때 해결 절차입니다.",
    ["쇼핑몰", "주문취소", "환불거부", "청약철회", "전자상거래"],
    [
      "단순 변심으로 7일 이내 반품을 요청했으나 판매자가 거부함",
      "반품 배송비로 과도한 금액을 요구함",
    ],
    ["물품 수령 후 7일 이내 반품 의사 표시 여부", "소비자 귀책으로 물품이 멸실·훼손되었는지 여부"],
    ["ccn", "kca"],
    [],
    [
      {
        title: "청약철회 통보 증빙 확보",
        detail:
          "전자상거래법 제17조에 따라 수령 후 7일 이내에 판매자에게 서면/문자/게시판으로 청약철회 의사를 발송하고 화면을 캡처합니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "결제 취소 요청",
        detail: "신용카드사 또는 결제대행사에 거래 취소 및 지급보류(차지백)를 요청합니다.",
        method: "전화문의",
      },
      {
        title: "1372 소비자상담센터 접수",
        detail:
          "판매자가 환불을 지속 거부하면 국번없이 1372로 전화하여 공식 중재 상담을 접수합니다.",
        orgId: "ccn",
        method: "전화문의",
      },
      {
        title: "한국소비자원 피해구제 신청",
        detail:
          "상담 후에도 합의가 이루어지지 않으면 온라인(kca.go.kr)으로 피해구제 및 분쟁조정을 공식 신청합니다.",
        orgId: "kca",
        method: "온라인 접수",
      },
    ],
    [
      "구매 영수증 및 결제 내역서",
      "주문 상세 내역 캡처",
      "판매자와의 대화 내역 및 반품 거부 답변 캡처",
    ],
  ),
  P(
    "C002",
    "배송 지연 및 배송 중 물품 분실·파손",
    "service",
    "택배 배송 중 물품이 파손되거나 분실되었을 때 운송사업자와 판매자에게 손해배상을 청구하는 절차입니다.",
    ["택배", "배송지연", "물품파손", "분실", "택배사고"],
    ["택배 상자가 훼손되어 내부 물품이 파손됨", "배송 완료로 뜨는데 물건을 받지 못함"],
    ["물품 수령 즉시 택배사에 파손 통보 여부(수령 후 14일 이내)", "운송장에 물품 가액 기재 여부"],
    ["ccn", "kca"],
    [],
    [
      {
        title: "파손 및 훼손 현장 사진 보존",
        detail:
          "택배 운송장이 부착된 외부 박스 상태와 내부 포장재, 파손된 물품 사진을 다각도로 촬영합니다.",
        method: "온라인 접수",
      },
      {
        title: "택배사에 즉시 사고 접수",
        detail:
          "택배 표준약관에 따라 수령 후 14일 이내에 택배사 고객센터로 전화하여 사고 접수 번호를 받습니다.",
        method: "전화문의",
      },
      {
        title: "판매처에 재배송 또는 환불 요청",
        detail:
          "소비자에게 인도되기 전까지의 위험은 원칙적으로 판매자가 부담하므로 판매처 고객센터에 통보합니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "1372 소비자 피해구제 연계",
        detail:
          "택배사와 판매자가 서로 책임을 회피할 경우 1372 소비자상담센터에 중재를 요청합니다.",
        orgId: "ccn",
        method: "전화문의",
      },
    ],
    ["송장 번호 사진", "파손 물품 및 박스 사진", "상품 구입 영수증 및 결제 내역서"],
  ),
  P(
    "C003",
    "중고거래 사기 및 물품 미발송",
    "fraud",
    "당근마켓, 번개장터, 중고나라 등에서 대금을 송금했으나 물품을 받지 못하고 연락이 두절된 경우의 대처 절차입니다.",
    ["중고거래", "사기", "당근", "번개장터", "중고나라", "미발송"],
    ["입금 후 판매자가 채팅방을 나가고 연락이 두절됨", "가짜 송장번호를 알려주고 잠적함"],
    ["상대방 계좌번호 및 예금주 확인", "은행 송금확인증(이체확인서) 발급 가능 여부"],
    ["police"],
    ["ccn"],
    fraudSteps,
    [
      "은행 송금확인증(계좌번호, 수취인 실명 기재)",
      "판매 게시글 캡처",
      "메신저/채팅 전체 대화 내역 캡처",
    ],
  ),
  P(
    "C004",
    "헬스장·PT·필라테스 중도 해지 위약금 과다 청구",
    "payment",
    "운동 시설 장기 이용권 중도 해지 시 과도한 위약금 요구나 환불 거부에 대응하는 방법입니다.",
    ["헬스장", "PT", "필라테스", "위약금", "중도해지", "환불"],
    [
      "이사나 질병으로 헬스장 해지를 요청했으나 정상가 기준으로 위약금을 매겨 환불금이 없음",
      "계약서상 환불 불가 조항을 이유로 거부함",
    ],
    ["방문판매법상 계속거래(1개월 이상) 해당 여부", "소비자분쟁해결기준상 위약금 10% 한도 확인"],
    ["ccn", "kca"],
    [],
    [
      {
        title: "서면 계약 해지 통보",
        detail:
          "업체에 직접 방문하거나 내용증명 우편으로 중도 해지 의사와 반환 계좌를 명확히 전달합니다.",
        method: "우편/내용증명",
      },
      {
        title: "위약금 법정 기준 산정",
        detail:
          "소비자분쟁해결기준에 따라 '총 계약대금의 10% + 이용일수 일할 계산'을 초과하는 금액은 무효임을 고지합니다.",
        method: "방문문의",
      },
      {
        title: "1372 소비자상담센터 접수",
        detail: "업체가 자체 약관을 고집하며 환불을 거절하면 1372로 전화하여 중재를 요청합니다.",
        orgId: "ccn",
        method: "전화문의",
      },
      {
        title: "한국소비자원 피해구제 접수",
        detail: "소비자원 온라인 포털에서 계약서와 영수증을 첨부하여 피해구제를 접수합니다.",
        orgId: "kca",
        method: "온라인 접수",
      },
    ],
    ["이용 계약서 및 약관 사본", "신용카드 결제 영수증", "해지 통보 문자 또는 내용증명"],
  ),
  P(
    "C005",
    "인테리어 공사 부실시공 및 하자 보수 불이행",
    "service",
    "아파트·상가 인테리어 공사 후 발생한 누수, 마감 불량 하자에 대해 보수나 손해배상을 청구하는 절차입니다.",
    ["인테리어", "부실시공", "리모델링", "하자보수", "인테리어사기"],
    [
      "잔금을 치른 후 공사 하자가 발견되었으나 인테리어 업체가 연락을 피함",
      "공사 기일이 한 달 이상 지연됨",
    ],
    ["공사 표준계약서 작성 여부", "건설업 등록 업체(공사비 1,500만원 이상 시 면허 필수) 여부"],
    ["ccn", "kca"],
    ["epeople"],
    [
      {
        title: "하자 부위 객관적 채증",
        detail:
          "벽체 균열, 누수, 타일 들뜸 등 하자 부위를 치수가 드러나게 사진과 영상으로 기록합니다.",
        method: "온라인 접수",
      },
      {
        title: "하자보수 청구 내용증명 발송",
        detail:
          "건설산업기본법에 따른 하자담보책임(실내건축 1~2년)을 명시하여 보수 기한을 정한 내용증명을 보냅니다.",
        method: "우편/내용증명",
      },
      {
        title: "한국소비자원 피해구제 신청",
        detail:
          "시공 내역서와 하자 견적서를 첨부하여 소비자원에 기술 감정 및 분쟁조정을 의뢰합니다.",
        orgId: "kca",
        method: "온라인 접수",
      },
      {
        title: "무면허 시공 시 지자체 신고",
        detail:
          "공사비 1,500만원 이상 무면허 시공인 경우 국민신문고를 통해 관할 구청에 위법 사실을 신고합니다.",
        orgId: "epeople",
        method: "국민신문고 문의",
      },
    ],
    [
      "인테리어 계약서 및 공사 견적서",
      "공사 대금 송금 영수증",
      "하자 현장 사진 및 타 업체 하자 견적서",
    ],
  ),

  // ==========================================
  // 2. 금융·보험 (finance) - 5건
  // ==========================================
  P(
    "F001",
    "보이스피싱·메신저 피싱 피해 및 계좌 지급정지",
    "fraud",
    "금융사기 피해 발생 시 추가 피해를 막고 피해금을 환급받기 위한 신속 대응 절차입니다.",
    ["보이스피싱", "메신저피싱", "계좌지급정지", "금융사기", "통신사기"],
    ["검찰/금융감독원 사칭 전화를 받고 돈을 송금함", "자녀 사칭 문자를 받고 원격제어 앱을 설치함"],
    ["사기범 계좌로 송금한 지 얼마 지나지 않았는지", "본인 명의 계좌에서 추가 인출 위험이 있는지"],
    ["fss", "police"],
    [],
    [
      {
        title: "즉시 계좌 지급정지 요청 (골든타임)",
        detail:
          "금융감독원(1332) 또는 경찰청(112), 혹은 송금한 은행 콜센터로 즉시 전화해 사기이용계좌 지급정지를 요청합니다.",
        orgId: "fss",
        method: "전화문의",
      },
      {
        title: "본인 계좌 일괄지급정지",
        detail:
          "계좌정보통합관리서비스(어카운트인포) 또는 금융소비자포털 파인에서 본인 명의 모든 계좌의 출금을 일괄 정지합니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "경찰서 방문 및 확인원 발급",
        detail:
          "가까운 경찰서에 방문하여 피해 사실을 진술하고 '사건사고사실확인원'을 발급받습니다.",
        orgId: "police",
        method: "방문문의",
      },
      {
        title: "피해구제 신청서 제출",
        detail:
          "지급정지 조치일로부터 3영업일 이내에 피해금을 송금한 은행에 사건사고사실확인원과 피해구제신청서를 제출합니다.",
        orgId: "fss",
        method: "방문문의",
      },
    ],
    ["은행 송금확인증", "통화 녹음 및 문자메시지 캡처", "사건사고사실확인원(경찰서)", "신분증"],
  ),
  P(
    "F002",
    "실손의료보험금 지급 거절 및 보험 분쟁",
    "payment",
    "병원 진료 후 청구한 실손보험금에 대해 보험사가 과잉진료나 비급여 항목을 이유로 지급을 거절했을 때의 대응 경로입니다.",
    ["실손보험", "보험금 거절", "도수치료", "백내장", "보험분쟁", "금융감독원"],
    [
      "의사의 처방에 따라 진료를 받았는데 보험사가 부지급 통보함",
      "의료자문 동의를 강요하며 심사를 보류함",
    ],
    ["보험 약관상 보상하지 않는 손해에 해당하는지", "보험사의 서면 부지급 사유서 확보 여부"],
    ["fss"],
    ["ccn"],
    [
      {
        title: "공식 부지급 사유서 요청",
        detail:
          "보험사에 구두 통보 대신 법적 근거와 약관 조항이 명시된 서면 부지급 사유서를 발급해 달라고 요구합니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "주치의 추가 소견서 확보",
        detail:
          "진료 의사에게 해당 치료가 질병 치료 목적의 불가피한 치료였음을 입증하는 소견서를 발급받습니다.",
        method: "방문문의",
      },
      {
        title: "금융감독원 1332 상담",
        detail:
          "금융감독원 금융민원센터(1332)에 연락하여 보험사의 약관 해석이 타당한지 무료 상담을 받습니다.",
        orgId: "fss",
        method: "전화문의",
      },
      {
        title: "금융감독원 분쟁조정 신청",
        detail: "금융민원포털(e-금융민원)을 통해 금융분쟁조정을 정식 접수합니다.",
        orgId: "fss",
        method: "온라인 접수",
      },
    ],
    [
      "보험 증권 및 약관",
      "진료비 영수증 및 진료비 세부내역서",
      "의사 진단서 및 진료 소견서",
      "보험사 부지급 사유서",
    ],
  ),
  P(
    "F003",
    "불법 사금융 및 법정 최고금리 초과 대출 피해",
    "fraud",
    "대부업 법정 최고금리(연 20%)를 초과하는 고금리 대출이나 불법 채권추심 피해를 구제받는 방법입니다.",
    ["불법대부", "고금리", "사채", "불법사금융", "불법추심", "채무자대리인"],
    ["연 20%를 넘는 이자를 요구받음", "가족이나 지인에게 연락하는 등 불법 채권추심을 당함"],
    ["이자율 계산 시 선이자, 수수료 포함 연 20% 초과 여부", "등록 대부업체 여부 확인"],
    ["fss", "police"],
    [],
    [
      {
        title: "대출 계약 및 이자 송금 증빙 정리",
        detail:
          "실제 수령한 원금, 이자로 송금한 내역, 계약서 사본을 일자별로 정리하여 실제 이자율을 계산합니다.",
        method: "온라인 접수",
      },
      {
        title: "채무자대리인 무료 지원 신청",
        detail:
          "금융감독원(1332) 또는 대한법률구조공단(132)에 불법사금융 피해 무료 채무자대리인(변호사) 선임을 신청합니다.",
        orgId: "fss",
        method: "전화문의",
      },
      {
        title: "불법추심 신고",
        detail: "욕설, 협박, 야간 방문 등 불법 채권추심 행위 녹취록을 첨부하여 경찰에 고소합니다.",
        orgId: "police",
        method: "방문문의",
      },
    ],
    [
      "대출 계약서 및 차용증",
      "은행 이체 내역서(원금 수령 및 이자 송금)",
      "추심 문자 및 통화 녹음 파일",
    ],
  ),
  P(
    "F004",
    "통장 계좌번호 오입력 착오송금 반환 지원",
    "service",
    "계좌번호를 잘못 입력하여 엉뚱한 사람에게 송금했을 때 예금보험공사를 통해 돈을 돌려받는 절차입니다.",
    ["착오송금", "돈잘못보냄", "오송금", "예금보험공사", "계좌실수"],
    [
      "계좌번호 1자리를 잘못 눌러 모르는 사람에게 500만원을 송금함",
      "수취인이 연락이 닿지 않거나 반환을 거부함",
    ],
    ["송금일로부터 1년 이내 여부", "송금 금액이 5만원 이상 5천만원 이하인지 확인"],
    ["kdic"],
    ["fss"],
    [
      {
        title: "송금 은행에 자진반환 요청",
        detail:
          "송금한 본인 은행 고객센터에 즉시 연락해 수취인에게 자진 반환을 요청하도록 접수합니다.",
        method: "전화문의",
      },
      {
        title: "자진반환 불발 시 예보 접수",
        detail:
          "수취인 연락 두절 등으로 반환되지 않으면 예금보험공사 착오송금반환포털(kmrs.kdic.or.kr)에 접속합니다.",
        orgId: "kdic",
        method: "해당 사이트 문의",
      },
      {
        title: "지급명령 및 반환금 수령",
        detail:
          "예금보험공사가 법원 지급명령 절차를 대행하여 회수한 후 수수료를 차감하고 반환해 드립니다.",
        method: "온라인 접수",
      },
    ],
    ["이체확인증(송금일시, 수취은행, 수취계좌, 송금액)", "본인 통장 사본", "신분증 사본"],
  ),
  P(
    "F005",
    "신용카드 부정사용 및 명의도용 결제 이의신청",
    "fraud",
    "카드를 분실·도난당했거나 해외 부정 결제가 발생했을 때 카드사 보상을 받는 절차입니다.",
    ["카드부정사용", "해외부정결제", "카드도용", "카드분실", "이의신청"],
    [
      "자고 일어났더니 해외에서 수백 달러가 결제되었다는 문자를 받음",
      "잃어버린 카드로 누군가 편의점에서 결제함",
    ],
    ["분실·도난 사실을 안 즉시 카드사에 신고했는지", "카드 뒷면에 본인 서명이 되어 있는지"],
    ["fss"],
    ["police"],
    [
      {
        title: "즉시 카드 분실신고 및 정지",
        detail:
          "해당 카드사 콜센터로 즉시 전화하여 카드 사용을 정지하고 해외 결제 차단을 신청합니다.",
        method: "전화문의",
      },
      {
        title: "부정사용 이의신청서 제출",
        detail:
          "여신전문금융업법에 따라 분실신고 접수일 기준 60일 전까지 발생한 부정사용액에 대해 보상신청서를 냅니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "경찰 도난 신고",
        detail:
          "타인이 무단 결제한 정황이 명백하면 가까운 경찰서에 방문하여 사건접수 확인원을 발급받습니다.",
        orgId: "police",
        method: "방문문의",
      },
      {
        title: "금감원 분쟁조정 접수",
        detail:
          "카드사가 본인 과실을 이유로 보상을 거부할 경우 1332로 금융감독원에 조정을 신청합니다.",
        orgId: "fss",
        method: "온라인 접수",
      },
    ],
    ["부정사용 승인 문자 캡처", "카드사 이의신청서 사본", "출입국사실증명서(해외결제 시)"],
  ),

  // ==========================================
  // 3. 주거·부동산 (housing) - 5건
  // ==========================================
  P(
    "H001",
    "전세·월세 만기 후 보증금 미반환",
    "payment",
    "임대차 계약 만료 후에도 집주인이 보증금을 돌려주지 않을 때 대항력을 유지하며 보증금을 회수하는 절차입니다.",
    ["전세보증금", "보증금 미반환", "임차권등기명령", "내용증명", "전세사기"],
    ["계약 만기가 지났는데 새 세입자가 들어와야 돈을 준다고 함", "임대인이 연락을 피함"],
    ["만기 2개월 전 계약 해지 통지 완료 여부", "확정일자 및 전입신고 대항력 유지 여부"],
    ["hldcc", "klac"],
    [],
    [
      {
        title: "계약 해지 통지 증빙 확인",
        detail:
          "만기 2~6개월 전 문자, 카카오톡, 통화 녹음으로 계약 갱신 거절 의사를 밝혔는지 확인합니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "보증금 반환 촉구 내용증명 발송",
        detail:
          "임대인 주소지로 계약 만료일과 보증금 반환 기한, 미반환 시 법적 조치를 명시한 내용증명 우편을 발송합니다.",
        method: "우편/내용증명",
      },
      {
        title: "임차권등기명령 신청 (이사 전 필수)",
        detail:
          "보증금을 받지 못하고 이사를 가야 한다면 관할 법원에 임차권등기명령을 신청하여 등기부에 등재되어야 대항력이 유지됩니다.",
        orgId: "klac",
        method: "온라인 접수",
      },
      {
        title: "분쟁조정위원회 접수 또는 지급명령",
        detail:
          "주택임대차분쟁조정위원회(132)에 조정을 신청하거나 법원에 보증금 반환 지급명령을 신청합니다.",
        orgId: "hldcc",
        method: "전화문의",
      },
    ],
    [
      "임대차계약서(확정일자 날인본)",
      "주민등록등본(전입일자 확인)",
      "계약 해지 통보 증빙(내용증명/문자)",
      "부동산 등기부등본",
    ],
  ),
  P(
    "H002",
    "주택 누수·결로 하자 및 수리의무 분쟁",
    "service",
    "임대차 목적물에 보일러 고장, 누수, 심한 결로 등이 발생했을 때 임대인의 수선의무를 청구하는 절차입니다.",
    ["주택하자", "누수", "수선의무", "보일러", "결로", "원상복구"],
    [
      "천장에서 물이 새는데 집주인이 세입자 탓을 하며 수리를 거부함",
      "보일러가 고장나 온수가 나오지 않음",
    ],
    ["하자 원인이 노후화인지 세입자의 관리 소홀인지", "수리 비용 사전 고지 여부"],
    ["hldcc", "klac"],
    [],
    [
      {
        title: "하자 발생 현장 상세 촬영",
        detail: "누수, 결로, 파손 부위의 사진과 동영상을 날짜가 나오도록 명확히 촬영합니다.",
        method: "온라인 접수",
      },
      {
        title: "임대인에게 서면 수리 요청",
        detail:
          "민법 제623조에 의거하여 임대인에게 하자를 고지하고 상당한 기간을 정해 수리를 요구합니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "전문업체 견적서 확보",
        detail:
          "임대인이 응하지 않아 긴급 수리해야 하는 경우 사전에 견적서와 영수증을 반드시 보존합니다.",
        method: "방문문의",
      },
      {
        title: "주택임대차분쟁조정위원회 신청",
        detail:
          "수리비 부담이나 월세 감액 문제로 합의가 되지 않으면 국번없이 132로 분쟁조정을 신청합니다.",
        orgId: "hldcc",
        method: "전화문의",
      },
    ],
    [
      "임대차계약서",
      "하자 발생 부위 사진 및 동영상",
      "수리 견적서 및 영수증",
      "임대인과의 대화 내역",
    ],
  ),
  P(
    "H003",
    "부동산 중개수수료(복비) 과다 청구 및 허위매물 신고",
    "service",
    "공인중개사가 법정 상한 요율을 초과하여 중개보수를 요구하거나 낚시성 허위매물을 올렸을 때 신고하는 절차입니다.",
    ["중개수수료", "복비", "허위매물", "부동산과태료", "공인중개사법"],
    ["법정 수수료율(0.4~0.5%)보다 높은 요율을 강요함", "인터넷에 본 매물과 실제 매물이 다름"],
    ["지자체 조례상 부동산 중개보수 요율표 확인", "현금영수증 발행 거부 여부"],
    ["epeople"],
    ["ccn"],
    [
      {
        title: "법정 중개보수 계산",
        detail:
          "공인중개사법 시행규칙상 상한 요율을 기준으로 적정 수수료를 계산하여 중개사에게 확인시킵니다.",
        method: "방문문의",
      },
      {
        title: "영수증 및 계좌이체 내역 확보",
        detail: "초과 수수료를 이미 지급했다면 영수증이나 이체 확인서를 반드시 확보합니다.",
        method: "온라인 접수",
      },
      {
        title: "구청 부동산정보과 국민신문고 민원",
        detail:
          "국민신문고(110)를 통해 중개사무소 소재지 관할 시·군·구청 부동산관리 부서에 위법 사실을 신고합니다.",
        orgId: "epeople",
        method: "국민신문고 문의",
      },
    ],
    ["부동산 매매/임대차 계약서", "중개대상물 확인설명서", "중개보수 영수증 및 계좌이체증"],
  ),
  P(
    "H004",
    "전세사기 피해자 결정 신청 및 긴급 주거지원",
    "service",
    "임대인의 무자본 갭투자나 보증보험 미가입 등으로 전세사기를 당했을 때 특별법상 피해자 인정을 받는 절차입니다.",
    ["전세사기", "전세피해", "특별법", "HUG", "긴급주거"],
    ["집주인이 수백 채 빌라왕이고 파산함", "경매에 넘어가 보증금을 잃을 위기임"],
    ["전세사기피해자지원 특별법 요건(대항력, 보증금 5억원 이하 등) 충족 여부"],
    ["gov24", "klac"],
    [],
    [
      {
        title: "피해 현황 및 서류 준비",
        detail: "임대차계약서, 경매개시결정 통지서, 보증금 입금증 등을 정리합니다.",
        method: "온라인 접수",
      },
      {
        title: "관할 시·도 전세피해지원센터 방문",
        detail:
          "지자체 또는 HUG 전세피해지원센터(1566-9009)에 방문하여 피해자 결정 신청서를 제출합니다.",
        method: "방문문의",
      },
      {
        title: "국토부 심의 및 긴급 지원",
        detail:
          "국토부 전세사기피해지원위원회 심의 후 피해자로 결정되면 긴급 저리대출 및 LH 긴급주거 지원을 받습니다.",
        method: "해당 사이트 문의",
      },
    ],
    ["임대차계약서 원본", "주민등록초본", "부동산 등기부등본", "경매 통지서(해당 시)"],
  ),
  P(
    "H005",
    "아파트·공동주택 층간소음 분쟁 전문 중재",
    "service",
    "위층의 쿵쿵거림이나 소음으로 고통받을 때 직접 대면 없이 공공 전문기관을 통해 해결하는 절차입니다.",
    ["층간소음", "이웃사이센터", "소음측정", "공동주택", "발망치"],
    ["밤낮으로 뛰는 소리에 일상생활이 불가능함", "관리사무소에 말해도 개선되지 않음"],
    ["층간소음 기준(주간 39dB, 야간 34dB) 초과 여부"],
    ["noise"],
    [],
    [
      {
        title: "소음 발생 일지 작성",
        detail: "소음이 발생하는 시간대와 소음 종류를 일자별로 메모하고 스마트폰으로 녹음합니다.",
        method: "온라인 접수",
      },
      {
        title: "관리주체(관리사무소) 1차 중재",
        detail:
          "공동주택관리법에 따라 관리사무소에 피해를 알리고 규정된 절차에 따른 방송/안내를 요청합니다.",
        method: "방문문의",
      },
      {
        title: "층간소음 이웃사이센터(1661-2642) 접수",
        detail:
          "국가소음정보시스템(noiseinfo.or.kr)에서 온라인 접수하여 전문가 전화상담을 진행합니다.",
        orgId: "noise",
        method: "해당 사이트 문의",
      },
      {
        title: "전문가 현장 진단 및 소음 측정",
        detail:
          "상담 후에도 갈등이 지속되면 전문가가 방문하여 양측 대면 조율 및 법적 소음 측정을 지원합니다.",
        orgId: "noise",
        method: "방문문의",
      },
    ],
    ["층간소음 발생 일지표", "녹음/녹화 파일", "관리사무소 민원 신청 내역"],
  ),

  // ==========================================
  // 4. 노동·고용 (labor) - 5건
  // ==========================================
  P(
    "L001",
    "월급·퇴직금·주휴수당 임금체불",
    "payment",
    "퇴직 후 14일 이내에 급여나 퇴직금을 지급받지 못했을 때 고용노동부를 통해 권리를 구제받는 경로입니다.",
    ["임금체불", "월급밀림", "퇴직금", "주휴수당", "노동부", "간이대지급금"],
    [
      "퇴사한 지 14일이 넘었는데 월급과 퇴직금을 주지 않음",
      "주휴수당을 계약서와 달리 지급하지 않음",
    ],
    ["퇴직일로부터 14일 경과 여부", "임금채권 소멸시효(3년) 이내 여부"],
    ["moel", "comwel"],
    ["klac"],
    [
      {
        title: "체불 내역 및 증빙 계산",
        detail: "미지급 기본급, 주휴수당, 연장근로수당, 퇴직금을 날짜별로 정확히 산정합니다.",
        method: "온라인 접수",
      },
      {
        title: "고용노동부 진정서 접수",
        detail:
          "고용노동부 노동포털(1350)에 사업장 관할 노동청을 지정하여 온라인 임금체불 진정서를 제출합니다.",
        orgId: "moel",
        method: "해당 사이트 문의",
      },
      {
        title: "근로감독관 출석 조사",
        detail:
          "지정된 출석일에 사업주와 함께 출석하여 체불 사실을 진술하고 입증 자료를 제시합니다.",
        method: "방문문의",
      },
      {
        title: "간이대지급금 청구",
        detail:
          "사업주가 시정지시에도 불응할 경우 '체불임금확인원'을 발급받아 근로복지공단에 간이대지급금을 신청합니다.",
        orgId: "comwel",
        method: "온라인 접수",
      },
    ],
    ["근로계약서", "급여통장 입금 내역서", "급여명세서", "출퇴근 기록(교통카드/메신저/출퇴근부)"],
  ),
  P(
    "L002",
    "부당해고 및 권고사직 거부 분쟁",
    "service",
    "정당한 이유 없이 구두 해고를 당하거나 권고사직을 강요받았을 때 노동위원회를 통해 복직 또는 금전보상을 받는 방법입니다.",
    ["부당해고", "해고통지서", "노동위원회", "구제신청", "권고사직"],
    ["내일부터 나오지 말라는 구두 해고 통보를 받음", "해고 예고 수당도 주지 않고 즉시 해고됨"],
    [
      "상시 근로자 5인 이상 사업장 여부",
      "해고일로부터 3개월 이내 여부",
      "서면 해고통지서 수령 여부",
    ],
    ["moel", "klac"],
    [],
    [
      {
        title: "해고 서면통지 요구",
        detail:
          "근로기준법 제27조에 따라 해고 사유와 시기가 적힌 서면 해고통지서를 요구하고 증빙을 남깁니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "해고일로부터 3개월 내 접수",
        detail:
          "해고일로부터 3개월이 지나면 구제신청을 할 수 없으므로 기한 내 관할 지방노동위원회에 신청합니다.",
        orgId: "moel",
        method: "방문문의",
      },
      {
        title: "이유서 및 증거 제출",
        detail:
          "회사의 해고 사유가 부당함을 입증하는 근로계약서, 업무 지시 내역, 메신저 대화를 제출합니다.",
        method: "온라인 접수",
      },
      {
        title: "심문회의 출석 및 판정",
        detail:
          "노동위원회 심문회의에 참석하여 부당해고 판정(원직복직 또는 임금상당액 보상)을 받습니다.",
        method: "방문문의",
      },
    ],
    ["근로계약서", "서면 해고통지서(또는 해고 통보 문자/녹취)", "출퇴근 기록", "취업규칙 사본"],
  ),
  P(
    "L003",
    "업무 중 부상 산업재해(산재) 요양신청",
    "service",
    "일하다가 다쳤거나 출퇴근 중 사고를 당했을 때 병원비와 휴업급여를 보장받는 산재보상 절차입니다.",
    ["산재", "산업재해", "휴업급여", "요양급여", "출퇴근재해", "근로복지공단"],
    ["근무 중 기계에 손을 다침", "퇴근길에 교통사고가 발생함", "사업주가 산재 처리를 기피함"],
    ["업무와 재해 간의 인과관계", "산재 지정 의료기관 여부"],
    ["comwel"],
    ["moel"],
    [
      {
        title: "산재 지정 의료기관 치료",
        detail:
          "병원 원무과 산재 담당자에게 산재 신청 의사를 밝히고 산재용 최초요양신청 소견서를 발급받습니다.",
        method: "방문문의",
      },
      {
        title: "근로복지공단에 요양급여 신청",
        detail:
          "사업주의 날인 없이도 근로자가 직접 근로복지공단(1588-0075) 토탈서비스로 신청서를 제출할 수 있습니다.",
        orgId: "comwel",
        method: "해당 사이트 문의",
      },
      {
        title: "공단 재해조사 및 승인",
        detail: "공단에서 현장 조사와 질병판정위원회 심의를 거쳐 산재 승인 여부를 결정합니다.",
        method: "온라인 접수",
      },
    ],
    ["산재 최초요양신청서", "의사 소견서(진단서)", "사고 경위서", "목격자 진술서 또는 동료 확인서"],
  ),
  P(
    "L004",
    "직장 내 괴롭힘·폭언 피해 신고 및 보호 조치",
    "service",
    "상사의 폭언, 부당한 차별, 따돌림 등 직장 내 괴롭힘 발생 시 회사와 노동청을 통해 구제받는 방법입니다.",
    ["직장내괴롭힘", "폭언", "따돌림", "근로기준법", "노동청신고"],
    ["상사가 지속적으로 인격 모독 폭언을 함", "회사에 알렸으나 오히려 불이익을 줌"],
    ["지위 또는 관계의 우위 이용 여부", "업무상 적정 범위를 넘는 행위인지"],
    ["moel"],
    ["klac"],
    [
      {
        title: "구체적 증거 일지 기록",
        detail:
          "괴롭힘 일시, 장소, 발언 내용, 목격자, 심리적 피해를 날짜순으로 녹음·메모하여 객관화합니다.",
        method: "온라인 접수",
      },
      {
        title: "회사 인사팀/대표 서면 신고",
        detail:
          "근로기준법 제76조의3에 따라 사업주에게 피해 사실을 서면 통보하고 분리 조치를 요구합니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "노동청 진정서 제출",
        detail:
          "사업주가 조사를 기피하거나 피해자에게 불이익 처우를 한 경우 관할 지방고용노동청에 신고합니다.",
        orgId: "moel",
        method: "국민신문고 문의",
      },
    ],
    ["녹음 파일 및 카카오톡 대화 캡처", "괴롭힘 피해 일지", "정신건강의학과 진료확인서"],
  ),
  P(
    "L005",
    "비자발적 퇴사 실업급여(구직급여) 수급 신청",
    "payment",
    "계약만료, 권고사직, 경영악화 폐업 등으로 퇴직했을 때 구직급여를 신청하는 공식 절차입니다.",
    ["실업급여", "구직급여", "고용보험", "계약만료", "고용센터"],
    ["1년 계약이 끝나 퇴사함", "회사 권고사직으로 퇴사했는데 실업급여를 받으려 함"],
    ["이직일 이전 18개월간 피보험 단위기간 180일 이상 충족 여부", "비자발적 이직 사유 해당 여부"],
    ["moel"],
    [],
    [
      {
        title: "이직확인서 처리 확인",
        detail:
          "전 직장에 고용보험 상실신고서와 이직확인서를 관할 근로복지공단에 제출하도록 요청합니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "워크넷 구직신청 및 동영상 시청",
        detail:
          "고용24(work24.go.kr)에 접속하여 구직신청을 하고 수급자격 신청자 온라인 교육을 이수합니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "관할 고용복지플러스센터 방문",
        detail:
          "신분증을 지참하여 거주지 관할 고용센터에 방문해 수급자격 인정 신청서를 접수합니다.",
        orgId: "moel",
        method: "방문문의",
      },
    ],
    ["신분증", "전 직장 이직확인서", "구직신청 확인증"],
  ),

  // ==========================================
  // 5. 세금·재정 (tax) - 5건
  // ==========================================
  P(
    "T001",
    "종합소득세·연말정산 과오납 환급 신청(경정청구)",
    "payment",
    "지난 5년간 누락한 소득공제나 세액공제를 소급 신청하여 세금을 돌려받는 국세청 환급 절차입니다.",
    ["경정청구", "세금환급", "종합소득세", "연말정산누락", "홈택스"],
    ["작년 연말정산 때 월세 세액공제를 빠뜨림", "중소기업 취업자 소득세 감면을 신청하지 못함"],
    ["법정 신고기한으로부터 5년 이내 여부", "원천징수영수증 발급 가능 여부"],
    ["nts"],
    [],
    [
      {
        title: "홈택스(126) 로그인",
        detail: "국세청 홈택스 웹사이트 또는 손택스 앱에 공동인증서나 간편인증으로 로그인합니다.",
        orgId: "nts",
        method: "해당 사이트 문의",
      },
      {
        title: "경정청구 메뉴 접속",
        detail: "세금신고 > 종합소득세 > 근로소득 신고 > 경정청구 메뉴를 선택합니다.",
        method: "온라인 접수",
      },
      {
        title: "누락 공제자료 입력 및 제출",
        detail:
          "빠뜨렸던 의료비, 기부금, 월세 납입증명 등 증빙 서류를 파일로 첨부하고 수정 신고서를 제출합니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "관할 세무서 처리 및 환급",
        detail:
          "세무서에서 2개월 이내에 검토하여 환급 결정을 내리고 본인 계좌로 환급금을 입금합니다.",
        method: "온라인 접수",
      },
    ],
    [
      "해당 과세연도 근로소득원천징수영수증",
      "누락 공제 증빙 서류(월세이체내역, 주민등록등본 등)",
      "환급금 수령 계좌번호",
    ],
  ),
  P(
    "T002",
    "부당한 과세처분에 대한 이의신청 및 조세심판",
    "service",
    "세무서의 세금 부과 처분이 사실과 다르거나 위법하다고 판단될 때 구제받는 불복 절차입니다.",
    ["과세불복", "이의신청", "조세심판", "세금오류", "세무서"],
    ["비과세 대상인데 과세 통지서가 날아옴", "세금 계산 기준이 잘못 적용됨"],
    ["납세고지서 수령일로부터 90일 이내 여부"],
    ["nts", "klac"],
    [],
    [
      {
        title: "고지서 수령일 확인",
        detail:
          "세법상 불복청구는 처분 통지를 받은 날로부터 90일 이내에만 제기할 수 있으므로 기한을 철저히 확인합니다.",
        method: "온라인 접수",
      },
      {
        title: "이의신청 또는 심사청구 제출",
        detail: "관할 세무서장 또는 지방국세청장에게 이의신청서를 작성하여 제출합니다.",
        orgId: "nts",
        method: "방문문의",
      },
      {
        title: "조세심판원 심판청구",
        detail:
          "이의신청이 기각되거나 곧바로 청구할 경우 국무총리 조세심판원에 심판청구서를 접수합니다.",
        method: "해당 사이트 문의",
      },
    ],
    [
      "납세고지서 사본",
      "과세전적부심사 또는 이의신청 결정서",
      "과세가 위법함을 입증하는 객관적 서류",
    ],
  ),
  P(
    "T003",
    "지방세(재산세·취득세·자동차세) 과오납 환급 신청",
    "payment",
    "자동차 매매 후 잔여 기간 자동차세나 중복 납부된 재산세를 지자체에서 돌려받는 절차입니다.",
    ["지방세환급", "위택스", "자동차세환급", "재산세", "과오납"],
    ["차량을 폐차하거나 중고로 판매했는데 선납한 자동차세 환급이 필요함"],
    ["납부자 본인 명의 계좌 및 위택스 환급금 조회 확인"],
    ["gov24"],
    [],
    [
      {
        title: "위택스(wetax.go.kr) 접속",
        detail: "지방세 포털 위택스에 로그인하여 '환급신청 > 지방세 환급금 조회'를 선택합니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "미환급금 확인 및 신청",
        detail: "조회된 과오납 내역을 확인하고 환급받을 본인 명의 계좌번호를 입력합니다.",
        method: "온라인 접수",
      },
      {
        title: "구청 세무과 유선 확인",
        detail:
          "온라인 조회가 안 될 경우 차량등록지 관할 구청 세무과로 전화하여 즉시 환급을 요청합니다.",
        method: "전화문의",
      },
    ],
    ["자동차 양도증명서 또는 말소사실증명서", "본인 통장 사본", "신분증"],
  ),
  P(
    "T004",
    "현금영수증 미발행 및 발급 거부 신고",
    "fraud",
    "현금 결제 시 영수증 발급을 거부하거나 할인을 빌미로 현금 결제를 유도한 사업자를 신고하는 절차입니다.",
    ["현금영수증", "발급거부", "탈세신고", "포상금", "홈택스"],
    ["학원비나 인테리어비를 현금으로 냈는데 영수증 발행을 거부함"],
    ["거래일로부터 5년 이내 여부", "현금 지급 사실을 입증하는 계좌이체 내역"],
    ["nts"],
    [],
    [
      {
        title: "현금 결제 입증 자료 확보",
        detail: "계좌이체 영수증, 간이영수증, 거래 상대방과의 카카오톡 대화 내역을 준비합니다.",
        method: "온라인 접수",
      },
      {
        title: "홈택스 미발행 신고 접수",
        detail:
          "홈택스(126) '상담/제보 > 현금영수증 미발행/발급거부 신고' 메뉴에서 영수증 발급을 신청합니다.",
        orgId: "nts",
        method: "해당 사이트 문의",
      },
      {
        title: "소득공제 인정 및 포상금 수령",
        detail:
          "세무서 사실 확인 후 본인 소득공제로 소급 인정되며, 요건 충족 시 포상금(거부금액의 20%)이 지급됩니다.",
        method: "온라인 접수",
      },
    ],
    ["계좌이체 확인증", "거래명세서 또는 계약서", "발급 거부 대화 녹취 또는 메시지"],
  ),
  P(
    "T005",
    "사업자 폐업 신고 및 부가가치세 확정신고 원스톱 처리",
    "service",
    "사업을 종료할 때 세무서와 구청 방문 없이 홈택스에서 폐업과 부가세 신고를 일괄 처리하는 방법입니다.",
    ["폐업신고", "부가세신고", "사업자폐업", "홈택스폐업", "원스톱폐업"],
    ["가게를 정리하고 사업자를 폐업하려 함", "세무서와 구청 인허가를 한 번에 끝내고 싶음"],
    ["폐업일이 속한 달의 말일부터 25일 이내 부가세 확정신고 의무 확인"],
    ["nts", "gov24"],
    [],
    [
      {
        title: "홈택스 폐업신고 접수",
        detail:
          "홈택스(126) '국세증명·사업자등록·세금관련 신청 > 폐업신고'에서 폐업 일자와 사유를 입력합니다.",
        orgId: "nts",
        method: "해당 사이트 문의",
      },
      {
        title: "인허가 업종 통합 폐업",
        detail:
          "음식점, 미용실 등 인허가 업종은 홈택스에서 시군구청 인허가 폐업신고서를 함께 체크하여 동시 처리합니다.",
        method: "온라인 접수",
      },
      {
        title: "부가세 및 종합소득세 확정신고",
        detail:
          "폐업일 다음 달 25일까지 폐업시 잔여재화 등을 포함하여 부가가치세 확정신고 및 납부를 마칩니다.",
        method: "해당 사이트 문의",
      },
    ],
    ["사업자등록증 원본", "폐업일 현재 매출·매입 세금계산서 합계표"],
  ),

  // ==========================================
  // 6. 사업·창업 (business) - 5건
  // ==========================================
  P(
    "B001",
    "개인사업자 등록 신청 및 통신판매업 신고",
    "service",
    "창업, 프리랜서, 온라인 쇼핑몰 운영을 위해 관할 세무서와 정부24에 사업자등록을 완료하는 방법입니다.",
    ["사업자등록", "통신판매업", "홈택스", "창업", "개인사업자"],
    ["온라인 스마트스토어를 개설하려 함", "사업자등록증과 통신판매업 신고증이 필요함"],
    ["사업 개시일로부터 20일 이내 여부", "인허가 대상 업종인지 확인"],
    ["nts", "gov24"],
    [],
    [
      {
        title: "홈택스 사업자등록 신청",
        detail:
          "국세청 홈택스(126) '신청/제출 > 사업자등록신청(개인)'에서 업종코드와 사업장 주소를 입력합니다.",
        orgId: "nts",
        method: "해당 사이트 문의",
      },
      {
        title: "사업자등록증 발급",
        detail: "관할 세무서 승인 후(보통 1~3일) 홈택스에서 사업자등록증을 무료 출력합니다.",
        method: "온라인 접수",
      },
      {
        title: "구매안전서비스 이용확인증 발급",
        detail: "은행 또는 입점 오픈마켓에서 에스크로 구매안전서비스 확인증을 발급받습니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "정부24 통신판매업 신고",
        detail:
          "정부24(1588-2188)에서 구매안전서비스 확인증을 첨부하여 통신판매업 신고를 마칩니다.",
        orgId: "gov24",
        method: "해당 사이트 문의",
      },
    ],
    [
      "대표자 신분증",
      "임대차계약서(사업장을 임차한 경우)",
      "구매안전서비스 이용확인증(통신판매업)",
      "인허가증 사본(해당 업종)",
    ],
  ),
  P(
    "B002",
    "소상공인 정책자금 및 저금리 경영안정지원금 신청",
    "payment",
    "경영 애로를 겪는 영세 소상공인과 자영업자를 위한 저금리 정부 정책자금 지원 신청 경로입니다.",
    ["소상공인", "정책자금", "경영안정자금", "1357", "소상공인시장진흥공단"],
    ["고금리 대출을 저금리 정책자금으로 대환하고 싶음", "운전자금이 부족해 저리 대출이 필요함"],
    ["소상공인 기준(상시근로자 5인 미만 등) 충족 여부", "국세 및 지방세 체납이 없는지"],
    ["mss1357"],
    [],
    [
      {
        title: "자격 요건 및 지원 공고 확인",
        detail:
          "소상공인정책자금 홈페이지나 1357 통합콜센터에서 신청 가능한 자금 유형을 확인합니다.",
        orgId: "mss1357",
        method: "전화문의",
      },
      {
        title: "정책자금 지원대상 확인서 발급",
        detail:
          "소상공인시장진흥공단 포털에서 온라인으로 자격 확인 신청서를 접수하고 확인서를 발급받습니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "신용보증재단 보증서 발급",
        detail: "지역신용보증재단에 방문하거나 온라인으로 특례보증 신청을 진행합니다.",
        method: "방문문의",
      },
      {
        title: "은행 대출 약정",
        detail: "보증서 발급 후 협약 시중은행에서 최종 저금리 대출 약정을 체결합니다.",
        method: "방문문의",
      },
    ],
    [
      "사업자등록증명원",
      "부가가치세 과세표준증명원",
      "국세 및 지방세 납세증명서",
      "사업장 임대차계약서",
    ],
  ),
  P(
    "B003",
    "프랜차이즈 가맹본부 불공정거래(갑질) 분쟁조정",
    "service",
    "가맹본부(본사)의 일방적 필수품목 강요, 예상매출액 과장 제공, 부당한 계약 해지에 대응하는 절차입니다.",
    ["가맹분쟁", "프랜차이즈", "가맹본부갑질", "한국공정거래조정원", "필수물품"],
    [
      "가맹본부가 시중보다 2배 비싼 물품 구매를 강제함",
      "계약 전 서면 약속과 다른 인테리어 비용을 요구함",
    ],
    ["가맹사업법상 정보공개서 제공 후 14일 경과 후 가맹금 수령 여부"],
    ["kfair"],
    [],
    [
      {
        title: "가맹계약서 및 거래 내역 보존",
        detail: "최초 교부받은 정보공개서, 가맹계약서, 필수물품 납품 영수증, 본사 공문을 모읍니다.",
        method: "온라인 접수",
      },
      {
        title: "한국공정거래조정원(1588-1490) 상담",
        detail: "공정거래조정원에 연락하여 본사 행위의 가맹사업법 위반 소지를 검토받습니다.",
        orgId: "kfair",
        method: "전화문의",
      },
      {
        title: "가맹사업거래 분쟁조정 신청",
        detail:
          "조정원 온라인 포털에서 분쟁조정신청서를 제출하고 조정을 통해 손해배상이나 위약금 감면을 받습니다.",
        orgId: "kfair",
        method: "해당 사이트 문의",
      },
    ],
    ["가맹계약서", "정보공개서", "가맹금 예치증 또는 입금 내역", "본사의 부당한 지시 공문/문자"],
  ),
  P(
    "B004",
    "하도급 대금 미지급 및 부당 감액 분쟁 해결",
    "payment",
    "원청업체(원사업자)가 물품 납품 후 대금을 지급하지 않거나 부당하게 납품단가를 깎았을 때 대금을 회수하는 방법입니다.",
    ["하도급", "대금미지급", "하도급법", "공정거래조정원", "단가후려치기"],
    [
      "납품이 끝난 지 60일이 지났는데 원청이 결제를 미룸",
      "발주서도 없이 구두로 추가 작업을 시키고 돈을 안 줌",
    ],
    ["물품수령일로부터 60일 이내 대금 지급 의무 위반 여부", "서면 계약서 미발급 여부"],
    ["kfair"],
    [],
    [
      {
        title: "납품 및 검수 완료 증빙 확보",
        detail: "세금계산서, 납품확인서, 인수증, 원청과의 납품 확인 이메일을 준비합니다.",
        method: "온라인 접수",
      },
      {
        title: "하도급분쟁조정 신청",
        detail: "한국공정거래조정원(1588-1490) 하도급분쟁조정협의회에 조정을 신청합니다.",
        orgId: "kfair",
        method: "해당 사이트 문의",
      },
      {
        title: "공정거래위원회 신고",
        detail: "원사업자가 조정에 불응하면 공정거래위원회에 하도급법 위반 혐의로 정식 제소합니다.",
        method: "국민신문고 문의",
      },
    ],
    ["하도급 계약서(또는 발주서)", "납품확인서(검수증)", "세금계산서 사본", "대금 독촉 내용증명"],
  ),
  P(
    "B005",
    "노란우산공제 폐업 공제금 지급 청구",
    "payment",
    "소상공인이 폐업했을 때 압류 방지 통장으로 그동안 납입한 원금과 복리이자를 즉시 지급받는 절차입니다.",
    ["노란우산공제", "폐업공제금", "소상공인퇴직금", "중소기업중앙회"],
    ["가게를 폐업하게 되어 노란우산공제 적립금을 수령하려 함"],
    ["국세청에 사업자 폐업 신고가 완료되었는지 확인"],
    ["kotech"],
    [],
    [
      {
        title: "국세청 폐업신고 완료",
        detail: "홈택스에서 폐업신고를 마치고 '폐업사실증명원'을 발급받습니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "노란우산공제(1666-9988) 사이트 접속",
        detail: "노란우산 홈페이지(8899.or.kr) 또는 모바일 앱에 공동인증서로 로그인합니다.",
        orgId: "kotech",
        method: "해당 사이트 문의",
      },
      {
        title: "공제금 지급 온라인 청구",
        detail:
          "폐업사실증명원을 첨부하고 본인 명의 수령 계좌(행복지킴이 압류방지통장 가능)를 입력하여 즉시 수령합니다.",
        method: "온라인 접수",
      },
    ],
    ["폐업사실증명원(세무서)", "신분증 사본", "공제금 수령 통장 사본"],
  ),

  // ==========================================
  // 7. 행정·정부서비스 (government) - 5건
  // ==========================================
  P(
    "V001",
    "주민등록표 등·초본 및 필수 행정증명서 온라인 무료 발급",
    "service",
    "주민센터 방문 없이 PC나 스마트폰으로 공공 증명서를 즉시 무료 발급받는 방법입니다.",
    ["정부24", "주민등록등본", "초본", "증명서발급", "가족관계증명서"],
    ["은행이나 관공서 제출용 주민등록등본이 급히 필요함"],
    ["본인인증 수단(간편인증, 금융인증서, 공동인증서) 보유 여부"],
    ["gov24"],
    [],
    [
      {
        title: "정부24 접속 및 로그인",
        detail: "정부24(1588-2188) 웹사이트 또는 모바일 앱에 접속해 간편인증으로 로그인합니다.",
        orgId: "gov24",
        method: "해당 사이트 문의",
      },
      {
        title: "자주 찾는 서비스 선택",
        detail: "메인 화면에서 '주민등록표등본(초본)' 메뉴를 클릭합니다.",
        method: "온라인 접수",
      },
      {
        title: "발급 형태 및 수령 방법 지정",
        detail:
          "과거 주소 변동, 주민번호 뒷자리 표시 여부를 선택하고 온라인 발급(본인 출력 또는 PDF 저장)을 지정합니다.",
        method: "온라인 접수",
      },
      {
        title: "즉시 출력 및 전자문서지갑 전송",
        detail:
          "신청 즉시 수수료 0원으로 PDF 다운로드하거나 정부 전자문서지갑으로 바로 전송합니다.",
        method: "해당 사이트 문의",
      },
    ],
    ["간편인증 또는 공동/금융인증서"],
  ),
  P(
    "V002",
    "행정청의 위법·부당한 행정처분에 대한 행정심판 청구",
    "service",
    "영업정지, 면허취소 등 관공서의 처분으로 권리를 침해당했을 때 비용 없이 신속히 구제받는 행정심판 절차입니다.",
    ["행정심판", "영업정지", "면허취소", "행정처분", "국민권익위원회"],
    ["식품위생법 위반으로 과도한 영업정지 처분을 받음", "처분이 부당하다고 판단됨"],
    ["처분이 있음을 안 날로부터 90일 이내 여부"],
    ["epeople", "gov24"],
    [],
    [
      {
        title: "처분서 수령 및 불복 기한 확인",
        detail: "행정처분서 송달일로부터 90일 이내에 청구해야 하므로 송달 날짜를 확인합니다.",
        method: "온라인 접수",
      },
      {
        title: "온라인행정심판 시스템 접속",
        detail: "국민권익위원회 온라인행정심판(110) 포털에 접속합니다.",
        orgId: "epeople",
        method: "해당 사이트 문의",
      },
      {
        title: "청구서 및 집행정지 신청",
        detail:
          "처분의 위법성과 가혹성을 기재하고, 판결 전까지 처분 효력을 멈추는 집행정지를 함께 신청합니다.",
        method: "국민신문고 문의",
      },
    ],
    ["행정처분서 사본", "행정심판 청구서", "처분의 위법성을 입증하는 증거자료"],
  ),
  P(
    "V003",
    "위기 가구 긴급복지지원 생계비·의료비 긴급 신청",
    "service",
    "주 소득자의 사망, 중한 질병, 실직 등으로 갑작스러운 생계 위기에 처했을 때 정부 긴급구호를 받는 절차입니다.",
    ["긴급복지", "긴급생계비", "의료비지원", "129", "위기가구"],
    ["가장의 실직과 질병으로 당장 월세와 병원비를 낼 수 없음", "단전, 단수가 우려됨"],
    ["소득 기준(기준 중위소득 75% 이하) 및 재산 기준 충족 여부"],
    ["bokji129"],
    [],
    [
      {
        title: "보건복지상담센터(129) 24시간 전화",
        detail: "국번없이 129로 전화하여 현재 위기 상황을 설명하고 긴급구호 상담을 요청합니다.",
        orgId: "bokji129",
        method: "전화문의",
      },
      {
        title: "주민센터 복지팀 긴급 신청",
        detail:
          "거주지 읍·면·동 행정복지센터를 직접 방문하거나 담당 공무원의 긴급 가정방문을 요청합니다.",
        method: "방문문의",
      },
      {
        title: "선지원 후조사 원칙 지원",
        detail:
          "법정 기준에 따라 현장 확인 후 48시간 이내에 생계비(1인 가구 약 71만원)나 의료비(최대 300만원)를 우선 지원받습니다.",
        method: "온라인 접수",
      },
    ],
    [
      "신분증",
      "진단서 또는 입원확인서(의료비 지원 시)",
      "실직/폐업 확인 서류",
      "금융정보제공동의서",
    ],
  ),
  P(
    "V004",
    "공공기관 보조금 부정수급 및 예산낭비 신고",
    "fraud",
    "나랏돈(정부지원금, 청년수당, 복지보조금 등)을 속여서 타낸 행위를 국민권익위원회에 고발하는 절차입니다.",
    ["부정수급", "보조금비리", "청렴포털", "1398", "예산낭비"],
    [
      "가짜 직원을 등록해 일자리 지원금을 타내는 사업주를 목격함",
      "정부 연구개발비를 사적으로 횡령함",
    ],
    ["부정수급을 입증할 객관적 증거 자료 보존 여부"],
    ["epeople"],
    [],
    [
      {
        title: "부정행위 증거자료 수집",
        detail: "허위 출근부, 통장 차명 거래 내역서, 허위 세금계산서 등 구체적 증빙을 정리합니다.",
        method: "온라인 접수",
      },
      {
        title: "청렴포털(clean.go.kr) 온라인 접수",
        detail:
          "국민권익위원회 청렴포털 복지·보조금 부정신고 메뉴에서 익명 또는 실명으로 접수합니다.",
        orgId: "epeople",
        method: "해당 사이트 문의",
      },
      {
        title: "1398 무료 전화상담",
        detail:
          "부패·공익신고 상담전화 1398로 전화하여 신고 절차와 신고자 보호 조치를 안내받습니다.",
        method: "전화문의",
      },
    ],
    ["부정수급 증빙 서류(계약서, 계좌내역 등)", "신고서(행위자, 부정수급 금액, 수법 기재)"],
  ),
  P(
    "V005",
    "공공기관 정보공개 청구 및 비공개 처분 이의신청",
    "service",
    "국가기관, 지자체, 공기업이 보유한 정책 자료, 회의록, 예산 집행 내역을 국민의 권리로 열람하는 절차입니다.",
    ["정보공개청구", "정보공개포털", "알권리", "비공개이의신청", "회의록열람"],
    [
      "우리 동네 재개발 인허가 회의록을 열람하고 싶음",
      "경찰 수사기록이나 구청 심의 서류를 확인하고 싶음",
    ],
    ["공공기관의 정보공개에 관한 법률상 비공개 대상 정보(개인정보, 국가안보 등) 여부"],
    ["gov24", "epeople"],
    [],
    [
      {
        title: "정보공개포털(open.go.kr) 접속",
        detail: "대한민국 정보공개포털에 회원가입 후 '청구신청' 메뉴를 누릅니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "소관 기관 및 대상 정보 지정",
        detail:
          "정보를 보유한 기관을 선택하고 정보의 명칭과 공개 방법을 명확히 적어 청구서를 냅니다.",
        method: "온라인 접수",
      },
      {
        title: "10일 이내 공개 결정 수신",
        detail:
          "법정 10일 이내에 공개/비공개 결정을 통지받으며, 부당한 비공개 시 30일 이내 이의신청을 제기합니다.",
        method: "국민신문고 문의",
      },
    ],
    ["정보공개청구서", "본인 확인 간편인증"],
  ),

  // ==========================================
  // 8. 법률·분쟁 (legal) - 5건
  // ==========================================
  P(
    "J001",
    "대여금·물품대금 미변제에 대한 법원 지급명령 신청",
    "payment",
    "소송보다 빠르고 저렴하게 법원을 통해 강제집행 권원(판결문과 동일)을 얻는 간이 독촉 절차입니다.",
    ["지급명령", "빌려준돈", "대여금", "전자소송", "독촉절차", "채권추심"],
    ["지인에게 돈을 빌려줬는데 갚지 않음", "물품 대금을 몇 달째 받지 못함"],
    [
      "상대방의 이름, 주민등록번호 또는 명확한 주소 확인 가능 여부",
      "상대방이 채무 자체를 다투지 않는지 여부",
    ],
    ["klac"],
    [],
    [
      {
        title: "차용증 및 입금 내역 정리",
        detail: "돈을 빌려준 사실을 증명하는 차용증, 카카오톡 대화, 은행 이체 확인증을 준비합니다.",
        method: "온라인 접수",
      },
      {
        title: "대법원 전자소송 접속",
        detail:
          "대법원 전자소송(1599-8080)에 접속하여 '서류제출 > 민사 서류 > 지급명령신청서'를 선택합니다.",
        orgId: "klac",
        method: "해당 사이트 문의",
      },
      {
        title: "신청서 작성 및 인지대 납부",
        detail:
          "청구 취지와 청구 원인을 기재하고 통상 소송 인지대의 1/10에 해당하는 비용을 납부합니다.",
        method: "온라인 접수",
      },
      {
        title: "2주 이내 이의 없으면 확정",
        detail:
          "채무자가 지급명령 정본을 송달받은 후 2주 이내에 이의신청을 하지 않으면 확정 판결과 동일한 효력을 얻습니다.",
        method: "방문문의",
      },
    ],
    [
      "차용증 또는 지불각서",
      "은행 송금 내역서",
      "독촉 문자/메신저 캡처",
      "채무자 주민등록초본(법원 보정명령 후 발급)",
    ],
  ),
  P(
    "J002",
    "취약계층 무료 법률상담 및 소송대리 지원",
    "service",
    "경제적 사정으로 변호사 선임이 어려운 국민을 위한 대한법률구조공단의 무료 법률구조 절차입니다.",
    ["법률구조", "무료변호사", "법률상담", "대한법률구조공단", "132"],
    [
      "법적 분쟁이 생겼는데 변호사 선임 비용이 없음",
      "기초수급자, 차상위계층 또는 중위소득 기준 대상자임",
    ],
    ["공단 법률구조 대상 소득 기준(기준 중위소득 125% 이하 등) 충족 여부"],
    ["klac"],
    [],
    [
      {
        title: "132 전화 또는 온라인 예약",
        detail:
          "국번없이 132 또는 대한법률구조공단 웹사이트에서 가까운 지부 방문 상담을 예약합니다.",
        orgId: "klac",
        method: "전화문의",
      },
      {
        title: "공단 지부 방문 상담",
        detail:
          "예약일에 사건 관련 서류와 신분증을 지참하여 전문 공익법무관·변호사와 1:1 상담을 진행합니다.",
        method: "방문문의",
      },
      {
        title: "소송구조 신청",
        detail:
          "승소 가능성이 있고 대상자 기준을 충족하면 공단 전담 변호사가 소송대리인으로 선임되어 재판을 진행합니다.",
        method: "온라인 접수",
      },
    ],
    [
      "주민등록등본",
      "소득증빙서류(건강보험료 납부확인서, 수급자증명서 등)",
      "사건 관련 계약서 및 증거서류",
    ],
  ),
  P(
    "J003",
    "3,000만원 이하 소액사건 민사 나홀로소송 제기",
    "payment",
    "상대방이 빚이나 손해배상금을 주지 않고 이의신청을 제기할 때 소액사건심판법으로 신속히 재판을 받는 경로입니다.",
    ["소액소송", "나홀로소송", "소장작성", "민사소송", "전자소송"],
    ["떼인 돈이 1,000만원인데 변호사 비용이 부담스러움", "지급명령에 상대방이 이의신청을 제기함"],
    ["소송 청구 금액이 3,000만원 이하인지 확인", "피고의 인적사항(이름, 주민번호, 주소)"],
    ["klac"],
    [],
    [
      {
        title: "대법원 전자소송 소장 작성",
        detail:
          "대법원 전자소송 사이트에서 '민사소장'을 작성하고 청구원인과 입증자료를 제출합니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "이행권고결정 통지",
        detail:
          "법원에서 변론 없이 피고에게 이행권고결정을 보내며, 피고가 2주 내 이의하지 않으면 확정됩니다.",
        method: "온라인 접수",
      },
      {
        title: "변론기일 출석 (1회 심리 원칙)",
        detail: "피고가 이의하면 1회 변론기일에 원고 본인이 직접 법원에 출석하여 판결을 받습니다.",
        method: "방문문의",
      },
    ],
    ["민사 소장", "입증 서류(차용증, 이체증, 계약서)", "송달료 및 인지대 납부 영수증"],
  ),
  P(
    "J004",
    "미지급 양육비 청구 및 이행확보 지원 신청",
    "payment",
    "이혼 후 전 배우자가 양육비를 지급하지 않을 때 국가 기관을 통해 법적 청구 및 신상공개를 진행하는 방법입니다.",
    ["양육비미지급", "양육비이행관리원", "감치명령", "양육비직접지급", "운전면허정지"],
    ["이혼 판결문이 있는데도 몇 년째 양육비를 1원도 주지 않음", "연락처를 바꾸고 도망감"],
    ["이혼 판결문, 양육비부담조서 등 집행권원 확보 여부"],
    ["childsupport", "klac"],
    [],
    [
      {
        title: "양육비이행관리원(1644-6621) 상담",
        detail: "양육비이행관리원에 온라인 또는 전화로 양육비 이행지원 신청서를 제출합니다.",
        orgId: "childsupport",
        method: "해당 사이트 문의",
      },
      {
        title: "양육비 직접지급명령 신청",
        detail: "상대방 직장 급여에서 양육비를 원천공제하도록 법원에 직접지급명령을 신청합니다.",
        method: "온라인 접수",
      },
      {
        title: "제재조치(출국금지/면허정지) 신청",
        detail:
          "정당한 사유 없이 3기 이상 미지급 시 감치명령, 출국금지, 운전면허 정지, 명단공개를 요청합니다.",
        method: "방문문의",
      },
    ],
    ["이혼판결문 또는 양육비부담조서", "혼인관계증명서(상세)", "양육비 미지급 내역 정리표"],
  ),
  P(
    "J005",
    "강력범죄·성범죄 피해자 법률구조 및 심리지원",
    "service",
    "폭행, 상해, 성폭력 등 범죄 피해를 당했을 때 국선변호사 지원과 심리 치료, 치료비 지원을 받는 경로입니다.",
    ["범죄피해자", "피해자지원센터", "스마일센터", "국선변호사", "치료비지원"],
    ["범죄 피해를 입어 고소장을 내야 하는데 보복이 두려움", "신체적·정신적 치료비 마련이 막막함"],
    ["경찰 신고 접수 여부 및 피해 사실 확인"],
    ["police", "klac"],
    [],
    [
      {
        title: "경찰서 피해자전담경찰관 연계",
        detail:
          "경찰서 사건 접수 시 '피해자전담경찰관'에게 신변보호(스마트워치, 안전숙소)를 즉시 요청합니다.",
        orgId: "police",
        method: "방문문의",
      },
      {
        title: "스마일센터(1577-1295) 심리지원",
        detail:
          "법무부 범죄피해자 트라우마 전문치유기관 스마일센터에서 무료 심리상담과 임시 주거를 지원받습니다.",
        method: "전화문의",
      },
      {
        title: "피해자 국선변호사 선임",
        detail:
          "성범죄, 아동학대 등의 경우 수사 단계부터 국선변호사를 무료 선임하여 진술 조력과 합의를 대행합니다.",
        method: "방문문의",
      },
    ],
    ["사건접수확인원", "병원 상해진단서", "치료비 영수증"],
  ),

  // ==========================================
  // 9. 교육·자격 (education) - 5건
  // ==========================================
  P(
    "E001",
    "대학생 국가장학금 및 학자금 지원 신청",
    "payment",
    "대학생의 등록금 부담 완화를 위해 한국장학재단에서 소득구간별로 장학금을 지원하는 절차입니다.",
    ["국가장학금", "한국장학재단", "학자금대출", "소득구간", "등록금"],
    ["대학 등록금 마련이 부담스러움", "소득구간에 따른 국가장학금 1유형 신청이 필요함"],
    [
      "한국장학재단 지정 정기 신청 기간 확인",
      "직전 학기 성적 기준(12학점 이수, 80점 이상) 충족 여부",
    ],
    ["kosaf"],
    [],
    [
      {
        title: "장학재단 포털 또는 앱 접속",
        detail: "한국장학재단(1599-2000) 공식 홈페이지 또는 모바일 앱에 전자서명으로 로그인합니다.",
        orgId: "kosaf",
        method: "해당 사이트 문의",
      },
      {
        title: "국가장학금 신청서 작성",
        detail: "소속 대학, 학과, 학번, 가족 정보를 정확하게 입력하고 신청서를 제출합니다.",
        method: "온라인 접수",
      },
      {
        title: "가구원 정보제공 동의",
        detail:
          "소득구간 산정을 위해 부모(미혼) 또는 배우자(기혼)가 공동인증서 등으로 정보제공 동의를 완료해야 합니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "심사 결과 및 등록금 감면 확인",
        detail: "소득구간 심사가 완료되면 대학 등록금 고지서에서 장학금액이 우선 감면 처리됩니다.",
        method: "온라인 접수",
      },
    ],
    ["본인 및 가구원 전자서명 수단", "가족관계증명서(필요시 장학재단 제출 요청 수신 시)"],
  ),
  P(
    "E002",
    "국가기술자격 시험 접수 및 자격증 발급",
    "service",
    "정보처리기사, 한식조리기능사 등 국가기술자격 시험에 응시하고 자격증을 발급받는 공식 절차입니다.",
    ["큐넷", "QNet", "국가기술자격", "자격증발급", "한국산업인력공단"],
    ["국가기술자격 시험 원서접수일정을 확인함", "자격증을 분실하여 재발급이 필요함"],
    ["응시하려는 종목의 응시 자격(관련 전공 학위, 실무 경력 등) 충족 여부"],
    ["hrdkorea"],
    [],
    [
      {
        title: "Q-Net 회원가입 및 일정 확인",
        detail: "한국산업인력공단 큐넷(1644-8000)에서 연간 시험일정과 원서접수 기간을 확인합니다.",
        orgId: "hrdkorea",
        method: "해당 사이트 문의",
      },
      {
        title: "원서접수 및 시험장 선택",
        detail:
          "접수 첫날 오전에 원하는 지역의 시험장을 선택하고 수수료를 결제하여 접수증을 출력합니다.",
        method: "온라인 접수",
      },
      {
        title: "합격자 발표 후 자격증 신청",
        detail:
          "최종 합격 후 Q-Net에서 상장형 자격증을 즉시 무료 출력하거나 수첩형 자격증을 우편 신청합니다.",
        method: "해당 사이트 문의",
      },
    ],
    ["신분증", "증명사진 파일", "응시자격 서류(졸업증명서, 경력증명서 등)"],
  ),
  P(
    "E003",
    "평생교육바우처(연 35만원 교육비) 지원 신청",
    "payment",
    "취약계층 성인이 자격증, 어학, 취미 등 자기개발 교육을 받을 수 있도록 연간 35만원을 지원하는 정부 바우처입니다.",
    ["평생교육바우처", "평생바우처", "자기개발", "교육지원금", "국가평생교육진흥원"],
    ["자격증 취득 학원비가 부담스러움", "기초수급자나 차상위계층에 해당함"],
    ["19세 이상 성인 중 기초생활수급자, 차상위계층, 기준 중위소득 65% 이하 해당 여부"],
    ["gov24"],
    [],
    [
      {
        title: "평생교육바우처 포털 접속",
        detail: "바우처 홈페이지(lllcard.kr)에 접속하여 연초 정기 공고를 확인합니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "온라인 자격 확인 및 신청",
        detail:
          "간편인증으로 로그인하여 수급자격 증명 시스템을 통해 자격을 확인하고 신청서를 냅니다.",
        method: "온라인 접수",
      },
      {
        title: "NH농협 평생교육희망카드 발급",
        detail: "선정 통보를 받은 후 전용 체크카드를 발급받아 등록된 교육기관에서 결제합니다.",
        method: "방문문의",
      },
    ],
    ["신분증", "기초수급자증명서 또는 건강보험료 납부확인서"],
  ),
  P(
    "E004",
    "입시·어학 학원 수강료 환불 거부 및 위약금 분쟁",
    "payment",
    "학원을 중도에 그만둘 때 학원법상 법정 반환 기준에 따라 잔여 수강료를 환불받는 방법입니다.",
    ["학원환불", "학원법", "수강료환불", "교육지원청", "교습비반환"],
    ["개인 사정으로 학원을 그만두려는데 학원 자체 규정을 대며 환불을 전액 거부함"],
    ["학원의 설립·운영 및 과외교습에 관한 법률상 교습 시작 전·후 반환 기준 확인"],
    ["ccn"],
    ["epeople"],
    [
      {
        title: "법정 반환 기준 계산",
        detail:
          "학원법 시행령 제18조에 따라 총 교습시간의 1/3 경과 전은 2/3 반환, 1/2 경과 전은 1/2 반환 원칙을 학원에 통보합니다.",
        method: "방문문의",
      },
      {
        title: "1372 소비자상담센터 중재",
        detail: "학원이 법령 준수를 거부하면 1372로 전화하여 공식 피해구제 절차를 밟습니다.",
        orgId: "ccn",
        method: "전화문의",
      },
      {
        title: "관할 교육지원청 행정지도 신고",
        detail:
          "국민신문고(110)를 통해 관할 교육지원청 평생교육건강과에 학원법 위반 행정처분을 요구합니다.",
        orgId: "epeople",
        method: "국민신문고 문의",
      },
    ],
    ["수강 등록 영수증", "수강증 사본", "학원 환불 규정 사진", "환불 거부 대화 녹취/문자"],
  ),
  P(
    "E005",
    "국민내일배움카드(최대 500만원 직업훈련비) 발급",
    "payment",
    "구직자, 재직자, 프리랜서의 취업 역량 강화를 위해 고용노동부에서 훈련비를 국비 지원하는 제도입니다.",
    ["내일배움카드", "국비지원", "직업훈련", "고용24", "취업준비"],
    ["코딩, 디자인, 제과제빵 등 직업 훈련을 국비로 배우고 싶음"],
    ["공무원, 사립학교 교직원, 대기업 고소득자 등 지원 제외 대상이 아닌지 확인"],
    ["moel"],
    [],
    [
      {
        title: "고용24(work24.go.kr) 접속",
        detail: "고용24 포털에 로그인하여 국민내일배움카드 발급 신청 메뉴를 누릅니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "안내 동영상 시청 및 카드 신청",
        detail:
          "기본 교육 영상을 시청하고 카드 발급 은행(신한 또는 농협)을 지정하여 신청서를 작성합니다.",
        method: "온라인 접수",
      },
      {
        title: "훈련과정 수강신청 및 지원금 사용",
        detail:
          "카드 수령 후 원하는 국비지원 훈련 과정을 고용24에서 수강 신청하여 자부담금만 결제합니다.",
        orgId: "moel",
        method: "해당 사이트 문의",
      },
    ],
    ["신분증", "최종 학력 증명서", "소득 확인 서류(자영업자의 경우 부가세증명)"],
  ),

  // ==========================================
  // 10. 안전·환경·보건 (safety) - 5건
  // ==========================================
  P(
    "S001",
    "도로 파손·포트홀 등 생활안전 위험요소 신고",
    "service",
    "도로의 깊은 구멍(포트홀), 시설물 붕괴 위험, 불법주정차 등 일상 속 안전 위협을 신속히 지자체에 조치하도록 요청하는 방법입니다.",
    ["안전신문고", "포트홀", "도로파손", "위험시설", "생활안전"],
    [
      "도로에 큰 포트홀이 있어 사고 위험이 높음",
      "공공 시설물이 파손되어 보행자가 다칠 위험이 있음",
    ],
    ["정확한 위치 정보(도로명 주소, 주변 지형지물) 확인"],
    ["safetyreport"],
    ["epeople"],
    [
      {
        title: "위험 현장 사진 촬영",
        detail:
          "안전신문고 앱을 켜고 현장의 위험 요소를 원경 1장, 근경 1장 이상 선명하게 촬영합니다.",
        method: "온라인 접수",
      },
      {
        title: "안전신문고 앱 접속",
        detail: "행정안전부 안전신문고(1600-8172) 앱에서 '안전신고' 유형을 선택합니다.",
        orgId: "safetyreport",
        method: "해당 사이트 문의",
      },
      {
        title: "위치 지정 및 내용 제출",
        detail:
          "GPS 또는 지도에서 정확한 발생 위치를 지정하고 상세한 위험 내용을 작성하여 제출합니다.",
        method: "온라인 접수",
      },
      {
        title: "지자체 보수 조치 결과 수신",
        detail:
          "관할 지자체 담당 부서로 자동 이송되어 수일 내에 현장 보수 결과 및 사진을 알림톡으로 확인합니다.",
        method: "온라인 접수",
      },
    ],
    ["현장 사진 2장 이상", "정확한 위치 정보"],
  ),
  P(
    "S002",
    "공사장 소음·분진 등 생활 환경오염 피해 신고",
    "service",
    "인근 공사장의 과도한 소음, 진동, 비산먼지로 일상생활 피해를 입었을 때 지자체에 행정지도를 요청하는 절차입니다.",
    ["공사장소음", "환경신문고", "비산먼지", "소음피해", "128"],
    ["이른 아침이나 주말에 심한 공사 소음으로 잠을 잘 수 없음", "공사장 먼지가 집 안으로 들어옴"],
    ["소음 발생 시간대 및 지속성 기록 여부"],
    ["safetyreport", "epeople"],
    [],
    [
      {
        title: "소음 발생 일자 및 시간 기록",
        detail:
          "소음이 심하게 발생하는 시간대와 지속 시간을 스마트폰 동영상이나 녹음으로 기록합니다.",
        method: "온라인 접수",
      },
      {
        title: "환경신문고(128) 또는 안전신문고 신고",
        detail:
          "국번없이 128 또는 안전신문고 앱 환경신고 메뉴를 통해 관할 구청 환경과에 신고합니다.",
        orgId: "safetyreport",
        method: "전화문의",
      },
      {
        title: "구청 공무원 현장 소음 측정",
        detail: "지자체 단속 공무원이 현장에 방문하여 소음 측정기로 기준치 초과 여부를 측정합니다.",
        method: "방문문의",
      },
      {
        title: "시정명령 또는 과태료 처분 확인",
        detail:
          "기준치를 초과할 경우 지자체에서 방음벽 설치 명령, 특정 장비 사용 금지, 과태료 부과 처분을 진행합니다.",
        method: "온라인 접수",
      },
    ],
    ["소음·분진 현장 동영상/사진", "일자별 발생 기록표"],
  ),
  P(
    "S003",
    "음식물 내 이물질 혼입 및 부정·불량식품 신고",
    "service",
    "배달 음식이나 가공식품에서 벌레, 금속 등 이물질이 발견되었을 때 식약처와 구청 위생과에 신고하는 방법입니다.",
    ["불량식품", "식품이물", "식약처", "1399", "위생불량"],
    ["배달시킨 음식에서 벌레나 플라스틱 조각이 나옴", "유통기한이 지난 음식을 판매함"],
    ["이물질 실물 및 음식물 원형 보존 여부"],
    ["food1399"],
    ["ccn"],
    [
      {
        title: "이물질 및 원형 상태 보존",
        detail:
          "이물질을 버리지 말고 밀폐용기에 보관하며, 음식물 전체와 영수증을 사진으로 남깁니다.",
        method: "온라인 접수",
      },
      {
        title: "1399 불량식품 신고센터 전화",
        detail:
          "국번없이 1399로 전화하거나 식품안전나라(foodsafetykorea.go.kr)에 접속하여 신고합니다.",
        orgId: "food1399",
        method: "전화문의",
      },
      {
        title: "지자체 위생과 현장 위생점검",
        detail:
          "신고 접수 후 지자체 위생과 공무원이 해당 식당을 불시 점검하여 이물 조사 및 시정명령을 내립니다.",
        method: "방문문의",
      },
    ],
    ["음식물 및 이물질 사진/실물", "결제 영수증", "포장 용기 사진"],
  ),
  P(
    "S004",
    "자동차 제작 결함·리콜 및 안전 하자 신고",
    "service",
    "주행 중 시동 꺼짐, 에어백 미전개 등 차량의 중대한 제작 결함이 의심될 때 교통안전공단에 조사를 요청하는 절차입니다.",
    ["자동차리콜", "차량결함", "급발진", "시동꺼짐", "교통안전공단"],
    ["주행 중 갑자기 동력이 상실됨", "동일 차종에서 같은 고장이 반복적으로 발생함"],
    ["자동차 등록번호 및 정비센터 점검 내역서"],
    ["car119"],
    [],
    [
      {
        title: "결함 현상 블랙박스/계기판 기록",
        detail: "오류 경고등, 이상 증상 발생 순간의 블랙박스 영상이나 계기판 화면을 촬영합니다.",
        method: "온라인 접수",
      },
      {
        title: "자동차리콜센터(car.go.kr) 결함 신고",
        detail: "국토교통부 자동차리콜센터(080-357-2500)에 온라인으로 차량 결함 내용을 등록합니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "공단 제작결함 조사 및 무상 리콜",
        detail:
          "안전 기준 위반 가능성이 높다고 판단되면 교통안전공단 조사를 거쳐 제조사에 무상 리콜 명령이 내려집니다.",
        method: "전화문의",
      },
    ],
    ["자동차등록증", "서비스센터 점검 정비명세서", "결함 영상 및 사진"],
  ),
  P(
    "S005",
    "감염병 의심 증상 문의 및 보건소 공중보건 상담",
    "service",
    "법정 감염병(코로나19, 결핵, 홍역, 수두 등) 의심 증상이 있거나 해외 입국 후 증상이 있을 때 대처 방법입니다.",
    ["감염병", "질병관리청", "1339", "보건소", "역학조사"],
    ["해외 여행 후 고열과 발진 증상이 나타남", "결핵 확진자와 밀접 접촉함"],
    ["의심 증상 발현 시점 및 방문 국가 기록"],
    ["kdca"],
    [],
    [
      {
        title: "질병관리청 1339 콜센터 24시간 상담",
        detail:
          "국번없이 1339로 전화하여 해외 여행 이력과 현재 증상을 알리고 격리 필요 여부를 상담합니다.",
        orgId: "kdca",
        method: "전화문의",
      },
      {
        title: "관할 보건소 선별진료 안내",
        detail:
          "상담원 안내에 따라 대중교통 이용을 자제하고 마스크를 착용한 뒤 지정 보건소 또는 선별진료소를 방문합니다.",
        method: "방문문의",
      },
      {
        title: "무료 검사 및 치료 연계",
        detail: "법정 감염병 의심 환자로 분류 시 검사비와 격리 치료비에 대해 국비 지원을 받습니다.",
        method: "온라인 접수",
      },
    ],
    ["신분증", "여권(해외 방문자)", "기존 복용 약 처방전"],
  ),

  // ==========================================
  // 11. 정책참여·사회제안 (participation) - 5건
  // ==========================================
  P(
    "P001",
    "행정기관 대상 국민신문고 고충민원 접수",
    "service",
    "정부 중앙부처나 지방자치단체의 위법·부당한 행정이나 불편 사항에 대해 공식 조사를 요청하는 법정 민원 절차입니다.",
    ["국민신문고", "고충민원", "공공민원", "국민권익위원회", "110"],
    [
      "지자체에서 민원을 접수하고도 아무런 조치를 취하지 않음",
      "공공기관의 부당한 처우로 고통받고 있음",
    ],
    ["법령에 규정된 민원 처리 기한(통상 7~14일) 경과 여부"],
    ["epeople"],
    [],
    [
      {
        title: "국민신문고(110) 로그인",
        detail:
          "국민신문고 포털에 접속하여 간편인증 또는 공동인증서로 본인 확인을 거쳐 로그인합니다.",
        orgId: "epeople",
        method: "해당 사이트 문의",
      },
      {
        title: "민원 신청서 작성",
        detail: "피해 내용, 사실관계, 피신고 행정기관, 요구사항을 명확하고 구체적으로 작성합니다.",
        method: "국민신문고 문의",
      },
      {
        title: "처리기관 선택 및 제출",
        detail:
          "소관 부처(경찰청, 국토부, 복지부, 지자체 등)를 직접 지정하거나 권익위 자동 분류를 통해 접수합니다.",
        method: "온라인 접수",
      },
      {
        title: "법정 처리 기한 내 답변 수신",
        detail:
          "민원 처리에 관한 법률에 따라 지정된 기한 내에 담당 공무원의 공식 서면 답변을 통보받습니다.",
        method: "온라인 접수",
      },
    ],
    ["민원 내용 진술서", "관련 행정 처분서 또는 이전 질의회신문", "증빙 사진 및 서류"],
  ),
  P(
    "P002",
    "불합리한 법령·제도 개선을 위한 국민제안 제출",
    "service",
    "국민 생활에 불편을 주는 법령, 제도, 행정 관행을 개선하기 위해 정부에 직접 정책 아이디어를 제안하는 참여 경로입니다.",
    ["국민제안", "제도개선", "정책제안", "아이디어", "국민신문고"],
    [
      "현행 법이나 제도가 현실과 맞지 않아 다수의 국민이 피해를 봄",
      "더 나은 공공서비스 방안 아이디어가 있음",
    ],
    ["단순한 사적 불만이나 비방이 아닌 공공의 제도 개선 방안인지"],
    ["epeople"],
    [],
    [
      {
        title: "제안 취지 및 문제점 분석",
        detail: "현행 제도의 구체적 문제점과 이로 인해 발생하는 부작용을 명확히 정리합니다.",
        method: "온라인 접수",
      },
      {
        title: "국민신문고 '국민제안' 메뉴 접속",
        detail: "국민신문고 포털 상단 메뉴에서 '국민제안 > 제안신청'을 클릭합니다.",
        orgId: "epeople",
        method: "해당 사이트 문의",
      },
      {
        title: "구체적 대안 및 기대효과 작성",
        detail:
          "현황과 문제점, 개선방안, 시행 시 예상되는 긍정적 효과를 단계별로 기재하여 제출합니다.",
        method: "국민신문고 문의",
      },
      {
        title: "부처 심사 및 채택 결과 통보",
        detail:
          "소관 중앙행정기관의 심사와 국민 여론 수렴을 거쳐 우수 제안으로 채택 시 정책에 반영됩니다.",
        method: "온라인 접수",
      },
    ],
    ["제안서 본문", "참고 통계 자료 및 관련 언론 보도", "개선 비교 예시 자료"],
  ),
  P(
    "P003",
    "국회 국민동의청원(5만 명 동의 입법 청원)",
    "service",
    "국민이 직접 법률의 제정·개정 또는 폐지를 국회에 정식으로 발의할 수 있는 헌법상 청원 절차입니다.",
    ["국민동의청원", "국회청원", "법률개정", "입법청원", "청원서"],
    ["사회적 약자를 보호하는 새로운 법이 제정되길 원함", "불합리한 처벌 규정의 개정이 필요함"],
    ["30일 이내에 국민 5만 명 이상의 동의를 얻어야 소관 상임위에 회부됨"],
    ["epeople"],
    [],
    [
      {
        title: "국회 국민동의청원 포털 접속",
        detail: "국회 전자청원 사이트(petopen.assembly.go.kr)에 본인인증으로 접속합니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "청원서 작성 및 등록",
        detail:
          "청원의 취지, 이유, 법률 개정안 조문을 상세히 작성하여 국회 심사를 거쳐 청원을 공개합니다.",
        method: "온라인 접수",
      },
      {
        title: "30일 내 5만 명 동의 달성",
        detail: "공개된 청원 링크를 공유하여 30일 이내에 국민 5만 명의 전자서명을 모읍니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "국회 상임위원회 정식 심사",
        detail:
          "5만 명이 충족되면 국회 법제사법위 등 소관 상임위원회에 공식 안건으로 회부되어 법안 심사를 받습니다.",
        method: "방문문의",
      },
    ],
    ["청원서 본문", "입법 취지 설명서", "관련 법률 대비표"],
  ),
  P(
    "P004",
    "지방자치단체 주민참여예산 사업 제안",
    "service",
    "우리 동네에 필요한 공공시설 설치, 보행로 정비 등의 사업에 지자체 예산이 편성되도록 주민이 직접 제안하는 제도입니다.",
    ["주민참여예산", "동네예산", "보행로정비", "주민제안", "지자체사업"],
    ["우리 동네 통학로에 안전 펜스와 CCTV가 필요함", "방치된 공원을 주민 쉼터로 바꾸고 싶음"],
    [
      "해당 시·군·구 주민이거나 관내 직장인인지 확인",
      "단년도에 집행 가능한 소규모 주민 밀착 사업인지",
    ],
    ["gov24"],
    [],
    [
      {
        title: "지자체 주민참여예산 공고 확인",
        detail:
          "거주지 구청/시청 홈페이지의 '주민참여예산' 게시판에서 연간 공모 기간을 확인합니다.",
        method: "해당 사이트 문의",
      },
      {
        title: "사업 제안서 작성",
        detail: "사업 위치, 필요성, 대략의 소요 예산, 기대 효과를 구체적으로 작성합니다.",
        method: "온라인 접수",
      },
      {
        title: "주민참여예산위원회 심사 및 투표",
        detail:
          "사업 타당성 검토 후 주민 투표를 거쳐 최종 통과되면 다음 연도 본예산에 편성되어 집행됩니다.",
        method: "방문문의",
      },
    ],
    ["주민참여예산 제안서", "현장 사진 및 위치도"],
  ),
  P(
    "P005",
    "공공기관 부패 행위 및 공익침해행위 비밀 신고",
    "fraud",
    "공직자의 뇌물 수수, 채용 비리, 국민 건강·안전을 위협하는 공익 침해를 신분 비밀보장을 받으며 신고하는 절차입니다.",
    ["공익신고", "부패신고", "신고자보호", "비밀보장", "포상금"],
    [
      "공공기관 발주 공사에서 뒷돈을 주고받는 정황을 발견함",
      "폐기물을 불법 매립하는 행위를 알게 됨",
    ],
    [
      "공익신고자 보호법상 471개 공익침해 법률 위반 여부",
      "신분 노출 우려 시 비실명 대리신고 가능 여부",
    ],
    ["epeople", "police"],
    [],
    [
      {
        title: "객관적 증거 수집",
        detail:
          "내부 회계 장부 사본, 비밀 녹취, 이메일 등 부패 행위를 증명할 핵심 자료를 안전하게 확보합니다.",
        method: "온라인 접수",
      },
      {
        title: "권익위 청렴포털 온라인 신고",
        detail:
          "청렴포털(clean.go.kr)에서 부패·공익신고를 접수하거나, 변호사를 통한 '비실명 대리신고'를 이용합니다.",
        orgId: "epeople",
        method: "국민신문고 문의",
      },
      {
        title: "철저한 신분보호 및 보상금 지급",
        detail:
          "신고자 인적사항은 영구 비밀 보장되며, 공공 재정 환수에 기여한 경우 최대 30억원의 보상금이 지급됩니다.",
        method: "온라인 접수",
      },
    ],
    [
      "부패/공익침해 신고서",
      "구체적 증빙 서류(장부, 사진, 녹취 등)",
      "비실명 대리신고 위임장(해당 시)",
    ],
  ),
];

export const exampleQueries = [
  "보이스피싱 피해를 당해서 계좌 지급정지가 필요해요",
  "퇴사 후 임금과 퇴직금을 받지 못했어요",
  "전세 계약이 끝났는데 보증금을 돌려받지 못했어요",
  "온라인 쇼핑몰에서 환불을 거부하고 있어요",
  "헬스장 중도 해지 위약금을 너무 많이 요구해요",
  "게임 아이템을 구매했는데 지급되지 않았어요",
];

export const popularCodes = ["G003", "C001", "F001", "H001", "L001", "V001"];

export const getProblem = (code: string) => problems.find((p) => p.code === code);
export const getOrg = (id: string) => organizations.find((o) => o.id === id);

export function searchProblems(query: string): Problem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter((t) => t.length > 1);
  return problems
    .map((p) => {
      const hay = [p.title, p.summary, ...p.keywords, ...p.cases].join(" ").toLowerCase();
      let score = 0;
      for (const k of p.keywords) if (q.includes(k.toLowerCase())) score += 3;
      for (const t of tokens) if (hay.includes(t)) score += 1;
      if (p.code.toLowerCase() === q) score += 10;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
}

export type DocType = "고객센터 문의문" | "환불 요청문" | "기관 신고 초안";

export interface InquiryInput {
  game: string;
  date: string;
  facts: string;
  request: string;
}

export function buildInquiry(problem: Problem, type: DocType, input: InquiryInput): string {
  const v = (s: string, ph: string) => (s.trim() ? s.trim() : `[${ph}]`);
  const targetLabel = problem.code.startsWith("G") ? "게임명" : "대상/회사명";
  const heading =
    type === "환불 요청문"
      ? "환불 요청드립니다"
      : type === "기관 신고 초안"
        ? `${problem.title} 관련 신고`
        : `${problem.title} 관련 문의`;
  return [
    `제목: [${v(input.game, targetLabel)}] ${heading}`,
    "",
    "안녕하세요.",
    `${v(input.game, targetLabel)} 이용 중 발생한 '${problem.title}' 문제로 연락드립니다.`,
    "",
    "1. 발생 시점",
    v(input.date, "예: 2026년 11월 1일 오후 3시경"),
    "",
    "2. 사실관계",
    v(input.facts, "확인된 사실만 작성해 주세요"),
    "",
    "3. 요청사항",
    v(input.request, type === "환불 요청문" ? "결제 금액 전액 환불" : "사실 확인 및 조치"),
    "",
    "4. 첨부 증거자료",
    ...problem.documents.map((d) => `- ${d}`),
    "",
    "확인 후 회신 부탁드립니다. 감사합니다.",
  ].join("\n");
}
