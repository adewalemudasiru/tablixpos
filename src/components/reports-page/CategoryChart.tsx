import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { colors } from "../ds/tokens"
import { fmtK } from "@/utils/report-helpers"
import { ChartTooltip } from "./ChartTooltip"

const CARD =
  "page-card rounded-2xl border page-border shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_4px_16px_0_rgba(0,0,0,0.04)]"

const INTER = "'Inter', sans-serif"

export function CategoryChart({
  catData,
}: {
  catData: { name: string; revenue: number; orders: number; color: string }[]
}) {
  const display =
    catData.length > 0
      ? catData
      : [{ name: "No sales yet", revenue: 1, orders: 0, color: "#e5e7eb" }]
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
          Top Selling Items
        </p>
        <p
          style={{
            fontFamily: INTER,
            fontSize: 12,
            color: colors.textMuted,
            marginTop: 2,
          }}
        >
          Revenue by item this period
        </p>
      </div>
      <div style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={display}
            layout="vertical"
            margin={{ top: 0, right: 8, bottom: 0, left: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--page-border)"
              horizontal={false}
            />
            <XAxis
              type="number"
              tickFormatter={fmtK}
              tick={{ fontFamily: INTER, fontSize: 10, fill: colors.textMuted }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{
                fontFamily: INTER,
                fontSize: 10,
                fill: colors.textSecondary,
              }}
              axisLine={false}
              tickLine={false}
              width={96}
            />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="revenue" name="Revenue" radius={[0, 4, 4, 0]}>
              {display.map((c, i) => (
                <Cell key={`cell-${i}`} fill={c.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      {catData.length > 0 && (
        <div className="grid grid-cols-2 gap-2 pt-1 sm:grid-cols-3">
          {catData.map((c) => (
            <div key={c.name} className="flex items-center gap-2">
              <span
                className="size-2 shrink-0 rounded-full"
                style={{ background: c.color }}
              />
              <div className="min-w-0">
                <p
                  style={{
                    fontFamily: INTER,
                    fontSize: 10,
                    color: colors.textMuted,
                  }}
                  className="truncate"
                >
                  {c.name}
                </p>
                <p
                  style={{
                    fontFamily: INTER,
                    fontWeight: 600,
                    fontSize: 11,
                    color: colors.textPrimary,
                  }}
                >
                  {fmtK(c.revenue)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
