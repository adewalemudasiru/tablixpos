import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { useLocation, useNavigate } from "react-router"
import { toast } from "sonner"
import { addActivityEntry } from "../services/activityLog"
import { ordersAPI, customersAPI, tableAPI } from "../services/api"
import type { ReceiptData } from "../services/printer"
import {
  saveCart,
  loadCart,
  clearCart,
  generateTransactionId,
  type Transaction,
} from "../services/storage"
import { usePrinter } from "../hooks/usePrinter"
import { useAppStore, nextOrderNo, usePermissions } from "../store/AppContext"
import type { KDSOrder } from "../store/AppContext"
import { WALK_IN } from "../components/CustomerSelector"
import type { CustomerType } from "../components/CustomerSelector"
import type { Product, CartItem, CategoryItem } from "../types/dashboard/common"

const categoryIconId = (name: string) => {
  const normalized = (name || "").toLowerCase()
  if (normalized.includes("drinks")) return "drink"
  if (normalized.includes("dessert")) return "dessert"
  if (normalized.includes("snack")) return "snack"
  if (normalized.includes("main")) return "appetizer"
  return "all"
}

export function useDashboard() {
  const {
    addTransaction,
    addKDSOrder,
    kdsOrders,
    addLoyaltyPoints,
    kotEnabled,
    menuItems,
    menuCategories,
    activeStaff,
    staff,
    transactions,
    consumeIngredients,
    taxConfig,
    restaurantName,
    loyaltyConfig,
    tables,
    setTableStatus,
    setActiveStaff,
    posConfig,
    businessConfig,
    menuUrl,
    tablesEnabled,
    theme,
  } = useAppStore()
  const navigate = useNavigate()
  const location = useLocation()
  const printer = usePrinter()
  const [lastReceiptData, setLastReceiptData] = useState<ReceiptData | null>(
    null
  )
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [activeTab, setActiveTab] = useState<
    "pos" | "tables" | "orders" | "customers"
  >("pos")
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [cart, setCart] = useState<CartItem[]>([])
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [addonProduct, setAddonProduct] = useState<Product | null>(null)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [checkoutInitialMethod, setCheckoutInitialMethod] = useState<
    "cash" | "card" | "transfer"
  >("cash")
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerType>(WALK_IN)
  const [showHistory, setShowHistory] = useState(false)
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(
    null
  )
  const [isProcessing, setIsProcessing] = useState(false)
  const [discount, setDiscount] = useState<{
    type: "percent" | "flat"
    value: number
  }>({ type: "flat", value: 0 })
  const [tableNo, setTableNo] = useState<string>(() => {
    try {
      const p = new URLSearchParams(window.location.search)
      return p.get("table") || ""
    } catch {
      return ""
    }
  })
  const [selectedCartIdx, setSelectedCartIdx] = useState<number | null>(null)
  const [keypadInput, setKeypadInput] = useState("")
  const [prevCartLength, setPrevCartLength] = useState(0)
  const [overrideRequest, setOverrideRequest] = useState<{
    action: string
    detail: string
    onApprove: (approver: string) => void
  } | null>(null)
  const [showShiftClose, setShowShiftClose] = useState(false)
  const receiptRef = useRef<HTMLDivElement>(null)
  const permissions = usePermissions()
  const isCashier = !permissions.includes("manager_override")

  const products: Product[] = useMemo(
    () =>
      menuItems
        .filter((m) => m.available)
        .map((m) => ({
          id: m.id,
          name: m.name,
          price: m.price,
          image: m.image,
          category: (m.category || "").toLowerCase(),
          categoryLabel: m.category,
          variants: m.variants.map((v) => ({
            id: v.id,
            name: v.name,
            price: v.price,
          })),
          addons: m.addons.map((a) => ({
            id: a.id,
            name: a.name,
            price: a.price,
          })),
          station: m.station,
        })),
    [menuItems]
  )

  const CATEGORY_ITEMS: CategoryItem[] = useMemo(
    () => [
      { id: "all", label: "All Menu", iconId: "all" },
      ...menuCategories
        .filter(
          (c) =>
            c.active &&
            products.some((p) => p.category === (c.name || "").toLowerCase())
        )
        .map((c) => ({
          id: (c.name || "").toLowerCase(),
          label: c.name,
          iconId: categoryIconId(c.name),
        })),
    ],
    [menuCategories, products]
  )

  const filteredProducts = useMemo(
    () =>
      products.filter((p) => {
        const matchesCategory =
          activeCategory === "all" || p.category === activeCategory
        const matchesSearch = p.name
          .toLowerCase()
          .includes((search || "").toLowerCase())
        return matchesCategory && matchesSearch
      }),
    [products, activeCategory, search]
  )

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartSubtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const cartDiscountAmount =
    discount.value > 0
      ? discount.type === "percent"
        ? Math.round((cartSubtotal * discount.value) / 100)
        : Math.min(discount.value, cartSubtotal)
      : 0
  const cartDiscountedSubtotal = cartSubtotal - cartDiscountAmount
  const cartVat = taxConfig.enabled
    ? taxConfig.inclusive
      ? Math.round(
          cartDiscountedSubtotal -
            cartDiscountedSubtotal / (1 + taxConfig.rate / 100)
        )
      : Math.round((cartDiscountedSubtotal * taxConfig.rate) / 100)
    : 0
  const cartSvcCharge = taxConfig.serviceCharge
    ? Math.round((cartDiscountedSubtotal * taxConfig.serviceRate) / 100)
    : 0
  const cartTotal = taxConfig.inclusive
    ? cartDiscountedSubtotal + cartSvcCharge
    : cartDiscountedSubtotal + cartVat + cartSvcCharge

  const loadSavedCart = useCallback(async () => {
    const saved = await loadCart()
    if (saved && Array.isArray(saved)) setCart(saved)
  }, [])

  useEffect(() => {
    loadSavedCart()
  }, [loadSavedCart])

  useEffect(() => {
    saveCart(cart)
  }, [cart])

  useEffect(() => {
    const p = new URLSearchParams(location.search)
    const tableParam = p.get("table")
    if (tableParam) {
      setActiveTab("pos")
      const prevKey = tableNo ? `tablix_cart_${tableNo}` : "tablix_cart"
      localStorage.setItem(prevKey, JSON.stringify(cart))
      const newKey = `tablix_cart_${tableParam}`
      const saved = localStorage.getItem(newKey)
      const newCart = saved ? JSON.parse(saved) : []
      setTableNo(tableParam)
      setCart(newCart)

      const table = tables.find(
        (t) => t.id === tableParam || t.name === tableParam
      )
      if (table && table.customerName && table.customerName !== "Walk-in") {
        setSelectedCustomer({
          id: "custom",
          name: table.customerName,
          phone: "",
        })
      } else {
        setSelectedCustomer(WALK_IN)
      }
      navigate("/dashboard", { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, navigate, tables])

  useEffect(() => {
    if (cart.length > prevCartLength) {
      setSelectedCartIdx(cart.length - 1)
      setKeypadInput("")
    } else if (cart.length < prevCartLength && selectedCartIdx !== null) {
      if (selectedCartIdx >= cart.length) setSelectedCartIdx(null)
    }
    setPrevCartLength(cart.length)
  }, [cart.length, prevCartLength, selectedCartIdx])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      if (e.key === "Escape") {
        if (cart.length > 0 && window.confirm("Clear entire cart?")) {
          clearCartForActiveTable()
          toast.success("Cart cleared")
        }
        return
      }

      if (e.key === "Enter" && cart.length > 0 && !checkoutOpen) {
        handleCheckout()
        return
      }

      const num = parseInt(e.key)
      if (!isNaN(num) && num >= 1 && num <= 9) {
        const currentFiltered = products.filter((p) => {
          const matchesCategory =
            activeCategory === "all" || p.category === activeCategory
          const matchesSearch = p.name
            .toLowerCase()
            .includes((search || "").toLowerCase())
          return matchesCategory && matchesSearch
        })
        const product = currentFiltered[num - 1]
        if (product) {
          handleProductAdd(product)
          toast.success(`Added ${product.name}`)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [
    cart.length,
    activeCategory,
    search,
    checkoutOpen,
    products,
    clearCartForActiveTable,
    handleCheckout,
    handleProductAdd,
  ])

  const clearCartForActiveTable = useCallback(() => {
    setCart([])
    clearCart()
    if (tableNo) {
      localStorage.removeItem(`tablix_cart_${tableNo}`)
      const table = tables.find((t) => t.id === tableNo || t.name === tableNo)
      if (table) {
        setTableStatus(table.id, "available", {
          occupiedAt: undefined,
          customerName: undefined,
          orderTotal: 0,
        })
        tableAPI
          .update(table.id, {
            status: "available",
            occupiedAt: null,
            customerName: null,
            orderTotal: 0,
          })
          .catch(() => {})
        localStorage.removeItem(`tablix_cart_${table.name}`)
        localStorage.removeItem(`tablix_cart_${table.id}`)
      }
    }
  }, [tableNo, tables, setTableStatus])

  const guardedClearCart = () => {
    if (isCashier) {
      setOverrideRequest({
        action: "Clear entire cart",
        detail: `Remove all ${cart.length} item(s) from the current order`,
        onApprove: (approver) => {
          clearCartForActiveTable()
          setOverrideRequest(null)
          addActivityEntry({
            staffName: activeStaff?.name ?? "Staff",
            role: activeStaff?.role ?? "Cashier",
            action: "Cart cleared (approved)",
            category: "Sale",
            timestamp: Date.now(),
            detail: `Approved by ${approver}. Cleared ${cart.length} item(s).`,
          })
          toast.success("Cart cleared (approved by " + approver + ")")
        },
      })
    } else {
      clearCartForActiveTable()
      toast.success("Cart cleared")
    }
  }

  const guardedRemoveItem = (idx: number) => {
    const item = cart[idx]
    if (!item) return
    if (isCashier) {
      setOverrideRequest({
        action: "Remove item from order",
        detail: `"${item.name}" x${item.qty} = ₦${(item.price * item.qty).toLocaleString()}`,
        onApprove: (approver) => {
          setCart((prev) => prev.filter((_, i) => i !== idx))
          setOverrideRequest(null)
          addActivityEntry({
            staffName: activeStaff?.name ?? "Staff",
            role: activeStaff?.role ?? "Cashier",
            action: "Item removed from cart (approved)",
            category: "Sale",
            timestamp: Date.now(),
            detail: `Approved by ${approver}. Removed "${item.name}" x${item.qty}`,
          })
          toast.success(item.name + " removed (approved by " + approver + ")")
        },
      })
    } else {
      removeItem(idx)
    }
  }

  const handleKeypadPress = (key: string) => {
    if (key === "C") {
      if (selectedCartIdx !== null) {
        guardedRemoveItem(selectedCartIdx)
        setSelectedCartIdx(null)
        setKeypadInput("")
      } else {
        guardedClearCart()
      }
      return
    }
    if (selectedCartIdx === null) return

    if (key === "^" || key === "x" || key === ".") {
      setSelectedCartIdx(null)
      setKeypadInput("")
      return
    }

    setKeypadInput((prevStr) => {
      const nextStr = prevStr + key
      if (nextStr.length > 3) return prevStr
      const parsedQty = parseInt(nextStr)
      if (!isNaN(parsedQty) && parsedQty > 0) {
        setCart((currentCart) =>
          currentCart.map((item, i) =>
            i === selectedCartIdx ? { ...item, qty: parsedQty } : item
          )
        )
      }
      return nextStr
    })
  }

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id && !i.sentToKitchen)
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && !i.sentToKitchen ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
    toast.success(`Added ${product.name} to cart`)
  }

  const addCartItem = (item: CartItem) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (i) =>
          i.id === item.id &&
          !i.sentToKitchen &&
          i.selectedVariantId === item.selectedVariantId &&
          JSON.stringify(i.selectedAddons) ===
            JSON.stringify(item.selectedAddons)
      )
      if (existingIdx > -1) {
        return prev.map((i, idx) =>
          idx === existingIdx ? { ...i, qty: i.qty + item.qty } : i
        )
      }
      return [...prev, item]
    })
  }

  const replaceCartItem = (idx: number, item: CartItem) => {
    setCart((prev) => prev.map((it, i) => (i === idx ? item : it)))
  }

  const handleProductAdd = (product: Product) => {
    const variantCount = product.variants?.length ?? 0
    const addonCount = product.addons?.length ?? 0

    if (variantCount > 1 || addonCount > 0) {
      setAddonProduct(product)
    } else if (variantCount === 1) {
      const v = product.variants![0]
      addCartItem({
        ...product,
        price: v.price,
        qty: 1,
        selectedVariantId: v.id,
        selectedAddons: [],
      })
      toast.success(`Added ${product.name} to cart`)
    } else {
      addToCart(product)
    }
  }

  const updateQty = (index: number, delta: number) => {
    setCart((prev) => {
      const updated = prev.map((item, i) =>
        i === index ? { ...item, qty: item.qty + delta } : item
      )
      return updated.filter((i) => i.qty > 0)
    })
  }

  const removeItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index))
  }

  const switchTable = useCallback(
    (newTableNo: string) => {
      const prevKey = tableNo ? `tablix_cart_${tableNo}` : "tablix_cart"
      localStorage.setItem(prevKey, JSON.stringify(cart))
      const newKey = newTableNo ? `tablix_cart_${newTableNo}` : "tablix_cart"
      const saved = localStorage.getItem(newKey)
      const newCart = saved ? JSON.parse(saved) : []
      setTableNo(newTableNo)
      setCart(newCart)
      const table = tables.find(
        (t) => t.id === newTableNo || t.name === newTableNo
      )
      if (table && table.customerName && table.customerName !== "Walk-in") {
        setSelectedCustomer({
          id: "custom",
          name: table.customerName,
          phone: "",
        })
      } else {
        setSelectedCustomer(WALK_IN)
      }
    },
    [tableNo, cart, tables]
  )

  useEffect(() => {
    if (tableNo && tables.length > 0) {
      const table = tables.find((t) => t.id === tableNo || t.name === tableNo)
      if (table) {
        const currentTotal = Math.round(cartTotal)
        if (table.orderTotal !== currentTotal) {
          const newStatus =
            currentTotal === 0
              ? "available"
              : table.status === "available"
                ? "occupied"
                : table.status
          const extra = {
            orderTotal: currentTotal,
            customerName:
              currentTotal === 0
                ? undefined
                : selectedCustomer.name !== "Walk-in"
                  ? selectedCustomer.name
                  : table.customerName || "POS Order",
            occupiedAt:
              currentTotal === 0
                ? undefined
                : table.occupiedAt || new Date().toISOString(),
          }
          setTableStatus(table.id, newStatus, extra)
          tableAPI
            .update(table.id, {
              status: newStatus,
              orderTotal: currentTotal,
              customerName: extra.customerName ?? null,
              occupiedAt: extra.occupiedAt ?? null,
            })
            .catch(() => {})
        }
      }
    }
  }, [cartTotal, tableNo, tables, setTableStatus, selectedCustomer.name])

  const handleCheckout = (method?: "cash" | "card" | "transfer") => {
    setCheckoutInitialMethod(method || "cash")
    setCheckoutOpen(true)
  }

  const handlePrint = useCallback(async () => {
    if (!lastTransaction) return
    const receiptData: ReceiptData = {
      businessName: restaurantName,
      address: businessConfig.address,
      phone: businessConfig.phone,
      receiptNo: lastTransaction.id,
      date: new Date(lastTransaction.timestamp).toLocaleString("en-NG"),
      cashier: lastTransaction.cashier ?? activeStaff?.name ?? "Owner",
      tableNo: lastTransaction.tableNo,
      customer:
        lastTransaction.customer.name !== "Walk-in"
          ? lastTransaction.customer.name
          : undefined,
      items: lastTransaction.items.map((i) => ({
        name: i.name,
        qty: i.qty,
        price: i.price,
      })),
      subtotal: lastTransaction.subtotal,
      tax: lastTransaction.vat,
      taxName: taxConfig.name,
      serviceCharge: lastTransaction.serviceCharge,
      total: lastTransaction.total,
      paymentMethod: lastTransaction.paymentMethod ?? "Cash",
      footer: posConfig.receiptFooter,
      showQR: posConfig.showQR,
      menuUrl: menuUrl || window.location.origin + "/menu-view",
    }
    setLastReceiptData(receiptData)
    const result = await printer.print(receiptData)
    if (result === "qz") {
      toast.success("Receipt sent to printer")
    } else if (result === "browser") {
      toast.success("Receipt opened for printing")
    }
  }, [
    lastTransaction,
    restaurantName,
    businessConfig,
    taxConfig,
    posConfig,
    menuUrl,
    activeStaff,
    printer,
  ])

  const handlePaymentComplete = async (
    paymentMethod: string = "Cash",
    cashTendered: number = 0
  ) => {
    setIsProcessing(true)
    const changeAmount =
      paymentMethod.toLowerCase() === "cash" && cashTendered > cartTotal
        ? cashTendered - cartTotal
        : 0
    const transaction: Transaction = {
      id: generateTransactionId(),
      timestamp: Date.now(),
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        qty: item.qty,
        selectedVariantId: item.selectedVariantId,
        selectedAddons: item.selectedAddons?.map((sa) => ({
          id: sa.id,
          name: sa.name,
          qty: sa.qty,
          price: sa.price,
        })),
      })),
      customer: {
        id: selectedCustomer.id,
        name: selectedCustomer.name,
        email: selectedCustomer.email,
        phone: selectedCustomer.phone,
      },
      subtotal: cartSubtotal,
      discount:
        cartDiscountAmount > 0
          ? {
              type: discount.type,
              value: discount.value,
              amount: cartDiscountAmount,
            }
          : undefined,
      vat: cartVat,
      serviceCharge: cartSvcCharge > 0 ? cartSvcCharge : undefined,
      taxLabel: taxConfig.enabled ? taxConfig.name : undefined,
      taxRate: taxConfig.enabled ? taxConfig.rate : undefined,
      taxInclusive: taxConfig.inclusive,
      total: cartTotal,
      paymentMethod,
      changeAmount,
      tableNo: tableNo || undefined,
      cashier: activeStaff ? activeStaff.name : restaurantName + " Owner",
      status: "completed",
    }
    addTransaction(transaction)
    setLastTransaction(transaction)
    const staffName = activeStaff ? activeStaff.name : "Owner"
    consumeIngredients(
      cart.map((item) => ({ menuItemId: item.id, qty: item.qty })),
      staffName
    )
    const staffRole = activeStaff ? activeStaff.role : "Owner"
    const itemSummary = cart
      .map((i) => `${i.name}${i.qty > 1 ? " x" + i.qty : ""}`)
      .slice(0, 2)
      .join(", ")
    addActivityEntry({
      staffName,
      role: staffRole,
      action: "Processed sale",
      category: "Sale",
      timestamp: Date.now(),
      detail: `₦${cartTotal.toLocaleString()} - ${itemSummary}`,
    })
    if (
      selectedCustomer.id !== "walk-in" &&
      loyaltyConfig.enabled &&
      cartTotal >= loyaltyConfig.threshold
    ) {
      let loyaltyEarned = 0
      if (loyaltyConfig.rewardType === "percentage") {
        loyaltyEarned = Math.round(
          (cartTotal * loyaltyConfig.rewardValue) / 100
        )
      } else {
        loyaltyEarned = Math.round(loyaltyConfig.rewardValue)
      }
      if (loyaltyEarned > 0) {
        addLoyaltyPoints(selectedCustomer.id, loyaltyEarned, cartTotal)
      }
    }
    if (kotEnabled) {
      const unsentItems = cart.filter((item) => !item.sentToKitchen)
      if (unsentItems.length > 0) {
        const sharedOrderNo = nextOrderNo(kdsOrders)
        const itemsByStation: Record<string, CartItem[]> = {}
        unsentItems.forEach((item) => {
          const st = item.station || "General"
          if (!itemsByStation[st]) itemsByStation[st] = []
          itemsByStation[st].push(item)
        })
        Object.entries(itemsByStation).forEach(([stationName, stItems]) => {
          const kdsOrder: KDSOrder = {
            id:
              "kds-" +
              stationName.replace(/\s+/g, "-") +
              "-" +
              Date.now() +
              "-" +
              Math.floor(Math.random() * 1000),
            orderNo: sharedOrderNo,
            tableNo: tableNo || "POS",
            customer: selectedCustomer.name,
            status: "New",
            priority: "Normal",
            items: stItems.map((item, idx) => ({
              id: "ki-" + idx + "-" + Date.now(),
              name:
                item.name +
                (item.selectedVariantId
                  ? " (" +
                    (item.variants?.find((v) => v.id === item.selectedVariantId)
                      ?.name ?? item.selectedVariantId) +
                    ")"
                  : ""),
              qty: item.qty,
              notes: "",
              done: false,
            })),
            placedAt: new Date().toISOString(),
            startedAt: null,
            readyAt: null,
            station: stationName,
          }
          addKDSOrder(kdsOrder)
        })
      }
    }
    if (tableNo && tables.length > 0) {
      const table = tables.find((t) => t.id === tableNo || t.name === tableNo)
      if (table) {
        setTableStatus(table.id, "available", {
          occupiedAt: undefined,
          customerName: undefined,
          orderTotal: 0,
        })
        tableAPI
          .update(table.id, {
            status: "available",
            occupiedAt: null,
            customerName: null,
            orderTotal: 0,
          })
          .catch(() => {})
        localStorage.removeItem(`tablix_cart_${table.name}`)
        localStorage.removeItem(`tablix_cart_${table.id}`)
      }
    }
    const cartSnapshot = [...cart]
    setCart([])
    clearCart()
    setCheckoutOpen(false)
    setDiscount({ type: "flat", value: 0 })

    try {
      const orderRes = await ordersAPI.create({
        items: cartSnapshot.map((item) => ({
          menuItemId: item.id,
          quantity: item.qty,
          unitPrice: item.price,
        })),
        notes: JSON.stringify({
          tableNo: tableNo || undefined,
          cashier: activeStaff ? activeStaff.name : restaurantName + " Owner",
          change: changeAmount > 0 ? changeAmount : 0,
          paymentMethod: paymentMethod,
        }),
      })

      if (orderRes.success && orderRes.data.order) {
        await ordersAPI.recordPayment(orderRes.data.order.id, {
          method: (paymentMethod.toLowerCase() === "cash"
            ? "Cash"
            : paymentMethod.toLowerCase() === "card"
              ? "Card"
              : paymentMethod.toLowerCase() === "transfer"
                ? "Mobile"
                : "Cash") as "Cash" | "Card" | "Mobile" | "Wallet",
          amount: cartTotal,
        })
        if (selectedCustomer.id !== "walk-in" && loyaltyConfig.enabled) {
          const points =
            loyaltyConfig.rewardType === "percentage"
              ? Math.floor((cartTotal * loyaltyConfig.rewardValue) / 100)
              : loyaltyConfig.rewardValue
          if (points > 0 && cartTotal >= loyaltyConfig.threshold) {
            customersAPI.update(selectedCustomer.id, {}).catch(() => {})
            addLoyaltyPoints(selectedCustomer.id, points, cartTotal)
          }
        }
      }
    } catch (err: any) {
      const msg = err?.data?.message ?? err?.message ?? "Unknown error"
      console.error("Failed to sync order with server:", msg, err)
      toast.error(`Order sync failed: ${msg}`, { duration: 6000 })
    }

    setIsProcessing(false)
    setOrderSuccess(true)
    toast.success("Order completed successfully!", {
      description: `Receipt #${transaction.id}`,
      duration: 3000,
    })
    if (posConfig.autoPrint) {
      setTimeout(() => handlePrint(), 500)
    }
    setTimeout(() => setOrderSuccess(false), 2500)
  }

  const handleSendToKitchenOrSaveTab = async () => {
    if (!tableNo || cart.length === 0) return
    setIsProcessing(true)
    const unsentItems = cart.filter((item) => !item.sentToKitchen)
    if (kotEnabled && unsentItems.length > 0) {
      const sharedOrderNo = nextOrderNo(kdsOrders)
      const itemsByStation: Record<string, CartItem[]> = {}
      unsentItems.forEach((item) => {
        const st = item.station || "General"
        if (!itemsByStation[st]) itemsByStation[st] = []
        itemsByStation[st].push(item)
      })
      Object.entries(itemsByStation).forEach(([stationName, stItems]) => {
        const kdsOrder: KDSOrder = {
          id:
            "kds-" +
            stationName.replace(/\s+/g, "-") +
            "-" +
            Date.now() +
            "-" +
            Math.floor(Math.random() * 1000),
          orderNo: sharedOrderNo,
          tableNo: tableNo,
          customer:
            selectedCustomer.name !== "Walk-in"
              ? selectedCustomer.name
              : "Table Guest",
          status: "New",
          priority: "Normal",
          items: stItems.map((item, idx) => ({
            id: "ki-" + idx + "-" + Date.now(),
            name:
              item.name +
              (item.selectedVariantId
                ? " (" +
                  (item.variants?.find((v) => v.id === item.selectedVariantId)
                    ?.name ?? item.selectedVariantId) +
                  ")"
                : ""),
            qty: item.qty,
            notes: "",
            done: false,
          })),
          placedAt: new Date().toISOString(),
          startedAt: null,
          readyAt: null,
          station: stationName,
        }
        addKDSOrder(kdsOrder)
      })
    }
    const updatedCart = cart.map((item) => ({ ...item, sentToKitchen: true }))
    const table = tables.find((t) => t.id === tableNo || t.name === tableNo)
    if (table) {
      localStorage.setItem(
        `tablix_cart_${table.name}`,
        JSON.stringify(updatedCart)
      )
      localStorage.setItem(
        `tablix_cart_${table.id}`,
        JSON.stringify(updatedCart)
      )
      const currentTotal = Math.round(cartTotal)
      setTableStatus(table.id, "occupied", {
        occupiedAt: table.occupiedAt || new Date().toISOString(),
        customerName:
          selectedCustomer.name !== "Walk-in"
            ? selectedCustomer.name
            : table.customerName || "POS Order",
        orderTotal: currentTotal,
      })
      try {
        await tableAPI.update(table.id, {
          status: "occupied",
          occupiedAt: table.occupiedAt || new Date().toISOString(),
          customerName:
            selectedCustomer.name !== "Walk-in"
              ? selectedCustomer.name
              : table.customerName || "POS Order",
          orderTotal: currentTotal,
        })
      } catch (_) {}
    }
    const staffName = activeStaff ? activeStaff.name : "Owner"
    const staffRole = activeStaff ? activeStaff.role : "Owner"
    const detailMsg = kotEnabled
      ? `Sent ${unsentItems.length} new items to kitchen for Table ${tableNo}`
      : `Saved bill for Table ${tableNo}`
    addActivityEntry({
      staffName,
      role: staffRole,
      action: kotEnabled ? "Sent KOT to Kitchen" : "Held Tab",
      category: "Sale",
      timestamp: Date.now(),
      detail: detailMsg,
    })
    setCart([])
    clearCart()
    setTableNo("")
    setSelectedCustomer(WALK_IN)
    setSelectedCartIdx(null)
    setKeypadInput("")
    setIsProcessing(false)
    toast.success(
      kotEnabled ? "Sent to kitchen and tab saved!" : "Tab saved and held!"
    )
  }

  return {
    activeTab,
    setActiveTab,
    showSearchModal,
    setShowSearchModal,
    activeCategory,
    setActiveCategory,
    search,
    setSearch,
    products,
    filteredProducts,
    CATEGORY_ITEMS,
    cart,
    setCart,
    selectedCartIdx,
    setSelectedCartIdx,
    tableNo,
    selectedCustomer,
    setSelectedCustomer,
    orderSuccess,
    setOrderSuccess,
    addonProduct,
    setAddonProduct,
    checkoutOpen,
    setCheckoutOpen,
    checkoutInitialMethod,
    setCheckoutInitialMethod,
    showHistory,
    setShowHistory,
    lastTransaction,
    setLastTransaction,
    isProcessing,
    setIsProcessing,
    discount,
    setDiscount,
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
    replaceCartItem,
    handleProductAdd,
    updateQty,
    removeItem,
    cartTotal,
    cartDiscountAmount,
    cartVat,
    cartSvcCharge,
    handleCheckout,
    handlePaymentComplete,
    handleSendToKitchenOrSaveTab,
    switchTable,
    navigate,
    printer,
    setOverrideRequest,
    overrideRequest,
    showShiftClose,
    setShowShiftClose,
    tableNoState: tableNo,
    cartCount,
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
    loyaltyConfig,
  }
}
