"use client"

import { useState } from "react"
import {
  ArrowDown,
  Loader2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/shop/ProductCard"
import { getProducts } from "@/lib/data"

import type { ProductType } from "@/types/product"

type ProductLoadMoreProps = {
  initialProducts: ProductType[]
  initialTotal: number
  filter?: Record<string, unknown>
  pageSize?: number
}

export function ProductLoadMore({
  initialProducts,
  initialTotal,
  filter = {},
  pageSize = 8,
}: ProductLoadMoreProps) {
  const [products, setProducts] =
    useState<ProductType[]>(initialProducts)

  const [loading, setLoading] =
    useState(false)

  const hasMore =
    products.length < initialTotal

  async function handleLoadMore() {
    if (loading || !hasMore) {
      return
    }

    setLoading(true)

    try {
      const nextProducts =
        (await getProducts(filter, {
          skip: products.length,
          limit: pageSize,
        })) as ProductType[]

      if (nextProducts.length > 0) {
        setProducts((current) => [
          ...current,
          ...nextProducts,
        ])
      }
    } catch (error) {
      console.error(
        "[ProductLoadMore] Failed to load products:",
        error,
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center sm:mt-10">
          <Button
            type="button"
            variant="outline"
            onClick={handleLoadMore}
            disabled={loading}
            className="h-11 min-w-40 rounded-xl border-slate-200 bg-white px-6 text-xs font-bold text-slate-700 shadow-sm transition-all hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                Load More
                <ArrowDown className="size-3.5" />
              </>
            )}
          </Button>
        </div>
      )}
    </>
  )
}