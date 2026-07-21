import { Toaster } from "sonner"
import { OtpInput } from "./OtpInput"
import { OtpError } from "./OtpError"
import { OtpSuccessToast } from "./OtpSuccessToast"
import { OtpResendButton } from "./OtpResendButton"
import imgFoodBg from "../../assets/login-bg.png"
import type { OtpState } from "../../types/otp-page/otp"

const INTER = "'Inter', sans-serif"

interface MobileOtpLayoutProps {
  state: OtpState & {
    maskedEmail: string
    isComplete: boolean
    loading: boolean
  }
  onOtpChange: (index: number, value: string) => void
  onVerify: () => void
  onResend: () => void
}

export function MobileOtpLayout({
  state,
  onOtpChange,
  onVerify,
  onResend,
}: MobileOtpLayoutProps) {
  const { otp, loading, error, showSuccess, maskedEmail, isComplete } = state

  // Create a wrapper to match OtpInput's expected signature
  const handleOtpChange = (newOtp: string[]) => {
    // Update each digit individually
    newOtp.forEach((value, index) => {
      const currentValue = otp[index] || ""
      if (value !== currentValue) {
        onOtpChange(index, value)
      }
    })
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <Toaster position="top-center" richColors />
      <img
        src={imgFoodBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />

      {showSuccess && <OtpSuccessToast />}

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
          Verify Email
        </p>
      </div>

      <div
        className="page-card absolute right-0 bottom-0 left-0 flex flex-col items-center gap-6 px-5 pt-8 pb-10 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md"
        style={{ borderRadius: "32px 32px 0 0" }}
      >
        <div className="-mt-2 mb-1 h-1 w-12 rounded-full bg-gray-300 dark:bg-gray-700" />

        <div className="flex w-full flex-col items-center gap-1.5 text-center">
          <p
            style={{
              fontFamily: INTER,
              fontWeight: 800,
              fontSize: 24,
              color: "var(--page-text)",
            }}
          >
            Enter Code
          </p>
          <p
            style={{
              fontFamily: INTER,
              fontSize: 13,
              color: "var(--page-text-muted)",
              lineHeight: "22px",
            }}
          >
            A 6-digits code has been sent to your email {maskedEmail} and it
            will expire in 10 minutes
          </p>
        </div>

        <OtpInput value={otp} onChange={handleOtpChange} disabled={loading} />

        <OtpError message={error} />

        <button
          onClick={onVerify}
          disabled={loading || !isComplete}
          className="flex h-11 w-full items-center justify-center rounded-xl bg-[#e91835] font-semibold text-white shadow-sm transition-all hover:bg-[#d01530] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#e91835]/20 disabled:text-white/30"
          style={{ fontFamily: INTER, fontSize: 15 }}
        >
          {loading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            "Continue"
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
          Didn't get OTP Code? <OtpResendButton onClick={onResend} />
        </p>
      </div>
    </div>
  )
}
