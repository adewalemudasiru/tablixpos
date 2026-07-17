import type { ColumnDef } from "../ds/DataTable"
import type { InventoryLogEntry as LogEntry } from "../../store/AppContext"
import { DeleteButton } from "./ActionButtons"

const INTER = "'Inter', sans-serif"

type LogType = "Stock In" | "Stock Out" | "Adjustment" | "Wastage" | "Transfer"

const LOG_TYPE_CONFIG: Record<
  LogType,
  { border: string; bg: string; text: string }
> = {
  "Stock In": { border: "#059669", bg: "#dcfce7", text: "#059669" },
  "Stock Out": { border: "#e91835", bg: "#fee2e5", text: "#e91835" },
  Adjustment: { border: "#1d4ed8", bg: "#dbeafe", text: "#1d4ed8" },
  Wastage: { border: "#b45309", bg: "#fef9c3", text: "#b45309" },
  Transfer: { border: "#7c3aed", bg: "#f3e8ff", text: "#7c3aed" },
}

function LogTypeBadge({ type }: { type: LogType }) {
  const c = LOG_TYPE_CONFIG[type]
  return (
    <span
      style={{
        fontFamily: INTER,
        fontWeight: 500,
        fontSize: 11,
        background: c.bg,
        color: c.text,
        borderRadius: 20,
        padding: "3px 10px",
        display: "inline-block",
        whiteSpace: "nowrap" as const,
      }}
    >
      {type}
    </span>
  )
}

export function makeLogColumns(
  onDelete: (e: LogEntry) => void
): ColumnDef<LogEntry>[] {
  return [
    {
      key: "date",
      label: "Date & Time",
      sortable: true,
      render: (_v, row) => {
        const e = row as unknown as LogEntry
        return (
          <div className="flex flex-col">
            <span
              style={{
                fontFamily: INTER,
                fontWeight: 500,
                fontSize: 13,
                color: "var(--page-text)",
              }}
            >
              {e.date}
            </span>
            <span
              style={{
                fontFamily: INTER,
                fontSize: 11,
                color: "var(--page-text-muted)",
              }}
            >
              {e.time}
            </span>
          </div>
        )
      },
    },
    {
      key: "itemName",
      label: "Ingredient",
      sortable: true,
      render: (v) => (
        <span
          style={{
            fontFamily: INTER,
            fontWeight: 500,
            color: "var(--page-text)",
          }}
        >
          {String(v)}
        </span>
      ),
    },
    {
      key: "type",
      label: "Movement Type",
      sortable: true,
      align: "center",
      render: (v) => <LogTypeBadge type={v as LogType} />,
    },
    {
      key: "quantity",
      label: "Quantity",
      sortable: false,
      align: "center",
      render: (v) => {
        const q = String(v)
        const isNeg = q.startsWith("-")
        return (
          <span
            style={{
              fontFamily: INTER,
              fontWeight: 600,
              fontSize: 13,
              color: isNeg ? "#e91835" : "#059669",
            }}
          >
            {isNeg ? q : `+${q}`}
          </span>
        )
      },
    },
    {
      key: "prevStock",
      label: "Before",
      sortable: false,
      align: "center",
      render: (v) => (
        <span
          style={{
            fontFamily: INTER,
            fontSize: 12,
            color: "var(--page-text-secondary)",
          }}
        >
          {String(v)}
        </span>
      ),
    },
    {
      key: "newStock",
      label: "After",
      sortable: false,
      align: "center",
      render: (v) => (
        <span
          style={{
            fontFamily: INTER,
            fontWeight: 500,
            fontSize: 12,
            color: "var(--page-text)",
          }}
        >
          {String(v)}
        </span>
      ),
    },
    {
      key: "performedBy",
      label: "By",
      sortable: true,
      render: (v) => {
        const name = String(v)
        const initials = name
          .split(" ")
          .slice(0, 2)
          .map((w) => w[0])
          .join("")
          .toUpperCase()
        return (
          <div className="flex items-center gap-2">
            <div
              className="flex size-7 shrink-0 items-center justify-center rounded-full"
              style={{ background: "#fee2e5" }}
            >
              <span
                style={{
                  fontFamily: INTER,
                  fontWeight: 600,
                  fontSize: 10,
                  color: "#e91835",
                }}
              >
                {initials}
              </span>
            </div>
            <span
              style={{
                fontFamily: INTER,
                fontSize: 13,
                color: "var(--page-text-secondary)",
              }}
            >
              {name}
            </span>
          </div>
        )
      },
    },
    {
      key: "note",
      label: "Note",
      sortable: false,
      render: (v) => (
        <span
          title={String(v)}
          style={{
            fontFamily: INTER,
            fontSize: 12,
            color: "var(--page-text-muted)",
            display: "block",
            maxWidth: 200,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap" as const,
          }}
        >
          {String(v) || "-"}
        </span>
      ),
    },
    {
      key: "id",
      label: "Action",
      align: "center",
      searchable: false,
      render: (_v, row) => (
        <DeleteButton onClick={() => onDelete(row as unknown as LogEntry)} />
      ),
    },
  ]
}
