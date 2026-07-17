// Paystack InlineJS v2 integration via npm package (@paystack/inline-js)
// Public key is read from VITE_PAYSTACK_PUBLIC_KEY environment variable.
// Set it in frontend/.env — use your test key for dev, live key for production.



export function getPaystackPublicKey(): string {
  const key = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string | undefined;
  if (!key) throw new Error("VITE_PAYSTACK_PUBLIC_KEY is not set. Add it to frontend/.env");
  return key;
}

// Amount is always in the smallest currency unit (kobo for NGN)
export function toKobo(naira: number): number {
  return Math.round(naira * 100);
}

export function generateRef(): string {
  return "TBX-" + Date.now() + "-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

// ── Types ────────────────────────────────────────────────────────────────────

export interface PaystackTransaction {
  reference: string;
  trans: string;
  status: string;
  message: string;
  transaction: string;
  trxref: string;
}

export interface OpenPaystackOptions {
  email: string;
  amount: number;       // in kobo
  ref?: string;
  currency?: string;
  metadata?: {
    custom_fields?: Array<{ display_name: string; variable_name: string; value: string }>;
    [key: string]: unknown;
  };
  onSuccess?: (transaction: PaystackTransaction) => void;
  onCancel?: () => void;
  onError?: (error: { message: string }) => void;
}

// ── No-op: kept for backward compat, npm package needs no script loading ─────

export function loadPaystackScript(): Promise<void> {
  return Promise.resolve();
}

export function openPaystackPopup(options: OpenPaystackOptions): void {
  // Disconnected Paystack for zero-backend setup.
  // Immediately simulate a successful transaction.
  setTimeout(() => {
    if (options.onSuccess) {
      options.onSuccess({
        reference: options.ref || generateRef(),
        trans: "simulated_trans",
        status: "success",
        message: "Payment simulated successfully",
        transaction: "sim_txn",
        trxref: options.ref || generateRef(),
      });
    }
  }, 1000);
}

// ── Payment record type (persisted to localStorage) ──────────────────────────

export interface PaymentRecord {
  invoiceNo: string;
  reference: string;
  date: string;    // ISO string
  amount: number;  // NGN
  cycle: "monthly" | "yearly";
  status: "Paid";
}

const HISTORY_KEY = "tablix_payment_history";

export function loadPaymentHistory(): PaymentRecord[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
}

export function savePaymentRecord(record: PaymentRecord): PaymentRecord[] {
  const history = loadPaymentHistory();
  const updated = [record, ...history];
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (_) {}
  return updated;
}

export function clearPaymentHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (_) {}
}

export function formatInvoiceNo(index: number): string {
  const now = new Date();
  const year = now.getFullYear();
  const seq = String(index + 1).padStart(3, "0");
  return `INV-${year}-${seq}`;
}
