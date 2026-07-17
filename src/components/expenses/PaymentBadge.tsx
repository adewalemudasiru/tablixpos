const INTER = "'Inter', sans-serif"

interface PaymentBadgeProps {
  method?: string
}

export function PaymentBadge({ method }: PaymentBadgeProps) {
  if (!method) return null

  const cfg: Record<string, { bg: string; text: string }> = {
    Cash: { bg: "#dcfce7", text: "#15803d" },
    Transfer: { bg: "#dbeafe", text: "#1d4ed8" },
    Card: { bg: "#f3e8ff", text: "#7c3aed" },
  }
  const c = cfg[method] ?? { bg: "#f3f4f6", text: "#374151" }

  return (
    <span
      style={{
        fontFamily: INTER,
        fontSize: 11,
        fontWeight: 500,
        background: c.bg,
        color: c.text,
        borderRadius: 20,
        padding: "2px 9px",
        display: "inline-block",
        whiteSpace: "nowrap" as const,
      }}
    >
      {method}
    </span>
  )
}
