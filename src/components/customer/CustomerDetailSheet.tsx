import { useRef, useEffect } from "react"
import type { StoreCustomer as Customer } from "../../store/AppContext"
import { font } from "../../components/ds"
import { colors } from "../../components/ds/tokens"
import { Button } from "../../components/ds/Button"
import { Badge } from "../../components/ds/Badge"
import { Avatar } from "../../components/ds/Avatar"
import { IconEdit, IconTrash, IconPhone, IconMail } from "@tabler/icons-react"
import { customerTier, fmt, relativeDate } from "@/utils/customer-helpers"

export function CustomerDetailSheet({
  customer,
  onClose,
  onEdit,
  onDelete,
}: {
  customer: Customer | null
  onClose: () => void
  onEdit: (c: Customer) => void
  onDelete: (c: Customer) => void
}) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const dragStartY = useRef(0)
  const currentTranslateY = useRef(0)
  const isDragging = useRef(false)

  // Animate in
  useEffect(() => {
    if (customer && sheetRef.current) {
      sheetRef.current.style.transform = "translateY(100%)"
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (sheetRef.current) {
            sheetRef.current.style.transition =
              "transform 0.32s cubic-bezier(0.32,0.72,0,1)"
            sheetRef.current.style.transform = "translateY(0%)"
          }
        })
      })
    }
  }, [customer])

  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.style.transition =
        "transform 0.28s cubic-bezier(0.32,0.72,0,1)"
      sheetRef.current.style.transform = "translateY(100%)"
      setTimeout(onClose, 280)
    } else {
      onClose()
    }
  }

  // Drag to dismiss
  const onDragStart = (clientY: number) => {
    isDragging.current = true
    dragStartY.current = clientY
    currentTranslateY.current = 0
    if (sheetRef.current) {
      sheetRef.current.style.transition = "none"
    }
  }

  const onDragMove = (clientY: number) => {
    if (!isDragging.current || !sheetRef.current) return
    const delta = Math.max(0, clientY - dragStartY.current)
    currentTranslateY.current = delta
    sheetRef.current.style.transform = `translateY(${delta}px)`
  }

  const onDragEnd = () => {
    if (!isDragging.current) return
    isDragging.current = false
    if (currentTranslateY.current > 120) {
      closeSheet()
    } else {
      if (sheetRef.current) {
        sheetRef.current.style.transition =
          "transform 0.3s cubic-bezier(0.32,0.72,0,1)"
        sheetRef.current.style.transform = "translateY(0)"
      }
    }
  }

  if (!customer) return null

  const tier = customerTier(customer.totalSpent)

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        style={{ backdropFilter: "blur(2px)" }}
        onClick={closeSheet}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="absolute right-0 bottom-0 left-0 flex flex-col bg-[var(--page-bg)]"
        style={{
          borderRadius: "20px 20px 0 0",
          maxHeight: "82vh",
          transform: "translateY(100%)",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.18)",
        }}
      >
        {/* Drag handle */}
        <div
          className="flex shrink-0 cursor-grab justify-center pt-3 pb-2 active:cursor-grabbing"
          onMouseDown={(e) => onDragStart(e.clientY)}
          onMouseMove={(e) => onDragMove(e.clientY)}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={(e) => onDragStart(e.touches[0].clientY)}
          onTouchMove={(e) => onDragMove(e.touches[0].clientY)}
          onTouchEnd={onDragEnd}
        >
          <div
            className="h-1 w-10 rounded-full"
            style={{ background: colors.border }}
          />
        </div>

        {/* Scrollable content */}
        <div className="flex flex-1 flex-col overflow-y-auto pb-8">
          {/* Customer hero */}
          <div
            className="flex flex-col items-center gap-3 px-6 pt-3 pb-5"
            style={{ borderBottom: `1px solid ${colors.borderLight}` }}
          >
            <Avatar name={customer.name} size="lg" />
            <div className="text-center">
              <p
                style={{
                  fontFamily: font.family,
                  fontWeight: font.weight.semibold,
                  fontSize: font.size.lg,
                  color: colors.textPrimary,
                }}
              >
                {customer.name}
              </p>
              <div className="mt-1.5 flex justify-center">
                <Badge>{tier.label}</Badge>
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div
            className="flex flex-col gap-3 px-5 pt-5 pb-4"
            style={{ borderBottom: `1px solid ${colors.borderLight}` }}
          >
            <p
              style={{
                fontFamily: font.family,
                fontSize: 11,
                fontWeight: font.weight.semibold,
                color: colors.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Contact
            </p>
            <div className="flex items-center gap-3">
              <div
                className="flex size-9 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: colors.primaryLight,
                  color: colors.primary,
                }}
              >
                <IconPhone />
              </div>
              <div className="min-w-0">
                <p
                  style={{
                    fontFamily: font.family,
                    fontSize: 11,
                    color: colors.textMuted,
                  }}
                >
                  Phone
                </p>
                <p
                  style={{
                    fontFamily: font.family,
                    fontSize: font.size.base,
                    color: colors.textPrimary,
                  }}
                >
                  {customer.phone}
                </p>
              </div>
            </div>
            {customer.email && (
              <div className="flex items-center gap-3">
                <div
                  className="flex size-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ color: colors.infoText }}
                >
                  <IconMail />
                </div>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <p
                    style={{
                      fontFamily: font.family,
                      fontSize: 11,
                      color: colors.textMuted,
                    }}
                  >
                    Email
                  </p>
                  <p
                    style={{
                      fontFamily: font.family,
                      fontSize: font.size.base,
                      color: colors.textPrimary,
                    }}
                    className="truncate"
                  >
                    {customer.email}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Loyalty Points */}
          <div
            className="px-5 pt-5 pb-4"
            style={{ borderBottom: `1px solid ${colors.borderLight}` }}
          >
            <p
              style={{
                fontFamily: font.family,
                fontSize: 11,
                fontWeight: font.weight.semibold,
                color: colors.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 14,
              }}
            >
              Loyalty Points
            </p>
            <div
              className="flex items-center gap-3 rounded-2xl p-4"
              style={{
                background: "linear-gradient(135deg, #e91835 0%, #c0112a 100%)",
              }}
            >
              <div className="flex-1">
                <p
                  style={{
                    fontFamily: font.family,
                    fontWeight: font.weight.bold,
                    fontSize: 28,
                    color: "white",
                    lineHeight: "32px",
                  }}
                >
                  {customer.loyaltyPoints.toLocaleString()}
                </p>
                <p
                  style={{
                    fontFamily: font.family,
                    fontSize: 11,
                    color: "rgba(255,255,255,0.8)",
                    marginTop: 2,
                  }}
                >
                  Points balance · {customerTier(customer.totalSpent).label}{" "}
                  tier
                </p>
              </div>
              <div>
                <div
                  className="rounded-xl px-3 py-1.5"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  <p
                    style={{
                      fontFamily: font.family,
                      fontSize: 11,
                      fontWeight: 600,
                      color: "white",
                    }}
                  >
                    = &#x20a6;{(customer.loyaltyPoints * 5).toLocaleString()}
                  </p>
                  <p
                    style={{
                      fontFamily: font.family,
                      fontSize: 9,
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    redeemable value
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div
            className="px-5 pt-5 pb-4"
            style={{ borderBottom: `1px solid ${colors.borderLight}` }}
          >
            <p
              style={{
                fontFamily: font.family,
                fontSize: 11,
                fontWeight: font.weight.semibold,
                color: colors.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 14,
              }}
            >
              Activity
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  label: "Total Spent",
                  value: fmt(customer.totalSpent),
                  color: colors.primary,
                },
                {
                  label: "Visits",
                  value: `${customer.visitCount}x`,
                  color: colors.successText,
                },
                {
                  label: "Last Visit",
                  value: relativeDate(customer.lastVisit),
                  color: colors.textPrimary,
                },
              ].map(({ label, value, color }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1 rounded-xl p-3"
                  style={{ background: "var(--page-surface-2)" }}
                >
                  <p
                    style={{
                      fontFamily: font.family,
                      fontWeight: font.weight.semibold,
                      fontSize: font.size.sm,
                      color,
                    }}
                  >
                    {value}
                  </p>
                  <p
                    style={{
                      fontFamily: font.family,
                      fontSize: 10,
                      color: colors.textMuted,
                      textAlign: "center",
                    }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Joined date */}
          <div className="px-5 pt-4 pb-2">
            <p
              style={{
                fontFamily: font.family,
                fontSize: font.size.sm,
                color: colors.textMuted,
              }}
            >
              Member since{" "}
              <span
                style={{
                  color: colors.textSecondary,
                  fontWeight: font.weight.medium,
                }}
              >
                {new Date(customer.joinDate).toLocaleDateString("en-NG", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </p>
          </div>
        </div>

        {/* Action buttons — sticky at bottom */}
        <div
          className="flex shrink-0 gap-3 px-5 py-4"
          style={{ borderTop: `1px solid ${colors.borderLight}` }}
        >
          <Button
            variant="outline"

            onClick={() => {
              onEdit(customer)
              closeSheet()
            }}
            style={{ flex: 1 }}
          >
            <IconEdit /> Customer
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onDelete(customer)
              closeSheet()
            }}
            style={{ flex: 1 }}
          >
            <IconTrash /> Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
