import { colors, font } from "../ds/tokens"
import { Button } from "../ds/Button"
import { AppLogo } from "../AppLogo"
import { NavMenu } from "../NavMenu"
import { AppSidebar, MobileBottomNav } from "../AppSidebar"
import { LogoutConfirmationModal } from "../LogoutConfirmationModal"

interface TablesDisabledProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  showLogout: boolean
  setShowLogout: (show: boolean) => void
}

export function TablesDisabled({
  sidebarOpen,
  setSidebarOpen,
  showLogout,
  setShowLogout,
}: TablesDisabledProps) {
  return (
    <div
      className="flex h-screen flex-col overflow-hidden"
      style={{ background: "var(--page-bg)" }}
    >
      <header
        className="z-30 flex h-[69px] shrink-0 items-center justify-between border-b px-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)] md:px-6"
        style={{
          background: "var(--page-header-bg)",
          borderColor: "var(--page-header-border)",
        }}
      >
        <div className="flex items-center gap-3">
          <AppLogo />
          <NavMenu />
        </div>
      </header>
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <AppSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={() => setShowLogout(true)}
          activeId="tables"
        />
        <main
          className="flex flex-1 items-center justify-center overflow-y-auto p-6"
          style={{ background: "var(--page-surface)" }}
        >
          <div className="flex w-full max-w-sm flex-col items-center gap-5 text-center">
            <div
              className="flex size-16 items-center justify-center rounded-2xl"
              style={{ background: colors.primaryLight }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <rect
                  x="2"
                  y="7"
                  width="20"
                  height="6"
                  rx="3"
                  stroke={colors.primary}
                  strokeWidth="1.5"
                />
                <rect
                  x="5"
                  y="13"
                  width="3"
                  height="6"
                  rx="1.5"
                  stroke={colors.primary}
                  strokeWidth="1.5"
                />
                <rect
                  x="16"
                  y="13"
                  width="3"
                  height="6"
                  rx="1.5"
                  stroke={colors.primary}
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <div>
              <p
                style={{
                  fontFamily: font.family,
                  fontWeight: font.weight.bold,
                  fontSize: font.size["3xl"],
                  color: colors.textPrimary,
                }}
              >
                Tables Disabled
              </p>
              <p
                style={{
                  fontFamily: font.family,
                  fontSize: font.size.base,
                  color: colors.textMuted,
                  marginTop: 6,
                  lineHeight: "20px",
                }}
              >
                Table Management is turned off. Enable it from Settings to
                manage your restaurant floor plan.
              </p>
            </div>
            <div className="flex w-full flex-col gap-2">
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => {
                  window.location.href = "/settings"
                }}
              >
                Go to Settings
              </Button>
              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={() => {
                  window.location.href = "/dashboard"
                }}
              >
                Back to POS
              </Button>
            </div>
          </div>
        </main>
      </div>
      <MobileBottomNav activeId="tables" onLogout={() => setShowLogout(true)} />
      {showLogout && (
        <LogoutConfirmationModal
          isOpen={showLogout}
          onConfirm={() => setShowLogout(false)}
          onCancel={() => setShowLogout(false)}
        />
      )}
    </div>
  )
}
