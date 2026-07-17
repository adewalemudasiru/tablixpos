import { OrderDateRangeFilter } from "./OrderDateRangeFilter"
import { ExportButton } from "./ExportButton"
import { Search } from "lucide-react"
import type { DateRange } from "../../types/order-history/order"

const INTER = "'Inter', sans-serif"

interface OrderHistoryFiltersProps {
  dateRange: DateRange
  onDateRangeChange: (range: DateRange) => void
  onSearchClick: () => void
  onExportClick: () => void
  isDark?: boolean
}

export function OrderHistoryFilters({
  dateRange,
  onDateRangeChange,
  onSearchClick,
  onExportClick,
  isDark = false,
}: OrderHistoryFiltersProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1
          style={{
            fontFamily: INTER,
            fontWeight: 600,
            fontSize: 18,
            color: isDark ? "white" : "#0a0a0a",
          }}
        >
          Order History
        </h1>
        <p
          style={{
            fontFamily: INTER,
            fontWeight: 400,
            fontSize: 14,
            color: isDark ? "#a1a1aa" : "#4a5565",
            marginTop: 4,
          }}
        >
          Browse, search and review all past transactions. Click any row to view
          full receipt.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <OrderDateRangeFilter
          value={dateRange}
          onChange={onDateRangeChange}
          className="hidden md:flex"
        />
        <button
          onClick={onSearchClick}
          className={`rounded-full p-2 transition-colors hover:bg-[var(--page-surface-2)]`}
          title="Search Orders"
        >
          <Search className={`h-5 w-5 text-[var(--page-text-muted)]`} />
        </button>
        <ExportButton onClick={onExportClick} />
      </div>
    </div>
  )
}
