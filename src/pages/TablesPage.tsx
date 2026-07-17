import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { useAppStore } from "../store/AppContext";
import type { RestaurantTable, TableStatus, Transaction, KDSOrder } from "../store/AppContext";
import { generateTransactionId } from "../services/storage";
import { tableAPI, ordersAPI } from "../services/api";
import { LogoutConfirmationModal } from "../components/LogoutConfirmationModal";
import { AppSidebar, AppLogo, MobileBottomNav } from "../components/AppSidebar";
import { NavMenu } from "../components/NavMenu";
import {
  Button, Badge, BadgeVariant,
  Card,
  Modal, ConfirmModal,
  Input,
  StatCard,
  EmptyState,
  colors, font, radius, shadows,
} from "../components/ds";
import { toast, Toaster } from "sonner";
import { AnimatePresence, motion } from "motion/react";

const NGN = "\u20a6";

// ── Status config (DS tokens only, no raw hex) ───────────────────────────────

type StatusCfg = {
  label: string;
  badgeVariant: BadgeVariant;
  bg: string;
  accent: string;
  text: string;
};

const STATUS_CFG: Record<TableStatus, StatusCfg> = {
  available:      { label: "Available",     badgeVariant: "success", bg: colors.successBg,  accent: colors.successDot,  text: colors.successText  },
  occupied:       { label: "Occupied",       badgeVariant: "danger",  bg: colors.dangerBg,   accent: colors.dangerDot,   text: colors.dangerText   },
  reserved:       { label: "Reserved",       badgeVariant: "info",    bg: colors.infoBg,     accent: colors.infoDot,     text: colors.infoText     },
  bill_requested: { label: "Bill Requested", badgeVariant: "warning", bg: colors.warningBg,  accent: colors.warningDot,  text: colors.warningText  },
};

const DEFAULT_ZONES = ["Main Hall", "Outdoor", "VIP", "Bar"];

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmtTime(iso?: string): string {
  if (!iso) return "-";
  const d = new Date(iso);
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

function elapsed(iso?: string): string {
  if (!iso) return "";
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60), r = mins % 60;
  return r > 0 ? `${h}h ${r}m` : `${h}h`;
}

// ── SVG icon reused across table cards ───────────────────────────────────────

function TableSVGIcon({ accent, seats }: { accent: string; seats: number }) {
  return (
    <svg width="54" height="42" viewBox="0 0 56 44" fill="none">
      <rect x="4" y="10" width="48" height="8" rx="4" fill={accent} fillOpacity="0.18" stroke={accent} strokeOpacity="0.45" strokeWidth="1.5" />
      <rect x="10" y="18" width="5" height="14" rx="2" fill={accent} fillOpacity="0.28" />
      <rect x="41" y="18" width="5" height="14" rx="2" fill={accent} fillOpacity="0.28" />
      {Array.from({ length: Math.min(seats, 4) }).map((_, i) => (
        <rect key={`t${i}`} x={6 + i * 12} y="3" width="9" height="5" rx="2" fill={accent} fillOpacity="0.6" />
      ))}
      {Array.from({ length: Math.min(seats, 4) }).map((_, i) => (
        <rect key={`b${i}`} x={6 + i * 12} y="36" width="9" height="5" rx="2" fill={accent} fillOpacity="0.6" />
      ))}
    </svg>
  );
}

function TableNavIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="7" width="20" height="6" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <rect x="5" y="13" width="3" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="16" y="13" width="3" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

// ── Table Card ────────────────────────────────────────────────────────────────

