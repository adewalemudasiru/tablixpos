import { useState, useMemo, useEffect, useCallback } from "react"
import { useAppStore } from "../store/AppContext"
import { transactionsAPI, expensesAPI } from "../services/api"
import {
  computeBestSellers,
  computeCategoryData,
  computePaymentData,
  computeTrendData,
} from "../utils/report-helpers"
import type { Range, KitchenMetrics } from "../types/report-page/reports"
import type { ApiOrder, ApiExpense } from "../services/api"
import type { Transaction } from "../store/AppContext"
import { calculatePrepTime, getPaymentMethod } from "../utils/report-helpers"

export function useReportsData(range: Range) {
  const { kdsOrders, stations, menuItems } = useAppStore()
  const [apiOrders, setApiOrders] = useState<ApiOrder[]>([])
  const [apiExpenses, setApiExpenses] = useState<ApiExpense[]>([])
  const [loading, setLoading] = useState(true)

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
      // fall back to empty
    } finally {
      setLoading(false)
    }
  }, [rangeStartISO])

  useEffect(() => {
    fetchData()
  }, [fetchData])

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

  const completedTxs: Transaction[] = useMemo(
    () =>
      completedOrders.map((o) => {
        let parsedNotes: any = {}
        try {
          parsedNotes = JSON.parse(o.notes || "{}")
        } catch (e) {}

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
          paymentMethod: getPaymentMethod(parsedNotes, (o as any).payments),
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

  const kitchenMetrics = useMemo((): KitchenMetrics => {
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

    const totalPrepTime = completed.reduce(
      (sum, o) => sum + calculatePrepTime(o),
      0
    )
    const avgPrepTime =
      completed.length > 0 ? Math.round(totalPrepTime / completed.length) : 12

    const onTimeCount = completed.filter(
      (o) => calculatePrepTime(o) <= 15
    ).length
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
        (sum, o) => sum + calculatePrepTime(o),
        0
      )
      const stationAvgPrep =
        stationCompleted.length > 0
          ? Math.round(stationTotalPrepTime / stationCompleted.length)
          : 10

      const stationOnTime = stationCompleted.filter(
        (o) => calculatePrepTime(o) <= 15
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
      "On-Time (< 12m)": completed.filter((o) => calculatePrepTime(o) < 12)
        .length,
      "Standard (12-18m)": completed.filter(
        (o) => calculatePrepTime(o) >= 12 && calculatePrepTime(o) <= 18
      ).length,
      "Delayed (> 18m)": completed.filter((o) => calculatePrepTime(o) > 18)
        .length,
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

  return {
    loading,
    liveRevenue,
    liveOrders,
    liveAvg,
    liveProfit,
    liveTax,
    liveExpenses,
    trendData,
    payData,
    catData,
    sellers,
    kitchenMetrics,
    apiOrders,
    completedTxs,
    rangeStartISO,
  }
}
