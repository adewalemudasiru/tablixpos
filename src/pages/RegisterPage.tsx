import React, { useState } from "react";
import { useNavigate } from "react-router";
import { AuthLayout } from "../components/AuthLayout";
import { TablixLogo } from "../components/TablixLogo";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
  });

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const isComplete =
    form.businessName.trim() &&
    form.ownerName.trim() &&
    form.email.trim() &&
    form.phone.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isComplete) {
      navigate("/otp");
    }
  };

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
  ];

  return (
    <AuthLayout>
      <div className="bg-[var(--page-card-bg)] rounded-[10px] p-5 flex flex-col gap-6 items-center w-full shadow-sm border border-[var(--page-border)]">
        {/* Logo */}
        <TablixLogo />

        {/* Header */}
        <div className="flex flex-col items-center gap-[6px] text-center">
          <p className="font-semibold text-[20px] text-[var(--page-text)] leading-normal">
            Let's Create Your Account
          </p>
          <p className="font-normal text-[14px] text-[var(--page-text-secondary)] leading-[22px]">
            Signing up for tablix is fast and free
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-4 w-full">
            {fields.map((field) => (
              <div key={field.key} className="flex flex-col gap-[6px] items-start w-full">
                <label className="font-medium text-[14px] text-[var(--page-text)] leading-[20px]">
                  {field.label}
                  <span className="text-[#f04438]">*</span>
                </label>
                <div className="bg-[var(--page-bg)] rounded-[8px] w-full border border-[var(--page-border)] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20 transition-all">
                  <input
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={handleChange(field.key)}
                    className="w-full px-[14px] py-[10px] text-[16px] text-[var(--page-text)] placeholder:text-[var(--c-text-placeholder)] bg-transparent outline-none rounded-[8px]"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className={`w-full rounded-[8px] border border-transparent shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] px-[20px] py-[12px] font-medium text-[16px] leading-[22px] transition-all ${
              isComplete
                ? "bg-[#e91835] text-white hover:bg-[#d01530] active:bg-[#b81229] cursor-pointer"
                : "bg-[#e91835]/20 text-white/30 cursor-not-allowed"
            }`}
          >
            Create Account
          </button>
        </form>

        {/* Sign in link */}
        <p className="text-[14px] text-[var(--page-text-secondary)] leading-[22px]">
          Already have a Tablix account?{" "}
          <button
            onClick={() => navigate("/")}
            className="font-bold text-[#e91835] underline hover:text-[#d01530] transition-colors"
          >
            Sign in
          </button>
          <span className="font-bold text-[#e91835]">.</span>
        </p>

        {/* reCAPTCHA notice */}
        <p className="text-[14px] text-[var(--page-text-secondary)] leading-[22px] text-center">
          This site is protected by reCAPTCHA Enterprise and the Google{" "}
          <span className="text-[#e91835] underline cursor-pointer">Privacy Policy</span>
          {" and "}
          <span className="text-[#e91835] underline cursor-pointer">Terms of Service</span>
          {" apply."}
        </p>
      </div>
    </AuthLayout>
  );
}
