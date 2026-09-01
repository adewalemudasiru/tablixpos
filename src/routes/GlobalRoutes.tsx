import { Route } from "react-router"
import SettingsLayout from "../components/layout/SettingsLayout"
import ReportsPage from "../pages/ReportsPage"
import InventoryPage from "../pages/InventoryPage"
import MenuPage from "../pages/MenuPage"
import StaffPage from "../pages/StaffPage"
import ExpensesPage from "../pages/ExpensesPage"
import BillingPage from "../pages/BillingPage"
import SettingsPage from "../pages/SettingsPage"
import AccountSettingsPage from "../pages/AccountSettingsPage"
import SettlementsPage from "../pages/SettlementsPage"

export const GlobalRoutes = (
  <Route element={<SettingsLayout />}>
    <Route path="reports" element={<ReportsPage />} />
    <Route path="inventory" element={<InventoryPage />} />
    <Route path="menu" element={<MenuPage />} />
    <Route path="staff" element={<StaffPage />} />
    <Route path="expenses" element={<ExpensesPage />} />
    <Route path="billing" element={<BillingPage />} />
    <Route path="settings" element={<SettingsPage />} />
    <Route path="account-settings" element={<AccountSettingsPage />} />
    <Route path="settlements" element={<SettlementsPage />} />
  </Route>
)
