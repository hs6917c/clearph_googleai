import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ProblemCard } from "@/components/ProblemCard";
import { categories, problems, type CategoryId } from "@/data/catalog";

export const Route = createFileRoute("/problems/")({
  validateSearch: (s: Record<string, unknown>): { category?: CategoryId } => {
    const c = s["category"];
    return categories.some((x) => x.id === c) ? { category: c as CategoryId } : {};
  },
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "문제 유형별 안내 | 해결경로" },
      { name: "description", content: "게임 및 디지털 서비스 문제 20가지의 해결 경로." },
      { property: "og:title", content: "문제 유형별 안내 | 해결경로" },
      { property: "og:description", content: "게임 및 디지털 서비스 문제 20가지의 해결 경로." },
    ],
  }),
  component: ProblemsPage,
});

function ProblemsPage() {
  const { category } = Route.useSearch();
  const list = category ? problems.filter((p) => p.category === category) : problems;
  const chip = "shrink-0 rounded-full border px-4 py-2 text-sm font-medium";
  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <h1 className="text-2xl font-bold md:text-3xl">문제 유형별 안내</h1>
        <p className="mt-1 text-muted-foreground">
          게임 및 디지털 서비스 관련 문제 {problems.length}가지
        </p>
        <div className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-2">
          <Link
            to="/problems"
            search={{}}
            className={`${chip} ${!category ? "bg-primary text-primary-foreground" : "bg-card"}`}
          >
            전체
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/problems"
              search={{ category: c.id }}
              className={`${chip} ${category === c.id ? "bg-primary text-primary-foreground" : "bg-card"}`}
            >
              {c.label}
            </Link>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProblemCard key={p.code} problem={p} />
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
