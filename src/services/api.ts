import { idbEnqueueRequest } from "./idb";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api/v1";

interface AuthResponse {
  success: boolean;
  data?: {
    user: {
      id: string;
      email: string;
      businessName: string;
      ownerName: string;
      isEmailVerified: boolean;
    };
    accessToken: string;
    refreshToken: string;
  };
  message?: string;
  error?: string;
}

interface ApiError extends Error {
  status?: number;
  data?: { message?: string };
}

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function tryRefreshToken(): Promise<boolean> {
  const rt = localStorage.getItem("tablixpos_refresh_token");
  if (!rt) return false;

  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: rt }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    if (data.accessToken) {
      localStorage.setItem("tablixpos_access_token", data.accessToken);
      if (data.refreshToken) localStorage.setItem("tablixpos_refresh_token", data.refreshToken);
      return true;
    }
  } catch (_) {}
  return false;
}

async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {},
  _retry = false
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  // Add token if available
  const token = localStorage.getItem("tablixpos_access_token");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response: Response;
  try {
    if (!navigator.onLine && ["POST", "PUT", "PATCH", "DELETE"].includes(options.method || "GET")) {
      throw new TypeError("Failed to fetch"); // Simulate network error
    }
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (err: any) {
    if (err.name === 'TypeError' || err.message === 'Failed to fetch') {
      const method = (options.method || "GET").toUpperCase();
      if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
        console.warn(`[Offline Sync] Queuing ${method} request to ${endpoint}`);
        await idbEnqueueRequest({
          timestamp: Date.now(),
          endpoint,
          method: method as any,
          body: options.body ? JSON.parse(options.body as string) : null,
          tag: "tablix-sync",
          retries: 0
        });
        
        // Return dummy success response so the app UI can proceed optimistically
        return { success: true, message: "Queued for background sync", data: options.body ? JSON.parse(options.body as string) : {} } as any;
      }
      throw new Error("You are offline. Please check your internet connection.");
    }
    throw err;
  }

  // Auto-refresh on 401 (once) — skip for auth endpoints to avoid loops
  if (response.status === 401 && !_retry && !endpoint.startsWith("/auth/")) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = tryRefreshToken().finally(() => { isRefreshing = false; });
    }
    const refreshed = await refreshPromise;
    if (refreshed) {
      return apiCall<T>(endpoint, options, true);
    }
    // Refresh failed — clear tokens and redirect to login
    localStorage.removeItem("tablixpos_access_token");
    localStorage.removeItem("tablixpos_refresh_token");
    window.location.href = "/login";
    throw new Error("Session expired. Please log in again.");
  }

  if (!response.ok) {
    const error: ApiError = new Error(`API Error: ${response.statusText}`);
    error.status = response.status;
    try {
      error.data = await response.json();
    } catch (_) {}
    throw error;
  }

  return response.json();
}

export const authAPI = {
  signup: async (data: {
    businessName: string;
    businessType?: string;
    ownerName: string;
    email: string;
    phone: string;
  }): Promise<AuthResponse> =>
    apiCall("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  verifyEmail: async (email: string, otp: string): Promise<{ success: boolean; message: string }> =>
    apiCall("/auth/verify-email", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    }),

  setPin: async (email: string, pin: string): Promise<{ success: boolean; message: string }> =>
    apiCall("/auth/set-pin", {
      method: "POST",
      body: JSON.stringify({ email, pin }),
    }),

  resendOtp: async (email: string): Promise<{ success: boolean; message: string }> =>
    apiCall("/auth/resend-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  login: async (email: string, pin: string): Promise<AuthResponse> =>
    apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, pin }),
    }),

  forgotPassword: async (email: string): Promise<{ success: boolean; message: string }> =>
    apiCall("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  verifyResetOtp: async (email: string, otp: string): Promise<{ success: boolean; message: string }> =>
    apiCall("/auth/verify-reset-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    }),

  resetPassword: async (email: string, otp: string, newPin: string): Promise<{ success: boolean; message: string }> =>
    apiCall("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ email, otp, newPin }),
    }),

  refreshToken: async (refreshToken: string): Promise<{ success: boolean; accessToken: string; refreshToken: string }> =>
    apiCall("/auth/refresh-token", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    }),

  logout: async (refreshToken: string): Promise<{ success: boolean; message: string }> =>
    apiCall("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    }),

  getMe: async (): Promise<{ success: boolean; data: any }> =>
    apiCall("/auth/me", {
      method: "GET",
    }),
};

