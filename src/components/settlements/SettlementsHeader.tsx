import { AppLogo } from "../AppLogo"
import { NavMenu } from "../NavMenu"

export function SettlementsHeader() {
  return (
    <header
      className="z-30 flex h-[69px] shrink-0 items-center justify-between border-b px-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)] md:px-6"
      style={{
        background: "var(--page-header-bg)",
        borderColor: "var(--page-header-border)",
      }}
    >
      <div className="flex items-center gap-3">
        <AppLogo />
        <NavMenu />
      </div>
    </header>
  )
}
