/**
 * SettlementsPage – Refunds, Voids & Adjustments audit trail.
 *
 * Tracks every voided / refunded transaction:
 *  - Who initiated (cashier)
 *  - Who approved (manager override)
 *  - Original amount, items, payment method
 *  - Date & time of the original sale AND the adjustment
 *  - Type: Void vs Refund
 *  - Running total exposure
 */

import React, { useState, useMemo, useCallback } from "react";
import { useAppStore, usePermissions } from "../store/AppContext";
import { AppSidebar, AppLogo, MobileBottomNav } from "../components/AppSidebar";
import { NavMenu } from "../components/NavMenu";
import { Button, Badge, Modal, StatCard, colors } from "../components/ds";
import { Toaster, toast } from "sonner";
import { LogoutConfirmationModal } from "../components/LogoutConfirmationModal";
import type { Transaction } from "../services/storage";

const INTER = "'Inter', sans-serif";

function fmtAmt(n: number) {
  return "₦" + n.toLocaleString("en-NG", { minimumFractionDigits: 2 });
}

function fmtDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function fmtTime(ts: number) {
  return new Date(ts).toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

type FilterType = "all" | "voided" | "refunded";
type DateRange  = "Today" | "Week" | "Month" | "All";

// ─── Detail Modal ─────────────────────────────────────────────────────────────

function AdjustmentDetailModal({
  tx,
  open,
  onClose,
}: {
  tx: Transaction | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!tx) return null;
  const isRefund = tx.status === "refunded";
  const accent   = isRefund ? "#d97706" : "#e91835";
  const bg       = isRefund ? "#fffbeb" : "#fff1f2";
  const border   = isRefund ? "#fcd34d" : "#fbd2cf";

  return (
    <Modal open={open} onClose={onClose} title="Adjustment Detail" size="md" showClose closeOnBackdrop>
      <div style={{ fontFamily: INTER }}>

        {/* Type badge */}
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-4"
          style={{ background: bg, border: `1px solid ${border}` }}
        >
          <span
            className="size-7 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: accent + "20" }}
          >
            {isRefund ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke={accent} strokeWidth="2" />
                <path d="M15 9l-6 6M9 9l6 6" stroke={accent} strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </span>
          <div>
            <p style={{ fontWeight: 700, fontSize: 13, color: accent }}>
              Transaction {isRefund ? "Refunded" : "Voided"}
            </p>
            <p style={{ fontSize: 11, color: accent + "cc", marginTop: 1 }}>
              ID: {tx.id}
            </p>
          </div>
        </div>

        {/* Audit trail */}
        <div className="rounded-xl p-3 mb-4" style={{ background: "var(--page-surface-2)", border: "1px solid var(--page-border)" }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: colors.textMuted, marginBottom: 8 }}>
            Audit Trail
          </p>
          <div className="flex flex-col gap-2">
            {[
              ["Original Sale",     fmtDate(tx.timestamp) + " at " + fmtTime(tx.timestamp)],
              ["Cashier / Raised",  tx.cashier || "Staff"],
              ["Action Applied",    tx.voidedAt ? fmtDate(tx.voidedAt) + " at " + fmtTime(tx.voidedAt) : "—"],
              ["Approved By",       tx.voidedBy || "—"],
              ["Payment Method",    tx.paymentMethod],
              ["Customer",          tx.customer?.name || "Walk-in"],
            ].map(([label, val]) => (
              <div key={label} className="flex items-center justify-between gap-4">
                <span style={{ fontSize: 12, color: colors.textMuted }}>{label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: colors.textPrimary, textAlign: "right" }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Items */}
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: colors.textMuted, marginBottom: 8 }}>
          Items ({tx.items.reduce((s, i) => s + i.qty, 0)})
        </p>
        <div className="flex flex-col gap-2 mb-4">
          {tx.items.map((item, i) => {
            const unit = item.qty > 0 ? item.price / item.qty : item.price;
            return (
              <div key={i} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="size-5 rounded-md flex items-center justify-center shrink-0"
                    style={{ background: "var(--c-primary-light)", fontSize: 10, fontWeight: 700, color: colors.primary }}
                  >
                    {item.qty}
                  </span>
                  <div className="min-w-0">
                    <p style={{ fontSize: 13, color: colors.textSecondary }} className="truncate">{item.name}</p>
                    <p style={{ fontSize: 10, color: colors.textMuted }}>{fmtAmt(unit)} each</p>
                  </div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 500, color: colors.textPrimary, flexShrink: 0 }}>
                  {fmtAmt(item.price)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="border-t border-dashed border-gray-200 my-3" />

        {/* Totals */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span style={{ fontSize: 13, color: colors.textMuted }}>Subtotal</span>
            <span style={{ fontSize: 13, color: colors.textSecondary }}>{fmtAmt(tx.subtotal)}</span>
          </div>
          {tx.vat > 0 && (
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 13, color: colors.textMuted }}>
                {tx.taxLabel ?? "VAT"} ({tx.taxRate ?? 7.5}%)
              </span>
              <span style={{ fontSize: 13, color: colors.textSecondary }}>{fmtAmt(tx.vat)}</span>
            </div>
          )}
          {tx.serviceCharge && tx.serviceCharge > 0 && (
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 13, color: colors.textMuted }}>Service Charge</span>
              <span style={{ fontSize: 13, color: colors.textSecondary }}>{fmtAmt(tx.serviceCharge)}</span>
            </div>
          )}
          <div className="flex items-center justify-between mt-1 pt-2 border-t border-gray-100">
            <span style={{ fontSize: 14, fontWeight: 700, color: colors.textPrimary }}>
              {isRefund ? "Amount Refunded" : "Amount Voided"}
            </span>
            <span style={{ fontSize: 16, fontWeight: 700, color: accent }}>
              {fmtAmt(tx.total)}
            </span>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Timeline dot ─────────────────────────────────────────────────────────────

function TimelineDot({ type }: { type: "voided" | "refunded" }) {
  const isRefund = type === "refunded";
  return (
    <span
      className="size-8 rounded-full flex items-center justify-center shrink-0"
      style={{ background: isRefund ? "#fffbeb" : "#fff1f2", border: `1.5px solid ${isRefund ? "#fcd34d" : "#fbd2cf"}` }}
    >
      {isRefund ? (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#e91835" strokeWidth="2" />
          <path d="M15 9l-6 6M9 9l6 6" stroke="#e91835" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettlementsPage() {
  const { transactions, activeStaff, theme } = useAppStore();
  const isDark = theme === "dark";
  const permissions = usePermissions();
  const canViewAll  = permissions.includes("manager_override");

  const [sidebarOpen,  setSidebarOpen]  = useState(false);
  const [showLogout,   setShowLogout]   = useState(false);
  const [filterType,   setFilterType]   = useState<FilterType>("all");
  const [dateRange,    setDateRange]    = useState<DateRange>("Month");
  const [selectedTx,   setSelectedTx]  = useState<Transaction | null>(null);
  const [search,       setSearch]       = useState("");

  // ── Adjustments = voided + refunded transactions ─────────────────────────
  const rangeStart = useMemo(() => {
    if (dateRange === "All") return 0;
    const d = new Date();
    if (dateRange === "Today") d.setHours(0, 0, 0, 0);
    else if (dateRange === "Week") d.setDate(d.getDate() - 7);
    else d.setMonth(d.getMonth() - 1);
    return d.getTime();
  }, [dateRange]);

  const adjustments = useMemo(() => {
    let list = transactions.filter(
      (tx) => tx.status === "voided" || tx.status === "refunded"
    );
    if (dateRange !== "All") {
      list = list.filter((tx) => tx.timestamp >= rangeStart);
    }
    if (filterType !== "all") {
      list = list.filter((tx) => tx.status === filterType);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (tx) =>
          tx.id.toLowerCase().includes(q) ||
          (tx.cashier ?? "").toLowerCase().includes(q) ||
          (tx.voidedBy ?? "").toLowerCase().includes(q) ||
          (tx.customer?.name ?? "").toLowerCase().includes(q) ||
          tx.paymentMethod.toLowerCase().includes(q)
      );
    }
    // newest first
    return [...list].sort((a, b) => (b.voidedAt ?? b.timestamp) - (a.voidedAt ?? a.timestamp));
  }, [transactions, filterType, dateRange, rangeStart, search]);

  // ── Stats ─────────────────────────────────────────────────────────────────
  const totalVoided    = adjustments.filter((t) => t.status === "voided").length;
  const totalRefunded  = adjustments.filter((t) => t.status === "refunded").length;
  const totalExposure  = adjustments.reduce((s, t) => s + t.total, 0);
  const uniqueApprovers = Array.from(new Set(adjustments.map((t) => t.voidedBy).filter(Boolean)));

  const statCards = [
    {
      label: "Total Adjustments",
      value: String(adjustments.length),
      accent: "#7c3aed",
      bg: "#f5f3ff",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
          <rect x="9" y="3" width="6" height="4" rx="1" stroke="#7c3aed" strokeWidth="2" />
          <path d="M9 12h6M9 16h4" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: "Voided",
      value: String(totalVoided),
      accent: "#e91835",
      bg: "#fff1f2",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
          <circle cx="12" cy="12" r="10" stroke="#e91835" strokeWidth="2" />
          <path d="M15 9l-6 6M9 9l6 6" stroke="#e91835" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: "Refunded",
      value: String(totalRefunded),
      accent: "#d97706",
      bg: "#fffbeb",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Total Exposure",
      value: "₦" + (totalExposure >= 1000 ? (totalExposure / 1000).toFixed(1) + "k" : totalExposure.toFixed(0)),
      accent: "#059669",
      bg: "#ecfdf5",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const DATE_RANGES: DateRange[]  = ["Today", "Week", "Month", "All"];
  const TYPE_FILTERS: { label: string; value: FilterType }[] = [
    { label: "All",      value: "all"      },
    { label: "Voided",   value: "voided"   },
    { label: "Refunded", value: "refunded" },
  ];

  const handleExportCSV = useCallback(() => {
    if (adjustments.length === 0) { toast.error("No adjustments to export"); return; }
    const header = ["ID", "Type", "Date", "Time", "Adjustment Date", "Cashier", "Approved By", "Customer", "Payment", "Items", "Total"];
    const rows = adjustments.map((tx) => [
      tx.id,
      tx.status ?? "",
      fmtDate(tx.timestamp),
      fmtTime(tx.timestamp),
      tx.voidedAt ? fmtDate(tx.voidedAt) + " " + fmtTime(tx.voidedAt) : "",
      tx.cashier ?? "",
      tx.voidedBy ?? "",
      tx.customer?.name ?? "Walk-in",
      tx.paymentMethod,
      tx.items.map((i) => `${i.qty}x ${i.name}`).join("; "),
      tx.total.toFixed(2),
    ]);
    const csv = [header, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `tablix-settlements-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    toast.success("Export complete");
  }, [adjustments]);

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: "var(--page-bg)" }}>
      <Toaster richColors position="top-right" />

      {/* Header */}
      <header
        className="shrink-0 z-30 h-[69px] flex items-center justify-between px-4 md:px-6 border-b shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]"
        style={{ background: "var(--page-header-bg)", borderColor: "var(--page-header-border)" }}
      >
        <div className="flex items-center gap-3">
          <AppLogo />
          <NavMenu />
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={() => setShowLogout(true)} activeId="settlements" />

        <main className="flex-1 overflow-y-auto pb-[72px] md:pb-0" style={{ background: "var(--page-surface)" }}>
          <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-5 md:gap-6">

            {/* Page Header */}
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <h1 style={{ fontFamily: INTER, fontWeight: 600, fontSize: 18, color: isDark ? "white" : "#0a0a0a" }}>
                  Settlements &amp; Adjustments
                </h1>
                <p style={{ fontFamily: INTER, fontSize: 14, color: isDark ? "#a1a1aa" : "#4a5565", marginTop: 4 }}>
                  Full audit trail of all voided transactions and refunds issued to customers.
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* Date range */}
                <div className="flex items-center rounded-xl p-1 gap-0.5 hidden md:flex" style={{ background: "var(--page-surface-2)" }}>
                  {DATE_RANGES.map((r) => (
                    <button
                      key={r}
                      onClick={() => setDateRange(r)}
                      className="px-3 py-1.5 rounded-lg text-center transition-all"
                      style={{
                        fontFamily: INTER, fontSize: 13,
                        fontWeight: dateRange === r ? 600 : 400,
                        color: dateRange === r ? "white" : "var(--page-text-muted)",
                        background: dateRange === r ? "var(--c-primary)" : "transparent",
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                {/* Export */}
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors"
                  style={{ background: "var(--page-surface)", border: "1px solid var(--page-border)", cursor: "pointer" }}
                  title="Export to CSV"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="hidden md:block" style={{ fontFamily: INTER, fontSize: 12, fontWeight: 500, color: "var(--page-text)" }}>
                    Export CSV
                  </span>
                </button>
              </div>
            </div>

            {/* Mobile date range */}
            <div className="flex items-center rounded-xl p-1 gap-0.5 flex md:hidden" style={{ background: "var(--page-surface-2)" }}>
              {DATE_RANGES.map((r) => (
                <button
                  key={r}
                  onClick={() => setDateRange(r)}
                  className="px-3 py-1.5 rounded-lg text-center transition-all"
                  style={{
                    fontFamily: INTER, fontSize: 13,
                    fontWeight: dateRange === r ? 600 : 400,
                    color: dateRange === r ? "white" : "var(--page-text-muted)",
                    background: dateRange === r ? "var(--c-primary)" : "transparent",
                  }}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Stat cards */}
            <div className="md:hidden flex gap-3 overflow-x-auto -mx-4 px-4" style={{ scrollbarWidth: "none" }}>
              {statCards.map((c) => (
                <StatCard key={c.label} label={c.label} value={c.value} icon={c.icon} iconBg={c.bg} accent={c.accent} compact className="shrink-0" style={{ minWidth: 150 }} />
              ))}
            </div>
            <div className="hidden md:grid grid-cols-2 xl:grid-cols-4 gap-4">
              {statCards.map((c) => (
                <StatCard key={c.label} label={c.label} value={c.value} icon={c.icon} iconBg={c.bg} accent={c.accent} style={{ border: "none" }} />
              ))}
            </div>

            {/* Approver summary (manager view) */}
            {canViewAll && uniqueApprovers.length > 0 && (
              <div className="rounded-2xl p-4" style={{ background: "var(--page-surface-2)", border: "1px solid var(--page-border)" }}>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: colors.textMuted, marginBottom: 12 }}>
                  Approvals by Manager
                </p>
                <div className="flex flex-wrap gap-2">
                  {uniqueApprovers.map((name) => {
                    const count = adjustments.filter((t) => t.voidedBy === name).length;
                    const amt   = adjustments.filter((t) => t.voidedBy === name).reduce((s, t) => s + t.total, 0);
                    return (
                      <div
                        key={name}
                        className="flex items-center gap-2 rounded-xl px-3 py-2"
                        style={{ background: "var(--page-surface)", border: "1px solid var(--page-border)" }}
                      >
                        <span
                          className="size-7 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: "#7c3aed20", fontSize: 11, fontWeight: 700, color: "#7c3aed" }}
                        >
                          {(name ?? "?").charAt(0).toUpperCase()}
                        </span>
                        <div>
                          <p style={{ fontSize: 12, fontWeight: 600, color: colors.textPrimary }}>{name}</p>
                          <p style={{ fontSize: 11, color: colors.textMuted }}>
                            {count} approval{count !== 1 ? "s" : ""} · {fmtAmt(amt)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Filter + Search bar */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Type filter pills */}
              <div className="flex rounded-xl p-1 gap-0.5" style={{ background: "var(--page-surface-2)" }}>
                {TYPE_FILTERS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFilterType(f.value)}
                    className="px-3 py-1.5 rounded-lg text-center transition-all"
                    style={{
                      fontFamily: INTER, fontSize: 13,
                      fontWeight: filterType === f.value ? 600 : 400,
                      color: filterType === f.value ? "white" : "var(--page-text-muted)",
                      background: filterType === f.value
                        ? (f.value === "voided" ? "#e91835" : f.value === "refunded" ? "#d97706" : "var(--c-primary)")
                        : "transparent",
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div
                className="flex items-center gap-2 flex-1 min-w-[200px] rounded-xl px-3 py-2"
                style={{ background: "var(--page-surface-2)", border: "1px solid var(--page-border)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by ID, cashier, approver, customer..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent outline-none"
                  style={{ fontFamily: INTER, fontSize: 13, color: "var(--page-text)" }}
                />
                {search && (
                  <button onClick={() => setSearch("")} style={{ color: colors.textMuted }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Adjustments list */}
            {adjustments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div
                  className="size-16 rounded-2xl flex items-center justify-center"
                  style={{ background: "var(--page-surface-2)" }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke={colors.textMuted} strokeWidth="1.8" strokeLinecap="round" />
                    <rect x="9" y="3" width="6" height="4" rx="1" stroke={colors.textMuted} strokeWidth="1.8" />
                    <path d="M9 12h6M9 16h4" stroke={colors.textMuted} strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="text-center">
                  <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 15, color: colors.textPrimary }}>
                    No adjustments found
                  </p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: colors.textMuted, marginTop: 4 }}>
                    No voided or refunded transactions match your current filters.
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid var(--page-border)", background: "var(--page-surface)" }}
              >
                {/* Table header */}
                <div
                  className="hidden md:grid grid-cols-[2fr_1fr_1.5fr_1.5fr_1.5fr_1fr_0.8fr] px-5 py-3 border-b gap-4"
                  style={{ background: "var(--page-surface-2)", borderColor: "var(--page-border)" }}
                >
                  {["Transaction", "Type", "Original Sale", "Adjusted On", "Cashier / Raised", "Approved By", "Amount"].map((h) => (
                    <span key={h} style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: colors.textMuted }}>
                      {h}
                    </span>
                  ))}
                </div>

                {adjustments.map((tx, idx) => {
                  const isRefund = tx.status === "refunded";
                  const accent   = isRefund ? "#d97706" : "#e91835";
                  const isLast   = idx === adjustments.length - 1;

                  return (
                    <div
                      key={tx.id}
                      className={`px-5 py-4 cursor-pointer transition-colors ${isDark ? "hover:bg-white/5" : "hover:bg-gray-50"}`}
                      style={{ borderBottom: isLast ? "none" : "1px solid var(--page-border)" }}
                      onClick={() => setSelectedTx(tx)}
                    >
                      {/* Desktop row */}
                      <div className="hidden md:grid grid-cols-[2fr_1fr_1.5fr_1.5fr_1.5fr_1fr_0.8fr] gap-4 items-center">

                        {/* Transaction */}
                        <div className="flex items-center gap-2.5">
                          <TimelineDot type={tx.status as "voided" | "refunded"} />
                          <div>
                            <p style={{ fontSize: 12, fontWeight: 700, color: colors.infoText }}>{tx.id}</p>
                            <p style={{ fontSize: 11, color: colors.textMuted, marginTop: 1 }}>
                              {tx.customer?.name || "Walk-in"} · {tx.paymentMethod}
                            </p>
                          </div>
                        </div>

                        {/* Type */}
                        <Badge variant={isRefund ? "warning" : "danger"}>
                          {isRefund ? "Refund" : "Void"}
                        </Badge>

                        {/* Original sale */}
                        <div>
                          <p style={{ fontSize: 12, fontWeight: 500, color: colors.textPrimary }}>{fmtDate(tx.timestamp)}</p>
                          <p style={{ fontSize: 11, color: colors.textMuted }}>{fmtTime(tx.timestamp)}</p>
                        </div>

                        {/* Adjusted on */}
                        <div>
                          {tx.voidedAt ? (
                            <>
                              <p style={{ fontSize: 12, fontWeight: 500, color: colors.textPrimary }}>{fmtDate(tx.voidedAt)}</p>
                              <p style={{ fontSize: 11, color: colors.textMuted }}>{fmtTime(tx.voidedAt)}</p>
                            </>
                          ) : (
                            <p style={{ fontSize: 12, color: colors.textMuted }}>—</p>
                          )}
                        </div>

                        {/* Cashier */}
                        <div className="flex items-center gap-2">
                          <span
                            className="size-6 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: "var(--c-primary-light)", fontSize: 10, fontWeight: 700, color: colors.primary }}
                          >
                            {(tx.cashier ?? "S").charAt(0).toUpperCase()}
                          </span>
                          <span style={{ fontSize: 12, color: colors.textSecondary }}>{tx.cashier || "Staff"}</span>
                        </div>

                        {/* Approved by */}
                        {tx.voidedBy ? (
                          <div className="flex items-center gap-2">
                            <span
                              className="size-6 rounded-full flex items-center justify-center shrink-0"
                              style={{ background: "#7c3aed20", fontSize: 10, fontWeight: 700, color: "#7c3aed" }}
                            >
                              {tx.voidedBy.charAt(0).toUpperCase()}
                            </span>
                            <span style={{ fontSize: 12, color: colors.textSecondary }}>{tx.voidedBy}</span>
                          </div>
                        ) : (
                          <span style={{ fontSize: 12, color: colors.textMuted }}>—</span>
                        )}

                        {/* Amount */}
                        <span style={{ fontSize: 13, fontWeight: 700, color: accent }}>{fmtAmt(tx.total)}</span>
                      </div>

                      {/* Mobile card */}
                      <div className="flex md:hidden items-start gap-3">
                        <TimelineDot type={tx.status as "voided" | "refunded"} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p style={{ fontSize: 13, fontWeight: 700, color: colors.infoText }}>{tx.id}</p>
                            <span style={{ fontSize: 13, fontWeight: 700, color: accent }}>{fmtAmt(tx.total)}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={isRefund ? "warning" : "danger"}>{isRefund ? "Refund" : "Void"}</Badge>
                            <span style={{ fontSize: 11, color: colors.textMuted }}>{fmtDate(tx.timestamp)} · {fmtTime(tx.timestamp)}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                            <span style={{ fontSize: 11, color: colors.textMuted }}>
                              Raised by <strong style={{ color: colors.textSecondary }}>{tx.cashier || "Staff"}</strong>
                            </span>
                            {tx.voidedBy && (
                              <span style={{ fontSize: 11, color: colors.textMuted }}>
                                · Approved by <strong style={{ color: "#7c3aed" }}>{tx.voidedBy}</strong>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Footer summary */}
                <div
                  className="px-5 py-3 flex items-center justify-between border-t"
                  style={{ background: "var(--page-surface-2)", borderColor: "var(--page-border)" }}
                >
                  <span style={{ fontFamily: INTER, fontSize: 12, color: colors.textMuted }}>
                    {adjustments.length} adjustment{adjustments.length !== 1 ? "s" : ""} in period
                  </span>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 700, color: "#e91835" }}>
                    Total: {fmtAmt(totalExposure)}
                  </span>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Detail modal */}
      <AdjustmentDetailModal tx={selectedTx} open={selectedTx !== null} onClose={() => setSelectedTx(null)} />

      <LogoutConfirmationModal
        isOpen={showLogout}
        onConfirm={() => setShowLogout(false)}
        onCancel={() => setShowLogout(false)}
      />

      <MobileBottomNav activeId="settlements" onLogout={() => setShowLogout(true)} />
    </div>
  );
}
