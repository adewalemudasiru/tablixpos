import type { Transaction } from "../../store/AppContext"

export type TxStatus = "completed" | "voided" | "refunded"
export type DateRange = "Today" | "Week" | "Month" | "All"

export interface OrderRow extends Record<string, unknown> {
  id: string
  datetime: string
  customer: string
  itemCount: number
  cashier: string
  payment: string
  amount: number
  status: TxStatus
  tableNo: string
  raw: Transaction
}

export interface OrderHistoryStats {
  totalOrders: number
  totalRevenue: number
  avgOrder: number
  completedCount: number
  voidedCount: number
}
