// InventoryPage.tsx
import { useState } from "react"
import { LogoutConfirmationModal } from "../components/LogoutConfirmationModal"
import { AppSidebar, MobileBottomNav } from "../components/AppSidebar"
import { DataTable } from "../components/ds/DataTable"
import { ConfirmModal } from "../components/ds/Modal"
import { Toaster } from "sonner"
import {
  useAppStore,
  type InventoryItem,
  type InventoryLogEntry,
  type Supplier,
} from "../store/AppContext"

// New components
import { InventoryHeader } from "../components/inventory/InventoryHeader"
import { LowStockAlerts } from "../components/inventory/LowStockAlerts"
import { InventoryStats } from "../components/inventory/InventoryStats"
import { TabBar, type InventoryTab } from "../components/inventory/TabBar"
import { EmptyInventoryState } from "../components/inventory/EmptyInventoryState"
import { makeIngredientColumns } from "../components/inventory/IngredientColumns"
import { makeSupplierColumns } from "../components/inventory/SupplierColumns"
import { makeLogColumns } from "../components/inventory/LogColumns"
import {
  useInventory,
  type AddItemForm,
  type AddLogForm,
  type AddSupplierForm,
} from "../hooks/useInventory"

// Modal components
import { AddInventoryModal } from "../components/inventory/AddInventoryModal"
import { EditInventoryModal } from "../components/inventory/EditInventoryModal"
import { RestockModal } from "../components/inventory/RestockModal"
import { AddSupplierModal } from "../components/inventory/AddSupplierModal"
import { EditSupplierModal } from "../components/inventory/EditSupplierModal"
import { AddLogModal } from "../components/inventory/AddLogModal"

const INTER = "'Inter', sans-serif"
const NGN = "\u20a6"

