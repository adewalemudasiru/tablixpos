import React from "react"

export const colors = {
  primary: "#E91835",
  primaryLight: "#FFF5F7",
  primaryMid: "#FBA6B7",
  white: "#FFFFFF",
  textPrimary: "#111827",
  textSecondary: "#374151",
  textMuted: "#6B7280",
  borderLight: "#E5E7EB",
  borderMid: "#D1D5DB",
  border: "#D1D5DB",
  dangerText: "#B91C1C",
  dangerBg: "#FEE2E2",
  dangerDot: "#F87171",
  successText: "#15803D",
  successBg: "#DCFCE7",
  neutralBg: "#F3F4F6",
}

export const font = {
  family: "'Inter', sans-serif",
  size: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "0.95rem",
    md: "1rem",
    lg: "1.05rem",
    xl: "1.15rem",
    "3xl": "1.5rem",
  },
  weight: { normal: 400, medium: 500, semibold: 600, bold: 700 },
}

export const radius = {
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.25rem",
  full: "9999px",
}
export const shadows = {
  sm: "0 1px 2px rgba(0,0,0,0.04)",
  card: "0 8px 24px rgba(0,0,0,0.08)",
}

export function Button({
  children,
  className = "",
  variant = "default",
  size = "md",

  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "primary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition-all"
  const variants: Record<string, string> = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    primary: "bg-[#E91835] text-white hover:bg-[#c6112e]",
    outline:
      "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
  }
  const sizes: Record<string, string> = {
    sm: "h-8 px-3 text-sm",
    md: "h-9 px-4 text-sm",
    lg: "h-10 px-5 text-base",
  }
  return (
    <button
      className={[base, variants[variant], sizes[size], className].join(" ")}
      disabled={props.disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export function Input({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={[
        "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#E91835] focus:ring-2 focus:ring-[#E91835]/20",
        className,
      ].join(" ")}
      {...props}
    />
  )
}

export function Modal({
  open,
  onClose,
  title,
  children,
  actions,
}: {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  actions?: Array<{
    label: string
    variant?: "outline" | "primary"
    onClick?: () => void
  }>
}) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h3 className="mb-4 text-lg font-semibold text-slate-900">{title}</h3>
        )}
        <div>{children}</div>
        {actions && actions.length > 0 && (
          <div className="mt-5 flex justify-end gap-2">
            {actions.map((action) => (
              <Button
                key={action.label}
                variant={action.variant === "primary" ? "primary" : "outline"}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function Badge({
  children,
  className = "",
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={[
        "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  )
}

export function StatCard({
  title,
  value,
}: {
  title: string
  value: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-2 text-xl font-semibold text-slate-900">{value}</p>
    </div>
  )
}
