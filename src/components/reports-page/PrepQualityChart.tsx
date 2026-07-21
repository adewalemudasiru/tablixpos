import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const CARD =
  "page-card rounded-2xl border page-border shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_4px_16px_0_rgba(0,0,0,0.04)]"

const INTER = "'Inter', sans-serif"

export function PrepQualityChart({ qualityData }: { qualityData: any[] }) {
  const total = qualityData.reduce((s, p) => s + p.value, 0)
  return (
    <div className={`${CARD} flex flex-col gap-4 p-5 md:p-6`}>
      <div>
        <p
          style={{
            fontFamily: INTER,
            fontWeight: 600,
            fontSize: 15,
            color: "var(--page-text)",
          }}
        >
          Turnaround Quality
        </p>
        <p
          style={{
            fontFamily: INTER,
            fontSize: 12,
            color: "var(--page-text-muted)",
            marginTop: 2,
          }}
        >
          Preparation speed classification
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <div style={{ width: 130, height: 130, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={qualityData}
                cx="50%"
                cy="50%"
                innerRadius={38}
                outerRadius={60}
                paddingAngle={3}
                dataKey="value"
              >
                {qualityData.map((p, i) => (
                  <Cell key={`cell-${i}`} fill={p.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: any) => `${Number(v ?? 0)} orders`}
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
          {qualityData.map((p) => {
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
                        color: "var(--page-text-secondary)",
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
                        color: "var(--page-text)",
                      }}
                    >
                      {p.value}
                    </span>
                    <span
                      style={{
                        fontFamily: INTER,
                        fontSize: 10,
                        color: "var(--page-text-muted)",
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
