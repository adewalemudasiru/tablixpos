import React, { useState, useMemo, useEffect, useCallback } from "react"
import { useAppStore } from "../store/AppContext"
import type { Transaction, KDSOrder } from "../store/AppContext"
import { LogoutConfirmationModal } from "../components/LogoutConfirmationModal"
import { AppSidebar, AppLogo, MobileBottomNav } from "../components/AppSidebar"
import { NavMenu } from "../components/NavMenu"
import { Badge } from "../components/ds/Badge"
import { DataTable } from "../components/ds/DataTable"
import { colors, radius, shadows } from "../components/ds/tokens"
import { StatCard } from "../components/ds/StatCard"
import { Modal } from "../components/ds/Modal"
import { Button } from "../components/ds/Button"
import type { ColumnDef } from "../components/ds/DataTable"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { transactionsAPI, expensesAPI } from "../services/api"
import type { ApiOrder, ApiExpense } from "../services/api"
import { StatCards } from "@/components/reports-page/StatCards"
import { BestSellers } from "@/components/reports-page/BestSellers"
import { RevenueProfitChart } from "@/components/reports-page/RevenueProfitChart"
import { SalesTrendChart } from "@/components/reports-page/SalesTrendChart"
import { CategoryChart } from "@/components/reports-page/CategoryChart"
import { PaymentDistribution } from "@/components/reports-page/PaymentDistribution"
import { ProfitAndLoss } from "@/components/reports-page/ProfitAndLoss"
import { KitchenStatCards } from "@/components/reports-page/KitchenStatCards"
import { StationVolumeChart } from "@/components/reports-page/StationVolumeChart"
import { StationPrepTimeChart } from "@/components/reports-page/StationPrepTimeChart"

const INTER = "'Inter', sans-serif"
const NGN = "\u20a6"
const CARD =
  "page-card rounded-2xl border page-border shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_4px_16px_0_rgba(0,0,0,0.04)]"

// ─── Range helpers ────────────────────────────────────────────────────────────

type Range = "Today" | "Week" | "Month" | "Year"

