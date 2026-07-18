import { useState, useMemo } from "react"
import { useAppStore } from "../store/AppContext"
import type { FilterType, DateRange } from "../types/settlements/settlements"

export function useSettlementsData() {
  const { transactions } = useAppStore()
  const [filterType, setFilterType] = useState<FilterType>("all")
  const [dateRange, setDateRange] = useState<DateRange>("Month")
  const [search, setSearch] = useState("")

  const rangeStart = useMemo(() => {
    if (dateRange === "All") return 0
    const d = new Date()
    if (dateRange === "Today") d.setHours(0, 0, 0, 0)
    else if (dateRange === "Week") d.setDate(d.getDate() - 7)
    else d.setMonth(d.getMonth() - 1)
    return d.getTime()
  }, [dateRange])

  const adjustments = useMemo(() => {
    let list = transactions.filter(
      (tx) => tx.status === "voided" || tx.status === "refunded"
    )
    if (dateRange !== "All") {
      list = list.filter((tx) => tx.timestamp >= rangeStart)
    }
    if (filterType !== "all") {
      list = list.filter((tx) => tx.status === filterType)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (tx) =>
          tx.id.toLowerCase().includes(q) ||
          (tx.cashier ?? "").toLowerCase().includes(q) ||
          (tx.voidedBy ?? "").toLowerCase().includes(q) ||
          (tx.customer?.name ?? "").toLowerCase().includes(q) ||
          tx.paymentMethod.toLowerCase().includes(q)
      )
    }
    return [...list].sort(
      (a, b) => (b.voidedAt ?? b.timestamp) - (a.voidedAt ?? a.timestamp)
    )
  }, [transactions, filterType, dateRange, rangeStart, search])

  const totalVoided = adjustments.filter((t) => t.status === "voided").length
  const totalRefunded = adjustments.filter(
    (t) => t.status === "refunded"
  ).length
  const totalExposure = adjustments.reduce((s, t) => s + t.total, 0)
  const uniqueApprovers = Array.from(
    new Set(adjustments.map((t) => t.voidedBy).filter(Boolean))
  )

  const stats = {
    totalAdjustments: adjustments.length,
    totalVoided,
    totalRefunded,
    totalExposure,
    uniqueApprovers,
  }

  return {
    adjustments,
    stats,
    filterType,
    setFilterType,
    dateRange,
    setDateRange,
    search,
    setSearch,
  }
}
