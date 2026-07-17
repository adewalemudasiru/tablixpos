/**
 * Local Storage Service
 * Handles persistence for Tablix POS
 */

export interface Transaction {
  id: string;
  timestamp: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    qty: number;
    selectedVariantId?: string;
    selectedAddons?: { id: string; name?: string; qty: number; price?: number }[];
  }>;
  customer: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
  };
  subtotal: number;
  discount?: { type: "percent" | "flat"; value: number; amount: number };
  vat: number;
  serviceCharge?: number;   // optional service charge amount
  taxLabel?: string;        // e.g. "VAT", "Sales Tax" -- snapshot at time of sale
  taxRate?: number;         // percent, e.g. 7.5
  taxInclusive?: boolean;   // whether tax was inclusive
  total: number;
  paymentMethod: string;
  changeAmount?: number;
  tableNo?: string;
  cashier?: string;
  status?: "completed" | "voided" | "refunded"; // default = completed
  voidedAt?: number;        // timestamp of void/refund action
  voidedBy?: string;        // staff name who authorised void
}

const STORAGE_KEYS = {
  CART: 'tablix_cart',
  TRANSACTIONS: 'tablix_transactions',
  INVENTORY: 'tablix_inventory',
} as const;

import {
  idbSaveCart,
  idbLoadCart,
  idbClearCart,
  idbSaveTransaction,
  idbLoadTransactions,
  idbDeleteTransaction
} from './idb';

// --- Cart Persistence ---

export async function saveCart(cart: any[]): Promise<void> {
  await idbSaveCart(cart);
}

export async function loadCart(): Promise<any[]> {
  return await idbLoadCart();
}

export async function clearCart(): Promise<void> {
  await idbClearCart();
}

// --- Transaction History ---

export async function saveTransaction(transaction: Transaction): Promise<void> {
  await idbSaveTransaction(transaction);
}

export async function loadTransactions(): Promise<Transaction[]> {
  return await idbLoadTransactions();
}

export async function clearTransactions(): Promise<void> {
  // In IDB we would need a clearAll but let's just clear localStorage for fallback
  localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
  // Ideally we would clear the IDB object store here.
}

export async function getTransactionById(id: string): Promise<Transaction | null> {
  const transactions = await loadTransactions();
  return transactions.find(t => t.id === id) || null;
}

// --- Transaction Utilities ---

export function generateTransactionId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9).toUpperCase();
  return `TBX-${timestamp}-${random}`;
}

export function exportTransactionsToCSV(transactions: Transaction[]): string {
  if (transactions.length === 0) {
    return '';
  }

  const headers = [
    'Transaction ID',
    'Date',
    'Time',
    'Customer',
    'Items',
    'Subtotal',
    'Discount',
    'Tax',
    'Service Charge',
    'Total',
    'Payment Method',
    'Table No',
    'Cashier',
    'Status'
  ];

  const rows = transactions.map(t => {
    const date = new Date(t.timestamp);
    const dateStr = date.toLocaleDateString('en-GB');
    const timeStr = date.toLocaleTimeString('en-GB');
    const itemsSummary = t.items.map(item => `${item.name} (x${item.qty})`).join('; ');
    const taxLabel = t.taxLabel ?? 'VAT';
    const taxRate  = t.taxRate  != null ? t.taxRate : 7.5;

    return [
      t.id,
      dateStr,
      timeStr,
      t.customer.name,
      itemsSummary,
      `\u20a6${t.subtotal.toLocaleString()}`,
      t.discount ? `-\u20a6${t.discount.amount.toLocaleString()}` : '',
      `${taxLabel} \u20a6${t.vat.toLocaleString()} (${taxRate}%)`,
      t.serviceCharge ? `\u20a6${t.serviceCharge.toLocaleString()}` : '',
      `\u20a6${t.total.toLocaleString()}`,
      t.paymentMethod,
      t.tableNo ?? '',
      t.cashier ?? '',
      t.status ?? 'completed'
    ];
  });

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  return csvContent;
}

export function downloadCSV(csv: string, filename: string = 'tablix-transactions.csv'): void {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// --- Inventory Persistence ---

export function saveInventory(inventory: any[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventory));
  } catch (error) {
    console.error('Failed to save inventory:', error);
  }
}

