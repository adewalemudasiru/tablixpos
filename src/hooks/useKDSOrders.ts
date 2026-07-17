// hooks/useKDSOrders.ts
import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { toast } from "sonner"
import { useAppStore, deriveKDSStation } from "../store/AppContext"
import type { KDSOrder, KDSStatus } from "../store/AppContext"
import { ordersAPI } from "../services/api"

export function useKDSOrders() {
  const {
    kdsOrders,
    updateKDSOrder,
    addKDSOrder,
    removeKDSOrder,
    isReadOnly,
    tables,
    stations,
    activeStaff,
    roles,
  } = useAppStore()

  const [activeFilter, setActiveFilter] = useState<
    "Active" | "Completed" | "All"
  >("Active")
  const [selectedOrder, setSelectedOrder] = useState<KDSOrder | null>(null)
  const knownIdsRef = useRef<Set<string>>(new Set())
  const kdsOrdersRef = useRef(kdsOrders)
  const tablesRef = useRef(tables)

  useEffect(() => {
    kdsOrdersRef.current = kdsOrders
  }, [kdsOrders])

  useEffect(() => {
    tablesRef.current = tables
  }, [tables])

  const kotEnabledAt = useMemo(() => {
    try {
      return localStorage.getItem("tablix_kot_enabled_at") ?? null
    } catch (_) {
      return null
    }
  }, [])

  const staffRoleName = activeStaff
    ? (
        roles.find((r) => r.id === activeStaff.role)?.name || activeStaff.role
      ).toLowerCase()
    : ""
  const isStandardStaff =
    !staffRoleName.includes("admin") &&
    !staffRoleName.includes("owner") &&
    !staffRoleName.includes("manager")
  const lockedStation =
    isStandardStaff && activeStaff?.assignedStation
      ? activeStaff.assignedStation
      : null

  const visibleStations = lockedStation ? [lockedStation] : ["All", ...stations]
  const [activeStation, setActiveStation] = useState<string>(
    lockedStation || "All"
  )

  const fetchOrders = useCallback(async () => {
    try {
      const [pendingRes, inProgressRes, readyRes] = await Promise.all([
        ordersAPI.list({ limit: 50, status: "Pending" }),
        ordersAPI.list({ limit: 50, status: "InProgress" }),
        ordersAPI.list({ limit: 50, status: "Ready" }),
      ])
      const backendOrders = [
        ...pendingRes.data.orders,
        ...inProgressRes.data.orders,
        ...readyRes.data.orders,
      ].filter((o) => {
        if (!kotEnabledAt) return false
        return new Date(o.createdAt) >= new Date(kotEnabledAt)
      })
      backendOrders.forEach((o) => {
        const statusMap: Record<string, KDSStatus> = {
          Pending: "New",
          InProgress: "In Progress",
          Ready: "Ready",
          Served: "Served",
          Cancelled: "Served",
        }
        const kdsStatus: KDSStatus = statusMap[o.status] ?? "New"

        let existing = kdsOrdersRef.current.find((x) => x.id === o.id)
        let tableNo = "—"
        let customer = "Walk-in"

        if (existing) {
          tableNo = existing.tableNo
          customer = existing.customer
        } else {
          let derivedTableNo = "—"
          if (o.notes && o.notes.startsWith("Table: ")) {
            derivedTableNo = o.notes.replace("Table: ", "").trim()
          }

          const tempOrder = kdsOrdersRef.current.find(
            (x) =>
              x.id.startsWith("kds-") &&
              (derivedTableNo !== "—" ? x.tableNo === derivedTableNo : true) &&
              x.items.length === o.items.length
          )

          if (tempOrder) {
            tableNo = tempOrder.tableNo
            customer = tempOrder.customer
            existing = tempOrder
            removeKDSOrder(tempOrder.id)
          } else {
            tableNo = derivedTableNo
            if (tableNo !== "—") {
              const matchedTable = tablesRef.current.find(
                (t) =>
                  t.id === tableNo ||
                  t.name === tableNo ||
                  t.name.replace("Table ", "") === tableNo
              )
              if (matchedTable && matchedTable.customerName) {
                customer = matchedTable.customerName
              }
            }
          }
        }

        const itemNames = o.items.map(
          (item) =>
            (item as any).menuItem?.name ??
            (item as any).menuItemName ??
            item.menuItemId ??
            "Item"
        )
        const kdsStation = deriveKDSStation(itemNames)

        const kdsOrder: KDSOrder = {
          id: o.id,
          orderNo: `ORD-${o.id.slice(-6).toUpperCase()}`,
          tableNo,
          customer,
          status: kdsStatus,
          priority: "Normal",
          station: kdsStation,
          placedAt: o.createdAt,
          startedAt: existing?.startedAt ?? null,
          readyAt: existing?.readyAt ?? null,
          items: o.items.map((item) => ({
            id: item.id,
            name:
              (item as any).menuItem?.name ??
              (item as any).menuItemName ??
              item.menuItemId ??
              "Item",
            qty: item.quantity,
            notes: item.specialInstructions ?? "",
            done:
              existing?.items.find(
                (xi) =>
                  xi.id === item.id ||
                  xi.name === ((item as any).menuItem?.name ?? item.menuItemId)
              )?.done ?? false,
          })),
        }

        if (
          !knownIdsRef.current.has(o.id) &&
          !kdsOrdersRef.current.some((x) => x.id === o.id)
        ) {
          knownIdsRef.current.add(o.id)
          addKDSOrder(kdsOrder)
          if (kdsStatus === "New")
            toast.info(`New order ${kdsOrder.orderNo} arrived`, {
              duration: 4000,
            })
        } else {
          updateKDSOrder(kdsOrder)
        }
      })
    } catch (_) {}
  }, [addKDSOrder, updateKDSOrder, removeKDSOrder, kotEnabledAt])

  useEffect(() => {
    fetchOrders()
    const interval = setInterval(fetchOrders, 15000)
    return () => clearInterval(interval)
  }, [fetchOrders])

  const handleUpdateStatus = useCallback(
    (id: string, status: KDSStatus) => {
      if (isReadOnly) return
      const order = kdsOrders.find((o) => o.id === id)
      if (!order) return
      const now = new Date().toISOString()
      updateKDSOrder({
        ...order,
        status,
        startedAt:
          status === "In Progress" && !order.startedAt ? now : order.startedAt,
        readyAt: status === "Ready" && !order.readyAt ? now : order.readyAt,
      })
      const backendStatusMap: Record<KDSStatus, string> = {
        New: "Pending",
        "In Progress": "InProgress",
        Ready: "Ready",
        Served: "Served",
      }
      ordersAPI
        .updateStatus(id, backendStatusMap[status] as any)
        .catch(() => {})
      const labels: Record<KDSStatus, string> = {
        New: "opened",
        "In Progress": "started",
        Ready: "ready!",
        Served: "served",
      }
      toast.success(`Order marked ${labels[status]}`)
    },
    [kdsOrders, updateKDSOrder, isReadOnly]
  )

  const filteredOrders = kdsOrders
    .filter((o) => {
      const matchStation =
        activeStation === "All" || o.station === activeStation
      const matchFilter =
        activeFilter === "All"
          ? true
          : activeFilter === "Active"
            ? o.status === "New" || o.status === "In Progress"
            : o.status === "Ready" || o.status === "Served"

      if (o.status === "Served") {
        const placedDate = new Date(o.placedAt)
        const isToday = placedDate.toDateString() === new Date().toDateString()
        const hoursAgo = (Date.now() - placedDate.getTime()) / (1000 * 60 * 60)
        if (!isToday && hoursAgo > 12) return false
      }

      return matchStation && matchFilter
    })
    .sort((a, b) => {
      const prio: Record<string, number> = { Rush: 0, VIP: 1, Normal: 2 }
      const stat: Record<string, number> = {
        New: 0,
        "In Progress": 1,
        Ready: 2,
        Served: 3,
      }
      if (prio[a.priority] !== prio[b.priority])
        return prio[a.priority] - prio[b.priority]
      if (stat[a.status] !== stat[b.status])
        return stat[a.status] - stat[b.status]
      return new Date(a.placedAt).getTime() - new Date(b.placedAt).getTime()
    })

  const liveSelected = selectedOrder
    ? (kdsOrders.find((o) => o.id === selectedOrder.id) ?? null)
    : null

  return {
    // State
    kdsOrders,
    filteredOrders,
    activeFilter,
    activeStation,
    selectedOrder,
    liveSelected,
    visibleStations,
    lockedStation,
    isReadOnly,
    isStandardStaff,

    // Setters
    setActiveFilter,
    setActiveStation,
    setSelectedOrder,

    // Actions
    fetchOrders,
    handleUpdateStatus,
  }
}
