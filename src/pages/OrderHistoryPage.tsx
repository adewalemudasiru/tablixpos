import { useState, useMemo, useEffect, useCallback } from "react"
import { useAppStore, usePermissions } from "../store/AppContext"
import type { Transaction } from "../store/AppContext"
import { LogoutConfirmationModal } from "../components/LogoutConfirmationModal"
import { AppSidebar, MobileBottomNav } from "../components/AppSidebar"
import { ManagerOverrideModal } from "../components/ManagerOverrideModal"
import { toast, Toaster } from "sonner"
import { exportTransactionsToCSV, downloadCSV } from "../services/storage"
import { addActivityEntry } from "../services/activityLog"
import { transactionsAPI, ordersAPI } from "../services/api"
import type { ApiOrder } from "../services/api"
import { ReceiptModal } from "../components/order-history/ReceiptModal"

// Import all the new components
import { OrderHistoryHeader } from "../components/order-history/OrderHistoryHeader"
import { OrderHistoryFilters } from "../components/order-history/OrderHistoryFilters"
import { OrderHistoryStats } from "../components/order-history/OrderHistoryStats"
import { OrderSearchModal } from "../components/order-history/OrderSearchModal"
import { OrderTable } from "../components/order-history/OrderTable"
import { OrderCardGrid } from "../components/order-history/OrderCardGrid"
import { OrderDateRangeFilter } from "../components/order-history/OrderDateRangeFilter"

