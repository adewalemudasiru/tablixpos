import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import { Input, colors, font } from "../../ds"
import { Card, SaveBar, SectionLabel, ToggleRow } from "../common"
import { useAppStore } from "../../../store/AppContext"
import { settingsAPI } from "../../../services/api"
import type { LoyaltySettings } from "../../../types/settings/loyalty"

const INIT_LOYALTY: LoyaltySettings = {
  enabled: true,
  rewardType: "percentage",
  rewardValue: "2",
  threshold: "500",
  minPointsToRedeem: "100",
  showBalanceOnReceipt: true,
  autoEnroll: true,
}

function RewardTypeButton({
  active,
  label,
  sub,
  onClick,
}: {
  active: boolean
  label: string
  sub: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-1 flex-col gap-1 rounded-xl px-4 py-3.5 text-left transition-all"
      style={{
        border: `2px solid ${active ? colors.primary : colors.borderLight}`,
        background: active ? "var(--c-primary-light)" : "var(--page-card-bg)",
        cursor: "pointer",
        boxShadow: active
          ? `0 0 0 1px ${colors.primary}18`
          : "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="flex size-4 shrink-0 items-center justify-center rounded-full"
          style={{
            border: `2px solid ${active ? colors.primary : colors.borderMid}`,
            background: active ? colors.primary : "transparent",
          }}
        >
          {active && <div className="size-1.5 rounded-full bg-white" />}
        </div>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: font.size.md,
            color: active ? colors.primary : colors.textPrimary,
          }}
        >
          {label}
        </span>
      </div>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: font.size.xs,
          color: colors.textMuted,
          lineHeight: "16px",
          paddingLeft: 24,
        }}
      >
        {sub}
      </p>
    </button>
  )
}

export function LoyaltySettingsSection() {
  const { loyaltyConfig, setLoyaltyConfig } = useAppStore()
  const [form, setForm] = useState<LoyaltySettings>(() => ({
    enabled: loyaltyConfig.enabled,
    rewardType: loyaltyConfig.rewardType,
    rewardValue: String(loyaltyConfig.rewardValue),
    threshold: String(loyaltyConfig.threshold),
    minPointsToRedeem: String(loyaltyConfig.minPointsToRedeem),
    showBalanceOnReceipt: loyaltyConfig.showBalanceOnReceipt,
    autoEnroll: loyaltyConfig.autoEnroll,
  }))
  const [saving, setSaving] = useState(false)
  const upd = <K extends keyof LoyaltySettings>(k: K, v: LoyaltySettings[K]) =>
    setForm((p) => ({ ...p, [k]: v }))

  useEffect(() => {
    settingsAPI
      .get()
      .then((res) => {
        const s = res.data?.settings
        if (s) {
          setForm((p) => ({
            ...p,
            enabled: s.loyaltyEnabled,
            rewardType: s.loyaltyRewardType as "percentage" | "fixed",
            rewardValue: String(s.loyaltyRewardValue),
            threshold: String(s.loyaltyThreshold),
            minPointsToRedeem: String(s.loyaltyMinRedeem),
            showBalanceOnReceipt: s.loyaltyShowOnReceipt,
            autoEnroll: s.loyaltyAutoEnroll,
          }))
        }
      })
      .catch(() => {})
  }, [])

  const handleSave = async () => {
    setSaving(true)
    const cfg = {
      enabled: form.enabled,
      rewardType: form.rewardType,
      rewardValue: parseFloat(form.rewardValue) || 0,
      threshold: parseFloat(form.threshold) || 0,
      minPointsToRedeem: parseFloat(form.minPointsToRedeem) || 0,
      showBalanceOnReceipt: form.showBalanceOnReceipt,
      autoEnroll: form.autoEnroll,
    }
    try {
      await settingsAPI.update({
        loyaltyEnabled: cfg.enabled,
        loyaltyRewardType: cfg.rewardType,
        loyaltyRewardValue: cfg.rewardValue,
        loyaltyThreshold: cfg.threshold,
        loyaltyMinRedeem: cfg.minPointsToRedeem,
        loyaltyShowOnReceipt: cfg.showBalanceOnReceipt,
        loyaltyAutoEnroll: cfg.autoEnroll,
      })
    } catch {}
    setLoyaltyConfig(cfg)
    setSaving(false)
    toast.success("Loyalty settings saved")
  }

  const isPercent = form.rewardType === "percentage"
  const thresholdHint = `Orders below ₦${Number(form.threshold || 0).toLocaleString()} will not earn any reward`

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <ToggleRow
          label="Enable Loyalty Reward Program"
          sub="Customers earn reward points on qualifying purchases which can be redeemed for discounts"
          checked={form.enabled}
          onChange={(v) => upd("enabled", v)}
        />
      </Card>

      {form.enabled && (
        <>
          <Card>
            <div className="flex flex-col gap-4">
              <SectionLabel>Reward Type</SectionLabel>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: font.size.xs,
                  color: colors.textMuted,
                  lineHeight: "16px",
                  marginTop: -8,
                }}
              >
                Choose how customers earn their reward on each purchase
              </p>
              <div className="flex gap-3">
                <RewardTypeButton
                  active={isPercent}
                  label="Percentage"
                  sub="Earn a % of the order total as reward points"
                  onClick={() => upd("rewardType", "percentage")}
                />
                <RewardTypeButton
                  active={!isPercent}
                  label="Fixed Amount"
                  sub="Earn a flat number of points per purchase"
                  onClick={() => upd("rewardType", "fixed")}
                />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col gap-5">
              <SectionLabel>Reward Configuration</SectionLabel>
              <div
                className={
                  isPercent
                    ? "grid grid-cols-1 gap-4 sm:grid-cols-2"
                    : "flex flex-col gap-4"
                }
              >
                {isPercent && (
                  <Input
                    label="Reward Percentage (%)"
                    value={form.rewardValue}
                    onChange={(e) => upd("rewardValue", e.target.value)}
                    type="number"
                    hint={`Customer earns ${form.rewardValue || 0}% of each qualifying order as reward points`}
                  />
                )}
                <Input
                  label={`Minimum Purchase Threshold (₦)`}
                  value={form.threshold}
                  onChange={(e) => upd("threshold", e.target.value)}
                  type="number"
                  hint={thresholdHint}
                />
              </div>
            </div>
          </Card>
        </>
      )}

      <SaveBar onSave={handleSave} loading={saving} />
    </div>
  )
}
