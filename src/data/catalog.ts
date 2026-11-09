export type Verification = "확인 완료" | "확인 필요" | "변경 의심" | "사용 중지";

export interface Organization {
  id: string;
  name: string;
  category: string;
  scope: string;
  phone?: string;
  website: string;
  onlineUrl?: string;
  hours?: string;
  limitations: string;
  sourceUrl: string;
  verifiedAt: string;
  status: Verification;
}

export interface Step {
  title: string;
  detail: string;
  orgId?: string;
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

const CHECKED = "2026-11-01";

export const organizations: Organization[] = [
  {
    id: "grac",
    name: "게임물관리위원회",
    category: "공공기관",
    scope: "게임물 등급분류 사후관리, 불법 게임물 및 확률형 아이템 표시 의무 관련 신고",
    website: "https://www.grac.or.kr",
    limitations: "개별 이용자 간 손해배상이나 환불을 직접 강제하지 않습니다.",
    sourceUrl: "https://www.grac.or.kr",
    verifiedAt: CHECKED,
    status: "확인 필요",
  },
  {
    id: "mcst",
    name: "문화체육관광부",
    category: "정부부처",
    scope: "게임산업 정책 및 게임산업법 소관 부처",
    website: "https://www.mcst.go.kr",
    limitations: "개별 분쟁 조정 기관이 아닙니다.",
    sourceUrl: "https://www.mcst.go.kr",
    verifiedAt: CHECKED,
    status: "확인 필요",
  },
  {
    id: "kca",
    name: "한국소비자원",
    category: "공공기관",
    scope: "소비자 피해구제 신청 및 분쟁조정",
    website: "https://www.kca.go.kr",
    limitations:
      "사업자에게 결정을 강제할 수 없는 경우가 있으며, 먼저 1372 상담을 거치는 것이 일반적입니다.",
    sourceUrl: "https://www.kca.go.kr",
    verifiedAt: CHECKED,
    status: "확인 필요",
  },
  {
    id: "ccn",
    name: "소비자상담센터 1372",
    category: "공공서비스",
    scope: "소비자 피해 상담 및 피해구제 연계",
    phone: "1372",
    website: "https://www.ccn.go.kr",
    onlineUrl: "https://www.ccn.go.kr",
    limitations: "상담 및 안내 중심이며 법적 판단을 제공하지 않습니다.",
    sourceUrl: "https://www.ccn.go.kr",
    verifiedAt: CHECKED,
    status: "확인 필요",
  },
  {
    id: "kisa",
    name: "한국인터넷진흥원 (KISA)",
    category: "공공기관",
    scope: "개인정보 침해 신고, 해킹 피해 상담",
    phone: "118",
    website: "https://www.kisa.or.kr",
    onlineUrl: "https://privacy.kisa.or.kr",
    limitations: "계정 복구는 해당 게임사를 통해 진행해야 합니다.",
    sourceUrl: "https://www.kisa.or.kr",
    verifiedAt: CHECKED,
    status: "확인 필요",
  },
  {
    id: "kopico",
    name: "개인정보 분쟁조정위원회",
    category: "공공기관",
    scope: "개인정보 관련 분쟁 조정",
    website: "https://www.kopico.go.kr",
    limitations: "형사 처벌 절차가 아닌 조정 절차입니다.",
    sourceUrl: "https://www.kopico.go.kr",
    verifiedAt: CHECKED,
    status: "확인 필요",
  },
  {
    id: "police",
    name: "경찰청 사이버범죄 신고시스템",
    category: "수사기관",
    scope: "사이버 사기, 해킹, 불법 사설 서버 등 범죄 신고",
    phone: "182",
    website: "https://ecrm.police.go.kr",
    onlineUrl: "https://ecrm.police.go.kr",
    limitations: "민사상 환불이나 손해배상 절차가 아닙니다.",
    sourceUrl: "https://ecrm.police.go.kr",
    verifiedAt: CHECKED,
    status: "확인 필요",
  },
  {
    id: "kcc",
    name: "통신분쟁조정위원회",
    category: "공공기관",
    scope: "통신서비스 및 결제(휴대폰 소액결제 등) 관련 분쟁 조정",
    website: "https://www.kcc.go.kr",
    limitations: "접수 대상과 범위는 공식 홈페이지에서 확인이 필요합니다.",
    sourceUrl: "https://www.kcc.go.kr",
    verifiedAt: CHECKED,
    status: "확인 필요",
  },
  {
    id: "apple",
    name: "Apple 환불 지원",
    category: "결제 플랫폼",
    scope: "App Store 인앱 결제 환불 요청",
    website: "https://support.apple.com",
    onlineUrl: "https://reportaproblem.apple.com",
    limitations: "환불 승인 여부는 Apple 정책에 따릅니다.",
    sourceUrl: "https://support.apple.com",
    verifiedAt: CHECKED,
    status: "확인 필요",
  },
  {
    id: "steam",
    name: "Steam 환불 지원",
    category: "결제 플랫폼",
    scope: "Steam 구매 게임 및 아이템 환불 요청",
    website: "https://help.steampowered.com",
    onlineUrl: "https://help.steampowered.com",
    limitations: "Steam 환불 정책의 기준(플레이 시간 등)이 적용됩니다.",
    sourceUrl: "https://store.steampowered.com/steam_refunds",
    verifiedAt: CHECKED,
    status: "확인 필요",
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
  },
  {
    title: "증거자료 준비",
    detail: "영수증, 주문번호, 화면 캡처, 문의 내역을 날짜순으로 정리합니다.",
  },
  extra ?? {
    title: "사업자에게 환불 요청",
    detail:
      "게임사 고객센터 또는 결제 플랫폼에 문의문을 제출합니다. 아래 문의문 작성 기능을 활용하세요.",
  },
  {
    title: "소비자상담센터 1372 상담",
    detail: "사업자가 답변하지 않거나 거부하면 1372에 상담을 신청합니다.",
    orgId: "ccn",
  },
  {
    title: "피해구제 절차 검토",
    detail: "상담 후에도 해결되지 않으면 한국소비자원 피해구제 신청을 검토합니다.",
    orgId: "kca",
  },
];
const accountSteps: Step[] = [
  {
    title: "제한 사유 확인",
    detail: "게임사 공지, 이메일, 게임 내 메시지에서 제한 사유와 기간을 확인합니다.",
  },
  {
    title: "자료 정리",
    detail: "계정 정보, 최근 접속 기록, 결제 내역, 제한 통지 화면을 캡처합니다.",
  },
  {
    title: "게임사에 이의 제기",
    detail: "고객센터를 통해 구체적 사유 공개와 재검토를 요청합니다.",
  },
  { title: "1372 상담", detail: "부당하다고 판단되면 소비자상담센터에 상담합니다.", orgId: "ccn" },
];
const probSteps: Step[] = [
  {
    title: "표시 내용 기록",
    detail: "확률 표시 화면, 공지, 실제 획득 결과를 날짜와 함께 캡처합니다.",
  },
  { title: "게임사에 문의", detail: "확률 정보와 근거를 고객센터에 문의합니다." },
  {
    title: "게임물관리위원회 신고",
    detail: "확률형 아이템 표시 의무 위반이 의심되면 신고를 검토합니다.",
    orgId: "grac",
  },
  {
    title: "소비자 피해 상담",
    detail: "금전적 피해가 있다면 1372 상담을 함께 진행합니다.",
    orgId: "ccn",
  },
];
const fraudSteps: Step[] = [
  {
    title: "증거 보존",
    detail: "대화 내역, 거래 게시글, 송금 내역, 상대방 정보를 삭제하지 말고 보관합니다.",
  },
  { title: "거래 플랫폼·게임사 신고", detail: "거래 사이트와 게임사에 상대 계정을 신고합니다." },
  {
    title: "사이버범죄 신고",
    detail: "경찰청 사이버범죄 신고시스템에 신고합니다.",
    orgId: "police",
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
      },
      {
        title: "국내대리인 여부 확인",
        detail: "일정 규모 이상 해외 게임사는 국내대리인을 둘 수 있습니다. G002를 참고하세요.",
      },
      {
        title: "1372 상담",
        detail: "연락이 닿지 않으면 소비자상담센터에 상담합니다.",
        orgId: "ccn",
      },
    ],
    ["게임명과 개발사명", "계정 ID", "문의하려는 내용 요약"],
  ),
  P(
    "G002",
    "해외 게임사 국내대리인 확인",
    "contact",
    "해외 게임사의 국내대리인 정보를 확인하는 방법을 안내합니다.",
    ["국내대리인", "해외", "대리인"],
    ["해외 게임사의 국내 책임 주체를 알고 싶음"],
    ["게임 내 약관·개인정보처리방침의 국내대리인 항목", "앱 스토어 판매자 정보"],
    ["grac"],
    ["mcst"],
    [
      {
        title: "약관 확인",
        detail: "이용약관과 개인정보처리방침에서 국내대리인 기재 여부를 확인합니다.",
      },
      {
        title: "기관 문의",
        detail: "확인이 어렵다면 게임물관리위원회에 문의합니다.",
        orgId: "grac",
      },
    ],
    ["게임명", "개발사·퍼블리셔명"],
  ),
  P(
    "G003",
    "게임 결제 환불 거부",
    "payment",
    "결제한 상품의 환불을 거부당한 경우의 해결 경로입니다.",
    ["환불", "거부", "결제", "청약철회"],
    ["구매 직후 환불을 요청했지만 거부됨", "사용하지 않은 상품인데 환불 불가 안내를 받음"],
    ["결제 플랫폼(구글·애플·스팀·자체결제)", "상품 사용 여부", "결제일로부터 경과 기간"],
    ["apple", "steam"],
    ["ccn", "kca"],
    paySteps(),
    payDocs,
  ),
  P(
    "G004",
    "결제 후 아이템 미지급",
    "payment",
    "결제는 완료되었지만 아이템이 지급되지 않은 경우입니다.",
    ["미지급", "아이템", "지급", "안 들어옴", "지급되지"],
    ["결제 완료 문자를 받았는데 아이템이 없음", "재접속해도 지급되지 않음"],
    ["우편함·보관함 확인", "결제한 계정과 접속 계정이 같은지", "결제 시각"],
    ["apple", "steam"],
    ["ccn"],
    paySteps({
      title: "게임사에 미지급 신고",
      detail: "주문번호와 결제 시각을 첨부해 지급 또는 환불을 요청합니다.",
    }),
    payDocs,
  ),
  P(
    "G005",
    "게임 계정 영구정지 및 이용제한",
    "account",
    "명확한 이유 없이 계정이 정지된 경우의 대응 방법입니다.",
    ["정지", "영구정지", "이용제한", "밴", "제재"],
    ["사유 안내 없이 영구정지됨", "부정행위를 하지 않았는데 제재됨"],
    ["제재 통지 내용", "약관상 제재 기준", "이의신청 기한"],
    [],
    ["ccn"],
    accountSteps,
    ["계정 ID", "제재 통지 캡처", "결제 내역", "문의 내역"],
  ),
  P(
    "G006",
    "게임 계정 해킹 및 도용",
    "account",
    "계정이 해킹되거나 타인이 도용한 경우입니다.",
    ["해킹", "도용", "로그인", "비밀번호"],
    ["비밀번호가 바뀌어 로그인할 수 없음", "아이템이 사라지고 모르는 접속 기록이 있음"],
    ["연결된 이메일·휴대폰 보안", "다른 서비스 비밀번호 재사용 여부"],
    ["kisa"],
    ["police"],
    [
      { title: "즉시 보안 조치", detail: "연결 이메일 비밀번호 변경, 2단계 인증 설정." },
      { title: "게임사에 도용 신고", detail: "계정 복구와 아이템 복구를 요청합니다." },
      { title: "KISA 상담", detail: "해킹 피해 상담은 118에서 받을 수 있습니다.", orgId: "kisa" },
      {
        title: "사이버범죄 신고",
        detail: "금전 피해가 있다면 신고를 검토합니다.",
        orgId: "police",
      },
    ],
    ["계정 ID", "접속 기록 캡처", "사라진 아이템 목록", "본인 확인 자료"],
  ),
  P(
    "G007",
    "게임 아이템 및 게임머니 임의 회수",
    "account",
    "게임사가 사전 설명 없이 아이템을 회수한 경우입니다.",
    ["회수", "아이템", "게임머니", "삭제"],
    ["점검 후 구매한 아이템이 사라짐"],
    ["회수 공지 여부", "구매 경로(유료/무료)"],
    [],
    ["ccn"],
    accountSteps,
    ["회수 전후 캡처", "구매 내역", "공지 캡처"],
  ),
  P(
    "G008",
    "확률형 아이템 확률 미표시",
    "probability",
    "확률형 아이템의 확률 정보가 표시되지 않은 경우입니다.",
    ["확률", "가챠", "뽑기", "미표시"],
    ["뽑기 상품에 확률 정보가 없음"],
    ["상품 화면, 공지, 홈페이지 표시 여부"],
    ["grac"],
    ["ccn"],
    probSteps,
    ["상품 화면 캡처", "게임명·상품명", "확인 일시"],
  ),
  P(
    "G009",
    "표시 확률과 실제 확률 불일치 의심",
    "probability",
    "표시된 확률과 실제 결과가 다르다고 의심되는 경우입니다.",
    ["확률", "불일치", "가챠", "조작"],
    ["표시 확률보다 훨씬 낮게 나옴"],
    ["시도 횟수와 결과 기록", "다른 이용자 사례"],
    ["grac"],
    ["ccn", "kca"],
    probSteps,
    ["뽑기 결과 기록", "결제 내역", "확률 표시 캡처"],
  ),
  P(
    "G010",
    "확률형 아이템 정보 허위 표시",
    "probability",
    "확률 정보가 사실과 다르게 표시된 경우입니다.",
    ["허위", "확률", "표시"],
    ["공지된 확률이 나중에 정정됨"],
    ["정정 공지 여부", "변경 전후 화면"],
    ["grac"],
    ["kca"],
    probSteps,
    ["변경 전후 캡처", "정정 공지", "결제 내역"],
  ),
  P(
    "G011",
    "게임 내 기만적 결제 유도",
    "payment",
    "오해를 유발하는 방식으로 결제를 유도한 경우입니다.",
    ["기만", "결제 유도", "다크패턴"],
    ["무료처럼 보였는데 결제가 진행됨"],
    ["결제 화면 구성", "결제 확인 절차"],
    ["ccn"],
    ["kca"],
    paySteps(),
    payDocs,
  ),
  P(
    "G012",
    "게임 서비스 조기 종료",
    "service",
    "유료 상품 판매 후 서비스가 갑자기 종료된 경우입니다.",
    ["서비스 종료", "섭종", "종료"],
    ["결제 직후 서비스 종료 공지"],
    ["종료 공지일과 종료일", "환불 안내 여부"],
    ["ccn"],
    ["kca", "grac"],
    paySteps(),
    [...payDocs, "서비스 종료 공지 캡처"],
  ),
  P(
    "G013",
    "유료 재화 잔액 환급 거부",
    "payment",
    "남은 유료 재화의 환급을 거부당한 경우입니다.",
    ["재화", "잔액", "환급", "다이아"],
    ["서비스 종료 후 남은 유료 재화 환급 거부"],
    ["유료/무료 재화 구분", "약관의 환급 조항"],
    ["ccn"],
    ["kca"],
    paySteps(),
    [...payDocs, "재화 잔액 캡처"],
  ),
  P(
    "G014",
    "미성년자 무단 결제",
    "payment",
    "미성년자가 보호자 동의 없이 결제한 경우입니다.",
    ["미성년자", "자녀", "아이", "무단 결제"],
    ["자녀가 부모 휴대폰으로 결제함"],
    ["결제 수단 명의자", "결제자 연령 확인 자료"],
    ["apple", "ccn"],
    ["kca", "kcc"],
    paySteps(),
    [...payDocs, "가족관계 확인 자료"],
  ),
  P(
    "G015",
    "게임 이용 중 개인정보 유출",
    "service",
    "게임사로부터 개인정보가 유출된 경우입니다.",
    ["개인정보", "유출", "정보"],
    ["유출 통지 메일을 받음"],
    ["유출 통지 내용", "유출된 항목"],
    ["kisa"],
    ["kopico"],
    [
      { title: "유출 항목 확인", detail: "통지 내용과 유출 항목을 확인합니다." },
      { title: "보안 조치", detail: "비밀번호 변경 등 추가 피해를 예방합니다." },
      {
        title: "개인정보 침해 신고",
        detail: "KISA 개인정보침해 신고센터에 신고합니다.",
        orgId: "kisa",
      },
      { title: "분쟁조정 신청", detail: "손해가 있다면 분쟁조정을 검토합니다.", orgId: "kopico" },
    ],
    ["유출 통지 캡처", "계정 정보"],
  ),
  P(
    "G016",
    "불법 사설 서버 운영 의심",
    "fraud",
    "불법 사설 서버 운영이 의심되는 경우입니다.",
    ["사설 서버", "프리서버", "불법"],
    ["사설 서버 광고를 봄"],
    ["사이트 주소", "광고 경로"],
    ["grac"],
    ["police"],
    [
      { title: "정보 기록", detail: "주소, 광고, 결제 계좌를 기록합니다." },
      { title: "게임물관리위원회 신고", detail: "불법 게임물 신고를 진행합니다.", orgId: "grac" },
      { title: "사이버범죄 신고", detail: "금전 피해가 있다면 신고합니다.", orgId: "police" },
    ],
    ["사이트 주소", "광고 캡처"],
  ),
  P(
    "G017",
    "불법 게임물 유통 의심",
    "fraud",
    "등급분류를 받지 않은 게임 등 불법 게임물 유통이 의심되는 경우입니다.",
    ["불법 게임", "유통", "도박"],
    ["등급 표시 없는 게임 발견"],
    ["등급 표시 여부", "유통 경로"],
    ["grac"],
    ["police"],
    [
      { title: "정보 기록", detail: "게임명, 주소, 화면을 기록합니다." },
      { title: "게임물관리위원회 신고", detail: "불법 게임물 신고를 진행합니다.", orgId: "grac" },
    ],
    ["게임명·주소", "화면 캡처"],
  ),
  P(
    "G018",
    "게임 등급 및 표시 문제",
    "service",
    "게임 등급 표시가 누락되거나 잘못된 경우입니다.",
    ["등급", "연령", "표시"],
    ["청소년 이용불가 콘텐츠인데 전체이용가로 표시됨"],
    ["표시된 등급", "실제 콘텐츠"],
    ["grac"],
    [],
    [
      { title: "표시 내용 기록", detail: "등급 표시와 문제 콘텐츠를 캡처합니다." },
      {
        title: "게임물관리위원회 문의",
        detail: "등급 관련 신고·문의를 진행합니다.",
        orgId: "grac",
      },
    ],
    ["등급 표시 캡처", "콘텐츠 캡처"],
  ),
  P(
    "G019",
    "게임 아이템 현금거래 사기",
    "fraud",
    "아이템 현금거래 중 사기를 당한 경우입니다.",
    ["사기", "현금거래", "아이템 거래", "입금"],
    ["돈을 보냈는데 아이템을 받지 못함"],
    ["거래 사이트 이용 여부", "송금 계좌"],
    ["police"],
    ["ccn"],
    fraudSteps,
    ["송금 내역", "대화 내역", "거래 게시글", "상대방 계정 정보"],
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
];

export const exampleQueries = [
  "게임 아이템을 구매했는데 지급되지 않았어요",
  "게임 계정이 영구정지됐는데 이유를 모르겠어요",
  "해외 게임사에 연락하고 싶은데 방법을 모르겠어요",
  "확률형 아이템 표시가 잘못된 것 같아요",
  "게임사가 환불을 거부하고 있어요",
];

export const popularCodes = ["G003", "G004", "G005", "G006", "G009", "G019"];

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
  const heading =
    type === "환불 요청문"
      ? "환불 요청드립니다"
      : type === "기관 신고 초안"
        ? `${problem.title} 관련 신고`
        : `${problem.title} 관련 문의`;
  return [
    `제목: [${v(input.game, "게임명")}] ${heading}`,
    "",
    "안녕하세요.",
    `${v(input.game, "게임명")} 이용 중 발생한 '${problem.title}' 문제로 연락드립니다.`,
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
