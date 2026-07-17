// components/inventory/modals/AddInventoryModal.tsx
import React, { useState } from "react"
import { Modal } from "../ds/Modal"
import { colors } from "../ds/tokens"
import { radius } from "../ds/tokens"
import { shadows } from "../ds"

const INTER = "'Inter', sans-serif"
const NGN = "\u20a6"

export interface AddItemForm {
  name: string
  unit: string
  minStock: string
  initQty: string
  unitCost: string
  supplier: string
}

const EMPTY_ITEM_FORM: AddItemForm = {
  name: "",
  unit: "",
  minStock: "",
  initQty: "0",
  unitCost: "",
  supplier: "",
}

const COMMON_UNITS = [
  "bag",
  "kg",
  "g",
  "L",
  "cl",
  "ml",
  "pcs",
  "crate",
  "tin",
  "bottle",
  "dozen",
  "pack",
  "carton",
  "sachet",
]

interface AddInventoryModalProps {
  open: boolean
  onClose: () => void
  onAdd: (item: AddItemForm) => void
}

export function AddInventoryModal({
  open,
  onClose,
  onAdd,
}: AddInventoryModalProps) {
  const [form, setForm] = useState<AddItemForm>(EMPTY_ITEM_FORM)
  const [errors, setErrors] = useState<
    Partial<Record<keyof AddItemForm, string>>
  >({})

  const set = <K extends keyof AddItemForm>(k: K, v: string) => {
    setForm((p) => ({ ...p, [k]: v }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }))
  }

  const validate = () => {
    const e: Partial<Record<keyof AddItemForm, string>> = {}
    if (!form.name.trim()) e.name = "Item name is required"
    if (!form.unit.trim()) e.unit = "Unit is required"
    if (!form.unitCost.trim()) e.unitCost = "Cost per unit is required"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    onAdd(form)
    setForm(EMPTY_ITEM_FORM)
    setErrors({})
    onClose()
  }

  const handleClose = () => {
    setForm(EMPTY_ITEM_FORM)
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
      title="Add New Ingredient"
      subtitle="Track a raw ingredient or supply item"
      layout="standard"
      size="md"
      actions={[
        { label: "Cancel", variant: "outline", onClick: handleClose },
        { label: "Add Ingredient", variant: "primary", onClick: handleSubmit },
      ]}
    >
      <div className="flex flex-col gap-4">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label
            style={{
              fontFamily: INTER,
              fontWeight: 500,
              fontSize: 14,
              color: colors.textPrimary,
            }}
          >
            Ingredient Name *
          </label>
          <input
            placeholder="e.g. Rice, Chicken, Palm Oil"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            style={fieldStyle(errors.name)}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = colors.primary
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = errors.name
                ? colors.primary
                : colors.border
            }}
          />
          {errors.name && (
            <p
              style={{ fontFamily: INTER, fontSize: 11, color: colors.primary }}
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Unit + Init Qty */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label
              style={{
                fontFamily: INTER,
                fontWeight: 500,
                fontSize: 14,
                color: colors.textPrimary,
              }}
            >
              Unit of Measure *
            </label>
            <select
              value={form.unit}
              onChange={(e) => set("unit", e.target.value)}
              style={fieldStyle(errors.unit)}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = colors.primary
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = errors.unit
                  ? colors.primary
                  : colors.border
              }}
            >
              <option value="">Select unit...</option>
              {COMMON_UNITS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
            {errors.unit && (
              <p
                style={{
                  fontFamily: INTER,
                  fontSize: 11,
                  color: colors.primary,
                }}
              >
                {errors.unit}
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
              Current Stock ({form.unit || "unit"})
            </label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={form.initQty}
              onChange={(e) => set("initQty", e.target.value)}
              style={fieldStyle()}
            />
          </div>
        </div>

        {/* Min stock + Cost */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label
              style={{
                fontFamily: INTER,
                fontWeight: 500,
                fontSize: 14,
                color: colors.textPrimary,
              }}
            >
              Min Stock Threshold{" "}
              <span style={{ fontWeight: 400, color: "#9ca3af" }}>
                (optional)
              </span>
            </label>
            <input
              type="number"
              min="0"
              placeholder="e.g. 0"
              value={form.minStock}
              onChange={(e) => set("minStock", e.target.value)}
              style={fieldStyle(errors.minStock)}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = colors.primary
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = errors.minStock
                  ? colors.primary
                  : colors.border
              }}
            />
            {errors.minStock && (
              <p
                style={{
                  fontFamily: INTER,
                  fontSize: 11,
                  color: colors.primary,
                }}
              >
                {errors.minStock}
              </p>
            )}
            <p style={{ fontFamily: INTER, fontSize: 11, color: "#9ca3af" }}>
              Alert when stock falls below this level (0 = no alert)
            </p>
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
              Cost per {form.unit || "unit"} ({NGN}) *
            </label>
            <input
              type="number"
              min="0"
              placeholder="e.g. 800"
              value={form.unitCost}
              onChange={(e) => set("unitCost", e.target.value)}
              style={fieldStyle(errors.unitCost)}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = colors.primary
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = errors.unitCost
                  ? colors.primary
                  : colors.border
              }}
            />
            {errors.unitCost && (
              <p
                style={{
                  fontFamily: INTER,
                  fontSize: 11,
                  color: colors.primary,
                }}
              >
                {errors.unitCost}
              </p>
            )}
          </div>
        </div>

        {/* Supplier */}
        <div className="flex flex-col gap-1.5">
          <label
            style={{
              fontFamily: INTER,
              fontWeight: 500,
              fontSize: 14,
              color: colors.textPrimary,
            }}
          >
            Supplier (optional)
          </label>
          <input
            placeholder="e.g. Lagos Food Supplies"
            value={form.supplier}
            onChange={(e) => set("supplier", e.target.value)}
            style={fieldStyle()}
          />
        </div>

        {/* Info box */}
        <div
          className="flex items-start gap-2 rounded-xl px-3 py-2.5"
          style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            className="mt-0.5 shrink-0"
          >
            <circle cx="12" cy="12" r="10" stroke="#2563eb" strokeWidth="2" />
            <path
              d="M12 8v4m0 4h.01"
              stroke="#2563eb"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <p
            style={{
              fontFamily: INTER,
              fontSize: 12,
              color: "#1e40af",
              lineHeight: "18px",
            }}
          >
            After adding, link this ingredient to menu items via the{" "}
            <strong>Menu</strong> page so stock reduces automatically when
            dishes are sold.
          </p>
        </div>
      </div>
    </Modal>
  )
}
