import { useState } from "react"
import { MenuHeader } from "./MenuHeader"
import { AppSidebar } from "./AppSidebar"
import { Outlet, useLocation } from "react-router"
import { LogoutConfirmationModal } from "../LogoutConfirmationModal"
import { MobileBottomNav } from "./MobileBottomNav"

const SettingsLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const location = useLocation()
  const activeId =
    {
      "/reports": "reports",
      "/inventory": "inventory",
      "/menu": "menu",
      "/staff": "staff",
      "/expenses": "expenses",
      "/billing": "billing",
      "/account-settings": "settings",
      "/settlements": "settlements",
    }[location.pathname] ?? "reports"

  return (
    <div className="page-bg flex h-screen flex-col overflow-hidden text-foreground">
      <MenuHeader />
      {/* Body */}
      <div className="page-border flex min-h-0 flex-1 overflow-hidden border-t">
        <AppSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={() => setShowLogout(true)}
          activeId={activeId}
        />

        <div className="page-surface flex flex-1 flex-col overflow-hidden">
          <Outlet />
        </div>

        {/* Logout confirmation modal */}
        {showLogout && (
          <LogoutConfirmationModal
            isOpen={showLogout}
            onCancel={() => setShowLogout(false)}
          />
        )}
      </div>

      <MobileBottomNav
        activeId={activeId}
        onLogout={() => setShowLogout(true)}
      />
    </div>
  )
}

export default SettingsLayout
