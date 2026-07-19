import type { Staff, StaffForm } from "@/types/staff-page/staff"
import type { StoreRole } from "../store/AppContext"
import { colors } from "@/components/ds/tokens"
import type { ActivityCategory } from "../services/activityLog"

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

//=====================================================

export function fmtEntryTime(ts: number): string {
  const d = new Date(ts)
  return d.toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}

export function fmtEntryDate(ts: number): string {
  const d = new Date(ts)
  const now = new Date()
  const todayStr = now.toDateString()
  const yesterdayStr = new Date(now.getTime() - 86400000).toDateString()
  if (d.toDateString() === todayStr) return "Today"
  if (d.toDateString() === yesterdayStr) return "Yesterday"
  return d.toLocaleDateString("en-NG", { day: "numeric", month: "short" })
}

//=================================================================

export const CAT_COLORS: Record<
  ActivityCategory,
  { bg: string; text: string; label: string }
> = {
  Sale: { bg: colors.successBg, text: colors.successText, label: "Sale" },
  Auth: { bg: colors.infoBg, text: colors.infoText, label: "Auth" },
  Stock: { bg: colors.warningBg, text: colors.warningText, label: "Stock" },
  System: { bg: colors.neutralBg, text: colors.neutralText, label: "System" },
}

// =======================================================================

export function getStaffStats(
  staff: Staff[],
  roles: any[]
): {
  totalStaff: number
  adminsAndManagers: number
  cashiers: number
  waitersAndChefs: number
} {
  const totalByRole = (roleName: string) => {
    const roleId = roles.find(
      (r) => r.name.toLowerCase() === roleName.toLowerCase()
    )?.id
    if (!roleId) return 0
    return staff.filter((s) => s.role === roleId).length
  }

  return {
    totalStaff: staff.length,
    adminsAndManagers: totalByRole("Admin") + totalByRole("Manager"),
    cashiers: totalByRole("Cashier"),
    waitersAndChefs: totalByRole("Waiter") + totalByRole("Chef"),
  }
}

export function filterStaff(
  staff: Staff[],
  search: string,
  roleFilter: string
): Staff[] {
  return staff.filter((s) => {
    const matchSearch =
      (s.name || "").toLowerCase().includes((search || "").toLowerCase()) ||
      (s.email || "").toLowerCase().includes((search || "").toLowerCase()) ||
      (s.role || "").toLowerCase().includes((search || "").toLowerCase())
    const matchRole = roleFilter ? s.role === roleFilter : true
    return matchSearch && matchRole
  })
}

export function paginateStaff(
  staff: Staff[],
  page: number,
  pageSize: number
): Staff[] {
  return staff.slice((page - 1) * pageSize, page * pageSize)
}
