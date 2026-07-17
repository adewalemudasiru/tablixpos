import { colors } from "../ds/tokens"
import { font } from "../ds"

interface LoadingSpinnerProps {
  label?: string
  className?: string
}

export function LoadingSpinner({
  label = "Loading customers…",
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center gap-3">
        <div
          className="size-8 animate-spin rounded-full border-2 border-t-transparent"
          style={{
            borderColor: colors.primary,
            borderTopColor: "transparent",
          }}
        />
        <p
          style={{
            fontFamily: font.family,
            fontSize: font.size.sm,
            color: colors.textMuted,
          }}
        >
          {label}
        </p>
      </div>
    </div>
  )
}
