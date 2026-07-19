import { useAppStore } from "@/store/AppContext"
import { IconSearch } from "@tabler/icons-react"
import { useEffect, useMemo, useState } from "react"
import { colors, font, radius, shadows } from "../ds/tokens"
import { Badge } from "../ds/Badge"
import {
  CAT_COLORS,
  fmtEntryDate,
  fmtEntryTime,
  getRoleBadge,
} from "@/utils/staff-helpers"
import {
  loadActivityEntries,
  type ActivityCategory,
  type ActivityEntry,
} from "@/services/activityLog"

import type { ApiStaff } from "../../services/api"
type Staff = ApiStaff

export // Build combined live activity from the persisted activity log + inventory log.
// Sales, Auth, Shift and System events come from the persisted activity log service
// (written with real staff name/role by DashboardPage, EnterPinPage, etc.).
// Stock events are derived from the inventoryLog state which has performedBy info.

function ActivityLog({ staff: _staff }: { staff: Staff[] }) {
  const { inventoryLog } = useAppStore()
  const [filter, setFilter] = useState<ActivityCategory | "">("")
  const [search, setSearch] = useState("")
  const [storedEntries, setStoredEntries] = useState<ActivityEntry[]>([])

  const fetchEntries = useEffect(() => {
    let cancelled = false
    const load = async () => {
      const entries = await loadActivityEntries()
      if (!cancelled) setStoredEntries(entries)
    }
    load()
    const id = setInterval(load, 10000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])
  void fetchEntries

  const allEntries = useMemo(() => {
    const invEntries: ActivityEntry[] = inventoryLog.map((log) => {
      const ts = (() => {
        try {
          const d = new Date(
            `${log.date}T${log.time.replace(/[^0-9:]/g, "")}:00`
          )
          return isNaN(d.getTime()) ? Date.now() : d.getTime()
        } catch (_) {
          return Date.now()
        }
      })()
      return {
        id: `inv_${log.id}`,
        staffName: log.performedBy || "System",
        role: "Manager",
        action:
          log.type === "Stock In"
            ? "Restocked inventory"
            : log.type === "Stock Out"
              ? "Stock removed"
              : "Inventory adjusted",
        category: "Stock" as ActivityCategory,
        timestamp: ts,
        detail: `${log.itemName}: ${log.quantity} (${log.type})${log.note ? " - " + log.note : ""}`,
      }
    })
    const seen = new Set<string>()
    return [...invEntries, ...storedEntries]
      .filter((e) => {
        if (seen.has(e.id)) return false
        seen.add(e.id)
        return true
      })
      .sort((a, b) => b.timestamp - a.timestamp)
  }, [inventoryLog, storedEntries])

  const filtered = allEntries.filter((e) => {
    const matchCat = filter ? e.category === filter : true
    const matchSearch = search
      ? (e.staffName || "")
          .toLowerCase()
          .includes((search || "").toLowerCase()) ||
        (e.action || "").toLowerCase().includes((search || "").toLowerCase()) ||
        (e.detail || "").toLowerCase().includes((search || "").toLowerCase())
      : true
    return matchCat && matchSearch
  })

  const { roles } = useAppStore()
  const roleVariant = (role: string) => getRoleBadge(role, roles).variant

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="page-card flex h-10 min-w-[160px] flex-1 items-center gap-2 rounded-xl border px-3">
          <IconSearch />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search activity..."
            className="min-w-0 flex-1 bg-transparent outline-none"
            style={{
              fontFamily: font.family,
              fontSize: font.size.sm,
              color: "var(--page-text)",
            }}
          />
        </div>
        <div
          className="page-card border"
          style={{
            borderRadius: radius.md,
            boxShadow: shadows.sm,
            overflow: "hidden",
          }}
        >
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as ActivityCategory | "")}
            style={{
              padding: "8px 28px 8px 12px",
              fontFamily: font.family,
              fontSize: font.size.sm,
              color: filter ? colors.textPrimary : colors.textMuted,
              background: "transparent",
              border: "none",
              outline: "none",
              appearance: "none",
              cursor: "pointer",
            }}
          >
            <option value="">All Categories</option>
            <option value="Sale">Sale</option>
            <option value="Auth">Auth</option>
            <option value="Stock">Stock</option>
            <option value="System">System</option>
          </select>
        </div>
      </div>

      {/* Log entries */}
      <div
        className="page-card overflow-hidden rounded-2xl border"
        style={{ boxShadow: shadows.card }}
      >
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                stroke="currentColor"
                style={{ color: "var(--page-text-muted)" }}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <p
              style={{
                fontFamily: font.family,
                fontSize: font.size.base,
                color: "var(--page-text-muted)",
              }}
            >
              {allEntries.length === 0
                ? "No activity yet. Activity will appear as staff log in and make sales."
                : "No matching activity found"}
            </p>
          </div>
        ) : (
          filtered.map((entry, idx) => {
            const cat = CAT_COLORS[entry.category]
            const isLast = idx === filtered.length - 1
            return (
              <div
                key={entry.id}
                className="page-border flex items-start gap-4 px-5 py-4"
                style={{
                  borderBottom: isLast
                    ? "none"
                    : "1px solid var(--page-border)",
                }}
              >
                {/* Timeline dot */}
                <div
                  className="mt-2 size-2 shrink-0 rounded-full"
                  style={{ background: cat.text }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p
                        style={{
                          fontFamily: font.family,
                          fontWeight: font.weight.medium,
                          fontSize: font.size.base,
                          color: "var(--page-text)",
                        }}
                      >
                        {entry.action}
                      </p>
                      <p
                        style={{
                          fontFamily: font.family,
                          fontSize: font.size.sm,
                          color: "var(--page-text-muted)",
                          marginTop: 1,
                        }}
                        className="truncate"
                      >
                        {entry.detail}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span
                        style={{
                          fontFamily: font.family,
                          fontSize: 10,
                          color: "var(--page-text-muted)",
                        }}
                      >
                        {fmtEntryDate(entry.timestamp)}{" "}
                        {fmtEntryTime(entry.timestamp)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge variant={roleVariant(entry.role)}>
                      {entry.staffName}
                    </Badge>
                    <span
                      style={{
                        fontFamily: font.family,
                        fontSize: 10,
                        fontWeight: 600,
                        color: cat.text,
                        background: cat.bg,
                        borderRadius: 9999,
                        padding: "2px 8px",
                      }}
                    >
                      {cat.label}
                    </span>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
