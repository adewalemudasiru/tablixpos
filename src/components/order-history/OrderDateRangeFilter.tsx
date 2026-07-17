import type { DateRange } from "../../types/order-history/order"

const INTER = "'Inter', sans-serif"

interface OrderDateRangeFilterProps {
  value: DateRange
  onChange: (range: DateRange) => void
  options?: DateRange[]
  className?: string
}

const DEFAULT_RANGES: DateRange[] = ["Today", "Week", "Month", "All"]

export function OrderDateRangeFilter({
  value,
  onChange,
  options = DEFAULT_RANGES,
  className = "",
}: OrderDateRangeFilterProps) {
  return (
    <div
      className={`flex items-center gap-0.5 self-start rounded-xl p-1 ${className}`}
      style={{ background: "var(--page-surface-2)" }}
    >
      {options.map((r) => (
        <button
          key={r}
          onClick={() => onChange(r)}
          className="rounded-lg px-3 py-1.5 text-center transition-all md:px-4 md:py-1.5"
          style={{
            fontFamily: INTER,
            fontSize: 13,
            fontWeight: value === r ? 600 : 400,
            color: value === r ? "white" : "var(--page-text-muted)",
            background: value === r ? "var(--c-primary)" : "transparent",
          }}
        >
          {r}
        </button>
      ))}
    </div>
  )
}
