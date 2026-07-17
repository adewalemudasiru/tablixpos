import React, { useState, useRef, useCallback } from 'react';
import { X, Download, Search, Printer, Calendar } from 'lucide-react';
import { Receipt } from './Receipt';
import {
  type Transaction,
  loadTransactions,
  exportTransactionsToCSV,
  downloadCSV
} from '../services/storage';

interface TransactionHistoryProps {
  onClose: () => void;
}

export function TransactionHistory({ onClose }: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  React.useEffect(() => {
    loadTransactions().then(setTransactions);
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const receiptRef = useRef<HTMLDivElement>(null);

  const [pendingPrint, setPendingPrint] = useState(false);

  // Print handler - native iframe-based print (no react-to-print dependency)
  const handlePrint = useCallback((transaction?: Transaction) => {
    const target = transaction ?? selectedTransaction;
    if (!target || !receiptRef.current) return;
    const html = receiptRef.current.innerHTML;
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:absolute;width:0;height:0;border:0;top:-9999px;left:-9999px';
    document.body.appendChild(iframe);
    const doc = iframe.contentWindow?.document;
    if (!doc) return;
    doc.open();
    doc.write(`<!DOCTYPE html><html><head><title>Receipt-${target.id}</title><style>@page{size:80mm auto;margin:4mm 5mm}*{box-sizing:border-box}body{font-family:'Courier New',Courier,monospace;font-size:9pt;color:#000;background:#fff;margin:0;padding:0;width:72mm}table{width:100%;border-collapse:collapse}th,td{font-family:inherit;font-size:inherit}svg{display:block;margin:0 auto}</style></head><body>${html}</body></html>`);
    doc.close();
    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();
    setTimeout(() => document.body.removeChild(iframe), 1000);
  }, [receiptRef, selectedTransaction]);

  // Trigger print after receipt renders
  React.useEffect(() => {
    if (pendingPrint && selectedTransaction && receiptRef.current) {
      handlePrint(selectedTransaction);
      setPendingPrint(false);
    }
  }, [pendingPrint, selectedTransaction, handlePrint]);

  const filteredTransactions = transactions.filter(t => {
    const query = searchQuery.toLowerCase();
    return (
      t.id.toLowerCase().includes(query) ||
      t.customer.name.toLowerCase().includes(query) ||
      t.items.some(item => item.name.toLowerCase().includes(query))
    );
  });

  const handleExport = () => {
    const csv = exportTransactionsToCSV(filteredTransactions);
    if (csv) {
      const timestamp = new Date().toISOString().split('T')[0];
      downloadCSV(csv, `tablix-transactions-${timestamp}.csv`);
    }
  };

  const totalSales = filteredTransactions.reduce((sum, t) => sum + t.total, 0);
  const totalOrders = filteredTransactions.length;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--page-bg)] border border-[var(--page-border)] rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--page-border)]">
          <div>
            <h2
              className="text-xl text-[var(--page-text)] mb-1"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}
            >
              Transaction History
            </h2>
            <p className="text-sm text-[var(--page-text-secondary)]">
              {totalOrders} transaction{totalOrders !== 1 ? 's' : ''} - {"\u20a6"}{totalSales.toLocaleString()} total
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/5 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-[var(--page-text-secondary)]" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3 p-4 bg-[var(--page-surface)] border-b border-[var(--page-border)]">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--page-text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, customer, or item..."
              className="w-full pl-10 pr-4 py-2 border border-[var(--page-border)] bg-[var(--page-bg)] text-[var(--page-text)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#e91835] focus:border-transparent placeholder-[var(--page-text-muted)]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </div>
          <button
            onClick={handleExport}
            disabled={filteredTransactions.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--page-bg)] border border-[var(--page-border)] rounded-lg text-sm font-medium text-[var(--page-text)] hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Transactions List */}
        <div className="flex-1 overflow-y-auto p-4 bg-[var(--page-surface)]">
          {filteredTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Calendar className="w-12 h-12 text-[var(--page-text-muted)] mb-3 opacity-50" />
              <p className="text-[var(--page-text-secondary)] text-sm mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                {searchQuery ? 'No transactions found' : 'No transactions yet'}
              </p>
              <p className="text-[var(--page-text-muted)] text-xs">
                {searchQuery ? 'Try a different search term' : 'Completed orders will appear here'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTransactions.map((transaction) => {
                const date = new Date(transaction.timestamp);
                const dateStr = date.toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short'
                });
                const timeStr = date.toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <div
                    key={transaction.id}
                    className="bg-[var(--page-bg)] border border-[var(--page-border)] rounded-lg p-4 hover:opacity-90 transition-opacity cursor-pointer"
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p
                          className="text-sm font-semibold text-[var(--page-text)] mb-0.5"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {transaction.id}
                        </p>
                        <p className="text-xs text-[var(--page-text-secondary)]">
                          {dateStr} at {timeStr}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className="text-base font-bold text-[var(--page-text)]"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {"\u20a6"}{transaction.total.toLocaleString()}
                        </p>
                        <span
                          className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1"
                          style={{
                            background: '#ecfdf3',
                            color: '#008a2e',
                            fontFamily: "'Inter', sans-serif"
                          }}
                        >
                          {transaction.paymentMethod}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[var(--page-border)]">
                      <p className="text-xs text-[var(--page-text-secondary)]">
                        <span className="font-medium text-[var(--page-text)]">{transaction.customer.name}</span>
                        {' | '}
                        {transaction.items.length} item{transaction.items.length !== 1 ? 's' : ''}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTransaction(transaction);
                          setPendingPrint(true);
                        }}
                        className="p-1.5 hover:bg-black/5 rounded transition-colors text-[var(--page-text-secondary)]"
                        title="Print receipt"
                      >
                        <Printer className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Receipt (hidden, for printing) */}
      <div className="hidden">
        {selectedTransaction && <Receipt ref={receiptRef} transaction={selectedTransaction} />}
      </div>
    </div>
  );
}