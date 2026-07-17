import React, {
  createContext, useContext, useState, useEffect, useCallback,
} from "react";
import { loadTransactions, saveTransaction, seedMockTransactions } from "../services/storage";
import type { Transaction } from "../services/storage";

// ─── Shared Types ─────────────────────────────────────────────────────────────

export type InventoryStatus = "Active" | "Low Stock" | "Out of Stock";
export type SupplierStatus  = "Active" | "Inactive";
export type LogType         = "Stock In" | "Stock Out" | "Adjustment" | "Wastage" | "Transfer";
export type ExpenseCategory = "Food & Beverages" | "Utilities" | "Staff" | "Equipment" | "Maintenance" | "Marketing" | "Other";
export type ExpenseStatus   = "Approved" | "Pending" | "Rejected";
export type Permission = 
  | "pos_access"
  | "kds_access"
  | "manager_override"
  | "manage_staff"
  | "manage_menu"
  | "view_reports"
  | "view_expenses"
  | "manage_inventory"
  | "manage_settings"
  | "manage_tables"
  | "billing_access";

export interface StoreRole {
  id: string;
  name: string;
  permissions: Permission[];
  isLocked?: boolean;
}

export const DEFAULT_ROLES: StoreRole[] = [
  { id: "Admin", name: "Admin (Owner)", permissions: ["pos_access", "kds_access", "manager_override", "manage_staff", "manage_menu", "view_reports", "view_expenses", "manage_inventory", "manage_settings", "manage_tables", "billing_access"], isLocked: true },
  { id: "Manager", name: "Manager", permissions: ["pos_access", "kds_access", "manager_override", "manage_staff", "manage_menu", "view_reports", "view_expenses", "manage_inventory", "manage_tables"] },
  { id: "Cashier", name: "Cashier", permissions: ["pos_access"] },
  { id: "Waiter", name: "Waiter", permissions: ["pos_access"] },
  { id: "Chef", name: "Chef", permissions: ["kds_access"] },
];

export type StaffRole       = string;
export type KDSStatus       = "New" | "In Progress" | "Ready" | "Served";
export type KDSPriority     = "Normal" | "Rush" | "VIP";
export type KDSStation      = string;
export type AppPlan         = "trial" | "monthly" | "yearly";
export type TableStatus     = "available" | "occupied" | "reserved" | "bill_requested";

// ─── Tax Configuration ─────────────────────────────────────────────────────────

export interface TaxConfig {
  enabled: boolean;
  name: string;           // e.g. "VAT", "Sales Tax"
  rate: number;           // percent value, e.g. 7.5
  inclusive: boolean;     // true = price already includes tax
  serviceCharge: boolean;
  serviceRate: number;    // percent, e.g. 10
  showOnReceipt: boolean;
}

const DEFAULT_TAX_CONFIG: TaxConfig = {
  enabled: true,
  name: "VAT",
  rate: 7.5,
  inclusive: false,
  serviceCharge: false,
  serviceRate: 10,
  showOnReceipt: true,
};

// ─── POS / Printer Configuration ──────────────────────────────────────────────

export interface PosConfig {
  receiptHeader: string;
  receiptFooter: string;
  printerType: string;
  paperWidth: string;
  autoPrint: boolean;
  showQR: boolean;
  showLogo: boolean;
  tipsEnabled: boolean;
  cashRounding: boolean;
  requireCustomer: boolean;
}

const DEFAULT_POS_CONFIG: PosConfig = {
  receiptHeader: "Thank you for dining with us!",
  receiptFooter: "Please come again! Visit us online: www.tablixkitchen.ng",
  printerType: "ESC/POS Thermal (80mm)",
  paperWidth: "80mm",
  autoPrint: true,
  showQR: true,
  showLogo: true,
  tipsEnabled: false,
  cashRounding: false,
  requireCustomer: false,
};

// ─── Business Configuration ───────────────────────────────────────────────────

export interface BusinessConfig {
  tagline: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  website: string;
  type: string;
  rcNumber: string;
  trialStartedAt?: string; // ISO date string when trial started
}

const DEFAULT_BUSINESS_CONFIG: BusinessConfig = {
  tagline: "Serving quality, one plate at a time",
  address: "12B Victoria Island Boulevard",
  city: "Lagos",
  state: "Lagos State",
  phone: "+234 801 234 5678",
  email: "hello@tablixkitchen.ng",
  website: "www.tablixkitchen.ng",
  type: "Quick Service Restaurant",
  rcNumber: "RC-12345678",
  trialStartedAt: new Date().toISOString(),
};

// ─── Loyalty Configuration ────────────────────────────────────────────────────

export interface LoyaltyConfig {
  enabled: boolean;
  rewardType: "percentage" | "fixed";
  rewardValue: number;
  threshold: number;
  minPointsToRedeem: number;
  showBalanceOnReceipt: boolean;
  autoEnroll: boolean;
}

const DEFAULT_LOYALTY_CONFIG: LoyaltyConfig = {
  enabled: true,
  rewardType: "percentage",
  rewardValue: 2,
  threshold: 500,
  minPointsToRedeem: 100,
  showBalanceOnReceipt: true,
  autoEnroll: true,
};

export interface MenuVariant  { id: string; name: string; price: number; }
export interface MenuAddon    { id: string; name: string; price: number; }

// Recipe ingredient: how much of a stock ingredient is consumed per serving of a dish
export interface MenuIngredient { ingredientId: string; qty: number; }

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
  variants: MenuVariant[];
  addons: MenuAddon[];
  ingredients: MenuIngredient[]; // recipe -- what gets deducted from inventory on sale
  station?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  unit: string;        // e.g. "kg", "L", "pcs", "g", "cl", "bag"
  qty: number;         // current stock as a plain number
  minQty: number;      // low-stock threshold
  costPerUnit: number; // cost per unit in Naira (numeric)
  supplier: string;
  status: InventoryStatus; // auto-derived from qty vs minQty
  [key: string]: unknown;  // index signature for DataTable<T extends Record<string, unknown>>
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address?: string;
  itemsSupplied: string;
  totalOrders: number;
  status: SupplierStatus;
  [key: string]: unknown;  // index signature for DataTable<T extends Record<string, unknown>>
}

export interface InventoryLogEntry {
  id: string;
  date: string;
  time: string;
  itemName: string;
  type: LogType;
  quantity: string;
  prevStock: string;
  newStock: string;
  performedBy: string;
  note: string;
  [key: string]: unknown;  // index signature for DataTable<T extends Record<string, unknown>>
}

export interface StoreCustomer {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalSpent: number;
  visitCount: number;
  lastVisit: string;
  joinDate: string;
  loyaltyPoints: number;
  [key: string]: unknown;  // index signature for DataTable<T extends Record<string, unknown>>
}

export interface StoreStaff {
  id: string;
  name: string;
  email: string;
  role: StaffRole;
  pin: string;
  dateCreated: string;
  assignedStation?: string;
  [key: string]: unknown;  // index signature for DataTable<T extends Record<string, unknown>>
}

export interface Expense {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  paidBy: string;
  paymentMethod?: string;
  reference?: string;
  status: ExpenseStatus;
  notes: string;
  [key: string]: unknown;  // index signature for DataTable<T extends Record<string, unknown>>
}

export interface KDSOrderItem {
  id: string;
  name: string;
  qty: number;
  notes: string;
  done: boolean;
}

export interface KDSOrder {
  id: string;
  orderNo: string;
  tableNo: string;
  customer: string;
  status: KDSStatus;
  priority: KDSPriority;
  items: KDSOrderItem[];
  placedAt: string;
  startedAt: string | null;
  readyAt: string | null;
  station: KDSStation;
}

export interface RestaurantTable {
  id: string;
  name: string;        // display label e.g. "T1", "VIP 2"
  seats: number;
  zone: string;        // e.g. "Main Hall", "Outdoor", "VIP"
  status: TableStatus;
  occupiedAt?: string; // ISO timestamp
  customerName?: string;
  orderTotal?: number;
  shape?: "square" | "round" | "rectangle";
}

export type { Transaction };

// ─── Plan Limits ──────────────────────────────────────────────────────────────

// ─── Trial Expiration Check ───────────────────────────────────────────────────

export function checkTrialExpired(trialStartedAt?: string): boolean {
  if (!trialStartedAt) return false;
  const started = new Date(trialStartedAt).getTime();
  const now = new Date().getTime();
  const daysDiff = (now - started) / (1000 * 60 * 60 * 24);
  return daysDiff > 7;
}


