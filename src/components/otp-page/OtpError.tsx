import { motion, AnimatePresence } from "motion/react"

const INTER = "'Inter', sans-serif"

interface OtpErrorProps {
  message: string
}

export function OtpError({ message }: OtpErrorProps) {
  if (!message) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="flex w-full items-center gap-2 rounded-xl border border-[var(--c-danger-text)]/20 bg-[var(--c-danger-bg)] p-3"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          className="shrink-0"
        >
          <path
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke="var(--c-danger-text)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <p
          style={{
            fontFamily: INTER,
            fontSize: 12,
            color: "var(--c-danger-text)",
            fontWeight: 500,
          }}
        >
          {message}
        </p>
      </motion.div>
    </AnimatePresence>
  )
}
