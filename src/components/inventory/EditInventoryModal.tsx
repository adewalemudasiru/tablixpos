// components/inventory/modals/EditInventoryModal.tsx
import React, { useState, useEffect } from "react"
import { Modal } from "../ds/Modal"
import { colors } from "../ds/tokens"
import { radius } from "../ds/tokens"
import { shadows } from "../ds"
import type { InventoryItem } from "../../store/AppContext"
import type { AddItemForm } from "./AddInventoryModal"

const INTER = "'Inter', sans-serif"
const NGN = "\u20a6"

const EMPTY_ITEM_FORM: AddItemForm = {
  name: "",
  unit: "",
  minStock: "",
  initQty: "0",
  unitCost: "",
  supplier: "",
}

interface EditInventoryModalProps {
  open: boolean
  item: InventoryItem | null
  onClose: () => void
  onSave: (id: string, form: AddItemForm) => void
}

export function EditInventoryModal({
  open,
  item,
  onClose,
  onSave,
}: EditInventoryModalProps) {
  const [form, setForm] = useState<AddItemForm>(EMPTY_ITEM_FORM)

  useEffect(() => {
    if (item) {
      setForm({
        name: item.name,
        unit: item.unit,
        minStock: String(item.minQty),
        initQty: String(item.qty),
        unitCost: String(item.costPerUnit),
        supplier: item.supplier === "-" ? "" : item.supplier,
      })
    }
  }, [item])

  if (!item) return null

  const set = <K extends keyof AddItemForm>(k: K, v: string) => {
    setForm((p) => ({ ...p, [k]: v }))
  }

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

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Ingredient"
      subtitle={`Updating: ${item.name}`}
      layout="standard"
      size="md"
      actions={[
        { label: "Cancel", variant: "outline", onClick: onClose },
        {
          label: "Save Changes",
          variant: "primary",
          onClick: () => {
            onSave(item.id, form)
            onClose()
          },
        },
      ]}
    >
      <div className="flex flex-col gap-4">
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
              Name
            </label>
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              style={fieldStyle()}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = colors.primary
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = colors.border
              }}
            />
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
              Unit
            </label>
            <select
              value={form.unit}
              onChange={(e) => set("unit", e.target.value)}
              style={fieldStyle()}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = colors.primary
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = colors.border
              }}
            >
              {[
                "kg",
                "g",
                "L",
                "cl",
                "ml",
                "pcs",
                "bag",
                "crate",
                "tin",
                "bottle",
                "dozen",
              ].map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>

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
              Current Stock
            </label>
            <input
              type="number"
              min="0"
              value={form.initQty}
              onChange={(e) => set("initQty", e.target.value)}
              style={fieldStyle()}
            />
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
              Min Stock
            </label>
            <input
              type="number"
              min="0"
              value={form.minStock}
              onChange={(e) => set("minStock", e.target.value)}
              style={fieldStyle()}
            />
          </div>
        </div>

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
              Cost per {form.unit} ({NGN})
            </label>
            <input
              type="number"
              min="0"
              value={form.unitCost}
              onChange={(e) => set("unitCost", e.target.value)}
              style={fieldStyle()}
            />
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
              Supplier
            </label>
            <input
              value={form.supplier}
              onChange={(e) => set("supplier", e.target.value)}
              style={fieldStyle()}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}
