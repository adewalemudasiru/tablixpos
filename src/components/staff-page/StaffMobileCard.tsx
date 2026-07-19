import { Badge } from "../ds/Badge"
import { Avatar } from "../ds/Avatar"
import { colors, font } from "../ds/tokens"
import { IconChevronRight } from "@tabler/icons-react"
import { getRoleBadge } from "../../utils/staff-helpers"
import type { Staff } from "@/types/staff-page/staff"

interface StaffMobileCardProps {
  staff: Staff
  roles: any[]
  isLast: boolean
  onClick: (staff: Staff) => void
}

export function StaffMobileCard({
  staff,
  roles,
  isLast,
  onClick,
}: StaffMobileCardProps) {
  const roleMeta = getRoleBadge(staff.role, roles)

  return (
    <button
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors active:bg-gray-50"
      style={{
        borderBottom: isLast ? "none" : `1px solid ${colors.borderLight}`,
      }}
      onClick={() => onClick(staff)}
    >
      <Avatar name={staff.name} size="sm" />
      <div className="min-w-0 flex-1">
        <p
          style={{
            fontFamily: font.family,
            fontWeight: font.weight.medium,
            fontSize: font.size.base,
            color: colors.textPrimary,
          }}
          className="truncate"
        >
          {staff.name}
        </p>
        <p
          style={{
            fontFamily: font.family,
            fontSize: font.size.sm,
            color: colors.textMuted,
            marginTop: 1,
          }}
          className="truncate"
        >
          {staff.email}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Badge variant={roleMeta.variant}>{staff.role}</Badge>
        <span style={{ color: colors.textMuted }}>
          <IconChevronRight />
        </span>
      </div>
    </button>
  )
}
