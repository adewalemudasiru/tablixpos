const INTER = "'Inter', sans-serif"

interface OtpResendButtonProps {
  onClick: () => void
  label?: string
  className?: string
}

export function OtpResendButton({
  onClick,
  label = "Resend OTP",
  className = "",
}: OtpResendButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: INTER,
        fontWeight: 700,
        color: "#e91835",
        background: "none",
        border: "none",
        cursor: "pointer",
        textDecoration: "underline",
      }}
      className={className}
    >
      {label}
    </button>
  )
}
