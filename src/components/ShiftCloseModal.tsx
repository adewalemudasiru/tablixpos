/**
 * ShiftCloseModal
 * End-of-shift cash reconciliation.
 * Cashier counts cash without knowing the expected total (blind count).
 * System reveals the discrepancy after they submit, logged to activity log.
 * After reconciliation, a printable Shift Settlement Report is available.
 */

import React, { useState, useEffect } from "react";
import { addActivityEntry } from "../services/activityLog";
import { useAppStore } from "../store/AppContext";
import type { StoreStaff } from "../store/AppContext";
import type { Transaction } from "../services/storage";

const INTER = "'Inter', sans-serif";
const NGN = "\u20a6";

interface Props {
  activeStaff: StoreStaff | null;
  /** All transactions from the current session (since last shift close or app load) */
  transactions: Transaction[];
  onClose: () => void;
}

type Step = "count" | "result" | "report";

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Group completed (non-voided) transactions by payment method */
function groupByPayment(txns: Transaction[]) {
  const groups: Record<string, { count: number; total: number }> = {};
  txns.forEach((t) => {
    if (t.status === "voided" || t.status === "refunded") return;
    const method = (t.paymentMethod || "cash").toLowerCase();
    const label = method.charAt(0).toUpperCase() + method.slice(1);
    if (!groups[label]) groups[label] = { count: 0, total: 0 };
    groups[label].count++;
    groups[label].total += t.total ?? 0;
  });
  return groups;
}

/** Group all transactions by cashier name */
function groupByCashier(txns: Transaction[]) {
  const groups: Record<string, { count: number; total: number; voided: number }> = {};
  txns.forEach((t) => {
    const name = t.cashier || "Unknown";
    if (!groups[name]) groups[name] = { count: 0, total: 0, voided: 0 };
    if (t.status === "voided" || t.status === "refunded") {
      groups[name].voided++;
    } else {
      groups[name].count++;
      groups[name].total += t.total ?? 0;
    }
  });
  return groups;
}

// ── Settlement Report Print HTML ──────────────────────────────────────────────

