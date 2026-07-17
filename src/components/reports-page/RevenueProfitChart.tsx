import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { ChartTooltip } from "@/components/reports-page/ChartTooltip"
import { Card } from "../ds/Card"
import { colors } from "../ds/tokens"
import { fmtK } from "@/utils/report-helpers"

const CARD =
  "page-card rounded-2xl border page-border shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_4px_16px_0_rgba(0,0,0,0.04)]"

const INTER = "'Inter', sans-serif"

type Range = "Today" | "Week" | "Month" | "Year"

export function RevenueProfitChart({
  range,
  data,
}: {
  range: Range
  data: any[]
}) {
  if (range === "Today") {
    return (
      <div className={`${Card} flex flex-col gap-4 p-5 md:p-6`}>
        <div>
          <p
            style={{
              fontFamily: INTER,
              fontWeight: 600,
              fontSize: 15,
              color: colors.textPrimary,
            }}
          >
            Peak Hours
          </p>
          <p
            style={{
              fontFamily: INTER,
              fontSize: 12,
              color: colors.textMuted,
              marginTop: 2,
            }}
          >
            Order volume by hour today
          </p>
        </div>
        <div style={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--page-border)"
                vertical={false}
              />
              <XAxis
                dataKey="hour"
                tick={{
                  fontFamily: INTER,
                  fontSize: 10,
                  fill: colors.textMuted,
                }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{
                  fontFamily: INTER,
                  fontSize: 10,
                  fill: colors.textMuted,
                }}
                axisLine={false}
                tickLine={false}
                width={28}
              />
              <Tooltip content={<ChartTooltip />} />
              <Bar
                dataKey="orders"
                name="Orders"
                fill={colors.primary}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }
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
            Revenue vs Profit
          </p>
          <p
            style={{
              fontFamily: INTER,
              fontSize: 12,
              color: colors.textMuted,
              marginTop: 2,
            }}
          >
            Side by side comparison
          </p>
        </div>
        <div className="flex items-center gap-3">
          {[
            { label: "Revenue", color: colors.primary },
            { label: "Profit", color: colors.successText },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span
                className="size-2.5 rounded-full"
                style={{ background: l.color }}
              />
              <span
                style={{
                  fontFamily: INTER,
                  fontSize: 11,
                  color: colors.textMuted,
                }}
              >
                {l.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--page-border)"
              vertical={false}
            />
            <XAxis
              dataKey={data[0] && "day" in data[0] ? "day" : "label"}
              tick={{ fontFamily: INTER, fontSize: 10, fill: colors.textMuted }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={fmtK}
              tick={{ fontFamily: INTER, fontSize: 10, fill: colors.textMuted }}
              axisLine={false}
              tickLine={false}
              width={48}
            />
            <Tooltip content={<ChartTooltip />} />
            <Bar
              dataKey="revenue"
              name="Revenue"
              fill={colors.primary}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="profit"
              name="Profit"
              fill={colors.successText}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
