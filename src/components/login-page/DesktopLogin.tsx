import React, { useState } from "react"
import { useNavigate } from "react-router"
import { AuthLayout } from "../../components/AuthLayout"
import { TablixLogo } from "../../components/TablixLogo"
import { authAPI, businessAPI } from "../../services/api"
import { addActivityEntry } from "../../services/activityLog"
import { motion, AnimatePresence } from "motion/react"
import { IconEye, IconKey, IconMail } from "@tabler/icons-react"

const INTER = "'Inter', sans-serif"

// ── Desktop login (AuthLayout) ───────────────────────────────────────────────

export function DesktopLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [pin, setPin] = useState("")
  const [showPin, setShowPin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handlePinChange = (val: string) => {
    const clean = val.replace(/\D/g, "") // accept only digits
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
        try {
          const biz = await businessAPI.getProfile()
          if (biz.data.business.id) {
            localStorage.setItem("tablix_business_id", biz.data.business.id)
          }
        } catch (_) {}
        addActivityEntry({
          staffName: "Owner",
          role: "Owner",
          action: "Logged in",
          category: "Auth",
          timestamp: Date.now(),
          detail: "Owner logged in successfully",
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
    <AuthLayout>
      <div className="flex w-full max-w-[440px] flex-col items-center gap-6">
        {/* Logo */}
        <div className="mb-2 scale-110 transform">
          <TablixLogo />
        </div>

        {/* Card wrapper */}
        <div className="page-card page-border flex w-full flex-col gap-6 rounded-2xl border px-8 py-8 shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_4px_16px_0_rgba(0,0,0,0.04)]">
          <div className="flex flex-col gap-1 text-center">
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
              Log in to your business dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Email Field */}
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
              <div className="page-border page-bg flex items-center gap-2 rounded-xl border px-3.5 py-2.5 transition-all focus-within:border-[#e91835] focus-within:bg-[var(--page-bg)] focus-within:ring-2 focus-within:ring-[#e91835]/20">
                <IconMail />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent text-[14.5px] text-[var(--page-text)] placeholder-[var(--c-text-placeholder)] outline-none"
                  style={{ fontFamily: INTER }}
                />
              </div>
            </div>

            {/* PIN Field */}
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
              <div className="page-border page-bg flex items-center gap-2 rounded-xl border px-3.5 py-2.5 transition-all focus-within:border-[#e91835] focus-within:bg-[var(--page-bg)] focus-within:ring-2 focus-within:ring-[#e91835]/20">
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
                  className="w-full bg-transparent text-[14.5px] tracking-wider text-[var(--page-text)] placeholder-[var(--c-text-placeholder)] outline-none"
                  style={{ fontFamily: INTER }}
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="p-0.5 focus:outline-none"
                >
                  {/* IconEye doesn't accept a `visible` prop in its typings; cast to any to pass through */}
                  <IconEye {...({ visible: showPin } as any)} />
                </button>
              </div>
            </div>

            {/* Error Message */}
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

            {/* Button */}
            <button
              type="submit"
              disabled={loading || !email.trim() || pin.length < 6}
              className="mt-2 flex h-11 w-full items-center justify-center rounded-xl bg-[#e91835] font-semibold text-white shadow-sm transition-all hover:bg-[#d01530] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#e91835]/20 disabled:text-white/30"
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

          {/* Links */}
          <div className="mt-1 flex items-center justify-center gap-4 text-sm">
            <button
              onClick={() => navigate("/forgot-password")}
              style={{
                fontFamily: INTER,
                fontSize: 12.5,
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
              onClick={() =>
                navigate("/enter-pin", { state: { flow: "staff" } })
              }
              style={{
                fontFamily: INTER,
                fontSize: 12.5,
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
        </div>

        {/* Footer */}
        <p
          style={{
            fontFamily: INTER,
            fontSize: 13.5,
            color: "var(--page-text-muted)",
            textAlign: "center",
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
    </AuthLayout>
  )
}
