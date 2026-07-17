const INTER = "'Inter', sans-serif"
const RED = "#e91835"

interface CategoryPillProps {
  label: string
  active: boolean
  count: number
  onClick: () => void
}

export function CategoryPill({
  label,
  active,
  count,
  onClick,
}: CategoryPillProps) {
  return (
    <button
      onClick={onClick}
      className="flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 transition-all"
      style={{
        background: active ? RED : "white",
        border: active ? `1.5px solid ${RED}` : "1.5px solid #e5e7eb",
        cursor: "pointer",
        boxShadow: active ? "0 2px 8px 0 rgba(233,24,53,0.2)" : "none",
      }}
    >
      <span
        style={{
          fontFamily: INTER,
          fontWeight: 600,
          fontSize: 13,
          color: active ? "white" : "#374151",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: INTER,
          fontSize: 10,
          fontWeight: 600,
          background: active ? "rgba(255,255,255,0.25)" : "#f3f4f6",
          color: active ? "white" : "#6b7280",
          borderRadius: 999,
          padding: "1px 6px",
        }}
      >
        {count}
      </span>
    </button>
  )
}
