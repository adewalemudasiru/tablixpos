import React from "react"
import { History, Printer, Search, X } from "lucide-react"

type Props = {
  activeStaffName?: string
  theme?: string
  hasLastReceipt?: boolean
  onLogout: () => void
  onShowHistory: () => void
  onPrint: () => void
  onShowSearch: () => void
}

export const DashboardHeader: React.FC<Props> = ({
  activeStaffName,
  theme,
  hasLastReceipt,
  onLogout,
  onShowHistory,
  onPrint,
  onShowSearch,
}) => {
  return (
    <header
      className={`flex h-16 shrink-0 items-center justify-between border-b px-6 ${
        theme === "dark"
          ? "border-[#3c3c3e] bg-[#2c2c2e]"
          : "border-[var(--page-border)] bg-[var(--page-surface)]"
      }`}
    >
      <button
        onClick={onLogout}
        className="font-medium text-[#ff453a] transition-opacity hover:opacity-80"
      >
        Log out
      </button>

      <div className="flex flex-col items-center">
        <div
          className={`flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-[#111827]"}`}
        >
          <span className="text-[17px] font-semibold">
            {activeStaffName || "Manager"}
          </span>
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-9V6a6 6 0 10-12 0v2H5v14h14V8h-1zm-4 0H10V6a2 2 0 114 0v2z" />
          </svg>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onShowHistory}
          className="rounded-full p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
          title="Transaction History"
        >
          <History
            className={`h-7 w-7 ${theme === "dark" ? "text-white" : "text-[#374151]"}`}
          />
        </button>
        {hasLastReceipt && (
          <button
            onClick={onPrint}
            className="rounded-full p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
            title="Print Last Receipt"
          >
            <Printer
              className={`h-7 w-7 ${theme === "dark" ? "text-white" : "text-[#374151]"}`}
            />
          </button>
        )}
        <button
          onClick={onShowSearch}
          className="rounded-full p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
          title="Search"
        >
          <Search
            className={`h-7 w-7 ${theme === "dark" ? "text-white" : "text-[#374151]"}`}
          />
        </button>
      </div>
    </header>
  )
}

export default DashboardHeader
