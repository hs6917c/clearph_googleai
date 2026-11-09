import { Link, useNavigate } from "@tanstack/react-router";
import { Route as RouteIcon, Search, Menu, X } from "lucide-react";
import { useState, type ReactNode, type FormEvent } from "react";
import type { Verification } from "@/data/catalog";

const nav = [
  { to: "/", label: "홈" },
  { to: "/solve", label: "문제 해결" },
  { to: "/sectors", label: "분야 탐색" },
  { to: "/problems", label: "문제 유형별 안내" },
  { to: "/organizations", label: "기관 찾기" },
  { to: "/about", label: "서비스 소개" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-primary">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <RouteIcon className="size-4" />
            </span>
            해결경로
          </Link>
          <nav className="hidden gap-1 md:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground data-[status=active]:text-primary data-[status=active]:font-semibold"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <button className="md:hidden p-2" aria-label="메뉴" onClick={() => setOpen(!open)}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {open && (
          <nav className="grid border-t px-4 py-2 md:hidden">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-sm font-medium"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t bg-card">
        <div className="mx-auto max-w-6xl px-4 py-8 text-xs leading-relaxed text-muted-foreground">
          <p className="font-semibold text-foreground">해결경로</p>
          <p className="mt-1">
            본 서비스는 정보 안내 및 절차 지원 서비스이며, 법률 상담이나 법적 판단을 제공하지
            않습니다.
          </p>
          <p>
            기관 정보는 공식 출처를 기준으로 하며, '확인 필요' 표시 정보는 이용 전 공식 홈페이지에서
            다시 확인해 주세요.
          </p>
        </div>
      </footer>
    </div>
  );
}

export function SearchBox({ initial = "", size = "lg" }: { initial?: string; size?: "lg" | "md" }) {
  const [q, setQ] = useState(initial);
  const navigate = useNavigate();
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate({ to: "/solve", search: { q: q.trim() } });
  };
  const lg = size === "lg";
  return (
    <form
      onSubmit={submit}
      role="search"
      className={`flex w-full items-center gap-2 rounded-2xl border bg-card p-2 ${lg ? "shadow-search" : "shadow-card"}`}
    >
      <Search className="ml-2 size-5 shrink-0 text-muted-foreground" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        enterKeyHint="search"
        aria-label="문제 상황 입력"
        placeholder="예: 결제했는데 아이템이 안 들어왔어요"
        className={`min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground ${lg ? "h-12 text-base md:text-lg" : "h-10 text-base"}`}
      />
      <button
        type="submit"
        className={`shrink-0 rounded-xl bg-accent font-semibold text-accent-foreground hover:opacity-90 ${lg ? "h-12 px-5 md:px-7" : "h-10 px-4"}`}
      >
        찾기
      </button>
    </form>
  );
}

export function StatusBadge({ status }: { status: Verification }) {
  const cls =
    status === "확인 완료"
      ? "bg-success-soft text-success"
      : status === "사용 중지"
        ? "bg-muted text-muted-foreground"
        : "bg-warning-soft text-warning";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${cls}`}
    >
      {status}
    </span>
  );
}
