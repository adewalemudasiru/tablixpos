import type { Transaction } from "../store/AppContext"

export function fmtAmt(n: number) {
  return "₦" + n.toLocaleString("en-NG", { minimumFractionDigits: 2 })
}

export function fmtDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export function fmtTime(ts: number) {
  return new Date(ts).toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

// ====================================================

export function formatExposure(amount: number): string {
  return (
    "₦" +
    (amount >= 1000 ? (amount / 1000).toFixed(1) + "k" : amount.toFixed(0))
  )
}

export function getStatusColor(status: "voided" | "refunded"): string {
  return status === "refunded" ? "#d97706" : "#e91835"
}

export function getStatusBadgeVariant(
  status: "voided" | "refunded"
): "danger" | "warning" {
  return status === "refunded" ? "warning" : "danger"
}

export function getStatusLabel(status: "voided" | "refunded"): string {
  return status === "refunded" ? "Refund" : "Void"
}

export function generateCSV(adjustments: Transaction[]): string {
  const header = [
    "ID",
    "Type",
    "Date",
    "Time",
    "Adjustment Date",
    "Cashier",
    "Approved By",
    "Customer",
    "Payment",
    "Items",
    "Total",
  ]
  const rows = adjustments.map((tx) => [
    tx.id,
    tx.status ?? "",
    fmtDate(tx.timestamp),
    fmtTime(tx.timestamp),
    tx.voidedAt ? fmtDate(tx.voidedAt) + " " + fmtTime(tx.voidedAt) : "",
    tx.cashier ?? "",
    tx.voidedBy ?? "",
    tx.customer?.name ?? "Walk-in",
    tx.paymentMethod,
    tx.items.map((i) => `${i.qty}x ${i.name}`).join("; "),
    tx.total.toFixed(2),
  ])
  return [header, ...rows]
    .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n")
}

export function downloadCSV(csv: string, filename: string): void {
  const blob = new Blob([csv], { type: "text/csv" })
  const a = document.createElement("a")
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
  URL.revokeObjectURL(a.href)
}
