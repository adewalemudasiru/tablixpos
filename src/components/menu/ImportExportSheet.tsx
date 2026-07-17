import { colors, font } from "../ds/tokens"

interface ImportExportSheetProps {
  open: boolean
  onClose: () => void
  onImport: () => void
  onExport: () => void
}

export function ImportExportSheet({
  open,
  onClose,
  onImport,
  onExport,
}: ImportExportSheetProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:hidden"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div
        className="page-card relative flex w-full flex-col"
        style={{ borderRadius: "20px 20px 0 0", paddingBottom: 32 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center py-3">
          <div className="h-1 w-10 rounded-full bg-muted" />
        </div>

        <div
          className="page-border px-6 pb-5"
          style={{ borderBottom: `1px solid ${colors.borderLight}` }}
        >
          <p
            style={{
              fontFamily: font.family,
              fontWeight: font.weight.semibold,
              fontSize: font.size.lg,
              color: colors.textPrimary,
            }}
          >
            Import / Export
          </p>
          <p
            style={{
              fontFamily: font.family,
              fontSize: font.size.sm,
              color: colors.textMuted,
              marginTop: 4,
            }}
          >
            Choose an action for your menu data
          </p>
        </div>

        <div className="flex flex-col gap-3 px-6 pt-5">
          {/* Import */}
          <button
            className="flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-colors active:bg-gray-50"
            style={{
              border: `1px solid var(--page-border, ${colors.borderLight})`,
              background: "var(--page-surface, #fafafa)",
              cursor: "pointer",
            }}
            onClick={onImport}
          >
            <div
              className="flex size-12 shrink-0 items-center justify-center rounded-xl"
              style={{ background: colors.primaryLight }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"
                  stroke={colors.primary}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 10l5 5 5-5M12 15V3"
                  stroke={colors.primary}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p
                style={{
                  fontFamily: font.family,
                  fontWeight: font.weight.semibold,
                  fontSize: font.size.base,
                  color: colors.textPrimary,
                }}
              >
                Import Menu
              </p>
              <p
                style={{
                  fontFamily: font.family,
                  fontSize: font.size.sm,
                  color: colors.textMuted,
                  marginTop: 2,
                }}
              >
                Upload a CSV or Excel file to bulk-add items
              </p>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              style={{ color: colors.textMuted, flexShrink: 0 }}
            >
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Export */}
          <button
            className="flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-colors active:bg-gray-50"
            style={{
              border: `1px solid var(--page-border, ${colors.borderLight})`,
              background: "var(--page-surface, #fafafa)",
              cursor: "pointer",
            }}
            onClick={onExport}
          >
            <div
              className="flex size-12 shrink-0 items-center justify-center rounded-xl"
              style={{ background: "#ecfdf5" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"
                  stroke="#059669"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 8l-5-5-5 5M12 3v12"
                  stroke="#059669"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p
                style={{
                  fontFamily: font.family,
                  fontWeight: font.weight.semibold,
                  fontSize: font.size.base,
                  color: colors.textPrimary,
                }}
              >
                Export Menu
              </p>
              <p
                style={{
                  fontFamily: font.family,
                  fontSize: font.size.sm,
                  color: colors.textMuted,
                  marginTop: 2,
                }}
              >
                Download all menu items as a CSV file
              </p>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              style={{ color: colors.textMuted, flexShrink: 0 }}
            >
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="px-6 pt-4">
          <button
            className="w-full rounded-xl py-3.5"
            style={{
              fontFamily: font.family,
              fontWeight: font.weight.semibold,
              fontSize: font.size.base,
              color: colors.textSecondary,
              background: "#f3f4f6",
              border: "none",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
