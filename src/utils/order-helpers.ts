import type { TxStatus } from "../types/order-history/order"

const NGN = "\u20a6"

export function statusVariant(
  s: TxStatus
): "success" | "warning" | "danger" | "info" {
  if (s === "completed") return "success"
  if (s === "voided") return "danger"
  if (s === "refunded") return "warning"
  return "info"
}

export function statusLabel(s: TxStatus): string {
  if (s === "completed") return "Completed"
  if (s === "voided") return "Voided"
  if (s === "refunded") return "Refunded"
  return s
}

export function fmtAmt(n: number): string {
  return `${NGN}${n.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function fmtStat(n: number): string {
  if (n >= 1000000) return `${NGN}${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${NGN}${(n / 1000).toFixed(0)}K`
  return `${NGN}${n.toLocaleString()}`
}

export function getPaymentIcon(color: string): string {
  const icons: Record<string, string> = {
    Cash: "#10b981",
    Card: "#2563eb",
    Transfer: "#7c3aed",
  }
  return icons[color] ?? "#9ca3af"
}
