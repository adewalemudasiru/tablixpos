import { TablixLogo } from "../../components/menu-view/TablixLogo"

const INTER = "'Inter', sans-serif"

export function MenuFooter() {
  return (
    <footer
      className="fixed right-0 bottom-0 left-0 z-20"
      style={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid #f0f0f0",
      }}
    >
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-4 py-3">
        <span style={{ fontFamily: INTER, fontSize: 11, color: "#9ca3af" }}>
          Prices may vary. Ask staff for today's specials.
        </span>
        <div className="flex shrink-0 items-center gap-1">
          <span style={{ fontFamily: INTER, fontSize: 10, color: "#b0b7c3" }}>
            Powered by
          </span>
          <TablixLogo size={12} />
        </div>
      </div>
    </footer>
  )
}
