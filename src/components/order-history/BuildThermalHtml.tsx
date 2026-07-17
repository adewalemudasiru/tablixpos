import type { Transaction } from "../../store/AppContext"

const NGN = "\u20a6"

export function buildThermalHtml(
  tx: Transaction,
  restaurantName: string
): string {
  const now = new Date(tx.timestamp)
  const dateStr = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
  const timeStr = now.toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
  })
  const taxLabel = tx.taxLabel ?? "VAT"
  const taxRate = tx.taxRate != null ? tx.taxRate : 7.5

  const itemRows = tx.items
    .map((item) => {
      const unitP = item.qty > 0 ? item.price / item.qty : item.price
      const mainRow =
        "<tr>" +
        '<td style="text-align:left;padding-bottom:4px;vertical-align:top;word-break:break-word">' +
        item.name +
        "</td>" +
        '<td style="text-align:right;padding-bottom:4px;vertical-align:top;padding-left:4px">' +
        item.qty +
        "</td>" +
        '<td style="text-align:right;padding-bottom:4px;vertical-align:top;padding-left:4px">' +
        NGN +
        unitP.toLocaleString("en-NG", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) +
        "</td>" +
        '<td style="text-align:right;padding-bottom:4px;vertical-align:top;padding-left:4px;font-weight:700">' +
        NGN +
        item.price.toLocaleString("en-NG", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) +
        "</td>" +
        "</tr>"
      const addonRows = (item.selectedAddons ?? [])
        .map((sa) => {
          const addonDisplayName =
            (sa as { id: string; name?: string; qty: number }).name || sa.id
          return (
            '<tr><td style="text-align:left;padding-bottom:2px;padding-left:10px;color:#555;font-size:7.5pt">' +
            "+ " +
            (sa.qty > 1 ? sa.qty + "\u00d7 " : "") +
            addonDisplayName +
            '</td><td></td><td></td><td style="text-align:right;color:#555;font-size:7.5pt"></td></tr>'
          )
        })
        .join("")
      return mainRow + addonRows
    })
    .join("")

  const discountRow =
    tx.discount && tx.discount.amount > 0
      ? '<div class="row"><span>Discount (' +
        (tx.discount.type === "percent" ? tx.discount.value + "%" : "flat") +
        "):</span><span>-" +
        NGN +
        tx.discount.amount.toLocaleString("en-NG", {
          minimumFractionDigits: 2,
        }) +
        "</span></div>"
      : ""
  const taxRow =
    tx.vat > 0
      ? '<div class="row"><span>' +
        taxLabel +
        " (" +
        taxRate +
        "%" +
        (tx.taxInclusive ? " incl." : "") +
        "):</span><span>" +
        NGN +
        tx.vat.toLocaleString("en-NG", { minimumFractionDigits: 2 }) +
        "</span></div>"
      : ""
  const svcRow =
    tx.serviceCharge && tx.serviceCharge > 0
      ? '<div class="row"><span>Service Charge:</span><span>' +
        NGN +
        tx.serviceCharge.toLocaleString("en-NG", { minimumFractionDigits: 2 }) +
        "</span></div>"
      : ""

  const voidBanner =
    tx.status && tx.status !== "completed"
      ? '<div style="text-align:center;border:2px solid #e91835;margin:8px 0;padding:3px;font-weight:700;font-size:11pt;color:#e91835">' +
        tx.status.toUpperCase() +
        "</div>"
      : ""

  return (
    "<!DOCTYPE html><html><head>" +
    '<meta charset="UTF-8">' +
    "<title>Receipt-" +
    tx.id +
    "</title>" +
    "<style>" +
    "@page{size:80mm auto;margin:4mm 5mm}" +
    "*{box-sizing:border-box;margin:0;padding:0}" +
    "body{font-family:'Courier New',Courier,monospace;font-size:9pt;color:#000;background:#fff;width:70mm}" +
    ".c{text-align:center}.b{font-weight:700}" +
    ".dash{border-top:1px dashed #555;margin:5px 0}" +
    ".solid{border-top:2px solid #000;margin:5px 0}" +
    ".tsolid{border-top:1px solid #000;margin:5px 0}" +
    ".row{display:flex;justify-content:space-between;gap:6px;margin-bottom:2px}" +
    "table{width:100%;border-collapse:collapse}" +
    "th{font-weight:700;border-bottom:1px solid #000;padding-bottom:3px;font-size:8.5pt}" +
    "td{font-size:8.5pt}" +
    ".total{display:flex;justify-content:space-between;font-weight:700;font-size:11pt;margin-bottom:2px}" +
    "</style></head><body>" +
    '<div class="c b" style="font-size:14pt;letter-spacing:3px;margin-bottom:2px">' +
    (restaurantName || "TABLIX") +
    "</div>" +
    '<div class="c" style="font-size:8pt">Point of Sale Receipt</div>' +
    '<div class="dash"></div>' +
    '<div class="row"><span>Date:</span><span>' +
    dateStr +
    "</span></div>" +
    '<div class="row"><span>Time:</span><span>' +
    timeStr +
    "</span></div>" +
    '<div class="row"><span>Receipt #:</span><span class="b" style="font-size:7.5pt">' +
    tx.id +
    "</span></div>" +
    '<div class="row"><span>Customer:</span><span>' +
    (tx.customer?.name || "Walk-in") +
    "</span></div>" +
    '<div class="row"><span>Cashier:</span><span>' +
    (tx.cashier || "Staff") +
    "</span></div>" +
    (tx.tableNo
      ? '<div class="row"><span>Table:</span><span>' +
        tx.tableNo +
        "</span></div>"
      : "") +
    voidBanner +
    '<div class="dash"></div>' +
    "<table><thead><tr>" +
    '<th style="text-align:left;width:44%">ITEM</th>' +
    '<th style="text-align:right;width:10%">QTY</th>' +
    '<th style="text-align:right;width:23%">UNIT</th>' +
    '<th style="text-align:right;width:23%">TOTAL</th>' +
    "</tr></thead><tbody>" +
    itemRows +
    "</tbody></table>" +
    '<div class="tsolid"></div>' +
    '<div class="row"><span>Subtotal:</span><span>' +
    NGN +
    tx.subtotal.toLocaleString("en-NG", { minimumFractionDigits: 2 }) +
    "</span></div>" +
    discountRow +
    taxRow +
    svcRow +
    '<div class="solid"></div>' +
    '<div class="total"><span>TOTAL:</span><span>' +
    NGN +
    tx.total.toLocaleString("en-NG", { minimumFractionDigits: 2 }) +
    "</span></div>" +
    '<div class="row"><span>Payment:</span><span class="b">' +
    tx.paymentMethod.toUpperCase() +
    "</span></div>" +
    '<div class="dash"></div>' +
    '<div class="c b" style="margin-bottom:2px">THANK YOU FOR YOUR PATRONAGE!</div>' +
    '<div class="c" style="font-size:8pt">Please retain this receipt</div>' +
    '<div class="c" style="font-size:8pt;margin-top:4px">Tablix POS System</div>' +
    "</body></html>"
  )
}
