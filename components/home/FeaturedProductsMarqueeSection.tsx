
import { getFeaturedProducts } from "@/lib/data"
import { ProductsMarquee } from "./ProductsMarquee"

export async function FeaturedProductsMarquee() {
  const products = await getFeaturedProducts()

  return <ProductsMarquee products={products} />
}
