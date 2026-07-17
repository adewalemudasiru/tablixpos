import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { Transaction } from '../services/storage';
import { useAppStore } from '../store/AppContext';

interface ReceiptProps {
  transaction: Transaction;
}

const NGN = '\u20a6';

function fmtN(n: number): string {
  return NGN + n.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// All styles inline so the component is fully self-contained for printing
const S = {
  root: {
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: '9pt',
    color: '#111',
    background: '#fff',
    width: '72mm',
    margin: '0 auto',
    padding: '4mm 3mm',
  } as React.CSSProperties,
  center: { textAlign: 'center' } as React.CSSProperties,
  bold: { fontWeight: 700 } as React.CSSProperties,
  dash: { borderTop: '1px dashed #999', margin: '6px 0' } as React.CSSProperties,
  thinSolid: { borderTop: '1px solid #111', margin: '6px 0' } as React.CSSProperties,
  solid: { borderTop: '2.5px solid #111', margin: '6px 0' } as React.CSSProperties,
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: '6px',
    marginBottom: '3px',
  } as React.CSSProperties,
  label: { color: '#444', flexShrink: 0 } as React.CSSProperties,
  value: { textAlign: 'right', wordBreak: 'break-all' } as React.CSSProperties,
  muted: { color: '#666', fontSize: '8pt' } as React.CSSProperties,
  table: { width: '100%', borderCollapse: 'collapse' as const },
  th: {
    paddingBottom: '3px',
    fontWeight: 700,
    borderBottom: '1px solid #111',
    fontSize: '8.5pt',
  } as React.CSSProperties,
  td: { paddingBottom: '3px', verticalAlign: 'top', fontSize: '8.5pt' } as React.CSSProperties,
};

