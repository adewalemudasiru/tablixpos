import { useState } from "react"
import { Modal } from "../../ds/Modal"
import { colors, font } from "../../ds/tokens"
import type { RestaurantTable } from "../../../store/AppContext"
import type { TableForm } from "../../../types/settings/tables"

const DEFAULT_ZONES = ["Main Hall", "VIP", "Outdoor", "Bar"]

export function TableFormModal({
  initial,
  onClose,
  onSave,
  existingZones,
}: {
  initial?: RestaurantTable
  onClose: () => void
  onSave: (
    data: Omit<
      RestaurantTable,
      "id" | "status" | "occupiedAt" | "customerName" | "orderTotal"
    >
  ) => void
  existingZones: string[]
}) {
  const allZones = Array.from(new Set([...DEFAULT_ZONES, ...existingZones]))
  const initialZone =
    initial?.zone && allZones.includes(initial.zone)
      ? initial.zone
      : allZones[0]
  const [form, setForm] = useState<TableForm>({
    name: initial?.name ?? "",
    seats: initial?.seats ?? 4,
    zone: initialZone,
    customZone:
      initial?.zone && !allZones.includes(initial.zone) ? initial.zone : "",
    shape: initial?.shape ?? "square",
  })
  const [error, setError] = useState("")
  const upd = <K extends keyof TableForm>(k: K, v: TableForm[K]) => {
    setForm((p) => ({ ...p, [k]: v }))
    setError("")
  }
  const handleSave = () => {
    const name = form.name.trim()
    if (!name) {
      setError("Table name is required")
      return
    }
    if (form.seats < 1 || form.seats > 20) {
      setError("Seats must be between 1 and 20")
      return
    }
    const zone =
      form.zone === "__custom__" ? form.customZone.trim() || "Other" : form.zone
    onSave({ name, seats: form.seats, zone, shape: form.shape })
  }

  return (
    <Modal
      open={true}
      onClose={onClose}
      title={initial ? "Edit Table" : "Add New Table"}
      size="sm"
      actions={[
        { label: "Cancel", variant: "outline", onClick: onClose },
        {
          label: initial ? "Save Changes" : "Add Table",
          variant: "primary",
          onClick: handleSave,
        },
      ]}
    >
      <div className="flex flex-col gap-4">
        <input
          className="rounded-lg border border-[var(--page-border)] px-3 py-2"
          placeholder="e.g. T1, VIP 1, Bar Stool 3"
          value={form.name}
          onChange={(e) => upd("name", e.target.value)}
        />
        <div className="flex flex-col gap-1.5">
          <label
            style={{
              fontFamily: font.family,
              fontWeight: font.weight.medium,
              fontSize: font.size.md,
              color: "var(--page-text)",
            }}
          >
            Seats
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => upd("seats", Math.max(1, form.seats - 1))}
              className="flex size-9 items-center justify-center rounded-lg border"
              style={{
                border: "1px solid var(--page-border)",
                background: "var(--page-surface-2)",
                color: "var(--page-text)",
              }}
            >
              -
            </button>
            <span
              className="min-w-8 text-center"
              style={{
                fontFamily: font.family,
                fontWeight: font.weight.bold,
                fontSize: font.size["3xl"],
                color: "var(--page-text)",
              }}
            >
              {form.seats}
            </span>
            <button
              type="button"
              onClick={() => upd("seats", Math.min(20, form.seats + 1))}
              className="flex size-9 items-center justify-center rounded-lg border"
              style={{
                border: "1px solid var(--page-border)",
                background: "var(--page-surface-2)",
                color: "var(--page-text)",
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            style={{
              fontFamily: font.family,
              fontWeight: font.weight.medium,
              fontSize: font.size.md,
              color: "var(--page-text)",
            }}
          >
            Table Shape
          </label>
          <select
            value={form.shape}
            onChange={(e) => upd("shape", e.target.value as TableForm["shape"])}
            className="rounded-lg border border-[var(--page-border)] px-3 py-2"
          >
            <option value="square">Square / Standard</option>
            <option value="round">Round / Circular</option>
            <option value="rectangle">Long / Rectangular</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            style={{
              fontFamily: font.family,
              fontWeight: font.weight.medium,
              fontSize: font.size.md,
              color: "var(--page-text)",
            }}
          >
            Zone / Section
          </label>
          <select
            value={form.zone}
            onChange={(e) => upd("zone", e.target.value)}
            className="rounded-lg border border-[var(--page-border)] px-3 py-2"
          >
            {allZones.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
            <option value="__custom__">+ Custom Zone...</option>
          </select>
          {form.zone === "__custom__" && (
            <input
              className="rounded-lg border border-[var(--page-border)] px-3 py-2"
              placeholder="Enter zone name..."
              value={form.customZone}
              onChange={(e) => upd("customZone", e.target.value)}
            />
          )}
        </div>
        {error && (
          <p
            style={{
              fontFamily: font.family,
              fontSize: font.size.sm,
              color: colors.dangerText,
            }}
          >
            {error}
          </p>
        )}
      </div>
    </Modal>
  )
}