// ─── App State ────────────────────────────────────────────────────────────────

interface AppState {
  menuItems:      MenuItem[];
  menuCategories: MenuCategory[];
  inventoryItems: InventoryItem[];
  inventoryLog:   InventoryLogEntry[];
  suppliers:      Supplier[];
  customers:      StoreCustomer[];
  staff:          StoreStaff[];
  roles:          StoreRole[];
  stations:       string[];
  expenses:       Expense[];
  kdsOrders:      KDSOrder[];
  tables:         RestaurantTable[];
  transactions:   Transaction[];
  taxConfig:      TaxConfig;
  posConfig:      PosConfig;
  businessConfig: BusinessConfig;
  loyaltyConfig:  LoyaltyConfig;
  logo:           string | null;
  theme:          "light" | "dark";
}

interface AppContextValue extends AppState {
  plan: AppPlan;
  setPlan: (p: AppPlan) => void;
  isReadOnly: boolean;
  resetAppState: (initialData?: { name?: string; email?: string; phone?: string }) => void;
  logo: string | null;
  setLogo: (v: string | null) => void;
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
  activeStaff: StoreStaff | null;
  setActiveStaff: (s: StoreStaff | null) => void;
  // --- Menu ---
  setMenuItems: (items: MenuItem[]) => void;
  setMenuCategories: (cats: MenuCategory[]) => void;
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  addMenuCategory: (cat: MenuCategory) => void;
  updateMenuCategory: (cat: MenuCategory) => void;
  deleteMenuCategory: (id: string) => void;
  // --- Inventory ---
  addInventoryItem: (item: InventoryItem) => void;
  updateInventoryItem: (item: InventoryItem) => void;
  deleteInventoryItem: (id: string) => void;
  addInventoryLogEntry: (entry: InventoryLogEntry) => void;
  // consumeIngredients: auto-deducts ingredient quantities from stock based on a dish recipe
  consumeIngredients: (soldItems: { menuItemId: string; qty: number }[], performedBy?: string) => void;
  // stockIn: adds quantity to an ingredient and writes a log entry
  stockIn: (ingredientId: string, qty: number, performedBy: string, note?: string) => void;
  addSupplier: (s: Supplier) => void;
  updateSupplier: (s: Supplier) => void;
  deleteSupplier: (id: string) => void;
  // --- Customers ---
  addCustomer: (c: StoreCustomer) => void;
  updateCustomer: (c: StoreCustomer) => void;
  deleteCustomer: (id: string) => void;
  addLoyaltyPoints: (customerId: string, points: number, spent: number) => void;
  // --- Staff & Roles ---
  addStaffMember: (s: StoreStaff) => void;
  updateStaffMember: (s: StoreStaff) => void;
  deleteStaffMember: (id: string) => void;
  addRole: (r: StoreRole) => void;
  updateRole: (r: StoreRole) => void;
  deleteRole: (id: string) => void;
  // --- Stations ---
  addStation: (name: string) => void;
  deleteStation: (name: string) => void;
  // --- Expenses ---
  setExpenses: (e: Expense[]) => void;
  addExpense: (e: Expense) => void;
  updateExpense: (e: Expense) => void;
  deleteExpense: (id: string) => void;
  // --- Transactions ---
  addTransaction: (tx: Transaction) => void;
  // voidTransaction: marks a transaction as voided/refunded in-memory and updates localStorage
  voidTransaction: (id: string, approvedBy: string, refund?: boolean) => void;
  // --- KDS ---
  addKDSOrder: (order: KDSOrder) => void;
  updateKDSOrder: (order: KDSOrder) => void;
  removeKDSOrder: (id: string) => void;
  // --- Tables ---
  setTables: (ts: RestaurantTable[]) => void;
  addTable: (t: RestaurantTable) => void;
  updateTable: (t: RestaurantTable) => void;
  deleteTable: (id: string) => void;
  setTableStatus: (id: string, status: TableStatus, extra?: Partial<RestaurantTable>) => void;
  // --- App Init ---
  appInitLoading: boolean;
  setAppInitLoading: (v: boolean) => void;
  // --- Settings ---
  kotEnabled: boolean;
  setKotEnabled: (v: boolean) => void;
  tablesEnabled: boolean;
  setTablesEnabled: (v: boolean) => void;
  restaurantName: string;
  setRestaurantName: (v: string) => void;
  menuUrl: string;
  setMenuUrl: (v: string) => void;
  // --- Tax ---
  taxConfig: TaxConfig;
  setTaxConfig: (cfg: TaxConfig) => void;
  // --- POS ---
  posConfig: PosConfig;
  setPosConfig: (cfg: PosConfig) => void;
  // --- Business ---
  businessConfig: BusinessConfig;
  setBusinessConfig: (cfg: BusinessConfig) => void;
  // --- Loyalty ---
  loyaltyConfig: LoyaltyConfig;
  setLoyaltyConfig: (cfg: LoyaltyConfig) => void;
}

// ─── Storage ──────────────────────────────────────────────────────────────────

// v7 key -- dark mode default + complete mock data for all features
const STORAGE_KEY = "tablix_app_store_v7";

// Default owner PIN written to localStorage if none exists yet
const DEFAULT_OWNER_PIN = "000000";

const DEFAULT_STAFF: StoreStaff[] = [];

