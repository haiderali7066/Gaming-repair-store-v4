
import Image from "next/image";
import Link from "next/link";
import { ImagesIcon, ArrowUpRight } from "lucide-react";

import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/helpers";
import { PRODUCT_CATEGORY_LABELS } from "@/lib/constants";
import type { ProductType } from "@/types/product";

export function ProductCard({ product }: { product: ProductType }) {
  const images = product.images?.length
    ? product.images
    : [product.image];

  const hasSecondImage = images.length > 1;

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg hover:shadow-slate-200/50">

      {/* Image */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-slate-50"
      >
        <Image
          src={images[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover transition-all duration-500 ${
            hasSecondImage
              ? "group-hover:scale-105 group-hover:opacity-0"
              : "group-hover:scale-105"
          }`}
        />

        {/* Second image hover */}
        {hasSecondImage && (
          <Image
            src={images[1]}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover opacity-0 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
        )}

        {/* Category */}
        <Badge className="absolute left-2 top-2 max-w-[calc(100%-4rem)] truncate rounded-full border-0 bg-white/90 px-2 py-1 text-[9px] font-bold text-slate-700 shadow-sm backdrop-blur sm:text-[10px]">
          {PRODUCT_CATEGORY_LABELS[product.category]}
        </Badge>

        {/* Image count */}
        {hasSecondImage && (
          <span className="absolute right-2 top-2 flex h-7 items-center gap-1 rounded-full bg-black/60 px-2 text-[10px] font-semibold text-white backdrop-blur">
            <ImagesIcon className="size-3" />
            {images.length}
          </span>
        )}
      </Link>

      {/* Details */}
      <div className="p-3 sm:p-4">

        <Link
          href={`/shop/${product.slug}`}
          className="group/title flex items-start justify-between gap-2"
        >
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-5 text-slate-900 transition-colors group-hover/title:text-violet-600 sm:text-base">
            {product.name}
          </h3>

          <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-slate-300 transition-all group-hover:text-violet-500 sm:size-5" />
        </Link>

        <p className="mt-1.5 line-clamp-2 text-[11px] leading-4 text-slate-500 sm:text-xs sm:leading-5">
          {product.description}
        </p>

        {/* Price + Cart */}
        <div className="mt-3 flex items-center justify-between gap-2 sm:mt-4">
          <strong className="text-sm font-black text-slate-900 sm:text-lg">
            {formatCurrency(product.price)}
          </strong>

          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}
