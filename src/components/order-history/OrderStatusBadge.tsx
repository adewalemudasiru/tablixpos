import { Badge } from "../ds/Badge"
import { statusVariant, statusLabel } from "../../utils/order-helpers"
import type { TxStatus } from "../../types/order-history/order"

interface OrderStatusBadgeProps {
  status: TxStatus
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return <Badge variant={statusVariant(status)}>{statusLabel(status)}</Badge>
}
