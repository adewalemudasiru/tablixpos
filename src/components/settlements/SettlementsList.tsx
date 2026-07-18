import { colors } from "../ds/tokens"
import { SettlementsTableRow } from "./SettlementsTableRow"
import { SettlementsEmptyState } from "./SettlementsEmptyState"
import { fmtAmt } from "../../utils/settlements-helpers"
import type { SettlementListProps } from "../../types/settlements/settlements"

const INTER = "'Inter', sans-serif"

export function SettlementsList({
  adjustments,
  isDark = false,
  onRowClick,
}: SettlementListProps) {
  const totalExposure = adjustments.reduce((s, t) => s + t.total, 0)

  if (adjustments.length === 0) {
    return <SettlementsEmptyState />
  }

  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{
        border: "1px solid var(--page-border)",
        background: "var(--page-surface)",
      }}
    >
      {/* Table header */}
      <div
        className="hidden grid-cols-[2fr_1fr_1.5fr_1.5fr_1.5fr_1fr_0.8fr] gap-4 border-b px-5 py-3 md:grid"
        style={{
          background: "var(--page-surface-2)",
          borderColor: "var(--page-border)",
        }}
      >
        {[
          "Transaction",
          "Type",
          "Original Sale",
          "Adjusted On",
          "Cashier / Raised",
          "Approved By",
          "Amount",
        ].map((h) => (
          <span
            key={h}
            style={{
              fontFamily: INTER,
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: colors.textMuted,
            }}
          >
            {h}
          </span>
        ))}
      </div>

      {adjustments.map((tx) => (
        <SettlementsTableRow
          key={tx.id}
          tx={tx}
          isDark={isDark}
          onClick={onRowClick}
        />
      ))}

      {/* Footer summary */}
      <div
        className="flex items-center justify-between border-t px-5 py-3"
        style={{
          background: "var(--page-surface-2)",
          borderColor: "var(--page-border)",
        }}
      >
        <span
          style={{
            fontFamily: INTER,
            fontSize: 12,
            color: colors.textMuted,
          }}
        >
          {adjustments.length} adjustment
          {adjustments.length !== 1 ? "s" : ""} in period
        </span>
        <span
          style={{
            fontFamily: INTER,
            fontSize: 13,
            fontWeight: 700,
            color: "#e91835",
          }}
        >
          Total: {fmtAmt(totalExposure)}
        </span>
      </div>
    </div>
  )
}
