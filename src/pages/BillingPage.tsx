import { useState } from "react"
import { LogoutConfirmationModal } from "../components/LogoutConfirmationModal"
import { AppSidebar, MobileBottomNav } from "../components/AppSidebar"
import { NavMenu } from "../components/NavMenu"
import { colors } from "../components/ds"
import { Button } from "@/components/ui/button"
import { Toaster } from "sonner"
import { PlanCard } from "../components/billing/PlanCard"
import { PlanComparison } from "../components/billing/PlanComparison"
import { PaymentHistory } from "../components/billing/PaymentHistory"
import { SubscribeModal } from "../components/billing/SubscribeModal"
import { CancelModal } from "../components/billing/CancelModal"
import { useBilling } from "../hooks/useBilling"
import { AppLogo } from "@/components/AppLogo"

const INTER = "'Inter', sans-serif"

export default function BillingPage() {
  const {
    isPro,
    showCancel,
    setShowCancel,
    showSubscribe,
    setShowSubscribe,
    cycle,
    handlePaymentSuccess,
    handleCancel,
  } = useBilling()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogout, setShowLogout] = useState(false)

  return (
    <div className="page-bg flex h-screen flex-col overflow-hidden text-foreground">
      <Toaster position="top-center" richColors />

      {/* Header */}
      <header className="page-header z-30 flex h-[69px] shrink-0 items-center justify-between border-b px-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)] md:px-6">
        <div className="flex items-center gap-3">
          <AppLogo />
          <NavMenu />
        </div>
        {isPro && (
          <div className="hidden items-center gap-2 md:flex">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCancel(true)}
            >
              Manage Subscription
            </Button>
          </div>
        )}
        <div className="absolute top-1/2 right-4 -translate-y-1/2 md:hidden">
          {isPro && (
            <button
              onClick={() => setShowCancel(true)}
              style={{
                fontFamily: INTER,
                fontSize: 11,
                fontWeight: 600,
                color: "#e91835",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Manage
            </button>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="page-border flex min-h-0 flex-1 overflow-hidden border-t">
        <AppSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={() => setShowLogout(true)}
          activeId="billing"
        />

        <main className="page-surface flex-1 overflow-y-auto pb-[80px] md:pb-6">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 md:gap-6">
            {/* Desktop heading */}
            <div className="hidden px-6 pt-8 md:block">
              <h1
                style={{
                  fontFamily: INTER,
                  fontWeight: 600,
                  fontSize: 18,
                  color: "var(--page-text)",
                }}
              >
                Billing & Subscription
              </h1>
              <p
                style={{
                  fontFamily: INTER,
                  fontWeight: 400,
                  fontSize: 14,
                  color: "var(--page-text-muted)",
                  marginTop: 4,
                }}
              >
                Manage your Tablix plan, billing cycle, and invoices
              </p>
            </div>

            {/* Current Plan Card */}
            <div className="px-4 pt-4 md:px-6 md:pt-0">
              <PlanCard
                onSubscribe={() => setShowSubscribe(true)}
                onCancel={() => setShowCancel(true)}
              />
            </div>

            {/* Plan Comparison */}
            <div className="px-4 md:px-6">
              <PlanComparison onSubscribe={() => setShowSubscribe(true)} />
            </div>

            {/* Payment History */}
            <div className="px-4 md:px-6">
              <PaymentHistory />
            </div>

            {/* Security badge */}
            <div className="flex items-center justify-center gap-2 pb-4 opacity-40">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                  stroke={colors.textMuted}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span
                style={{
                  fontFamily: INTER,
                  fontSize: 10,
                  color: colors.textMuted,
                }}
              >
                256-bit SSL • Secured by Paystack • No card details stored
                locally
              </span>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <CancelModal
        open={showCancel}
        onClose={() => setShowCancel(false)}
        onConfirm={handleCancel}
      />
      <SubscribeModal
        open={showSubscribe}
        cycle={cycle}
        onClose={() => setShowSubscribe(false)}
        onSuccess={handlePaymentSuccess}
      />

      <MobileBottomNav
        activeId="billing"
        onLogout={() => setShowLogout(true)}
      />
      <LogoutConfirmationModal
        isOpen={showLogout}
        onConfirm={() => setShowLogout(false)}
        onCancel={() => setShowLogout(false)}
      />
    </div>
  )
}
