// hooks/useForgotPassword.ts
import { useState } from "react"

export type ForgotPasswordStep = "email" | "otp" | "password"

export function useForgotPassword() {
  const [step, setStep] = useState<ForgotPasswordStep>("email")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [done, setDone] = useState(false)

  const goToEmail = () => {
    setStep("email")
    setDone(false)
  }

  const goToOtp = (email: string) => {
    setEmail(email)
    setStep("otp")
  }

  const goToPassword = (otp: string) => {
    setOtp(otp)
    setStep("password")
  }

  const goToSuccess = () => {
    setDone(true)
  }

  return {
    step,
    email,
    otp,
    done,
    goToEmail,
    goToOtp,
    goToPassword,
    goToSuccess,
    setEmail,
    setOtp,
    setDone,
  }
}
