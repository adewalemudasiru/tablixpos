// components/auth/EmailStep.tsx
import React, { useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { authAPI } from "../../services/api"
import { StepIcon } from "./StepIcon"
import { ErrorMessage } from "./ErrorMessage"
import { SubmitButton } from "./SubmitButton"

const INTER = "'Inter', sans-serif"

interface EmailStepProps {
  onNext: (email: string) => void
  isMobile?: boolean
}

export function EmailStep({ onNext, isMobile = false }: EmailStepProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!email.trim()) {
      setError("Email address is required")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address")
      return
    }
    setError("")
    setLoading(true)
    try {
      await authAPI.forgotPassword(email.trim())
      toast.success("OTP sent! Check your email.")
      onNext(email.trim())
    } catch (err: any) {
      setError(
        err?.data?.message ||
          err?.message ||
          "Failed to send code. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <StepIcon variant="email" />

      <div className="flex w-full flex-col items-center gap-1 text-center">
        <p
          style={{
            fontFamily: INTER,
            fontWeight: 800,
            fontSize: 22,
            color: "var(--page-text)",
          }}
        >
          Forgot Password?
        </p>
        <p
          style={{
            fontFamily: INTER,
            fontSize: 13,
            color: "var(--page-text-muted)",
            lineHeight: "20px",
          }}
          className="px-2"
        >
          No worries! Enter your email and we'll send you a verification code to
          reset your password.
        </p>
      </div>

      <form onSubmit={handleSend} className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-1.5">
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
          <div
            className={`flex items-center gap-2 rounded-xl border transition-all ${
              isMobile
                ? "bg-[var(--page-bg)] px-3 py-2.5 focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20"
                : "bg-[var(--page-bg)] px-3.5 py-2.5 focus-within:border-[#e91835] focus-within:bg-[var(--page-bg)] focus-within:ring-2 focus-within:ring-[#e91835]/20"
            } ${error ? "border-[#e91835]" : "border-[var(--page-border)]"}`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (error) setError("")
              }}
              required
              className="w-full bg-transparent text-[14.5px] text-[var(--page-text)] placeholder-[var(--c-text-placeholder)] outline-none"
              style={{ fontFamily: INTER }}
            />
          </div>
        </div>

        <ErrorMessage error={error} />

        <SubmitButton
          onClick={() => {}}
          disabled={!email.trim()}
          isLoading={loading}
          label="Send Verification Code"
        />
      </form>

      <button
        onClick={() => navigate("/login")}
        className="mt-2 flex items-center justify-center gap-1.5 transition-opacity hover:opacity-80"
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M19 12H5M12 19l-7-7 7-7"
            stroke="#e91835"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          style={{
            fontFamily: INTER,
            fontSize: 13,
            color: "#e91835",
            fontWeight: 600,
          }}
        >
          Back to Sign In
        </span>
      </button>
    </div>
  )
}
