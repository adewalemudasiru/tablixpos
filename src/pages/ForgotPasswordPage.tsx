import { Toaster } from "sonner"
import { DesktopForgotPassword } from "../components/forgot-password/DesktopForgotPassword"
import { MobileForgotPassword } from "../components/forgot-password/MobileForgotPassword"
import { useForgotPassword } from "../hooks/useForgotPassword"

export default function ForgotPasswordPage() {
  const {
    step,
    email,
    otp,
    done,
    goToOtp,
    goToPassword,
    goToEmail,
    goToSuccess,
  } = useForgotPassword()

  return (
    <>
      <Toaster position="top-center" richColors />

      <div className="block h-screen lg:hidden">
        <MobileForgotPassword
          step={step}
          email={email}
          otp={otp}
          done={done}
          onGoToOtp={goToOtp}
          onGoToPassword={goToPassword}
          onGoToEmail={goToEmail}
          onGoToSuccess={goToSuccess}
        />
      </div>

      <div className="hidden lg:block">
        <DesktopForgotPassword
          step={step}
          email={email}
          otp={otp}
          done={done}
          onGoToOtp={goToOtp}
          onGoToPassword={goToPassword}
          onGoToEmail={goToEmail}
          onGoToSuccess={goToSuccess}
        />
      </div>
    </>
  )
}
