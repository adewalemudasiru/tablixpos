import React from "react"
import { Navigate, useLocation } from "react-router"
import { useAppStore, usePermissions, DEFAULT_ROLES } from "../store/AppContext"
import { getHomeRoute } from "../components/AppSidebar"
import { PUBLIC_ROUTES } from "../config/constants"

interface RouteGuardProps {
  children: React.ReactNode
}

export function RouteGuard({ children }: RouteGuardProps) {
  const { activeStaff, roles } = useAppStore()
  const permissions = usePermissions()
  const location = useLocation()

  if (!activeStaff) return <>{children}</>

  // If the user's role is locked (like Admin), they have full access.
  const role =
    roles.find((r) => r.id === activeStaff.role) ||
    DEFAULT_ROLES.find((r) => r.id === activeStaff.role)
  if (role?.isLocked && role?.name.includes("Admin")) return <>{children}</>

  // Always allow public / auth routes
  if (PUBLIC_ROUTES.includes(location.pathname)) return <>{children}</>

  let allowed: string[] = []
  if (permissions.includes("pos_access"))
    allowed.push("/dashboard", "/orders", "/customers", "/tables")
  if (permissions.includes("kds_access")) allowed.push("/kds")
  if (permissions.includes("manage_staff")) allowed.push("/staff")
  if (permissions.includes("manage_menu")) allowed.push("/menu")
  if (permissions.includes("view_reports")) allowed.push("/reports")
  if (permissions.includes("view_expenses")) allowed.push("/expenses")
  if (permissions.includes("manage_inventory")) allowed.push("/inventory")
  if (permissions.includes("manage_settings")) allowed.push("/settings")
  if (permissions.includes("manage_tables")) allowed.push("/tables")
  if (permissions.includes("billing_access")) allowed.push("/billing")

  if (!allowed.includes(location.pathname)) {
    return <Navigate to={getHomeRoute(activeStaff, permissions)} replace />
  }

  return <>{children}</>
}
