import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useAppStore, usePermissions } from "../store/AppContext";
import type { Transaction } from "../store/AppContext";
import { LogoutConfirmationModal } from "../components/LogoutConfirmationModal";
import { AppSidebar, AppLogo, MobileBottomNav } from "../components/AppSidebar";
import { NavMenu } from "../components/NavMenu";
import { ManagerOverrideModal } from "../components/ManagerOverrideModal";
import {
  Button, Badge, DataTable, Modal, StatCard, colors,
  type ColumnDef,
} from "../components/ds";
import { toast, Toaster } from "sonner";
import { exportTransactionsToCSV, downloadCSV } from "../services/storage";
import { addActivityEntry } from "../services/activityLog";
import { transactionsAPI, ordersAPI } from "../services/api";
import type { ApiOrder } from "../services/api";
import { Search, X } from "lucide-react";

const INTER = "'Inter', sans-serif";
const NGN   = "\u20a6";
const CARD  = "bg-white rounded-2xl border border-[#f0f0f0] shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_4px_16px_0_rgba(0,0,0,0.04)]";

// ─── Types ────────────────────────────────────────────────────────────────────

type TxStatus = "completed" | "voided" | "refunded";

interface OrderRow extends Record<string, unknown> {
  id:        string;
  datetime:  string;
  customer:  string;
  itemCount: number;
  cashier:   string;
  payment:   string;
  amount:    number;
  status:    TxStatus;
  tableNo:   string;
  // raw transaction reference for receipt modal
  raw:       Transaction;
}

// ─── Status helpers ───────────────────────────────────────────────────────────

function statusVariant(s: TxStatus): "success" | "warning" | "danger" | "info" {
  if (s === "completed") return "success";
  if (s === "voided")    return "danger";
  if (s === "refunded")  return "warning";
  return "info";
}

function statusLabel(s: TxStatus): string {
  if (s === "completed") return "Completed";
  if (s === "voided")    return "Voided";
  if (s === "refunded")  return "Refunded";
  return s;
}

// ─── Date range filter ────────────────────────────────────────────────────────

type DateRange = "Today" | "Week" | "Month" | "All";

function applyDateFilter(orders: OrderRow[], range: DateRange): OrderRow[] {
  if (range === "All") return orders;
  const now   = new Date();
  const today = new Date(now); today.setHours(0, 0, 0, 0);
  const week  = new Date(now); week.setDate(week.getDate() - 7); week.setHours(0, 0, 0, 0);
  const month = new Date(now); month.setDate(1); month.setHours(0, 0, 0, 0);
  const cutoff = range === "Today" ? today : range === "Week" ? week : month;
  return orders.filter((o) => new Date(o.raw.timestamp) >= cutoff);
}

// ─── Format helpers ───────────────────────────────────────────────────────────

function fmtAmt(n: number) {
  return `${NGN}${n.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtStat(n: number) {
  if (n >= 1000000) return `${NGN}${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000)    return `${NGN}${(n / 1000).toFixed(0)}K`;
  return `${NGN}${n.toLocaleString()}`;
}

// ─── Thermal print helper ─────────────────────────────────────────────────────

