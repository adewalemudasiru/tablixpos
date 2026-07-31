import { useState, useMemo, useEffect, useCallback } from "react"
import { useAppStore } from "../store/AppContext"
import type { Transaction, KDSOrder } from "../store/AppContext"
import { transactionsAPI, expensesAPI } from "../services/api"
import type { ApiOrder, ApiExpense } from "../services/api"

const NGN = "\u20a6"

export type Range = "Today" | "Week" | "Month" | "Year"

export interface OrderRow extends Record<string, unknown> {
  inv: string
  date: string
  customer: string
  cashier: string
  payment: string
  change: string
  amount: string
  status: string
  raw: any
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

// ─── Range helpers ────────────────────────────────────────────────────────────

function getRangeStart(r: Range): number {
  const now = new Date()
  if (r === "Today") {
    now.setHours(0, 0, 0, 0)
    return now.getTime()
  }
  if (r === "Year") {
    now.setMonth(0, 1)
    now.setHours(0, 0, 0, 0)
    return now.getTime()
  }
  if (r === "Month") {
    now.setDate(1)
    now.setHours(0, 0, 0, 0)
    return now.getTime()
  }
  now.setDate(now.getDate() - 7)
  now.setHours(0, 0, 0, 0)
  return now.getTime()
}

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

export function useReportsData(initialRange: Range) {
  const { kdsOrders, stations, menuItems, kotEnabled, transactions, expenses } =
    useAppStore()

  const [range, setRange] = useState<Range>(initialRange)
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
      console.debug("[useReportsData] fetching API data", { rangeStartISO })
      const [txRes, expRes] = await Promise.all([
        transactionsAPI.list({ limit: 200, startDate: rangeStartISO }),
        expensesAPI.list({ limit: 200, startDate: rangeStartISO }),
      ])

      const apiTxs = txRes?.data?.transactions ?? []
      const apiExps = expRes?.data?.expenses ?? []

      // If API returned no transactions, fall back to store `transactions`
      if (!apiTxs || apiTxs.length === 0) {
        console.debug(
          "[useReportsData] API transactions empty — using store fallback",
          {
            storeCount: transactions.length,
          }
        )
        const mapped: ApiOrder[] = (transactions || []).map((t) => ({
          id: t.id,
          status: t.status === "voided" ? "Cancelled" : "Served",
          paymentStatus: t.status === "completed" ? "Completed" : "Unpaid",
          subtotal: t.subtotal,
          tax: t.vat || 0,
          total: t.total,
          notes: JSON.stringify({ cashier: t.cashier, tableNo: t.tableNo }),
          items: t.items.map((it) => ({
            id: it.id,
            menuItemId: it.id,
            menuItemName: it.name,
            quantity: it.qty,
            unitPrice: it.price,
          })),
          createdAt: new Date(t.timestamp).toISOString(),
        }))
        setApiOrders(mapped)
      } else {
        setApiOrders(apiTxs)
      }

      if (!apiExps || apiExps.length === 0) {
        console.debug(
          "[useReportsData] API expenses empty — using store fallback",
          {
            storeCount: expenses.length,
          }
        )
        const mappedExp: ApiExpense[] = (expenses || []).map((e) => ({
          id: e.id,
          amount: e.amount,
          description: e.description,
          category: (e.category as any) || "Other",
          expenseDate: e.date || new Date().toISOString(),
          createdAt: new Date().toISOString(),
        }))
        setApiExpenses(mappedExp)
      } else {
        setApiExpenses(apiExps)
      }
    } catch (err) {
      console.debug("[useReportsData] fetch error, falling back to store", err)
      const mapped: ApiOrder[] = (transactions || []).map((t) => ({
        id: t.id,
        status: t.status === "voided" ? "Cancelled" : "Served",
        paymentStatus: t.status === "completed" ? "Completed" : "Unpaid",
        subtotal: t.subtotal,
        tax: t.vat || 0,
        total: t.total,
        notes: JSON.stringify({ cashier: t.cashier, tableNo: t.tableNo }),
        items: t.items.map((it) => ({
          id: it.id,
          menuItemId: it.id,
          menuItemName: it.name,
          quantity: it.qty,
          unitPrice: it.price,
        })),
        createdAt: new Date(t.timestamp).toISOString(),
      }))
      setApiOrders(mapped)
      const mappedExp: ApiExpense[] = (expenses || []).map((e) => ({
        id: e.id,
        amount: e.amount,
        description: e.description,
        category: (e.category as any) || "Other",
        expenseDate: e.date || new Date().toISOString(),
        createdAt: new Date().toISOString(),
      }))
      setApiExpenses(mappedExp)
    } finally {
      setLoading(false)
    }
  }, [rangeStartISO, transactions, expenses])

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
    [completedOrders, menuItems]
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

  return {
    range,
    setRange,
    RANGES,
    reportMode,
    setReportMode,
    activeReportMode,
    selectedTx,
    setSelectedTx,
    loading,
    liveRevenue,
    liveOrders,
    liveAvg,
    liveTax,
    liveExpenses,
    liveProfit,
    trendData,
    payData,
    catData,
    sellers,
    apiOrders,
    apiExpenses,
    recentOrders,
    kitchenMetrics,
    kitchenRows,
    kotEnabled,
  }
}
