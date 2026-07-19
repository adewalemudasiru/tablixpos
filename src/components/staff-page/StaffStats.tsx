import { StatCard } from "../ds/StatCard"
import { colors } from "../ds/tokens"
import type { StaffStats as StaffStatsType } from "../../types/staff-page/staff"

interface StaffStatsProps {
  stats: StaffStatsType
}

const STAT_ICONS = {
  totalStaff: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
        stroke={colors.primary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="7" r="4" stroke={colors.primary} strokeWidth="2" />
      <path
        d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
        stroke={colors.primary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  adminsAndManagers: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        stroke={colors.infoText}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  cashiers: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="5"
        width="20"
        height="14"
        rx="2"
        stroke={colors.successText}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 10h20"
        stroke={colors.successText}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  waitersAndChefs: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3"
        stroke={colors.warningText}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
}

const STAT_CONFIG = [
  {
    key: "totalStaff",
    label: "Total Staff",
    sub: "Active team members",
    iconBg: colors.primaryLight,
    icon: STAT_ICONS.totalStaff,
  },
  {
    key: "adminsAndManagers",
    label: "Admins & Managers",
    iconBg: colors.infoBg,
    icon: STAT_ICONS.adminsAndManagers,
  },
  {
    key: "cashiers",
    label: "Cashiers",
    sub: "Handling transactions",
    iconBg: colors.successBg,
    icon: STAT_ICONS.cashiers,
  },
  {
    key: "waitersAndChefs",
    label: "Waiters & Chefs",
    iconBg: colors.warningBg,
    icon: STAT_ICONS.waitersAndChefs,
  },
]

export function StaffStats({ stats }: StaffStatsProps) {
  const cardData = STAT_CONFIG.map((config) => {
    const value = stats[config.key as keyof StaffStatsType]
    const sub =
      config.key === "adminsAndManagers"
        ? `${stats.adminsAndManagers} total`
        : config.sub || ""
    return {
      ...config,
      value: String(value),
      sub,
    }
  })

  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {cardData.map((s) => (
        <StatCard
          key={s.label}
          label={s.label}
          value={s.value}
          sub={s.sub}
          iconBg={s.iconBg}
          icon={s.icon}
        />
      ))}
    </div>
  )
}
