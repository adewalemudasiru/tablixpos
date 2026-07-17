import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

const INTER = "'Inter', sans-serif";

interface Props {
  open: boolean;
  onClose: () => void;
  onBrowserPrint: () => void;
}

export function PrinterNotConnectedModal({ open, onClose, onBrowserPrint }: Props) {
  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="printer-backdrop"
            className="fixed inset-0 z-[9998] bg-black/40"
            style={{ backdropFilter: "blur(2px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          />
          <motion.div
            key="printer-modal"
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="bg-[var(--page-bg)] rounded-2xl overflow-hidden w-full max-w-md border border-[var(--page-border)]"
              style={{ boxShadow: "0 24px 64px -12px rgba(0,0,0,0.28)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-6 py-5 border-b border-[var(--page-border)]">
                <div className="size-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--c-warning-bg)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <polyline points="6 9 6 2 18 2 18 9" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="6" y="14" width="12" height="8" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 15, color: "var(--page-text)" }}>
                    Printer Not Connected
                  </p>
                  <p style={{ fontFamily: INTER, fontSize: 12, color: "var(--page-text-secondary)" }}>
                    No thermal printer was found
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="ml-auto size-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-5 flex flex-col gap-4">
                {/* Steps */}
                <div className="flex flex-col gap-3">
                  {[
                    {
                      step: "1",
                      title: "Download QZ Tray",
                      desc: "Install the free QZ Tray app on this computer",
                      link: "https://qz.io/download/",
                      linkText: "qz.io/download",
                      color: "#2563eb",
                    },
                    {
                      step: "2",
                      title: "Start QZ Tray",
                      desc: "Launch QZ Tray — it runs in your system tray (bottom-right of taskbar)",
                      color: "#7c3aed",
                    },
                    {
                      step: "3",
                      title: "Connect your printer",
                      desc: "Make sure your thermal printer is plugged in and powered on",
                      color: "#059669",
                    },
                    {
                      step: "4",
                      title: "Click Print again",
                      desc: "Come back and click the print button — it will detect your printer automatically",
                      color: "#e91835",
                    },
                  ].map((s) => (
                    <div key={s.step} className="flex items-start gap-3">
                      <div
                        className="size-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: s.color + "15" }}
                      >
                        <span style={{ fontFamily: INTER, fontWeight: 700, fontSize: 11, color: s.color }}>
                          {s.step}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: "var(--page-text)" }}>
                          {s.title}
                        </p>
                        <p style={{ fontFamily: INTER, fontSize: 12, color: "var(--page-text-secondary)", lineHeight: "17px", marginTop: 1 }}>
                          {s.desc}
                          {s.link && (
                            <>
                              {" — "}
                              <a
                                href={s.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: s.color, fontWeight: 600 }}
                              >
                                {s.linkText}
                              </a>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-[var(--page-border)]" />
                  <span style={{ fontFamily: INTER, fontSize: 11, color: "var(--page-text-muted)" }}>or</span>
                  <div className="flex-1 h-px bg-[var(--page-border)]" />
                </div>

                {/* Browser print fallback */}
                <div
                  className="flex items-start gap-3 px-4 py-3 rounded-xl"
                  style={{ background: "var(--c-success-bg)", border: "1px solid var(--c-success-dot)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
                    <path d="M20 6L9 17l-5-5" stroke="var(--c-success)" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                  <div className="flex-1">
                    <p style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: "var(--c-success)" }}>
                      Print via browser instead
                    </p>
                    <p style={{ fontFamily: INTER, fontSize: 12, color: "var(--c-success)", lineHeight: "17px", marginTop: 1, opacity: 0.8 }}>
                      Opens the receipt in a print dialog. Works with any printer your computer has installed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3 px-6 pb-5">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl transition-colors hover:bg-gray-50"
                  style={{ fontFamily: INTER, fontWeight: 500, fontSize: 14, color: "var(--page-text-muted)", border: "1px solid var(--page-border)", background: "var(--page-bg)" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => { onBrowserPrint(); onClose(); }}
                  className="flex-1 py-2.5 rounded-xl transition-opacity hover:opacity-90"
                  style={{ fontFamily: INTER, fontWeight: 600, fontSize: 14, color: "white", background: "#e91835", border: "none" }}
                >
                  Print via Browser
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
