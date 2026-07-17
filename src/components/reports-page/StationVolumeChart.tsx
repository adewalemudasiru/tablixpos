import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ChartTooltip } from "./ChartTooltip"

const INTER = "'Inter', sans-serif"

const CARD =
  "page-card rounded-2xl border page-border shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_4px_16px_0_rgba(0,0,0,0.04)]"

export function StationVolumeChart({ data }: { data: any[] }) {
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
          Station Order Volume
        </p>
        <p
          style={{
            fontFamily: INTER,
            fontSize: 12,
            color: "var(--page-text-muted)",
            marginTop: 2,
          }}
        >
          Processed vs Active tickets per station
        </p>
      </div>
      <div style={{ height: 220 }}>
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
              dataKey="station"
              tick={{
                fontFamily: INTER,
                fontSize: 10,
                fill: "var(--page-text-muted)",
              }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{
                fontFamily: INTER,
                fontSize: 10,
                fill: "var(--page-text-muted)",
              }}
              axisLine={false}
              tickLine={false}
              width={28}
            />
            <Tooltip content={<ChartTooltip />} />
            <Bar
              dataKey="total"
              name="Total Tickets"
              fill="#0070e0"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="active"
              name="Active Tickets"
              fill="#e91835"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
