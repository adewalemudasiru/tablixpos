import React from "react"
import type { OtpInputProps } from "../../types/otp-page/otp"

const INTER = "'Inter', sans-serif"

export function OtpInput({
  value,
  onChange,
  onComplete,
  disabled = false,
}: OtpInputProps) {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])
  const OTP_LENGTH = 6

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return
    const newOtp = [...value]
    newOtp[index] = val.slice(-1)
    onChange(newOtp)
    if (val && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
    if (newOtp.every((d) => d !== "") && onComplete) {
      onComplete()
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH)
    if (pasted) {
      const newOtp = pasted
        .split("")
        .concat(Array(OTP_LENGTH).fill(""))
        .slice(0, OTP_LENGTH)
      onChange(newOtp)
      inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus()
    }
  }

  return (
    <div
      className="flex w-full items-center justify-center gap-3"
      onPaste={handlePaste}
    >
      {value.map((digit, i) => (
        <div key={i} className="max-w-[48px] flex-1 lg:max-w-[50px]">
          <div className="relative w-full rounded-xl border border-[var(--page-border)] bg-[var(--page-bg)] shadow-sm transition-all focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20">
            <input
              ref={(el) => {
                inputRefs.current[i] = el
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              disabled={disabled}
              className="w-full rounded-xl bg-transparent px-2 py-3.5 text-center text-[18px] text-[var(--page-text)] outline-none disabled:opacity-50"
              style={{ fontFamily: INTER, fontWeight: 600 }}
              aria-label={`OTP digit ${i + 1}`}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
