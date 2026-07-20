import type { RestaurantTable, TableStatus } from "../../store/AppContext"

export type DisplayMode = "covers" | "total" | "time" | "status"

export interface TablesFilters {
  activeZone: string
  filterStatus: TableStatus | "all"
  displayMode: DisplayMode
}

export interface TablesStats {
  total: number
  available: number
  occupied: number
  reserved: number
  billRequested: number
}

export interface TableShapeGroups {
  square: RestaurantTable[]
  round: RestaurantTable[]
  rectangle: RestaurantTable[]
}
