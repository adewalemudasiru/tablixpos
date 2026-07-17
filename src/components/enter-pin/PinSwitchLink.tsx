const INTER = "'Inter', sans-serif"

interface PinSwitchLinkProps {
  isStaffFlow: boolean
  onSwitch: () => void
  className?: string
}

export function PinSwitchLink({
  isStaffFlow,
  onSwitch,
  className = "",
}: PinSwitchLinkProps) {
  return (
    <div
      className={`mt-1 flex w-full items-center justify-center gap-4 text-sm ${className}`}
    >
      {isStaffFlow ? (
        <button
          onClick={onSwitch}
          style={{
            fontFamily: INTER,
            fontSize: 13,
            color: "#e91835",
            fontWeight: 500,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          Business owner? Log in here
        </button>
      ) : (
        <button
          onClick={onSwitch}
          style={{
            fontFamily: INTER,
            fontSize: 13,
            color: "var(--page-text-muted)",
            fontWeight: 500,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          Staff login
        </button>
      )}
    </div>
  )
}
