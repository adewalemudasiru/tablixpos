import { AppLogo } from "../AppSidebar"
import { Button } from "../ds/Button"
import { IconSearch, IconPlus } from "@tabler/icons-react"
import { NavMenu } from "../NavMenu"

interface CustomerHeaderProps {
  isEmbedded: boolean
  isDark: boolean
  onSearchClick: () => void
  onAddClick: () => void
  isReadOnly: boolean
}

export function CustomerHeader({
  isEmbedded,
  isDark,
  onSearchClick,
  onAddClick,
  isReadOnly,
}: CustomerHeaderProps) {
  return (
    <header
      className={`z-30 flex h-[69px] shrink-0 items-center justify-between border-b px-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]`}
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
            className={`text-xl font-semibold ${isDark ? "text-white" : "text-[#111827]"}`}
          >
            Customers
          </h1>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onSearchClick}
          className={`rounded-full p-2 transition-colors hover:bg-[var(--page-surface-2)]`}
          title="Search Customers"
        >
          <IconSearch className={`h-5 w-5 text-[var(--page-text-muted)]`} />
        </button>
        <Button
          variant="primary"
          size="sm"
          disabled={isReadOnly}
          onClick={onAddClick}
        >
          <IconPlus />
          <span className="hidden md:block">Add Customer</span>
        </Button>
      </div>
    </header>
  )
}
