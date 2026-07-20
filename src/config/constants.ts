// Public routes that any authenticated user can visit
export const PUBLIC_ROUTES = [
  "/otp",
  "/create-pin",
  "/enter-pin",
  "/forgot-password",
  "/menu-view",
]

// Routes that indicate the user has just logged in and app data should be initialised
export const AUTH_ROUTES = [
  "/dashboard",
  "/kds",
  "/reports",
  "/inventory",
  "/menu",
  "/customers",
  "/staff",
  "/expenses",
  "/billing",
  "/settings",
  "/orders",
  "/tables",
  "/settlements",
]

export const INTER = "'Inter', sans-serif"