function buildSettlementHtml(opts: {
  restaurantName: string;
  address: string;
  cashierName: string;
  cashierRole: string;
  shiftDate: string;
  shiftTime: string;
  totalTxns: number;
  completedTxns: number;
  voidedTxns: number;
  refundedTxns: number;
  grossSales: number;
  netSales: number;
  expectedCash: number;
  actualCash: number;
  cashDiff: number;
  paymentGroups: Record<string, { count: number; total: number }>;
  cashierGroups: Record<string, { count: number; total: number; voided: number }>;
}) {
  const {
    restaurantName, address, cashierName, cashierRole,
    shiftDate, shiftTime, totalTxns, completedTxns, voidedTxns, refundedTxns,
    grossSales, netSales, expectedCash, actualCash, cashDiff,
    paymentGroups, cashierGroups,
  } = opts;

  const diffLabel = cashDiff === 0 ? "BALANCED" : cashDiff > 0 ? "SURPLUS" : "SHORTAGE";
  const diffColor = cashDiff === 0 ? "#16a34a" : cashDiff > 0 ? "#1d4ed8" : "#e91835";

  const payRows = Object.entries(paymentGroups).map(([method, g]) =>
    "<tr>" +
    "<td style='padding:3px 0;'>" + method + "</td>" +
    "<td style='text-align:right;padding:3px 0;'>" + g.count + "</td>" +
    "<td style='text-align:right;padding:3px 0;font-weight:700;'>" + NGN + g.total.toLocaleString("en-NG", { minimumFractionDigits: 2 }) + "</td>" +
    "</tr>"
  ).join("");

  const cashierRows = Object.entries(cashierGroups).map(([name, g]) =>
    "<tr>" +
    "<td style='padding:3px 0;'>" + name + "</td>" +
    "<td style='text-align:right;padding:3px 0;'>" + g.count + "</td>" +
    "<td style='text-align:right;padding:3px 0;font-weight:700;'>" + NGN + g.total.toLocaleString("en-NG", { minimumFractionDigits: 2 }) + "</td>" +
    "<td style='text-align:right;padding:3px 0;color:#e91835'>" + (g.voided > 0 ? g.voided + " void" : "-") + "</td>" +
    "</tr>"
  ).join("");

  return "<!DOCTYPE html><html><head>" +
    "<meta charset='UTF-8'>" +
    "<title>Shift Settlement - " + shiftDate + "</title>" +
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
    "th{font-weight:700;border-bottom:1px solid #000;padding-bottom:3px;font-size:8.5pt;text-align:left}" +
    "td{font-size:8.5pt}" +
    ".sec{font-weight:700;font-size:8.5pt;margin:6px 0 2px 0;text-transform:uppercase;letter-spacing:0.5px}" +
    "</style></head><body>" +
    "<div class='c b' style='font-size:13pt;letter-spacing:2px;margin-bottom:2px'>" + restaurantName.toUpperCase() + "</div>" +
    "<div class='c' style='font-size:8pt'>Shift Settlement Report</div>" +
    (address ? "<div class='c' style='font-size:8pt;color:#555'>" + address + "</div>" : "") +
    "<div class='dash'></div>" +
    "<div class='row'><span>Date:</span><span class='b'>" + shiftDate + "</span></div>" +
    "<div class='row'><span>Time:</span><span>" + shiftTime + "</span></div>" +
    "<div class='row'><span>Closed By:</span><span>" + cashierName + " (" + cashierRole + ")</span></div>" +
    "<div class='dash'></div>" +
    "<div class='sec'>Transaction Summary</div>" +
    "<div class='row'><span>Total Transactions:</span><span class='b'>" + totalTxns + "</span></div>" +
    "<div class='row'><span>Completed:</span><span>" + completedTxns + "</span></div>" +
    "<div class='row'><span>Voided:</span><span>" + voidedTxns + "</span></div>" +
    "<div class='row'><span>Refunded:</span><span>" + refundedTxns + "</span></div>" +
    "<div class='dash'></div>" +
    "<div class='sec'>Payment Breakdown</div>" +
    "<table><thead><tr><th>Method</th><th style='text-align:right'>Txns</th><th style='text-align:right'>Amount</th></tr></thead><tbody>" + payRows + "</tbody></table>" +
    "<div class='tsolid'></div>" +
    "<div class='row b'><span>Gross Sales:</span><span>" + NGN + grossSales.toLocaleString("en-NG", { minimumFractionDigits: 2 }) + "</span></div>" +
    "<div class='row'><span>Net Sales:</span><span>" + NGN + netSales.toLocaleString("en-NG", { minimumFractionDigits: 2 }) + "</span></div>" +
    "<div class='dash'></div>" +
    "<div class='sec'>Cashier Breakdown</div>" +
    "<table><thead><tr><th>Name</th><th style='text-align:right'>Txns</th><th style='text-align:right'>Sales</th><th style='text-align:right'>Void</th></tr></thead><tbody>" + cashierRows + "</tbody></table>" +
    "<div class='dash'></div>" +
    "<div class='sec'>Cash Reconciliation</div>" +
    "<div class='row'><span>Expected Cash:</span><span class='b'>" + NGN + expectedCash.toLocaleString("en-NG", { minimumFractionDigits: 2 }) + "</span></div>" +
    "<div class='row'><span>Cash Counted:</span><span class='b'>" + NGN + actualCash.toLocaleString("en-NG", { minimumFractionDigits: 2 }) + "</span></div>" +
    "<div class='solid'></div>" +
    "<div class='row b' style='font-size:10pt;color:" + diffColor + "'><span>Status:</span><span>" + diffLabel + "</span></div>" +
    (cashDiff !== 0 ? "<div class='row' style='color:" + diffColor + "'><span>Difference:</span><span>" + (cashDiff > 0 ? "+" : "") + NGN + Math.abs(cashDiff).toLocaleString("en-NG", { minimumFractionDigits: 2 }) + "</span></div>" : "") +
    "<div class='dash'></div>" +
    "<div class='c' style='font-size:8pt'>This report was generated by Tablix POS.</div>" +
    "<div class='c' style='font-size:8pt'>Keep this report for your records.</div>" +
    "</body></html>";
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ShiftCloseModal({ activeStaff, transactions, onClose }: Props) {
  const { restaurantName, businessConfig } = useAppStore();
  const [step, setStep] = useState<Step>("count");
  const [cashInput, setCashInput] = useState("");
  const [result, setResult] = useState<{ expected: number; actual: number; diff: number } | null>(null);

  // Close on Escape when on result/report step
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape" && step !== "count") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose, step]);

  // Cash transactions only (what the drawer should hold)
  const cashTxns = transactions.filter((t) => t.paymentMethod?.toLowerCase() === "cash" && t.status !== "voided" && t.status !== "refunded");
  const expectedCash = cashTxns.reduce((s, t) => s + (t.total ?? 0), 0);

  const completedTxns = transactions.filter((t) => !t.status || t.status === "completed");
  const voidedTxns    = transactions.filter((t) => t.status === "voided");
  const refundedTxns  = transactions.filter((t) => t.status === "refunded");

  const grossSales = completedTxns.reduce((s, t) => s + (t.total ?? 0), 0);
  // Net sales: gross minus refunded amounts
  const refundedTotal = refundedTxns.reduce((s, t) => s + (t.total ?? 0), 0);
  const netSales = grossSales - refundedTotal;

  const txnCount = transactions.length;
  const paymentGroups = groupByPayment(transactions);
  const cashierGroups = groupByCashier(transactions);

  const staffName = activeStaff ? activeStaff.name : "Owner";
  const staffRole = activeStaff ? activeStaff.role : "Owner";

  const now = new Date();
  const shiftDate = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const shiftTime = now.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" });

  const handleSubmit = () => {
    const actual = parseFloat(cashInput.replace(/,/g, "")) || 0;
    const diff = actual - expectedCash;
    setResult({ expected: expectedCash, actual, diff });

    // Log to activity log
    const status = diff === 0 ? "Balanced" : diff > 0 ? "Surplus +" + NGN + Math.abs(diff).toLocaleString() : "Shortage -" + NGN + Math.abs(diff).toLocaleString();
    addActivityEntry({
      staffName,
      role: staffRole,
      action: "Shift closed",
      category: "System",
      timestamp: Date.now(),
      detail: `Cash reconciliation: ${status}. Expected ${NGN}${expectedCash.toLocaleString()}, Counted ${NGN}${actual.toLocaleString()}. ${txnCount} transactions, net sales ${NGN}${netSales.toLocaleString()}`,
    });

    setStep("result");
  };

  const handlePrintReport = () => {
    if (!result) return;
    const addressLine = [businessConfig.address, businessConfig.city, businessConfig.state].filter(Boolean).join(", ");
    const html = buildSettlementHtml({
      restaurantName,
      address: addressLine,
      cashierName: staffName,
      cashierRole: staffRole,
      shiftDate,
      shiftTime,
      totalTxns:     txnCount,
      completedTxns: completedTxns.length,
      voidedTxns:    voidedTxns.length,
      refundedTxns:  refundedTxns.length,
      grossSales,
      netSales,
      expectedCash,
      actualCash:    result.actual,
      cashDiff:      result.diff,
      paymentGroups,
      cashierGroups,
    });
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
  };

  const diffAbs   = result ? Math.abs(result.diff) : 0;
  const diffColor = !result ? "#374151" : result.diff === 0 ? "#16a34a" : result.diff > 0 ? "#2563eb" : "#e91835";
  const diffLabel = !result ? "" : result.diff === 0 ? "Balanced" : result.diff > 0 ? "Surplus" : "Shortage";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={(e) => { if (e.target === e.currentTarget && step !== "count") onClose(); }}
    >
      <div
        className="w-full bg-[var(--page-bg)] rounded-2xl overflow-hidden shadow-2xl"
        style={{ maxWidth: step === "report" ? 480 : 400, animation: "shiftIn 0.18s ease-out" }}
      >
        <style>{`
          @keyframes shiftIn {
            from { opacity:0; transform: scale(0.95) translateY(10px); }
            to   { opacity:1; transform: scale(1) translateY(0); }
          }
        `}</style>

        {/* Top accent */}
        <div style={{ height: 4, background: "linear-gradient(90deg,#111827,#374151)" }} />

        <div className="flex flex-col gap-5 p-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-xl shrink-0"
              style={{ width: 44, height: 44, background: "var(--page-surface-2)", border: "1.5px solid var(--page-border)" }}
            >
              {step === "report" ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M9 7H6a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-3" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
                  <path d="M9 7V5a2 2 0 114 0v2M9 7h6" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 12v4M10 14h4" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <div>
              <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 16, color: "#111827" }}>
                {step === "count" ? "Close Shift" : step === "result" ? "Shift Summary" : "Settlement Report"}
              </p>
              <p style={{ fontFamily: INTER, fontSize: 12, color: "#6b7280" }}>
                {staffName} ({staffRole}) &bull; {shiftDate} {shiftTime}
              </p>
            </div>
          </div>

          {/* ── STEP: COUNT ─────────────────────────────────────────────── */}
          {step === "count" && (
            <>
              {/* Blind count instruction */}
              <div
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#2563eb" strokeWidth="2" />
                  <path d="M12 8v4M12 16h.01" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <p style={{ fontFamily: INTER, fontSize: 12, color: "#1e40af", lineHeight: "18px" }}>
                  Count all cash in the drawer <strong>without looking at the system total</strong>. Enter your count below, then submit.
                </p>
              </div>

              {/* Session stats (no expected cash shown) */}
              <div
                className="grid grid-cols-2 gap-3 p-4 rounded-xl"
                style={{ background: "var(--page-surface)", border: "1px solid var(--page-border)" }}
              >
                <div className="flex flex-col gap-0.5">
                  <p style={{ fontFamily: INTER, fontSize: 11, color: "#9ca3af" }}>Transactions</p>
                  <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 18, color: "#111827" }}>{txnCount}</p>
                </div>
                <div className="flex flex-col gap-0.5">
                  <p style={{ fontFamily: INTER, fontSize: 11, color: "#9ca3af" }}>Net Sales</p>
                  <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 18, color: "#111827" }}>{NGN}{netSales.toLocaleString()}</p>
                </div>
              </div>

              {/* Cash input */}
              <div className="flex flex-col gap-2">
                <label style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: "#374151" }}>
                  Cash Counted in Drawer
                </label>
                <div
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                  style={{ border: "1.5px solid var(--page-border)", background: "var(--page-bg)" }}
                >
                  <span style={{ fontFamily: INTER, fontWeight: 700, fontSize: 16, color: "#e91835" }}>{NGN}</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="0.00"
                    value={cashInput}
                    onChange={(e) => setCashInput(e.target.value)}
                    style={{
                      flex: 1, border: "none", outline: "none",
                      fontFamily: INTER, fontWeight: 600, fontSize: 16, color: "#111827",
                      background: "transparent",
                    }}
                    autoFocus
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  onClick={onClose}
                  style={{ flex: 1, padding: "10px 0", borderRadius: 12, fontFamily: INTER, fontWeight: 600, fontSize: 13, background: "var(--page-surface-2)", color: "var(--page-text)", border: "none", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!cashInput || parseFloat(cashInput) < 0}
                  style={{
                    flex: 1, padding: "10px 0", borderRadius: 12,
                    fontFamily: INTER, fontWeight: 600, fontSize: 13,
                    background: !cashInput ? "#9ca3af" : "#111827",
                    color: "white", border: "none",
                    cursor: !cashInput ? "not-allowed" : "pointer",
                  }}
                >
                  Submit Count
                </button>
              </div>
            </>
          )}

          {/* ── STEP: RESULT ────────────────────────────────────────────── */}
          {step === "result" && result && (
            <>
              <div className="flex flex-col gap-3">
                {/* Summary rows */}
                {[
                  { label: "Transactions",  value: txnCount.toString(),                     mono: false },
                  { label: "Gross Sales",   value: NGN + grossSales.toLocaleString(),        mono: true  },
                  { label: "Net Sales",     value: NGN + netSales.toLocaleString(),           mono: true  },
                  { label: "Cash Sales",    value: NGN + expectedCash.toLocaleString(),       mono: true  },
                  { label: "Cash Counted",  value: NGN + result.actual.toLocaleString(),      mono: true  },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between">
                    <p style={{ fontFamily: INTER, fontSize: 13, color: "#6b7280" }}>{row.label}</p>
                    <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: "#111827" }}>{row.value}</p>
                  </div>
                ))}

                {/* Discrepancy box */}
                <div
                  className="flex items-center justify-between px-4 py-3 rounded-xl mt-1"
                  style={{
                    background: result.diff === 0 ? "#f0fdf4" : result.diff > 0 ? "#eff6ff" : "#fff1f2",
                    border: `1px solid ${result.diff === 0 ? "#bbf7d0" : result.diff > 0 ? "#bfdbfe" : "#fecdd3"}`,
                  }}
                >
                  <div>
                    <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 14, color: diffColor }}>{diffLabel}</p>
                    <p style={{ fontFamily: INTER, fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
                      {result.diff === 0
                        ? "Cash matches perfectly"
                        : result.diff > 0
                          ? "More cash than expected - report to manager"
                          : "Less cash than expected - requires explanation"}
                    </p>
                  </div>
                  <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 22, color: diffColor }}>
                    {result.diff !== 0 && (result.diff > 0 ? "+" : "-")}{NGN}{diffAbs.toLocaleString()}
                  </p>
                </div>

                <p style={{ fontFamily: INTER, fontSize: 11, color: "#9ca3af", textAlign: "center", marginTop: 2 }}>
                  This reconciliation has been saved to the activity log.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setStep("report")}
                  style={{
                    width: "100%", padding: "11px 0", borderRadius: 12,
                    fontFamily: INTER, fontWeight: 600, fontSize: 14,
                    background: "#e91835", color: "white", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  View Settlement Report
                </button>
                <button
                  onClick={onClose}
                  style={{
                    width: "100%", padding: "11px 0", borderRadius: 12,
                    fontFamily: INTER, fontWeight: 600, fontSize: 14,
                    background: "var(--page-surface-2)", color: "var(--page-text)", border: "none", cursor: "pointer",
                  }}
                >
                  Done
                </button>
              </div>
            </>
          )}

          {/* ── STEP: REPORT ────────────────────────────────────────────── */}
          {step === "report" && result && (
            <>
              {/* Overview stats */}
              <div
                className="grid grid-cols-2 gap-3 p-4 rounded-xl"
                style={{ background: "var(--page-surface)", border: "1px solid var(--page-border)" }}
              >
                {[
                  { label: "Total Txns",    value: txnCount.toString() },
                  { label: "Net Sales",     value: NGN + netSales.toLocaleString() },
                  { label: "Completed",     value: completedTxns.length.toString() },
                  { label: "Voids/Refunds", value: (voidedTxns.length + refundedTxns.length).toString() },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col gap-0.5">
                    <p style={{ fontFamily: INTER, fontSize: 11, color: "#9ca3af" }}>{s.label}</p>
                    <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 16, color: "#111827" }}>{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Payment Method Breakdown */}
              <div>
                <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 12, color: "#374151", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                  Payment Breakdown
                </p>
                <div className="flex flex-col gap-2">
                  {Object.entries(paymentGroups).length === 0 ? (
                    <p style={{ fontFamily: INTER, fontSize: 12, color: "#9ca3af" }}>No completed transactions this shift.</p>
                  ) : (
                    Object.entries(paymentGroups).map(([method, g]) => {
                      const pct = grossSales > 0 ? Math.round(g.total / grossSales * 100) : 0;
                      const barColor = method.toLowerCase() === "cash" ? "#16a34a" : method.toLowerCase() === "card" ? "#2563eb" : "#d97706";
                      return (
                        <div key={method} className="flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div style={{ width: 8, height: 8, borderRadius: "50%", background: barColor }} />
                              <p style={{ fontFamily: INTER, fontSize: 13, color: "#374151" }}>{method}</p>
                              <p style={{ fontFamily: INTER, fontSize: 11, color: "#9ca3af" }}>({g.count} txn{g.count !== 1 ? "s" : ""})</p>
                            </div>
                            <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: "#111827" }}>{NGN}{g.total.toLocaleString()}</p>
                          </div>
                          <div style={{ height: 4, background: "var(--page-surface-2)", borderRadius: 4, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: pct + "%", background: barColor, borderRadius: 4, transition: "width 0.5s ease" }} />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Cashier Breakdown */}
              {Object.keys(cashierGroups).length > 1 && (
                <div>
                  <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 12, color: "#374151", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                    By Cashier
                  </p>
                  <div className="flex flex-col gap-0">
                    <div
                      className="grid gap-2 px-3 py-2 rounded-t-lg"
                      style={{ gridTemplateColumns: "1fr auto auto auto", background: "var(--page-surface-2)", borderBottom: "1px solid var(--page-border)" }}
                    >
                      {["Staff", "Txns", "Sales", "Voids"].map((h) => (
                        <p key={h} style={{ fontFamily: INTER, fontSize: 11, fontWeight: 600, color: "#6b7280", textAlign: h === "Staff" ? "left" : "right" }}>{h}</p>
                      ))}
                    </div>
                    {Object.entries(cashierGroups).map(([name, g], i, arr) => (
                      <div
                        key={name}
                        className="grid gap-2 px-3 py-2"
                        style={{
                          gridTemplateColumns: "1fr auto auto auto",
                          background: "var(--page-bg)",
                          borderBottom: i < arr.length - 1 ? "1px solid var(--page-surface-2)" : "1px solid var(--page-border)",
                          borderLeft: "1px solid var(--page-border)",
                          borderRight: "1px solid var(--page-border)",
                          ...(i === arr.length - 1 ? { borderRadius: "0 0 8px 8px" } : {}),
                        }}
                      >
                        <p style={{ fontFamily: INTER, fontSize: 12, color: "#111827", fontWeight: 500 }}>{name}</p>
                        <p style={{ fontFamily: INTER, fontSize: 12, color: "#374151", textAlign: "right" }}>{g.count}</p>
                        <p style={{ fontFamily: INTER, fontSize: 12, color: "#111827", fontWeight: 600, textAlign: "right" }}>{NGN}{g.total.toLocaleString()}</p>
                        <p style={{ fontFamily: INTER, fontSize: 12, color: g.voided > 0 ? "#e91835" : "#9ca3af", textAlign: "right" }}>{g.voided > 0 ? g.voided : "-"}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cash Reconciliation */}
              <div
                className="flex flex-col gap-2 p-3 rounded-xl"
                style={{ background: result.diff === 0 ? "#f0fdf4" : result.diff > 0 ? "#eff6ff" : "#fff1f2", border: `1px solid ${result.diff === 0 ? "#bbf7d0" : result.diff > 0 ? "#bfdbfe" : "#fecdd3"}` }}
              >
                <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 12, color: "#374151", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Cash Reconciliation
                </p>
                {[
                  { label: "Expected Cash",  value: NGN + expectedCash.toLocaleString() },
                  { label: "Cash Counted",   value: NGN + result.actual.toLocaleString() },
                ].map((r) => (
                  <div key={r.label} className="flex items-center justify-between">
                    <p style={{ fontFamily: INTER, fontSize: 12, color: "#6b7280" }}>{r.label}</p>
                    <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 12, color: "#111827" }}>{r.value}</p>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-1 mt-1" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                  <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 13, color: diffColor }}>{diffLabel}</p>
                  <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 18, color: diffColor }}>
                    {result.diff !== 0 && (result.diff > 0 ? "+" : "-")}{NGN}{diffAbs.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={handlePrintReport}
                  style={{
                    width: "100%", padding: "11px 0", borderRadius: 12,
                    fontFamily: INTER, fontWeight: 600, fontSize: 14,
                    background: "#111827", color: "white", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 14h12v8H6z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Print Settlement Report (80mm)
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => setStep("result")}
                    style={{
                      flex: 1, padding: "10px 0", borderRadius: 12,
                      fontFamily: INTER, fontWeight: 600, fontSize: 13,
                      background: "var(--page-surface-2)", color: "var(--page-text)", border: "none", cursor: "pointer",
                    }}
                  >
                    Back
                  </button>
                  <button
                    onClick={onClose}
                    style={{
                      flex: 1, padding: "10px 0", borderRadius: 12,
                      fontFamily: INTER, fontWeight: 600, fontSize: 13,
                      background: "var(--page-surface-2)", color: "var(--page-text)", border: "none", cursor: "pointer",
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
