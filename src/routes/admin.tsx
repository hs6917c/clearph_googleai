import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo, type FormEvent } from "react";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  Plus,
  RefreshCw,
  LogOut,
  ExternalLink,
  Edit2,
  Trash2,
  Search,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  AlertCircle,
  Clock,
  Radio,
} from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  getAdminToken,
  loginAdmin,
  clearAdminToken,
  checkAdminSession,
  fetchAdminPartners,
  toggleAdminPartner,
  saveAdminPartner,
  deleteAdminPartner,
} from "@/lib/partners.service";
import { problems } from "@/data/catalog";
import { FALLBACK_SECTORS, FALLBACK_LINKS } from "@/lib/sectors.functions";
import type { PremiumPartner, PartnerTag } from "@/data/partners";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "프리미엄 파트너 관리자 | 해결경로" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "해결경로 스폰서십 및 프리미엄 파트너 CRUD 관리 페이지" },
    ],
  }),
  component: AdminPage,
});

const TAG_OPTIONS: PartnerTag[] = ["Sponsored", "프리미엄", "Brand", "공식 파트너", "제휴 솔루션"];

function getTagBadgeStyle(tag: PartnerTag) {
  switch (tag) {
    case "Sponsored":
      return "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300";
    case "Brand":
      return "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300";
    case "프리미엄":
      return "border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300";
    case "공식 파트너":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
    case "제휴 솔루션":
      return "border-teal-500/30 bg-teal-500/10 text-teal-700 dark:text-teal-300";
    default:
      return "border-primary/30 bg-primary/10 text-primary";
  }
}

function getPartnerStatus(p: PremiumPartner): {
  label: string;
  badgeClass: string;
  status: "active" | "disabled" | "expired" | "scheduled";
} {
  const today = new Date().toISOString().slice(0, 10);
  if (!p.enabled) {
    return {
      label: "비활성 (OFF)",
      badgeClass: "bg-muted text-muted-foreground border-border",
      status: "disabled",
    };
  }
  if (p.startDate && p.startDate > today) {
    return {
      label: "시작 대기 (예약)",
      badgeClass: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30",
      status: "scheduled",
    };
  }
  if (p.endDate && p.endDate < today) {
    return {
      label: "기간 만료 (종료)",
      badgeClass: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30",
      status: "expired",
    };
  }
  return {
    label: "실시간 노출 중 (ON)",
    badgeClass:
      "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 font-bold",
    status: "active",
  };
}

