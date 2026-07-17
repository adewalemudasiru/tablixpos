import { radius } from "../ds"

const INTER = "'Inter', sans-serif"

interface CategoryChipProps {
  category: string
}

export function CategoryChip({ category }: CategoryChipProps) {
  const presets: Record<string, { bg: string; text: string; dot: string }> = {
    "Food & Beverages": { bg: "#fff7ed", text: "#c2410c", dot: "#f97316" },
    Utilities: { bg: "#eff6ff", text: "#1d4ed8", dot: "#3b82f6" },
    Staff: { bg: "#f5f3ff", text: "#6d28d9", dot: "#8b5cf6" },
    Equipment: { bg: "#ecfdf5", text: "#065f46", dot: "#10b981" },
    Maintenance: { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" },
    Marketing: { bg: "#fdf2f8", text: "#9d174d", dot: "#ec4899" },
  }
  const fallbacks = [
    { bg: "#f3f4f6", text: "#374151", dot: "#9ca3af" },
    { bg: "#fff7ed", text: "#c2410c", dot: "#f97316" },
    { bg: "#eff6ff", text: "#1d4ed8", dot: "#3b82f6" },
    { bg: "#ecfdf5", text: "#065f46", dot: "#10b981" },
    { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" },
  ]
  const c =
    presets[category] ?? fallbacks[category.charCodeAt(0) % fallbacks.length]

  return (
    <span
      style={{
        fontFamily: INTER,
        fontSize: 11,
        fontWeight: 500,
        background: c.bg,
        color: c.text,
        borderRadius: radius.full,
        padding: "2px 10px",
        whiteSpace: "nowrap" as const,
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: c.dot,
          display: "inline-block",
        }}
      />
      {category}
    </span>
  )
}
