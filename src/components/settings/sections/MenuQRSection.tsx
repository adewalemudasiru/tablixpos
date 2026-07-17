import React from "react"
import { QRCodeSVG } from "qrcode.react"
import { useAppStore } from "../../../store/AppContext"
import { Button, colors, font, shadows } from "../../ds"
import { Card } from "../common"

export function MenuQRSection() {
  const { restaurantName, theme } = useAppStore()
  const isDark = theme === "dark"
  const businessId = localStorage.getItem("tablix_business_id") ?? ""
  const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
  const menuUrl = `${baseUrl}/menu-view${businessId ? `?b=${businessId}` : ""}`
  const printRef = React.useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    const printContent = printRef.current
    if (!printContent) return
    const win = window.open("", "_blank", "width=500,height=700")
    if (!win) return
    const svgEl = printContent.querySelector("svg")
    const svgMarkup = svgEl ? svgEl.outerHTML : ""
    win.document.write(
      `<!DOCTYPE html><html><head><title>Menu QR Code - ${restaurantName}</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#fff}.card{text-align:center;padding:40px 48px;border:1.5px solid #e5e7eb;border-radius:20px;width:360px}.restaurant-name{font-size:20px;font-weight:700;color:#111827;margin-bottom:4px}.tagline{font-size:13px;color:#6b7280;margin-bottom:28px}.qr-wrapper{display:inline-flex;padding:16px;border-radius:16px;border:1.5px solid #f0f0f0;background:#fff;margin-bottom:24px}.scan-text{font-size:16px;font-weight:600;color:#111827;margin-bottom:6px}.scan-sub{font-size:12px;color:#6b7280;margin-bottom:16px;line-height:1.5}.url-pill{display:inline-block;background:#fff5f7;border:1px solid #fbd2cf;border-radius:999px;padding:6px 16px;font-size:11px;color:#e91835;font-weight:500;word-break:break-all}.footer{margin-top:24px;font-size:10px;color:#9ca3af}</style></head><body><div class="card"><div class="restaurant-name">${restaurantName}</div><div class="tagline">Scan to view our full menu</div><div class="qr-wrapper">${svgMarkup}</div><div class="scan-text">Scan to Order</div><div class="scan-sub">Point your camera at the QR code<br/>to browse our menu instantly</div><div class="url-pill">${menuUrl}</div><div class="footer">Powered by Tablix POS</div></div><script>window.onload=function(){window.print();window.close()}</script></body></html>`
    )
    win.document.close()
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="flex flex-col items-center gap-6 py-4">
          <div
            ref={printRef}
            className="flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl border border-[var(--page-border)] px-6 py-8"
            style={{
              background: "var(--page-surface-2)",
              boxShadow: shadows.card,
            }}
          >
            <div className="flex flex-col items-center gap-1.5">
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: font.size.sm,
                  color: "var(--page-text-muted)",
                  lineHeight: "16px",
                }}
              >
                {restaurantName}
              </p>
            </div>
            <div
              className="flex items-center justify-center rounded-2xl border border-[var(--page-border)] p-4"
              style={{
                background: "var(--page-card-bg)",
                boxShadow: shadows.card,
              }}
            >
              <QRCodeSVG
                value={menuUrl}
                size={180}
                level="H"
                fgColor={isDark ? "#ffffff" : "#111827"}
                bgColor="transparent"
                style={{ display: "block", borderRadius: "8px" }}
              />
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
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
                  fontFamily: "'Inter', sans-serif",
                  fontSize: font.size.xs,
                  color: "var(--page-text-muted)",
                  lineHeight: "16px",
                }}
              >
                Point your camera at the QR code to browse our full menu
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={handlePrint}
            className="flex items-center gap-2"
          >
            Print QR Code
          </Button>
        </div>
      </Card>
    </div>
  )
}
