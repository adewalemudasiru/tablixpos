/**
 * NavMenu - Desktop settings navigation button beside the logo.
 * Takes the user directly to the Settings page.
 * Hidden on mobile.
 * Hidden entirely for Cashier/Chef (no settings access).
 */

import { useNavigate, useLocation } from "react-router"
import { useAppStore, usePermissions } from "../store/AppContext"
import { IconSettings } from "@tabler/icons-react"

const ACTIVE_BG = "#fff1f2"
const ACTIVE_COLOR = "#e91835"

export function NavMenu() {
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, activeStaff, setActiveStaff } = useAppStore()
  const permissions = usePermissions()
  const isDark = theme === "dark"

  if (activeStaff && !permissions.includes("manage_settings")) return null

  const isActive = location.pathname === "/settings"
  const iconColor = isActive ? ACTIVE_COLOR : isDark ? "#e5e7eb" : "#6b7280"
  const hoverBackground = isDark ? "#1f2937" : "#f9fafb"

  return (
    <div className="relative hidden md:block">
      <button
        onClick={() => navigate("/settings")}
        aria-label="Go to settings"
        className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors"
        style={{
          background: isActive ? ACTIVE_BG : "transparent",
          border: isActive ? "1.5px solid #fbd2cf" : "1.5px solid transparent",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            ;(e.currentTarget as HTMLButtonElement).style.background =
              hoverBackground
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            ;(e.currentTarget as HTMLButtonElement).style.background =
              "transparent"
          }
        }}
      >
        <IconSettings
          size={20}
          stroke={isActive ? ACTIVE_COLOR : 1.8}
          color={iconColor}
        />
      </button>
    </div>
  )
}
