import { colors, radius } from "../ds"
import { FormLabel } from "./FormLabel"

const INTER = "'Inter', sans-serif"

type PaymentMethod = "Cash" | "Transfer" | "Card"

const PAYMENT_METHODS: PaymentMethod[] = ["Cash", "Transfer", "Card"]

interface PaymentMethodSelectorProps {
  value: PaymentMethod
  onChange: (value: PaymentMethod) => void
}

export function PaymentMethodSelector({
  value,
  onChange,
}: PaymentMethodSelectorProps) {
  const cfg: Record<PaymentMethod, { active: string; border: string }> = {
    Cash: { active: "#15803d", border: "#16a34a" },
    Transfer: { active: "#1d4ed8", border: "#2563eb" },
    Card: { active: "#7c3aed", border: "#7c3aed" },
  }

  return (
    <div className="flex flex-col gap-1.5">
      <FormLabel>Payment Method</FormLabel>
      <div className="flex flex-wrap gap-2">
        {PAYMENT_METHODS.map((m) => {
          const active = value === m
          return (
            <button
              key={m}
              type="button"
              onClick={() => onChange(m)}
              style={{
                fontFamily: INTER,
                fontWeight: 500,
                fontSize: 13,
                padding: "7px 18px",
                borderRadius: radius.full,
                cursor: "pointer",
                border: `1.5px solid ${active ? cfg[m].border : colors.border}`,
                background: active ? cfg[m].active : "var(--page-card-bg)",
                color: active ? "white" : colors.textSecondary,
                transition: "all 0.15s",
              }}
            >
              {m}
            </button>
          )
        })}
      </div>
    </div>
  )
}
