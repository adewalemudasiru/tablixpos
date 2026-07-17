/**
 * Activity Log Service
 * Persists staff auth and system events to the backend API,
 * with localStorage as a write-buffer for offline resilience.
 */

const STORAGE_KEY    = "tablix_activity_log_v1";
const API_BASE_URL   = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api/v1";

export type ActivityCategory = "Sale" | "Auth" | "Stock" | "System";

export interface ActivityEntry {
  id:        string;
  staffName: string;
  role:      string;
  action:    string;
  category:  ActivityCategory;
  timestamp: number; // ms epoch
  detail:    string;
}

// ─── localStorage helpers ─────────────────────────────────────────────────────

function loadLocal(): ActivityEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ActivityEntry[]) : [];
  } catch (_) { return []; }
}

function saveLocal(entries: ActivityEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, 200)));
  } catch (_) {}
}

// ─── API helpers ──────────────────────────────────────────────────────────────

function getToken(): string | null {
  return localStorage.getItem("tablixpos_access_token");
}

async function postToApi(entry: Omit<ActivityEntry, "id">): Promise<boolean> {
  const token = getToken();
  if (!token) return false;
  try {
    const res = await fetch(`${API_BASE_URL}/activity`, {
      method:  "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body:    JSON.stringify(entry),
    });
    return res.ok;
  } catch (_) { return false; }
}

async function fetchFromApi(category?: string): Promise<ActivityEntry[] | null> {
  const token = getToken();
  if (!token) return null;
  try {
    const qs  = category ? `?category=${encodeURIComponent(category)}&limit=200` : "?limit=200";
    const res = await fetch(`${API_BASE_URL}/activity${qs}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    const json = await res.json();
    // Map backend shape { timestamp: ISO string } → { timestamp: ms }
    return (json.data?.entries ?? []).map((e: ActivityEntry & { timestamp: string | number }) => ({
      ...e,
      timestamp: typeof e.timestamp === "string" ? new Date(e.timestamp).getTime() : e.timestamp,
    }));
  } catch (_) { return null; }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function addActivityEntry(entry: Omit<ActivityEntry, "id">): Promise<void> {
  // Always write to localStorage immediately (instant UI update)
  const entries  = loadLocal();
  const newEntry: ActivityEntry = {
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    ...entry,
  };
  saveLocal([newEntry, ...entries]);

  // Fire-and-forget to backend
  postToApi(entry);
}

export async function loadActivityEntries(category?: string): Promise<ActivityEntry[]> {
  // Try backend first; fall back to localStorage
  const apiEntries = await fetchFromApi(category);
  if (apiEntries !== null) return apiEntries;
  const local = loadLocal();
  return category ? local.filter((e) => e.category === category) : local;
}

export function clearActivityLog(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
}
