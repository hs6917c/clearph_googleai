import { Phone, Globe, ExternalLink, Clock } from "lucide-react";
import { StatusBadge } from "@/components/SiteLayout";
import type { Organization } from "@/data/catalog";

export function OrgCard({ org, tag }: { org: Organization; tag?: string }) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-card">
      <div className="flex flex-wrap items-center gap-2">
        {tag && (
          <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
            {tag}
          </span>
        )}
        <h3 className="font-semibold">{org.name}</h3>
        <StatusBadge status={org.status} />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{org.scope}</p>
      {org.methods && org.methods.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-muted-foreground">문의방법:</span>
          {org.methods.map((method, idx) => (
            <span
              key={idx}
              className="inline-flex items-center rounded bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
            >
              {method}
            </span>
          ))}
        </div>
      )}
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {org.phone ? (
          <a
            href={`tel:${org.phone}`}
            className="flex h-11 items-center justify-center gap-2 rounded-lg bg-secondary font-semibold text-primary"
          >
            <Phone className="size-4" /> {org.phone}
          </a>
        ) : (
          <span className="flex h-11 items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
            전화번호 확인 필요
          </span>
        )}
        <a
          href={org.onlineUrl ?? org.website}
          target="_blank"
          rel="noreferrer"
          className="flex h-11 items-center justify-center gap-2 rounded-lg border font-semibold"
        >
          {org.onlineUrl ? <ExternalLink className="size-4" /> : <Globe className="size-4" />}
          {org.onlineUrl ? "온라인 접수" : "공식 홈페이지"}
        </a>
      </div>
      <dl className="mt-4 space-y-1 text-xs text-muted-foreground">
        <div className="flex gap-1">
          <Clock className="size-3.5" /> 운영시간: {org.hours ?? "확인 필요"}
        </div>
        <div>한계: {org.limitations}</div>
        <div>
          출처:{" "}
          <a className="underline" href={org.sourceUrl} target="_blank" rel="noreferrer">
            {org.sourceUrl.replace("https://", "")}
          </a>{" "}
          · 최종 확인 {org.verifiedAt}
        </div>
      </dl>
    </div>
  );
}
