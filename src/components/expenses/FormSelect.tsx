import { colors, font, radius, shadows } from "../ds"
import { FormLabel } from "./FormLabel"

const INTER = "'Inter', sans-serif"

interface FormSelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
  optional?: boolean
}

export function FormSelect({
  label,
  value,
  onChange,
  options,
  optional,
}: FormSelectProps) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <FormLabel optional={optional}>{label}</FormLabel>
      <div
        className="page-input flex w-full items-center"
        style={{
          border: `1px solid ${colors.border}`,
          borderRadius: radius.md,
          boxShadow: shadows.sm,
          position: "relative",
        }}
      >
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent px-3.5 py-2.5 outline-none"
          style={{
            fontFamily: INTER,
            fontSize: font.size.xl,
            color: colors.textPrimary,
            appearance: "none" as const,
            cursor: "pointer",
            paddingRight: 36,
          }}
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute right-3"
          style={{ color: colors.textMuted }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>
    </div>
  )
}
