import { motion } from "motion/react"

const INTER = "'Inter', sans-serif"

export function AuthInfoModal({
  type,
  onClose,
}: {
  type: "privacy" | "terms"
  onClose: () => void
}) {
  const isPrivacy = type === "privacy"
  const title = isPrivacy ? "Privacy Policy" : "Terms of Service"

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal content box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="relative z-10 flex max-h-[85vh] w-full max-w-[560px] flex-col overflow-hidden rounded-2xl border border-[var(--page-border)] bg-[var(--page-bg)] shadow-2xl"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--page-border)] px-6 py-4">
          <h3
            style={{
              fontFamily: INTER,
              fontWeight: 800,
              fontSize: 18,
              color: "var(--page-text)",
            }}
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div
          className="flex flex-col gap-4 overflow-y-auto px-6 py-5 text-[14px] leading-[22px] text-[var(--page-text-muted)]"
          style={{ fontFamily: INTER }}
        >
          {isPrivacy ? (
            <>
              <p className="font-semibold text-gray-900">
                1. Information We Collect
              </p>
              <p>
                We collect information to provide better POS services to our
                business owners. This includes your business name, owner name,
                email, phone number, and location details (state and city).
              </p>

              <p className="font-semibold text-gray-900">
                2. How We Use Information
              </p>
              <p>
                We use the information we collect to manage your Tablix account,
                facilitate transaction processing, log business operations (such
                as inventory, staff logins, and sales), and provide customer
                support.
              </p>

              <p className="font-semibold text-gray-900">
                3. Data Integrity & Security
              </p>
              <p>
                Your POS data (sales records, inventory, staff data) is stored
                securely. We take appropriate measures, including encryption and
                strict authentication controls, to protect your business
                information from unauthorized access.
              </p>

              <p className="font-semibold text-gray-900">
                4. Third-Party Services
              </p>
              <p>
                Our platform integrates with payment gateways (such as Paystack)
                for subscription management. These services are subject to their
                own respective privacy policies.
              </p>

              <p className="font-semibold text-gray-900">
                5. Updates to This Policy
              </p>
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our business practices or POS service enhancements.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-gray-900">
                1. Acceptable Use of Tablix POS
              </p>
              <p>
                Tablix POS provides sales, inventory, and restaurant management
                tools. You agree to use our software solely for lawful
                commercial operations and maintain strict confidentiality of
                your access PINs.
              </p>

              <p className="font-semibold text-gray-900">
                2. Account Registration
              </p>
              <p>
                You must provide accurate and complete information during
                registration. You are responsible for all activity logging and
                POS transactions occurring under your Tablix business account.
              </p>

              <p className="font-semibold text-gray-900">
                3. Software Availability & Latency
              </p>
              <p>
                While we strive to provide uninterrupted service with low
                latency, service disruptions may occur. Tablix is provided "as
                is" and "as available". We do not guarantee continuous uptime.
              </p>

              <p className="font-semibold text-gray-900">
                4. Limitation of Liability
              </p>
              <p>
                In no event shall Tablix POS or its team be liable for any loss
                of sales, profits, data, or business opportunities arising from
                the use or inability to use the system.
              </p>

              <p className="font-semibold text-gray-900">5. Termination</p>
              <p>
                We reserve the right to suspend or terminate your account access
                if any terms are breached or for any fraudulent transaction
                activity detected on the terminal.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex shrink-0 justify-end border-t border-[var(--page-border)] bg-gray-50 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-xl bg-[#e91835] px-4 py-2 text-[14px] font-semibold text-white shadow-sm transition-colors hover:bg-[#d01530] focus:outline-none"
            style={{ fontFamily: INTER }}
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  )
}
