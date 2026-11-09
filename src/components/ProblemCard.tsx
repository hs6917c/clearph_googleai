import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CreditCard,
  UserX,
  Dices,
  Globe,
  ShieldAlert,
  AlertTriangle,
} from "lucide-react";
import { categories, type CategoryId, type Problem } from "@/data/catalog";

export const categoryIcon: Record<CategoryId, typeof CreditCard> = {
  payment: CreditCard,
  account: UserX,
  probability: Dices,
  contact: Globe,
  service: ShieldAlert,
  fraud: AlertTriangle,
};

export function ProblemCard({ problem }: { problem: Problem }) {
  const Icon = categoryIcon[problem.category];
  const cat = categories.find((c) => c.id === problem.category)!;
  return (
    <Link
      to="/problems/$code"
      params={{ code: problem.code }}
      className="group flex flex-col rounded-xl border bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:border-accent"
    >
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-lg bg-secondary text-primary">
          <Icon className="size-5" />
        </span>
        <span className="text-xs font-medium text-muted-foreground">
          {cat.label} · {problem.code}
        </span>
      </div>
      <h3 className="mt-4 font-semibold leading-snug text-foreground">{problem.title}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{problem.summary}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
        해결 방법 보기 <ArrowRight className="size-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
