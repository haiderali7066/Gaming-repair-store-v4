"use client"

import Image from "next/image"
import Link from "next/link"
import { getFeaturedProducts } from "@/lib/data"
import { formatCurrency } from "@/lib/helpers"
import type { ProductType } from "@/types/product"

// ----------------------------------------------------------------------
// 1. INFINITE MARQUEE COMPONENT
// ----------------------------------------------------------------------
async function MarqueeContent() {
  const products = await getFeaturedProducts()

  if (products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 font-medium">
        No featured products available right now.
      </div>
    )
  }

  // Duplicate the array multiple times to ensure seamless infinite looping without gaps on wide screens
  const duplicatedProducts = [...products, ...products, ...products, ...products]

  return (
    <div className="relative w-full overflow-hidden py-10">
      {/* Edge fading gradients for a clean professional look */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex w-max animate-marquee items-center gap-8 hover:[animation-play-state:paused]">
        {duplicatedProducts.map((product: ProductType, index: number) => {
          const imageSrc = product.images?.[0] || product.image || "/placeholder.svg"

          return (
            <Link
              key={`${product._id}-${index}`}
              href={`/shop/${product.slug}`}
              className="group relative flex flex-col items-center shrink-0 w-44 sm:w-56 focus:outline-none"
            >
              {/* Circular Image Container */}
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-100 group-hover:border-violet-600 transition-all duration-300 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2">
                <Image
                  src={imageSrc}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 176px, 224px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Product Info below circle */}
              <div className="mt-4 text-center px-2">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1 group-hover:text-violet-600 transition-colors">
                  {product.name}
                </h3>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-gray-500">
                  {formatCurrency(product.price)}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------
// 2. MAIN SECTION EXPORT
// ----------------------------------------------------------------------
export function FeaturedProductsMarqueeSection() {
  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4 block">
            Seamless Exploration
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Featured Systems.
          </h2>
          <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed">
            Glide through our hand-picked selection of elite gaming setups and powerful rigs.
          </p>
        </div>
      </div>

      {/* Marquee Wrapper */}
      <MarqueeContent />
    </section>
  )
}