export interface ApiStaff {
  id:          string;
  name:        string;
  email:       string | null;
  phone:       string | null;
  role:        string;
  isActive:    boolean;
  createdAt:   string;
  updatedAt?:  string;
  assignedStation?: string;
}

export const staffAPI = {
  list: (): Promise<{ success: boolean; data: { staff: ApiStaff[] } }> =>
    apiCall("/staff"),

  create: (data: { name: string; email?: string; phone?: string; role: string; pin: string; assignedStation?: string }): Promise<{ success: boolean; data: { staff: ApiStaff } }> =>
    apiCall("/staff", { method: "POST", body: JSON.stringify(data) }),

  update: (id: string, data: { name?: string; email?: string; phone?: string; role?: string; pin?: string; isActive?: boolean; assignedStation?: string }): Promise<{ success: boolean; data: { staff: ApiStaff } }> =>
    apiCall(`/staff/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  remove: (id: string): Promise<{ success: boolean; message: string }> =>
    apiCall(`/staff/${id}`, { method: "DELETE" }),

  loginWithPin: (pin: string): Promise<{ success: boolean; data: { staff: ApiStaff } }> => {
    const businessId = localStorage.getItem("tablix_business_id");
    if (!businessId) {
      return Promise.reject(new Error("Business context not found. Please log in as owner first."));
    }
    return apiCall("/staff/login", { method: "POST", body: JSON.stringify({ businessId, pin }) });
  },
};

export interface ApiMenuVariant { id: string; name: string; price: number; }
export interface ApiMenuAddon { id: string; name: string; price: number; }
export interface ApiMenuIngredient { ingredientId: string; qty: number; }

export interface ApiMenuCategory {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

export interface ApiMenuItem {
  id: string;
  name: string;
  price: number;
  categoryId: string | null;
  categoryName: string | null;
  imageUrl: string;
  available: boolean;
  variants: ApiMenuVariant[];
  addons: ApiMenuAddon[];
  ingredients: ApiMenuIngredient[];
  station?: string;
  createdAt: string;
}

export const menuAPI = {
  listCategories: (): Promise<{ success: boolean; data: { categories: ApiMenuCategory[] } }> =>
    apiCall("/menu/categories"),

  createCategory: (data: { name: string; description?: string }): Promise<{ success: boolean; data: { category: ApiMenuCategory } }> =>
    apiCall("/menu/categories", { method: "POST", body: JSON.stringify(data) }),

  updateCategory: (id: string, data: { name?: string; description?: string; isActive?: boolean }): Promise<{ success: boolean; data: { category: ApiMenuCategory } }> =>
    apiCall(`/menu/categories/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  deleteCategory: (id: string): Promise<{ success: boolean; message: string }> =>
    apiCall(`/menu/categories/${id}`, { method: "DELETE" }),

  listItems: (): Promise<{ success: boolean; data: { items: ApiMenuItem[] } }> =>
    apiCall("/menu/items"),

  createItem: (data: { name: string; price: number; categoryId?: string | null; imageUrl?: string; available?: boolean; variants?: ApiMenuVariant[]; addons?: ApiMenuAddon[]; ingredients?: ApiMenuIngredient[]; station?: string }): Promise<{ success: boolean; data: { item: ApiMenuItem } }> =>
    apiCall("/menu/items", { method: "POST", body: JSON.stringify(data) }),

  updateItem: (id: string, data: Partial<Omit<ApiMenuItem, "id" | "createdAt">>): Promise<{ success: boolean; data: { item: ApiMenuItem } }> =>
    apiCall(`/menu/items/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  deleteItem: (id: string): Promise<{ success: boolean; message: string }> =>
    apiCall(`/menu/items/${id}`, { method: "DELETE" }),
};

export type ApiTableStatus = "available" | "occupied" | "reserved" | "bill_requested";

export interface ApiTable {
  id:           string;
  businessId:   string;
  name:         string;
  seats:        number;
  zone:         string;
  status:       ApiTableStatus;
  occupiedAt:   string | null;
  customerName: string | null;
  orderTotal:   number | null;
  createdAt:    string;
  updatedAt:    string;
}

export const tableAPI = {
  list: (): Promise<{ success: boolean; data: { tables: ApiTable[] } }> =>
    apiCall("/tables"),

  create: (data: { name: string; seats?: number; zone?: string }): Promise<{ success: boolean; data: { table: ApiTable } }> =>
    apiCall("/tables", { method: "POST", body: JSON.stringify(data) }),

  update: (id: string, data: { name?: string; seats?: number; zone?: string; status?: ApiTableStatus; occupiedAt?: string | null; customerName?: string | null; orderTotal?: number | null }): Promise<{ success: boolean; data: { table: ApiTable } }> =>
    apiCall(`/tables/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  remove: (id: string): Promise<{ success: boolean; message: string }> =>
    apiCall(`/tables/${id}`, { method: "DELETE" }),
};

// ─── Pagination envelope ──────────────────────────────────────────────────────

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    items: T[];
    pagination: Pagination;
  };
}

