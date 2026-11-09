import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { OrgCard } from "@/components/OrgCard";
import { organizations } from "@/data/catalog";

export const Route = createFileRoute("/organizations")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "기관 찾기 | 해결경로" },
      { name: "description", content: "게임·소비자·개인정보 관련 담당 기관의 연락처와 접수 링크." },
      { property: "og:title", content: "기관 찾기 | 해결경로" },
      {
        property: "og:description",
        content: "게임·소비자·개인정보 관련 담당 기관의 연락처와 접수 링크.",
      },
    ],
  }),
  component: Orgs,
});

function Orgs() {
  const [q, setQ] = useState("");
  const list = organizations.filter((o) =>
    (o.name + o.scope + o.category).toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <SiteLayout>
      <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <h1 className="text-2xl font-bold md:text-3xl">기관 찾기</h1>
        <div className="mt-4 flex items-center gap-2 rounded-xl border bg-card px-3 shadow-card">
          <Search className="size-5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="기관명 또는 업무 (예: 환불, 해킹)"
            className="h-12 flex-1 bg-transparent text-base outline-none"
          />
        </div>
        <div className="mt-6 grid gap-4">
          {list.map((o) => (
            <OrgCard key={o.id} org={o} />
          ))}
          {!list.length && (
            <p className="text-center text-muted-foreground">현재 등록된 공식 정보가 없습니다.</p>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
