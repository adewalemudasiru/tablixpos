import { Badge } from "../ds/Badge"

type InventoryStatus = "Active" | "Low Stock" | "Out of Stock"

interface InventoryStatusBadgeProps {
  status: InventoryStatus
}

export function InventoryStatusBadge({ status }: InventoryStatusBadgeProps) {
  const variant =
    status === "Active"
      ? "success"
      : status === "Low Stock"
        ? "warning"
        : "danger"
  return <Badge variant={variant}>{status}</Badge>
}
