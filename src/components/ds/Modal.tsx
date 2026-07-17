import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { colors, font, radius, shadows } from "./tokens";
import { Button, ButtonVariant } from "./Button";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ModalSize    = "sm" | "md" | "lg" | "xl";
export type ModalVariant = "default" | "danger" | "success" | "warning" | "info";
export type ModalLayout  = "standard" | "icon-left" | "icon-center";

export interface ModalAction {
  label: string;
  variant?: ButtonVariant;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;

  /** Header */
  title: string;
  subtitle?: string;

  /** Optional leading icon */
  icon?: React.ReactNode;
  iconBg?: string;

  /**
   * standard   – header strip + close ✕, icon (if any) sits in header left
   * icon-left  – icon left column, content right (classic alert layout)
   * icon-center – centered icon above title (feature announcement style)
   */
  layout?: ModalLayout;

  /** sm=400  md=480  lg=600  xl=720 */
  size?: ModalSize;

  /** Controls */
  showClose?: boolean;
  closeOnBackdrop?: boolean;

  /** Footer buttons (rendered in DS Button) */
  actions?: ModalAction[];

  /** Arbitrary body content */
  children?: React.ReactNode;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SIZE_MAP: Record<ModalSize, string> = {
  sm: "400px",
  md: "480px",
  lg: "600px",
  xl: "720px",
};

const VARIANT_COLORS: Record<ModalVariant, { ring: string; icon: string }> = {
  default: { ring: colors.primaryLight,  icon: colors.primary  },
  danger:  { ring: "#fee4e2",            icon: "#d92d20"       },
  success: { ring: "#dcfce7",            icon: "#059669"       },
  warning: { ring: "#fef3c7",            icon: "#d97706"       },
  info:    { ring: "#dbeafe",            icon: "#2563eb"       },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      aria-label="Close"
      className="shrink-0 size-8 flex items-center justify-center rounded-lg transition-colors hover:bg-gray-100 active:bg-gray-200"
      style={{ color: colors.textMuted }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
}

function IconBadge({ icon, iconBg }: { icon: React.ReactNode; iconBg: string }) {
  return (
    <div
      className="relative shrink-0 flex items-center justify-center"
      style={{ width: 48, height: 48, borderRadius: 28, background: iconBg }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          inset: -6,
          border: `6px solid ${iconBg}`,
          borderRadius: 34,
          opacity: 0.35,
        }}
      />
      <div className="size-[22px] flex items-center justify-center">{icon}</div>
    </div>
  );
}

// ─── Divider ─────────────────────────────────────────────────────────────────

function ModalDivider() {
  return <div style={{ borderTop: `1px solid ${colors.borderLight}`, margin: 0 }} />;
}

// ─── Modal ───────────────────────────────────────────────────────────────────

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
  const dialogRef = useRef<HTMLDivElement>(null);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  /* Body scroll lock */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* ── Standard layout (top header bar + dividers) ───────── */
  const renderStandard = () => (
    <div className="flex flex-col max-h-[90vh]">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 px-6 py-5 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
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
        <div className="flex-1 overflow-y-auto px-6 py-5 min-h-0">
          {children}
        </div>
      )}

      {/* Footer */}
      {actions.length > 0 && (
        <>
          <ModalDivider />
          <div className="flex items-center justify-end gap-3 px-6 py-4 shrink-0">
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
  );

  /* ── Icon-left layout (alert / confirmation style) ─────── */
  const renderIconLeft = () => (
    <div className="flex gap-5 p-6">
      {icon && <IconBadge icon={icon} iconBg={iconBg} />}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
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
  );

  /* ── Icon-center layout (feature announcement / success) ─ */
  const renderIconCenter = () => (
    <div className="flex flex-col max-h-[90vh]">
      {/* Close row */}
      {showClose && (
        <div className="flex justify-end px-5 pt-5 shrink-0">
          <CloseButton onClose={onClose} />
        </div>
      )}

      {/* Centered icon + heading */}
      <div className="flex flex-col items-center text-center gap-3 px-8 pt-4 pb-2 shrink-0">
        {icon && (
          <div
            className="flex items-center justify-center"
            style={{ width: 56, height: 56, borderRadius: 16, background: iconBg }}
          >
            <div className="size-7 flex items-center justify-center">{icon}</div>
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
        <div className="flex-1 overflow-y-auto px-8 py-4 min-h-0">
          {children}
        </div>
      )}

      {/* Footer */}
      {actions.length > 0 && (
        <div className="px-8 pb-8 pt-2 flex gap-3 shrink-0">
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
  );

  const content =
    layout === "icon-left"   ? renderIconLeft()   :
    layout === "icon-center" ? renderIconCenter() :
    renderStandard();

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
          <div className="md:hidden fixed inset-0 z-[9999] flex items-end pointer-events-none">
            <motion.div
              ref={dialogRef}
              className="page-card w-full pointer-events-auto relative overflow-hidden"
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
              <div className="flex justify-center pt-3 pb-0 shrink-0">
                <div className="w-10 h-1 rounded-full bg-gray-200" />
              </div>
              {content}
            </motion.div>
          </div>

          {/* ── Desktop: centered dialog ── */}
          <div className="hidden md:flex fixed inset-0 z-[9999] items-center justify-center p-4 pointer-events-none">
            <motion.div
              className="page-card w-full pointer-events-auto relative overflow-hidden"
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
  );
}

// ─── Confirm dialog shorthand ──────────────────────────────────────────────────

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ModalVariant;
  loading?: boolean;
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel  = "Cancel",
  variant      = "danger",
  loading      = false,
}: ConfirmModalProps) {
  const vc = VARIANT_COLORS[variant];

  const icons: Record<ModalVariant, React.ReactNode> = {
    danger: (
      <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
        <path d="M11 7V11M11 15H11.01M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
          stroke={vc.icon} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
    warning: (
      <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
        <path d="M11 8V12M11 16H11.01M9.27 3L1.27 17C0.92 17.63 1.39 18.5 2.11 18.5H19.89C20.61 18.5 21.08 17.63 20.73 17L12.73 3C12.38 2.37 11.62 2.37 11.27 3H9.27Z"
          stroke={vc.icon} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
    success: (
      <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
        <path d="M20 6L9 17L4 12" stroke={vc.icon} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
    info: (
      <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
        <path d="M11 7V11M11 15H11.01M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
          stroke={vc.icon} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
    default: (
      <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
        <path d="M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
          stroke={vc.icon} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
  };

  const buttonVariant: ButtonVariant =
    variant === "danger"  ? "danger"  :
    variant === "success" ? "primary" :
    "primary";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      subtitle={description}
      icon={icons[variant]}
      iconBg={vc.ring}
      layout="icon-left"
      size="sm"
      showClose={false}
      actions={[
        { label: cancelLabel,  variant: "outline",      onClick: onClose    },
        { label: confirmLabel, variant: buttonVariant,  onClick: onConfirm, loading },
      ]}
    />
  );
}