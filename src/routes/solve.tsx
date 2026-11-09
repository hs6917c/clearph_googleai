import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, SearchBox } from "@/components/SiteLayout";
import { ProblemCard } from "@/components/ProblemCard";
import { searchProblems, exampleQueries } from "@/data/catalog";

export const Route = createFileRoute("/solve")({
  validateSearch: (s: Record<string, unknown>): { q?: string } =>
    typeof s["q"] === "string" ? { q: s["q"] } : {},
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "문제 해결 찾기 | 해결경로" },
      { name: "description", content: "겪고 있는 문제를 입력하고 맞는 해결 경로를 찾아보세요." },
      { property: "og:title", content: "문제 해결 찾기 | 해결경로" },
      {
        property: "og:description",
        content: "겪고 있는 문제를 입력하고 맞는 해결 경로를 찾아보세요.",
      },
    ],
  }),
  component: Solve,
});

function Solve() {
  const q = Route.useSearch().q ?? "";
  const results = searchProblems(q);
  return (
    <SiteLayout>
      <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <h1 className="text-2xl font-bold">문제 해결</h1>
        <div className="mt-4">
          <SearchBox key={q} initial={q} size="md" />
        </div>
        {!q ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {exampleQueries.map((e) => (
              <Link
                key={e}
                to="/solve"
                search={{ q: e }}
                className="rounded-full border bg-card px-3 py-1.5 text-sm"
              >
                {e}
              </Link>
            ))}
          </div>
        ) : results.length ? (
          <>
            <p className="mt-6 text-sm text-muted-foreground">
              '{q}'와 관련된 문제 {results.length}건 · 가장 가까운 항목부터 표시됩니다.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {results.map((p) => (
                <ProblemCard key={p.code} problem={p} />
              ))}
            </div>
          </>
        ) : (
          <div className="mt-8 rounded-xl border bg-card p-6 text-center">
            <p className="font-semibold">현재 등록된 공식 정보가 없습니다.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              다른 표현으로 검색하거나 문제 유형별 안내에서 찾아보세요.
            </p>
            <Link
              to="/problems"
              className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              문제 유형 보기
            </Link>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
