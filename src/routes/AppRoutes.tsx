import { Routes, Route, Navigate } from "react-router"

// Page imports
import OtpPage from "../pages/OtpPage"
import CreatePinPage from "../pages/CreatePinPage"
import EnterPinPage from "../pages/EnterPinPage"
import DashboardPage from "../pages/DashboardPage"
import ReportsPage from "../pages/ReportsPage"
import InventoryPage from "../pages/InventoryPage"
import MenuPage from "../pages/MenuPage"
import CustomerPage from "../pages/CustomerPage"
import StaffPage from "../pages/StaffPage"
import ExpensesPage from "../pages/ExpensesPage"
import BillingPage from "../pages/BillingPage"
import SettingsPage from "../pages/SettingsPage"
import KDSPage from "../pages/KDSPage"
import MenuViewPage from "../pages/MenuViewPage"
import OrderHistoryPage from "../pages/OrderHistoryPage"
import ForgotPasswordPage from "../pages/ForgotPasswordPage"
import TablesPage from "../pages/TablesPage"
import SettlementsPage from "../pages/SettlementsPage"

import { RouteGuard } from "./RouteGuard"
import { TrialBanner } from "../components/banners/TrialBanner"

export function AppRoutes() {
  return (
    <RouteGuard>
      <TrialBanner />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Navigate to="/dashboard" replace />} />
        <Route path="/signup" element={<Navigate to="/dashboard" replace />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/create-pin" element={<CreatePinPage />} />
        <Route path="/enter-pin" element={<EnterPinPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/kds" element={<KDSPage />} />
        <Route path="/menu-view" element={<MenuViewPage />} />
        <Route path="/orders" element={<OrderHistoryPage />} />
        <Route path="/tables" element={<TablesPage />} />
        <Route path="/settlements" element={<SettlementsPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </RouteGuard>
  )
}
