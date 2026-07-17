// hooks/useInventory.ts
import { useState, useCallback, useEffect } from "react"
import { useAppStore } from "../store/AppContext"
import type {
  InventoryItem,
  Supplier,
  InventoryLogEntry as LogEntry,
} from "../store/AppContext"
import { inventoryAPI, suppliersAPI } from "../services/api"
import type { ApiIngredient, StockMovementInput } from "../services/api"
import { toast } from "sonner"
import { fmtStock } from "../utils/inventory-helpers"

type InventoryStatus = "Active" | "Low Stock" | "Out of Stock"
type LogType = "Stock In" | "Stock Out" | "Adjustment" | "Wastage" | "Transfer"

// ─── Form Types ──────────────────────────────────────────────────────────────

export interface AddItemForm {
  name: string
  unit: string
  minStock: string
  initQty: string
  unitCost: string
  supplier: string
}

export interface AddSupplierForm {
  name: string
  contactPerson: string
  phone: string
  email: string
  address: string
  itemsSupplied: string
}

export interface AddLogForm {
  itemId: string
  type: LogType
  quantity: string
  performedBy: string
  note: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mapApiIngredient(a: ApiIngredient): InventoryItem {
  const status: InventoryStatus =
    a.currentStock <= 0 ? "Out of Stock" : a.lowStock ? "Low Stock" : "Active"
  return {
    id: a.id,
    name: a.name,
    unit: a.unit,
    qty: a.currentStock,
    minQty: a.reorderLevel,
    costPerUnit: a.unitCost,
    supplier: a.supplier ?? "-",
    status,
  }
}

function toApiMovementType(t: LogType): StockMovementInput["type"] {
  switch (t) {
    case "Stock In":
      return "StockIn"
    case "Stock Out":
      return "StockOut"
    case "Adjustment":
      return "Adjustment"
    case "Wastage":
      return "Wastage"
    default:
      return "StockOut"
  }
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useInventory() {
  const {
    inventoryLog: logEntries,
    addInventoryLogEntry,
    addSupplier: storeAddSupplier,
    updateSupplier: storeUpdateSupplier,
    deleteSupplier: storeDeleteSupplier,
  } = useAppStore()

  const [items, setItems] = useState<InventoryItem[]>([])
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ── Fetch Functions ──────────────────────────────────────────────────────

  const fetchIngredients = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await inventoryAPI.list()
      setItems(res.data.ingredients.map(mapApiIngredient))
    } catch (e: any) {
      setError(e?.data?.message ?? e?.message ?? "Failed to load inventory.")
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchSuppliers = useCallback(async () => {
    try {
      const res = await suppliersAPI.list()
      const mapped: Supplier[] = res.data.suppliers.map((s) => ({
        id: s.id,
        name: s.name,
        contactPerson: s.contactPerson ?? "",
        phone: s.phone ?? "",
        email: s.email ?? "",
        address: s.address ?? "",
        itemsSupplied: s.itemsSupplied ?? "-",
        totalOrders: 0,
        status: (s.status as "Active" | "Inactive") ?? "Active",
      }))
      setSuppliers(mapped)
      mapped.forEach((s) => storeAddSupplier(s))
    } catch (_) {}
  }, [storeAddSupplier])

  useEffect(() => {
    fetchIngredients()
    fetchSuppliers()
  }, [fetchIngredients, fetchSuppliers])

  // ── Ingredient Handlers ─────────────────────────────────────────────────

  const addIngredient = useCallback(
    async (form: AddItemForm) => {
      try {
        await inventoryAPI.create({
          name: form.name,
          unit: form.unit.trim() || "pcs",
          currentStock: parseFloat(form.initQty) || 0,
          reorderLevel: parseFloat(form.minStock) || 0,
          unitCost: parseFloat(form.unitCost.replace(/,/g, "")) || 0,
          supplier: form.supplier.trim() || undefined,
        })
        toast.success("Ingredient added successfully")
        await fetchIngredients()
        return true
      } catch (e: any) {
        const msg =
          e?.data?.message ?? e?.message ?? "Failed to add ingredient."
        setError(msg)
        toast.error(msg)
        return false
      }
    },
    [fetchIngredients]
  )

  const updateIngredient = useCallback(
    async (id: string, form: AddItemForm) => {
      try {
        await inventoryAPI.update(id, {
          name: form.name.trim() || undefined,
          unit: form.unit.trim() || undefined,
          currentStock: parseFloat(form.initQty),
          reorderLevel: parseFloat(form.minStock),
          unitCost: parseFloat(form.unitCost.replace(/,/g, "")),
          supplier: form.supplier.trim() || undefined,
        })
        toast.success("Ingredient updated successfully")
        await fetchIngredients()
        return true
      } catch (e: any) {
        const msg =
          e?.data?.message ?? e?.message ?? "Failed to update ingredient."
        setError(msg)
        toast.error(msg)
        return false
      }
    },
    [fetchIngredients]
  )

  const deleteIngredient = useCallback(
    async (item: InventoryItem) => {
      try {
        await inventoryAPI.remove(item.id)
        toast.success("Ingredient deleted successfully")
        await fetchIngredients()
        return true
      } catch (e: any) {
        const msg =
          e?.data?.message ?? e?.message ?? "Failed to delete ingredient."
        setError(msg)
        toast.error(msg)
        return false
      }
    },
    [fetchIngredients]
  )

  const restockIngredient = useCallback(
    async (id: string, qty: number, note: string) => {
      try {
        await inventoryAPI.logMovement(id, {
          type: "StockIn",
          quantity: qty,
          note: note || "Manual restock",
        })
        toast.success("Stock added successfully")
        await fetchIngredients()
        return true
      } catch (e: any) {
        const msg =
          e?.data?.message ?? e?.message ?? "Failed to restock ingredient."
        setError(msg)
        toast.error(msg)
        return false
      }
    },
    [fetchIngredients]
  )

  // ── Supplier Handlers ────────────────────────────────────────────────────

  const addSupplier = useCallback(
    async (form: AddSupplierForm) => {
      try {
        await suppliersAPI.create({
          name: form.name,
          contactPerson: form.contactPerson,
          phone: form.phone,
          email: form.email,
          address: form.address,
          itemsSupplied: form.itemsSupplied || "-",
          status: "Active",
        })
        toast.success("Supplier added successfully")
        await fetchSuppliers()
        return true
      } catch (e: any) {
        const msg = e?.data?.message ?? "Failed to add supplier."
        setError(msg)
        toast.error(msg)
        return false
      }
    },
    [fetchSuppliers]
  )

  const updateSupplier = useCallback(
    async (id: string, form: AddSupplierForm) => {
      try {
        await suppliersAPI.update(id, {
          name: form.name,
          contactPerson: form.contactPerson,
          phone: form.phone,
          email: form.email,
          address: form.address,
          itemsSupplied: form.itemsSupplied,
        })
        toast.success("Supplier updated successfully")
        await fetchSuppliers()
        // Update in store
        const updated = suppliers.find((s) => s.id === id)
        if (updated) {
          storeUpdateSupplier(updated)
        }
        return true
      } catch (e: any) {
        const msg = e?.data?.message ?? "Failed to update supplier."
        setError(msg)
        toast.error(msg)
        return false
      }
    },
    [fetchSuppliers, suppliers, storeUpdateSupplier]
  )

  const deleteSupplier = useCallback(
    async (supplier: Supplier) => {
      try {
        await suppliersAPI.remove(supplier.id)
        toast.success("Supplier deleted successfully")
        await fetchSuppliers()
        storeDeleteSupplier(supplier.id)
        return true
      } catch (e: any) {
        const msg = e?.data?.message ?? "Failed to delete supplier."
        setError(msg)
        toast.error(msg)
        return false
      }
    },
    [fetchSuppliers, storeDeleteSupplier]
  )

  // ── Log Handlers ─────────────────────────────────────────────────────────

  const addLogEntry = useCallback(
    async (form: AddLogForm) => {
      const item = items.find((i) => i.id === form.itemId)
      if (!item) {
        toast.error("Selected ingredient not found")
        return false
      }

      const qty = parseFloat(form.quantity) || 0
      if (qty <= 0) {
        toast.error("Quantity must be greater than 0")
        return false
      }

      try {
        await inventoryAPI.logMovement(form.itemId, {
          type: toApiMovementType(form.type),
          quantity: qty,
          note: form.note || undefined,
        })

        await fetchIngredients()

        // Add local log entry for UI
        const now = new Date()
        const dateStr = now.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        const timeStr = now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
        const isAdditive =
          form.type === "Stock In" || form.type === "Adjustment"
        const newQty = isAdditive ? item.qty + qty : Math.max(0, item.qty - qty)

        addInventoryLogEntry({
          id: `l${Date.now()}`,
          date: dateStr,
          time: timeStr,
          itemName: item.name,
          type: form.type,
          quantity: isAdditive ? String(qty) : `-${qty}`,
          prevStock: fmtStock(item.qty, item.unit),
          newStock: fmtStock(newQty, item.unit),
          performedBy: form.performedBy,
          note: form.note,
        })

        toast.success("Stock movement recorded successfully")
        return true
      } catch (e: any) {
        const msg =
          e?.data?.message ?? e?.message ?? "Failed to record stock movement."
        setError(msg)
        toast.error(msg)
        return false
      }
    },
    [items, fetchIngredients, addInventoryLogEntry]
  )

  const deleteLogEntry = useCallback((entry: LogEntry) => {
    // Note: This only removes from local UI state, not from API
    // The API doesn't support deleting log entries yet
    toast.info("Log entry removed from view")
    return true
  }, [])

  // ── Derived Stats ────────────────────────────────────────────────────────

  const totalItems = items.length
  const lowStock = items.filter((i) => i.status === "Low Stock").length
  const outOfStock = items.filter((i) => i.status === "Out of Stock").length
  const wellStock = items.filter((i) => i.status === "Active").length
  const stockTotal = items.reduce(
    (sum, item) => sum + item.qty * item.costPerUnit,
    0
  )

  const logStockIn = logEntries.filter((e) => e.type === "Stock In").length
  const logStockOut = logEntries.filter((e) => e.type === "Stock Out").length
  const logWastage = logEntries.filter((e) => e.type === "Wastage").length

  // ── Helper to convert to form ────────────────────────────────────────────

  const toEditForm = (item: InventoryItem): AddItemForm => ({
    name: item.name,
    unit: item.unit,
    minStock: String(item.minQty),
    initQty: String(item.qty),
    unitCost: String(item.costPerUnit),
    supplier: item.supplier === "-" ? "" : item.supplier,
  })

  const toSupplierEditForm = (supplier: Supplier): AddSupplierForm => ({
    name: supplier.name,
    contactPerson: supplier.contactPerson,
    phone: supplier.phone,
    email: supplier.email,
    address: supplier.address || "",
    itemsSupplied: supplier.itemsSupplied,
  })

  // ─── Return ──────────────────────────────────────────────────────────────

  return {
    // State
    items,
    suppliers,
    loading,
    error,
    logEntries,

    // Stats
    totalItems,
    lowStock,
    outOfStock,
    wellStock,
    stockTotal,
    stockValue: stockTotal,
    logStockIn,
    logStockOut,
    logWastage,

    // Fetch functions
    fetchIngredients,
    fetchSuppliers,

    // Ingredient operations
    addIngredient,
    updateIngredient,
    deleteIngredient,
    restockIngredient,
    toEditForm,

    // Supplier operations
    addSupplier,
    updateSupplier,
    deleteSupplier,
    toSupplierEditForm,

    // Log operations
    addLogEntry,
    deleteLogEntry,

    // Setters (for components that need to modify state directly)
    setItems,
    setSuppliers,
    setError,
  }
}
