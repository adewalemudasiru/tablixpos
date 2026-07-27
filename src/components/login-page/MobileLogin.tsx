import React, { useState } from "react"
import { useNavigate } from "react-router"
import { authAPI } from "../../services/api"
import { addActivityEntry } from "../../services/activityLog"
import { useAppStore } from "../../store/AppContext"
import imgFoodBg from "../../assets/login-bg.png"
import { motion, AnimatePresence } from "motion/react"
import { IconEye, IconKey, IconMail } from "@tabler/icons-react"

const INTER = "'Inter', sans-serif"
export function MobileLogin() {
  const navigate = useNavigate()
  const { setActiveStaff } = useAppStore()
  const [email, setEmail] = useState("")
  const [pin, setPin] = useState("")
  const [showPin, setShowPin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handlePinChange = (val: string) => {
    const clean = val.replace(/\D/g, "") // accept only digits for login PIN
    if (clean.length <= 6) {
      setPin(clean)
      setError("")
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || pin.length < 6 || loading) return

    setLoading(true)
    setError("")

    try {
      const res = await authAPI.login(email.trim(), pin)
      if (res.data?.accessToken) {
        localStorage.setItem("tablixpos_access_token", res.data.accessToken)
        localStorage.setItem("tablixpos_refresh_token", res.data.refreshToken)
        localStorage.setItem("tablix_owner_email", email.trim())
        localStorage.setItem("tablix_owner_pin", pin)
        localStorage.setItem("tablix_business_id", "mock-business-id")
        localStorage.setItem(
          "tablix_restaurant_name",
          res.data?.user?.businessName || "Tablix Demo Restaurant"
        )
        setActiveStaff({
          id: res.data?.user?.id || "mock-admin-001",
          name: res.data?.user?.ownerName || "Owner",
          email: res.data?.user?.email || email.trim(),
          role: "Admin",
          pin: pin,
          dateCreated: new Date().toISOString(),
        })
        addActivityEntry({
          staffName: "Owner",
          role: "Owner",
          action: "Logged in",
          category: "Auth",
          timestamp: Date.now(),
          detail: "Owner logged in successfully via mobile",
        })
        navigate("/dashboard", { replace: true })
      } else {
        setError("Login failed. Please check your credentials.")
      }
    } catch (err: any) {
      const msg =
        err?.data?.message || "Invalid email or PIN. Please try again."
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background image + overlay */}
      <img
        src={imgFoodBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />

      {/* Hero text */}
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
          Simplify Sales,
        </p>
        <p
          style={{
            fontFamily: INTER,
            fontWeight: 700,
            fontSize: 32,
            color: "#fff",
            lineHeight: "40px",
            margin: 0,
            marginTop: 4,
          }}
        >
          Amplify your business.
        </p>
      </div>

      {/* Bottom sheet container */}
      <div
        className="page-card absolute right-0 bottom-0 left-0 flex flex-col items-center gap-6 px-5 pt-8 pb-10 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md"
        style={{ borderRadius: "32px 32px 0 0" }}
      >
        <div className="-mt-2 mb-1 h-1 w-12 rounded-full bg-gray-300 dark:bg-gray-700" />

        <div className="flex w-full flex-col items-center gap-1 text-center">
          <p
            style={{
              fontFamily: INTER,
              fontWeight: 800,
              fontSize: 24,
              color: "var(--page-text)",
            }}
          >
            Welcome Back
          </p>
          <p
            style={{
              fontFamily: INTER,
              fontSize: 13,
              color: "var(--page-text-muted)",
            }}
          >
            Enter your credentials to access the system
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex w-full flex-col gap-4">
          {/* Email field */}
          <div className="flex flex-col gap-1.5">
            <label
              style={{
                fontFamily: INTER,
                fontWeight: 600,
                fontSize: 13,
                color: "var(--page-text)",
              }}
            >
              Email Address
            </label>
            <div className="page-border page-bg flex items-center gap-2 rounded-xl border px-3 py-2.5 transition-all focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20">
              <IconMail />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent text-[15px] text-[var(--page-text)] placeholder-[var(--c-text-placeholder)] outline-none"
                style={{ fontFamily: INTER }}
              />
            </div>
          </div>

          {/* PIN field */}
          <div className="flex flex-col gap-1.5">
            <label
              style={{
                fontFamily: INTER,
                fontWeight: 600,
                fontSize: 13,
                color: "var(--page-text)",
              }}
            >
              Access PIN
            </label>
            <div className="page-border page-bg flex items-center gap-2 rounded-xl border px-3 py-2.5 transition-all focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20">
              <IconKey />
              <input
                type={showPin ? "text" : "password"}
                pattern="[0-9]*"
                inputMode="numeric"
                maxLength={6}
                placeholder="Enter 6-digit PIN"
                value={pin}
                onChange={(e) => handlePinChange(e.target.value)}
                required
                className="w-full bg-transparent text-[15px] tracking-widest text-[var(--page-text)] placeholder-[var(--c-text-placeholder)] outline-none"
                style={{ fontFamily: INTER }}
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="p-1 focus:outline-none"
              >
                {/* IconEye doesn't accept a `visible` prop in its typings; cast to any to pass through */}
                <IconEye {...({ visible: showPin } as any)} />
              </button>
            </div>
          </div>

          {/* Error Banner */}
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

          {/* Log In Button */}
          <button
            type="submit"
            disabled={loading || !email.trim() || pin.length < 6}
            className="flex h-11 w-full items-center justify-center rounded-xl bg-[#e91835] font-semibold text-white shadow-sm transition-all hover:bg-[#d01530] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#e91835]/20 disabled:text-white/30"
            style={{
              fontFamily: INTER,
              fontSize: 15,
            }}
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <div className="flex w-full items-center justify-center gap-4 text-sm">
          <button
            onClick={() => navigate("/forgot-password")}
            style={{
              fontFamily: INTER,
              fontSize: 13,
              color: "#e91835",
              fontWeight: 500,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Forgot PIN?
          </button>
          <span className="text-[var(--page-border)]">|</span>
          <button
            onClick={() => navigate("/enter-pin", { state: { flow: "staff" } })}
            style={{
              fontFamily: INTER,
              fontSize: 13,
              color: "var(--page-text-muted)",
              fontWeight: 500,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Staff login
          </button>
        </div>

        <p
          style={{
            fontFamily: INTER,
            fontSize: 13,
            color: "var(--page-text-muted)",
            margin: 0,
            marginTop: 4,
          }}
        >
          New to Tablix?{" "}
          <button
            onClick={() => navigate("/signup")}
            style={{
              fontFamily: INTER,
              fontWeight: 700,
              color: "#e91835",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  )
}
