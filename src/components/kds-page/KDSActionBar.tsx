interface KDSActionBarProps {
  isDark: boolean
  activeFilter: "Active" | "Completed" | "All"
  onFilterChange: (filter: "Active" | "Completed" | "All") => void
  activeStation: string
  onStationChange: (station: string) => void
  visibleStations: string[]
  onLogout: () => void
  onBack: () => void
  theme: string
}

export function KDSActionBar({
  isDark,
  activeFilter,
  onFilterChange,
  activeStation,
  onStationChange,
  visibleStations,
  onLogout,
  onBack,
}: KDSActionBarProps) {
  const statusFilters: ("Active" | "Completed" | "All")[] = [
    "Active",
    "Completed",
    "All",
  ]

  const getNavBtnClass = (isActive: boolean) => {
    if (isDark) {
      return `flex items-center gap-3 px-5 py-3.5 rounded-xl transition-colors text-[18px] font-medium shrink-0 ${
        isActive
          ? "bg-[#3c3c3e] text-[#0a84ff] font-semibold"
          : "hover:bg-[#3c3c3e] text-[#8e8e93] hover:text-white"
      }`
    } else {
      return `flex items-center gap-3 px-5 py-3.5 rounded-xl transition-colors text-[18px] font-medium shrink-0 ${
        isActive
          ? "bg-[#f4f4f6] text-[#e91835] font-semibold"
          : "hover:bg-[#f4f4f6] text-[#4b5563] hover:text-[#111827]"
      }`
    }
  }

  return (
    <div
      className={`flex h-[84px] shrink-0 items-center justify-between border-t px-6 ${
        isDark
          ? "border-[#3c3c3e] bg-[#2c2c2e]"
          : "border-[var(--page-border)] bg-[var(--page-surface)]"
      }`}
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div
        className="flex w-full items-center gap-6 overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Back Button */}
        <button onClick={onBack} className={getNavBtnClass(false)}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M12 5l-7 7 7 7"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>

        <div
          className="h-8 w-px shrink-0"
          style={{ background: isDark ? "#3c3c3e" : "#e5e7eb" }}
        />

        {/* Status Filters */}
        {statusFilters.map((f) => {
          const isActive = activeFilter === f
          let dotColor = "transparent"
          if (f === "Active") dotColor = "#ff9f0a"
          if (f === "Completed") dotColor = "#30d158"
          if (f === "All") dotColor = "#0a84ff"

          return (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className={getNavBtnClass(isActive)}
            >
              <span className="flex size-[26px] shrink-0 items-center justify-center">
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: dotColor,
                  }}
                />
              </span>
              {f}
            </button>
          )
        })}

        <div
          className="h-8 w-px shrink-0"
          style={{ background: isDark ? "#3c3c3e" : "#e5e7eb" }}
        />

        {/* Station Filters */}
        {visibleStations.map((s) => {
          const isActive = activeStation === s
          return (
            <button
              key={s}
              onClick={() => onStationChange(s)}
              className={getNavBtnClass(isActive)}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 19V6a2 2 0 012-2h12a2 2 0 012 2v13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M8 10h8M8 14h4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              {s}
            </button>
          )
        })}

        <div
          className="h-8 w-px shrink-0"
          style={{ background: isDark ? "#3c3c3e" : "#e5e7eb" }}
        />

        {/* Logout Button */}
        <button onClick={onLogout} className={getNavBtnClass(false)}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="16 17 21 12 16 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="21"
              y1="12"
              x2="9"
              y2="12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Logout
        </button>
      </div>
    </div>
  )
}
