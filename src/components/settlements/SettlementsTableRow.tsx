import { Badge } from "../ds/Badge"
import { colors } from "../ds/tokens"
import { TimelineDot } from "./TimelineDot"
import { fmtAmt, fmtDate, fmtTime } from "../../utils/settlements-helpers"
import {
  getStatusColor,
  getStatusBadgeVariant,
  getStatusLabel,
} from "../../utils/settlements-helpers"
import type { SettlementRowProps } from "../../types/settlements/settlements"

export function SettlementsTableRow({
  tx,
  isDark = false,
  onClick,
}: SettlementRowProps) {
  const accent = getStatusColor(tx.status as "voided" | "refunded")

  return (
    <div
      className={`cursor-pointer px-5 py-4 transition-colors ${isDark ? "hover:bg-white/5" : "hover:bg-gray-50"}`}
      style={{
        borderBottom: "1px solid var(--page-border)",
      }}
      onClick={() => onClick(tx)}
    >
      {/* Desktop row */}
      <div className="hidden grid-cols-[2fr_1fr_1.5fr_1.5fr_1.5fr_1fr_0.8fr] items-center gap-4 md:grid">
        {/* Transaction */}
        <div className="flex items-center gap-2.5">
          <TimelineDot type={tx.status as "voided" | "refunded"} />
          <div>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: colors.infoText,
              }}
            >
              {tx.id}
            </p>
            <p
              style={{
                fontSize: 11,
                color: colors.textMuted,
                marginTop: 1,
              }}
            >
              {tx.customer?.name || "Walk-in"} · {tx.paymentMethod}
            </p>
          </div>
        </div>

        {/* Type */}
        <Badge
          variant={getStatusBadgeVariant(tx.status as "voided" | "refunded")}
        >
          {getStatusLabel(tx.status as "voided" | "refunded")}
        </Badge>

        {/* Original sale */}
        <div>
          <p
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: colors.textPrimary,
            }}
          >
            {fmtDate(tx.timestamp)}
          </p>
          <p style={{ fontSize: 11, color: colors.textMuted }}>
            {fmtTime(tx.timestamp)}
          </p>
        </div>

        {/* Adjusted on */}
        <div>
          {tx.voidedAt ? (
            <>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: colors.textPrimary,
                }}
              >
                {fmtDate(tx.voidedAt)}
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: colors.textMuted,
                }}
              >
                {fmtTime(tx.voidedAt)}
              </p>
            </>
          ) : (
            <p style={{ fontSize: 12, color: colors.textMuted }}>—</p>
          )}
        </div>

        {/* Cashier */}
        <div className="flex items-center gap-2">
          <span
            className="flex size-6 shrink-0 items-center justify-center rounded-full"
            style={{
              background: "var(--c-primary-light)",
              fontSize: 10,
              fontWeight: 700,
              color: colors.primary,
            }}
          >
            {(tx.cashier ?? "S").charAt(0).toUpperCase()}
          </span>
          <span style={{ fontSize: 12, color: colors.textSecondary }}>
            {tx.cashier || "Staff"}
          </span>
        </div>

        {/* Approved by */}
        {tx.voidedBy ? (
          <div className="flex items-center gap-2">
            <span
              className="flex size-6 shrink-0 items-center justify-center rounded-full"
              style={{
                background: "#7c3aed20",
                fontSize: 10,
                fontWeight: 700,
                color: "#7c3aed",
              }}
            >
              {tx.voidedBy.charAt(0).toUpperCase()}
            </span>
            <span style={{ fontSize: 12, color: colors.textSecondary }}>
              {tx.voidedBy}
            </span>
          </div>
        ) : (
          <span style={{ fontSize: 12, color: colors.textMuted }}>—</span>
        )}

        {/* Amount */}
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: accent,
          }}
        >
          {fmtAmt(tx.total)}
        </span>
      </div>

      {/* Mobile card */}
      <div className="flex items-start gap-3 md:hidden">
        <TimelineDot type={tx.status as "voided" | "refunded"} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: colors.infoText,
              }}
            >
              {tx.id}
            </p>
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: accent,
              }}
            >
              {fmtAmt(tx.total)}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <Badge
              variant={getStatusBadgeVariant(
                tx.status as "voided" | "refunded"
              )}
            >
              {getStatusLabel(tx.status as "voided" | "refunded")}
            </Badge>
            <span style={{ fontSize: 11, color: colors.textMuted }}>
              {fmtDate(tx.timestamp)} · {fmtTime(tx.timestamp)}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <span style={{ fontSize: 11, color: colors.textMuted }}>
              Raised by{" "}
              <strong style={{ color: colors.textSecondary }}>
                {tx.cashier || "Staff"}
              </strong>
            </span>
            {tx.voidedBy && (
              <span style={{ fontSize: 11, color: colors.textMuted }}>
                · Approved by{" "}
                <strong style={{ color: "#7c3aed" }}>{tx.voidedBy}</strong>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
