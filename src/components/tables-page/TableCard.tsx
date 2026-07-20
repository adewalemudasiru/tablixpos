import { NGN, STATUS_CFG } from "@/constants/tables-page"
import { elapsed } from "@/utils/tables-helper"
import { font, shadows } from "../ds/tokens"
import { Badge } from "../../components/ds/Badge"
import type { RestaurantTable } from "../../store/AppContext"
import { motion } from "motion/react"

export function TableCard({
  table,
  onSelect,
  dark,
  displayMode,
}: {
  table: RestaurantTable
  onSelect: () => void
  dark?: boolean
  displayMode: "covers" | "total" | "time" | "status"
}) {
  const cfg = STATUS_CFG[table.status]

  const borderColor =
    table.status === "available" ? (dark ? "#3c3c3e" : "#e5e7eb") : cfg.accent

  const bg = dark
    ? table.status === "occupied"
      ? "#1a2536"
      : "#2c2c2e"
    : table.status === "occupied"
      ? "#eff6ff"
      : "#ffffff"

  const textColor = dark ? "#ffffff" : "#111827"

  const renderSeatsRepresentation = () => {
    if (displayMode === "covers") {
      const dotCount = Math.min(table.seats, 12)
      return (
        <div className="mt-1.5 flex max-w-[85%] flex-wrap items-center justify-center gap-1.5 px-3">
          {Array.from({ length: dotCount }).map((_, i) => {
            const isOccupied = table.status !== "available"
            return (
              <span
                key={i}
                className="h-2.5 w-2.5 rounded-full transition-all"
                style={{
                  backgroundColor: isOccupied
                    ? cfg.accent
                    : dark
                      ? "rgba(255, 255, 255, 0.25)"
                      : "#9ca3af",
                }}
              />
            )
          })}
        </div>
      )
    }

    if (displayMode === "total") {
      if (table.orderTotal != null && table.orderTotal > 0) {
        return (
          <p className="mt-1 text-sm font-bold" style={{ color: cfg.accent }}>
            {NGN}
            {table.orderTotal.toLocaleString()}
          </p>
        )
      }
      return <p className="mt-1 text-xs text-gray-500">—</p>
    }

    if (displayMode === "time") {
      if (table.occupiedAt) {
        return (
          <p
            className="mt-1 text-xs font-semibold"
            style={{ color: dark ? "#a1a1aa" : "#4b5563" }}
          >
            {elapsed(table.occupiedAt)}
          </p>
        )
      }
      return <p className="mt-1 text-xs text-gray-500">—</p>
    }

    if (displayMode === "status") {
      return (
        <span className="mt-1">
          <Badge variant={cfg.badgeVariant} dot>
            {cfg.label}
          </Badge>
        </span>
      )
    }

    return null
  }

  const isRound = table.shape === "round"
  const isRect = table.shape === "rectangle"

  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.16 }}
      onClick={onSelect}
      className={`relative flex h-full w-full cursor-pointer flex-col items-center justify-center border-2 p-4 text-center transition-all hover:shadow-lg active:scale-[0.97] ${
        isRound ? "rounded-full" : "rounded-3xl"
      }`}
      style={{
        background: bg,
        borderColor: borderColor,
        boxShadow: shadows.card,
      }}
    >
      {table.status === "occupied" && (
        <div
          className={`absolute flex items-center justify-center shadow-sm ${
            isRound
              ? "top-[12%] right-[12%] size-6 rounded-full"
              : "top-3.5 right-3.5 size-6 rounded-lg"
          }`}
          style={{ background: "#30d158", color: "#ffffff" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      )}

      <p
        style={{
          fontFamily: font.family,
          fontWeight: font.weight.bold,
          fontSize: isRect ? "26px" : "22px",
          color: textColor,
          lineHeight: "1.1",
        }}
      >
        {table.name}
      </p>

      {renderSeatsRepresentation()}
    </motion.button>
  )
}
