import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { INTER } from "../config/constants"

interface Notification {
  id: string
  title: string
  body: string
  type: string
  sentAt: string
}

const TYPE_COLORS: Record<string, string> = {
  info: "#2563eb",
  success: "#16a34a",
  warning: "#d97706",
  update: "#7c3aed",
}

export function NotificationBell() {
  const [notifs, setNotifs] = useState<Notification[]>(() => {
    try {
      const r = localStorage.getItem("tablix_admin_notifications")
      return r ? JSON.parse(r) : []
    } catch (_) {
      return []
    }
  })
  const [open, setOpen] = useState(false)
  const [readIds, setReadIds] = useState<string[]>(() => {
    try {
      const r = localStorage.getItem("tablix_notif_read_ids")
      return r ? JSON.parse(r) : []
    } catch (_) {
      return []
    }
  })

  const unread = notifs.filter((n) => !readIds.includes(n.id)).length

  const markAllRead = () => {
    const ids = notifs.map((n) => n.id)
    setReadIds(ids)
    try {
      localStorage.setItem("tablix_notif_read_ids", JSON.stringify(ids))
    } catch (_) {}
  }

  if (notifs.length === 0) return null

  return (
    <div className="fixed top-[10px] right-[14px] z-[39]">
      {/* Bell button */}
      <button
        onClick={() => {
          setOpen((v) => !v)
          if (!open && unread > 0) markAllRead()
        }}
        className="relative flex size-9 items-center justify-center rounded-xl transition-colors"
        style={{
          background: open ? "#fff1f2" : "white",
          border: open ? "1.5px solid #fbd2cf" : "1.5px solid #f0f0f0",
          boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
        }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
            stroke={open ? "#e91835" : "#374151"}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {unread > 0 && (
          <span
            className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full"
            style={{ background: "#e91835" }}
          >
            <span
              style={{
                fontFamily: INTER,
                fontSize: 9,
                fontWeight: 700,
                color: "white",
              }}
            >
              {unread > 9 ? "9+" : unread}
            </span>
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-[-1]"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute top-[calc(100%+8px)] right-0 overflow-hidden rounded-2xl bg-white"
              style={{
                width: 320,
                boxShadow: "0 8px 32px -4px rgba(0,0,0,0.15)",
                border: "1px solid #f0f0f0",
                zIndex: 50,
              }}
            >
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: "1px solid #f5f5f5" }}
              >
                <p
                  style={{
                    fontFamily: INTER,
                    fontWeight: 700,
                    fontSize: 13,
                    color: "#111827",
                  }}
                >
                  Notifications
                </p>
                <span
                  style={{
                    fontFamily: INTER,
                    fontSize: 11,
                    color: "#9ca3af",
                  }}
                >
                  {notifs.length} messages
                </span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifs.map((n) => {
                  const color = TYPE_COLORS[n.type] ?? "#374151"
                  return (
                    <div
                      key={n.id}
                      className="px-4 py-3"
                      style={{ borderBottom: "1px solid #f9fafb" }}
                    >
                      <div className="flex items-start gap-2.5">
                        <div
                          className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg"
                          style={{ background: color + "15" }}
                        >
                          <div
                            className="size-1.5 rounded-full"
                            style={{ background: color }}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            style={{
                              fontFamily: INTER,
                              fontWeight: 600,
                              fontSize: 12,
                              color: "#111827",
                            }}
                          >
                            {n.title}
                          </p>
                          <p
                            style={{
                              fontFamily: INTER,
                              fontSize: 11,
                              color: "#6b7280",
                              lineHeight: "16px",
                              marginTop: 2,
                            }}
                            className="line-clamp-2"
                          >
                            {n.body}
                          </p>
                          <p
                            style={{
                              fontFamily: INTER,
                              fontSize: 10,
                              color: "#9ca3af",
                              marginTop: 4,
                            }}
                          >
                            {new Date(n.sentAt).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
