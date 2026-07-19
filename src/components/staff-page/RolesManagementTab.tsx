import { useState } from "react"
import {
  useAppStore,
  type Permission,
  type StoreRole,
} from "@/store/AppContext"
import { colors, font, shadows } from "../ds/tokens"
import { toast } from "sonner"
import { Button } from "../ds/Button"
import { IconEdit, IconPlus, IconSearch, IconTrash } from "@tabler/icons-react"
import { RoleModal } from "./RoleModal"
import { TD, TH } from "@/constants/staff.ts"

export function RolesManagementTab() {
  const { roles, addRole, updateRole, deleteRole } = useAppStore()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<StoreRole | null>(null)

  const handleSaveRole = (data: {
    name: string
    permissions: Permission[]
  }) => {
    if (editingRole) {
      updateRole({
        id: editingRole.id,
        name: data.name,
        permissions: data.permissions,
      })
      toast.success("Role updated successfully")
    } else {
      addRole({
        id: crypto.randomUUID(),
        name: data.name,
        permissions: data.permissions,
      })
      toast.success("Role created successfully")
    }
    setModalOpen(false)
  }

  const handleDeleteRole = (id: string) => {
    if (
      confirm(
        "Are you sure you want to delete this role? Any staff with this role will lose their permissions."
      )
    ) {
      deleteRole(id)
      toast.success("Role deleted")
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <p
            style={{
              fontFamily: font.family,
              fontWeight: font.weight.semibold,
              fontSize: font.size.lg,
              color: "var(--page-text)",
            }}
          >
            Roles & Permissions
          </p>
          <p
            style={{
              fontFamily: font.family,
              fontSize: font.size.sm,
              color: "var(--page-text-muted)",
              marginTop: 2,
            }}
          >
            Define what each role can access and do in Tablix
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<IconPlus />}
          onClick={() => {
            setEditingRole(null)
            setModalOpen(true)
          }}
        >
          Create Role
        </Button>
      </div>

      <div
        className="page-card overflow-hidden rounded-2xl border"
        style={{ boxShadow: shadows.card }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr className="page-thead border-b">
              <th style={TH}>Role Name</th>
              <th style={TH}>Permissions</th>
              <th style={{ ...TH, textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((r) => (
              <tr
                key={r.id}
                className="page-border page-hover border-b transition-colors"
              >
                <td style={{ ...TD, fontWeight: font.weight.medium }}>
                  <div className="flex items-center gap-2">
                    {r.name}
                    {r.isLocked && (
                      <span
                        style={{
                          fontSize: 10,
                          background: colors.primaryLight,
                          color: colors.primary,
                          padding: "2px 6px",
                          borderRadius: 4,
                          fontWeight: 600,
                        }}
                      >
                        SYSTEM
                      </span>
                    )}
                  </div>
                </td>
                <td style={{ ...TD, color: colors.textMuted }}>
                  {r.permissions.length} permission
                  {r.permissions.length !== 1 ? "s" : ""}
                </td>
                <td style={{ ...TD, textAlign: "center" }}>
                  <div className="flex items-center justify-center gap-0.5">
                    <Button
                      variant="ghost"
                      size="sm"
                      style={{ color: colors.textMuted }}
                      onClick={() => {
                        setEditingRole(r)
                        setModalOpen(true)
                      }}
                      title={r.isLocked ? "View" : "Edit"}
                    >
                      {r.isLocked ? <IconSearch /> : <IconEdit />}
                    </Button>
                    {!r.isLocked && (
                      <Button
                        variant="ghost"
                        size="sm"
                        style={{ color: colors.dangerText }}
                        onClick={() => handleDeleteRole(r.id)}
                        title="Delete"
                      >
                        <IconTrash />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RoleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveRole}
        editRole={editingRole}
      />
    </div>
  )
}
