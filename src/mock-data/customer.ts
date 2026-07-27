import type { ApiCustomer } from "@/services/api"

export const mockApiCustomers: ApiCustomer[] = [
  {
    id: "mock-customer-001",
    firstName: "Ada",
    lastName: "Okafor",
    phone: "08031234567",
    email: "ada.okafor@example.com",
    loyaltyPoints: 540,
    totalSpent: 182500,
    visitCount: 9,
    createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-customer-002",
    firstName: "Tunde",
    lastName: "Balogun",
    phone: "08042345678",
    email: "tunde.balogun@example.com",
    loyaltyPoints: 240,
    totalSpent: 93500,
    visitCount: 4,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-customer-003",
    firstName: "Kemi",
    lastName: "Adebayo",
    phone: "08053456789",
    email: "kemi.adebayo@example.com",
    loyaltyPoints: 310,
    totalSpent: 126000,
    visitCount: 6,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
]
