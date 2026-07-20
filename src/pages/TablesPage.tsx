import { useState } from "react"
import { useAppStore } from "../store/AppContext"
import { LogoutConfirmationModal } from "../components/LogoutConfirmationModal"
import { AppSidebar, MobileBottomNav } from "../components/AppSidebar"
import { Toaster } from "sonner"
import { AnimatePresence } from "motion/react"
import { TableDetailModal } from "@/components/tables-page/TableDetailModal"

// Import new components
import { TablesHeader } from "../components/tables-page/TablesHeader"
import { TablesDisabled } from "../components/tables-page/TablesDisabled"
import { TablesZoneTabs } from "../components/tables-page/TablesZoneTabs"
import { TablesFilters } from "../components/tables-page/TablesFilters"
import { TablesGrid } from "../components/tables-page/TablesGrid"
import { TablesEmptyState } from "../components/tables-page/TablesEmptyState"
import { useTablesData } from "../hooks/useTableData"
import {
  getZones,
  groupTablesByShape,
  filterTables,
} from "../utils/tables-helper"

export default function TablesPage({
  isEmbedded = false,
}: {
  isEmbedded?: boolean
}) {
  const {
    tablesEnabled,
    addTransaction,
    taxConfig,
    activeStaff,
    kdsOrders,
    theme,
  } = useAppStore()
  const isDark = theme === "dark"
  const [showLogout, setShowLogout] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedTable, setSelectedTable] = useState<any | null>(null)

  const {
    tables,
    loading,
    activeZone,
    setActiveZone,
    filterStatus,
    setFilterStatus,
    displayMode,
    setDisplayMode,
    handleStatusUpdate,
  } = useTablesData()

  const zones = getZones(tables)
  const filteredTables = filterTables(tables, activeZone, filterStatus)
  const { square, round, rectangle } = groupTablesByShape(filteredTables)

  // Gate: feature not enabled
  if (!tablesEnabled) {
    return (
      <TablesDisabled
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        showLogout={showLogout}
        setShowLogout={setShowLogout}
      />
    )
  }

  const content = (
    <>
      <Toaster richColors position="top-right" />
      <TablesHeader isEmbedded={isEmbedded} isDark={isDark} />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {!isEmbedded && (
          <AppSidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onLogout={() => setShowLogout(true)}
            activeId="tables"
          />
        )}

        <main
          className={`flex-1 overflow-y-auto pb-[72px] md:pb-0 ${
            isEmbedded ? (isDark ? "bg-[#1c1c1e]" : "bg-[#f4f4f6]") : ""
          }`}
          style={isEmbedded ? {} : { background: "var(--page-surface)" }}
        >
          <div className="flex flex-col gap-5 p-4 md:p-6 lg:p-8">
            <TablesZoneTabs
              zones={zones}
              tables={tables}
              activeZone={activeZone}
              onZoneChange={setActiveZone}
              isDark={isDark}
            />

            <TablesFilters
              filterStatus={filterStatus}
              onFilterStatusChange={setFilterStatus}
              displayMode={displayMode}
              onDisplayModeChange={setDisplayMode}
              isDark={isDark}
            />

            {filteredTables.length === 0 ? (
              <TablesEmptyState
                tablesLength={tables.length}
                isDark={isDark}
                isEmbedded={isEmbedded}
              />
            ) : (
              <TablesGrid
                squareTables={square}
                roundTables={round}
                rectangleTables={rectangle}
                displayMode={displayMode}
                isDark={isDark}
                onTableSelect={setSelectedTable}
              />
            )}
          </div>
        </main>
      </div>

      <MobileBottomNav activeId="tables" onLogout={() => setShowLogout(true)} />

      <AnimatePresence>
        {selectedTable && (
          <TableDetailModal
            key="detail"
            table={selectedTable}
            onClose={() => setSelectedTable(null)}
            onUpdateStatus={(st, ext) =>
              handleStatusUpdate(selectedTable.id, st, ext)
            }
            addTransaction={addTransaction}
            taxConfig={taxConfig}
            activeStaff={activeStaff}
            kdsOrders={kdsOrders}
          />
        )}
      </AnimatePresence>

      {showLogout && (
        <LogoutConfirmationModal
          isOpen={showLogout}
          onConfirm={() => setShowLogout(false)}
          onCancel={() => setShowLogout(false)}
        />
      )}
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
    </div>
  )
}
