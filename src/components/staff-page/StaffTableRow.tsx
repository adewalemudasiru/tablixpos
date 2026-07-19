import { Badge } from "../ds/Badge"
import { Avatar } from "../ds/Avatar"
import { Button } from "../ds/Button"

import { formatDate, getRoleBadge } from "../../utils/staff-helpers"
import { IconEdit, IconLock, IconTrash } from "@tabler/icons-react"
import type { Staff } from "@/types/staff-page/staff"
import { colors, font } from "../ds/tokens"
import { TD } from "@/constants/staff.ts"

interface StaffTableRowProps {
  staff: Staff
  roles: any[]
  kotEnabled: boolean
  isLast: boolean
  onEdit: (staff: Staff) => void
  onResetPin: (staff: Staff) => void
  onDelete: (staff: Staff) => void
}

export function StaffTableRow({
  staff,
  roles,
  kotEnabled,
  isLast,
  onEdit,
  onResetPin,
  onDelete,
}: StaffTableRowProps) {
  const roleMeta = getRoleBadge(staff.role, roles)

  return (
    <tr
      className="page-border page-hover border-b transition-colors"
      style={{
        borderBottom: isLast ? "none" : undefined,
      }}
    >
      <td style={{ padding: "14px 16px" }}>
        <div className="flex items-center gap-3">
          <Avatar name={staff.name} size="sm" />
          <p
            style={{
              fontFamily: font.family,
              fontWeight: font.weight.medium,
              fontSize: font.size.base,
              color: "var(--page-text)",
              lineHeight: "20px",
            }}
          >
            {staff.name}
          </p>
        </div>
      </td>
      <td style={TD}>
        <Badge variant={roleMeta.variant} dot>
          {roleMeta.name}
        </Badge>
      </td>
      {kotEnabled && (
        <td style={TD}>
          <span style={{ color: "var(--page-text-muted)" }}>
            {staff.assignedStation || "All / Default"}
          </span>
        </td>
      )}
      <td style={TD}>
        <span style={{ color: "var(--page-text-muted)" }}>{staff.email}</span>
      </td>
      <td style={TD}>
        <span style={{ color: colors.textSecondary }}>
          {formatDate(staff.createdAt)}
        </span>
      </td>
      <td style={{ ...TD, textAlign: "center" }}>
        <div className="flex items-center justify-center gap-0.5">
          <Button
            variant="ghost"
            size="sm"
            style={{ color: colors.textMuted }}
            onClick={() => onEdit(staff)}
            title="Edit staff"
          >
            <IconEdit />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            style={{ color: colors.infoText }}
            onClick={() => onResetPin(staff)}
            title="Reset PIN"
          >
            <IconLock />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            style={{ color: colors.dangerText }}
            onClick={() => onDelete(staff)}
            title="Delete"
          >
            <IconTrash />
          </Button>
        </div>
      </td>
    </tr>
  )
}
