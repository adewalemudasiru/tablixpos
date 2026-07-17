/**
 * Tablix POS – IndexedDB Offline Engine
 *
 * Replaces raw localStorage with a proper IDB schema so the app can
 * store and retrieve data reliably while offline on any OS / browser.
 *
 * DB name : "tablixpos-db"
 * Version : 1
 *
 * Object stores
 * ─────────────
 *  transactions   – keyPath: "id"
 *  cart           – keyPath: "id"  (single row, id="active")
 *  settings       – keyPath: "key"  (generic key-value pairs)
 *  syncQueue      – keyPath: "id", autoIncrement: true
 *    Holds failed API mutations for background-sync replay.
 */

import { openDB, type IDBPDatabase } from "idb";
import type { Transaction } from "./storage";

// ─── Schema ──────────────────────────────────────────────────────────────────

export interface SyncQueueItem {
  id?: number;           // autoIncrement PK
  timestamp: number;
  endpoint: string;      // e.g. "/api/v1/transactions"
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  body: unknown;
  tag: string;           // workbox background-sync tag
  retries: number;
}

export interface SettingsEntry {
  key: string;
  value: unknown;
}

const DB_NAME    = "tablixpos-db";
const DB_VERSION = 1;

// Singleton promise so we only open the DB once
let _db: Promise<IDBPDatabase> | null = null;

function getDB(): Promise<IDBPDatabase> {
  if (!_db) {
    _db = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Transactions
        if (!db.objectStoreNames.contains("transactions")) {
          const txStore = db.createObjectStore("transactions", { keyPath: "id" });
          txStore.createIndex("timestamp", "timestamp");
          txStore.createIndex("status",    "status");
        }
        // Cart – single active-cart document stored as id="active"
        if (!db.objectStoreNames.contains("cart")) {
          db.createObjectStore("cart", { keyPath: "id" });
        }
        // Generic key-value settings store
        if (!db.objectStoreNames.contains("settings")) {
          db.createObjectStore("settings", { keyPath: "key" });
        }
        // Outgoing request queue for background sync
        if (!db.objectStoreNames.contains("syncQueue")) {
          db.createObjectStore("syncQueue", {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      },
    });
  }
  return _db;
}

// ─── Transactions ─────────────────────────────────────────────────────────────

export async function idbSaveTransaction(tx: Transaction): Promise<void> {
  const db = await getDB();
  await db.put("transactions", tx);
  // Mirror to localStorage as backup (for pages that still read directly)
  _mirrorTransactionsToLocalStorage(db);
}

export async function idbLoadTransactions(): Promise<Transaction[]> {
  const db = await getDB();
  const all = await db.getAll("transactions");
  return all.sort((a, b) => b.timestamp - a.timestamp);
}

export async function idbUpdateTransaction(tx: Transaction): Promise<void> {
  const db = await getDB();
  await db.put("transactions", tx);
  _mirrorTransactionsToLocalStorage(db);
}

export async function idbDeleteTransaction(id: string): Promise<void> {
  const db = await getDB();
  await db.delete("transactions", id);
  _mirrorTransactionsToLocalStorage(db);
}

/** Keep localStorage in sync so legacy code reading it directly stays consistent. */
async function _mirrorTransactionsToLocalStorage(db: IDBPDatabase): Promise<void> {
  try {
    const all = await db.getAll("transactions");
    localStorage.setItem("tablix_transactions", JSON.stringify(all));
  } catch (_) { /* storage quota / private mode – silently ignore */ }
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export async function idbSaveCart(items: unknown[]): Promise<void> {
  const db = await getDB();
  await db.put("cart", { id: "active", items });
  try {
    localStorage.setItem("tablix_cart", JSON.stringify(items));
  } catch (_) { /* ignore */ }
}

export async function idbLoadCart(): Promise<unknown[]> {
  const db = await getDB();
  const row = await db.get("cart", "active");
  return Array.isArray(row?.items) ? row.items : [];
}

export async function idbClearCart(): Promise<void> {
  const db = await getDB();
  await db.delete("cart", "active");
  try { localStorage.removeItem("tablix_cart"); } catch (_) { /* ignore */ }
}

// ─── Generic Settings / Key-Value ─────────────────────────────────────────────

export async function idbSetSetting<T>(key: string, value: T): Promise<void> {
  const db = await getDB();
  await db.put("settings", { key, value });
}

export async function idbGetSetting<T>(key: string, fallback?: T): Promise<T | undefined> {
  const db = await getDB();
  const row = await db.get("settings", key);
  return row ? (row.value as T) : fallback;
}

export async function idbGetAllSettings(): Promise<Record<string, unknown>> {
  const db = await getDB();
  const rows = await db.getAll("settings");
  return Object.fromEntries(rows.map((r: SettingsEntry) => [r.key, r.value]));
}

// ─── Sync Queue ────────────────────────────────────────────────────────────────

export async function idbEnqueueRequest(item: Omit<SyncQueueItem, "id">): Promise<void> {
  const db = await getDB();
  await db.add("syncQueue", item);
}

export async function idbDrainSyncQueue(): Promise<SyncQueueItem[]> {
  const db = await getDB();
  const all = await db.getAll("syncQueue");
  return all;
}

export async function idbRemoveSyncQueueItem(id: number): Promise<void> {
  const db = await getDB();
  await db.delete("syncQueue", id);
}

export async function idbSyncQueueLength(): Promise<number> {
  const db = await getDB();
  return db.count("syncQueue");
}

// ─── Migration helper ─────────────────────────────────────────────────────────
// Runs once on startup: reads localStorage data → writes to IDB if IDB is empty.

export async function migrateFromLocalStorage(): Promise<void> {
  const db = await getDB();
  const existingCount = await db.count("transactions");
  if (existingCount > 0) return; // Already migrated

  try {
    const raw = localStorage.getItem("tablix_transactions");
    if (raw) {
      const txs: Transaction[] = JSON.parse(raw);
      const dbTx = db.transaction("transactions", "readwrite");
      await Promise.all([...txs.map((t) => dbTx.store.put(t)), dbTx.done]);
    }
  } catch (_) { /* ignore */ }

  try {
    const raw = localStorage.getItem("tablix_cart");
    if (raw) {
      const items = JSON.parse(raw);
      await db.put("cart", { id: "active", items });
    }
  } catch (_) { /* ignore */ }
}
