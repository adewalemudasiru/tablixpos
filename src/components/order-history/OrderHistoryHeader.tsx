import { AppLogo } from "../AppLogo"
import { NavMenu } from "../NavMenu"

interface OrderHistoryHeaderProps {
  isEmbedded?: boolean
  isDark?: boolean
  onSearchClick?: () => void
  onExportClick?: () => void
}

export function OrderHistoryHeader({
  isEmbedded = false,
  isDark = false,
}: OrderHistoryHeaderProps) {
  return (
    <header
      className={`z-30 flex h-[69px] shrink-0 items-center justify-between border-b px-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)] md:px-6`}
      style={{
        background: isEmbedded
          ? isDark
            ? "#1c1c1e"
            : "#f4f4f6"
          : "var(--page-header-bg)",
        borderColor: isEmbedded
          ? isDark
            ? "#3c3c3e"
            : "#e5e7eb"
          : "var(--page-header-border)",
      }}
    >
      <div className="flex items-center gap-3">
        {!isEmbedded && <AppLogo />}
        {!isEmbedded && <NavMenu />}
        {isEmbedded && (
          <h1
            className={`text-xl font-semibold ${
              isDark ? "text-white" : "text-[#111827]"
            }`}
          >
            Orders
          </h1>
        )}
      </div>
    </header>
  )
}
