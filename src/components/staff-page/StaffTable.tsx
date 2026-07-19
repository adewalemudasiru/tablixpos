import { Input } from "../ds/Input"
import { Button } from "../ds/Button"
import { font, radius, shadows } from "../ds/tokens"
import { StaffTableRow } from "./StaffTableRow"
import { StaffEmptyState } from "./StaffEmptyState"
import { StaffPagination } from "./StaffPagination"
import { IconSearch, IconPlus } from "@tabler/icons-react"
import type { StaffTableProps } from "@/types/staff-page/staff"
import { TH } from "@/constants/staff.ts"

export function StaffTable({
  staff,
  loading,
  search,
  roleFilter,
  page,
  pageSize,
  kotEnabled,
  roles,
  onEdit,
  onResetPin,
  onDelete,
  onSearchChange,
  onRoleFilterChange,
  onPageChange,
}: StaffTableProps) {
  const totalItems = staff.length
  const paginatedStaff = staff.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div
      className="page-card flex flex-col rounded-2xl border"
      style={{ boxShadow: shadows.card }}
    >
      <div className="page-border flex items-center gap-2 border-b px-5 py-3">
        <div className="min-w-0 flex-1">
          <Input
            placeholder="Search by name, email or role..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            leftIcon={<IconSearch />}
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
            value={roleFilter}
            onChange={(e) => onRoleFilterChange(e.target.value)}
            style={{
              padding: "8px 28px 8px 12px",
              fontFamily: font.family,
              fontSize: font.size.sm,
              color: roleFilter ? "var(--page-text)" : "var(--page-text-muted)",
              background: "transparent",
              border: "none",
              outline: "none",
              appearance: "none",
              cursor: "pointer",
            }}
          >
            <option
              value=""
              style={{
                color: "var(--page-text)",
                background: "var(--page-card-bg)",
              }}
            >
              All Roles
            </option>
            {roles.map((r) => (
              <option
                key={r.id}
                value={r.id}
                style={{
                  color: "var(--page-text)",
                  background: "var(--page-card-bg)",
                }}
              >
                {r.name}
              </option>
            ))}
          </select>
        </div>
        <Button
          variant="primary"
          size="sm"
          leftIcon={<IconPlus />}
          onClick={() => {
            onEdit(null as any)
          }}
        >
          Add Staff
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr className="page-thead border-b">
              <th style={TH}>Staff Member</th>
              <th style={TH}>Role</th>
              {kotEnabled && <th style={TH}>Assigned Station</th>}
              <th style={TH}>Email</th>
              <th style={TH}>Date Created</th>
              <th style={{ ...TH, textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStaff.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <StaffEmptyState search={search} roleFilter={roleFilter} />
                </td>
              </tr>
            ) : (
              paginatedStaff.map((s, idx) => (
                <StaffTableRow
                  key={s.id}
                  staff={s}
                  roles={roles}
                  kotEnabled={kotEnabled}
                  isLast={idx === paginatedStaff.length - 1}
                  onEdit={onEdit}
                  onResetPin={onResetPin}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      <StaffPagination
        currentPage={page}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  )
}