export const Receipt = React.forwardRef<HTMLDivElement, ReceiptProps>(
  ({ transaction }, ref) => {
    // Read live context for business info and POS config
    const { restaurantName, businessConfig, posConfig, logo } = useAppStore();

    const date = new Date(transaction.timestamp);
    const dateStr = date.toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
    const timeStr = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    const payMethod = (transaction.paymentMethod || 'Cash').toUpperCase();
    const totalItems = transaction.items.reduce((s, i) => s + i.qty, 0);

    // Tax snapshot from the transaction itself (not current settings)
    const txTaxLabel = transaction.taxLabel || 'VAT';
    const txTaxRate  = transaction.taxRate  ?? 0;
    const txInclusive = transaction.taxInclusive ?? false;
    const txSvcCharge = transaction.serviceCharge ?? 0;

    // Business address line from context
    const addressLine = [businessConfig.address, businessConfig.city, businessConfig.state]
      .filter(Boolean).join(', ');

    // Receipt header/footer lines from POS config (split on newlines)
    const headerLines = posConfig.receiptHeader.split('\n').filter(Boolean);
    const footerLines = posConfig.receiptFooter.split('\n').filter(Boolean);

    return (
      <div ref={ref} style={S.root}>

        {/* Store Header */}
        <div style={{ ...S.center, marginBottom: 3 }}>
          {posConfig.showLogo && logo && (
            <div style={{ marginBottom: 8 }}>
              <img
                src={logo}
                alt="Business Logo"
                style={{
                  maxWidth: '40mm',
                  maxHeight: '15mm',
                  objectFit: 'contain',
                  filter: 'grayscale(1) contrast(1.5)', // Better for thermal printers
                }}
              />
            </div>
          )}
          <div style={{ ...S.bold, fontSize: '14pt', letterSpacing: '3px', marginBottom: '2px' }}>
            {restaurantName.toUpperCase()}
          </div>
          <div style={{ fontSize: '8.5pt', color: '#222' }}>Point of Sale Receipt</div>
          {addressLine && (
            <div style={{ fontSize: '8pt', color: '#555' }}>{addressLine}</div>
          )}
          {businessConfig.phone && (
            <div style={{ fontSize: '8pt', color: '#555' }}>
              Tel: {businessConfig.phone}
              {businessConfig.email ? ' | ' + businessConfig.email : ''}
            </div>
          )}
          {/* headerLines intentionally NOT rendered here -- they render in the footer below */}
        </div>

        <div style={S.dash} />

        {/* Transaction Meta */}
        <div>
          {[
            { label: 'Date:', value: dateStr },
            { label: 'Time:', value: timeStr },
          ].map(({ label, value }) => (
            <div key={label} style={S.row}>
              <span style={S.label}>{label}</span>
              <span style={S.value}>{value}</span>
            </div>
          ))}
          <div style={S.row}>
            <span style={S.label}>Receipt #:</span>
            <span style={{ ...S.value, ...S.bold, fontSize: '7.5pt', wordBreak: 'break-all' }}>
              {transaction.id}
            </span>
          </div>
          <div style={S.row}>
            <span style={S.label}>Customer:</span>
            <span style={S.value}>{transaction.customer.name}</span>
          </div>
          {transaction.customer.phone && (
            <div style={S.row}>
              <span style={S.label}>Phone:</span>
              <span style={S.value}>{transaction.customer.phone}</span>
            </div>
          )}
          {transaction.cashier && (
            <div style={S.row}>
              <span style={S.label}>Cashier:</span>
              <span style={S.value}>{transaction.cashier}</span>
            </div>
          )}
          {transaction.tableNo && (
            <div style={S.row}>
              <span style={S.label}>Table:</span>
              <span style={{ ...S.value, ...S.bold }}>{transaction.tableNo}</span>
            </div>
          )}
        </div>

        <div style={S.dash} />

        {/* Items Table */}
        <table style={S.table}>
          <thead>
            <tr>
              <th style={{ ...S.th, textAlign: 'left', width: '44%' }}>ITEM</th>
              <th style={{ ...S.th, textAlign: 'right', width: '10%' }}>QTY</th>
              <th style={{ ...S.th, textAlign: 'right', width: '23%' }}>UNIT</th>
              <th style={{ ...S.th, textAlign: 'right', width: '23%' }}>AMT</th>
            </tr>
          </thead>
          <tbody>
            {transaction.items.map((item, i) => {
              const unitPrice = item.qty > 0 ? item.price / item.qty : item.price;
              const addonRows = (item.selectedAddons ?? []).map((sa) => {
                const addonName = (sa as { id: string; name?: string; qty: number }).name || sa.id;
                const addonLabel = (sa.qty > 1 ? sa.qty + '\u00d7 ' : '') + addonName;
                return (
                  <tr key={sa.id}>
                    <td
                      colSpan={3}
                      style={{ ...S.td, textAlign: 'left', paddingLeft: 10, ...S.muted }}
                    >
                      + {addonLabel}
                    </td>
                    <td style={{ ...S.td, textAlign: 'right', ...S.muted }}></td>
                  </tr>
                );
              });
              return [
                <tr key={`item-${i}`}>
                  <td style={{ ...S.td, textAlign: 'left', wordBreak: 'break-word' }}>{item.name}</td>
                  <td style={{ ...S.td, textAlign: 'right' }}>{item.qty}</td>
                  <td style={{ ...S.td, textAlign: 'right' }}>{fmtN(unitPrice)}</td>
                  <td style={{ ...S.td, textAlign: 'right', ...S.bold }}>{fmtN(item.price)}</td>
                </tr>,
                ...addonRows,
              ];
            })}
          </tbody>
        </table>

        <div style={S.thinSolid} />

        {/* Subtotals */}
        <div style={S.row}>
          <span style={S.label}>Subtotal:</span>
          <span style={S.value}>{fmtN(transaction.subtotal)}</span>
        </div>

        {/* Discount row */}
        {transaction.discount && transaction.discount.amount > 0 && (
          <div style={{ ...S.row, color: '#008a2e' }}>
            <span style={S.label}>
              Discount ({transaction.discount.type === 'percent'
                ? transaction.discount.value + '%'
                : 'flat'}):
            </span>
            <span style={S.value}>-{fmtN(transaction.discount.amount)}</span>
          </div>
        )}

        {/* Tax row -- uses transaction snapshot, not current settings */}
        {transaction.vat > 0 && (
          <div style={S.row}>
            <span style={S.label}>
              {txTaxLabel} ({txTaxRate}%{txInclusive ? ' incl.' : ''}):
            </span>
            <span style={S.value}>{fmtN(transaction.vat)}</span>
          </div>
        )}

        {/* Service charge row */}
        {txSvcCharge > 0 && (
          <div style={S.row}>
            <span style={S.label}>Service Charge:</span>
            <span style={S.value}>{fmtN(txSvcCharge)}</span>
          </div>
        )}

        <div style={S.solid} />

        {/* Total */}
        <div style={{ ...S.row, ...S.bold, fontSize: '11pt' }}>
          <span>TOTAL:</span>
          <span>{fmtN(transaction.total)}</span>
        </div>

        {/* Payment method */}
        <div style={S.row}>
          <span style={S.label}>Payment:</span>
          <span style={{ ...S.value, ...S.bold }}>{payMethod}</span>
        </div>

        {/* Void/Refund status banner */}
        {transaction.status && transaction.status !== 'completed' && (
          <div style={{ ...S.center, marginTop: 6, padding: '4px 0', background: '#fee2e2', borderRadius: 4 }}>
            <span style={{ ...S.bold, fontSize: '9pt', color: '#991b1b', letterSpacing: 1 }}>
              ** {transaction.status.toUpperCase()} **
            </span>
          </div>
        )}

        <div style={S.dash} />

        {/* QR Code (controlled by posConfig.showQR) */}
        {posConfig.showQR && (
          <div style={{ ...S.center, margin: '5px 0' }}>
            <QRCodeSVG
              value={JSON.stringify({
                id: transaction.id,
                total: transaction.total,
                ts: transaction.timestamp,
              })}
              size={80}
              level="M"
              includeMargin={false}
            />
            <div style={{ fontSize: '7.5pt', marginTop: '2px', color: '#666' }}>
              Scan to verify transaction
            </div>
          </div>
        )}

        <div style={S.dash} />

        {/* Footer */}
        <div style={{ ...S.center }}>
          {headerLines.length > 0
            ? headerLines.map((line, i) => (
                <div key={i} style={{ ...S.bold, fontSize: '9pt', marginBottom: i === 0 ? 2 : 0 }}>{line}</div>
              ))
            : <div style={{ ...S.bold, fontSize: '9pt' }}>THANK YOU FOR YOUR PATRONAGE!</div>
          }
          <div style={{ fontSize: '8pt', color: '#555', marginTop: 2 }}>
            Items: {totalItems} pcs
            {txInclusive ? ' | ' + txTaxLabel + ' Inclusive' : ''}
          </div>
          {footerLines.map((line, i) => (
            <div key={i} style={{ fontSize: '8pt', color: '#555', marginTop: 1 }}>{line}</div>
          ))}
          <div style={{ fontSize: '8pt', color: '#888', marginTop: 4 }}>Tablix POS System</div>
        </div>

      </div>
    );
  }
);

Receipt.displayName = 'Receipt';