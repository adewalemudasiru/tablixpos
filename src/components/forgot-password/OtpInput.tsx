import React, { useRef } from "react"

const INTER = "'Inter', sans-serif"

interface OtpInputProps {
  otp: string[]
  setOtp: (otp: string[]) => void
}

export function OtpInput({ otp, setOtp }: OtpInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (idx: number, val: string) => {
    if (!/^\d*$/.test(val)) return
    const next = [...otp]
    next[idx] = val.slice(-1)
    setOtp(next)
    if (val && idx < 5) refs.current[idx + 1]?.focus()
  }

  const handleKey = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      refs.current[idx - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
    if (pasted) {
      const next = pasted.split("").concat(Array(6).fill("")).slice(0, 6)
      setOtp(next)
      refs.current[Math.min(pasted.length, 5)]?.focus()
    }
  }

  return (
    <div className="flex w-full justify-center gap-2 sm:gap-3">
      {otp.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKey(i, e)}
          onPaste={handlePaste}
          className="rounded-xl text-center transition-all outline-none"
          style={{
            width: 44,
            height: 50,
            fontFamily: INTER,
            fontSize: 20,
            fontWeight: 700,
            color: "var(--page-text)",
            border: `2px solid ${digit ? "#e91835" : "var(--page-border)"}`,
            background: digit
              ? "var(--c-primary-light)"
              : "var(--page-surface)",
            boxShadow: digit ? "0 0 0 3px var(--c-primary-mid)" : "none",
          }}
          onFocus={(el) => {
            el.currentTarget.style.borderColor = "#e91835"
          }}
          onBlur={(el) => {
            el.currentTarget.style.borderColor = otp[i]
              ? "#e91835"
              : "var(--page-border)"
          }}
        />
      ))}
    </div>
  )
}
