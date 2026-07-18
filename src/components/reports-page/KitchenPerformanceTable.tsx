import { DataTable } from "../ds/DataTable"
import { Badge } from "../ds/Badge"
import type { ColumnDef } from "../ds/DataTable"
import type { KitchenRow } from "../../types/report-page/reports"

const KITCHEN_COLUMNS: ColumnDef<KitchenRow>[] = [
  {
    key: "station",
    label: "Station Name",
    sortable: true,
    render: (v) => (
      <span style={{ fontWeight: 600, color: "var(--page-text)" }}>
        {String(v)}
      </span>
    ),
  },
  { key: "total", label: "Total Tickets", sortable: true, align: "center" },
  {
    key: "active",
    label: "Active Queue",
    sortable: true,
    align: "center",
    render: (v) => (
      <Badge variant={Number(v) > 0 ? "warning" : "neutral"}>
        {String(v)} active
      </Badge>
    ),
  },
  {
    key: "avgPrep",
    label: "Avg Prep Time",
    sortable: true,
    align: "right",
    render: (v) => (
      <span style={{ fontWeight: 500, color: "var(--page-text)" }}>
        {String(v)}
      </span>
    ),
  },
  {
    key: "onTimeRate",
    label: "On-Time Rate",
    sortable: true,
    align: "right",
    render: (v) => {
      const rate = Number(String(v).replace("%", ""))
      return (
        <Badge variant={rate >= 80 ? "success" : "danger"}>{String(v)}</Badge>
      )
    },
  },
  {
    key: "revenue",
    label: "Revenue",
    sortable: true,
    align: "right",
    render: (v) => (
      <span style={{ fontWeight: 600, color: "var(--page-text)" }}>
        {String(v)}
      </span>
    ),
  },
]

interface KitchenPerformanceTableProps {
  rows: KitchenRow[]
}

export function KitchenPerformanceTable({
  rows,
}: KitchenPerformanceTableProps) {
  return (
    <DataTable<KitchenRow>
      title="Station Performance Breakdown"
      subtitle="Turnaround and preparation speed details per kitchen station"
      columns={KITCHEN_COLUMNS}
      data={rows}
      rowKey="station"
      searchable
      searchPlaceholder="Search stations..."
      exportable
      pageSize={5}
      emptyTitle="No kitchen data available"
      emptyDescription="Marked tickets in the KDS will populate this report."
    />
  )
}
