import { shadows } from "../ds/tokens"
import { StaffMobileCard } from "./StaffMobileCard"
import { StaffEmptyState } from "./StaffEmptyState"
import type { Staff } from "@/types/staff-page/staff"

interface StaffMobileListProps {
  staff: Staff[]
  roles: any[]
  onStaffClick: (staff: Staff) => void
}

export function StaffMobileList({
  staff,
  roles,
  onStaffClick,
}: StaffMobileListProps) {
  return (
    <div
      className="page-card mx-4 mb-4 overflow-hidden rounded-2xl border"
      style={{ boxShadow: shadows.card }}
    >
      {staff.length === 0 ? (
        <StaffEmptyState />
      ) : (
        staff.map((s, idx) => (
          <StaffMobileCard
            key={s.id}
            staff={s}
            roles={roles}
            isLast={idx === staff.length - 1}
            onClick={onStaffClick}
          />
        ))
      )}
    </div>
  )
}
