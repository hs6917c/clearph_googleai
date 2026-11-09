import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ChevronLeft, Copy, Check, RotateCcw, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { OrgCard } from "@/components/OrgCard";
import { buildInquiry, getOrg, getProblem, type DocType } from "@/data/catalog";
import { useSuspenseQuery } from "@tanstack/react-query";
import { sectorQuery } from "@/lib/sectors";

export const Route = createFileRoute("/problems/$code")({
  loader: async ({ params, context }) => {
    const p = getProblem(params.code);
    if (!p) throw notFound();
    await context.queryClient.ensureQueryData(sectorQuery);
    return p;
  },
  head: ({ loaderData }) => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: `${loaderData?.title ?? "문제"} 해결 방법 | 해결경로` },
      { name: "description", content: loaderData?.summary ?? "" },
      { property: "og:title", content: `${loaderData?.title ?? "문제"} 해결 방법 | 해결경로` },
      { property: "og:description", content: loaderData?.summary ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="p-12 text-center">
        등록되지 않은 문제입니다.{" "}
        <Link to="/problems" className="text-accent underline">
          목록으로
        </Link>
      </div>
    </SiteLayout>
  ),
  component: Detail,
});

const tabs = [
  { id: "orgs", label: "담당 기관" },
  { id: "steps", label: "해결 절차" },
  { id: "docs", label: "준비자료" },
  { id: "write", label: "문의문" },
];

