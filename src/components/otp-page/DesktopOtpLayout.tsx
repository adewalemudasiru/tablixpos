import { Toaster } from "sonner"
import { AuthLayout } from "../AuthLayout"
import { TablixLogo } from "../TablixLogo"
import { OtpForm } from "./OtpForm"
import type { OtpState } from "../../types/otp-page/otp"

interface DesktopOtpLayoutProps {
  state: OtpState & {
    maskedEmail: string
    isComplete: boolean
    loading: boolean
  }
  email: string
  flow: "login" | "signup"
  onOtpChange: (index: number, value: string) => void
  onVerify: (code: string) => Promise<void>
  onResend: () => Promise<void>
}

export function DesktopOtpLayout({
  state,
  email,
  flow,
  onOtpChange,
  onVerify,
  onResend,
}: DesktopOtpLayoutProps) {
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
    <AuthLayout>
      <Toaster position="top-center" richColors />
      <div className="flex w-full max-w-[440px] flex-col items-center gap-6">
        {showSuccess && (
          <div className="fixed top-4 left-1/2 z-50 flex min-w-[260px] -translate-x-1/2 items-center gap-2 rounded-[8px] border border-[var(--c-success-text)]/20 bg-[var(--c-success-bg)] px-4 py-3 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]">
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path
                clipRule="evenodd"
                d="M10 1.667A8.333 8.333 0 1 0 10 18.333 8.333 8.333 0 0 0 10 1.667Zm3.59 6.41a.833.833 0 0 0-1.18-1.18L9 10.32 7.59 8.91a.833.833 0 0 0-1.18 1.18l2 2c.325.326.855.326 1.18 0l4-4Z"
                fill="var(--c-success-text)"
                fillRule="evenodd"
              />
            </svg>
            <span
              className="text-[13px] font-medium text-[var(--c-success-text)]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              OTP Verified Successfully
            </span>
          </div>
        )}

        <div className="mb-2 scale-110 transform">
          <TablixLogo />
        </div>

        <OtpForm
          email={email}
          flow={flow}
          otp={otp}
          loading={loading}
          error={error}
          isComplete={isComplete}
          maskedEmail={maskedEmail}
          onOtpChange={handleOtpChange}
          onVerify={onVerify}
          onResend={onResend}
        />
      </div>
    </AuthLayout>
  )
}
