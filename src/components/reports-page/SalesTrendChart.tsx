import { useState } from "react"
import { colors, radius, shadows } from "../ds/tokens"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ChartTooltip } from "./ChartTooltip"
import { fmtK } from "@/utils/report-helpers"

const CARD =
  "page-card rounded-2xl border page-border shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_4px_16px_0_rgba(0,0,0,0.04)]"

const INTER = "'Inter', sans-serif"

type Range = "Today" | "Week" | "Month" | "Year"

export function SalesTrendChart({
  range,
  data,
}: {
  range: Range
  data: any[]
}) {
  const [metric, setMetric] = useState<"revenue" | "orders">("revenue")
  const safeData = Array.isArray(data) ? data : []
  const xKey =
    range === "Today"
      ? "hour"
      : range === "Year"
        ? "label"
        : safeData[0] && "day" in safeData[0]
          ? "day"
          : "label"
  return (
    <div className={`${CARD} flex flex-col gap-4 p-5 md:p-6`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            style={{
              fontFamily: INTER,
              fontWeight: 600,
              fontSize: 15,
              color: colors.textPrimary,
            }}
          >
            Sales Trend
          </p>
          <p
            style={{
              fontFamily: INTER,
              fontSize: 12,
              color: colors.textMuted,
              marginTop: 2,
            }}
          >
            {range === "Today"
              ? "Hourly breakdown"
              : range === "Week"
                ? "Last 7 days"
                : range === "Month"
                  ? "This month"
                  : "This year"}
          </p>
        </div>
        <div
          className="flex items-center gap-1 rounded-xl p-0.5"
          style={{ background: "var(--page-surface-2)" }}
        >
          {(["revenue", "orders"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMetric(m)}
              style={{
                fontFamily: INTER,
                fontSize: 11,
                fontWeight: metric === m ? 600 : 400,
                padding: "5px 10px",
                borderRadius: radius.lg,
                background:
                  metric === m ? "var(--page-card-bg)" : "transparent",
                color: metric === m ? colors.primary : colors.textMuted,
                boxShadow: metric === m ? shadows.sm : "none",
                border: "none",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {m === "revenue" ? "Revenue" : "Orders"}
            </button>
          ))}
        </div>
      </div>
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={safeData}
            margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
          >
            <defs>
              <linearGradient id="gradRev" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={colors.primary}
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor={colors.primary}
                  stopOpacity={0.0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--page-border)"
              vertical={false}
            />
            <XAxis
              dataKey={xKey}
              tick={{ fontFamily: INTER, fontSize: 10, fill: colors.textMuted }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) =>
                metric === "revenue" ? fmtK(v) : String(v)
              }
              tick={{ fontFamily: INTER, fontSize: 10, fill: colors.textMuted }}
              axisLine={false}
              tickLine={false}
              width={52}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey={metric}
              name={metric === "revenue" ? "Revenue" : "Orders"}
              stroke={colors.primary}
              strokeWidth={2.5}
              fill="url(#gradRev)"
              dot={false}
              activeDot={{ r: 5, fill: colors.primary, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
