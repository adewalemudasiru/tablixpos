import { AnimatePresence, motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { IconCheck } from "@tabler/icons-react"
import { useBilling } from "../../hooks/useBilling"
import { fmtAmount } from "../../utils/formatting"
import { colors, shadows } from "../ds/tokens"
import type { BillingCycle } from "../../types/billing/billing"
import { PLAN_FEATURES_PRO } from "../../types/billing/billing"

const INTER = "'Inter', sans-serif"
const RED = "#e91835"

interface PlanComparisonProps {
  onSubscribe: () => void
}

export function PlanComparison({ onSubscribe }: PlanComparisonProps) {
  const { isPro, cycle, setCycle, mobilePlanTab, setMobilePlanTab } =
    useBilling()

  const getPrices = () => {
    const raw = localStorage.getItem("tablix_sub_prices")
    if (raw) {
      const p = JSON.parse(raw)
      if (p.monthly && p.yearly) return p
    }
    return { monthly: 50000, yearly: 500000 }
  }

  const prices = getPrices()
  const yearlyMonthlyEquiv = Math.round(prices.yearly / 12)
  const yearlySaving = prices.monthly * 12 - prices.yearly

  return (
    <div
      className="page-card overflow-hidden rounded-2xl border"
      style={{
        border: `1px solid ${colors.borderLight}`,
        boxShadow: shadows.card,
      }}
    >
      <div
        className="page-border border-b px-4 py-3.5"
        style={{ borderColor: colors.borderLight }}
      >
        <div className="flex items-center justify-between gap-3">
          <p
            style={{
              fontFamily: INTER,
              fontWeight: 600,
              fontSize: 14,
              color: colors.textPrimary,
            }}
          >
            Plan Comparison
          </p>
          <div
            className="flex items-center gap-1 rounded-xl p-1"
            style={{ background: "var(--page-surface-2)" }}
          >
            {(["monthly", "yearly"] as BillingCycle[]).map((c) => (
              <button
                key={c}
                onClick={() => setCycle(c)}
                className="relative flex items-center gap-1"
                style={{
                  fontFamily: INTER,
                  fontSize: 12,
                  fontWeight: 500,
                  padding: "5px 10px",
                  borderRadius: 10,
                  color: cycle === c ? RED : colors.textMuted,
                  background:
                    cycle === c ? "var(--page-card-bg)" : "transparent",
                  border:
                    cycle === c
                      ? `1px solid var(--c-primary-dot)`
                      : "1px solid transparent",
                  boxShadow:
                    cycle === c ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {c === "monthly" ? (
                  "Monthly"
                ) : (
                  <>
                    Yearly
                    <span
                      style={{
                        fontSize: 8,
                        fontWeight: 700,
                        background: "#22c55e",
                        color: "white",
                        borderRadius: 999,
                        padding: "1px 5px",
                        marginLeft: 3,
                      }}
                    >
                      -20%
                    </span>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        <div
          className="mt-3 flex overflow-hidden rounded-xl md:hidden"
          style={{ border: `1px solid ${colors.borderMid}` }}
        >
          {(["trial", "pro"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setMobilePlanTab(tab)}
              className="flex flex-1 items-center justify-center gap-2 py-2.5 transition-colors"
              style={{
                fontFamily: INTER,
                fontSize: 13,
                fontWeight: 600,
                background:
                  mobilePlanTab === tab
                    ? tab === "pro"
                      ? RED
                      : colors.textPrimary
                    : "var(--page-surface-2)",
                color: mobilePlanTab === tab ? "white" : colors.textMuted,
                border: "none",
                cursor: "pointer",
              }}
            >
              {tab === "trial" ? "Trial" : "Premium"}
              {tab === "pro" && (
                <span
                  style={{
                    fontSize: 8,
                    fontWeight: 700,
                    background:
                      mobilePlanTab === "pro" ? "rgba(255,255,255,0.25)" : RED,
                    color: "white",
                    borderRadius: 999,
                    padding: "2px 6px",
                  }}
                >
                  REC
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div
        className="hidden grid-cols-2 divide-x md:grid"
        style={{ borderColor: colors.borderLight }}
      >
        <div className="flex flex-col gap-3 p-5">
          <div>
            <p
              style={{
                fontFamily: INTER,
                fontWeight: 700,
                fontSize: 15,
                color: colors.textPrimary,
              }}
            >
              Free
            </p>
            <div className="mt-1 flex items-end gap-0.5">
              <span
                style={{
                  fontFamily: INTER,
                  fontWeight: 800,
                  fontSize: 24,
                  color: colors.textPrimary,
                }}
              >
                ₦0
              </span>
              <span
                style={{
                  fontFamily: INTER,
                  fontSize: 12,
                  color: colors.textMuted,
                  marginBottom: 3,
                }}
              >
                /month
              </span>
            </div>
          </div>
          {[
            "Full access for 7 days",
            "View existing data after expiration",
            "Upgrade anytime to unlock write access",
          ].map((f) => (
            <div key={f} className="flex items-start gap-2">
              <IconCheck size={18} stroke={2} />
              <span
                style={{
                  fontFamily: INTER,
                  fontSize: 12,
                  color: colors.textSecondary,
                  lineHeight: "17px",
                }}
              >
                {f}
              </span>
            </div>
          ))}
        </div>

        <div
          className="relative flex flex-col gap-3 p-5"
          style={{ background: "var(--page-surface)" }}
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span
              style={{
                fontFamily: INTER,
                fontSize: 9,
                fontWeight: 700,
                background: "var(--page-text)",
                color: "var(--page-bg)",
                borderRadius: 999,
                padding: "3px 10px",
                whiteSpace: "nowrap",
                letterSpacing: "0.5px",
              }}
            >
              RECOMMENDED
            </span>
          </div>
          <div>
            <p
              style={{
                fontFamily: INTER,
                fontWeight: 700,
                fontSize: 15,
                color: colors.textPrimary,
              }}
            >
              Premium
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={cycle + "-desk"}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15 }}
                className="mt-1 flex items-end gap-0.5"
              >
                <span
                  style={{
                    fontFamily: INTER,
                    fontWeight: 800,
                    fontSize: 24,
                    color: colors.textPrimary,
                  }}
                >
                  {cycle === "monthly"
                    ? fmtAmount(prices.monthly)
                    : fmtAmount(yearlyMonthlyEquiv)}
                </span>
                <span
                  style={{
                    fontFamily: INTER,
                    fontSize: 12,
                    color: colors.textMuted,
                    marginBottom: 3,
                  }}
                >
                  /month
                </span>
              </motion.div>
            </AnimatePresence>
            {cycle === "yearly" && (
              <p
                style={{
                  fontFamily: INTER,
                  fontSize: 11,
                  color: "var(--c-success)",
                  marginTop: 2,
                }}
              >
                Billed {fmtAmount(prices.yearly)}/yr — save{" "}
                {fmtAmount(yearlySaving)}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2.5">
            {PLAN_FEATURES_PRO.map((f) => (
              <div key={f} className="flex items-start gap-2">
                <IconCheck size={18} stroke={2} color="var(--c-success)" />
                <span
                  style={{
                    fontFamily: INTER,
                    fontSize: 12,
                    color: colors.textSecondary,
                    lineHeight: "17px",
                  }}
                >
                  {f}
                </span>
              </div>
            ))}
          </div>
          {isPro ? (
            <div
              className="mt-auto flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5"
              style={{
                background: "var(--c-success-bg)",
                border: "1px solid var(--c-success-dot)",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="var(--c-success)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
              <span
                style={{
                  fontFamily: INTER,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--c-success)",
                }}
              >
                Active
              </span>
            </div>
          ) : (
            <Button
              variant="destructive"
              onClick={onSubscribe}
              className="mt-auto w-full cursor-pointer rounded-xl py-2.5 text-white transition-opacity hover:opacity-90"
              style={{
                fontFamily: INTER,
                fontSize: 13,
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
              }}
            >
              Subscribe Now
            </Button>
          )}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <AnimatePresence mode="wait">
          {mobilePlanTab === "trial" ? (
            <motion.div
              key="free-mob"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col gap-4 p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    style={{
                      fontFamily: INTER,
                      fontWeight: 700,
                      fontSize: 17,
                      color: colors.textPrimary,
                    }}
                  >
                    7-Day Trial
                  </p>
                  <p
                    style={{
                      fontFamily: INTER,
                      fontSize: 12,
                      color: colors.textMuted,
                      marginTop: 2,
                    }}
                  >
                    Great for getting started
                  </p>
                </div>
                <div className="flex shrink-0 items-end gap-0.5">
                  <span
                    style={{
                      fontFamily: INTER,
                      fontWeight: 800,
                      fontSize: 28,
                      color: colors.textPrimary,
                      lineHeight: "32px",
                    }}
                  >
                    ₦0
                  </span>
                  <span
                    style={{
                      fontFamily: INTER,
                      fontSize: 12,
                      color: colors.textMuted,
                      paddingBottom: 3,
                    }}
                  >
                    /mo
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  "Full access for 7 days",
                  "View existing data after expiration",
                  "Upgrade anytime to unlock write access",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <IconCheck size={18} stroke={2} />
                    <span
                      style={{
                        fontFamily: INTER,
                        fontSize: 13,
                        color: colors.textSecondary,
                      }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="pro-mob"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col gap-4 p-5"
              style={{ background: "var(--page-surface)" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="mb-0.5 flex items-center gap-2">
                    <p
                      style={{
                        fontFamily: INTER,
                        fontWeight: 700,
                        fontSize: 17,
                        color: colors.textPrimary,
                      }}
                    >
                      Pro Plan
                    </p>
                    <span
                      style={{
                        fontFamily: INTER,
                        fontSize: 8,
                        fontWeight: 700,
                        background: RED,
                        color: "white",
                        borderRadius: 999,
                        padding: "2px 7px",
                        letterSpacing: "0.4px",
                      }}
                    >
                      RECOMMENDED
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: INTER,
                      fontSize: 12,
                      color: colors.textMuted,
                    }}
                  >
                    Everything to run your restaurant
                  </p>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cycle + "-mob"}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.14 }}
                    className="flex shrink-0 items-end gap-0.5"
                  >
                    <span
                      style={{
                        fontFamily: INTER,
                        fontWeight: 800,
                        fontSize: 28,
                        color: colors.textPrimary,
                        lineHeight: "32px",
                      }}
                    >
                      {cycle === "monthly"
                        ? fmtAmount(prices.monthly)
                        : fmtAmount(yearlyMonthlyEquiv)}
                    </span>
                    <span
                      style={{
                        fontFamily: INTER,
                        fontSize: 12,
                        color: colors.textMuted,
                        paddingBottom: 3,
                      }}
                    >
                      /mo
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
              {cycle === "yearly" && (
                <div
                  className="flex items-center gap-2 rounded-lg px-3 py-2"
                  style={{
                    background: "var(--c-success-bg)",
                    border: "1px solid var(--c-success-dot)",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"
                      fill="var(--c-success)"
                    />
                  </svg>
                  <p
                    style={{
                      fontFamily: INTER,
                      fontSize: 12,
                      color: "var(--c-success)",
                    }}
                  >
                    Billed {fmtAmount(prices.yearly)}/yr — save{" "}
                    {fmtAmount(yearlySaving)}
                  </p>
                </div>
              )}
              <div className="flex flex-col gap-3">
                {PLAN_FEATURES_PRO.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <IconCheck size={18} stroke={2} color="var(--c-success)" />
                    <span
                      style={{
                        fontFamily: INTER,
                        fontSize: 13,
                        color: colors.textSecondary,
                      }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>
              {isPro ? (
                <div
                  className="flex items-center justify-center gap-2 rounded-xl px-4 py-3"
                  style={{
                    background: "var(--c-success-bg)",
                    border: "1px solid var(--c-success-dot)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="var(--c-success)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span
                    style={{
                      fontFamily: INTER,
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--c-success)",
                    }}
                  >
                    Active Plan
                  </span>
                </div>
              ) : (
                <button
                  onClick={onSubscribe}
                  className="w-full rounded-xl py-3.5 text-white transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{
                    background: RED,
                    fontFamily: INTER,
                    fontSize: 14,
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(233,24,53,0.35)",
                  }}
                >
                  Subscribe Now
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
