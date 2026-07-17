import { useCallback, useState } from "react"
import type { ReceiptData } from "../services/printer"

export function usePrinter() {
  const [noPrinter, setNoPrinter] = useState(false)

  const printViaBrowser = useCallback(async (receiptData: ReceiptData) => {
    try {
      const printWindow = window.open("", "_blank", "width=600,height=800")
      if (!printWindow) {
        return "browser"
      }
      const content = `
        <html>
          <head>
            <title>Receipt</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; color: #111; }
              h1, h2, h3, h4, h5, h6 { margin: 0 0 0.5rem 0; }
              .receipt { max-width: 520px; }
              .section { margin-bottom: 16px; }
              .items { width: 100%; border-collapse: collapse; }
              .items td, .items th { padding: 8px 4px; }
              .title { font-weight: 700; margin-bottom: 8px; }
              .total { font-weight: 700; }
            </style>
          </head>
          <body>
            <div class="receipt">
              <div class="section">
                <div class="title">${receiptData.businessName}</div>
                <div>${receiptData.address}</div>
                <div>${receiptData.phone}</div>
              </div>
              <div class="section">
                <div>Receipt: ${receiptData.receiptNo}</div>
                <div>Date: ${receiptData.date}</div>
                <div>Cashier: ${receiptData.cashier}</div>
                ${receiptData.tableNo ? `<div>Table: ${receiptData.tableNo}</div>` : ""}
                ${receiptData.customer ? `<div>Customer: ${receiptData.customer}</div>` : ""}
              </div>
              <table class="items">
                <tbody>
                  ${receiptData.items
                    .map(
                      (item) =>
                        `<tr><td>${item.name}</td><td style="text-align:right">x${item.qty}</td><td style="text-align:right">${item.price}</td></tr>`
                    )
                    .join("")}
                </tbody>
              </table>
              <div class="section total">Subtotal: ₦${receiptData.subtotal}</div>
              <div class="section total">Tax: ₦${receiptData.tax}</div>
              <div class="section total">Service: ₦${receiptData.serviceCharge}</div>
              <div class="section total">Total: ₦${receiptData.total}</div>
              <div class="section">Payment: ${receiptData.paymentMethod}</div>
              ${receiptData.footer ? `<div class="section">${receiptData.footer}</div>` : ""}
            </div>
          </body>
        </html>
      `
      printWindow.document.write(content)
      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
      return "browser"
    } catch {
      return "browser"
    }
  }, [])

  const print = useCallback(
    async (receiptData: ReceiptData) => {
      if (noPrinter) {
        return "browser"
      }
      return printViaBrowser(receiptData)
    },
    [noPrinter, printViaBrowser]
  )

  return {
    noPrinter,
    setNoPrinter,
    print,
    printViaBrowser,
  }
}
