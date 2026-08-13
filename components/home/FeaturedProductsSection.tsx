import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ImagesIcon, Sparkles } from "lucide-react"

// Keep your functional imports
import { AddToCartButton } from "@/components/cart/AddToCartButton"
import { getFeaturedProducts } from "@/lib/data"
import { formatCurrency } from "@/lib/helpers"
import { PRODUCT_CATEGORY_LABELS } from "@/lib/constants"
import type { ProductType } from "@/types/product"

// ----------------------------------------------------------------------
// 1. INDIVIDUAL PRODUCT CARD (Minimal Light Theme)
// ----------------------------------------------------------------------
function ProductCard({ product }: { product: ProductType }) {
  const gallery = product.images?.length ? product.images : [product.image]
  const secondImage = gallery[1]

  return (
    <div className="group relative bg-white border border-gray-200 hover:border-gray-300 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1">
      
      {/* Image Container */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-gray-50 z-10"
      >
        <Image
          src={gallery[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover opacity-0 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
        )}

        {/* Gallery Count Badge */}
        {gallery.length > 1 && (
          <div className="absolute right-3 top-3 bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-700 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <ImagesIcon className="w-3.5 h-3.5" />
            {gallery.length}
          </div>
        )}
      </Link>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow relative z-10">
        {/* Category */}
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 block">
          {PRODUCT_CATEGORY_LABELS[product.category]}
        </span>

        {/* Title */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <Link href={`/shop/${product.slug}`} className="group-hover:text-black transition-colors">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <ArrowUpRight className="w-4 h-4 shrink-0 text-gray-300 group-hover:text-black transition-colors" />
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-sm leading-relaxed text-gray-500 mb-6 flex-grow">
          {product.description}
        </p>

        {/* Footer (Price & CTA) */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <strong className="text-xl font-bold text-gray-900 tracking-tight">
            {formatCurrency(product.price)}
          </strong>
          
          <div className="shrink-0">
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
      <div className="text-center py-20 bg-gray-50 border border-gray-200 rounded-3xl max-w-3xl mx-auto">
        <Sparkles className="w-10 h-10 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg mb-6 font-medium">No featured products available right now.</p>
        <Link href="/admin/products/add">
          <button className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-full transition-colors">
            Add First Product
          </button>
        </Link>
      </div>
    )
  }

  // Grid Layout
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {products.map((product: ProductType) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}

// ----------------------------------------------------------------------
// 3. MAIN SECTION COMPONENT
// ----------------------------------------------------------------------
export function FeaturedProductsSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4 block">
              Premium Selection
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              Featured Systems.
            </h2>
            <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed">
              Hand-picked gaming laptops and ultra-performance PCs curated for elite gamers and creators.
            </p>
          </div>

          {/* Desktop View All Button */}
          <div className="hidden md:block">
            <Link href="/shop" className="group">
              <button className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 pb-1 border-b-2 border-transparent hover:border-black transition-colors duration-300">
                View Entire Collection 
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </Link>
          </div>
        </div>

        {/* Product Grid with Minimal Skeleton Fallback */}
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div 
                  key={i} 
                  className="h-[400px] bg-gray-100 rounded-2xl animate-pulse"
                />
              ))}
            </div>
          }
        >
          <FeaturedProductsContent />
        </Suspense>

        {/* Mobile View All Button */}
        <div className="mt-10 md:hidden flex justify-center">
          <Link href="/shop">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-4 rounded-full text-sm font-bold transition-colors flex items-center gap-2 w-full justify-center">
              View Entire Collection 
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

      </div>
    </section>
  )
}