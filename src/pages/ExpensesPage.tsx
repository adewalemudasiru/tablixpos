import { useState } from "react"
import { LogoutConfirmationModal } from "../components/LogoutConfirmationModal"
import { AppSidebar, MobileBottomNav } from "../components/AppSidebar"
import { ConfirmModal } from "../components/ds/Modal"
import { Toaster } from "sonner"
import { useAppStore, type Expense } from "../store/AppContext"

// New components
import { Button } from "../components/ds/Button"
import { ExpensesHeader } from "../components/expenses/ExpensesHeader"
import { ExpensesTable } from "../components/expenses/ExpensesTable"
import { MobileExpenseCard } from "../components/expenses/MobileExpenseCard"
import { ExpenseStats } from "../components/expenses/ExpenseStats"
import {
  ExpenseFormModal,
  type ExpenseForm,
} from "../components/expenses/ExpenseFormModal"
import { useExpenses } from "../hooks/useExpenses"
import { colors } from "../components/ds/tokens"

const INTER = "'Inter', sans-serif"
const NGN = "\u20a6"

function fmtAmount(n: number) {
  return `${NGN}${n.toLocaleString()}`
}

export default function ExpensesPage() {
  const { isReadOnly } = useAppStore()
  const {
    expenses,
    loading,
    error,
    fetchExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    approvedTotal,
    thisMonthTotal,
    pendingCount,
    pendingTotal,
    uniqueCategories,
    toEditForm,
  } = useExpenses()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editExpense, setEditExpense] = useState<Expense | null>(null)
  const [deleteExp, setDeleteExp] = useState<Expense | null>(null)

  const STAT_CARDS = [
    {
      label: "This Month Total",
      value: fmtAmount(thisMonthTotal),
      sub: `${expenses.length} ${expenses.length === 1 ? "entry" : "entries"}`,
      iconBg: colors.primaryLight,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
            stroke={colors.primary}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Approved Total",
      value: fmtAmount(approvedTotal),
      sub: `${expenses.filter((e) => e.status === "Approved").length} approved`,
      iconBg: colors.successBg,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M22 11.08V12a10 10 0 11-5.93-9.14"
            stroke={colors.successText}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="22 4 12 14.01 9 11.01"
            stroke={colors.successText}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Pending Review",
      value: String(pendingCount),
      sub: `${fmtAmount(pendingTotal)} pending`,
      iconBg: colors.warningBg,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke={colors.warningText}
            strokeWidth="2"
          />
          <polyline
            points="12 6 12 12 16 14"
            stroke={colors.warningText}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Categories",
      value: String(uniqueCategories.length),
      sub: "unique categories",
      iconBg: colors.infoBg,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="3"
            width="7"
            height="7"
            rx="1"
            stroke={colors.infoText}
            strokeWidth="2"
          />
          <rect
            x="14"
            y="3"
            width="7"
            height="7"
            rx="1"
            stroke={colors.infoText}
            strokeWidth="2"
          />
          <rect
            x="3"
            y="14"
            width="7"
            height="7"
            rx="1"
            stroke={colors.infoText}
            strokeWidth="2"
          />
          <rect
            x="14"
            y="14"
            width="7"
            height="7"
            rx="1"
            stroke={colors.infoText}
            strokeWidth="2"
          />
        </svg>
      ),
    },
  ]

  const handleAddExpense = async (form: ExpenseForm) => {
    const success = await addExpense(form)
    if (success) setShowAddModal(false)
  }

  const handleEditExpense = async (form: ExpenseForm) => {
    if (!editExpense) return
    const success = await updateExpense(editExpense.id, form)
    if (success) setEditExpense(null)
  }

  const handleDeleteExpense = async () => {
    if (!deleteExp) return
    const success = await deleteExpense(deleteExp.id)
    if (success) setDeleteExp(null)
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      )
    }

    if (error) {
      return (
        <div
          className="flex items-center justify-between gap-3 rounded-xl px-4 py-3"
          style={{
            background: "var(--c-danger-bg)",
            border: "1px solid var(--c-danger-dot)",
          }}
        >
          <span
            style={{
              fontFamily: INTER,
              fontSize: 13,
              color: "var(--c-danger)",
            }}
          >
            {error}
          </span>
          <Button variant="outline" size="sm" onClick={fetchExpenses}>
            Retry
          </Button>
        </div>
      )
    }

    return (
      <>
        {/* Mobile */}
        <div className="flex flex-col gap-3 md:hidden">
          {expenses.length === 0 ? (
            <p
              style={{
                fontFamily: INTER,
                fontSize: 13,
                color: colors.textMuted,
                textAlign: "center",
                padding: "32px 0",
              }}
            >
              No expenses found
            </p>
          ) : (
            expenses.map((e) => (
              <MobileExpenseCard
                key={e.id}
                expense={e}
                onEdit={() => setEditExpense(e)}
                onDelete={() => setDeleteExp(e)}
              />
            ))
          )}
        </div>

        {/* Desktop */}
        <div className="hidden md:block">
          <ExpensesTable
            expenses={expenses}
            onEdit={setEditExpense}
            onDelete={setDeleteExp}
          />
        </div>
      </>
    )
  }

  return (
    <div className="page-bg flex h-screen flex-col overflow-hidden text-foreground">
      <Toaster position="top-center" richColors />

      <ExpensesHeader
        onAddClick={() => setShowAddModal(true)}
        isReadOnly={isReadOnly}
        isLoading={loading}
      />

      <div className="page-border flex min-h-0 flex-1 overflow-hidden border-t">
        <AppSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={() => setShowLogout(true)}
          activeId="expenses"
        />

        <main className="page-surface flex-1 overflow-y-auto pb-[72px] md:pb-0">
          <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
            {/* Heading */}
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
                  Expense Management
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
                  Track, manage and monitor all business expenses
                </p>
              </div>
            </div>

            {/* Stats */}
            <ExpenseStats stats={STAT_CARDS} isMobile />
            <ExpenseStats stats={STAT_CARDS} />

            {/* Content */}
            {renderContent()}
          </div>
        </main>
      </div>

      <MobileBottomNav
        activeId="expenses"
        onLogout={() => setShowLogout(true)}
      />

      {/* Modals */}
      <ExpenseFormModal
        open={showAddModal || !!editExpense}
        onClose={() => {
          setShowAddModal(false)
          setEditExpense(null)
        }}
        initial={editExpense ? toEditForm(editExpense) : null}
        onSave={editExpense ? handleEditExpense : handleAddExpense}
      />

      <ConfirmModal
        open={!!deleteExp}
        onClose={() => setDeleteExp(null)}
        onConfirm={handleDeleteExpense}
        title="Delete Expense"
        description={
          deleteExp
            ? `Remove "${deleteExp.description}" (${fmtAmount(deleteExp.amount)})? This cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        variant="danger"
      />

      <LogoutConfirmationModal
        isOpen={showLogout}
        onConfirm={() => setShowLogout(false)}
        onCancel={() => setShowLogout(false)}
      />
    </div>
  )
}
