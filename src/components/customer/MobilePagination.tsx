import { Button } from "../ds/Button"
import { font } from "../ds"
import { colors } from "../ds/tokens"

interface MobilePaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function MobilePagination({
  page,
  totalPages,
  onPageChange,
}: MobilePaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 px-4 pb-4">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>
      <span
        style={{
          fontFamily: font.family,
          fontSize: font.size.sm,
          color: colors.textMuted,
        }}
      >
        {page} / {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  )
}
