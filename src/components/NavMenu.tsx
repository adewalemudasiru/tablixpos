/**
 * NavMenu - Desktop settings navigation button beside the logo.
 * Takes the user directly to the Settings page.
 * Hidden on mobile.
 * Hidden entirely for Cashier/Chef (no settings access).
 */

import React from "react";
import { useNavigate, useLocation } from "react-router";
import { useAppStore, usePermissions } from "../store/AppContext";

const ACTIVE_BG = "#fff1f2";
const ACTIVE_COLOR = "#e91835";

// Custom SVG Settings Gear Icon
function SettingsGearIcon({ active }: { active?: boolean }) {
  const strokeColor = active ? ACTIVE_COLOR : "#6b7280";
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function NavMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, activeStaff, setActiveStaff } = useAppStore();
  const permissions = usePermissions();
  const isDark = theme === "dark";

  if (activeStaff && !permissions.includes("manage_settings")) return null;

  const isActive = location.pathname === "/settings";

  return (
    <div className="relative hidden md:block">
      <button
        onClick={() => navigate("/settings")}
        aria-label="Go to settings"
        className="flex items-center justify-center w-9 h-9 rounded-xl transition-colors"
        style={{
          background: isActive ? ACTIVE_BG : "transparent",
          border: isActive ? "1.5px solid #fbd2cf" : "1.5px solid transparent",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            (e.currentTarget as HTMLButtonElement).style.background = "#f9fafb";
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          }
        }}
      >
        <SettingsGearIcon active={isActive} />
      </button>
    </div>
  );
}