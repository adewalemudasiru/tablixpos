import { useState } from "react"
import { Button } from "../../components/ds/Button"
import { colors, font, radius, shadows } from "../../components/ds/tokens"
import { Input } from "../ds"

export function IngredientRow({
  inventoryItems,
  existingIds,
  onAdd,
}: {
  inventoryItems: import("../../store/AppContext").InventoryItem[]
  existingIds: string[]
  onAdd: (ingredientId: string, qty: string) => void
}) {
  const [selectedId, setSelectedId] = useState("")
  const [qty, setQty] = useState("")

  const available = inventoryItems.filter((i) => !existingIds.includes(i.id))
  const selInv = inventoryItems.find((i) => i.id === selectedId)

  const handleAdd = () => {
    if (!selectedId || !qty || parseFloat(qty) <= 0) return
    onAdd(selectedId, qty)
    setSelectedId("")
    setQty("")
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
      <div className="flex-1">
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          style={{
            fontFamily: font.family,
            fontSize: font.size.md,
            color: selectedId ? colors.textPrimary : colors.textPlaceholder,
            border: `1px solid ${colors.border}`,
            borderRadius: radius.md,
            padding: "10px 14px",
            outline: "none",
            background: colors.bg,
            width: "100%",
            boxShadow: shadows.sm,
          }}
        >
          <option value="">Select ingredient...</option>
          {available.map((i) => (
            <option key={i.id} value={i.id}>
              {i.name} ({i.qty} {i.unit} in stock)
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-end gap-2">
        <div className="w-32 shrink-0">
          <Input
            placeholder={selInv ? `qty in ${selInv.unit}` : "qty"}
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={handleAdd}
          style={{ flexShrink: 0 }}
        >
          Add
        </Button>
      </div>
    </div>
  )
}
