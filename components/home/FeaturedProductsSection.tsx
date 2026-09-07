import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ImagesIcon, Sparkles } from "lucide-react"

// Functional imports
import { AddToCartButton } from "@/components/cart/AddToCartButton"
import { getFeaturedProducts } from "@/lib/data"
import { formatCurrency } from "@/lib/helpers"
import { PRODUCT_CATEGORY_LABELS } from "@/lib/constants"
import type { ProductType } from "@/types/product"

// ----------------------------------------------------------------------
// 1. INDIVIDUAL PRODUCT CARD (Mobile-First 2-Column Responsive Layout)
// ----------------------------------------------------------------------
function ProductCard({ product }: { product: ProductType }) {
  const gallery = product.images?.length ? product.images : [product.image]
  const secondImage = gallery[1]

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_8px_25px_rgb(0,0,0,0.06)]">
      
      {/* Image Container */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative z-10 block aspect-square w-full overflow-hidden bg-slate-100 sm:aspect-[4/3]"
      >
        <Image
          src={gallery[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover transition duration-700 group-hover:scale-105 ${
            secondImage ? "group-hover:opacity-0" : ""
          }`}
        />
        
        {/* Crossfade Image on Hover */}
        {secondImage && (
          <Image
            src={secondImage || "/placeholder.svg"}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover opacity-0 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
        )}

        {/* Gallery Count Badge */}
        {gallery.length > 1 && (
          <div className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-full border border-slate-200 bg-white/90 px-2 py-0.5 text-[10px] font-bold text-slate-700 shadow-sm backdrop-blur-sm sm:right-3 sm:top-3 sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-xs">
            <ImagesIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            {gallery.length}
          </div>
        )}
      </Link>

      {/* Content Container */}
      <div className="relative z-10 flex flex-grow flex-col p-3 sm:p-5 md:p-6">
        {/* Category */}
        <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:mb-2 sm:text-xs">
          {PRODUCT_CATEGORY_LABELS[product.category]}
        </span>

        {/* Title */}
        <div className="mb-1.5 flex items-start justify-between gap-1.5 sm:mb-2 sm:gap-3">
          <Link href={`/shop/${product.slug}`} className="transition-colors group-hover:text-black">
            <h3 className="line-clamp-1 text-xs font-bold text-slate-900 sm:text-base md:text-lg">
              {product.name}
            </h3>
          </Link>
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-slate-300 transition-colors group-hover:text-black sm:h-4 sm:w-4" />
        </div>

        {/* Description - Compact on mobile */}
        <p className="mb-3 line-clamp-2 flex-grow text-[11px] leading-relaxed text-slate-500 sm:mb-5 sm:text-sm">
          {product.description}
        </p>

        {/* Footer (Price & CTA) */}
        <div className="mt-auto flex flex-col gap-2 pt-2.5 border-t border-slate-100 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pt-4">
          <strong className="text-sm font-black tracking-tight text-slate-900 sm:text-lg md:text-xl">
            {formatCurrency(product.price)}
          </strong>
          
          <div className="w-full shrink-0 sm:w-auto">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------
// 2. DATA FETCHING CONTENT
// ----------------------------------------------------------------------
async function FeaturedProductsContent() {
  const products = await getFeaturedProducts()

  // Empty State
  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white py-12 px-4 text-center sm:py-20">
        <Sparkles className="mx-auto mb-3 h-8 w-8 text-slate-300 sm:mb-4 sm:h-10 sm:w-10" />
        <p className="mb-4 text-sm font-medium text-slate-500 sm:mb-6 sm:text-lg">
          No featured products available right now.
        </p>
        <Link href="/admin/products/add">
          <button className="rounded-full bg-slate-900 px-6 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800 sm:px-8 sm:py-3 sm:text-sm">
            Add First Product
          </button>
        </Link>
      </div>
    )
  }

  // Grid Layout: 2 items per row on mobile, 3 on tablet, 4 on desktop
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
      {products.map((product: ProductType) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}

// ----------------------------------------------------------------------
// 3. MAIN SECTION COMPONENT (With Styled Background)
// ----------------------------------------------------------------------
export function FeaturedProductsSection() {
  return (
    <section className="border-y border-slate-200/80 bg-slate-100/70 py-8 sm:py-14 md:py-16">
      <div className="mx-auto max-w-[1536px] px-3 sm:px-6 lg:px-8">
        
        {/* Minimal Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 md:mb-12 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-violet-600 sm:text-sm">
              Curated Selection
            </span>
            <h2 className="mb-2 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Featured Systems.
            </h2>
            <p className="text-xs font-medium leading-relaxed text-slate-600 sm:text-base md:text-lg">
              Hand-picked gaming laptops and ultra-performance PCs curated for elite gamers and creators.
            </p>
          </div>

          {/* Desktop View All Button */}
          <div className="hidden md:block">
            <Link href="/shop" className="group">
              <button className="inline-flex items-center gap-2 border-b-2 border-transparent pb-1 text-sm font-bold text-slate-900 transition-colors duration-300 hover:border-slate-900">
                View Entire Collection 
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Link>
          </div>
        </div>

        {/* Product Grid with Skeleton Fallback */}
        <Suspense
          fallback={
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div 
                  key={i} 
                  className="h-[280px] sm:h-[380px] rounded-xl sm:rounded-2xl bg-slate-200/60 animate-pulse"
                />
              ))}
            </div>
          }
        >
          <FeaturedProductsContent />
        </Suspense>

        {/* Mobile View All Button */}
        <div className="mt-6 flex justify-center md:hidden">
          <Link href="/shop" className="w-full">
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-xs font-bold text-slate-900 shadow-sm transition-colors hover:bg-slate-50 active:scale-[0.99]">
              View Entire Collection 
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </Link>
        </div>

      </div>
    </section>
  )
}