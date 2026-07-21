/**
 * MenuQRModal - Displays a printable QR code that links customers
 * to the restaurant's digital menu.
 */

import { useRef } from "react"
import { QRCodeSVG } from "qrcode.react"
import { AnimatePresence, motion } from "motion/react"
import { colors, font, radius, shadows, Button } from "./ds"
import svgPaths from "../imports/svg-re625692x"
import { useAppStore } from "../store/AppContext"

const INTER = "'Inter', sans-serif"

// Tablix logo (inline, same as AppLogo but self-contained for the modal)
function ModalLogo() {
  return (
    <div className="flex shrink-0 items-end justify-center">
      <div className="relative size-[26px] shrink-0">
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 33 33"
        >
          <path d={svgPaths.p30add40} fill="#E91835" />
        </svg>
      </div>
      <div className="relative h-[26px] w-[85px] shrink-0">
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 108 33.3458"
        >
          <path d={svgPaths.p3c956500} fill="#111827" />
          <path d={svgPaths.p7108500} fill="#111827" />
          <path d={svgPaths.p134ade00} fill="#111827" />
          <path d={svgPaths.p207b6121} fill="#111827" />
          <path d={svgPaths.p25a44800} fill="#111827" />
          <path d={svgPaths.p3bbdf480} fill="#111827" />
        </svg>
      </div>
    </div>
  )
}

// QR icon for the button
function QRIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="3"
        width="7"
        height="7"
        rx="1"
        stroke={color}
        strokeWidth="1.8"
      />
      <rect
        x="14"
        y="3"
        width="7"
        height="7"
        rx="1"
        stroke={color}
        strokeWidth="1.8"
      />
      <rect
        x="3"
        y="14"
        width="7"
        height="7"
        rx="1"
        stroke={color}
        strokeWidth="1.8"
      />
      <rect x="5" y="5" width="3" height="3" fill={color} />
      <rect x="16" y="5" width="3" height="3" fill={color} />
      <rect x="5" y="16" width="3" height="3" fill={color} />
      <path
        d="M14 14h2v2h-2zM18 14h3M18 18h3M14 18v3M18 16h2v2"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Print icon
function PrintIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <polyline
        points="6 9 6 2 18 2 18 9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="6"
        y="14"
        width="12"
        height="8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface MenuQRModalProps {
  isOpen: boolean
  onClose: () => void
}

