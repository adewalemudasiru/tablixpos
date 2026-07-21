import React, { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import svgPayment from "../imports/svg-0dm66gja4g"
import svgSuccess from "../imports/svg-a3rrawmxu2"
import { Button } from "./ds"
import { useAppStore } from "../store/AppContext"

// --- Types ---

interface CartItem {
  id: string
  name: string
  price: number
  qty: number
  selectedVariantId?: string
  variants?: { id: string; name: string; price: number }[]
  addons?: { id: string; name: string; price: number }[]
  selectedAddons?: { id: string; qty: number }[]
}

interface DiscountInfo {
  type: "percent" | "flat"
  value: number
  amount: number
}

interface CheckoutFlowProps {
  cart: CartItem[]
  subtotal: number
  discount?: DiscountInfo
  vat: number
  taxName: string
  taxRate: number
  taxEnabled: boolean
  taxInclusive: boolean
  showTaxOnReceipt: boolean
  serviceCharge: number
  serviceRate: number
  total: number
  customerName: string
  tableNo?: string
  cashierName?: string
  initialMethod?: "cash" | "card" | "transfer"
  onClose: () => void
  onComplete: (paymentMethod: string, cashTendered?: number) => void
}

type PaymentMethodType = "cash" | "card" | "transfer"
type FlowStep = "confirm" | "success" | "receipt"

// --- Helpers ---

const NGN = "\u20a6"
const fmt = (n: number) =>
  NGN +
  n.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

function generateTxnNo() {
  return "TXN" + Date.now().toString().slice(-10)
}

// --- Icon Components ---

function CashIcon({ active }: { active: boolean }) {
  const stroke = active ? "#E91835" : "var(--page-text)"
  return (
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
      <path
        d={svgPayment.p25024900}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.66667"
      />
      <path
        d={svgPayment.p230c5e00}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.66667"
      />
      <path
        d="M8 16H8.01333M24 16H24.0133"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.66667"
      />
    </svg>
  )
}

function CardIcon({ active }: { active: boolean }) {
  const stroke = active ? "#E91835" : "var(--page-text)"
  return (
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
      <path
        d={svgPayment.p30f65280}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.66667"
      />
      <path
        d="M2.66667 13.3333H29.3333"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.66667"
      />
    </svg>
  )
}

function TransferIcon({ active }: { active: boolean }) {
  const stroke = active ? "#E91835" : "var(--page-text)"
  return (
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
      <path
        d={svgPayment.p26ab5000}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.66667"
      />
      <path
        d="M16 24H16.0133"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.66667"
      />
    </svg>
  )
}

function PrinterIcon() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
      <path
        d={svgSuccess.p1ccebb00}
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d={svgSuccess.p23e01370}
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d={svgSuccess.p30502a00}
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d={svgSuccess.p1caf6660}
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M5.83333 9.16667H8.33333"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
    </svg>
  )
}

// --- Confirm Payment Screen ---

