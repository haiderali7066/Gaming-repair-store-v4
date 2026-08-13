import { notFound } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { AddToCartButton } from "@/components/cart/AddToCartButton"
import { ProductGallery } from "@/components/shop/ProductGallery"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/helpers"
import { PRODUCT_CATEGORY_LABELS } from "@/lib/constants"
import { getProductBySlug } from "@/lib/data"
import type { ProductType } from "@/types/product"

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = (await getProductBySlug(slug)) as ProductType | null
  if (!product) notFound()
  const gallery = product.images?.length ? product.images : [product.image]

  return (
    <main className="section-shell py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={gallery} name={product.name} />
        <div className="flex flex-col items-start justify-center gap-6">
          <Badge variant="secondary">{PRODUCT_CATEGORY_LABELS[product.category]}</Badge>
          <h1 className="text-balance text-5xl font-extrabold md:text-7xl">{product.name}</h1>
          <p className="text-3xl font-bold text-primary">{formatCurrency(product.price)}</p>
          <p className="text-pretty leading-relaxed text-muted-foreground">{product.description}</p>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="size-5 text-primary" />
            <span>{product.stock > 0 ? `${product.stock} units ready to order` : "Currently unavailable"}</span>
          </div>
          <AddToCartButton product={product} className="w-full md:w-auto" />
          <div className="w-full border-t border-border pt-6">
            <h2 className="text-2xl font-bold">Specifications</h2>
            <dl className="mt-4 grid gap-0 border border-border">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 border-b border-border p-4 last:border-0">
                  <dt className="text-sm text-muted-foreground">{key}</dt>
                  <dd className="text-sm font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </main>
  )
}
