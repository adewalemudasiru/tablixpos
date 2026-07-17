/**
 * QZ Tray printer service — lazy loaded to avoid startup crashes.
 * Requires QZ Tray desktop app: https://qz.io/download/
 */

export type PrinterStatus = "disconnected" | "connecting" | "connected" | "error";

let _status: PrinterStatus = "disconnected";
let _statusListeners: Array<(s: PrinterStatus) => void> = [];
let _qz: any = null;

function setStatus(s: PrinterStatus) {
  _status = s;
  _statusListeners.forEach((fn) => fn(s));
}

export function onStatusChange(fn: (s: PrinterStatus) => void) {
  _statusListeners.push(fn);
  return () => { _statusListeners = _statusListeners.filter((f) => f !== fn); };
}

export function getStatus(): PrinterStatus { return _status; }

// Lazy-load qz-tray only when needed
async function getQZ(): Promise<any> {
  if (_qz) return _qz;
  try {
    const mod = await import("qz-tray");
    _qz = mod.default ?? mod;
    return _qz;
  } catch (_) {
    return null;
  }
}

// ── Connect to QZ Tray ────────────────────────────────────────────────────────

export async function connect(): Promise<boolean> {
  if (_status === "connected") return true;
  setStatus("connecting");
  try {
    const qz = await getQZ();
    if (!qz) { setStatus("error"); return false; }

    // Set security callbacks — must be functions that return promises
    qz.security.setCertificatePromise(function (resolve: any, _reject: any) {
      resolve(); // No certificate (unsigned/development mode)
    });
    qz.security.setSignatureAlgorithm("SHA512");
    qz.security.setSignaturePromise(function (_toSign: any) {
      return function (resolve: any, _reject: any) {
        resolve(); // No signature (unsigned/development mode)
      };
    });

    await qz.websocket.connect({ retries: 2, delay: 1 });
    setStatus("connected");
    return true;
  } catch (err) {
    setStatus("error");
    console.warn("[QZ Tray] Not available:", err);
    return false;
  }
}

export async function disconnect() {
  if (_status !== "connected" || !_qz) return;
  try { await _qz.websocket.disconnect(); } catch (_) { }
  setStatus("disconnected");
}

// ── List available printers ───────────────────────────────────────────────────

export async function listPrinters(): Promise<string[]> {
  if (_status !== "connected") await connect();
  if (!_qz) return [];
  try { return await _qz.printers.find(); } catch (_) { return []; }
}

// ── ESC/POS command helpers ───────────────────────────────────────────────────

const ESC = "\x1B";
const GS = "\x1D";

const CMD = {
  INIT: ESC + "@",
  ALIGN_LEFT: ESC + "a\x00",
  ALIGN_CENTER: ESC + "a\x01",
  BOLD_ON: ESC + "E\x01",
  BOLD_OFF: ESC + "E\x00",
  DOUBLE_HEIGHT: GS + "!\x01",
  NORMAL_SIZE: GS + "!\x00",
  CUT: GS + "V\x41\x03",
  KICK_DRAWER: ESC + "p\x00\x19\xfa",
};

function twoCol(left: string, right: string, width = 42): string {
  const gap = width - left.length - right.length;
  return left + " ".repeat(Math.max(1, gap)) + right + "\n";
}

function divider(width = 42): string {
  return "-".repeat(width) + "\n";
}

// ── Receipt data type ─────────────────────────────────────────────────────────

export interface ReceiptData {
  businessName: string;
  address?: string;
  phone?: string;
  receiptNo: string;
  date: string;
  cashier: string;
  tableNo?: string;
  customer?: string;
  items: Array<{ name: string; qty: number; price: number }>;
  subtotal: number;
  tax?: number;
  taxName?: string;
  serviceCharge?: number;
  discount?: number;
  total: number;
  paymentMethod: string;
  amountPaid?: number;
  change?: number;
  footer?: string;
  showQR?: boolean;
  menuUrl?: string;
}

