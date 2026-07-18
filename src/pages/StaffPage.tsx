import React, { useState, useMemo, useEffect, useCallback } from "react"
import { useAppStore } from "../store/AppContext"
import type { Permission, StoreRole } from "../store/AppContext"

import { loadActivityEntries, addActivityEntry } from "../services/activityLog"
import type { ActivityEntry, ActivityCategory } from "../services/activityLog"
import { staffAPI } from "../services/api"
import type { ApiStaff } from "../services/api"
type Staff = ApiStaff
import { LogoutConfirmationModal } from "../components/LogoutConfirmationModal"
import { AppSidebar, AppLogo, MobileBottomNav } from "../components/AppSidebar"
import { NavMenu } from "../components/NavMenu"
import { MobileSheet } from "../components/MobileSheet"
import { toast, Toaster } from "sonner"
import { Button } from "../components/ds/Button"
import { Badge } from "../components/ds/Badge"
import { Input } from "../components/ds/Input"
import { Modal } from "../components/ds/Modal"
import { ConfirmModal } from "../components/ds/Modal"
import { Avatar } from "../components/ds/Avatar"
import { StatCard } from "../components/ds/StatCard"
import { colors, font, radius, shadows } from "../components/ds/tokens"
import {
  EMPTY_FORM,
  formatDate,
  generatePin,
  getRoleBadge,
} from "@/utils/staff-helpers"
import type { StaffForm } from "@/types/staff-page/staff"
import {
  IconEdit,
  IconTrash,
  IconLock,
  IconPlus,
  IconSearch,
  IconChevronRight,
  IconMail,
  IconCalendar,
  IconRefresh,
} from "@tabler/icons-react"

// ─── Table style helpers ──────────────────────────────────────────────────────

const TH: React.CSSProperties = {
  padding: "12px 16px",
  fontFamily: font.family,
  fontWeight: font.weight.semibold,
  fontSize: font.size.sm,
  color: "var(--page-table-head-text)",
  textAlign: "left",
  whiteSpace: "nowrap",
}

const TD: React.CSSProperties = {
  padding: "14px 16px",
  fontFamily: font.family,
  fontSize: font.size.base,
  color: "var(--page-text)",
  whiteSpace: "nowrap",
}

// ─── Staff Modal (Add / Edit) ─────────────────────────────────────────────────

