export type Range = "Today" | "Week" | "Month" | "Year"
export type ReportMode = "sales" | "kitchen"

export interface OrderRow extends Record<string, unknown> {
  inv: string
  date: string
  customer: string
  amount: string
  status: string
  cashier?: string
  payment?: string
  change?: string
  raw?: any
}

export interface KitchenRow extends Record<string, unknown> {
  id: string
  station: string
  total: number
  active: number
  avgPrep: string
  onTimeRate: string
  revenue: string
}

export interface KitchenMetrics {
  avgPrepTime: number
  totalCompleted: number
  totalActive: number
  peakStation: string
  onTimeRate: number
  stationData: Array<{
    station: string
    total: number
    active: number
    avgPrep: number
    onTimeRate: number
    revenue: number
  }>
  qualityData: Array<{
    name: string
    value: number
    color: string
  }>
}

export interface ReportsStats {
  revenue: number
  orders: number
  avg: number
  profit: number
  tax: number
  expenses: number
}
