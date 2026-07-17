import React, { useState } from "react"
import { toast } from "sonner"
import { Button, Input, colors } from "../../ds"
import { Card, SaveBar, SectionLabel, ToggleRow } from "../common"
import { useAppStore } from "../../../store/AppContext"
import { settingsAPI } from "../../../services/api"

export function KitchenOrderSection() {
  const { kotEnabled, setKotEnabled, stations, addStation, deleteStation } =
    useAppStore()
  const [newStation, setNewStation] = useState("")

  const handleToggle = async (v: boolean) => {
    setKotEnabled(v)
    if (v) {
      try {
        localStorage.setItem("tablix_kot_enabled_at", new Date().toISOString())
      } catch {}
    } else {
      try {
        localStorage.removeItem("tablix_kot_enabled_at")
      } catch {}
    }
    try {
      await settingsAPI.update({ kotEnabled: v })
    } catch {}
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="flex flex-col gap-2">
          <ToggleRow
            label="Enable Kitchen Order Tickets"
            sub="When enabled, every completed cart order is sent to the Kitchen Display System (KDS) for the kitchen to prepare. When disabled, orders complete and print a receipt immediately without notifying the kitchen."
            checked={kotEnabled}
            onChange={handleToggle}
          />
          {kotEnabled ? (
            <div
              className="mt-3 rounded-xl px-3.5 py-3"
              style={{ background: colors.successBg }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  color: colors.successText,
                  lineHeight: "18px",
                }}
              >
                Kitchen orders are active. Cart items will be sent to the KDS
                after each completed order.
              </p>
            </div>
          ) : (
            <div
              className="mt-3 rounded-xl px-3.5 py-3"
              style={{ background: colors.neutralBg }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  color: colors.textMuted,
                  lineHeight: "18px",
                }}
              >
                Kitchen orders are disabled. Orders will complete and print a
                receipt without sending to the kitchen.
              </p>
            </div>
          )}
        </div>
      </Card>

      {kotEnabled && (
        <Card>
          <div className="flex flex-col gap-5">
            <SectionLabel>Kitchen Stations</SectionLabel>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                color: colors.textMuted,
                lineHeight: "18px",
                marginTop: -12,
              }}
            >
              Define preparation stations (e.g., Hot Kitchen, Bar, Grill) to
              route specific menu items and assign staff to them.
            </p>

            <div className="flex items-end gap-3">
              <div className="flex-1">
                <Input
                  label="New Station Name"
                  value={newStation}
                  onChange={(e) => setNewStation(e.target.value)}
                  placeholder="e.g. Dessert Station"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (!newStation.trim()) return
                      if (stations.includes(newStation.trim())) {
                        toast.error("Station already exists")
                        return
                      }
                      addStation(newStation.trim())
                      setNewStation("")
                      toast.success("Station added")
                    }
                  }}
                />
              </div>
              <Button
                onClick={() => {
                  if (!newStation.trim()) return
                  if (stations.includes(newStation.trim())) {
                    toast.error("Station already exists")
                    return
                  }
                  addStation(newStation.trim())
                  setNewStation("")
                  toast.success("Station added")
                }}
              >
                Add Station
              </Button>
            </div>

            <div className="mt-2 flex flex-col gap-2">
              {stations.map((s) => (
                <div
                  key={s}
                  className="flex items-center justify-between rounded-lg border p-3"
                  style={{
                    borderColor: colors.borderLight,
                    background: "var(--page-surface-2)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: "0.95rem",
                      color: colors.textPrimary,
                    }}
                  >
                    {s}
                  </span>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete the "${s}" station?`
                        )
                      ) {
                        deleteStation(s)
                        toast.success("Station deleted")
                      }
                    }}
                    className="rounded-md p-1.5 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                    style={{ color: colors.dangerText }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              {stations.length === 0 && (
                <div
                  className="rounded-lg border border-dashed p-4 text-center text-sm"
                  style={{
                    borderColor: colors.borderMid,
                    color: colors.textMuted,
                  }}
                >
                  No stations defined. Add one above.
                </div>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
