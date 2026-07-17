interface StepIconProps {
  variant: "email" | "otp" | "password" | "success"
  className?: string
}

export function StepIcon({ variant, className = "" }: StepIconProps) {
  const configs = {
    email: {
      bg: "var(--c-primary-light)",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
            stroke="#e91835"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="22,6 12,13 2,6"
            stroke="#e91835"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    otp: {
      bg: "var(--c-success-bg)",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect
            x="5"
            y="11"
            width="14"
            height="10"
            rx="2"
            stroke="var(--c-success-text)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 11V7a4 4 0 018 0v4"
            stroke="var(--c-success-text)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="16" r="1" fill="var(--c-success-dot)" />
        </svg>
      ),
    },
    password: {
      bg: "var(--c-primary-light)",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            stroke="#e91835"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 12l2 2 4-4"
            stroke="#e91835"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    success: {
      bg: "var(--c-success-bg)",
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 6L9 17l-5-5"
            stroke="var(--c-success-text)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  }

  const config = configs[variant]
  const isSuccess = variant === "success"
  const size = isSuccess ? 16 : 12

  return (
    <div
      className={`flex items-center justify-center rounded-2xl ${isSuccess ? "size-16 border-4 border-[var(--c-success-text)]/20" : `size-${size}`} ${className}`}
      style={{ background: config.bg }}
    >
      {config.icon}
    </div>
  )
}
