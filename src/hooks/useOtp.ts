import { useState, useRef, useCallback } from "react"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { authAPI } from "../services/api"
import type { OtpState } from "../types/otp-page/otp"

const OTP_LENGTH = 6

export function useOtp(email: string, flow: "login" | "signup") {
  const navigate = useNavigate()
  const [state, setState] = useState<OtpState>({
    otp: Array(OTP_LENGTH).fill(""),
    loading: false,
    error: "",
    showSuccess: false,
  })
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const setOtp = useCallback((otp: string[]) => {
    setState((prev) => ({ ...prev, otp }))
  }, [])

  const setLoading = useCallback((loading: boolean) => {
    setState((prev) => ({ ...prev, loading }))
  }, [])

  const setError = useCallback((error: string) => {
    setState((prev) => ({ ...prev, error }))
  }, [])

  const setShowSuccess = useCallback((showSuccess: boolean) => {
    setState((prev) => ({ ...prev, showSuccess }))
  }, [])

  const resetOtp = useCallback(() => {
    setOtp(Array(OTP_LENGTH).fill(""))
    setError("")
    inputRefs.current[0]?.focus()
  }, [setOtp, setError])

  const handleChange = useCallback(
    (index: number, value: string) => {
      if (!/^\d*$/.test(value)) return
      const newOtp = [...state.otp]
      newOtp[index] = value.slice(-1)
      setOtp(newOtp)
      if (value && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    },
    [state.otp, setOtp]
  )

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !state.otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    },
    [state.otp]
  )

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      const pasted = e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, OTP_LENGTH)
      if (pasted) {
        const newOtp = pasted
          .split("")
          .concat(Array(OTP_LENGTH).fill(""))
          .slice(0, OTP_LENGTH)
        setOtp(newOtp)
        inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus()
      }
    },
    [setOtp]
  )

  const handleVerify = useCallback(async () => {
    const code = state.otp.join("")
    if (code.length < OTP_LENGTH) return

    setLoading(true)
    setError("")

    try {
      await authAPI.verifyEmail(email, code)
      setShowSuccess(true)
      setTimeout(() => {
        navigate(flow === "signup" ? "/create-pin" : "/enter-pin", {
          state: { email, flow },
        })
      }, 1500)
    } catch (err: any) {
      setError(
        err?.data?.message ||
          err?.message ||
          "Invalid or expired code. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }, [state.otp, email, flow, navigate, setLoading, setError, setShowSuccess])

  // Change to return Promise<void>
  const handleResend = useCallback(async () => {
    resetOtp()
    try {
      await authAPI.resendOtp(email)
      toast.success("A new OTP has been sent to your email.")
    } catch {
      toast.error("Failed to resend OTP. Please try again.")
    }
  }, [email, resetOtp])

  const isComplete = state.otp.every((d) => d !== "")
  const maskedEmail = email.replace(
    /(.{3})(.*)(@.*)/,
    (_, a, b, c) => a + "*".repeat(Math.max(b.length, 5)) + c
  )

  return {
    ...state,
    inputRefs,
    maskedEmail,
    isComplete,
    handleChange,
    handleKeyDown,
    handlePaste,
    handleVerify,
    handleResend,
    resetOtp,
  }
}
