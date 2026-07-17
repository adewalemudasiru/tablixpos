import React, { useState } from "react"
import { LogoutConfirmationModal } from "../LogoutConfirmationModal"
import { MobileBottomNav } from "../AppSidebar"
import { Toaster } from "sonner"
import { History, Printer, Search } from "lucide-react"
import type { DashboardTab } from "../../types/dashboard/common"

interface DashboardShellProps {
  activeTab: DashboardTab
  onTabChange: (tab: DashboardTab) => void
  onSearch: () => void
  onHistory: () => void
  onPrint: () => void
  onSettings: () => void
  onLogout: () => void
  activeStaffName: string
  hasLastTransaction: boolean
  theme: "light" | "dark"
  children: React.ReactNode
}

export function DashboardShell({
  activeTab,
  onTabChange,
  onSearch,
  onHistory,
  onPrint,
  onSettings,
  onLogout,
  activeStaffName,
  hasLastTransaction,
  theme,
  children,
}: DashboardShellProps) {
  const [showLogout, setShowLogout] = useState(false)

  const getNavBtnClass = (tab: DashboardTab) => {
    const isActive = activeTab === tab
    if (theme === "dark") {
      return `flex items-center gap-3 px-5 py-3.5 rounded-xl transition-colors text-[18px] font-medium ${isActive ? "bg-[#3c3c3e] text-[#0a84ff] font-semibold" : "hover:bg-[#3c3c3e] text-[#8e8e93] hover:text-white"}`
    }

    return `flex items-center gap-3 px-5 py-3.5 rounded-xl transition-colors text-[18px] font-medium ${isActive ? "bg-[#f4f4f6] text-[#e91835] font-semibold" : "hover:bg-[#f4f4f6] text-[#4b5563] hover:text-[#111827]"}`
  }

  return (
    <div
      className={`flex h-screen flex-col overflow-hidden font-sans ${theme === "dark" ? "bg-[#1c1c1e] text-white" : "bg-[#f4f4f6] text-[#111827]"}`}
    >
      <Toaster position="top-right" richColors />

      <header
        className={`flex h-16 shrink-0 items-center justify-between border-b px-6 ${theme === "dark" ? "border-[#3c3c3e] bg-[#2c2c2e]" : "border-[var(--page-border)] bg-[var(--page-surface)]"}`}
      >
        <button onClick={onLogout}>Log out</button>

        <div className="flex flex-col items-center">
          <div
            className={`flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-[#111827]"}`}
          >
            <span className="text-[17px] font-semibold">{activeStaffName}</span>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-9V6a6 6 0 10-12 0v2H5v14h14V8h-1zm-4 0H10V6a2 2 0 114 0v2z" />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onHistory}
            className="rounded-full p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
            title="Transaction History"
          >
            <History
              className={`h-7 w-7 ${theme === "dark" ? "text-white" : "text-[#374151]"}`}
            />
          </button>
          {hasLastTransaction && (
            <button
              onClick={onPrint}
              className="rounded-full p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
              title="Print last receipt"
            >
              <Printer
                className={`h-7 w-7 ${theme === "dark" ? "text-white" : "text-[#374151]"}`}
              />
            </button>
          )}
          <button
            onClick={onSearch}
            className="rounded-full p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
            title="Search"
          >
            <Search
              className={`h-7 w-7 ${theme === "dark" ? "text-white" : "text-[#374151]"}`}
            />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">{children}</main>

      <div
        className={`flex h-[84px] shrink-0 items-center justify-between border-t px-6 ${theme === "dark" ? "border-[#3c3c3e] bg-[#2c2c2e]" : "border-[var(--page-border)] bg-[var(--page-surface)]"}`}
      >
        <div
          className="flex items-center gap-6 overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <button
            className={getNavBtnClass("pos")}
            onClick={() => onTabChange("pos")}
          >
            Register
          </button>
          <button
            className={getNavBtnClass("tables")}
            onClick={() => onTabChange("tables")}
          >
            Tables
          </button>
          <button
            className={getNavBtnClass("orders")}
            onClick={() => onTabChange("orders")}
          >
            Receipts
          </button>
          <button
            className={getNavBtnClass("customers")}
            onClick={() => onTabChange("customers")}
          >
            Customers
          </button>
          <button
            className={`flex items-center gap-3 rounded-xl px-5 py-3.5 text-[18px] font-medium transition-colors ${theme === "dark" ? "text-[#8e8e93] hover:bg-[#3c3c3e] hover:text-white" : "text-[#4b5563] hover:bg-[#f4f4f6] hover:text-[#111827]"}`}
            onClick={onSettings}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.73 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .43-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.49-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
            </svg>
            Settings
          </button>
        </div>
        <button
          className={`rounded-xl px-5 py-3.5 transition-colors ${theme === "dark" ? "text-[#8e8e93] hover:bg-[#3c3c3e] hover:text-white" : "text-[#4b5563] hover:bg-[#f4f4f6] hover:text-[#111827]"}`}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>

      <MobileBottomNav activeId="dashboard" onLogout={onLogout} />

      <LogoutConfirmationModal
        isOpen={showLogout}
        onConfirm={() => {
          setShowLogout(false)
          onLogout()
        }}
        onCancel={() => setShowLogout(false)}
      />
    </div>
  )
}
