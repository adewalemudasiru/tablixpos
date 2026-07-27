import { AppLogo } from "../AppLogo"
import { NavMenu } from "../NavMenu"

interface KDSHeaderProps {
  theme: string
  isDark: boolean
}

export function KDSHeader({ isDark }: KDSHeaderProps) {
  const borderColor = isDark ? "#3c3c3e" : "var(--page-border)"
  const background = isDark ? "#1c1c1e" : "var(--page-surface)"

  return (
    <header
      className="z-30 flex h-[69px] shrink-0 items-center justify-between border-b px-4 md:px-6"
      style={{ background, borderColor }}
    >
      <div className="flex items-center gap-3">
        <AppLogo />
        <NavMenu />
      </div>
    </header>
  )
}
