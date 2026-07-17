import { TablixLogo } from "../../components/menu-view/TablixLogo"

const INTER = "'Inter', sans-serif"
const RED = "#e91835"

interface RestaurantHeaderProps {
  restaurantName: string
  availableCount: number
}

export function RestaurantHeader({
  restaurantName,
  availableCount,
}: RestaurantHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-gray-50 px-4 py-3">
      <TablixLogo size={22} />
      <div className="flex flex-col items-center">
        <p
          style={{
            fontFamily: INTER,
            fontWeight: 700,
            fontSize: 16,
            color: "#111827",
            lineHeight: "20px",
          }}
        >
          {restaurantName}
        </p>
        <div className="mt-0.5 flex items-center gap-1">
          <div
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "#10b981" }}
          />
          <span style={{ fontFamily: INTER, fontSize: 11, color: "#6b7280" }}>
            {availableCount} items available
          </span>
        </div>
      </div>
      <div
        className="flex size-9 items-center justify-center rounded-full"
        style={{ background: "var(--c-primary-light)" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3"
            stroke={RED}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