function Section({
  id,
  n,
  title,
  children,
}: {
  id: string;
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32">
      <h2 className="flex items-center gap-2 text-lg font-bold md:text-xl">
        <span className="grid size-7 place-items-center rounded-full bg-primary text-sm text-primary-foreground">
          {n}
        </span>
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Detail() {
  const p = Route.useLoaderData();
  const { data: sectorCatalog } = useSuspenseQuery(sectorQuery);
  const relatedIds = new Set(
    sectorCatalog.links.filter((l) => l.problem_code === p.code).map((l) => l.sector_id),
  );
  const primary = p.primary.map(getOrg).filter(Boolean);
  const secondary = p.secondary.map(getOrg).filter(Boolean);

  return (
    <SiteLayout>
      <div className="border-b bg-card">
        <div className="mx-auto max-w-4xl px-4 py-6 md:py-10">
          <Link to="/problems" className="inline-flex items-center text-sm text-muted-foreground">
            <ChevronLeft className="size-4" />
            문제 유형별 안내
          </Link>
          <p className="mt-3 text-xs font-semibold text-accent">{p.code}</p>
          <h1 className="mt-1 text-2xl font-bold md:text-3xl">{p.title}</h1>
          <p className="mt-2 text-muted-foreground">{p.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {sectorCatalog.sectors
              .filter((s) => relatedIds.has(s.id))
              .map((s) => (
                <Link
                  key={s.id}
                  to="/sectors/$slug"
                  params={{ slug: s.slug }}
                  className="rounded-md bg-secondary px-3 py-1.5 text-sm text-primary"
                >
                  {s.name}
                </Link>
              ))}
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-muted p-4">
              <p className="text-sm font-semibold">이런 상황이라면</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {p.cases.map((c) => (
                  <li key={c}>• {c}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-warning-soft p-4">
              <p className="text-sm font-semibold">먼저 확인하세요</p>
              <ul className="mt-2 space-y-1 text-sm">
                {p.checks.map((c) => (
                  <li key={c}>✓ {c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <nav className="sticky top-16 z-30 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl gap-1 overflow-x-auto px-4">
          {tabs.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className="shrink-0 px-3 py-3 text-sm font-semibold text-muted-foreground hover:text-primary"
            >
              {t.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-4xl space-y-12 px-4 py-8 pb-28 md:pb-12">
        <Section id="orgs" n={1} title="담당 기관 및 연락처">
          {primary.length === 0 && secondary.length === 0 && (
            <p className="rounded-xl border bg-card p-4 text-sm">
              현재 등록된 공식 정보가 없습니다. 먼저 해당 사업자 고객센터에 문의하세요.
            </p>
          )}
          <div className="grid gap-4">
            {primary.map((o) => (
              <OrgCard key={o!.id} org={o!} tag="1차 문의처" />
            ))}
            {secondary.map((o) => (
              <OrgCard key={o!.id} org={o!} tag="추가 문의처" />
            ))}
          </div>
        </Section>

        <Section id="steps" n={2} title="해결 절차">
          <ol className="relative space-y-4 border-l-2 border-border pl-6">
            {p.steps.map((s, i) => {
              const org = s.orgId ? getOrg(s.orgId) : undefined;
              return (
                <li key={i} className="relative">
                  <span className="absolute -left-[35px] grid size-6 place-items-center rounded-full border-2 border-accent bg-card text-xs font-bold text-accent">
                    {i + 1}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-semibold text-accent">STEP {i + 1}</p>
                    {s.method && (
                      <span className="rounded bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
                        {s.method}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 font-semibold">{s.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.detail}</p>
                  {org && (
                    <a
                      href={org.onlineUrl ?? org.website}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-block text-sm font-medium text-accent underline"
                    >
                      {org.name} 바로가기
                    </a>
                  )}
                </li>
              );
            })}
          </ol>
        </Section>

        <Section id="docs" n={3} title="준비해야 할 자료">
          <ul className="grid gap-2 sm:grid-cols-2">
            {p.documents.map((d) => (
              <li key={d} className="flex items-center gap-2 rounded-lg border bg-card p-3 text-sm">
                <CheckCircle2 className="size-4 text-success" />
                {d}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="write" n={4} title="문의문 자동 작성">
          <InquiryWriter />
        </Section>

        <p className="text-xs text-muted-foreground">
          본 안내는 정보 제공용이며 법적 판단이 아닙니다. 기관 정보는 각 카드의 공식 출처와 최종
          확인일을 참고하세요.
        </p>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-card p-3 md:hidden">
        <a
          href="#write"
          className="flex h-12 items-center justify-center rounded-xl bg-accent font-semibold text-accent-foreground"
        >
          문의문 작성하기
        </a>
      </div>
    </SiteLayout>
  );
}

function InquiryWriter() {
  const p = Route.useLoaderData();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [type, setType] = useState<DocType>("고객센터 문의문");
  const [form, setForm] = useState({ game: "", date: "", facts: "", request: "" });
  const [copied, setCopied] = useState(false);
  const text = buildInquiry(p, type, form);
  const field =
    "w-full rounded-lg border bg-card px-3 py-2.5 text-base outline-none focus:border-accent";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    toast.success("문의문이 복사되었습니다");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div aria-busy={!ready} data-inquiry-ready={ready} className="grid gap-4 md:grid-cols-2">
      <div className="space-y-3">
        <div className="flex gap-1 rounded-lg bg-muted p-1">
          {(["고객센터 문의문", "환불 요청문", "기관 신고 초안"] as DocType[]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`flex-1 rounded-md px-2 py-2 text-xs font-semibold md:text-sm ${type === t ? "bg-card text-primary shadow-card" : "text-muted-foreground"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <input
          className={field}
          placeholder={p.code.startsWith("G") ? "게임명" : "대상 (회사명·기관명·서비스명)"}
          value={form.game}
          onChange={(e) => setForm({ ...form, game: e.target.value })}
        />
        <input
          className={field}
          placeholder="발생 시점 (예: 11월 1일 오후 3시)"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <textarea
          className={`${field} min-h-24`}
          placeholder="확인된 사실만 적어주세요"
          value={form.facts}
          onChange={(e) => setForm({ ...form, facts: e.target.value })}
        />
        <input
          className={field}
          placeholder="요청사항 (예: 전액 환불)"
          value={form.request}
          onChange={(e) => setForm({ ...form, request: e.target.value })}
        />
        <p className="text-xs text-muted-foreground">
          입력 내용은 저장되지 않으며 이 화면에서만 사용됩니다.
        </p>
      </div>
      <div className="flex flex-col rounded-xl border bg-card">
        <pre className="max-h-96 flex-1 overflow-auto whitespace-pre-wrap p-4 font-sans text-sm leading-relaxed">
          {text}
        </pre>
        <div className="flex gap-2 border-t p-3">
          <button
            onClick={copy}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-accent font-semibold text-accent-foreground"
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "복사됨" : "복사하기"}
          </button>
          <button
            onClick={() => setForm({ game: "", date: "", facts: "", request: "" })}
            className="flex h-12 items-center gap-2 rounded-xl border px-4 font-semibold"
          >
            <RotateCcw className="size-4" />
            다시 작성
          </button>
        </div>
      </div>
    </div>
  );
}
