import { useEffect, useRef } from "react"
import { useLocation } from "react-router"
import { useAppStore } from "../../store/AppContext"
import { useAppInit } from "../../hooks/useAppInit"
import { AUTH_ROUTES } from "../../config/constants"

export function AppInitRunner() {
  const location = useLocation()
  const { setAppInitLoading } = useAppStore()
  const { init } = useAppInit()
  const initDoneRef = useRef(false)

  useEffect(() => {
    if (initDoneRef.current) return
    if (!AUTH_ROUTES.includes(location.pathname)) return

    initDoneRef.current = true
    setAppInitLoading(true)
    init().finally(() => setAppInitLoading(false))
  }, [location.pathname, init, setAppInitLoading])

  return null
}
