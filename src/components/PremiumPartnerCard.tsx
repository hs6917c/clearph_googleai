import { Sparkles, ExternalLink, CheckCircle, ShieldAlert } from "lucide-react";
import type { PremiumPartner, PartnerTag } from "@/data/partners";

function getTagBadgeStyle(tag: PartnerTag) {
  switch (tag) {
    case "Sponsored":
      return "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300";
    case "Brand":
      return "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300";
    case "프리미엄":
      return "border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300";
    default:
      return "border-primary/30 bg-primary/10 text-primary";
  }
}

export function PremiumPartnerCard({
  partner,
  isPreview = false,
}: {
  partner: PremiumPartner;
  isPreview?: boolean;
}) {
  const badgeStyle = getTagBadgeStyle(partner.tag);

  return (
    <aside
      aria-label="스폰서 파트너십 안내"
      className="relative overflow-hidden rounded-2xl border-2 border-primary/25 bg-gradient-to-br from-card via-card to-accent/5 p-5 shadow-card md:p-6"
    >
      {/* Top Banner Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-full bg-accent/15 text-accent">
            <Sparkles className="size-3.5" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            프리미엄 솔루션 파트너
          </span>
          {isPreview && (
            <span className="rounded bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              미리보기 모드
            </span>
          )}
        </div>

        {/* Brand Name with Tag Badge */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-foreground">{partner.name}</span>
          <span
            className={`inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-semibold ${badgeStyle}`}
          >
            ({partner.tag})
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-4">
        <h3 className="text-base font-bold text-foreground md:text-lg">{partner.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{partner.description}</p>

        {/* Highlight Bullets */}
        {partner.highlightPoints && partner.highlightPoints.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {partner.highlightPoints.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs font-medium text-foreground/90"
              >
                <CheckCircle className="mt-0.5 size-3.5 shrink-0 text-success" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-5 flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <ShieldAlert className="size-3.5 shrink-0 opacity-70" />
          <span>
            공식 무료 담당 기관 연락처 및 해결 절차는 아래에서 순서대로 확인하실 수 있습니다.
          </span>
        </div>

        <a
          href={partner.linkUrl}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span>{partner.ctaText}</span>
          <ExternalLink className="size-4" />
        </a>
      </div>
    </aside>
  );
}
