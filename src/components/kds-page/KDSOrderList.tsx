import { motion, AnimatePresence } from "motion/react"
import { KDSListRow } from "./KDSListRow"
import type { KDSOrder } from "../../store/AppContext"
import { EmptyStateMessage } from "./EmptyStateMessage"

interface KDSOrderListProps {
  orders: KDSOrder[]
  onOrderSelect: (order: KDSOrder) => void
  bgColor: string
  textSub: string
  textMuted: string
  surface: string
  border: string
  isMobile?: boolean
}

export function KDSOrderList({
  orders,
  onOrderSelect,
  bgColor,
  textSub,
  textMuted,
  surface,
  border,
  isMobile = true,
}: KDSOrderListProps) {
  if (orders.length === 0) {
    return (
      <div
        className="flex-1 overflow-y-auto px-3 py-3"
        style={{ background: bgColor }}
      >
        <EmptyStateMessage
          isMobile={isMobile}
          bgColor={bgColor}
          borderColor={border}
          textSub={textSub}
          textMuted={textMuted}
          surface={surface}
          border={border}
        />
      </div>
    )
  }

  return (
    <div
      className="flex-1 overflow-y-auto px-3 py-3"
      style={{ background: bgColor }}
    >
      <div className="grid grid-cols-2 gap-3">
        <AnimatePresence>
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="flex"
            >
              <KDSListRow order={order} onTap={() => onOrderSelect(order)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
