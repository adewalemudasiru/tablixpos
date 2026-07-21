import React from "react"
import { colors, font, radius, shadows } from "./tokens"

export type ButtonVariant =
  "primary" | "secondary" | "outline" | "ghost" | "danger"
export type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: colors.primary,
    color: colors.white,
    border: `1px solid ${colors.primary}`,
    boxShadow: shadows.sm,
  },
  secondary: {
    background: colors.neutralBg,
    color: colors.neutralText,
    border: `1px solid ${colors.border}`,
    boxShadow: shadows.sm,
  },
  outline: {
    background: colors.white,
    color: "#344054",
    border: `1px solid ${colors.border}`,
    boxShadow: shadows.sm,
  },
  ghost: {
    background: "transparent",
    color: colors.textMuted,
    border: "1px solid transparent",
  },
  danger: {
    background: "#f04438",
    color: colors.white,
    border: "1px solid #f04438",
    boxShadow: shadows.sm,
  },
}

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: {
    height: "36px",
    padding: "0 14px",
    fontSize: font.size.sm,
    borderRadius: radius.md,
  },
  md: {
    height: "40px",
    padding: "0 18px",
    fontSize: font.size.md,
    borderRadius: radius.md,
  },
  lg: {
    height: "46px",
    padding: "0 20px",
    fontSize: font.size.xl,
    borderRadius: radius.md,
  },
}

const hoverMap: Record<ButtonVariant, string> = {
  primary: "hover:opacity-90",
  secondary: "hover:opacity-90",
  outline: "hover:bg-gray-50",
  ghost: "hover:bg-gray-100",
  danger: "hover:opacity-90",
}

const Spinner = () => (
  <svg
    className="animate-spin"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8H4z"
    />
  </svg>
)

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className = "",
  style,
  ...rest
}: ButtonProps) {
  const vs = variantStyles[variant]
  const ss = sizeStyles[size]

  return (
    <button
      disabled={disabled || loading}
      className={[
        "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap select-none",
        "transition-all duration-150 active:scale-[0.98]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        hoverMap[variant],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      style={{
        fontFamily: font.family,
        fontWeight: font.weight.medium,
        ...vs,
        ...ss,
        ...(fullWidth ? { width: "100%" } : {}),
        ...style,
      }}
      {...rest}
    >
      {loading ? <Spinner /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  )
}
