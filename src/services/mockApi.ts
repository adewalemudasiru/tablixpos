/**
 * Standalone Client-Side Mock API
 * Intercepts fetch requests in the browser and handles them using localStorage
 */

const STORE_KEY = "tablix_app_store_v2"
const TRANSACTIONS_KEY = "tablix_transactions"
const USER_KEY = "tablix_mock_user"
const OWNER_PIN_KEY = "tablix_owner_pin"
const ACTIVITY_KEY = "tablix_activity_log_v1"

// ─── Default Seed Data ────────────────────────────────────────────────────────

const DEFAULT_USER = {
  id: "owner-1",
  email: "owner@tablixpos.com",
  businessName: "Tablix POS",
  ownerName: "Business Owner",
  phone: "",
  isEmailVerified: true,
}

const DEFAULT_CATEGORIES = [
  {
    id: "cat-1",
    name: "Burgers",
    description: "Juicy handcrafted burgers",
    active: true,
    isActive: true,
  },
  {
    id: "cat-2",
    name: "Appetizers",
    description: "Start your meal right",
    active: true,
    isActive: true,
  },
  {
    id: "cat-3",
    name: "Pizza",
    description: "Wood-fired oven pizzas",
    active: true,
    isActive: true,
  },
  {
    id: "cat-4",
    name: "Pasta",
    description: "Italian classic pastas",
    active: true,
    isActive: true,
  },
  {
    id: "cat-5",
    name: "Sides",
    description: "Extra accompaniments",
    active: true,
    isActive: true,
  },
  {
    id: "cat-6",
    name: "Drinks",
    description: "Cold beverages",
    active: true,
    isActive: true,
  },
  {
    id: "cat-7",
    name: "Desserts",
    description: "Sweet treats",
    active: true,
    isActive: true,
  },
  {
    id: "cat-8",
    name: "Salads",
    description: "Healthy fresh green salads",
    active: true,
    isActive: true,
  },
  {
    id: "cat-9",
    name: "Cocktails",
    description: "Refreshing craft cocktails and mocktails",
    active: true,
    isActive: true,
  },
  {
    id: "cat-10",
    name: "Seafood",
    description: "Fresh catch and ocean delights",
    active: true,
    isActive: true,
  },
]

const DEFAULT_ITEMS = [
  {
    id: "menu-1",
    name: "Classic Cheeseburger",
    price: 5500,
    category: "Burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    available: true,
    variants: [],
    addons: [
      { id: "add-1", name: "Extra Cheese", price: 500 },
      { id: "add-2", name: "Bacon Slice", price: 1000 },
    ],
    ingredients: [
      { ingredientId: "inv-1", qty: 1 },
      { ingredientId: "inv-2", qty: 1 },
      { ingredientId: "inv-4", qty: 0.05 },
      { ingredientId: "inv-9", qty: 0.05 },
    ],
  },
  {
    id: "menu-1b",
    name: "BBQ Bacon Burger",
    price: 6500,
    category: "Burgers",
    image:
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop",
    available: true,
    variants: [],
    addons: [{ id: "add-1", name: "Extra Cheese", price: 500 }],
    ingredients: [
      { ingredientId: "inv-1", qty: 1 },
      { ingredientId: "inv-2", qty: 1 },
      { ingredientId: "inv-9", qty: 0.03 },
    ],
  },
  {
    id: "menu-1c",
    name: "Double Smash Burger",
    price: 8500,
    category: "Burgers",
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop",
    available: true,
    variants: [],
    addons: [
      { id: "add-1", name: "Extra Cheese", price: 500 },
      { id: "add-2", name: "Bacon Slice", price: 1000 },
    ],
    ingredients: [
      { ingredientId: "inv-1", qty: 2 },
      { ingredientId: "inv-2", qty: 1 },
      { ingredientId: "inv-4", qty: 0.08 },
    ],
  },
  {
    id: "menu-2",
    name: "Chicken Wings (6pcs)",
    price: 4000,
    category: "Appetizers",
    image:
      "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=300&fit=crop",
    available: true,
    variants: [],
    addons: [],
    ingredients: [{ ingredientId: "inv-8", qty: 0.3 }],
  },
  {
    id: "menu-2b",
    name: "Mozzarella Sticks",
    price: 3500,
    category: "Appetizers",
    image:
      "https://images.unsplash.com/photo-1531749668029-2db88e4b76c0?w=400&h=300&fit=crop",
    available: true,
    variants: [],
    addons: [],
    ingredients: [{ ingredientId: "inv-4", qty: 0.25 }],
  },
  {
    id: "menu-2c",
    name: "Garlic Bread with Cheese",
    price: 2800,
    category: "Appetizers",
    image:
      "https://images.unsplash.com/photo-1573145959956-e9fae6b6befe?w=400&h=300&fit=crop",
    available: true,
    variants: [],
    addons: [],
    ingredients: [{ ingredientId: "inv-4", qty: 0.1 }],
  },
  {
    id: "menu-3",
    name: "Margarita Pizza",
    price: 8500,
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
    available: true,
    variants: [
      { id: "pv-1", name: "Medium", price: 8500 },
      { id: "pv-2", name: "Large", price: 12500 },
    ],
    addons: [{ id: "add-1", name: "Extra Cheese", price: 1000 }],
    ingredients: [
      { ingredientId: "inv-5", qty: 1 },
      { ingredientId: "inv-4", qty: 0.15 },
      { ingredientId: "inv-10", qty: 0.1 },
    ],
  },
  {
    id: "menu-3b",
    name: "Pepperoni Pizza",
    price: 9500,
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
    available: true,
    variants: [
      { id: "pv-3", name: "Medium", price: 9500 },
      { id: "pv-4", name: "Large", price: 14000 },
    ],
    addons: [{ id: "add-1", name: "Extra Cheese", price: 1000 }],
    ingredients: [
      { ingredientId: "inv-5", qty: 1 },
      { ingredientId: "inv-4", qty: 0.12 },
      { ingredientId: "inv-6", qty: 0.08 },
    ],
  },
  {
    id: "menu-3c",
    name: "Veggie Supreme Pizza",
    price: 9000,
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    available: true,
    variants: [
      { id: "pv-5", name: "Medium", price: 9000 },
      { id: "pv-6", name: "Large", price: 13000 },
    ],
    addons: [],
    ingredients: [
      { ingredientId: "inv-5", qty: 1 },
      { ingredientId: "inv-4", qty: 0.1 },
      { ingredientId: "inv-10", qty: 0.08 },
      { ingredientId: "inv-9", qty: 0.03 },
    ],
  },
  {
    id: "menu-5",
    name: "Spaghetti Bolognese",
    price: 7500,
    category: "Pasta",
    image:
      "https://images.unsplash.com/photo-1563379971899-660589a01cd3?w=400&h=300&fit=crop",
    available: true,
    variants: [],
    addons: [],
    ingredients: [
      { ingredientId: "inv-14", qty: 0.12 },
      { ingredientId: "inv-1", qty: 0.1 },
    ],
  },
  {
    id: "menu-5b",
    name: "Creamy Chicken Alfredo",
    price: 8000,
    category: "Pasta",
    image:
      "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&h=300&fit=crop",
    available: true,
    variants: [],
    addons: [],
    ingredients: [
      { ingredientId: "inv-14", qty: 0.12 },
      { ingredientId: "inv-8", qty: 0.15 },
      { ingredientId: "inv-11", qty: 0.1 },
    ],
  },
  {
    id: "menu-6",
    name: "French Fries",
    price: 2000,
    category: "Sides",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
    available: true,
    variants: [],
    addons: [],
    ingredients: [{ ingredientId: "inv-7", qty: 0.25 }],
  },
  {
    id: "menu-6b",
    name: "Onion Rings",
    price: 2500,
    category: "Sides",
    image:
      "https://images.unsplash.com/photo-1639024471283-2bc7b3c6a267?w=400&h=300&fit=crop",
    available: true,
    variants: [],
    addons: [],
    ingredients: [],
  },
  {
    id: "menu-6c",
    name: "Sweet Potato Fries",
    price: 2500,
    category: "Sides",
    image:
      "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=400&h=300&fit=crop",
    available: true,
    variants: [],
    addons: [],
    ingredients: [],
  },
  {
    id: "menu-4",
    name: "Coca Cola (Can)",
    price: 1000,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=300&fit=crop",
    available: true,
    variants: [],
    addons: [],
    ingredients: [{ ingredientId: "inv-3", qty: 1 }],
  },
  {
    id: "menu-4b",
    name: "Fresh Orange Juice",
    price: 2000,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1613478223719-2ab80260f1a3?w=400&h=300&fit=crop",
    available: true,
    variants: [],
    addons: [],
    ingredients: [{ ingredientId: "inv-10", qty: 0.2 }],
  },
  {
    id: "menu-4c",
    name: "Caffe Latte",
    price: 1800,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1570968915860-54d5c301fc9f?w=400&h=300&fit=crop",
    available: true,
    variants: [],
    addons: [],
    ingredients: [{ ingredientId: "inv-13", qty: 0.015 }],
  },
  {
    id: "menu-7",
    name: "Chocolate Lava Cake",
    price: 3500,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
    available: true,
    variants: [],
    addons: [],
    ingredients: [],
  },
  {
    id: "menu-7b",
    name: "Apple Crumble",
    price: 3800,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1507226983735-a838615193b0?w=400&h=300&fit=crop",
    available: true,
    variants: [],
    addons: [],
    ingredients: [],
  },
  {
    id: "menu-8",
    name: "Chicken Caesar Salad",
    price: 4500,
    category: "Salads",
    image:
      "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=300&fit=crop",
    available: true,
    variants: [],
    addons: [],
    ingredients: [
      { ingredientId: "inv-8", qty: 0.15 },
      { ingredientId: "inv-9", qty: 0.1 },
    ],
  },
  {
    id: "menu-8b",
    name: "Caprese Salad",
    price: 3800,
    category: "Salads",
    image:
      "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=400&h=300&fit=crop",
    available: true,
    variants: [],
    addons: [],
    ingredients: [
      { ingredientId: "inv-4", qty: 0.1 },
      { ingredientId: "inv-10", qty: 0.15 },
    ],
  },
  {
    id: "menu-9",
    name: "Virgin Mojito",
    price: 2500,
    category: "Cocktails",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop",
    available: true,
    variants: [
      { id: "v-1", name: "Regular", price: 2500 },
      { id: "v-2", name: "Jumbo", price: 3800 },
    ],
    addons: [],
    ingredients: [],
  },
  {
    id: "menu-9b",
    name: "Strawberry Daiquiri",
    price: 3000,
    category: "Cocktails",
    image:
      "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400&h=300&fit=crop",
    available: true,
    variants: [],
    addons: [],
    ingredients: [],
  },
  {
    id: "menu-10",
    name: "Grilled Salmon",
    price: 12500,
    category: "Seafood",
    image:
      "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&h=300&fit=crop",
    available: false,
    variants: [],
    addons: [],
    ingredients: [{ ingredientId: "inv-12", qty: 0.25 }],
  },
  {
    id: "menu-10b",
    name: "Crispy Fried Prawns",
    price: 8500,
    category: "Seafood",
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
    available: true,
    variants: [],
    addons: [],
    ingredients: [{ ingredientId: "inv-15", qty: 0.2 }],
  },
]