export function buildReceiptCommands(data: ReceiptData): string[] {
  const NGN = "\u20a6";
  const fmt = (n: number) => `${NGN}${n.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
  const cmds: string[] = [CMD.INIT];

  cmds.push(CMD.ALIGN_CENTER);
  cmds.push(CMD.BOLD_ON + CMD.DOUBLE_HEIGHT + data.businessName + "\n");
  cmds.push(CMD.NORMAL_SIZE + CMD.BOLD_OFF);
  if (data.address) cmds.push(data.address + "\n");
  if (data.phone) cmds.push(data.phone + "\n");
  cmds.push("\n");

  cmds.push(CMD.ALIGN_LEFT);
  cmds.push(twoCol("Receipt #:", data.receiptNo));
  cmds.push(twoCol("Date:", data.date));
  cmds.push(twoCol("Cashier:", data.cashier));
  if (data.tableNo) cmds.push(twoCol("Table:", data.tableNo));
  if (data.customer) cmds.push(twoCol("Customer:", data.customer));
  cmds.push(divider());

  cmds.push(CMD.BOLD_ON + twoCol("Item", "Amount") + CMD.BOLD_OFF);
  cmds.push(divider());

  data.items.forEach((item) => {
    cmds.push(twoCol(`${item.qty}x ${item.name}`.slice(0, 30), fmt(item.price * item.qty)));
  });

  cmds.push(divider());
  cmds.push(twoCol("Subtotal:", fmt(data.subtotal)));
  if (data.discount) cmds.push(twoCol("Discount:", `-${fmt(data.discount)}`));
  if (data.tax) cmds.push(twoCol(`${data.taxName ?? "VAT"}:`, fmt(data.tax)));
  if (data.serviceCharge) cmds.push(twoCol("Service Charge:", fmt(data.serviceCharge)));
  cmds.push(CMD.BOLD_ON + twoCol("TOTAL:", fmt(data.total)) + CMD.BOLD_OFF);
  cmds.push(divider());
  cmds.push(twoCol("Payment:", data.paymentMethod));
  if (data.amountPaid != null) cmds.push(twoCol("Amount Paid:", fmt(data.amountPaid)));
  if (data.change && data.change > 0) cmds.push(twoCol("Change:", fmt(data.change)));
  cmds.push("\n");

  cmds.push(CMD.ALIGN_CENTER);
  cmds.push((data.footer || "Thank you for your patronage!") + "\n");
  cmds.push("\n\n\n");
  cmds.push(CMD.CUT);

  if (data.paymentMethod && data.paymentMethod.toLowerCase() === "cash") {
    cmds.push(CMD.KICK_DRAWER);
  }

  return cmds;
}

// ── Print receipt ─────────────────────────────────────────────────────────────

export async function printReceipt(printerName: string, data: ReceiptData): Promise<void> {
  if (_status !== "connected") {
    const ok = await connect();
    if (!ok) throw new Error("QZ Tray is not running. Please start QZ Tray and try again.");
  }
  const qz = await getQZ();
  if (!qz) throw new Error("QZ Tray not available");

  const config = qz.configs.create(printerName, { encoding: "Cp1252", copies: 1 });
  await qz.print(config, [{ type: "raw", format: "plain", data: buildReceiptCommands(data).join("") }]);
}

// ── Fallback: browser print ───────────────────────────────────────────────────

export function browserPrint(receiptHtml: string) {
  const win = window.open("", "_blank", "width=400,height=600");
  if (!win) return;
  win.document.write(`<!DOCTYPE html><html><head><style>
    @page{size:80mm auto;margin:0}
    body{font-family:monospace;font-size:12px;width:72mm;margin:4mm}
    *{box-sizing:border-box}
  </style></head><body>${receiptHtml}</body></html>`);
  win.document.close();
  win.focus();
  win.print();
  win.close();
}
