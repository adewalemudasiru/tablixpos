// components/inventory/modals/EditSupplierModal.tsx
import { useState, useEffect } from "react"
import { Modal } from "../ds/Modal"
import { colors } from "../ds/tokens"
import { radius } from "../ds/tokens"
import { shadows } from "../ds"
import type { Supplier } from "../../store/AppContext"
import type { AddSupplierForm } from "./AddSupplierModal"
import { SUPPLIER_FIELD_DEFS } from "@/constants/inventory"

const INTER = "'Inter', sans-serif"

const EMPTY_SUPPLIER_FORM: AddSupplierForm = {
  name: "",
  contactPerson: "",
  phone: "",
  email: "",
  address: "",
  itemsSupplied: "",
}

interface EditSupplierModalProps {
  open: boolean
  supplier: Supplier | null
  onClose: () => void
  onSave: (id: string, form: AddSupplierForm) => void
}

export function EditSupplierModal({
  open,
  supplier,
  onClose,
  onSave,
}: EditSupplierModalProps) {
  const [form, setForm] = useState<AddSupplierForm>(EMPTY_SUPPLIER_FORM)

  useEffect(() => {
    if (supplier) {
      setForm({
        name: supplier.name,
        contactPerson: supplier.contactPerson,
        phone: supplier.phone,
        email: supplier.email,
        address: supplier.address || "",
        itemsSupplied: supplier.itemsSupplied,
      })
    }
  }, [supplier])

  if (!supplier) return null

  const set = (k: keyof AddSupplierForm, v: string) => {
    setForm((p) => ({ ...p, [k]: v }))
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Supplier"
      subtitle={`Updating: ${supplier.name}`}
      layout="standard"
      size="md"
      actions={[
        { label: "Cancel", variant: "outline", onClick: onClose },
        {
          label: "Save Changes",
          variant: "primary",
          onClick: () => {
            onSave(supplier.id, form)
            onClose()
          },
        },
      ]}
    >
      <div className="flex flex-col gap-4">
        {SUPPLIER_FIELD_DEFS.map(
          ({ key, label, placeholder, type = "text" }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <label
                style={{
                  fontFamily: INTER,
                  fontWeight: 500,
                  fontSize: 14,
                  color: colors.textPrimary,
                }}
              >
                {label}
              </label>
              <input
                type={type}
                placeholder={placeholder}
                value={form[key]}
                onChange={(e) => set(key, e.target.value)}
                className="w-full bg-transparent outline-none"
                style={{
                  fontFamily: INTER,
                  fontSize: 14,
                  color: colors.textPrimary,
                  border: `1px solid ${colors.border}`,
                  borderRadius: radius.md,
                  padding: "10px 14px",
                  lineHeight: "24px",
                  boxShadow: shadows.sm,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = colors.primary
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = colors.border
                }}
              />
            </div>
          )
        )}
      </div>
    </Modal>
  )
}
