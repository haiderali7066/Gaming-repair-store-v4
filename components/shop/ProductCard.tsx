"use client"

import Image from "next/image"
import Link from "next/link"

import {
  ArrowUpRight,
  ImagesIcon,
} from "lucide-react"

import { AddToCartButton } from "@/components/cart/AddToCartButton"

import { formatCurrency } from "@/lib/helpers"

import { PRODUCT_CATEGORY_LABELS } from "@/lib/constants"

import type { ProductType } from "@/types/product"

type ProductCardProps = {
  product: ProductType
}

export function ProductCard({
  product,
}: ProductCardProps) {
  const gallery =
    product.images?.length
      ? product.images
      : [product.image]

  const secondImage = gallery[1]

  const categoryName =
    PRODUCT_CATEGORY_LABELS[
      product.category
    ] || product.category

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_8px_25px_rgb(0,0,0,0.06)] sm:rounded-2xl">
      {/* ------------------------------------------------------------------ */}
      {/* IMAGE                                                              */}
      {/* ------------------------------------------------------------------ */}

      <Link
        href={`/shop/${product.slug}`}
        className="relative z-10 block aspect-square w-full overflow-hidden bg-slate-100 sm:aspect-[4/3]"
      >
        <Image
          src={
            gallery[0] ||
            "/placeholder.svg"
          }
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover transition duration-700 group-hover:scale-105 ${
            secondImage
              ? "group-hover:opacity-0"
              : ""
          }`}
        />

        {/* SECOND IMAGE */}

        {secondImage && (
          <Image
            src={
              secondImage ||
              "/placeholder.svg"
            }
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover opacity-0 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
        )}

        {/* USED BADGE */}

        {product.used && (
          <div className="absolute left-2 top-2 z-20 rounded-full border border-amber-200 bg-amber-50/95 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-amber-700 shadow-sm backdrop-blur-sm sm:left-3 sm:top-3 sm:px-3 sm:py-1.5 sm:text-[10px]">
            Used
          </div>
        )}

        {/* GALLERY COUNT */}

        {gallery.length > 1 && (
          <div className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-full border border-slate-200 bg-white/90 px-2 py-0.5 text-[10px] font-bold text-slate-700 shadow-sm backdrop-blur-sm sm:right-3 sm:top-3 sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-xs">
            <ImagesIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />

            {gallery.length}
          </div>
        )}
      </Link>

      {/* ------------------------------------------------------------------ */}
      {/* CONTENT                                                            */}
      {/* ------------------------------------------------------------------ */}

      <div className="relative z-10 flex flex-grow flex-col p-3 sm:p-5 md:p-6">
        {/* CATEGORY */}

        <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:mb-2 sm:text-xs">
          {categoryName}
        </span>

        {/* TITLE */}

        <div className="mb-1.5 flex items-start justify-between gap-1.5 sm:mb-2 sm:gap-3">
          <Link
            href={`/shop/${product.slug}`}
            className="min-w-0 transition-colors group-hover:text-black"
          >
            <h3 className="line-clamp-1 text-xs font-bold text-slate-900 sm:text-base md:text-lg">
              {product.name}
            </h3>
          </Link>

          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-slate-300 transition-colors group-hover:text-black sm:h-4 sm:w-4" />
        </div>

        {/* DESCRIPTION */}

        <p className="mb-3 line-clamp-2 flex-grow text-[11px] leading-relaxed text-slate-500 sm:mb-5 sm:text-sm">
          {product.description}
        </p>

        {/* PRICE + CART */}

        <div className="mt-auto flex flex-col gap-2 border-t border-slate-100 pt-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pt-4">
          <strong className="text-sm font-black tracking-tight text-slate-900 sm:text-lg md:text-xl">
            {formatCurrency(
              product.price,
            )}
          </strong>

          <div className="w-full shrink-0 sm:w-auto">
            <AddToCartButton
              product={product}
            />
          </div>
        </div>
      </div>
    </div>
  )
}