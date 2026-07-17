import { Button } from "../ds/Button"
import { font } from "../ds"

interface ErrorBannerProps {
  error: string
  onRetry: () => void
  className?: string
}

export function ErrorBanner({
  error,
  onRetry,
  className = "",
}: ErrorBannerProps) {
  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 ${className}`}
      style={{
        background: "var(--c-danger-bg)",
        border: "1px solid var(--c-danger-dot)",
      }}
    >
      <p
        style={{
          fontFamily: font.family,
          fontSize: font.size.sm,
          color: "var(--c-danger)",
          flex: 1,
        }}
      >
        {error}
      </p>
      <Button variant="outline" size="sm" onClick={onRetry}>
        Retry
      </Button>
    </div>
  )
}