function computeTrendData(txs: Transaction[], range: Range): any[] {
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

function computePaymentData(txs: Transaction[]) {
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

function computeCategoryData(txs: Transaction[]) {
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

function computeBestSellers(txs: Transaction[]) {
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

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

// ─── Stat Cards ──────────────────────────────────────────────────────────────

// ─── Sales Trend Chart ────────────────────────────────────────────────────────

// ─── Revenue vs Profit / Peak Hours ──────────────────────────────────────────

// ─── Category Breakdown ───────────────────────────────────────────────────────

// ─── Payment Distribution ─────────────────────────────────────────────────────

// ─── Best Sellers ─────────────────────────────────────────────────────────────

// ─── Profit and Loss ──────────────────────────────────────────────────────────

// ─── Recent Orders table ──────────────────────────────────────────────────────

type OrderRow = Record<string, unknown> & {
  inv: string
  date: string
  customer: string
  amount: string
  status: string
  raw?: any
}
const ORDER_COLUMNS: ColumnDef<OrderRow>[] = [
  {
    key: "inv",
    label: "Invoice",
    sortable: true,
    render: (v) => (
      <span style={{ color: colors.infoText, fontWeight: 500, fontSize: 12 }}>
        {String(v)}
      </span>
    ),
  },
  { key: "date", label: "Date", sortable: true },
  { key: "customer", label: "Customer", sortable: true },
  {
    key: "cashier",
    label: "Cashier",
    sortable: true,
    render: (v) => (
      <span style={{ color: "var(--page-text-secondary)", fontSize: 13 }}>
        {String(v)}
      </span>
    ),
  },
  {
    key: "payment",
    label: "Payment",
    sortable: true,
    render: (v) => {
      const isCash = String(v).toLowerCase() === "cash"
      return <Badge variant={isCash ? "success" : "info"}>{String(v)}</Badge>
    },
  },
  {
    key: "status",
    label: "Status",
    align: "center",
    render: (v) => (
      <Badge
        variant={
          v === "Completed" ? "success" : v === "Pending" ? "warning" : "danger"
        }
      >
        {String(v)}
      </Badge>
    ),
  },
  {
    key: "change",
    label: "Change",
    align: "right",
    render: (v) => (
      <span style={{ color: "var(--page-text-muted)", fontSize: 13 }}>
        {v ? String(v) : "-"}
      </span>
    ),
  },
  {
    key: "amount",
    label: "Amount",
    align: "right",
    sortable: true,
    mobileInline: true,
    render: (v) => (
      <span style={{ fontWeight: 600, color: colors.textPrimary }}>
        {String(v)}
      </span>
    ),
  },
]

// ─── Kitchen Performance Helper Components ─────────────────────────────────────

type KitchenRow = Record<string, unknown> & {
  id: string
  station: string
  total: number
  active: number
  avgPrep: string
  onTimeRate: string
  revenue: string
}

const KITCHEN_COLUMNS: ColumnDef<KitchenRow>[] = [
  {
    key: "station",
    label: "Station Name",
    sortable: true,
    render: (v) => (
      <span style={{ fontWeight: 600, color: "var(--page-text)" }}>
        {String(v)}
      </span>
    ),
  },
  { key: "total", label: "Total Tickets", sortable: true, align: "center" },
  {
    key: "active",
    label: "Active Queue",
    sortable: true,
    align: "center",
    render: (v) => (
      <Badge variant={Number(v) > 0 ? "warning" : "neutral"}>
        {String(v)} active
      </Badge>
    ),
  },
  {
    key: "avgPrep",
    label: "Avg Prep Time",
    sortable: true,
    align: "right",
    render: (v) => (
      <span style={{ fontWeight: 500, color: "var(--page-text)" }}>
        {String(v)}
      </span>
    ),
  },
  {
    key: "onTimeRate",
    label: "On-Time Rate",
    sortable: true,
    align: "right",
    render: (v) => (
      <Badge
        variant={
          Number(String(v).replace("%", "")) >= 80 ? "success" : "danger"
        }
      >
        {String(v)}
      </Badge>
    ),
  },
  {
    key: "revenue",
    label: "Revenue",
    sortable: true,
    align: "right",
    render: (v) => (
      <span style={{ fontWeight: 600, color: "var(--page-text)" }}>
        {String(v)}
      </span>
    ),
  },
]

function PrepQualityChart({ qualityData }: { qualityData: any[] }) {
  const total = qualityData.reduce((s, p) => s + p.value, 0)
  return (
    <div className={`${CARD} flex flex-col gap-4 p-5 md:p-6`}>
      <div>
        <p
          style={{
            fontFamily: INTER,
            fontWeight: 600,
            fontSize: 15,
            color: "var(--page-text)",
          }}
        >
          Turnaround Quality
        </p>
        <p
          style={{
            fontFamily: INTER,
            fontSize: 12,
            color: "var(--page-text-muted)",
            marginTop: 2,
          }}
        >
          Preparation speed classification
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <div style={{ width: 130, height: 130, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={qualityData}
                cx="50%"
                cy="50%"
                innerRadius={38}
                outerRadius={60}
                paddingAngle={3}
                dataKey="value"
              >
                {qualityData.map((p, i) => (
                  <Cell key={`cell-${i}`} fill={p.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: number) => `${v} orders`}
                contentStyle={{
                  fontFamily: INTER,
                  fontSize: 11,
                  borderRadius: 10,
                  border: "1px solid var(--page-border)",
                  background: "var(--page-card-bg)",
                  color: "var(--page-text)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          {qualityData.map((p) => {
            const pct = total > 0 ? Math.round((p.value / total) * 100) : 0
            return (
              <div key={p.name}>
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="size-2.5 rounded-full"
                      style={{ background: p.color }}
                    />
                    <span
                      style={{
                        fontFamily: INTER,
                        fontWeight: 500,
                        fontSize: 12,
                        color: "var(--page-text-secondary)",
                      }}
                    >
                      {p.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      style={{
                        fontFamily: INTER,
                        fontWeight: 600,
                        fontSize: 12,
                        color: "var(--page-text)",
                      }}
                    >
                      {p.value}
                    </span>
                    <span
                      style={{
                        fontFamily: INTER,
                        fontSize: 10,
                        color: "var(--page-text-muted)",
                      }}
                    >
                      {pct}%
                    </span>
                  </div>
                </div>
                <div
                  className="h-1.5 overflow-hidden rounded-full"
                  style={{ background: "var(--page-surface-2)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: p.color }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Receipt Modal ────────────────────────────────────────────────────────────

function ReceiptModal({
  tx,
  open,
  onClose,
  restaurantName,
}: {
  tx: any
  open: boolean
  onClose: () => void
  restaurantName: string
}) {
  if (!tx) return null

  const now = new Date(tx.timestamp)
  const dateStr = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
  const timeStr = now.toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
  })
  const taxLabel = tx.taxLabel ?? "VAT"
  const taxRate = tx.taxRate != null ? tx.taxRate : 7.5
  const totalItems = tx.items.reduce((s: number, i: any) => s + i.qty, 0)

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Order Receipt"
      subtitle={tx.id}
      size="md"
      showClose
      closeOnBackdrop
    >
      <div style={{ fontFamily: INTER }}>
        <div className="mb-4 grid grid-cols-2 gap-x-4 gap-y-2">
          {[
            ["Date", dateStr],
            ["Time", timeStr],
            ["Customer", tx.customer?.name || "Walk-in Customer"],
            ["Cashier", tx.cashier || "Staff"],
            ["Payment Method", tx.paymentMethod],
            ...(tx.tableNo ? [["Table", tx.tableNo]] : []),
          ].map(([label, val]) => (
            <div key={label}>
              <p
                style={{
                  fontSize: 11,
                  color: "var(--page-text-muted)",
                  marginBottom: 2,
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--page-text)",
                }}
              >
                {val}
              </p>
            </div>
          ))}
        </div>

        <div className="my-3 border-t border-dashed border-gray-200" />

        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "var(--page-text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 8,
          }}
        >
          Items Ordered ({totalItems})
        </p>
        <div className="mb-4 flex flex-col gap-2">
          {tx.items.map((item: any, i: number) => {
            const unitPrice = item.qty > 0 ? item.price / item.qty : item.price
            return (
              <React.Fragment key={i}>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className="flex size-5 shrink-0 items-center justify-center rounded-md"
                      style={{
                        background: "var(--c-primary-light)",
                        fontSize: 10,
                        fontWeight: 700,
                        color: colors.primary,
                      }}
                    >
                      {item.qty}
                    </span>
                    <div className="min-w-0">
                      <p
                        style={{
                          fontSize: 13,
                          color: "var(--page-text-secondary)",
                        }}
                        className="truncate"
                      >
                        {item.name}
                      </p>
                      <p
                        style={{
                          fontSize: 10,
                          color: "var(--page-text-muted)",
                        }}
                      >
                        {NGN}
                        {unitPrice.toLocaleString()} each
                      </p>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--page-text)",
                      flexShrink: 0,
                    }}
                  >
                    {NGN}
                    {item.price.toLocaleString()}
                  </span>
                </div>
              </React.Fragment>
            )
          })}
        </div>

        <div className="my-3 border-t border-dashed border-gray-200" />

        <div className="flex flex-col gap-1.5">
          <div className="mt-1 flex items-center justify-between border-t border-gray-100 pt-2">
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "var(--page-text)",
              }}
            >
              Total
            </span>
            <span
              style={{ fontSize: 16, fontWeight: 700, color: colors.primary }}
            >
              {NGN}
              {tx.total.toLocaleString()}
            </span>
          </div>
          {tx.changeAmount && tx.changeAmount > 0 ? (
            <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2">
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--page-text-muted)",
                }}
              >
                Change
              </span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#16a34a" }}>
                {NGN}
                {tx.changeAmount.toLocaleString()}
              </span>
            </div>
          ) : null}
        </div>

        <div className="mt-5 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReportsPage() {
  const { staff, kdsOrders, tables, stations, menuItems, kotEnabled } =
    useAppStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [range, setRange] = useState<Range>("Month")
  const [reportMode, setReportMode] = useState<"sales" | "kitchen">("sales")
  const [selectedTx, setSelectedTx] = useState<any | null>(null)

  // Force reportMode to sales if KOT (Kitchen Display) is disabled
  const activeReportMode = kotEnabled ? reportMode : "sales"

  // ── Backend data ──────────────────────────────────────────────────────────
  const [apiOrders, setApiOrders] = useState<ApiOrder[]>([])
  const [apiExpenses, setApiExpenses] = useState<ApiExpense[]>([])
  const [loading, setLoading] = useState(true)

  const RANGES: Range[] = ["Today", "Week", "Month", "Year"]

  // Date range helpers
  const rangeStartISO = useMemo(() => {
    const d = new Date()
    if (range === "Today") {
      d.setHours(0, 0, 0, 0)
    } else if (range === "Week") {
      d.setDate(d.getDate() - 7)
    } else if (range === "Month") {
      d.setMonth(d.getMonth() - 1)
    } else {
      d.setFullYear(d.getFullYear() - 1)
    }
    return d.toISOString()
  }, [range])

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [txRes, expRes] = await Promise.all([
        transactionsAPI.list({ limit: 200, startDate: rangeStartISO }),
        expensesAPI.list({ limit: 200, startDate: rangeStartISO }),
      ])
      setApiOrders(txRes.data.transactions ?? [])
      setApiExpenses(expRes.data.expenses ?? [])
    } catch (_) {
      // fall back to empty — charts show zeros
    } finally {
      setLoading(false)
    }
  }, [rangeStartISO])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // ── Compute metrics from API orders ──────────────────────────────────────
  const completedOrders = useMemo(
    () => apiOrders.filter((o) => o.paymentStatus === "Completed"),
    [apiOrders]
  )

  const liveRevenue = completedOrders.reduce((s, o) => s + o.total, 0)
  const liveOrders = completedOrders.length
  const liveAvg = liveOrders > 0 ? Math.round(liveRevenue / liveOrders) : 0
  const liveTax = completedOrders.reduce((s, o) => s + (o.tax || 0), 0)
  const liveExpenses = apiExpenses.reduce((s, e) => s + e.amount, 0)
  const liveProfit = Math.max(
    0,
    liveRevenue -
      (liveExpenses > 0 ? liveExpenses : Math.round(liveRevenue * 0.35))
  )

  // ── Map API orders → Transaction shape for existing chart helpers ─────────
  const completedTxs: Transaction[] = useMemo(
    () =>
      completedOrders.map((o) => {
        let parsedNotes: any = {}
        try {
          parsedNotes = JSON.parse(o.notes || "{}")
        } catch (e) {}

        const pMethod =
          parsedNotes.paymentMethod ||
          ((o as any).payments?.[0]?.method === "Mobile"
            ? "Transfer"
            : ((o as any).payments?.[0]?.method ?? "Cash"))

        return {
          id: o.id,
          timestamp: new Date(o.createdAt).getTime(),
          items: o.items.map((i) => ({
            id: i.id,
            name: (i as any).menuItem?.name ?? i.menuItemId,
            price: i.unitPrice,
            qty: i.quantity,
            station:
              menuItems.find((m) => m.id === i.menuItemId)?.station ||
              "General",
          })),
          customer: { id: "api", name: "Walk-in" },
          subtotal: o.subtotal,
          vat: o.tax,
          total: o.total,
          paymentMethod: pMethod,
          changeAmount: parsedNotes.change || 0,
          cashier: parsedNotes.cashier || "Staff",
          status: "completed" as const,
        }
      }),
    [completedOrders]
  )

  const trendData = useMemo(
    () => computeTrendData(completedTxs, range),
    [completedTxs, range]
  )
  const payData = useMemo(
    () => computePaymentData(completedTxs),
    [completedTxs]
  )
  const catData = useMemo(
    () => computeCategoryData(completedTxs),
    [completedTxs]
  )
  const sellers = useMemo(
    () => computeBestSellers(completedTxs),
    [completedTxs]
  )

  const recentOrders: OrderRow[] = useMemo(
    () =>
      apiOrders.slice(0, 20).map((o) => {
        const d = new Date(o.createdAt)
        let parsedNotes: any = {}
        try {
          parsedNotes = JSON.parse(o.notes || "{}")
        } catch (e) {}

        const pMethod =
          parsedNotes.paymentMethod ||
          ((o as any).payments?.[0]?.method === "Mobile"
            ? "Transfer"
            : ((o as any).payments?.[0]?.method ?? "Cash"))

        return {
          inv: o.id.slice(-8).toUpperCase(),
          date:
            d.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }) +
            " " +
            d.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
          customer: "Walk-in",
          cashier: parsedNotes.cashier || "Staff",
          payment: pMethod,
          change: parsedNotes.change
            ? `${NGN}${parsedNotes.change.toLocaleString()}`
            : "",
          amount: `${NGN}${o.total.toLocaleString()}`,
          status:
            o.paymentStatus === "Completed"
              ? "Completed"
              : o.status === "Cancelled"
                ? "Voided"
                : "Pending",
          raw: {
            id: o.id,
            timestamp: d.getTime(),
            items: o.items.map((i) => ({
              id: i.id,
              name: i.menuItemId,
              price: i.unitPrice,
              qty: i.quantity,
            })),
            customer: { name: "Walk-in Customer" },
            subtotal: o.subtotal,
            total: o.total,
            paymentMethod: pMethod,
            changeAmount: parsedNotes.change || 0,
            cashier: parsedNotes.cashier || "Staff",
            status: o.paymentStatus === "Completed" ? "completed" : "pending",
          },
        }
      }),
    [apiOrders]
  )

  // ── Kitchen Turnaround Calculations ──────────────────────────────────────
  const kitchenMetrics = useMemo(() => {
    const rangeStart = new Date(rangeStartISO).getTime()
    const periodOrders = kdsOrders.filter(
      (o) => new Date(o.placedAt).getTime() >= rangeStart
    )

    const completed = periodOrders.filter(
      (o) => o.readyAt && (o.status === "Ready" || o.status === "Served")
    )
    const active = periodOrders.filter(
      (o) => o.status === "New" || o.status === "In Progress"
    )

    const getPrepMins = (o: KDSOrder) => {
      if (!o.readyAt) return 0
      const diff =
        new Date(o.readyAt).getTime() - new Date(o.placedAt).getTime()
      return Math.max(1, Math.round(diff / 60000))
    }

    const totalPrepTime = completed.reduce((sum, o) => sum + getPrepMins(o), 0)
    const avgPrepTime =
      completed.length > 0 ? Math.round(totalPrepTime / completed.length) : 12

    const onTimeCount = completed.filter((o) => getPrepMins(o) <= 15).length
    const onTimeRate =
      completed.length > 0
        ? Math.round((onTimeCount / completed.length) * 100)
        : 85

    const stationData = stations.map((station) => {
      const stationOrders = periodOrders.filter((o) => o.station === station)
      const stationCompleted = stationOrders.filter(
        (o) => o.readyAt && (o.status === "Ready" || o.status === "Served")
      )
      const stationActive = stationOrders.filter(
        (o) => o.status === "New" || o.status === "In Progress"
      )

      const stationTotalPrepTime = stationCompleted.reduce(
        (sum, o) => sum + getPrepMins(o),
        0
      )
      const stationAvgPrep =
        stationCompleted.length > 0
          ? Math.round(stationTotalPrepTime / stationCompleted.length)
          : 10

      const stationOnTime = stationCompleted.filter(
        (o) => getPrepMins(o) <= 15
      ).length
      const stationOnTimeRate =
        stationCompleted.length > 0
          ? Math.round((stationOnTime / stationCompleted.length) * 100)
          : 90

      const stationRevenue = completedTxs.reduce((sum, tx) => {
        if (tx.timestamp < rangeStart) return sum
        return (
          sum +
          tx.items.reduce(
            (s, item: any) =>
              item.station === station ? s + item.price * item.qty : s,
            0
          )
        )
      }, 0)

      return {
        station,
        total: stationOrders.length,
        active: stationActive.length,
        avgPrep: stationAvgPrep,
        onTimeRate: stationOnTimeRate,
        revenue: stationRevenue,
      }
    })

    const peakStationObj = [...stationData].sort((a, b) => b.total - a.total)[0]
    const peakStation = peakStationObj ? peakStationObj.station : "Hot Kitchen"

    const qualityCategories = {
      "On-Time (< 12m)": completed.filter((o) => getPrepMins(o) < 12).length,
      "Standard (12-18m)": completed.filter(
        (o) => getPrepMins(o) >= 12 && getPrepMins(o) <= 18
      ).length,
      "Delayed (> 18m)": completed.filter((o) => getPrepMins(o) > 18).length,
    }

    const hasData = completed.length > 0
    const qualityData = Object.entries(qualityCategories).map(
      ([name, value], idx) => {
        const colors = ["#24b04b", "#ff9500", "#e91835"]
        return {
          name,
          value: hasData ? value : idx === 0 ? 70 : idx === 1 ? 20 : 10,
          color: colors[idx],
        }
      }
    )

    return {
      avgPrepTime,
      totalCompleted: completed.length,
      totalActive: active.length,
      peakStation,
      onTimeRate,
      stationData,
      qualityData,
    }
  }, [kdsOrders, rangeStartISO, stations, completedTxs])

  const kitchenRows: KitchenRow[] = useMemo(() => {
    return kitchenMetrics.stationData.map((s: any, idx: number) => ({
      id: `kitchen-row-${idx}`,
      station: s.station,
      total: s.total,
      active: s.active,
      avgPrep: `${s.avgPrep} mins`,
      onTimeRate: `${s.onTimeRate}%`,
      revenue: `${NGN}${s.revenue.toLocaleString()}`,
    }))
  }, [kitchenMetrics])

  return (
    <div
      className="flex h-screen flex-col overflow-hidden"
      style={{ background: "var(--page-bg)" }}
    >
      <header
        className="page-header z-30 flex h-[69px] shrink-0 items-center justify-between border-b px-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] md:px-6"
        style={{
          background: "var(--page-header-bg)",
          borderColor: "var(--page-header-border)",
        }}
      >
        <div className="flex items-center gap-3">
          <AppLogo />
          <NavMenu />
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <AppSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={() => setShowLogout(true)}
          activeId="reports"
        />

        <main
          className="flex-1 overflow-y-auto pb-[72px] md:pb-0"
          style={{ background: "var(--page-surface)" }}
        >
          <div className="px-4 pt-4 pb-2 md:hidden">
            <div>
              <h1
                style={{
                  fontFamily: INTER,
                  fontWeight: 600,
                  fontSize: 18,
                  color: "var(--page-text)",
                }}
              >
                Analytics &amp; Reports
              </h1>
              <p
                style={{
                  fontFamily: INTER,
                  fontWeight: 400,
                  fontSize: 14,
                  color: "var(--page-text-muted)",
                  marginTop: 4,
                }}
              >
                Sales trends, performance metrics, and business insights
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5 p-4 md:gap-6 md:p-6 lg:p-8">
            <div className="hidden md:block">
              <h1
                style={{
                  fontFamily: INTER,
                  fontWeight: 600,
                  fontSize: 18,
                  color: "var(--page-text)",
                }}
              >
                Analytics &amp; Reports
              </h1>
              <p
                style={{
                  fontFamily: INTER,
                  fontWeight: 400,
                  fontSize: 14,
                  color: "var(--page-text-muted)",
                  marginTop: 4,
                }}
              >
                Sales trends, performance metrics, and business insights
              </p>
            </div>

            {/* Filter by period and report mode toggles inside the page */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div
                className="flex items-center gap-0.5 self-start rounded-xl p-1"
                style={{ background: "var(--page-surface-2)" }}
              >
                {RANGES.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRange(r)}
                    className="cursor-pointer rounded-lg border-none px-3 py-1.5 text-center transition-all md:px-4 md:py-1.5"
                    style={{
                      fontFamily: INTER,
                      fontSize: 13,
                      fontWeight: range === r ? 600 : 400,
                      color: range === r ? "white" : "var(--page-text-muted)",
                      background: range === r ? colors.primary : "transparent",
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {kotEnabled && (
                <div
                  className="flex items-center gap-0.5 self-start rounded-xl p-1"
                  style={{ background: "var(--page-surface-2)" }}
                >
                  {(["sales", "kitchen"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setReportMode(mode)}
                      className="cursor-pointer rounded-lg border-none px-4 py-1.5 text-center transition-all"
                      style={{
                        fontFamily: INTER,
                        fontSize: 13,
                        fontWeight: activeReportMode === mode ? 600 : 400,
                        color:
                          activeReportMode === mode
                            ? "white"
                            : "var(--page-text-muted)",
                        background:
                          activeReportMode === mode
                            ? colors.primary
                            : "transparent",
                      }}
                    >
                      {mode === "sales"
                        ? "Sales Analytics"
                        : "Kitchen Turnaround"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-24 animate-pulse rounded-2xl"
                    style={{ background: "var(--page-surface-2)" }}
                  />
                ))}
              </div>
            ) : activeReportMode === "sales" ? (
              <StatCards
                revenue={liveRevenue}
                orders={liveOrders}
                avg={liveAvg}
                profit={liveProfit}
                tax={liveTax}
              />
            ) : (
              <KitchenStatCards metrics={kitchenMetrics} />
            )}

            {activeReportMode === "sales" ? (
              <>
                <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-2">
                  <SalesTrendChart range={range} data={trendData} />
                  <RevenueProfitChart range={range} data={trendData} />
                </div>

                <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <CategoryChart catData={catData} />
                  </div>
                  <PaymentDistribution payData={payData} />
                </div>

                <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-2">
                  <BestSellers sellers={sellers} />
                  <ProfitAndLoss
                    revenue={liveRevenue}
                    totalExpenses={liveExpenses}
                  />
                </div>

                <DataTable<OrderRow>
                  title="Recent Orders"
                  subtitle={`${recentOrders.length} transaction${recentOrders.length !== 1 ? "s" : ""} in this period`}
                  columns={ORDER_COLUMNS}
                  data={recentOrders}
                  rowKey="inv"
                  searchable
                  searchPlaceholder="Search orders..."
                  exportable
                  pageSize={5}
                  emptyTitle="No orders in this period"
                  emptyDescription="Transactions placed on the POS will appear here."
                  onRowClick={(row) => setSelectedTx(row.raw)}
                />
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-3">
                  <StationVolumeChart data={kitchenMetrics.stationData} />
                  <StationPrepTimeChart data={kitchenMetrics.stationData} />
                  <PrepQualityChart qualityData={kitchenMetrics.qualityData} />
                </div>

                <DataTable<KitchenRow>
                  title="Station Performance Breakdown"
                  subtitle="Turnaround and preparation speed details per kitchen station"
                  columns={KITCHEN_COLUMNS}
                  data={kitchenRows}
                  rowKey="station"
                  searchable
                  searchPlaceholder="Search stations..."
                  exportable
                  pageSize={5}
                  emptyTitle="No kitchen data available"
                  emptyDescription="Marked tickets in the KDS will populate this report."
                />
              </>
            )}
          </div>
        </main>
      </div>

      <MobileBottomNav
        activeId="reports"
        onLogout={() => setShowLogout(true)}
      />
      <LogoutConfirmationModal
        isOpen={showLogout}
        onConfirm={() => setShowLogout(false)}
        onCancel={() => setShowLogout(false)}
      />
      <ReceiptModal
        open={!!selectedTx}
        tx={selectedTx}
        onClose={() => setSelectedTx(null)}
        restaurantName="Tablix POS"
      />
    </div>
  )
}
