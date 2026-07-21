import { useState } from "react"
import { useNavigate, useLocation } from "react-router"
import { PinPad } from "@/components/PinPad"
import { useAppStore } from "../../store/AppContext"
import { authAPI } from "../../services/api"
import imgFoodBg from "../../assets/login-bg.png"
import { motion, AnimatePresence } from "motion/react"

const INTER = "'Inter', sans-serif"
export function MobileCreatePin() {
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
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <img
        src={imgFoodBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute left-6 w-[300px]" style={{ top: "18%" }}>
        <p
          style={{
            fontFamily: INTER,
            fontWeight: 700,
            fontSize: 32,
            color: "#fff",
            lineHeight: "40px",
            margin: 0,
          }}
        >
          Create Access Pin
        </p>
      </div>

      <div
        className="page-card absolute right-0 bottom-0 left-0 flex flex-col items-center gap-6 px-5 pt-8 pb-10 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md"
        style={{ borderRadius: "32px 32px 0 0" }}
      >
        <div className="-mt-2 mb-1 h-1 w-12 rounded-full bg-gray-300 dark:bg-gray-700" />

        <div className="flex w-full flex-col items-center gap-1.5 text-center">
          <p
            style={{
              fontFamily: INTER,
              fontWeight: 800,
              fontSize: 24,
              color: "var(--page-text)",
            }}
          >
            Set Your PIN
          </p>
          <p
            style={{
              fontFamily: INTER,
              fontSize: 13,
              color: "var(--page-text-secondary)",
              lineHeight: "22px",
            }}
          >
            Create a PIN for your POS account system
          </p>
        </div>

        <div className="w-full">
          <PinPad pin={pin} onPinChange={setPin} maxLength={6} />
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex w-full items-center gap-2 rounded-xl border border-[var(--c-danger-text)]/20 bg-[var(--c-danger-bg)] p-3"
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
  )
}
