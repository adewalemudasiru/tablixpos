import { useState } from "react"
import { MenuHeader } from "./MenuHeader"
import { AppSidebar } from "./AppSidebar"
import { Outlet } from "react-router"
import { LogoutConfirmationModal } from "../LogoutConfirmationModal"

const SettingsLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogout, setShowLogout] = useState(false)

  return (
    <div className="page-bg flex h-screen flex-col overflow-hidden text-foreground">
      <MenuHeader />
      {/* Body */}
      <div className="page-border flex min-h-0 flex-1 overflow-hidden border-t">
        <AppSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={() => setShowLogout(true)}
          activeId="menu"
        />

        <Outlet />

        {/* Logout confirmation modal */}
        {showLogout && (
          <LogoutConfirmationModal
            isOpen={showLogout}
            onCancel={() => setShowLogout(false)}
          />
        )}
      </div>
    </div>
  )
}

export default SettingsLayout