function TableCard({
  table,
  onSelect,
  dark,
  displayMode,
}: {
  table: RestaurantTable;
  onSelect: () => void;
  dark?: boolean;
  displayMode: "covers" | "total" | "time" | "status";
}) {
  const cfg = STATUS_CFG[table.status];
  
  const borderColor = table.status === "available"
    ? (dark ? "#3c3c3e" : "#e5e7eb")
    : cfg.accent;

  const bg = dark 
    ? (table.status === "occupied" ? "#1a2536" : "#2c2c2e")
    : (table.status === "occupied" ? "#eff6ff" : "#ffffff");

  const textColor = dark ? "#ffffff" : "#111827";

  const renderSeatsRepresentation = () => {
    if (displayMode === "covers") {
      const dotCount = Math.min(table.seats, 12);
      return (
        <div className="flex flex-wrap justify-center items-center gap-1.5 px-3 max-w-[85%] mt-1.5">
          {Array.from({ length: dotCount }).map((_, i) => {
            const isOccupied = table.status !== "available";
            return (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full transition-all"
                style={{
                  backgroundColor: isOccupied
                    ? cfg.accent
                    : (dark ? "rgba(255, 255, 255, 0.25)" : "#9ca3af")
                }}
              />
            );
          })}
        </div>
      );
    }

    if (displayMode === "total") {
      if (table.orderTotal != null && table.orderTotal > 0) {
        return (
          <p className="text-sm font-bold mt-1" style={{ color: cfg.accent }}>
            {NGN}{table.orderTotal.toLocaleString()}
          </p>
        );
      }
      return <p className="text-xs text-gray-500 mt-1">—</p>;
    }

    if (displayMode === "time") {
      if (table.occupiedAt) {
        return (
          <p className="text-xs font-semibold mt-1" style={{ color: dark ? "#a1a1aa" : "#4b5563" }}>
            {elapsed(table.occupiedAt)}
          </p>
        );
      }
      return <p className="text-xs text-gray-500 mt-1">—</p>;
    }

    if (displayMode === "status") {
      return (
        <span className="mt-1">
          <Badge variant={cfg.badgeVariant} dot>{cfg.label}</Badge>
        </span>
      );
    }

    return null;
  };

  const isRound = table.shape === "round";
  const isRect = table.shape === "rectangle";

  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.16 }}
      onClick={onSelect}
      className={`relative flex flex-col items-center justify-center text-center p-4 transition-all hover:shadow-lg active:scale-[0.97] border-2 cursor-pointer w-full h-full ${
        isRound ? "rounded-full" : "rounded-3xl"
      }`}
      style={{
        background: bg,
        borderColor: borderColor,
        boxShadow: shadows.card,
      }}
    >
      {table.status === "occupied" && (
        <div
          className={`absolute flex items-center justify-center shadow-sm ${
            isRound ? "top-[12%] right-[12%] size-6 rounded-full" : "top-3.5 right-3.5 size-6 rounded-lg"
          }`}
          style={{ background: "#30d158", color: "#ffffff" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
      )}

      <p
        style={{
          fontFamily: font.family,
          fontWeight: font.weight.bold,
          fontSize: isRect ? "26px" : "22px",
          color: textColor,
          lineHeight: "1.1",
        }}
      >
        {table.name}
      </p>

      {renderSeatsRepresentation()}
    </motion.button>
  );
}

// ── Table Detail Modal ────────────────────────────────────────────────────────

