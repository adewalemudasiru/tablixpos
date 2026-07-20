import { INTER } from "@/config/constants"
import { useState } from "react"

export function ImpersonationBanner() {
  const [info, setInfo] = useState<{
    id: string
    name: string
    ownerName: string
  } | null>(() => {
    try {
      const r = sessionStorage.getItem("tablix_impersonating")
      return r ? JSON.parse(r) : null
    } catch (_) {
      return null
    }
  })

  if (!info) return null

  const handleExit = () => {
    try {
      sessionStorage.removeItem("tablix_impersonating")
    } catch (_) {}
    setInfo(null)
    window.location.href = "http://localhost:4000"
  }

  return (
    <div
      className="fixed top-0 right-0 left-0 z-[100] flex items-center justify-between gap-4 px-4 py-2"
      style={{ background: "#0a0f1e", height: 44 }}
    >
      <div className="flex items-center gap-2">
        <div
          className="size-1.5 animate-pulse rounded-full"
          style={{ background: "#e91835" }}
        />
        <span
          style={{
            fontFamily: INTER,
            fontSize: 12,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Admin viewing:
        </span>
        <span
          style={{
            fontFamily: INTER,
            fontWeight: 700,
            fontSize: 12,
            color: "white",
          }}
        >
          {info.name}
        </span>
        <span
          style={{
            fontFamily: INTER,
            fontSize: 11,
            color: "rgba(255,255,255,0.4)",
          }}
        >
          ({info.ownerName})
        </span>
      </div>
      <button
        onClick={handleExit}
        className="flex items-center gap-1.5 rounded-lg px-3 py-1 transition-colors"
        style={{
          background: "rgba(233,24,53,0.2)",
          border: "1px solid rgba(233,24,53,0.3)",
          color: "#f87171",
          fontFamily: INTER,
          fontSize: 11,
          fontWeight: 600,
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.background =
            "rgba(233,24,53,0.35)"
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.background =
            "rgba(233,24,53,0.2)"
        }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
        Exit View
      </button>
    </div>
  )
}
