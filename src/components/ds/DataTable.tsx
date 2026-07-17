import React, { useState, useMemo, useRef } from "react";
import { colors, font, radius, shadows } from "./tokens";
import { Button } from "./Button";
import { Badge, BadgeVariant } from "./Badge";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SortDir = "asc" | "desc" | null;

export interface ColumnDef<T> {
  key: keyof T & string;
  label: string;
  sortable?: boolean;
  searchable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  /** Hide this column in mobile card detail rows */
  mobileHide?: boolean;
  /** Mobile detail chip: show label left and value right in a single row */
  mobileInline?: boolean;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  options: FilterOption[];
}

export interface DataTableProps<T extends Record<string, unknown>> {
  /** Display */
  title?: string;
  subtitle?: string;

  /** Data */
  columns: ColumnDef<T>[];
  data: T[];
  rowKey: keyof T & string;

  /** Toolbar */
  searchable?: boolean;
  searchPlaceholder?: string;
  filters?: FilterConfig[];
  exportable?: boolean;
  importable?: boolean;
  addable?: boolean;
  addLabel?: string;

  /** Callbacks */
  onExport?: () => void;
  onImport?: () => void;
  onAdd?: () => void;
  onRowClick?: (row: T) => void;

  /** Selection */
  selectable?: boolean;
  onSelectionChange?: (rows: T[]) => void;

  /** Pagination */
  pageSize?: number;

  /** State */
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;

  /** Extra toolbar slot */
  toolbarExtra?: React.ReactNode;

  /** Mobile: render a custom summary for the card (optional) */
  mobilePrimary?: (row: T) => React.ReactNode;

  /** Mobile: limit detail grid to only these column keys (in order) */
  mobileDetailKeys?: string[];
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const SortIcon = ({ dir }: { dir: SortDir }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <path d="M8 9l4-4 4 4" stroke={dir === "asc" ? colors.primary : "#d1d5db"}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 15l-4 4-4-4" stroke={dir === "desc" ? colors.primary : "#d1d5db"}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M3 6h18M7 12h10M11 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ExportIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M12 16V4M8 12l4 4 4-4M4 20h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ImportIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M12 8v12M16 12l-4-4-4 4M4 4h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AddIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const ChevronIcon = ({ left }: { left?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d={left ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
    <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EmptyIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 10h16M4 14h10" stroke={colors.border} strokeWidth="1.5" strokeLinecap="round" />
    <rect x="2" y="3" width="20" height="18" rx="3" stroke={colors.border} strokeWidth="1.5" />
  </svg>
);

// ─── Checkbox ─────────────────────────────────────────────────────────────────

function Checkbox({
  checked,
  indeterminate,
  onChange,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = !!indeterminate;
  }, [indeterminate]);

  return (
    <div className="flex items-center justify-center">
      <div
        className="size-[18px] flex items-center justify-center cursor-pointer rounded transition-all"
        style={{
          border: checked || indeterminate ? "none" : `2px solid ${colors.border}`,
          background: checked || indeterminate ? colors.primary : "white",
          borderRadius: 5,
        }}
        onClick={onChange}
      >
        {(checked || indeterminate) && (
          indeterminate
            ? <div style={{ width: 8, height: 2, background: "white", borderRadius: 1 }} />
            : <CheckIcon />
        )}
      </div>
      <input ref={ref} type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonRow({ cols }: { cols: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3.5">
          <div className="h-4 rounded-lg bg-muted animate-pulse" style={{ width: i === 0 ? "60%" : "80%" }} />
        </td>
      ))}
    </tr>
  );
}

// ─── Mobile Skeleton Card ─────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="p-4 border-b page-border animate-pulse">
      <div className="flex items-start gap-3 mb-3">
        <div className="size-9 rounded-full bg-muted shrink-0" />
        <div className="flex-1">
          <div className="h-3.5 bg-muted rounded w-3/5 mb-2" />
          <div className="h-3 bg-muted rounded w-2/5" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
        <div className="h-3 bg-muted rounded w-4/5" />
        <div className="h-3 bg-muted rounded w-3/5" />
        <div className="h-3 bg-muted rounded w-2/3" />
        <div className="h-3 bg-muted rounded w-4/5" />
      </div>
    </div>
  );
}

