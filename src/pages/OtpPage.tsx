import { useLocation } from "react-router"
import { useOtp } from "../hooks/useOtp"
import { MobileOtpLayout } from "../components/otp-page/MobileOtpLayout"
import { DesktopOtpLayout } from "../components/otp-page/DesktopOtpLayout"

export default function OtpPage() {
  const location = useLocation()
  const state = location.state as { email?: string; flow?: string } | null
  const email = state?.email ?? "user@example.com"
  const flow = (state?.flow as "login" | "signup") ?? "login"

  const {
    otp,
    loading,
    error,
    showSuccess,
    maskedEmail,
    isComplete,
    handleChange,
    handleVerify,
    handleResend,
  } = useOtp(email, flow)

  const otpState = {
    otp,
    loading,
    error,
    showSuccess,
    maskedEmail,
    isComplete,
  }

  return (
    <>
      {/* Mobile layout (< lg) */}
      <div className="block h-screen lg:hidden">
        <MobileOtpLayout
          state={otpState}
          onOtpChange={handleChange}
          onVerify={handleVerify}
          onResend={handleResend}
        />
      </div>
      {/* Desktop layout (>= lg) */}
      <div className="hidden lg:block">
        <DesktopOtpLayout
          state={otpState}
          email={email}
          flow={flow}
          onOtpChange={handleChange}
          onVerify={handleVerify}
          onResend={handleResend}
        />
      </div>
    </>
  )
}
