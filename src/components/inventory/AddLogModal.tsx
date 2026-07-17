// components/inventory/modals/AddLogModal.tsx
import React, { useState } from "react"
import { Modal } from "../ds/Modal"
import { colors } from "../ds/tokens"
import { radius } from "../ds/tokens"
import { shadows } from "../ds"
import type { InventoryItem } from "../../store/AppContext"
import { fmtStock } from "@/utils/inventory-helpers"

const INTER = "'Inter', sans-serif"

export type LogType =
  "Stock In" | "Stock Out" | "Adjustment" | "Wastage" | "Transfer"

export interface AddLogForm {
  itemId: string
  type: LogType
  quantity: string
  performedBy: string
  note: string
}

const EMPTY_LOG_FORM: AddLogForm = {
  itemId: "",
  type: "Stock In",
  quantity: "",
  performedBy: "",
  note: "",
}

const LOG_TYPES: LogType[] = [
  "Stock In",
  "Stock Out",
  "Adjustment",
  "Wastage",
  "Transfer",
]

const LOG_TYPE_CONFIG: Record<
  LogType,
  { border: string; bg: string; text: string }
> = {
  "Stock In": { border: "#059669", bg: "#dcfce7", text: "#059669" },
  "Stock Out": { border: "#e91835", bg: "#fee2e5", text: "#e91835" },
  Adjustment: { border: "#1d4ed8", bg: "#dbeafe", text: "#1d4ed8" },
  Wastage: { border: "#b45309", bg: "#fef9c3", text: "#b45309" },
  Transfer: { border: "#7c3aed", bg: "#f3e8ff", text: "#7c3aed" },
}

interface AddLogModalProps {
  open: boolean
  onClose: () => void
  onAdd: (entry: AddLogForm) => void
  items: InventoryItem[]
}

