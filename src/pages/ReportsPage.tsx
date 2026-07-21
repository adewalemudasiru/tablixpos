import { useState, useMemo } from "react"
import { useAppStore } from "../store/AppContext"
import { LogoutConfirmationModal } from "../components/LogoutConfirmationModal"
import { AppSidebar, MobileBottomNav } from "../components/AppSidebar"
import { ReceiptModal } from "@/components/reports-page/ReceiptModal"
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
import { PrepQualityChart } from "@/components/reports-page/PrepQualityChart"

// Import new components
import { ReportsHeader } from "../components/reports-page/ReportsHeader"
import { ReportsFilters } from "../components/reports-page/ReportsFilters"
import { RecentOrdersTable } from "../components/reports-page/RecentOrdersTable"
import { KitchenPerformanceTable } from "../components/reports-page/KitchenPerformanceTable"
import { ReportsLoadingSkeleton } from "../components/reports-page/ReportsLoadingSkeleton"
import { useReportsData } from "../hooks/useReporstData"
import {
  formatCurrency,
  formatDateTime,
  getPaymentMethod,
} from "../utils/report-helpers"
import type {
  Range,
  ReportMode,
  OrderRow,
  KitchenRow,
} from "../types/report-page/reports"

const INTER = "'Inter', sans-serif"
const NGN = "\u20a6"

export default function ReportsPage() {
  const { kotEnabled } = useAppStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [range, setRange] = useState<Range>("Month")
  const [reportMode, setReportMode] = useState<ReportMode>("sales")
  const [selectedTx, setSelectedTx] = useState<any | null>(null)

  const activeReportMode = kotEnabled ? reportMode : "sales"

  const {
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
  } = useReportsData(range)

  // Recent Orders
  const recentOrders: OrderRow[] = useMemo(
    () =>
      apiOrders.slice(0, 20).map((o) => {
        const d = new Date(o.createdAt)
        let parsedNotes: any = {}
        try {
          parsedNotes = JSON.parse(o.notes || "{}")
        } catch (e) {}

        const pMethod = getPaymentMethod(parsedNotes, (o as any).payments)

        return {
          inv: o.id.slice(-8).toUpperCase(),
          date: formatDateTime(d),
          customer: "Walk-in",
          cashier: parsedNotes.cashier || "Staff",
          payment: pMethod,
          change: parsedNotes.change
            ? `${NGN}${parsedNotes.change.toLocaleString()}`
            : "",
          amount: formatCurrency(o.total),
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

  // Kitchen Rows
  const kitchenRows: KitchenRow[] = useMemo(() => {
    return kitchenMetrics.stationData.map((s: any, idx: number) => ({
      id: `kitchen-row-${idx}`,
      station: s.station,
      total: s.total,
      active: s.active,
      avgPrep: `${s.avgPrep} mins`,
      onTimeRate: `${s.onTimeRate}%`,
      revenue: formatCurrency(s.revenue),
    }))
  }, [kitchenMetrics])

  return (
    <div
      className="flex h-screen flex-col overflow-hidden"
      style={{ background: "var(--page-bg)" }}
    >
      <ReportsHeader />

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

            <ReportsFilters
              range={range}
              onRangeChange={setRange}
              reportMode={reportMode}
              onReportModeChange={setReportMode}
              kotEnabled={kotEnabled}
              activeReportMode={activeReportMode}
            />

            {loading ? (
              <ReportsLoadingSkeleton />
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

                <RecentOrdersTable
                  orders={recentOrders}
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

                <KitchenPerformanceTable rows={kitchenRows} />
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
