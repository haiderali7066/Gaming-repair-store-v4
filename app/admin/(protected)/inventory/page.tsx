import { getAllProducts } from "@/lib/data"
import { InventoryContent, type InventoryProduct } from "@/components/admin/InventoryContent"

export default async function InventoryPage() {
  const products = (await getAllProducts()) as InventoryProduct[]

  const stats = {
    totalItems: products.reduce((sum, p) => sum + p.stock, 0),
    lowStock: products.filter((p) => p.stock < 5).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
    categories: Array.from(new Set(products.map((p) => p.category))).length,
    totalValue: products.reduce((sum, p) => sum + p.price * p.stock, 0),
  }

  return <InventoryContent products={products} stats={stats} />
}