// ─── Business API ─────────────────────────────────────────────────────────────

export interface ApiBusinessProfile {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  state?: string;
  city?: string;
  address?: string;
  businessType?: string;
  currency: string;
  logoUrl?: string;
  updatedAt: string;
}

export const businessAPI = {
  getProfile: (): Promise<{ success: boolean; data: { business: ApiBusinessProfile } }> =>
    apiCall("/business/profile"),

  updateProfile: (data: Partial<Omit<ApiBusinessProfile, "id" | "updatedAt">>): Promise<{ success: boolean; data: { business: ApiBusinessProfile } }> =>
    apiCall("/business/profile", { method: "PUT", body: JSON.stringify(data) }),
};

// ─── Inventory API ────────────────────────────────────────────────────────────

export interface ApiIngredient {
  id: string;
  name: string;
  unit: string;
  currentStock: number;
  reorderLevel: number;
  unitCost: number;
  supplier?: string;
  lowStock: boolean;
  createdAt: string;
}

export interface ApiInventoryLog {
  id: string;
  type: "StockIn" | "StockOut" | "Adjustment" | "Wastage";
  quantity: number;
  note?: string;
  createdAt: string;
}

export interface StockMovementInput {
  type: "StockIn" | "StockOut" | "Adjustment" | "Wastage";
  quantity: number;
  note?: string;
}

