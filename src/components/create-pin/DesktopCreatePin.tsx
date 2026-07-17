import { useState } from "react"
import { useNavigate, useLocation } from "react-router"
import { AuthLayout } from "../../components/AuthLayout"
import { TablixLogo } from "../../components/TablixLogo"
import { PinPad } from "../../components/PinPad"
import { useAppStore } from "../../store/AppContext"
import { authAPI } from "../../services/api"
import { motion, AnimatePresence } from "motion/react"

const INTER = "'Inter', sans-serif"

export function DesktopCreatePin() {
  const [pin, setPin] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as {
    form?: {
      businessName: string
      email: string
      phone: string
      ownerName?: string
    }
    email?: string
  } | null
  const { resetAppState } = useAppStore()

  const handleSave = async () => {
    if (pin.length < 6) return
    setLoading(true)
    setError("")

    let regData: any = state?.form
    if (!regData) {
      try {
        const raw = sessionStorage.getItem("tablix_temp_reg")
        if (raw) regData = JSON.parse(raw)
      } catch (_) {}
    }
    const email = state?.email || regData?.email || ""

    try {
      await authAPI.setPin(email, pin)

      try {
        localStorage.setItem("tablix_owner_pin", pin)
        localStorage.setItem("tablix_owner_email", email)
      } catch (_) {}

      try {
        const loginRes = await authAPI.login(email, pin)
        if (loginRes.data?.accessToken) {
          localStorage.setItem(
            "tablixpos_access_token",
            loginRes.data.accessToken
          )
          localStorage.setItem(
            "tablixpos_refresh_token",
            loginRes.data.refreshToken
          )
          try {
            const { businessAPI } = await import("../../services/api")
            const biz = await businessAPI.getProfile()
            if (biz.data.business.id) {
              localStorage.setItem("tablix_business_id", biz.data.business.id)
            }
          } catch (_) {}
        }
      } catch (_) {}

      resetAppState({
        name: regData?.businessName,
        email: regData?.email,
        phone: regData?.phone,
      })

      try {
        sessionStorage.removeItem("tablix_temp_reg")
      } catch (_) {}
      navigate("/dashboard")
    } catch (err: any) {
      setError(
        err?.data?.message ||
          err?.message ||
          "Failed to set PIN. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="flex w-full max-w-[440px] flex-col items-center gap-6">
        <div className="mb-2 scale-110 transform">
          <TablixLogo />
        </div>

        <div className="page-card page-border flex w-full flex-col gap-6 rounded-2xl border px-8 py-8 shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_4px_16px_0_rgba(0,0,0,0.04)]">
          <div className="flex w-full flex-col gap-1.5 text-center">
            <p
              style={{
                fontFamily: INTER,
                fontWeight: 800,
                fontSize: 24,
                color: "var(--page-text)",
              }}
            >
              Create Access Pin
            </p>
            <p
              style={{
                fontFamily: INTER,
                fontSize: 13.5,
                color: "var(--page-text-secondary)",
                lineHeight: "22px",
              }}
            >
              Create a PIN for your POS account system
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="w-full">
              <PinPad pin={pin} onPinChange={setPin} maxLength={6} />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2 rounded-xl border border-[var(--c-danger-text)]/20 bg-[var(--c-danger-bg)] p-3"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="shrink-0"
                  >
                    <path
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      stroke="var(--c-danger-text)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p
                    style={{
                      fontFamily: INTER,
                      fontSize: 12,
                      color: "var(--c-danger-text)",
                      fontWeight: 500,
                    }}
                  >
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleSave}
              disabled={loading || pin.length < 6}
              className="mt-2 flex h-11 w-full items-center justify-center rounded-xl bg-[#e91835] font-semibold text-white shadow-sm transition-all hover:bg-[#d01530] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#e91835]/20 disabled:text-white/30"
              style={{
                fontFamily: INTER,
                fontSize: 15,
              }}
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                "Save & Continue"
              )}
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
