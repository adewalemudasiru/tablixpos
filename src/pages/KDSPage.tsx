// KDSPage.tsx
import React, { useState } from "react"
import { useNavigate } from "react-router"
import { Toaster } from "sonner"
import { useAppStore } from "../store/AppContext"
import { D_DARK, D_LIGHT } from "@/constants/kdspage"
import { useTimer } from "@/utils/kds-helper"
import { OrderBottomSheet } from "@/components/kds-page/OrderBottomSheet"
import { KDSThemeContext } from "../store/ThemeContext"

// New components
import { KDSActionBar } from "@/components/kds-page/KDSActionBar"
import { KDSOrderList } from "@/components/kds-page/KDSOrderList"
import { KDSOrderGrid } from "@/components/kds-page/KDSOrderGrid"
import { ReadOnlyKDSView } from "@/components/kds-page/ReadOnlyKDSView"
import { useKDSOrders } from "@/hooks/useKDSOrders"
import { LogoutConfirmationModal } from "@/components/LogoutConfirmationModal"

export default function KDSPage() {
  const navigate = useNavigate()
  const { theme, setActiveStaff } = useAppStore()
  const D = theme === "dark" ? D_DARK : D_LIGHT
  const isDark = theme === "dark"

  const [kdsLogout, setKdsLogout] = useState(false)
  const [kdsSidebar, setKdsSidebar] = useState(false)
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  )

  const {
    filteredOrders,
    activeFilter,
    activeStation,
    liveSelected,
    visibleStations,
    isReadOnly,
    setActiveFilter,
    setActiveStation,
    setSelectedOrder,
    handleUpdateStatus,
  } = useKDSOrders()

  // Timer for auto-refresh
  useTimer()

  // Handle window resize
  React.useEffect(() => {
    if (typeof window === "undefined") return
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Read-only mode
  if (isReadOnly) {
    return (
      <ReadOnlyKDSView
        isDark={isDark}
        theme={theme}
        sidebarOpen={kdsSidebar}
        onSidebarClose={() => setKdsSidebar(false)}
        onLogout={() => setKdsLogout(true)}
        showLogout={kdsLogout}
        onLogoutConfirm={() => {
          setActiveStaff(null)
          navigate("/login", { replace: true })
        }}
        onLogoutCancel={() => setKdsLogout(false)}
      />
    )
  }

  return (
    <KDSThemeContext.Provider value={D}>
      <div
        className="flex h-screen flex-col overflow-hidden"
        style={{ background: D.bg }}
      >
        <Toaster position="top-center" richColors />

        <div
          className="relative flex flex-1 flex-col overflow-hidden"
          style={{ background: D.bg }}
        >
          {isMobile ? (
            <KDSOrderList
              orders={filteredOrders}
              onOrderSelect={setSelectedOrder}
              bgColor={D.bg}
              textSub={D.textSub}
              textMuted={D.textMuted}
              surface={D.surface}
              border={D.border}
              isMobile
            />
          ) : (
            <KDSOrderGrid
              orders={filteredOrders}
              onUpdateStatus={handleUpdateStatus}
              bgColor={D.bg}
              textSub={D.textSub}
              textMuted={D.textMuted}
              surface={D.surface}
              border={D.border}
            />
          )}

          {/* Bottom Sheet */}
          <OrderBottomSheet
            order={liveSelected}
            onClose={() => setSelectedOrder(null)}
            onUpdateStatus={handleUpdateStatus}
          />
        </div>

        {/* Action Bar */}
        <KDSActionBar
          isDark={isDark}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          activeStation={activeStation}
          onStationChange={setActiveStation}
          visibleStations={visibleStations}
          onLogout={() => setKdsLogout(true)}
          onBack={() => navigate("/dashboard")}
          theme={theme}
        />

        {/* Logout Modal */}
        <LogoutConfirmationModal
          isOpen={kdsLogout}
          onConfirm={() => {
            setActiveStaff(null)
            navigate("/login", { replace: true })
          }}
          onCancel={() => setKdsLogout(false)}
        />
      </div>
    </KDSThemeContext.Provider>
  )
}
