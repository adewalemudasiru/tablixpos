import { useState } from "react"
import { useNavigate } from "react-router"
import type {
  RestaurantTable,
  TableStatus,
  Transaction,
  KDSOrder,
} from "../../store/AppContext"
import { generateTransactionId } from "../../services/storage"
import { colors, font } from "../../components/ds/tokens"
import { Button } from "../../components/ds/Button"
import { Badge } from "../../components/ds/Badge"
import { Modal } from "../../components/ds/Modal"
import { ConfirmModal } from "../../components/ds/Modal"
import { Input } from "../../components/ds/Input"
import { toast } from "sonner"
import { elapsed } from "@/utils/tables-helper"
import { STATUS_CFG } from "@/constants/tables-page"

const NGN = "\u20a6"

function TableNavIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="7"
        width="20"
        height="6"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <rect
        x="5"
        y="13"
        width="3"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <rect
        x="16"
        y="13"
        width="3"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  )
}

export function TableDetailModal({
  table,
  onClose,
  onUpdateStatus,
  addTransaction,
  activeStaff,
  kdsOrders,
}: {
  table: RestaurantTable
  onClose: () => void
  onUpdateStatus: (
    status: TableStatus,
    extra?: Partial<RestaurantTable>
  ) => void
  addTransaction: (tx: Transaction) => void
  taxConfig: any
  activeStaff: any
  kdsOrders: KDSOrder[]
}) {
  const navigate = useNavigate()
  const cfg = STATUS_CFG[table.status]
  const [guestName, setGuestName] = useState(table.customerName || "")
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [showKDSWarning, setShowKDSWarning] = useState(false)

  // Relevant orders for this table
  const activeKDSOffset = kdsOrders.filter(
    (o: KDSOrder) =>
      o.tableNo === table.name &&
      ["New", "In Progress", "Ready"].includes(o.status)
  ).length

  const hasBalance = table.orderTotal && table.orderTotal > 0

  const handleSeatGuest = () => {
    onUpdateStatus("occupied", {
      occupiedAt: new Date().toISOString(),
      customerName: guestName.trim() || "Walk-in Guest",
      orderTotal: 0,
    })
    toast.success(`${table.name} is now occupied`)
    onClose()
  }

  const handleReserve = () => {
    onUpdateStatus("reserved", {
      occupiedAt: new Date().toISOString(),
      customerName: guestName.trim() || undefined,
    })
    toast.success(`${table.name} marked as reserved`)
    onClose()
  }

  const handleClearTable = () => {
    // If the table has a balance, record it as a transaction before clearing
    if (table.orderTotal && table.orderTotal > 0) {
      const transaction: Transaction = {
        id: generateTransactionId(),
        timestamp: Date.now(),
        items: [
          {
            id: "manual-clear",
            name: `Table Service - ${table.name}`,
            price: table.orderTotal,
            qty: 1,
          },
        ],
        customer: {
          id: "walk-in",
          name: table.customerName || "Walk-in",
        },
        subtotal: table.orderTotal,
        vat: 0,
        total: table.orderTotal,
        paymentMethod: "Cash",
        tableNo: table.name,
        cashier: activeStaff ? activeStaff.name : "Owner",
        status: "completed",
      }
      addTransaction(transaction)
      toast.info(`Transaction recorded for ${table.name}`)
    }

    onUpdateStatus("available", {
      occupiedAt: undefined,
      customerName: undefined,
      orderTotal: 0,
    })
    toast.success(`${table.name} cleared`)
    onClose()
  }

  const handleBillRequested = () => {
    onUpdateStatus("bill_requested")
    toast.success(`Bill requested for ${table.name}`)
    onClose()
  }

  const handleOpenPOS = () => {
    onClose()
    navigate(`/dashboard?table=${encodeURIComponent(table.name)}`)
  }

  const handleClearRequest = () => {
    if (activeKDSOffset > 0) {
      setShowKDSWarning(true)
      return
    }

    if (hasBalance) {
      setShowClearConfirm(true)
    } else {
      handleClearTable()
    }
  }

  const clearLabel = hasBalance
    ? "Clear Table (Record Payment)"
    : "Release Table"

  return (
    <>
      <Modal
        open={true}
        onClose={onClose}
        title={table.name}
        subtitle={`${table.zone} \u00b7 ${table.seats} seat${table.seats !== 1 ? "s" : ""}`}
        size="sm"
        icon={<TableNavIcon />}
        iconBg={cfg.bg}
      >
        {/* Status + elapsed */}
        <div className="mb-4 flex items-center gap-2">
          <Badge variant={cfg.badgeVariant} dot>
            {cfg.label}
          </Badge>
          {table.occupiedAt && (
            <span
              style={{
                fontFamily: font.family,
                fontSize: font.size.xs,
                color: colors.textMuted,
              }}
            >
              {elapsed(table.occupiedAt)} ago
            </span>
          )}
        </div>

        {/* Info rows */}
        {(table.status === "occupied" || table.status === "bill_requested") &&
          table.customerName && (
            <div
              className="mb-4 flex items-center gap-2 rounded-lg px-3 py-2.5"
              style={{
                background: colors.neutralBg,
                border: `1px solid ${colors.borderLight}`,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
                  stroke={colors.textMuted}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <circle
                  cx="12"
                  cy="7"
                  r="4"
                  stroke={colors.textMuted}
                  strokeWidth="1.8"
                />
              </svg>
              <span
                style={{
                  fontFamily: font.family,
                  fontSize: font.size.base,
                  color: colors.textSecondary,
                }}
              >
                {table.customerName}
              </span>
            </div>
          )}

        {table.orderTotal != null && table.orderTotal > 0 && (
          <div
            className="mb-4 flex items-center justify-between rounded-lg px-3 py-2.5"
            style={{
              background: colors.primaryLight,
              border: `1px solid ${colors.primaryMid}`,
            }}
          >
            <span
              style={{
                fontFamily: font.family,
                fontSize: font.size.base,
                color: colors.textSecondary,
                fontWeight: font.weight.medium,
              }}
            >
              Running total
            </span>
            <span
              style={{
                fontFamily: font.family,
                fontSize: font.size.md,
                color: colors.primary,
                fontWeight: font.weight.bold,
              }}
            >
              {NGN}
              {table.orderTotal.toLocaleString()}
            </span>
          </div>
        )}

        {/* Guest name input */}
        {(table.status === "available" || table.status === "reserved") && (
          <div className="mb-4">
            <Input
              label="Guest Name (optional)"
              placeholder="Walk-in Guest"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
          </div>
        )}

        {/* Status-based action buttons */}
        <div className="flex flex-col gap-2">
          {table.status === "available" && (
            <>
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={handleSeatGuest}
              >
                Seat Guest
              </Button>
              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={handleReserve}
              >
                Mark as Reserved
              </Button>
              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={handleOpenPOS}
              >
                Open Order in POS
              </Button>
            </>
          )}

          {table.status === "reserved" && (
            <>
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={handleSeatGuest}
              >
                Seat Guest Now
              </Button>
              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={handleOpenPOS}
              >
                Open Order in POS
              </Button>
              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={handleClearTable}
              >
                Cancel Reservation
              </Button>
            </>
          )}

          {table.status === "occupied" && (
            <>
              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={handleOpenPOS}
              >
                Open in POS
              </Button>
              {hasBalance && (
                <Button
                  variant="secondary"
                  size="md"
                  fullWidth
                  onClick={handleBillRequested}
                >
                  Request Bill
                </Button>
              )}
              <Button
                variant="danger"
                size="md"
                fullWidth
                onClick={handleClearRequest}
              >
                {clearLabel}
              </Button>
            </>
          )}

          {table.status === "bill_requested" && (
            <>
              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={handleOpenPOS}
              >
                Open in POS
              </Button>
              <Button
                variant="danger"
                size="md"
                fullWidth
                onClick={handleClearRequest}
              >
                {hasBalance ? "Clear Table (Paid)" : "Free Table"}
              </Button>
            </>
          )}
        </div>
      </Modal>

      <ConfirmModal
        open={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={handleClearTable}
        title={`Clear "${table.name}" with balance?`}
        description={`This table has an active balance of ${NGN}${table.orderTotal?.toLocaleString()}. Clearing it will record a Cash transaction in the history.`}
        confirmLabel="Record as Paid & Clear"
        cancelLabel="Keep Occupied"
        variant="warning"
      />

      <ConfirmModal
        open={showKDSWarning}
        onClose={() => setShowKDSWarning(false)}
        onConfirm={() => {
          setShowKDSWarning(false)
          if (hasBalance) setShowClearConfirm(true)
          else handleClearTable()
        }}
        title="Active Kitchen Orders!"
        description={`This table still has ${activeKDSOffset} order(s) in the kitchen. Clearing the table will NOT cancel those orders. Are you sure?`}
        confirmLabel="Clear Anyway"
        cancelLabel="Keep Occupied"
        variant="warning"
      />
    </>
  )
}