export function loadInventory(): any[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.INVENTORY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load inventory:', error);
    return [];
  }
}
// ── Mock Transaction Seeder ────────────────────────────────────────────────────

const MOCK_TX_SEED_KEY = "tablix_mock_tx_seeded_v6";

export async function seedMockTransactions(): Promise<void> {
  try {
    if (localStorage.getItem(MOCK_TX_SEED_KEY)) return;
    const existing = await loadTransactions();
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    const mockTx: Transaction[] = [
      // Today (spanning morning to evening)
      { id: "tx-001", timestamp: now - 10*60*1000, items: [{ id:"menu-1",name:"Classic Cheeseburger",price:5500,qty:2 },{ id:"menu-4",name:"Coca Cola (Can)",price:1000,qty:2 }], customer:{id:"cust-1",name:"Alice Johnson",phone:"08011112222"}, subtotal:13000,vat:975,total:13975,paymentMethod:"cash",tableNo:"2",cashier:"John Cashier",status:"completed",taxLabel:"VAT",taxRate:7.5 },
      { id: "tx-002", timestamp: now - 45*60*1000, items: [{ id:"menu-3",name:"Margarita Pizza",price:8500,qty:1 },{ id:"menu-2",name:"Chicken Wings (6pcs)",price:4000,qty:1 }], customer:{id:"cust-2",name:"Bob Williams",phone:"08033334444"}, subtotal:12500,vat:937,total:13437,paymentMethod:"card",tableNo:"5",cashier:"Admin",status:"completed",taxLabel:"VAT",taxRate:7.5 },
      { id: "tx-003", timestamp: now - 2*60*60*1000, items: [{ id:"menu-1b",name:"BBQ Bacon Burger",price:6500,qty:1 },{ id:"menu-6",name:"French Fries",price:2000,qty:2 }], customer:{id:"walkin",name:"Walk-in"}, subtotal:10500,vat:788,total:11288,paymentMethod:"transfer",cashier:"Jane Waiter",status:"completed",taxLabel:"VAT",taxRate:7.5 },
      { id: "tx-004", timestamp: now - 4*60*60*1000, items: [{ id:"menu-5",name:"Spaghetti Bolognese",price:7500,qty:2 },{ id:"menu-4b",name:"Fresh Orange Juice",price:2000,qty:2 }], customer:{id:"cust-3",name:"Charlie Brown"}, subtotal:19000,vat:1425,total:20425,paymentMethod:"card",tableNo:"3",cashier:"John Cashier",status:"completed",taxLabel:"VAT",taxRate:7.5 },
      { id: "tx-005", timestamp: now - 6*60*60*1000, items: [{ id:"menu-3b",name:"Pepperoni Pizza",price:9500,qty:1 },{ id:"menu-7",name:"Chocolate Lava Cake",price:3500,qty:2 }], customer:{id:"cust-4",name:"Diana Prince"}, subtotal:16500,vat:1238,total:17738,paymentMethod:"transfer",tableNo:"VIP",cashier:"Admin",status:"completed",taxLabel:"VAT",taxRate:7.5 },
      { id: "tx-006", timestamp: now - 8*60*60*1000, items: [{ id:"menu-2b",name:"Mozzarella Sticks",price:3500,qty:3 },{ id:"menu-4",name:"Coca Cola (Can)",price:1000,qty:3 }], customer:{id:"walkin",name:"Walk-in"}, subtotal:13500,vat:1013,total:14513,paymentMethod:"cash",cashier:"John Cashier",status:"completed",taxLabel:"VAT",taxRate:7.5 },
      
      // Yesterday (spanning various hours)
      { id: "tx-007", timestamp: now - day - 1*60*60*1000, items: [{ id:"menu-1",name:"Classic Cheeseburger",price:5500,qty:1 },{ id:"menu-6",name:"French Fries",price:2000,qty:1 }], customer:{id:"cust-1",name:"Alice Johnson"}, subtotal:7500,vat:563,total:8063,paymentMethod:"cash",tableNo:"1",cashier:"Admin",status:"completed",taxLabel:"VAT",taxRate:7.5 },
      { id: "tx-008", timestamp: now - day - 3*60*60*1000, items: [{ id:"menu-3",name:"Margarita Pizza",price:8500,qty:2 }], customer:{id:"cust-5",name:"Evan Wright"}, subtotal:17000,vat:1275,total:18275,paymentMethod:"card",tableNo:"4",cashier:"John Cashier",status:"completed",taxLabel:"VAT",taxRate:7.5 },
      { id: "tx-009", timestamp: now - day - 6*60*60*1000, items: [{ id:"menu-2",name:"Chicken Wings (6pcs)",price:4000,qty:2 },{ id:"menu-4b",name:"Fresh Orange Juice",price:2000,qty:2 }], customer:{id:"walkin",name:"Walk-in"}, subtotal:12000,vat:900,total:12900,paymentMethod:"transfer",cashier:"Jane Waiter",status:"completed",taxLabel:"VAT",taxRate:7.5 },
      { id: "tx-010", timestamp: now - day - 10*60*60*1000, items: [{ id:"menu-1b",name:"BBQ Bacon Burger",price:6500,qty:3 }], customer:{id:"cust-4",name:"Diana Prince"}, subtotal:19500,vat:1463,total:20963,paymentMethod:"card",tableNo:"VIP",cashier:"Admin",status:"completed",taxLabel:"VAT",taxRate:7.5 },
      
      // 2 Days ago
      { id: "tx-011", timestamp: now - 2*day - 2*60*60*1000, items: [{ id:"menu-5",name:"Spaghetti Bolognese",price:7500,qty:1 },{ id:"menu-7",name:"Chocolate Lava Cake",price:3500,qty:1 }], customer:{id:"cust-2",name:"Bob Williams"}, subtotal:11000,vat:825,total:11825,paymentMethod:"cash",tableNo:"2",cashier:"Jane Waiter",status:"completed",taxLabel:"VAT",taxRate:7.5 },
      { id: "tx-012", timestamp: now - 2*day - 5*60*60*1000, items: [{ id:"menu-2",name:"Chicken Wings (6pcs)",price:4000,qty:3 }], customer:{id:"walkin",name:"Walk-in"}, subtotal:12000,vat:900,total:12900,paymentMethod:"transfer",cashier:"John Cashier",status:"voided",voidedAt:now-2*day-4.5*60*60*1000,voidedBy:"Admin",taxLabel:"VAT",taxRate:7.5 },
      { id: "tx-013", timestamp: now - 2*day - 8*60*60*1000, items: [{ id:"menu-3b",name:"Pepperoni Pizza",price:9500,qty:2 },{ id:"menu-4",name:"Coca Cola (Can)",price:1000,qty:4 }], customer:{id:"cust-3",name:"Charlie Brown"}, subtotal:23000,vat:1725,total:24725,paymentMethod:"card",tableNo:"6",cashier:"Admin",status:"completed",taxLabel:"VAT",taxRate:7.5 },
      
      // 3 Days ago
      { id: "tx-014", timestamp: now - 3*day - 4*60*60*1000, items: [{ id:"menu-1",name:"Classic Cheeseburger",price:5500,qty:4 },{ id:"menu-2",name:"Chicken Wings (6pcs)",price:4000,qty:2 },{ id:"menu-4",name:"Coca Cola (Can)",price:1000,qty:5 }], customer:{id:"cust-1",name:"Alice Johnson"}, subtotal:35000,vat:2625,total:37625,paymentMethod:"card",tableNo:"VIP",cashier:"Admin",status:"completed",taxLabel:"VAT",taxRate:7.5 },
      { id: "tx-015", timestamp: now - 3*day - 7*60*60*1000, items: [{ id:"menu-3",name:"Margarita Pizza",price:8500,qty:1 },{ id:"menu-6",name:"French Fries",price:2000,qty:2 }], customer:{id:"walkin",name:"Walk-in"}, subtotal:12500,vat:938,total:13438,paymentMethod:"cash",tableNo:"3",cashier:"Jane Waiter",status:"completed",taxLabel:"VAT",taxRate:7.5 }
    ].sort((a,b) => b.timestamp - a.timestamp);
    
    // Save sequentially to IDB (idbSaveTransaction mirrors to localStorage)
    for (const tx of mockTx) {
      await saveTransaction(tx);
    }
    
    localStorage.setItem(MOCK_TX_SEED_KEY, "1");
  } catch (_) {}
}
