import { UpgradeGate } from "../UpgradeGate"
import { AppSidebar, MobileBottomNav } from "../AppSidebar"
import { LogoutConfirmationModal } from "../LogoutConfirmationModal"
import { KDSHeader } from "./KDSHeader"

interface ReadOnlyKDSViewProps {
  isDark: boolean
  theme: string
  sidebarOpen: boolean
  onSidebarClose: () => void
  onLogout: () => void
  showLogout: boolean
  onLogoutConfirm: () => void
  onLogoutCancel: () => void
}

export function ReadOnlyKDSView({
  isDark,
  theme,
  sidebarOpen,
  onSidebarClose,
  onLogout,
  showLogout,
  onLogoutConfirm,
  onLogoutCancel,
}: ReadOnlyKDSViewProps) {
  return (
    <div
      className="flex h-screen flex-col overflow-hidden"
      style={{ background: isDark ? "#1c1c1e" : "var(--page-bg)" }}
    >
      <KDSHeader theme={theme} isDark={isDark} />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <AppSidebar
          open={sidebarOpen}
          onClose={onSidebarClose}
          onLogout={onLogout}
          activeId="kds"
        />
        <UpgradeGate
          title="Read Only Mode"
          description="Your trial has expired. KDS requires an active subscription to update orders."
          features={["Subscribe to Premium to restore full functionality"]}
        />
      </div>

      <MobileBottomNav activeId="kds" onLogout={onLogout} />

      <LogoutConfirmationModal
        isOpen={showLogout}
        onConfirm={onLogoutConfirm}
        onCancel={onLogoutCancel}
      />
    </div>
  )
}
