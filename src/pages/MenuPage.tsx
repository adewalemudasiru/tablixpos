import { useState } from "react"
import { LogoutConfirmationModal } from "../components/LogoutConfirmationModal"
import { AppSidebar, MobileBottomNav } from "../components/AppSidebar"
import { ConfirmModal } from "../components/ds/Modal"
import { colors, font } from "../components/ds/tokens"
import { MenuModal } from "@/components/menu/MenuModal"
import { CategoryModal } from "@/components/menu/CategoryModal"
import { CategoryTab } from "@/components/menu/CategoryTab"
import { CategoryTable } from "@/components/menu/CategoryTable"
import { Pagination } from "@/components/menu/Pagination"

// New components
import { MenuHeader } from "@/components/menu/MenuHeader"
import { MenuPageHeader } from "@/components/menu/MenuPageHeader"
import { MenuTabs } from "@/components/menu/MenuTabs"
import { MenuToolbar } from "@/components/menu/MenuToolbar"
import { MenuLoadingState } from "@/components/menu/MenuLoadingState"
import { MenuErrorState } from "@/components/menu/MenuErrorState"
import { MobileMenuHeader } from "@/components/menu/MobileMenuHeader"
import { MobileMenuList } from "@/components/menu/MobileMenuList"
import { MobileCategoryList } from "@/components/menu/MobileCategoryList"
import { MenuItemDetailSheet } from "@/components/menu/MenuItemDetailSheet"
import { CategoryDetailSheet } from "@/components/menu/CategoryDetailSheet"
import { ImportExportSheet } from "@/components/menu/ImportExportSheet"
import { useMenuData } from "@/hooks/useMenuData"
import { useMenuOperations } from "@/hooks/useMenuOperations"
import type { ActiveTab } from "@/components/menu/MenuTabs"
import { Input } from "../components/ds/Input"
import { Button } from "../components/ds/Button"
import type {
  Category,
  CategoryForm,
  MenuForm,
  MenuItem,
} from "@/types/menu/menu"
import { menuAPI } from "@/services/api"
import { IconPlus, IconSearch } from "@tabler/icons-react"

const ITEMS_PER_PAGE = 4

