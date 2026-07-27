import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "../../ds/Button"
import { Input } from "../../ds/Input"
import { colors, font } from "../../ds/tokens"
import { Card, ToggleRow } from "../common"
import { useAppStore } from "../../../store/AppContext"
import { accountAPI } from "../../../services/api"
import { SectionLabel } from "@/components/SectionLabel"
import { INTER } from "@/config/constants"
import { Divider } from "@/components/Divider"

export function AccountSettingsSection() {
  const { theme, setTheme } = useAppStore()
  const [form, setForm] = useState({ ownerName: "", phone: "" })
  const [pinForm, setPinForm] = useState({
    currentPin: "",
    newPin: "",
    confirmPin: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savingPin, setSavingPin] = useState(false)

  useEffect(() => {
    accountAPI
      .getMe()
      .then((res) => {
        setForm({
          ownerName: res.data.user.ownerName,
          phone: res.data.user.phone,
        })
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSaveProfile = async () => {
    setSaving(true)
    try {
      await accountAPI.update({ ownerName: form.ownerName, phone: form.phone })
      toast.success("Profile updated")
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  const handleChangePin = async () => {
    if (pinForm.newPin !== pinForm.confirmPin) {
      toast.error("New PINs do not match")
      return
    }
    if (pinForm.newPin.length !== 6 || !/^\d{6}$/.test(pinForm.newPin)) {
      toast.error("PIN must be exactly 6 digits")
      return
    }
    setSavingPin(true)
    try {
      await accountAPI.update({
        currentPin: pinForm.currentPin,
        newPin: pinForm.newPin,
      })
      toast.success("PIN changed successfully")
      setPinForm({ currentPin: "", newPin: "", confirmPin: "" })
    } catch (e: any) {
      toast.error(e?.data?.message || "Failed to change PIN")
    } finally {
      setSavingPin(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-2xl"
            style={{ background: "var(--page-surface-2)" }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Profile */}
      <Card>
        <div className="flex flex-col gap-5">
          <SectionLabel>Owner Profile</SectionLabel>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Full Name"
              value={form.ownerName}
              onChange={(e) =>
                setForm((p) => ({ ...p, ownerName: e.target.value }))
              }
            />
            <Input
              label="Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm((p) => ({ ...p, phone: e.target.value }))
              }
            />
          </div>
        </div>
      </Card>
      <div className="flex justify-end">
        <Button
          variant="primary"
          size="md"
          loading={saving}
          onClick={handleSaveProfile}
        >
          Save Profile
        </Button>
      </div>

      <Divider />

      {/* App Preferences */}
      <Card>
        <div className="flex flex-col gap-5">
          <SectionLabel>App Preferences</SectionLabel>
          <ToggleRow
            label="Dark Mode"
            sub="Use a dark appearance for Tablix"
            checked={theme === "dark"}
            onChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
        </div>
      </Card>

      <Divider />

      {/* Change PIN */}
      <Card>
        <div className="flex flex-col gap-5">
          <div>
            <SectionLabel>Change Login PIN</SectionLabel>
            <p
              style={{
                fontFamily: INTER,
                fontSize: font.size.sm,
                color: colors.textMuted,
                marginTop: 2,
              }}
            >
              Your PIN is used to log in to the POS. It must be exactly 6
              digits.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Input
              label="Current PIN"
              type="password"
              inputMode="numeric"
              maxLength={6}
              value={pinForm.currentPin}
              onChange={(e) =>
                setPinForm((p) => ({
                  ...p,
                  currentPin: e.target.value.replace(/\D/g, ""),
                }))
              }
              placeholder="••••••"
            />
            <Input
              label="New PIN"
              type="password"
              inputMode="numeric"
              maxLength={6}
              value={pinForm.newPin}
              onChange={(e) =>
                setPinForm((p) => ({
                  ...p,
                  newPin: e.target.value.replace(/\D/g, ""),
                }))
              }
              placeholder="••••••"
            />
            <Input
              label="Confirm New PIN"
              type="password"
              inputMode="numeric"
              maxLength={6}
              value={pinForm.confirmPin}
              onChange={(e) =>
                setPinForm((p) => ({
                  ...p,
                  confirmPin: e.target.value.replace(/\D/g, ""),
                }))
              }
              placeholder="••••••"
            />
          </div>
        </div>
      </Card>
      <div className="flex justify-end">
        <Button
          variant="primary"
          size="md"
          loading={savingPin}
          onClick={handleChangePin}
          disabled={
            !pinForm.currentPin || !pinForm.newPin || !pinForm.confirmPin
          }
        >
          Change PIN
        </Button>
      </div>
    </div>
  )
}