function StaffModal({
  open,
  onClose,
  onSave,
  editStaff,
  roles,
}: {
  open: boolean
  onClose: () => void
  onSave: (form: StaffForm) => void
  editStaff: Staff | null
  roles: StoreRole[]
}) {
  const { stations, kotEnabled } = useAppStore()
  const [form, setForm] = useState<StaffForm>(EMPTY_FORM)
  const [errors, setErrors] = useState<
    Partial<Record<keyof StaffForm, string>>
  >({})
  const [pinVisible, setPinVisible] = useState(false)

  if (open && editStaff && form.name === "" && editStaff.name !== "") {
    setForm({
      name: editStaff.name,
      email: editStaff.email ?? "",
      role: editStaff.role,
      pin: "",
      assignedStation: editStaff.assignedStation || "",
    })
  }

  const set = (k: keyof StaffForm, v: string) => {
    setForm((p) => ({ ...p, [k]: v }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: "" }))
  }

  const validate = () => {
    const e: Partial<Record<keyof StaffForm, string>> = {}
    if (!form.name.trim()) e.name = "Staff name is required"
    if (!form.email.trim()) e.email = "Email address is required"
    if (!form.role) e.role = "Please select a role"
    if (!editStaff && !form.pin) e.pin = "Please generate a PIN"
    setErrors(e)
    return !Object.values(e).some(Boolean)
  }

  const handleClose = () => {
    setForm(EMPTY_FORM)
    setErrors({})
    setPinVisible(false)
    onClose()
  }

  const handleSubmit = () => {
    if (validate()) {
      onSave(form)
      handleClose()
    }
  }

  const handleGenerate = () => {
    const pin = generatePin()
    set("pin", pin)
    setPinVisible(true)
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={editStaff ? "Edit Staff" : "Add New Staff"}
      subtitle={
        editStaff
          ? "Update staff member information"
          : "Create a new staff account"
      }
      size="md"
      layout="standard"
      actions={[
        { label: "Cancel", variant: "outline", onClick: handleClose },
        {
          label: editStaff ? "Save Changes" : "Add Staff",
          variant: "primary",
          onClick: handleSubmit,
        },
      ]}
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Staff Name"
          placeholder="e.g. Adaeze Okonkwo"
          value={form.name}
          error={errors.name}
          autoFocus
          onChange={(e) => set("name", e.target.value)}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Enter") handleSubmit()
          }}
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="staff@tablix.ng"
          value={form.email}
          error={errors.email}
          onChange={(e) => set("email", e.target.value)}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Enter") handleSubmit()
          }}
        />

        <div className="flex flex-col gap-1.5">
          <label
            style={{
              fontFamily: font.family,
              fontWeight: font.weight.medium,
              fontSize: font.size.md,
              color: colors.textPrimary,
              lineHeight: "20px",
            }}
          >
            Role
          </label>
          <div
            style={{
              border: `1px solid ${errors.role ? colors.dangerText : colors.border}`,
              borderRadius: radius.md,
              boxShadow: shadows.sm,
              background: "var(--page-card-bg)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <select
              value={form.role}
              onChange={(e) => set("role", e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                paddingRight: "36px",
                fontFamily: font.family,
                fontSize: font.size.xl,
                color: form.role ? colors.textPrimary : colors.textPlaceholder,
                background: "transparent",
                border: "none",
                outline: "none",
                appearance: "none",
                cursor: "pointer",
              }}
            >
              <option
                value=""
                disabled
                style={{
                  color: colors.textPlaceholder,
                  background: "var(--page-card-bg)",
                }}
              >
                Select a role
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
            <span
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: colors.textMuted,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          {errors.role && (
            <p
              style={{
                fontFamily: font.family,
                fontSize: font.size.sm,
                color: colors.dangerText,
              }}
            >
              {errors.role}
            </p>
          )}
        </div>

        {kotEnabled && stations.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <label
              style={{
                fontFamily: font.family,
                fontWeight: font.weight.medium,
                fontSize: font.size.md,
                color: colors.textPrimary,
                lineHeight: "20px",
              }}
            >
              Assigned Station (Optional)
            </label>
            <div
              style={{
                border: `1px solid ${colors.border}`,
                borderRadius: radius.md,
                boxShadow: shadows.sm,
                background: "var(--page-card-bg)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <select
                value={form.assignedStation || ""}
                onChange={(e) => set("assignedStation", e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  paddingRight: "36px",
                  fontFamily: font.family,
                  fontSize: font.size.xl,
                  color: form.assignedStation
                    ? colors.textPrimary
                    : colors.textPlaceholder,
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
                    color: colors.textPlaceholder,
                    background: "var(--page-card-bg)",
                  }}
                >
                  No specific station (All / Default)
                </option>
                {stations.map((s) => (
                  <option
                    key={s}
                    value={s}
                    style={{
                      color: "var(--page-text)",
                      background: "var(--page-card-bg)",
                    }}
                  >
                    {s}
                  </option>
                ))}
              </select>
              <span
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  color: colors.textMuted,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label
            style={{
              fontFamily: font.family,
              fontWeight: font.weight.medium,
              fontSize: font.size.md,
              color: colors.textPrimary,
              lineHeight: "20px",
            }}
          >
            Login PIN
          </label>
          <div className="flex gap-2">
            <div
              className="flex flex-1 items-center"
              style={{
                border: `1px solid ${errors.pin ? colors.dangerText : colors.border}`,
                borderRadius: radius.md,
                boxShadow: shadows.sm,
                background: "var(--page-card-bg)",
                padding: "10px 14px",
                minHeight: 44,
              }}
            >
              {form.pin ? (
                <div className="flex w-full items-center gap-2">
                  <div className="flex flex-1 gap-2">
                    {form.pin.split("").map((digit, i) => (
                      <div
                        key={i}
                        className="flex size-8 items-center justify-center rounded-lg"
                        style={{
                          background: colors.neutralBg,
                          fontFamily: font.family,
                          fontWeight: font.weight.semibold,
                          fontSize: font.size.lg,
                          color: colors.textPrimary,
                          letterSpacing: "0.05em",
                        }}
                      >
                        {pinVisible ? digit : "\u2022"}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setPinVisible((v) => !v)}
                    style={{
                      color: colors.textMuted,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {pinVisible ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              ) : editStaff ? (
                <div className="flex gap-2">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="flex size-8 items-center justify-center rounded-lg"
                      style={{
                        background: colors.neutralBg,
                        color: colors.textMuted,
                        fontSize: font.size.lg,
                      }}
                    >
                      &bull;
                    </div>
                  ))}
                </div>
              ) : (
                <span
                  style={{
                    fontFamily: font.family,
                    fontSize: font.size.md,
                    color: colors.textPlaceholder,
                  }}
                >
                  No PIN generated yet
                </span>
              )}
            </div>
            <Button
              variant={form.pin ? "outline" : "primary"}
              size="md"
              leftIcon={<IconRefresh />}
              onClick={handleGenerate}
              style={{ whiteSpace: "nowrap", flexShrink: 0 }}
            >
              {form.pin
                ? "Regenerate"
                : editStaff
                  ? "Change PIN"
                  : "Generate PIN"}
            </Button>
          </div>
          {errors.pin && (
            <p
              style={{
                fontFamily: font.family,
                fontSize: font.size.sm,
                color: colors.dangerText,
              }}
            >
              {errors.pin}
            </p>
          )}
          {form.pin ? (
            <p
              style={{
                fontFamily: font.family,
                fontSize: font.size.sm,
                color: colors.textMuted,
              }}
            >
              Share this PIN securely with the staff member. They'll use it to
              log in.
            </p>
          ) : (
            editStaff && (
              <p
                style={{
                  fontFamily: font.family,
                  fontSize: font.size.sm,
                  color: colors.textMuted,
                }}
              >
                Leave blank to keep the existing PIN unchanged.
              </p>
            )
          )}
        </div>
      </div>
    </Modal>
  )
}

// ─── Reset PIN Modal ─────────────────────────────────────────��────────────────

function ResetPinModal({
  open,
  onClose,
  onReset,
  staff,
}: {
  open: boolean
  onClose: () => void
  onReset: (newPin: string) => void
  staff: Staff | null
}) {
  const [newPin, setNewPin] = useState("")
  const [pinVisible, setPinVisible] = useState(false)

  const handleGenerate = () => {
    setNewPin(generatePin())
    setPinVisible(true)
  }
  const handleClose = () => {
    setNewPin("")
    setPinVisible(false)
    onClose()
  }
  const handleConfirm = () => {
    if (newPin) {
      onReset(newPin)
      handleClose()
    }
  }

  if (!staff) return null

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Reset Login PIN"
      subtitle={`Generate a new PIN for ${staff.name}`}
      size="sm"
      layout="standard"
      icon={
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="11"
            width="18"
            height="11"
            rx="2"
            ry="2"
            stroke={colors.primary}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 11V7a5 5 0 0110 0v4"
            stroke={colors.primary}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      }
      iconBg={colors.primaryLight}
      actions={[
        { label: "Cancel", variant: "outline", onClick: handleClose },
        {
          label: "Reset PIN",
          variant: "primary",
          onClick: handleConfirm,
          disabled: !newPin,
        },
      ]}
    >
      <div className="flex flex-col gap-4">
        <p
          style={{
            fontFamily: font.family,
            fontSize: font.size.md,
            color: colors.textMuted,
            lineHeight: "20px",
          }}
        >
          The existing PIN for{" "}
          <strong style={{ color: colors.textPrimary }}>{staff.name}</strong>{" "}
          will be replaced.
        </p>
        <div className="flex flex-col gap-1.5">
          <label
            style={{
              fontFamily: font.family,
              fontWeight: font.weight.medium,
              fontSize: font.size.md,
              color: colors.textPrimary,
            }}
          >
            New PIN
          </label>
          <div className="flex gap-2">
            <div
              className="flex flex-1 items-center"
              style={{
                border: `1px solid ${colors.border}`,
                borderRadius: radius.md,
                boxShadow: shadows.sm,
                background: "var(--page-card-bg)",
                padding: "10px 14px",
                minHeight: 44,
              }}
            >
              {newPin ? (
                <div className="flex w-full items-center gap-2">
                  <div className="flex flex-1 gap-2">
                    {newPin.split("").map((digit, i) => (
                      <div
                        key={i}
                        className="flex size-8 items-center justify-center rounded-lg"
                        style={{
                          background: colors.neutralBg,
                          fontFamily: font.family,
                          fontWeight: font.weight.semibold,
                          fontSize: font.size.lg,
                          color: colors.textPrimary,
                        }}
                      >
                        {pinVisible ? digit : "\u2022"}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setPinVisible((v) => !v)}
                    style={{ color: colors.textMuted, display: "flex" }}
                  >
                    {pinVisible ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              ) : (
                <span
                  style={{
                    fontFamily: font.family,
                    fontSize: font.size.md,
                    color: colors.textPlaceholder,
                  }}
                >
                  Click "Generate" to create a new PIN
                </span>
              )}
            </div>
            <Button
              variant={newPin ? "outline" : "primary"}
              size="md"
              leftIcon={<IconRefresh />}
              onClick={handleGenerate}
              style={{ whiteSpace: "nowrap", flexShrink: 0 }}
            >
              {newPin ? "Regenerate" : "Generate"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

// ─── Roles & Permissions Management ──────────────────────────────────────────

const PERMISSION_GROUPS = [
  {
    group: "POS & Sales",
    perms: [
      { id: "pos_access", label: "Process sales & View Tables" },
      { id: "manager_override", label: "Manager Override (Voids, Discounts)" },
    ],
  },
  {
    group: "Kitchen",
    perms: [{ id: "kds_access", label: "Access Kitchen Display (KDS)" }],
  },
  {
    group: "Menu & Inventory",
    perms: [
      { id: "manage_menu", label: "Manage Menu Items" },
      { id: "manage_inventory", label: "Manage Inventory" },
    ],
  },
  {
    group: "Staff & Tables",
    perms: [
      { id: "manage_staff", label: "Manage Staff & Roles" },
      { id: "manage_tables", label: "Manage Table Layouts" },
    ],
  },
  {
    group: "Reports & Admin",
    perms: [
      { id: "view_reports", label: "View Reports & Sales" },
      { id: "view_expenses", label: "View & Manage Expenses" },
      { id: "manage_settings", label: "Manage Store Settings" },
      { id: "billing_access", label: "Billing & Subscription" },
    ],
  },
]

function RoleModal({
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

function RolesManagementTab() {
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
            {roles.map((r, idx) => (
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

// ─── Activity Log ─────────────────────────────────────────────────────────────

const CAT_COLORS: Record<
  ActivityCategory,
  { bg: string; text: string; label: string }
> = {
  Sale: { bg: colors.successBg, text: colors.successText, label: "Sale" },
  Auth: { bg: colors.infoBg, text: colors.infoText, label: "Auth" },
  Stock: { bg: colors.warningBg, text: colors.warningText, label: "Stock" },
  System: { bg: colors.neutralBg, text: colors.neutralText, label: "System" },
}

function fmtEntryTime(ts: number): string {
  const d = new Date(ts)
  return d.toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}

function fmtEntryDate(ts: number): string {
  const d = new Date(ts)
  const now = new Date()
  const todayStr = now.toDateString()
  const yesterdayStr = new Date(now.getTime() - 86400000).toDateString()
  if (d.toDateString() === todayStr) return "Today"
  if (d.toDateString() === yesterdayStr) return "Yesterday"
  return d.toLocaleDateString("en-NG", { day: "numeric", month: "short" })
}

// Build combined live activity from the persisted activity log + inventory log.
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

// ─── Page ─────────────────────────────────────────────────────────────────────

const PAGE_SIZE = 10
const STAFF_TABS = ["Team", "Roles & Permissions", "Activity"] as const
type StaffTab = (typeof STAFF_TABS)[number]

export default function StaffPage() {
  const { isReadOnly, roles, kotEnabled } = useAppStore()
  const [staff, setStaff] = useState<Staff[]>([])
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [activeTab, setActiveTab] = useState<StaffTab>("Team")
  const [search, setSearch] = useState("")
  // roleFilter stores the selected role id (string) or empty for all
  const [roleFilter, setRoleFilter] = useState<string>("")
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [editStaff, setEditStaff] = useState<Staff | null>(null)
  const [deleteStaff, setDeleteStaff] = useState<Staff | null>(null)
  const [resetStaff, setResetStaff] = useState<Staff | null>(null)
  const [sheetStaff, setSheetStaff] = useState<Staff | null>(null)

  const loadStaff = useCallback(async () => {
    try {
      setLoading(true)
      const res = await staffAPI.list()
      setStaff(res.data.staff)
      setApiError(null)
    } catch (err: any) {
      if (err?.status === 401) {
        setApiError("Session expired. Please logout and log in again.")
      } else {
        setApiError("Could not load staff. Please refresh.")
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadStaff()
  }, [loadStaff])

  const filtered = useMemo(
    () =>
      staff.filter((s) => {
        const matchSearch =
          (s.name || "").toLowerCase().includes((search || "").toLowerCase()) ||
          (s.email || "")
            .toLowerCase()
            .includes((search || "").toLowerCase()) ||
          (s.role || "").toLowerCase().includes((search || "").toLowerCase())
        const matchRole = roleFilter ? s.role === roleFilter : true
        return matchSearch && matchRole
      }),
    [staff, search, roleFilter]
  )

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalByRole = (roleName: string) => {
    const roleId = roles.find(
      (r) => r.name.toLowerCase() === roleName.toLowerCase()
    )?.id
    if (!roleId) return 0
    return staff.filter((s) => s.role === roleId).length
  }

  const handleSave = async (form: StaffForm) => {
    try {
      if (editStaff) {
        const payload: Record<string, string> = {
          name: form.name,
          email: form.email,
          role: form.role,
        }
        if (form.pin) payload.pin = form.pin
        if (form.assignedStation) payload.assignedStation = form.assignedStation
        await staffAPI.update(editStaff.id, payload)
        toast.success("Staff member updated")
        addActivityEntry({
          staffName: "Owner",
          role: "Owner",
          action: "Updated staff member",
          category: "System",
          timestamp: Date.now(),
          detail: `${form.name} (${form.role}) details updated`,
        })
      } else {
        await staffAPI.create({
          name: form.name,
          email: form.email,
          role: form.role,
          pin: form.pin,
          assignedStation: form.assignedStation || undefined,
        })
        toast.success("Staff member added")
        addActivityEntry({
          staffName: "Owner",
          role: "Owner",
          action: "Added staff member",
          category: "System",
          timestamp: Date.now(),
          detail: `New ${form.role}: ${form.name}`,
        })
      }
      setEditStaff(null)
      setShowModal(false)
      await loadStaff()
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Failed to save staff member.")
      setApiError(
        e?.data?.message ?? "Failed to save staff member. Please try again."
      )
    }
  }

  const handleDelete = async () => {
    if (!deleteStaff) return
    try {
      await staffAPI.remove(deleteStaff.id)
      toast.success("Staff member removed")
      addActivityEntry({
        staffName: "Owner",
        role: "Owner",
        action: "Removed staff member",
        category: "System",
        timestamp: Date.now(),
        detail: `${deleteStaff.name} (${deleteStaff.role}) was removed`,
      })
      setDeleteStaff(null)
      await loadStaff()
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Failed to delete staff member.")
      setApiError(
        e?.data?.message ?? "Failed to delete staff member. Please try again."
      )
    }
  }

  const handleResetPin = async (newPin: string) => {
    if (!resetStaff) return
    try {
      await staffAPI.update(resetStaff.id, { pin: newPin })
      toast.success("PIN reset successfully")
      addActivityEntry({
        staffName: "Owner",
        role: "Owner",
        action: "Reset staff PIN",
        category: "Auth",
        timestamp: Date.now(),
        detail: `${resetStaff.name}'s PIN was reset`,
      })
      setResetStaff(null)
      await loadStaff()
    } catch (e: any) {
      toast.error(e?.data?.message ?? "Failed to reset PIN.")
      setApiError(e?.data?.message ?? "Failed to reset PIN. Please try again.")
    }
  }

  const openEdit = (s: Staff) => {
    setEditStaff(s)
    setShowModal(true)
  }

  // Shared stat card data
  const statCards = [
    {
      label: "Total Staff",
      value: String(staff.length),
      sub: "Active team members",
      iconBg: colors.primaryLight,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
            stroke={colors.primary}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="7" r="4" stroke={colors.primary} strokeWidth="2" />
          <path
            d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
            stroke={colors.primary}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Admins & Managers",
      value: String(totalByRole("Admin") + totalByRole("Manager")),
      sub: `${totalByRole("Admin")} Admin | ${totalByRole("Manager")} Mgr`,
      iconBg: colors.infoBg,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            stroke={colors.infoText}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Cashiers",
      value: String(totalByRole("Cashier")),
      sub: "Handling transactions",
      iconBg: colors.successBg,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect
            x="2"
            y="5"
            width="20"
            height="14"
            rx="2"
            stroke={colors.successText}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 10h20"
            stroke={colors.successText}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Waiters & Chefs",
      value: String(totalByRole("Waiter") + totalByRole("Chef")),
      sub: `${totalByRole("Waiter")} Waiter | ${totalByRole("Chef")} Chef`,
      iconBg: colors.warningBg,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3"
            stroke={colors.warningText}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ]

  return (
    <div className="page-bg flex h-screen flex-col overflow-hidden text-foreground">
      <Toaster position="top-center" richColors />
      <header className="page-header z-30 flex h-[69px] shrink-0 items-center justify-between border-b px-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-3">
          <AppLogo />
          <NavMenu />
        </div>
      </header>

      {/* Body */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <AppSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={() => setShowLogout(true)}
          activeId="staff"
        />

        {/* MOBILE layout */}
        <div className="page-surface-2 flex flex-1 flex-col overflow-hidden md:hidden">
          {/* Sticky search */}
          <div className="page-bg page-border shrink-0 border-b px-4 py-3">
            <div className="flex h-10 items-center gap-3">
              <div
                className="page-surface flex h-full flex-1 items-center gap-2 rounded-xl border px-3"
                style={{ borderColor: "var(--page-border)" }}
              >
                <IconSearch />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(1)
                  }}
                  placeholder="Search staff..."
                  className="min-w-0 flex-1 bg-transparent outline-none"
                  style={{
                    fontFamily: font.family,
                    fontSize: font.size.base,
                    color: colors.textPrimary,
                  }}
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="shrink-0 text-lg leading-none text-gray-400 hover:text-gray-600"
                  >
                    x
                  </button>
                )}
              </div>
              <button
                className="flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors active:bg-gray-100"
                style={{
                  background: "var(--page-surface-2)",
                  color: colors.primary,
                }}
                onClick={() => {
                  setEditStaff(null)
                  setShowModal(true)
                }}
                aria-label="Add staff"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto pb-[80px]">
            {/* Horizontally scrollable stat cards */}
            <div
              className="flex gap-3 overflow-x-auto px-4 pt-4 pb-3"
              style={{ scrollbarWidth: "none" }}
            >
              {statCards.map((s) => (
                <StatCard
                  key={s.label}
                  label={s.label}
                  value={s.value}
                  sub={s.sub}
                  iconBg={s.iconBg}
                  icon={s.icon}
                  compact
                  className="shrink-0"
                  style={{ minWidth: 155 }}
                />
              ))}
            </div>

            {/* Section label */}
            <div className="flex items-center justify-between px-4 py-2">
              <p
                style={{
                  fontFamily: font.family,
                  fontWeight: font.weight.semibold,
                  fontSize: font.size.sm,
                  color: colors.textMuted,
                }}
              >
                {filtered.length} Staff Member{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Staff list */}
            <div
              className="page-card mx-4 mb-4 overflow-hidden rounded-2xl border"
              style={{ boxShadow: shadows.card }}
            >
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 px-4 py-14 text-center">
                  <div
                    className="flex size-14 items-center justify-center rounded-2xl"
                    style={{ background: colors.primaryLight }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                        stroke={colors.primary}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="9"
                        cy="7"
                        r="4"
                        stroke={colors.primary}
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: font.family,
                        fontWeight: font.weight.semibold,
                        fontSize: font.size.base,
                        color: colors.textPrimary,
                      }}
                    >
                      No staff found
                    </p>
                    <p
                      style={{
                        fontFamily: font.family,
                        fontSize: font.size.sm,
                        color: colors.textMuted,
                        marginTop: 2,
                      }}
                    >
                      {search
                        ? "Try a different search term."
                        : "Tap + to add your first staff member."}
                    </p>
                  </div>
                </div>
              ) : (
                filtered.map((s, idx) => {
                  const roleMeta = getRoleBadge(s.role, roles)
                  const isLast = idx === filtered.length - 1
                  return (
                    <button
                      key={s.id}
                      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors active:bg-gray-50"
                      style={{
                        borderBottom: isLast
                          ? "none"
                          : `1px solid ${colors.borderLight}`,
                      }}
                      onClick={() => setSheetStaff(s)}
                    >
                      <Avatar name={s.name} size="sm" />
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
                          {s.name}
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
                          {s.email}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <Badge variant={roleMeta.variant}>{s.role}</Badge>
                        <span style={{ color: colors.textMuted }}>
                          <IconChevronRight />
                        </span>
                      </div>
                    </button>
                  )
                })
              )}
            </div>

            {/* Load more */}
            {filtered.length > PAGE_SIZE && (
              <div className="px-4 pb-4">
                <Button variant="outline" style={{ width: "100%" }}>
                  Load more
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* DESKTOP layout */}
        <main className="page-surface hidden flex-1 flex-col gap-6 overflow-y-auto p-6 md:flex lg:p-8">
          {/* Heading */}
          <div>
            <h1
              style={{
                fontFamily: font.family,
                fontWeight: font.weight.semibold,
                fontSize: 18,
                color: "var(--page-text)",
              }}
            >
              Staff Management
            </h1>
            <p
              style={{
                fontFamily: font.family,
                fontWeight: font.weight.normal,
                fontSize: 14,
                color: "var(--page-text-muted)",
                marginTop: 4,
              }}
            >
              Manage your team, permissions, and activity
            </p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
            {statCards.map((s) => (
              <StatCard
                key={s.label}
                label={s.label}
                value={s.value}
                sub={s.sub}
                iconBg={s.iconBg}
                icon={s.icon}
              />
            ))}
          </div>

          {/* Tab bar */}
          <div className="page-border flex items-end border-b">
            {STAFF_TABS.map((tab) => {
              const isActive = tab === activeTab
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="relative mr-6 px-1 pb-3 transition-colors"
                  style={{
                    fontFamily: font.family,
                    fontWeight: isActive ? 600 : 400,
                    fontSize: 14,
                    color: isActive
                      ? "var(--page-text)"
                      : "var(--page-text-muted)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {tab}
                  {isActive && (
                    <span
                      className="absolute right-0 bottom-0 left-0 h-[2.5px] rounded-full"
                      style={{ background: "var(--page-text)" }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Tab content */}
          {activeTab === "Activity" && <ActivityLog staff={staff} />}
          {activeTab === "Roles & Permissions" && <RolesManagementTab />}

          {/* Team table - only shown in Team tab */}
          {activeTab === "Team" && (
            <div
              className="page-card flex flex-col rounded-2xl border"
              style={{ boxShadow: shadows.card }}
            >
              <div className="page-border flex items-center gap-2 border-b px-5 py-3">
                <div className="min-w-0 flex-1">
                  <Input
                    placeholder="Search by name, email or role..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value)
                      setPage(1)
                    }}
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
                    onChange={(e) => {
                      setRoleFilter(e.target.value)
                      setPage(1)
                    }}
                    style={{
                      padding: "8px 28px 8px 12px",
                      fontFamily: font.family,
                      fontSize: font.size.sm,
                      color: roleFilter
                        ? "var(--page-text)"
                        : "var(--page-text-muted)",
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
                  disabled={isReadOnly}
                  onClick={() => {
                    setEditStaff(null)
                    setShowModal(true)
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
                    {paginated.length === 0 ? (
                      <tr>
                        <td colSpan={6}>
                          <div className="flex flex-col items-center justify-center gap-3 py-16">
                            <div
                              className="flex size-14 items-center justify-center rounded-2xl"
                              style={{ background: colors.primaryLight }}
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                                  stroke={colors.primary}
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <circle
                                  cx="9"
                                  cy="7"
                                  r="4"
                                  stroke={colors.primary}
                                  strokeWidth="2"
                                />
                              </svg>
                            </div>
                            <p
                              style={{
                                fontFamily: font.family,
                                fontWeight: font.weight.semibold,
                                fontSize: font.size.lg,
                                color: "var(--page-text)",
                              }}
                            >
                              No staff found
                            </p>
                            <p
                              style={{
                                fontFamily: font.family,
                                fontSize: font.size.base,
                                color: "var(--page-text-muted)",
                              }}
                            >
                              {search || roleFilter
                                ? "Try adjusting your search or filter."
                                : "Add your first staff member using the button above."}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      paginated.map((s, idx) => {
                        const isLast = idx === paginated.length - 1
                        const roleMeta = getRoleBadge(s.role, roles)
                        return (
                          <tr
                            key={s.id}
                            className="page-border page-hover border-b transition-colors"
                            style={{
                              borderBottom: isLast ? "none" : undefined,
                            }}
                          >
                            <td style={{ padding: "14px 16px" }}>
                              <div className="flex items-center gap-3">
                                <Avatar name={s.name} size="sm" />
                                <p
                                  style={{
                                    fontFamily: font.family,
                                    fontWeight: font.weight.medium,
                                    fontSize: font.size.base,
                                    color: "var(--page-text)",
                                    lineHeight: "20px",
                                  }}
                                >
                                  {s.name}
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
                                <span
                                  style={{ color: "var(--page-text-muted)" }}
                                >
                                  {s.assignedStation || "All / Default"}
                                </span>
                              </td>
                            )}
                            <td style={TD}>
                              <span style={{ color: "var(--page-text-muted)" }}>
                                {s.email}
                              </span>
                            </td>
                            <td style={TD}>
                              <span style={{ color: colors.textSecondary }}>
                                {formatDate(s.createdAt)}
                              </span>
                            </td>
                            <td style={{ ...TD, textAlign: "center" }}>
                              <div className="flex items-center justify-center gap-0.5">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  style={{ color: colors.textMuted }}
                                  onClick={() => openEdit(s)}
                                  title="Edit staff"
                                >
                                  <IconEdit />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  style={{ color: colors.infoText }}
                                  onClick={() => setResetStaff(s)}
                                  title="Reset PIN"
                                >
                                  <IconLock />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  style={{ color: colors.dangerText }}
                                  onClick={() => setDeleteStaff(s)}
                                  title="Delete"
                                >
                                  <IconTrash />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {filtered.length > PAGE_SIZE && (
                <div
                  className="flex items-center justify-between border-t px-5 py-4"
                  style={{ borderColor: colors.borderLight }}
                >
                  <p
                    style={{
                      fontFamily: font.family,
                      fontSize: font.size.sm,
                      color: colors.textMuted,
                    }}
                  >
                    Showing {(page - 1) * PAGE_SIZE + 1}&#x2013;
                    {Math.min(page * PAGE_SIZE, filtered.length)} of{" "}
                    {filtered.length}
                  </p>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page === 1}
                      onClick={() => setPage((p) => p - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page >= Math.ceil(filtered.length / PAGE_SIZE)}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileBottomNav activeId="staff" onLogout={() => setShowLogout(true)} />

      {/* Staff Detail Bottom Sheet */}
      <MobileSheet open={!!sheetStaff} onClose={() => setSheetStaff(null)}>
        {sheetStaff &&
          (() => {
            const s = sheetStaff
            const roleMeta = getRoleBadge(s.role, roles)
            return (
              <>
                <div className="flex flex-1 flex-col overflow-y-auto pb-4">
                  {/* Hero */}
                  <div
                    className="flex flex-col items-center gap-3 px-6 pt-3 pb-5"
                    style={{ borderBottom: `1px solid ${colors.borderLight}` }}
                  >
                    <Avatar name={s.name} size="lg" />
                    <div className="text-center">
                      <p
                        style={{
                          fontFamily: font.family,
                          fontWeight: font.weight.semibold,
                          fontSize: font.size.lg,
                          color: colors.textPrimary,
                        }}
                      >
                        {s.name}
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
                          {s.email}
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
                        { label: "Role", value: s.role, color: colors.primary },
                        ...(kotEnabled
                          ? [
                              {
                                label: "Station",
                                value: s.assignedStation || "All",
                                color: colors.textPrimary,
                              },
                            ]
                          : []),
                        {
                          label: "Joined",
                          value: formatDate(s.createdAt),
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
                          {formatDate(s.createdAt)}
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
                      setResetStaff(s)
                      setSheetStaff(null)
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
                      openEdit(s)
                      setSheetStaff(null)
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
                      setDeleteStaff(s)
                      setSheetStaff(null)
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </>
            )
          })()}
      </MobileSheet>

      {/* Modals */}
      <StaffModal
        open={showModal}
        onClose={() => {
          setShowModal(false)
          setEditStaff(null)
        }}
        onSave={handleSave}
        editStaff={editStaff}
        roles={roles}
      />
      <ResetPinModal
        open={!!resetStaff}
        onClose={() => setResetStaff(null)}
        onReset={handleResetPin}
        staff={resetStaff}
      />
      <ConfirmModal
        open={!!deleteStaff}
        onClose={() => setDeleteStaff(null)}
        onConfirm={handleDelete}
        title="Delete Staff Member"
        description={`Are you sure you want to remove ${deleteStaff?.name}? This action cannot be undone.`}
        variant="danger"
        confirmLabel="Yes, Delete"
        cancelLabel="Cancel"
      />
      {showLogout && (
        <LogoutConfirmationModal
          isOpen={showLogout}
          onCancel={() => setShowLogout(false)}
        />
      )}
    </div>
  )
}