function buildThermalHtml(tx: Transaction, restaurantName: string): string {
  const now     = new Date(tx.timestamp);
  const dateStr = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const timeStr = now.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" });
  const taxLabel = tx.taxLabel ?? "VAT";
  const taxRate  = tx.taxRate  != null ? tx.taxRate : 7.5;

  const itemRows = tx.items.map((item) => {
    const unitP = item.qty > 0 ? item.price / item.qty : item.price;
    const mainRow =
      "<tr>" +
      "<td style=\"text-align:left;padding-bottom:4px;vertical-align:top;word-break:break-word\">" + item.name + "</td>" +
      "<td style=\"text-align:right;padding-bottom:4px;vertical-align:top;padding-left:4px\">" + item.qty + "</td>" +
      "<td style=\"text-align:right;padding-bottom:4px;vertical-align:top;padding-left:4px\">" + NGN + unitP.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td>" +
      "<td style=\"text-align:right;padding-bottom:4px;vertical-align:top;padding-left:4px;font-weight:700\">" + NGN + item.price.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "</td>" +
      "</tr>";
    const addonRows = (item.selectedAddons ?? []).map((sa) => {
      const addonDisplayName = (sa as { id: string; name?: string; qty: number }).name || sa.id;
      return (
        "<tr><td style=\"text-align:left;padding-bottom:2px;padding-left:10px;color:#555;font-size:7.5pt\">" +
        "+ " + (sa.qty > 1 ? sa.qty + "\u00d7 " : "") + addonDisplayName +
        "</td><td></td><td></td><td style=\"text-align:right;color:#555;font-size:7.5pt\"></td></tr>"
      );
    }).join("");
    return mainRow + addonRows;
  }).join("");

  const discountRow = tx.discount && tx.discount.amount > 0
    ? "<div class=\"row\"><span>Discount (" + (tx.discount.type === "percent" ? tx.discount.value + "%" : "flat") + "):</span><span>-" + NGN + tx.discount.amount.toLocaleString("en-NG", { minimumFractionDigits: 2 }) + "</span></div>"
    : "";
  const taxRow = tx.vat > 0
    ? "<div class=\"row\"><span>" + taxLabel + " (" + taxRate + "%" + (tx.taxInclusive ? " incl." : "") + "):</span><span>" + NGN + tx.vat.toLocaleString("en-NG", { minimumFractionDigits: 2 }) + "</span></div>"
    : "";
  const svcRow = tx.serviceCharge && tx.serviceCharge > 0
    ? "<div class=\"row\"><span>Service Charge:</span><span>" + NGN + tx.serviceCharge.toLocaleString("en-NG", { minimumFractionDigits: 2 }) + "</span></div>"
    : "";

  const voidBanner = tx.status && tx.status !== "completed"
    ? "<div style=\"text-align:center;border:2px solid #e91835;margin:8px 0;padding:3px;font-weight:700;font-size:11pt;color:#e91835\">" + tx.status.toUpperCase() + "</div>"
    : "";

  return "<!DOCTYPE html><html><head>" +
    "<meta charset=\"UTF-8\">" +
    "<title>Receipt-" + tx.id + "</title>" +
    "<style>" +
    "@page{size:80mm auto;margin:4mm 5mm}" +
    "*{box-sizing:border-box;margin:0;padding:0}" +
    "body{font-family:'Courier New',Courier,monospace;font-size:9pt;color:#000;background:#fff;width:70mm}" +
    ".c{text-align:center}.b{font-weight:700}" +
    ".dash{border-top:1px dashed #555;margin:5px 0}" +
    ".solid{border-top:2px solid #000;margin:5px 0}" +
    ".tsolid{border-top:1px solid #000;margin:5px 0}" +
    ".row{display:flex;justify-content:space-between;gap:6px;margin-bottom:2px}" +
    "table{width:100%;border-collapse:collapse}" +
    "th{font-weight:700;border-bottom:1px solid #000;padding-bottom:3px;font-size:8.5pt}" +
    "td{font-size:8.5pt}" +
    ".total{display:flex;justify-content:space-between;font-weight:700;font-size:11pt;margin-bottom:2px}" +
    "</style></head><body>" +
    "<div class=\"c b\" style=\"font-size:14pt;letter-spacing:3px;margin-bottom:2px\">" + (restaurantName || "TABLIX") + "</div>" +
    "<div class=\"c\" style=\"font-size:8pt\">Point of Sale Receipt</div>" +
    "<div class=\"dash\"></div>" +
    "<div class=\"row\"><span>Date:</span><span>" + dateStr + "</span></div>" +
    "<div class=\"row\"><span>Time:</span><span>" + timeStr + "</span></div>" +
    "<div class=\"row\"><span>Receipt #:</span><span class=\"b\" style=\"font-size:7.5pt\">" + tx.id + "</span></div>" +
    "<div class=\"row\"><span>Customer:</span><span>" + (tx.customer?.name || "Walk-in") + "</span></div>" +
    "<div class=\"row\"><span>Cashier:</span><span>" + (tx.cashier || "Staff") + "</span></div>" +
    (tx.tableNo ? "<div class=\"row\"><span>Table:</span><span>" + tx.tableNo + "</span></div>" : "") +
    voidBanner +
    "<div class=\"dash\"></div>" +
    "<table><thead><tr>" +
    "<th style=\"text-align:left;width:44%\">ITEM</th>" +
    "<th style=\"text-align:right;width:10%\">QTY</th>" +
    "<th style=\"text-align:right;width:23%\">UNIT</th>" +
    "<th style=\"text-align:right;width:23%\">TOTAL</th>" +
    "</tr></thead><tbody>" + itemRows + "</tbody></table>" +
    "<div class=\"tsolid\"></div>" +
    "<div class=\"row\"><span>Subtotal:</span><span>" + NGN + tx.subtotal.toLocaleString("en-NG", { minimumFractionDigits: 2 }) + "</span></div>" +
    discountRow + taxRow + svcRow +
    "<div class=\"solid\"></div>" +
    "<div class=\"total\"><span>TOTAL:</span><span>" + NGN + tx.total.toLocaleString("en-NG", { minimumFractionDigits: 2 }) + "</span></div>" +
    "<div class=\"row\"><span>Payment:</span><span class=\"b\">" + tx.paymentMethod.toUpperCase() + "</span></div>" +
    "<div class=\"dash\"></div>" +
    "<div class=\"c b\" style=\"margin-bottom:2px\">THANK YOU FOR YOUR PATRONAGE!</div>" +
    "<div class=\"c\" style=\"font-size:8pt\">Please retain this receipt</div>" +
    "<div class=\"c\" style=\"font-size:8pt;margin-top:4px\">Tablix POS System</div>" +
    "</body></html>";
}

