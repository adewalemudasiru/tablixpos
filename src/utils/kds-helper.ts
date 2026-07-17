import { useEffect, useState } from "react"
import type { KDSStatus } from "../store/AppContext"

export function elapsedMins(iso: string) {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
}

export function formatClock(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

// ── Status config ──────────────────────────────────────────────────────────────

export const STATUS_CFG: Record<
  KDSStatus,
  {
    label: string
    pillBg: string
    pillText: string
    btnBg: string
    btnText: string
    dotColor: string
    borderAccent: string
  }
> = {
  New: {
    label: "New",
    pillBg: "rgba(233,24,53,0.18)",
    pillText: "#ff453a",
    btnBg: "#e91835",
    btnText: "#fff",
    dotColor: "#e91835",
    borderAccent: "#e91835",
  },
  "In Progress": {
    label: "In Progress",
    pillBg: "rgba(255,159,10,0.18)",
    pillText: "#ff9f0a",
    btnBg: "#ff9f0a",
    btnText: "#fff",
    dotColor: "#ff9f0a",
    borderAccent: "#ff9f0a",
  },
  Ready: {
    label: "Ready",
    pillBg: "rgba(48,209,88,0.18)",
    pillText: "#30d158",
    btnBg: "#30d158",
    btnText: "#fff",
    dotColor: "#30d158",
    borderAccent: "#30d158",
  },
  Served: {
    label: "Served",
    pillBg: "rgba(142,142,147,0.18)",
    pillText: "#8e8e93",
    btnBg: "#48484a",
    btnText: "#fff",
    dotColor: "#8e8e93",
    borderAccent: "#3c3c3e",
  },
}

export const NEXT_STATUS: Partial<Record<KDSStatus, KDSStatus>> = {
  New: "In Progress",
  "In Progress": "Ready",
  Ready: "Served",
}
export const NEXT_LABEL: Record<KDSStatus, string> = {
  New: "Start Cooking",
  "In Progress": "Mark Ready",
  Ready: "Mark Served",
  Served: "",
}

// ── Timer hook ─────────────────────────────────────────────────────────────────

export function useTimer() {
  const [, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30000)
    return () => clearInterval(id)
  }, [])
}