// Re-export types for use in this file
import type {
  OrderRow,
  TxStatus,
  DateRange,
} from "../types/order-history/order"
import { mockApiOrders } from "@/mock-data/order"

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OrderHistoryPage({
  isEmbedded = false,
}: {
  isEmbedded?: boolean
}) {
  const { voidTransaction, activeStaff, restaurantName, staff, theme } =
    useAppStore()
  const isDark = theme === "dark"
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange>("Month")
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null)
  const [voidTarget, setVoidTarget] = useState<{
    id: string
    refund: boolean
  } | null>(null)

  // ── Backend data ──────────────────────────────────────────────────────────
  const [apiOrders, setApiOrders] = useState<ApiOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [showSearchModal, setShowSearchModal] = useState(false)

  const rangeStartISO = useMemo(() => {
    if (dateRange === "All") return undefined
    const d = new Date()
    if (dateRange === "Today") d.setHours(0, 0, 0, 0)
    else if (dateRange === "Week") d.setDate(d.getDate() - 7)
    else d.setMonth(d.getMonth() - 1)
    return d.toISOString()
  }, [dateRange])

  useEffect(() => {
    setLoading(true)
    transactionsAPI
      .list({ limit: 200, startDate: rangeStartISO })
      .then((res) => setApiOrders(res.data.transactions ?? []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [rangeStartISO])

  const permissions = usePermissions()
  const isCashier = !permissions.includes("manager_override")

  const effectiveApiOrders = useMemo(
    () => [...mockApiOrders, ...apiOrders],
    [apiOrders]
  )

  // Map API orders → OrderRow
  const allOrders: OrderRow[] = useMemo(
    () =>
      effectiveApiOrders.map((o) => {
        const d = new Date(o.createdAt)
        const datetime =
          d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }) +
          "  " +
          d.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        let parsedNotes: any = {}
        try {
          parsedNotes = JSON.parse(o.notes || "{}")
        } catch (e) {}

        const txStatus: TxStatus =
          parsedNotes.mockStatus === "refunded"
            ? "refunded"
            : parsedNotes.mockStatus === "voided" || o.status === "Cancelled"
              ? "voided"
              : o.paymentStatus === "Completed"
                ? "completed"
                : "completed"

        const pMethod =
          parsedNotes.paymentMethod ||
          ((o as any).payments?.[0]?.method === "Mobile"
            ? "Transfer"
            : ((o as any).payments?.[0]?.method ?? "Cash"))
        const cashierName = parsedNotes.cashier || "Staff"

        return {
          id: o.id.slice(-8).toUpperCase(),
          datetime,
          customer: "Walk-in",
          itemCount: o.items.reduce((s, i) => s + i.quantity, 0),
          cashier: cashierName,
          payment: pMethod,
          amount: o.total,
          status: txStatus,
          tableNo: parsedNotes.tableNo || "",
          raw: {
            id: o.id,
            timestamp: new Date(o.createdAt).getTime(),
            items: o.items.map((i) => ({
              id: i.id,
              name: i.menuItemId,
              price: i.unitPrice,
              qty: i.quantity,
            })),
            customer: { id: "api", name: "Walk-in" },
            subtotal: o.subtotal,
            vat: o.tax,
            total: o.total,
            paymentMethod: pMethod,
            changeAmount: parsedNotes.change || 0,
            cashier: cashierName,
            status: txStatus,
          } as Transaction,
        }
      }),
    [effectiveApiOrders]
  )

  const filteredByDate = useMemo(() => {
    let res = allOrders
    if (search.trim()) {
      const q = search.toLowerCase()
      res = res.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          (o.customer || "").toLowerCase().includes(q) ||
          (o.cashier || "").toLowerCase().includes(q) ||
          o.amount.toString().includes(q)
      )
    }
    return res
  }, [allOrders, search])

  // Stats
  const completedOrders = filteredByDate.filter((o) => o.status === "completed")
  const totalRevenue = completedOrders.reduce((s, o) => s + o.amount, 0)
  const totalOrders = filteredByDate.length
  const avgOrder =
    completedOrders.length > 0
      ? Math.round(totalRevenue / completedOrders.length)
      : 0
  const completedCnt = completedOrders.length
  const voidedCnt = filteredByDate.filter(
    (o) => o.status === "voided" || o.status === "refunded"
  ).length

  const stats = {
    totalOrders,
    totalRevenue,
    avgOrder,
    completedCount: completedCnt,
    voidedCount: voidedCnt,
  }

  // Void/Refund logic
  const handleVoidRequested = useCallback(
    (id: string, refund: boolean) => {
      setSelectedTx(null)
      if (isCashier) {
        setVoidTarget({ id, refund })
      } else {
        const approver = activeStaff?.name ?? "Manager"
        ordersAPI.updateStatus(id, "Cancelled").catch(() => {})
        voidTransaction(id, approver, refund)
        const label = refund ? "Refunded" : "Voided"
        addActivityEntry({
          staffName: activeStaff?.name ?? "Owner",
          role: activeStaff?.role ?? "Owner",
          action: `Transaction ${label}`,
          category: "Sale",
          timestamp: Date.now(),
          detail: `Tx #${id} ${(label || "").toLowerCase()} by ${approver}`,
        })
        toast.success(`Transaction ${(label || "").toLowerCase()} successfully`)
      }
    },
    [isCashier, activeStaff, voidTransaction]
  )

  const handleVoidApproved = useCallback(
    (approver: string) => {
      if (!voidTarget) return
      ordersAPI.updateStatus(voidTarget.id, "Cancelled").catch(() => {})
      voidTransaction(voidTarget.id, approver, voidTarget.refund)
      const label = voidTarget.refund ? "Refunded" : "Voided"
      addActivityEntry({
        staffName: activeStaff?.name ?? "Owner",
        role: activeStaff?.role ?? "Owner",
        action: `Transaction ${label}`,
        category: "Sale",
        timestamp: Date.now(),
        detail: `Tx #${voidTarget.id} ${(label || "").toLowerCase()} by ${approver}`,
      })
      toast.success(`Transaction ${(label || "").toLowerCase()} successfully`)
      setVoidTarget(null)
    },
    [voidTarget, voidTransaction, activeStaff]
  )

  // CSV Export
  const handleExportCSV = useCallback(() => {
    const csv = exportTransactionsToCSV(filteredByDate.map((o) => o.raw))
    if (!csv) {
      toast.error("No transactions to export")
      return
    }
    const now = new Date()
    const filename = `tablix-orders-${(dateRange || "").toLowerCase()}-${now.toISOString().slice(0, 10)}.csv`
    downloadCSV(csv, filename)
    toast.success("Export complete: " + filename)
  }, [filteredByDate, dateRange])

  const content = (
    <>
      <Toaster richColors position="top-right" />

      <OrderHistoryHeader
        isEmbedded={isEmbedded}
        isDark={isDark}
        onSearchClick={() => setShowSearchModal(true)}
        onExportClick={handleExportCSV}
      />

      {/* Search Modal */}
      <OrderSearchModal
        isOpen={showSearchModal}
        value={search}
        onChange={setSearch}
        onClose={() => setShowSearchModal(false)}
        isDark={isDark}
      />

      {/* Body */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {!isEmbedded && (
          <AppSidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onLogout={() => setShowLogout(true)}
            activeId="orders"
          />
        )}

        <main
          className={`flex-1 overflow-y-auto pb-[72px] md:pb-0 ${
            isEmbedded ? (isDark ? "bg-[#1c1c1e]" : "bg-[#f4f4f6]") : ""
          }`}
          style={isEmbedded ? {} : { background: "var(--page-surface)" }}
        >
          <div className="flex flex-col gap-5 p-4 md:gap-6 md:p-6 lg:p-8">
            {/* Filters */}
            <OrderHistoryFilters
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              onSearchClick={() => setShowSearchModal(true)}
              onExportClick={handleExportCSV}
              isDark={isDark}
            />

            {/* Mobile Date Range Filter */}
            <OrderDateRangeFilter
              value={dateRange}
              onChange={setDateRange}
              className="md:hidden"
            />

            {/* Stats */}
            <OrderHistoryStats stats={stats} isEmbedded={isEmbedded} />

            {/* Content: Table or Card Grid */}
            {isEmbedded ? (
              <OrderCardGrid
                orders={filteredByDate}
                onOrderClick={(row) => setSelectedTx(row.raw)}
                isDark={isDark}
              />
            ) : (
              <OrderTable
                orders={filteredByDate}
                onRowClick={(row) => setSelectedTx(row.raw)}
              />
            )}
          </div>
        </main>
      </div>

      {/* Receipt Modal */}
      <ReceiptModal
        tx={selectedTx}
        open={selectedTx !== null}
        onClose={() => setSelectedTx(null)}
        onVoidRequested={handleVoidRequested}
        restaurantName={restaurantName}
      />

      {/* Void/Refund manager override */}
      {voidTarget && (
        <ManagerOverrideModal
          action={
            voidTarget.refund
              ? "Issue refund for this transaction"
              : "Void this transaction"
          }
          detail={"Transaction #" + voidTarget.id}
          staff={staff}
          onApprove={handleVoidApproved}
          onCancel={() => setVoidTarget(null)}
        />
      )}

      <LogoutConfirmationModal
        isOpen={showLogout}
        onConfirm={() => setShowLogout(false)}
        onCancel={() => setShowLogout(false)}
      />
    </>
  )

  if (isEmbedded) {
    return (
      <div
        className={`flex h-full flex-col overflow-hidden rounded-tl-xl ${
          isDark ? "bg-[#1c1c1e]" : "bg-[#f4f4f6]"
        }`}
      >
        {content}
      </div>
    )
  }

  return (
    <div
      className="flex h-screen flex-col overflow-hidden"
      style={{ background: "var(--page-bg)" }}
    >
      {content}
      <MobileBottomNav activeId="orders" onLogout={() => setShowLogout(true)} />
    </div>
  )
}
