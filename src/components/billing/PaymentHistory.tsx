import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PaystackLogo } from "./icons/PaystackLogo"
import { useBilling } from "../../hooks/useBilling"
import { fmtAmount, fmtDate } from "../../utils/formatting"
import { colors, shadows } from "../ds"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { toast } from "sonner"
const INTER = "'Inter', sans-serif"
const RED = "#e91835"

export function PaymentHistory() {
  const { isPro, paymentHistory, handleExportHistory } = useBilling()

  const handleDownloadInvoice = (inv: any) => {
    const doc = new jsPDF()

    doc.setFontSize(22)
    doc.setTextColor(233, 24, 53)
    doc.text("Tablix POS", 14, 20)

    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text("Invoice Receipt", 14, 28)

    doc.setFontSize(12)
    doc.setTextColor(0)
    doc.text(`Invoice No: ${inv.invoiceNo}`, 14, 40)
    doc.text(`Date: ${fmtDate(inv.date)}`, 14, 46)
    doc.text(`Reference: ${inv.reference}`, 14, 52)

    autoTable(doc, {
      startY: 60,
      head: [["Description", "Amount"]],
      body: [
        [
          `Tablix Pro - ${inv.cycle === "yearly" ? "Yearly" : "Monthly"} Subscription`,
          fmtAmount(inv.amount),
        ],
      ],
      foot: [["Total Paid", fmtAmount(inv.amount)]],
      theme: "grid",
      headStyles: { fillColor: [233, 24, 53] },
      footStyles: {
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
        fontStyle: "bold",
      },
    })

    const finalY = (doc as any).lastAutoTable.finalY || 80
    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text("Thank you for your patronage!", 14, finalY + 20)
    doc.text("Status: " + inv.status, 14, finalY + 26)

    doc.save(`Invoice-${inv.invoiceNo}.pdf`)
    toast.success("Invoice downloaded")
  }

  if (!isPro) return null

  return (
    <div
      className="page-card overflow-hidden rounded-2xl border"
      style={{
        border: `1px solid ${colors.borderLight}`,
        boxShadow: shadows.card,
      }}
    >
      <div
        className="page-border flex items-center justify-between border-b px-4 py-4"
        style={{ borderColor: colors.borderLight }}
      >
        <div>
          <p
            style={{
              fontFamily: INTER,
              fontWeight: 600,
              fontSize: 14,
              color: colors.textPrimary,
            }}
          >
            Payment History
          </p>
          <p
            style={{
              fontFamily: INTER,
              fontSize: 12,
              color: colors.textMuted,
              marginTop: 1,
            }}
          >
            Your subscription invoices
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleExportHistory}>
          Export
        </Button>
      </div>

      {paymentHistory.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-4 py-10">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              stroke={colors.textMuted}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <p
            style={{ fontFamily: INTER, fontSize: 13, color: colors.textMuted }}
          >
            No payment records yet
          </p>
        </div>
      ) : (
        <div className="divide-y" style={{ borderColor: colors.borderLight }}>
          {paymentHistory.map((inv, idx) => (
            <div
              key={inv.reference}
              className="flex items-start justify-between gap-3 px-4 py-3.5"
            >
              <div className="min-w-0">
                <p
                  style={{
                    fontFamily: INTER,
                    fontWeight: 600,
                    fontSize: 13,
                    color: RED,
                  }}
                >
                  {inv.invoiceNo ||
                    `INV-${String(paymentHistory.length - idx).padStart(3, "0")}`}
                </p>
                <p
                  style={{
                    fontFamily: INTER,
                    fontSize: 11,
                    color: colors.textMuted,
                    marginTop: 1,
                  }}
                >
                  {fmtDate(inv.date)} •{" "}
                  {inv.cycle === "yearly" ? "Yearly" : "Monthly"}
                </p>
                <p
                  style={{
                    fontFamily: INTER,
                    fontSize: 10,
                    color: "#d1d5db",
                    marginTop: 1,
                  }}
                >
                  Ref: {inv.reference.slice(0, 18)}...
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <span
                  style={{
                    fontFamily: INTER,
                    fontWeight: 700,
                    fontSize: 14,
                    color: colors.textPrimary,
                  }}
                >
                  {fmtAmount(inv.amount)}
                </span>
                <Badge variant="success">{inv.status}</Badge>
                <button
                  style={{
                    fontFamily: INTER,
                    fontSize: 11,
                    color: RED,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDownloadInvoice(inv)}
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        className="flex items-center justify-center gap-2 border-t py-3 opacity-50"
        style={{ borderColor: colors.borderLight }}
      >
        <span
          style={{ fontFamily: INTER, fontSize: 10, color: colors.textMuted }}
        >
          Powered by
        </span>
        <PaystackLogo />
      </div>
    </div>
  )
}
