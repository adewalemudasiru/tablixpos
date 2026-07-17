import React, { useState } from "react"
import { toast } from "sonner"
import { authAPI } from "../../services/api"
import { StepIcon } from "./StepIcon"
import { ErrorMessage } from "./ErrorMessage"
import { SubmitButton } from "./SubmitButton"

const INTER = "'Inter', sans-serif"

interface PasswordStepProps {
  email: string
  otp: string
  onDone: () => void
  isMobile?: boolean
}

export function PasswordStep({
  email,
  otp,
  onDone,
  isMobile = false,
}: PasswordStepProps) {
  const [pin, setPin] = useState("")
  const [pin2, setPin2] = useState("")
  const [errors, setErrors] = useState<{
    pin?: string
    pin2?: string
    api?: string
  }>({})
  const [loading, setLoading] = useState(false)

  const handleReset = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const errs: { pin?: string; pin2?: string } = {}
    if (pin.length !== 6 || !/^\d+$/.test(pin))
      errs.pin = "PIN must be exactly 6 digits"
    if (pin !== pin2) errs.pin2 = "PINs do not match"
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setLoading(true)
    try {
      await authAPI.resetPassword(email, otp, pin)
      toast.success("PIN reset successfully!")
      onDone()
    } catch (err: any) {
      setErrors({
        api:
          err?.data?.message ||
          err?.message ||
          "Failed to reset PIN. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <StepIcon variant="password" />

      <div className="flex w-full flex-col items-center gap-1 text-center">
        <p
          style={{
            fontFamily: INTER,
            fontWeight: 800,
            fontSize: 22,
            color: "var(--page-text)",
          }}
        >
          Create New PIN
        </p>
        <p
          style={{
            fontFamily: INTER,
            fontSize: 13,
            color: "var(--page-text-muted)",
            lineHeight: "20px",
          }}
        >
          Enter a new 6-digit PIN for your account.
        </p>
      </div>

      <form onSubmit={handleReset} className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-1.5">
          <label
            style={{
              fontFamily: INTER,
              fontWeight: 600,
              fontSize: 13,
              color: "var(--page-text)",
            }}
          >
            New PIN
          </label>
          <input
            type="password"
            inputMode="numeric"
            maxLength={6}
            placeholder="Enter 6-digit PIN"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value.replace(/\D/g, ""))
              setErrors((p) => ({ ...p, pin: undefined }))
            }}
            className={`w-full rounded-xl border px-3.5 py-2.5 text-center text-[20px] tracking-widest transition-all outline-none ${
              isMobile
                ? "bg-[var(--page-bg)] focus:border-[#e91835] focus:ring-2 focus:ring-[#e91835]/20"
                : "bg-[var(--page-bg)] focus:border-[#e91835] focus:bg-[var(--page-surface)] focus:ring-2 focus:ring-[#e91835]/20"
            } ${errors.pin ? "border-[#e91835]" : "border-[var(--page-border)]"}`}
            style={{ fontFamily: INTER }}
          />
          {errors.pin && (
            <p
              style={{
                fontFamily: INTER,
                fontSize: 12,
                color: "var(--c-danger-text)",
              }}
            >
              {errors.pin}
            </p>
          )}
        </div>

        <div className="flex w-full flex-col gap-1.5">
          <label
            style={{
              fontFamily: INTER,
              fontWeight: 600,
              fontSize: 13,
              color: "var(--page-text)",
            }}
          >
            Confirm PIN
          </label>
          <input
            type="password"
            inputMode="numeric"
            maxLength={6}
            placeholder="Re-enter 6-digit PIN"
            value={pin2}
            onChange={(e) => {
              setPin2(e.target.value.replace(/\D/g, ""))
              setErrors((p) => ({ ...p, pin2: undefined }))
            }}
            className={`w-full rounded-xl border px-3.5 py-2.5 text-center text-[20px] tracking-widest transition-all outline-none ${
              isMobile
                ? "bg-[var(--page-bg)] focus:border-[#e91835] focus:ring-2 focus:ring-[#e91835]/20"
                : "bg-[var(--page-bg)] focus:border-[#e91835] focus:bg-[var(--page-surface)] focus:ring-2 focus:ring-[#e91835]/20"
            } ${errors.pin2 ? "border-[#e91835]" : "border-[var(--page-border)]"}`}
            style={{ fontFamily: INTER }}
          />
          {errors.pin2 && (
            <p
              style={{
                fontFamily: INTER,
                fontSize: 12,
                color: "var(--c-danger-text)",
              }}
            >
              {errors.pin2}
            </p>
          )}
        </div>

        <ErrorMessage error={errors.api || ""} />

        <SubmitButton
          onClick={() => {}}
          disabled={pin.length < 6 || pin2.length < 6}
          isLoading={loading}
          label="Reset PIN"
        />
      </form>
    </div>
  )
}
