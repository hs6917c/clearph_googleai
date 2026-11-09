import { queryOptions } from "@tanstack/react-query";
import { getSectorCatalog } from "./sectors.functions";
export const sectorQuery = queryOptions({
  queryKey: ["sector-catalog"],
  queryFn: () => getSectorCatalog(),
  staleTime: 60_000,
});
export type SectorCatalog = Awaited<ReturnType<typeof getSectorCatalog>>;
export type Sector = SectorCatalog["sectors"][number];
export function codesForSector(catalog: SectorCatalog, id: string): string[] {
  const ids = new Set([id, ...catalog.sectors.filter((s) => s.parent_id === id).map((s) => s.id)]);
  return [...new Set(catalog.links.filter((l) => ids.has(l.sector_id)).map((l) => l.problem_code))];
}
