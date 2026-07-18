import type { Transaction } from "../../store/AppContext"

export type FilterType = "all" | "voided" | "refunded"
export type DateRange = "Today" | "Week" | "Month" | "All"

export interface SettlementStats {
  totalAdjustments: number
  totalVoided: number
  totalRefunded: number
  totalExposure: number
  uniqueApprovers: string[]
}

export interface SettlementRowProps {
  tx: Transaction
  isDark?: boolean
  onClick: (tx: Transaction) => void
}

export interface SettlementListProps {
  adjustments: Transaction[]
  isDark?: boolean
  onRowClick: (tx: Transaction) => void
}
