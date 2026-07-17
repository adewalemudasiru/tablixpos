import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "./ds";
import { useAppStore } from "../store/AppContext";
import type { StoreCustomer } from "../store/AppContext";
import { customersAPI } from "../services/api";

// --- Types ---

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

const WALK_IN: Customer = { id: "walk-in", name: "Walk-in Customer", phone: "" };

// --- Shared field styles ---

const INTER = "'Inter', sans-serif";

// --- Add Customer Modal content ---

function AddCustomerModal({
  onCancel,
  onAdd,
}: {
  onCancel: () => void;
  onAdd: (c: Customer) => void;
}) {
  const [name,  setName]  = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const handleSubmit = () => {
    const errs: { name?: string; phone?: string } = {};
    if (!name.trim())  errs.name  = "Name is required";
    if (!phone.trim()) errs.phone = "Phone is required";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onAdd({ id: Date.now().toString(), name: name.trim(), phone: phone.trim(), email: email.trim() || undefined });
  };

  const field = (
    label: string,
    value: string,
    onChange: (v: string) => void,
    placeholder: string,
    type = "text",
    error?: string,
  ) => (
    <div className="flex flex-col gap-[6px] w-full">
      <p style={{ fontFamily: INTER, fontWeight: 500, fontSize: 14, lineHeight: "20px", color: "var(--page-text)" }}>
        {label}
      </p>
      <div className="bg-[var(--page-bg)] relative rounded-[8px] w-full">
        <div
          aria-hidden="true"
          className={`absolute border border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] ${error ? "border-[var(--c-danger)]" : "border-[var(--page-border)]"}`}
        />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => { onChange(e.target.value); if (error) setErrors((p) => ({ ...p, [label.toLowerCase()]: undefined })); }}
          className="w-full px-[14px] py-[10px] outline-none bg-transparent rounded-[8px] text-[14px] text-[var(--page-text)] placeholder-[var(--page-text-muted)]"
          style={{ fontFamily: INTER, fontWeight: 400, lineHeight: "24px" }}
        />
      </div>
      {error && <p style={{ fontFamily: INTER, fontSize: 11, color: "var(--c-danger)" }}>{error}</p>}
    </div>
  );

  return (
    <div className="bg-[var(--page-bg)] flex flex-col gap-[20px] items-end p-[25px] relative rounded-[10px] w-full">
      <div aria-hidden="true" className="absolute border border-[var(--page-border)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.12),0px_4px_6px_0px_rgba(0,0,0,0.08)]" />

      {/* Header */}
      <div className="flex flex-col items-start w-full shrink-0">
        <p style={{ fontFamily: INTER, fontWeight: 500, fontSize: 16, lineHeight: "24px", color: "var(--page-text)", letterSpacing: "-0.55px" }}>
          Add New Customer
        </p>
        <p style={{ fontFamily: INTER, fontWeight: 400, fontSize: 14, lineHeight: "20px", color: "var(--page-text-secondary)" }}>
          Create a new customer profile
        </p>
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-[16px] w-full shrink-0">
        {field("Name",            name,  setName,  "Enter name",    "text",  errors.name)}
        {field("Phone",           phone, setPhone, "09012059519",   "tel",   errors.phone)}
        {field("Email ( Optional )", email, setEmail, "Enter email", "email")}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between w-full shrink-0">
        <Button variant="outline" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" size="sm" onClick={handleSubmit}>
          Add Customer
        </Button>
      </div>
    </div>
  );
}

// --- Select Customer Modal content ---

