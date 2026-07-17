import type { ColumnDef } from "../ds/DataTable"
import { DataTable } from "../ds/DataTable"
import { Badge } from "../ds/Badge"
import { colors } from "../ds/tokens"
import { CategoryChip } from "./CategoryChip"
import { PaymentBadge } from "./PaymentBadge"
import type { Expense } from "../../store/AppContext"

const INTER = "'Inter', sans-serif"
const NGN = "\u20a6"

function fmtAmount(n: number) {
  return `${NGN}${n.toLocaleString()}`
}

const STATUS_VARIANT: Record<string, any> = {
  Approved: "success",
  Pending: "warning",
  Rejected: "danger",
}

interface ExpensesTableProps {
  expenses: Expense[]
  onEdit: (expense: Expense) => void
  onDelete: (expense: Expense) => void
  searchable?: boolean
  searchPlaceholder?: string
}

export function ExpensesTable({
  expenses,
  onEdit,
  onDelete,
  searchable = true,
  searchPlaceholder = "Search expenses...",
}: ExpensesTableProps) {
  const columns: ColumnDef<Expense>[] = [
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (v) => (
        <span
          style={{ fontFamily: INTER, fontSize: 13, color: colors.textMuted }}
        >
          {String(v)}
        </span>
      ),
    },
    {
      key: "category",
      label: "Category",
      sortable: true,
      render: (v) => <CategoryChip category={String(v)} />,
    },
    {
      key: "description",
      label: "Description",
      sortable: true,
      render: (v) => (
        <span
          style={{
            fontFamily: INTER,
            fontWeight: 500,
            fontSize: 13,
            color: colors.textPrimary,
          }}
        >
          {String(v)}
        </span>
      ),
    },
    {
      key: "amount",
      label: "Amount",
      sortable: true,
      align: "right",
      render: (v) => (
        <span
          style={{
            fontFamily: INTER,
            fontWeight: 600,
            fontSize: 13,
            color: colors.textPrimary,
          }}
        >
          {fmtAmount(v as number)}
        </span>
      ),
    },
    {
      key: "paymentMethod",
      label: "Payment",
      sortable: false,
      render: (v) => <PaymentBadge method={String(v || "")} />,
    },
    {
      key: "reference",
      label: "Reference",
      sortable: false,
      render: (v) => (
        <span
          style={{ fontFamily: INTER, fontSize: 12, color: colors.textMuted }}
        >
          {String(v || "-")}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      align: "center",
      render: (v) => (
        <Badge variant={STATUS_VARIANT[v as string]}>{String(v)}</Badge>
      ),
    },
    {
      key: "id",
      label: "Actions",
      align: "center",
      searchable: false,
      render: (_v, row) => {
        const e = row as unknown as Expense
        return (
          <div className="flex items-center justify-center gap-1">
            <button
              onClick={() => onEdit(e)}
              className="flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-blue-50"
              style={{ color: colors.infoText }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => onDelete(e)}
              className="flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-red-50"
              style={{ color: colors.dangerText }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <polyline
                  points="3 6 5 6 21 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )
      },
    },
  ]

  const paymentMethodOptions = ["Cash", "Transfer", "Card"]
  const statusOptions = ["Approved", "Pending", "Rejected"]

  return (
    <DataTable
      columns={columns}
      data={expenses}
      rowKey="id"
      searchable={searchable}
      searchPlaceholder={searchPlaceholder}
      filters={[
        {
          key: "paymentMethod",
          label: "Payment",
          options: [
            { label: "All", value: "" },
            ...paymentMethodOptions.map((m) => ({ label: m, value: m })),
          ],
        },
        {
          key: "status",
          label: "Status",
          options: [
            { label: "All", value: "" },
            ...statusOptions.map((s) => ({ label: s, value: s })),
          ],
        },
      ]}
      exportable
    />
  )
}
