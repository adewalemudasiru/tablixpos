import { colors } from "../ds/tokens"
import { fmtAmt } from "../../utils/settlements-helpers"
import type { Transaction } from "../../store/AppContext"

interface ApproverSummaryProps {
  adjustments: Transaction[]
}

export function ApproverSummary({ adjustments }: ApproverSummaryProps) {
  const uniqueApprovers = Array.from(
    new Set(adjustments.map((t) => t.voidedBy).filter(Boolean))
  )

  if (uniqueApprovers.length === 0) return null

  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "var(--page-surface-2)",
        border: "1px solid var(--page-border)",
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: colors.textMuted,
          marginBottom: 12,
        }}
      >
        Approvals by Manager
      </p>
      <div className="flex flex-wrap gap-2">
        {uniqueApprovers.map((name) => {
          const count = adjustments.filter((t) => t.voidedBy === name).length
          const amt = adjustments
            .filter((t) => t.voidedBy === name)
            .reduce((s, t) => s + t.total, 0)
          return (
            <div
              key={name}
              className="flex items-center gap-2 rounded-xl px-3 py-2"
              style={{
                background: "var(--page-surface)",
                border: "1px solid var(--page-border)",
              }}
            >
              <span
                className="flex size-7 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: "#7c3aed20",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#7c3aed",
                }}
              >
                {(name ?? "?").charAt(0).toUpperCase()}
              </span>
              <div>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: colors.textPrimary,
                  }}
                >
                  {name}
                </p>
                <p style={{ fontSize: 11, color: colors.textMuted }}>
                  {count} approval{count !== 1 ? "s" : ""} · {fmtAmt(amt)}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
