// components/expenses/ExpenseFormModal.tsx
import { useState, useEffect } from "react"
import { Modal } from "../ds/Modal"
import { Input } from "../ds/Input"
import { Button } from "../ds/Button"
import { colors } from "../ds/tokens"
import { PaymentMethodSelector } from "./PaymentMethodSelector"
import { FormLabel } from "./FormLabel"
import { FormTextarea } from "./FormTextarea"

const INTER = "'Inter', sans-serif"
const NGN = "\u20a6"

export interface ExpenseForm {
  category: string
  description: string
  amount: string
  date: string
  paymentMethod: "Cash" | "Transfer" | "Card"
  reference: string
  notes: string
}

interface ExpenseFormModalProps {
  open: boolean
  onClose: () => void
  initial: ExpenseForm | null
  onSave: (form: ExpenseForm) => void
}

const EMPTY_FORM: ExpenseForm = {
  category: "",
  description: "",
  amount: "",
  date: new Date().toISOString().split("T")[0],
  paymentMethod: "Cash",
  reference: "",
  notes: "",
}

export function ExpenseFormModal({
  open,
  onClose,
  initial,
  onSave,
}: ExpenseFormModalProps) {
  const [form, setForm] = useState<ExpenseForm>(initial ?? EMPTY_FORM)

  useEffect(() => {
    if (open) setForm(initial ?? EMPTY_FORM)
  }, [open, initial])

  const isEdit = !!initial
  const valid =
    form.category.trim() &&
    form.description.trim() &&
    form.amount &&
    Number(form.amount.replace(/,/g, "")) > 0

  const upd = (k: keyof ExpenseForm, v: string) =>
    setForm((p) => ({ ...p, [k]: v }))

  const handlePaymentMethodChange = (method: "Cash" | "Transfer" | "Card") =>
    upd("paymentMethod", method)

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Expense" : "Add Expense"}
      subtitle={isEdit ? "Update expense record" : "Record a new expense entry"}
      size="md"
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Category Name"
          value={form.category}
          onChange={(e) => upd("category", e.target.value)}
          placeholder="e.g. Food & Beverages, Utilities, Staff..."
        />

        <Input
          label="Description"
          value={form.description}
          onChange={(e) => upd("description", e.target.value)}
          placeholder="e.g. Weekly vegetable supply"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Amount"
            value={form.amount}
            onChange={(e) => upd("amount", e.target.value)}
            placeholder="0.00"
            leftIcon={
              <span
                style={{ fontFamily: INTER, fontSize: 14, fontWeight: 500 }}
              >
                {NGN}
              </span>
            }
          />
          <Input
            label="Date"
            type="date"
            value={form.date}
            onChange={(e) => upd("date", e.target.value)}
          />
        </div>

        <PaymentMethodSelector
          value={form.paymentMethod}
          onChange={handlePaymentMethodChange}
        />

        <div className="flex flex-col gap-1.5">
          <FormLabel optional>Reference</FormLabel>
          <input
            type="text"
            value={form.reference}
            onChange={(e) => upd("reference", e.target.value)}
            placeholder="e.g. INV-0042, Receipt #123"
            className="page-input w-full outline-none"
            style={{
              fontFamily: INTER,
              fontSize: 14,
              color: colors.textPrimary,
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              padding: "10px 14px",
              lineHeight: "24px",
            }}
          />
        </div>

        <FormTextarea
          label="Note"
          value={form.notes}
          onChange={(v) => upd("notes", v)}
          placeholder="Any additional details..."
          optional
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            disabled={!valid}
            onClick={() => onSave(form)}
          >
            {isEdit ? "Save Changes" : "Add Expense"}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
