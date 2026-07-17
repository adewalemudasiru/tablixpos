import React, { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "motion/react"
import { colors, font, radius, shadows } from "../ds/tokens"
import { Button } from "../ds/Button"
import type { ButtonVariant } from "../ds/Button"
import { IconBadge } from "../icons/IconBadge"
import { IconX } from "@tabler/icons-react"
import { ModalDivider } from "../ds/ModalDeivider"
import { CloseButton } from "../icons/CloseButton"

// ─── Types ────────────────────────────────────────────────────────────────────

export type ModalSize = "sm" | "md" | "lg" | "xl"
export type ModalVariant = "default" | "danger" | "success" | "warning" | "info"
export type ModalLayout = "standard" | "icon-left" | "icon-center"

export interface ModalAction {
  label: string
  variant?: ButtonVariant
  onClick: () => void
  loading?: boolean
  disabled?: boolean
}

export interface ModalProps {
  open: boolean
  onClose: () => void

  /** Header */
  title: string
  subtitle?: string

  /** Optional leading icon */
  icon?: React.ReactNode
  iconBg?: string

  /**
   * standard   – header strip + close ✕, icon (if any) sits in header left
   * icon-left  – icon left column, content right (classic alert layout)
   * icon-center – centered icon above title (feature announcement style)
   */
  layout?: ModalLayout

  /** sm=400  md=480  lg=600  xl=720 */
  size?: ModalSize

  /** Controls */
  showClose?: boolean
  closeOnBackdrop?: boolean

  /** Footer buttons (rendered in DS Button) */
  actions?: ModalAction[]

  /** Arbitrary body content */
  children?: React.ReactNode
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SIZE_MAP: Record<ModalSize, string> = {
  sm: "400px",
  md: "480px",
  lg: "600px",
  xl: "720px",
}
export function Modal({
  open,
  onClose,
  title,
  subtitle,
  icon,
  iconBg = colors.primaryLight,
  layout = "standard",
  size = "md",
  showClose = true,
  closeOnBackdrop = true,
  actions = [],
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  /* Close on Escape */
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, onClose])

  /* Body scroll lock */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  /* ── Standard layout (top header bar + dividers) ───────── */
  const renderStandard = () => (
    <div className="flex max-h-[90vh] flex-col">
      {/* Header */}
      <div className="flex shrink-0 items-start justify-between gap-4 px-6 py-5">
        <div className="flex min-w-0 items-center gap-3">
          {icon && <IconBadge icon={icon} iconBg={iconBg} />}
          <div className="min-w-0">
            <p
              className="truncate"
              style={{
                fontFamily: font.family,
                fontWeight: font.weight.semibold,
                fontSize: font.size["2xl"],
                color: colors.textPrimary,
                lineHeight: "28px",
              }}
            >
              {title}
            </p>
            {subtitle && (
              <p
                style={{
                  fontFamily: font.family,
                  fontSize: font.size.sm,
                  color: colors.textMuted,
                  marginTop: 2,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {showClose && <CloseButton onClose={onClose} />}
      </div>

      <ModalDivider />

      {/* Body */}
      {children && (
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>
      )}

      {/* Footer */}
      {actions.length > 0 && (
        <>
          <ModalDivider />
          <div className="flex shrink-0 items-center justify-end gap-3 px-6 py-4">
            {actions.map((a) => (
              <Button
                key={a.label}
                variant={a.variant ?? "primary"}
                size="md"
                loading={a.loading}
                disabled={a.disabled}
                onClick={a.onClick}
              >
                {a.label}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  )

  /* ── Icon-left layout (alert / confirmation style) ─────── */
  const renderIconLeft = () => (
    <div className="flex gap-5 p-6">
      {icon && <IconBadge icon={icon} iconBg={iconBg} />}
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p
              style={{
                fontFamily: font.family,
                fontWeight: font.weight.semibold,
                fontSize: font.size["2xl"],
                color: colors.textPrimary,
                lineHeight: "28px",
              }}
            >
              {title}
            </p>
            {subtitle && (
              <p
                style={{
                  fontFamily: font.family,
                  fontSize: font.size.md,
                  color: colors.textMuted,
                  marginTop: 4,
                  lineHeight: "20px",
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
          {showClose && <CloseButton onClose={onClose} />}
        </div>

        {children}

        {actions.length > 0 && (
          <div className="flex gap-3">
            {actions.map((a) => (
              <Button
                key={a.label}
                variant={a.variant ?? "primary"}
                size="lg"
                fullWidth
                loading={a.loading}
                disabled={a.disabled}
                onClick={a.onClick}
              >
                {a.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  /* ── Icon-center layout (feature announcement / success) ─ */
  const renderIconCenter = () => (
    <div className="flex max-h-[90vh] flex-col">
      {/* Close row */}
      {showClose && (
        <div className="flex shrink-0 justify-end px-5 pt-5">
          <CloseButton onClose={onClose} />
        </div>
      )}

      {/* Centered icon + heading */}
      <div className="flex shrink-0 flex-col items-center gap-3 px-8 pt-4 pb-2 text-center">
        {icon && (
          <div
            className="flex items-center justify-center"
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: iconBg,
            }}
          >
            <div className="flex size-7 items-center justify-center">
              {icon}
            </div>
          </div>
        )}
        <div>
          <p
            style={{
              fontFamily: font.family,
              fontWeight: font.weight.semibold,
              fontSize: font.size["3xl"],
              color: colors.textPrimary,
            }}
          >
            {title}
          </p>
          {subtitle && (
            <p
              style={{
                fontFamily: font.family,
                fontSize: font.size.md,
                color: colors.textMuted,
                marginTop: 6,
                lineHeight: "22px",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      {children && (
        <div className="min-h-0 flex-1 overflow-y-auto px-8 py-4">
          {children}
        </div>
      )}

      {/* Footer */}
      {actions.length > 0 && (
        <div className="flex shrink-0 gap-3 px-8 pt-2 pb-8">
          {actions.map((a) => (
            <Button
              key={a.label}
              variant={a.variant ?? "primary"}
              size="lg"
              fullWidth
              loading={a.loading}
              disabled={a.disabled}
              onClick={a.onClick}
            >
              {a.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  )

  const content =
    layout === "icon-left"
      ? renderIconLeft()
      : layout === "icon-center"
        ? renderIconCenter()
        : renderStandard()

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[9998] bg-black/40"
            style={{ backdropFilter: "blur(3px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={closeOnBackdrop ? onClose : undefined}
          />

          {/* ── Mobile: bottom sheet ── */}
          <div className="pointer-events-none fixed inset-0 z-[9999] flex items-end md:hidden">
            <motion.div
              ref={dialogRef}
              className="page-card pointer-events-auto relative w-full overflow-hidden"
              style={{
                borderRadius: "20px 20px 0 0",
                maxHeight: "92vh",
                boxShadow: "0 -8px 40px rgba(0,0,0,0.18)",
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 340 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag handle */}
              <div className="flex shrink-0 justify-center pt-3 pb-0">
                <div className="h-1 w-10 rounded-full bg-gray-200" />
              </div>
              {content}
            </motion.div>
          </div>

          {/* ── Desktop: centered dialog ── */}
          <div className="pointer-events-none fixed inset-0 z-[9999] hidden items-center justify-center p-4 md:flex">
            <motion.div
              className="page-card pointer-events-auto relative w-full overflow-hidden"
              style={{
                maxWidth: SIZE_MAP[size],
                borderRadius: radius.lg,
                boxShadow: shadows.modal,
              }}
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ type: "spring", damping: 28, stiffness: 380 }}
              onClick={(e) => e.stopPropagation()}
            >
              {content}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
