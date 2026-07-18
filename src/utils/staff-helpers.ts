import type { StaffForm } from "@/types/staff-page/staff"
import type { StoreRole } from "../store/AppContext"

export function getRoleBadge(
  roleId: string,
  roles: StoreRole[]
): {
  variant: "primary" | "info" | "success" | "warning" | "neutral"
  name: string
} {
  const role = roles.find((r) => r.id === roleId)
  const name = role ? role.name : roleId
  const lower = name.toLowerCase()
  if (lower.includes("admin") || lower.includes("owner"))
    return { variant: "primary", name }
  if (lower.includes("manager")) return { variant: "info", name }
  if (lower.includes("cashier")) return { variant: "success", name }
  if (lower.includes("waiter")) return { variant: "warning", name }
  return { variant: "neutral", name }
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function generatePin(): string {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export const EMPTY_FORM: StaffForm = {
  name: "",
  email: "",
  role: "",
  pin: "",
  assignedStation: "",
}
