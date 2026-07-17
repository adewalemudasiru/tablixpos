// components/inventory/modals/AddSupplierModal.tsx
import { useState } from "react"
import { Modal } from "../ds/Modal"
import { colors } from "../ds/tokens"
import { radius } from "../ds/tokens"
import { shadows } from "../ds"

const INTER = "'Inter', sans-serif"

export interface AddSupplierForm {
  name: string
  contactPerson: string
  phone: string
  email: string
  address: string
  itemsSupplied: string
}

const EMPTY_SUPPLIER_FORM: AddSupplierForm = {
  name: "",
  contactPerson: "",
  phone: "",
  email: "",
  address: "",
  itemsSupplied: "",
}

const SUPPLIER_FIELD_DEFS: {
  key: keyof AddSupplierForm
  label: string
  placeholder: string
  type?: string
}[] = [
  {
    key: "name",
    label: "Supplier Name",
    placeholder: "e.g. Lagos Food Supplies",
  },
  {
    key: "contactPerson",
    label: "Contact Person",
    placeholder: "e.g. Emeka Okafor",
  },
  {
    key: "phone",
    label: "Phone Number",
    placeholder: "e.g. +234 801 234 5678",
  },
  {
    key: "email",
    label: "Email Address",
    placeholder: "e.g. contact@supplier.ng",
    type: "email",
  },
  {
    key: "address",
    label: "Address",
    placeholder: "e.g. 123 Food Street, Lagos",
  },
  {
    key: "itemsSupplied",
    label: "Items Supplied",
    placeholder: "e.g. Rice, Flour, Palm Oil",
  },
]

interface AddSupplierModalProps {
  open: boolean
  onClose: () => void
  onAdd: (supplier: AddSupplierForm) => void
}

export function AddSupplierModal({
  open,
  onClose,
  onAdd,
}: AddSupplierModalProps) {
  const [form, setForm] = useState<AddSupplierForm>(EMPTY_SUPPLIER_FORM)
  const [errors, setErrors] = useState<Partial<AddSupplierForm>>({})

  const set = (k: keyof AddSupplierForm, v: string) => {
    setForm((p) => ({ ...p, [k]: v }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }))
  }

  const validate = () => {
    const e: Partial<AddSupplierForm> = {}
    if (!form.name.trim()) e.name = "Supplier name is required"
    if (!form.contactPerson.trim())
      e.contactPerson = "Contact person is required"
    if (!form.phone.trim()) e.phone = "Phone number is required"
    if (!form.email.trim()) e.email = "Email is required"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    onAdd(form)
    setForm(EMPTY_SUPPLIER_FORM)
    setErrors({})
    onClose()
  }

  const handleClose = () => {
    setForm(EMPTY_SUPPLIER_FORM)
    setErrors({})
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Add New Supplier"
      subtitle="Register a new supplier for your inventory"
      layout="standard"
      size="md"
      actions={[
        { label: "Cancel", variant: "outline", onClick: handleClose },
        { label: "Add Supplier", variant: "primary", onClick: handleSubmit },
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
                  lineHeight: "20px",
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
                  color: errors[key] ? colors.primary : colors.textPrimary,
                  border: `1px solid ${errors[key] ? colors.primary : colors.border}`,
                  borderRadius: radius.md,
                  padding: "10px 14px",
                  lineHeight: "24px",
                  boxShadow: shadows.sm,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = colors.primary
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = errors[key]
                    ? colors.primary
                    : colors.border
                }}
              />
              {errors[key] && (
                <p
                  style={{
                    fontFamily: INTER,
                    fontSize: 11,
                    color: colors.primary,
                  }}
                >
                  {errors[key]}
                </p>
              )}
            </div>
          )
        )}
      </div>
    </Modal>
  )
}
