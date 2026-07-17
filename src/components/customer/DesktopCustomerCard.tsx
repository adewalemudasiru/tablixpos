import type { StoreCustomer as Customer } from "../../store/AppContext"
import { Avatar } from "../ds/Avatar"
import { Badge } from "../ds/Badge"
import { Button } from "../ds/Button"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { customerTier, fmt, relativeDate } from "@/utils/customer-helpers"
import { colors } from "../ds/tokens"

interface DesktopCustomerCardProps {
  customer: Customer
  isDark: boolean
  onCardClick: (customer: Customer) => void
  onEdit: (customer: Customer) => void
  onDelete: (customer: Customer) => void
  isLoading?: boolean
}

export function DesktopCustomerCard({
  customer,
  isDark,
  onCardClick,
  onEdit,
  onDelete,
  isLoading = false,
}: DesktopCustomerCardProps) {
  const tier = customerTier(customer.totalSpent)

  return (
    <div
      onClick={() => onCardClick(customer)}
      className={`flex cursor-pointer flex-col overflow-hidden rounded-xl transition-colors ${
        isDark
          ? "bg-[#2c2c2e] hover:bg-[#3a3a3c]"
          : "bg-white shadow-sm hover:bg-[#fafafa] hover:shadow-md"
      }`}
      style={{
        border: `1px solid ${isDark ? "#3c3c3e" : "#e5e7eb"}`,
      }}
    >
      <div
        className={`flex items-center justify-between border-b px-4 py-3 ${
          isDark ? "border-[#3c3c3e]" : "border-[#e5e7eb]"
        }`}
      >
        <div className="flex items-center gap-3">
          <Avatar name={customer.name} size="sm" />
          <span
            className={`text-sm font-semibold ${
              isDark ? "text-white" : "text-[#111827]"
            }`}
          >
            {customer.name}
          </span>
        </div>
        <Badge variant={tier.variant}>{tier.label}</Badge>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div
          className={`text-sm ${isDark ? "text-[#d4d4d8]" : "text-[#4b5563]"}`}
        >
          {customer.phone || "No phone"}
        </div>
        <div className={`text-sm ${isDark ? "#a1a1aa" : "text-[#6b7280]"}`}>
          {customer.email || "No email"}
        </div>
        <div
          className={`mt-2 text-lg font-bold ${
            isDark ? "text-white" : "text-[#111827]"
          }`}
        >
          {fmt(customer.totalSpent)}
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className={`text-xs ${isDark ? "#a1a1aa" : "text-[#6b7280]"}`}>
            {customer.visitCount} visits
          </span>
          <span className={`text-xs ${isDark ? "#a1a1aa" : "text-[#6b7280]"}`}>
            {relativeDate(customer.lastVisit)}
          </span>
        </div>
      </div>
      <div
        className={`flex items-center justify-end gap-2 border-t px-4 py-3 ${
          isDark ? "border-[#3c3c3e]" : "border-[#e5e7eb]"
        }`}
      >
        <Button
          variant="ghost"
          size="sm"
          style={{ color: colors.textMuted }}
          disabled={isLoading}
          onClick={(e) => {
            e.stopPropagation()
            onEdit(customer)
          }}
          title="Edit customer"
        >
          <IconEdit />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          style={{ color: colors.primary }}
          disabled={isLoading}
          onClick={(e) => {
            e.stopPropagation()
            onDelete(customer)
          }}
          title="Delete customer"
        >
          <IconTrash />
        </Button>
      </div>
    </div>
  )
}
