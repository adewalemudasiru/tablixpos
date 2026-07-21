import { CheckoutFlow } from "../components/CheckoutFlow"
import { LogoutConfirmationModal } from "../components/LogoutConfirmationModal"
import { TransactionHistory } from "../components/TransactionHistory"
import { Receipt } from "../components/Receipt"
import { ManagerOverrideModal } from "../components/ManagerOverrideModal"
import { ShiftCloseModal } from "../components/ShiftCloseModal"
import { toast, Toaster } from "sonner"
import { PrinterNotConnectedModal } from "../components/PrinterNotConnectedModal"
import TablesPage from "./TablesPage"
import OrderHistoryPage from "./OrderHistoryPage"
import CustomerPage from "./CustomerPage"
import {
  AddonModal,
  DashboardHeader,
  DashboardSearchModal,
  CartItemList,
  PosKeypad,
  CategorySidebar,
  ProductGrid,
  DashboardBottomNav,
} from "@/components/dashboard"
import { useDashboard } from "@/hooks/useDashboard"

// --- Dashboard Page ----------------------------------------------------------

export default function DashboardPage() {
  const {
    activeStaff,
    setActiveStaff,
    staff,
    transactions,
    taxConfig,
    restaurantName,
    tables,
    tablesEnabled,
    theme,
    kotEnabled,

    navigate,

    printer,
    lastReceiptData,
    lastTransaction,
    receiptRef,
    handlePrint,

    activeTab,
    setActiveTab,

    search,
    setSearch,
    showSearchModal,
    setShowSearchModal,

    products,
    filteredProducts,
    CATEGORY_ITEMS,
    activeCategory,
    setActiveCategory,
    addonProduct,
    setAddonProduct,

    cart,
    selectedCartIdx,
    setSelectedCartIdx,
    setKeypadInput,
    guardedClearCart,
    guardedRemoveItem,
    addCartItem,
    handleProductAdd,
    handleKeypadPress,

    selectedCustomer,
    setSelectedCustomer,
    tableNo,
    switchTable,

    discount,
    cartDiscountAmount,
    cartVat,
    cartSvcCharge,
    cartTotal,

    orderSuccess,
    checkoutOpen,
    setCheckoutOpen,
    checkoutInitialMethod,
    showHistory,
    setShowHistory,
    showLogout,
    setShowLogout,
    overrideRequest,
    setOverrideRequest,
    showShiftClose,
    setShowShiftClose,
    handleCheckout,
    handlePaymentComplete,
    handleSendToKitchenOrSaveTab,
  } = useDashboard()

  return (
    <div
      className={`flex h-screen flex-col overflow-hidden font-sans ${
        theme === "dark" ? "bg-[#1c1c1e] text-white" : "bg-[#f4f4f6] text-[#111827]"
      }`}
    >
      {/* Order success toast */}
      {orderSuccess && (
        <div className="fixed top-4 left-1/2 z-50 flex min-w-[220px] -translate-x-1/2 items-center gap-2 rounded-[8px] border border-[#bffcd9] bg-[#ecfdf3] px-4 py-3 shadow-lg">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <path
              clipRule="evenodd"
              d="M10 1.667A8.333 8.333 0 1 0 10 18.333 8.333 8.333 0 0 0 10 1.667Zm3.59 6.41a.833.833 0 0 0-1.18-1.18L9 10.32 7.59 8.91a.833.833 0 0 0-1.18 1.18l2 2c.325.326.855.326 1.18 0l4-4Z"
              fill="#008A2E"
              fillRule="evenodd"
            />
          </svg>
          <span
            className="text-[13px] text-[#008a2e]"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
          >
            Order Placed Successfully!
          </span>
        </div>
      )}

      {/* TOP HEADER */}
      <DashboardHeader
        theme={theme}
        activeStaffName={activeStaff?.name}
        hasLastTransaction={!!lastTransaction}
        onLogoutClick={() => setShowLogout(true)}
        onHistoryClick={() => setShowHistory(true)}
        onPrintClick={handlePrint}
        onSearchClick={() => setShowSearchModal(true)}
      />

      {/* SEARCH MODAL */}
      <DashboardSearchModal
        show={showSearchModal}
        theme={theme}
        search={search}
        onSearchChange={setSearch}
        onClose={() => setShowSearchModal(false)}
        products={products}
        onProductSelect={handleProductAdd}
      />

      {/* MAIN ROW */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* LEFT: CART & KEYPAD */}
        {activeTab === "pos" && (
          <aside
            className={`flex w-[45%] max-w-[540px] min-w-[400px] shrink-0 flex-col border-r ${
              theme === "dark"
                ? "border-[#3c3c3e] bg-[#2c2c2e]"
                : "border-[var(--page-border)] bg-[var(--page-surface)]"
            }`}
          >
            <CartItemList
              theme={theme}
              tableNo={tableNo}
              onClearCart={guardedClearCart}
              selectedCustomer={selectedCustomer}
              onSelectCustomer={setSelectedCustomer}
              tablesEnabled={tablesEnabled}
              tables={tables}
              onSwitchTable={switchTable}
              cart={cart}
              selectedCartIdx={selectedCartIdx}
              onSelectCartIdx={(idx) => {
                setSelectedCartIdx(idx)
                setKeypadInput("")
              }}
              onRemoveItem={guardedRemoveItem}
              discount={discount}
              cartDiscountAmount={cartDiscountAmount}
              taxEnabled={taxConfig.enabled}
              cartVat={cartVat}
              cartTotal={cartTotal}
              kotEnabled={kotEnabled}
              onSendToKitchenOrSaveTab={handleSendToKitchenOrSaveTab}
            />

            <PosKeypad
              theme={theme}
              cartLength={cart.length}
              cartTotal={cartTotal}
              onKeypadPress={handleKeypadPress}
              onCheckout={handleCheckout}
            />
          </aside>
        )}

        {activeTab === "pos" ? (
          <>
            {/* MIDDLE: CATEGORIES */}
            <CategorySidebar
              theme={theme}
              categoryItems={CATEGORY_ITEMS}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />

            {/* RIGHT: PRODUCTS */}
            <ProductGrid
              theme={theme}
              products={filteredProducts}
              onProductAdd={handleProductAdd}
            />
          </>
        ) : activeTab === "tables" ? (
          <div
            className={`flex flex-1 flex-col overflow-hidden ${
              theme === "dark" ? "bg-[#1c1c1e]" : "bg-[#f4f4f6]"
            }`}
          >
            <TablesPage isEmbedded />
          </div>
        ) : activeTab === "orders" ? (
          <div
            className={`flex flex-1 flex-col overflow-hidden ${
              theme === "dark" ? "bg-[#1c1c1e]" : "bg-[#f4f4f6]"
            }`}
          >
            <OrderHistoryPage isEmbedded />
          </div>
        ) : (
          <div
            className={`flex flex-1 flex-col overflow-hidden ${
              theme === "dark" ? "bg-[#1c1c1e]" : "bg-[#f4f4f6]"
            }`}
          >
            <CustomerPage isEmbedded />
          </div>
        )}
      </div>

      {/* BOTTOM NAVIGATION */}
      <DashboardBottomNav
        theme={theme}
        activeTab={activeTab}
        tablesEnabled={tablesEnabled}
        onTabChange={setActiveTab}
        onSettingsClick={() => navigate("/settings")}
      />

      {/* Addon Modal */}
      {addonProduct && (
        <AddonModal
          product={addonProduct}
          onClose={() => setAddonProduct(null)}
          onConfirm={(item) => {
            addCartItem(item)
            toast.success(`Added ${item.name} to cart`)
          }}
        />
      )}

      {/* Checkout Flow */}
      {checkoutOpen && (
        <CheckoutFlow
          cart={cart}
          subtotal={cart.reduce((s, i) => s + i.price * i.qty, 0)}
          discount={
            cartDiscountAmount > 0
              ? {
                  type: discount.type,
                  value: discount.value,
                  amount: cartDiscountAmount,
                }
              : undefined
          }
          vat={cartVat}
          taxName={taxConfig.name}
          taxRate={taxConfig.rate}
          taxEnabled={taxConfig.enabled}
          taxInclusive={taxConfig.inclusive}
          showTaxOnReceipt={taxConfig.showOnReceipt}
          serviceCharge={cartSvcCharge}
          serviceRate={taxConfig.serviceRate}
          total={cartTotal}
          customerName={selectedCustomer.name}
          tableNo={tableNo || undefined}
          cashierName={
            activeStaff ? activeStaff.name : restaurantName + " Owner"
          }
          initialMethod={checkoutInitialMethod}
          onClose={() => setCheckoutOpen(false)}
          onComplete={handlePaymentComplete}
        />
      )}

      {/* Transaction History */}
      {showHistory && (
        <TransactionHistory onClose={() => setShowHistory(false)} />
      )}

      {/* Hidden receipt for printing */}
      {lastTransaction && (
        <div
          style={{ position: "absolute", left: -9999, top: -9999, width: 320 }}
        >
          <div ref={receiptRef}>
            <Receipt transaction={lastTransaction} />
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogout && (
        <LogoutConfirmationModal
          isOpen={showLogout}
          onConfirm={() => {
            if (activeStaff) {
              setActiveStaff(null)
              navigate("/login", { replace: true })
            } else {
              window.location.href = "/"
            }
          }}
          onCancel={() => setShowLogout(false)}
        />
      )}

      <Toaster position="top-right" richColors />

      {/* Printer not connected modal */}
      <PrinterNotConnectedModal
        open={printer.noPrinter}
        onClose={() => printer.setNoPrinter(false)}
        onBrowserPrint={() => {
          if (lastReceiptData) printer.printViaBrowser(lastReceiptData)
        }}
      />

      {/* Manager Override Modal */}
      {overrideRequest && (
        <ManagerOverrideModal
          action={overrideRequest.action}
          detail={overrideRequest.detail}
          staff={staff}
          onApprove={overrideRequest.onApprove}
          onCancel={() => setOverrideRequest(null)}
        />
      )}

      {/* Shift Close / Cash Reconciliation */}
      {showShiftClose && (
        <ShiftCloseModal
          activeStaff={activeStaff}
          transactions={transactions}
          onClose={() => setShowShiftClose(false)}
        />
      )}
    </div>
  )
}
