/**
 * ManagerOverrideModal
 * Requires a Manager or Owner PIN to approve sensitive actions.
 * Used to prevent cashier/waiter theft (voids, cart clears, item removals).
 */

import React, { useState, useCallback, useEffect } from "react";
import { PinPad } from "./PinPad";
import type { StoreStaff } from "../store/AppContext";
import { useAppStore, DEFAULT_ROLES } from "../store/AppContext";

const INTER = "'Inter', sans-serif";

interface Props {
  /** Short label shown in the modal, e.g. "Remove item from cart" */
  action: string;
  /** Extra detail shown below the action label */
  detail?: string;
  /** All staff from the store so we can verify their PINs */
  staff: StoreStaff[];
  /** Called with the approver's name when the override is granted */
  onApprove: (approverName: string) => void;
  /** Called when the user dismisses the modal without approving */
  onCancel: () => void;
}

/** Returns the display name of any manager/admin/owner who matches the given PIN, or null */
function resolveApprover(pin: string, staff: StoreStaff[], roles: any[]): string | null {
  // Check manager / admin staff first
  const match = staff.find((s) => {
    const role = roles.find(r => r.id === s.role) || DEFAULT_ROLES.find(r => r.id === s.role);
    return role?.permissions.includes("manager_override") && s.pin === pin;
  });
  if (match) return match.name;

  // Check owner PIN stored in localStorage
  try {
    const ownerPin = localStorage.getItem("tablix_owner_pin");
    if (ownerPin && ownerPin === pin) return "Owner";
  } catch (_) {}

  return null;
}

export function ManagerOverrideModal({ action, detail, staff, onApprove, onCancel }: Props) {
  const { roles } = useAppStore();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  // Close on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onCancel(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onCancel]);

  const handleVerify = useCallback(() => {
    if (pin.length < 6) return;
    const approver = resolveApprover(pin, staff, roles);
    if (approver) {
      onApprove(approver);
    } else {
      setError("Incorrect PIN. Only a Manager or Owner can approve this.");
      setPin("");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }, [pin, staff, roles, onApprove]);

  // Auto-verify once 6 digits are entered
  useEffect(() => {
    if (pin.length === 6) handleVerify();
  }, [pin, handleVerify]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div
        className="w-full max-w-[360px] bg-white rounded-2xl overflow-hidden shadow-2xl"
        style={{
          animation: shake
            ? "overrideShake 0.45s ease"
            : "overrideIn 0.18s ease-out",
        }}
      >
        <style>{`
          @keyframes overrideIn {
            from { opacity: 0; transform: scale(0.94) translateY(8px); }
            to   { opacity: 1; transform: scale(1)    translateY(0);   }
          }
          @keyframes overrideShake {
            0%,100% { transform: translateX(0); }
            20%     { transform: translateX(-8px); }
            40%     { transform: translateX(8px); }
            60%     { transform: translateX(-6px); }
            80%     { transform: translateX(6px); }
          }
        `}</style>

        {/* Red top accent */}
        <div style={{ height: 4, background: "linear-gradient(90deg,#e91835,#c41530)" }} />

        <div className="flex flex-col gap-5 p-6">
          {/* Icon + title */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div
              className="flex items-center justify-center rounded-2xl"
              style={{ width: 52, height: 52, background: "var(--c-primary-light)", border: "1.5px solid #fbd2cf" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#e91835" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 8v4M12 16h.01" stroke="#e91835" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 16, color: "#111827" }}>
                Manager Approval Required
              </p>
              <p style={{ fontFamily: INTER, fontSize: 13, color: "#6b7280", lineHeight: "18px" }}>
                Ask a <strong>Manager</strong> or <strong>Owner</strong> to enter their PIN to approve:
              </p>
            </div>
          </div>

          {/* Action chip */}
          <div
            className="flex flex-col gap-1 px-4 py-3 rounded-xl"
            style={{ background: "var(--c-warning-bg)", border: "1px solid var(--c-warning-dot)" }}
          >
            <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: "#92400e" }}>
              {action}
            </p>
            {detail && (
              <p style={{ fontFamily: INTER, fontSize: 12, color: "#b45309", margin: 0 }}>
                {detail}
              </p>
            )}
          </div>

          {/* PIN pad */}
          <PinPad
            pin={pin}
            onPinChange={(p) => { setPin(p); setError(""); }}
            maxLength={6}
          />

          {/* Error */}
          {error && (
            <div
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
              style={{ background: "var(--c-primary-light)", border: "1px solid #fecdd3" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#e91835" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p style={{ fontFamily: INTER, fontSize: 12, color: "#e91835" }}>{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl transition-colors"
              style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, background: "var(--page-surface-2)", color: "var(--page-text)", border: "none", cursor: "pointer" }}
            >
              Cancel
            </button>
            <button
              onClick={handleVerify}
              disabled={pin.length < 6}
              className="flex-1 py-2.5 rounded-xl transition-opacity"
              style={{
                fontFamily: INTER, fontWeight: 600, fontSize: 13,
                background: pin.length < 6 ? "#fecdd3" : "#e91835",
                color: "white", border: "none",
                cursor: pin.length < 6 ? "not-allowed" : "pointer",
                opacity: pin.length < 6 ? 0.7 : 1,
              }}
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
