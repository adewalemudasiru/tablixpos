import { useEffect, useState } from "react"
import type { Permission, StoreRole } from "@/store/AppContext"
import { Modal } from "../ds/Modal"
import { Input } from "../ds/Input"
import { colors, font } from "../ds/tokens"
import { toast } from "sonner"
import { PERMISSION_GROUPS } from "@/constants/staff.ts"

export function RoleModal({
  open,
  onClose,
  onSave,
  editRole,
}: {
  open: boolean
  onClose: () => void
  onSave: (roleData: { name: string; permissions: Permission[] }) => void
  editRole: StoreRole | null
}) {
  const [name, setName] = useState("")
  const [perms, setPerms] = useState<Set<Permission>>(new Set())

  useEffect(() => {
    if (open && editRole) {
      setName(editRole.name)
      setPerms(new Set(editRole.permissions))
    } else if (open) {
      setName("")
      setPerms(new Set())
    }
  }, [open, editRole])

  const togglePerm = (p: Permission) => {
    setPerms((prev) => {
      const next = new Set(prev)
      if (next.has(p)) next.delete(p)
      else next.add(p)
      return next
    })
  }

  const isLocked = editRole?.isLocked

  const handleSave = () => {
    if (!name.trim()) return toast.error("Role name is required")
    onSave({ name: name.trim(), permissions: Array.from(perms) })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        editRole ? (isLocked ? "View Role" : "Edit Role") : "Create New Role"
      }
      subtitle="Define what staff with this role can do in Tablix."
      size="md"
      actions={[
        { label: "Cancel", variant: "outline", onClick: onClose },
        {
          label: "Save Role",
          variant: "primary",
          onClick: handleSave,
          disabled: isLocked,
        },
      ]}
    >
      <div className="flex flex-col gap-5">
        <Input
          label="Role Name"
          placeholder="e.g. Supervisor"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLocked}
        />

        <div className="mt-2 flex flex-col gap-4">
          {PERMISSION_GROUPS.map((group) => (
            <div key={group.group} className="flex flex-col gap-2">
              <p
                style={{
                  fontFamily: font.family,
                  fontWeight: font.weight.semibold,
                  fontSize: font.size.sm,
                  color: colors.textSecondary,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {group.group}
              </p>
              <div className="flex flex-col gap-2">
                {group.perms.map((p) => {
                  const checked = perms.has(p.id as Permission)
                  return (
                    <label
                      key={p.id}
                      className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
                      style={{ border: `1px solid ${colors.borderLight}` }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={isLocked}
                        onChange={() => togglePerm(p.id as Permission)}
                        style={{
                          width: 18,
                          height: 18,
                          accentColor: colors.primary,
                          cursor: isLocked ? "not-allowed" : "pointer",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: font.family,
                          fontSize: font.size.sm,
                          color: colors.textPrimary,
                        }}
                      >
                        {p.label}
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