const DEFAULT_TABLES = [
  {
    id: "tbl-1",
    name: "Table 1",
    seats: 4,
    zone: "Main Floor",
    status: "available",
    occupiedAt: null,
    customerName: null,
    orderTotal: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tbl-2",
    name: "Table 2",
    seats: 2,
    zone: "Main Floor",
    status: "occupied",
    occupiedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    customerName: "Alice Johnson",
    orderTotal: 13975,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tbl-3",
    name: "Table 3",
    seats: 6,
    zone: "VIP",
    status: "reserved",
    occupiedAt: null,
    customerName: null,
    orderTotal: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tbl-4",
    name: "Table 4",
    seats: 4,
    zone: "Patio",
    status: "available",
    occupiedAt: null,
    customerName: null,
    orderTotal: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tbl-5",
    name: "Table 5",
    seats: 2,
    zone: "Patio",
    status: "bill_requested",
    occupiedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    customerName: "Bob Williams",
    orderTotal: 13437,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tbl-6",
    name: "Table 6",
    seats: 8,
    zone: "VIP",
    status: "available",
    occupiedAt: null,
    customerName: null,
    orderTotal: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tbl-7",
    name: "Table 7",
    seats: 4,
    zone: "Main Floor",
    status: "available",
    occupiedAt: null,
    customerName: null,
    orderTotal: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tbl-8",
    name: "Table 8",
    seats: 2,
    zone: "Main Floor",
    status: "available",
    occupiedAt: null,
    customerName: null,
    orderTotal: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const DEFAULT_STAFF = [
  {
    id: "staff-1",
    name: "Admin",
    email: "admin@tablix.com",
    role: "Admin",
    pin: "000000",
    dateCreated: new Date().toISOString(),
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "staff-2",
    name: "John Cashier",
    email: "john@tablix.com",
    role: "Cashier",
    pin: "123456",
    dateCreated: new Date().toISOString(),
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "staff-3",
    name: "Jane Waiter",
    email: "jane@tablix.com",
    role: "Waiter",
    pin: "222222",
    dateCreated: new Date().toISOString(),
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "staff-4",
    name: "Chef Mario",
    email: "mario@tablix.com",
    role: "Chef",
    pin: "333333",
    dateCreated: new Date().toISOString(),
    isActive: true,
    createdAt: new Date().toISOString(),
  },
]

const DEFAULT_INVENTORY = [
  {
    id: "inv-1",
    name: "Beef Patty",
    unit: "pcs",
    qty: 150,
    minQty: 30,
    costPerUnit: 1200,
    supplier: "Meat Co",
    status: "Active",
  },
  {
    id: "inv-2",
    name: "Burger Buns",
    unit: "pack",
    qty: 25,
    minQty: 10,
    costPerUnit: 3500,
    supplier: "Local Bakery",
    status: "Active",
  },
  {
    id: "inv-3",
    name: "Coke Cans",
    unit: "carton",
    qty: 5,
    minQty: 10,
    costPerUnit: 15000,
    supplier: "BevDistributors",
    status: "Low Stock",
  },
  {
    id: "inv-4",
    name: "Mozzarella Cheese",
    unit: "kg",
    qty: 45,
    minQty: 15,
    costPerUnit: 4800,
    supplier: "Dairy Fresh",
    status: "Active",
  },
  {
    id: "inv-5",
    name: "Pizza Dough",
    unit: "pcs",
    qty: 80,
    minQty: 20,
    costPerUnit: 500,
    supplier: "Local Bakery",
    status: "Active",
  },
  {
    id: "inv-6",
    name: "Pepperoni Slices",
    unit: "kg",
    qty: 12,
    minQty: 5,
    costPerUnit: 6000,
    supplier: "Meat Co",
    status: "Active",
  },
  {
    id: "inv-7",
    name: "Potatoes",
    unit: "kg",
    qty: 100,
    minQty: 30,
    costPerUnit: 800,
    supplier: "Veggie Farm",
    status: "Active",
  },
  {
    id: "inv-8",
    name: "Chicken Breast",
    unit: "kg",
    qty: 8,
    minQty: 15,
    costPerUnit: 4500,
    supplier: "Meat Co",
    status: "Low Stock",
  },
  {
    id: "inv-9",
    name: "Lettuce",
    unit: "kg",
    qty: 3,
    minQty: 8,
    costPerUnit: 1200,
    supplier: "Veggie Farm",
    status: "Low Stock",
  },
  {
    id: "inv-10",
    name: "Tomatoes",
    unit: "kg",
    qty: 25,
    minQty: 10,
    costPerUnit: 1000,
    supplier: "Veggie Farm",
    status: "Active",
  },
  {
    id: "inv-11",
    name: "Cooking Cream",
    unit: "L",
    qty: 15,
    minQty: 5,
    costPerUnit: 3200,
    supplier: "Dairy Fresh",
    status: "Active",
  },
  {
    id: "inv-12",
    name: "Salmon Fillets",
    unit: "kg",
    qty: 0,
    minQty: 8,
    costPerUnit: 12000,
    supplier: "Seafood Express",
    status: "Out of Stock",
  },
  {
    id: "inv-13",
    name: "Coffee Beans",
    unit: "kg",
    qty: 18,
    minQty: 5,
    costPerUnit: 8500,
    supplier: "Spice & Flavor",
    status: "Active",
  },
  {
    id: "inv-14",
    name: "Pasta Spaghetti",
    unit: "kg",
    qty: 60,
    minQty: 15,
    costPerUnit: 1500,
    supplier: "Global Foods",
    status: "Active",
  },
  {
    id: "inv-15",
    name: "Prawns",
    unit: "kg",
    qty: 14,
    minQty: 5,
    costPerUnit: 9500,
    supplier: "Seafood Express",
    status: "Active",
  },
  {
    id: "inv-16",
    name: "Cooking Oil",
    unit: "L",
    qty: 45,
    minQty: 10,
    costPerUnit: 2500,
    supplier: "Global Foods",
    status: "Active",
  },
]

const DEFAULT_CUSTOMERS = [
  {
    id: "cust-1",
    firstName: "Alice",
    lastName: "Johnson",
    name: "Alice Johnson",
    phone: "08011112222",
    email: "alice@example.com",
    totalSpent: 45000,
    visitCount: 5,
    lastVisit: new Date().toISOString().split("T")[0],
    joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    loyaltyPoints: 450,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "cust-2",
    firstName: "Bob",
    lastName: "Williams",
    name: "Bob Williams",
    phone: "08033334444",
    email: "bob@example.com",
    totalSpent: 12000,
    visitCount: 2,
    lastVisit: new Date().toISOString().split("T")[0],
    joinDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    loyaltyPoints: 120,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "cust-3",
    firstName: "Charlie",
    lastName: "Brown",
    name: "Charlie Brown",
    phone: "08055556666",
    email: "charlie@example.com",
    totalSpent: 35000,
    visitCount: 4,
    lastVisit: new Date().toISOString().split("T")[0],
    joinDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    loyaltyPoints: 350,
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "cust-4",
    firstName: "Diana",
    lastName: "Prince",
    name: "Diana Prince",
    phone: "08077778888",
    email: "diana@example.com",
    totalSpent: 75000,
    visitCount: 8,
    lastVisit: new Date().toISOString().split("T")[0],
    joinDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    loyaltyPoints: 750,
    createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "cust-5",
    firstName: "Evan",
    lastName: "Wright",
    name: "Evan Wright",
    phone: "08099990000",
    email: "evan@example.com",
    totalSpent: 8000,
    visitCount: 1,
    lastVisit: new Date().toISOString().split("T")[0],
    joinDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    loyaltyPoints: 80,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

const DEFAULT_SUPPLIERS = [
  {
    id: "sup-1",
    name: "Meat Co",
    contactPerson: "John Smith",
    phone: "08012345678",
    email: "john@meatco.com",
    address: "12 Carnivore Rd, Lagos",
    itemsSupplied: "Beef Patty, Pepperoni Slices, Chicken Breast",
    totalOrders: 15,
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sup-2",
    name: "Local Bakery",
    contactPerson: "Jane Doe",
    phone: "08087654321",
    email: "orders@bakery.com",
    address: "34 Flour Ave, Lagos",
    itemsSupplied: "Burger Buns, Pizza Dough",
    totalOrders: 8,
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sup-3",
    name: "BevDistributors",
    contactPerson: "Mike G",
    phone: "08011223344",
    email: "mike@bevdist.com",
    address: "78 Liquid Way, Lagos",
    itemsSupplied: "Coke Cans",
    totalOrders: 12,
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sup-4",
    name: "Dairy Fresh",
    contactPerson: "Sarah K",
    phone: "08055667788",
    email: "sarah@dairyfresh.com",
    address: "9 Milk Lane, Lagos",
    itemsSupplied: "Mozzarella Cheese, Cooking Cream",
    totalOrders: 6,
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sup-5",
    name: "Veggie Farm",
    contactPerson: "Tunde O",
    phone: "08099887766",
    email: "tunde@veggiefarm.com",
    address: "Farmer Market, Lagos",
    itemsSupplied: "Potatoes, Lettuce, Tomatoes",
    totalOrders: 10,
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sup-6",
    name: "Spice & Flavor",
    contactPerson: "Aisha M",
    phone: "08022334455",
    email: "aisha@spiceflavor.com",
    address: "7 Pepper Lane, Lagos",
    itemsSupplied: "Coffee Beans",
    totalOrders: 5,
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sup-7",
    name: "Seafood Express",
    contactPerson: "Emeka N",
    phone: "08077889900",
    email: "emeka@seafoodex.com",
    address: "Marina Wharf, Lagos",
    itemsSupplied: "Salmon Fillets, Prawns",
    totalOrders: 4,
    status: "Active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sup-8",
    name: "Global Foods",
    contactPerson: "Victor C",
    phone: "08033445566",
    email: "victor@globalfoods.com",
    address: "5 Warehouse Rd, Lagos",
    itemsSupplied: "Pasta Spaghetti, Cooking Oil",
    totalOrders: 18,
    status: "Active",
    createdAt: new Date().toISOString(),
  },
]

const DEFAULT_EXPENSES = [
  {
    id: "exp-1",
    description: "Gas Refill",
    amount: 15000,
    category: "Utilities",
    expenseDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    paidBy: "Owner",
    vendor: "GasStation",
    status: "Approved",
    paymentMethod: "Cash",
    notes: "Gas refill for kitchen cookers",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "exp-2",
    description: "Beef Patty & Bacon Purchase",
    amount: 45000,
    category: "Food",
    expenseDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    paidBy: "Owner",
    vendor: "Meat Co",
    status: "Approved",
    paymentMethod: "Transfer",
    notes: "Bulk meat restock",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "exp-3",
    description: "Electricity Bill (EKEDC)",
    amount: 28000,
    category: "Utilities",
    expenseDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    paidBy: "Owner",
    vendor: "EKEDC",
    status: "Approved",
    paymentMethod: "Card",
    notes: "May electricity invoice",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "exp-4",
    description: "Office Fiber Internet Subscription",
    amount: 12000,
    category: "Utilities",
    expenseDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    paidBy: "Owner",
    vendor: "MTN Nigeria",
    status: "Approved",
    paymentMethod: "Transfer",
    notes: "Monthly internet fee",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "exp-5",
    description: "Buns & Pizza Dough Delivery",
    amount: 10500,
    category: "Food",
    expenseDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    paidBy: "Owner",
    vendor: "Local Bakery",
    status: "Approved",
    paymentMethod: "Cash",
    notes: "Fresh bakery delivery",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "exp-6",
    description: "Restaurant Cleaning Supplies",
    amount: 8000,
    category: "Other",
    expenseDate: new Date().toISOString().split("T")[0],
    date: new Date().toISOString().split("T")[0],
    paidBy: "Owner",
    vendor: "Supermarket",
    status: "Approved",
    paymentMethod: "Cash",
    notes: "Soap, sanitizer, garbage bags",
    createdAt: new Date().toISOString(),
  },
  {
    id: "exp-7",
    description: "Monthly Salary - John Cashier",
    amount: 85000,
    category: "Staff",
    expenseDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    paidBy: "Owner",
    vendor: "John Cashier",
    status: "Approved",
    paymentMethod: "Transfer",
    notes: "Cashier monthly payroll",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "exp-8",
    description: "Monthly Salary - Jane Waiter",
    amount: 75000,
    category: "Staff",
    expenseDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    paidBy: "Owner",
    vendor: "Jane Waiter",
    status: "Approved",
    paymentMethod: "Transfer",
    notes: "Waiter monthly payroll",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "exp-9",
    description: "Monthly Salary - Chef Mario",
    amount: 120000,
    category: "Staff",
    expenseDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    paidBy: "Owner",
    vendor: "Chef Mario",
    status: "Approved",
    paymentMethod: "Transfer",
    notes: "Head chef monthly payroll",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "exp-10",
    description: "Staff Uniform Branded Shirts",
    amount: 35000,
    category: "Staff",
    expenseDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    paidBy: "Owner",
    vendor: "Branding Express",
    status: "Approved",
    paymentMethod: "Transfer",
    notes: "10 customized polo shirts",
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "exp-11",
    description: "Weekly Transport Allowance",
    amount: 15000,
    category: "Staff",
    expenseDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    paidBy: "Owner",
    vendor: "Staff Pool",
    status: "Approved",
    paymentMethod: "Cash",
    notes: "Travel stipend for remote staff",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "exp-12",
    description: "Staff Training & Health Certs",
    amount: 50000,
    category: "Staff",
    expenseDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    paidBy: "Owner",
    vendor: "Food Safety Board",
    status: "Approved",
    paymentMethod: "Transfer",
    notes: "Annual food hygiene certs",
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "exp-13",
    description: "Kitchen Blender Replacement",
    amount: 48000,
    category: "Equipment",
    expenseDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    paidBy: "Owner",
    vendor: "Kitchen Equip Ltd",
    status: "Approved",
    paymentMethod: "Card",
    notes: "Heavy-duty commercial blender",
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "exp-14",
    description: "A/C Servicing in Dining Hall",
    amount: 22000,
    category: "Maintenance",
    expenseDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    paidBy: "Owner",
    vendor: "CoolTemp Tech",
    status: "Approved",
    paymentMethod: "Cash",
    notes: "General maintenance & gas refill",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "exp-15",
    description: "Social Media Sponsored Ads",
    amount: 30000,
    category: "Marketing",
    expenseDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    paidBy: "Owner",
    vendor: "Meta Ads",
    status: "Approved",
    paymentMethod: "Card",
    notes: "Instagram & Facebook campaigns",
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "exp-16",
    description: "Weekly Staff Meals & Tea",
    amount: 18000,
    category: "Staff",
    expenseDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    paidBy: "Owner",
    vendor: "In-House Kitchen",
    status: "Approved",
    paymentMethod: "Cash",
    notes: "Ingredients for staff breakfast",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

const DEFAULT_KDS_ORDERS = [
  {
    id: "kds-1",
    orderNo: "001",
    tableNo: "Table 2",
    customer: "Alice Johnson",
    status: "New",
    priority: "Normal",
    station: "Hot Kitchen",
    placedAt: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    startedAt: null,
    readyAt: null,
    items: [
      {
        id: "ki-1a",
        name: "Classic Cheeseburger",
        qty: 2,
        notes: "No pickles",
        done: false,
      },
      {
        id: "ki-1b",
        name: "Chicken Wings (6pcs)",
        qty: 1,
        notes: "",
        done: false,
      },
    ],
  },
  {
    id: "kds-2",
    orderNo: "002",
    tableNo: "Table 5",
    customer: "Bob Williams",
    status: "InProgress",
    priority: "Normal",
    station: "Hot Kitchen",
    placedAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    startedAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    readyAt: null,
    items: [
      {
        id: "ki-2a",
        name: "Margarita Pizza",
        qty: 1,
        notes: "Extra cheese",
        done: false,
      },
      { id: "ki-2b", name: "Coca Cola (Can)", qty: 3, notes: "", done: true },
    ],
  },
  {
    id: "kds-3",
    orderNo: "003",
    tableNo: "Table 1",
    customer: "Walk-in",
    status: "Ready",
    priority: "Rush",
    station: "Grill",
    placedAt: new Date(Date.now() - 22 * 60 * 1000).toISOString(),
    startedAt: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    readyAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    items: [
      {
        id: "ki-3a",
        name: "Classic Cheeseburger",
        qty: 1,
        notes: "",
        done: true,
      },
      {
        id: "ki-3b",
        name: "Chicken Wings (6pcs)",
        qty: 2,
        notes: "Extra spicy",
        done: true,
      },
    ],
  },
]

// Helper to ensure database is initialized in localStorage
function initializeDatabase() {
  // One-time reset to seed mock data
  if (localStorage.getItem("tablix_mock_data_version") !== "v7") {
    localStorage.removeItem(STORE_KEY)
    localStorage.removeItem(TRANSACTIONS_KEY)
    localStorage.removeItem(ACTIVITY_KEY)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(OWNER_PIN_KEY)
    localStorage.setItem("tablix_mock_data_version", "v7")
  }

  if (!localStorage.getItem(USER_KEY)) {
    localStorage.setItem(USER_KEY, JSON.stringify(DEFAULT_USER))
  }
  if (!localStorage.getItem(OWNER_PIN_KEY)) {
    localStorage.setItem(OWNER_PIN_KEY, "000000")
  }

  const rawStore = localStorage.getItem(STORE_KEY)
  if (!rawStore) {
    const defaultStore = {
      menuItems: DEFAULT_ITEMS,
      menuCategories: DEFAULT_CATEGORIES,
      inventoryItems: DEFAULT_INVENTORY,
      inventoryLog: [],
      suppliers: DEFAULT_SUPPLIERS,
      customers: DEFAULT_CUSTOMERS,
      staff: DEFAULT_STAFF,
      expenses: DEFAULT_EXPENSES,
      kdsOrders: DEFAULT_KDS_ORDERS,
      tables: DEFAULT_TABLES,
      taxConfig: {
        enabled: true,
        name: "VAT",
        rate: 7.5,
        inclusive: false,
        serviceCharge: true,
        serviceRate: 5,
        showOnReceipt: true,
      },
      posConfig: {
        receiptHeader: "Welcome to Tablix POS",
        receiptFooter: "Thank you for your patronage!",
        printerType: "Thermal",
        paperWidth: "80mm",
        autoPrint: true,
        showQR: true,
        showLogo: true,
        tipsEnabled: true,
        cashRounding: false,
        requireCustomer: false,
      },
      businessConfig: {
        tagline: "Serving quality, one plate at a time",
        address: "12B Victoria Island Boulevard",
        city: "Lagos",
        state: "Lagos State",
        phone: "+234 801 234 5678",
        email: "hello@tablixkitchen.ng",
        website: "www.tablixkitchen.ng",
        type: "Restaurant",
        rcNumber: "RC-123456",
      },
      loyaltyConfig: {
        enabled: true,
        rewardType: "percentage",
        rewardValue: 5,
        threshold: 100,
        minPointsToRedeem: 50,
        showBalanceOnReceipt: true,
        autoEnroll: true,
      },
      logo: null,
    }
    localStorage.setItem(STORE_KEY, JSON.stringify(defaultStore))
  }
}

// Ensure database has structural components
initializeDatabase()

// ─── DB Access Utilities ──────────────────────────────────────────────────────

function getStore() {
  initializeDatabase()
  return JSON.parse(localStorage.getItem(STORE_KEY)!)
}

function saveStore(store: any) {
  localStorage.setItem(STORE_KEY, JSON.stringify(store))
}

function getTransactions() {
  const tx = localStorage.getItem(TRANSACTIONS_KEY)
  return tx ? JSON.parse(tx) : []
}

function saveTransactions(tx: any[]) {
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(tx))
}

function getUser() {
  const u = localStorage.getItem(USER_KEY)
  return u ? JSON.parse(u) : DEFAULT_USER
}

function saveUser(u: any) {
  localStorage.setItem(USER_KEY, JSON.stringify(u))
}

// ─── Router Interceptor ────────────────────────────────────────────────────────

export async function handleMockRequest(
  url: string,
  init?: RequestInit
): Promise<Response> {
  const method = init?.method || "GET"
  const body = init?.body ? JSON.parse(init.body as string) : null
  let path = url.replace(/https?:\/\/[^\/]+/, "") // strip host name
  const qIdx = path.indexOf("?")
  if (qIdx !== -1) {
    path = path.substring(0, qIdx)
  }

  console.debug("[mockApi] request", { method, path, body })

  // Helper responses
  const ok = (data: any = {}) =>
    new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  const success = (message: string) =>
    new Response(JSON.stringify({ success: true, message }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  const error = (message: string, status = 400) =>
    new Response(JSON.stringify({ success: false, error: message, message }), {
      status,
      headers: { "Content-Type": "application/json" },
    })

  // ─── Auth Routes ───
  if (path.startsWith("/api/v1/auth/")) {
    const authPath = path.substring("/api/v1/auth/".length)

    if (authPath === "signup" && method === "POST") {
      const newUser = {
        id: `owner-${Date.now()}`,
        email: body.email,
        businessName: body.businessName,
        ownerName: body.ownerName,
        phone: body.phone,
        isEmailVerified: false,
      }
      saveUser(newUser)
      localStorage.setItem("tablix_business_id", "business-1")
      return ok({
        user: newUser,
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
      })
    }

    if (authPath === "verify-email" && method === "POST") {
      const u = getUser()
      u.isEmailVerified = true
      saveUser(u)
      return success("Email verified successfully.")
    }

    if (authPath === "set-pin" && method === "POST") {
      localStorage.setItem(OWNER_PIN_KEY, body.pin)
      return success("PIN set successfully.")
    }

    if (authPath === "resend-otp" && method === "POST") {
      return success("OTP code resent.")
    }

    if (authPath === "login" && method === "POST") {
      const u = getUser()
      const storedPin = localStorage.getItem(OWNER_PIN_KEY) || "000000"
      if (body.email === u.email && body.pin === storedPin) {
        localStorage.setItem("tablixpos_access_token", "mock-access-token")
        localStorage.setItem("tablixpos_refresh_token", "mock-refresh-token")
        localStorage.setItem("tablix_business_id", "business-1")
        return ok({
          user: u,
          accessToken: "mock-access-token",
          refreshToken: "mock-refresh-token",
        })
      }
      return error("Invalid email or PIN.", 401)
    }

    if (authPath === "forgot-password" && method === "POST") {
      return success("OTP code sent to email.")
    }

    if (authPath === "verify-reset-otp" && method === "POST") {
      return success("OTP verified successfully.")
    }

    if (authPath === "reset-password" && method === "POST") {
      localStorage.setItem(OWNER_PIN_KEY, body.newPin)
      return success("Password reset successfully.")
    }

    if (authPath === "refresh-token" && method === "POST") {
      return ok({
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
      })
    }

    if (authPath === "logout" && method === "POST") {
      localStorage.removeItem("tablixpos_access_token")
      localStorage.removeItem("tablixpos_refresh_token")
      return success("Logged out successfully.")
    }

    if (authPath === "me" && method === "GET") {
      const u = getUser()
      return ok({ user: u })
    }

    if (authPath === "account" && method === "PUT") {
      const u = getUser()
      if (body.ownerName) u.ownerName = body.ownerName
      if (body.phone) u.phone = body.phone
      if (body.newPin) {
        const storedPin = localStorage.getItem(OWNER_PIN_KEY)
        if (body.currentPin && body.currentPin !== storedPin) {
          return error("Incorrect current PIN.")
        }
        localStorage.setItem(OWNER_PIN_KEY, body.newPin)
      }
      saveUser(u)
      return ok({ user: u })
    }
  }

  // ─── Staff Routes ───
  if (path.startsWith("/api/v1/staff")) {
    const store = getStore()
    const staffPath = path.substring("/api/v1/staff".length)

    if (staffPath === "" || staffPath === "/") {
      if (method === "GET") {
        return ok({ staff: store.staff })
      }
      if (method === "POST") {
        const newStaff = {
          id: `staff-${Date.now()}`,
          name: body.name,
          email: body.email || null,
          phone: body.phone || null,
          role: body.role,
          pin: body.pin,
          dateCreated: new Date().toISOString(),
          isActive: true,
          createdAt: new Date().toISOString(),
          assignedStation: body.assignedStation,
        }
        store.staff.push(newStaff)
        saveStore(store)
        return ok({ staff: newStaff })
      }
    }

    if (staffPath.startsWith("/login") && method === "POST") {
      // Find staff with pin
      const match = store.staff.find((s: any) => s.pin === body.pin)
      if (match) {
        return ok({ staff: match })
      }
      return error("Invalid staff PIN.", 401)
    }

    const idMatch = /^\/([a-zA-Z0-9_-]+)/.exec(staffPath)
    if (idMatch) {
      const id = idMatch[1]
      const idx = store.staff.findIndex((s: any) => s.id === id)
      if (idx !== -1) {
        if (method === "PUT") {
          store.staff[idx] = {
            ...store.staff[idx],
            ...body,
            updatedAt: new Date().toISOString(),
          }
          saveStore(store)
          return ok({ staff: store.staff[idx] })
        }
        if (method === "DELETE") {
          store.staff.splice(idx, 1)
          saveStore(store)
          return success("Staff removed successfully.")
        }
      }
    }
  }

  // ─── Menu Categories Routes ───
  if (path.startsWith("/api/v1/menu/categories")) {
    const store = getStore()
    const catPath = path.substring("/api/v1/menu/categories".length)

    if (catPath === "" || catPath === "/") {
      if (method === "GET") {
        return ok({
          categories: store.menuCategories.map((c: any) => ({
            ...c,
            isActive: c.active !== false,
          })),
        })
      }
      if (method === "POST") {
        const newCat = {
          id: `cat-${Date.now()}`,
          name: body.name,
          description: body.description || "",
          active: true,
          createdAt: new Date().toISOString(),
          isActive: true,
        }
        store.menuCategories.push(newCat)
        saveStore(store)
        return ok({ category: newCat })
      }
    }

    const idMatch = /^\/([a-zA-Z0-9_-]+)/.exec(catPath)
    if (idMatch) {
      const id = idMatch[1]
      const idx = store.menuCategories.findIndex((c: any) => c.id === id)
      if (idx !== -1) {
        if (method === "PUT") {
          if (body.isActive !== undefined) {
            body.active = body.isActive
          }
          store.menuCategories[idx] = { ...store.menuCategories[idx], ...body }
          saveStore(store)
          return ok({
            category: {
              ...store.menuCategories[idx],
              isActive: store.menuCategories[idx].active,
            },
          })
        }
        if (method === "DELETE") {
          store.menuCategories.splice(idx, 1)
          saveStore(store)
          return success("Category deleted successfully.")
        }
      }
    }
  }

  // ─── Menu Items Routes ───
  if (path.startsWith("/api/v1/menu/items")) {
    const store = getStore()
    const itemPath = path.substring("/api/v1/menu/items".length)

    if (itemPath === "" || itemPath === "/") {
      if (method === "GET") {
        return ok({
          items: store.menuItems.map((i: any) => ({
            ...i,
            categoryName: i.category,
            categoryId:
              store.menuCategories.find((c: any) => c.name === i.category)
                ?.id || null,
            imageUrl: i.image || "",
          })),
        })
      }
      if (method === "POST") {
        const categoryName = body.categoryId
          ? store.menuCategories.find((c: any) => c.id === body.categoryId)
              ?.name || ""
          : ""
        const newItem = {
          id: `item-${Date.now()}`,
          name: body.name,
          price: body.price,
          category: categoryName,
          image: body.imageUrl || "",
          available: body.available !== false,
          variants: body.variants || [],
          addons: body.addons || [],
          ingredients: body.ingredients || [],
          station: body.station,
          createdAt: new Date().toISOString(),
        }
        store.menuItems.push(newItem)
        saveStore(store)
        return ok({
          item: { ...newItem, categoryName, imageUrl: newItem.image },
        })
      }
    }

    const idMatch = /^\/([a-zA-Z0-9_-]+)/.exec(itemPath)
    if (idMatch) {
      const id = idMatch[1]
      const idx = store.menuItems.findIndex((i: any) => i.id === id)
      if (idx !== -1) {
        if (method === "PUT") {
          const categoryName = body.categoryId
            ? store.menuCategories.find((c: any) => c.id === body.categoryId)
                ?.name || store.menuItems[idx].category
            : store.menuItems[idx].category
          store.menuItems[idx] = {
            ...store.menuItems[idx],
            ...body,
            category: categoryName,
            image:
              body.imageUrl !== undefined
                ? body.imageUrl
                : store.menuItems[idx].image,
          }
          saveStore(store)
          return ok({
            item: {
              ...store.menuItems[idx],
              categoryName,
              imageUrl: store.menuItems[idx].image,
            },
          })
        }
        if (method === "DELETE") {
          store.menuItems.splice(idx, 1)
          saveStore(store)
          return success("Item deleted successfully.")
        }
      }
    }
  }

  // ─── Tables Routes ───
  if (path.startsWith("/api/v1/tables")) {
    const store = getStore()
    const tablePath = path.substring("/api/v1/tables".length)

    if (tablePath === "" || tablePath === "/") {
      if (method === "GET") {
        return ok({ tables: store.tables })
      }
      if (method === "POST") {
        const newTable = {
          id: `tbl-${Date.now()}`,
          name: body.name,
          seats: body.seats || 4,
          zone: body.zone || "Main Hall",
          status: "available",
          occupiedAt: null,
          customerName: null,
          orderTotal: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        store.tables.push(newTable)
        saveStore(store)
        return ok({ table: newTable })
      }
    }

    const idMatch = /^\/([a-zA-Z0-9_-]+)/.exec(tablePath)
    if (idMatch) {
      const id = idMatch[1]
      const idx = store.tables.findIndex((t: any) => t.id === id)
      if (idx !== -1) {
        if (method === "PUT") {
          store.tables[idx] = {
            ...store.tables[idx],
            ...body,
            updatedAt: new Date().toISOString(),
          }
          saveStore(store)
          return ok({ table: store.tables[idx] })
        }
        if (method === "DELETE") {
          store.tables.splice(idx, 1)
          saveStore(store)
          return success("Table removed successfully.")
        }
      }
    }
  }

  // ─── Business Routes ───
  if (path.startsWith("/api/v1/business/profile")) {
    if (method === "GET") {
      const u = getUser()
      const store = getStore()
      return ok({
        business: {
          id: "business-1",
          businessName: u.businessName,
          ownerName: u.ownerName,
          email: u.email,
          phone: u.phone,
          state: store.businessConfig.state,
          city: store.businessConfig.city,
          address: store.businessConfig.address,
          businessType: store.businessConfig.type,
          currency: "NGN",
          logoUrl: store.logo,
          updatedAt: new Date().toISOString(),
        },
      })
    }
    if (method === "PUT") {
      const u = getUser()
      const store = getStore()
      if (body.businessName) u.businessName = body.businessName
      if (body.ownerName) u.ownerName = body.ownerName
      if (body.email) u.email = body.email
      if (body.phone) u.phone = body.phone
      if (body.address) store.businessConfig.address = body.address
      if (body.city) store.businessConfig.city = body.city
      if (body.state) store.businessConfig.state = body.state
      if (body.businessType) store.businessConfig.type = body.businessType
      saveUser(u)
      saveStore(store)
      return ok({
        business: {
          id: "business-1",
          businessName: u.businessName,
          ownerName: u.ownerName,
          email: u.email,
          phone: u.phone,
          state: store.businessConfig.state,
          city: store.businessConfig.city,
          address: store.businessConfig.address,
          businessType: store.businessConfig.type,
          currency: "NGN",
          logoUrl: store.logo,
          updatedAt: new Date().toISOString(),
        },
      })
    }
  }

  // ─── Inventory Routes ───
  if (path.startsWith("/api/v1/inventory")) {
    const store = getStore()
    const invPath = path.substring("/api/v1/inventory".length)

    if (invPath === "" || invPath === "/") {
      if (method === "GET") {
        return ok({
          ingredients: store.inventoryItems.map((item: any) => ({
            ...item,
            currentStock: item.qty,
            reorderLevel: item.minQty,
            unitCost: item.costPerUnit,
            lowStock: item.qty <= item.minQty,
            createdAt: new Date().toISOString(),
          })),
          pagination: {
            page: 1,
            limit: 100,
            total: store.inventoryItems.length,
            totalPages: 1,
          },
        })
      }
      if (method === "POST") {
        const newItem = {
          id: `ing-${Date.now()}`,
          name: body.name,
          unit: body.unit,
          qty: body.currentStock || 0,
          minQty: body.reorderLevel || 5,
          costPerUnit: body.unitCost || 0,
          supplier: body.supplier || "-",
          status:
            (body.currentStock || 0) <= (body.reorderLevel || 5)
              ? "Low Stock"
              : "Active",
        }
        store.inventoryItems.push(newItem)
        saveStore(store)
        return ok({
          ingredient: {
            ...newItem,
            currentStock: newItem.qty,
            reorderLevel: newItem.minQty,
            unitCost: newItem.costPerUnit,
            lowStock: newItem.qty <= newItem.minQty,
            createdAt: new Date().toISOString(),
          },
        })
      }
    }

    const idMatch = /^\/([a-zA-Z0-9_-]+)/.exec(invPath)
    if (idMatch) {
      const id = idMatch[1]
      const idx = store.inventoryItems.findIndex((item: any) => item.id === id)
      if (idx !== -1) {
        if (method === "PUT") {
          const updated = {
            ...store.inventoryItems[idx],
            name:
              body.name !== undefined
                ? body.name
                : store.inventoryItems[idx].name,
            unit:
              body.unit !== undefined
                ? body.unit
                : store.inventoryItems[idx].unit,
            qty:
              body.currentStock !== undefined
                ? body.currentStock
                : store.inventoryItems[idx].qty,
            minQty:
              body.reorderLevel !== undefined
                ? body.reorderLevel
                : store.inventoryItems[idx].minQty,
            costPerUnit:
              body.unitCost !== undefined
                ? body.unitCost
                : store.inventoryItems[idx].costPerUnit,
            supplier:
              body.supplier !== undefined
                ? body.supplier
                : store.inventoryItems[idx].supplier,
          }
          updated.status =
            updated.qty <= 0
              ? "Out of Stock"
              : updated.qty <= updated.minQty
                ? "Low Stock"
                : "Active"
          store.inventoryItems[idx] = updated
          saveStore(store)
          return ok({
            ingredient: {
              ...updated,
              currentStock: updated.qty,
              reorderLevel: updated.minQty,
              unitCost: updated.costPerUnit,
              lowStock: updated.qty <= updated.minQty,
              createdAt: new Date().toISOString(),
            },
          })
        }
        if (method === "DELETE") {
          store.inventoryItems.splice(idx, 1)
          saveStore(store)
          return success("Ingredient removed successfully.")
        }
      }
    }

    // Movement logs
    const logMatch = /^\/([a-zA-Z0-9_-]+)\/log/.exec(invPath)
    if (logMatch && method === "POST") {
      const id = logMatch[1]
      const idx = store.inventoryItems.findIndex((item: any) => item.id === id)
      if (idx !== -1) {
        const item = store.inventoryItems[idx]
        const prevStock = item.qty
        let newStock = prevStock

        if (body.type === "StockIn") newStock += body.quantity
        else if (
          body.type === "StockOut" ||
          body.type === "Adjustment" ||
          body.type === "Wastage"
        )
          newStock -= body.quantity

        item.qty = newStock
        item.status =
          newStock <= 0
            ? "Out of Stock"
            : newStock <= item.minQty
              ? "Low Stock"
              : "Active"

        const log = {
          id: `log-${Date.now()}-${id}`,
          date: new Date().toISOString().split("T")[0],
          time: new Date().toISOString().split("T")[1].split(".")[0],
          itemName: item.name,
          type: body.type === "StockIn" ? "Stock In" : "Stock Out",
          quantity: String(body.quantity),
          prevStock: String(prevStock),
          newStock: String(newStock),
          performedBy: "Staff",
          note: body.note || "",
        }
        store.inventoryLog.unshift(log)
        saveStore(store)
        return ok({
          ingredient: {
            ...item,
            currentStock: item.qty,
            reorderLevel: item.minQty,
            unitCost: item.costPerUnit,
            lowStock: item.qty <= item.minQty,
            createdAt: new Date().toISOString(),
          },
        })
      }
    }

    const logsMatch = /^\/([a-zA-Z0-9_-]+)\/logs/.exec(invPath)
    if (logsMatch && method === "GET") {
      const id = logsMatch[1]
      const item = store.inventoryItems.find((ii: any) => ii.id === id)
      const logs = store.inventoryLog
        .filter((log: any) => log.itemName === item?.name)
        .map((log: any) => ({
          id: log.id,
          type: log.type === "Stock In" ? "StockIn" : "StockOut",
          quantity: parseFloat(log.quantity),
          note: log.note,
          createdAt: new Date(log.date + "T" + log.time).toISOString(),
        }))
      return ok({ logs })
    }
  }

  // ─── Customers Routes ───
  if (path.startsWith("/api/v1/customers")) {
    const store = getStore()
    const custPath = path.substring("/api/v1/customers".length)

    if (custPath === "" || custPath === "/") {
      if (method === "GET") {
        return ok({
          customers: store.customers,
          pagination: {
            page: 1,
            limit: 100,
            total: store.customers.length,
            totalPages: 1,
          },
        })
      }
      if (method === "POST") {
        const newCust = {
          id: `cust-${Date.now()}`,
          name: `${body.firstName} ${body.lastName}`,
          firstName: body.firstName,
          lastName: body.lastName,
          phone: body.phone,
          email: body.email || "",
          totalSpent: 0,
          visitCount: 0,
          lastVisit: "—",
          joinDate: new Date().toISOString().split("T")[0],
          loyaltyPoints: 0,
          createdAt: new Date().toISOString(),
        }
        store.customers.push(newCust)
        saveStore(store)
        return ok({ customer: newCust })
      }
    }

    const idMatch = /^\/([a-zA-Z0-9_-]+)/.exec(custPath)
    if (idMatch) {
      const id = idMatch[1]
      const idx = store.customers.findIndex((c: any) => c.id === id)
      if (idx !== -1) {
        if (method === "PUT") {
          const updated = {
            ...store.customers[idx],
            ...body,
            name:
              body.firstName || body.lastName
                ? `${body.firstName || store.customers[idx].firstName || ""} ${body.lastName || store.customers[idx].lastName || ""}`
                : store.customers[idx].name,
          }
          store.customers[idx] = updated
          saveStore(store)
          return ok({ customer: updated })
        }
        if (method === "DELETE") {
          store.customers.splice(idx, 1)
          saveStore(store)
          return success("Customer removed successfully.")
        }
      }
    }
  }

  // ─── Expenses Routes ───
  if (path.startsWith("/api/v1/expenses")) {
    const store = getStore()
    const expPath = path.substring("/api/v1/expenses".length)

    if (expPath === "" || expPath === "/") {
      if (method === "GET") {
        return ok({
          expenses: store.expenses,
          pagination: {
            page: 1,
            limit: 100,
            total: store.expenses.length,
            totalPages: 1,
          },
        })
      }
      if (method === "POST") {
        const newExp = {
          id: `exp-${Date.now()}`,
          date: body.expenseDate,
          expenseDate: body.expenseDate,
          description: body.description,
          category: body.category,
          amount: body.amount,
          paidBy: "Owner",
          status: "Approved",
          notes: "",
          createdAt: new Date().toISOString(),
        }
        store.expenses.unshift(newExp)
        saveStore(store)
        return ok({ expense: newExp })
      }
    }

    const idMatch = /^\/([a-zA-Z0-9_-]+)/.exec(expPath)
    if (idMatch) {
      const id = idMatch[1]
      const idx = store.expenses.findIndex((e: any) => e.id === id)
      if (idx !== -1) {
        if (method === "PUT") {
          store.expenses[idx] = { ...store.expenses[idx], ...body }
          saveStore(store)
          return ok({ expense: store.expenses[idx] })
        }
        if (method === "DELETE") {
          store.expenses.splice(idx, 1)
          saveStore(store)
          return success("Expense deleted successfully.")
        }
      }
    }
  }

  // ─── Orders Routes ───
  if (path.startsWith("/api/v1/orders")) {
    const store = getStore()
    const transactions = getTransactions()
    const orderPath = path.substring("/api/v1/orders".length)

    if (orderPath === "" || orderPath === "/") {
      if (method === "GET") {
        const mappedOrders = transactions.map((t: any) => ({
          id: t.id,
          status:
            t.status === "completed"
              ? "Served"
              : t.status === "voided"
                ? "Cancelled"
                : "Pending",
          paymentStatus: t.status === "completed" ? "Completed" : "Unpaid",
          subtotal: t.subtotal,
          tax: t.vat,
          total: t.total,
          notes: t.notes || "",
          items: t.items.map((i: any) => ({
            id: i.id,
            menuItemId: i.id,
            menuItemName: i.name,
            quantity: i.qty,
            unitPrice: i.price,
            specialInstructions: "",
          })),
          createdAt: new Date(t.timestamp).toISOString(),
        }))
        return ok({
          orders: mappedOrders,
          pagination: {
            page: 1,
            limit: 100,
            total: mappedOrders.length,
            totalPages: 1,
          },
        })
      }

      if (method === "POST") {
        // Create order
        const orderId = `TBX-${Date.now()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`
        const itemsList = body.items.map((i: any) => {
          const menuItem = store.menuItems.find(
            (m: any) => m.id === i.menuItemId
          )
          return {
            id: i.menuItemId,
            name: menuItem?.name || "Unknown Item",
            price: i.unitPrice,
            qty: i.quantity,
          }
        })

        const subtotal = itemsList.reduce(
          (acc: number, cur: any) => acc + cur.price * cur.qty,
          0
        )
        const taxRate = store.taxConfig.enabled ? store.taxConfig.rate : 0
        const tax = subtotal * (taxRate / 100)
        const serviceCharge = store.taxConfig.serviceCharge
          ? subtotal * (store.taxConfig.serviceRate / 100)
          : 0
        const total = subtotal + tax + serviceCharge

        const customerObj = body.customerId
          ? store.customers.find((c: any) => c.id === body.customerId)
          : null

        const newOrder: any = {
          id: orderId,
          timestamp: Date.now(),
          items: itemsList,
          customer: {
            id: customerObj?.id || "walk-in",
            name: customerObj?.name || "Walk-in Customer",
            email: customerObj?.email || "",
            phone: customerObj?.phone || "",
          },
          subtotal,
          vat: tax,
          serviceCharge,
          taxLabel: store.taxConfig.name,
          taxRate: taxRate,
          taxInclusive: store.taxConfig.inclusive,
          total,
          paymentMethod: "Cash",
          status: "pending",
        }

        transactions.unshift(newOrder)
        saveTransactions(transactions)

        // Add to KDS orders if KDS enabled
        if (store.posConfig.kotEnabled || true) {
          const kdsOrder = {
            id: `kds-${Date.now()}`,
            orderNo: orderId.substring(orderId.length - 4),
            tableNo: body.tableId
              ? store.tables.find((t: any) => t.id === body.tableId)?.name ||
                "—"
              : "—",
            customer: customerObj?.name || "Walk-in",
            status: "New",
            priority: "Normal",
            items: itemsList.map((i: any) => ({
              id: i.id,
              name: i.name,
              qty: i.qty,
              notes: "",
              done: false,
            })),
            placedAt: new Date().toISOString(),
            startedAt: null,
            readyAt: null,
            station: "Hot Kitchen",
          }
          store.kdsOrders.unshift(kdsOrder)
          saveStore(store)
        }

        return ok({
          order: {
            id: orderId,
            status: "Pending",
            paymentStatus: "Unpaid",
            subtotal,
            tax,
            total,
            notes: body.notes || "",
            items: body.items,
            createdAt: new Date().toISOString(),
          },
        })
      }
    }

    const idMatch = /^\/([a-zA-Z0-9_-]+)/.exec(orderPath)
    if (idMatch) {
      const id = idMatch[1]
      const tx = transactions.find((t: any) => t.id === id)

      if (tx) {
        if (method === "GET") {
          return ok({
            order: {
              id: tx.id,
              status:
                tx.status === "completed"
                  ? "Served"
                  : tx.status === "voided"
                    ? "Cancelled"
                    : "Pending",
              paymentStatus: tx.status === "completed" ? "Completed" : "Unpaid",
              subtotal: tx.subtotal,
              tax: tx.vat,
              total: tx.total,
              notes: "",
              items: tx.items.map((i: any) => ({
                id: i.id,
                menuItemId: i.id,
                menuItemName: i.name,
                quantity: i.qty,
                unitPrice: i.price,
                specialInstructions: "",
              })),
              createdAt: new Date(tx.timestamp).toISOString(),
            },
          })
        }
      }

      // Update status
      const statusMatch = /^\/([a-zA-Z0-9_-]+)\/status/.exec(orderPath)
      if (statusMatch && method === "PUT") {
        const orderId = statusMatch[1]
        const txIndex = transactions.findIndex((t: any) => t.id === orderId)
        if (txIndex !== -1) {
          transactions[txIndex].status =
            body.status === "Served"
              ? "completed"
              : body.status === "Cancelled"
                ? "voided"
                : "pending"
          saveTransactions(transactions)
          return ok({
            order: {
              ...transactions[txIndex],
              status: body.status,
              paymentStatus:
                transactions[txIndex].status === "completed"
                  ? "Completed"
                  : "Unpaid",
              items: [],
              createdAt: new Date().toISOString(),
            },
          })
        }
      }

      // Record payment
      const payMatch = /^\/([a-zA-Z0-9_-]+)\/payment/.exec(orderPath)
      if (payMatch && method === "POST") {
        const orderId = payMatch[1]
        const txIndex = transactions.findIndex((t: any) => t.id === orderId)
        if (txIndex !== -1) {
          transactions[txIndex].status = "completed"
          transactions[txIndex].paymentMethod = body.method
          saveTransactions(transactions)

          // Update loyalty points if customer is linked
          const customerId = transactions[txIndex].customer.id
          if (customerId && customerId !== "walk-in") {
            const custIdx = store.customers.findIndex(
              (c: any) => c.id === customerId
            )
            if (custIdx !== -1) {
              const pointsEarned = Math.floor(
                transactions[txIndex].total *
                  (store.loyaltyConfig.rewardValue / 100)
              )
              store.customers[custIdx].loyaltyPoints += pointsEarned
              store.customers[custIdx].totalSpent += transactions[txIndex].total
              store.customers[custIdx].visitCount += 1
              store.customers[custIdx].lastVisit = new Date()
                .toISOString()
                .split("T")[0]
              saveStore(store)
            }
          }

          return ok({
            order: {
              id: orderId,
              status: "Served",
              paymentStatus: "Completed",
              subtotal: transactions[txIndex].subtotal,
              tax: transactions[txIndex].vat,
              total: transactions[txIndex].total,
              notes: "",
              items: [],
              createdAt: new Date().toISOString(),
            },
          })
        }
      }
    }
  }

  // ─── Transactions Routes ───
  if (path.startsWith("/api/v1/transactions")) {
    if (method === "GET") {
      const transactions = getTransactions()
      const mapped = transactions.map((t: any) => ({
        id: t.id,
        status:
          t.status === "completed"
            ? "Served"
            : t.status === "voided"
              ? "Cancelled"
              : "Pending",
        paymentStatus: t.status === "completed" ? "Completed" : "Unpaid",
        subtotal: t.subtotal,
        tax: t.vat,
        total: t.total,
        paymentMethod: t.paymentMethod || "Cash",
        notes: t.notes || "",
        items: t.items.map((i: any) => ({
          id: i.id,
          menuItemId: i.id,
          menuItemName: i.name,
          quantity: i.qty,
          unitPrice: i.price,
        })),
        createdAt: new Date(t.timestamp).toISOString(),
      }))
      return ok({
        transactions: mapped,
        pagination: {
          page: 1,
          limit: 100,
          total: mapped.length,
          totalPages: 1,
        },
      })
    }
  }

  // ─── Settings Routes ───
  if (path.startsWith("/api/v1/settings")) {
    const store = getStore()
    if (method === "GET") {
      return ok({
        settings: {
          taxEnabled: store.taxConfig.enabled,
          taxName: store.taxConfig.name,
          taxRate: store.taxConfig.rate,
          taxInclusive: store.taxConfig.inclusive,
          taxOnReceipt: store.taxConfig.showOnReceipt,
          serviceCharge: store.taxConfig.serviceCharge,
          serviceRate: store.taxConfig.serviceRate,
          loyaltyEnabled: store.loyaltyConfig.enabled,
          loyaltyRewardType: store.loyaltyConfig.rewardType,
          loyaltyRewardValue: store.loyaltyConfig.rewardValue,
          loyaltyThreshold: store.loyaltyConfig.threshold,
          loyaltyMinRedeem: store.loyaltyConfig.minPointsToRedeem,
          loyaltyShowOnReceipt: store.loyaltyConfig.showBalanceOnReceipt,
          loyaltyAutoEnroll: store.loyaltyConfig.autoEnroll,
          receiptHeader: store.posConfig.receiptHeader,
          receiptFooter: store.posConfig.receiptFooter,
          printerType: store.posConfig.printerType,
          paperWidth: store.posConfig.paperWidth,
          autoPrint: store.posConfig.autoPrint,
          showQR: store.posConfig.showQR,
          showLogo: store.posConfig.showLogo,
          tipsEnabled: store.posConfig.tipsEnabled,
          cashRounding: store.posConfig.cashRounding,
          requireCustomer: store.posConfig.requireCustomer,
          kotEnabled: store.posConfig.kotEnabled || false,
          tablesEnabled: store.posConfig.tablesEnabled || false,
        },
      })
    }
    if (method === "PUT") {
      if (body.taxEnabled !== undefined)
        store.taxConfig.enabled = body.taxEnabled
      if (body.taxName !== undefined) store.taxConfig.name = body.taxName
      if (body.taxRate !== undefined) store.taxConfig.rate = body.taxRate
      if (body.taxInclusive !== undefined)
        store.taxConfig.inclusive = body.taxInclusive
      if (body.taxOnReceipt !== undefined)
        store.taxConfig.showOnReceipt = body.taxOnReceipt
      if (body.serviceCharge !== undefined)
        store.taxConfig.serviceCharge = body.serviceCharge
      if (body.serviceRate !== undefined)
        store.taxConfig.serviceRate = body.serviceRate
      if (body.loyaltyEnabled !== undefined)
        store.loyaltyConfig.enabled = body.loyaltyEnabled
      if (body.loyaltyRewardType !== undefined)
        store.loyaltyConfig.rewardType = body.loyaltyRewardType
      if (body.loyaltyRewardValue !== undefined)
        store.loyaltyConfig.rewardValue = body.loyaltyRewardValue
      if (body.loyaltyThreshold !== undefined)
        store.loyaltyConfig.threshold = body.loyaltyThreshold
      if (body.loyaltyMinRedeem !== undefined)
        store.loyaltyConfig.minPointsToRedeem = body.loyaltyMinRedeem
      if (body.loyaltyShowOnReceipt !== undefined)
        store.loyaltyConfig.showBalanceOnReceipt = body.loyaltyShowOnReceipt
      if (body.loyaltyAutoEnroll !== undefined)
        store.loyaltyConfig.autoEnroll = body.loyaltyAutoEnroll
      if (body.receiptHeader !== undefined)
        store.posConfig.receiptHeader = body.receiptHeader
      if (body.receiptFooter !== undefined)
        store.posConfig.receiptFooter = body.receiptFooter
      if (body.printerType !== undefined)
        store.posConfig.printerType = body.printerType
      if (body.paperWidth !== undefined)
        store.posConfig.paperWidth = body.paperWidth
      if (body.autoPrint !== undefined)
        store.posConfig.autoPrint = body.autoPrint
      if (body.showQR !== undefined) store.posConfig.showQR = body.showQR
      if (body.showLogo !== undefined) store.posConfig.showLogo = body.showLogo
      if (body.tipsEnabled !== undefined)
        store.posConfig.tipsEnabled = body.tipsEnabled
      if (body.cashRounding !== undefined)
        store.posConfig.cashRounding = body.cashRounding
      if (body.requireCustomer !== undefined)
        store.posConfig.requireCustomer = body.requireCustomer
      if (body.kotEnabled !== undefined) {
        store.posConfig.kotEnabled = body.kotEnabled
        localStorage.setItem("tablix_kot_enabled", String(body.kotEnabled))
      }
      if (body.tablesEnabled !== undefined) {
        store.posConfig.tablesEnabled = body.tablesEnabled
        localStorage.setItem(
          "tablix_tables_enabled",
          String(body.tablesEnabled)
        )
      }
      saveStore(store)
      return ok({ settings: body })
    }
  }

  // ─── Suppliers Routes ───
  if (path.startsWith("/api/v1/suppliers")) {
    const store = getStore()
    const supPath = path.substring("/api/v1/suppliers".length)

    if (supPath === "" || supPath === "/") {
      if (method === "GET") {
        return ok({ suppliers: store.suppliers })
      }
      if (method === "POST") {
        const newSup = {
          id: `sup-${Date.now()}`,
          name: body.name,
          contactPerson: body.contactPerson || "",
          phone: body.phone || "",
          email: body.email || "",
          address: body.address || "",
          itemsSupplied: body.itemsSupplied || "",
          status: body.status || "Active",
          totalOrders: 0,
          createdAt: new Date().toISOString(),
        }
        store.suppliers.push(newSup)
        saveStore(store)
        return ok({ supplier: newSup })
      }
    }

    const idMatch = /^\/([a-zA-Z0-9_-]+)/.exec(supPath)
    if (idMatch) {
      const id = idMatch[1]
      const idx = store.suppliers.findIndex((s: any) => s.id === id)
      if (idx !== -1) {
        if (method === "PUT") {
          store.suppliers[idx] = { ...store.suppliers[idx], ...body }
          saveStore(store)
          return ok({ supplier: store.suppliers[idx] })
        }
        if (method === "DELETE") {
          store.suppliers.splice(idx, 1)
          saveStore(store)
          return success("Supplier removed successfully.")
        }
      }
    }
  }

  // ─── Subscriptions Routes ───
  if (path.startsWith("/api/v1/subscriptions")) {
    const subPath = path.substring("/api/v1/subscriptions".length)

    if (subPath.startsWith("/status") && method === "GET") {
      const plan = localStorage.getItem("tablix_plan") || "trial"
      return ok({ plan })
    }

    if (subPath.startsWith("/verify") && method === "POST") {
      localStorage.setItem("tablix_plan", "pro")
      return ok({
        plan: "pro",
        expiresAt: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
      })
    }

    if (subPath.startsWith("/cancel") && method === "POST") {
      localStorage.setItem("tablix_plan", "trial")
      return success("Subscription cancelled successfully.")
    }
  }

  // ─── Activity Log Routes ───
  if (path.startsWith("/api/v1/activity")) {
    const actLogs = localStorage.getItem(ACTIVITY_KEY)
    const logs = actLogs ? JSON.parse(actLogs) : []

    if (method === "GET") {
      return ok({ entries: logs })
    }

    if (method === "POST") {
      const newEntry = {
        id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        ...body,
        createdAt: new Date().toISOString(),
        timestamp: new Date().toISOString(),
      }
      logs.unshift(newEntry)
      localStorage.setItem(ACTIVITY_KEY, JSON.stringify(logs.slice(0, 200)))
      return ok({ entry: newEntry })
    }
  }

  // ─── Public Menu Route ───
  const publicMenuMatch = /^\/api\/v1\/menu\/public\/([a-zA-Z0-9_-]+)/.exec(
    path
  )
  if (publicMenuMatch && method === "GET") {
    const store = getStore()
    const u = getUser()
    return ok({
      business: { name: u.businessName },
      categories: store.menuCategories,
      items: store.menuItems.map((i: any) => ({
        ...i,
        categoryName: i.category,
        categoryId:
          store.menuCategories.find((c: any) => c.name === i.category)?.id ||
          null,
        imageUrl: i.image || "",
      })),
    })
  }

  // ─── Inventory Routes ───
  if (path.startsWith("/api/v1/inventory")) {
    const store = getStore()
    const invPath = path.substring("/api/v1/inventory".length)

    if (invPath === "" || invPath === "/") {
      if (method === "GET") return ok({ items: store.inventoryItems })
      if (method === "POST") {
        const newItem = { id: `inv_${Date.now()}`, ...body }
        store.inventoryItems.push(newItem)
        saveStore(store)
        return ok({ item: newItem })
      }
    }

    const idMatch = /^\/([a-zA-Z0-9_-]+)/.exec(invPath)
    if (idMatch) {
      const id = idMatch[1]
      const idx = store.inventoryItems.findIndex((i: any) => i.id === id)
      if (idx !== -1) {
        if (method === "PUT") {
          store.inventoryItems[idx] = { ...store.inventoryItems[idx], ...body }
          saveStore(store)
          return ok({ item: store.inventoryItems[idx] })
        }
        if (method === "DELETE") {
          store.inventoryItems.splice(idx, 1)
          saveStore(store)
          return success("Item removed.")
        }
      }
    }
  }

  // ─── Inventory Logs Routes ───
  if (path.startsWith("/api/v1/inventory-logs")) {
    const store = getStore()
    if (method === "GET") return ok({ logs: store.inventoryLog })
    if (method === "POST") {
      const newLog = {
        id: `log_${Date.now()}`,
        timestamp: new Date().toISOString(),
        ...body,
      }
      store.inventoryLog.unshift(newLog)
      saveStore(store)
      return ok({ log: newLog })
    }
  }

  // ─── Customers Routes ───
  if (path.startsWith("/api/v1/customers")) {
    const store = getStore()
    const cPath = path.substring("/api/v1/customers".length)

    if (cPath === "" || cPath === "/") {
      if (method === "GET") return ok({ customers: store.customers })
      if (method === "POST") {
        const newCus = {
          id: `cus_${Date.now()}`,
          createdAt: new Date().toISOString(),
          points: 0,
          totalSpent: 0,
          visits: 0,
          lastVisit: null,
          ...body,
        }
        store.customers.push(newCus)
        saveStore(store)
        return ok({ customer: newCus })
      }
    }

    const idMatch = /^\/([a-zA-Z0-9_-]+)/.exec(cPath)
    if (idMatch) {
      const id = idMatch[1]
      const idx = store.customers.findIndex((c: any) => c.id === id)
      if (idx !== -1) {
        if (method === "PUT") {
          store.customers[idx] = { ...store.customers[idx], ...body }
          saveStore(store)
          return ok({ customer: store.customers[idx] })
        }
        if (method === "DELETE") {
          store.customers.splice(idx, 1)
          saveStore(store)
          return success("Customer removed.")
        }
      }
    }
  }

  // ─── Expenses Routes ───
  if (path.startsWith("/api/v1/expenses")) {
    const store = getStore()
    const ePath = path.substring("/api/v1/expenses".length)

    if (ePath === "" || ePath === "/") {
      if (method === "GET") return ok({ expenses: store.expenses })
      if (method === "POST") {
        const newExp = {
          id: `exp_${Date.now()}`,
          createdAt: new Date().toISOString(),
          ...body,
        }
        store.expenses.push(newExp)
        saveStore(store)
        return ok({ expense: newExp })
      }
    }

    const idMatch = /^\/([a-zA-Z0-9_-]+)/.exec(ePath)
    if (idMatch) {
      const id = idMatch[1]
      const idx = store.expenses.findIndex((e: any) => e.id === id)
      if (idx !== -1) {
        if (method === "PUT") {
          store.expenses[idx] = { ...store.expenses[idx], ...body }
          saveStore(store)
          return ok({ expense: store.expenses[idx] })
        }
        if (method === "DELETE") {
          store.expenses.splice(idx, 1)
          saveStore(store)
          return success("Expense removed.")
        }
      }
    }
  }

  // Fallback
  return error(`Mock route not found: [${method}] ${path}`, 404)
}
