import { colors, font, shadows } from "../../components/ds/tokens"

export function FilterPill({
  label,
  active,
  onClick,
  dark,
}: {
  label: string
  active: boolean
  onClick: () => void
  dark?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 rounded-full px-3 py-1.5 transition-all active:scale-95"
      style={{
        fontFamily: font.family,
        fontWeight: active ? font.weight.semibold : font.weight.normal,
        fontSize: font.size.base,
        background: active
          ? dark
            ? colors.textPrimary
            : colors.primary
          : colors.white,
        color: active ? colors.white : colors.textSecondary,
        border: `1px solid ${active ? (dark ? colors.textPrimary : colors.primary) : colors.borderMid}`,
        boxShadow: active ? shadows.sm : "none",
      }}
    >
      {label}
    </button>
  )
}
