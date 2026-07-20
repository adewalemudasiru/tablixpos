import { Link, useLocation } from "react-router"
import { useAppStore } from "../../store/AppContext"
import { PUBLIC_ROUTES } from "../../config/constants"
import { INTER } from "../../config/constants"

export function TrialBanner() {
  const { isReadOnly } = useAppStore()
  const location = useLocation()

  if (!isReadOnly) return null
  if (PUBLIC_ROUTES.includes(location.pathname)) return null

  return (
    <div
      className="flex w-full items-center justify-center px-4 py-2"
      style={{
        background: "#fee2e2",
        borderBottom: "1px solid #fecaca",
        zIndex: 50,
      }}
    >
      <p
        style={{
          fontFamily: INTER,
          fontSize: 13,
          color: "#991b1b",
          margin: 0,
          textAlign: "center",
        }}
      >
        <strong style={{ fontWeight: 700 }}>
          Your free trial has expired.
        </strong>{" "}
        You have read-only access.{" "}
        <Link
          to="/billing"
          style={{
            color: "#e91835",
            textDecoration: "underline",
            fontWeight: 600,
          }}
        >
          Subscribe to Premium
        </Link>{" "}
        to unlock write access.
      </p>
    </div>
  )
}
