/**
 * AppSidebar - shared navigation sidebar (desktop) + mobile bottom nav.
 *
 * Desktop (md+): classic left sidebar with logo, nav links, logout card.
 * Mobile (<md):  fixed bottom tab bar with 4 primary tabs + "More" sheet
 *                that slides up to reveal all pages + logout.
 */

import { useState, type ReactNode } from "react"
import { useNavigate } from "react-router"
import { AnimatePresence, motion } from "motion/react"
import svgPaths from "../imports/svg-re625692x"
import { MenuQRModal } from "./MenuQRModal"
import { SupportModal } from "./SupportModal"
import logoWhite from "../assets/logo-white.png"
import { useAppStore, usePermissions } from "../store/AppContext"
import type { StoreStaff, Permission } from "../store/AppContext"

// --- Constants ---

const INTER = "'Inter', sans-serif"
const ACTIVE_COLOR = "#e91835"
const INACTIVE_COLOR = "#4b5563"

// --- Menu (hamburger) icon ---

export function MenuIcon() {
  return (
    <svg
      className="block size-full"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 30 30"
    >
      <path
        d="M3.75 8.75H26.25"
        stroke="#292D32"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M3.75 15H26.25"
        stroke="#292D32"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M3.75 21.25H26.25"
        stroke="#292D32"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

// --- Nav Icons ---

function IconPOS({ c }: { c: string }) {
  return (
    <svg className="block size-full" fill="none" viewBox="0 0 20 20">
      <g>
        <mask fill="white" id="ap-sc-1">
          <path d={svgPaths.p15340980} />
        </mask>
        <path d={svgPaths.p15340980} fill={c} />
        <path d={svgPaths.p2b5be270} fill={c} mask="url(#ap-sc-1)" />
      </g>
      <g>
        <mask fill="white" id="ap-sc-2">
          <path d={svgPaths.p118ea280} />
        </mask>
        <path d={svgPaths.p118ea280} fill={c} />
        <path d={svgPaths.p3904eb70} fill={c} mask="url(#ap-sc-2)" />
      </g>
      <g>
        <mask fill="white" id="ap-sc-3">
          <path d={svgPaths.p17627600} />
        </mask>
        <path d={svgPaths.p17627600} fill={c} />
        <path d={svgPaths.p872af0} fill={c} mask="url(#ap-sc-3)" />
      </g>
      <g>
        <mask fill="white" id="ap-sc-4">
          <path d={svgPaths.p1dd27980} />
        </mask>
        <path d={svgPaths.p1dd27980} fill={c} />
        <path d={svgPaths.p2506af00} fill={c} mask="url(#ap-sc-4)" />
      </g>
    </svg>
  )
}

function IconReports({ c }: { c: string }) {
  return (
    <svg className="block size-full" fill="none" viewBox="0 0 20 20">
      <path
        d="M15.2667 10C17.4333 10 18.3333 9.16667 17.5333 6.43333C16.9917 4.59167 15.4083 3.00833 13.5667 2.46667C10.8333 1.66667 10 2.56667 10 4.73333V7.13333C10 9.16667 10.8333 10 12.5 10H15.2667Z"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6667 12.25C15.8917 16.1083 12.1917 18.9083 7.98333 18.225C4.825 17.7167 2.28333 15.175 1.76667 12.0167C1.09167 7.825 3.875 4.125 7.71667 3.34167"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconInventory({ c }: { c: string }) {
  return (
    <svg className="block size-full" fill="none" viewBox="0 0 20 20">
      <g>
        <mask fill="white" id="ap-box-1">
          <path d={svgPaths.p11b2fc80} />
        </mask>
        <path d={svgPaths.p11b2fc80} fill={c} />
        <path d={svgPaths.p20f72500} fill={c} mask="url(#ap-box-1)" />
      </g>
      <g>
        <mask fill="white" id="ap-box-2">
          <path d={svgPaths.p31c0c700} />
        </mask>
        <path d={svgPaths.p31c0c700} fill={c} />
        <path d={svgPaths.p2dd20e00} fill={c} mask="url(#ap-box-2)" />
      </g>
      <g>
        <mask fill="white" id="ap-box-3">
          <path d={svgPaths.p86f5700} />
        </mask>
        <path d={svgPaths.p86f5700} fill={c} />
        <path d={svgPaths.p186df600} fill={c} mask="url(#ap-box-3)" />
      </g>
    </svg>
  )
}

function IconMenu({ c }: { c: string }) {
  return (
    <div className="relative size-full overflow-clip">
      <div className="absolute inset-[8.33%_8.33%_53.51%_53.51%]">
        <div className="absolute inset-[-6.55%]">
          <svg
            className="block size-full"
            fill="none"
            viewBox="0 0 8.63131 8.63131"
          >
            <path
              d={svgPaths.p16556680}
              stroke={c}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[13.75%_8.33%_8.33%_8.5%]">
        <div className="absolute inset-[-3.21%_-3.01%]">
          <svg
            className="block size-full"
            fill="none"
            viewBox="0 0 17.6338 16.5833"
          >
            <path
              d={svgPaths.pc326b80}
              stroke={c}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[64.58%_64.58%_9.17%_8.75%]">
        <div className="absolute inset-[-9.52%_-9.37%_-9.52%_-9.38%]">
          <svg
            className="block size-full"
            fill="none"
            viewBox="0 0 6.33333 6.25"
          >
            <path
              d="M0.5 5.75L5.83333 0.5"
              stroke={c}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="absolute top-[20.83%] right-[20.83%] bottom-1/2 left-1/2">
        <div className="absolute inset-[-8.57%]">
          <svg
            className="block size-full"
            fill="none"
            viewBox="0 0 6.83333 6.83333"
          >
            <path
              d="M6.33333 0.5L0.5 6.33333"
              stroke={c}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

function IconStaff({ c }: { c: string }) {
  return (
    <svg className="block size-full" fill="none" viewBox="0 0 20 20">
      <g>
        <mask fill="white" id="ap-og-1">
          <path d={svgPaths.p9e91f80} />
        </mask>
        <path d={svgPaths.p9e91f80} fill={c} />
        <path d={svgPaths.p258fea80} fill={c} mask="url(#ap-og-1)" />
      </g>
      <g>
        <mask fill="white" id="ap-og-2">
          <path d={svgPaths.p14883f00} />
        </mask>
        <path d={svgPaths.p14883f00} fill={c} />
        <path d={svgPaths.p9f7a400} fill={c} mask="url(#ap-og-2)" />
      </g>
    </svg>
  )
}

function IconExpenses({ c }: { c: string }) {
  return (
    <svg className="block size-full" fill="none" viewBox="0 0 20 20">
      <g>
        <mask fill="white" id="ap-dt-1">
          <path d={svgPaths.p3d7b9f80} />
        </mask>
        <path d={svgPaths.p3d7b9f80} fill={c} />
        <path d={svgPaths.p103b7d00} fill={c} mask="url(#ap-dt-1)" />
      </g>
      <g>
        <mask fill="white" id="ap-dt-2">
          <path d={svgPaths.p17c44e00} />
        </mask>
        <path d={svgPaths.p17c44e00} fill={c} />
        <path d={svgPaths.p38c19000} fill={c} mask="url(#ap-dt-2)" />
      </g>
      <g>
        <mask fill="white" id="ap-dt-3">
          <path d={svgPaths.p228a900} />
        </mask>
        <path d={svgPaths.p228a900} fill={c} />
        <path d={svgPaths.p37bc5600} fill={c} mask="url(#ap-dt-3)" />
      </g>
      <g>
        <mask fill="white" id="ap-dt-4">
          <path d={svgPaths.pd0c4240} />
        </mask>
        <path d={svgPaths.pd0c4240} fill={c} />
        <path d={svgPaths.p17321880} fill={c} mask="url(#ap-dt-4)" />
      </g>
    </svg>
  )
}

function IconBilling({ c }: { c: string }) {
  return (
    <svg className="block size-full" fill="none" viewBox="0 0 20 20">
      <g>
        <mask fill="white" id="ap-mo-1">
          <path d={svgPaths.p36c18e00} />
        </mask>
        <path d={svgPaths.p36c18e00} fill={c} />
        <path d={svgPaths.p28e6d900} fill={c} mask="url(#ap-mo-1)" />
      </g>
      <g>
        <mask fill="white" id="ap-mo-2">
          <path d={svgPaths.pcd2d400} />
        </mask>
        <path d={svgPaths.pcd2d400} fill={c} />
        <path d={svgPaths.p68fa300} fill={c} mask="url(#ap-mo-2)" />
      </g>
      <g>
        <mask fill="white" id="ap-mo-3">
          <path d={svgPaths.p37c02580} />
        </mask>
        <path d={svgPaths.p37c02580} fill={c} />
        <path d={svgPaths.p1c1aef00} fill={c} mask="url(#ap-mo-3)" />
      </g>
      <path d={svgPaths.p2e9cdd00} fill={c} />
      <path d={svgPaths.p8788a00} fill={c} />
    </svg>
  )
}

function IconSettings({ c }: { c: string }) {
  return (
    <svg className="block size-full" fill="none" viewBox="0 0 20 20">
      <g>
        <mask fill="white" id="ap-se-1">
          <path d={svgPaths.p26866280} />
        </mask>
        <path d={svgPaths.p26866280} fill={c} />
        <path d={svgPaths.p370217f0} fill={c} mask="url(#ap-se-1)" />
      </g>
      <g>
        <mask fill="white" id="ap-se-2">
          <path d={svgPaths.p872e500} />
        </mask>
        <path d={svgPaths.p872e500} fill={c} />
        <path d={svgPaths.p1589fc80} fill={c} mask="url(#ap-se-2)" />
      </g>
    </svg>
  )
}

function IconKDS({ c }: { c: string }) {
  return (
    <svg className="block size-full" fill="none" viewBox="0 0 20 20">
      <rect
        x="2"
        y="4"
        width="16"
        height="11"
        rx="1.5"
        stroke={c}
        strokeWidth="1.5"
      />
      <path
        d="M6 8h8M6 11h5"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 15v2M13 15v2M5 17h10"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconSettlements({ c }: { c: string }) {
  return (
    <svg className="block size-full" fill="none" viewBox="0 0 20 20">
      <path
        d="M10 2L3.5 5v4.5c0 3.5 2.8 6.8 6.5 7.5 3.7-.7 6.5-4 6.5-7.5V5L10 2z"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 10l2 2 4-4"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// --- Nav config ---

interface NavItemConfig {
  id: string
  label: string
  route: string
  icon: (active: boolean) => ReactNode
}

export const NAV_ITEMS: NavItemConfig[] = [
  {
    id: "pos",
    label: "POS",
    route: "/dashboard",
    icon: (a) => <IconPOS c={a ? "currentColor" : "currentColor"} />,
  },
  {
    id: "reports",
    label: "Reports",
    route: "/reports",
    icon: (a) => <IconReports c={a ? "currentColor" : "currentColor"} />,
  },
  {
    id: "inventory",
    label: "Inventory",
    route: "/inventory",
    icon: (a) => <IconInventory c={a ? "currentColor" : "currentColor"} />,
  },
  {
    id: "menu",
    label: "Menu",
    route: "/menu",
    icon: (a) => <IconMenu c={a ? "currentColor" : "currentColor"} />,
  },
  {
    id: "staff",
    label: "Staff",
    route: "/staff",
    icon: (a) => <IconStaff c={a ? "currentColor" : "currentColor"} />,
  },
  {
    id: "expenses",
    label: "Expenses",
    route: "/expenses",
    icon: (a) => <IconExpenses c={a ? "currentColor" : "currentColor"} />,
  },
  {
    id: "billing",
    label: "Billing & Sub",
    route: "/billing",
    icon: (a) => <IconBilling c={a ? "currentColor" : "currentColor"} />,
  },
  {
    id: "settings",
    label: "Settings",
    route: "/settings",
    icon: (a) => <IconSettings c={a ? "currentColor" : "currentColor"} />,
  },
  {
    id: "kds",
    label: "Kitchen Display",
    route: "/kds",
    icon: (a) => <IconKDS c={a ? "currentColor" : "currentColor"} />,
  },
  {
    id: "settlements",
    label: "Settlements",
    route: "/settlements",
    icon: (a) => <IconSettlements c={a ? "currentColor" : "currentColor"} />,
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

// --- Mobile Bottom Nav ---

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
                {item.icon(isActive)}
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
            onClick={() => handleNav("/settings")}
            className={`flex flex-1 flex-col items-center justify-center gap-[3px] transition-colors ${isDark ? "active:bg-zinc-800" : "active:bg-gray-50"}`}
          >
            <span className="flex size-[22px] items-center justify-center">
              <IconSettings
                c={
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
              Settings
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
                        {item.icon(isActive)}
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

// --- AppSidebar ---

interface AppSidebarProps {
  open: boolean
  onClose: () => void
  onLogout: () => void
  activeId: string
}

export function AppSidebar({
  open,
  onClose,
  onLogout,
  activeId,
}: AppSidebarProps) {
  const navigate = useNavigate()
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
  const [supportOpen, setSupportOpen] = useState(false)
  const visibleItems = getFilteredNav(
    activeStaff,
    permissions,
    tablesEnabled,
    kotEnabled
  )

  const handleNav = (route: string) => {
    if (route !== "#") navigate(route)
    onClose()
  }

  const handleLogout = () => {
    if (activeStaff) {
      setActiveStaff(null)
      navigate("/enter-pin", { state: { flow: "staff" } })
    } else {
      onLogout()
    }
  }

  return (
    <>
      {/* Desktop sidebar */}

      {/* Mobile backdrop (drawer) */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={[
          "fixed top-0 left-0 z-40 h-full",
          isDark
            ? "border-[#3c3c3e] bg-[#1c1c1e]"
            : "border-[#d0d5dd] bg-white",
          "w-[260px] border-r",
          "flex flex-col transition-transform duration-200 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
          "md:static md:h-full md:shrink-0 md:translate-x-0",
        ].join(" ")}
      >
        {/* Space behind the fixed header on mobile */}
        <div className="h-[69px] shrink-0 md:hidden" />

        {/* Staff badge (when staff is logged in) */}
        {activeStaff && (
          <div
            className="mx-4 mt-3 mb-1 flex items-center gap-2.5 rounded-xl px-3 py-2.5"
            style={{
              background: isDark ? "#2c2c2e" : "#f9fafb",
              border: `1px solid ${isDark ? "#3c3c3e" : "#f0f0f0"}`,
            }}
          >
            <div
              className="flex size-8 shrink-0 items-center justify-center rounded-full"
              style={{ background: "#e91835" }}
            >
              <span
                style={{
                  fontFamily: INTER,
                  fontWeight: 700,
                  fontSize: 11,
                  color: "white",
                }}
              >
                {(
                  activeStaff.name.trim().split(" ")[0]?.[0] ?? ""
                ).toUpperCase()}
                {(
                  activeStaff.name.trim().split(" ")[1]?.[0] ?? ""
                ).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p
                style={{
                  fontFamily: INTER,
                  fontWeight: 600,
                  fontSize: 12,
                  color: isDark ? "white" : "#111827",
                }}
                className="truncate"
              >
                {activeStaff.name}
              </p>
              <p
                style={{
                  fontFamily: INTER,
                  fontSize: 11,
                  color: isDark ? "#a1a1aa" : "#6b7280",
                }}
              >
                {activeStaff.role}
              </p>
            </div>
          </div>
        )}

        {/* Nav links */}
        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-4 py-4">
          {visibleItems.map((item) => {
            const isActive = item.id === activeId
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.route)}
                className={[
                  "flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left",
                  "transition-all duration-150",
                  isActive
                    ? isDark
                      ? "bg-[#3c3c3e] font-semibold text-white"
                      : "bg-[#f4f4f6] font-semibold text-[#111827]"
                    : isDark
                      ? "text-[#8e8e93] hover:bg-zinc-800 hover:text-white"
                      : "text-[#4b5563] hover:bg-gray-50 hover:text-[#111827]",
                ].join(" ")}
              >
                <span className="flex size-5 shrink-0 items-center justify-center">
                  {item.icon(isActive)}
                </span>
                <span
                  className="truncate text-[13.5px]"
                  style={{
                    fontFamily: INTER,
                  }}
                >
                  {item.label}
                </span>
                {isActive && (
                  <span
                    className="ml-auto h-5 w-1 shrink-0 rounded-full"
                    style={{ background: isDark ? "white" : "#111827" }}
                  />
                )}
              </button>
            )
          })}
        </nav>

        {/* Bottom card */}
        <div className="shrink-0 p-4">
          <div className="flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-[#e91835] to-[#c41530] p-4">
            <button
              onClick={handleLogout}
              className="w-full rounded-xl bg-white/15 py-2 text-[13px] text-white transition-colors hover:bg-white/25"
              style={{ fontFamily: INTER, fontWeight: 600 }}
            >
              {activeStaff ? "Switch User" : "Logout"}
            </button>
            {!activeStaff && (
              <button
                onClick={() => setSupportOpen(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-2 text-[12px] text-white/80 transition-colors hover:bg-white/20"
                style={{ fontFamily: INTER, fontWeight: 400 }}
              >
                Need Help?
              </button>
            )}
          </div>
        </div>
      </aside>
      <SupportModal
        isOpen={supportOpen}
        onClose={() => setSupportOpen(false)}
      />
    </>
  )
}
