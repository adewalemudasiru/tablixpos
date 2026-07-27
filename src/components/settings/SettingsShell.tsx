import React from "react"
import { LogoutConfirmationModal } from "../LogoutConfirmationModal"
import { AppSidebar, MobileBottomNav } from "../AppSidebar"
import { NavMenu } from "../NavMenu"
import { Toaster } from "sonner"
import type { SettingsTab } from "../../types/settings/common"
import { AppLogo } from "../AppLogo"

interface SettingsShellProps {
  activeTab: SettingsTab
  onTabChange: (tab: SettingsTab) => void
  tabs: SettingsTab[]
  tabIcons: Record<SettingsTab, React.ReactNode>
  children: React.ReactNode
}

export function SettingsShell({
  activeTab,
  onTabChange,
  tabs,
  tabIcons,
  children,
}: SettingsShellProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [showLogout, setShowLogout] = React.useState(false)

  return (
    <div
      className="flex h-screen flex-col overflow-hidden"
      style={{ background: "var(--page-bg)" }}
    >
      <Toaster position="top-center" richColors />
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
          activeId="settings"
        />

        <main
          className="flex-1 overflow-y-auto pb-[72px] md:pb-0"
          style={{ background: "var(--page-surface)" }}
        >
          <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
            <div className="hidden md:block">
              <h1
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: 18,
                  color: "var(--page-text)",
                }}
              >
                Settings
              </h1>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  color: "var(--page-text-muted)",
                  marginTop: 4,
                }}
              >
                Manage your restaurant configuration, preferences, and system
                settings
              </p>
            </div>

            <div className="flex gap-6">
              <aside className="hidden w-52 shrink-0 flex-col gap-1 lg:flex">
                {tabs.map((tab) => {
                  const isActive = tab === activeTab
                  return (
                    <button
                      key={tab}
                      onClick={() => onTabChange(tab)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${isActive ? "bg-[var(--page-surface-2)] font-semibold text-[var(--page-text)]" : "text-[var(--page-text-muted)] hover:bg-[var(--page-surface-2)] hover:text-[var(--page-text)]"}`}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          color: isActive
                            ? "var(--page-text)"
                            : "var(--page-text-muted)",
                          flexShrink: 0,
                        }}
                      >
                        {tabIcons[tab]}
                      </span>
                      {tab}
                    </button>
                  )
                })}
              </aside>

              <div className="flex min-w-0 flex-1 flex-col gap-5">
                <div
                  className="-mx-4 overflow-x-auto px-4 lg:hidden"
                  style={{ scrollbarWidth: "none" }}
                >
                  <div className="flex min-w-max items-end gap-0 border-b border-[var(--page-border)]">
                    {tabs.map((tab) => {
                      const isActive = tab === activeTab
                      return (
                        <button
                          key={tab}
                          onClick={() => onTabChange(tab)}
                          className={`relative flex shrink-0 items-center gap-1.5 px-4 pb-3 transition-colors ${isActive ? "font-semibold text-[var(--page-text)]" : "text-[var(--page-text-muted)] hover:text-[var(--page-text)]"}`}
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 13,
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          <span
                            style={{
                              color: isActive
                                ? "var(--page-text)"
                                : "var(--page-text-muted)",
                            }}
                          >
                            {tabIcons[tab]}
                          </span>
                          {tab}
                          {isActive && (
                            <span
                              className="absolute right-0 bottom-0 left-0 h-[2.5px] rounded-full"
                              style={{ background: "var(--page-text)" }}
                            />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="hidden lg:block">
                  <h2
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: 17,
                      color: "var(--page-text)",
                    }}
                  >
                    {activeTab}
                  </h2>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      color: "var(--page-text-muted)",
                      marginTop: 2,
                    }}
                  >
                    {activeTab === "Business Info" &&
                      "Your restaurant details and localisation settings"}
                    {activeTab === "Account Settings" &&
                      "Update your owner profile and change your login PIN"}
                    {activeTab === "Loyalty Reward" &&
                      "Configure your customer loyalty and rewards program"}
                    {activeTab === "POS & Printer" &&
                      "Configure your point-of-sale and receipt printing options"}
                    {activeTab === "Kitchen Order" &&
                      "Kitchen Order Ticket (KOT) and display settings"}
                    {activeTab === "Table Management" &&
                      "Enable and configure table management for your floor plan"}
                    {activeTab === "Tax Settings" &&
                      "Set up VAT, service charges, and tax calculation rules"}
                    {activeTab === "Menu QR Code" &&
                      "Print your digital menu QR code for customers to scan"}
                  </p>
                </div>

                {children}
              </div>
            </div>
          </div>
        </main>
      </div>

      <MobileBottomNav
        activeId="settings"
        onLogout={() => setShowLogout(true)}
      />
      <LogoutConfirmationModal
        isOpen={showLogout}
        onConfirm={() => setShowLogout(false)}
        onCancel={() => setShowLogout(false)}
      />
    </div>
  )
}
