import { MobileSheet } from "../MobileSheet"
import { Badge } from "../ds/Badge"
import { Avatar } from "../ds/Avatar"
import { Button } from "../ds/Button"
import { colors, font } from "../ds/tokens"
import {
  IconMail,
  IconCalendar,
  IconLock,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react"
import { formatDate, getRoleBadge } from "../../utils/staff-helpers"
import type { Staff } from "@/types/staff-page/staff"

interface StaffDetailSheetProps {
  staff: Staff | null
  roles: any[]
  kotEnabled: boolean
  open: boolean
  onClose: () => void
  onEdit: (staff: Staff) => void
  onResetPin: (staff: Staff) => void
  onDelete: (staff: Staff) => void
}

export function StaffDetailSheet({
  staff,
  roles,
  kotEnabled,
  open,
  onClose,
  onEdit,
  onResetPin,
  onDelete,
}: StaffDetailSheetProps) {
  if (!staff) return null

  const roleMeta = getRoleBadge(staff.role, roles)

  return (
    <MobileSheet open={open} onClose={onClose}>
      <div className="flex flex-1 flex-col overflow-y-auto pb-4">
        {/* Hero */}
        <div
          className="flex flex-col items-center gap-3 px-6 pt-3 pb-5"
          style={{ borderBottom: `1px solid ${colors.borderLight}` }}
        >
          <Avatar name={staff.name} size="lg" />
          <div className="text-center">
            <p
              style={{
                fontFamily: font.family,
                fontWeight: font.weight.semibold,
                fontSize: font.size.lg,
                color: colors.textPrimary,
              }}
            >
              {staff.name}
            </p>
            <div className="mt-1.5 flex justify-center">
              <Badge variant={roleMeta.variant} dot>
                {roleMeta.name}
              </Badge>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div
          className="flex flex-col gap-3 px-5 pt-5 pb-4"
          style={{ borderBottom: `1px solid ${colors.borderLight}` }}
        >
          <p
            style={{
              fontFamily: font.family,
              fontSize: 11,
              fontWeight: font.weight.semibold,
              color: colors.textMuted,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Contact
          </p>
          <div className="flex items-center gap-3">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-xl"
              style={{
                background: colors.infoBg,
                color: colors.infoText,
              }}
            >
              <IconMail />
            </div>
            <div className="min-w-0 flex-1">
              <p
                style={{
                  fontFamily: font.family,
                  fontSize: 11,
                  color: colors.textMuted,
                }}
              >
                Email
              </p>
              <p
                style={{
                  fontFamily: font.family,
                  fontSize: font.size.base,
                  color: colors.textPrimary,
                }}
                className="truncate"
              >
                {staff.email}
              </p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div
          className="px-5 pt-5 pb-4"
          style={{ borderBottom: `1px solid ${colors.borderLight}` }}
        >
          <p
            style={{
              fontFamily: font.family,
              fontSize: 11,
              fontWeight: font.weight.semibold,
              color: colors.textMuted,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 14,
            }}
          >
            Details
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Role", value: staff.role, color: colors.primary },
              ...(kotEnabled
                ? [
                    {
                      label: "Station",
                      value: staff.assignedStation || "All",
                      color: colors.textPrimary,
                    },
                  ]
                : []),
              {
                label: "Joined",
                value: formatDate(staff.createdAt),
                color: colors.textPrimary,
              },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 rounded-xl p-3"
                style={{ background: "#f9fafb" }}
              >
                <p
                  style={{
                    fontFamily: font.family,
                    fontWeight: font.weight.semibold,
                    fontSize: font.size.sm,
                    color,
                  }}
                >
                  {value}
                </p>
                <p
                  style={{
                    fontFamily: font.family,
                    fontSize: 10,
                    color: colors.textMuted,
                    textAlign: "center",
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Joined info */}
        <div className="px-5 pt-4">
          <div className="flex items-center gap-2">
            <span style={{ color: colors.textMuted }}>
              <IconCalendar />
            </span>
            <p
              style={{
                fontFamily: font.family,
                fontSize: font.size.sm,
                color: colors.textMuted,
              }}
            >
              Member since{" "}
              <span
                style={{
                  color: colors.textSecondary,
                  fontWeight: font.weight.medium,
                }}
              >
                {formatDate(staff.createdAt)}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Sticky action buttons */}
      <div
        className="flex shrink-0 gap-2.5 px-5 py-4"
        style={{ borderTop: `1px solid ${colors.borderLight}` }}
      >
        <Button
          variant="outline"
          size="sm"
          leftIcon={<IconLock />}
          onClick={() => {
            onResetPin(staff)
            onClose()
          }}
          style={{ flex: 1, color: colors.infoText }}
        >
          Reset PIN
        </Button>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<IconEdit />}
          onClick={() => {
            onEdit(staff)
            onClose()
          }}
          style={{ flex: 1 }}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          size="sm"
          leftIcon={<IconTrash />}
          onClick={() => {
            onDelete(staff)
            onClose()
          }}
        >
          Delete
        </Button>
      </div>
    </MobileSheet>
  )
}
