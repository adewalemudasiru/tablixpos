import type { RestaurantTable, TableStatus } from "../store/AppContext"
import type { TableShapeGroups } from "../types/tables-page/tables"

export function elapsed(iso?: string): string {
  if (!iso) return ""
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m`
  const h = Math.floor(mins / 60),
    r = mins % 60
  return r > 0 ? `${h}h ${r}m` : `${h}h`
}

//=========================================================================

export function groupTablesByShape(
  tables: RestaurantTable[]
): TableShapeGroups {
  return {
    square: tables.filter((t) => !t.shape || t.shape === "square"),
    round: tables.filter((t) => t.shape === "round"),
    rectangle: tables.filter((t) => t.shape === "rectangle"),
  }
}

export function getTableCountByStatus(
  tables: RestaurantTable[],
  status: TableStatus
): number {
  return tables.filter((t) => t.status === status).length
}

export function getZones(tables: RestaurantTable[]): string[] {
  const zones = new Set(tables.map((t) => t.zone))
  return ["All", ...Array.from(zones)]
}

export function filterTables(
  tables: RestaurantTable[],
  activeZone: string,
  filterStatus: TableStatus | "all"
): RestaurantTable[] {
  return tables.filter((t) => {
    const zoneOk = activeZone === "All" || t.zone === activeZone
    const statusOk = filterStatus === "all" || t.status === filterStatus
    return zoneOk && statusOk
  })
}
