import { colors } from "../ds/tokens"

const NGN = "\u20a6"
const INTER = "'Inter', sans-serif"

const CARD =
  "page-card rounded-2xl border page-border shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_4px_16px_0_rgba(0,0,0,0.04)]"

export function ProfitAndLoss({
  revenue,
  totalExpenses,
}: {
  revenue: number
  totalExpenses: number
}) {
  const estimated = Math.round(revenue * 0.65)
  const usedExpenses = totalExpenses > 0 ? totalExpenses : estimated
  const netProfit = revenue - usedExpenses
  const marginPct = revenue > 0 ? Math.round((netProfit / revenue) * 100) : 0
  const isProfit = netProfit >= 0
  const fmt = (n: number) =>
    n >= 1000000
      ? `${NGN}${(n / 1000000).toFixed(2)}M`
      : n >= 1000
        ? `${NGN}${(n / 1000).toFixed(0)}K`
        : `${NGN}${n.toLocaleString()}`

  const expenseRows = [
    { label: "Cost of Goods (est. 40%)", value: Math.round(revenue * 0.4) },
    { label: "Staff & Payroll (est. 15%)", value: Math.round(revenue * 0.15) },
    { label: "Utilities (est. 5%)", value: Math.round(revenue * 0.05) },
    { label: "Other (est. 5%)", value: Math.round(revenue * 0.05) },
  ]

  return (
    <div className={`${CARD} flex flex-col gap-4 p-5 md:p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p
            style={{
              fontFamily: INTER,
              fontWeight: 600,
              fontSize: 15,
              color: colors.textPrimary,
            }}
          >
            Profit &amp; Loss
          </p>
          <p
            style={{
              fontFamily: INTER,
              fontSize: 12,
              color: colors.textMuted,
              marginTop: 2,
            }}
          >
            Period summary
          </p>
        </div>
        <div
          className="rounded-full px-2.5 py-1"
          style={{
            background: isProfit ? colors.successBg : colors.dangerBg,
            color: isProfit ? colors.successText : colors.dangerText,
            fontFamily: INTER,
            fontWeight: 600,
            fontSize: 11,
          }}
        >
          {isProfit ? "+" : ""}
          {marginPct}% margin
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <p
          style={{
            fontFamily: INTER,
            fontWeight: 600,
            fontSize: 11,
            color: colors.textMuted,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Income
        </p>
        <div
          className="flex items-center justify-between border-b py-1.5"
          style={{ borderColor: "var(--page-border)" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="size-1.5 shrink-0 rounded-full"
              style={{ background: colors.successText }}
            />
            <span
              style={{
                fontFamily: INTER,
                fontSize: 12,
                color: colors.textSecondary,
              }}
            >
              Sales Revenue
            </span>
          </div>
          <span
            style={{
              fontFamily: INTER,
              fontWeight: 500,
              fontSize: 12,
              color: colors.textPrimary,
            }}
          >
            {fmt(revenue)}
          </span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <span
            style={{
              fontFamily: INTER,
              fontWeight: 600,
              fontSize: 12,
              color: colors.textPrimary,
            }}
          >
            Total Revenue
          </span>
          <span
            style={{
              fontFamily: INTER,
              fontWeight: 700,
              fontSize: 13,
              color: colors.successText,
            }}
          >
            {fmt(revenue)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <p
          style={{
            fontFamily: INTER,
            fontWeight: 600,
            fontSize: 11,
            color: colors.textMuted,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Expenses (Estimated)
        </p>
        {expenseRows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between border-b py-1.5"
            style={{ borderColor: "var(--page-border)" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="size-1.5 shrink-0 rounded-full"
                style={{ background: colors.dangerText }}
              />
              <span
                style={{
                  fontFamily: INTER,
                  fontSize: 12,
                  color: colors.textSecondary,
                }}
              >
                {row.label}
              </span>
            </div>
            <span
              style={{
                fontFamily: INTER,
                fontWeight: 500,
                fontSize: 12,
                color: colors.textPrimary,
              }}
            >
              {fmt(row.value)}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between pt-1">
          <span
            style={{
              fontFamily: INTER,
              fontWeight: 600,
              fontSize: 12,
              color: colors.textPrimary,
            }}
          >
            Total Expenses
          </span>
          <span
            style={{
              fontFamily: INTER,
              fontWeight: 700,
              fontSize: 13,
              color: colors.dangerText,
            }}
          >
            {fmt(usedExpenses)}
          </span>
        </div>
      </div>

      <div
        className="flex items-center justify-between gap-3 rounded-xl p-3"
        style={{ background: isProfit ? colors.successBg : colors.dangerBg }}
      >
        <div>
          <p
            style={{
              fontFamily: INTER,
              fontSize: 11,
              fontWeight: 500,
              color: isProfit ? colors.successText : colors.dangerText,
            }}
          >
            Net Profit
          </p>
          <p
            style={{
              fontFamily: INTER,
              fontSize: 18,
              fontWeight: 700,
              color: isProfit ? colors.successText : colors.dangerText,
              marginTop: 1,
            }}
          >
            {isProfit ? "+" : ""}
            {fmt(netProfit)}
          </p>
        </div>
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: isProfit ? "var(--c-success-bg)" : "var(--c-danger-bg)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            {isProfit ? (
              <path
                d="M22 7l-8.5 8.5-5-5L2 17M16 7h6v6"
                stroke={colors.successText}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M22 17l-8.5-8.5-5 5L2 7M16 17h6v-6"
                stroke={colors.dangerText}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </div>
      </div>
    </div>
  )
}
