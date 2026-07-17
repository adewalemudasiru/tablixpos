import React from "react"
import { Button, Input, colors, font, radius, shadows } from "../ds"

export const INTER = "'Inter', sans-serif"
export const NGN = "₦"

export function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => !disabled && onChange(!checked)}
      className="relative transition-colors"
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: checked ? colors.primary : "var(--switch-background)",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        padding: 0,
        flexShrink: 0,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <span
        className="absolute top-[2px] transition-transform duration-200"
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          background: "var(--page-bg)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.22)",
          transform: checked ? "translateX(22px)" : "translateX(2px)",
          display: "block",
        }}
      />
    </button>
  )
}

export function ToggleRow({
  label,
  sub,
  checked,
  onChange,
  disabled,
}: {
  label: string
  sub?: string
  checked: boolean
  onChange: (v: boolean) => void
  disabled?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col gap-0.5">
        <span
          style={{
            fontFamily: INTER,
            fontWeight: 500,
            fontSize: font.size.base,
            color: colors.textPrimary,
          }}
        >
          {label}
        </span>
        {sub && (
          <span
            style={{
              fontFamily: INTER,
              fontSize: font.size.xs,
              color: colors.textMuted,
              lineHeight: "16px",
            }}
          >
            {sub}
          </span>
        )}
      </div>
      <Toggle checked={checked} onChange={onChange} disabled={disabled} />
    </div>
  )
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: INTER,
        fontWeight: 600,
        fontSize: font.size.base,
        color: colors.textPrimary,
        marginTop: 4,
      }}
    >
      {children}
    </p>
  )
}

export function Divider() {
  return (
    <div
      style={{ borderTop: `1px solid ${colors.borderLight}`, margin: "4px 0" }}
    />
  )
}

export function FormSelect({
  label,
  sub,
  value,
  onChange,
  options,
}: {
  label: string
  sub?: string
  value: string
  onChange: (v: string) => void
  options: string[]
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        style={{
          fontFamily: INTER,
          fontWeight: 500,
          fontSize: font.size.md,
          color: colors.textPrimary,
          lineHeight: "20px",
        }}
      >
        {label}
        {sub && (
          <span
            style={{
              fontFamily: INTER,
              fontWeight: 400,
              fontSize: 11,
              color: colors.textMuted,
              marginLeft: 6,
            }}
          >
            {sub}
          </span>
        )}
      </label>
      <div
        className="relative flex items-center border border-[var(--page-border)] transition-colors focus-within:border-[var(--c-primary)] focus-within:ring-[3px] focus-within:ring-[var(--c-primary)]/20"
        style={{
          background: "var(--page-card-bg)",
          borderRadius: radius.md,
          boxShadow: shadows.sm,
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
            paddingRight: 36,
            cursor: "pointer",
          }}
        >
          {options.map((o) => (
            <option
              key={o}
              value={o}
              style={{
                background: "var(--page-card-bg)",
                color: "var(--page-text)",
              }}
            >
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

export function FormTextarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        style={{
          fontFamily: INTER,
          fontWeight: 500,
          fontSize: font.size.md,
          color: colors.textPrimary,
          lineHeight: "20px",
        }}
      >
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-none border border-[var(--page-border)] transition-colors outline-none focus:border-[var(--c-primary)] focus:ring-[3px] focus:ring-[var(--c-primary)]/20"
        style={{
          fontFamily: INTER,
          fontSize: font.size.xl,
          color: colors.textPrimary,
          background: "var(--page-card-bg)",
          borderRadius: radius.md,
          boxShadow: shadows.sm,
          padding: "10px 14px",
          lineHeight: "24px",
        }}
      />
    </div>
  )
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={["page-card", className].join(" ")}
      style={{
        background: "var(--page-card-bg)",
        border: `1px solid ${colors.borderLight}`,
        borderRadius: radius.xl,
        boxShadow: shadows.card,
        padding: "20px 24px",
      }}
    >
      {children}
    </div>
  )
}

export function SaveBar({
  onSave,
  loading,
}: {
  onSave: () => void
  loading?: boolean
}) {
  return (
    <div className="flex justify-end pt-2">
      <Button variant="primary" size="md" loading={loading} onClick={onSave}>
        Save Changes
      </Button>
    </div>
  )
}

export function FormFieldInput({
  label,
  value,
  onChange,
  ...props
}: React.ComponentProps<typeof Input> & { label: string }) {
  return <Input label={label} value={value} onChange={onChange} {...props} />
}
