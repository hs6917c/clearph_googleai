import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/SiteLayout";
import { SectorGrid } from "@/components/SectorGrid";
import { sectorQuery } from "@/lib/sectors";
export const Route = createFileRoute("/sectors/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(sectorQuery),
  head: () => ({
    meta: [
      { title: "분야 탐색 | 해결경로" },
      {
        name: "description",
        content: "게임, 소비자, 금융, 주거 등 12개 분야에서 문제 해결 정보를 찾습니다.",
      },
      { property: "og:title", content: "분야 탐색 | 해결경로" },
      { property: "og:description", content: "분야별 문제와 담당 기관을 찾아보세요." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Sectors,
});
function Sectors() {
  const { data } = useSuspenseQuery(sectorQuery);
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-bold">분야 탐색</h1>
        <p className="mt-2 mb-8 text-muted-foreground">문제와 관련된 분야를 선택해 주세요.</p>
        <SectorGrid catalog={data} />
      </section>
    </SiteLayout>
  );
}
