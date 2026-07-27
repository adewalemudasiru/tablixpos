// CustomerPage.tsx
import React, { useState, useMemo, useEffect, useCallback } from "react"
import { useAppStore } from "../store/AppContext"
import type { StoreCustomer as Customer } from "../store/AppContext"
import { customersAPI } from "../services/api"
import type { ApiCustomer } from "../services/api"

import { LogoutConfirmationModal } from "../components/LogoutConfirmationModal"
import { AppSidebar, MobileBottomNav } from "../components/AppSidebar"
import { StatCard } from "../components/ds/StatCard"
import { EmptyState } from "../components/ds/EmptyState"
import { toast, Toaster } from "sonner"
import { IconSearch } from "@tabler/icons-react"
import { ConfirmModal } from "@/components/modals/ConfirmModal"
import { CustomerDetailSheet } from "@/components/customer/CustomerDetailSheet"
import { Pagination } from "@/components/customer/Pagination"
import { CustomerModal } from "@/components/customer/CustomerModal"

// New components
import { CustomerHeader } from "@/components/customer/CustomerHeader"
import { SearchModal } from "@/components/customer/SearchModal"
import { ErrorBanner } from "@/components/customer/ErrorBanner"
import { LoadingSpinner } from "@/components/customer/LoadingSpinner"
import { MobileHeader } from "@/components/customer/MobileHeader"
import { DesktopHeader } from "@/components/customer/DesktopHeader"
import { MobileCustomerList } from "@/components/customer/MobileCustomerList"
import { DesktopCustomerCard } from "@/components/customer/DesktopCustomerCard"
import { MobilePagination } from "@/components/customer/MobilePagination"

import { colors } from "../components/ds/tokens"
import { font, shadows } from "../components/ds"
import { fmt } from "@/utils/customer-helpers"
import { mockApiCustomers } from "@/mock-data/customer"

// ─── Types ────────────────────────────────────────────────────────────────────

