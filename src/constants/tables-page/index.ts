import type { BadgeVariant } from "@/components/ds/Badge"
import { colors } from "@/components/ds/tokens"
import type { TableStatus } from "../../store/AppContext"

export const NGN = "\u20a6"

type StatusCfg = {
  label: string
  badgeVariant: BadgeVariant
  bg: string
  accent: string
  text: string
}

export const STATUS_CFG: Record<TableStatus, StatusCfg> = {
  available: {
    label: "Available",
    badgeVariant: "success",
    bg: colors.successBg,
    accent: colors.successDot,
    text: colors.successText,
  },
  occupied: {
    label: "Occupied",
    badgeVariant: "danger",
    bg: colors.dangerBg,
    accent: colors.dangerDot,
    text: colors.dangerText,
  },
  reserved: {
    label: "Reserved",
    badgeVariant: "info",
    bg: colors.infoBg,
    accent: colors.infoDot,
    text: colors.infoText,
  },
  bill_requested: {
    label: "Bill Requested",
    badgeVariant: "warning",
    bg: colors.warningBg,
    accent: colors.warningDot,
    text: colors.warningText,
  },
}
