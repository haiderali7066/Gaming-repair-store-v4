import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ImagesIcon } from "lucide-react"
import { AddToCartButton } from "@/components/cart/AddToCartButton"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/helpers"
import { PRODUCT_CATEGORY_LABELS } from "@/lib/constants"
import type { ProductType } from "@/types/product"

export function ProductCard({ product }: { product: ProductType }) {
  const gallery = product.images?.length ? product.images : [product.image]
  const secondImage = gallery[1]

  return (
    <Card className="group overflow-hidden border-border bg-card pt-0">
      <Link className="relative block aspect-[4/3] overflow-hidden bg-muted" href={`/shop/${product.slug}`}>
        <Image
          src={gallery[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-cover transition duration-500 group-hover:scale-105 ${secondImage ? "group-hover:opacity-0" : ""}`}
        />
        {/* Crossfades to the second uploaded photo on hover as a lightweight
            way to preview the gallery without a full carousel in the card. */}
        {secondImage && (
          <Image
            src={secondImage || "/placeholder.svg"}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover opacity-0 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
        )}
        {gallery.length > 1 && (
          <Badge variant="secondary" className="absolute right-2 top-2 gap-1 text-xs">
            <ImagesIcon className="size-3" />
            {gallery.length}
          </Badge>
        )}
      </Link>
      <CardHeader>
        <Badge variant="secondary" className="w-fit">
          {PRODUCT_CATEGORY_LABELS[product.category]}
        </Badge>
        <CardTitle className="flex items-start justify-between gap-3 text-xl">
          <Link href={`/shop/${product.slug}`}>{product.name}</Link>
          <ArrowUpRight className="size-5 shrink-0 text-primary" aria-hidden />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
      </CardContent>
      <CardFooter className="justify-between gap-4">
        <strong className="text-lg">{formatCurrency(product.price)}</strong>
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  )
}