export const inventoryAPI = {
  list: (params?: { page?: number; limit?: number }): Promise<{ success: boolean; data: { ingredients: ApiIngredient[]; pagination: Pagination } }> =>
    apiCall(`/inventory?${new URLSearchParams(params as any)}`),

  create: (data: { name: string; unit: string; currentStock?: number; reorderLevel?: number; unitCost?: number; supplier?: string }): Promise<{ success: boolean; data: { ingredient: ApiIngredient } }> =>
    apiCall("/inventory", { method: "POST", body: JSON.stringify(data) }),

  update: (id: string, data: Partial<{ name: string; unit: string; currentStock: number; reorderLevel: number; unitCost: number; supplier: string }>): Promise<{ success: boolean; data: { ingredient: ApiIngredient } }> =>
    apiCall(`/inventory/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  remove: (id: string): Promise<{ success: boolean; message: string }> =>
    apiCall(`/inventory/${id}`, { method: "DELETE" }),

  logMovement: (id: string, data: StockMovementInput): Promise<{ success: boolean; data: { ingredient: ApiIngredient } }> =>
    apiCall(`/inventory/${id}/log`, { method: "POST", body: JSON.stringify(data) }),

  getLogs: (id: string): Promise<{ success: boolean; data: { logs: ApiInventoryLog[] } }> =>
    apiCall(`/inventory/${id}/logs`),
};

// ─── Customers API ────────────────────────────────────────────────────────────

export interface ApiCustomer {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  loyaltyPoints: number;
  totalSpent: number;
  visitCount: number;
  createdAt: string;
}

export const customersAPI = {
  list: (params?: { page?: number; limit?: number; search?: string }): Promise<{ success: boolean; data: { customers: ApiCustomer[]; pagination: Pagination } }> =>
    apiCall(`/customers?${new URLSearchParams(params as any)}`),

  create: (data: { firstName: string; lastName: string; phone: string; email?: string }): Promise<{ success: boolean; data: { customer: ApiCustomer } }> =>
    apiCall("/customers", { method: "POST", body: JSON.stringify(data) }),

  update: (id: string, data: Partial<{ firstName: string; lastName: string; phone: string; email: string }>): Promise<{ success: boolean; data: { customer: ApiCustomer } }> =>
    apiCall(`/customers/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  remove: (id: string): Promise<{ success: boolean; message: string }> =>
    apiCall(`/customers/${id}`, { method: "DELETE" }),
};

// ─── Expenses API ─────────────────────────────────────────────────────────────

export type ExpenseCategory = "Food" | "Utilities" | "Staff" | "Equipment" | "Maintenance" | "Marketing" | "Other";

export interface ApiExpense {
  id: string;
  amount: number;
  description: string;
  category: ExpenseCategory;
  expenseDate: string;
  createdAt: string;
}

export const expensesAPI = {
  list: (params?: { page?: number; limit?: number; startDate?: string; endDate?: string }): Promise<{ success: boolean; data: { expenses: ApiExpense[]; pagination: Pagination } }> =>
    apiCall(`/expenses?${new URLSearchParams(params as any)}`),

  create: (data: { amount: number; description: string; category: ExpenseCategory; expenseDate: string }): Promise<{ success: boolean; data: { expense: ApiExpense } }> =>
    apiCall("/expenses", { method: "POST", body: JSON.stringify(data) }),

  update: (id: string, data: Partial<{ amount: number; description: string; category: ExpenseCategory; expenseDate: string }>): Promise<{ success: boolean; data: { expense: ApiExpense } }> =>
    apiCall(`/expenses/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  remove: (id: string): Promise<{ success: boolean; message: string }> =>
    apiCall(`/expenses/${id}`, { method: "DELETE" }),
};

// ─── Orders API ───────────────────────────────────────────────────────────────

export type OrderStatus = "Pending" | "InProgress" | "Ready" | "Served" | "Cancelled";
export type PaymentMethod = "Cash" | "Card" | "Mobile" | "Wallet";

export interface ApiOrderItem {
  id: string;
  menuItemId: string;
  menuItemName?: string;  // populated from backend include
  quantity: number;
  unitPrice: number;
  specialInstructions?: string;
}

export interface ApiOrder {
  id: string;
  status: OrderStatus;
  paymentStatus: "Unpaid" | "Partial" | "Completed";
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
  items: ApiOrderItem[];
  createdAt: string;
}

export interface CreateOrderInput {
  tableId?: string;
  customerId?: string;
  items: { menuItemId: string; quantity: number; unitPrice: number; specialInstructions?: string }[];
  notes?: string;
}

export const ordersAPI = {
  create: (data: CreateOrderInput): Promise<{ success: boolean; data: { order: ApiOrder } }> =>
    apiCall("/orders", { method: "POST", body: JSON.stringify(data) }),

  list: (params?: { page?: number; limit?: number; status?: string; date?: string }): Promise<{ success: boolean; data: { orders: ApiOrder[]; pagination: Pagination } }> =>
    apiCall(`/orders?${new URLSearchParams(params as any)}`),

  get: (id: string): Promise<{ success: boolean; data: { order: ApiOrder } }> =>
    apiCall(`/orders/${id}`),

  updateStatus: (id: string, status: OrderStatus): Promise<{ success: boolean; data: { order: ApiOrder } }> =>
    apiCall(`/orders/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) }),

  recordPayment: (id: string, data: { method: PaymentMethod; amount: number }): Promise<{ success: boolean; data: { order: ApiOrder } }> =>
    apiCall(`/orders/${id}/payment`, { method: "POST", body: JSON.stringify(data) }),
};

