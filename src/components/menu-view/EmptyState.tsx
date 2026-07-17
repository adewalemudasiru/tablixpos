const INTER = "'Inter', sans-serif"

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div
        className="flex size-16 items-center justify-center rounded-full"
        style={{ background: "var(--page-surface-2)" }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="#9ca3af" strokeWidth="2" />
          <path
            d="M21 21l-4.35-4.35"
            stroke="#9ca3af"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p
        style={{
          fontFamily: INTER,
          fontWeight: 600,
          fontSize: 16,
          color: "#111827",
        }}
      >
        No items found
      </p>
      <p
        style={{
          fontFamily: INTER,
          fontSize: 13,
          color: "#6b7280",
          textAlign: "center",
        }}
      >
        Try a different search term or category
      </p>
    </div>
  )
}
