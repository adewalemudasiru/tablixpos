import type { Transaction } from "../../services/storage"
import { colors } from "../ds/tokens"
import { Modal } from "../ds/Modal"
import { fmtAmt, fmtDate, fmtTime } from "@/utils/settlements-helpers"
import { Button } from "../ds/Button"

const INTER = "'Inter', sans-serif"

export function AdjustmentDetailModal({
  tx,
  open,
  onClose,
}: {
  tx: Transaction | null
  open: boolean
  onClose: () => void
}) {
  if (!tx) return null
  const isRefund = tx.status === "refunded"
  const accent = isRefund ? "#d97706" : "#e91835"
  const bg = isRefund ? "#fffbeb" : "#fff1f2"
  const border = isRefund ? "#fcd34d" : "#fbd2cf"

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Adjustment Detail"
      size="md"
      showClose
      closeOnBackdrop
    >
      <div style={{ fontFamily: INTER }}>
        {/* Type badge */}
        <div
          className="mb-4 flex items-center gap-2 rounded-xl px-3 py-2.5"
          style={{ background: bg, border: `1px solid ${border}` }}
        >
          <span
            className="flex size-7 shrink-0 items-center justify-center rounded-lg"
            style={{ background: accent + "20" }}
          >
            {isRefund ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  stroke={accent}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke={accent}
                  strokeWidth="2"
                />
                <path
                  d="M15 9l-6 6M9 9l6 6"
                  stroke={accent}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </span>
          <div>
            <p style={{ fontWeight: 700, fontSize: 13, color: accent }}>
              Transaction {isRefund ? "Refunded" : "Voided"}
            </p>
            <p style={{ fontSize: 11, color: accent + "cc", marginTop: 1 }}>
              ID: {tx.id}
            </p>
          </div>
        </div>

        {/* Audit trail */}
        <div
          className="mb-4 rounded-xl p-3"
          style={{
            background: "var(--page-surface-2)",
            border: "1px solid var(--page-border)",
          }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: colors.textMuted,
              marginBottom: 8,
            }}
          >
            Audit Trail
          </p>
          <div className="flex flex-col gap-2">
            {[
              [
                "Original Sale",
                fmtDate(tx.timestamp) + " at " + fmtTime(tx.timestamp),
              ],
              ["Cashier / Raised", tx.cashier || "Staff"],
              [
                "Action Applied",
                tx.voidedAt
                  ? fmtDate(tx.voidedAt) + " at " + fmtTime(tx.voidedAt)
                  : "—",
              ],
              ["Approved By", tx.voidedBy || "—"],
              ["Payment Method", tx.paymentMethod],
              ["Customer", tx.customer?.name || "Walk-in"],
            ].map(([label, val]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4"
              >
                <span style={{ fontSize: 12, color: colors.textMuted }}>
                  {label}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: colors.textPrimary,
                    textAlign: "right",
                  }}
                >
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Items */}
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: colors.textMuted,
            marginBottom: 8,
          }}
        >
          Items ({tx.items.reduce((s, i) => s + i.qty, 0)})
        </p>
        <div className="mb-4 flex flex-col gap-2">
          {tx.items.map((item, i) => {
            const unit = item.qty > 0 ? item.price / item.qty : item.price
            return (
              <div key={i} className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="flex size-5 shrink-0 items-center justify-center rounded-md"
                    style={{
                      background: "var(--c-primary-light)",
                      fontSize: 10,
                      fontWeight: 700,
                      color: colors.primary,
                    }}
                  >
                    {item.qty}
                  </span>
                  <div className="min-w-0">
                    <p
                      style={{ fontSize: 13, color: colors.textSecondary }}
                      className="truncate"
                    >
                      {item.name}
                    </p>
                    <p style={{ fontSize: 10, color: colors.textMuted }}>
                      {fmtAmt(unit)} each
                    </p>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: colors.textPrimary,
                    flexShrink: 0,
                  }}
                >
                  {fmtAmt(item.price)}
                </span>
              </div>
            )
          })}
        </div>

        <div className="my-3 border-t border-dashed border-gray-200" />

        {/* Totals */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span style={{ fontSize: 13, color: colors.textMuted }}>
              Subtotal
            </span>
            <span style={{ fontSize: 13, color: colors.textSecondary }}>
              {fmtAmt(tx.subtotal)}
            </span>
          </div>
          {tx.vat > 0 && (
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 13, color: colors.textMuted }}>
                {tx.taxLabel ?? "VAT"} ({tx.taxRate ?? 7.5}%)
              </span>
              <span style={{ fontSize: 13, color: colors.textSecondary }}>
                {fmtAmt(tx.vat)}
              </span>
            </div>
          )}
          {tx.serviceCharge && tx.serviceCharge > 0 && (
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 13, color: colors.textMuted }}>
                Service Charge
              </span>
              <span style={{ fontSize: 13, color: colors.textSecondary }}>
                {fmtAmt(tx.serviceCharge)}
              </span>
            </div>
          )}
          <div className="mt-1 flex items-center justify-between border-t border-gray-100 pt-2">
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: colors.textPrimary,
              }}
            >
              {isRefund ? "Amount Refunded" : "Amount Voided"}
            </span>
            <span style={{ fontSize: 16, fontWeight: 700, color: accent }}>
              {fmtAmt(tx.total)}
            </span>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  )
}
