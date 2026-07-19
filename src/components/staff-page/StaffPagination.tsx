import { Button } from "../ds/Button"
import { colors, font } from "../ds/tokens"

interface StaffPaginationProps {
  currentPage: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
}

export function StaffPagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}: StaffPaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize)
  const start = (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, totalItems)

  if (totalItems <= pageSize) return null

  return (
    <div
      className="flex items-center justify-between border-t px-5 py-4"
      style={{ borderColor: colors.borderLight }}
    >
      <p
        style={{
          fontFamily: font.family,
          fontSize: font.size.sm,
          color: colors.textMuted,
        }}
      >
        Showing {start}&#x2013;{end} of {totalItems}
      </p>
      <div className="flex gap-1">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
