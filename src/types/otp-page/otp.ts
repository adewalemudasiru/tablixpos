export interface OtpState {
  otp: string[]
  loading: boolean
  error: string
  showSuccess: boolean
}

export interface OtpFormProps {
  email: string
  flow: "login" | "signup"
  onVerify: (code: string) => Promise<void>
  onResend: () => Promise<void>
}

export interface OtpInputProps {
  value: string[]
  onChange: (otp: string[]) => void
  onComplete?: () => void
  disabled?: boolean
}
