import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "개인정보처리방침 | 해결경로" },
      {
        name: "description",
        content: "해결경로(Clearph)의 개인정보 비저장 원칙 및 개인정보처리방침에 관한 안내입니다.",
      },
      { property: "og:title", content: "개인정보처리방침 | 해결경로" },
      {
        property: "og:description",
        content: "해결경로(Clearph)의 개인정보 비저장 원칙 및 개인정보처리방침에 관한 안내입니다.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-16">
        <div className="flex items-center gap-2 text-success">
          <ShieldCheck className="size-6" />
          <span className="text-sm font-semibold">Privacy Policy</span>
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">개인정보처리방침</h1>
        <p className="mt-2 text-sm text-muted-foreground">시행일자: 2026년 11월 10일</p>

        <div className="mt-6 rounded-xl border border-success/30 bg-success-soft p-4 text-sm text-foreground">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" />
            <div className="space-y-1">
              <p className="font-semibold text-success">안심 이용을 위한 개인정보 미수집 원칙</p>
              <p className="text-muted-foreground">
                해결경로는 <strong>별도의 회원가입 없이 누구나 무료로 이용</strong>할 수 있으며,
                이용자의 주민등록번호, 연락처, 결제 정보 등 일체의 개인식별정보를{" "}
                <strong>서버에 저장하거나 수집하지 않습니다.</strong> 문의문 자동 작성에 입력된
                내용은 오직 이용자 본인의 웹 브라우저 메모리 안에서만 일시 작동합니다.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-foreground/90">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">제1조 (총칙)</h2>
            <p>
              해결경로(Clearph, 이하 &apos;서비스&apos;)는 「개인정보 보호법」 제30조에 따라
              정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록
              다음과 같이 개인정보 처리방침을 수립·공개합니다.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">
              제2조 (개인정보의 수집 항목 및 방법)
            </h2>
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                <strong>회원가입 미운영:</strong> 본 서비스는 이용자 식별을 위한 회원가입 절차가
                없으므로, 성명, 이메일, 전화번호, 주소 등의 개인정보를 요구하거나 데이터베이스에
                축적하지 않습니다.
              </li>
              <li>
                <strong>문의문 작성 데이터의 클라이언트 로컬 처리:</strong> &apos;문의문 자동
                작성&apos; 기능 사용 시 입력되는 게임명, 계정 ID, 주문번호, 피해 일자 등의 텍스트는{" "}
                <strong>이용자의 기기 웹 브라우저(Local State)에서만 일시적으로 렌더링</strong>되며,
                원격 서버로 전송되거나 저장되지 않습니다. 브라우저 탭을 닫거나 새로고침할 경우 즉시
                영구 소멸합니다.
              </li>
              <li>
                <strong>자동 생성 정보:</strong> 웹 서비스 구동 및 시스템 보안을 위해 인터넷
                프로토콜(IP) 주소, 방문 일시, 브라우저 종류 등 최소한의 접속 로그가 웹 서버에 일시
                기록될 수 있으나, 이는 특정 개인을 식별하는 용도로 사용되지 않으며 법정 보존 기한
                경과 시 지체 없이 파기됩니다.
              </li>
            </ol>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">
              제3조 (개인정보의 제3자 제공 및 처리 위탁)
            </h2>
            <p>
              서비스는 이용자의 개인정보를 수집하지 않으므로, 제3자에게 개인정보를 제공하거나 외부
              업체에 개인정보 처리를 위탁하는 행위를 일체 하지 않습니다.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">
              제4조 (개인정보의 파기 절차 및 방법)
            </h2>
            <p>
              서비스는 원칙적으로 개인정보를 보유하지 않습니다. 만약 기술적 오류 보고나 고객 문의
              등으로 개인정보가 포함된 이메일 등을 수신하는 경우, 목적 달성 즉시 복구 불가능한
              방법으로 안전하게 영구 파기합니다.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">제5조 (쿠키의 운용 및 거부)</h2>
            <ol className="list-decimal space-y-1 pl-5">
              <li>
                서비스는 이용자 맞춤형 광고나 행동 추적을 위한 트래킹 쿠키를 사용하지 않습니다.
              </li>
              <li>
                이용자는 웹 브라우저 옵션 설정을 통해 쿠키 허용 수준을 직접 지정하거나 모든 쿠키의
                저장을 거부할 수 있습니다. (예: 브라우저 설정 &gt; 개인정보 보호 및 보안 &gt; 쿠키
                차단)
              </li>
            </ol>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">
              제6조 (개인정보 보호책임자 및 권익침해 구제)
            </h2>
            <p>
              개인정보 보호와 관련한 문의사항이나 의견은 서비스 운영 담당자에게 연락하실 수
              있습니다.
            </p>
            <div className="mt-2 rounded-lg border bg-card p-3 text-xs leading-normal">
              <p>• 서비스명: Clearph (해결경로)</p>
              <p>• 운영 주체: Clearph 운영팀</p>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              기타 개인정보 침해에 대한 신고나 상담이 필요하신 경우 아래 정부 기관에 문의하실 수
              있습니다:
              <br />
              - 개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)
              <br />
              - 개인정보분쟁조정위원회 (kopico.go.kr / 1833-6972)
              <br />
              - 대검찰청 사이버수사과 (spo.go.kr / 국번없이 1301)
              <br />- 경찰청 사이버범죄수사과 (ecrm.police.go.kr / 국번없이 182)
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">제7조 (개인정보처리방침의 변경)</h2>
            <p>
              이 개인정보처리방침은 2026년 11월 10일부터 적용되며, 법령 및 방침에 따른 변경 내용의
              추가, 삭제 및 정정이 있는 경우에는 웹사이트 공지사항을 통하여 고지할 것입니다.
            </p>
          </section>
        </div>

        <div className="mt-12 flex items-center justify-between border-t pt-6">
          <Link to="/" className="text-sm font-semibold text-accent hover:underline">
            ← 홈으로 돌아가기
          </Link>
          <Link to="/terms" className="text-sm text-muted-foreground hover:underline">
            서비스 이용약관 보기 →
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}
