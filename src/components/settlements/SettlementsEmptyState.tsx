import { colors } from "../ds/tokens"

const INTER = "'Inter', sans-serif"

export function SettlementsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div
        className="flex size-16 items-center justify-center rounded-2xl"
        style={{ background: "var(--page-surface-2)" }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
            stroke={colors.textMuted}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <rect
            x="9"
            y="3"
            width="6"
            height="4"
            rx="1"
            stroke={colors.textMuted}
            strokeWidth="1.8"
          />
          <path
            d="M9 12h6M9 16h4"
            stroke={colors.textMuted}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="text-center">
        <p
          style={{
            fontFamily: INTER,
            fontWeight: 600,
            fontSize: 15,
            color: colors.textPrimary,
          }}
        >
          No adjustments found
        </p>
        <p
          style={{
            fontFamily: INTER,
            fontSize: 13,
            color: colors.textMuted,
            marginTop: 4,
          }}
        >
          No voided or refunded transactions match your current filters.
        </p>
      </div>
    </div>
  )
}
