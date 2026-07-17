import { fmtK } from "@/utils/report-helpers"

const INTER = "'Inter', sans-serif"

export function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: any[]
  label?: string
}) {
  if (!active || !payload || !payload.length) return null
  return (
    <div
      className="rounded-xl px-3 py-2.5 shadow-xl"
      style={{
        minWidth: 130,
        background: "var(--page-card-bg)",
        border: "1px solid var(--page-border)",
      }}
    >
      <p
        style={{
          fontFamily: INTER,
          fontSize: 11,
          color: "var(--page-text-muted)",
          marginBottom: 6,
        }}
      >
        {label}
      </p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span
              className="size-2 rounded-full"
              style={{ background: p.color || p.fill }}
            />
            <span
              style={{
                fontFamily: INTER,
                fontSize: 11,
                color: "var(--page-text)",
              }}
            >
              {p.name}
            </span>
          </div>
          <span
            style={{
              fontFamily: INTER,
              fontWeight: 600,
              fontSize: 12,
              color: "var(--page-text)",
            }}
          >
            {p.name === "orders" || p.name === "Orders"
              ? p.value
              : fmtK(p.value)}
          </span>
        </div>
      ))}
    </div>
  )
}
