import { fmtK } from "@/utils/report-helpers"
import { colors } from "../ds/tokens"

const CARD =
  "page-card rounded-2xl border page-border shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_4px_16px_0_rgba(0,0,0,0.04)]"

const INTER = "'Inter', sans-serif"

export function BestSellers({
  sellers,
}: {
  sellers: {
    rank: number
    name: string
    units: number
    revenue: number
    pct: number
  }[]
}) {
  if (sellers.length === 0) {
    return (
      <div className={`${CARD} flex flex-col gap-4 p-5 md:p-6`}>
        <p
          style={{
            fontFamily: INTER,
            fontWeight: 600,
            fontSize: 15,
            color: colors.textPrimary,
          }}
        >
          Top Best Sellers
        </p>
        <p
          style={{
            fontFamily: INTER,
            fontSize: 13,
            color: colors.textMuted,
            textAlign: "center",
            padding: "24px 0",
          }}
        >
          No sales data yet in this period
        </p>
      </div>
    )
  }
  return (
    <div className={`${CARD} flex flex-col gap-4 p-5 md:p-6`}>
      <div>
        <p
          style={{
            fontFamily: INTER,
            fontWeight: 600,
            fontSize: 15,
            color: colors.textPrimary,
          }}
        >
          Top Best Sellers
        </p>
        <p
          style={{
            fontFamily: INTER,
            fontSize: 12,
            color: colors.textMuted,
            marginTop: 2,
          }}
        >
          By units sold this period
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {sellers.map((item) => {
          const rankBg =
            item.rank === 1
              ? "rgba(217, 119, 6, 0.15)"
              : item.rank === 2
                ? "rgba(107, 114, 128, 0.15)"
                : item.rank === 3
                  ? "rgba(234, 88, 12, 0.15)"
                  : "rgba(156, 163, 175, 0.15)"
          return (
            <div key={item.rank} className="flex items-center gap-3">
              <div
                className="flex size-7 shrink-0 items-center justify-center rounded-lg"
                style={{
                  fontFamily: INTER,
                  fontWeight: 700,
                  fontSize: 11,
                  background: rankBg,
                  color:
                    item.rank === 1
                      ? "#d97706"
                      : item.rank === 2
                        ? "#8e8e93"
                        : item.rank === 3
                          ? "#ea580c"
                          : "#9ca3af",
                }}
              >
                {item.rank}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <p
                    style={{
                      fontFamily: INTER,
                      fontWeight: 500,
                      fontSize: 12,
                      color: colors.textPrimary,
                    }}
                    className="truncate"
                  >
                    {item.name}
                  </p>
                  <p
                    style={{
                      fontFamily: INTER,
                      fontWeight: 600,
                      fontSize: 12,
                      color: colors.textPrimary,
                      flexShrink: 0,
                      marginLeft: 8,
                    }}
                  >
                    {fmtK(item.revenue)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-1.5 flex-1 overflow-hidden rounded-full"
                    style={{ background: "var(--page-surface-2)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.pct}%`,
                        background: `linear-gradient(90deg, ${colors.primary}, #f87171)`,
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: INTER,
                      fontSize: 10,
                      color: colors.textMuted,
                      flexShrink: 0,
                    }}
                  >
                    {item.units} units
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
