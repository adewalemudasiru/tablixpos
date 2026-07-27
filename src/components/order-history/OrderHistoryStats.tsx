import { StatCard } from "../ds/StatCard"
import { fmtStat } from "../../utils/order-helpers"
import type { OrderHistoryStats } from "../../types/order-history/order"

interface OrderHistoryStatsProps {
  stats: OrderHistoryStats
  isEmbedded?: boolean
}

const STAT_ICONS = {
  totalOrders: (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <path
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
        stroke="#2563eb"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="9"
        y="3"
        width="6"
        height="4"
        rx="1"
        stroke="#2563eb"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 12h6M9 16h4"
        stroke="#2563eb"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  revenue: (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <path
        d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
        stroke="#e91835"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  avgOrder: (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <path
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9M17 13l2 9M9 21h6"
        stroke="#d97706"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  completed: (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <path
        d="M20 6L9 17l-5-5"
        stroke="#059669"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  voided: (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <circle cx="12" cy="12" r="10" stroke="#7c3aed" strokeWidth="2" />
      <path
        d="M15 9l-6 6M9 9l6 6"
        stroke="#7c3aed"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
}

const STAT_CONFIG = [
  {
    key: "totalOrders",
    label: "Total Orders",
    accent: "#2563eb",
    bg: "#eff6ff",
    icon: STAT_ICONS.totalOrders,
  },
  {
    key: "totalRevenue",
    label: "Revenue",
    accent: "#e91835",
    bg: "#fff1f2",
    icon: STAT_ICONS.revenue,
  },
  {
    key: "avgOrder",
    label: "Avg Order Value",
    accent: "#d97706",
    bg: "#fffbeb",
    icon: STAT_ICONS.avgOrder,
  },
  {
    key: "completedCount",
    label: "Completed",
    accent: "#059669",
    bg: "#ecfdf5",
    icon: STAT_ICONS.completed,
  },
  {
    key: "voidedCount",
    label: "Voided / Refunded",
    accent: "#7c3aed",
    bg: "#f5f3ff",
    icon: STAT_ICONS.voided,
  },
]

export function OrderHistoryStats({
  stats,
  isEmbedded = false,
}: OrderHistoryStatsProps) {
  const cardData = STAT_CONFIG.map((config) => ({
    ...config,
    value:
      config.key === "totalRevenue" || config.key === "avgOrder"
        ? fmtStat(
            stats[config.key as keyof OrderHistoryStats] as
              number | null | undefined
          )
        : String(stats[config.key as keyof OrderHistoryStats] ?? 0),
  }))

  if (isEmbedded) return null

  return (
    <>
      <div
        className="-mx-4 flex gap-3 overflow-x-auto px-4 md:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {cardData.map((c) => (
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
        {cardData.map((c) => (
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
