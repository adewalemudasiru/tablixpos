import React from "react"
import type { KDSOrder } from "../../store/AppContext"
import { D_DARK } from "@/constants/kdspage"
import { elapsedMins, STATUS_CFG } from "@/utils/kds-helper"

const INTER = "'Inter', sans-serif"

const KDSThemeContext = React.createContext(D_DARK)

export function KDSListRow({
  order,
  onTap,
}: {
  order: KDSOrder
  onTap: () => void
}) {
  const D = React.useContext(KDSThemeContext)
  const elapsed = elapsedMins(order.placedAt)
  const isUrgent =
    elapsed >= 15 && order.status !== "Ready" && order.status !== "Served"
  const cfg = STATUS_CFG[order.status]

  return (
    <button
      onClick={onTap}
      className="flex h-full w-full flex-col text-left transition-colors active:opacity-80"
      style={{
        borderRadius: 14,
        background: D.surface,
        border: `1px solid ${isUrgent ? "#e91835" : D.border}`,
        boxShadow: isUrgent
          ? "0 0 0 2px rgba(233,24,53,0.2)"
          : "0 1px 3px 0 rgba(0,0,0,0.3)",
        cursor: "pointer",
        overflow: "hidden",
        padding: 0,
      }}
    >
      {/* Accent bar */}
      <div style={{ height: 3, background: cfg.dotColor, width: "100%" }} />

      {/* Card top: order + time */}
      <div
        className="flex w-full items-center justify-between px-3 py-2.5"
        style={{ borderBottom: `1px solid ${D.border}` }}
      >
        <span
          style={{
            fontFamily: INTER,
            fontWeight: 700,
            fontSize: 12,
            color: D.text,
          }}
        >
          {order.orderNo}
        </span>
        <span
          style={{
            fontFamily: INTER,
            fontSize: 11,
            fontWeight: isUrgent ? 700 : 400,
            color: isUrgent ? "#ff453a" : D.textMuted,
          }}
        >
          {elapsed}m
        </span>
      </div>

      {/* Table & Owner Banner */}
      <div
        className="flex w-full flex-wrap items-center gap-1.5 px-3 py-1.5"
        style={{
          borderBottom: `1px solid ${D.border}`,
          background: D.surface2,
        }}
      >
        <span
          className="flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold"
          style={{
            background:
              order.tableNo && order.tableNo !== "—"
                ? "rgba(10, 132, 255, 0.15)"
                : "rgba(142, 142, 147, 0.12)",
            color:
              order.tableNo && order.tableNo !== "—" ? D.blue : D.textMuted,
          }}
        >
          Table{" "}
          {order.tableNo && order.tableNo !== "—" ? order.tableNo : "Direct"}
        </span>
        <span
          className="flex max-w-[80px] items-center gap-1 truncate rounded-md px-2 py-0.5 text-[10px] font-bold"
          style={{
            background:
              order.customer && order.customer !== "Walk-in"
                ? "rgba(191, 90, 242, 0.15)"
                : "rgba(142, 142, 147, 0.12)",
            color:
              order.customer && order.customer !== "Walk-in"
                ? D.purple
                : D.textMuted,
          }}
        >
          👤 {order.customer || "Walk-in"}
        </span>
      </div>

      {/* Status pill + station */}
      <div className="flex flex-wrap items-center gap-1.5 px-3 pt-2.5">
        <span
          style={{
            fontFamily: INTER,
            fontSize: 10,
            fontWeight: 600,
            background: cfg.pillBg,
            color: cfg.pillText,
            borderRadius: 999,
            padding: "2px 8px",
            display: "inline-block",
          }}
        >
          {cfg.label}
        </span>
        {isUrgent && (
          <span
            style={{
              fontFamily: INTER,
              fontSize: 10,
              fontWeight: 700,
              background: "rgba(233,24,53,0.18)",
              color: "#ff453a",
              borderRadius: 999,
              padding: "2px 6px",
            }}
          >
            Urgent
          </span>
        )}
      </div>

      {/* Item names */}
      <div className="flex-1 px-3 pt-2 pb-2">
        {order.items.slice(0, 3).map((item) => (
          <p
            key={item.id}
            style={{
              fontFamily: INTER,
              fontSize: 11,
              color: D.textSub,
              lineHeight: "17px",
            }}
            className="truncate"
          >
            ×{item.qty} {item.name}
          </p>
        ))}
        {order.items.length > 3 && (
          <p style={{ fontFamily: INTER, fontSize: 11, color: D.textMuted }}>
            +{order.items.length - 3} more
          </p>
        )}
      </div>

      {/* Station footer */}
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{ borderTop: `1px solid ${D.border}`, background: D.surface2 }}
      >
        <span style={{ fontFamily: INTER, fontSize: 10, color: D.textMuted }}>
          {order.station}
        </span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 18l6-6-6-6"
            stroke={D.surface3}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  )
}
