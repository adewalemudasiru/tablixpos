import type { ColumnDef } from "../ds/DataTable"
import type { Supplier } from "../../store/AppContext"
import { Badge } from "../ds/Badge"
import { EditButton, DeleteButton } from "./ActionButtons"

const INTER = "'Inter', sans-serif"

const AVATAR_COLORS = [
  { bg: "#fee2e5", text: "#e91835" },
  { bg: "#dcfce7", text: "#059669" },
  { bg: "#dbeafe", text: "#1d4ed8" },
  { bg: "#fef9c3", text: "#b45309" },
  { bg: "#f3e8ff", text: "#7c3aed" },
]

function SupplierAvatar({ name, idx }: { name: string; idx: number }) {
  const { bg, text } = AVATAR_COLORS[idx % AVATAR_COLORS.length]
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
  return (
    <div
      className="flex size-8 shrink-0 items-center justify-center rounded-full"
      style={{ background: bg }}
    >
      <span
        style={{
          fontFamily: INTER,
          fontWeight: 600,
          fontSize: 11,
          color: text,
        }}
      >
        {initials}
      </span>
    </div>
  )
}

export function makeSupplierColumns(
  suppliers: Supplier[],
  onEdit: (s: Supplier) => void,
  onDelete: (s: Supplier) => void
): ColumnDef<Supplier>[] {
  return [
    {
      key: "name",
      label: "Supplier",
      sortable: true,
      render: (v, row) => {
        const idx = suppliers.findIndex(
          (s) => s.id === (row as unknown as Supplier).id
        )
        return (
          <div className="flex items-center gap-2.5">
            <SupplierAvatar name={String(v)} idx={idx} />
            <span
              style={{
                fontFamily: INTER,
                fontWeight: 500,
                color: "var(--page-text)",
              }}
            >
              {String(v)}
            </span>
          </div>
        )
      },
    },
    {
      key: "contactPerson",
      label: "Contact Person",
      sortable: true,
      render: (v) => (
        <span
          style={{ fontFamily: INTER, color: "var(--page-text-secondary)" }}
        >
          {String(v)}
        </span>
      ),
    },
    {
      key: "phone",
      label: "Phone",
      sortable: false,
      render: (v) => (
        <span
          style={{ fontFamily: INTER, color: "var(--page-text-secondary)" }}
        >
          {String(v)}
        </span>
      ),
    },
    {
      key: "email",
      label: "Email",
      sortable: false,
      render: (v) => (
        <a
          href={`mailto:${v}`}
          style={{
            fontFamily: INTER,
            color: "var(--c-info-text)",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.textDecoration = "underline"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.textDecoration = "none"
          }}
        >
          {String(v)}
        </a>
      ),
    },
    {
      key: "itemsSupplied",
      label: "Items Supplied",
      sortable: false,
      render: (v) => (
        <span
          style={{
            fontFamily: INTER,
            fontSize: 13,
            color: "var(--page-text-secondary)",
          }}
        >
          {String(v)}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      align: "center",
      render: (v) => (
        <Badge variant={String(v) === "Active" ? "success" : "warning"}>
          {String(v)}
        </Badge>
      ),
    },
    {
      key: "id",
      label: "Action",
      align: "center",
      searchable: false,
      render: (_v, row) => (
        <div className="flex items-center justify-center gap-1">
          <EditButton onClick={() => onEdit(row as unknown as Supplier)} />
          <DeleteButton onClick={() => onDelete(row as unknown as Supplier)} />
        </div>
      ),
    },
  ]
}
