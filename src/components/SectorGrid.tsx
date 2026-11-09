import { Link } from "@tanstack/react-router";
import {
  Gamepad2,
  ShoppingBag,
  Landmark,
  ReceiptText,
  House,
  BriefcaseBusiness,
  Store,
  Building2,
  Scale,
  GraduationCap,
  ShieldCheck,
  MessagesSquare,
  Folder,
  ArrowUpRight,
} from "lucide-react";
import { codesForSector, type SectorCatalog } from "@/lib/sectors";
const icons: Record<string, typeof Folder> = {
  gamepad: Gamepad2,
  shopping: ShoppingBag,
  landmark: Landmark,
  receipt: ReceiptText,
  home: House,
  briefcase: BriefcaseBusiness,
  store: Store,
  building: Building2,
  scale: Scale,
  graduation: GraduationCap,
  shield: ShieldCheck,
  messages: MessagesSquare,
};
export function SectorGrid({ catalog }: { catalog: SectorCatalog }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {catalog.sectors
        .filter((s) => !s.parent_id)
        .map((s) => {
          const Icon = icons[s.icon] ?? Folder;
          return (
            <Link
              key={s.id}
              to="/sectors/$slug"
              params={{ slug: s.slug }}
              className="group rounded-lg border bg-card p-5 transition hover:border-accent"
            >
              <div className="flex items-center justify-between">
                <Icon className="size-6 text-accent" />
                <ArrowUpRight className="size-4 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-semibold">{s.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
              <p className="mt-3 text-xs text-muted-foreground">
                {catalog.sectors
                  .filter((c) => c.parent_id === s.id)
                  .slice(0, 2)
                  .map((c) => c.name)
                  .join(" · ")}
              </p>
              <p className="mt-4 text-sm font-semibold text-primary">
                등록 문제 {codesForSector(catalog, s.id).length}건
              </p>
            </Link>
          );
        })}
    </div>
  );
}