function SelectCustomerModal({
  selected,
  onSelect,
  onCancel,
  onAddCustomer,
}: {
  selected: Customer;
  onSelect: (c: Customer) => void;
  onCancel: () => void;
  onAddCustomer: () => void;
}) {
  const [search, setSearch] = useState("");
  const [localSelected, setLocalSelected] = useState<Customer>(selected);
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);

  // Fetch from backend on open
  useEffect(() => {
    customersAPI.list({ limit: 200 }).then((res) => {
      setAllCustomers(res.data.customers.map((c) => ({
        id: c.id,
        name: `${c.firstName} ${c.lastName}`,
        phone: c.phone,
        email: c.email ?? undefined,
      })));
    }).catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return allCustomers;
    const q = search.toLowerCase();
    return allCustomers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        (c.email && c.email.toLowerCase().includes(q)),
    );
  }, [search, allCustomers]);

  const showWalkIn = !search.trim() || "walk-in customer".includes(search.toLowerCase());

  const OptionRow = ({ customer, isWalkIn = false }: { customer?: Customer; isWalkIn?: boolean }) => {
    const c = isWalkIn ? WALK_IN : customer!;
    const isActive = localSelected.id === c.id;
    return (
      <button
        onClick={() => setLocalSelected(c)}
        className={`relative rounded-[5px] w-full text-left transition-colors ${isActive ? "bg-[var(--c-primary-bg)]" : "hover:bg-black/5 dark:hover:bg-white/5"}`}
      >
        <div
          aria-hidden="true"
          className={`absolute border border-solid inset-0 pointer-events-none rounded-[5px] ${isActive ? "border-[var(--c-primary-border)]" : "border-transparent"}`}
        />
        <div className="flex items-center justify-between px-[10px] py-[7px] w-full">
          <div className="flex flex-col items-start min-w-0">
            {isWalkIn ? (
              <p style={{ fontFamily: INTER, fontWeight: 400, fontSize: 12, lineHeight: "22.4px", color: "var(--page-text)" }}>
                Walk-in Customer
              </p>
            ) : (
              <>
                <p style={{ fontFamily: INTER, fontWeight: 500, fontSize: 12, lineHeight: "22.4px", color: "var(--page-text)" }}>
                  {c.name}
                </p>
                <p style={{ fontFamily: INTER, fontWeight: 400, fontSize: 12, lineHeight: "22.4px", color: "var(--page-text-secondary)" }}>
                  {c.phone}
                </p>
              </>
            )}
          </div>
          {isActive && (
            <svg width="18" height="18" fill="none" viewBox="0 0 20 20" className="shrink-0 ml-2">
              <path d="M16.6667 5L7.5 14.1667L3.33333 10" stroke="var(--c-primary)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          )}
        </div>
      </button>
    );
  };

  return (
    <div className="bg-[var(--page-bg)] relative rounded-[10px] w-full p-[17px]">
      <div aria-hidden="true" className="absolute border border-[var(--page-border)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />

      <div className="flex flex-col gap-[14px] w-full">
        {/* Search */}
        <div className="bg-[var(--page-surface)] h-[40px] relative rounded-[6.8px] w-full">
          <div aria-hidden="true" className="absolute border border-[var(--page-border)] border-solid inset-0 pointer-events-none rounded-[6.8px]" />
          <div className="flex items-center h-full px-[10px] gap-[6px]">
            <svg width="14" height="14" fill="none" viewBox="0 0 16 16" className="shrink-0 text-[var(--page-text-muted)]">
              <path d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, phone, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              className="flex-1 h-full outline-none bg-transparent text-[13px] text-[var(--page-text)] placeholder-[var(--page-text-muted)]"
              style={{ fontFamily: INTER, fontWeight: 400 }}
            />
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-[8px] w-full max-h-[220px] overflow-y-auto pr-[2px]">
          {showWalkIn && <OptionRow isWalkIn />}
          {filtered.map((c) => (
            <OptionRow key={c.id} customer={c} />
          ))}
          {filtered.length === 0 && search.trim() && (
            <p className="text-center py-3" style={{ fontFamily: INTER, fontSize: 12, color: "var(--page-text-muted)" }}>
              No customers found
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between w-full shrink-0 pt-[2px]">
          <Button variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onAddCustomer}>
              + New
            </Button>
            <Button variant="primary" size="sm" onClick={() => onSelect(localSelected)}>
              Select
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Portal overlay wrapper ---

function ModalPortal({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 9999 }}
      onClick={onClose}
    >
      {/* Full-viewport dimmed backdrop */}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.45)" }} />
      {/* Content panel - stop click from bubbling to backdrop */}
      <div
        className="relative w-full"
        style={{ maxWidth: "360px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

// --- Public component: CustomerDropdown ---

export function CustomerDropdown({
  selected,
  onSelect,
  customTrigger,
}: {
  selected?: Customer;
  onSelect: (c: Customer) => void;
  customTrigger?: (onClick: () => void) => React.ReactNode;
}) {
  const { addCustomer } = useAppStore();
  const [open, setOpen]       = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const safeSelected: Customer = selected ?? WALK_IN;

  const close = () => { setOpen(false); setShowAdd(false); };

  const handleAddNew = async (c: Customer) => {
    // Save to backend
    try {
      const nameParts = c.name.trim().split(/\s+/);
      const firstName = nameParts[0] ?? c.name;
      const lastName  = nameParts.slice(1).join(" ") || "-";
      const res = await customersAPI.create({ firstName, lastName, phone: c.phone, email: c.email || undefined });
      const saved = res.data.customer;
      const newCustomer: StoreCustomer = {
        id:           saved.id,
        name:         `${saved.firstName} ${saved.lastName}`,
        phone:        saved.phone,
        email:        saved.email ?? "",
        totalSpent:   0,
        visitCount:   0,
        lastVisit:    saved.createdAt.split("T")[0],
        joinDate:     saved.createdAt.split("T")[0],
        loyaltyPoints: 0,
      };
      addCustomer(newCustomer);
      onSelect({ id: saved.id, name: newCustomer.name, phone: saved.phone, email: saved.email ?? undefined });
    } catch (_) {
      // Fallback: use local ID if backend fails
      const newCustomer: StoreCustomer = {
        id: c.id, name: c.name, phone: c.phone, email: c.email ?? "",
        totalSpent: 0, visitCount: 0,
        lastVisit: new Date().toISOString().split("T")[0],
        joinDate:  new Date().toISOString().split("T")[0],
        loyaltyPoints: 0,
      };
      addCustomer(newCustomer);
      onSelect(c);
    }
    close();
  };

  const handleSelect = (c: Customer) => {
    onSelect(c);
    close();
  };

  return (
    <div className="relative w-full">
      {/* Trigger button */}
      {customTrigger ? customTrigger(() => { setOpen(true); setShowAdd(false); }) : (
        <button
          onClick={() => { setOpen(true); setShowAdd(false); }}
          className="bg-[var(--page-bg)] relative rounded-[8px] w-full text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <div aria-hidden="true" className="absolute border border-[var(--page-border)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
          <div className="flex items-center gap-[8px] px-[14px] py-[10px] w-full">
            <p
              className="flex-1 text-[var(--page-text)] text-[14px] truncate"
              style={{ fontFamily: INTER, fontWeight: 400, lineHeight: "24px" }}
            >
              {safeSelected.id === "walk-in" ? "Walk-in Customer" : safeSelected.name}
            </p>
            {/* Chevron */}
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16" className="shrink-0 text-[var(--page-text-secondary)]">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </button>
      )}

      {/* Modal via portal */}
      {open && (
        <ModalPortal onClose={close}>
          {showAdd ? (
            <AddCustomerModal
              onCancel={() => setShowAdd(false)}
              onAdd={handleAddNew}
            />
          ) : (
            <SelectCustomerModal
              selected={safeSelected}
              onSelect={handleSelect}
              onCancel={close}
              onAddCustomer={() => setShowAdd(true)}
            />
          )}
        </ModalPortal>
      )}
    </div>
  );
}

export { WALK_IN };
export type { Customer as CustomerType };