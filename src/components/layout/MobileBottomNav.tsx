import { useState } from "react"
import { useNavigate } from "react-router"
import { AnimatePresence, motion } from "motion/react"
import svgPaths from "../../imports/svg-re625692x"
import { MenuQRModal } from "../MenuQRModal"
import { SupportModal } from "../SupportModal"
import { useAppStore, usePermissions } from "../../store/AppContext"
import type { StoreStaff, Permission } from "../../store/AppContext"
import {
  IconBox,
  IconCash,
  IconChartPie,
  IconCalendarDollar,
  IconDots,
  IconSettings,
  IconToolsKitchen,
  IconUser,
  IconFileInvoice,
} from "@tabler/icons-react"

// --- Constants ---

const INTER = "'Inter', sans-serif"
const ACTIVE_COLOR = "#e91835"
const INACTIVE_COLOR = "#4b5563"

function MobileNavIcon({ id, active }: { id: string; active: boolean }) {
  const color = active ? ACTIVE_COLOR : "currentColor"
  const props = { color, size: 22, stroke: 1.8 }

  switch (id) {
    case "reports":
      return <IconChartPie {...props} />
    case "inventory":
      return <IconBox {...props} />
    case "menu":
    case "kds":
      return <IconToolsKitchen {...props} />
    case "staff":
      return <IconUser {...props} />
    case "expenses":
      return <IconCalendarDollar {...props} />
    case "billing":
      return <IconCash {...props} />
    case "settlements":
      return <IconFileInvoice {...props} />
    case "settings":
    case "account-settings":
      return <IconSettings {...props} />
    default:
      return <IconDots {...props} />
  }
}

// --- Nav config ---

interface NavItemConfig {
  id: string
  label: string
  route: string
}

export const NAV_ITEMS: NavItemConfig[] = [
  {
    id: "reports",
    label: "Reports",
    route: "/reports",
  },
  {
    id: "inventory",
    label: "Inventory",
    route: "/inventory",
  },
  {
    id: "menu",
    label: "Menu",
    route: "/menu",
  },
  {
    id: "staff",
    label: "Staff",
    route: "/staff",
  },
  {
    id: "expenses",
    label: "Expenses",
    route: "/expenses",
  },
  {
    id: "billing",
    label: "Billing & Sub",
    route: "/billing",
  },
  {
    id: "settings",
    label: "Account Settings",
    route: "/account-settings",
  },
  {
    id: "kds",
    label: "Kitchen Display",
    route: "/kds",
  },
  {
    id: "settlements",
    label: "Settlements",
    route: "/settlements",
  },
]

// --- Role-based nav filtering ------------------------------------------------

export function getFilteredNav(
  activeStaff: StoreStaff | null,
  permissions: Permission[],
  tablesEnabled = false,
  kotEnabled = false
): NavItemConfig[] {
  // Remove KDS when feature is toggled off
  let baseItems = NAV_ITEMS
  if (!kotEnabled) baseItems = baseItems.filter((n) => n.id !== "kds")
  if (!activeStaff) return baseItems // owner sees everything (minus disabled features)

  return baseItems.filter((n) => {
    if (n.id === "pos") return permissions.includes("pos_access")
    if (n.id === "reports") return permissions.includes("view_reports")
    if (n.id === "inventory") return permissions.includes("manage_inventory")
    if (n.id === "menu") return permissions.includes("manage_menu")
    if (n.id === "staff") return permissions.includes("manage_staff")
    if (n.id === "expenses") return permissions.includes("view_expenses")
    if (n.id === "billing") return permissions.includes("billing_access")
    if (n.id === "settings") return permissions.includes("manage_settings")
    if (n.id === "kds") return permissions.includes("kds_access")
    // Settlements page: only managers/owners (those with manager_override permission)
    if (n.id === "settlements") return permissions.includes("manager_override")
    return false
  })
}

export function getHomeRoute(
  activeStaff: StoreStaff | null,
  permissions: Permission[]
): string {
  if (!activeStaff) return "/dashboard"
  if (permissions.includes("pos_access")) return "/dashboard"
  if (permissions.includes("kds_access")) return "/kds"
  return "/dashboard"
}