function printReceipt(tx: Transaction, restaurantName: string) {
  const html = buildThermalHtml(tx, restaurantName);
  const iframe = document.createElement("iframe");
  iframe.style.cssText = "position:absolute;width:0;height:0;border:0;top:-9999px;left:-9999px";
  document.body.appendChild(iframe);
  const doc = iframe.contentWindow?.document;
  if (!doc) return;
  doc.open();
  doc.write(html);
  doc.close();
  iframe.contentWindow?.focus();
  setTimeout(() => {
    iframe.contentWindow?.print();
    setTimeout(() => { try { document.body.removeChild(iframe); } catch (_) {} }, 1500);
  }, 300);
}

// ─── Receipt Modal ────────────────────────────────────────────────────────────

function ReceiptModal({
  tx,
  open,
  onClose,
  onVoidRequested,
  restaurantName,
}: {
  tx: Transaction | null;
  open: boolean;
  onClose: () => void;
  onVoidRequested: (id: string, refund: boolean) => void;
  restaurantName: string;
}) {
  if (!tx) return null;

  const now = new Date(tx.timestamp);
  const dateStr = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const timeStr = now.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" });
  const taxLabel = tx.taxLabel ?? "VAT";
  const taxRate  = tx.taxRate  != null ? tx.taxRate : 7.5;
  const totalItems = tx.items.reduce((s, i) => s + i.qty, 0);
  const isVoided = tx.status === "voided" || tx.status === "refunded";

  const handlePrint = () => printReceipt(tx, restaurantName);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Order Receipt"
      subtitle={tx.id}
      size="md"
      showClose
      closeOnBackdrop
    >
      <div style={{ fontFamily: INTER }}>

        {/* Void/Refund banner */}
        {isVoided && (
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2 mb-4"
            style={{ background: tx.status === "refunded" ? "#fffbeb" : "#fff1f2", border: `1px solid ${tx.status === "refunded" ? "#fcd34d" : "#fbd2cf"}` }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke={tx.status === "refunded" ? "#d97706" : "#e91835"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <p style={{ fontWeight: 700, fontSize: 12, color: tx.status === "refunded" ? "#92400e" : "#991b1b" }}>
                This transaction has been {tx.status}
              </p>
              {tx.voidedBy && (
                <p style={{ fontSize: 11, color: tx.status === "refunded" ? "#b45309" : "#b91c1c", marginTop: 1 }}>
                  Authorised by {tx.voidedBy}
                  {tx.voidedAt ? " on " + new Date(tx.voidedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : ""}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Meta */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
          {[
            ["Date",           dateStr],
            ["Time",           timeStr],
            ["Customer",       tx.customer?.name || "Walk-in Customer"],
            ["Cashier",        tx.cashier || "Staff"],
            ["Payment Method", tx.paymentMethod],
            ...(tx.tableNo ? [["Table", tx.tableNo]] : []),
          ].map(([label, val]) => (
            <div key={label}>
              <p style={{ fontSize: 11, color: colors.textMuted, marginBottom: 2 }}>{label}</p>
              <p style={{ fontSize: 13, fontWeight: 500, color: colors.textPrimary }}>{val}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-dashed border-gray-200 my-3" />

        {/* Items */}
        <p style={{ fontSize: 11, fontWeight: 600, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
          Items Ordered ({totalItems})
        </p>
        <div className="flex flex-col gap-2 mb-4">
          {tx.items.map((item, i) => {
            const unitPrice = item.qty > 0 ? item.price / item.qty : item.price;
            return (
              <React.Fragment key={i}>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="size-5 rounded-md flex items-center justify-center shrink-0"
                      style={{ background: "var(--c-primary-light)", fontSize: 10, fontWeight: 700, color: colors.primary }}
                    >
                      {item.qty}
                    </span>
                    <div className="min-w-0">
                      <p style={{ fontSize: 13, color: colors.textSecondary }} className="truncate">{item.name}</p>
                      <p style={{ fontSize: 10, color: colors.textMuted }}>
                        {fmtAmt(unitPrice)} each
                      </p>
                    </div>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: colors.textPrimary, flexShrink: 0 }}>
                    {fmtAmt(item.price)}
                  </span>
                </div>
                {/* Add-on sub-rows */}
                {(item.selectedAddons ?? []).map((sa) => {
                  const addonDisplayName = (sa as { id: string; name?: string; qty: number }).name || sa.id;
                  return (
                    <div key={sa.id} className="flex items-center justify-between pl-7">
                      <span style={{ fontSize: 11, color: colors.textMuted }}>
                        + {sa.qty > 1 ? `${sa.qty}\u00d7 ` : ""}{addonDisplayName}
                      </span>
                    </div>
                  );
                })}
              </React.Fragment>
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

          {/* Discount */}
          {tx.discount && tx.discount.amount > 0 && (
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 13, color: "#16a34a" }}>
                Discount ({tx.discount.type === "percent" ? `${tx.discount.value}%` : "flat"})
              </span>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#16a34a" }}>
                -{fmtAmt(tx.discount.amount)}
              </span>
            </div>
          )}

          {/* Tax */}
          {tx.vat > 0 && (
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 13, color: colors.textMuted }}>
                {taxLabel} ({taxRate}%{tx.taxInclusive ? " incl." : ""})
              </span>
              <span style={{ fontSize: 13, color: colors.textSecondary }}>{fmtAmt(tx.vat)}</span>
            </div>
          )}

          {/* Service Charge */}
          {tx.serviceCharge && tx.serviceCharge > 0 && (
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 13, color: colors.textMuted }}>Service Charge</span>
              <span style={{ fontSize: 13, color: colors.textSecondary }}>{fmtAmt(tx.serviceCharge)}</span>
            </div>
          )}

          <div className="flex items-center justify-between mt-1 pt-2 border-t border-gray-100">
            <span style={{ fontSize: 14, fontWeight: 700, color: colors.textPrimary }}>Total</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: colors.primary, textDecoration: isVoided ? "line-through" : "none", opacity: isVoided ? 0.6 : 1 }}>
              {fmtAmt(tx.total)}
            </span>
          </div>

          {tx.changeAmount && tx.changeAmount > 0 ? (
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
              <span style={{ fontSize: 14, fontWeight: 600, color: colors.textMuted }}>Change</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#16a34a" }}>
                {fmtAmt(tx.changeAmount)}
              </span>
            </div>
          ) : null}
        </div>

        {/* Action buttons */}
        <div className="mt-5 flex flex-wrap gap-2 justify-between">
          <div className="flex gap-2">
            {/* Void / Refund -- only for completed transactions */}
            {!isVoided && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onVoidRequested(tx.id, false)}
                  style={{ color: "#e91835", borderColor: "#fbd2cf" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ marginRight: 4 }}>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M15 9l-6 6M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Void
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onVoidRequested(tx.id, true)}
                  style={{ color: "#d97706", borderColor: "#fcd34d" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ marginRight: 4 }}>
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Refund
                </Button>
              </>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>Close</Button>
            <Button variant="primary" size="sm" onClick={handlePrint}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginRight: 4 }}>
                <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="6" y="14" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Print Receipt
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

// ─── Columns ──────────────────────────────────────────────────────────────────

const COLUMNS: ColumnDef<OrderRow>[] = [
  {
    key: "id",
    label: "Invoice",
    sortable: true,
    render: (v) => (
      <span style={{ color: colors.infoText, fontWeight: 600, fontSize: 12 }}>{String(v)}</span>
    ),
  },
  { key: "datetime",  label: "Date & Time", sortable: true },
  { key: "customer",  label: "Customer",    sortable: true },
  {
    key: "itemCount",
    label: "Items",
    align: "center",
    render: (v) => (
      <span
        className="inline-flex items-center justify-center size-6 rounded-full"
        style={{ background: "var(--page-surface-2)", fontSize: 11, fontWeight: 600, color: colors.textSecondary }}
      >
        {String(v)}
      </span>
    ),
  },
  { key: "cashier", label: "Cashier", mobileHide: true },
  {
    key: "tableNo",
    label: "Table",
    mobileHide: true,
    render: (v) =>
      v ? (
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md"
          style={{ background: "var(--page-surface-2)", fontSize: 11, color: colors.textSecondary }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="7" width="20" height="6" rx="3" stroke="currentColor" strokeWidth="2" />
            <rect x="5" y="13" width="3" height="6" rx="1.5" stroke="currentColor" strokeWidth="2" />
            <rect x="16" y="13" width="3" height="6" rx="1.5" stroke="currentColor" strokeWidth="2" />
          </svg>
          {String(v)}
        </span>
      ) : (
        <span style={{ color: colors.textMuted, fontSize: 11 }}>-</span>
      ),
  },
  {
    key: "payment",
    label: "Payment",
    render: (v) => {
      const icons: Record<string, string> = {
        Cash:     "#10b981",
        Card:     "#2563eb",
        Transfer: "#7c3aed",
      };
      return (
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full shrink-0" style={{ background: icons[String(v)] ?? "#9ca3af" }} />
          <span style={{ fontSize: 12, color: colors.textSecondary }}>{String(v)}</span>
        </span>
      );
    },
  },
  {
    key: "status",
    label: "Status",
    align: "center",
    render: (v) => <Badge variant={statusVariant(v as TxStatus)}>{statusLabel(v as TxStatus)}</Badge>,
  },
  {
    key: "amount",
    label: "Amount",
    align: "right",
    sortable: true,
    mobileInline: true,
    render: (v, row) => (
      <span
        style={{
          fontWeight: 700,
          color: (row as OrderRow).status !== "completed" ? colors.textMuted : colors.textPrimary,
          textDecoration: (row as OrderRow).status !== "completed" ? "line-through" : "none",
        }}
      >
        {fmtAmt(Number(v))}
      </span>
    ),
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OrderHistoryPage({ isEmbedded = false }: { isEmbedded?: boolean }) {
  const { voidTransaction, activeStaff, restaurantName, staff, theme } = useAppStore();
  const isDark = theme === "dark";
  const [sidebarOpen,    setSidebarOpen]    = useState(false);
  const [showLogout,     setShowLogout]     = useState(false);
  const [dateRange,      setDateRange]      = useState<DateRange>("Month");
  const [selectedTx,     setSelectedTx]     = useState<Transaction | null>(null);
  const [voidTarget,     setVoidTarget]     = useState<{ id: string; refund: boolean } | null>(null);

  // ── Backend data ──────────────────────────────────────────────────────────
  const [apiOrders, setApiOrders] = useState<ApiOrder[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [search, setSearch] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);

  const DATE_RANGES: DateRange[] = ["Today", "Week", "Month", "All"];

  const rangeStartISO = useMemo(() => {
    if (dateRange === "All") return undefined;
    const d = new Date();
    if (dateRange === "Today") d.setHours(0, 0, 0, 0);
    else if (dateRange === "Week") d.setDate(d.getDate() - 7);
    else d.setMonth(d.getMonth() - 1);
    return d.toISOString();
  }, [dateRange]);

  useEffect(() => {
    setLoading(true);
    transactionsAPI.list({ limit: 200, startDate: rangeStartISO })
      .then((res) => setApiOrders(res.data.transactions ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [rangeStartISO]);

  const permissions = usePermissions();
  const isCashier = !permissions.includes("manager_override");

  // Map API orders → OrderRow
  const allOrders: OrderRow[] = useMemo(() => apiOrders.map((o) => {
    const d = new Date(o.createdAt);
    const datetime =
      d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
      "  " +
      d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
    const txStatus: TxStatus =
      o.status === "Cancelled" ? "voided" :
      o.paymentStatus === "Completed" ? "completed" : "completed";
    let parsedNotes: any = {};
    try { parsedNotes = JSON.parse(o.notes || "{}"); } catch(e) {}
    
    const pMethod = parsedNotes.paymentMethod || ((o as any).payments?.[0]?.method === "Mobile" ? "Transfer" : ((o as any).payments?.[0]?.method ?? "Cash"));
    const cashierName = parsedNotes.cashier || "Staff";
    
    return {
      id:        o.id.slice(-8).toUpperCase(),
      datetime,
      customer:  "Walk-in",
      itemCount: o.items.reduce((s, i) => s + i.quantity, 0),
      cashier:   cashierName,
      payment:   pMethod,
      amount:    o.total,
      status:    txStatus,
      tableNo:   parsedNotes.tableNo || "",
      raw: {
        id:            o.id,
        timestamp:     new Date(o.createdAt).getTime(),
        items:         o.items.map((i) => ({ id: i.id, name: i.menuItemId, price: i.unitPrice, qty: i.quantity })),
        customer:      { id: "api", name: "Walk-in" },
        subtotal:      o.subtotal,
        vat:           o.tax,
        total:         o.total,
        paymentMethod: pMethod,
        changeAmount:  parsedNotes.change || 0,
        cashier:       cashierName,
        status:        txStatus,
      } as Transaction,
    };
  }), [apiOrders]);

  const filteredByDate = useMemo(() => {
    let res = allOrders; // already filtered by API date range
    if (search.trim()) {
      const q = search.toLowerCase();
      res = res.filter(o => 
        o.id.toLowerCase().includes(q) || 
        (o.customer || "").toLowerCase().includes(q) || 
        (o.cashier || "").toLowerCase().includes(q) ||
        o.amount.toString().includes(q)
      );
    }
    return res;
  }, [allOrders, search]);

  // Stats
  const completedOrders = filteredByDate.filter((o) => o.status === "completed");
  const totalRevenue    = completedOrders.reduce((s, o) => s + o.amount, 0);
  const totalOrders     = filteredByDate.length;
  const avgOrder        = completedOrders.length > 0 ? Math.round(totalRevenue / completedOrders.length) : 0;
  const completedCnt    = completedOrders.length;
  const voidedCnt       = filteredByDate.filter((o) => o.status === "voided" || o.status === "refunded").length;

  const statCards = [
    {
      label: "Total Orders", value: String(totalOrders), accent: "#2563eb", bg: "#eff6ff",
      icon: <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" /><rect x="9" y="3" width="6" height="4" rx="1" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" /><path d="M9 12h6M9 16h4" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" /></svg>,
    },
    {
      label: "Revenue", value: fmtStat(totalRevenue), accent: "#e91835", bg: "#fff1f2",
      icon: <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="#e91835" strokeWidth="2" strokeLinecap="round" /></svg>,
    },
    {
      label: "Avg Order Value", value: fmtStat(avgOrder), accent: "#d97706", bg: "#fffbeb",
      icon: <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9M17 13l2 9M9 21h6" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    },
    {
      label: "Completed", value: String(completedCnt), accent: "#059669", bg: "#ecfdf5",
      icon: <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M20 6L9 17l-5-5" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    },
    {
      label: "Voided / Refunded", value: String(voidedCnt), accent: "#7c3aed", bg: "#f5f3ff",
      icon: <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><circle cx="12" cy="12" r="10" stroke="#7c3aed" strokeWidth="2" /><path d="M15 9l-6 6M9 9l6 6" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" /></svg>,
    },
  ];

  // Void/Refund logic:
  // - Cashier: close receipt modal first, then show manager override modal
  // - Manager/Owner: close receipt modal first, apply void directly
  const handleVoidRequested = useCallback((id: string, refund: boolean) => {
    // Always close the receipt modal first so it doesn't overlap
    setSelectedTx(null);
    if (isCashier) {
      // Needs manager PIN approval — open override modal
      setVoidTarget({ id, refund });
    } else {
      // Manager/Owner: apply void directly without PIN prompt
      const approver = activeStaff?.name ?? "Manager";
      ordersAPI.updateStatus(id, "Cancelled").catch(() => {});
      voidTransaction(id, approver, refund);
      const label = refund ? "Refunded" : "Voided";
      addActivityEntry({
        staffName: activeStaff?.name ?? "Owner",
        role: activeStaff?.role ?? "Owner",
        action: `Transaction ${label}`,
        category: "Sale",
        timestamp: Date.now(),
        detail: `Tx #${id} ${(label || "").toLowerCase()} by ${approver}`,
      });
      toast.success(`Transaction ${(label || "").toLowerCase()} successfully`);
    }
  }, [isCashier, activeStaff, voidTransaction]);

  const handleVoidApproved = useCallback((approver: string) => {
    if (!voidTarget) return;
    // Cancel on backend (best-effort)
    ordersAPI.updateStatus(voidTarget.id, "Cancelled").catch(() => {});
    voidTransaction(voidTarget.id, approver, voidTarget.refund);
    const label = voidTarget.refund ? "Refunded" : "Voided";
    addActivityEntry({
      staffName: activeStaff?.name ?? "Owner",
      role: activeStaff?.role ?? "Owner",
      action: `Transaction ${label}`,
      category: "Sale",
      timestamp: Date.now(),
      detail: `Tx #${voidTarget.id} ${(label || "").toLowerCase()} by ${approver}`,
    });
    toast.success(`Transaction ${(label || "").toLowerCase()} successfully`);
    setVoidTarget(null);
  }, [voidTarget, voidTransaction, activeStaff]);

  // CSV Export
  const handleExportCSV = useCallback(() => {
    const csv = exportTransactionsToCSV(filteredByDate.map((o) => o.raw));
    if (!csv) { toast.error("No transactions to export"); return; }
    const now = new Date();
    const filename = `tablix-orders-${(dateRange || "").toLowerCase()}-${now.toISOString().slice(0, 10)}.csv`;
    downloadCSV(csv, filename);
    toast.success("Export complete: " + filename);
  }, [filteredByDate, dateRange]);

  const content = (
    <>
      <Toaster richColors position="top-right" />

      {/* Header */}
      <header className={`shrink-0 z-30 h-[69px] flex items-center justify-between px-4 md:px-6 border-b shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]`} style={{ background: isEmbedded ? (isDark ? "#1c1c1e" : "#f4f4f6") : "var(--page-header-bg)", borderColor: isEmbedded ? (isDark ? "#3c3c3e" : "#e5e7eb") : "var(--page-header-border)" }}>
        <div className="flex items-center gap-3">
          {!isEmbedded && <AppLogo />}
          {!isEmbedded && <NavMenu />}
          {isEmbedded && <h1 className={`text-xl font-semibold ${isDark ? "text-white" : "text-[#111827]"}`}>Orders</h1>}
        </div>

      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {!isEmbedded && <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={() => setShowLogout(true)} activeId="orders" />}

        <main className={`flex-1 overflow-y-auto pb-[72px] md:pb-0 ${isEmbedded ? (isDark ? "bg-[#1c1c1e]" : "bg-[#f4f4f6]") : ""}`} style={isEmbedded ? {} : { background: "var(--page-surface)" }}>



          <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-5 md:gap-6">

            {/* Search Modal */}
            {showSearchModal && (
              <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] bg-black/30" onClick={() => setShowSearchModal(false)}>
                <div 
                  className={`w-[90%] max-w-xl rounded-2xl shadow-2xl overflow-hidden border ${isDark ? "bg-[#2c2c2e] border-[#3c3c3e]" : "bg-white border-gray-200"}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={`flex items-center px-4 py-3 ${isDark ? "border-[#3c3c3e]" : "border-gray-100"}`}>
                    <Search className={`w-6 h-6 mr-3 ${isDark ? "text-gray-400" : "text-gray-400"}`} />
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search orders..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className={`flex-1 text-lg bg-transparent outline-none ${isDark ? "text-white placeholder-gray-500" : "text-gray-900 placeholder-gray-400"}`}
                    />
                    <button onClick={() => setShowSearchModal(false)} className={`p-2 rounded-full transition-colors ${isDark ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}>
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Inner Header */}
            <div className="flex items-start justify-between">
              <div>
                <h1 style={{ fontFamily: INTER, fontWeight: 600, fontSize: 18, color: isDark ? "white" : "#0a0a0a" }}>
                  Order History
                </h1>
                <p style={{ fontFamily: INTER, fontWeight: 400, fontSize: 14, color: isDark ? "#a1a1aa" : "#4a5565", marginTop: 4 }}>
                  Browse, search and review all past transactions. Click any row to view full receipt.
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* Filter by period inside the page */}
                <div className="flex items-center rounded-xl p-1 gap-0.5 self-start hidden md:flex" style={{ background: "var(--page-surface-2)" }}>
                  {DATE_RANGES.map((r) => (
                    <button
                      key={r}
                      onClick={() => setDateRange(r)}
                      className="px-3 py-1.5 md:px-4 md:py-1.5 rounded-lg text-center transition-all"
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

                <button
                  onClick={() => setShowSearchModal(true)}
                  className={`p-2 rounded-full transition-colors hover:bg-[var(--page-surface-2)]`}
                  title="Search Orders"
                >
                  <Search className={`w-5 h-5 text-[var(--page-text-muted)]`} />
                </button>
                <button
                  onClick={handleExportCSV}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors bg-[var(--page-surface)] hover:bg-[var(--page-surface-2)]`}
                  style={{ border: `1px solid var(--page-border)`, cursor: "pointer" }}
                  title="Export to CSV"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="hidden md:block" style={{ fontFamily: INTER, fontSize: 12, fontWeight: 500, color: "var(--page-text)" }}>
                    Export CSV
                  </span>
                </button>
              </div>
            </div>

            {/* Mobile Filter */}
            <div className="flex items-center rounded-xl p-1 gap-0.5 self-start flex md:hidden" style={{ background: "var(--page-surface-2)" }}>
              {DATE_RANGES.map((r) => (
                <button
                  key={r}
                  onClick={() => setDateRange(r)}
                  className="px-3 py-1.5 md:px-4 md:py-1.5 rounded-lg text-center transition-all"
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
            {!isEmbedded && (
              <>
                <div className="md:hidden flex gap-3 overflow-x-auto -mx-4 px-4" style={{ scrollbarWidth: "none" }}>
                  {statCards.map((c) => (
                    <StatCard
                      key={c.label}
                      label={c.label}
                      value={c.value}
                      icon={c.icon}
                      iconBg={c.bg}
                      accent={c.accent}
                      compact
                      className="shrink-0"
                      style={{ minWidth: 155 }}
                    />
                  ))}
                </div>
                <div className="hidden md:grid grid-cols-3 xl:grid-cols-5 gap-4">
                  {statCards.map((c) => (
                    <StatCard
                      key={c.label}
                      label={c.label}
                      value={c.value}
                      icon={c.icon}
                      iconBg={c.bg}
                      accent={c.accent}
                      style={{ border: "none" }}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Order table / Receipt List */}
            {isEmbedded ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2">
                {filteredByDate.length === 0 ? (
                  <div className="col-span-full py-16 text-center">
                    <p style={{ fontFamily: INTER, color: "#a1a1aa", fontSize: 14 }}>No orders found.</p>
                  </div>
                ) : (
                  filteredByDate.map((o) => (
                    <div
                      key={o.id}
                      onClick={() => setSelectedTx(o.raw)}
                      className={`flex flex-col rounded-xl cursor-pointer transition-colors overflow-hidden ${isDark ? "bg-[#2c2c2e] hover:bg-[#3a3a3c]" : "bg-white hover:bg-[#fafafa] shadow-sm hover:shadow-md"}`}
                      style={{ border: `1px solid ${isDark ? "#3c3c3e" : "#e5e7eb"}` }}
                    >
                      {/* Receipt Header */}
                      <div className={`px-4 py-3 border-b flex items-center justify-between ${isDark ? "border-[#3c3c3e]" : "border-[#e5e7eb]"}`}>
                        <span className={`font-semibold text-sm ${isDark ? "text-white" : "text-[#111827]"}`}>#{o.id}</span>
                        <Badge variant={statusVariant(o.status)}>{statusLabel(o.status)}</Badge>
                      </div>
                      {/* Receipt Body */}
                      <div className="p-4 flex-1 flex flex-col gap-2">
                        <div className={`text-xs font-mono ${isDark ? "text-[#a1a1aa]" : "text-[#4b5563]"}`}>{o.datetime}</div>
                        <div className={`text-lg font-bold ${isDark ? "text-white" : "text-[#111827]"}`}>{fmtAmt(o.amount)}</div>
                        <div className="flex items-center justify-between mt-auto pt-2">
                          <span className={`text-xs ${isDark ? "text-[#d4d4d8]" : "text-[#4b5563]"}`}>{o.itemCount} items</span>
                          <span className={`text-xs ${isDark ? "text-[#d4d4d8]" : "text-[#4b5563]"}`}>{o.payment}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <DataTable<OrderRow>
                title="All Orders"
                subtitle={`${filteredByDate.length} order${filteredByDate.length !== 1 ? "s" : ""} found`}
                columns={COLUMNS}
                data={filteredByDate}
                rowKey="id"
                searchable
                searchPlaceholder="Search by invoice, customer, cashier, table..."
                filters={[
                  {
                    key: "status",
                    label: "Status",
                    options: [
                      { label: "Completed", value: "completed" },
                      { label: "Voided",    value: "voided"    },
                      { label: "Refunded",  value: "refunded"  },
                    ],
                  },
                  {
                    key: "payment",
                    label: "Payment",
                    options: [
                      { label: "Cash",     value: "Cash"     },
                      { label: "Card",     value: "Card"     },
                      { label: "Transfer", value: "Transfer" },
                    ],
                  },
                ]}
                exportable
                pageSize={10}
                emptyTitle="No orders found"
                emptyDescription="Try adjusting your date range or filters."
                onRowClick={(row) => setSelectedTx(row.raw)}
                mobilePrimary={(row) => (
                  <div className="flex items-center justify-between gap-2 w-full">
                    <div className="min-w-0">
                      <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: colors.infoText }} className="truncate">
                        {String(row.id)}
                      </p>
                      <p style={{ fontFamily: INTER, fontSize: 11, color: colors.textMuted, marginTop: 1 }} className="truncate">
                        {String(row.customer)} {row.tableNo ? "\u2022 Table " + String(row.tableNo) : ""} \u2022 {String(row.datetime).split("  ")[0]}
                      </p>
                    </div>
                    <Badge variant={statusVariant(row.status as TxStatus)}>{statusLabel(row.status as TxStatus)}</Badge>
                  </div>
                )}
                mobileDetailKeys={["payment", "cashier", "itemCount", "amount"]}
              />
            )}

          </div>
        </main>
      </div>

      {/* Receipt Modal */}
      <ReceiptModal
        tx={selectedTx}
        open={selectedTx !== null}
        onClose={() => setSelectedTx(null)}
        onVoidRequested={(id, refund) => { handleVoidRequested(id, refund); }}
        restaurantName={restaurantName}
      />

      {/* Void/Refund manager override */}
      {voidTarget && (
        <ManagerOverrideModal
          action={voidTarget.refund ? "Issue refund for this transaction" : "Void this transaction"}
          detail={"Transaction #" + voidTarget.id}
          staff={staff}
          onApprove={(approver) => handleVoidApproved(approver)}
          onCancel={() => setVoidTarget(null)}
        />
      )}

      <LogoutConfirmationModal
        isOpen={showLogout}
        onConfirm={() => setShowLogout(false)}
        onCancel={() => setShowLogout(false)}
      />
    </>
  );

  if (isEmbedded) {
    return <div className={`flex flex-col h-full overflow-hidden rounded-tl-xl ${isDark ? "bg-[#1c1c1e]" : "bg-[#f4f4f6]"}`}>{content}</div>;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: "var(--page-bg)" }}>
      {content}
      <MobileBottomNav activeId="orders" onLogout={() => setShowLogout(true)} />
    </div>
  );
}
