// components/CustomerModal.tsx
import React, { useState } from "react"
import { Modal } from "@/components/modals/Modal"
import { Input } from "../ds/Input"

export interface CustomerForm {
  name: string
  phone: string
  email: string
}

interface CustomerModalProps {
  open: boolean
  onClose: () => void
  onSave: (form: CustomerForm) => void
  editCustomer: Customer | null
}

// You'll need to import the Customer type from your store
import type { StoreCustomer as Customer } from "../../store/AppContext"

const EMPTY_FORM: CustomerForm = { name: "", phone: "", email: "" }

export function CustomerModal({
  open,
  onClose,
  onSave,
  editCustomer,
}: CustomerModalProps) {
  const [form, setForm] = useState<CustomerForm>(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<CustomerForm>>({})

  // Reset form when modal opens with edit customer
  React.useEffect(() => {
    if (open && editCustomer) {
      setForm({
        name: editCustomer.name,
        phone: editCustomer.phone,
        email: editCustomer.email,
      })
    } else if (open && !editCustomer) {
      setForm(EMPTY_FORM)
    }
  }, [open, editCustomer])

  const set = (k: keyof CustomerForm, v: string) => {
    setForm((p) => ({ ...p, [k]: v }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: "" }))
  }

  const validate = () => {
    const e: Partial<CustomerForm> = {}
    if (!form.name.trim()) e.name = "Name is required"
    if (!form.phone.trim()) e.phone = "Phone number is required"
    setErrors(e)
    return !Object.values(e).some(Boolean)
  }

  const handleClose = () => {
    setForm(EMPTY_FORM)
    setErrors({})
    onClose()
  }

  const handleSubmit = () => {
    if (validate()) {
      onSave(form)
      handleClose()
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={editCustomer ? "Edit Customer" : "Add New Customer"}
      subtitle={
        editCustomer
          ? "Update customer information"
          : "Add a new customer to your records"
      }
      size="sm"
      layout="standard"
      actions={[
        { label: "Cancel", variant: "outline", onClick: handleClose },
        {
          label: editCustomer ? "Save Changes" : "Add Customer",
          variant: "primary",
          onClick: handleSubmit,
        },
      ]}
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Full Name"
          placeholder="e.g. Adaeze Okonkwo"
          value={form.name}
          error={errors.name}
          autoFocus
          onChange={(e) => set("name", e.target.value)}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Enter") handleSubmit()
          }}
        />
        <Input
          label="Phone Number"
          placeholder="+234 800 000 0000"
          value={form.phone}
          error={errors.phone}
          onChange={(e) => set("phone", e.target.value)}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Enter") handleSubmit()
          }}
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="customer@email.com"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Enter") handleSubmit()
          }}
        />
      </div>
    </Modal>
  )
}
