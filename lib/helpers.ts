export function serialize<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED", maximumFractionDigits: 0 }).format(value)
}

export function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat("en-AE", { dateStyle: "medium" }).format(new Date(value))
}

export function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}
