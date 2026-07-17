import type { StoreCustomer as Customer } from "../../store/AppContext"
import { Avatar } from "../ds/Avatar"
import { Badge } from "../ds/Badge"
import { font } from "../ds"
import { colors } from "../ds/tokens"
import { customerTier, fmt } from "@/utils/customer-helpers"
import { IconChevronRight } from "@tabler/icons-react"

interface MobileCustomerListProps {
  customers: Customer[]
  onCustomerClick: (customer: Customer) => void
}

export function MobileCustomerList({
  customers,
  onCustomerClick,
}: MobileCustomerListProps) {
  if (customers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-4 py-14 text-center">
        <div
          className="flex size-14 items-center justify-center rounded-2xl"
          style={{ background: colors.primaryLight }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
              stroke={colors.primary}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="9"
              cy="7"
              r="4"
              stroke={colors.primary}
              strokeWidth="2"
            />
          </svg>
        </div>
        <div>
          <p
            style={{
              fontFamily: font.family,
              fontWeight: font.weight.semibold,
              fontSize: font.size.base,
              color: colors.textPrimary,
            }}
          >
            No customers found
          </p>
          <p
            style={{
              fontFamily: font.family,
              fontSize: font.size.sm,
              color: colors.textMuted,
              marginTop: 2,
            }}
          >
            Tap + to add your first customer.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      {customers.map((c, idx) => {
        const tier = customerTier(c.totalSpent)
        const isLast = idx === customers.length - 1
        return (
          <button
            key={c.id}
            className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[var(--page-surface-2)] active:bg-[var(--page-surface-2)]"
            style={{
              borderBottom: isLast ? "none" : "1px solid var(--page-border)",
            }}
            onClick={() => onCustomerClick(c)}
          >
            <Avatar name={c.name} size="sm" />
            <div className="min-w-0 flex-1">
              <p
                style={{
                  fontFamily: font.family,
                  fontWeight: font.weight.semibold,
                  fontSize: font.size.base,
                  color: colors.textPrimary,
                }}
                className="truncate"
              >
                {c.name}
              </p>
              <p
                style={{
                  fontFamily: font.family,
                  fontSize: font.size.sm,
                  color: colors.textMuted,
                }}
                className="truncate"
              >
                {c.phone}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1.5">
              <Badge variant={tier.variant}>{tier.label}</Badge>
              <p
                style={{
                  fontFamily: font.family,
                  fontSize: font.size.sm,
                  fontWeight: font.weight.medium,
                  color: colors.textSecondary,
                }}
              >
                {fmt(c.totalSpent)}
              </p>
            </div>
            <span style={{ color: colors.textMuted }}>
              <IconChevronRight />
            </span>
          </button>
        )
      })}
    </>
  )
}
