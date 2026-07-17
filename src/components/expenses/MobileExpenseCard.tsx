// components/expenses/MobileExpenseCard.tsx
import { useState } from "react"
import { colors, radius, shadows } from "../ds"
import { Badge } from "../ds/Badge"
import { Button } from "../ds/Button"
import { CategoryChip } from "./CategoryChip"
import { PaymentBadge } from "./PaymentBadge"
import type { Expense } from "../../store/AppContext"

const INTER = "'Inter', sans-serif"
const NGN = "\u20a6"

function fmtAmount(n: number) {
  return `${NGN}${n.toLocaleString()}`
}

const STATUS_VARIANT: Record<string, any> = {
  Approved: "success",
  Pending: "warning",
  Rejected: "danger",
}

interface MobileExpenseCardProps {
  expense: Expense
  onEdit: () => void
  onDelete: () => void
}

export function MobileExpenseCard({
  expense,
  onEdit,
  onDelete,
}: MobileExpenseCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="page-card overflow-hidden rounded-xl border"
      style={{
        border: `1px solid ${colors.borderLight}`,
        borderRadius: radius.xl,
        boxShadow: shadows.card,
        overflow: "hidden",
      }}
    >
      <button
        className="page-hover flex w-full items-start gap-3 p-4 text-left transition-colors active:bg-gray-100"
        onClick={() => setExpanded((v) => !v)}
      >
        <div
          className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl"
          style={{ background: colors.primaryLight }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
              stroke={colors.primary}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p
              style={{
                fontFamily: INTER,
                fontWeight: 600,
                fontSize: 13,
                color: colors.textPrimary,
              }}
              className="truncate"
            >
              {expense.description}
            </p>
            <p
              style={{
                fontFamily: INTER,
                fontWeight: 700,
                fontSize: 14,
                color: colors.textPrimary,
                flexShrink: 0,
              }}
            >
              {fmtAmount(expense.amount)}
            </p>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span
              style={{
                fontFamily: INTER,
                fontSize: 11,
                color: colors.textMuted,
              }}
            >
              {expense.date}
            </span>
            <CategoryChip category={expense.category} />
            {expense.paymentMethod && (
              <PaymentBadge method={expense.paymentMethod} />
            )}
          </div>
        </div>
      </button>

      {expanded && (
        <div
          className="flex flex-col gap-3 border-t px-4 pb-4"
          style={{ borderColor: colors.borderLight }}
        >
          <div className="grid grid-cols-2 gap-3 pt-3">
            <div>
              <p
                style={{
                  fontFamily: INTER,
                  fontSize: 11,
                  color: colors.textMuted,
                }}
              >
                Status
              </p>
              <div className="mt-1">
                <Badge variant={STATUS_VARIANT[expense.status as string]}>
                  {expense.status}
                </Badge>
              </div>
            </div>
            <div>
              <p
                style={{
                  fontFamily: INTER,
                  fontSize: 11,
                  color: colors.textMuted,
                }}
              >
                Payment
              </p>
              <div className="mt-1">
                <PaymentBadge method={expense.paymentMethod} />
              </div>
            </div>
          </div>

          {expense.reference && (
            <div>
              <p
                style={{
                  fontFamily: INTER,
                  fontSize: 11,
                  color: colors.textMuted,
                }}
              >
                Reference
              </p>
              <p
                style={{
                  fontFamily: INTER,
                  fontSize: 13,
                  color: colors.textSecondary,
                  marginTop: 2,
                }}
              >
                {expense.reference}
              </p>
            </div>
          )}

          {expense.notes && (
            <div>
              <p
                style={{
                  fontFamily: INTER,
                  fontSize: 11,
                  color: colors.textMuted,
                }}
              >
                Notes
              </p>
              <p
                style={{
                  fontFamily: INTER,
                  fontSize: 13,
                  color: colors.textSecondary,
                  marginTop: 2,
                }}
              >
                {expense.notes}
              </p>
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <Button variant="outline" size="sm" fullWidth onClick={onEdit}>
              Edit
            </Button>
            <Button variant="danger" size="sm" fullWidth onClick={onDelete}>
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