export default function MenuPage() {
  const { categories, items, loading, apiError, localInventory, loadData } =
    useMenuData()
  const {
    saveMenuItem,
    deleteMenuItem,
    toggleMenuItem,
    saveCategory,
    toggleCategoryStatus,
    deleteCategory,
  } = useMenuOperations(loadData)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [activeTab, setActiveTab] = useState<ActiveTab>("Menu Item")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState<MenuItem | null>(null)
  const [deleteItem, setDeleteItem] = useState<MenuItem | null>(null)
  const [showCatModal, setShowCatModal] = useState(false)
  const [editCategory, setEditCategory] = useState<Category | null>(null)
  const [showImportExport, setShowImportExport] = useState(false)
  const [sheetItem, setSheetItem] = useState<MenuItem | null>(null)
  const [sheetCat, setSheetCat] = useState<Category | null>(null)

  // Filter & group
  const filtered = items.filter(
    (i) =>
      (i.name || "").toLowerCase().includes((search || "").toLowerCase()) ||
      (i.category || "").toLowerCase().includes((search || "").toLowerCase())
  )

  const grouped = categories.reduce<{ cat: Category; items: MenuItem[] }[]>(
    (acc, cat) => {
      const catItems = filtered.filter((i) => i.category === cat.name)
      if (catItems.length > 0) acc.push({ cat, items: catItems })
      return acc
    },
    []
  )

  const ungrouped = filtered.filter(
    (i) => !categories.some((c) => c.name === i.category)
  )
  if (ungrouped.length > 0) {
    grouped.push({
      cat: { id: "other", name: "Other", description: "", active: true },
      items: ungrouped,
    })
  }

  const totalPages = Math.ceil(grouped.length / ITEMS_PER_PAGE)
  const paginated = grouped.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  // Handlers
  const handleSaveItem = async (form: MenuForm) => {
    await saveMenuItem(form, editItem, categories)
    setEditItem(null)
  }

  const handleDeleteItem = async () => {
    if (!deleteItem) return
    await deleteMenuItem(deleteItem.id)
    setDeleteItem(null)
  }

  const handleToggleItem = async (id: string) => {
    const item = items.find((i) => i.id === id)
    if (item) {
      await toggleMenuItem(id, item.available)
    }
  }

  const handleSaveCategory = async (form: CategoryForm) => {
    await saveCategory(form, editCategory, categories)
    setEditCategory(null)
  }

  const handleToggleCategory = async (id: string) => {
    const cat = categories.find((c) => c.id === id)
    if (cat) {
      await toggleCategoryStatus(id, cat.active)
    }
  }

  const handleDeleteCategory = async (id: string) => {
    await deleteCategory(id)
  }

  const openEditItem = (item: MenuItem) => {
    setEditItem(item)
    setShowModal(true)
  }

  const openCategoryModal = (cat?: Category) => {
    setEditCategory(cat ?? null)
    setShowCatModal(true)
  }

  // Import/Export handlers
  const handleExport = () => {
    const csvRows = [
      ["Item Name", "Price", "Category", "Available", "Variants", "Add-ons"],
      ...items.map((item) => [
        item.name,
        item.price,
        item.category || "",
        item.available ? "Yes" : "No",
        item.variants.map((v) => `${v.name}(+${v.price})`).join(";"),
        item.addons.map((a) => `${a.name}(+${a.price})`).join(";"),
      ]),
    ]
    const csvContent = csvRows
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `menu-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    setShowImportExport(false)
  }

  const handleImport = async (file: File) => {
    try {
      const text = await file.text()
      const lines = text
        .split("\n")
        .slice(1)
        .filter((l) => l.trim())
      let imported = 0

      for (const line of lines) {
        const cells = line.split(",").map((c) => c.replace(/^"|"$/g, ""))
        if (cells.length < 2 || !cells[0]) continue

        const name = cells[0]
        const price = parseFloat(cells[1]) || 0
        const category = cells[2] || ""
        const variants = cells[4]
          ? cells[4].split(";").map((v) => {
              const [vName, vPrice] = v.split("(+")
              return {
                id: `v${Date.now()}-${Math.random()}`,
                name: vName,
                price: parseFloat(vPrice?.replace(")", "") || "0") || 0,
              }
            })
          : []
        const addons = cells[5]
          ? cells[5].split(";").map((a) => {
              const [aName, aPrice] = a.split("(+")
              return {
                id: `a${Date.now()}-${Math.random()}`,
                name: aName,
                price: parseFloat(aPrice?.replace(")", "") || "0") || 0,
              }
            })
          : []

        const categoryId =
          categories.find((c) => c.name === category)?.id ?? null
        await menuAPI.createItem({
          name,
          price,
          categoryId,
          imageUrl: "",
          available: true,
          variants,
          addons,
          ingredients: [],
        })
        imported++
      }

      alert(
        `Successfully imported ${imported} menu item${imported !== 1 ? "s" : ""}`
      )
      setShowImportExport(false)
      await loadData()
    } catch (err) {
      console.error("Import failed", err)
      alert("Import failed. Please check the file format.")
    }
  }

  const handleImportClick = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".csv,.xlsx,.xls"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) handleImport(file)
    }
    input.click()
  }

  return (
    <div className="page-bg flex h-screen flex-col overflow-hidden text-foreground">
      <MenuHeader />

      {/* Body */}
      <div className="page-border flex min-h-0 flex-1 overflow-hidden border-t">
        <AppSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={() => setShowLogout(true)}
          activeId="menu"
        />

        {/* ── MOBILE layout ── */}
        <div className="page-surface flex flex-1 flex-col overflow-hidden md:hidden">
          <MobileMenuHeader
            activeTab={activeTab}
            onTabChange={setActiveTab}
            search={search}
            onSearchChange={(v) => {
              setSearch(v)
              setPage(1)
            }}
            onAddClick={() => {
              if (activeTab === "Menu Item") {
                setEditItem(null)
                setShowModal(true)
              } else {
                openCategoryModal()
              }
            }}
          />

          <div className="flex-1 overflow-y-auto pb-[80px]">
            <div className="px-4 py-2">
              <p
                style={{
                  fontFamily: font.family,
                  fontWeight: font.weight.semibold,
                  fontSize: font.size.sm,
                  color: colors.textMuted,
                }}
              >
                {activeTab === "Menu Item"
                  ? `${filtered.length} Item${filtered.length !== 1 ? "s" : ""}`
                  : `${categories.filter((c) => (c.name || "").toLowerCase().includes((search || "").toLowerCase())).length} Categor${categories.length !== 1 ? "ies" : "y"}`}
              </p>
            </div>

            <div
              className="page-card mx-4 mb-4 overflow-hidden rounded-2xl"
              style={{
                border: `1px solid ${colors.borderLight}`,
                boxShadow: "var(--shadow-card)",
              }}
            >
              {activeTab === "Menu Item" ? (
                <MobileMenuList items={filtered} onItemClick={setSheetItem} />
              ) : (
                <MobileCategoryList
                  categories={categories}
                  items={items}
                  onCategoryClick={setSheetCat}
                  search={search}
                />
              )}
            </div>
          </div>
        </div>

        {/* ── DESKTOP layout ── */}
        <main className="page-surface hidden flex-1 overflow-y-auto pb-0 md:block">
          <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
            <MenuPageHeader />

            {loading && <MenuLoadingState />}

            {!loading && apiError && (
              <MenuErrorState error={apiError} onRetry={loadData} />
            )}

            {!loading && !apiError && (
              <>
                <MenuTabs activeTab={activeTab} onTabChange={setActiveTab} />

                {/* Menu Items Tab */}
                {activeTab === "Menu Item" && (
                  <div className="flex flex-col gap-5">
                    <MenuToolbar
                      search={search}
                      onSearchChange={(v) => {
                        setSearch(v)
                        setPage(1)
                      }}
                      onAddClick={() => {
                        setEditItem(null)
                        setShowModal(true)
                      }}
                      onImportClick={handleImportClick}
                      onExportClick={handleExport}
                      onImportExportClick={() => setShowImportExport(true)}
                      searchPlaceholder="Search menu items…"
                    />

                    {paginated.length === 0 ? (
                      <div
                        className="page-card flex flex-col items-center justify-center gap-3 rounded-2xl py-20"
                        style={{ border: `1px solid ${colors.borderMid}` }}
                      >
                        <div
                          className="flex size-14 items-center justify-center rounded-2xl"
                          style={{ background: colors.primaryMid }}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M3 3h18l-2 13H5L3 3z"
                              stroke={colors.primary}
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <circle
                              cx="9"
                              cy="20"
                              r="1"
                              stroke={colors.primary}
                              strokeWidth="1.8"
                            />
                            <circle
                              cx="17"
                              cy="20"
                              r="1"
                              stroke={colors.primary}
                              strokeWidth="1.8"
                            />
                          </svg>
                        </div>
                        <p
                          style={{
                            fontFamily: font.family,
                            fontWeight: font.weight.semibold,
                            fontSize: font.size.lg,
                            color: colors.textPrimary,
                          }}
                        >
                          No menu items found
                        </p>
                        <p
                          style={{
                            fontFamily: font.family,
                            fontSize: font.size.base,
                            color: colors.textMuted,
                          }}
                        >
                          Add your first item or try a different search.
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-6">
                        {paginated.map(({ cat, items: catItems }) => (
                          <CategoryTable
                            key={cat.id}
                            categoryName={cat.name}
                            items={catItems}
                            onEdit={openEditItem}
                            onDelete={setDeleteItem}
                            onToggle={handleToggleItem}
                          />
                        ))}
                      </div>
                    )}

                    <Pagination
                      page={page}
                      totalPages={totalPages}
                      onChange={setPage}
                    />
                  </div>
                )}

                {/* Categories Tab */}
                {activeTab === "Category" && (
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="min-w-[180px] flex-1">
                        <Input
                          placeholder="Search categories…"
                          value={search}
                          onChange={(e) => {
                            setSearch(e.target.value)
                            setPage(1)
                          }}
                          leftIcon={<IconSearch />}
                        />
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        leftIcon={<IconPlus />}
                        onClick={() => openCategoryModal()}
                      >
                        Add Category
                      </Button>
                    </div>

                    <CategoryTab
                      categories={categories.filter((c) =>
                        (c.name || "")
                          .toLowerCase()
                          .includes((search || "").toLowerCase())
                      )}
                      items={items}
                      onOpenModal={openCategoryModal}
                      onToggleStatus={handleToggleCategory}
                      onEdit={(cat) => openCategoryModal(cat)}
                      onDelete={handleDeleteCategory}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      <MenuModal
        open={showModal}
        onClose={() => {
          setShowModal(false)
          setEditItem(null)
        }}
        onSave={handleSaveItem}
        categories={categories}
        editItem={editItem}
        inventoryItems={localInventory}
      />

      <ConfirmModal
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDeleteItem}
        title="Delete Menu Item"
        description={`Are you sure you want to delete "${deleteItem?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
      />

      <CategoryModal
        open={showCatModal}
        onClose={() => {
          setShowCatModal(false)
          setEditCategory(null)
        }}
        onSave={handleSaveCategory}
        editCategory={editCategory}
      />

      {showLogout && (
        <LogoutConfirmationModal
          isOpen={showLogout}
          onCancel={() => setShowLogout(false)}
        />
      )}

      <MobileBottomNav activeId="menu" onLogout={() => setShowLogout(true)} />

      {/* Sheets */}
      <MenuItemDetailSheet
        item={sheetItem}
        onClose={() => setSheetItem(null)}
        onEdit={(item) => {
          openEditItem(item)
          setSheetItem(null)
        }}
        onDelete={(item) => {
          setDeleteItem(item)
          setSheetItem(null)
        }}
        onToggle={handleToggleItem}
      />

      <CategoryDetailSheet
        category={sheetCat}
        items={items}
        onClose={() => setSheetCat(null)}
        onEdit={(cat) => {
          openCategoryModal(cat)
          setSheetCat(null)
        }}
        onDelete={(id) => {
          handleDeleteCategory(id)
          setSheetCat(null)
        }}
        onToggle={handleToggleCategory}
      />

      <ImportExportSheet
        open={showImportExport}
        onClose={() => setShowImportExport(false)}
        onImport={handleImportClick}
        onExport={handleExport}
      />
    </div>
  )
}
