import React, { useState } from "react"
import { useNavigate } from "react-router"
import { AuthLayout } from "../components/AuthLayout"
import { TablixLogo } from "../components/TablixLogo"

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
  })

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const isComplete =
    form.businessName.trim() &&
    form.ownerName.trim() &&
    form.email.trim() &&
    form.phone.trim()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isComplete) {
      navigate("/otp")
    }
  }

  const fields = [
    {
      key: "businessName" as const,
      label: "Business Name",
      placeholder: "eg ABC Super Store",
    },
    {
      key: "ownerName" as const,
      label: "Owner Name",
      placeholder: "eg Macbella store",
    },
    {
      key: "email" as const,
      label: "Email",
      placeholder: "eg, help@tablix.com",
      type: "email",
    },
    {
      key: "phone" as const,
      label: "Phone",
      placeholder: "eg, +234 900 00 1020",
      type: "tel",
    },
  ]

  return (
    <AuthLayout>
      <div className="flex w-full flex-col items-center gap-6 rounded-[10px] border border-[var(--page-border)] bg-[var(--page-card-bg)] p-5 shadow-sm">
        {/* Logo */}
        <TablixLogo />

        {/* Header */}
        <div className="flex flex-col items-center gap-[6px] text-center">
          <p className="text-[20px] leading-normal font-semibold text-[var(--page-text)]">
            Let's Create Your Account
          </p>
          <p className="text-[14px] leading-[22px] font-normal text-[var(--page-text-secondary)]">
            Signing up for tablix is fast and free
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-4">
            {fields.map((field) => (
              <div
                key={field.key}
                className="flex w-full flex-col items-start gap-[6px]"
              >
                <label className="text-[14px] leading-[20px] font-medium text-[var(--page-text)]">
                  {field.label}
                  <span className="text-[#f04438]">*</span>
                </label>
                <div className="w-full rounded-[8px] border border-[var(--page-border)] bg-[var(--page-bg)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-all focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20">
                  <input
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={handleChange(field.key)}
                    className="w-full rounded-[8px] bg-transparent px-[14px] py-[10px] text-[16px] text-[var(--page-text)] outline-none placeholder:text-[var(--c-text-placeholder)]"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className={`w-full rounded-[8px] border border-transparent px-[20px] py-[12px] text-[16px] leading-[22px] font-medium shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-all ${
              isComplete
                ? "cursor-pointer bg-[#e91835] text-white hover:bg-[#d01530] active:bg-[#b81229]"
                : "cursor-not-allowed bg-[#e91835]/20 text-white/30"
            }`}
          >
            Create Account
          </button>
        </form>

        {/* Sign in link */}
        <p className="text-[14px] leading-[22px] text-[var(--page-text-secondary)]">
          Already have a Tablix account?{" "}
          <button
            onClick={() => navigate("/")}
            className="font-bold text-[#e91835] underline transition-colors hover:text-[#d01530]"
          >
            Sign in
          </button>
          <span className="font-bold text-[#e91835]">.</span>
        </p>

        {/* reCAPTCHA notice */}
        <p className="text-center text-[14px] leading-[22px] text-[var(--page-text-secondary)]">
          This site is protected by reCAPTCHA Enterprise and the Google{" "}
          <span className="cursor-pointer text-[#e91835] underline">
            Privacy Policy
          </span>
          {" and "}
          <span className="cursor-pointer text-[#e91835] underline">
            Terms of Service
          </span>
          {" apply."}
        </p>
      </div>
    </AuthLayout>
  )
}
