import React from "react"
import { CheckoutFlow } from "../components/CheckoutFlow"
import { DashboardShell } from "../components/dashboard/DashboardShell"
import { PosSection } from "../components/dashboard/sections/PosSection"
import { AddonModal } from "../components/dashboard/AddonModal"
import { WALK_IN } from "../components/CustomerSelector"
import type { CustomerType } from "../components/CustomerSelector"
import { TransactionHistory } from "../components/TransactionHistory"
import { Receipt } from "../components/Receipt"
import SearchModal from "../components/dashboard/SearchModal"
import OrderSuccessToast from "../components/dashboard/OrderSuccessToast"
import { ManagerOverrideModal } from "../components/ManagerOverrideModal"
import { ShiftCloseModal } from "../components/ShiftCloseModal"
import { PrinterNotConnectedModal } from "../components/PrinterNotConnectedModal"
import { useDashboard } from "../hooks/useDashboard"
import TablesPage from "./TablesPage"
import OrderHistoryPage from "./OrderHistoryPage"
import CustomerPage from "./CustomerPage"

export default function DashboardPage() {
  const {
    activeTab,
    setActiveTab,
    showSearchModal,
    setShowSearchModal,
    activeCategory,
    setActiveCategory,
    products,
    filteredProducts,
    CATEGORY_ITEMS,
    cart,
    selectedCartIdx,
    setSelectedCartIdx,
    tableNo,
    selectedCustomer,
    setSelectedCustomer,
    orderSuccess,
    addonProduct,
    setAddonProduct,
    checkoutOpen,
    checkoutInitialMethod,
    showHistory,
    lastTransaction,
    lastReceiptData,
    isProcessing,
    discount,
    receiptRef,
    search,
    setSearch,
    handleKeypadPress,
    clearCartForActiveTable,
    guardedClearCart,
    guardedRemoveItem,
    handlePrint,
    addToCart,
    addCartItem,
    handleProductAdd,
    handleCheckout,
    setCheckoutOpen,
    handlePaymentComplete,
    handleSendToKitchenOrSaveTab,
    switchTable,
    cartSubtotal,
    cartTotal,
    cartDiscountAmount,
    cartVat,
    cartSvcCharge,
    printer,
    overrideRequest,
    setOverrideRequest,
    showShiftClose,
    setShowShiftClose,
    theme,
    tables,
    tablesEnabled,
    activeStaff,
    staff,
    transactions,
    setActiveStaff,
    businessConfig,
    restaurantName,
    taxConfig,
    posConfig,
    menuUrl,
  } = useDashboard()

  return (
    <DashboardShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onSearch={() => setShowSearchModal(true)}
      onHistory={() => setShowHistory(true)}
      onPrint={() => handlePrint()}
      onSettings={() => (window.location.href = "/settings")}
      onLogout={() => (window.location.href = "/login")}
      activeStaffName={activeStaff?.name ?? "Owner"}
      hasLastTransaction={!!lastTransaction}
      theme={theme}
    >
      {activeTab === "pos" && (
        <PosSection
          products={products}
          filteredProducts={filteredProducts}
          categoryItems={CATEGORY_ITEMS}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          cart={cart}
          selectedCartIdx={selectedCartIdx}
          setSelectedCartIdx={setSelectedCartIdx}
          tableNo={tableNo}
          selectedCustomer={selectedCustomer as CustomerType}
          setSelectedCustomer={setSelectedCustomer}
          tablesEnabled={tablesEnabled}
          tables={tables}
          theme={theme}
          discount={discount}
          taxConfig={taxConfig}
          cartTotal={cartTotal}
          cartDiscountAmount={cartDiscountAmount}
          cartVat={cartVat}
          cartSvcCharge={cartSvcCharge}
          onKeypadPress={handleKeypadPress}
          onCheckoutMethod={handleCheckout}
          onSendToKitchenOrSaveTab={handleSendToKitchenOrSaveTab}
          onProductAdd={handleProductAdd}
          switchTable={switchTable}
          guardedClearCart={guardedClearCart}
          guardedRemoveItem={guardedRemoveItem}
          onSelectCartItem={(i) => setSelectedCartIdx(i)}
        />
      )}

      {activeTab === "tables" && <TablesPage />}
      {activeTab === "orders" && <OrderHistoryPage />}
      {activeTab === "customers" && <CustomerPage />}

      {addonProduct && (
        <AddonModal
          product={addonProduct}
          onClose={() => setAddonProduct(null)}
          onConfirm={(item) => {
            addCartItem(item)
            setAddonProduct(null)
          }}
        />
      )}

      {checkoutOpen && (
        <CheckoutFlow
          cart={cart}
          subtotal={cartSubtotal}
          discount={
            discount.value
              ? { ...discount, amount: cartDiscountAmount }
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
          cashierName={activeStaff?.name}
          initialMethod={checkoutInitialMethod}
          onClose={() => setCheckoutOpen(false)}
          onComplete={handlePaymentComplete}
        />
      )}

      <SearchModal
        open={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        search={search}
        setSearch={setSearch}
        products={products}
        onProductAdd={handleProductAdd}
        theme={theme}
      />

      {showHistory && (
        <TransactionHistory onClose={() => setShowHistory(false)} />
      )}

      {lastTransaction && (
        <div style={{ display: "none" }}>
          <Receipt ref={receiptRef as any} transaction={lastTransaction} />
        </div>
      )}

      <OrderSuccessToast open={orderSuccess} theme={theme} />

      {overrideRequest && (
        <ManagerOverrideModal
          action={overrideRequest.action}
          detail={overrideRequest.detail}
          staff={staff}
          onApprove={(approver) => {
            overrideRequest.onApprove(approver)
            setOverrideRequest(null)
          }}
          onCancel={() => setOverrideRequest(null)}
        />
      )}

      {showShiftClose && (
        <ShiftCloseModal
          activeStaff={activeStaff}
          transactions={transactions}
          onClose={() => setShowShiftClose(false)}
        />
      )}

      <PrinterNotConnectedModal
        open={!!printer.noPrinter}
        onClose={() => printer.setNoPrinter(false)}
        onBrowserPrint={() => printer.printViaBrowser(lastReceiptData as any)}
      />
    </DashboardShell>
  )
}
