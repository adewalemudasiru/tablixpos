export interface TaxSettings {
  taxEnabled: boolean
  taxName: string
  taxRate: string
  taxNumber: string
  inclusive: boolean
  applyToAll: boolean
  showOnReceipt: boolean
  exemptCategories: string[]
  serviceCharge: boolean
  serviceRate: string
}
