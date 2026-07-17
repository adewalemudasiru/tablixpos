import React, { useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "motion/react"
import type { KDSOrder, KDSStatus } from "../../store/AppContext"
import {
  elapsedMins,
  formatClock,
  NEXT_LABEL,
  NEXT_STATUS,
  STATUS_CFG,
} from "@/utils/kds-helper"
import { D_DARK } from "@/constants/kdspage"

const INTER = "'Inter', sans-serif"

const KDSThemeContext = React.createContext(D_DARK)

export function OrderBottomSheet({
  order,
  onClose,
  onUpdateStatus,
}: {
  order: KDSOrder | null
  onClose: () => void
  onUpdateStatus: (id: string, s: KDSStatus) => void
}) {
  const D = React.useContext(KDSThemeContext)
  useEffect(() => {
    if (order) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [order])

  useEffect(() => {
    if (!order) return
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [order, onClose])

  return createPortal(
    <AnimatePresence>
      {order && (
        <>
          <motion.div
            key="kds-backdrop"
            className="fixed inset-0 z-[9998] bg-black/60"
            style={{ backdropFilter: "blur(3px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          />

          <motion.div
            key="kds-sheet"
            className="fixed right-0 bottom-0 left-0 z-[9999] flex flex-col"
            style={{
              background: D.surface,
              borderRadius: "20px 20px 0 0",
              maxHeight: "82vh",
              boxShadow: "0 -8px 40px rgba(0,0,0,0.5)",
              border: `1px solid ${D.border}`,
              borderBottom: "none",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 340 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="flex shrink-0 justify-center pt-3 pb-1">
              <div
                className="h-1 w-10 rounded-full"
                style={{ background: D.surface3 }}
              />
            </div>

            {/* Sheet header */}
            <div
              className="flex shrink-0 items-center justify-between px-5 py-3"
              style={{ borderBottom: `1px solid ${D.border}` }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  style={{
                    fontFamily: INTER,
                    fontWeight: 700,
                    fontSize: 15,
                    color: D.text,
                  }}
                >
                  {order.orderNo}
                </span>
                {/* Coloured status dot */}
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: STATUS_CFG[order.status].dotColor,
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: INTER,
                    fontSize: 11,
                    fontWeight: 600,
                    background: STATUS_CFG[order.status].pillBg,
                    color: STATUS_CFG[order.status].pillText,
                    borderRadius: 999,
                    padding: "3px 10px",
                  }}
                >
                  {STATUS_CFG[order.status].label}
                </span>
                {elapsedMins(order.placedAt) >= 15 &&
                  order.status !== "Ready" &&
                  order.status !== "Served" && (
                    <span
                      style={{
                        fontFamily: INTER,
                        fontSize: 11,
                        fontWeight: 700,
                        background: "rgba(233,24,53,0.18)",
                        color: "#ff453a",
                        borderRadius: 999,
                        padding: "3px 8px",
                      }}
                    >
                      🔥 Urgent
                    </span>
                  )}
              </div>
              <button
                onClick={onClose}
                className="flex size-8 items-center justify-center rounded-full transition-colors"
                style={{ background: D.surface3 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke={D.textMuted}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Meta row */}
            <div
              className="flex shrink-0 items-center gap-3 px-5 py-3"
              style={{ borderBottom: `1px solid ${D.border}` }}
            >
              <div className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
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
                    fontSize: 12,
                    color: D.textMuted,
                  }}
                >
                  {formatClock(order.placedAt)} &bull;{" "}
                  {elapsedMins(order.placedAt)}m ago
                </span>
              </div>
              <span style={{ color: D.border }}>|</span>
              <span
                style={{ fontFamily: INTER, fontSize: 12, color: D.textMuted }}
              >
                {order.station}
              </span>
              {order.tableNo && order.tableNo !== "—" && (
                <>
                  <span style={{ color: D.border }}>|</span>
                  <span
                    style={{ fontFamily: INTER, fontSize: 12, color: D.blue }}
                  >
                    Table {order.tableNo}
                  </span>
                </>
              )}
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-3">
              <p
                style={{
                  fontFamily: INTER,
                  fontSize: 11,
                  fontWeight: 600,
                  color: D.textMuted,
                  marginBottom: 8,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Items ({order.items.length})
              </p>
              <div className="flex flex-col gap-0">
                {order.items.map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 py-3"
                    style={{
                      borderBottom:
                        idx < order.items.length - 1
                          ? `1px solid ${D.border}`
                          : "none",
                    }}
                  >
                    <div
                      className="flex size-7 shrink-0 items-center justify-center rounded-full"
                      style={{ background: D.surface3 }}
                    >
                      <span
                        style={{
                          fontFamily: INTER,
                          fontWeight: 700,
                          fontSize: 11,
                          color: D.text,
                        }}
                      >
                        {item.qty}
                      </span>
                    </div>
                    <div className="flex-1">
                      <span
                        style={{
                          fontFamily: INTER,
                          fontSize: 13,
                          fontWeight: 500,
                          color: D.text,
                        }}
                      >
                        {item.name}
                      </span>
                      {item.notes && (
                        <p
                          style={{
                            fontFamily: INTER,
                            fontSize: 11,
                            color: D.amber,
                            fontStyle: "italic",
                            marginTop: 1,
                          }}
                        >
                          ⚠ {item.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action button */}
            <div
              className="shrink-0 px-5 pt-3 pb-8"
              style={{ borderTop: `1px solid ${D.border}` }}
            >
              {order.status !== "Served" && NEXT_STATUS[order.status] ? (
                <button
                  onClick={() => {
                    onUpdateStatus(order.id, NEXT_STATUS[order.status]!)
                    onClose()
                  }}
                  className="w-full rounded-2xl py-4 transition-all active:scale-98"
                  style={{
                    fontFamily: INTER,
                    fontWeight: 700,
                    fontSize: 15,
                    background: STATUS_CFG[order.status].btnBg,
                    color: STATUS_CFG[order.status].btnText,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {NEXT_LABEL[order.status]}
                </button>
              ) : (
                <div
                  className="flex w-full items-center justify-center gap-2 rounded-2xl py-4"
                  style={{
                    background: "rgba(48,209,88,0.12)",
                    border: `1px solid rgba(48,209,88,0.25)`,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke={D.green}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span
                    style={{
                      fontFamily: INTER,
                      fontWeight: 700,
                      fontSize: 15,
                      color: D.green,
                    }}
                  >
                    Order Served
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
