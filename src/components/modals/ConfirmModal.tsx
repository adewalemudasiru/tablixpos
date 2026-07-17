import { colors } from "../ds"
import type { ButtonVariant } from "../ds/Button"
import { Modal, type ModalVariant } from "./Modal"

interface ConfirmModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: ModalVariant
  loading?: boolean
}

const VARIANT_COLORS: Record<ModalVariant, { ring: string; icon: string }> = {
  default: { ring: colors.primaryLight, icon: colors.primary },
  danger: { ring: "#fee4e2", icon: "#d92d20" },
  success: { ring: "#dcfce7", icon: "#059669" },
  warning: { ring: "#fef3c7", icon: "#d97706" },
  info: { ring: "#dbeafe", icon: "#2563eb" },
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  loading = false,
}: ConfirmModalProps) {
  const vc = VARIANT_COLORS[variant]

  const icons: Record<ModalVariant, React.ReactNode> = {
    danger: (
      <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
        <path
          d="M11 7V11M11 15H11.01M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
          stroke={vc.icon}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ),
    warning: (
      <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
        <path
          d="M11 8V12M11 16H11.01M9.27 3L1.27 17C0.92 17.63 1.39 18.5 2.11 18.5H19.89C20.61 18.5 21.08 17.63 20.73 17L12.73 3C12.38 2.37 11.62 2.37 11.27 3H9.27Z"
          stroke={vc.icon}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ),
    success: (
      <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
        <path
          d="M20 6L9 17L4 12"
          stroke={vc.icon}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ),
    info: (
      <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
        <path
          d="M11 7V11M11 15H11.01M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
          stroke={vc.icon}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ),
    default: (
      <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
        <path
          d="M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
          stroke={vc.icon}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ),
  }

  const buttonVariant: ButtonVariant =
    variant === "danger"
      ? "danger"
      : variant === "success"
        ? "primary"
        : "primary"

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
        { label: cancelLabel, variant: "outline", onClick: onClose },
        {
          label: confirmLabel,
          variant: buttonVariant,
          onClick: onConfirm,
          loading,
        },
      ]}
    />
  )
}