function TableDetailModal({
  table,
  onClose,
  onUpdateStatus,
  addTransaction,
  taxConfig,
  activeStaff,
  kdsOrders,
}: {
  table: RestaurantTable;
  onClose: () => void;
  onUpdateStatus: (status: TableStatus, extra?: Partial<RestaurantTable>) => void;
  addTransaction: (tx: Transaction) => void;
  taxConfig: any;
  activeStaff: any;
  kdsOrders: KDSOrder[];
}) {
  const navigate = useNavigate();
  const cfg = STATUS_CFG[table.status];
  const [guestName, setGuestName] = useState(table.customerName || "");
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showKDSWarning, setShowKDSWarning] = useState(false);

  // Relevant orders for this table
  const activeKDSOffset = kdsOrders.filter(
    (o: KDSOrder) => o.tableNo === table.name && ["New", "In Progress", "Ready"].includes(o.status)
  ).length;

  const hasBalance = table.orderTotal && table.orderTotal > 0;

  const handleSeatGuest = () => {
    onUpdateStatus("occupied", {
      occupiedAt: new Date().toISOString(),
      customerName: guestName.trim() || "Walk-in Guest",
      orderTotal: 0,
    });
    toast.success(`${table.name} is now occupied`);
    onClose();
  };

  const handleReserve = () => {
    onUpdateStatus("reserved", {
      occupiedAt: new Date().toISOString(),
      customerName: guestName.trim() || undefined,
    });
    toast.success(`${table.name} marked as reserved`);
    onClose();
  };

  const handleClearTable = () => {
    // If the table has a balance, record it as a transaction before clearing
    if (table.orderTotal && table.orderTotal > 0) {
      const transaction: Transaction = {
        id: generateTransactionId(),
        timestamp: Date.now(),
        items: [
          {
            id: "manual-clear",
            name: `Table Service - ${table.name}`,
            price: table.orderTotal,
            qty: 1
          }
        ],
        customer: {
          id: "walk-in",
          name: table.customerName || "Walk-in"
        },
        subtotal: table.orderTotal,
        vat: 0,
        total: table.orderTotal,
        paymentMethod: "Cash",
        tableNo: table.name,
        cashier: activeStaff ? activeStaff.name : "Owner",
        status: "completed"
      };
      addTransaction(transaction);
      toast.info(`Transaction recorded for ${table.name}`);
    }

    onUpdateStatus("available", { occupiedAt: undefined, customerName: undefined, orderTotal: 0 });
    toast.success(`${table.name} cleared`);
    onClose();
  };

  const handleBillRequested = () => {
    onUpdateStatus("bill_requested");
    toast.success(`Bill requested for ${table.name}`);
    onClose();
  };

  const handleOpenPOS = () => {
    onClose();
    navigate(`/dashboard?table=${encodeURIComponent(table.name)}`);
  };

  const handleClearRequest = () => {
    if (activeKDSOffset > 0) {
      setShowKDSWarning(true);
      return;
    }

    if (hasBalance) {
      setShowClearConfirm(true);
    } else {
      handleClearTable();
    }
  };

  const clearLabel = hasBalance ? "Clear Table (Record Payment)" : "Release Table";

  return (
    <>
      <Modal
        open={true}
        onClose={onClose}
        title={table.name}
        subtitle={`${table.zone} \u00b7 ${table.seats} seat${table.seats !== 1 ? "s" : ""}`}
        size="sm"
        icon={<TableNavIcon />}
        iconBg={cfg.bg}
      >
        {/* Status + elapsed */}
        <div className="flex items-center gap-2 mb-4">
          <Badge variant={cfg.badgeVariant} dot>{cfg.label}</Badge>
          {table.occupiedAt && (
            <span style={{ fontFamily: font.family, fontSize: font.size.xs, color: colors.textMuted }}>
              {elapsed(table.occupiedAt)} ago
            </span>
          )}
        </div>

        {/* Info rows */}
        {(table.status === "occupied" || table.status === "bill_requested") && table.customerName && (
          <div
            className="flex items-center gap-2 px-3 py-2.5 mb-4 rounded-lg"
            style={{ background: colors.neutralBg, border: `1px solid ${colors.borderLight}` }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke={colors.textMuted} strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="12" cy="7" r="4" stroke={colors.textMuted} strokeWidth="1.8" />
            </svg>
            <span style={{ fontFamily: font.family, fontSize: font.size.base, color: colors.textSecondary }}>
              {table.customerName}
            </span>
          </div>
        )}

        {table.orderTotal != null && table.orderTotal > 0 && (
          <div
            className="flex items-center justify-between px-3 py-2.5 mb-4 rounded-lg"
            style={{ background: colors.primaryLight, border: `1px solid ${colors.primaryMid}` }}
          >
            <span style={{ fontFamily: font.family, fontSize: font.size.base, color: colors.textSecondary, fontWeight: font.weight.medium }}>
              Running total
            </span>
            <span style={{ fontFamily: font.family, fontSize: font.size.md, color: colors.primary, fontWeight: font.weight.bold }}>
              {NGN}{table.orderTotal.toLocaleString()}
            </span>
          </div>
        )}

        {/* Guest name input */}
        {(table.status === "available" || table.status === "reserved") && (
          <div className="mb-4">
            <Input
              label="Guest Name (optional)"
              placeholder="Walk-in Guest"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
          </div>
        )}

        {/* Status-based action buttons */}
        <div className="flex flex-col gap-2">
          {table.status === "available" && (
            <>
              <Button variant="primary" size="md" fullWidth onClick={handleSeatGuest}>
                Seat Guest
              </Button>
              <Button variant="outline" size="md" fullWidth onClick={handleReserve}>
                Mark as Reserved
              </Button>
              <Button variant="outline" size="md" fullWidth onClick={handleOpenPOS}>
                Open Order in POS
              </Button>
            </>
          )}

          {table.status === "reserved" && (
            <>
              <Button variant="primary" size="md" fullWidth onClick={handleSeatGuest}>
                Seat Guest Now
              </Button>
              <Button variant="outline" size="md" fullWidth onClick={handleOpenPOS}>
                Open Order in POS
              </Button>
              <Button variant="outline" size="md" fullWidth onClick={handleClearTable}>
                Cancel Reservation
              </Button>
            </>
          )}

          {table.status === "occupied" && (
            <>
              <Button variant="outline" size="md" fullWidth onClick={handleOpenPOS}>
                Open in POS
              </Button>
              {hasBalance && (
                <Button variant="secondary" size="md" fullWidth onClick={handleBillRequested}>
                  Request Bill
                </Button>
              )}
              <Button variant="danger" size="md" fullWidth onClick={handleClearRequest}>
                {clearLabel}
              </Button>
            </>
          )}

          {table.status === "bill_requested" && (
            <>
              <Button variant="outline" size="md" fullWidth onClick={handleOpenPOS}>
                Open in POS
              </Button>
              <Button variant="danger" size="md" fullWidth onClick={handleClearRequest}>
                {hasBalance ? "Clear Table (Paid)" : "Free Table"}
              </Button>
            </>
          )}

        </div>
      </Modal>

      <ConfirmModal
        open={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={handleClearTable}
        title={`Clear "${table.name}" with balance?`}
        description={`This table has an active balance of ${NGN}${table.orderTotal?.toLocaleString()}. Clearing it will record a Cash transaction in the history.`}
        confirmLabel="Record as Paid & Clear"
        cancelLabel="Keep Occupied"
        variant="warning"
      />

      <ConfirmModal
        open={showKDSWarning}
        onClose={() => setShowKDSWarning(false)}
        onConfirm={() => { setShowKDSWarning(false); if (hasBalance) setShowClearConfirm(true); else handleClearTable(); }}
        title="Active Kitchen Orders!"
        description={`This table still has ${activeKDSOffset} order(s) in the kitchen. Clearing the table will NOT cancel those orders. Are you sure?`}
        confirmLabel="Clear Anyway"
        cancelLabel="Keep Occupied"
        variant="warning"
      />
    </>
  );
}

// ── Add / Edit Table Modal ────────────────────────────────────────────────────

interface TableForm {
  name: string;
  seats: number;
  zone: string;
  customZone: string;
}

function TableFormModal({
  initial,
  onClose,
  onSave,
  existingZones,
}: {
  initial?: RestaurantTable;
  onClose: () => void;
  onSave: (data: Omit<RestaurantTable, "id" | "status" | "occupiedAt" | "customerName" | "orderTotal">) => void;
  existingZones: string[];
}) {
  const allZones = Array.from(new Set([...DEFAULT_ZONES, ...existingZones]));
  const initialZone = initial?.zone && allZones.includes(initial.zone) ? initial.zone : allZones[0];

  const [form, setForm] = useState<TableForm>({
    name:       initial?.name  ?? "",
    seats:      initial?.seats ?? 4,
    zone:       initialZone,
    customZone: initial?.zone && !allZones.includes(initial.zone) ? initial.zone : "",
  });
  const [error, setError] = useState("");

  const upd = <K extends keyof TableForm>(k: K, v: TableForm[K]) => {
    setForm((p) => ({ ...p, [k]: v }));
    setError("");
  };

  const handleSave = () => {
    const name = form.name.trim();
    if (!name) { setError("Table name is required"); return; }
    if (form.seats < 1 || form.seats > 20) { setError("Seats must be between 1 and 20"); return; }
    const zone = form.zone === "__custom__"
      ? (form.customZone.trim() || "Other")
      : form.zone;
    onSave({ name, seats: form.seats, zone });
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      title={initial ? "Edit Table" : "Add New Table"}
      size="sm"
      actions={[
        { label: "Cancel",                          variant: "outline",  onClick: onClose    },
        { label: initial ? "Save Changes" : "Add Table", variant: "primary", onClick: handleSave },
      ]}
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Table Name / Number"
          placeholder="e.g. T1, VIP 1, Bar Stool 3"
          value={form.name}
          onChange={(e) => upd("name", e.target.value)}
        />

        {/* Seats stepper */}
        <div className="flex flex-col gap-1.5">
          <label
            style={{
              fontFamily: font.family,
              fontWeight: font.weight.medium,
              fontSize: font.size.md,
              color: colors.textPrimary,
              lineHeight: "20px",
            }}
          >
            Seats
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => upd("seats", Math.max(1, form.seats - 1))}
              className="size-9 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-50 active:scale-95"
              style={{ border: `1px solid ${colors.border}`, background: colors.white }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14" stroke={colors.textSecondary} strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <span
              className="min-w-[32px] text-center"
              style={{ fontFamily: font.family, fontWeight: font.weight.bold, fontSize: font.size["3xl"], color: colors.textPrimary }}
            >
              {form.seats}
            </span>
            <button
              type="button"
              onClick={() => upd("seats", Math.min(20, form.seats + 1))}
              className="size-9 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-50 active:scale-95"
              style={{ border: `1px solid ${colors.border}`, background: colors.white }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke={colors.textSecondary} strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Zone selector */}
        <div className="flex flex-col gap-1.5">
          <label
            style={{
              fontFamily: font.family,
              fontWeight: font.weight.medium,
              fontSize: font.size.md,
              color: colors.textPrimary,
              lineHeight: "20px",
            }}
          >
            Zone / Section
          </label>
          <div
            className="relative flex items-center bg-white"
            style={{ border: `1px solid ${colors.border}`, borderRadius: radius.md, boxShadow: shadows.sm }}
          >
            <select
              value={form.zone}
              onChange={(e) => upd("zone", e.target.value)}
              className="w-full bg-transparent outline-none py-2.5 pl-3.5"
              style={{
                fontFamily: font.family,
                fontSize: font.size.xl,
                color: colors.textPrimary,
                appearance: "none",
                paddingRight: 36,
                cursor: "pointer",
              }}
            >
              {allZones.map((z: string) => <option key={z} value={z}>{z}</option>)}
              <option value="__custom__">+ Custom Zone...</option>
            </select>
            <span className="absolute right-3 pointer-events-none" style={{ color: colors.textMuted }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
          </div>
          {form.zone === "__custom__" && (
            <Input
              placeholder="Enter zone name..."
              value={form.customZone}
              onChange={(e) => upd("customZone", e.target.value)}
            />
          )}
        </div>

        {error && (
          <p style={{ fontFamily: font.family, fontSize: font.size.sm, color: colors.dangerText }}>
            {error}
          </p>
        )}
      </div>
    </Modal>
  );
}

// ── Filter pill button ────────────────────────────────────────────────────────

function FilterPill({
  label,
  active,
  onClick,
  dark,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  dark?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 px-3 py-1.5 rounded-full transition-all active:scale-95"
      style={{
        fontFamily: font.family,
        fontWeight: active ? font.weight.semibold : font.weight.normal,
        fontSize: font.size.base,
        background: active ? (dark ? colors.textPrimary : colors.primary) : colors.white,
        color: active ? colors.white : colors.textSecondary,
        border: `1px solid ${active ? (dark ? colors.textPrimary : colors.primary) : colors.borderMid}`,
        boxShadow: active ? shadows.sm : "none",
      }}
    >
      {label}
    </button>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function TablesPage({ isEmbedded = false }: { isEmbedded?: boolean }) {
  const { tables, setTables, addTable, updateTable, deleteTable, setTableStatus, tablesEnabled, plan, addTransaction, taxConfig, activeStaff, kdsOrders, theme } = useAppStore();
  const isDark = theme === "dark";
  const [showLogout,     setShowLogout]     = useState(false);
  const [sidebarOpen,    setSidebarOpen]    = useState(false);
  const [selectedTable,  setSelectedTable]  = useState<RestaurantTable | null>(null);
  const [activeZone,     setActiveZone]     = useState("All");
  const [filterStatus,   setFilterStatus]   = useState<TableStatus | "all">("all");
  const [displayMode,    setDisplayMode]    = useState<"covers" | "total" | "time" | "status">("covers");

  // Load tables from backend on mount and sync order totals
  const loadTables = useCallback(async () => {
    try {
      const [tablesRes, ordersRes] = await Promise.all([
        tableAPI.list(),
        ordersAPI.list({ limit: 100 }).catch(() => null),
      ]);

      // Build a map of tableId → running total from unpaid/pending orders
      const tableTotals: Record<string, number> = {};
      if (ordersRes) {
        ordersRes.data.orders
          .filter((o) => o.paymentStatus !== "Completed" && o.status !== "Cancelled")
          .forEach((o) => {
            // Orders don't carry tableId in the list response directly,
            // but the table's orderTotal from the DB is the source of truth
          });
      }

      const storedShapes = (() => {
        try { return JSON.parse(localStorage.getItem("tablix_table_shapes") || "{}"); } catch (_) { return {}; }
      })();

      setTables(tablesRes.data.tables.map((t) => ({
        id:           t.id,
        name:         t.name,
        seats:        t.seats,
        zone:         t.zone,
        status:       t.status,
        occupiedAt:   t.occupiedAt ?? undefined,
        customerName: t.customerName ?? undefined,
        orderTotal:   tableTotals[t.id] ?? t.orderTotal ?? undefined,
        shape:        storedShapes[t.id] ?? "square",
      })));
    } catch (_) { /* fall back to localStorage state */ }
  }, [setTables]);

  useEffect(() => { loadTables(); }, [loadTables]);

  const zones = useMemo(() => {
    const s = new Set(tables.map((t) => t.zone));
    return ["All", ...Array.from(s)];
  }, [tables]);

  const filtered = useMemo(() => tables.filter((t) => {
    const zoneOk   = activeZone === "All" || t.zone === activeZone;
    const statusOk = filterStatus === "all" || t.status === filterStatus;
    return zoneOk && statusOk;
  }), [tables, activeZone, filterStatus]);

  const squareTables = useMemo(() => filtered.filter((t) => !t.shape || t.shape === "square"), [filtered]);
  const roundTables  = useMemo(() => filtered.filter((t) => t.shape === "round"), [filtered]);
  const rectTables   = useMemo(() => filtered.filter((t) => t.shape === "rectangle"), [filtered]);

  const counts = useMemo(() => ({
    total:    tables.length,
    avail:    tables.filter((t) => t.status === "available").length,
    occupied: tables.filter((t) => t.status === "occupied").length,
    reserved: tables.filter((t) => t.status === "reserved").length,
    bill:     tables.filter((t) => t.status === "bill_requested").length,
  }), [tables]);

  const existingZones = useMemo(() => Array.from(new Set(tables.map((t) => t.zone))), [tables]);




  const handleStatusUpdate = useCallback(async (id: string, status: TableStatus, extra?: Partial<RestaurantTable>) => {
    setTableStatus(id, status, extra);
    try {
      await tableAPI.update(id, {
        status,
        occupiedAt:   extra?.occupiedAt   ?? null,
        customerName: extra?.customerName ?? null,
        orderTotal:   extra?.orderTotal   ?? null,
      });
    } catch (_) {}
  }, [setTableStatus]);

  const statusFilterOpts: { value: TableStatus | "all"; label: string }[] = [
    { value: "all",           label: "All"       },
    { value: "available",     label: "Available" },
    { value: "occupied",      label: "Occupied"  },
    { value: "reserved",      label: "Reserved"  },
    { value: "bill_requested",label: "Bill"      },
  ];

  // Gate: feature not enabled
  if (!tablesEnabled) {
    return (
      <div className="h-screen flex flex-col overflow-hidden" style={{ background: "var(--page-bg)" }}>
        <header className="shrink-0 z-30 h-[69px] flex items-center justify-between px-4 md:px-6 border-b shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]" style={{ background: "var(--page-header-bg)", borderColor: "var(--page-header-border)" }}>
          <div className="flex items-center gap-3">
            <AppLogo />
            <NavMenu />
          </div>
        </header>
        <div className="flex flex-1 overflow-hidden min-h-0">
          <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={() => setShowLogout(true)} activeId="tables" />
          <main className="flex-1 overflow-y-auto flex items-center justify-center p-6" style={{ background: "var(--page-surface)" }}>
            <div className="max-w-sm w-full flex flex-col items-center gap-5 text-center">
              <div className="size-16 flex items-center justify-center rounded-2xl" style={{ background: colors.primaryLight }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="7" width="20" height="6" rx="3" stroke={colors.primary} strokeWidth="1.5" />
                  <rect x="5" y="13" width="3" height="6" rx="1.5" stroke={colors.primary} strokeWidth="1.5" />
                  <rect x="16" y="13" width="3" height="6" rx="1.5" stroke={colors.primary} strokeWidth="1.5" />
                </svg>
              </div>
              <div>
                <p style={{ fontFamily: font.family, fontWeight: font.weight.bold, fontSize: font.size["3xl"], color: colors.textPrimary }}>
                  Tables Disabled
                </p>
                <p style={{ fontFamily: font.family, fontSize: font.size.base, color: colors.textMuted, marginTop: 6, lineHeight: "20px" }}>
                  Table Management is turned off. Enable it from Settings to manage your restaurant floor plan.
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Button variant="primary" size="md" fullWidth onClick={() => { window.location.href = "/settings"; }}>
                  Go to Settings
                </Button>
                <Button variant="outline" size="md" fullWidth onClick={() => { window.location.href = "/dashboard"; }}>
                  Back to POS
                </Button>
              </div>
            </div>
          </main>
        </div>
        <MobileBottomNav activeId="tables" onLogout={() => setShowLogout(true)} />
        {showLogout && <LogoutConfirmationModal isOpen={showLogout} onConfirm={() => setShowLogout(false)} onCancel={() => setShowLogout(false)} />}
      </div>
    );
  }

  const content = (
    <>
      <Toaster richColors position="top-right" />

      {/* ── Header ── */}
      <header className="shrink-0 z-30 h-[69px] flex items-center justify-between px-4 md:px-6 border-b shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]" style={{ background: isEmbedded ? (isDark ? "#1c1c1e" : "#f4f4f6") : "var(--page-header-bg)", borderColor: isEmbedded ? (isDark ? "#3c3c3e" : "#e5e7eb") : "var(--page-header-border)" }}>
        <div className="flex items-center gap-3">
          {!isEmbedded && <AppLogo />}
          {!isEmbedded && <NavMenu />}
          {isEmbedded && <h1 className={`text-xl font-semibold ${isDark ? "text-white" : "text-[#111827]"}`}>Tables</h1>}
        </div>

        {/* Right: Empty */}
        <div className="flex items-center gap-2">
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {!isEmbedded && <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={() => setShowLogout(true)} activeId="tables" />}

        <main className={`flex-1 overflow-y-auto pb-[72px] md:pb-0 ${isEmbedded ? (isDark ? "bg-[#1c1c1e]" : "bg-[#f4f4f6]") : ""}`} style={isEmbedded ? {} : { background: "var(--page-surface)" }}>
          <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-5">

            {/* Zone Tabs */}
            <div className="flex border-b mb-6 overflow-x-auto scrollbar-hide" style={{ borderColor: isDark ? '#3c3c3e' : colors.borderLight }}>
              {zones.map((z) => {
                const count = tables.filter((t) => z === "All" ? true : t.zone === z).length;
                const isActive = activeZone === z;
                return (
                  <button
                    key={z}
                    onClick={() => setActiveZone(z)}
                    className="px-5 py-3 border-b-2 transition-all text-left flex flex-col gap-0.5 shrink-0"
                    style={{
                      borderColor: isActive ? colors.primary : "transparent",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: font.family,
                        fontWeight: isActive ? 600 : 500,
                        fontSize: "15px",
                        color: isActive ? colors.primary : (isDark ? "#e5e7eb" : "#1f2937"),
                      }}
                    >
                      {z === "All" ? "All Floors" : z}
                    </span>
                    <span
                      style={{
                        fontFamily: font.family,
                        fontSize: "11px",
                        color: isActive ? `${colors.primary}aa` : (isDark ? "#8e8e93" : "#6b7280"),
                      }}
                    >
                      {count} table{count !== 1 ? "s" : ""}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Filter toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
              <div className="flex gap-1.5 shrink-0 overflow-x-auto pb-0.5" style={{ scrollbarWidth: "none" }}>
                {statusFilterOpts.map((o) => (
                  <FilterPill key={o.value} label={o.label} active={filterStatus === o.value} onClick={() => setFilterStatus(o.value)} dark={isDark} />
                ))}
              </div>

              {/* Display Mode Selector (Covers / Total / Time / Status) */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-black/10 dark:bg-white/5 border dark:border-white/10" style={{ borderColor: colors.borderLight }}>
                {(["covers", "total", "time", "status"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setDisplayMode(mode)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                      displayMode === mode
                        ? (isDark ? "bg-white text-black font-bold" : "bg-black text-white font-bold")
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <Card padding="none" style={isEmbedded ? { background: isDark ? '#2c2c2e' : '#ffffff', borderColor: isDark ? '#3c3c3e' : '#e5e7eb' } : undefined}>
                <EmptyState
                  icon={
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="7" width="20" height="6" rx="3" stroke={colors.primary} strokeWidth="1.5" />
                      <rect x="5" y="13" width="3" height="6" rx="1.5" stroke={colors.primary} strokeWidth="1.5" />
                      <rect x="16" y="13" width="3" height="6" rx="1.5" stroke={colors.primary} strokeWidth="1.5" />
                    </svg>
                  }
                  title={tables.length === 0 ? "No tables yet" : "No tables match your filters"}
                  description={
                    tables.length === 0
                       ? "Add your first table to start managing your floor plan"
                       : "Try a different zone or status filter"
                  }
                />
              </Card>
            )}

            {/* Table layout (6 square left, 3 circular center, 3 rectangular right) */}
            {filtered.length > 0 && (
              <div className="flex flex-col lg:flex-row lg:gap-24 gap-12 justify-center items-start py-8">
                {/* Left: Square/Standard tables */}
                {squareTables.length > 0 && (
                  <div className="flex flex-col gap-4 w-[300px] shrink-0">
                    <div className="grid grid-cols-2 gap-4">
                      <AnimatePresence mode="popLayout">
                        {squareTables.map((t) => (
                          <div key={t.id} className="w-[140px] h-[140px]">
                            <TableCard table={t} onSelect={() => setSelectedTable(t)} dark={isDark} displayMode={displayMode} />
                          </div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                )}

                {/* Middle: Round/Circular tables */}
                {roundTables.length > 0 && (
                  <div className="w-[140px] shrink-0 flex flex-col items-center gap-4">
                    <AnimatePresence mode="popLayout">
                      {roundTables.map((t) => (
                        <div key={t.id} className="w-[140px] h-[140px]">
                          <TableCard table={t} onSelect={() => setSelectedTable(t)} dark={isDark} displayMode={displayMode} />
                        </div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                {/* Right: Rectangular/Long tables */}
                {rectTables.length > 0 && (
                  <div className="w-[280px] shrink-0 flex flex-col gap-4">
                    <AnimatePresence mode="popLayout">
                      {rectTables.map((t) => (
                        <div key={t.id} className="w-[280px] h-[140px]">
                          <TableCard table={t} onSelect={() => setSelectedTable(t)} dark={isDark} displayMode={displayMode} />
                        </div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileBottomNav activeId="tables" onLogout={() => setShowLogout(true)} />

      {/* Modals */}
      <AnimatePresence>
        {selectedTable && (
          <TableDetailModal
            key="detail"
            table={selectedTable}
            onClose={() => setSelectedTable(null)}
            onUpdateStatus={(st, ext) => handleStatusUpdate(selectedTable.id, st, ext)}
            addTransaction={addTransaction}
            taxConfig={taxConfig}
            activeStaff={activeStaff}
            kdsOrders={kdsOrders}
          />
        )}


      </AnimatePresence>

      {showLogout && <LogoutConfirmationModal isOpen={showLogout} onConfirm={() => setShowLogout(false)} onCancel={() => setShowLogout(false)} />}
    </>
  );

  if (isEmbedded) {
    return <div className={`flex flex-col h-full overflow-hidden rounded-tl-xl ${isDark ? "bg-[#1c1c1e]" : "bg-[#f4f4f6]"}`}>{content}</div>;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: "var(--page-bg)" }}>
      {content}
      <MobileBottomNav activeId="tables" onLogout={() => setShowLogout(true)} />
    </div>
  );
}