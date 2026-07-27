import type { ApiOrder } from "@/services/api"

export const mockApiOrders: ApiOrder[] = [
  {
    id: "mock-completed-001",
    status: "Served",
    paymentStatus: "Completed",
    subtotal: 6500,
    tax: 650,
    total: 7150,
    notes: JSON.stringify({
      cashier: "Ada",
      paymentMethod: "Card",
      tableNo: "12",
      mockStatus: "completed",
    }),
    items: [{ id: "mi-1", menuItemId: "Burger", quantity: 2, unitPrice: 3200 }],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-refunded-002",
    status: "Cancelled",
    paymentStatus: "Completed",
    subtotal: 4200,
    tax: 420,
    total: 4620,
    notes: JSON.stringify({
      cashier: "Tunde",
      paymentMethod: "Transfer",
      tableNo: "7",
      mockStatus: "refunded",
    }),
    items: [{ id: "mi-2", menuItemId: "Pizza", quantity: 1, unitPrice: 4200 }],
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock-voided-003",
    status: "Cancelled",
    paymentStatus: "Unpaid",
    subtotal: 2800,
    tax: 280,
    total: 3080,
    notes: JSON.stringify({
      cashier: "Kemi",
      paymentMethod: "Cash",
      tableNo: "4",
      mockStatus: "voided",
    }),
    items: [{ id: "mi-3", menuItemId: "Fries", quantity: 3, unitPrice: 900 }],
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
]
