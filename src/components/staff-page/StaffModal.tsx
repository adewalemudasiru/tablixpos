import type { StaffForm } from "@/types/staff-page/staff"
import type { ApiStaff } from "../../services/api"
import { useState } from "react"
import { EMPTY_FORM, generatePin } from "@/utils/staff-helpers"
import type { StoreRole } from "@/store/AppContext"
import { Modal } from "../ds/Modal"
import { Input } from "../ds/Input"
import { Button } from "../ds/Button"
import { colors, font, radius, shadows } from "../ds/tokens"
import { IconRefresh } from "@tabler/icons-react"
import { useAppStore } from "../../store/AppContext"
type Staff = ApiStaff

export function StaffModal({
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
