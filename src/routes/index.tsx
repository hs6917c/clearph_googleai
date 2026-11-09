import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, ClipboardList, FileText } from "lucide-react";
import { SiteLayout, SearchBox } from "@/components/SiteLayout";
import { ProblemCard, categoryIcon } from "@/components/ProblemCard";
import { categories, exampleQueries, popularCodes, problems, getProblem } from "@/data/catalog";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SectorGrid } from "@/components/SectorGrid";
import { sectorQuery } from "@/lib/sectors";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(sectorQuery),
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "해결경로 — 어디에 물어봐야 할지 모를 때" },
      {
        name: "description",
        content: "문제 상황을 입력하면 담당 기관, 연락처, 해결 절차와 문의문까지 안내합니다.",
      },
      { property: "og:title", content: "해결경로 — 어디에 물어봐야 할지 모를 때" },
      {
        property: "og:description",
        content: "12개 분야 실생활 문제의 공공기관 연락처와 해결 절차를 찾아드립니다.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { data: sectorCatalog } = useSuspenseQuery(sectorQuery);
  return (
    <SiteLayout>
      <section className="bg-hero text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4 pb-16 pt-12 text-center md:pb-24 md:pt-20">
          <p className="text-sm font-medium opacity-80">
            어디에 물어봐야 할지 모를 때, 해결의 길을 찾아드립니다
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
            어떤 문제를 해결하고 싶으신가요?
          </h1>
          <p className="mt-3 opacity-80 md:text-lg">
            상황을 입력하면 담당 기관과 해결 방법을 찾아드립니다.
          </p>
          <div className="mt-8 text-left text-foreground">
            <SearchBox />
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {exampleQueries.map((q) => (
              <Link
                key={q}
                to="/solve"
                search={{ q }}
                className="rounded-full border border-primary-foreground/25 px-3 py-1.5 text-xs hover:bg-primary-foreground/10 md:text-sm"
              >
                {q}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">분야별로 찾기</h2>
          <Link to="/sectors" className="text-sm font-semibold text-accent">
            전체 분야
          </Link>
        </div>
        <SectorGrid catalog={sectorCatalog} />
      </section>

      <section className="mx-auto mt-8 grid max-w-5xl gap-3 px-4 sm:grid-cols-3">
        {[
          { icon: Building2, t: "어디에 연락할까?", d: "담당 기관·사업자" },
          { icon: ClipboardList, t: "무엇을 준비할까?", d: "필요한 증거자료" },
          { icon: FileText, t: "어떻게 문의할까?", d: "단계별 절차 + 문의문" },
        ].map(({ icon: I, t, d }) => (
          <div
            key={t}
            className="flex items-center gap-3 rounded-xl border bg-card p-4 shadow-card"
          >
            <I className="size-6 text-accent" />
            <div>
              <p className="font-semibold">{t}</p>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-xl font-bold md:text-2xl">자주 찾는 문제</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularCodes.map((c) => (
            <ProblemCard key={c} problem={getProblem(c)!} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-bold md:text-2xl">유형으로 찾기</h2>
          <Link to="/problems" className="text-sm font-semibold text-accent">
            전체 보기
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
          {categories.map((c) => {
            const I = categoryIcon[c.id];
            return (
              <Link
                key={c.id}
                to="/problems"
                search={{ category: c.id }}
                className="rounded-xl border bg-card p-4 hover:border-accent"
              >
                <I className="size-5 text-primary" />
                <p className="mt-2 font-semibold">{c.label}</p>
                <p className="text-xs text-muted-foreground">
                  {c.desc} · {problems.filter((p) => p.category === c.id).length}건
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
