import { colors, font, radius, shadows } from "../ds"
import { FormLabel } from "./FormLabel"

const INTER = "'Inter', sans-serif"

interface FormTextareaProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  optional?: boolean
  rows?: number
}

export function FormTextarea({
  label,
  value,
  onChange,
  placeholder,
  optional,
  rows = 3,
}: FormTextareaProps) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <FormLabel optional={optional}>{label}</FormLabel>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="page-input w-full resize-none outline-none"
        style={{
          fontFamily: INTER,
          fontSize: font.size.xl,
          color: colors.textPrimary,
          border: `1px solid ${colors.border}`,
          borderRadius: radius.md,
          boxShadow: shadows.sm,
          padding: "10px 14px",
          lineHeight: "24px",
        }}
      />
    </div>
  )
}