export default function InventoryPage() {
  const { isReadOnly } = useAppStore()
  const {
    items,
    suppliers,
    loading,
    error,
    logEntries,
    totalItems,
    lowStock,
    outOfStock,
    wellStock,
    stockTotal,
    logStockIn,
    logStockOut,
    logWastage,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    restockIngredient,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    addLogEntry,
    deleteLogEntry,

    fetchIngredients,
  } = useInventory()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [activeTab, setActiveTab] = useState<InventoryTab>("Ingredients")

  // Ingredient state
  const [showAddItem, setShowAddItem] = useState(false)
  const [editItem, setEditItem] = useState<InventoryItem | null>(null)
  const [deleteItem, setDeleteItem] = useState<InventoryItem | null>(null)
  const [restockItem, setRestockItem] = useState<InventoryItem | null>(null)

  // Supplier state
  const [showAddSupplier, setShowAddSupplier] = useState(false)
  const [editSupplier, setEditSupplier] = useState<Supplier | null>(null)

  // Log state
  const [showAddLog, setShowAddLog] = useState(false)
  const [deleteLog, setDeleteLog] = useState<InventoryLogEntry | null>(null)
  const [supplierDelete, setSupplierDelete] = useState<Supplier | null>(null)

  const stockValueStr = NGN + Math.round(stockTotal).toLocaleString()

  const ingredientStats = [
    {
      label: "Total Ingredients",
      value: String(totalItems),
      sub: `${totalItems} items tracked`,
      iconBg: "#dbeafe",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 1.167L12.833 4.083v5.834L7 12.833 1.167 9.917V4.083L7 1.167z"
            stroke="#155DFC"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      label: "Low / Out of Stock",
      value: String(lowStock + outOfStock),
      sub: `${outOfStock} out | ${lowStock} low`,
      iconBg: "#feeceb",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 1.167L12.833 12.833H1.167L7 1.167z"
            stroke="#E91835"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      label: "Well Stocked",
      value: String(wellStock),
      sub: "Items above minimum",
      iconBg: "#dcfce7",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2 7l3.5 3.5L12 3"
            stroke="#059669"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      label: "Total Stock Value",
      value: stockValueStr,
      sub: "Current inventory value",
      iconBg: "#dcfce7",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="5.833" stroke="#059669" strokeWidth="1.5" />
        </svg>
      ),
    },
  ]

  const logStats = [
    {
      label: "Total Movements",
      value: String(logEntries.length),
      sub: "All time log entries",
      iconBg: "#dbeafe",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2 7h10M7 2l5 5-5 5"
            stroke="#155DFC"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Stock In",
      value: String(logStockIn),
      sub: "Deliveries / restocks",
      iconBg: "#dcfce7",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 12V2M2 7l5-5 5 5"
            stroke="#059669"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Stock Out",
      value: String(logStockOut),
      sub: "Kitchen usage / sales",
      iconBg: "#feeceb",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 2v10M2 7l5 5 5-5"
            stroke="#E91835"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Wastage",
      value: String(logWastage),
      sub: "Spoilage / expiry",
      iconBg: "#fef9c3",
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 1.167L12.833 12.833H1.167L7 1.167z"
            stroke="#b45309"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
  ]

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleAddItem = async (form: AddItemForm) => {
    const success = await addIngredient(form)
    if (success) setShowAddItem(false)
  }

  const handleUpdateItem = async (id: string, form: AddItemForm) => {
    const success = await updateIngredient(id, form)
    if (success) setEditItem(null)
  }

  const handleDeleteItem = async () => {
    if (!deleteItem) return
    const success = await deleteIngredient(deleteItem)
    if (success) setDeleteItem(null)
  }

  const handleRestock = async (id: string, qty: number, note: string) => {
    const success = await restockIngredient(id, qty, note)
    if (success) setRestockItem(null)
  }

  const handleAddSupplier = async (form: AddSupplierForm) => {
    const success = await addSupplier(form)
    if (success) setShowAddSupplier(false)
  }

  const handleUpdateSupplier = async (id: string, form: AddSupplierForm) => {
    const success = await updateSupplier(id, form)
    if (success) setEditSupplier(null)
  }

  const handleDeleteSupplier = async () => {
    if (!supplierDelete) return
    const success = await deleteSupplier(supplierDelete)
    if (success) setSupplierDelete(null)
  }

  const handleAddLog = async (form: AddLogForm) => {
    const success = await addLogEntry(form)
    if (success) setShowAddLog(false)
  }

  const handleDeleteLog = () => {
    if (!deleteLog) return
    deleteLogEntry(deleteLog)
    setDeleteLog(null)
  }

  const handleAddClick = () => {
    if (activeTab === "Ingredients") setShowAddItem(true)
    else if (activeTab === "Supplier") setShowAddSupplier(true)
    else setShowAddLog(true)
  }

  // ── Table Columns ────────────────────────────────────────────────────────

  const ingredientColumns = makeIngredientColumns(
    (i: InventoryItem) => setEditItem(i),
    (i: InventoryItem) => setDeleteItem(i),
    (i: InventoryItem) => setRestockItem(i),
    loading
  )

  const supplierColumns = makeSupplierColumns(
    suppliers,
    (s) => setEditSupplier(s),
    (s) => setSupplierDelete(s)
  )

  const logColumns = makeLogColumns((e) => setDeleteLog(e))

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="page-bg flex h-screen flex-col overflow-hidden text-foreground">
      <Toaster position="top-center" richColors />

      <InventoryHeader
        activeTab={activeTab}
        onAddClick={handleAddClick}
        isLoading={loading}
        isReadOnly={isReadOnly}
      />

      <div className="page-border flex min-h-0 flex-1 overflow-hidden border-t">
        <AppSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={() => setShowLogout(true)}
          activeId="inventory"
        />

        <main className="page-surface flex-1 overflow-y-auto pb-[72px] md:pb-0">
          <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
            {/* Page Title */}
            <div className="flex items-start justify-between">
              <div>
                <h1
                  style={{
                    fontFamily: INTER,
                    fontWeight: 600,
                    fontSize: 18,
                    color: "var(--page-text)",
                  }}
                >
                  Inventory Management
                </h1>
                <p
                  className="hidden md:block"
                  style={{
                    fontFamily: INTER,
                    fontWeight: 400,
                    fontSize: 14,
                    color: "var(--page-text-muted)",
                    marginTop: 4,
                  }}
                >
                  Track ingredients, record deliveries, and stock auto-reduces
                  when dishes are sold
                </p>
              </div>
            </div>

            {/* Error banner */}
            {error && (
              <div
                className="flex items-center justify-between gap-3 rounded-xl px-4 py-3"
                style={{
                  background: "var(--c-primary-light)",
                  border: "1.5px solid #fecdd3",
                }}
              >
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 8v4m0 4h.01M2.5 19.5l9-16 9 16H2.5z"
                      stroke="#e91835"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    style={{
                      fontFamily: INTER,
                      fontSize: 13,
                      color: "#9f1239",
                    }}
                  >
                    {error}
                  </span>
                </div>
                <button
                  onClick={fetchIngredients}
                  style={{
                    fontFamily: INTER,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#e91835",
                    background: "none",
                    border: "1px solid #e91835",
                    borderRadius: 8,
                    padding: "4px 12px",
                    cursor: "pointer",
                  }}
                >
                  Retry
                </button>
              </div>
            )}

            {/* Low Stock Alerts */}
            {activeTab !== "Inventory Log" && (
              <LowStockAlerts items={items} onRestock={setRestockItem} />
            )}

            {/* Stats */}
            {activeTab !== "Inventory Log" ? (
              <>
                <InventoryStats stats={ingredientStats} />
                <InventoryStats stats={ingredientStats} isMobile />
              </>
            ) : (
              <InventoryStats stats={logStats} />
            )}

            {/* Tab Bar */}
            <TabBar active={activeTab} onChange={setActiveTab} />

            {/* Content */}
            {loading ? (
              <div className="flex flex-col gap-3">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className="h-12 animate-pulse rounded-xl"
                    style={{ background: "var(--page-surface-2)" }}
                  />
                ))}
              </div>
            ) : (
              <>
                {activeTab === "Ingredients" && items.length === 0 && (
                  <EmptyInventoryState
                    onAddClick={() => setShowAddItem(true)}
                  />
                )}
                {activeTab === "Ingredients" && items.length > 0 && (
                  <DataTable
                    rowKey="id"
                    columns={ingredientColumns}
                    data={items}
                    emptyDescription="No ingredients found."
                    searchPlaceholder="Search ingredients..."
                  />
                )}
                {activeTab === "Supplier" && (
                  <DataTable
                    rowKey="id"
                    columns={supplierColumns}
                    data={suppliers}
                    emptyDescription="No suppliers added yet."
                    searchPlaceholder="Search suppliers..."
                  />
                )}
                {activeTab === "Inventory Log" && (
                  <DataTable
                    rowKey="id"
                    columns={logColumns}
                    data={logEntries}
                    emptyDescription="No log entries yet. Stock movements appear here automatically when sales are made."
                    searchPlaceholder="Search log entries..."
                  />
                )}
              </>
            )}
          </div>
        </main>
      </div>

      <MobileBottomNav
        activeId="inventory"
        onLogout={() => setShowLogout(true)}
      />

      {/* Modals */}
      <AddInventoryModal
        open={showAddItem}
        onClose={() => setShowAddItem(false)}
        onAdd={handleAddItem}
      />

      <EditInventoryModal
        open={!!editItem}
        item={editItem}
        onClose={() => setEditItem(null)}
        onSave={handleUpdateItem}
      />

      <RestockModal
        open={!!restockItem}
        item={restockItem}
        onClose={() => setRestockItem(null)}
        onRestock={handleRestock}
      />

      <ConfirmModal
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDeleteItem}
        title="Delete Ingredient"
        description={`Are you sure you want to delete "${deleteItem?.name}"? This action cannot be undone.`}
        variant="danger"
        confirmLabel="Delete"
        cancelLabel="Cancel"
      />

      <AddSupplierModal
        open={showAddSupplier}
        onClose={() => setShowAddSupplier(false)}
        onAdd={handleAddSupplier}
      />

      <EditSupplierModal
        open={!!editSupplier}
        supplier={editSupplier}
        onClose={() => setEditSupplier(null)}
        onSave={handleUpdateSupplier}
      />

      <ConfirmModal
        open={!!supplierDelete}
        onClose={() => setSupplierDelete(null)}
        onConfirm={handleDeleteSupplier}
        title="Delete Supplier"
        description={`Remove "${deleteSupplier?.name}" from your suppliers?`}
        variant="danger"
        confirmLabel="Delete"
        cancelLabel="Cancel"
      />

      <AddLogModal
        open={showAddLog}
        onClose={() => setShowAddLog(false)}
        onAdd={handleAddLog}
        items={items}
      />

      <ConfirmModal
        open={!!deleteLog}
        onClose={() => setDeleteLog(null)}
        onConfirm={handleDeleteLog}
        title="Delete Log Entry"
        description="Remove this log entry? Note: this does not reverse any stock changes."
        variant="danger"
        confirmLabel="Delete"
        cancelLabel="Cancel"
      />

      {showLogout && (
        <LogoutConfirmationModal
          isOpen={showLogout}
          onConfirm={() => {
            window.location.href = "/login"
          }}
          onCancel={() => setShowLogout(false)}
        />
      )}
    </div>
  )
}
