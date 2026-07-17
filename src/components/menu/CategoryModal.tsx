import { useState, useRef } from "react"
import { Input } from "../../components/ds/Input"
import { Modal } from "../../components/ds/Modal"
import { colors, font, radius, shadows } from "../../components/ds/tokens"
import type { Category } from "@/types/menu/menu"

interface CategoryForm {
  name: string
  description: string
}

export function CategoryModal({
  open,
  onClose,
  onSave,
  editCategory,
}: {
  open: boolean
  onClose: () => void
  onSave: (form: CategoryForm) => void
  editCategory: Category | null
}) {
  const [form, setForm] = useState<CategoryForm>({ name: "", description: "" })
  const [nameErr, setNameErr] = useState("")
  const prevId = useRef<string | null>(null)

  if (editCategory && editCategory.id !== prevId.current) {
    prevId.current = editCategory.id
    setForm({ name: editCategory.name, description: editCategory.description })
  }

  const handleClose = () => {
    setForm({ name: "", description: "" })
    setNameErr("")
    prevId.current = null
    onClose()
  }

  const handleSubmit = () => {
    if (!form.name.trim()) {
      setNameErr("Category name is required")
      return
    }
    onSave(form)
    handleClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={editCategory ? "Edit Category" : "Add New Category"}
      subtitle={
        editCategory ? "Update category details" : "Create a new menu category"
      }
      size="sm"
      layout="standard"
      actions={[
        { label: "Cancel", variant: "outline", onClick: handleClose },
        {
          label: editCategory ? "Save Changes" : "Create",
          variant: "primary",
          onClick: handleSubmit,
        },
      ]}
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Category Name"
          placeholder="e.g. Pasta, Grills…"
          value={form.name}
          error={nameErr}
          onChange={(e) => {
            setForm((p) => ({ ...p, name: e.target.value }))
            setNameErr("")
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit()
          }}
          autoFocus
        />
        <div className="flex flex-col gap-1.5">
          <label
            style={{
              fontFamily: font.family,
              fontWeight: font.weight.medium,
              fontSize: font.size.md,
              color: colors.textPrimary,
            }}
          >
            Description
          </label>
          <textarea
            placeholder="Write a short description…"
            value={form.description}
            rows={3}
            onChange={(e) =>
              setForm((p) => ({ ...p, description: e.target.value }))
            }
            style={{
              fontFamily: font.family,
              fontSize: font.size.md,
              color: colors.textPrimary,
              border: `1px solid ${colors.border}`,
              borderRadius: radius.md,
              padding: "10px 14px",
              outline: "none",
              background: colors.white,
              width: "100%",
              boxShadow: shadows.sm,
              resize: "vertical",
              minHeight: 80,
              lineHeight: "22px",
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
