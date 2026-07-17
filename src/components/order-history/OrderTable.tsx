import { DataTable } from "../ds/DataTable"
import { Badge } from "../ds/Badge"
import { colors } from "../ds/tokens"
import {
  statusVariant,
  statusLabel,
  fmtAmt,
  getPaymentIcon,
} from "../../utils/order-helpers"
import type { ColumnDef } from "../ds/DataTable"
import type { OrderRow, TxStatus } from "../../types/order-history/order"

const INTER = "'Inter', sans-serif"
const COLUMNS: ColumnDef<OrderRow>[] = [
  {
    key: "id",
    label: "Invoice",
    sortable: true,
    render: (v) => (
      <span style={{ color: colors.infoText, fontWeight: 600, fontSize: 12 }}>
        {String(v)}
      </span>
    ),
  },
  { key: "datetime", label: "Date & Time", sortable: true },
  { key: "customer", label: "Customer", sortable: true },
  {
    key: "itemCount",
    label: "Items",
    align: "center",
    render: (v) => (
      <span
        className="inline-flex size-6 items-center justify-center rounded-full"
        style={{
          background: "var(--page-surface-2)",
          fontSize: 11,
          fontWeight: 600,
          color: colors.textSecondary,
        }}
      >
        {String(v)}
      </span>
    ),
  },
  { key: "cashier", label: "Cashier", mobileHide: true },
  {
    key: "tableNo",
    label: "Table",
    mobileHide: true,
    render: (v) =>
      v ? (
        <span
          className="inline-flex items-center gap-1 rounded-md px-2 py-0.5"
          style={{
            background: "var(--page-surface-2)",
            fontSize: 11,
            color: colors.textSecondary,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <rect
              x="2"
              y="7"
              width="20"
              height="6"
              rx="3"
              stroke="currentColor"
              strokeWidth="2"
            />
            <rect
              x="5"
              y="13"
              width="3"
              height="6"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="2"
            />
            <rect
              x="16"
              y="13"
              width="3"
              height="6"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          {String(v)}
        </span>
      ) : (
        <span style={{ color: colors.textMuted, fontSize: 11 }}>-</span>
      ),
  },
  {
    key: "payment",
    label: "Payment",
    render: (v) => (
      <span className="flex items-center gap-1.5">
        <span
          className="size-2 shrink-0 rounded-full"
          style={{ background: getPaymentIcon(String(v)) }}
        />
        <span style={{ fontSize: 12, color: colors.textSecondary }}>
          {String(v)}
        </span>
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    align: "center",
    render: (v) => (
      <Badge variant={statusVariant(v as TxStatus)}>
        {statusLabel(v as TxStatus)}
      </Badge>
    ),
  },
  {
    key: "amount",
    label: "Amount",
    align: "right",
    sortable: true,
    mobileInline: true,
    render: (v, row) => (
      <span
        style={{
          fontWeight: 700,
          color:
            (row as OrderRow).status !== "completed"
              ? colors.textMuted
              : colors.textPrimary,
          textDecoration:
            (row as OrderRow).status !== "completed" ? "line-through" : "none",
        }}
      >
        {fmtAmt(Number(v))}
      </span>
    ),
  },
]

interface OrderTableProps {
  orders: OrderRow[]
  onRowClick: (row: OrderRow) => void
}

export function OrderTable({ orders, onRowClick }: OrderTableProps) {
  return (
    <DataTable<OrderRow>
      title="All Orders"
      subtitle={`${orders.length} order${orders.length !== 1 ? "s" : ""} found`}
      columns={COLUMNS}
      data={orders}
      rowKey="id"
      searchable
      searchPlaceholder="Search by invoice, customer, cashier, table..."
      filters={[
        {
          key: "status",
          label: "Status",
          options: [
            { label: "Completed", value: "completed" },
            { label: "Voided", value: "voided" },
            { label: "Refunded", value: "refunded" },
          ],
        },
        {
          key: "payment",
          label: "Payment",
          options: [
            { label: "Cash", value: "Cash" },
            { label: "Card", value: "Card" },
            { label: "Transfer", value: "Transfer" },
          ],
        },
      ]}
      exportable
      pageSize={10}
      emptyTitle="No orders found"
      emptyDescription="Try adjusting your date range or filters."
      onRowClick={onRowClick}
      mobilePrimary={(row) => (
        <div className="flex w-full items-center justify-between gap-2">
          <div className="min-w-0">
            <p
              style={{
                fontFamily: INTER,
                fontWeight: 600,
                fontSize: 13,
                color: colors.infoText,
              }}
              className="truncate"
            >
              {String(row.id)}
            </p>
            <p
              style={{
                fontFamily: INTER,
                fontSize: 11,
                color: colors.textMuted,
                marginTop: 1,
              }}
              className="truncate"
            >
              {String(row.customer)}{" "}
              {row.tableNo ? "\u2022 Table " + String(row.tableNo) : ""} \u2022{" "}
              {String(row.datetime).split("  ")[0]}
            </p>
          </div>
          <Badge variant={statusVariant(row.status as TxStatus)}>
            {statusLabel(row.status as TxStatus)}
          </Badge>
        </div>
      )}
      mobileDetailKeys={["payment", "cashier", "itemCount", "amount"]}
    />
  )
}
