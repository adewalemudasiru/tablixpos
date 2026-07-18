import { colors } from "../ds/tokens"
import type { Range, ReportMode } from "../../types/report-page/reports"

const INTER = "'Inter', sans-serif"
const RANGES: Range[] = ["Today", "Week", "Month", "Year"]

interface ReportsFiltersProps {
  range: Range
  onRangeChange: (range: Range) => void
  reportMode: ReportMode
  onReportModeChange: (mode: ReportMode) => void
  kotEnabled: boolean
  activeReportMode: ReportMode
}

export function ReportsFilters({
  range,
  onRangeChange,
  onReportModeChange,
  kotEnabled,
  activeReportMode,
}: ReportsFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div
        className="flex items-center gap-0.5 self-start rounded-xl p-1"
        style={{ background: "var(--page-surface-2)" }}
      >
        {RANGES.map((r) => (
          <button
            key={r}
            onClick={() => onRangeChange(r)}
            className="cursor-pointer rounded-lg border-none px-3 py-1.5 text-center transition-all md:px-4 md:py-1.5"
            style={{
              fontFamily: INTER,
              fontSize: 13,
              fontWeight: range === r ? 600 : 400,
              color: range === r ? "white" : "var(--page-text-muted)",
              background: range === r ? colors.primary : "transparent",
            }}
          >
            {r}
          </button>
        ))}
      </div>

      {kotEnabled && (
        <div
          className="flex items-center gap-0.5 self-start rounded-xl p-1"
          style={{ background: "var(--page-surface-2)" }}
        >
          {(["sales", "kitchen"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => onReportModeChange(mode)}
              className="cursor-pointer rounded-lg border-none px-4 py-1.5 text-center transition-all"
              style={{
                fontFamily: INTER,
                fontSize: 13,
                fontWeight: activeReportMode === mode ? 600 : 400,
                color:
                  activeReportMode === mode
                    ? "white"
                    : "var(--page-text-muted)",
                background:
                  activeReportMode === mode ? colors.primary : "transparent",
              }}
            >
              {mode === "sales" ? "Sales Analytics" : "Kitchen Turnaround"}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
