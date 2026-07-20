import { FilterPill } from "./FilterPill"
import type { TableStatus } from "../../store/AppContext"
import type { DisplayMode } from "../../types/tables-page/tables"

const STATUS_FILTERS: { value: TableStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "available", label: "Available" },
  { value: "occupied", label: "Occupied" },
  { value: "reserved", label: "Reserved" },
  { value: "bill_requested", label: "Bill" },
]

const DISPLAY_MODES: DisplayMode[] = ["covers", "total", "time", "status"]

interface TablesFiltersProps {
  filterStatus: TableStatus | "all"
  onFilterStatusChange: (status: TableStatus | "all") => void
  displayMode: DisplayMode
  onDisplayModeChange: (mode: DisplayMode) => void
  isDark?: boolean
}

export function TablesFilters({
  filterStatus,
  onFilterStatusChange,
  displayMode,
  onDisplayModeChange,
  isDark = false,
}: TablesFiltersProps) {
  return (
    <div className="mb-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
      <div
        className="flex shrink-0 gap-1.5 overflow-x-auto pb-0.5"
        style={{ scrollbarWidth: "none" }}
      >
        {STATUS_FILTERS.map((o) => (
          <FilterPill
            key={o.value}
            label={o.label}
            active={filterStatus === o.value}
            onClick={() => onFilterStatusChange(o.value)}
            dark={isDark}
          />
        ))}
      </div>

      <div
        className="flex items-center gap-1 rounded-xl border bg-black/10 p-1 dark:border-white/10 dark:bg-white/5"
        style={{ borderColor: "var(--page-border)" }}
      >
        {DISPLAY_MODES.map((mode) => (
          <button
            key={mode}
            onClick={() => onDisplayModeChange(mode)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
              displayMode === mode
                ? isDark
                  ? "bg-white font-bold text-black"
                  : "bg-black font-bold text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {mode}
          </button>
        ))}
      </div>
    </div>
  )
}
