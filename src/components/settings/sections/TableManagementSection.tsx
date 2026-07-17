import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import { Button, Modal, colors, font, radius } from "../../ds"
import { Card, SectionLabel, ToggleRow } from "../common"
import { useAppStore } from "../../../store/AppContext"
import { settingsAPI, tableAPI } from "../../../services/api"
import type { RestaurantTable } from "../../../store/AppContext"
import type { TableForm } from "../../../types/settings/tables"

const DEFAULT_ZONES = ["Main Hall", "VIP", "Outdoor", "Bar"]

function TableFormModal({
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

export function TableManagementSection() {
  const {
    tablesEnabled,
    setTablesEnabled,
    tables,
    setTables,
    addTable,
    updateTable,
    deleteTable,
  } = useAppStore()
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingTable, setEditingTable] = useState<RestaurantTable | null>(null)
  const [activeTab, setActiveTab] = useState<"tables" | "floors">("tables")

  const existingZones = Array.from(
    new Set((tables || []).map((t) => t.zone).filter(Boolean))
  )

  useEffect(() => {
    if (tablesEnabled) {
      tableAPI
        .list()
        .then((res) => {
          const storedShapes = (() => {
            try {
              return JSON.parse(
                localStorage.getItem("tablix_table_shapes") || "{}"
              )
            } catch {
              return {}
            }
          })()
          setTables(
            res.data.tables.map((t: any) => ({
              id: t.id,
              name: t.name,
              seats: t.seats,
              zone: t.zone,
              status: t.status,
              occupiedAt: t.occupiedAt ?? undefined,
              customerName: t.customerName ?? undefined,
              orderTotal: t.orderTotal ?? undefined,
              shape: storedShapes[t.id] ?? "square",
            }))
          )
        })
        .catch(() => {})
    }
  }, [tablesEnabled, setTables])

  const handleToggle = async (v: boolean) => {
    setTablesEnabled(v)
    try {
      await settingsAPI.update({ tablesEnabled: v })
    } catch {}
  }

  const handleAdd = async (
    data: Omit<
      RestaurantTable,
      "id" | "status" | "occupiedAt" | "customerName" | "orderTotal"
    >
  ) => {
    try {
      const res = await tableAPI.create({
        name: data.name,
        seats: data.seats,
        zone: data.zone,
      })
      if (res.success && res.data.table) {
        const newTable = res.data.table
        const storedShapes = (() => {
          try {
            return JSON.parse(
              localStorage.getItem("tablix_table_shapes") || "{}"
            )
          } catch {
            return {}
          }
        })()
        storedShapes[newTable.id] = data.shape || "square"
        localStorage.setItem(
          "tablix_table_shapes",
          JSON.stringify(storedShapes)
        )
        addTable({
          id: newTable.id,
          name: newTable.name,
          seats: newTable.seats,
          zone: newTable.zone,
          status: newTable.status,
          shape: data.shape || "square",
        })
        setShowAddModal(false)
        toast.success("Table added successfully")
      } else {
        toast.error("Failed to add table")
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add table")
    }
  }

  const handleEdit = async (
    data: Omit<
      RestaurantTable,
      "id" | "status" | "occupiedAt" | "customerName" | "orderTotal"
    >
  ) => {
    if (!editingTable) return
    try {
      const res = await tableAPI.update(editingTable.id, {
        name: data.name,
        seats: data.seats,
        zone: data.zone,
      })
      if (res.success && res.data.table) {
        const storedShapes = (() => {
          try {
            return JSON.parse(
              localStorage.getItem("tablix_table_shapes") || "{}"
            )
          } catch {
            return {}
          }
        })()
        storedShapes[editingTable.id] = data.shape || "square"
        localStorage.setItem(
          "tablix_table_shapes",
          JSON.stringify(storedShapes)
        )
        updateTable({
          ...editingTable,
          name: data.name,
          seats: data.seats,
          zone: data.zone,
          shape: data.shape || "square",
        })
        setEditingTable(null)
        toast.success("Table updated")
      } else {
        toast.error("Failed to update table")
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update table")
    }
  }

  const handleDelete = async (t: RestaurantTable) => {
    if (t.status !== "available") {
      toast.error(
        "Cannot delete a table that is currently occupied or reserved."
      )
      return
    }
    if (window.confirm(`Are you sure you want to delete table "${t.name}"?`)) {
      try {
        const res = await tableAPI.remove(t.id)
        if (res.success) {
          const storedShapes = (() => {
            try {
              return JSON.parse(
                localStorage.getItem("tablix_table_shapes") || "{}"
              )
            } catch {
              return {}
            }
          })()
          delete storedShapes[t.id]
          localStorage.setItem(
            "tablix_table_shapes",
            JSON.stringify(storedShapes)
          )
          deleteTable(t.id)
          toast.success("Table deleted")
        } else {
          toast.error("Failed to delete table")
        }
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to delete table")
      }
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <ToggleRow
          label="Enable Table Management"
          sub="When enabled, the Tables page is available for managing your floor plan, table statuses, and seating. When disabled, the Tables page is hidden from navigation."
          checked={tablesEnabled}
          onChange={handleToggle}
        />
      </Card>

      {tablesEnabled && (
        <Card>
          <div
            className="mb-4 flex border-b"
            style={{ borderColor: colors.borderLight }}
          >
            <button
              onClick={() => setActiveTab("tables")}
              className="border-b-2 px-4 py-3 whitespace-nowrap"
              style={{
                borderColor:
                  activeTab === "tables" ? colors.primary : "transparent",
                color:
                  activeTab === "tables" ? colors.primary : colors.textMuted,
                fontFamily: font.family,
                fontWeight: font.weight.medium,
                fontSize: font.size.sm,
              }}
            >
              Tables
            </button>
            <button
              onClick={() => setActiveTab("floors")}
              className="border-b-2 px-4 py-3 whitespace-nowrap"
              style={{
                borderColor:
                  activeTab === "floors" ? colors.primary : "transparent",
                color:
                  activeTab === "floors" ? colors.primary : colors.textMuted,
                fontFamily: font.family,
                fontWeight: font.weight.medium,
                fontSize: font.size.sm,
              }}
            >
              Floors
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {activeTab === "tables" && (
              <>
                <div className="flex items-center justify-between">
                  <p
                    style={{
                      fontFamily: font.family,
                      fontWeight: font.weight.semibold,
                      fontSize: font.size.md,
                      color: "var(--page-text)",
                    }}
                  >
                    Floor Plan & Tables
                  </p>
                  <Button size="sm" onClick={() => setShowAddModal(true)}>
                    + Add Table
                  </Button>
                </div>
                {tables.length === 0 ? (
                  <div
                    className="rounded-lg border border-dashed py-6 text-center text-sm"
                    style={{
                      borderColor: colors.borderMid,
                      color: colors.textMuted,
                    }}
                  >
                    No tables configured. Add a table to start your floor plan.
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {tables.map((t) => (
                      <div
                        key={t.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                        style={{
                          borderColor: colors.borderLight,
                          background: "var(--page-surface-2)",
                        }}
                      >
                        <div>
                          <div
                            className="font-semibold"
                            style={{ color: "var(--page-text)" }}
                          >
                            {t.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            Zone: {t.zone} • Seats: {t.seats} • Shape:{" "}
                            <span className="capitalize">
                              {t.shape || "square"}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingTable(t)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            style={{ color: "red" }}
                            onClick={() => handleDelete(t)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
            {activeTab === "floors" && (
              <>
                <div className="flex items-center justify-between">
                  <p
                    style={{
                      fontFamily: font.family,
                      fontWeight: font.weight.semibold,
                      fontSize: font.size.md,
                      color: "var(--page-text)",
                    }}
                  >
                    Floors / Zones
                  </p>
                </div>
                {existingZones.length === 0 ? (
                  <div
                    className="rounded-lg border border-dashed py-6 text-center text-sm"
                    style={{
                      borderColor: colors.borderMid,
                      color: colors.textMuted,
                    }}
                  >
                    No floors configured yet. Add a table to create a floor
                    zone.
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {existingZones.map((z) => {
                      const count = tables.filter((t) => t.zone === z).length
                      return (
                        <div
                          key={z}
                          className="flex items-center justify-between rounded-lg border p-3"
                          style={{
                            borderColor: colors.borderLight,
                            background: "var(--page-surface-2)",
                          }}
                        >
                          <div>
                            <div
                              className="font-semibold"
                              style={{ color: "var(--page-text)" }}
                            >
                              {z}
                            </div>
                            <div
                              className="text-xs"
                              style={{ color: colors.textMuted }}
                            >
                              {count} table{count !== 1 ? "s" : ""} in this
                              floor
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </Card>
      )}

      {showAddModal && (
        <TableFormModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAdd}
          existingZones={existingZones}
        />
      )}
      {editingTable && (
        <TableFormModal
          initial={editingTable}
          onClose={() => setEditingTable(null)}
          onSave={handleEdit}
          existingZones={existingZones}
        />
      )}
    </div>
  )
}
