import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Modal, colors } from "../ds"
import type { CancelModalProps } from "../../types/billing/billing"

const INTER = "'Inter', sans-serif"
const RED = "#e91835"

export function CancelModal({ open, onClose, onConfirm }: CancelModalProps) {
  const [step, setStep] = useState<1 | 2>(1)
  const [reason, setReason] = useState("")
  const reasons = [
    "Too expensive",
    "Missing features I need",
    "Switching to another software",
    "Business is closed / on pause",
    "Just testing",
    "Other",
  ]

  const handleClose = () => {
    setStep(1)
    setReason("")
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={step === 1 ? "Cancel Subscription" : "We are sorry to see you go"}
    >
      {step === 1 ? (
        <div className="flex flex-col gap-5">
          <div
            className="flex items-start gap-3 rounded-xl p-4"
            style={{
              border: "1px solid #fde68a",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="mt-0.5 shrink-0"
            >
              <path
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"

                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <p
              style={{
                fontFamily: INTER,
                fontSize: 13,

                lineHeight: "20px",
              }}
            >
              After cancellation your plan reverts to Trial. All your data is
              kept but access to write operations will be restricted if the
              trial has expired.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p
              style={{
                fontFamily: INTER,
                fontWeight: 500,
                fontSize: 14,
                color: colors.textPrimary,
              }}
            >
              Why are you cancelling?
            </p>
            {reasons.map((r) => (
              <label
                key={r}
                className="page-hover flex cursor-pointer items-center gap-3 rounded-xl p-3 transition-colors"
              >
                <input
                  type="radio"
                  name="cancel-reason"
                  value={r}
                  checked={reason === r}
                  onChange={() => setReason(r)}
                  style={{ accentColor: RED, width: 16, height: 16 }}
                />
                <span
                  style={{
                    fontFamily: INTER,
                    fontSize: 13,
                    color: colors.textSecondary,
                  }}
                >
                  {r}
                </span>
              </label>
            ))}
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" size="sm" onClick={handleClose}>
              Keep Subscription
            </Button>
            <Button
              variant="destructive"
              size="sm"
              disabled={!reason}
              onClick={() => setStep(2)}
            >
              Continue
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <p
            style={{
              fontFamily: INTER,
              fontSize: 13,
              color: colors.textSecondary,
              lineHeight: "20px",
            }}
          >
            Your subscription will be cancelled immediately and your account
            will revert to the Trial plan. You can resubscribe any time.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" size="sm" onClick={handleClose}>
              Keep Subscription
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                onConfirm()
                handleClose()
              }}
            >
              Confirm Cancellation
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
