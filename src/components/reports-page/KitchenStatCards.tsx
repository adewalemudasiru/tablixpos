import { StatCard } from "../ds/StatCard"

export function KitchenStatCards({ metrics }: { metrics: any }) {
  const cards = [
    {
      label: "Avg Prep Time",
      value: `${metrics.avgPrepTime} mins`,
      accent: "#ff9500",
      bg: "rgba(255,149,0,0.12)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
          <circle cx="12" cy="12" r="10" stroke="#ff9500" strokeWidth="2" />
          <polyline
            points="12 6 12 12 16 14"
            stroke="#ff9500"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Tickets Prepared",
      value: metrics.totalCompleted.toLocaleString(),
      accent: "#24b04b",
      bg: "rgba(36,176,75,0.12)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
          <path
            d="M20 6L9 17l-5-5"
            stroke="#24b04b"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Active Queue",
      value: metrics.totalActive.toLocaleString(),
      accent: "#e91835",
      bg: "rgba(233,24,53,0.12)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
          <rect
            x="3"
            y="4"
            width="18"
            height="16"
            rx="2"
            stroke="#e91835"
            strokeWidth="2"
          />
          <path
            d="M7 8h10M7 12h10M7 16h6"
            stroke="#e91835"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "On-Time Rate",
      value: `${metrics.onTimeRate}%`,
      accent: "#af52de",
      bg: "rgba(175,82,222,0.12)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
          <path
            d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3"
            stroke="#af52de"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Busiest Station",
      value: metrics.peakStation,
      accent: "#0070e0",
      bg: "rgba(0,112,224,0.12)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
          <path
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16M8 10h8M8 14h4"
            stroke="#0070e0"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ]
  return (
    <>
      <div
        className="-mx-4 flex gap-3 overflow-x-auto px-4 md:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {cards.map((c) => (
          <StatCard
            key={c.label}
            label={c.label}
            value={c.value}
            icon={c.icon}
            iconBg={c.bg}
            accent={c.accent}
            compact
            className="shrink-0"
            style={{ minWidth: 155 }}
          />
        ))}
      </div>
      <div className="hidden grid-cols-3 gap-4 md:grid xl:grid-cols-5">
        {cards.map((c) => (
          <StatCard
            key={c.label}
            label={c.label}
            value={c.value}
            icon={c.icon}
            iconBg={c.bg}
            accent={c.accent}
            style={{ border: "none" }}
          />
        ))}
      </div>
    </>
  )
}
