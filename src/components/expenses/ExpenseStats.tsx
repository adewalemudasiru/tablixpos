import React from "react"
import { StatCard } from "../ds/StatCard"

interface StatCardData {
  label: string
  value: string
  sub: string
  iconBg: string
  icon: React.ReactNode
}

interface ExpenseStatsProps {
  stats: StatCardData[]
  isMobile?: boolean
}

export function ExpenseStats({ stats, isMobile = false }: ExpenseStatsProps) {
  if (isMobile) {
    return (
      <div
        className="-mx-4 flex gap-3 overflow-x-auto px-4"
        style={{ scrollbarWidth: "none" }}
      >
        {stats.map((s) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            sub={s.sub}
            icon={s.icon}
            iconBg={s.iconBg}
            compact
            className="shrink-0"
            style={{ minWidth: 155 }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((s) => (
        <StatCard
          key={s.label}
          label={s.label}
          value={s.value}
          sub={s.sub}
          icon={s.icon}
          iconBg={s.iconBg}
        />
      ))}
    </div>
  )
}
