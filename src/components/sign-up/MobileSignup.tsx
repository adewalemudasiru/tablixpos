import {
  formatNigerianPhone,
  isValidNigerianPhone,
} from "@/utils/signup-helpers"
import { useState } from "react"
import { useNavigate } from "react-router"

import { authAPI } from "../../services/api"
import { BUSINESS_TYPES, NIGERIA_STATES, STATE_LIST } from "@/constants/sign-up"
import imgFoodBg from "../../assets/login-bg.png"
import { motion, AnimatePresence } from "motion/react"
import { useAppStore } from "../../store/AppContext"

const INTER = "'Inter', sans-serif"

export function MobileSignup({
  onOpenModal,
}: {
  onOpenModal: (type: "privacy" | "terms") => void
}) {
  const [form, setForm] = useState({
    businessName: "",
    businessType: "",
    ownerName: "",
    email: "",
    phone: "",
    state: "",
    city: "",
  })
  const [phoneError, setPhoneError] = useState("")
  const [submitError, setSubmitError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handlePhoneChange = (raw: string) => {
    let cleaned = raw.replace(/\D/g, "")
    if (cleaned.startsWith("234")) cleaned = cleaned.slice(3)
    if (cleaned.startsWith("0")) cleaned = cleaned.slice(1)
    const digits = formatNigerianPhone(cleaned)
    setForm((prev) => ({ ...prev, phone: digits }))

    if (digits.length > 0 && digits.length < 10) {
      setPhoneError("Enter a valid 11-digit Nigerian number")
    } else if (digits.length === 10 && !isValidNigerianPhone(digits)) {
      setPhoneError("Invalid Nigerian phone number")
    } else {
      setPhoneError("")
    }
  }

  const handleStateChange = (state: string) => {
    setForm((prev) => ({ ...prev, state, city: "" }))
  }

  const handleCreateAccount = async () => {
    const fullPhone = "+234" + form.phone
    const payload = { ...form, phone: fullPhone }
    setSubmitError("")
    setLoading(true)
    try {
      const res = await authAPI.signup({
        businessName: payload.businessName,
        businessType: payload.businessType,
        ownerName: payload.ownerName,
        email: payload.email,
        phone: payload.phone,
      })

      try {
        sessionStorage.setItem("tablix_temp_reg", JSON.stringify(payload))
      } catch (_) {}

      navigate("/create-pin", {
        replace: true,
        state: { form: payload, email: payload.email },
      })
    } catch (err: any) {
      const msg =
        err?.data?.message ??
        err?.message ??
        "Failed to create account. Please try again."
      setSubmitError(msg)
    } finally {
      setLoading(false)
    }
  }

  const isFormValid =
    form.businessName.trim() &&
    form.businessType &&
    form.ownerName.trim() &&
    form.ownerName.trim() &&
    form.email.trim() &&
    form.phone.length === 10 &&
    !phoneError &&
    form.state &&
    form.city

  const cities = form.state ? (NIGERIA_STATES[form.state] ?? []) : []

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
      <div className="absolute left-6 w-[300px]" style={{ top: "8%" }}>
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
        className="page-card absolute right-0 bottom-0 left-0 flex max-h-[82vh] flex-col items-center gap-5 overflow-y-auto px-5 pt-8 pb-10 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md"
        style={{ borderRadius: "32px 32px 0 0" }}
      >
        <div className="-mt-2 mb-1 h-1 w-12 shrink-0 rounded-full bg-gray-200" />

        <div className="flex w-full flex-col items-center gap-1 text-center">
          <p
            style={{
              fontFamily: INTER,
              fontWeight: 800,
              fontSize: 24,
              color: "var(--page-text)",
            }}
          >
            Let's Create Your Account
          </p>
          <p
            style={{
              fontFamily: INTER,
              fontSize: 13,
              color: "var(--page-text-secondary)",
            }}
          >
            Signing up for tablix is fast and free
          </p>
        </div>

        <div className="flex w-full flex-col gap-4">
          {/* Business Name */}
          <div className="flex w-full flex-col gap-1.5">
            <label
              style={{
                fontFamily: INTER,
                fontWeight: 600,
                fontSize: 13,
                color: "var(--page-text)",
              }}
            >
              Business Name <span className="text-[#f04438]">*</span>
            </label>
            <div className="page-border page-bg flex items-center gap-2 rounded-xl border px-3 py-2.5 transition-all focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20">
              <input
                type="text"
                placeholder="eg ABC Super Store"
                value={form.businessName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, businessName: e.target.value }))
                }
                className="w-full bg-transparent text-[15px] text-[var(--page-text)] placeholder-[var(--c-text-placeholder)] outline-none"
                style={{ fontFamily: INTER }}
              />
            </div>
          </div>

          {/* Business Type */}
          <div className="flex w-full flex-col gap-1.5">
            <label
              style={{
                fontFamily: INTER,
                fontWeight: 600,
                fontSize: 13,
                color: "var(--page-text)",
              }}
            >
              Business Type <span className="text-[#f04438]">*</span>
            </label>
            <div className="page-border page-bg flex items-center gap-2 rounded-xl border px-3 py-2.5 transition-all focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20">
              <select
                value={form.businessType}
                onChange={(e) =>
                  setForm((p) => ({ ...p, businessType: e.target.value }))
                }
                className="w-full appearance-none bg-transparent text-[15px] outline-none"
                style={{
                  fontFamily: INTER,
                  color: form.businessType
                    ? "var(--page-text)"
                    : "var(--c-text-placeholder)",
                }}
              >
                <option value="" disabled>
                  Select Business Type
                </option>
                {BUSINESS_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="pointer-events-none"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          {/* Owner Name */}
          <div className="flex w-full flex-col gap-1.5">
            <label
              style={{
                fontFamily: INTER,
                fontWeight: 600,
                fontSize: 13,
                color: "var(--page-text)",
              }}
            >
              Owner Name <span className="text-[#f04438]">*</span>
            </label>
            <div className="page-border page-bg flex items-center gap-2 rounded-xl border px-3 py-2.5 transition-all focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20">
              <input
                type="text"
                placeholder="eg John Doe"
                value={form.ownerName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, ownerName: e.target.value }))
                }
                className="w-full bg-transparent text-[15px] text-[var(--page-text)] placeholder-[var(--c-text-placeholder)] outline-none"
                style={{ fontFamily: INTER }}
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex w-full flex-col gap-1.5">
            <label
              style={{
                fontFamily: INTER,
                fontWeight: 600,
                fontSize: 13,
                color: "var(--page-text)",
              }}
            >
              Email <span className="text-[#f04438]">*</span>
            </label>
            <div className="page-border page-bg flex items-center gap-2 rounded-xl border px-3 py-2.5 transition-all focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20">
              <input
                type="email"
                placeholder="eg, help@tablix.com"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                className="w-full bg-transparent text-[15px] text-[var(--page-text)] placeholder-[var(--c-text-placeholder)] outline-none"
                style={{ fontFamily: INTER }}
              />
            </div>
          </div>

          {/* Phone — Nigerian format */}
          <div className="flex w-full flex-col gap-1.5">
            <label
              style={{
                fontFamily: INTER,
                fontWeight: 600,
                fontSize: 13,
                color: "var(--page-text)",
              }}
            >
              Phone <span className="text-[#f04438]">*</span>
            </label>
            <div
              className={`flex items-center gap-2 rounded-xl border bg-[var(--page-bg)] transition-all focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20 ${phoneError ? "border-[#f04438]" : "border-[var(--page-border)]"}`}
            >
              <span
                className="border-r border-[var(--page-border)] py-2.5 pr-2 pl-3 text-[15px] whitespace-nowrap text-[var(--page-text)] select-none"
                style={{ fontFamily: INTER }}
              >
                🇳🇬 +234
              </span>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="8012345678"
                value={form.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                maxLength={10}
                className="w-full bg-transparent py-2.5 text-[15px] text-[var(--page-text)] placeholder-[var(--c-text-placeholder)] outline-none"
                style={{ fontFamily: INTER }}
              />
            </div>
            {phoneError && (
              <p
                className="text-[12px] text-[#f04438]"
                style={{ fontFamily: INTER }}
              >
                {phoneError}
              </p>
            )}
          </div>

          {/* State & City — side by side */}
          <div className="flex w-full gap-3">
            {/* State */}
            <div className="flex flex-1 flex-col gap-1.5">
              <label
                style={{
                  fontFamily: INTER,
                  fontWeight: 600,
                  fontSize: 13,
                  color: "var(--page-text)",
                }}
              >
                State <span className="text-[#f04438]">*</span>
              </label>
              <div className="page-border page-bg relative flex items-center gap-2 rounded-xl border px-3 py-2.5 transition-all focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20">
                <select
                  value={form.state}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="w-full cursor-pointer appearance-none bg-transparent pr-6 text-[15px] text-[var(--page-text)] outline-none"
                  style={{ fontFamily: INTER }}
                >
                  <option value="" disabled>
                    Select state
                  </option>
                  {STATE_LIST.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* City */}
            <div className="flex flex-1 flex-col gap-1.5">
              <label
                style={{
                  fontFamily: INTER,
                  fontWeight: 600,
                  fontSize: 13,
                  color: "var(--page-text)",
                }}
              >
                City <span className="text-[#f04438]">*</span>
              </label>
              <div
                className={`page-border page-bg relative flex items-center gap-2 rounded-xl border px-3 py-2.5 transition-all focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20 ${!form.state ? "opacity-50" : ""}`}
              >
                <select
                  value={form.city}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, city: e.target.value }))
                  }
                  disabled={!form.state}
                  className="w-full cursor-pointer appearance-none bg-transparent pr-6 text-[15px] text-[var(--page-text)] outline-none disabled:cursor-not-allowed"
                  style={{ fontFamily: INTER }}
                >
                  <option value="" disabled>
                    Select city
                  </option>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Error */}
        <AnimatePresence>
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex w-full shrink-0 items-center gap-2 rounded-xl border border-red-100 bg-red-50 p-3"
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
                  stroke="#e91835"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <p
                style={{
                  fontFamily: INTER,
                  fontSize: 12,
                  color: "#e91835",
                  fontWeight: 500,
                }}
              >
                {submitError}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleCreateAccount}
          disabled={!isFormValid || loading}
          className="mt-2 flex h-11 w-full shrink-0 items-center justify-center rounded-xl bg-[#e91835] font-semibold text-white shadow-sm transition-all hover:bg-[#d01530] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#e91835]/20 disabled:text-white/30"
          style={{
            fontFamily: INTER,
            fontSize: 15,
          }}
        >
          {loading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            "Create Account"
          )}
        </button>

        <p
          style={{
            fontFamily: INTER,
            fontSize: 13,
            color: "var(--page-text-muted)",
            margin: 0,
            marginTop: 4,
          }}
        >
          Already have a Tablix account?{" "}
          <button
            onClick={() => navigate("/login")}
            style={{
              fontFamily: INTER,
              fontWeight: 700,
              color: "#e91835",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Sign in
          </button>
        </p>

        <p
          style={{
            fontFamily: INTER,
            fontSize: 11,
            color: "var(--page-text-muted)",
            textAlign: "center",
            lineHeight: "16px",
            marginTop: 4,
          }}
          className="shrink-0"
        >
          This site is protected by reCAPTCHA Enterprise and the Google{" "}
          <button
            type="button"
            onClick={() => onOpenModal("privacy")}
            className="text-[#e91835] underline decoration-solid focus:outline-none"
          >
            Privacy Policy
          </button>{" "}
          and{" "}
          <button
            type="button"
            onClick={() => onOpenModal("terms")}
            className="text-[#e91835] underline decoration-solid focus:outline-none"
          >
            Terms of Service
          </button>{" "}
          apply.
        </p>
      </div>
    </div>
  )
}