const EMPTY_PARTNER: Partial<PremiumPartner> = {
  name: "",
  tag: "Sponsored",
  enabled: false,
  title: "",
  description: "",
  highlightPoints: [],
  ctaText: "상담 신청하기",
  linkUrl: "https://",
  targetProblemCodes: [],
  targetSectors: [],
  priority: 10,
};

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [partners, setPartners] = useState<PremiumPartner[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 필터 및 검색
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "disabled" | "expired">(
    "all",
  );
  const [sectorFilter, setSectorFilter] = useState<string>("all");

  // 등록/수정 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partial<PremiumPartner>>(EMPTY_PARTNER);
  const [highlightsText, setHighlightsText] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // 삭제 확인 모달 상태
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // 로그인 폼 상태
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // 세션 확인
  useEffect(() => {
    async function initAuth() {
      const token = getAdminToken();
      if (!token) {
        setIsAuthenticated(false);
        setAuthChecking(false);
        return;
      }
      const valid = await checkAdminSession();
      setIsAuthenticated(valid);
      setAuthChecking(false);
      if (valid) {
        loadData();
      }
    }
    initAuth();
  }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      const data = await fetchAdminPartners();
      setPartners(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "데이터 로드 실패";
      toast.error(msg);
      if (msg.includes("권한") || msg.includes("로그인")) {
        setIsAuthenticated(false);
        clearAdminToken();
      }
    } finally {
      setIsLoading(false);
    }
  }

  // 로그인 제출
  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    if (!passwordInput.trim()) return;
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      const res = await loginAdmin(passwordInput.trim(), rememberMe);
      if (res.success) {
        setIsAuthenticated(true);
        setPasswordInput("");
        toast.success("관리자 인증에 성공했습니다.");
        await loadData();
      } else {
        setLoginError(res.error ?? "비밀번호가 올바르지 않습니다.");
      }
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : "인증 오류");
    } finally {
      setIsLoggingIn(false);
    }
  }

  // 로그아웃
  function handleLogout() {
    clearAdminToken();
    setIsAuthenticated(false);
    setPartners([]);
    toast.info("관리자 세션이 종료되었습니다.");
  }

  // On/Off 실시간 스위치 토글
  async function handleToggleSwitch(partner: PremiumPartner, nextEnabled: boolean) {
    // 낙관적 UI 업데이트
    setPartners((prev) =>
      prev.map((p) => (p.id === partner.id ? { ...p, enabled: nextEnabled } : p)),
    );

    try {
      await toggleAdminPartner(partner.id, nextEnabled);
      toast.success(
        nextEnabled
          ? `[${partner.name}] 광고가 활성화(ON)되었습니다.`
          : `[${partner.name}] 광고가 비활성화(OFF)되었습니다.`,
      );
    } catch (err: unknown) {
      // 롤백
      setPartners((prev) =>
        prev.map((p) => (p.id === partner.id ? { ...p, enabled: !nextEnabled } : p)),
      );
      toast.error(err instanceof Error ? err.message : "상태 변경 실패");
    }
  }

  // 등록/수정 모달 열기
  function handleOpenCreate() {
    setEditingPartner({
      ...EMPTY_PARTNER,
    });
    setHighlightsText("");
    setIsModalOpen(true);
  }

  function handleOpenEdit(partner: PremiumPartner) {
    setEditingPartner({ ...partner });
    setHighlightsText(partner.highlightPoints ? partner.highlightPoints.join("\n") : "");
    setIsModalOpen(true);
  }

  // 파트너 저장 (생성/수정)
  async function handleSavePartner(e: FormEvent) {
    e.preventDefault();
    if (!editingPartner.name?.trim()) {
      toast.error("파트너/브랜드명을 입력해주세요.");
      return;
    }
    if (!editingPartner.title?.trim()) {
      toast.error("헤드라인 제목을 입력해주세요.");
      return;
    }
    if (!editingPartner.description?.trim()) {
      toast.error("상세 설명을 입력해주세요.");
      return;
    }
    if (!editingPartner.ctaText?.trim()) {
      toast.error("버튼 문구를 입력해주세요.");
      return;
    }
    if (!editingPartner.linkUrl?.trim() || !/^https?:\/\//i.test(editingPartner.linkUrl.trim())) {
      toast.error("유효한 링크 URL (http:// 또는 https://)을 입력해주세요.");
      return;
    }

    setIsSaving(true);
    try {
      const highlights = highlightsText
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const payload: Partial<PremiumPartner> = {
        ...editingPartner,
        highlightPoints: highlights,
      };

      await saveAdminPartner(payload);
      toast.success(
        editingPartner.id
          ? "파트너 광고 정보가 성공적으로 수정되었습니다."
          : "새 파트너 광고가 성공적으로 등록되었습니다.",
      );
      setIsModalOpen(false);
      await loadData();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "저장 실패");
    } finally {
      setIsSaving(false);
    }
  }

  // 삭제 실행
  async function handleConfirmDelete() {
    if (!deletingId) return;
    try {
      await deleteAdminPartner(deletingId);
      toast.success("파트너 광고가 삭제되었습니다.");
      setDeletingId(null);
      await loadData();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "삭제 실패");
    }
  }

  // 필터링된 파트너 목록
  const filteredPartners = useMemo(() => {
    return partners.filter((p) => {
      // 1. 검색어 필터
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = p.name.toLowerCase().includes(q);
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchCode = p.targetProblemCodes?.some((c) => c.toLowerCase().includes(q));
        if (!matchName && !matchTitle && !matchCode) return false;
      }

      // 2. 상태 필터
      const statusInfo = getPartnerStatus(p);
      if (statusFilter === "active" && statusInfo.status !== "active") return false;
      if (statusFilter === "disabled" && statusInfo.status !== "disabled") return false;
      if (statusFilter === "expired" && statusInfo.status !== "expired") return false;

      // 3. 분야 필터
      if (sectorFilter !== "all") {
        if (!p.targetSectors?.includes(sectorFilter)) return false;
      }

      return true;
    });
  }, [partners, searchQuery, statusFilter, sectorFilter]);

  // 통계 계산
  const metrics = useMemo(() => {
    const total = partners.length;
    let active = 0;
    let disabled = 0;
    let expired = 0;

    for (const p of partners) {
      const s = getPartnerStatus(p);
      if (s.status === "active") active++;
      else if (s.status === "disabled") disabled++;
      else if (s.status === "expired") expired++;
    }
    return { total, active, disabled, expired };
  }, [partners]);

  if (authChecking) {
    return (
      <SiteLayout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="flex items-center gap-3 text-muted-foreground">
            <RefreshCw className="size-5 animate-spin" />
            <span>보안 세션 확인 중...</span>
          </div>
        </div>
      </SiteLayout>
    );
  }

  // 1. 미인증 상태: 관리자 인증 게이트 화면
  if (!isAuthenticated) {
    return (
      <SiteLayout>
        <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
          <div className="rounded-2xl border bg-card p-6 shadow-card md:p-8">
            <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Shield className="size-6" />
            </div>

            <div className="mt-4 text-center">
              <h1 className="text-xl font-bold md:text-2xl">해결경로 관리자 인증</h1>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                프리미엄 파트너십 및 광고 관리 시스템 접근을 위한 마스터 보안 암호를 입력하세요.
              </p>
            </div>

            {loginError && (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-700 dark:text-rose-300">
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <span className="leading-relaxed">{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground">
                  관리자 마스터 암호
                </label>
                <div className="relative mt-1.5">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                    <Lock className="size-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    required
                    placeholder="관리자 암호 입력"
                    className="w-full rounded-xl border bg-background py-2.5 pl-9 pr-10 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                    aria-label="비밀번호 표시 전환"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-muted-foreground">로그인 세션 유지</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn || !passwordInput.trim()}
                className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-primary-foreground transition hover:opacity-95 disabled:opacity-50"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="size-4 animate-spin" />
                    <span>인증 중...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="size-4" />
                    <span>관리자 콘솔 입장</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 border-t pt-4 text-[11px] leading-relaxed text-muted-foreground">
              <p className="flex items-center gap-1.5 font-medium text-foreground/80">
                <ShieldAlert className="size-3.5 shrink-0 text-amber-500" />
                보안 안내: 무차별 대입 방지 보호 적용
              </p>
              <p className="mt-1">
                무차별 대입 공격 방지를 위해 연속 5회 이상 인증 실패 시 15분간 접속이 일시
                제한됩니다.
              </p>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  // 2. 인증 완료 상태: 관리자 대시보드
  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
        {/* Top Header Bar */}
        <div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <ShieldCheck className="size-3.5" />
                보안 관리자 세션 활성
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-bold md:text-3xl">프리미엄 파트너 & 광고 관리</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              해결경로 상단에 노출되는 맞춤 스폰서십 광고를 등록하고 실시간 On/Off 스위치로
              제어합니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleOpenCreate}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              <Plus className="size-4" />
              <span>새 파트너/광고 등록</span>
            </button>

            <button
              onClick={loadData}
              disabled={isLoading}
              title="새로고침"
              className="inline-flex size-10 items-center justify-center rounded-xl border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <RefreshCw className={`size-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={handleLogout}
              title="로그아웃"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-destructive/20 bg-card text-destructive hover:bg-destructive/10"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>

        {/* Metrics Overview Cards */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
          <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <p className="text-xs font-semibold text-muted-foreground">전체 등록 파트너</p>
            <p className="mt-2 text-2xl font-bold text-foreground md:text-3xl">{metrics.total}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">등록된 스폰서십 총합</p>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                실시간 노출 중 (ON)
              </p>
              <Radio className="size-3.5 animate-pulse text-emerald-600" />
            </div>
            <p className="mt-2 text-2xl font-bold text-emerald-700 dark:text-emerald-300 md:text-3xl">
              {metrics.active}
            </p>
            <p className="mt-1 text-[11px] text-emerald-600/80">현재 라이브 노출 파트너</p>
          </div>

          <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <p className="text-xs font-semibold text-muted-foreground">대기/비활성 (OFF)</p>
            <p className="mt-2 text-2xl font-bold text-foreground md:text-3xl">
              {metrics.disabled}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">스위치 꺼짐 상태</p>
          </div>

          <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <p className="text-xs font-semibold text-muted-foreground">기간 만료 (종료)</p>
            <p className="mt-2 text-2xl font-bold text-foreground md:text-3xl">{metrics.expired}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">계약 기간 종료 파트너</p>
          </div>
        </div>

        {/* Filter and Search Controls */}
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="파트너명, 제목, 문제 코드(예: H001) 검색..."
              className="h-10 w-full rounded-xl border bg-background pl-9 pr-3 text-sm outline-none transition focus:border-primary"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Status Pills */}
            <div className="flex rounded-xl border bg-muted/40 p-1 text-xs">
              {(
                [
                  { id: "all", label: "전체" },
                  { id: "active", label: "노출 중" },
                  { id: "disabled", label: "비활성" },
                  { id: "expired", label: "만료" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`rounded-lg px-2.5 py-1 font-medium transition ${
                    statusFilter === tab.id
                      ? "bg-card font-semibold text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sector Dropdown */}
            <select
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="h-10 rounded-xl border bg-background px-3 text-xs outline-none"
            >
              <option value="all">모든 분야 (전체)</option>
              {FALLBACK_SECTORS.filter((s) => !s.parent_id).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Partners Table / Cards */}
        <div className="mt-6 space-y-4">
          {filteredPartners.length === 0 ? (
            <div className="rounded-2xl border border-dashed p-12 text-center">
              <Sparkles className="mx-auto size-8 text-muted-foreground/60" />
              <h3 className="mt-3 text-base font-semibold">조건에 맞는 파트너 광고가 없습니다</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                검색어를 변경하거나 우측 상단의 '+ 새 파트너/광고 등록' 버튼을 눌러 새 파트너를
                등록하세요.
              </p>
            </div>
          ) : (
            filteredPartners.map((partner) => {
              const statusInfo = getPartnerStatus(partner);
              const tagStyle = getTagBadgeStyle(partner.tag);
              const previewCode =
                partner.targetProblemCodes?.[0] ??
                FALLBACK_LINKS.find((l) => partner.targetSectors?.includes(l.sector_id))
                  ?.problem_code ??
                "H001";

              return (
                <div
                  key={partner.id}
                  className={`relative overflow-hidden rounded-2xl border bg-card p-5 transition shadow-sm hover:shadow-md ${
                    partner.enabled ? "border-primary/30" : "border-border"
                  }`}
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    {/* Left: Partner details */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Status Badge */}
                        <span
                          className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs ${statusInfo.badgeClass}`}
                        >
                          {statusInfo.label}
                        </span>

                        {/* Brand Name + Tag Badge */}
                        <span className="text-sm font-bold text-foreground md:text-base">
                          {partner.name}
                        </span>
                        <span
                          className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-semibold ${tagStyle}`}
                        >
                          ({partner.tag})
                        </span>

                        {/* Priority Badge */}
                        <span className="rounded bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                          우선순위: {partner.priority ?? 10}
                        </span>
                      </div>

                      {/* Headline */}
                      <h3 className="text-base font-semibold text-foreground md:text-lg">
                        {partner.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
                        {partner.description}
                      </p>

                      {/* Highlight Points */}
                      {partner.highlightPoints && partner.highlightPoints.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {partner.highlightPoints.map((pt, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 rounded-lg bg-muted/70 px-2.5 py-1 text-xs text-foreground/80"
                            >
                              <CheckCircle2 className="size-3 text-success" />
                              {pt}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Target Codes and Sectors */}
                      <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                        <span className="flex items-center gap-1 font-semibold text-muted-foreground">
                          <Layers className="size-3.5" />
                          매칭 타겟:
                        </span>

                        {partner.targetProblemCodes && partner.targetProblemCodes.length > 0 ? (
                          partner.targetProblemCodes.map((code) => {
                            const pData = problems.find((p) => p.code === code);
                            return (
                              <Link
                                key={code}
                                to="/problems/$code"
                                params={{ code }}
                                search={{ preview_partner: partner.id }}
                                target="_blank"
                                className="inline-flex items-center gap-1 rounded bg-accent/10 px-2 py-0.5 font-mono text-[11px] font-bold text-accent hover:underline"
                              >
                                {code} {pData?.title ? `(${pData.title})` : ""}
                              </Link>
                            );
                          })
                        ) : (
                          <span className="text-muted-foreground">문제 코드 미지정</span>
                        )}

                        {partner.targetSectors && partner.targetSectors.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1">
                            <span className="text-muted-foreground">| 분야:</span>
                            {partner.targetSectors.map((sec) => (
                              <span
                                key={sec}
                                className="rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
                              >
                                {FALLBACK_SECTORS.find((s) => s.id === sec)?.name ?? sec}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Schedule info */}
                      <div className="flex items-center gap-1.5 pt-1 text-xs text-muted-foreground">
                        <Calendar className="size-3.5" />
                        <span>집행 기간:</span>
                        <span className="font-medium text-foreground">
                          {partner.startDate || partner.endDate
                            ? `${partner.startDate ?? "개시일 미정"} ~ ${partner.endDate ?? "상시"}`
                            : "상시 노출 (기간 제한 없음)"}
                        </span>
                      </div>
                    </div>

                    {/* Right: Controls & Instant Toggle Switch */}
                    <div className="flex shrink-0 flex-row items-center justify-between gap-4 border-t pt-3 md:flex-col md:items-end md:border-t-0 md:pt-0">
                      {/* Live On/Off Switch */}
                      <div className="flex items-center gap-2 rounded-xl bg-muted/40 p-2">
                        <label
                          htmlFor={`switch-${partner.id}`}
                          className="cursor-pointer text-xs font-bold text-foreground"
                        >
                          {partner.enabled ? (
                            <span className="text-emerald-600 dark:text-emerald-400">
                              ON (노출)
                            </span>
                          ) : (
                            <span className="text-muted-foreground">OFF (비노출)</span>
                          )}
                        </label>
                        <Switch
                          id={`switch-${partner.id}`}
                          checked={partner.enabled}
                          onCheckedChange={(checked) => handleToggleSwitch(partner, checked)}
                          aria-label={`${partner.name} 활성화 스위치`}
                        />
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5">
                        <Link
                          to="/problems/$code"
                          params={{ code: previewCode }}
                          search={{ preview_partner: partner.id }}
                          target="_blank"
                          title="실제 문제 해결경로에서 카드 미리보기"
                          className="inline-flex h-8 items-center gap-1 rounded-lg border bg-card px-2.5 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          <ExternalLink className="size-3.5" />
                          <span>미리보기</span>
                        </Link>

                        <button
                          onClick={() => handleOpenEdit(partner)}
                          title="파트너 수정"
                          className="inline-flex size-8 items-center justify-center rounded-lg border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          <Edit2 className="size-3.5" />
                        </button>

                        <button
                          onClick={() => setDeletingId(partner.id)}
                          title="파트너 삭제"
                          className="inline-flex size-8 items-center justify-center rounded-lg border border-destructive/20 bg-card text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 3. 등록 및 수정 모달 Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {editingPartner.id ? "프리미엄 파트너 수정" : "새 프리미엄 파트너 등록"}
            </DialogTitle>
            <DialogDescription>
              관련 문제 유형 상단에 노출될 스폰서십 정보와 온/오프 상태를 설정합니다.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSavePartner} className="mt-3 space-y-4">
            {/* 1. 활성화 스위치 & 태그 선택 */}
            <div className="grid grid-cols-1 gap-4 rounded-xl border bg-muted/30 p-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-foreground">
                  광고 노출 상태 (On/Off)
                </label>
                <div className="mt-2 flex items-center gap-2">
                  <Switch
                    checked={editingPartner.enabled ?? false}
                    onCheckedChange={(val) =>
                      setEditingPartner((prev) => ({ ...prev, enabled: val }))
                    }
                  />
                  <span className="text-xs font-medium text-foreground">
                    {editingPartner.enabled ? "실시간 노출 (ON)" : "비노출 (OFF)"}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground">
                  브랜드명 뒤 표시 태그
                </label>
                <select
                  value={editingPartner.tag ?? "Sponsored"}
                  onChange={(e) =>
                    setEditingPartner((prev) => ({
                      ...prev,
                      tag: e.target.value as PartnerTag,
                    }))
                  }
                  className="mt-1.5 h-9 w-full rounded-lg border bg-background px-3 text-xs outline-none"
                >
                  {TAG_OPTIONS.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag} (예: 브랜드명 ({tag}))
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 2. 파트너명 및 헤드라인 */}
            <div>
              <label className="block text-xs font-semibold text-foreground">
                파트너/기업명 <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                value={editingPartner.name ?? ""}
                onChange={(e) => setEditingPartner((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="예: 로톡 전세피해 전담센터, 스마트폰 케어, 삼쩜삼 세무"
                className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground">
                광고 헤드라인 제목 <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                value={editingPartner.title ?? ""}
                onChange={(e) => setEditingPartner((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="예: 보증금 미반환·전세사기, 전문 변호사 15분 긴급 전화상담"
                className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>

            {/* 3. 상세 설명 */}
            <div>
              <label className="block text-xs font-semibold text-foreground">
                상세 설명 <span className="text-destructive">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={editingPartner.description ?? ""}
                onChange={(e) =>
                  setEditingPartner((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="솔루션에 대한 신뢰도 높은 상세 설명 문구를 입력하세요."
                className="mt-1 w-full rounded-lg border bg-background p-3 text-sm outline-none focus:border-primary"
              />
            </div>

            {/* 4. 핵심 혜택 불릿 포인트 */}
            <div>
              <label className="block text-xs font-semibold text-foreground">
                핵심 혜택 체크리스트 (줄바꿈으로 구분)
              </label>
              <textarea
                rows={3}
                value={highlightsText}
                onChange={(e) => setHighlightsText(e.target.value)}
                placeholder="예:
내용증명 작성 및 임차권등기명령 절차 1:1 가이드
보증금 반환 소송 전 승소 가능성 사전진단
야간·주말 비대면 전화 상담 지원"
                className="mt-1 w-full rounded-lg border bg-background p-3 text-xs outline-none focus:border-primary font-sans"
              />
              <p className="mt-1 text-[11px] text-muted-foreground">
                한 줄에 한 가지 핵심 혜택을 입력하면 카드에 체크마크 아이콘과 함께 표시됩니다.
              </p>
            </div>

            {/* 5. 버튼 문구 & 링크 URL */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-foreground">
                  버튼 문구 (CTA) <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingPartner.ctaText ?? ""}
                  onChange={(e) =>
                    setEditingPartner((prev) => ({ ...prev, ctaText: e.target.value }))
                  }
                  placeholder="예: 전문 변호사 상담 신청"
                  className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground">
                  이동 링크 URL (https://) <span className="text-destructive">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={editingPartner.linkUrl ?? ""}
                  onChange={(e) =>
                    setEditingPartner((prev) => ({ ...prev, linkUrl: e.target.value }))
                  }
                  placeholder="https://example.com"
                  className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* 6. 타겟 문제 코드 선택 */}
            <div>
              <label className="block text-xs font-semibold text-foreground">
                타겟팅 대상 문제 코드 (쉼표 또는 공백으로 구분)
              </label>
              <input
                type="text"
                value={editingPartner.targetProblemCodes?.join(", ") ?? ""}
                onChange={(e) => {
                  const codes = e.target.value
                    .split(/[,\s]+/)
                    .map((s) => s.trim().toUpperCase())
                    .filter((s) => s.length > 0);
                  setEditingPartner((prev) => ({ ...prev, targetProblemCodes: codes }));
                }}
                placeholder="예: H001, H004"
                className="mt-1 h-10 w-full rounded-lg border bg-background px-3 font-mono text-xs uppercase outline-none focus:border-primary"
              />
              <p className="mt-1 text-[11px] text-muted-foreground">
                입력된 문제 코드 상세 페이지의 &apos;1. 담당 기관 및 연락처&apos; 최상단에만
                정밀하게 노출됩니다.
              </p>
            </div>

            {/* 7. 타겟팅 대상 분야(Sector) */}
            <div>
              <label className="block text-xs font-semibold text-foreground">
                타겟팅 대상 분야 (다중 선택)
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {FALLBACK_SECTORS.filter((s) => !s.parent_id).map((sec) => {
                  const isChecked = editingPartner.targetSectors?.includes(sec.id) ?? false;
                  return (
                    <label
                      key={sec.id}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border p-2 text-xs transition ${
                        isChecked
                          ? "border-primary bg-primary/5 font-semibold text-primary"
                          : "bg-background text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          const current = editingPartner.targetSectors ?? [];
                          if (e.target.checked) {
                            setEditingPartner((prev) => ({
                              ...prev,
                              targetSectors: [...current, sec.id],
                            }));
                          } else {
                            setEditingPartner((prev) => ({
                              ...prev,
                              targetSectors: current.filter((s) => s !== sec.id),
                            }));
                          }
                        }}
                        className="rounded border-border text-primary focus:ring-primary"
                      />
                      <span>{sec.name}</span>
                    </label>
                  );
                })}
              </div>
              <p className="mt-1.5 text-[11px] text-muted-foreground">
                특정 문제 코드가 입력된 경우 해당 코드에만 노출되며(동일 분야 내 무관한 문제에는
                미노출), 문제 코드를 비워둔 경우에만 선택한 분야 전체에 노출됩니다.
              </p>
            </div>

            {/* 8. 집행 기간 및 노출 우선순위 */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-semibold text-foreground">
                  광고 시작일 (선택)
                </label>
                <input
                  type="date"
                  value={editingPartner.startDate ?? ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEditingPartner((prev) => {
                      const next = { ...prev };
                      if (val) next.startDate = val;
                      else delete next.startDate;
                      return next;
                    });
                  }}
                  className="mt-1 h-10 w-full rounded-lg border bg-background px-2 text-xs outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground">
                  광고 종료일 (선택)
                </label>
                <input
                  type="date"
                  value={editingPartner.endDate ?? ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEditingPartner((prev) => {
                      const next = { ...prev };
                      if (val) next.endDate = val;
                      else delete next.endDate;
                      return next;
                    });
                  }}
                  className="mt-1 h-10 w-full rounded-lg border bg-background px-2 text-xs outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground">
                  우선순위 (0~100)
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={editingPartner.priority ?? 10}
                  onChange={(e) =>
                    setEditingPartner((prev) => ({
                      ...prev,
                      priority: parseInt(e.target.value, 10) || 0,
                    }))
                  }
                  className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>

            <DialogFooter className="mt-4 gap-2 sm:gap-0">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="h-10 rounded-xl border px-4 text-xs font-semibold hover:bg-muted"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-xs font-semibold text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="size-3.5 animate-spin" />
                    <span>저장 중...</span>
                  </>
                ) : (
                  <span>저장 및 반영</span>
                )}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 4. 삭제 확인 Alert Dialog */}
      <AlertDialog open={Boolean(deletingId)} onOpenChange={(open) => !open && setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>파트너 광고를 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              삭제된 파트너 광고는 해결경로 페이지에서 즉시 노출 중단되며, 데이터가 영구적으로
              제거됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              삭제 확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SiteLayout>
  );
}
