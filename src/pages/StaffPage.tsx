import { useState } from "react"
import { useAppStore } from "../store/AppContext"
import { LogoutConfirmationModal } from "../components/LogoutConfirmationModal"
import { AppSidebar, MobileBottomNav } from "../components/AppSidebar"
import { Toaster } from "sonner"
import { ConfirmModal } from "../components/ds/Modal"
import { ResetPinModal } from "@/components/staff-page/ResetPinModal"
import { StaffModal } from "@/components/staff-page/StaffModal"
import { RolesManagementTab } from "@/components/staff-page/RolesManagementTab"
import { ActivityLog } from "@/components/staff-page/ActivityLog"

// Import new components
import { StaffHeader } from "../components/staff-page/StaffHeader"
import { StaffTabs } from "../components/staff-page/StaffTabs"
import { StaffTable } from "../components/staff-page/StaffTable"
import { StaffMobileSearch } from "../components/staff-page/StaffMobileSearch"
import { StaffMobileList } from "../components/staff-page/StaffMobileList"
import { StaffDetailSheet } from "../components/staff-page/StaffDetailSheet"
import { useStaffData } from "../hooks/useStaffData"
import { getStaffStats } from "../utils/staff-helpers"
import { StaffStats } from "@/components/staff-page/StaffStats"
import type { Staff, StaffTab } from "@/types/staff-page/staff"

const PAGE_SIZE = 10

export default function StaffPage() {
  const { isReadOnly, roles, kotEnabled } = useAppStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [activeTab, setActiveTab] = useState<StaffTab>("Team")
  const [showModal, setShowModal] = useState(false)
  const [editStaff, setEditStaff] = useState<Staff | null>(null)
  const [deleteStaff, setDeleteStaff] = useState<Staff | null>(null)
  const [resetStaff, setResetStaff] = useState<Staff | null>(null)
  const [sheetStaff, setSheetStaff] = useState<Staff | null>(null)

  const {
    staff,
    loading,
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    page,
    setPage,
    filtered,
    paginated,
    handleSave,
    handleDelete,
    handleResetPin,
  } = useStaffData()

  const stats = getStaffStats(staff, roles)

  const openEdit = (s: Staff | null) => {
    setEditStaff(s)
    setShowModal(true)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteStaff) return
    const success = await handleDelete(deleteStaff)
    if (success) setDeleteStaff(null)
  }

  const handleResetPinConfirm = async (newPin: string) => {
    if (!resetStaff) return
    const success = await handleResetPin(resetStaff, newPin)
    if (success) setResetStaff(null)
  }

  return (
    <div className="page-bg flex h-screen flex-col overflow-hidden text-foreground">
      <Toaster position="top-center" richColors />
      <StaffHeader />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <AppSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={() => setShowLogout(true)}
          activeId="staff"
        />

        {/* MOBILE layout */}
        <div className="page-surface-2 flex flex-1 flex-col overflow-hidden md:hidden">
          <StaffMobileSearch
            search={search}
            onSearchChange={(val) => {
              setSearch(val)
              setPage(1)
            }}
            onAddClick={() => {
              setEditStaff(null)
              setShowModal(true)
            }}
          />

          <div className="flex-1 overflow-y-auto pb-[80px]">
            <div
              className="flex gap-3 overflow-x-auto px-4 pt-4 pb-3"
              style={{ scrollbarWidth: "none" }}
            >
              {/* Mobile stats would go here - simplified for brevity */}
            </div>

            <div className="flex items-center justify-between px-4 py-2">
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "var(--page-text-muted)",
                }}
              >
                {filtered.length} Staff Member{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>

            <StaffMobileList
              staff={paginated}
              roles={roles}
              onStaffClick={setSheetStaff}
            />
          </div>
        </div>

        {/* DESKTOP layout */}
        <main className="page-surface hidden flex-1 flex-col gap-6 overflow-y-auto p-6 md:flex lg:p-8">
          <div>
            <h1
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 18,
                color: "var(--page-text)",
              }}
            >
              Staff Management
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: 14,
                color: "var(--page-text-muted)",
                marginTop: 4,
              }}
            >
              Manage your team, permissions, and activity
            </p>
          </div>

          <StaffStats stats={stats} />
          <StaffTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === "Activity" && <ActivityLog staff={staff} />}
          {activeTab === "Roles & Permissions" && <RolesManagementTab />}

          {activeTab === "Team" && (
            <StaffTable
              staff={filtered}
              loading={loading}
              search={search}
              roleFilter={roleFilter}
              page={page}
              pageSize={PAGE_SIZE}
              kotEnabled={kotEnabled}
              roles={roles}
              onEdit={openEdit}
              onResetPin={setResetStaff}
              onDelete={setDeleteStaff}
              onSearchChange={(val) => {
                setSearch(val)
                setPage(1)
              }}
              onRoleFilterChange={(val) => {
                setRoleFilter(val)
                setPage(1)
              }}
              onPageChange={setPage}
            />
          )}
        </main>
      </div>

      <MobileBottomNav activeId="staff" onLogout={() => setShowLogout(true)} />

      <StaffDetailSheet
        staff={sheetStaff}
        roles={roles}
        kotEnabled={kotEnabled}
        open={!!sheetStaff}
        onClose={() => setSheetStaff(null)}
        onEdit={openEdit}
        onResetPin={setResetStaff}
        onDelete={setDeleteStaff}
      />

      <StaffModal
        open={showModal}
        onClose={() => {
          setShowModal(false)
          setEditStaff(null)
        }}
        onSave={async (form) => {
          const success = await handleSave(form, editStaff)
          if (success) {
            setShowModal(false)
            setEditStaff(null)
          }
        }}
        editStaff={editStaff}
        roles={roles}
      />

      <ResetPinModal
        open={!!resetStaff}
        onClose={() => setResetStaff(null)}
        onReset={handleResetPinConfirm}
        staff={resetStaff}
      />

      <ConfirmModal
        open={!!deleteStaff}
        onClose={() => setDeleteStaff(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Staff Member"
        description={`Are you sure you want to remove ${deleteStaff?.name}? This action cannot be undone.`}
        variant="danger"
        confirmLabel="Yes, Delete"
        cancelLabel="Cancel"
      />

      <LogoutConfirmationModal
        isOpen={showLogout}
        onCancel={() => setShowLogout(false)}
        onConfirm={() => setShowLogout(false)}
      />
    </div>
  )
}
