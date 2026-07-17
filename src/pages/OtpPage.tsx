import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { AuthLayout } from "../components/AuthLayout";
import { TablixLogo } from "../components/TablixLogo";
import { toast, Toaster } from "sonner";
import { authAPI } from "../services/api";
import imgFoodBg from "../../login-bg.png";
import { motion, AnimatePresence } from "motion/react";

const INTER = "'Inter', sans-serif";

// ── Mobile OTP sheet ────────────────────────────────────────────────────────
function MobileOtp() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { email?: string; flow?: string } | null;
  const flow = state?.flow ?? "login";
  const email = state?.email ?? "user@example.com";

  const maskedEmail = email.replace(/(.{3})(.*)(@.*)/, (_, a, b, c) => a + "*".repeat(Math.max(b.length, 5)) + c);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted) {
      const newOtp = pasted.split("").concat(Array(6).fill("")).slice(0, 6);
      setOtp(newOtp);
      inputRefs.current[Math.min(pasted.length, 5)]?.focus();
    }
  };

  const handleContinue = async () => {
    const code = otp.join("");
    if (code.length < 6) return;
    setLoading(true);
    setError("");
    try {
      await authAPI.verifyEmail(email, code);
      setShowSuccess(true);
      setTimeout(() => {
        navigate(flow === "signup" ? "/create-pin" : "/enter-pin", { state: { ...state } });
      }, 1500);
    } catch (err: any) {
      setError(err?.data?.message || err?.message || "Invalid or expired code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isComplete = otp.every((d) => d !== "");

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <Toaster position="top-center" richColors />
      <img src={imgFoodBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/45" />

      {showSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[var(--c-success-bg)] border border-[var(--c-success-text)]/20 rounded-[8px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)] px-4 py-3 flex items-center gap-2 min-w-[260px]">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <path clipRule="evenodd" d="M10 1.667A8.333 8.333 0 1 0 10 18.333 8.333 8.333 0 0 0 10 1.667Zm3.59 6.41a.833.833 0 0 0-1.18-1.18L9 10.32 7.59 8.91a.833.833 0 0 0-1.18 1.18l2 2c.325.326.855.326 1.18 0l4-4Z" fill="var(--c-success-text)" fillRule="evenodd" />
          </svg>
          <span className="text-[var(--c-success-text)] text-[13px] font-medium" style={{ fontFamily: INTER }}>OTP Verified Successfully</span>
        </div>
      )}

      <div className="absolute left-6 w-[300px]" style={{ top: "18%" }}>
        <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 32, color: "#fff", lineHeight: "40px", margin: 0 }}>
          Verify Email
        </p>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 page-card backdrop-blur-md flex flex-col items-center gap-6 px-5 pt-8 pb-10 shadow-[0_-8px_30px_rgb(0,0,0,0.12)]"
        style={{ borderRadius: "32px 32px 0 0" }}
      >
        <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full -mt-2 mb-1" />

        <div className="flex flex-col items-center gap-1.5 text-center w-full">
          <p style={{ fontFamily: INTER, fontWeight: 800, fontSize: 24, color: "var(--page-text)" }}>Enter Code</p>
          <p style={{ fontFamily: INTER, fontSize: 13, color: "var(--page-text-muted)", lineHeight: "22px" }}>
            A 6-digits code has been sent to your email {maskedEmail} and it will expire in 10 minutes
          </p>
        </div>

        <div className="flex gap-3 items-center justify-center w-full" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <div key={i} className="flex-1 max-w-[48px]">
              <div className="bg-[var(--page-bg)] relative rounded-xl w-full border border-[var(--page-border)] focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20 transition-all shadow-sm">
                <input
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-full px-2 py-3.5 rounded-xl text-[18px] text-[var(--page-text)] text-center outline-none bg-transparent"
                  style={{ fontFamily: INTER, fontWeight: 600 }}
                />
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-2 p-3 rounded-xl bg-[var(--c-danger-bg)] border border-[var(--c-danger-text)]/20 w-full"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="var(--c-danger-text)" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p style={{ fontFamily: INTER, fontSize: 12, color: "var(--c-danger-text)", fontWeight: 500 }}>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleContinue}
          disabled={loading || !isComplete}
          className="w-full flex items-center justify-center h-11 rounded-xl text-white font-semibold transition-all shadow-sm active:scale-[0.98] bg-[#e91835] hover:bg-[#d01530] disabled:bg-[#e91835]/20 disabled:text-white/30 disabled:cursor-not-allowed"
          style={{
            fontFamily: INTER,
            fontSize: 15,
          }}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Continue"
          )}
        </button>

        <p style={{ fontFamily: INTER, fontSize: 13, color: "var(--page-text-muted)", margin: 0, marginTop: 4 }}>
          Didn't get OTP Code?{" "}
          <button
            onClick={async () => {
              setOtp(["", "", "", "", "", ""]);
              setError("");
              try {
                await authAPI.resendOtp(email);
                toast.success("A new OTP has been sent to your email.");
              } catch {
                toast.error("Failed to resend OTP. Please try again.");
              }
            }}
            style={{ fontFamily: INTER, fontWeight: 700, color: "#e91835", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
          >
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
}

// ── Desktop OTP ─────────────────────────────────────────────────────────
function DesktopOtp() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { email?: string; flow?: string } | null;
  const flow = state?.flow ?? "login";
  const email = state?.email ?? "user@example.com";

  const maskedEmail = email.replace(/(.{3})(.*)(@.*)/, (_, a, b, c) => a + "*".repeat(Math.max(b.length, 5)) + c);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted) {
      const newOtp = pasted.split("").concat(Array(6).fill("")).slice(0, 6);
      setOtp(newOtp);
      inputRefs.current[Math.min(pasted.length, 5)]?.focus();
    }
  };

  const handleContinue = async () => {
    const code = otp.join("");
    if (code.length < 6) return;
    setLoading(true);
    setError("");
    try {
      await authAPI.verifyEmail(email, code);
      setShowSuccess(true);
      setTimeout(() => {
        navigate(flow === "signup" ? "/create-pin" : "/enter-pin", { state: { ...state } });
      }, 1500);
    } catch (err: any) {
      setError(err?.data?.message || err?.message || "Invalid or expired code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isComplete = otp.every((d) => d !== "");

  return (
    <AuthLayout>
      <Toaster position="top-center" richColors />
      <div className="w-full max-w-[440px] flex flex-col gap-6 items-center">
        {showSuccess && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[var(--c-success-bg)] border border-[var(--c-success-text)]/20 rounded-[8px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)] px-4 py-3 flex items-center gap-2 min-w-[260px]">
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path clipRule="evenodd" d="M10 1.667A8.333 8.333 0 1 0 10 18.333 8.333 8.333 0 0 0 10 1.667Zm3.59 6.41a.833.833 0 0 0-1.18-1.18L9 10.32 7.59 8.91a.833.833 0 0 0-1.18 1.18l2 2c.325.326.855.326 1.18 0l4-4Z" fill="var(--c-success-text)" fillRule="evenodd" />
            </svg>
            <span className="text-[var(--c-success-text)] text-[13px] font-medium" style={{ fontFamily: INTER }}>OTP Verified Successfully</span>
          </div>
        )}

        <div className="transform scale-110 mb-2">
          <TablixLogo />
        </div>

        <div className="w-full page-card rounded-2xl border page-border shadow-[0_1px_4px_0_rgba(0,0,0,0.06),0_4px_16px_0_rgba(0,0,0,0.04)] px-8 py-8 flex flex-col gap-6">
          <div className="flex flex-col gap-1.5 text-center w-full">
            <p style={{ fontFamily: INTER, fontWeight: 800, fontSize: 24, color: "var(--page-text)" }}>Verify Email</p>
            <p style={{ fontFamily: INTER, fontSize: 13.5, color: "var(--page-text-muted)", lineHeight: "22px" }}>
              A 6-digits code has been sent to your email {maskedEmail} and it will expire in 10 minutes
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center justify-center w-full" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <div key={i} className="flex-1 max-w-[50px]">
                  <div className="bg-[var(--page-bg)] relative rounded-xl w-full border border-[var(--page-border)] focus-within:bg-[var(--page-bg)] focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20 transition-all shadow-sm">
                    <input
                      ref={(el) => { inputRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      className="w-full px-2 py-3.5 rounded-xl text-[18px] text-[var(--page-text)] text-center outline-none bg-transparent"
                      style={{ fontFamily: INTER, fontWeight: 600 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-[var(--c-danger-bg)] border border-[var(--c-danger-text)]/20"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="var(--c-danger-text)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <p style={{ fontFamily: INTER, fontSize: 12, color: "var(--c-danger-text)", fontWeight: 500 }}>{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleContinue}
              disabled={loading || !isComplete}
              className="w-full flex items-center justify-center h-11 rounded-xl text-white font-semibold transition-all shadow-sm active:scale-[0.98] bg-[#e91835] hover:bg-[#d01530] disabled:bg-[#e91835]/20 disabled:text-white/30 disabled:cursor-not-allowed mt-2"
              style={{
                fontFamily: INTER,
                fontSize: 15,
              }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </div>

        <p style={{ fontFamily: INTER, fontSize: 13.5, color: "var(--page-text-muted)", textAlign: "center" }}>
          Didn't get OTP Code?{" "}
          <button
            onClick={async () => {
              setOtp(["", "", "", "", "", ""]);
              setError("");
              try {
                await authAPI.resendOtp(email);
                toast.success("A new OTP has been sent to your email.");
              } catch {
                toast.error("Failed to resend OTP. Please try again.");
              }
            }}
            style={{ fontFamily: INTER, fontWeight: 700, color: "#e91835", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
          >
            Resend OTP
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}

export default function OtpPage() {
  return (
    <>
      {/* Mobile layout (< lg) */}
      <div className="block lg:hidden h-screen">
        <MobileOtp />
      </div>
      {/* Desktop layout (>= lg) */}
      <div className="hidden lg:block">
        <DesktopOtp />
      </div>
    </>
  );
}