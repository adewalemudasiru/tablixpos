import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useAppStore } from "../store/AppContext";
import type { Transaction, KDSOrder, KDSStation } from "../store/AppContext";
import { UpgradeGate } from "../components/UpgradeGate";
import { LogoutConfirmationModal } from "../components/LogoutConfirmationModal";
import { AppSidebar, AppLogo, MobileBottomNav } from "../components/AppSidebar";
import { NavMenu } from "../components/NavMenu";
import {
  Badge, DataTable, colors, radius, shadows, StatCard, Modal, Button,
  type ColumnDef,
} from "../components/ds";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { transactionsAPI, expensesAPI } from "../services/api";
import type { ApiOrder, ApiExpense } from "../services/api";

const INTER = "'Inter', sans-serif";
const NGN = "\u20a6";
const CARD = "page-card rounded-2xl border page-border shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_4px_16px_0_rgba(0,0,0,0.04)]";

// ─── Range helpers ────────────────────────────────────────────────────────────

type Range = "Today" | "Week" | "Month" | "Year";

function getRangeStart(r: Range): number {
  const now = new Date();
  if (r === "Today") { now.setHours(0, 0, 0, 0); return now.getTime(); }
  if (r === "Year")  { now.setMonth(0, 1); now.setHours(0, 0, 0, 0); return now.getTime(); }
  if (r === "Month") { now.setDate(1); now.setHours(0, 0, 0, 0); return now.getTime(); }
  now.setDate(now.getDate() - 7); now.setHours(0, 0, 0, 0); return now.getTime();
}

function computeTrendData(txs: Transaction[], range: Range): any[] {
  if (range === "Today") {
    const hours = ["8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm","6pm","7pm","8pm","9pm"];
    const b: Record<string, { revenue: number; orders: number }> = {};
    hours.forEach((h) => { b[h] = { revenue: 0, orders: 0 }; });
    txs.forEach((t) => {
      const h = new Date(t.timestamp).getHours();
      const label = h === 12 ? "12pm" : h > 12 ? `${h - 12}pm` : `${h}am`;
      if (b[label]) { b[label].revenue += t.total; b[label].orders += 1; }
    });
    return hours.map((h) => ({ hour: h, ...b[h] }));
  }
  if (range === "Week") {
    const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    const now = new Date(); const b: Record<string, { revenue: number; orders: number; profit: number }> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now); d.setDate(d.getDate() - i);
      const label = days[d.getDay() === 0 ? 6 : d.getDay() - 1]; b[label] = { revenue: 0, orders: 0, profit: 0 };
    }
    txs.forEach((t) => {
      const d = new Date(t.timestamp);
      const label = days[d.getDay() === 0 ? 6 : d.getDay() - 1];
      if (b[label]) { b[label].revenue += t.total; b[label].orders += 1; b[label].profit += Math.round(t.total * 0.3); }
    });
    return Object.entries(b).map(([day, v]) => ({ day, ...v }));
  }
  if (range === "Month") {
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const b: Record<string, { revenue: number; orders: number }> = {};
    for (let i = 1; i <= daysInMonth; i++) b[`${MONTHS[now.getMonth()]} ${i}`] = { revenue: 0, orders: 0 };
    txs.forEach((t) => {
      const d = new Date(t.timestamp);
      const label = `${MONTHS[d.getMonth()]} ${d.getDate()}`;
      if (b[label]) { b[label].revenue += t.total; b[label].orders += 1; }
    });
    return Object.entries(b).map(([label, v]) => ({ label, ...v }));
  }
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const b: Record<string, { revenue: number; orders: number; profit: number }> = {};
  months.forEach((m) => { b[m] = { revenue: 0, orders: 0, profit: 0 }; });
  txs.forEach((t) => {
    const m = months[new Date(t.timestamp).getMonth()];
    b[m].revenue += t.total; b[m].orders += 1; b[m].profit += Math.round(t.total * 0.3);
  });
  return months.map((label) => ({ label, ...b[label] }));
}

function computePaymentData(txs: Transaction[]) {
  const map: Record<string, number> = {};
  txs.forEach((t) => { map[t.paymentMethod] = (map[t.paymentMethod] || 0) + t.total; });
  const cols = ["#e91835","#2563eb","#7c3aed","#059669","#d97706"];
  return Object.entries(map).map(([name, value], i) => ({ name, value, color: cols[i % cols.length] }));
}

function computeCategoryData(txs: Transaction[]) {
  const map: Record<string, { revenue: number; orders: number }> = {};
  const COLS = ["#e91835","#2563eb","#d97706","#059669","#7c3aed","#ec4899"];
  txs.forEach((t) => {
    t.items.forEach((item) => {
      if (!map[item.name]) map[item.name] = { revenue: 0, orders: 0 };
      map[item.name].revenue += item.price * item.qty;
      map[item.name].orders  += item.qty;
    });
  });
  return Object.entries(map)
    .sort(([, a], [, b]) => b.revenue - a.revenue)
    .slice(0, 6)
    .map(([name, v], i) => ({ name, ...v, color: COLS[i % COLS.length] }));
}

function computeBestSellers(txs: Transaction[]) {
  const map: Record<string, { units: number; revenue: number }> = {};
  txs.forEach((t) => {
    t.items.forEach((item) => {
      if (!map[item.name]) map[item.name] = { units: 0, revenue: 0 };
      map[item.name].units   += item.qty;
      map[item.name].revenue += item.price * item.qty;
    });
  });
  const sorted = Object.entries(map).map(([name, v]) => ({ name, ...v })).sort((a, b) => b.units - a.units).slice(0, 5);
  const max = sorted[0]?.units || 1;
  return sorted.map((item, i) => ({ rank: i + 1, ...item, pct: Math.round((item.units / max) * 100) }));
}

