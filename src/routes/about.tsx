import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "서비스 소개 | 해결경로" },
      {
        name: "description",
        content: "해결경로는 문제 상황에 맞는 담당 기관과 해결 절차를 안내하는 서비스입니다.",
      },
      { property: "og:title", content: "서비스 소개 | 해결경로" },
      {
        property: "og:description",
        content: "문제 상황에 맞는 담당 기관과 해결 절차를 안내합니다.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-12">
        <h1 className="text-3xl font-bold">서비스 소개</h1>
        <p className="text-lg text-muted-foreground">
          어디에 물어봐야 할지 모를 때, 해결의 길을 찾아드립니다.
        </p>
        <div className="grid gap-3">
          {[
            "어디에 연락해야 하는가?",
            "무엇을 준비해야 하는가?",
            "어떻게 문의하고 해결해야 하는가?",
          ].map((t, i) => (
            <div key={t} className="rounded-xl border bg-card p-4 font-semibold">
              {i + 1}. {t}
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-warning-soft p-4 text-sm">
          본 서비스는 정보 안내 및 절차 지원 서비스이며 법률 상담이 아닙니다. 기관 정보는 공식 출처
          기준이며, '확인 필요'로 표시된 정보는 반드시 공식 홈페이지에서 다시 확인해 주세요.
        </div>
      </div>
    </SiteLayout>
  );
}
