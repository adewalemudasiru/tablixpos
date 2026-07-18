import { useState } from "react"
import { AnimatePresence } from "motion/react"
import { MobileSignup } from "@/components/sign-up/MobileSignup"
import { DesktopSignup } from "@/components/sign-up/DesktopSignup"
import { AuthInfoModal } from "@/components/sign-up/AuthInfoModal"

// ── Page entry point ──────────────────────────────────────────────────────────
export default function SignupPage() {
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(
    null
  )

  return (
    <>
      {/* Mobile layout (< lg) */}
      <div className="block h-screen lg:hidden">
        <MobileSignup onOpenModal={setActiveModal} />
      </div>
      {/* Desktop layout (>= lg) */}
      <div className="hidden lg:block">
        <DesktopSignup onOpenModal={setActiveModal} />
      </div>

      <AnimatePresence>
        {activeModal && (
          <AuthInfoModal
            type={activeModal}
            onClose={() => setActiveModal(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