export function MenuQRModal({ isOpen, onClose }: MenuQRModalProps) {
  const { menuUrl: storeMenuUrl, restaurantName } = useAppStore()
  const businessId = localStorage.getItem("tablix_business_id") ?? ""
  const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
  const menuUrl = `${baseUrl}/menu-view${businessId ? `?b=${businessId}` : ""}`
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    const printContent = printRef.current
    if (!printContent) return

    const win = window.open("", "_blank", "width=500,height=700")
    if (!win) return

    // Serialize the QR SVG
    const svgEl = printContent.querySelector("svg")
    const svgMarkup = svgEl ? svgEl.outerHTML : ""

    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Menu QR Code - ${restaurantName}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              background: #fff;
            }
            .card {
              text-align: center;
              padding: 40px 48px;
              border: 1.5px solid #e5e7eb;
              border-radius: 20px;
              width: 360px;
            }
            .restaurant-name {
              font-size: 20px;
              font-weight: 700;
              color: #111827;
              margin-bottom: 4px;
              letter-spacing: -0.4px;
            }
            .tagline {
              font-size: 13px;
              color: #6b7280;
              margin-bottom: 28px;
            }
            .qr-wrapper {
              display: inline-flex;
              padding: 16px;
              border-radius: 16px;
              border: 1.5px solid #f0f0f0;
              background: #fff;
              margin-bottom: 24px;
            }
            .scan-text {
              font-size: 16px;
              font-weight: 600;
              color: #111827;
              margin-bottom: 6px;
            }
            .scan-sub {
              font-size: 12px;
              color: #6b7280;
              margin-bottom: 16px;
              line-height: 1.5;
            }
            .url-pill {
              display: inline-block;
              background: #fff5f7;
              border: 1px solid #fbd2cf;
              border-radius: 999px;
              padding: 6px 16px;
              font-size: 11px;
              color: #e91835;
              font-weight: 500;
              word-break: break-all;
            }
            .footer {
              margin-top: 24px;
              font-size: 10px;
              color: #9ca3af;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="restaurant-name">${restaurantName}</div>
            <div class="tagline">Scan to view our full menu</div>
            <div class="qr-wrapper">${svgMarkup}</div>
            <div class="scan-text">Scan to Order</div>
            <div class="scan-sub">Point your camera at the QR code<br/>to browse our menu instantly</div>
            <div class="url-pill">${menuUrl}</div>
            <div class="footer">Powered by Tablix POS</div>
          </div>
          <script>window.onload = function() { window.print(); window.close(); }<\/script>
        </body>
      </html>
    `)
    win.document.close()
  }

  const handleDownload = () => {
    const svgEl = printRef.current?.querySelector("svg")
    if (!svgEl) return
    const svgData = new XMLSerializer().serializeToString(svgEl)
    const blob = new Blob([svgData], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "tablix-menu-qr.svg"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="qr-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50"
            style={{
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(2px)",
            }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="qr-modal"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ pointerEvents: "none" }}
          >
            <div
              className="page-card-bg relative flex flex-col overflow-hidden"
              style={{
                width: "100%",
                maxWidth: 420,
                borderRadius: radius.xl,
                boxShadow:
                  "0 24px 64px -12px rgba(0,0,0,0.28), 0 8px 24px -4px rgba(0,0,0,0.12)",
                border: `1px solid var(--page-border)`,
                pointerEvents: "auto",
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{ borderBottom: `1px solid var(--page-border)` }}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="flex size-9 items-center justify-center rounded-xl"
                    style={{
                      background: colors.primaryLight,
                      border: `1px solid ${colors.primaryMid}`,
                    }}
                  >
                    <QRIcon color={colors.primary} />
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: INTER,
                        fontWeight: 700,
                        fontSize: font.size.base,
                        color: "var(--page-text)",
                        lineHeight: "20px",
                      }}
                    >
                      Menu QR Code
                    </p>
                    <p
                      style={{
                        fontFamily: INTER,
                        fontSize: font.size.xs,
                        color: "var(--page-text-muted)",
                        lineHeight: "16px",
                      }}
                    >
                      Share with customers to view your menu
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="flex size-8 items-center justify-center rounded-xl transition-colors hover:bg-gray-100"
                  style={{ color: colors.textMuted, flexShrink: 0 }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M11 3L3 11M3 3l8 8"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* QR card (printable area) */}
              <div className="flex flex-col items-center gap-5 px-8 py-8">
                <div
                  ref={printRef}
                  className="page-surface-2 flex w-full flex-col items-center gap-4 rounded-2xl px-6 py-8"
                  style={{ border: `1px solid var(--page-border)` }}
                >
                  {/* Restaurant name */}
                  <div className="flex flex-col items-center gap-1.5">
                    <ModalLogo />
                    <p
                      style={{
                        fontFamily: INTER,
                        fontSize: font.size.sm,
                        color: "var(--page-text-muted)",
                        lineHeight: "16px",
                      }}
                    >
                      {restaurantName}
                    </p>
                  </div>

                  {/* QR code */}
                  <div
                    className="page-card-bg flex items-center justify-center rounded-2xl"
                    style={{
                      padding: 16,
                      border: `1px solid var(--page-border)`,
                      boxShadow: shadows.card,
                    }}
                  >
                    <QRCodeSVG
                      value={menuUrl}
                      size={180}
                      level="H"
                      fgColor="#111827"
                      bgColor="#ffffff"
                      style={{ display: "block", borderRadius: "8px" }}
                    />
                  </div>

                  {/* Call to action */}
                  <div className="flex flex-col items-center gap-1 text-center">
                    <p
                      style={{
                        fontFamily: INTER,
                        fontWeight: 700,
                        fontSize: 15,
                        color: "var(--page-text)",
                        letterSpacing: "-0.2px",
                      }}
                    >
                      Scan to View Menu
                    </p>
                    <p
                      style={{
                        fontFamily: INTER,
                        fontSize: font.size.xs,
                        color: "var(--page-text-muted)",
                        lineHeight: "16px",
                      }}
                    >
                      Point your camera at the QR code to browse our full menu
                    </p>
                  </div>

                  {/* URL pill */}
                </div>

                {/* Info note */}
              </div>

              {/* Actions */}
              <div
                className="flex items-center gap-3 px-6 py-4"
                style={{ borderTop: `1px solid var(--page-border)` }}
              >
                <Button
                  variant="primary"
                  size="md"
                  onClick={handlePrint}
                  className="flex flex-1 items-center justify-center gap-2"
                >
                  <PrintIcon />
                  Print QR Code
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