export function MobileBottomNav({
  activeId,
  onLogout,
}: {
  activeId: string
  onLogout: () => void
}) {
  const navigate = useNavigate()
  const [moreOpen, setMoreOpen] = useState(false)
  const [qrOpen, setQrOpen] = useState(false)
  const [supportOpen, setSupportOpen] = useState(false)
  const {
    activeStaff,
    setActiveStaff,
    tablesEnabled,
    kotEnabled,
    plan,
    theme,
  } = useAppStore()
  const permissions = usePermissions()
  const isDark = theme === "dark"

  const visibleItems = getFilteredNav(
    activeStaff,
    permissions,
    tablesEnabled,
    kotEnabled
  )
  // Use up to 4 items as bottom tabs; show "More" only if there are extras
  const tabItems = visibleItems.slice(0, 4)
  const hasMore = visibleItems.length > 4
  const isMoreActive = hasMore && !tabItems.some((n) => n.id === activeId)

  const handleNav = (route: string) => {
    if (route !== "#") navigate(route)
    setMoreOpen(false)
  }

  const handleLogout = () => {
    setMoreOpen(false)
    if (activeStaff) {
      setActiveStaff(null)
      navigate("/enter-pin", { state: { flow: "staff" } })
    } else {
      onLogout()
    }
  }

  return (
    <>
      {/* Fixed bottom tab bar */}
      <div
        className={`fixed right-0 bottom-0 left-0 z-40 flex items-stretch md:hidden ${isDark ? "bg-[#1c1c1e]" : "bg-white"}`}
        style={{
          borderTop: `1px solid ${isDark ? "#3c3c3e" : "#e5e7eb"}`,
          height: 64,
          paddingBottom: "env(safe-area-inset-bottom)",
          boxShadow: isDark ? "none" : "0 -2px 12px 0 rgba(0,0,0,0.06)",
        }}
      >
        {tabItems.map((item) => {
          const isActive = item.id === activeId
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.route)}
              className={`flex flex-1 flex-col items-center justify-center gap-[3px] transition-colors ${isDark ? "active:bg-zinc-800" : "active:bg-gray-50"}`}
            >
              <span className="flex size-[22px] items-center justify-center">
                <MobileNavIcon id={item.id} active={isActive} />
              </span>
              <span
                style={{
                  fontFamily: INTER,
                  fontSize: 10,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive
                    ? ACTIVE_COLOR
                    : isDark
                      ? "#8e8e93"
                      : INACTIVE_COLOR,
                  lineHeight: "12px",
                }}
              >
                {item.label}
              </span>
            </button>
          )
        })}

        {/* More tab (only when more items exist) */}
        {hasMore && (
          <button
            onClick={() => setMoreOpen(true)}
            className={`flex flex-1 flex-col items-center justify-center gap-[3px] transition-colors ${isDark ? "active:bg-zinc-800" : "active:bg-gray-50"}`}
          >
            <span className="flex size-[22px] items-center justify-center">
              <IconDots
                size={22}
                stroke={1.8}
                color={
                  isMoreActive
                    ? ACTIVE_COLOR
                    : isDark
                      ? "#8e8e93"
                      : INACTIVE_COLOR
                }
              />
            </span>
            <span
              style={{
                fontFamily: INTER,
                fontSize: 10,
                fontWeight: isMoreActive ? 600 : 400,
                color: isMoreActive
                  ? ACTIVE_COLOR
                  : isDark
                    ? "#8e8e93"
                    : INACTIVE_COLOR,
                lineHeight: "12px",
              }}
            >
              More
            </span>
          </button>
        )}

        {/* Logout tab when only a few items (staff with 1-4 items) */}
        {!hasMore && activeStaff && (
          <button
            onClick={handleLogout}
            className={`flex flex-1 flex-col items-center justify-center gap-[3px] transition-colors ${isDark ? "active:bg-zinc-800" : "active:bg-gray-50"}`}
          >
            <span className="flex size-[22px] items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
                  stroke={isDark ? "#8e8e93" : INACTIVE_COLOR}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span
              style={{
                fontFamily: INTER,
                fontSize: 10,
                fontWeight: 400,
                color: isDark ? "#8e8e93" : INACTIVE_COLOR,
                lineHeight: "12px",
              }}
            >
              Switch
            </span>
          </button>
        )}
      </div>

      {/* More bottom sheet */}
      <AnimatePresence>
        {moreOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[48] bg-black/40 md:hidden"
              style={{ backdropFilter: "blur(2px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMoreOpen(false)}
            />

            {/* Sheet */}
            <motion.div
              className={`fixed right-0 bottom-0 left-0 z-[49] md:hidden ${isDark ? "bg-[#1c1c1e]" : "bg-white"}`}
              style={{
                borderRadius: "24px 24px 0 0",
                paddingBottom: "env(safe-area-inset-bottom)",
                maxHeight: "85vh",
                overflowY: "auto",
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
            >
              {/* Handle bar */}
              <div className="flex justify-center pt-3 pb-1">
                <div
                  className={`h-1 w-10 rounded-full ${isDark ? "bg-zinc-700" : "bg-gray-300"}`}
                />
              </div>

              {/* Sheet header */}
              <div className="flex items-center justify-between px-5 py-3">
                <div>
                  <p
                    style={{
                      fontFamily: INTER,
                      fontWeight: 700,
                      fontSize: 17,
                      color: isDark ? "white" : "#111827",
                    }}
                  >
                    Menu
                  </p>
                  <p
                    style={{
                      fontFamily: INTER,
                      fontSize: 12,
                      color: isDark ? "#8e8e93" : "#6b7280",
                      marginTop: 1,
                    }}
                  >
                    Navigate to any page
                  </p>
                </div>
                <button
                  onClick={() => setMoreOpen(false)}
                  className={`flex size-8 items-center justify-center rounded-full transition-colors ${isDark ? "bg-zinc-800 text-[#8e8e93] active:bg-zinc-700" : "bg-gray-100 text-[#6b7280] active:bg-gray-200"}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Nav grid - 3 columns */}
              <div className="grid grid-cols-3 gap-3 px-4 pt-1 pb-4">
                {visibleItems.map((item) => {
                  const isActive = item.id === activeId
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.route)}
                      className="flex flex-col items-center gap-2 rounded-2xl px-2 py-4 transition-colors active:scale-95"
                      style={{
                        background: isActive
                          ? isDark
                            ? "rgba(233,24,53,0.15)"
                            : "#fff1f2"
                          : isDark
                            ? "#2c2c2e"
                            : "#f9fafb",
                        border: isActive
                          ? isDark
                            ? "1.5px solid rgba(233,24,53,0.3)"
                            : "1.5px solid #fecdd3"
                          : "1.5px solid transparent",
                        transform: "scale(1)",
                        transition: "transform 0.1s, background 0.15s",
                      }}
                    >
                      <span className="flex size-7 items-center justify-center">
                        <MobileNavIcon id={item.id} active={isActive} />
                      </span>
                      <span
                        style={{
                          fontFamily: INTER,
                          fontSize: 11,
                          fontWeight: isActive ? 600 : 500,
                          color: isActive
                            ? ACTIVE_COLOR
                            : isDark
                              ? "#d1d1d6"
                              : "#374151",
                          textAlign: "center",
                          lineHeight: "14px",
                        }}
                      >
                        {item.label}
                      </span>
                      {isActive && (
                        <span
                          className="h-1 w-1 rounded-full"
                          style={{ background: ACTIVE_COLOR }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Divider */}
              <div
                className={`mx-4 border-t ${isDark ? "border-zinc-800" : "border-gray-100"}`}
              />

              {/* Print QR Code action button */}
              {!activeStaff && (
                <div className="px-4 pt-3 pb-1">
                  <button
                    onClick={() => {
                      setMoreOpen(false)
                      setQrOpen(true)
                    }}
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 transition-colors active:opacity-80"
                    style={{
                      background: isDark ? "rgba(233,24,53,0.1)" : "#fff1f2",
                      border: `1.5px solid ${isDark ? "rgba(233,24,53,0.3)" : "#fecdd3"}`,
                      cursor: "pointer",
                    }}
                  >
                    <span
                      className="flex shrink-0 items-center justify-center rounded-xl"
                      style={{
                        width: 36,
                        height: 36,
                        background: isDark ? "#2c2c2e" : "white",
                        border: `1px solid ${isDark ? "#3c3c3e" : "#fbd2cf"}`,
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="7"
                          height="7"
                          rx="1"
                          stroke="#e91835"
                          strokeWidth="1.8"
                        />
                        <rect
                          x="14"
                          y="3"
                          width="7"
                          height="7"
                          rx="1"
                          stroke="#e91835"
                          strokeWidth="1.8"
                        />
                        <rect
                          x="3"
                          y="14"
                          width="7"
                          height="7"
                          rx="1"
                          stroke="#e91835"
                          strokeWidth="1.8"
                        />
                        <rect x="5" y="5" width="3" height="3" fill="#e91835" />
                        <rect
                          x="16"
                          y="5"
                          width="3"
                          height="3"
                          fill="#e91835"
                        />
                        <rect
                          x="5"
                          y="16"
                          width="3"
                          height="3"
                          fill="#e91835"
                        />
                        <path
                          d="M14 14h2v2h-2zM18 14h3M18 18h3M14 18v3M18 16h2v2"
                          stroke="#e91835"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div className="flex flex-col items-start">
                      <span
                        style={{
                          fontFamily: INTER,
                          fontWeight: 600,
                          fontSize: 13,
                          color: ACTIVE_COLOR,
                          lineHeight: "17px",
                        }}
                      >
                        Print Menu QR Code
                      </span>
                      <span
                        style={{
                          fontFamily: INTER,
                          fontSize: 11,
                          color: isDark ? "#a1a1aa" : "#9b3c4e",
                          lineHeight: "15px",
                        }}
                      >
                        Let customers scan to view your menu
                      </span>
                    </div>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="ml-auto shrink-0"
                    >
                      <path
                        d="M9 18l6-6-6-6"
                        stroke={ACTIVE_COLOR}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              )}

              {/* Actions row */}
              <div className="flex gap-3 px-4 py-4">
                <button
                  onClick={handleLogout}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl py-3 transition-colors active:opacity-80"
                  style={{
                    background: isDark ? "rgba(233,24,53,0.1)" : "#fff1f2",
                    border: `1.5px solid ${isDark ? "rgba(233,24,53,0.3)" : "#fecdd3"}`,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
                      stroke={ACTIVE_COLOR}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    style={{
                      fontFamily: INTER,
                      fontWeight: 600,
                      fontSize: 13,
                      color: ACTIVE_COLOR,
                    }}
                  >
                    {activeStaff ? "Switch User" : "Logout"}
                  </span>
                </button>
                {!activeStaff && (
                  <button
                    onClick={() => {
                      setMoreOpen(false)
                      setSupportOpen(true)
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl py-3 transition-colors active:opacity-80"
                    style={{
                      background: isDark ? "#2c2c2e" : "#f9fafb",
                      border: `1px solid ${isDark ? "#3c3c3e" : "#e5e7eb"}`,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                      <path
                        d={svgPaths.p12513380}
                        stroke={isDark ? "white" : "#111827"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M5.83333 6.66667H14.1667"
                        stroke={isDark ? "white" : "#111827"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M5.83333 10.8333H10.8333"
                        stroke={isDark ? "white" : "#111827"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <span
                      style={{
                        fontFamily: INTER,
                        fontWeight: 500,
                        fontSize: 13,
                        color: isDark ? "white" : "#111827",
                      }}
                    >
                      Need Help?
                    </span>
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* QR Code Modal (rendered outside sheet for correct z-index) */}
      <MenuQRModal isOpen={qrOpen} onClose={() => setQrOpen(false)} />
      <SupportModal
        isOpen={supportOpen}
        onClose={() => setSupportOpen(false)}
      />
    </>
  )
}