// ─── Transactions API ─────────────────────────────────────────────────────────

export const transactionsAPI = {
  list: (params?: { page?: number; limit?: number; startDate?: string; endDate?: string }): Promise<{ success: boolean; data: { transactions: ApiOrder[]; pagination: Pagination } }> =>
    apiCall(`/transactions?${new URLSearchParams(params as any)}`),
};

// ─── Account API (owner profile + PIN change) ─────────────────────────────────

export interface ApiAccountUser {
  id: string;
  email: string;
  businessName: string;
  ownerName: string;
  phone: string;
  isEmailVerified: boolean;
  createdAt: string;
}

export const accountAPI = {
  getMe: (): Promise<{ success: boolean; data: { user: ApiAccountUser } }> =>
    apiCall("/auth/me"),

  update: (data: {
    ownerName?: string;
    phone?: string;
    currentPin?: string;
    newPin?: string;
  }): Promise<{ success: boolean; data: { user: ApiAccountUser } }> =>
    apiCall("/auth/account", { method: "PUT", body: JSON.stringify(data) }),
};

// ─── Subscription API ─────────────────────────────────────────────────────────

export type SubscriptionPlan = "trial" | "monthly" | "yearly";

export interface ApiSubscriptionStatus {
  plan: SubscriptionPlan;
  cycle?: "monthly" | "yearly";
  expiresAt?: string;
  amount?: number;
  startedAt?: string;
}

export const subscriptionAPI = {
  getStatus: (): Promise<{ success: boolean; data: ApiSubscriptionStatus }> =>
    apiCall("/subscriptions/status"),

  verify: (data: {
    reference: string;
    cycle: "monthly" | "yearly";
  }): Promise<{ success: boolean; data: { plan: SubscriptionPlan; expiresAt: string } }> =>
    apiCall("/subscriptions/verify", { method: "POST", body: JSON.stringify(data) }),

  cancel: (): Promise<{ success: boolean; message: string }> =>
    apiCall("/subscriptions/cancel", { method: "POST" }),
};

// ─── Settings API ─────────────────────────────────────────────────────────────

export interface ApiBusinessSettings {
  taxEnabled: boolean;
  taxName: string;
  taxRate: number;
  taxInclusive: boolean;
  taxOnReceipt: boolean;
  serviceCharge: boolean;
  serviceRate: number;
  loyaltyEnabled: boolean;
  loyaltyRewardType: string;
  loyaltyRewardValue: number;
  loyaltyThreshold: number;
  loyaltyMinRedeem: number;
  loyaltyShowOnReceipt: boolean;
  loyaltyAutoEnroll: boolean;
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
  kotEnabled: boolean;
  tablesEnabled: boolean;
}

export const settingsAPI = {
  get: (): Promise<{ success: boolean; data: { settings: ApiBusinessSettings } }> =>
    apiCall("/settings"),

  update: (data: Partial<ApiBusinessSettings>): Promise<{ success: boolean; data: { settings: ApiBusinessSettings } }> =>
    apiCall("/settings", { method: "PUT", body: JSON.stringify(data) }),
};

// ─── Suppliers API ────────────────────────────────────────────────────────────

export interface ApiSupplier {
  id: string;
  name: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  itemsSupplied?: string;
  status: string;
  createdAt: string;
}

export const suppliersAPI = {
  list: (): Promise<{ success: boolean; data: { suppliers: ApiSupplier[] } }> =>
    apiCall("/suppliers"),

  create: (data: Omit<ApiSupplier, "id" | "createdAt">): Promise<{ success: boolean; data: { supplier: ApiSupplier } }> =>
    apiCall("/suppliers", { method: "POST", body: JSON.stringify(data) }),

  update: (id: string, data: Partial<Omit<ApiSupplier, "id" | "createdAt">>): Promise<{ success: boolean; data: { supplier: ApiSupplier } }> =>
    apiCall(`/suppliers/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  remove: (id: string): Promise<{ success: boolean; message: string }> =>
    apiCall(`/suppliers/${id}`, { method: "DELETE" }),
};
