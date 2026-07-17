import { useState, useEffect, useCallback } from "react"
import { Modal, Input, colors } from "../ds"
import { toast } from "sonner"
import { IconCheck } from "@tabler/icons-react"
import { PaystackLogo } from "./icons/PaystackLogo"
import {
  loadPaystackScript,
  generateRef,
  loadPaymentHistory,
  formatInvoiceNo,
} from "../../services/paystack"
import { subscriptionAPI } from "../../services/api"
import type { SubscribeModalProps } from "../../types/billing/billing"
import { PLAN_FEATURES_PRO } from "../../types/billing/billing"

const INTER = "'Inter', sans-serif"
const RED = "#e91835"

export function SubscribeModal({
  open,
  cycle,
  onClose,
  onSuccess,
}: SubscribeModalProps) {
  const [email, setEmail] = useState(() => {
    try {
      return localStorage.getItem("tablix_owner_email") ?? ""
    } catch (_) {
      return ""
    }
  })
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState("")

  useEffect(() => {
    if (!open) return
    loadPaystackScript()
  }, [open])

  const getPrices = () => {
    try {
      const raw = localStorage.getItem("tablix_sub_prices")
      if (raw) {
        const p = JSON.parse(raw)
        if (p.monthly && p.yearly) return p
      }
    } catch (_) {}
    return { monthly: 50000, yearly: 500000 }
  }

  const prices = getPrices()
  const amount = prices[cycle]
  const yearlyMonthlyEquiv = Math.round(prices.yearly / 12)
  const yearlySaving = prices.monthly * 12 - prices.yearly

  function validateEmail(val: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
  }

  function fmtAmount(n: number) {
    return `₦${n.toLocaleString()}`
  }

  const handlePay = useCallback(async () => {
    if (!email.trim()) {
      setEmailError("Please enter your email address")
      return
    }
    if (!validateEmail(email.trim())) {
      setEmailError("Please enter a valid email")
      return
    }
    setEmailError("")

    setLoading(true)
    const ref = generateRef()

    try {
      await subscriptionAPI.verify({ reference: ref, cycle })
      const record = {
        invoiceNo: formatInvoiceNo(loadPaymentHistory().length),
        reference: ref,
        date: new Date().toISOString(),
        amount,
        cycle,
        status: "Paid",
      }
      onSuccess(record)
      onClose()
      toast.success(
        "Subscription upgraded successfully! (Offline Simulated Payment)"
      )
    } catch (err: any) {
      const message =
        err?.data?.message ??
        err?.message ??
        "Payment verification failed. Please contact support."
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }, [email, cycle, amount, onSuccess, onClose])

  return (
    <Modal open={open} onClose={onClose} title="Upgrade to Tablix Pro">
      <div className="flex flex-col gap-5">
        <div
          className="rounded-xl p-4"
          style={{
            background: colors.primaryLight,
            border: `1px solid ${colors.primaryMid}`,
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                style={{
                  fontFamily: INTER,
                  fontSize: 13,
                  color: RED,
                  fontWeight: 600,
                }}
              >
                Tablix Pro — {cycle === "monthly" ? "Monthly" : "Yearly"}
              </p>
              {cycle === "yearly" && (
                <p
                  style={{
                    fontFamily: INTER,
                    fontSize: 11,
                    color: RED,
                    marginTop: 2,
                  }}
                >
                  That is {fmtAmount(yearlyMonthlyEquiv)}/month — save{" "}
                  {fmtAmount(yearlySaving)} vs monthly
                </p>
              )}
            </div>
            <span
              style={{
                fontFamily: INTER,
                fontSize: 22,
                fontWeight: 800,
                color: RED,
              }}
            >
              {cycle === "yearly"
                ? `${fmtAmount(prices.yearly)}/yr`
                : `${fmtAmount(prices.monthly)}/mo`}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            style={{
              fontFamily: INTER,
              fontSize: 12,
              fontWeight: 600,
              color: colors.textPrimary,
            }}
          >
            Billing Email
          </label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setEmailError("")
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handlePay()
            }}
          />
          {emailError && (
            <p
              style={{
                fontFamily: INTER,
                fontSize: 11,
                color: colors.dangerText,
              }}
            >
              {emailError}
            </p>
          )}
          <p
            style={{ fontFamily: INTER, fontSize: 11, color: colors.textMuted }}
          >
            A receipt will be sent here after payment.
          </p>
        </div>

        <div
          className="flex flex-col gap-2 rounded-xl p-4"
          style={{
            background: "var(--page-surface-2)",
            border: `1px solid ${colors.borderLight}`,
          }}
        >
          <p
            style={{
              fontFamily: INTER,
              fontSize: 12,
              fontWeight: 600,
              color: colors.textPrimary,
              marginBottom: 4,
            }}
          >
            What you get:
          </p>
          {PLAN_FEATURES_PRO.slice(0, 5).map((f) => (
            <div key={f} className="flex items-center gap-2">
              <IconCheck size={18} stroke={2} />
              <span
                style={{
                  fontFamily: INTER,
                  fontSize: 12,
                  color: colors.textSecondary,
                }}
              >
                {f}
              </span>
            </div>
          ))}
          <p
            style={{
              fontFamily: INTER,
              fontSize: 11,
              color: colors.textMuted,
              marginTop: 2,
            }}
          >
            + {PLAN_FEATURES_PRO.length - 5} more features
          </p>
        </div>

        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2.5"
          style={{
            background: "var(--c-success-bg)",
            border: "1px solid var(--c-success-dot)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              stroke="var(--c-success)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p
            style={{
              fontFamily: INTER,
              fontSize: 11,
              color: "var(--c-success)",
            }}
          >
            Payments are secured by Paystack with 256-bit SSL encryption
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handlePay}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-xl py-3 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              background: "#00c3f7",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? (
              <div className="size-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span
                  style={{
                    fontFamily: INTER,
                    fontSize: 14,
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  Pay{" "}
                  {cycle === "yearly"
                    ? fmtAmount(prices.yearly)
                    : fmtAmount(prices.monthly)}{" "}
                  with Paystack
                </span>
              </>
            )}
          </button>
          <button
            onClick={onClose}
            style={{
              fontFamily: INTER,
              fontSize: 13,
              color: colors.textMuted,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px 0",
            }}
          >
            Cancel
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 opacity-60">
          <span
            style={{ fontFamily: INTER, fontSize: 10, color: colors.textMuted }}
          >
            Powered by
          </span>
          <PaystackLogo />
        </div>
      </div>
    </Modal>
  )
}
