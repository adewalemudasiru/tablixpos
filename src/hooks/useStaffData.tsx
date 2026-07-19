import { useState, useMemo, useEffect, useCallback } from "react"
import { useAppStore } from "../store/AppContext"
import { staffAPI } from "../services/api"
import { addActivityEntry } from "../services/activityLog"
import { toast } from "sonner"
import type { Staff, StaffForm } from "@/types/staff-page/staff"

const PAGE_SIZE = 10

export function useStaffData() {
  const { roles, kotEnabled } = useAppStore()
  const [staff, setStaff] = useState<Staff[]>([])
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("")
  const [page, setPage] = useState(1)

  const loadStaff = useCallback(async () => {
    try {
      setLoading(true)
      const res = await staffAPI.list()
      setStaff(res.data.staff)
      setApiError(null)
    } catch (err: any) {
      if (err?.status === 401) {
        setApiError("Session expired. Please logout and log in again.")
      } else {
        setApiError("Could not load staff. Please refresh.")
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadStaff()
  }, [loadStaff])

  const filtered = useMemo(
    () =>
      staff.filter((s) => {
        const matchSearch =
          (s.name || "").toLowerCase().includes((search || "").toLowerCase()) ||
          (s.email || "")
            .toLowerCase()
            .includes((search || "").toLowerCase()) ||
          (s.role || "").toLowerCase().includes((search || "").toLowerCase())
        const matchRole = roleFilter ? s.role === roleFilter : true
        return matchSearch && matchRole
      }),
    [staff, search, roleFilter]
  )

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSave = async (form: StaffForm, editStaff: Staff | null) => {
    try {
      if (editStaff) {
        const payload: Record<string, string> = {
          name: form.name,
          email: form.email,
          role: form.role,
        }
        if (form.pin) payload.pin = form.pin
        if (form.assignedStation) payload.assignedStation = form.assignedStation
        await staffAPI.update(editStaff.id, payload)
        toast.success("Staff member updated")
        addActivityEntry({
          staffName: "Owner",
          role: "Owner",
          action: "Updated staff member",
          category: "System",
          timestamp: Date.now(),
          detail: `${form.name} (${form.role}) details updated`,
        })
      } else {
        await staffAPI.create({
          name: form.name,
          email: form.email,
          role: form.role,
          pin: form.pin,
          assignedStation: form.assignedStation || undefined,
        })
        toast.success("Staff member added")
        addActivityEntry({
          staffName: "Owner",
          role: "Owner",
          action: "Added staff member",
          category: "System",
          timestamp: Date.now(),
          detail: `New ${form.role}: ${form.name}`,
        })
      }
      await loadStaff()
      return true
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Failed to save staff member.")
      setApiError(
        e?.data?.message ?? "Failed to save staff member. Please try again."
      )
      return false
    }
  }

  const handleDelete = async (deleteStaff: Staff) => {
    try {
      await staffAPI.remove(deleteStaff.id)
      toast.success("Staff member removed")
      addActivityEntry({
        staffName: "Owner",
        role: "Owner",
        action: "Removed staff member",
        category: "System",
        timestamp: Date.now(),
        detail: `${deleteStaff.name} (${deleteStaff.role}) was removed`,
      })
      await loadStaff()
      return true
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Failed to delete staff member.")
      setApiError(
        e?.data?.message ?? "Failed to delete staff member. Please try again."
      )
      return false
    }
  }

  const handleResetPin = async (resetStaff: Staff, newPin: string) => {
    try {
      await staffAPI.update(resetStaff.id, { pin: newPin })
      toast.success("PIN reset successfully")
      addActivityEntry({
        staffName: "Owner",
        role: "Owner",
        action: "Reset staff PIN",
        category: "Auth",
        timestamp: Date.now(),
        detail: `${resetStaff.name}'s PIN was reset`,
      })
      await loadStaff()
      return true
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Failed to reset PIN.")
      setApiError(e?.data?.message ?? "Failed to reset PIN. Please try again.")
      return false
    }
  }

  return {
    staff,
    loading,
    apiError,
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    page,
    setPage,
    filtered,
    paginated,
    PAGE_SIZE,
    loadStaff,
    handleSave,
    handleDelete,
    handleResetPin,
    roles,
    kotEnabled,
  }
}