const EMPTY_STATE: Omit<AppState, "transactions"> = {
  menuItems: [
    { id: "menu-1", name: "Classic Cheeseburger", price: 5500, category: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop", available: true, variants: [], addons: [{ id: "add-1", name: "Extra Cheese", price: 500 }, { id: "add-2", name: "Bacon Slice", price: 1000 }], ingredients: [{ ingredientId: "inv-1", qty: 1 }, { ingredientId: "inv-2", qty: 1 }, { ingredientId: "inv-4", qty: 0.05 }, { ingredientId: "inv-9", qty: 0.05 }] },
    { id: "menu-1b", name: "BBQ Bacon Burger", price: 6500, category: "Burgers", image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop", available: true, variants: [], addons: [{ id: "add-1", name: "Extra Cheese", price: 500 }], ingredients: [{ ingredientId: "inv-1", qty: 1 }, { ingredientId: "inv-2", qty: 1 }, { ingredientId: "inv-9", qty: 0.03 }] },
    { id: "menu-1c", name: "Double Smash Burger", price: 8500, category: "Burgers", image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop", available: true, variants: [], addons: [{ id: "add-1", name: "Extra Cheese", price: 500 }, { id: "add-2", name: "Bacon Slice", price: 1000 }], ingredients: [{ ingredientId: "inv-1", qty: 2 }, { ingredientId: "inv-2", qty: 1 }, { ingredientId: "inv-4", qty: 0.08 }] },
    { id: "menu-2", name: "Chicken Wings (6pcs)", price: 4000, category: "Appetizers", image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=300&fit=crop", available: true, variants: [], addons: [], ingredients: [{ ingredientId: "inv-8", qty: 0.3 }] },
    { id: "menu-2b", name: "Mozzarella Sticks", price: 3500, category: "Appetizers", image: "https://images.unsplash.com/photo-1531749668029-2db88e4b76c0?w=400&h=300&fit=crop", available: true, variants: [], addons: [], ingredients: [{ ingredientId: "inv-4", qty: 0.25 }] },
    { id: "menu-2c", name: "Garlic Bread with Cheese", price: 2800, category: "Appetizers", image: "https://images.unsplash.com/photo-1573145959956-e9fae6b6befe?w=400&h=300&fit=crop", available: true, variants: [], addons: [], ingredients: [{ ingredientId: "inv-4", qty: 0.1 }] },
    { id: "menu-3", name: "Margarita Pizza", price: 8500, category: "Pizza", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop", available: true, variants: [{ id: "pv-1", name: "Medium", price: 8500 }, { id: "pv-2", name: "Large", price: 12500 }], addons: [{ id: "add-1", name: "Extra Cheese", price: 1000 }], ingredients: [{ ingredientId: "inv-5", qty: 1 }, { ingredientId: "inv-4", qty: 0.15 }, { ingredientId: "inv-10", qty: 0.1 }] },
    { id: "menu-3b", name: "Pepperoni Pizza", price: 9500, category: "Pizza", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop", available: true, variants: [{ id: "pv-3", name: "Medium", price: 9500 }, { id: "pv-4", name: "Large", price: 14000 }], addons: [{ id: "add-1", name: "Extra Cheese", price: 1000 }], ingredients: [{ ingredientId: "inv-5", qty: 1 }, { ingredientId: "inv-4", qty: 0.12 }, { ingredientId: "inv-6", qty: 0.08 }] },
    { id: "menu-3c", name: "Veggie Supreme Pizza", price: 9000, category: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop", available: true, variants: [{ id: "pv-5", name: "Medium", price: 9000 }, { id: "pv-6", name: "Large", price: 13000 }], addons: [], ingredients: [{ ingredientId: "inv-5", qty: 1 }, { ingredientId: "inv-4", qty: 0.1 }, { ingredientId: "inv-10", qty: 0.08 }, { ingredientId: "inv-9", qty: 0.03 }] },
    { id: "menu-5", name: "Spaghetti Bolognese", price: 7500, category: "Pasta", image: "https://images.unsplash.com/photo-1563379971899-660589a01cd3?w=400&h=300&fit=crop", available: true, variants: [], addons: [], ingredients: [{ ingredientId: "inv-14", qty: 0.12 }, { ingredientId: "inv-1", qty: 0.1 }] },
    { id: "menu-5b", name: "Creamy Chicken Alfredo", price: 8000, category: "Pasta", image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&h=300&fit=crop", available: true, variants: [], addons: [], ingredients: [{ ingredientId: "inv-14", qty: 0.12 }, { ingredientId: "inv-8", qty: 0.15 }, { ingredientId: "inv-11", qty: 0.1 }] },
    { id: "menu-6", name: "French Fries", price: 2000, category: "Sides", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop", available: true, variants: [], addons: [], ingredients: [{ ingredientId: "inv-7", qty: 0.25 }] },
    { id: "menu-6b", name: "Onion Rings", price: 2500, category: "Sides", image: "https://images.unsplash.com/photo-1639024471283-2bc7b3c6a267?w=400&h=300&fit=crop", available: true, variants: [], addons: [], ingredients: [] },
    { id: "menu-6c", name: "Sweet Potato Fries", price: 2500, category: "Sides", image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=400&h=300&fit=crop", available: true, variants: [], addons: [], ingredients: [] },
    { id: "menu-4", name: "Coca Cola (Can)", price: 1000, category: "Drinks", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=300&fit=crop", available: true, variants: [], addons: [], ingredients: [{ ingredientId: "inv-3", qty: 1 }] },
    { id: "menu-4b", name: "Fresh Orange Juice", price: 2000, category: "Drinks", image: "https://images.unsplash.com/photo-1613478223719-2ab80260f1a3?w=400&h=300&fit=crop", available: true, variants: [], addons: [], ingredients: [{ ingredientId: "inv-10", qty: 0.2 }] },
    { id: "menu-4c", name: "Caffe Latte", price: 1800, category: "Drinks", image: "https://images.unsplash.com/photo-1570968915860-54d5c301fc9f?w=400&h=300&fit=crop", available: true, variants: [], addons: [], ingredients: [{ ingredientId: "inv-13", qty: 0.015 }] },
    { id: "menu-7", name: "Chocolate Lava Cake", price: 3500, category: "Desserts", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop", available: true, variants: [], addons: [], ingredients: [] },
    { id: "menu-7b", name: "Apple Crumble", price: 3800, category: "Desserts", image: "https://images.unsplash.com/photo-1507226983735-a838615193b0?w=400&h=300&fit=crop", available: true, variants: [], addons: [], ingredients: [] },
    { id: "menu-8", name: "Chicken Caesar Salad", price: 4500, category: "Salads", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=300&fit=crop", available: true, variants: [], addons: [], ingredients: [{ ingredientId: "inv-8", qty: 0.15 }, { ingredientId: "inv-9", qty: 0.1 }] },
    { id: "menu-8b", name: "Caprese Salad", price: 3800, category: "Salads", image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=400&h=300&fit=crop", available: true, variants: [], addons: [], ingredients: [{ ingredientId: "inv-4", qty: 0.1 }, { ingredientId: "inv-10", qty: 0.15 }] },
    { id: "menu-9", name: "Virgin Mojito", price: 2500, category: "Cocktails", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop", available: true, variants: [{ id: "v-1", name: "Regular", price: 2500 }, { id: "v-2", name: "Jumbo", price: 3800 }], addons: [], ingredients: [] },
    { id: "menu-9b", name: "Strawberry Daiquiri", price: 3000, category: "Cocktails", image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400&h=300&fit=crop", available: true, variants: [], addons: [], ingredients: [] },
    { id: "menu-10", name: "Grilled Salmon", price: 12500, category: "Seafood", image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&h=300&fit=crop", available: false, variants: [], addons: [], ingredients: [{ ingredientId: "inv-12", qty: 0.25 }] },
    { id: "menu-10b", name: "Crispy Fried Prawns", price: 8500, category: "Seafood", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop", available: true, variants: [], addons: [], ingredients: [{ ingredientId: "inv-15", qty: 0.2 }] }
  ],
  menuCategories: [
    { id: "cat-1", name: "Burgers", description: "Juicy handcrafted burgers", active: true },
    { id: "cat-2", name: "Appetizers", description: "Start your meal right", active: true },
    { id: "cat-3", name: "Pizza", description: "Wood-fired oven pizzas", active: true },
    { id: "cat-4", name: "Pasta", description: "Italian classic pastas", active: true },
    { id: "cat-5", name: "Sides", description: "Extra accompaniments", active: true },
    { id: "cat-6", name: "Drinks", description: "Cold beverages", active: true },
    { id: "cat-7", name: "Desserts", description: "Sweet treats", active: true },
    { id: "cat-8", name: "Salads", description: "Healthy fresh green salads", active: true },
    { id: "cat-9", name: "Cocktails", description: "Refreshing craft cocktails and mocktails", active: true },
    { id: "cat-10", name: "Seafood", description: "Fresh catch and ocean delights", active: true }
  ],
  inventoryItems: [
    { id: "inv-1", name: "Beef Patty", unit: "pcs", qty: 150, minQty: 30, costPerUnit: 1200, supplier: "Meat Co", status: "Active" },
    { id: "inv-2", name: "Burger Buns", unit: "pack", qty: 25, minQty: 10, costPerUnit: 3500, supplier: "Local Bakery", status: "Active" },
    { id: "inv-3", name: "Coke Cans", unit: "carton", qty: 5, minQty: 10, costPerUnit: 15000, supplier: "BevDistributors", status: "Low Stock" },
    { id: "inv-4", name: "Mozzarella Cheese", unit: "kg", qty: 45, minQty: 15, costPerUnit: 4800, supplier: "Dairy Fresh", status: "Active" },
    { id: "inv-5", name: "Pizza Dough", unit: "pcs", qty: 80, minQty: 20, costPerUnit: 500, supplier: "Local Bakery", status: "Active" },
    { id: "inv-6", name: "Pepperoni Slices", unit: "kg", qty: 12, minQty: 5, costPerUnit: 6000, supplier: "Meat Co", status: "Active" },
    { id: "inv-7", name: "Potatoes", unit: "kg", qty: 100, minQty: 30, costPerUnit: 800, supplier: "Veggie Farm", status: "Active" },
    { id: "inv-8", name: "Chicken Breast", unit: "kg", qty: 8, minQty: 15, costPerUnit: 4500, supplier: "Meat Co", status: "Low Stock" },
    { id: "inv-9", name: "Lettuce", unit: "kg", qty: 3, minQty: 8, costPerUnit: 1200, supplier: "Veggie Farm", status: "Low Stock" },
    { id: "inv-10", name: "Tomatoes", unit: "kg", qty: 25, minQty: 10, costPerUnit: 1000, supplier: "Veggie Farm", status: "Active" },
    { id: "inv-11", name: "Cooking Cream", unit: "L", qty: 15, minQty: 5, costPerUnit: 3200, supplier: "Dairy Fresh", status: "Active" },
    { id: "inv-12", name: "Salmon Fillets", unit: "kg", qty: 0, minQty: 8, costPerUnit: 12000, supplier: "Seafood Express", status: "Out of Stock" },
    { id: "inv-13", name: "Coffee Beans", unit: "kg", qty: 18, minQty: 5, costPerUnit: 8500, supplier: "Spice & Flavor", status: "Active" },
    { id: "inv-14", name: "Pasta Spaghetti", unit: "kg", qty: 60, minQty: 15, costPerUnit: 1500, supplier: "Global Foods", status: "Active" },
    { id: "inv-15", name: "Prawns", unit: "kg", qty: 14, minQty: 5, costPerUnit: 9500, supplier: "Seafood Express", status: "Active" },
    { id: "inv-16", name: "Cooking Oil", unit: "L", qty: 45, minQty: 10, costPerUnit: 2500, supplier: "Global Foods", status: "Active" }
  ],
  inventoryLog: [],
  suppliers: [
    { id: "sup-1", name: "Meat Co", contactPerson: "John Smith", phone: "08012345678", email: "john@meatco.com", address: "12 Carnivore Rd, Lagos", itemsSupplied: "Beef Patty, Pepperoni Slices, Chicken Breast", totalOrders: 15, status: "Active" },
    { id: "sup-2", name: "Local Bakery", contactPerson: "Jane Doe", phone: "08087654321", email: "orders@bakery.com", address: "34 Flour Ave, Lagos", itemsSupplied: "Burger Buns, Pizza Dough", totalOrders: 8, status: "Active" },
    { id: "sup-3", name: "BevDistributors", contactPerson: "Mike G", phone: "08011223344", email: "mike@bevdist.com", address: "78 Liquid Way, Lagos", itemsSupplied: "Coke Cans", totalOrders: 12, status: "Active" },
    { id: "sup-4", name: "Dairy Fresh", contactPerson: "Sarah K", phone: "08055667788", email: "sarah@dairyfresh.com", address: "9 Milk Lane, Lagos", itemsSupplied: "Mozzarella Cheese, Cooking Cream", totalOrders: 6, status: "Active" },
    { id: "sup-5", name: "Veggie Farm", contactPerson: "Tunde O", phone: "08099887766", email: "tunde@veggiefarm.com", address: "Farmer Market, Lagos", itemsSupplied: "Potatoes, Lettuce, Tomatoes", totalOrders: 10, status: "Active" },
    { id: "sup-6", name: "Spice & Flavor", contactPerson: "Aisha M", phone: "08022334455", email: "aisha@spiceflavor.com", address: "7 Pepper Lane, Lagos", itemsSupplied: "Coffee Beans", totalOrders: 5, status: "Active" },
    { id: "sup-7", name: "Seafood Express", contactPerson: "Emeka N", phone: "08077889900", email: "emeka@seafoodex.com", address: "Marina Wharf, Lagos", itemsSupplied: "Salmon Fillets, Prawns", totalOrders: 4, status: "Active" },
    { id: "sup-8", name: "Global Foods", contactPerson: "Victor C", phone: "08033445566", email: "victor@globalfoods.com", address: "5 Warehouse Rd, Lagos", itemsSupplied: "Pasta Spaghetti, Cooking Oil", totalOrders: 18, status: "Active" }
  ],
  customers: [
    { id: "cust-1", name: "Alice Johnson", phone: "08011112222", email: "alice@example.com", totalSpent: 45000, visitCount: 5, lastVisit: new Date().toISOString(), joinDate: new Date(Date.now() - 30*24*60*60*1000).toISOString(), loyaltyPoints: 450 },
    { id: "cust-2", name: "Bob Williams", phone: "08033334444", email: "bob@example.com", totalSpent: 12000, visitCount: 2, lastVisit: new Date().toISOString(), joinDate: new Date(Date.now() - 10*24*60*60*1000).toISOString(), loyaltyPoints: 120 },
    { id: "cust-3", name: "Charlie Brown", phone: "08055556666", email: "charlie@example.com", totalSpent: 35000, visitCount: 4, lastVisit: new Date().toISOString(), joinDate: new Date(Date.now() - 25*24*60*60*1000).toISOString(), loyaltyPoints: 350 },
    { id: "cust-4", name: "Diana Prince", phone: "08077778888", email: "diana@example.com", totalSpent: 75000, visitCount: 8, lastVisit: new Date().toISOString(), joinDate: new Date(Date.now() - 40*24*60*60*1000).toISOString(), loyaltyPoints: 750 },
    { id: "cust-5", name: "Evan Wright", phone: "08099990000", email: "evan@example.com", totalSpent: 8000, visitCount: 1, lastVisit: new Date().toISOString(), joinDate: new Date(Date.now() - 2*24*60*60*1000).toISOString(), loyaltyPoints: 80 }
  ],
  staff: [
    { id: "staff-1", name: "Admin", email: "admin@tablix.com", role: "Admin", pin: "000000", dateCreated: new Date().toISOString() },
    { id: "staff-2", name: "John Cashier", email: "john@tablix.com", role: "Cashier", pin: "123456", dateCreated: new Date().toISOString() },
    { id: "staff-3", name: "Jane Waiter", email: "jane@tablix.com", role: "Waiter", pin: "222222", dateCreated: new Date().toISOString() },
    { id: "staff-4", name: "Chef Mario", email: "mario@tablix.com", role: "Chef", pin: "333333", dateCreated: new Date().toISOString() }
  ],
  roles: DEFAULT_ROLES,
  stations: ["Hot Kitchen", "Cold Kitchen", "Bar", "Grill"],
  expenses: [
    { id: "exp-1", description: "Gas Refill", amount: 15000, category: "Utilities", expenseDate: new Date(Date.now() - 5*24*60*60*1000).toISOString().split("T")[0], date: new Date(Date.now() - 5*24*60*60*1000).toISOString().split("T")[0], paidBy: "Owner", vendor: "GasStation", status: "Approved", paymentMethod: "Cash", notes: "Gas refill for kitchen cookers", createdAt: new Date(Date.now() - 5*24*60*60*1000).toISOString(), receipt: "" },
    { id: "exp-2", description: "Beef Patty & Bacon Purchase", amount: 45000, category: "Food", expenseDate: new Date(Date.now() - 4*24*60*60*1000).toISOString().split("T")[0], date: new Date(Date.now() - 4*24*60*60*1000).toISOString().split("T")[0], paidBy: "Owner", vendor: "Meat Co", status: "Approved", paymentMethod: "Transfer", notes: "Bulk meat restock", createdAt: new Date(Date.now() - 4*24*60*60*1000).toISOString(), receipt: "" },
    { id: "exp-3", description: "Electricity Bill (EKEDC)", amount: 28000, category: "Utilities", expenseDate: new Date(Date.now() - 3*24*60*60*1000).toISOString().split("T")[0], date: new Date(Date.now() - 3*24*60*60*1000).toISOString().split("T")[0], paidBy: "Owner", vendor: "EKEDC", status: "Approved", paymentMethod: "Card", notes: "May electricity invoice", createdAt: new Date(Date.now() - 3*24*60*60*1000).toISOString(), receipt: "" },
    { id: "exp-4", description: "Office Fiber Internet Subscription", amount: 12000, category: "Utilities", expenseDate: new Date(Date.now() - 2*24*60*60*1000).toISOString().split("T")[0], date: new Date(Date.now() - 2*24*60*60*1000).toISOString().split("T")[0], paidBy: "Owner", vendor: "MTN Nigeria", status: "Approved", paymentMethod: "Transfer", notes: "Monthly internet fee", createdAt: new Date(Date.now() - 2*24*60*60*1000).toISOString(), receipt: "" },
    { id: "exp-5", description: "Buns & Pizza Dough Delivery", amount: 10500, category: "Food", expenseDate: new Date(Date.now() - 1*24*60*60*1000).toISOString().split("T")[0], date: new Date(Date.now() - 1*24*60*60*1000).toISOString().split("T")[0], paidBy: "Owner", vendor: "Local Bakery", status: "Approved", paymentMethod: "Cash", notes: "Fresh bakery delivery", createdAt: new Date(Date.now() - 1*24*60*60*1000).toISOString(), receipt: "" },
    { id: "exp-6", description: "Restaurant Cleaning Supplies", amount: 8000, category: "Other", expenseDate: new Date().toISOString().split("T")[0], date: new Date().toISOString().split("T")[0], paidBy: "Owner", vendor: "Supermarket", status: "Approved", paymentMethod: "Cash", notes: "Soap, sanitizer, garbage bags", createdAt: new Date().toISOString(), receipt: "" },
    { id: "exp-7", description: "Monthly Salary - John Cashier", amount: 85000, category: "Staff", expenseDate: new Date(Date.now() - 15*24*60*60*1000).toISOString().split("T")[0], date: new Date(Date.now() - 15*24*60*60*1000).toISOString().split("T")[0], paidBy: "Owner", vendor: "John Cashier", status: "Approved", paymentMethod: "Transfer", notes: "Cashier monthly payroll", createdAt: new Date(Date.now() - 15*24*60*60*1000).toISOString(), receipt: "" },
    { id: "exp-8", description: "Monthly Salary - Jane Waiter", amount: 75000, category: "Staff", expenseDate: new Date(Date.now() - 15*24*60*60*1000).toISOString().split("T")[0], date: new Date(Date.now() - 15*24*60*60*1000).toISOString().split("T")[0], paidBy: "Owner", vendor: "Jane Waiter", status: "Approved", paymentMethod: "Transfer", notes: "Waiter monthly payroll", createdAt: new Date(Date.now() - 15*24*60*60*1000).toISOString(), receipt: "" },
    { id: "exp-9", description: "Monthly Salary - Chef Mario", amount: 120000, category: "Staff", expenseDate: new Date(Date.now() - 15*24*60*60*1000).toISOString().split("T")[0], date: new Date(Date.now() - 15*24*60*60*1000).toISOString().split("T")[0], paidBy: "Owner", vendor: "Chef Mario", status: "Approved", paymentMethod: "Transfer", notes: "Head chef monthly payroll", createdAt: new Date(Date.now() - 15*24*60*60*1000).toISOString(), receipt: "" },
    { id: "exp-10", description: "Staff Uniform Branded Shirts", amount: 35000, category: "Staff", expenseDate: new Date(Date.now() - 12*24*60*60*1000).toISOString().split("T")[0], date: new Date(Date.now() - 12*24*60*60*1000).toISOString().split("T")[0], paidBy: "Owner", vendor: "Branding Express", status: "Approved", paymentMethod: "Transfer", notes: "10 customized polo shirts", createdAt: new Date(Date.now() - 12*24*60*60*1000).toISOString(), receipt: "" },
    { id: "exp-11", description: "Weekly Transport Allowance", amount: 15000, category: "Staff", expenseDate: new Date(Date.now() - 7*24*60*60*1000).toISOString().split("T")[0], date: new Date(Date.now() - 7*24*60*60*1000).toISOString().split("T")[0], paidBy: "Owner", vendor: "Staff Pool", status: "Approved", paymentMethod: "Cash", notes: "Travel stipend for remote staff", createdAt: new Date(Date.now() - 7*24*60*60*1000).toISOString(), receipt: "" },
    { id: "exp-12", description: "Staff Training & Health Certs", amount: 50000, category: "Staff", expenseDate: new Date(Date.now() - 25*24*60*60*1000).toISOString().split("T")[0], date: new Date(Date.now() - 25*24*60*60*1000).toISOString().split("T")[0], paidBy: "Owner", vendor: "Food Safety Board", status: "Approved", paymentMethod: "Transfer", notes: "Annual food hygiene certs", createdAt: new Date(Date.now() - 25*24*60*60*1000).toISOString(), receipt: "" },
    { id: "exp-13", description: "Kitchen Blender Replacement", amount: 48000, category: "Equipment", expenseDate: new Date(Date.now() - 20*24*60*60*1000).toISOString().split("T")[0], date: new Date(Date.now() - 20*24*60*60*1000).toISOString().split("T")[0], paidBy: "Owner", vendor: "Kitchen Equip Ltd", status: "Approved", paymentMethod: "Card", notes: "Heavy-duty commercial blender", createdAt: new Date(Date.now() - 20*24*60*60*1000).toISOString(), receipt: "" },
    { id: "exp-14", description: "A/C Servicing in Dining Hall", amount: 22000, category: "Maintenance", expenseDate: new Date(Date.now() - 8*24*60*60*1000).toISOString().split("T")[0], date: new Date(Date.now() - 8*24*60*60*1000).toISOString().split("T")[0], paidBy: "Owner", vendor: "CoolTemp Tech", status: "Approved", paymentMethod: "Cash", notes: "General maintenance & gas refill", createdAt: new Date(Date.now() - 8*24*60*60*1000).toISOString(), receipt: "" },
    { id: "exp-15", description: "Social Media Sponsored Ads", amount: 30000, category: "Marketing", expenseDate: new Date(Date.now() - 6*24*60*60*1000).toISOString().split("T")[0], date: new Date(Date.now() - 6*24*60*60*1000).toISOString().split("T")[0], paidBy: "Owner", vendor: "Meta Ads", status: "Approved", paymentMethod: "Card", notes: "Instagram & Facebook campaigns", createdAt: new Date(Date.now() - 6*24*60*60*1000).toISOString(), receipt: "" },
    { id: "exp-16", description: "Weekly Staff Meals & Tea", amount: 18000, category: "Staff", expenseDate: new Date(Date.now() - 2*24*60*60*1000).toISOString().split("T")[0], date: new Date(Date.now() - 2*24*60*60*1000).toISOString().split("T")[0], paidBy: "Owner", vendor: "In-House Kitchen", status: "Approved", paymentMethod: "Cash", notes: "Ingredients for staff breakfast", createdAt: new Date(Date.now() - 2*24*60*60*1000).toISOString(), receipt: "" }
  ],
  kdsOrders: [
    {
      id: "kds-1", orderNo: "ORD-001", tableNo: "2", customer: "Alice Johnson", status: "New",
      priority: "Normal", station: "Hot Kitchen", placedAt: new Date(Date.now() - 4*60*1000).toISOString(),
      startedAt: null, readyAt: null,
      items: [
        { id: "ki-1a", name: "Classic Cheeseburger", qty: 2, notes: "No pickles", done: false },
        { id: "ki-1b", name: "Chicken Wings (6pcs)", qty: 1, notes: "",           done: false },
      ],
    },
    {
      id: "kds-2", orderNo: "ORD-002", tableNo: "5", customer: "Bob Williams", status: "In Progress",
      priority: "Normal", station: "Hot Kitchen", placedAt: new Date(Date.now() - 12*60*1000).toISOString(),
      startedAt: new Date(Date.now() - 8*60*1000).toISOString(), readyAt: null,
      items: [
        { id: "ki-2a", name: "Margarita Pizza",      qty: 1, notes: "Extra cheese", done: false },
        { id: "ki-2b", name: "Coca Cola (Can)",       qty: 3, notes: "",             done: true  },
      ],
    },
    {
      id: "kds-3", orderNo: "ORD-003", tableNo: "1", customer: "Walk-in", status: "Ready",
      priority: "Rush", station: "Grill", placedAt: new Date(Date.now() - 22*60*1000).toISOString(),
      startedAt: new Date(Date.now() - 18*60*1000).toISOString(), readyAt: new Date(Date.now() - 2*60*1000).toISOString(),
      items: [
        { id: "ki-3a", name: "Classic Cheeseburger", qty: 1, notes: "", done: true },
        { id: "ki-3b", name: "Chicken Wings (6pcs)", qty: 2, notes: "Extra spicy", done: true },
      ],
    },
    {
      id: "kds-4", orderNo: "ORD-004", tableNo: "3", customer: "Walk-in", status: "New",
      priority: "VIP", station: "Bar", placedAt: new Date(Date.now() - 2*60*1000).toISOString(),
      startedAt: null, readyAt: null,
      items: [
        { id: "ki-4a", name: "Coca Cola (Can)", qty: 4, notes: "", done: false },
      ],
    },
    {
      id: "kds-5", orderNo: "ORD-005", tableNo: "—", customer: "Walk-in", status: "Served",
      priority: "Normal", station: "Cold Kitchen", placedAt: new Date(Date.now() - 35*60*1000).toISOString(),
      startedAt: new Date(Date.now() - 30*60*1000).toISOString(), readyAt: new Date(Date.now() - 20*60*1000).toISOString(),
      items: [
        { id: "ki-5a", name: "Margarita Pizza", qty: 2, notes: "", done: true },
        { id: "ki-5b", name: "Chicken Wings (6pcs)", qty: 1, notes: "No sauce", done: true },
      ],
    },
  ],
  tables: [
    { id: "tbl-1", name: "Table 1", seats: 4, zone: "Main Floor", status: "available" },
    { id: "tbl-2", name: "Table 2", seats: 2, zone: "Main Floor", status: "occupied", occupiedAt: new Date(Date.now() - 30*60*1000).toISOString(), customerName: "Alice Johnson", orderTotal: 13975 },
    { id: "tbl-3", name: "Table 3", seats: 6, zone: "VIP", status: "reserved" },
    { id: "tbl-4", name: "Table 4", seats: 4, zone: "Patio", status: "available" },
    { id: "tbl-5", name: "Table 5", seats: 2, zone: "Patio", status: "bill_requested", occupiedAt: new Date(Date.now() - 45*60*1000).toISOString(), customerName: "Bob Williams", orderTotal: 13437 },
    { id: "tbl-6", name: "Table 6", seats: 8, zone: "VIP", status: "available" },
    { id: "tbl-7", name: "Table 7", seats: 4, zone: "Main Floor", status: "available" },
    { id: "tbl-8", name: "Table 8", seats: 2, zone: "Main Floor", status: "available" }
  ],
  taxConfig:      DEFAULT_TAX_CONFIG,
  posConfig:      DEFAULT_POS_CONFIG,
  businessConfig: DEFAULT_BUSINESS_CONFIG,
  loyaltyConfig:  DEFAULT_LOYALTY_CONFIG,
  logo:           null,
  theme:          "dark",
};

function loadAppState(): Omit<AppState, "transactions"> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      let loadedStaff: StoreStaff[] = parsed.staff ?? [];

      // Strip out legacy hardcoded seed staff that shipped with old builds.
      const LEGACY_SEED_IDS = ["default-cashier", "default-chef", "default-waiter", "default-manager"];
      loadedStaff = loadedStaff.filter((s) => !LEGACY_SEED_IDS.includes(s.id));

      const defaultsToAdd: StoreStaff[] = [];

      // Migrate old string-based InventoryItem { currentStock, minStock, costUnit } to numeric shape
      const migrateInvItem = (raw: Record<string, unknown>): InventoryItem => {
        if (typeof raw.qty === "number") return raw as unknown as InventoryItem;
        const parseQtyStr = (s: string) => {
          const m = /^([\d.]+)\s*(.*)$/.exec((s || "0").trim());
          return m ? { num: parseFloat(m[1]) || 0, unit: m[2].trim() } : { num: 0, unit: "" };
        };
        const parseCost = (s: string) => parseFloat((s || "0").replace(/[^0-9.]/g, "")) || 0;
        const { num: qty, unit } = parseQtyStr(String(raw.currentStock ?? "0"));
        const { num: minQty }    = parseQtyStr(String(raw.minStock    ?? "0"));
        const costPerUnit        = parseCost(String(raw.costUnit ?? "0"));
        const deriveS = (q: number, m: number): InventoryStatus =>
          q <= 0 ? "Out of Stock" : q <= m ? "Low Stock" : "Active";
        return {
          id: String(raw.id), name: String(raw.name),
          unit: unit || "pcs", qty, minQty, costPerUnit,
          supplier: String(raw.supplier ?? "-"),
          status: deriveS(qty, minQty),
        };
      };

      // Ensure every MenuItem has an ingredients array (new field, absent in old data)
      const migrateMenuItem = (raw: Record<string, unknown>): MenuItem => ({
        ...(raw as unknown as MenuItem),
        ingredients: Array.isArray(raw.ingredients) ? raw.ingredients as MenuIngredient[] : [],
      });

      return {
        menuItems:      (parsed.menuItems      ?? []).map(migrateMenuItem),
        menuCategories: parsed.menuCategories  ?? [],
        inventoryItems: (parsed.inventoryItems ?? []).map(migrateInvItem),
        inventoryLog:   parsed.inventoryLog    ?? [],
        suppliers:      parsed.suppliers       ?? [],
        customers:      parsed.customers       ?? [],
        staff:          [...loadedStaff, ...defaultsToAdd],
        roles:          parsed.roles           ?? DEFAULT_ROLES,
        stations:       parsed.stations        ?? ["Hot Kitchen", "Cold Kitchen", "Bar", "Grill"],
        expenses:       parsed.expenses        ?? [],
        kdsOrders:      parsed.kdsOrders       ?? [],
        tables:         parsed.tables          ?? [],
        taxConfig:      parsed.taxConfig       ?? DEFAULT_TAX_CONFIG,
        posConfig:      parsed.posConfig       ?? DEFAULT_POS_CONFIG,
        businessConfig: parsed.businessConfig   ?? DEFAULT_BUSINESS_CONFIG,
        loyaltyConfig:  parsed.loyaltyConfig    ?? DEFAULT_LOYALTY_CONFIG,
        logo:           parsed.logo             ?? null,
        theme:          parsed.theme            ?? "dark",
      };
    }
  } catch (_) {}
  return { ...EMPTY_STATE };
}

function saveAppState(state: Omit<AppState, "transactions">): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) {}
}

function clearAllStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("tablix_app_store_v1");
    localStorage.removeItem("tablix_transactions");
    localStorage.removeItem("tablix_kot_enabled");
    localStorage.removeItem("tablix_restaurant_name");
    localStorage.removeItem("tablix_menu_url");
    localStorage.removeItem("tablix_plan");
    localStorage.removeItem("tablix_cart");
    localStorage.removeItem("tablix_payment_history");
    localStorage.removeItem("tablix_active_staff");
    localStorage.removeItem("tablix_logo");
    localStorage.removeItem("tablix_theme");
  } catch (_) {}
}

// ─── Context (stable singleton across HMR reloads) ───────────────────────────

const CTX_KEY = "__tablix_app_ctx_v2__";
type AppCtxType = React.Context<AppContextValue | null>;
const AppContext: AppCtxType =
  (globalThis as Record<string, unknown>)[CTX_KEY] as AppCtxType ??
  (() => {
    const ctx = createContext<AppContextValue | null>(null);
    (globalThis as Record<string, unknown>)[CTX_KEY] = ctx;
    return ctx;
  })();

export function AppProvider({ children }: { children: React.ReactNode }) {
  const initial = loadAppState();

  // Ensure a default owner PIN always exists so the owner flow is never open to any PIN
  try {
    const storedPin = localStorage.getItem("tablix_owner_pin");
    // If missing or shorter than 6 digits (old 4-digit format), reset to default
    if (!storedPin || storedPin.length < 6) {
      localStorage.setItem("tablix_owner_pin", DEFAULT_OWNER_PIN);
    }
  } catch (_) {}

  const [menuItems,      setMenuItems]      = useState<MenuItem[]>(initial.menuItems);
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>(initial.menuCategories);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(initial.inventoryItems);
  const [inventoryLog,   setInventoryLog]   = useState<InventoryLogEntry[]>(initial.inventoryLog);
  const [suppliers,      setSuppliers]      = useState<Supplier[]>(initial.suppliers);
  const [customers,      setCustomers]      = useState<StoreCustomer[]>(initial.customers);
  const [staff,          setStaff]          = useState<StoreStaff[]>(initial.staff);
  const [roles,          setRoles]          = useState<StoreRole[]>(initial.roles);
  const [stations,       setStations]       = useState<string[]>(initial.stations);
  const [expenses,       setExpenses]       = useState<Expense[]>(initial.expenses);
  const [kdsOrders,      setKdsOrders]      = useState<KDSOrder[]>(initial.kdsOrders);
  const [tables,         setTables]         = useState<RestaurantTable[]>(initial.tables);
  // Seed mock transactions and load real data asynchronously
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  useEffect(() => {
    seedMockTransactions().then(() => {
      loadTransactions().then(setTransactions);
    });
  }, []);

  const [activeStaff, setActiveStaffState] = useState<StoreStaff | null>(() => {
    try {
      const raw = localStorage.getItem("tablix_active_staff");
      return raw ? (JSON.parse(raw) as StoreStaff) : null;
    } catch (_) { return null; }
  });

  const setActiveStaff = useCallback((s: StoreStaff | null) => {
    setActiveStaffState(s);
    try {
      if (s) localStorage.setItem("tablix_active_staff", JSON.stringify(s));
      else localStorage.removeItem("tablix_active_staff");
    } catch (_) {}
  }, []);

  const [plan, setPlanState] = useState<AppPlan>(() => {
    try { return (localStorage.getItem("tablix_plan") as AppPlan) || "trial"; } catch (_) { return "trial"; }
  });
  const [kotEnabled, setKotEnabled] = useState<boolean>(() => {
    try { return localStorage.getItem("tablix_kot_enabled") === "true"; } catch (_) { return false; }
  });
  const [tablesEnabled, setTablesEnabled] = useState<boolean>(() => {
    try { return localStorage.getItem("tablix_tables_enabled") === "true"; } catch (_) { return false; }
  });
  const [restaurantName, setRestaurantName] = useState<string>(() => {
    try { return localStorage.getItem("tablix_restaurant_name") || "My Restaurant"; } catch (_) { return "My Restaurant"; }
  });
  const [menuUrl, setMenuUrl] = useState<string>(() => {
    try {
      const stored = localStorage.getItem("tablix_menu_url");
      if (stored) return stored;
      return (typeof window !== "undefined" ? window.location.origin : "") + "/menu-view";
    } catch (_) { return "/menu-view"; }
  });

  const [taxConfig, setTaxConfigState] = useState<TaxConfig>(() => initial.taxConfig);
  const setTaxConfig = useCallback((cfg: TaxConfig) => setTaxConfigState(cfg), []);

  const [posConfig, setPosConfigState] = useState<PosConfig>(() => initial.posConfig);
  const setPosConfig = useCallback((cfg: PosConfig) => setPosConfigState(cfg), []);

  const [businessConfig, setBusinessConfigState] = useState<BusinessConfig>(() => initial.businessConfig);
  const setBusinessConfig = useCallback((cfg: BusinessConfig) => setBusinessConfigState(cfg), []);

  const [loyaltyConfig, setLoyaltyConfigState] = useState<LoyaltyConfig>(() => initial.loyaltyConfig);
  const setLoyaltyConfig = useCallback((cfg: LoyaltyConfig) => setLoyaltyConfigState(cfg), []);

  const [logo, setLogoState] = useState<string | null>(() => {
    try { return localStorage.getItem("tablix_logo") || initial.logo; } catch (_) { return initial.logo; }
  });
  const setLogo = useCallback((v: string | null) => {
    setLogoState(v);
    try {
      if (v) localStorage.setItem("tablix_logo", v);
      else localStorage.removeItem("tablix_logo");
    } catch (_) {}
  }, []);

  const [theme, setThemeState] = useState<"light" | "dark">(() => {
    try { return (localStorage.getItem("tablix_theme") as "light" | "dark") || "dark"; } catch (_) { return "dark"; }
  });
  const setTheme = useCallback((t: "light" | "dark") => {
    setThemeState(t);
    try { localStorage.setItem("tablix_theme", t); } catch (_) {}
  }, []);

  // Sync theme to document element
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const [appInitLoading, setAppInitLoading] = useState(false);

  // Persist state
  useEffect(() => {
    saveAppState({ menuItems, menuCategories, inventoryItems, inventoryLog, suppliers, customers, staff, roles, stations, expenses, kdsOrders, tables, taxConfig, posConfig, businessConfig, loyaltyConfig, logo, theme });
  }, [menuItems, menuCategories, inventoryItems, inventoryLog, suppliers, customers, staff, roles, stations, expenses, kdsOrders, tables, taxConfig, posConfig, businessConfig, loyaltyConfig, logo, theme]);

  useEffect(() => { try { localStorage.setItem("tablix_kot_enabled", String(kotEnabled)); } catch (_) {} }, [kotEnabled]);
  useEffect(() => { try { localStorage.setItem("tablix_tables_enabled", String(tablesEnabled)); } catch (_) {} }, [tablesEnabled]);
  useEffect(() => { try { localStorage.setItem("tablix_restaurant_name", restaurantName); } catch (_) {} }, [restaurantName]);
  useEffect(() => { try { localStorage.setItem("tablix_menu_url", menuUrl); } catch (_) {} }, [menuUrl]);
  useEffect(() => { try { localStorage.setItem("tablix_plan", plan); } catch (_) {} }, [plan]);

  const setPlan = useCallback((p: AppPlan) => setPlanState(p), []);

  // ── Reset to blank state (called on new signup) ───────────────────────────
  const resetAppState = useCallback((initialData?: { name?: string; email?: string; phone?: string }) => {
    clearAllStorage();
    setMenuItems([]);
    setMenuCategories([]);
    setInventoryItems([]);
    setInventoryLog([]);
    setSuppliers([]);
    setCustomers([]);
    setStaff([]);
    setRoles(DEFAULT_ROLES);
    setStations(["Hot Kitchen", "Cold Kitchen", "Bar", "Grill"]);
    setExpenses([]);
    setKdsOrders([]);
    setTables([]);
    setTransactions([]);
    setPlanState("trial");
    setActiveStaffState(null);
    setLogoState(null);

    const name = initialData?.name || "My Restaurant";
    setRestaurantName(name);

    if (initialData) {
      setBusinessConfig({
        ...DEFAULT_BUSINESS_CONFIG,
        email: initialData.email || DEFAULT_BUSINESS_CONFIG.email,
        phone: initialData.phone || DEFAULT_BUSINESS_CONFIG.phone,
      });
    } else {
      setBusinessConfig(DEFAULT_BUSINESS_CONFIG);
    }

    const newMenuUrl = (typeof window !== "undefined" ? window.location.origin : "") + "/menu-view";
    setMenuUrl(newMenuUrl);
  }, []);

  // ── Menu ──────────────────────────────────────────────────────────────────
  const addMenuItem       = useCallback((item: MenuItem)    => setMenuItems(p => [...p, item]), []);
  const updateMenuItem    = useCallback((item: MenuItem)    => setMenuItems(p => p.map(i => i.id === item.id ? item : i)), []);
  const deleteMenuItem    = useCallback((id: string)        => setMenuItems(p => p.filter(i => i.id !== id)), []);
  const addMenuCategory   = useCallback((cat: MenuCategory) => setMenuCategories(p => [...p, cat]), []);
  const updateMenuCategory= useCallback((cat: MenuCategory) => setMenuCategories(p => p.map(c => c.id === cat.id ? cat : c)), []);
  const deleteMenuCategory= useCallback((id: string)        => setMenuCategories(p => p.filter(c => c.id !== id)), []);

  // ── Inventory ─────────────────────────────────────────────────────────────
  const addInventoryItem    = useCallback((item: InventoryItem)    => setInventoryItems(p => [...p, item]), []);
  const updateInventoryItem = useCallback((item: InventoryItem)    => setInventoryItems(p => p.map(i => i.id === item.id ? item : i)), []);
  const deleteInventoryItem = useCallback((id: string)             => setInventoryItems(p => p.filter(i => i.id !== id)), []);
  const addInventoryLogEntry= useCallback((entry: InventoryLogEntry) => setInventoryLog(p => [entry, ...p]), []);
  const consumeIngredients  = useCallback((soldItems: { menuItemId: string; qty: number }[], performedBy?: string) => {
    const today = new Date().toISOString().split("T")[0];
    const time = new Date().toISOString().split("T")[1].split(".")[0];

    // Build a map of total deductions per ingredient across all sold items
    // to avoid stale-closure issues when the same ingredient is used by multiple items.
    const deductions = new Map<string, number>(); // ingredientId -> total qty to deduct
    soldItems.forEach(({ menuItemId, qty }) => {
      const menuItem = menuItems.find((mi) => mi.id === menuItemId);
      if (menuItem) {
        menuItem.ingredients.forEach((ingredient) => {
          const prev = deductions.get(ingredient.ingredientId) ?? 0;
          deductions.set(ingredient.ingredientId, prev + ingredient.qty * qty);
        });
      }
    });

    if (deductions.size === 0) return;

    const logEntries: InventoryLogEntry[] = [];

    // Apply all deductions in a single setInventoryItems call to avoid stale state
    setInventoryItems((prevItems) => {
      return prevItems.map((item) => {
        const deductQty = deductions.get(item.id);
        if (deductQty === undefined) return item;
        const newStock = item.qty - deductQty;
        const logEntry: InventoryLogEntry = {
          id:          `log-${Date.now()}-${item.id}`,
          date:        today,
          time:        time,
          itemName:    item.name,
          type:        "Stock Out",
          quantity:    String(deductQty),
          prevStock:   String(item.qty),
          newStock:    String(newStock),
          performedBy: performedBy || "System",
          note:        "Consumed by sale",
        };
        logEntries.push(logEntry);
        return { ...item, qty: newStock };
      });
    });

    // Log entries are collected synchronously during the map; add them after
    setTimeout(() => {
      logEntries.forEach((entry) => addInventoryLogEntry(entry));
    }, 0);
  }, [menuItems, addInventoryLogEntry]);
  const stockIn             = useCallback((ingredientId: string, qty: number, performedBy: string, note?: string) => {
    const today = new Date().toISOString().split("T")[0];
    const time = new Date().toISOString().split("T")[1].split(".")[0];
    const inventoryItem = inventoryItems.find((ii) => ii.id === ingredientId);
    if (inventoryItem) {
      const newStock = inventoryItem.qty + qty;
      const logEntry: InventoryLogEntry = {
        id:          `log-${Date.now()}-${inventoryItem.id}`,
        date:        today,
        time:        time,
        itemName:    inventoryItem.name,
        type:        "Stock In",
        quantity:    String(qty),
        prevStock:   String(inventoryItem.qty),
        newStock:    String(newStock),
        performedBy: performedBy,
        note:        note || "Stock added manually",
      };
      addInventoryLogEntry(logEntry);
      updateInventoryItem({ ...inventoryItem, qty: newStock });
    }
  }, [inventoryItems, updateInventoryItem, addInventoryLogEntry]);
  const addSupplier         = useCallback((s: Supplier)            => setSuppliers(p => [...p, s]), []);
  const updateSupplier      = useCallback((s: Supplier)            => setSuppliers(p => p.map(x => x.id === s.id ? s : x)), []);
  const deleteSupplier      = useCallback((id: string)             => setSuppliers(p => p.filter(s => s.id !== id)), []);

  // ── Customers ─────────────────────────────────────────────────────────────
  const addCustomer    = useCallback((c: StoreCustomer) => setCustomers(p => [...p, c]), []);
  const updateCustomer = useCallback((c: StoreCustomer) => setCustomers(p => p.map(x => x.id === c.id ? c : x)), []);
  const deleteCustomer = useCallback((id: string)        => setCustomers(p => p.filter(c => c.id !== id)), []);
  const addLoyaltyPoints = useCallback((customerId: string, points: number, spent: number) => {
    const today = new Date().toISOString().split("T")[0];
    setCustomers(p => p.map(c =>
      c.id === customerId ? { ...c, loyaltyPoints: c.loyaltyPoints + points, totalSpent: c.totalSpent + spent, visitCount: c.visitCount + 1, lastVisit: today } : c
    ));
  }, []);

  // ── Staff ─────────────────────────────────────────────────────────────────
  const addStaffMember    = useCallback((s: StoreStaff) => setStaff(p => [...p, s]), []);
  const updateStaffMember = useCallback((s: StoreStaff) => setStaff(p => p.map(x => x.id === s.id ? s : x)), []);
  const deleteStaffMember = useCallback((id: string)    => setStaff(p => p.filter(s => s.id !== id)), []);

  const addRole           = useCallback((r: StoreRole)  => setRoles(p => [...p, r]), []);
  const updateRole        = useCallback((r: StoreRole)  => setRoles(p => p.map(x => x.id === r.id ? r : x)), []);
  const deleteRole        = useCallback((id: string)    => setRoles(p => p.filter(x => x.id !== id)), []);

  const addStation        = useCallback((s: string)     => setStations(p => [...p, s]), []);
  const deleteStation     = useCallback((s: string)     => setStations(p => p.filter(x => x !== s)), []);

  // ── Expenses ──────────────────────────────────────────────────────────────
  const addExpense    = useCallback((e: Expense) => setExpenses(p => [e, ...p]), []);
  const updateExpense = useCallback((e: Expense) => setExpenses(p => p.map(x => x.id === e.id ? e : x)), []);
  const deleteExpense = useCallback((id: string) => setExpenses(p => p.filter(e => e.id !== id)), []);

  // ── Transactions ──────────────────────────────────────────────────────────
  const addTransaction = useCallback((tx: Transaction) => {
    saveTransaction(tx);
    setTransactions(p => [tx, ...p].slice(0, 500));
  }, []);

  const voidTransaction = useCallback((id: string, approvedBy: string, refund = false) => {
    const status = (refund ? "refunded" : "voided") as Transaction["status"];
    setTransactions(prev => {
      const updated = prev.map(tx =>
        tx.id === id
          ? { ...tx, status, voidedAt: Date.now(), voidedBy: approvedBy }
          : tx
      );
      // Persist the updated list to localStorage
      try {
        const limited = updated.slice(0, 500);
        localStorage.setItem("tablix_transactions", JSON.stringify(limited));
      } catch (_) {}
      return updated;
    });
  }, []);

  // ── KDS ───────────────────────────────────────────────────────────────────
  const addKDSOrder    = useCallback((order: KDSOrder) => setKdsOrders(p => [order, ...p]), []);
  const updateKDSOrder = useCallback((order: KDSOrder) => setKdsOrders(p => p.map(o => o.id === order.id ? order : o)), []);
  const removeKDSOrder = useCallback((id: string)      => setKdsOrders(p => p.filter(o => o.id !== id)), []);

  // ── Tables ────────────────────────────────────────────────────────────────
  const syncTables  = useCallback((ts: RestaurantTable[]) => setTables(ts), []);
  const addTable    = useCallback((t: RestaurantTable) => setTables(p => [...p, t]), []);
  const updateTable = useCallback((t: RestaurantTable) => setTables(p => p.map(x => x.id === t.id ? t : x)), []);
  const deleteTable = useCallback((id: string)        => setTables(p => p.filter(t => t.id !== id)), []);
  const setTableStatus = useCallback((id: string, status: TableStatus, extra?: Partial<RestaurantTable>) => {
    setTables(p => p.map(t => t.id === id ? { ...t, status, ...extra } : t));
  }, []);

  const isReadOnly = plan === "trial" && checkTrialExpired(businessConfig.trialStartedAt);

  const value: AppContextValue = {
    plan, setPlan, isReadOnly, menuItems, menuCategories,
    inventoryItems, inventoryLog, suppliers,
    customers, staff, roles, stations, expenses, kdsOrders, tables, transactions,
    resetAppState,
    activeStaff, setActiveStaff,
    setMenuItems, setMenuCategories,
    addMenuItem, updateMenuItem, deleteMenuItem,
    addMenuCategory, updateMenuCategory, deleteMenuCategory,
    addInventoryItem, updateInventoryItem, deleteInventoryItem,
    addInventoryLogEntry,
    consumeIngredients,
    stockIn,
    addSupplier, updateSupplier, deleteSupplier,
    addCustomer, updateCustomer, deleteCustomer, addLoyaltyPoints,
    addStaffMember, updateStaffMember, deleteStaffMember,
    addRole, updateRole, deleteRole,
    addStation, deleteStation,
    setExpenses, addExpense, updateExpense, deleteExpense,
    addTransaction, voidTransaction,
    addKDSOrder, updateKDSOrder, removeKDSOrder,
    setTables: syncTables, addTable, updateTable, deleteTable, setTableStatus,
    kotEnabled, setKotEnabled,
    tablesEnabled, setTablesEnabled,
    restaurantName, setRestaurantName,
    menuUrl, setMenuUrl,
    taxConfig, setTaxConfig,
    posConfig, setPosConfig,
    businessConfig, setBusinessConfig,
    loyaltyConfig, setLoyaltyConfig,
    logo, setLogo,
    theme, setTheme,
    appInitLoading, setAppInitLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppStore must be used inside AppProvider");
  return ctx;
}

// ─── Helpers exported for pages ──────────────────────────────────────────────

export function deriveKDSStation(itemNames: string[]): KDSStation {
  const lower = itemNames.map(n => n.toLowerCase()).join(" ");
  if (lower.includes("bar") || lower.includes("drink") || lower.includes("juice") ||
      lower.includes("zobo") || lower.includes("chapman") || lower.includes("water") ||
      lower.includes("soda") || lower.includes("beer") || lower.includes("wine") ||
      lower.includes("pepsi") || lower.includes("coke")) return "Bar";
  if (lower.includes("grill") || lower.includes("suya") || lower.includes("kilishi") ||
      lower.includes("burger") || lower.includes("bbq") || lower.includes("tilapia")) return "Grill";
  if (lower.includes("salad") || lower.includes("coleslaw") || lower.includes("fruit")) return "Cold Kitchen";
  return "Hot Kitchen";
}

export function getActiveKDSOrderCount(orders: KDSOrder[]) {
  return orders.filter(o => o.status === "New" || o.status === "In Progress" || o.status === "Ready").length;
}

export function usePermissions(): Permission[] {
  const { activeStaff, roles } = useAppStore();
  if (!activeStaff) return [];
  const role = roles.find(r => r.id === activeStaff.role) || DEFAULT_ROLES.find(r => r.id === activeStaff.role);
  return role?.permissions || [];
}

export function nextOrderNo(kdsOrders: KDSOrder[]): string {
  const nums = kdsOrders.map(o => parseInt(o.orderNo.replace("ORD-", ""), 10)).filter(n => !isNaN(n));
  const next = nums.length > 0 ? Math.max(...nums) + 1 : 1001;
  return `ORD-${next}`;
}