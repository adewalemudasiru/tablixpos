import { colors, font, radius, shadows } from "../../components/ds/tokens"

export function SelectField({
  label,
  value,
  onChange,
  error,
  children,
}: {
  label?: string
  value: string
  onChange: (v: string) => void
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label
          style={{
            fontFamily: font.family,
            fontWeight: font.weight.medium,
            fontSize: font.size.md,
            color: colors.textPrimary,
            lineHeight: "20px",
          }}
        >
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            fontFamily: font.family,
            fontSize: font.size.md,
            color: value ? colors.textPrimary : colors.textPlaceholder,
            border: `1px solid ${error ? colors.dangerText : colors.border}`,
            borderRadius: radius.md,
            padding: "10px 36px 10px 14px",
            outline: "none",
            background: colors.bg,
            width: "100%",
            boxShadow: shadows.sm,
            appearance: "none",
            WebkitAppearance: "none",
            lineHeight: "24px",
            cursor: "pointer",
          }}
        >
          {children}
        </select>
        <div
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            color: colors.textMuted,
          }}
        >
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path
              d="M1 1L6 6L11 1"
              stroke="currentColor"
              strokeWidth="1.67"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {error && (
        <p
          style={{
            fontFamily: font.family,
            fontSize: font.size.sm,
            color: colors.dangerText,
          }}
        >
          {error}
        </p>
      )}
    </div>
  )
}