interface CustomerForm {
  name: string
  phone: string
  email: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const PAGE_SIZE = 10
const EMPTY_FORM: CustomerForm = { name: "", phone: "", email: "" }

function mapApiCustomer(c: ApiCustomer): Customer {
  return {
    id: c.id,
    name: `${c.firstName} ${c.lastName}`,
    phone: c.phone,
    email: c.email ?? "",
    totalSpent: c.totalSpent,
    visitCount: c.visitCount,
    lastVisit: c.createdAt.split("T")[0],
    joinDate: c.createdAt.split("T")[0],
    loyaltyPoints: c.loyaltyPoints,
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CustomerPage({
  isEmbedded = false,
}: {
  isEmbedded?: boolean
}) {
  const { isReadOnly, theme } = useAppStore()
  const isDark = theme === "dark"

  // State
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null)
  const [deleteCustomer, setDeleteCustomer] = useState<Customer | null>(null)
  const [sheetCustomer, setSheetCustomer] = useState<Customer | null>(null)
  const [showSearchModal, setShowSearchModal] = useState(false)

  // Data fetching
  const fetchCustomers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await customersAPI.list()
      const apiCustomers = res.data.customers ?? []
      setCustomers([
        ...mockApiCustomers.map(mapApiCustomer),
        ...apiCustomers.map(mapApiCustomer),
      ])
    } catch (e: any) {
      setCustomers(mockApiCustomers.map(mapApiCustomer))
      setError(e?.data?.message ?? "Failed to load customers.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

  // Derived data
  const filtered = useMemo(
    () =>
      customers.filter(
        (c) =>
          (c.name || "").toLowerCase().includes((search || "").toLowerCase()) ||
          c.phone.includes(search) ||
          (c.email || "").toLowerCase().includes((search || "").toLowerCase())
      ),
    [customers, search]
  )

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)

  const totalRevenue = customers.reduce((s, c) => s + c.totalSpent, 0)
  const activeThisMonth = customers.filter((c) => {
    const d = new Date(c.lastVisit)
    return d.getFullYear() === 2026 && d.getMonth() === 2
  }).length
  const avgSpend = customers.length ? totalRevenue / customers.length : 0

  // Stat cards data
  const statCards = [
    {
      label: "Total Customers",
      value: String(customers.length),
      sub: `+${customers.filter((c) => c.joinDate >= "2026-01-01").length} this year`,
      iconBg: colors.primaryLight,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
            stroke={colors.primary}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="7" r="4" stroke={colors.primary} strokeWidth="2" />
          <path
            d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
            stroke={colors.primary}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Active This Month",
      value: String(activeThisMonth),
      sub: "Visited in March 2026",
      iconBg: colors.successBg,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <polyline
            points="22 12 18 12 15 21 9 3 6 12 2 12"
            stroke={colors.successText}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Total Revenue",
      value: fmt(totalRevenue),
      sub: "From all customers",
      iconBg: colors.infoBg,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <line
            x1="12"
            y1="1"
            x2="12"
            y2="23"
            stroke={colors.infoText}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
            stroke={colors.infoText}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Avg. Spend",
      value: fmt(Math.round(avgSpend)),
      sub: "Per customer",
      iconBg: colors.warningBg,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 20V10M12 20V4M6 20v-6"
            stroke={colors.warningText}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ]

  // Handlers
  const handleSave = async (form: CustomerForm) => {
    const nameParts = form.name.trim().split(/\s+/)
    const firstName = nameParts[0] ?? ""
    const lastName = nameParts.slice(1).join(" ") || firstName
    try {
      if (editCustomer) {
        await customersAPI.update(editCustomer.id, {
          firstName,
          lastName,
          phone: form.phone,
          email: form.email || undefined,
        })
        toast.success("Customer updated")
      } else {
        await customersAPI.create({
          firstName,
          lastName,
          phone: form.phone,
          email: form.email || undefined,
        })
        toast.success("Customer added")
      }
      setShowModal(false)
      setEditCustomer(null)
      await fetchCustomers()
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Failed to save customer.")
      setError(e?.data?.message ?? "Failed to save customer.")
    }
  }

  const handleDelete = async () => {
    if (!deleteCustomer) return
    try {
      await customersAPI.remove(deleteCustomer.id)
      toast.success("Customer deleted")
      await fetchCustomers()
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Failed to delete customer.")
      setError(e?.data?.message ?? "Failed to delete customer.")
    }
    setDeleteCustomer(null)
  }

  const openEdit = (c: Customer) => {
    setEditCustomer(c)
    setShowModal(true)
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  // ─── Render ──────────────────────────────────────────────────────────────────

  const content = (
    <>
      <Toaster position="top-center" richColors />

      <CustomerHeader
        isEmbedded={isEmbedded}
        isDark={isDark}
        onSearchClick={() => setShowSearchModal(true)}
        onAddClick={() => {
          setEditCustomer(null)
          setShowModal(true)
        }}
        isReadOnly={isReadOnly}
      />

      <SearchModal
        isOpen={showSearchModal}
        isDark={isDark}
        search={search}
        onSearchChange={handleSearchChange}
        onClose={() => setShowSearchModal(false)}
      />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {!isEmbedded && (
          <AppSidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onLogout={() => setShowLogout(true)}
            activeId="customers"
          />
        )}

        {/* ── MOBILE layout ── */}
        <div className="flex flex-1 flex-col overflow-hidden bg-[var(--page-surface)] md:hidden">
          <MobileHeader
            isDark={isDark}
            onSearchClick={() => setShowSearchModal(true)}
            onAddClick={() => {
              setEditCustomer(null)
              setShowModal(true)
            }}
            isReadOnly={isReadOnly}
          />

          {error && (
            <ErrorBanner
              error={error}
              onRetry={fetchCustomers}
              className="mx-4 mt-3"
            />
          )}

          {loading ? (
            <LoadingSpinner className="flex-1" />
          ) : (
            <div className="flex-1 overflow-y-auto pb-[80px]">
              {/* Stat cards */}
              <div
                className="flex scrollbar-none gap-3 overflow-x-auto px-4 pt-4 pb-3"
                style={{ scrollbarWidth: "none" }}
              >
                {statCards.map((s) => (
                  <StatCard
                    key={s.label}
                    label={s.label}
                    value={s.value}
                    sub={s.sub}
                    iconBg={s.iconBg}
                    icon={s.icon}
                    compact
                    className="shrink-0"
                    style={{ minWidth: 155 }}
                  />
                ))}
              </div>

              {/* Section header */}
              <div className="flex items-center justify-between px-4 py-2">
                <p
                  style={{
                    fontFamily: font.family,
                    fontWeight: font.weight.semibold,
                    fontSize: font.size.sm,
                    color: colors.textMuted,
                  }}
                >
                  {filtered.length} Customer{filtered.length !== 1 ? "s" : ""}
                </p>
              </div>

              {/* Customer list */}
              <div
                className="mx-4 mb-4 overflow-hidden rounded-2xl"
                style={{
                  background: "var(--page-card-bg)",
                  border: "1px solid var(--page-border)",
                  boxShadow: shadows.card,
                }}
              >
                <MobileCustomerList
                  customers={paginated}
                  onCustomerClick={setSheetCustomer}
                />
              </div>

              {/* Mobile Pagination */}
              <MobilePagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>

        {/* ── DESKTOP layout ── */}
        <main
          className={`hidden flex-1 overflow-y-auto md:block ${
            isEmbedded ? (isDark ? "bg-[#1c1c1e]" : "bg-[#f4f4f6]") : ""
          }`}
          style={isEmbedded ? {} : { background: "var(--page-surface)" }}
        >
          <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
            <DesktopHeader
              isDark={isDark}
              onSearchClick={() => setShowSearchModal(true)}
              onAddClick={() => {
                setEditCustomer(null)
                setShowModal(true)
              }}
              isReadOnly={isReadOnly}
            />

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              {statCards.map((s) => (
                <StatCard
                  key={s.label}
                  label={s.label}
                  value={s.value}
                  sub={s.sub}
                  iconBg={s.iconBg}
                  icon={s.icon}
                  dark={isDark}
                />
              ))}
            </div>

            {error && <ErrorBanner error={error} onRetry={fetchCustomers} />}

            {loading ? (
              <LoadingSpinner className="py-16" />
            ) : (
              <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.length === 0 ? (
                  <div className="col-span-full py-16 text-center">
                    <EmptyState
                      icon={<IconSearch />}
                      title="No customers found"
                      description="Try adjusting your search or add a new customer"
                    />
                  </div>
                ) : (
                  paginated.map((c) => (
                    <DesktopCustomerCard
                      key={c.id}
                      customer={c}
                      isDark={isDark}
                      onCardClick={setSheetCustomer}
                      onEdit={openEdit}
                      onDelete={setDeleteCustomer}
                      isLoading={loading}
                    />
                  ))
                )}
              </div>
            )}

            {filtered.length > 0 && (
              <div className="pt-4">
                <Pagination
                  page={page}
                  total={filtered.length}
                  onChange={setPage}
                />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── Modals & Sheets ── */}
      {sheetCustomer && (
        <CustomerDetailSheet
          customer={sheetCustomer}
          onClose={() => setSheetCustomer(null)}
          onEdit={(c) => {
            openEdit(c)
            setSheetCustomer(null)
          }}
          onDelete={(c) => {
            setDeleteCustomer(c)
            setSheetCustomer(null)
          }}
        />
      )}

      <CustomerModal
        open={showModal}
        onClose={() => {
          setShowModal(false)
          setEditCustomer(null)
        }}
        onSave={handleSave}
        editCustomer={editCustomer}
      />

      <ConfirmModal
        open={!!deleteCustomer}
        onClose={() => setDeleteCustomer(null)}
        onConfirm={handleDelete}
        title="Delete Customer"
        description={`Are you sure you want to remove "${deleteCustomer?.name}" from your records? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
      />

      {showLogout && (
        <LogoutConfirmationModal
          isOpen={showLogout}
          onConfirm={() => setShowLogout(false)}
          onCancel={() => setShowLogout(false)}
        />
      )}
    </>
  )

  if (isEmbedded) {
    return (
      <div
        className={`flex h-full flex-col overflow-hidden rounded-tl-xl ${
          isDark ? "bg-[#1c1c1e]" : "bg-[#f4f4f6]"
        }`}
      >
        {content}
      </div>
    )
  }

  return (
    <div
      className="flex h-screen flex-col overflow-hidden"
      style={{ background: "var(--page-bg)" }}
    >
      {content}
      <MobileBottomNav
        activeId="customers"
        onLogout={() => setShowLogout(true)}
      />
    </div>
  )
}
