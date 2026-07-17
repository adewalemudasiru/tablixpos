import { OtpInput } from "./OtpInput"
import { OtpError } from "./OtpError"
import { OtpResendButton } from "./OtpResendButton"
import type { OtpFormProps } from "../../types/otp-page/otp"

const INTER = "'Inter', sans-serif"

interface OtpFormComponentProps extends OtpFormProps {
  otp: string[]
  loading: boolean
  error: string
  isComplete: boolean
  maskedEmail: string
  onOtpChange: (otp: string[]) => void
  onOtpComplete?: () => void
}

export function OtpForm({
  otp,
  loading,
  error,
  isComplete,
  maskedEmail,
  onOtpChange,
  onOtpComplete,
  onVerify,
  onResend,
}: OtpFormComponentProps) {
  return (
    <div className="flex w-full max-w-[440px] flex-col items-center gap-6">
      <div className="page-card page-border flex w-full flex-col gap-6 rounded-2xl border px-8 py-8 shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_4px_16px_0_rgba(0,0,0,0.04)]">
        <div className="flex w-full flex-col gap-1.5 text-center">
          <p
            style={{
              fontFamily: INTER,
              fontWeight: 800,
              fontSize: 24,
              color: "var(--page-text)",
            }}
          >
            Verify Email
          </p>
          <p
            style={{
              fontFamily: INTER,
              fontSize: 13.5,
              color: "var(--page-text-muted)",
              lineHeight: "22px",
            }}
          >
            A 6-digits code has been sent to your email {maskedEmail} and it
            will expire in 10 minutes
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <OtpInput
            value={otp}
            onChange={onOtpChange}
            onComplete={onOtpComplete}
            disabled={loading}
          />

          <OtpError message={error} />

          <button
            onClick={() => onVerify(otp.join(""))}
            disabled={loading || !isComplete}
            className="mt-2 flex h-11 w-full items-center justify-center rounded-xl bg-[#e91835] font-semibold text-white shadow-sm transition-all hover:bg-[#d01530] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#e91835]/20 disabled:text-white/30"
            style={{ fontFamily: INTER, fontSize: 15 }}
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </div>

      <p
        style={{
          fontFamily: INTER,
          fontSize: 13.5,
          color: "var(--page-text-muted)",
          textAlign: "center",
        }}
      >
        Didn't get OTP Code? <OtpResendButton onClick={onResend} />
      </p>
    </div>
  )
}
