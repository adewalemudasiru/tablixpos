import type { Transaction, KDSOrder } from "../store/AppContext"

const NGN = "\u20a6"
export function fmtK(n: number) {
  if (n >= 1000000) return `${NGN}${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${NGN}${(n / 1000).toFixed(0)}K`
  return `${NGN}${n.toLocaleString()}`
}

//======================== Currency, Date, Common formatter ===========================
export function formatCurrency(amount: number): string {
  return `${NGN}${amount.toLocaleString()}`
}

export function formatCurrencyShort(amount: number): string {
  if (amount >= 1000000) return `${NGN}${(amount / 1000000).toFixed(1)}M`
  if (amount >= 1000) return `${NGN}${(amount / 1000).toFixed(0)}K`
  return `${NGN}${amount.toLocaleString()}`
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}

export function formatDateTime(date: Date): string {
  return `${formatDate(date)} ${formatTime(date)}`
}

export function getStatusVariant(
  status: string
): "success" | "warning" | "danger" | "neutral" | "info" {
  if (status === "Completed" || status === "completed") return "success"
  if (status === "Pending" || status === "pending") return "warning"
  if (status === "Voided" || status === "voided") return "danger"
  return "neutral"
}

export function getPaymentMethod(notes: any, payments: any[]): string {
  if (notes?.paymentMethod) return notes.paymentMethod
  if (payments?.[0]?.method === "Mobile") return "Transfer"
  if (payments?.[0]?.method) return payments[0].method
  return "Cash"
}

export function calculatePrepTime(order: KDSOrder): number {
  if (!order.readyAt) return 0
  const diff =
    new Date(order.readyAt).getTime() - new Date(order.placedAt).getTime()
  return Math.max(1, Math.round(diff / 60000))
}

export function getPaymentIconColor(method: string): string {
  const icons: Record<string, string> = {
    Cash: "#10b981",
    Card: "#2563eb",
    Transfer: "#7c3aed",
  }
  return icons[method] ?? "#9ca3af"
}

//======================== Report helpers ===========================

export type Range = "Today" | "Week" | "Month" | "Year"

export function computeTrendData(txs: Transaction[], range: Range): any[] {
  if (range === "Today") {
    const hours = [
      "8am",
      "9am",
      "10am",
      "11am",
      "12pm",
      "1pm",
      "2pm",
      "3pm",
      "4pm",
      "5pm",
      "6pm",
      "7pm",
      "8pm",
      "9pm",
    ]
    const b: Record<string, { revenue: number; orders: number }> = {}
    hours.forEach((h) => {
      b[h] = { revenue: 0, orders: 0 }
    })
    txs.forEach((t) => {
      const h = new Date(t.timestamp).getHours()
      const label = h === 12 ? "12pm" : h > 12 ? `${h - 12}pm` : `${h}am`
      if (b[label]) {
        b[label].revenue += t.total
        b[label].orders += 1
      }
    })
    return hours.map((h) => ({ hour: h, ...b[h] }))
  }
  if (range === "Week") {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const now = new Date()
    const b: Record<
      string,
      { revenue: number; orders: number; profit: number }
    > = {}
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      const label = days[d.getDay() === 0 ? 6 : d.getDay() - 1]
      b[label] = { revenue: 0, orders: 0, profit: 0 }
    }
    txs.forEach((t) => {
      const d = new Date(t.timestamp)
      const label = days[d.getDay() === 0 ? 6 : d.getDay() - 1]
      if (b[label]) {
        b[label].revenue += t.total
        b[label].orders += 1
        b[label].profit += Math.round(t.total * 0.3)
      }
    })
    return Object.entries(b).map(([day, v]) => ({ day, ...v }))
  }
  if (range === "Month") {
    const now = new Date()
    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    ).getDate()
    const MONTHS = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]
    const b: Record<string, { revenue: number; orders: number }> = {}
    for (let i = 1; i <= daysInMonth; i++)
      b[`${MONTHS[now.getMonth()]} ${i}`] = { revenue: 0, orders: 0 }
    txs.forEach((t) => {
      const d = new Date(t.timestamp)
      const label = `${MONTHS[d.getMonth()]} ${d.getDate()}`
      if (b[label]) {
        b[label].revenue += t.total
        b[label].orders += 1
      }
    })
    return Object.entries(b).map(([label, v]) => ({ label, ...v }))
  }
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  const b: Record<string, { revenue: number; orders: number; profit: number }> =
    {}
  months.forEach((m) => {
    b[m] = { revenue: 0, orders: 0, profit: 0 }
  })
  txs.forEach((t) => {
    const m = months[new Date(t.timestamp).getMonth()]
    b[m].revenue += t.total
    b[m].orders += 1
    b[m].profit += Math.round(t.total * 0.3)
  })
  return months.map((label) => ({ label, ...b[label] }))
}

export function computePaymentData(txs: Transaction[]) {
  const map: Record<string, number> = {}
  txs.forEach((t) => {
    map[t.paymentMethod] = (map[t.paymentMethod] || 0) + t.total
  })
  const cols = ["#e91835", "#2563eb", "#7c3aed", "#059669", "#d97706"]
  return Object.entries(map).map(([name, value], i) => ({
    name,
    value,
    color: cols[i % cols.length],
  }))
}

export function computeCategoryData(txs: Transaction[]) {
  const map: Record<string, { revenue: number; orders: number }> = {}
  const COLS = [
    "#e91835",
    "#2563eb",
    "#d97706",
    "#059669",
    "#7c3aed",
    "#ec4899",
  ]
  txs.forEach((t) => {
    t.items.forEach((item) => {
      if (!map[item.name]) map[item.name] = { revenue: 0, orders: 0 }
      map[item.name].revenue += item.price * item.qty
      map[item.name].orders += item.qty
    })
  })
  return Object.entries(map)
    .sort(([, a], [, b]) => b.revenue - a.revenue)
    .slice(0, 6)
    .map(([name, v], i) => ({ name, ...v, color: COLS[i % COLS.length] }))
}

export function computeBestSellers(txs: Transaction[]) {
  const map: Record<string, { units: number; revenue: number }> = {}
  txs.forEach((t) => {
    t.items.forEach((item) => {
      if (!map[item.name]) map[item.name] = { units: 0, revenue: 0 }
      map[item.name].units += item.qty
      map[item.name].revenue += item.price * item.qty
    })
  })
  const sorted = Object.entries(map)
    .map(([name, v]) => ({ name, ...v }))
    .sort((a, b) => b.units - a.units)
    .slice(0, 5)
  const max = sorted[0]?.units || 1
  return sorted.map((item, i) => ({
    rank: i + 1,
    ...item,
    pct: Math.round((item.units / max) * 100),
  }))
}
