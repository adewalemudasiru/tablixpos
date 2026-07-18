import { useState } from "react"
import { useAppStore, usePermissions } from "../store/AppContext"
import { AppSidebar, MobileBottomNav } from "../components/AppSidebar"
import { Toaster, toast } from "sonner"
import { LogoutConfirmationModal } from "../components/LogoutConfirmationModal"
import { AdjustmentDetailModal } from "@/components/settlements/AdjustmentDetailModal"

// Import new components
import { SettlementsHeader } from "../components/settlements/SettlementsHeader"
import { SettlementsStats } from "../components/settlements/SettlementsStats"
import { SettlementsFilters } from "../components/settlements/SettlementsFilters"
import { SettlementsList } from "../components/settlements/SettlementsList"
import { ApproverSummary } from "../components/settlements/ApproverSummary"
import { useSettlementsData } from "../hooks/useSettlementsData"
import { generateCSV, downloadCSV } from "../utils/settlements-helpers"

export default function SettlementsPage() {
  const { theme } = useAppStore()
  const isDark = theme === "dark"
  const permissions = usePermissions()
  const canViewAll = permissions.includes("manager_override")

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [selectedTx, setSelectedTx] = useState<any | null>(null)

  const {
    adjustments,
    stats,
    filterType,
    setFilterType,
    dateRange,
    setDateRange,
    search,
    setSearch,
  } = useSettlementsData()

  const handleExportCSV = () => {
    if (adjustments.length === 0) {
      toast.error("No adjustments to export")
      return
    }
    const csv = generateCSV(adjustments)
    const filename = `tablix-settlements-${new Date().toISOString().slice(0, 10)}.csv`
    downloadCSV(csv, filename)
    toast.success("Export complete")
  }

  return (
    <div
      className="flex h-screen flex-col overflow-hidden"
      style={{ background: "var(--page-bg)" }}
    >
      <Toaster richColors position="top-right" />

      <SettlementsHeader />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <AppSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={() => setShowLogout(true)}
          activeId="settlements"
        />

        <main
          className="flex-1 overflow-y-auto pb-[72px] md:pb-0"
          style={{ background: "var(--page-surface)" }}
        >
          <div className="flex flex-col gap-5 p-4 md:gap-6 md:p-6 lg:p-8">
            <SettlementsFilters
              filterType={filterType}
              onFilterTypeChange={setFilterType}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              search={search}
              onSearchChange={setSearch}
              onExport={handleExportCSV}
            />

            {/* ensure uniqueApprovers contains only strings to satisfy SettlementsStats props */}
            <SettlementsStats
              stats={{
                ...stats,
                uniqueApprovers: stats.uniqueApprovers.filter((s): s is string => !!s),
              }}
            />

            {canViewAll && <ApproverSummary adjustments={adjustments} />}

            <SettlementsList
              adjustments={adjustments}
              isDark={isDark}
              onRowClick={setSelectedTx}
            />
          </div>
        </main>
      </div>

      <AdjustmentDetailModal
        tx={selectedTx}
        open={selectedTx !== null}
        onClose={() => setSelectedTx(null)}
      />

      <LogoutConfirmationModal
        isOpen={showLogout}
        onConfirm={() => setShowLogout(false)}
        onCancel={() => setShowLogout(false)}
      />

      <MobileBottomNav
        activeId="settlements"
        onLogout={() => setShowLogout(true)}
      />
    </div>
  )
}
