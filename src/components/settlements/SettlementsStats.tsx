import { StatCard } from "../ds/StatCard"
import { formatExposure } from "../../utils/settlements-helpers"
import type { SettlementStats } from "../../types/settlements/settlements"

interface SettlementsStatsProps {
  stats: SettlementStats
}

const STAT_ICONS = {
  totalAdjustments: (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <path
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
        stroke="#7c3aed"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="9"
        y="3"
        width="6"
        height="4"
        rx="1"
        stroke="#7c3aed"
        strokeWidth="2"
      />
      <path
        d="M9 12h6M9 16h4"
        stroke="#7c3aed"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  voided: (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <circle cx="12" cy="12" r="10" stroke="#e91835" strokeWidth="2" />
      <path
        d="M15 9l-6 6M9 9l6 6"
        stroke="#e91835"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  refunded: (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <path
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        stroke="#d97706"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  exposure: (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <path
        d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
        stroke="#059669"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
}

const STAT_CONFIG = [
  {
    key: "totalAdjustments",
    label: "Total Adjustments",
    accent: "#7c3aed",
    bg: "#f5f3ff",
    icon: STAT_ICONS.totalAdjustments,
  },
  {
    key: "totalVoided",
    label: "Voided",
    accent: "#e91835",
    bg: "#fff1f2",
    icon: STAT_ICONS.voided,
  },
  {
    key: "totalRefunded",
    label: "Refunded",
    accent: "#d97706",
    bg: "#fffbeb",
    icon: STAT_ICONS.refunded,
  },
  {
    key: "totalExposure",
    label: "Total Exposure",
    accent: "#059669",
    bg: "#ecfdf5",
    icon: STAT_ICONS.exposure,
  },
]

export function SettlementsStats({ stats }: SettlementsStatsProps) {
  const cardData = STAT_CONFIG.map((config) => {
    const value = stats[config.key as keyof SettlementStats]
    const displayValue =
      config.key === "totalExposure"
        ? formatExposure(value as number)
        : String(value)
    return {
      ...config,
      value: displayValue,
    }
  })

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
            style={{ minWidth: 150 }}
          />
        ))}
      </div>
      <div className="hidden grid-cols-2 gap-4 md:grid xl:grid-cols-4">
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
