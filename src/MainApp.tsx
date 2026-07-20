import { useState } from "react"
import { AppProvider } from "./store/AppContext"
import { AppInitRunner } from "./components/auth/AppInitRunner"
import { AppRoutes } from "./routes/AppRoutes"
import { ImpersonationBanner } from "./components/banners/ImpersonationBanner"
import { NotificationBell } from "./components/NotificationBell"
import { PwaStatusBanner } from "./components/PwaStatusBanner"

export function MainApp() {
  const [hasImpersonation] = useState(() => {
    try {
      return !!sessionStorage.getItem("tablix_impersonating")
    } catch (_) {
      return false
    }
  })

  return (
    <AppProvider>
      <AppInitRunner />
      {hasImpersonation && <ImpersonationBanner />}
      <PwaStatusBanner />
      <NotificationBell />
      <AppRoutes />
    </AppProvider>
  )
}
