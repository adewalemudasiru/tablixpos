const INTER = "'Inter', sans-serif"

interface EmptyStateMessageProps {
  isMobile?: boolean
  bgColor: string
  borderColor: string
  textSub: string
  textMuted: string
  surface: string
  border: string
}

export function EmptyStateMessage({
  isMobile = false,
  textSub,
  textMuted,
  surface,
  border,
}: EmptyStateMessageProps) {
  const iconSize = isMobile ? 24 : 36

  return (
    <div
      className={`flex h-full flex-col items-center justify-center gap-4 ${isMobile ? "px-8" : ""} text-center`}
    >
      <div
        className={`flex items-center justify-center rounded-2xl ${isMobile ? "size-14" : "size-20"}`}
        style={{
          background: surface,
          border: `1px solid ${border}`,
        }}
      >
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
          <path
            d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3"
            stroke={textMuted}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <p
          style={{
            fontFamily: INTER,
            fontWeight: isMobile ? 600 : 700,
            fontSize: isMobile ? 15 : 18,
            color: textSub,
          }}
        >
          No orders in queue
        </p>
        <p
          style={{
            fontFamily: INTER,
            fontSize: isMobile ? 13 : 14,
            color: textMuted,
            marginTop: isMobile ? 4 : 6,
          }}
        >
          New orders from the POS will appear here automatically
        </p>
      </div>
    </div>
  )
}
