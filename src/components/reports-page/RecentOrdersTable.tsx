import { DataTable } from "../ds/DataTable"
import { Badge } from "../ds/Badge"
import { colors } from "../ds/tokens"
import { getStatusVariant } from "../../utils/report-helpers"
import type { ColumnDef } from "../ds/DataTable"
import type { OrderRow } from "../../types/report-page/reports"

const ORDER_COLUMNS: ColumnDef<OrderRow>[] = [
  {
    key: "inv",
    label: "Invoice",
    sortable: true,
    render: (v) => (
      <span style={{ color: colors.infoText, fontWeight: 500, fontSize: 12 }}>
        {String(v)}
      </span>
    ),
  },
  { key: "date", label: "Date", sortable: true },
  { key: "customer", label: "Customer", sortable: true },
  {
    key: "cashier",
    label: "Cashier",
    sortable: true,
    render: (v) => (
      <span style={{ color: "var(--page-text-secondary)", fontSize: 13 }}>
        {String(v)}
      </span>
    ),
  },
  {
    key: "payment",
    label: "Payment",
    sortable: true,
    render: (v) => {
      const isCash = String(v).toLowerCase() === "cash"
      return <Badge variant={isCash ? "success" : "info"}>{String(v)}</Badge>
    },
  },
  {
    key: "status",
    label: "Status",
    align: "center",
    render: (v) => (
      <Badge variant={getStatusVariant(String(v))}>{String(v)}</Badge>
    ),
  },
  {
    key: "change",
    label: "Change",
    align: "right",
    render: (v) => (
      <span style={{ color: "var(--page-text-muted)", fontSize: 13 }}>
        {v ? String(v) : "-"}
      </span>
    ),
  },
  {
    key: "amount",
    label: "Amount",
    align: "right",
    sortable: true,
    mobileInline: true,
    render: (v) => (
      <span style={{ fontWeight: 600, color: colors.textPrimary }}>
        {String(v)}
      </span>
    ),
  },
]

interface RecentOrdersTableProps {
  orders: OrderRow[]
  onRowClick: (row: OrderRow) => void
}

export function RecentOrdersTable({
  orders,
  onRowClick,
}: RecentOrdersTableProps) {
  return (
    <DataTable<OrderRow>
      title="Recent Orders"
      subtitle={`${orders.length} transaction${orders.length !== 1 ? "s" : ""} in this period`}
      columns={ORDER_COLUMNS}
      data={orders}
      rowKey="inv"
      searchable
      searchPlaceholder="Search orders..."
      exportable
      pageSize={5}
      emptyTitle="No orders in this period"
      emptyDescription="Transactions placed on the POS will appear here."
      onRowClick={onRowClick}
    />
  )
}
