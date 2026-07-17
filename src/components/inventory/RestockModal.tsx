// components/inventory/modals/RestockModal.tsx
import React, { useState, useEffect } from "react"
import { Modal } from "../ds/Modal"
import { colors } from "../ds/tokens"
import { radius } from "../ds/tokens"
import { shadows } from "../ds"
import { Badge } from "../ds/Badge"
import type { InventoryItem } from "../../store/AppContext"
import { fmtStock } from "@/utils/inventory-helpers"

const INTER = "'Inter', sans-serif"

interface RestockModalProps {
  open: boolean
  item: InventoryItem | null
  onClose: () => void
  onRestock: (id: string, qty: number, note: string) => void
}

export function RestockModal({
  open,
  item,
  onClose,
  onRestock,
}: RestockModalProps) {
  const [qty, setQty] = useState("")
  const [note, setNote] = useState("")

  useEffect(() => {
    if (!open) {
      setQty("")
      setNote("")
    }
  }, [open])

  if (!item) return null

  const fieldStyle = (): React.CSSProperties => ({
    fontFamily: INTER,
    fontSize: 14,
    color: colors.textPrimary,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.md,
    padding: "10px 14px",
    lineHeight: "24px",
    boxShadow: shadows.sm,
    background: "var(--page-input-bg, #f3f4f6)",
    width: "100%",
    outline: "none",
  })

  const qtyNum = parseFloat(qty) || 0
  const statusVariant =
    item.status === "Active"
      ? "success"
      : item.status === "Low Stock"
        ? "warning"
        : "danger"

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Restock Ingredient"
      subtitle={`Add stock for: ${item.name}`}
      layout="standard"
      size="sm"
      actions={[
        { label: "Cancel", variant: "outline", onClick: onClose },
        {
          label: "Add Stock",
          variant: "primary",
          onClick: () => {
            const n = parseFloat(qty)
            if (n > 0) {
              onRestock(item.id, n, note)
              onClose()
            }
          },
        },
      ]}
    >
      <div className="flex flex-col gap-4">
        <div
          className="flex items-center justify-between rounded-xl px-4 py-3"
          style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}
        >
          <div>
            <p
              style={{
                fontFamily: INTER,
                fontWeight: 600,
                fontSize: 13,
                color: "#111827",
              }}
            >
              {item.name}
            </p>
            <p style={{ fontFamily: INTER, fontSize: 12, color: "#6b7280" }}>
              Current: {fmtStock(item.qty, item.unit)} | Min:{" "}
              {fmtStock(item.minQty, item.unit)}
            </p>
          </div>
          <Badge variant={statusVariant}>{item.status}</Badge>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            style={{
              fontFamily: INTER,
              fontWeight: 500,
              fontSize: 14,
              color: colors.textPrimary,
            }}
          >
            Quantity to Add ({item.unit}) *
          </label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder={`e.g. 20 ${item.unit}`}
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            style={fieldStyle()}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = colors.primary
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = colors.border
            }}
          />
          {qty && qtyNum > 0 && (
            <p style={{ fontFamily: INTER, fontSize: 12, color: "#059669" }}>
              New stock: {fmtStock(item.qty + qtyNum, item.unit)}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            style={{
              fontFamily: INTER,
              fontWeight: 500,
              fontSize: 14,
              color: colors.textPrimary,
            }}
          >
            Note / Delivery Reference
          </label>
          <input
            placeholder="e.g. Weekly delivery from supplier"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={fieldStyle()}
          />
        </div>
      </div>
    </Modal>
  )
}
