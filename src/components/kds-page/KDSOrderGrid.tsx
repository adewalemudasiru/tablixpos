import { AnimatePresence } from "motion/react"
import { KDSCard } from "./KDSCard"
import type { KDSOrder, KDSStatus } from "../../store/AppContext"
import { EmptyStateMessage } from "./EmptyStateMessage"

interface KDSOrderGridProps {
  orders: KDSOrder[]
  onUpdateStatus: (id: string, status: KDSStatus) => void
  bgColor: string
  textSub: string
  textMuted: string
  surface: string
  border: string
}

export function KDSOrderGrid({
  orders,
  onUpdateStatus,
  bgColor,
  textSub,
  textMuted,
  surface,
  border,
}: KDSOrderGridProps) {
  if (orders.length === 0) {
    return (
      <div
        className="flex-1 overflow-y-auto p-6"
        style={{ background: bgColor }}
      >
        <EmptyStateMessage
          isMobile={false}
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
    <div className="flex-1 overflow-y-auto p-6" style={{ background: bgColor }}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {orders.map((order) => (
            <KDSCard
              key={order.id}
              order={order}
              onUpdateStatus={onUpdateStatus}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
