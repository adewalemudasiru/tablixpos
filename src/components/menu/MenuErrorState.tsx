import { Button } from "../ds/Button"
import { font } from "../ds/tokens"

interface MenuErrorStateProps {
  error: string
  onRetry: () => void
}

export function MenuErrorState({ error, onRetry }: MenuErrorStateProps) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl px-4 py-3"
      style={{ background: "#fef2f2", border: "1px solid #fecaca" }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        style={{ flexShrink: 0, color: "#dc2626" }}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M12 8v4M12 16h.01"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <p
        style={{
          fontFamily: font.family,
          fontSize: font.size.base,
          color: "#dc2626",
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