// ─── Filter Dropdown ──────────────────────────────────────────────────────────

function FilterDropdown({
  config,
  value,
  onChange,
}: {
  config: FilterConfig;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const active = config.options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 h-9 px-2.5 rounded-lg border page-border transition-colors page-hover"
        style={{
          fontFamily: font.family,
          fontSize: font.size.sm,
          color: active ? colors.primary : colors.textMuted,
          borderColor: active ? colors.primary : colors.border,
          background: "transparent",
          cursor: "pointer",
        }}
      >
        <FilterIcon />
        <span style={{ fontWeight: active ? font.weight.medium : font.weight.normal }}>
          {active ? active.label : config.label}
        </span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-[9998]" onClick={() => setOpen(false)} />
          <div
            className="absolute top-full left-0 mt-1.5 z-[9999] page-card overflow-hidden"
            style={{
              borderRadius: radius.md,
              border: `1px solid ${colors.borderLight}`,
              boxShadow: shadows.md,
              minWidth: 160,
            }}
          >
            <button
              onClick={() => { onChange(""); setOpen(false); }}
              className="w-full flex items-center gap-2 px-4 py-2.5 page-hover transition-colors"
              style={{ fontFamily: font.family, fontSize: font.size.base, color: colors.textMuted }}
            >
              All {config.label}
            </button>
            <div style={{ borderTop: `1px solid ${colors.borderLight}` }} className="page-border" />
            {config.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className="w-full flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                style={{
                  fontFamily: font.family,
                  fontSize: font.size.base,
                  color: value === opt.value ? colors.primary : colors.textSecondary,
                  fontWeight: value === opt.value ? font.weight.medium : font.weight.normal,
                  background: value === opt.value ? colors.primaryLight : "transparent",
                }}
              >
                {opt.label}
                {value === opt.value && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── DataTable ───────────────────────────────────────────────────────────────

export function DataTable<T extends Record<string, unknown>>({
  title,
  subtitle,
  columns,
  data,
  rowKey,
  searchable = true,
  searchPlaceholder = "Search…",
  filters = [],
  exportable = false,
  importable = false,
  addable = false,
  addLabel = "Add New",
  onExport,
  onImport,
  onAdd,
  onRowClick,
  selectable = false,
  onSelectionChange,
  pageSize = 10,
  loading = false,
  emptyTitle = "No data found",
  emptyDescription = "Try adjusting your search or filters.",
  toolbarExtra,
  mobilePrimary,
  mobileDetailKeys,
}: DataTableProps<T>) {
  const [search, setSearch]           = useState("");
  const [sortKey, setSortKey]         = useState<string | null>(null);
  const [sortDir, setSortDir]         = useState<SortDir>(null);
  const [selected, setSelected]       = useState<Set<string>>(new Set());
  const [page, setPage]               = useState(1);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const importRef                     = useRef<HTMLInputElement>(null);

  /* ── Search + filter + sort ── */
  const searchKeys = columns.filter((c) => c.searchable !== false).map((c) => c.key);

  const processed = useMemo(() => {
    let rows = [...data];
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter((row) =>
        searchKeys.some((k) => String(row[k] ?? "").toLowerCase().includes(q))
      );
    }
    filters.forEach((f) => {
      const val = filterValues[f.key];
      if (val) rows = rows.filter((r) => String(r[f.key] ?? "") === val);
    });
    if (sortKey && sortDir) {
      rows.sort((a, b) => {
        const av = String(a[sortKey] ?? "");
        const bv = String(b[sortKey] ?? "");
        const num = !isNaN(Number(av)) && !isNaN(Number(bv));
        const cmp = num ? Number(av) - Number(bv) : av.localeCompare(bv);
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return rows;
  }, [data, search, filterValues, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(processed.length / pageSize));
  const safePage   = Math.min(page, totalPages);
  const paginated  = processed.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handleSort = (key: string) => {
    if (sortKey !== key) { setSortKey(key); setSortDir("asc"); }
    else if (sortDir === "asc") setSortDir("desc");
    else { setSortKey(null); setSortDir(null); }
  };

  const toggleRow = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      onSelectionChange?.(paginated.filter((r) => next.has(String(r[rowKey]))));
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === paginated.length && paginated.length > 0) {
      setSelected(new Set());
      onSelectionChange?.([]);
    } else {
      const ids = new Set(paginated.map((r) => String(r[rowKey])));
      setSelected(ids);
      onSelectionChange?.(paginated);
    }
  };

  const allSelected  = paginated.length > 0 && paginated.every((r) => selected.has(String(r[rowKey])));
  const someSelected = !allSelected && paginated.some((r) => selected.has(String(r[rowKey])));
  const totalCols    = columns.length + (selectable ? 1 : 0);
  const alignClass   = (align?: string) =>
    align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";

  const hasActions = importable || exportable || addable;
  const hasToolbar = searchable || filters.length > 0 || toolbarExtra || hasActions;

  return (
    <div
      className="page-card flex flex-col w-full"
      style={{
        borderRadius: radius.xl,
        border: `1px solid ${colors.borderLight}`,
        boxShadow: shadows.card,
        overflow: "hidden",
      }}
    >
      {/* ── Card header ── */}
      {(title || subtitle) && (
        <div
          className="flex items-center justify-between gap-4 px-4 md:px-5 py-4 shrink-0 page-border"
          style={{ borderBottom: `1px solid ${colors.borderLight}` }}
        >
          <div>
            {title && (
              <p style={{ fontFamily: font.family, fontWeight: font.weight.semibold, fontSize: font.size.lg, color: colors.textPrimary }}>
                {title}
              </p>
            )}
            {subtitle && (
              <p style={{ fontFamily: font.family, fontSize: font.size.sm, color: colors.textMuted, marginTop: 2 }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Toolbar ── */}
      {hasToolbar && (
        <div
          className="flex items-center gap-2 px-4 md:px-5 py-3 shrink-0 page-border"
          style={{ borderBottom: `1px solid ${colors.borderLight}` }}
        >
          {/* Search */}
          {searchable && (
            <div
              className="flex items-center gap-2 flex-1 min-w-0 h-10 px-3 rounded-lg page-border"
              style={{ border: `1px solid ${colors.border}`, background: "var(--page-input-bg)" }}
            >
              <span style={{ color: colors.textPlaceholder }}><SearchIcon /></span>
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder={searchPlaceholder}
                className="flex-1 outline-none bg-transparent min-w-0"
                style={{
                  fontFamily: font.family,
                  fontSize: font.size.base,
                  color: colors.textPrimary,
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-gray-400 hover:text-gray-600 shrink-0 page-text-muted"
                  style={{ lineHeight: 1 }}
                >
                  ×
                </button>
              )}
            </div>
          )}

          {/* Filters */}
          {filters.map((f) => (
            <FilterDropdown
              key={f.key}
              config={f}
              value={filterValues[f.key] ?? ""}
              onChange={(v) => { setFilterValues((p) => ({ ...p, [f.key]: v })); setPage(1); }}
            />
          ))}

          {toolbarExtra}

          {/* Action buttons */}
          {hasActions && (
            <div className="flex items-center gap-2 shrink-0">
              {importable && (
                <>
                  <input
                    ref={importRef}
                    type="file"
                    className="hidden"
                    accept=".csv,.xlsx,.xls"
                    onChange={(e) => { onImport?.(); e.target.value = ""; }}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<ImportIcon />}
                    onClick={() => importRef.current?.click()}
                  >
                    <span className="hidden sm:inline">Import</span>
                  </Button>
                </>
              )}
              {exportable && (
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<ExportIcon />}
                  onClick={onExport}
                >
                  <span className="hidden sm:inline">Export</span>
                </Button>
              )}
              {addable && (
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<AddIcon />}
                  onClick={onAdd}
                >
                  {addLabel}
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Bulk action bar ── */}
      {selectable && selected.size > 0 && (
        <div
          className="flex items-center justify-between gap-4 px-4 md:px-5 py-2.5 shrink-0"
          style={{ background: colors.primaryLight, borderBottom: `1px solid ${colors.primaryMid}` }}
        >
          <p style={{ fontFamily: font.family, fontSize: font.size.base, color: colors.primary, fontWeight: font.weight.medium }}>
            {selected.size} row{selected.size > 1 ? "s" : ""} selected
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setSelected(new Set())}>
              Deselect
            </Button>
            <Button variant="danger" size="sm">
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* ── Desktop Table ── */}
      <div className="hidden md:block overflow-x-auto flex-1">
        <table className="w-full" style={{ minWidth: 480, borderCollapse: "collapse" }}>
          <thead>
            <tr className="page-thead page-border" style={{ background: "var(--page-table-head-bg)", borderBottom: `1px solid ${colors.borderLight}` }}>
              {selectable && (
                <th className="px-4 py-3 w-10">
                  <Checkbox checked={allSelected} indeterminate={someSelected} onChange={toggleAll} />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 ${alignClass(col.align)}`}
                  style={{
                    width: col.width,
                    fontFamily: font.family,
                    fontSize: font.size.xs,
                    fontWeight: font.weight.semibold,
                    color: colors.textMuted,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    whiteSpace: "nowrap",
                    cursor: col.sortable ? "pointer" : "default",
                    userSelect: "none",
                  }}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && <SortIcon dir={sortKey === col.key ? sortDir : null} />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: pageSize }).map((_, i) => (
                <SkeletonRow key={i} cols={totalCols} />
              ))
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan={totalCols} className="py-16">
                  <div className="flex flex-col items-center justify-center gap-3 text-center px-6">
                    <div className="size-14 flex items-center justify-center" style={{ background: colors.primaryLight, borderRadius: 16 }}>
                      <EmptyIcon />
                    </div>
                    <div>
                      <p style={{ fontFamily: font.family, fontWeight: font.weight.semibold, fontSize: font.size.lg, color: colors.textPrimary }}>{emptyTitle}</p>
                      <p style={{ fontFamily: font.family, fontSize: font.size.base, color: colors.textMuted, marginTop: 4 }}>{emptyDescription}</p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((row, rowIdx) => {
                const id = String(row[rowKey]);
                const isSelected = selected.has(id);
                const isLast = rowIdx === paginated.length - 1;
                return (
                  <tr
                    key={id}
                    onClick={() => onRowClick?.(row)}
                    className="transition-colors page-border"
                    style={{
                      background: isSelected ? colors.primaryLight : "transparent",
                      borderBottom: isLast ? "none" : `1px solid ${colors.borderLight}`,
                      cursor: onRowClick ? "pointer" : "default",
                    }}
                    onMouseEnter={(e) => { if (!isSelected) (e.currentTarget as HTMLElement).style.background = "var(--page-hover-bg)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = isSelected ? colors.primaryLight : "transparent"; }}
                  >
                    {selectable && (
                      <td className="px-4 py-3.5 w-10 page-border" onClick={(e) => { e.stopPropagation(); toggleRow(id); }}>
                        <Checkbox checked={isSelected} onChange={() => toggleRow(id)} />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`px-4 py-3.5 ${alignClass(col.align)}`}
                        style={{
                          fontFamily: font.family,
                          fontSize: font.size.base,
                          color: colors.textSecondary,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? "—")}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Card List ── */}
      <div className="md:hidden flex flex-col flex-1">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : paginated.length === 0 ? (
          <div className="py-12 flex flex-col items-center gap-3 text-center px-6">
            <div className="size-14 flex items-center justify-center" style={{ background: colors.primaryLight, borderRadius: 16 }}>
              <EmptyIcon />
            </div>
            <div>
              <p style={{ fontFamily: font.family, fontWeight: font.weight.semibold, fontSize: font.size.lg, color: colors.textPrimary }}>{emptyTitle}</p>
              <p style={{ fontFamily: font.family, fontSize: font.size.sm, color: colors.textMuted, marginTop: 4 }}>{emptyDescription}</p>
            </div>
          </div>
        ) : (
          paginated.map((row, rowIdx) => {
            const id = String(row[rowKey]);
            const isSelected = selected.has(id);
            const isLast = rowIdx === paginated.length - 1;
            const [primaryCol, ...detailCols] = columns;
            const visibleDetails = detailCols.filter((c) => !c.mobileHide);

            return (
              <div
                key={id}
                onClick={() => onRowClick?.(row)}
                className="px-4 py-4 flex flex-col gap-3 active:bg-gray-100 page-border page-hover transition-colors"
                style={{
                  borderBottom: isLast ? "none" : `1px solid ${colors.borderLight}`,
                  background: isSelected ? colors.primaryLight : "var(--page-card-bg)",
                  cursor: onRowClick ? "pointer" : "default",
                }}
              >
                {/* Primary row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    {selectable && (
                      <div onClick={(e) => { e.stopPropagation(); toggleRow(id); }} className="shrink-0">
                        <Checkbox checked={isSelected} onChange={() => toggleRow(id)} />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      {mobilePrimary
                        ? mobilePrimary(row)
                        : (
                          <div style={{ fontFamily: font.family, fontWeight: font.weight.medium, fontSize: font.size.base, color: colors.textPrimary }}>
                            {primaryCol.render ? primaryCol.render(row[primaryCol.key], row) : String(row[primaryCol.key] ?? "—")}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                {/* Detail grid */}
                {visibleDetails.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {(mobileDetailKeys
                      ? mobileDetailKeys
                          .map((k) => visibleDetails.find((c) => c.key === k))
                          .filter((c): c is typeof visibleDetails[number] => !!c)
                      : visibleDetails
                    ).map((col, colIdx) => {
                        const isRightCol = colIdx % 2 === 1;
                        return (
                      <div
                        key={col.key}
                        className={col.align === "right" ? "col-span-2" : ""}
                        style={{
                          background: "#f8f9fb",
                          borderRadius: 10,
                          padding: "8px 11px",
                          display: "flex",
                          flexDirection: col.mobileInline ? "row" : "column",
                          alignItems: col.mobileInline ? "center" : isRightCol ? "flex-end" : "flex-start",
                          justifyContent: col.mobileInline ? "space-between" : undefined,
                          gap: 3,
                        }}
                      >
                        <span style={{
                          fontFamily: font.family,
                          fontSize: 10,
                          color: colors.textMuted,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          fontWeight: font.weight.semibold,
                          lineHeight: 1,
                        }}>
                          {col.label}
                        </span>
                        <div style={{
                          fontFamily: font.family,
                          fontSize: font.size.sm,
                          color: colors.textPrimary,
                          fontWeight: font.weight.medium,
                          lineHeight: 1.3,
                          textAlign: col.mobileInline ? "right" : isRightCol ? "right" : "left",
                        }}>
                          {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? "—")}
                        </div>
                      </div>
                        );
                      })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ── Pagination ── */}
      {!loading && processed.length > 0 && (
        <div
          className="flex flex-wrap items-center justify-between gap-3 px-4 md:px-5 py-3.5 shrink-0"
          style={{ borderTop: `1px solid ${colors.borderLight}` }}
        >
          <p style={{ fontFamily: font.family, fontSize: font.size.sm, color: colors.textMuted }}>
            <span style={{ fontWeight: font.weight.medium, color: colors.textPrimary }}>
              {(safePage - 1) * pageSize + 1}–{Math.min(safePage * pageSize, processed.length)}
            </span>{" "}
            of{" "}
            <span style={{ fontWeight: font.weight.medium, color: colors.textPrimary }}>
              {processed.length}
            </span>{" "}
            results
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="size-8 flex items-center justify-center rounded-lg transition-colors page-hover hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ color: colors.textMuted }}
            >
              <ChevronIcon left />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1)
              .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("…");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "…" ? (
                  <span key={`e${i}`} className="size-8 flex items-center justify-center"
                    style={{ fontFamily: font.family, fontSize: font.size.sm, color: colors.textMuted }}>
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p as number)}
                    className="size-8 flex items-center justify-center rounded-lg transition-colors page-hover"
                    style={{
                      fontFamily: font.family,
                      fontSize: font.size.sm,
                      fontWeight: safePage === p ? font.weight.semibold : font.weight.normal,
                      background: safePage === p ? colors.primary : "transparent",
                      color: safePage === p ? "white" : colors.textMuted,
                    }}
                    onMouseEnter={(e) => { if (safePage !== p) (e.currentTarget as HTMLElement).style.background = "var(--page-hover-bg)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = safePage === p ? colors.primary : "transparent"; }}
                  >
                    {p}
                  </button>
                )
              )}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="size-8 flex items-center justify-center rounded-lg transition-colors page-hover hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ color: colors.textMuted }}
            >
              <ChevronIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}