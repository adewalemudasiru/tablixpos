const INTER = "'Inter', sans-serif"

interface ExportButtonProps {
  onClick: () => void
  className?: string
}

export function ExportButton({ onClick, className = "" }: ExportButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-xl bg-[var(--page-surface)] px-3 py-2 transition-colors hover:bg-[var(--page-surface-2)] ${className}`}
      style={{
        border: `1px solid var(--page-border)`,
        cursor: "pointer",
      }}
      title="Export to CSV"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <path
          d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="hidden md:block"
        style={{
          fontFamily: INTER,
          fontSize: 12,
          fontWeight: 500,
          color: "var(--page-text)",
        }}
      >
        Export CSV
      </span>
    </button>
  )
}
