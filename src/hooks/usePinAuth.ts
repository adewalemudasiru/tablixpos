import { useState, useCallback } from "react"
import { useNavigate, useLocation } from "react-router"
import { useAppStore } from "../store/AppContext"
import { authAPI } from "../services/api"
import { addActivityEntry } from "../services/activityLog"

function homeRoute(staff: any): string {
  if (staff.role === "Chef") return "/kds"
  return "/dashboard"
}

interface UsePinAuthOptions {
  isMobile?: boolean
}

export function usePinAuth(options: UsePinAuthOptions = {}) {
  const { staff, setActiveStaff } = useAppStore()
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")
  const [loggingIn, setLoggingIn] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const locationState = location.state as Record<string, string> | null
  const isStaffFlow = locationState?.flow === "staff"
  const isOwnerFlow = locationState?.flow === "owner"
  const stateEmail = locationState?.email ?? null

  const visibleStaff = staff.filter((s: any) => s.role !== "Admin")

  const handleLogin = useCallback(async () => {
    if (pin.length < 6 || loggingIn) return
    setError("")

    // Staff flow
    if (isStaffFlow) {
      const target = visibleStaff.find((s: any) => s.pin === pin)
      if (target) {
        setActiveStaff(target)
        addActivityEntry({
          staffName: target.name,
          role: target.role,
          action: "Logged in",
          category: "Auth",
          timestamp: Date.now(),
          detail: `PIN authentication successful${options.isMobile ? " via mobile" : ""}`,
        })
        navigate(homeRoute(target), { replace: true })
        return
      }
      setError("Incorrect PIN. Please try again.")
      setPin("")
      return
    }

    // Owner flow
    const ownerEmail =
      stateEmail ??
      (() => {
        try {
          return localStorage.getItem("tablix_owner_email")
        } catch (_) {
          return null
        }
      })()

    if (!ownerEmail) {
      setError("No email found. Please log in from the login page.")
      setPin("")
      return
    }

    setLoggingIn(true)
    try {
      const res = await authAPI.login(ownerEmail, pin)
      if (res.data?.accessToken) {
        localStorage.setItem("tablixpos_access_token", res.data.accessToken)
        localStorage.setItem("tablixpos_refresh_token", res.data.refreshToken)
        localStorage.setItem("tablix_owner_email", ownerEmail)
        localStorage.setItem("tablix_owner_pin", pin)

        try {
          const { businessAPI } = await import("../services/api")
          const biz = await businessAPI.getProfile()
          if (biz.data.business.id) {
            localStorage.setItem("tablix_business_id", biz.data.business.id)
          }
        } catch (_) {}
      } else {
        setError("Login failed. Please try again.")
        setPin("")
        setLoggingIn(false)
        return
      }
    } catch (err: any) {
      const msg = err?.data?.message || "Incorrect PIN. Please try again."
      setError(msg)
      setPin("")
      setLoggingIn(false)
      return
    }
    setLoggingIn(false)

    setActiveStaff(null)
    addActivityEntry({
      staffName: "Owner",
      role: "Owner",
      action: "Logged in",
      category: "Auth",
      timestamp: Date.now(),
      detail: `Owner PIN authentication successful${options.isMobile ? " via mobile" : ""}`,
    })
    navigate("/dashboard", { replace: true })
  }, [
    pin,
    loggingIn,
    isStaffFlow,
    stateEmail,
    visibleStaff,
    setActiveStaff,
    navigate,
    options.isMobile,
  ])

  const clearError = () => setError("")
  const handlePinChange = (newPin: string) => {
    setPin(newPin)
    clearError()
  }

  const getTitleAndSubtitle = () => {
    const title = isOwnerFlow
      ? "Welcome"
      : isStaffFlow
        ? "Welcome"
        : "Access PIN"
    const subtitle = isOwnerFlow
      ? "Enter your owner PIN to access the full system"
      : "Enter your 6-digit PIN to continue"
    return { title, subtitle }
  }

  return {
    pin,
    error,
    loggingIn,
    isStaffFlow,
    isOwnerFlow,
    visibleStaff,
    handleLogin,
    handlePinChange,
    getTitleAndSubtitle,
    clearError,
    navigate,
  }
}
