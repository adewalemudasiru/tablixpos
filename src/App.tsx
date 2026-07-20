import { BrowserRouter, Routes, Route } from "react-router"
import { AppErrorBoundary } from "./components/auth/AppErrorBoundary"
import { MainApp } from "./MainApp"

export default function App() {
  return (
    <AppErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<MainApp />} />
        </Routes>
      </BrowserRouter>
    </AppErrorBoundary>
  )
}
