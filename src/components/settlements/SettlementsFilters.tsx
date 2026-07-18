import { colors } from "../ds/tokens"
import type { FilterType, DateRange } from "../../types/settlements/settlements"

const INTER = "'Inter', sans-serif"

interface SettlementsFiltersProps {
  filterType: FilterType
  onFilterTypeChange: (type: FilterType) => void
  dateRange: DateRange
  onDateRangeChange: (range: DateRange) => void
  search: string
  onSearchChange: (search: string) => void
  onExport: () => void
}

const DATE_RANGES: DateRange[] = ["Today", "Week", "Month", "All"]
const TYPE_FILTERS: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "Voided", value: "voided" },
  { label: "Refunded", value: "refunded" },
]

export function SettlementsFilters({
  filterType,
  onFilterTypeChange,
  dateRange,
  onDateRangeChange,
  search,
  onSearchChange,
  onExport,
}: SettlementsFiltersProps) {
  return (
    <>
      {/* Page Header with Export */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1
            style={{
              fontFamily: INTER,
              fontWeight: 600,
              fontSize: 18,
              color: "var(--page-text)",
            }}
          >
            Settlements &amp; Adjustments
          </h1>
          <p
            style={{
              fontFamily: INTER,
              fontSize: 14,
              color: "var(--page-text-muted)",
              marginTop: 4,
            }}
          >
            Full audit trail of all voided transactions and refunds issued to
            customers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Date range - desktop */}
          <div
            className="flex hidden items-center gap-0.5 rounded-xl p-1 md:flex"
            style={{ background: "var(--page-surface-2)" }}
          >
            {DATE_RANGES.map((r) => (
              <button
                key={r}
                onClick={() => onDateRangeChange(r)}
                className="rounded-lg px-3 py-1.5 text-center transition-all"
                style={{
                  fontFamily: INTER,
                  fontSize: 13,
                  fontWeight: dateRange === r ? 600 : 400,
                  color: dateRange === r ? "white" : "var(--page-text-muted)",
                  background:
                    dateRange === r ? "var(--c-primary)" : "transparent",
                }}
              >
                {r}
              </button>
            ))}
          </div>
          {/* Export */}
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 rounded-xl px-3 py-2 transition-colors"
            style={{
              background: "var(--page-surface)",
              border: "1px solid var(--page-border)",
              cursor: "pointer",
            }}
            title="Export to CSV"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="hidden md:block"
              style={{
                fontFamily: INTER,
                fontSize: 12,
                fontWeight: 500,
                color: "var(--page-text)",
              }}
            >
              Export CSV
            </span>
          </button>
        </div>
      </div>

      {/* Mobile date range */}
      <div
        className="flex items-center gap-0.5 rounded-xl p-1 md:hidden"
        style={{ background: "var(--page-surface-2)" }}
      >
        {DATE_RANGES.map((r) => (
          <button
            key={r}
            onClick={() => onDateRangeChange(r)}
            className="rounded-lg px-3 py-1.5 text-center transition-all"
            style={{
              fontFamily: INTER,
              fontSize: 13,
              fontWeight: dateRange === r ? 600 : 400,
              color: dateRange === r ? "white" : "var(--page-text-muted)",
              background: dateRange === r ? "var(--c-primary)" : "transparent",
            }}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Type filters + Search */}
      <div className="flex flex-wrap items-center gap-3">
        <div
          className="flex gap-0.5 rounded-xl p-1"
          style={{ background: "var(--page-surface-2)" }}
        >
          {TYPE_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => onFilterTypeChange(f.value)}
              className="rounded-lg px-3 py-1.5 text-center transition-all"
              style={{
                fontFamily: INTER,
                fontSize: 13,
                fontWeight: filterType === f.value ? 600 : 400,
                color:
                  filterType === f.value ? "white" : "var(--page-text-muted)",
                background:
                  filterType === f.value
                    ? f.value === "voided"
                      ? "#e91835"
                      : f.value === "refunded"
                        ? "#d97706"
                        : "var(--c-primary)"
                    : "transparent",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div
          className="flex min-w-[200px] flex-1 items-center gap-2 rounded-xl px-3 py-2"
          style={{
            background: "var(--page-surface-2)",
            border: "1px solid var(--page-border)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle
              cx="11"
              cy="11"
              r="8"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M21 21l-4.35-4.35"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search by ID, cashier, approver, customer..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 bg-transparent outline-none"
            style={{
              fontFamily: INTER,
              fontSize: 13,
              color: "var(--page-text)",
            }}
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              style={{ color: colors.textMuted }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </>
  )
}