function ConfirmPaymentScreen({
  total,
  initialMethod = "cash",
  onCancel,
  onComplete,
}: {
  total: number
  initialMethod?: PaymentMethodType
  onCancel: () => void
  onComplete: (method: PaymentMethodType, tendered: number) => void
}) {
  const [method, setMethod] = useState<PaymentMethodType>(initialMethod)
  const [cashInput, setCashInput] = useState("0.00")

  const QUICK_AMOUNTS = [500, 1000, 2000, 5000, 10000, 20000]
  const NUMPAD = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ",", "."]

  const handleNumpad = (key: string) => {
    setCashInput((prev) => {
      if (prev === "0.00") return key === "." || key === "," ? "0." : key
      if (key === "," || key === ".") {
        if (prev.includes(".")) return prev
        return prev + "."
      }
      return prev + key
    })
  }

  const handleQuick = (amount: number) => {
    setCashInput(amount.toFixed(2))
  }

  const handleClear = () => setCashInput("0.00")
  const handleDelete = () => {
    setCashInput((prev) => {
      const s = prev.slice(0, -1)
      return s === "" || s === "-" ? "0.00" : s
    })
  }

  const cashTendered = parseFloat(cashInput.replace(",", ".")) || 0
  const change = cashTendered - total

  const renderMethodContent = () => {
    if (method === "cash") {
      return (
        <div className="flex w-full flex-col gap-[16px]">
          <div className="flex w-full flex-col gap-[6px]">
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 16,
                lineHeight: "24px",
                color: "var(--page-text)",
              }}
            >
              Cash Tendered
            </p>
            <div className="relative h-[48px] w-full rounded-[6.8px] bg-[var(--page-bg)]">
              <div className="flex h-full items-center px-[12px] py-[8px]">
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: 18,
                    color:
                      cashInput === "0.00"
                        ? "var(--page-text-muted)"
                        : "var(--page-text)",
                  }}
                >
                  {cashInput === "0.00" ? "0.00" : cashInput}
                </p>
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[6.8px] border border-solid border-[var(--page-border)]"
              />
            </div>
            {change >= 0 && cashTendered > 0 && (
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#00A63E",
                }}
              >
                Change: {fmt(change)}
              </p>
            )}
            {cashTendered > 0 && change < 0 && (
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 13,
                  color: "#e91835",
                }}
              >
                Short by: {fmt(Math.abs(change))}
              </p>
            )}
          </div>

          <div className="grid w-full grid-cols-3 gap-[8px]">
            {QUICK_AMOUNTS.map((amt) => (
              <button
                key={amt}
                onClick={() => handleQuick(amt)}
                className="relative flex h-[40px] items-center justify-center rounded-[6.8px] bg-[var(--page-surface)] transition-colors hover:bg-[var(--page-surface-2)]"
                style={{
                  boxShadow:
                    "0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px 0px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[6.8px] border-2 border-solid border-[var(--page-border)]"
                />
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: 14,
                    color: "var(--page-text)",
                  }}
                >
                  {fmt(amt)}
                </p>
              </button>
            ))}
          </div>

          <div className="grid w-full grid-cols-3 gap-[8px]">
            {NUMPAD.map((key) => (
              <button
                key={key}
                onClick={() => handleNumpad(key)}
                className="relative flex h-[48px] items-center justify-center rounded-[6.8px] bg-[var(--page-surface)] transition-colors hover:bg-[var(--page-surface-2)] active:bg-[var(--page-border)]"
                style={{
                  boxShadow:
                    "0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px 0px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[6.8px] border-2 border-solid border-[var(--page-border)]"
                />
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: 18,
                    color: "var(--page-text)",
                  }}
                >
                  {key}
                </p>
              </button>
            ))}
          </div>

          <div className="flex w-full gap-[8px]">
            <button
              onClick={handleClear}
              className="relative flex h-[40px] flex-1 items-center justify-center rounded-[6.8px] bg-[var(--page-surface)] transition-colors hover:bg-[var(--page-surface-2)]"
              style={{
                boxShadow:
                  "0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px 0px rgba(0,0,0,0.1)",
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[6.8px] border-2 border-solid border-[var(--page-border)]"
              />
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  color: "var(--page-text)",
                }}
              >
                Clear
              </p>
            </button>
            <button
              onClick={handleDelete}
              className="relative flex h-[40px] flex-1 items-center justify-center rounded-[6.8px] bg-[var(--page-surface)] transition-colors hover:bg-[var(--page-surface-2)]"
              style={{
                boxShadow:
                  "0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px 0px rgba(0,0,0,0.1)",
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[6.8px] border-2 border-solid border-[var(--page-border)]"
              />
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  color: "var(--page-text)",
                }}
              >
                &lt;- Del
              </p>
            </button>
          </div>
        </div>
      )
    }

    const isCard = method === "card"
    return (
      <div className="relative flex w-full flex-col items-center gap-[12px] rounded-[10px] bg-[var(--c-primary-light)] px-[16px] py-[26px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[10px] border-2 border-solid border-[#fbd2cf]"
        />
        {isCard ? (
          <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
            <path
              d="M36 4H12C9.79086 4 8 5.79086 8 8V40C8 42.2091 9.79086 44 12 44H36C38.2091 44 40 42.2091 40 40V8C40 5.79086 38.2091 4 36 4Z"
              stroke="#E91835"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            />
            <path
              d="M16 12H32"
              stroke="#E91835"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            />
            <path
              d="M32 28V36"
              stroke="#E91835"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            />
            <path
              d="M32 20H32.02"
              stroke="#E91835"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            />
            <path
              d="M24 20H24.02"
              stroke="#E91835"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            />
            <path
              d="M16 20H16.02"
              stroke="#E91835"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            />
            <path
              d="M24 28H24.02"
              stroke="#E91835"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            />
            <path
              d="M16 28H16.02"
              stroke="#E91835"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            />
            <path
              d="M24 36H24.02"
              stroke="#E91835"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            />
            <path
              d="M16 36H16.02"
              stroke="#E91835"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            />
          </svg>
        ) : (
          <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
            <path
              d="M40 8H8C5.79086 8 4 9.79086 4 12V36C4 38.2091 5.79086 40 8 40H40C42.2091 40 44 38.2091 44 36V12C44 9.79086 42.2091 40 40 40L40 8Z"
              stroke="#E91835"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            />
            <path
              d="M4 20H44"
              stroke="#E91835"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            />
            <path
              d="M12 30H20"
              stroke="#E91835"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            />
          </svg>
        )}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 14,
            color: "#E91835",
            textAlign: "center",
          }}
        >
          {isCard
            ? "Insert or tap card on POS terminal"
            : "Transfer to account: 0123456789 / Bank: First Bank"}
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            color: "#E91835",
          }}
        >
          {fmt(total)}
        </p>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-[16px]">
      <div className="flex flex-col gap-[2px]">
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: 18,
            lineHeight: "28.6px",
            color: "var(--page-text)",
            letterSpacing: "-0.55px",
          }}
        >
          Complete Payment
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 14,
            lineHeight: "22.4px",
            color: "var(--page-text-secondary)",
          }}
        >
          Total Amount:{" "}
          <span style={{ fontWeight: 600, fontSize: 18, color: "#e91835" }}>
            {fmt(total)}
          </span>
        </p>
      </div>

      <div className="grid w-full grid-cols-3 gap-[12px]">
        {(["cash", "card", "transfer"] as PaymentMethodType[]).map((m) => {
          const isActive = method === m
          return (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`relative flex h-[98px] flex-col items-center justify-center gap-[8px] rounded-[10px] transition-colors ${
                isActive
                  ? "bg-[var(--c-primary-light)]"
                  : "bg-[var(--page-surface)] hover:bg-[var(--page-surface-2)]"
              }`}
            >
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 rounded-[10px] border-solid transition-colors ${
                  isActive
                    ? "border-2 border-[var(--c-primary)]"
                    : "border border-[var(--page-border)]"
                }`}
              />
              {m === "cash" && <CashIcon active={isActive} />}
              {m === "card" && <CardIcon active={isActive} />}
              {m === "transfer" && <TransferIcon active={isActive} />}
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: "22.4px",
                  color: isActive ? "var(--c-primary)" : "var(--page-text)",
                }}
              >
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </p>
            </button>
          )
        })}
      </div>

      {renderMethodContent()}

      <div className="flex w-full gap-3">
        <Button variant="outline" size="md" fullWidth onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={() => onComplete(method, cashTendered)}
        >
          Complete - {fmt(total)}
        </Button>
      </div>
    </div>
  )
}

// --- Success Screen ---

function SuccessScreen({
  total,
  method,
  txnNo,
  onClose,
  onViewReceipt,
}: {
  total: number
  method: PaymentMethodType
  txnNo: string
  onClose: () => void
  onViewReceipt: () => void
}) {
  const now = new Date()
  const dateStr = now.toLocaleString("en-NG")

  return (
    <div className="flex w-full flex-col items-center gap-[24px]">
      <div className="flex w-full flex-col items-center gap-[16px]">
        <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[var(--c-success-bg)]">
          <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
            <path
              d={svgSuccess.p19a01780}
              stroke="var(--c-success)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3.33333"
            />
            <path
              d={svgSuccess.p24376300}
              stroke="var(--c-success)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3.33333"
            />
          </svg>
        </div>
        <div className="flex flex-col items-center text-center">
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 18,
              lineHeight: "28.6px",
              color: "var(--page-text)",
              letterSpacing: "-0.55px",
            }}
          >
            Payment Successful!
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "22.4px",
              color: "var(--page-text-secondary)",
            }}
          >
            Transaction completed successfully
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-[16px]">
        <div className="relative flex w-full flex-col items-center gap-[4px] rounded-[10px] bg-[var(--c-success-bg)] px-[16px] py-[26px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[10px] border border-solid border-[var(--c-success)]"
          />
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "22.4px",
              color: "var(--c-success)",
            }}
          >
            Amount Paid
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 22,
              lineHeight: "28px",
              color: "var(--c-success)",
            }}
          >
            {fmt(total)}
          </p>
        </div>

        <div className="flex w-full flex-col gap-[8px]">
          {[
            { label: "Transaction No:", value: txnNo },
            {
              label: "Payment Method:",
              value: method.charAt(0).toUpperCase() + method.slice(1),
            },
            { label: "Date & Time:", value: dateStr },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex w-full items-start justify-between"
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: "20px",
                  color: "var(--page-text-secondary)",
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  lineHeight: "20px",
                  color: "var(--page-text)",
                  textAlign: "right",
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full gap-3">
        <Button variant="outline" size="md" fullWidth onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={onViewReceipt}
          leftIcon={<PrinterIcon />}
        >
          View Receipt
        </Button>
      </div>
    </div>
  )
}

// --- Print Receipt Screen ---

function PrintReceiptScreen({
  cart,
  subtotal,
  discount,
  vat,
  taxName,
  taxRate,
  taxEnabled,
  taxInclusive,
  showTaxOnReceipt,
  serviceCharge,
  serviceRate,
  total,
  method,
  tendered,
  txnNo,
  customerName,
  tableNo,
  cashierName,
  onClose,
}: {
  cart: CartItem[]
  subtotal: number
  discount?: DiscountInfo
  vat: number
  taxName: string
  taxRate: number
  taxEnabled: boolean
  taxInclusive: boolean
  showTaxOnReceipt: boolean
  serviceCharge: number
  serviceRate: number
  total: number
  method: PaymentMethodType
  tendered: number
  txnNo: string
  customerName: string
  tableNo?: string
  cashierName?: string
  onClose: () => void
}) {
  // Read live business info and POS config from context
  const { restaurantName, businessConfig, posConfig } = useAppStore()

  const now = new Date()
  const dateStr = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
  const timeStr = now.toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
  })
  const totalItems = cart.reduce((s, i) => s + i.qty, 0)
  const change = method === "cash" && tendered > total ? tendered - total : 0

  const fmtN = (n: number) =>
    NGN +
    n.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  // Build address and phone lines from context
  const addressLine = [
    businessConfig.address,
    businessConfig.city,
    businessConfig.state,
  ]
    .filter(Boolean)
    .join(", ")
  const phoneLine = businessConfig.phone
    ? "Tel: " +
      businessConfig.phone +
      (businessConfig.email ? " | " + businessConfig.email : "")
    : ""

  // Build thermal receipt HTML string for iframe printing
  const buildThermalHtml = () => {
    const itemRows = cart
      .map((item) => {
        const variant = item.variants?.find(
          (v) => v.id === item.selectedVariantId
        )
        const name = variant ? item.name + " (" + variant.name + ")" : item.name
        const unitPrice = item.qty > 0 ? item.price / item.qty : item.price
        const mainRow =
          "<tr>" +
          '<td style="text-align:left;padding-bottom:4px;vertical-align:top;word-break:break-word">' +
          name +
          "</td>" +
          '<td style="text-align:right;padding-bottom:4px;vertical-align:top;padding-left:4px">' +
          item.qty +
          "</td>" +
          '<td style="text-align:right;padding-bottom:4px;vertical-align:top;padding-left:4px">' +
          NGN +
          unitPrice.toLocaleString("en-NG", {
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
            const addonDef = (item.addons ?? []).find((a) => a.id === sa.id)
            const addonName =
              addonDef?.name ??
              (sa as { id: string; name?: string; qty: number }).name ??
              sa.id
            const addonPrice = addonDef?.price ?? 0
            const addonTotal = addonPrice * sa.qty
            const addonLabel =
              (sa.qty > 1 ? sa.qty + "\u00d7 " : "") + addonName
            return (
              "<tr>" +
              '<td style="text-align:left;padding-bottom:2px;padding-left:10px;color:#555;font-size:7.5pt">+ ' +
              addonLabel +
              "</td>" +
              "<td></td><td></td>" +
              '<td style="text-align:right;padding-bottom:2px;color:#555;font-size:7.5pt">' +
              (addonTotal > 0
                ? NGN +
                  addonTotal.toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : "") +
              "</td>" +
              "</tr>"
            )
          })
          .join("")
        return mainRow + addonRows
      })
      .join("")

    const discountRow =
      discount && discount.amount > 0
        ? '<div class="row"><span>Discount (' +
          (discount.type === "percent" ? discount.value + "%" : "flat") +
          "):</span><span>-" +
          fmtN(discount.amount) +
          "</span></div>"
        : ""

    const taxLabel =
      taxName + " (" + taxRate + "%" + (taxInclusive ? " incl." : "") + "):"
    const taxRow =
      taxEnabled && showTaxOnReceipt && vat > 0
        ? '<div class="row"><span>' +
          taxLabel +
          "</span><span>" +
          fmtN(vat) +
          "</span></div>"
        : ""

    const svcRow =
      serviceCharge > 0
        ? '<div class="row"><span>Service (' +
          serviceRate +
          "%):</span><span>" +
          fmtN(serviceCharge) +
          "</span></div>"
        : ""

    const changeRow =
      change > 0
        ? '<div class="row" style="color:#008a2e;font-weight:600"><span>Change:</span><span>' +
          fmtN(change) +
          "</span></div>"
        : ""

    // Receipt header/footer from posConfig
    const headerHtml = posConfig.receiptHeader
      .split("\n")
      .map((line) =>
        line.trim()
          ? '<div class="c" style="font-size:8pt">' + line + "</div>"
          : ""
      )
      .join("")
    const footerHtml = posConfig.receiptFooter
      .split("\n")
      .map((line) =>
        line.trim()
          ? '<div class="c" style="font-size:8pt">' + line + "</div>"
          : ""
      )
      .join("")

    return (
      "<!DOCTYPE html><html><head>" +
      '<meta charset="UTF-8">' +
      "<title>Receipt-" +
      txnNo +
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
      "svg{display:block;margin:0 auto}" +
      "</style></head><body>" +
      '<div class="c b" style="font-size:14pt;letter-spacing:3px;margin-bottom:2px">' +
      restaurantName.toUpperCase() +
      "</div>" +
      '<div class="c" style="font-size:8pt">Point of Sale Receipt</div>' +
      (addressLine
        ? '<div class="c" style="font-size:8pt">' + addressLine + "</div>"
        : "") +
      (phoneLine
        ? '<div class="c" style="font-size:8pt">' + phoneLine + "</div>"
        : "") +
      (headerHtml ? headerHtml : "") +
      '<div class="dash"></div>' +
      '<div class="row"><span>Date:</span><span>' +
      dateStr +
      "</span></div>" +
      '<div class="row"><span>Time:</span><span>' +
      timeStr +
      "</span></div>" +
      '<div class="row"><span>Receipt #:</span><span class="b" style="font-size:7.5pt">' +
      txnNo +
      "</span></div>" +
      '<div class="row"><span>Customer:</span><span>' +
      (customerName || "Walk-in") +
      "</span></div>" +
      '<div class="row"><span>Cashier:</span><span>' +
      (cashierName || "POS") +
      "</span></div>" +
      (tableNo
        ? '<div class="row"><span>Table:</span><span>' +
          tableNo +
          "</span></div>"
        : "") +
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
      fmtN(subtotal) +
      "</span></div>" +
      discountRow +
      taxRow +
      svcRow +
      '<div class="solid"></div>' +
      '<div class="total"><span>TOTAL:</span><span>' +
      fmtN(total) +
      "</span></div>" +
      '<div class="row"><span>Payment:</span><span class="b">' +
      method.toUpperCase() +
      "</span></div>" +
      (method === "cash" && tendered > 0
        ? '<div class="row"><span>Tendered:</span><span>' +
          fmtN(tendered) +
          "</span></div>"
        : "") +
      changeRow +
      '<div class="dash"></div>' +
      '<div class="c" style="margin:5px 0;font-size:8pt">Items: ' +
      totalItems +
      " pcs" +
      (taxEnabled && taxInclusive ? " | " + taxName + " Inclusive" : "") +
      "</div>" +
      '<div class="dash"></div>' +
      '<div class="c b" style="margin-bottom:2px">THANK YOU FOR YOUR PATRONAGE!</div>' +
      (footerHtml
        ? footerHtml
        : '<div class="c" style="font-size:8pt">Please retain this receipt</div>') +
      '<div class="c" style="font-size:8pt;margin-top:4px">Tablix POS System</div>' +
      "</body></html>"
    )
  }

  const handlePrint = () => {
    const html = buildThermalHtml()
    const iframe = document.createElement("iframe")
    iframe.style.cssText =
      "position:absolute;width:0;height:0;border:0;top:-9999px;left:-9999px"
    document.body.appendChild(iframe)
    const doc = iframe.contentWindow?.document
    if (!doc) return
    doc.open()
    doc.write(html)
    doc.close()
    iframe.contentWindow?.focus()
    setTimeout(() => {
      iframe.contentWindow?.print()
      setTimeout(() => document.body.removeChild(iframe), 1500)
    }, 300)
  }

  // On-screen receipt styles
  const S = {
    root: {
      fontFamily: "'Courier New', Courier, monospace",
      color: "#111",
      fontSize: 11,
    } as React.CSSProperties,
    row: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: "6px",
      marginBottom: "3px",
    } as React.CSSProperties,
    dash: {
      borderTop: "1px dashed #aaa",
      margin: "7px 0",
    } as React.CSSProperties,
    thinSolid: {
      borderTop: "1px solid #111",
      margin: "6px 0",
    } as React.CSSProperties,
    solid: {
      borderTop: "2px solid #111",
      margin: "6px 0",
    } as React.CSSProperties,
    center: { textAlign: "center" as const },
    bold: { fontWeight: 700 } as React.CSSProperties,
    muted: { color: "#666", fontSize: 9.5 } as React.CSSProperties,
    label: { color: "#444", flexShrink: 0 } as React.CSSProperties,
    value: {
      textAlign: "right" as const,
      wordBreak: "break-all" as const,
    } as React.CSSProperties,
    th: {
      fontWeight: 700,
      textAlign: "right" as const,
      paddingBottom: 4,
      fontSize: 9.5,
      borderBottom: "1px solid #111",
    } as React.CSSProperties,
    td: {
      textAlign: "right" as const,
      paddingBottom: 3,
      verticalAlign: "top" as const,
      fontSize: 9.5,
    } as React.CSSProperties,
  }

  return (
    <div className="flex w-full flex-col gap-[16px]">
      {/* On-screen receipt preview */}
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 0 0 1px #e5e7eb, 0px 4px 16px 0px rgba(0,0,0,0.08)",
          padding: "20px 18px",
          maxWidth: 340,
          margin: "0 auto",
          width: "100%",
          ...S.root,
        }}
      >
        {/* Store header */}
        <div style={{ ...S.center, marginBottom: 2 }}>
          <div
            style={{
              ...S.bold,
              fontSize: 17,
              letterSpacing: 3,
              marginBottom: 2,
            }}
          >
            TABLIX
          </div>
          <div style={{ fontSize: 9.5, color: "#444" }}>
            Point of Sale Receipt
          </div>
          <div style={{ fontSize: 9, color: "#666" }}>
            3b Agboyi Rd, Ogudu Orioke, Lagos
          </div>
          <div style={{ fontSize: 9, color: "#666" }}>
            Tel: 09012059519 | info@tablix.com
          </div>
        </div>

        <div style={S.dash} />

        {/* Meta */}
        {[
          { label: "Date:", value: dateStr },
          { label: "Time:", value: timeStr },
          { label: "Receipt #:", value: txnNo, small: true },
          { label: "Customer:", value: customerName || "Walk-in Customer" },
          { label: "Cashier:", value: cashierName || "POS" },
          ...(tableNo ? [{ label: "Table:", value: tableNo }] : []),
        ].map(({ label, value, small }) => (
          <div key={label} style={S.row}>
            <span style={S.label}>{label}</span>
            <span
              style={{
                ...S.value,
                fontWeight: label === "Receipt #:" ? 700 : 400,
                fontSize: small ? 9 : 10.5,
                wordBreak: "break-all",
              }}
            >
              {value}
            </span>
          </div>
        ))}

        <div style={S.dash} />

        {/* Items table */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...S.th, textAlign: "left", width: "44%" }}>ITEM</th>
              <th style={{ ...S.th, width: "8%" }}>QTY</th>
              <th style={{ ...S.th, width: "24%" }}>UNIT</th>
              <th style={{ ...S.th, width: "24%" }}>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => {
              const variant = item.variants?.find(
                (v) => v.id === item.selectedVariantId
              )
              const displayName = variant
                ? `${item.name} (${variant.name})`
                : item.name
              const unitPrice =
                item.qty > 0 ? item.price / item.qty : item.price
              const addonSubRows = (item.selectedAddons ?? []).map((sa) => {
                const addonDef = (item.addons ?? []).find((a) => a.id === sa.id)
                const addonName =
                  addonDef?.name ??
                  (sa as { id: string; name?: string; qty: number }).name ??
                  sa.id
                const addonPrice = addonDef?.price ?? 0
                const addonTotal = addonPrice * sa.qty
                const addonLabel =
                  (sa.qty > 1 ? `${sa.qty}\u00d7 ` : "") + addonName
                return (
                  <tr key={sa.id}>
                    <td
                      style={{
                        ...S.td,
                        textAlign: "left",
                        paddingLeft: 10,
                        ...S.muted,
                      }}
                      colSpan={3}
                    >
                      + {addonLabel}
                    </td>
                    <td style={{ ...S.td, ...S.muted }}>
                      {NGN}
                      {addonTotal.toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                )
              })
              return (
                <React.Fragment key={idx}>
                  <tr>
                    <td
                      style={{
                        ...S.td,
                        textAlign: "left",
                        wordBreak: "break-word",
                      }}
                    >
                      {displayName}
                    </td>
                    <td style={S.td}>{item.qty}</td>
                    <td style={S.td}>
                      {NGN}
                      {unitPrice.toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td style={{ ...S.td, ...S.bold }}>
                      {NGN}
                      {item.price.toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                  {addonSubRows}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>

        <div style={S.thinSolid} />

        {/* Totals */}
        <div style={S.row}>
          <span style={S.label}>Subtotal:</span>
          <span style={S.value}>{fmtN(subtotal)}</span>
        </div>

        {/* Discount row */}
        {discount && discount.amount > 0 && (
          <div style={{ ...S.row, color: "#008a2e" }}>
            <span style={S.label}>
              Discount (
              {discount.type === "percent" ? `${discount.value}%` : "flat"}):
            </span>
            <span style={S.value}>-{fmtN(discount.amount)}</span>
          </div>
        )}

        {/* Tax row */}
        {taxEnabled && showTaxOnReceipt && vat > 0 && (
          <div style={S.row}>
            <span style={S.label}>
              {taxName} ({taxRate}%{taxInclusive ? " incl." : ""}):
            </span>
            <span style={S.value}>{fmtN(vat)}</span>
          </div>
        )}

        {/* Service charge */}
        {serviceCharge > 0 && (
          <div style={S.row}>
            <span style={S.label}>Service ({serviceRate}%):</span>
            <span style={S.value}>{fmtN(serviceCharge)}</span>
          </div>
        )}

        <div style={S.solid} />

        {/* Total */}
        <div style={{ ...S.row, ...S.bold, fontSize: 13 }}>
          <span>TOTAL:</span>
          <span>{fmtN(total)}</span>
        </div>

        {/* Payment */}
        <div style={S.row}>
          <span style={S.label}>Payment:</span>
          <span style={{ ...S.value, ...S.bold }}>{method.toUpperCase()}</span>
        </div>

        {/* Tendered + Change (cash only) */}
        {method === "cash" && tendered > 0 && (
          <>
            <div style={S.row}>
              <span style={S.label}>Tendered:</span>
              <span style={S.value}>{fmtN(tendered)}</span>
            </div>
            {change > 0 && (
              <div style={{ ...S.row, color: "#008a2e", fontWeight: 600 }}>
                <span>Change:</span>
                <span style={S.value}>{fmtN(change)}</span>
              </div>
            )}
          </>
        )}

        <div style={S.dash} />

        {/* QR code */}
        <div style={{ ...S.center, margin: "6px 0" }}>
          <QRCodeSVG
            value={JSON.stringify({ id: txnNo, total, ts: Date.now() })}
            size={72}
            level="M"
            includeMargin={false}
          />
          <div style={{ fontSize: 8.5, marginTop: 3, color: "#555" }}>
            Scan to verify transaction
          </div>
        </div>

        <div style={S.dash} />

        {/* Footer */}
        <div style={S.center}>
          <div style={{ ...S.bold, fontSize: 10.5 }}>
            THANK YOU FOR YOUR PATRONAGE!
          </div>
          <div style={{ fontSize: 9, color: "#555", marginTop: 2 }}>
            Items: {totalItems} pcs
            {taxEnabled && taxInclusive ? " | " + taxName + " Inclusive" : ""}
          </div>
          <div style={{ fontSize: 9, color: "#555" }}>
            Please retain this receipt
          </div>
          <div style={{ fontSize: 8.5, color: "#888", marginTop: 3 }}>
            Tablix POS System
          </div>
        </div>
      </div>

      {/* Footer buttons */}
      <div className="flex w-full gap-3">
        <Button variant="outline" size="md" fullWidth onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={handlePrint}
          leftIcon={<PrinterIcon />}
        >
          Print (80mm Thermal)
        </Button>
      </div>
    </div>
  )
}

// --- Checkout Flow Modal ---

export function CheckoutFlow({
  cart,
  subtotal,
  discount,
  vat,
  taxName,
  taxRate,
  taxEnabled,
  taxInclusive,
  showTaxOnReceipt,
  serviceCharge,
  serviceRate,
  total,
  customerName,
  tableNo,
  cashierName,
  initialMethod = "cash",
  onClose,
  onComplete,
}: CheckoutFlowProps) {
  const [step, setStep] = useState<FlowStep>("confirm")
  const [method, setMethod] = useState<PaymentMethodType>("cash")
  const [tendered, setTendered] = useState(0)
  const [txnNo] = useState(generateTxnNo())

  const handleComplete = (
    selectedMethod: PaymentMethodType,
    cashTendered: number
  ) => {
    setMethod(selectedMethod)
    setTendered(cashTendered)
    setStep("success")
    const methodName =
      selectedMethod.charAt(0).toUpperCase() + selectedMethod.slice(1)
    onComplete(methodName, cashTendered)
  }

  const handleClose = () => {
    onClose()
  }

  const handleViewReceipt = () => {
    setStep("receipt")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        style={{ backdropFilter: "blur(3px)" }}
        onClick={step === "confirm" ? handleClose : undefined}
      />

      {/* Modal shell */}
      <div
        className="relative flex max-h-[90vh] w-full flex-col overflow-y-auto bg-[var(--page-bg)]"
        style={{
          maxWidth: step === "receipt" ? "440px" : "520px",
          borderRadius: "12px",
          boxShadow:
            "0px 20px 24px -4px rgba(16,24,40,0.1), 0px 8px 8px -4px rgba(16,24,40,0.04)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div
          className="flex shrink-0 items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid var(--page-border)" }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 17,
              color: "var(--page-text)",
            }}
          >
            {step === "confirm"
              ? "Complete Payment"
              : step === "success"
                ? "Payment Successful"
                : "Receipt"}
          </p>
          {step !== "success" && (
            <button
              onClick={handleClose}
              className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-[var(--page-surface-2)]"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="var(--page-text-muted)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Modal body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === "confirm" && (
            <ConfirmPaymentScreen
              total={total}
              initialMethod={initialMethod}
              onCancel={handleClose}
              onComplete={handleComplete}
            />
          )}
          {step === "success" && (
            <SuccessScreen
              total={total}
              method={method}
              txnNo={txnNo}
              onClose={handleClose}
              onViewReceipt={handleViewReceipt}
            />
          )}
          {step === "receipt" && (
            <PrintReceiptScreen
              cart={cart}
              subtotal={subtotal}
              discount={discount}
              vat={vat}
              taxName={taxName}
              taxRate={taxRate}
              taxEnabled={taxEnabled}
              taxInclusive={taxInclusive}
              showTaxOnReceipt={showTaxOnReceipt}
              serviceCharge={serviceCharge}
              serviceRate={serviceRate}
              total={total}
              method={method}
              tendered={tendered}
              txnNo={txnNo}
              customerName={customerName}
              tableNo={tableNo}
              cashierName={cashierName}
              onClose={handleClose}
            />
          )}
        </div>
      </div>
    </div>
  )
}
