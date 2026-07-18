import React from "react"
import { Modal } from "../ds/Modal"
import { Button, colors } from "../ds"

const INTER = "'Inter', sans-serif"
const NGN = "\u20a6"

export function ReceiptModal({
  tx,
  open,
  onClose,
}: {
  tx: any
  open: boolean
  onClose: () => void
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
  const totalItems = tx.items.reduce((s: number, i: any) => s + i.qty, 0)

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
                  color: "var(--page-text-muted)",
                  marginBottom: 2,
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--page-text)",
                }}
              >
                {val}
              </p>
            </div>
          ))}
        </div>

        <div className="my-3 border-t border-dashed border-gray-200" />

        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "var(--page-text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 8,
          }}
        >
          Items Ordered ({totalItems})
        </p>
        <div className="mb-4 flex flex-col gap-2">
          {tx.items.map((item: any, i: number) => {
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
                        style={{
                          fontSize: 13,
                          color: "var(--page-text-secondary)",
                        }}
                        className="truncate"
                      >
                        {item.name}
                      </p>
                      <p
                        style={{
                          fontSize: 10,
                          color: "var(--page-text-muted)",
                        }}
                      >
                        {NGN}
                        {unitPrice.toLocaleString()} each
                      </p>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--page-text)",
                      flexShrink: 0,
                    }}
                  >
                    {NGN}
                    {item.price.toLocaleString()}
                  </span>
                </div>
              </React.Fragment>
            )
          })}
        </div>

        <div className="my-3 border-t border-dashed border-gray-200" />

        <div className="flex flex-col gap-1.5">
          <div className="mt-1 flex items-center justify-between border-t border-gray-100 pt-2">
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "var(--page-text)",
              }}
            >
              Total
            </span>
            <span
              style={{ fontSize: 16, fontWeight: 700, color: colors.primary }}
            >
              {NGN}
              {tx.total.toLocaleString()}
            </span>
          </div>
          {tx.changeAmount && tx.changeAmount > 0 ? (
            <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2">
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--page-text-muted)",
                }}
              >
                Change
              </span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#16a34a" }}>
                {NGN}
                {tx.changeAmount.toLocaleString()}
              </span>
            </div>
          ) : null}
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
