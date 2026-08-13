export const PRODUCT_CATEGORIES = ["gaming-pcs", "gaming-laptops", "ipads", "accessories"] as const
export const PRODUCT_CATEGORY_LABELS: Record<string, string> = {
  "gaming-pcs": "Gaming PCs",
  "gaming-laptops": "Gaming Laptops",
  ipads: "iPads",
  accessories: "Accessories",
}
export const ORDER_STATUSES = ["pending", "confirmed", "processing", "ready", "completed", "cancelled"] as const
export const REQUEST_STATUSES = ["submitted", "reviewing", "quoted", "in-progress", "completed", "rejected"] as const
export const DEVICE_TYPES = ["Gaming PC", "Gaming Laptop", "iPad"] as const
export const BUY_BACK_TYPES = ["Gaming PC", "Gaming Laptop", "Desktop PC", "iPad", "Graphics Card", "Gaming Console", "PC Component"] as const
export const PAYMENT_METHODS = ["cash", "card", "bank-transfer", "other"] as const
export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  cash: "Cash",
  card: "Card",
  "bank-transfer": "Bank Transfer",
  other: "Other",
}
