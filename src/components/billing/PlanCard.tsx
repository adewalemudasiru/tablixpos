import { checkTrialExpired } from "../../store/AppContext"
import { useBilling } from "../../hooks/useBilling"
import { fmtAmount, fmtDate } from "../../utils/formatting"
import { shadows, colors } from "../ds"

const INTER = "'Inter', sans-serif"
const RED = "#e91835"

interface PlanCardProps {
  onSubscribe: () => void
  onCancel: () => void
}

export function PlanCard({ onSubscribe, onCancel }: PlanCardProps) {
  const { isPro, paymentHistory, businessConfig } = useBilling()

  if (isPro) {
    return (
      <div
        className="page-border relative overflow-hidden rounded-2xl p-5"
        style={{
          background: "var(--page-surface)",
          border: `1px solid var(--page-border-light)`,
          boxShadow: shadows.card,
        }}
      >
        <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full bg-current opacity-[0.03]" />
        <div className="pointer-events-none absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-current opacity-[0.03]" />
        <div className="relative flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span
              style={{
                fontFamily: INTER,
                fontSize: 10,
                fontWeight: 700,
                background: "var(--page-surface-2)",
                color: colors.textSecondary,
                borderRadius: 99,
                padding: "3px 10px",
                letterSpacing: "0.5px",
              }}
            >
              CURRENT PLAN
            </span>
            <span
              style={{
                fontFamily: INTER,
                fontSize: 10,
                fontWeight: 700,
                background: "var(--c-success-bg)",
                color: "var(--c-success)",
                borderRadius: 99,
                padding: "3px 10px",
                letterSpacing: "0.5px",
              }}
            >
              ACTIVE
            </span>
          </div>
          <div className="mt-2 flex items-end justify-between gap-2">
            <div>
              <h2
                style={{
                  fontFamily: INTER,
                  fontWeight: 800,
                  fontSize: 24,
                  color: colors.textPrimary,
                  lineHeight: "28px",
                }}
              >
                Tablix Pro
              </h2>
              <p
                style={{
                  fontFamily: INTER,
                  fontSize: 12,
                  color: colors.textSecondary,
                  marginTop: 4,
                  lineHeight: "18px",
                }}
              >
                All features unlocked — unlimited access
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <div className="flex items-end gap-0.5">
                <span
                  style={{
                    fontFamily: INTER,
                    fontWeight: 800,
                    fontSize: 28,
                    color: colors.textPrimary,
                    lineHeight: "32px",
                  }}
                >
                  {paymentHistory.length > 0
                    ? fmtAmount(paymentHistory[0].amount)
                    : fmtAmount(50000)}
                </span>
                <span
                  style={{
                    fontFamily: INTER,
                    fontSize: 12,
                    color: colors.textMuted,
                    paddingBottom: 4,
                  }}
                >
                  /
                  {paymentHistory.length > 0
                    ? paymentHistory[0].cycle === "yearly"
                      ? "yr"
                      : "mo"
                    : "mo"}
                </span>
              </div>
              {paymentHistory.length > 0 && (
                <div className="mt-1 flex flex-col items-end gap-0.5">
                  <p
                    style={{
                      fontFamily: INTER,
                      fontSize: 10,
                      color: colors.textMuted,
                    }}
                  >
                    Paid {fmtDate(paymentHistory[0].date)}
                  </p>
                  <p
                    style={{
                      fontFamily: INTER,
                      fontSize: 10,
                      fontWeight: 600,
                      color: colors.textSecondary,
                    }}
                  >
                    Next due:{" "}
                    {(() => {
                      const d = new Date(paymentHistory[0].date)
                      if (paymentHistory[0].cycle === "yearly")
                        d.setFullYear(d.getFullYear() + 1)
                      else d.setMonth(d.getMonth() + 1)
                      return fmtDate(d.toISOString())
                    })()}
                  </p>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onCancel}
            style={{
              fontFamily: INTER,
              fontSize: 12,
              fontWeight: 500,
              color: RED,
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              width: "fit-content",
              marginTop: "8px",
            }}
          >
            Cancel subscription
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-5"
      style={{
        background: "var(--page-surface)",
        border: `1px solid var(--page-border-light)`,
        boxShadow: shadows.card,
      }}
    >
      <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full bg-current opacity-[0.03]" />
      <div className="pointer-events-none absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-current opacity-[0.03]" />
      <div className="relative flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span
            style={{
              fontFamily: INTER,
              fontSize: 10,
              fontWeight: 700,
              background: "var(--page-surface-2)",
              color: colors.textSecondary,
              borderRadius: 99,
              padding: "3px 10px",
              letterSpacing: "0.5px",
            }}
          >
            CURRENT PLAN
          </span>
          <span
            style={{
              fontFamily: INTER,
              fontSize: 10,
              fontWeight: 700,
              background: checkTrialExpired(businessConfig.trialStartedAt)
                ? "var(--c-danger-bg)"
                : "var(--page-surface-2)",
              color: checkTrialExpired(businessConfig.trialStartedAt)
                ? "var(--c-danger-text)"
                : colors.textSecondary,
              borderRadius: 99,
              padding: "3px 10px",
              letterSpacing: "0.5px",
            }}
          >
            {checkTrialExpired(businessConfig.trialStartedAt)
              ? "TRIAL EXPIRED"
              : "7-DAY TRIAL"}
          </span>
        </div>
        <div className="mt-2">
          <h2
            style={{
              fontFamily: INTER,
              fontWeight: 800,
              fontSize: 24,
              color: colors.textPrimary,
              lineHeight: "28px",
            }}
          >
            Free Trial
          </h2>
          <p
            style={{
              fontFamily: INTER,
              fontSize: 12,
              color: colors.textSecondary,
              marginTop: 4,
              lineHeight: "18px",
            }}
          >
            {checkTrialExpired(businessConfig.trialStartedAt)
              ? "Your trial has expired. Upgrade to Premium to continue using Tablix."
              : "You have full access to Tablix during your 7-day trial."}
          </p>
        </div>
        <button
          onClick={onSubscribe}
          className="flex w-full items-center justify-center rounded-xl py-3 text-white transition-opacity hover:opacity-90"
          style={{
            background: RED,
            fontFamily: INTER,
            fontWeight: 700,
            fontSize: 14,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(233,24,53,0.5)",
            marginTop: 2,
          }}
        >
          Subscribe to Premium
        </button>
      </div>
    </div>
  )
}