function fmtK(n: number) {
  if (n >= 1000000) return `${NGN}${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000)    return `${NGN}${(n / 1000).toFixed(0)}K`;
  return `${NGN}${n.toLocaleString()}`;
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-xl px-3 py-2.5 shadow-xl" style={{ minWidth: 130, background: "var(--page-card-bg)", border: "1px solid var(--page-border)" }}>
      <p style={{ fontFamily: INTER, fontSize: 11, color: "var(--page-text-muted)", marginBottom: 6 }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: p.color || p.fill }} />
            <span style={{ fontFamily: INTER, fontSize: 11, color: "var(--page-text)" }}>{p.name}</span>
          </div>
          <span style={{ fontFamily: INTER, fontWeight: 600, fontSize: 12, color: "var(--page-text)" }}>
            {p.name === "orders" || p.name === "Orders" ? p.value : fmtK(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Stat Cards ──────────────────────────────────────────────────────────────

function StatCards({ revenue = 0, orders = 0, avg = 0, profit = 0, tax = 0 }: {
  revenue?: number; orders?: number; avg?: number; profit?: number; tax?: number;
}) {
  const safe = (n: number) => (typeof n === "number" && isFinite(n) ? n : 0);
  const fmt = (n: number) => {
    const v = safe(n);
    if (v >= 1000000) return `${NGN}${(v / 1000000).toFixed(1)}M`;
    if (v >= 1000) return `${NGN}${(v / 1000).toFixed(0)}K`;
    return `${NGN}${v.toLocaleString()}`;
  };
  const cards = [
    { label: "Revenue",      value: fmt(revenue),             accent: "#e91835", bg: "var(--c-primary-light)", icon: <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="#e91835" strokeWidth="2" strokeLinecap="round" /></svg> },
    { label: "Orders",       value: safe(orders).toLocaleString(), accent: "#2563eb", bg: "var(--c-info-bg)", icon: <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><rect x="2" y="3" width="20" height="14" rx="2" stroke="#2563eb" strokeWidth="2" /><path d="M8 21h8M12 17v4" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" /></svg> },
    { label: "Avg Order",    value: fmt(avg),                 accent: "#d97706", bg: "var(--c-warning-bg)", icon: <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9M17 13l2 9M9 21h6" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> },
    { label: "Profit",       value: fmt(profit),              accent: "#059669", bg: "var(--c-success-bg)", icon: <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M3.5 18.5l6-6 4 4L22 7" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> },
    { label: "Tax Collected", value: fmt(tax),                accent: "#7c3aed", bg: "var(--c-info-bg)", icon: <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M9 14l6-6M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  ];
  return (
    <>
      <div className="md:hidden flex gap-3 overflow-x-auto -mx-4 px-4" style={{ scrollbarWidth: "none" }}>
        {cards.map((c) => <StatCard key={c.label} label={c.label} value={c.value} icon={c.icon} iconBg={c.bg} accent={c.accent} compact className="shrink-0" style={{ minWidth: 155 }} />)}
      </div>
      <div className="hidden md:grid grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((c) => <StatCard key={c.label} label={c.label} value={c.value} icon={c.icon} iconBg={c.bg} accent={c.accent} style={{ border: "none" }} />)}
      </div>
    </>
  );
}

// ─── Sales Trend Chart ────────────────────────────────────────────────────────

function SalesTrendChart({ range, data }: { range: Range; data: any[] }) {
  const [metric, setMetric] = useState<"revenue" | "orders">("revenue");
  const xKey = range === "Today" ? "hour" : range === "Year" ? "label" : (data[0] && "day" in data[0] ? "day" : "label");
  return (
    <div className={`${CARD} p-5 md:p-6 flex flex-col gap-4`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 15, color: colors.textPrimary }}>Sales Trend</p>
          <p style={{ fontFamily: INTER, fontSize: 12, color: colors.textMuted, marginTop: 2 }}>
            {range === "Today" ? "Hourly breakdown" : range === "Week" ? "Last 7 days" : range === "Month" ? "This month" : "This year"}
          </p>
        </div>
        <div className="flex items-center gap-1 p-0.5 rounded-xl" style={{ background: "var(--page-surface-2)" }}>
          {(["revenue", "orders"] as const).map((m) => (
            <button key={m} onClick={() => setMetric(m)} style={{ fontFamily: INTER, fontSize: 11, fontWeight: metric === m ? 600 : 400, padding: "5px 10px", borderRadius: radius.lg, background: metric === m ? "var(--page-card-bg)" : "transparent", color: metric === m ? colors.primary : colors.textMuted, boxShadow: metric === m ? shadows.sm : "none", border: "none", cursor: "pointer", transition: "all 0.15s" }}>
              {m === "revenue" ? "Revenue" : "Orders"}
            </button>
          ))}
        </div>
      </div>
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="gradRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={colors.primary} stopOpacity={0.2} />
                <stop offset="95%" stopColor={colors.primary} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--page-border)" vertical={false} />
            <XAxis dataKey={xKey} tick={{ fontFamily: INTER, fontSize: 10, fill: colors.textMuted }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => metric === "revenue" ? fmtK(v) : String(v)} tick={{ fontFamily: INTER, fontSize: 10, fill: colors.textMuted }} axisLine={false} tickLine={false} width={52} />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey={metric} name={metric === "revenue" ? "Revenue" : "Orders"} stroke={colors.primary} strokeWidth={2.5} fill="url(#gradRev)" dot={false} activeDot={{ r: 5, fill: colors.primary, strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── Revenue vs Profit / Peak Hours ──────────────────────────────────────────

function RevenueProfitChart({ range, data }: { range: Range; data: any[] }) {
  if (range === "Today") {
    return (
      <div className={`${CARD} p-5 md:p-6 flex flex-col gap-4`}>
        <div>
          <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 15, color: colors.textPrimary }}>Peak Hours</p>
          <p style={{ fontFamily: INTER, fontSize: 12, color: colors.textMuted, marginTop: 2 }}>Order volume by hour today</p>
        </div>
        <div style={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--page-border)" vertical={false} />
              <XAxis dataKey="hour" tick={{ fontFamily: INTER, fontSize: 10, fill: colors.textMuted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontFamily: INTER, fontSize: 10, fill: colors.textMuted }} axisLine={false} tickLine={false} width={28} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="orders" name="Orders" fill={colors.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  return (
    <div className={`${CARD} p-5 md:p-6 flex flex-col gap-4`}>
      <div className="flex items-center justify-between">
        <div>
          <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 15, color: colors.textPrimary }}>Revenue vs Profit</p>
          <p style={{ fontFamily: INTER, fontSize: 12, color: colors.textMuted, marginTop: 2 }}>Side by side comparison</p>
        </div>
        <div className="flex items-center gap-3">
          {[{ label: "Revenue", color: colors.primary }, { label: "Profit", color: colors.successText }].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full" style={{ background: l.color }} />
              <span style={{ fontFamily: INTER, fontSize: 11, color: colors.textMuted }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--page-border)" vertical={false} />
            <XAxis dataKey={data[0] && "day" in data[0] ? "day" : "label"} tick={{ fontFamily: INTER, fontSize: 10, fill: colors.textMuted }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={fmtK} tick={{ fontFamily: INTER, fontSize: 10, fill: colors.textMuted }} axisLine={false} tickLine={false} width={48} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="revenue" name="Revenue" fill={colors.primary}     radius={[4, 4, 0, 0]} />
            <Bar dataKey="profit"  name="Profit"  fill={colors.successText} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── Category Breakdown ───────────────────────────────────────────────────────

function CategoryChart({ catData }: { catData: { name: string; revenue: number; orders: number; color: string }[] }) {
  const display = catData.length > 0 ? catData : [{ name: "No sales yet", revenue: 1, orders: 0, color: "#e5e7eb" }];
  return (
    <div className={`${CARD} p-5 md:p-6 flex flex-col gap-4`}>
      <div>
        <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 15, color: colors.textPrimary }}>Top Selling Items</p>
        <p style={{ fontFamily: INTER, fontSize: 12, color: colors.textMuted, marginTop: 2 }}>Revenue by item this period</p>
      </div>
      <div style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={display} layout="vertical" margin={{ top: 0, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--page-border)" horizontal={false} />
            <XAxis type="number" tickFormatter={fmtK} tick={{ fontFamily: INTER, fontSize: 10, fill: colors.textMuted }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fontFamily: INTER, fontSize: 10, fill: colors.textSecondary }} axisLine={false} tickLine={false} width={96} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="revenue" name="Revenue" radius={[0, 4, 4, 0]}>
              {display.map((c, i) => <Cell key={`cell-${i}`} fill={c.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      {catData.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
          {catData.map((c) => (
            <div key={c.name} className="flex items-center gap-2">
              <span className="size-2 rounded-full shrink-0" style={{ background: c.color }} />
              <div className="min-w-0">
                <p style={{ fontFamily: INTER, fontSize: 10, color: colors.textMuted }} className="truncate">{c.name}</p>
                <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 11, color: colors.textPrimary }}>{fmtK(c.revenue)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Payment Distribution ─────────────────────────────────────────────────────

function PaymentDistribution({ payData }: { payData: { name: string; value: number; color: string }[] }) {
  const display = payData.length > 0 ? payData : [{ name: "No data", value: 1, color: "#e5e7eb" }];
  const total = display.reduce((s, p) => s + p.value, 0);
  return (
    <div className={`${CARD} p-5 md:p-6 flex flex-col gap-4`}>
      <div>
        <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 15, color: colors.textPrimary }}>Payment Methods</p>
        <p style={{ fontFamily: INTER, fontSize: 12, color: colors.textMuted, marginTop: 2 }}>Breakdown by payment type</p>
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        <div style={{ width: 130, height: 130, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={display} cx="50%" cy="50%" innerRadius={38} outerRadius={60} paddingAngle={3} dataKey="value">
                {display.map((p, i) => <Cell key={`cell-${i}`} fill={p.color} />)}
              </Pie>
              <Tooltip formatter={(v: number) => fmtK(v)} contentStyle={{ fontFamily: INTER, fontSize: 11, borderRadius: 10, border: "1px solid var(--page-border)", background: "var(--page-card-bg)", color: "var(--page-text)", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          {display.map((p) => {
            const pct = total > 0 ? Math.round((p.value / total) * 100) : 0;
            return (
              <div key={p.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ background: p.color }} />
                    <span style={{ fontFamily: INTER, fontWeight: 500, fontSize: 12, color: colors.textSecondary }}>{p.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ fontFamily: INTER, fontWeight: 600, fontSize: 12, color: colors.textPrimary }}>{fmtK(p.value)}</span>
                    <span style={{ fontFamily: INTER, fontSize: 10, color: colors.textMuted }}>{pct}%</span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--page-surface-2)" }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: p.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Best Sellers ─────────────────────────────────────────────────────────────

function BestSellers({ sellers }: { sellers: { rank: number; name: string; units: number; revenue: number; pct: number }[] }) {
  if (sellers.length === 0) {
    return (
      <div className={`${CARD} p-5 md:p-6 flex flex-col gap-4`}>
        <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 15, color: colors.textPrimary }}>Top Best Sellers</p>
        <p style={{ fontFamily: INTER, fontSize: 13, color: colors.textMuted, textAlign: "center", padding: "24px 0" }}>No sales data yet in this period</p>
      </div>
    );
  }
  return (
    <div className={`${CARD} p-5 md:p-6 flex flex-col gap-4`}>
      <div>
        <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 15, color: colors.textPrimary }}>Top Best Sellers</p>
        <p style={{ fontFamily: INTER, fontSize: 12, color: colors.textMuted, marginTop: 2 }}>By units sold this period</p>
      </div>
      <div className="flex flex-col gap-3">
        {sellers.map((item) => {
          const rankBg =
            item.rank === 1 ? "rgba(217, 119, 6, 0.15)" :
            item.rank === 2 ? "rgba(107, 114, 128, 0.15)" :
            item.rank === 3 ? "rgba(234, 88, 12, 0.15)" :
            "rgba(156, 163, 175, 0.15)";
          return (
            <div key={item.rank} className="flex items-center gap-3">
              <div className="size-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ fontFamily: INTER, fontWeight: 700, fontSize: 11, background: rankBg, color: item.rank === 1 ? "#d97706" : item.rank === 2 ? "#8e8e93" : item.rank === 3 ? "#ea580c" : "#9ca3af" }}>
                {item.rank}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p style={{ fontFamily: INTER, fontWeight: 500, fontSize: 12, color: colors.textPrimary }} className="truncate">{item.name}</p>
                  <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 12, color: colors.textPrimary, flexShrink: 0, marginLeft: 8 }}>{fmtK(item.revenue)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--page-surface-2)" }}>
                    <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: `linear-gradient(90deg, ${colors.primary}, #f87171)` }} />
                  </div>
                  <span style={{ fontFamily: INTER, fontSize: 10, color: colors.textMuted, flexShrink: 0 }}>{item.units} units</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Profit and Loss ──────────────────────────────────────────────────────────

function ProfitAndLoss({ revenue, totalExpenses }: { revenue: number; totalExpenses: number }) {
  const estimated = Math.round(revenue * 0.65);
  const usedExpenses = totalExpenses > 0 ? totalExpenses : estimated;
  const netProfit  = revenue - usedExpenses;
  const marginPct  = revenue > 0 ? Math.round((netProfit / revenue) * 100) : 0;
  const isProfit   = netProfit >= 0;
  const fmt = (n: number) => n >= 1000000 ? `${NGN}${(n / 1000000).toFixed(2)}M` : n >= 1000 ? `${NGN}${(n / 1000).toFixed(0)}K` : `${NGN}${n.toLocaleString()}`;

  const expenseRows = [
    { label: "Cost of Goods (est. 40%)", value: Math.round(revenue * 0.40) },
    { label: "Staff & Payroll (est. 15%)", value: Math.round(revenue * 0.15) },
    { label: "Utilities (est. 5%)",         value: Math.round(revenue * 0.05) },
    { label: "Other (est. 5%)",             value: Math.round(revenue * 0.05) },
  ];

  return (
    <div className={`${CARD} p-5 md:p-6 flex flex-col gap-4`}>
      <div className="flex items-center justify-between">
        <div>
          <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 15, color: colors.textPrimary }}>Profit &amp; Loss</p>
          <p style={{ fontFamily: INTER, fontSize: 12, color: colors.textMuted, marginTop: 2 }}>Period summary</p>
        </div>
        <div className="px-2.5 py-1 rounded-full" style={{ background: isProfit ? colors.successBg : colors.dangerBg, color: isProfit ? colors.successText : colors.dangerText, fontFamily: INTER, fontWeight: 600, fontSize: 11 }}>
          {isProfit ? "+" : ""}{marginPct}% margin
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 11, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Income</p>
        <div className="flex items-center justify-between py-1.5 border-b" style={{ borderColor: "var(--page-border)" }}>
          <div className="flex items-center gap-2">
            <div className="size-1.5 rounded-full shrink-0" style={{ background: colors.successText }} />
            <span style={{ fontFamily: INTER, fontSize: 12, color: colors.textSecondary }}>Sales Revenue</span>
          </div>
          <span style={{ fontFamily: INTER, fontWeight: 500, fontSize: 12, color: colors.textPrimary }}>{fmt(revenue)}</span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <span style={{ fontFamily: INTER, fontWeight: 600, fontSize: 12, color: colors.textPrimary }}>Total Revenue</span>
          <span style={{ fontFamily: INTER, fontWeight: 700, fontSize: 13, color: colors.successText }}>{fmt(revenue)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 11, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Expenses (Estimated)</p>
        {expenseRows.map((row) => (
          <div key={row.label} className="flex items-center justify-between py-1.5 border-b" style={{ borderColor: "var(--page-border)" }}>
            <div className="flex items-center gap-2">
              <div className="size-1.5 rounded-full shrink-0" style={{ background: colors.dangerText }} />
              <span style={{ fontFamily: INTER, fontSize: 12, color: colors.textSecondary }}>{row.label}</span>
            </div>
            <span style={{ fontFamily: INTER, fontWeight: 500, fontSize: 12, color: colors.textPrimary }}>{fmt(row.value)}</span>
          </div>
        ))}
        <div className="flex items-center justify-between pt-1">
          <span style={{ fontFamily: INTER, fontWeight: 600, fontSize: 12, color: colors.textPrimary }}>Total Expenses</span>
          <span style={{ fontFamily: INTER, fontWeight: 700, fontSize: 13, color: colors.dangerText }}>{fmt(usedExpenses)}</span>
        </div>
      </div>

      <div className="rounded-xl p-3 flex items-center justify-between gap-3" style={{ background: isProfit ? colors.successBg : colors.dangerBg }}>
        <div>
          <p style={{ fontFamily: INTER, fontSize: 11, fontWeight: 500, color: isProfit ? colors.successText : colors.dangerText }}>Net Profit</p>
          <p style={{ fontFamily: INTER, fontSize: 18, fontWeight: 700, color: isProfit ? colors.successText : colors.dangerText, marginTop: 1 }}>
            {isProfit ? "+" : ""}{fmt(netProfit)}
          </p>
        </div>
        <div className="size-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: isProfit ? "var(--c-success-bg)" : "var(--c-danger-bg)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            {isProfit
              ? <path d="M22 7l-8.5 8.5-5-5L2 17M16 7h6v6" stroke={colors.successText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              : <path d="M22 17l-8.5-8.5-5 5L2 7M16 17h6v-6" stroke={colors.dangerText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            }
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Recent Orders table ──────────────────────────────────────────────────────

type OrderRow = Record<string, unknown> & { inv: string; date: string; customer: string; amount: string; status: string; raw?: any };
const ORDER_COLUMNS: ColumnDef<OrderRow>[] = [
  { key: "inv",      label: "Invoice",  sortable: true, render: (v) => <span style={{ color: colors.infoText, fontWeight: 500, fontSize: 12 }}>{String(v)}</span> },
  { key: "date",     label: "Date",     sortable: true  },
  { key: "customer", label: "Customer", sortable: true  },
  { key: "cashier",  label: "Cashier",  sortable: true,
    render: (v) => <span style={{ color: "var(--page-text-secondary)", fontSize: 13 }}>{String(v)}</span> },
  { key: "payment",  label: "Payment",  sortable: true,
    render: (v) => {
      const isCash = String(v).toLowerCase() === "cash";
      return <Badge variant={isCash ? "success" : "info"}>{String(v)}</Badge>;
    }
  },
  { key: "status",   label: "Status",   align: "center",
    render: (v) => <Badge variant={v === "Completed" ? "success" : v === "Pending" ? "warning" : "danger"}>{String(v)}</Badge> },
  { key: "change",   label: "Change",   align: "right",
    render: (v) => <span style={{ color: "var(--page-text-muted)", fontSize: 13 }}>{v ? String(v) : "-"}</span> },
  { key: "amount",   label: "Amount",   align: "right", sortable: true, mobileInline: true,
    render: (v) => <span style={{ fontWeight: 600, color: colors.textPrimary }}>{String(v)}</span> },
];

// ─── Kitchen Performance Helper Components ─────────────────────────────────────

type KitchenRow = Record<string, unknown> & { id: string; station: string; total: number; active: number; avgPrep: string; onTimeRate: string; revenue: string };

const KITCHEN_COLUMNS: ColumnDef<KitchenRow>[] = [
  { key: "station",    label: "Station Name",  sortable: true, render: (v) => <span style={{ fontWeight: 600, color: "var(--page-text)" }}>{String(v)}</span> },
  { key: "total",      label: "Total Tickets", sortable: true, align: "center" },
  { key: "active",     label: "Active Queue",  sortable: true, align: "center", render: (v) => <Badge variant={Number(v) > 0 ? "warning" : "neutral"}>{String(v)} active</Badge> },
  { key: "avgPrep",    label: "Avg Prep Time", sortable: true, align: "right", render: (v) => <span style={{ fontWeight: 500, color: "var(--page-text)" }}>{String(v)}</span> },
  { key: "onTimeRate", label: "On-Time Rate",  sortable: true, align: "right", render: (v) => <Badge variant={Number(String(v).replace("%", "")) >= 80 ? "success" : "danger"}>{String(v)}</Badge> },
  { key: "revenue",    label: "Revenue",       sortable: true, align: "right", render: (v) => <span style={{ fontWeight: 600, color: "var(--page-text)" }}>{String(v)}</span> },
];

function KitchenStatCards({ metrics }: { metrics: any }) {
  const cards = [
    { label: "Avg Prep Time", value: `${metrics.avgPrepTime} mins`, accent: "#ff9500", bg: "rgba(255,149,0,0.12)", icon: <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><circle cx="12" cy="12" r="10" stroke="#ff9500" strokeWidth="2" /><polyline points="12 6 12 12 16 14" stroke="#ff9500" strokeWidth="2" strokeLinecap="round" /></svg> },
    { label: "Tickets Prepared", value: metrics.totalCompleted.toLocaleString(), accent: "#24b04b", bg: "rgba(36,176,75,0.12)", icon: <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M20 6L9 17l-5-5" stroke="#24b04b" strokeWidth="2.5" strokeLinecap="round" /></svg> },
    { label: "Active Queue", value: metrics.totalActive.toLocaleString(), accent: "#e91835", bg: "rgba(233,24,53,0.12)", icon: <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><rect x="3" y="4" width="18" height="16" rx="2" stroke="#e91835" strokeWidth="2" /><path d="M7 8h10M7 12h10M7 16h6" stroke="#e91835" strokeWidth="2" strokeLinecap="round" /></svg> },
    { label: "On-Time Rate", value: `${metrics.onTimeRate}%`, accent: "#af52de", bg: "rgba(175,82,222,0.12)", icon: <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3" stroke="#af52de" strokeWidth="2" strokeLinecap="round" /></svg> },
    { label: "Busiest Station", value: metrics.peakStation, accent: "#0070e0", bg: "rgba(0,112,224,0.12)", icon: <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16M8 10h8M8 14h4" stroke="#0070e0" strokeWidth="2" strokeLinecap="round" /></svg> },
  ];
  return (
    <>
      <div className="md:hidden flex gap-3 overflow-x-auto -mx-4 px-4" style={{ scrollbarWidth: "none" }}>
        {cards.map((c) => <StatCard key={c.label} label={c.label} value={c.value} icon={c.icon} iconBg={c.bg} accent={c.accent} compact className="shrink-0" style={{ minWidth: 155 }} />)}
      </div>
      <div className="hidden md:grid grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((c) => <StatCard key={c.label} label={c.label} value={c.value} icon={c.icon} iconBg={c.bg} accent={c.accent} style={{ border: "none" }} />)}
      </div>
    </>
  );
}

function StationVolumeChart({ data }: { data: any[] }) {
  return (
    <div className={`${CARD} p-5 md:p-6 flex flex-col gap-4`}>
      <div>
        <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 15, color: "var(--page-text)" }}>Station Order Volume</p>
        <p style={{ fontFamily: INTER, fontSize: 12, color: "var(--page-text-muted)", marginTop: 2 }}>Processed vs Active tickets per station</p>
      </div>
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--page-border)" vertical={false} />
            <XAxis dataKey="station" tick={{ fontFamily: INTER, fontSize: 10, fill: "var(--page-text-muted)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontFamily: INTER, fontSize: 10, fill: "var(--page-text-muted)" }} axisLine={false} tickLine={false} width={28} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="total" name="Total Tickets" fill="#0070e0" radius={[4, 4, 0, 0]} />
            <Bar dataKey="active" name="Active Tickets" fill="#e91835" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function StationPrepTimeChart({ data }: { data: any[] }) {
  return (
    <div className={`${CARD} p-5 md:p-6 flex flex-col gap-4`}>
      <div>
        <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 15, color: "var(--page-text)" }}>Avg Prep Speed</p>
        <p style={{ fontFamily: INTER, fontSize: 12, color: "var(--page-text-muted)", marginTop: 2 }}>Average preparation time in minutes by station</p>
      </div>
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--page-border)" vertical={false} />
            <XAxis dataKey="station" tick={{ fontFamily: INTER, fontSize: 10, fill: "var(--page-text-muted)" }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => `${v}m`} tick={{ fontFamily: INTER, fontSize: 10, fill: "var(--page-text-muted)" }} axisLine={false} tickLine={false} width={36} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="avgPrep" name="Avg Prep Time" fill="#ff9500" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function PrepQualityChart({ qualityData }: { qualityData: any[] }) {
  const total = qualityData.reduce((s, p) => s + p.value, 0);
  return (
    <div className={`${CARD} p-5 md:p-6 flex flex-col gap-4`}>
      <div>
        <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 15, color: "var(--page-text)" }}>Turnaround Quality</p>
        <p style={{ fontFamily: INTER, fontSize: 12, color: "var(--page-text-muted)", marginTop: 2 }}>Preparation speed classification</p>
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        <div style={{ width: 130, height: 130, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={qualityData} cx="50%" cy="50%" innerRadius={38} outerRadius={60} paddingAngle={3} dataKey="value">
                {qualityData.map((p, i) => <Cell key={`cell-${i}`} fill={p.color} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${v} orders`} contentStyle={{ fontFamily: INTER, fontSize: 11, borderRadius: 10, border: "1px solid var(--page-border)", background: "var(--page-card-bg)", color: "var(--page-text)", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          {qualityData.map((p) => {
            const pct = total > 0 ? Math.round((p.value / total) * 100) : 0;
            return (
              <div key={p.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ background: p.color }} />
                    <span style={{ fontFamily: INTER, fontWeight: 500, fontSize: 12, color: "var(--page-text-secondary)" }}>{p.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ fontFamily: INTER, fontWeight: 600, fontSize: 12, color: "var(--page-text)" }}>{p.value}</span>
                    <span style={{ fontFamily: INTER, fontSize: 10, color: "var(--page-text-muted)" }}>{pct}%</span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--page-surface-2)" }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: p.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Receipt Modal ────────────────────────────────────────────────────────────

function ReceiptModal({
  tx,
  open,
  onClose,
  restaurantName,
}: {
  tx: any;
  open: boolean;
  onClose: () => void;
  restaurantName: string;
}) {
  if (!tx) return null;

  const now = new Date(tx.timestamp);
  const dateStr = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const timeStr = now.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" });
  const taxLabel = tx.taxLabel ?? "VAT";
  const taxRate  = tx.taxRate  != null ? tx.taxRate : 7.5;
  const totalItems = tx.items.reduce((s: number, i: any) => s + i.qty, 0);

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
              <p style={{ fontSize: 11, color: "var(--page-text-muted)", marginBottom: 2 }}>{label}</p>
              <p style={{ fontSize: 13, fontWeight: 500, color: "var(--page-text)" }}>{val}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-dashed border-gray-200 my-3" />

        <p style={{ fontSize: 11, fontWeight: 600, color: "var(--page-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
          Items Ordered ({totalItems})
        </p>
        <div className="flex flex-col gap-2 mb-4">
          {tx.items.map((item: any, i: number) => {
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
                      <p style={{ fontSize: 13, color: "var(--page-text-secondary)" }} className="truncate">{item.name}</p>
                      <p style={{ fontSize: 10, color: "var(--page-text-muted)" }}>
                        {NGN}{unitPrice.toLocaleString()} each
                      </p>
                    </div>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "var(--page-text)", flexShrink: 0 }}>
                    {NGN}{item.price.toLocaleString()}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <div className="border-t border-dashed border-gray-200 my-3" />

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between mt-1 pt-2 border-t border-gray-100">
            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--page-text)" }}>Total</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: colors.primary }}>
              {NGN}{tx.total.toLocaleString()}
            </span>
          </div>
          {tx.changeAmount && tx.changeAmount > 0 ? (
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--page-text-muted)" }}>Change</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#16a34a" }}>
                {NGN}{tx.changeAmount.toLocaleString()}
              </span>
            </div>
          ) : null}
        </div>

        <div className="mt-5 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReportsPage() {
  const { staff, kdsOrders, tables, stations, menuItems, kotEnabled } = useAppStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogout,  setShowLogout]  = useState(false);
  const [range,       setRange]       = useState<Range>("Month");
  const [reportMode,  setReportMode]  = useState<"sales" | "kitchen">("sales");
  const [selectedTx,  setSelectedTx]  = useState<any | null>(null);

  // Force reportMode to sales if KOT (Kitchen Display) is disabled
  const activeReportMode = kotEnabled ? reportMode : "sales";

  // ── Backend data ──────────────────────────────────────────────────────────
  const [apiOrders,   setApiOrders]   = useState<ApiOrder[]>([]);
  const [apiExpenses, setApiExpenses] = useState<ApiExpense[]>([]);
  const [loading,     setLoading]     = useState(true);

  const RANGES: Range[] = ["Today", "Week", "Month", "Year"];

  // Date range helpers
  const rangeStartISO = useMemo(() => {
    const d = new Date();
    if (range === "Today") { d.setHours(0, 0, 0, 0); }
    else if (range === "Week") { d.setDate(d.getDate() - 7); }
    else if (range === "Month") { d.setMonth(d.getMonth() - 1); }
    else { d.setFullYear(d.getFullYear() - 1); }
    return d.toISOString();
  }, [range]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [txRes, expRes] = await Promise.all([
        transactionsAPI.list({ limit: 200, startDate: rangeStartISO }),
        expensesAPI.list({ limit: 200, startDate: rangeStartISO }),
      ]);
      setApiOrders(txRes.data.transactions ?? []);
      setApiExpenses(expRes.data.expenses ?? []);
    } catch (_) {
      // fall back to empty — charts show zeros
    } finally {
      setLoading(false);
    }
  }, [rangeStartISO]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ── Compute metrics from API orders ──────────────────────────────────────
  const completedOrders = useMemo(
    () => apiOrders.filter((o) => o.paymentStatus === "Completed"),
    [apiOrders]
  );

  const liveRevenue  = completedOrders.reduce((s, o) => s + o.total, 0);
  const liveOrders   = completedOrders.length;
  const liveAvg      = liveOrders > 0 ? Math.round(liveRevenue / liveOrders) : 0;
  const liveTax      = completedOrders.reduce((s, o) => s + (o.tax || 0), 0);
  const liveExpenses = apiExpenses.reduce((s, e) => s + e.amount, 0);
  const liveProfit   = Math.max(0, liveRevenue - (liveExpenses > 0 ? liveExpenses : Math.round(liveRevenue * 0.35)));

  // ── Map API orders → Transaction shape for existing chart helpers ─────────
  const completedTxs: Transaction[] = useMemo(() =>
    completedOrders.map((o) => {
      let parsedNotes: any = {};
      try { parsedNotes = JSON.parse(o.notes || "{}"); } catch(e) {}
      
      const pMethod = parsedNotes.paymentMethod || ((o as any).payments?.[0]?.method === "Mobile" ? "Transfer" : ((o as any).payments?.[0]?.method ?? "Cash"));
      
      return {
      id:            o.id,
      timestamp:     new Date(o.createdAt).getTime(),
      items:         o.items.map((i) => ({
        id:    i.id,
        name:  (i as any).menuItem?.name ?? i.menuItemId,
        price: i.unitPrice,
        qty:   i.quantity,
        station: menuItems.find(m => m.id === i.menuItemId)?.station || "General"
      })),
      customer:      { id: "api", name: "Walk-in" },
      subtotal:      o.subtotal,
      vat:           o.tax,
      total:         o.total,
      paymentMethod: pMethod,
      changeAmount:  parsedNotes.change || 0,
      cashier:       parsedNotes.cashier || "Staff",
      status:        "completed" as const,
    }}),
    [completedOrders]
  );

  const trendData = useMemo(() => computeTrendData(completedTxs, range), [completedTxs, range]);
  const payData   = useMemo(() => computePaymentData(completedTxs), [completedTxs]);
  const catData   = useMemo(() => computeCategoryData(completedTxs), [completedTxs]);
  const sellers   = useMemo(() => computeBestSellers(completedTxs), [completedTxs]);

  const recentOrders: OrderRow[] = useMemo(() => apiOrders.slice(0, 20).map((o) => {
    const d = new Date(o.createdAt);
    let parsedNotes: any = {};
    try { parsedNotes = JSON.parse(o.notes || "{}"); } catch(e) {}
    
    const pMethod = parsedNotes.paymentMethod || ((o as any).payments?.[0]?.method === "Mobile" ? "Transfer" : ((o as any).payments?.[0]?.method ?? "Cash"));
    
    return {
      inv:      o.id.slice(-8).toUpperCase(),
      date:     d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) + " " +
                d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
      customer: "Walk-in",
      cashier:  parsedNotes.cashier || "Staff",
      payment:  pMethod,
      change:   parsedNotes.change ? `${NGN}${parsedNotes.change.toLocaleString()}` : "",
      amount:   `${NGN}${o.total.toLocaleString()}`,
      status:   o.paymentStatus === "Completed" ? "Completed" : o.status === "Cancelled" ? "Voided" : "Pending",
      raw: {
        id:            o.id,
        timestamp:     d.getTime(),
        items:         o.items.map((i) => ({ id: i.id, name: i.menuItemId, price: i.unitPrice, qty: i.quantity })),
        customer:      { name: "Walk-in Customer" },
        subtotal:      o.subtotal,
        total:         o.total,
        paymentMethod: pMethod,
        changeAmount:  parsedNotes.change || 0,
        cashier:       parsedNotes.cashier || "Staff",
        status:        o.paymentStatus === "Completed" ? "completed" : "pending",
      }
    };
  }), [apiOrders]);

  // ── Kitchen Turnaround Calculations ──────────────────────────────────────
  const kitchenMetrics = useMemo(() => {
    const rangeStart = new Date(rangeStartISO).getTime();
    const periodOrders = kdsOrders.filter(o => new Date(o.placedAt).getTime() >= rangeStart);

    const completed = periodOrders.filter(o => o.readyAt && (o.status === "Ready" || o.status === "Served"));
    const active = periodOrders.filter(o => o.status === "New" || o.status === "In Progress");

    const getPrepMins = (o: KDSOrder) => {
      if (!o.readyAt) return 0;
      const diff = new Date(o.readyAt).getTime() - new Date(o.placedAt).getTime();
      return Math.max(1, Math.round(diff / 60000));
    };

    const totalPrepTime = completed.reduce((sum, o) => sum + getPrepMins(o), 0);
    const avgPrepTime = completed.length > 0 ? Math.round(totalPrepTime / completed.length) : 12;

    const onTimeCount = completed.filter(o => getPrepMins(o) <= 15).length;
    const onTimeRate = completed.length > 0 ? Math.round((onTimeCount / completed.length) * 100) : 85;

    const stationData = stations.map(station => {
      const stationOrders = periodOrders.filter(o => o.station === station);
      const stationCompleted = stationOrders.filter(o => o.readyAt && (o.status === "Ready" || o.status === "Served"));
      const stationActive = stationOrders.filter(o => o.status === "New" || o.status === "In Progress");
      
      const stationTotalPrepTime = stationCompleted.reduce((sum, o) => sum + getPrepMins(o), 0);
      const stationAvgPrep = stationCompleted.length > 0 ? Math.round(stationTotalPrepTime / stationCompleted.length) : 10;
      
      const stationOnTime = stationCompleted.filter(o => getPrepMins(o) <= 15).length;
      const stationOnTimeRate = stationCompleted.length > 0 ? Math.round((stationOnTime / stationCompleted.length) * 100) : 90;

      const stationRevenue = completedTxs.reduce((sum, tx) => {
        if (tx.timestamp < rangeStart) return sum;
        return sum + tx.items.reduce((s, item: any) => item.station === station ? s + (item.price * item.qty) : s, 0);
      }, 0);

      return {
        station,
        total: stationOrders.length,
        active: stationActive.length,
        avgPrep: stationAvgPrep,
        onTimeRate: stationOnTimeRate,
        revenue: stationRevenue
      };
    });

    const peakStationObj = [...stationData].sort((a, b) => b.total - a.total)[0];
    const peakStation = peakStationObj ? peakStationObj.station : "Hot Kitchen";

    const qualityCategories = {
      "On-Time (< 12m)": completed.filter(o => getPrepMins(o) < 12).length,
      "Standard (12-18m)": completed.filter(o => getPrepMins(o) >= 12 && getPrepMins(o) <= 18).length,
      "Delayed (> 18m)": completed.filter(o => getPrepMins(o) > 18).length,
    };

    const hasData = completed.length > 0;
    const qualityData = Object.entries(qualityCategories).map(([name, value], idx) => {
      const colors = ["#24b04b", "#ff9500", "#e91835"];
      return {
        name,
        value: hasData ? value : (idx === 0 ? 70 : (idx === 1 ? 20 : 10)),
        color: colors[idx]
      };
    });

    return {
      avgPrepTime,
      totalCompleted: completed.length,
      totalActive: active.length,
      peakStation,
      onTimeRate,
      stationData,
      qualityData
    };
  }, [kdsOrders, rangeStartISO, stations, completedTxs]);

  const kitchenRows: KitchenRow[] = useMemo(() => {
    return kitchenMetrics.stationData.map((s: any, idx: number) => ({
      id: `kitchen-row-${idx}`,
      station: s.station,
      total: s.total,
      active: s.active,
      avgPrep: `${s.avgPrep} mins`,
      onTimeRate: `${s.onTimeRate}%`,
      revenue: `${NGN}${s.revenue.toLocaleString()}`
    }));
  }, [kitchenMetrics]);

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: "var(--page-bg)" }}>

      <header className="shrink-0 z-30 page-header h-[69px] flex items-center justify-between px-4 md:px-6 border-b shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]" style={{ background: "var(--page-header-bg)", borderColor: "var(--page-header-border)" }}>
        <div className="flex items-center gap-3">
          <AppLogo />
          <NavMenu />
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={() => setShowLogout(true)} activeId="reports" />

        <main className="flex-1 overflow-y-auto pb-[72px] md:pb-0" style={{ background: "var(--page-surface)" }}>

          <div className="md:hidden px-4 pt-4 pb-2">
            <div>
              <h1 style={{ fontFamily: INTER, fontWeight: 600, fontSize: 18, color: "var(--page-text)" }}>Analytics &amp; Reports</h1>
              <p style={{ fontFamily: INTER, fontWeight: 400, fontSize: 14, color: "var(--page-text-muted)", marginTop: 4 }}>Sales trends, performance metrics, and business insights</p>
            </div>
          </div>

          <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-5 md:gap-6">

            <div className="hidden md:block">
              <h1 style={{ fontFamily: INTER, fontWeight: 600, fontSize: 18, color: "var(--page-text)" }}>Analytics &amp; Reports</h1>
              <p style={{ fontFamily: INTER, fontWeight: 400, fontSize: 14, color: "var(--page-text-muted)", marginTop: 4 }}>Sales trends, performance metrics, and business insights</p>
            </div>

            {/* Filter by period and report mode toggles inside the page */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center rounded-xl p-1 gap-0.5 self-start" style={{ background: "var(--page-surface-2)" }}>
                {RANGES.map((r) => (
                  <button key={r} onClick={() => setRange(r)} className="px-3 py-1.5 md:px-4 md:py-1.5 rounded-lg text-center transition-all border-none cursor-pointer" style={{ fontFamily: INTER, fontSize: 13, fontWeight: range === r ? 600 : 400, color: range === r ? "white" : "var(--page-text-muted)", background: range === r ? colors.primary : "transparent" }}>
                    {r}
                  </button>
                ))}
              </div>

              {kotEnabled && (
                <div className="flex items-center rounded-xl p-1 gap-0.5 self-start" style={{ background: "var(--page-surface-2)" }}>
                  {(["sales", "kitchen"] as const).map((mode) => (
                    <button key={mode} onClick={() => setReportMode(mode)} className="px-4 py-1.5 rounded-lg text-center transition-all border-none cursor-pointer" style={{ fontFamily: INTER, fontSize: 13, fontWeight: activeReportMode === mode ? 600 : 400, color: activeReportMode === mode ? "white" : "var(--page-text-muted)", background: activeReportMode === mode ? colors.primary : "transparent" }}>
                      {mode === "sales" ? "Sales Analytics" : "Kitchen Turnaround"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className="h-24 rounded-2xl animate-pulse" style={{ background: "var(--page-surface-2)" }} />
                ))}
              </div>
            ) : activeReportMode === "sales" ? (
              <StatCards revenue={liveRevenue} orders={liveOrders} avg={liveAvg} profit={liveProfit} tax={liveTax} />
            ) : (
              <KitchenStatCards metrics={kitchenMetrics} />
            )}

            {activeReportMode === "sales" ? (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
                  <SalesTrendChart range={range} data={trendData} />
                  <RevenueProfitChart range={range} data={trendData} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
                  <div className="lg:col-span-2"><CategoryChart catData={catData} /></div>
                  <PaymentDistribution payData={payData} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
                  <BestSellers sellers={sellers} />
                  <ProfitAndLoss revenue={liveRevenue} totalExpenses={liveExpenses} />
                </div>

                <DataTable<OrderRow>
                  title="Recent Orders"
                  subtitle={`${recentOrders.length} transaction${recentOrders.length !== 1 ? "s" : ""} in this period`}
                  columns={ORDER_COLUMNS}
                  data={recentOrders}
                  rowKey="inv"
                  searchable
                  searchPlaceholder="Search orders..."
                  exportable
                  pageSize={5}
                  emptyTitle="No orders in this period"
                  emptyDescription="Transactions placed on the POS will appear here."
                  onRowClick={(row) => setSelectedTx(row.raw)}
                />
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
                  <StationVolumeChart data={kitchenMetrics.stationData} />
                  <StationPrepTimeChart data={kitchenMetrics.stationData} />
                  <PrepQualityChart qualityData={kitchenMetrics.qualityData} />
                </div>

                <DataTable<KitchenRow>
                  title="Station Performance Breakdown"
                  subtitle="Turnaround and preparation speed details per kitchen station"
                  columns={KITCHEN_COLUMNS}
                  data={kitchenRows}
                  rowKey="station"
                  searchable
                  searchPlaceholder="Search stations..."
                  exportable
                  pageSize={5}
                  emptyTitle="No kitchen data available"
                  emptyDescription="Marked tickets in the KDS will populate this report."
                />
              </>
            )}

          </div>
        </main>
      </div>

      <MobileBottomNav activeId="reports" onLogout={() => setShowLogout(true)} />
      <LogoutConfirmationModal isOpen={showLogout} onConfirm={() => setShowLogout(false)} onCancel={() => setShowLogout(false)} />
      <ReceiptModal open={!!selectedTx} tx={selectedTx} onClose={() => setSelectedTx(null)} restaurantName="Tablix POS" />
    </div>
  );
}