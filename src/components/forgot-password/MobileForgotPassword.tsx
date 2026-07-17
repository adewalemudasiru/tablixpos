import { ForgotPasswordBackground } from "./ForgotPasswordBackground"
import { ForgotPasswordHero } from "./ForgotPasswordHero"
import { ForgotPasswordCard } from "./ForgotPasswordCard"
import { EmailStep } from "./EmailStep"
import { OtpStep } from "./OtpStep"
import { PasswordStep } from "./PasswordStep"
import { SuccessStep } from "./SuccessStep"
import type { ForgotPasswordStep } from "../../hooks/useForgotPassword"

interface MobileForgotPasswordProps {
  step: ForgotPasswordStep
  email: string
  otp: string
  done: boolean
  onGoToOtp: (email: string) => void
  onGoToPassword: (otp: string) => void
  onGoToEmail: () => void
  onGoToSuccess: () => void
}

export function MobileForgotPassword({
  step,
  email,
  otp,
  done,
  onGoToOtp,
  onGoToPassword,
  onGoToEmail,
  onGoToSuccess,
}: MobileForgotPasswordProps) {
  return (
    <ForgotPasswordBackground>
      <ForgotPasswordHero className="top-[18%]" />

      <ForgotPasswordCard>
        {done ? (
          <SuccessStep />
        ) : step === "email" ? (
          <EmailStep onNext={onGoToOtp} isMobile />
        ) : step === "otp" ? (
          <OtpStep
            email={email}
            onNext={onGoToPassword}
            onBack={onGoToEmail}
            isMobile
          />
        ) : (
          <PasswordStep
            email={email}
            otp={otp}
            onDone={onGoToSuccess}
            isMobile
          />
        )}
      </ForgotPasswordCard>
    </ForgotPasswordBackground>
  )
}
