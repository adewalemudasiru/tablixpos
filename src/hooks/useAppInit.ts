import { useCallback } from "react";
import { useAppStore } from "../store/AppContext";
import { menuAPI, settingsAPI, subscriptionAPI } from "../services/api";
import type { MenuItem, MenuCategory } from "../store/AppContext";

export function useAppInit() {
  const {
    setMenuItems, setMenuCategories,
    setTaxConfig, setLoyaltyConfig, setPosConfig,
    setKotEnabled, setTablesEnabled, setPlan,
  } = useAppStore();

  const init = useCallback(async () => {
    try {
      const [catsRes, itemsRes, settingsRes, subRes] = await Promise.all([
        menuAPI.listCategories(),
        menuAPI.listItems(),
        settingsAPI.get().catch(() => null),
        subscriptionAPI.getStatus().catch(() => null),
      ]);

      const mappedCats: MenuCategory[] = catsRes.data.categories.map((c) => ({
        id:          c.id,
        name:        c.name,
        description: c.description,
        active:      c.isActive,
      }));

      const mappedItems: MenuItem[] = itemsRes.data.items.map((i) => ({
        id:          i.id,
        name:        i.name,
        price:       i.price,
        category:    i.categoryName ?? "",
        image:       i.imageUrl,
        available:   i.available,
        variants:    i.variants,
        addons:      i.addons,
        ingredients: i.ingredients,
      }));

      setMenuCategories(mappedCats);
      setMenuItems(mappedItems);

      // Apply persisted settings
      if (settingsRes) {
        const s = settingsRes.data.settings;
        setTaxConfig({
          enabled:       s.taxEnabled,
          name:          s.taxName,
          rate:          s.taxRate,
          inclusive:     s.taxInclusive,
          showOnReceipt: s.taxOnReceipt,
          serviceCharge: s.serviceCharge,
          serviceRate:   s.serviceRate,
        });
        setLoyaltyConfig({
          enabled:              s.loyaltyEnabled,
          rewardType:           s.loyaltyRewardType as "percentage" | "fixed",
          rewardValue:          s.loyaltyRewardValue,
          threshold:            s.loyaltyThreshold,
          minPointsToRedeem:    s.loyaltyMinRedeem,
          showBalanceOnReceipt: s.loyaltyShowOnReceipt,
          autoEnroll:           s.loyaltyAutoEnroll,
        });
        setPosConfig({
          receiptHeader:   s.receiptHeader,
          receiptFooter:   s.receiptFooter,
          printerType:     s.printerType,
          paperWidth:      s.paperWidth,
          autoPrint:       s.autoPrint,
          showQR:          s.showQR,
          showLogo:        s.showLogo,
          tipsEnabled:     s.tipsEnabled,
          cashRounding:    s.cashRounding,
          requireCustomer: s.requireCustomer,
        });
        setKotEnabled(s.kotEnabled);
        setTablesEnabled(s.tablesEnabled);
      }

      // Apply subscription plan
      if (subRes) {
        setPlan(subRes.data.plan);
      } else {
        // Fallback: check localStorage payment history
        try {
          const { loadPaymentHistory } = await import("../services/paystack");
          const history = loadPaymentHistory();
          if (history.length > 0) setPlan(history[0].cycle);
        } catch (_) {}
      }
    } catch (_) {
      // Non-blocking
    }
  }, [setMenuItems, setMenuCategories, setTaxConfig, setLoyaltyConfig, setPosConfig, setKotEnabled, setTablesEnabled, setPlan]);

  return { init };
}
