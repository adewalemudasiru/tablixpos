import { colors } from "../ds/tokens"

export function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      aria-label="Close"
      className="flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-gray-100 active:bg-gray-200"
      style={{ color: colors.textMuted }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M18 6L6 18M6 6l12 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  )
}
