import { StatCard } from "../ds/StatCard"

const NGN = "\u20a6"

export function StatCards({
  revenue = 0,
  orders = 0,
  avg = 0,
  profit = 0,
  tax = 0,
}: {
  revenue?: number
  orders?: number
  avg?: number
  profit?: number
  tax?: number
}) {
  const safe = (n: number) => (typeof n === "number" && isFinite(n) ? n : 0)
  const fmt = (n: number) => {
    const v = safe(n)
    if (v >= 1000000) return `${NGN}${(v / 1000000).toFixed(1)}M`
    if (v >= 1000) return `${NGN}${(v / 1000).toFixed(0)}K`
    return `${NGN}${v.toLocaleString()}`
  }
  const cards = [
    {
      label: "Revenue",
      value: fmt(revenue),
      accent: "#e91835",
      bg: "var(--c-primary-light)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
          <path
            d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
            stroke="#e91835"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Orders",
      value: safe(orders).toLocaleString(),
      accent: "#2563eb",
      bg: "var(--c-info-bg)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
          <rect
            x="2"
            y="3"
            width="20"
            height="14"
            rx="2"
            stroke="#2563eb"
            strokeWidth="2"
          />
          <path
            d="M8 21h8M12 17v4"
            stroke="#2563eb"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Avg Order",
      value: fmt(avg),
      accent: "#d97706",
      bg: "var(--c-warning-bg)",
      icon: (
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
    },
    {
      label: "Profit",
      value: fmt(profit),
      accent: "#059669",
      bg: "var(--c-success-bg)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
          <path
            d="M3.5 18.5l6-6 4 4L22 7"
            stroke="#059669"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Tax Collected",
      value: fmt(tax),
      accent: "#7c3aed",
      bg: "var(--c-info-bg)",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
          <path
            d="M9 14l6-6M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
            stroke="#7c3aed"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
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
