import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { ProblemCard } from "@/components/ProblemCard";
import { OrgCard } from "@/components/OrgCard";
import { codesForSector, sectorQuery } from "@/lib/sectors";
import { problems, organizations, searchProblems } from "@/data/catalog";
export const Route = createFileRoute("/sectors/$slug")({
  loader: async ({ context, params }) => {
    const catalog = await context.queryClient.ensureQueryData(sectorQuery);
    const sector = catalog.sectors.find((s) => s.slug === params.slug);
    if (!sector) throw notFound();
    return sector;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "분야"} | 해결경로` },
      { name: "description", content: loaderData?.description ?? "분야별 문제 해결 안내" },
      { property: "og:title", content: `${loaderData?.name ?? "분야"} | 해결경로` },
      { property: "og:description", content: loaderData?.description ?? "분야별 문제 해결 안내" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SectorDetail,
});
function SectorDetail() {
  const sector = Route.useLoaderData();
  const { data } = useSuspenseQuery(sectorQuery);
  const [q, setQ] = useState("");
  const [selectedSub, setSelectedSub] = useState<string | null>(null);

  const subsectors = data.sectors.filter((s) => s.parent_id === sector.id);
  const activeSectorId = selectedSub ?? sector.id;
  const codes = new Set(codesForSector(data, activeSectorId));
  const list = (q.trim() ? searchProblems(q) : problems).filter((p) => codes.has(p.code));
  const orgIds = new Set(
    problems.filter((p) => codes.has(p.code)).flatMap((p) => [...p.primary, ...p.secondary]),
  );
  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Link to="/sectors" className="text-sm text-accent">
          ← 분야 탐색
        </Link>
        <h1 className="mt-4 text-3xl font-bold">{sector.name}</h1>
        <p className="mt-2 text-muted-foreground">{sector.description}</p>
        {subsectors.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedSub(null)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition cursor-pointer ${
                selectedSub === null
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              전체 ({codesForSector(data, sector.id).length})
            </button>
            {subsectors.map((s) => {
              const count = codesForSector(data, s.id).length;
              return (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setSelectedSub(s.id === selectedSub ? null : s.id)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition cursor-pointer ${
                    selectedSub === s.id
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {s.name} ({count})
                </button>
              );
            })}
          </div>
        )}
        <label className="mt-8 block text-sm font-semibold" htmlFor="sector-search">
          이 분야의 문제 검색
        </label>
        <input
          id="sector-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="문제 상황 또는 문제 코드"
          className="mt-2 h-12 w-full rounded-lg border bg-card px-4 outline-none focus:border-accent"
        />
        <h2 className="mt-8 text-xl font-bold">등록된 문제 · {list.length}건</h2>
        {list.length ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <ProblemCard key={p.code} problem={p} />
            ))}
          </div>
        ) : (
          <div className="mt-4 border-y py-10 text-muted-foreground">
            {codes.size
              ? "검색어에 맞는 문제가 없습니다."
              : "아직 등록된 문제와 해결경로가 없습니다."}
          </div>
        )}
        {orgIds.size > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold">관련 기관 및 문의처</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {organizations
                .filter((o) => orgIds.has(o.id))
                .map((o) => (
                  <OrgCard key={o.id} org={o} />
                ))}
            </div>
          </section>
        )}
      </div>
    </SiteLayout>
  );
}
