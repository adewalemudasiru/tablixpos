import { Routes, Route, Navigate } from "react-router"

// Page imports
import OtpPage from "../pages/OtpPage"
import CreatePinPage from "../pages/CreatePinPage"
import EnterPinPage from "../pages/EnterPinPage"
import LoginPage from "../pages/LoginPage"
import SignupPage from "../pages/SignupPage"
import DashboardPage from "../pages/DashboardPage"
import CustomerPage from "../pages/CustomerPage"
import KDSPage from "../pages/KDSPage"
import MenuViewPage from "../pages/MenuViewPage"
import OrderHistoryPage from "../pages/OrderHistoryPage"
import ForgotPasswordPage from "../pages/ForgotPasswordPage"
import TablesPage from "../pages/TablesPage"
import { GlobalRoutes } from "./GlobalRoutes"

import { RouteGuard } from "./RouteGuard"
import { TrialBanner } from "../components/banners/TrialBanner"

export function AppRoutes() {
  return (
    <RouteGuard>
      <TrialBanner />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/create-pin" element={<CreatePinPage />} />
        <Route path="/enter-pin" element={<EnterPinPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/kds" element={<KDSPage />} />
        <Route path="/menu-view" element={<MenuViewPage />} />
        <Route path="/orders" element={<OrderHistoryPage />} />
        <Route path="/tables" element={<TablesPage />} />
        {GlobalRoutes}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </RouteGuard>
  )
}
