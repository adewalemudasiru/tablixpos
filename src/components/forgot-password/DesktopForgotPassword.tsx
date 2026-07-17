import { AuthLayout } from "../AuthLayout"
import { TablixLogo } from "../TablixLogo"
import { EmailStep } from "./EmailStep"
import { OtpStep } from "./OtpStep"
import { PasswordStep } from "./PasswordStep"
import { SuccessStep } from "./SuccessStep"
import type { ForgotPasswordStep } from "../../hooks/useForgotPassword"

interface DesktopForgotPasswordProps {
  step: ForgotPasswordStep
  email: string
  otp: string
  done: boolean
  onGoToOtp: (email: string) => void
  onGoToPassword: (otp: string) => void
  onGoToEmail: () => void
  onGoToSuccess: () => void
}

export function DesktopForgotPassword({
  step,
  email,
  otp,
  done,
  onGoToOtp,
  onGoToPassword,
  onGoToEmail,
  onGoToSuccess,
}: DesktopForgotPasswordProps) {
  return (
    <AuthLayout>
      <div className="flex w-full max-w-[440px] flex-col items-center gap-6">
        <div className="mb-2 scale-110 transform">
          <TablixLogo />
        </div>

        <div className="page-card page-border flex w-full flex-col gap-6 rounded-2xl border px-8 py-8 shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_4px_16px_0_rgba(0,0,0,0.04)]">
          {done ? (
            <SuccessStep />
          ) : step === "email" ? (
            <EmailStep onNext={onGoToOtp} />
          ) : step === "otp" ? (
            <OtpStep
              email={email}
              onNext={onGoToPassword}
              onBack={onGoToEmail}
            />
          ) : (
            <PasswordStep email={email} otp={otp} onDone={onGoToSuccess} />
          )}
        </div>
      </div>
    </AuthLayout>
  )
}
