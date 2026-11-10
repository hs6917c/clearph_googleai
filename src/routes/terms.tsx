import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Scale, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "서비스 이용약관 | 해결경로" },
      {
        name: "description",
        content: "해결경로(Clearph) 서비스 이용약관 및 법적 면책에 관한 안내입니다.",
      },
      { property: "og:title", content: "서비스 이용약관 | 해결경로" },
      {
        property: "og:description",
        content: "해결경로(Clearph) 서비스 이용약관 및 법적 면책에 관한 안내입니다.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-16">
        <div className="flex items-center gap-2 text-accent">
          <Scale className="size-6" />
          <span className="text-sm font-semibold">Legal Notice</span>
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">서비스 이용약관</h1>
        <p className="mt-2 text-sm text-muted-foreground">시행일자: 2026년 11월 10일</p>

        <div className="mt-6 rounded-xl border border-warning/30 bg-warning-soft p-4 text-sm text-foreground">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="mt-0.5 size-5 shrink-0 text-warning" />
            <div className="space-y-1">
              <p className="font-semibold text-warning-foreground">
                법적 성격 및 핵심 고지 (면책 조항)
              </p>
              <p className="text-muted-foreground">
                본 서비스는 정부 부처, 공공기관, 법정 분쟁조정위원회의 공개 정보를 바탕으로 피해
                구제 절차와 공식 연락처를 안내하는 <strong>무료 공공정보 큐레이션 서비스</strong>
                입니다. 변호사법에 따른 법률 상담이나 소송대리, 공공기관의 공식 행정처분이 아니므로
                구체적 사안에 대한 법적 판단은 소관 기관 또는 법률 전문가와 상담하시기 바랍니다.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-foreground/90">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">제1조 (목적)</h2>
            <p>
              본 약관은 해결경로(Clearph, 이하 &apos;서비스&apos;)가 제공하는 공공서비스 및 생활
              분쟁 해결 경로 안내 웹 서비스의 이용 조건 및 절차, 이용자와 서비스 제공자 간의 권리,
              의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">제2조 (용어의 정의)</h2>
            <ol className="list-decimal space-y-1 pl-5">
              <li>
                &apos;서비스&apos;란 이용자가 겪고 있는 분쟁이나 민원 상황에 대해 담당 소관 기관,
                대표 직통 연락처, 단계별 해결 절차, 증빙서류 안내, 문의문 초안 작성 등을 지원하는 웹
                플랫폼을 말합니다.
              </li>
              <li>
                &apos;이용자&apos;란 본 웹사이트에 접속하여 본 약관에 따라 서비스를 이용하는 모든
                방문자를 말합니다.
              </li>
            </ol>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">
              제3조 (서비스의 내용 및 법적 면책)
            </h2>
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                <strong>정보의 참고성:</strong> 서비스가 제공하는 모든 콘텐츠(해결 절차, 준비 서류,
                문의문 서식 등)는 이용자의 이해를 돕기 위한 일반적 가이드라인이며, 개별 구체적
                사실관계나 법률 개정, 각 기관의 재량 판단에 따라 실제 처리 결과가 상이할 수
                있습니다.
              </li>
              <li>
                <strong>법률 상담과의 구별:</strong> 서비스는 변호사법 제109조 등의 적용을 받는 법률
                사무(개별 법률 상담, 사건 수임, 소송 대리 등)를 수행하지 않습니다.
              </li>
              <li>
                <strong>결과의 면책:</strong> 이용자가 본 서비스의 안내를 신뢰하여 행한 행위(민원
                제기, 이의신청, 소송, 합의 등)의 결과에 대하여 서비스 제공자는 고의 또는 중대한
                과실이 없는 한 법적 책임을 부담하지 않습니다.
              </li>
            </ol>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">
              제4조 (정보의 최신성 및 기관 출처)
            </h2>
            <ol className="list-decimal space-y-1 pl-5">
              <li>
                서비스에 등재된 기관명, 연락처, 온라인 접수 URL, 운영시간 등은 정부 공공데이터 및 각
                기관 공식 웹사이트의 공개 자료를 바탕으로 정기 검증합니다.
              </li>
              <li>
                공공기관의 부서 개편, 전화번호 변경, 제도 개정 등으로 인해 일시적으로 실제 정보와
                차이가 발생할 수 있으므로, 민원 접수 전 반드시 공식 창구의 최신 공지를 확인하시기
                바랍니다.
              </li>
            </ol>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">제5조 (이용자의 의무 및 금지사항)</h2>
            <p>이용자는 다음 각 호의 행위를 하여서는 안 됩니다.</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                서비스의 안내를 악용하여 공공기관이나 특정 사업자에게 허위 사실을 유포하거나
                고의적인 업무 방해를 유발하는 행위
              </li>
              <li>
                타인의 개인정보나 결제 정보를 무단 도용하여 문의문이나 민원 문서를 작성하는 행위
              </li>
              <li>
                서비스의 정상적인 운영을 방해하는 크롤링, 비정상적 트래픽 유발 및 시스템 해킹 시도
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">제6조 (지식재산권)</h2>
            <p>
              서비스가 자체 제작한 UI 디자인, 콘텐츠 구조, 큐레이션 데이터베이스에 대한 저작권은
              서비스 제공자에게 있습니다. 단, 공공기관 명칭, 법령 내용, 정부 안내 지침 등
              공공저작물은 관련 법령에 따릅니다.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">제7조 (약관의 개정 및 관할법원)</h2>
            <ol className="list-decimal space-y-1 pl-5">
              <li>
                본 약관은 서비스 웹페이지에 게시함으로써 효력이 발생하며, 관련 법령을 위배하지 않는
                범위 내에서 사전 공지 후 개정될 수 있습니다.
              </li>
              <li>
                서비스 이용과 관련하여 분쟁이 발생하는 경우 대한민국 법률을 준거법으로 하며, 관할
                법원은 민사소송법에 따릅니다.
              </li>
            </ol>
          </section>
        </div>

        <div className="mt-12 flex items-center justify-between border-t pt-6">
          <Link to="/" className="text-sm font-semibold text-accent hover:underline">
            ← 홈으로 돌아가기
          </Link>
          <Link to="/privacy" className="text-sm text-muted-foreground hover:underline">
            개인정보처리방침 보기 →
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}
