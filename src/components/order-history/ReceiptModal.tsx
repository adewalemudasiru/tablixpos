import React from "react"
import type { Transaction } from "../../store/AppContext"
import { Button } from "../../components/ds/Button"
import { colors } from "../../components/ds/tokens"
import { Modal } from "../../components/ds/Modal"
import { buildThermalHtml } from "./BuildThermalHtml"

const INTER = "'Inter', sans-serif"
const NGN = "\u20a6"

// ─── Format helpers ───────────────────────────────────────────────────────────

function fmtAmt(n: number) {
  return `${NGN}${n.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function printReceipt(tx: Transaction, restaurantName: string) {
  const html = buildThermalHtml(tx, restaurantName)
  const iframe = document.createElement("iframe")
  iframe.style.cssText =
    "position:absolute;width:0;height:0;border:0;top:-9999px;left:-9999px"
  document.body.appendChild(iframe)
  const doc = iframe.contentWindow?.document
  if (!doc) return
  doc.open()
  doc.write(html)
  doc.close()
  iframe.contentWindow?.focus()
  setTimeout(() => {
    iframe.contentWindow?.print()
    setTimeout(() => {
      try {
        document.body.removeChild(iframe)
      } catch (_) {}
    }, 1500)
  }, 300)
}

export function ReceiptModal({
  tx,
  open,
  onClose,
  onVoidRequested,
  restaurantName,
}: {
  tx: Transaction | null
  open: boolean
  onClose: () => void
  onVoidRequested: (id: string, refund: boolean) => void
  restaurantName: string
}) {
  if (!tx) return null

  const now = new Date(tx.timestamp)
  const dateStr = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
  const timeStr = now.toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
  })
  const taxLabel = tx.taxLabel ?? "VAT"
  const taxRate = tx.taxRate != null ? tx.taxRate : 7.5
  const totalItems = tx.items.reduce((s, i) => s + i.qty, 0)
  const isVoided = tx.status === "voided" || tx.status === "refunded"

  const handlePrint = () => printReceipt(tx, restaurantName)

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Order Receipt"
      subtitle={tx.id}
      size="md"
      showClose
      closeOnBackdrop
    >
      <div style={{ fontFamily: INTER }}>
        {/* Void/Refund banner */}
        {isVoided && (
          <div
            className="mb-4 flex items-center gap-2 rounded-xl px-3 py-2"
            style={{
              background: tx.status === "refunded" ? "#fffbeb" : "#fff1f2",
              border: `1px solid ${tx.status === "refunded" ? "#fcd34d" : "#fbd2cf"}`,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                stroke={tx.status === "refunded" ? "#d97706" : "#e91835"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <p
                style={{
                  fontWeight: 700,
                  fontSize: 12,
                  color: tx.status === "refunded" ? "#92400e" : "#991b1b",
                }}
              >
                This transaction has been {tx.status}
              </p>
              {tx.voidedBy && (
                <p
                  style={{
                    fontSize: 11,
                    color: tx.status === "refunded" ? "#b45309" : "#b91c1c",
                    marginTop: 1,
                  }}
                >
                  Authorised by {tx.voidedBy}
                  {tx.voidedAt
                    ? " on " +
                      new Date(tx.voidedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : ""}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Meta */}
        <div className="mb-4 grid grid-cols-2 gap-x-4 gap-y-2">
          {[
            ["Date", dateStr],
            ["Time", timeStr],
            ["Customer", tx.customer?.name || "Walk-in Customer"],
            ["Cashier", tx.cashier || "Staff"],
            ["Payment Method", tx.paymentMethod],
            ...(tx.tableNo ? [["Table", tx.tableNo]] : []),
          ].map(([label, val]) => (
            <div key={label}>
              <p
                style={{
                  fontSize: 11,
                  color: colors.textMuted,
                  marginBottom: 2,
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: colors.textPrimary,
                }}
              >
                {val}
              </p>
            </div>
          ))}
        </div>

        <div className="my-3 border-t border-dashed border-gray-200" />

        {/* Items */}
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: colors.textMuted,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 8,
          }}
        >
          Items Ordered ({totalItems})
        </p>
        <div className="mb-4 flex flex-col gap-2">
          {tx.items.map((item, i) => {
            const unitPrice = item.qty > 0 ? item.price / item.qty : item.price
            return (
              <React.Fragment key={i}>
                <div className="flex items-center justify-between gap-2">
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
                        {fmtAmt(unitPrice)} each
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
                {/* Add-on sub-rows */}
                {(item.selectedAddons ?? []).map((sa) => {
                  const addonDisplayName =
                    (sa as { id: string; name?: string; qty: number }).name ||
                    sa.id
                  return (
                    <div
                      key={sa.id}
                      className="flex items-center justify-between pl-7"
                    >
                      <span style={{ fontSize: 11, color: colors.textMuted }}>
                        + {sa.qty > 1 ? `${sa.qty}\u00d7 ` : ""}
                        {addonDisplayName}
                      </span>
                    </div>
                  )
                })}
              </React.Fragment>
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

          {/* Discount */}
          {tx.discount && tx.discount.amount > 0 && (
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 13, color: "#16a34a" }}>
                Discount (
                {tx.discount.type === "percent"
                  ? `${tx.discount.value}%`
                  : "flat"}
                )
              </span>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#16a34a" }}>
                -{fmtAmt(tx.discount.amount)}
              </span>
            </div>
          )}

          {/* Tax */}
          {tx.vat > 0 && (
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 13, color: colors.textMuted }}>
                {taxLabel} ({taxRate}%{tx.taxInclusive ? " incl." : ""})
              </span>
              <span style={{ fontSize: 13, color: colors.textSecondary }}>
                {fmtAmt(tx.vat)}
              </span>
            </div>
          )}

          {/* Service Charge */}
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
              Total
            </span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: colors.primary,
                textDecoration: isVoided ? "line-through" : "none",
                opacity: isVoided ? 0.6 : 1,
              }}
            >
              {fmtAmt(tx.total)}
            </span>
          </div>

          {tx.changeAmount && tx.changeAmount > 0 ? (
            <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2">
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: colors.textMuted,
                }}
              >
                Change
              </span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#16a34a" }}>
                {fmtAmt(tx.changeAmount)}
              </span>
            </div>
          ) : null}
        </div>

        {/* Action buttons */}
        <div className="mt-5 flex flex-wrap justify-between gap-2">
          <div className="flex gap-2">
            {/* Void / Refund -- only for completed transactions */}
            {!isVoided && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onVoidRequested(tx.id, false)}
                  style={{ color: "#e91835", borderColor: "#fbd2cf" }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ marginRight: 4 }}
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M15 9l-6 6M9 9l6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Void
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onVoidRequested(tx.id, true)}
                  style={{ color: "#d97706", borderColor: "#fcd34d" }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ marginRight: 4 }}
                  >
                    <path
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Refund
                </Button>
              </>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" size="sm" onClick={handlePrint}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginRight: 4 }}
              >
                <path
                  d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="6"
                  y="14"
                  width="12"
                  height="8"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Print Receipt
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
