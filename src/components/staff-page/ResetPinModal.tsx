import { useState } from "react"
import { Modal } from "../ds/Modal"
import { colors, font, radius, shadows } from "../ds/tokens"
import { Button } from "../ds/Button"
import { IconRefresh } from "@tabler/icons-react"
import { generatePin } from "@/utils/staff-helpers"
import type { ApiStaff } from "../../services/api"
type Staff = ApiStaff

export function ResetPinModal({
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
