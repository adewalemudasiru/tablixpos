import { Cell, Pie, ResponsiveContainer, Tooltip } from "recharts"
import { colors } from "../ds/tokens"
import { PieChart } from "lucide-react"
import { fmtK } from "@/utils/report-helpers"

const CARD =
  "page-card rounded-2xl border page-border shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_4px_16px_0_rgba(0,0,0,0.04)]"

const INTER = "'Inter', sans-serif"

export function PaymentDistribution({
  payData,
}: {
  payData: { name: string; value: number; color: string }[]
}) {
  const display =
    payData.length > 0
      ? payData
      : [{ name: "No data", value: 1, color: "#e5e7eb" }]
  const total = display.reduce((s, p) => s + p.value, 0)
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
          Payment Methods
        </p>
        <p
          style={{
            fontFamily: INTER,
            fontSize: 12,
            color: colors.textMuted,
            marginTop: 2,
          }}
        >
          Breakdown by payment type
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <div style={{ width: 130, height: 130, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={display}
                cx="50%"
                cy="50%"
                innerRadius={38}
                outerRadius={60}
                paddingAngle={3}
                dataKey="value"
              >
                {display.map((p, i) => (
                  <Cell key={`cell-${i}`} fill={p.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: number) => fmtK(v)}
                contentStyle={{
                  fontFamily: INTER,
                  fontSize: 11,
                  borderRadius: 10,
                  border: "1px solid var(--page-border)",
                  background: "var(--page-card-bg)",
                  color: "var(--page-text)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          {display.map((p) => {
            const pct = total > 0 ? Math.round((p.value / total) * 100) : 0
            return (
              <div key={p.name}>
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="size-2.5 rounded-full"
                      style={{ background: p.color }}
                    />
                    <span
                      style={{
                        fontFamily: INTER,
                        fontWeight: 500,
                        fontSize: 12,
                        color: colors.textSecondary,
                      }}
                    >
                      {p.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      style={{
                        fontFamily: INTER,
                        fontWeight: 600,
                        fontSize: 12,
                        color: colors.textPrimary,
                      }}
                    >
                      {fmtK(p.value)}
                    </span>
                    <span
                      style={{
                        fontFamily: INTER,
                        fontSize: 10,
                        color: colors.textMuted,
                      }}
                    >
                      {pct}%
                    </span>
                  </div>
                </div>
                <div
                  className="h-1.5 overflow-hidden rounded-full"
                  style={{ background: "var(--page-surface-2)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: p.color }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
