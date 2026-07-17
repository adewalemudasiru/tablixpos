// components/auth/OtpStep.tsx
import { useState, useEffect, useRef } from "react"
import { toast } from "sonner"
import { authAPI } from "../../services/api"
import { StepIcon } from "./StepIcon"
import { OtpInput } from "./OtpInput"
import { ErrorMessage } from "./ErrorMessage"
import { SubmitButton } from "./SubmitButton"

const INTER = "'Inter', sans-serif"

interface OtpStepProps {
  email: string
  onNext: (code: string) => void
  onBack: () => void
  isMobile?: boolean
}

export function OtpStep({
  email,
  onNext,
  onBack,
  isMobile = false,
}: OtpStepProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const masked = email.replace(
    /(.{2})(.*)(@.*)/,
    (_, a, b, c) => a + "*".repeat(Math.max(b.length, 4)) + c
  )

  const startResendTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setResendTimer(60)
    timerRef.current = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!)
          return 0
        }
        return t - 1
      })
    }, 1000)
  }

  useEffect(() => {
    startResendTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const handleResend = async () => {
    if (resendTimer > 0) return
    try {
      await authAPI.forgotPassword(email)
      toast.success("New OTP sent to your email")
      startResendTimer()
      setOtp(["", "", "", "", "", ""])
      setError("")
    } catch {
      toast.error("Failed to resend OTP. Please try again.")
    }
  }

  const handleVerify = async () => {
    const code = otp.join("")
    if (code.length < 6) {
      setError("Please enter the complete 6-digit code")
      return
    }
    setError("")
    setLoading(true)
    try {
      await authAPI.verifyResetOtp(email, code)
      onNext(code)
    } catch (err: any) {
      setError(
        err?.data?.message ||
          err?.message ||
          "Invalid or expired code. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <StepIcon variant="otp" />

      <div className="flex w-full flex-col items-center gap-1 text-center">
        <p
          style={{
            fontFamily: INTER,
            fontWeight: 800,
            fontSize: 22,
            color: "var(--page-text)",
          }}
        >
          Check Your Email
        </p>
        <p
          style={{
            fontFamily: INTER,
            fontSize: 13,
            color: "var(--page-text-muted)",
            lineHeight: "20px",
          }}
        >
          We sent a 6-digit verification code to{" "}
          <span style={{ fontWeight: 600, color: "var(--page-text)" }}>
            {masked}
          </span>
        </p>
      </div>

      <div className="w-full py-1">
        <OtpInput otp={otp} setOtp={setOtp} />
      </div>

      <ErrorMessage error={error} />

      <SubmitButton
        onClick={handleVerify}
        disabled={otp.join("").length < 6}
        isLoading={loading}
        label="Verify Code"
      />

      <div className="mt-1 flex items-center gap-1.5 text-sm">
        <span style={{ fontFamily: INTER, color: "var(--page-text-muted)" }}>
          Didn't receive the code?
        </span>
        {resendTimer > 0 ? (
          <span
            style={{
              fontFamily: INTER,
              color: "var(--page-text-muted)",
              fontWeight: 500,
            }}
          >
            Resend in {resendTimer}s
          </span>
        ) : (
          <button
            onClick={handleResend}
            style={{
              fontFamily: INTER,
              fontWeight: 700,
              color: "#e91835",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Resend
          </button>
        )}
      </div>

      <button
        onClick={onBack}
        className="mt-2 flex items-center gap-1 transition-opacity hover:opacity-85"
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <span
          style={{
            fontFamily: INTER,
            fontSize: 13,
            color: "var(--page-text-muted)",
            fontWeight: 500,
          }}
        >
          Change email address
        </span>
      </button>
    </div>
  )
}
