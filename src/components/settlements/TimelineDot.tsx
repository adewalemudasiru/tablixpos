export function TimelineDot({ type }: { type: "voided" | "refunded" }) {
  const isRefund = type === "refunded"
  return (
    <span
      className="flex size-8 shrink-0 items-center justify-center rounded-full"
      style={{
        background: isRefund ? "#fffbeb" : "#fff1f2",
        border: `1.5px solid ${isRefund ? "#fcd34d" : "#fbd2cf"}`,
      }}
    >
      {isRefund ? (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            stroke="#d97706"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#e91835" strokeWidth="2" />
          <path
            d="M15 9l-6 6M9 9l6 6"
            stroke="#e91835"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </span>
  )
}
