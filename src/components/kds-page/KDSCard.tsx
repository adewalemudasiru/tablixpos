import React from "react"
import { motion } from "motion/react"

import { radius } from "../../components/ds/tokens"

import type { KDSOrder, KDSStatus } from "../../store/AppContext"

import { D_DARK } from "@/constants/kdspage"
import {
  elapsedMins,
  NEXT_LABEL,
  NEXT_STATUS,
  STATUS_CFG,
} from "@/utils/kds-helper"

const INTER = "'Inter', sans-serif"

const KDSThemeContext = React.createContext(D_DARK)

export const KDSCard = React.forwardRef<
  HTMLDivElement,
  {
    order: KDSOrder
    onUpdateStatus: (id: string, status: KDSStatus) => void
  }
>(function KDSCard({ order, onUpdateStatus }, ref) {
  const D = React.useContext(KDSThemeContext)
  const elapsed = elapsedMins(order.placedAt)
  const isUrgent =
    elapsed >= 15 && order.status !== "Ready" && order.status !== "Served"
  const cfg = STATUS_CFG[order.status]

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.97, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: -8 }}
      transition={{ type: "spring", damping: 28, stiffness: 340 }}
      className="flex flex-col overflow-hidden"
      style={{
        borderRadius: radius.xl,
        background: D.surface,
        border: `1px solid ${isUrgent ? "#e91835" : D.border}`,
        boxShadow: isUrgent
          ? "0 0 0 2px rgba(233,24,53,0.2), 0 4px 16px rgba(0,0,0,0.4)"
          : "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      {/* Coloured accent bar */}
      <div
        style={{
          height: 4,
          background: cfg.dotColor,
          borderRadius: `${radius.xl} ${radius.xl} 0 0`,
        }}
      />

      {/* Header */}
      <div
        className="flex items-center justify-between px-3.5 py-2.5"
        style={{ borderBottom: `1px solid ${D.border}` }}
      >
        <div className="flex items-center gap-2">
          <span
            style={{
              fontFamily: INTER,
              fontWeight: 700,
              fontSize: 13,
              color: D.text,
            }}
          >
            {order.orderNo}
          </span>
          <span
            style={{
              fontFamily: INTER,
              fontSize: 10,
              fontWeight: 600,
              background: cfg.pillBg,
              color: cfg.pillText,
              borderRadius: 999,
              padding: "2px 8px",
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
                padding: "2px 8px",
              }}
            >
              🔥 Urgent
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke={D.textMuted}
              strokeWidth="2"
            />
            <polyline
              points="12 6 12 12 16 14"
              stroke={D.textMuted}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span
            style={{
              fontFamily: INTER,
              fontSize: 11,
              fontWeight: 500,
              color: isUrgent ? "#ff453a" : D.textMuted,
            }}
          >
            {elapsed}m
          </span>
        </div>
      </div>

      {/* Table & Owner Banner */}
      <div
        className="flex flex-wrap items-center gap-2 px-3.5 py-2"
        style={{
          borderBottom: `1px solid ${D.border}`,
          background: D.surface2,
        }}
      >
        {/* Table Badge */}
        <div
          className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold"
          style={{
            background:
              order.tableNo && order.tableNo !== "—"
                ? "rgba(10, 132, 255, 0.15)"
                : "rgba(142, 142, 147, 0.12)",
            color:
              order.tableNo && order.tableNo !== "—" ? D.blue : D.textMuted,
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M3 3h18v4H3zM4 7h16v11a2 2 0 01-2 2H6a2 2 0 01-2-2zM10 11h4M10 15h4" />
          </svg>
          <span>
            {order.tableNo && order.tableNo !== "—"
              ? `Table ${order.tableNo}`
              : "Direct POS"}
          </span>
        </div>

        {/* Customer Owner Badge */}
        <div
          className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold"
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
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
          </svg>
          <span className="max-w-[120px] truncate">
            {order.customer || "Walk-in"}
          </span>
        </div>
      </div>

      {/* Station */}
      <div
        className="flex items-center gap-2 px-3.5 py-1.5"
        style={{ borderBottom: `1px solid ${D.border}` }}
      >
        <span style={{ fontFamily: INTER, fontSize: 10, color: D.textMuted }}>
          📍 {order.station}
        </span>
      </div>

      {/* Items */}
      <div className="flex flex-1 flex-col px-3.5 py-2.5">
        {order.items.map((item, idx) => (
          <div
            key={item.id}
            className="flex items-center gap-2 py-1.5"
            style={{
              borderBottom:
                idx < order.items.length - 1 ? `1px solid ${D.border}` : "none",
            }}
          >
            <span
              style={{
                fontFamily: INTER,
                fontWeight: 700,
                fontSize: 12,
                color: D.text,
                minWidth: 24,
                background: D.surface3,
                borderRadius: 6,
                padding: "1px 5px",
                textAlign: "center",
              }}
            >
              ×{item.qty}
            </span>
            <span
              style={{
                fontFamily: INTER,
                fontSize: 12,
                color: D.textSub,
                flex: 1,
              }}
            >
              {item.name}
            </span>
            {item.notes && (
              <span
                style={{
                  fontFamily: INTER,
                  fontSize: 10,
                  color: D.amber,
                  fontStyle: "italic",
                }}
              >
                ⚠
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Action */}
      <div
        className="px-3.5 pt-2 pb-3.5"
        style={{ borderTop: `1px solid ${D.border}` }}
      >
        {order.status !== "Served" && NEXT_STATUS[order.status] ? (
          <button
            onClick={() => onUpdateStatus(order.id, NEXT_STATUS[order.status]!)}
            className="w-full rounded-xl py-2.5 transition-all active:scale-95"
            style={{
              fontFamily: INTER,
              fontWeight: 700,
              fontSize: 13,
              background: cfg.btnBg,
              color: cfg.btnText,
              border: "none",
              cursor: "pointer",
              boxShadow: `0 0 12px ${cfg.dotColor}40`,
            }}
          >
            {NEXT_LABEL[order.status]}
          </button>
        ) : (
          <div
            className="flex items-center justify-center gap-1.5 rounded-xl py-2.5"
            style={{
              background: "rgba(48,209,88,0.12)",
              border: "1px solid rgba(48,209,88,0.25)",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17l-5-5"
                stroke={D.green}
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                fontFamily: INTER,
                fontWeight: 700,
                fontSize: 12,
                color: D.green,
              }}
            >
              Served
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
})

KDSCard.displayName = "KDSCard"