export function AddLogModal({ open, onClose, onAdd, items }: AddLogModalProps) {
  const [form, setForm] = useState<AddLogForm>(EMPTY_LOG_FORM)
  const [errors, setErrors] = useState<
    Partial<Record<keyof AddLogForm, string>>
  >({})

  const set = <K extends keyof AddLogForm>(k: K, v: AddLogForm[K]) => {
    setForm((p) => ({ ...p, [k]: v }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }))
  }

  const selectedItem = items.find((i) => i.id === form.itemId)
  const isAdditive = form.type === "Stock In" || form.type === "Adjustment"
  const qtyNum = parseFloat(form.quantity) || 0
  const newQty = selectedItem
    ? isAdditive
      ? selectedItem.qty + qtyNum
      : Math.max(0, selectedItem.qty - qtyNum)
    : null

  const validate = () => {
    const e: Partial<Record<keyof AddLogForm, string>> = {}
    if (!form.itemId) e.itemId = "Select an ingredient"
    if (!form.quantity.trim()) e.quantity = "Quantity is required"
    if (!form.performedBy.trim()) e.performedBy = "Staff name is required"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    onAdd(form)
    setForm(EMPTY_LOG_FORM)
    setErrors({})
    onClose()
  }

  const handleClose = () => {
    setForm(EMPTY_LOG_FORM)
    setErrors({})
    onClose()
  }

  const fieldStyle = (err?: string): React.CSSProperties => ({
    fontFamily: INTER,
    fontSize: 14,
    color: colors.textPrimary,
    border: `1px solid ${err ? colors.primary : colors.border}`,
    borderRadius: radius.md,
    padding: "10px 14px",
    lineHeight: "24px",
    boxShadow: shadows.sm,
    background: "var(--page-input-bg, #f3f4f6)",
    width: "100%",
    outline: "none",
  })

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Record Stock Movement"
      subtitle="Manually log stock changes or adjustments"
      layout="standard"
      size="md"
      actions={[
        { label: "Cancel", variant: "outline", onClick: handleClose },
        { label: "Record Movement", variant: "primary", onClick: handleSubmit },
      ]}
    >
      <div className="flex flex-col gap-4">
        {/* Item select */}
        <div className="flex flex-col gap-1.5">
          <label
            style={{
              fontFamily: INTER,
              fontWeight: 500,
              fontSize: 14,
              color: colors.textPrimary,
            }}
          >
            Ingredient <span style={{ color: colors.primary }}>*</span>
          </label>
          <select
            value={form.itemId}
            onChange={(e) => set("itemId", e.target.value)}
            style={fieldStyle(errors.itemId)}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = colors.primary
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = errors.itemId
                ? colors.primary
                : colors.border
            }}
          >
            <option value="">Select ingredient...</option>
            {items.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name} (Current: {fmtStock(i.qty, i.unit)})
              </option>
            ))}
          </select>
          {errors.itemId && (
            <p
              style={{ fontFamily: INTER, fontSize: 11, color: colors.primary }}
            >
              {errors.itemId}
            </p>
          )}
        </div>

        {/* Movement type */}
        <div className="flex flex-col gap-1.5">
          <label
            style={{
              fontFamily: INTER,
              fontWeight: 500,
              fontSize: 14,
              color: colors.textPrimary,
            }}
          >
            Movement Type *
          </label>
          <div className="flex flex-wrap gap-2">
            {LOG_TYPES.map((t) => {
              const active = form.type === t
              const c = LOG_TYPE_CONFIG[t]
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => set("type", t)}
                  style={{
                    fontFamily: INTER,
                    fontWeight: 500,
                    fontSize: 12,
                    border: `1.5px solid ${c.border}`,
                    background: active ? c.border : "white",
                    color: active ? "white" : c.text,
                    borderRadius: 20,
                    padding: "5px 14px",
                    cursor: "pointer",
                    transition: "all .15s",
                  }}
                >
                  {t}
                </button>
              )
            })}
          </div>
        </div>

        {/* Quantity + preview */}
        <div className="flex flex-col gap-1.5">
          <label
            style={{
              fontFamily: INTER,
              fontWeight: 500,
              fontSize: 14,
              color: colors.textPrimary,
            }}
          >
            Quantity ({selectedItem?.unit || "unit"}) *
          </label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder="e.g. 20"
            value={form.quantity}
            onChange={(e) => set("quantity", e.target.value)}
            style={fieldStyle(errors.quantity)}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = colors.primary
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = errors.quantity
                ? colors.primary
                : colors.border
            }}
          />
          {errors.quantity && (
            <p
              style={{ fontFamily: INTER, fontSize: 11, color: colors.primary }}
            >
              {errors.quantity}
            </p>
          )}
          {selectedItem && qtyNum > 0 && newQty !== null && (
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-2"
              style={{
                background: isAdditive ? "#f0fdf4" : "#fff1f2",
                border: `1px solid ${isAdditive ? "#bbf7d0" : "#fecdd3"}`,
              }}
            >
              <span
                style={{ fontFamily: INTER, fontSize: 12, color: "#6b7280" }}
              >
                {fmtStock(selectedItem.qty, selectedItem.unit)}
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="#9ca3af"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span
                style={{
                  fontFamily: INTER,
                  fontSize: 12,
                  fontWeight: 600,
                  color: isAdditive ? "#059669" : "#e91835",
                }}
              >
                {fmtStock(newQty, selectedItem.unit)}
              </span>
            </div>
          )}
        </div>

        {/* Performed by */}
        <div className="flex flex-col gap-1.5">
          <label
            style={{
              fontFamily: INTER,
              fontWeight: 500,
              fontSize: 14,
              color: colors.textPrimary,
            }}
          >
            Performed By *
          </label>
          <input
            type="text"
            placeholder="Staff name"
            value={form.performedBy}
            onChange={(e) => set("performedBy", e.target.value)}
            style={fieldStyle(errors.performedBy)}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = colors.primary
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = errors.performedBy
                ? colors.primary
                : colors.border
            }}
          />
          {errors.performedBy && (
            <p
              style={{ fontFamily: INTER, fontSize: 11, color: colors.primary }}
            >
              {errors.performedBy}
            </p>
          )}
        </div>

        {/* Note */}
        <div className="flex flex-col gap-1.5">
          <label
            style={{
              fontFamily: INTER,
              fontWeight: 500,
              fontSize: 14,
              color: colors.textPrimary,
            }}
          >
            Note / Reason
          </label>
          <textarea
            placeholder="e.g. Morning kitchen prep, expired batch, supplier delivery..."
            value={form.note}
            onChange={(e) => set("note", e.target.value)}
            rows={3}
            style={{
              ...fieldStyle(),
              resize: "none",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = colors.primary
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = colors.border
            }}
          />
        </div>
      </div>
    </Modal>
  )
}
