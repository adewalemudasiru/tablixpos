

const INTER = "'Inter', sans-serif"
const RED = "#e91835"

export function TablixLogoFull() {
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex size-9 shrink-0 items-center justify-center rounded-xl"
        style={{ background: RED }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span
        style={{
          fontFamily: INTER,
          fontWeight: 800,
          fontSize: 20,
          color: "var(--c-text-primary)",
          letterSpacing: "-0.5px",
        }}
      >
        tablix
      </span>
    </div>
  )
}
