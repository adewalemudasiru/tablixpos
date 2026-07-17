export interface LoyaltySettings {
  enabled: boolean
  rewardType: "percentage" | "fixed"
  rewardValue: string
  threshold: string
  minPointsToRedeem: string
  showBalanceOnReceipt: boolean
  autoEnroll: boolean
}
