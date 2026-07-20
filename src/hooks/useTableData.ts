import { useState, useEffect, useCallback } from "react"
import { useAppStore } from "../store/AppContext"
import type { RestaurantTable, TableStatus } from "../store/AppContext"
import { tableAPI, ordersAPI } from "../services/api"
import type { DisplayMode } from "../types/tables-page/tables"

export function useTablesData() {
  const { tables, setTables, setTableStatus } = useAppStore()
  const [loading, setLoading] = useState(true)
  const [activeZone, setActiveZone] = useState("All")
  const [filterStatus, setFilterStatus] = useState<TableStatus | "all">("all")
  const [displayMode, setDisplayMode] = useState<DisplayMode>("covers")

  const loadTables = useCallback(async () => {
    try {
      const [tablesRes, ordersRes] = await Promise.all([
        tableAPI.list(),
        ordersAPI.list({ limit: 100 }).catch(() => null),
      ])

      const tableTotals: Record<string, number> = {}
      if (ordersRes) {
        ordersRes.data.orders
          .filter(
            (o) => o.paymentStatus !== "Completed" && o.status !== "Cancelled"
          )
          .forEach((o) => {
            // Orders don't carry tableId in the list response directly
          })
      }

      const storedShapes = (() => {
        try {
          return JSON.parse(localStorage.getItem("tablix_table_shapes") || "{}")
        } catch (_) {
          return {}
        }
      })()

      setTables(
        tablesRes.data.tables.map((t) => ({
          id: t.id,
          name: t.name,
          seats: t.seats,
          zone: t.zone,
          status: t.status,
          occupiedAt: t.occupiedAt ?? undefined,
          customerName: t.customerName ?? undefined,
          orderTotal: tableTotals[t.id] ?? t.orderTotal ?? undefined,
          shape: storedShapes[t.id] ?? "square",
        }))
      )
    } catch (_) {
      /* fall back to localStorage state */
    } finally {
      setLoading(false)
    }
  }, [setTables])

  useEffect(() => {
    loadTables()
  }, [loadTables])

  const handleStatusUpdate = useCallback(
    async (
      id: string,
      status: TableStatus,
      extra?: Partial<RestaurantTable>
    ) => {
      setTableStatus(id, status, extra)
      try {
        await tableAPI.update(id, {
          status,
          occupiedAt: extra?.occupiedAt ?? null,
          customerName: extra?.customerName ?? null,
          orderTotal: extra?.orderTotal ?? null,
        })
      } catch (_) {}
    },
    [setTableStatus]
  )

  return {
    tables,
    loading,
    activeZone,
    setActiveZone,
    filterStatus,
    setFilterStatus,
    displayMode,
    setDisplayMode,
    handleStatusUpdate,
  }
}
