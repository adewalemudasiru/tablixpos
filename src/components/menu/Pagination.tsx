import { colors, font } from "../ds"
import { Button } from "../ds/Button"

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number
  totalPages: number
  onChange: (p: number) => void
}) {
  if (totalPages <= 1) return null

  const pages: (number | "…")[] = []
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    pages.push(1, 2, 3, "…")
    if (page > 3 && page < totalPages - 2) pages.push(page)
    pages.push(totalPages - 1, totalPages)
  }

  return (
    <div className="mt-4 flex items-center justify-between">
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
        {pages.map((p, i) =>
          p === "…" ? (
            <span
              key={`e-${i}`}
              style={{
                fontFamily: font.family,
                fontSize: font.size.base,
                color: colors.textMuted,
                padding: "0 6px",
                lineHeight: "36px",
              }}
            >
              …
            </span>
          ) : (
            <Button
              key={`p-${p}`}
              size="sm"
              variant={p === page ? "primary" : "outline"}
              onClick={() => onChange(p as number)}
              style={{ minWidth: 36 }}
            >
              {p}
            </Button>
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
  )
}
