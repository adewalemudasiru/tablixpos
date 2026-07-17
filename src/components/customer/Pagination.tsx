import { Button } from "../ds/Button"
import { font } from "../ds"

interface PaginationProps {
  page: number
  total: number
  pageSize?: number
  onChange: (page: number) => void
  showLabel?: boolean
  className?: string
}

export function Pagination({
  page,
  total,
  pageSize = 10,
  onChange,
  showLabel = true,
  className = "",
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize)

  if (totalPages <= 1) return null

  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  // Generate page numbers to display with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)

      let startPage = Math.max(2, page - 1)
      let endPage = Math.min(totalPages - 1, page + 1)

      // Adjust to show more pages when near edges
      if (page <= 3) {
        endPage = Math.min(totalPages - 1, 4)
      } else if (page >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3)
      }

      if (startPage > 2) pages.push("...")

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      if (endPage < totalPages - 1) pages.push("...")
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div
      className={`flex items-center justify-between border-t border-[var(--page-border)] pt-4 ${className}`}
    >
      {showLabel && (
        <p
          style={{
            fontFamily: font.family,
            fontSize: font.size.sm,
            color: "var(--page-text-muted)",
          }}
        >
          Showing {start}–{end} of {total} customers
        </p>
      )}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          leftIcon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 12H5M5 12l7 7M5 12l7-7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        >
          Previous
        </Button>

        <div className="flex gap-1">
          {getPageNumbers().map((p, index) =>
            typeof p === "number" ? (
              <Button
                key={p}
                size="sm"
                variant={p === page ? "primary" : "outline"}
                onClick={() => onChange(p)}
                style={{ minWidth: 36 }}
              >
                {p}
              </Button>
            ) : (
              <span
                key={`ellipsis-${index}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 36,
                  color: "var(--page-text-muted)",
                  fontFamily: font.family,
                  fontSize: font.size.sm,
                }}
              >
                {p}
              </span>
            )
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages}
          onClick={() => onChange(page + 1)}
          rightIcon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M13 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        >
          Next
        </Button>
      </div>
    </div>
  )
}
