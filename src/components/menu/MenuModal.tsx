import React, { useState, useRef } from "react"
import { useAppStore, type MenuItem } from "../../store/AppContext"
import { Button } from "../../components/ds/Button"
import { Input } from "../../components/ds/Input"
import { Modal } from "../../components/ds/Modal"
import { colors, font, radius } from "../../components/ds/tokens"
import {
  EMPTY_FORM,
  type Category,
  type MenuForm,
  type MenuIngredient,
} from "@/types/menu/menu"
import { SelectField } from "@/components/menu/SelectField"
import { IngredientRow } from "@/components/menu/IngredientRow"
import { IconEdit, IconTrash } from "@tabler/icons-react"

// ─── Helpers ──────────────────────────────────────────────────────────────────

const NGN_SYM = "\u20a6"
const fmt = (n: number) =>
  `${NGN_SYM}${n.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`

// ─── Icons ────────────────────────────────────────────────────────────────────

export function MenuModal({
  open,
  onClose,
  onSave,
  categories,
  editItem,
  inventoryItems,
}: {
  open: boolean
  onClose: () => void
  onSave: (form: MenuForm) => void
  categories: Category[]
  editItem: MenuItem | null
  inventoryItems: import("../../store/AppContext").InventoryItem[]
}) {
  const { stations } = useAppStore()
  const [form, setForm] = useState<MenuForm>(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof MenuForm, string>>>(
    {}
  )
  const [variantName, setVariantName] = useState("")
  const [variantPrice, setVariantPrice] = useState("")
  const [addonName, setAddonName] = useState("")
  const [addonPrice, setAddonPrice] = useState("")
  const [editVariantId, setEditVariantId] = useState<string | null>(null)
  const [editAddonId, setEditAddonId] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const prevEditId = useRef<string | null>(null)
  if (editItem && editItem.id !== prevEditId.current) {
    prevEditId.current = editItem.id
    setForm({
      name: editItem.name,
      price: String(editItem.price),
      category: editItem.category,
      image: editItem.image,
      available: editItem.available,
      variants: editItem.variants.map((v) => ({ ...v })),
      addons: editItem.addons.map((a) => ({ ...a })),
      ingredients: (editItem.ingredients ?? []).map((ig: MenuIngredient) => ({
        ingredientId: ig.ingredientId,
        qty: String(ig.qty),
      })),
      station: editItem.station || "",
    })
  }
  if (!open && prevEditId.current !== null && !editItem)
    prevEditId.current = null

  const set = <K extends keyof MenuForm>(k: K, v: MenuForm[K]) => {
    setForm((p) => ({ ...p, [k]: v }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }))
  }

  const validate = () => {
    const e: Partial<Record<keyof MenuForm, string>> = {}
    if (!form.name.trim()) e.name = "Item name is required"
    if (!form.price.trim()) e.price = "Price is required"
    if (!form.category.trim()) e.category = "Category is required"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleClose = () => {
    setForm(EMPTY_FORM)
    setErrors({})
    setVariantName("")
    setVariantPrice("")
    setAddonName("")
    setAddonPrice("")
    setEditVariantId(null)
    setEditAddonId(null)
    prevEditId.current = null
    onClose()
  }

  const handleSubmit = () => {
    if (validate()) {
      onSave(form)
      handleClose()
    }
  }

  const addVariant = () => {
    if (!variantName.trim()) return
    if (editVariantId) {
      setForm((p) => ({
        ...p,
        variants: p.variants.map((v) =>
          v.id === editVariantId
            ? { ...v, name: variantName, price: parseFloat(variantPrice) || 0 }
            : v
        ),
      }))
      setEditVariantId(null)
    } else {
      setForm((p) => ({
        ...p,
        variants: [
          ...p.variants,
          {
            id: `v${Date.now()}`,
            name: variantName,
            price: parseFloat(variantPrice) || 0,
          },
        ],
      }))
    }
    setVariantName("")
    setVariantPrice("")
  }

  const addAddon = () => {
    if (!addonName.trim()) return
    if (editAddonId) {
      setForm((p) => ({
        ...p,
        addons: p.addons.map((a) =>
          a.id === editAddonId
            ? { ...a, name: addonName, price: parseFloat(addonPrice) || 0 }
            : a
        ),
      }))
      setEditAddonId(null)
    } else {
      setForm((p) => ({
        ...p,
        addons: [
          ...p.addons,
          {
            id: `a${Date.now()}`,
            name: addonName,
            price: parseFloat(addonPrice) || 0,
          },
        ],
      }))
    }
    setAddonName("")
    setAddonPrice("")
  }

  const listItemStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 12px",
    borderRadius: radius.md,
    border: `1px solid ${colors.borderMid}`,
    background: colors.bg,
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={editItem ? "Edit Menu Item" : "Add New Menu"}
      subtitle={
        editItem ? "Update menu item details" : "Create a new menu item"
      }
      size="lg"
      layout="standard"
      actions={[
        { label: "Cancel", variant: "outline", onClick: handleClose },
        {
          label: editItem ? "Save Changes" : "Add Item",
          variant: "primary",
          onClick: handleSubmit,
        },
      ]}
    >
      <div className="flex flex-col gap-4">
        {/* Name + Price — stack on mobile, side-by-side on sm+ */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <Input
              label="Item Name"
              placeholder="Enter item name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              error={errors.name}
            />
          </div>
          <div className="shrink-0 sm:w-[130px]">
            <Input
              label="Price (₦)"
              type="number"
              placeholder="0.00"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              error={errors.price}
            />
          </div>
        </div>

        {/* Category */}
        <SelectField
          label="Category"
          value={form.category}
          onChange={(v) => set("category", v)}
          error={errors.category}
        >
          <option value="">Select a category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </SelectField>

        {/* Station */}
        {stations.length > 0 && (
          <SelectField
            label="Kitchen Station (Optional)"
            value={form.station || ""}
            onChange={(v) => set("station", v)}
          >
            <option value="">No specific station (All / Default)</option>
            {stations.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </SelectField>
        )}

        {/* Image */}
        <div className="flex flex-col gap-2">
          <label
            style={{
              fontFamily: font.family,
              fontWeight: font.weight.medium,
              fontSize: font.size.md,
              color: colors.textPrimary,
            }}
          >
            Item Image
          </label>
          {form.image ? (
            <div style={{ position: "relative", display: "inline-block" }}>
              <img
                src={form.image}
                alt="preview"
                style={{
                  width: 120,
                  height: 96,
                  objectFit: "cover",
                  borderRadius: radius.md,
                  border: `1px solid ${colors.borderMid}`,
                }}
              />
              <button
                onClick={() => set("image", "")}
                style={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: colors.primary,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M1 1l8 8M9 1L1 9"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <Input
              placeholder="Paste image URL…"
              value={form.image}
              onChange={(e) => set("image", e.target.value)}
            />
          )}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileRef.current?.click()}
              leftIcon={
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M14 10v2.667A1.333 1.333 0 0112.667 14H3.333A1.333 1.333 0 012 12.667V10"
                    stroke="currentColor"
                    strokeWidth="1.33"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.333 5.333L8 2 4.667 5.333"
                    stroke="currentColor"
                    strokeWidth="1.33"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 2v8"
                    stroke="currentColor"
                    strokeWidth="1.33"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            >
              Upload Image
            </Button>
            <span
              style={{
                fontFamily: font.family,
                fontSize: font.size.sm,
                color: colors.textMuted,
              }}
            >
              or paste URL above
            </span>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (!f) return
              // Convert to base64 so it persists in the DB (not a blob: URL)
              const reader = new FileReader()
              reader.onloadend = () => {
                set("image", reader.result as string)
              }
              reader.readAsDataURL(f)
            }}
          />
        </div>

        {/* Available */}
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
          }}
        >
          <div
            onClick={() => set("available", !form.available)}
            style={{
              width: 16,
              height: 16,
              borderRadius: 4,
              border: `1.5px solid ${form.available ? colors.primary : colors.border}`,
              background: form.available ? colors.primary : colors.white,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
              transition: "all 0.15s",
            }}
          >
            {form.available && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path
                  d="M1 4L3.5 6.5L9 1"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <span
            style={{
              fontFamily: font.family,
              fontSize: font.size.md,
              color: colors.textSecondary,
            }}
          >
            Mark as Available
          </span>
        </label>

        {/* Variants */}
        <div className="flex flex-col gap-2">
          <p
            style={{
              fontFamily: font.family,
              fontWeight: font.weight.medium,
              fontSize: font.size.md,
              color: colors.textPrimary,
            }}
          >
            Variants
          </p>
          {form.variants.length > 0 && (
            <div className="flex flex-col gap-1.5">
              {form.variants.map((v) => (
                <div key={v.id} style={listItemStyle}>
                  <span
                    style={{
                      fontFamily: font.family,
                      fontSize: font.size.base,
                      color: colors.textPrimary,
                    }}
                  >
                    {v.name}
                    {v.price > 0 && (
                      <span style={{ color: colors.textMuted }}>
                        {" "}
                        +{fmt(v.price)}
                      </span>
                    )}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      style={{ color: colors.textMuted, padding: "4px 8px" }}
                      onClick={() => {
                        setVariantName(v.name)
                        setVariantPrice(String(v.price))
                        setEditVariantId(v.id)
                      }}
                    >
                      <IconEdit />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      style={{ color: colors.primary, padding: "4px 8px" }}
                      onClick={() =>
                        setForm((p) => ({
                          ...p,
                          variants: p.variants.filter((x) => x.id !== v.id),
                        }))
                      }
                    >
                      <IconTrash />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Variant add row — stacks on mobile */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <div className="flex-1">
              <Input
                placeholder="e.g. Half, Full, Quarter, Small, Large"
                value={variantName}
                onChange={(e) => setVariantName(e.target.value)}
              />
            </div>
            <div className="flex items-end gap-2">
              <div className="w-28 shrink-0">
                <Input
                  placeholder="extra price"
                  type="number"
                  value={variantPrice}
                  onChange={(e) => setVariantPrice(e.target.value)}
                />
              </div>
              <Button
                variant="primary"
                size="md"
                onClick={addVariant}
                style={{ flexShrink: 0, whiteSpace: "nowrap" }}
              >
                {editVariantId ? "Update" : "Add"}
              </Button>
            </div>
          </div>
        </div>

        {/* Add-ons */}
        <div className="flex flex-col gap-2">
          <p
            style={{
              fontFamily: font.family,
              fontWeight: font.weight.medium,
              fontSize: font.size.md,
              color: colors.textPrimary,
            }}
          >
            Add-ons
          </p>
          {form.addons.length > 0 && (
            <div className="flex flex-col gap-1.5">
              {form.addons.map((a) => (
                <div key={a.id} style={listItemStyle}>
                  <span
                    style={{
                      fontFamily: font.family,
                      fontSize: font.size.base,
                      color: colors.textPrimary,
                    }}
                  >
                    {a.name}
                    {a.price > 0 && (
                      <span style={{ color: colors.textMuted }}>
                        {" "}
                        +{fmt(a.price)}
                      </span>
                    )}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      style={{ color: colors.textMuted, padding: "4px 8px" }}
                      onClick={() => {
                        setAddonName(a.name)
                        setAddonPrice(String(a.price))
                        setEditAddonId(a.id)
                      }}
                    >
                      <IconEdit />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      style={{ color: colors.primary, padding: "4px 8px" }}
                      onClick={() =>
                        setForm((p) => ({
                          ...p,
                          addons: p.addons.filter((x) => x.id !== a.id),
                        }))
                      }
                    >
                      <IconTrash />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Add-on row — stacks on mobile */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <div className="flex-1">
              <Input
                placeholder="Add-on name"
                value={addonName}
                onChange={(e) => setAddonName(e.target.value)}
              />
            </div>
            <div className="flex items-end gap-2">
              <div className="w-28 shrink-0">
                <Input
                  placeholder="price"
                  type="number"
                  value={addonPrice}
                  onChange={(e) => setAddonPrice(e.target.value)}
                />
              </div>
              <Button
                variant="primary"
                size="md"
                onClick={addAddon}
                style={{ flexShrink: 0, whiteSpace: "nowrap" }}
              >
                {editAddonId ? "Update" : "Add"}
              </Button>
            </div>
          </div>
        </div>

        {/* Recipe / Ingredients section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <p
              style={{
                fontFamily: font.family,
                fontWeight: font.weight.medium,
                fontSize: font.size.md,
                color: colors.textPrimary,
              }}
            >
              Recipe (Ingredients Used)
            </p>
            <span
              style={{
                fontFamily: font.family,
                fontSize: 11,
                color: "#9ca3af",
                background: "#f3f4f6",
                borderRadius: 9999,
                padding: "1px 8px",
              }}
            >
              optional
            </span>
          </div>
          <p
            style={{
              fontFamily: font.family,
              fontSize: 12,
              color: "#9ca3af",
              marginTop: -4,
            }}
          >
            Stock will automatically reduce when this dish is sold.
          </p>

          {form.ingredients.length > 0 && (
            <div className="flex flex-col gap-1.5">
              {form.ingredients.map((ig, idx) => {
                const inv = inventoryItems.find((i) => i.id === ig.ingredientId)
                return (
                  <div
                    key={ig.ingredientId}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 12px",
                      background: colors.neutralBg,
                      border: `1px solid ${colors.borderMid}`,
                      borderRadius: 8,
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{ flexShrink: 0, color: colors.textSecondary }}
                    >
                      <path
                        d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    <span
                      style={{
                        fontFamily: font.family,
                        fontSize: font.size.base,
                        color: colors.textPrimary,
                        flex: 1,
                      }}
                    >
                      {inv ? inv.name : ig.ingredientId} - {ig.qty}{" "}
                      {inv?.unit ?? "unit"} per serving
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      style={{ color: colors.primary, padding: "4px 8px" }}
                      onClick={() =>
                        setForm((p) => ({
                          ...p,
                          ingredients: p.ingredients.filter(
                            (_, i) => i !== idx
                          ),
                        }))
                      }
                    >
                      <IconTrash />
                    </Button>
                  </div>
                )
              })}
            </div>
          )}

          {inventoryItems.length === 0 ? (
            <p
              style={{
                fontFamily: font.family,
                fontSize: 12,
                color: "#9ca3af",
                fontStyle: "italic",
              }}
            >
              No ingredients in inventory yet. Add ingredients in the Inventory
              page first.
            </p>
          ) : (
            <IngredientRow
              inventoryItems={inventoryItems}
              existingIds={form.ingredients.map((ig) => ig.ingredientId)}
              onAdd={(ingredientId, qty) => {
                const existing = form.ingredients.find(
                  (ig) => ig.ingredientId === ingredientId
                )
                if (existing) {
                  setForm((p) => ({
                    ...p,
                    ingredients: p.ingredients.map((ig) =>
                      ig.ingredientId === ingredientId ? { ...ig, qty } : ig
                    ),
                  }))
                } else {
                  setForm((p) => ({
                    ...p,
                    ingredients: [...p.ingredients, { ingredientId, qty }],
                  }))
                }
              }}
            />
          )}
        </div>
      </div>
    </Modal>
  )
}
