import React from "react"

interface DashboardBottomNavProps {
  theme: "dark" | "light"
  activeTab: "pos" | "tables" | "orders" | "customers"
  tablesEnabled: boolean
  onTabChange: (tab: "pos" | "tables" | "orders" | "customers") => void
  onSettingsClick: () => void
}

export const DashboardBottomNav: React.FC<DashboardBottomNavProps> = ({
  theme,
  activeTab,
  tablesEnabled,
  onTabChange,
  onSettingsClick,
}) => {
  const getNavBtnClass = (tab: typeof activeTab) => {
    const isActive = activeTab === tab
    if (theme === "dark") {
      return `flex items-center gap-3 px-5 py-3.5 rounded-xl transition-colors text-[18px] font-medium ${
        isActive
          ? "bg-[#3c3c3e] text-[#0a84ff] font-semibold"
          : "hover:bg-[#3c3c3e] text-[#8e8e93] hover:text-white"
      }`
    } else {
      return `flex items-center gap-3 px-5 py-3.5 rounded-xl transition-colors text-[18px] font-medium ${
        isActive
          ? "bg-[#f4f4f6] text-[#e91835] font-semibold"
          : "hover:bg-[#f4f4f6] text-[#4b5563] hover:text-[#111827]"
      }`
    }
  }

  return (
    <div
      className={`flex h-[84px] shrink-0 items-center justify-between border-t px-6 ${
        theme === "dark"
          ? "border-[#3c3c3e] bg-[#2c2c2e]"
          : "border-[var(--page-border)] bg-[var(--page-surface)]"
      }`}
    >
      <div
        className="flex items-center gap-6 overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <button
          className={getNavBtnClass("pos")}
          onClick={() => onTabChange("pos")}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 6h16v12H4z" />
          </svg>{" "}
          Register
        </button>
        {tablesEnabled && (
          <button
            className={getNavBtnClass("tables")}
            onClick={() => onTabChange("tables")}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3h18v18H3z" />
            </svg>{" "}
            Tables
          </button>
        )}
        <button
          className={getNavBtnClass("orders")}
          onClick={() => onTabChange("orders")}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
          </svg>{" "}
          Receipts
        </button>
        <button
          className={getNavBtnClass("customers")}
          onClick={() => onTabChange("customers")}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>{" "}
          Customers
        </button>
        <button
          className={`flex items-center gap-3 rounded-xl px-5 py-3.5 text-[18px] font-medium transition-colors ${
            theme === "dark"
              ? "text-[#8e8e93] hover:bg-[#3c3c3e] hover:text-white"
              : "text-[#4b5563] hover:bg-[#f4f4f6] hover:text-[#111827]"
          }`}
          onClick={onSettingsClick}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.73 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .43-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.49-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
          </svg>{" "}
          Settings
        </button>
      </div>
      <button
        className={`rounded-xl px-5 py-3.5 transition-colors ${
          theme === "dark"
            ? "text-[#8e8e93] hover:bg-[#3c3c3e] hover:text-white"
            : "text-[#4b5563] hover:bg-[#f4f4f6] hover:text-[#111827]"
        }`}
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
  )
}
