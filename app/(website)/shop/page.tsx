import Link from "next/link"
import Image from "next/image"

import {
  ArrowRight,
  ArrowUpRight,
  PackageOpen,
  SlidersHorizontal,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProductLoadMore } from "@/components/shop/ProductLoadMore"

import {
  PRODUCT_CATEGORY_LABELS,
} from "@/lib/constants"

import {
  getCategories,
  getProductCount,
  getProducts,
} from "@/lib/data"

import type { ProductType } from "@/types/product"

export const metadata = {
  title: "Shop Hardware | Al Dana Gaming",
}

const PAGE_SIZE = 8

const HERO_BANNER =
  "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1788356744/2_rjhkea.png"

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string
  }>
}) {
  const { category } = await searchParams

  const categoryFilter = category
    ? { category }
    : {}

  /*
   * Products without a `used` field are treated as NEW.
   *
   * This is important because older products in MongoDB
   * may have been created before the `used` field existed.
   */
  const newFilter = {
    ...categoryFilter,
    used: { $ne: true },
  }

  const usedFilter = {
    ...categoryFilter,
    used: true,
  }

  const [
    newProducts,
    newProductCount,
    usedProducts,
    usedProductCount,
    databaseCategories,
  ] = await Promise.all([
    getProducts(newFilter, {
      limit: PAGE_SIZE,
      skip: 0,
    }),

    getProductCount(newFilter),

    getProducts(usedFilter, {
      limit: PAGE_SIZE,
      skip: 0,
    }),

    getProductCount(usedFilter),

    getCategories(),
  ])

  const newProductsTyped =
    newProducts as ProductType[]

  const usedProductsTyped =
    usedProducts as ProductType[]

  /*
   * Built-in categories + admin-created categories
   */
  const allCategories = [
    ...Object.entries(
      PRODUCT_CATEGORY_LABELS,
    ).map(([slug, name]) => ({
      slug,
      name,
    })),

    ...(databaseCategories as {
      slug: string
      name: string
    }[]),
  ].filter(
    (item, index, array) =>
      array.findIndex(
        (x) => x.slug === item.slug,
      ) === index,
  )

  return (
    <main className="w-full bg-white text-slate-900">
      {/* ================================================================ */}
      {/* TOP HERO                                                         */}
      {/* ================================================================ */}

      <section className="mx-auto w-full max-w-[96rem] px-4 pt-5 sm:px-6 sm:pt-8 lg:px-10">
        <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-slate-100 sm:h-56 sm:rounded-3xl md:h-[36vh] lg:h-[420px]">
          <Image
            src={HERO_BANNER}
            alt="Trade-In & Buy Back"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

        </div>
      </section>

      {/* ================================================================ */}
      {/* FILTERS                                                          */}
      {/* ================================================================ */}

      <section className="mx-auto w-full max-w-[96rem] px-4 pb-5 pt-6 sm:px-6 sm:pb-7 sm:pt-8 lg:px-10">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-black tracking-tight text-slate-900 sm:text-xl">
              Browse Hardware
            </h1>

            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
              Find the right gear for your setup
            </p>
          </div>

          <div className="hidden items-center gap-1.5 text-xs font-medium text-slate-400 sm:flex">
            <SlidersHorizontal className="size-3.5" />
            Filter
          </div>
        </div>

        <div className="-mx-4 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:px-0">
          <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
            <Button
              size="sm"
              variant={
                !category
                  ? "default"
                  : "outline"
              }
              render={
                <Link href="/shop" />
              }
              className={
                !category
                  ? "h-9 rounded-full bg-violet-500 px-4 text-xs font-bold text-white shadow-sm shadow-violet-500/20 hover:bg-violet-600"
                  : "h-9 rounded-full border-slate-200 bg-white px-4 text-xs font-semibold text-slate-600 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
              }
            >
              All Hardware
            </Button>

            {allCategories.map(
              (item) => (
                <Button
                  key={item.slug}
                  size="sm"
                  variant={
                    category ===
                    item.slug
                      ? "default"
                      : "outline"
                  }
                  render={
                    <Link
                      href={`/shop?category=${item.slug}`}
                    />
                  }
                  className={
                    category ===
                    item.slug
                      ? "h-9 rounded-full bg-violet-500 px-4 text-xs font-bold text-white shadow-sm shadow-violet-500/20 hover:bg-violet-600"
                      : "h-9 rounded-full border-slate-200 bg-white px-4 text-xs font-semibold text-slate-600 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                  }
                >
                  {item.name}
                </Button>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* NEW PRODUCTS                                                      */}
      {/* ================================================================ */}

      <section className="border-y border-slate-200/80 bg-slate-100/70 py-8 sm:py-12 md:py-14">
        <div className="mx-auto max-w-[1536px] px-3 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col justify-between gap-4 md:mb-9 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-violet-600 sm:text-sm">
                New Arrivals
              </span>

              <h2 className="mb-2 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                New Products.
              </h2>

              <p className="text-xs font-medium leading-relaxed text-slate-600 sm:text-base">
                Fresh gaming hardware and accessories
                added to our collection.
              </p>
            </div>

            <div className="hidden md:block">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 border-b-2 border-transparent pb-1 text-sm font-bold text-slate-900 transition-colors hover:border-slate-900"
              >
                View Entire Collection

                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {newProductsTyped.length > 0 ? (
            <ProductLoadMore
              initialProducts={newProductsTyped}
              initialTotal={newProductCount}
              filter={newFilter}
              pageSize={PAGE_SIZE}
            />
          ) : (
            <EmptyProductsState
              title="No new products found"
              description="There are no new products available in this category right now."
            />
          )}
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECOND HERO                                                       */}
      {/* ================================================================ */}

      <section className="mx-auto w-full max-w-[96rem] px-4 py-7 sm:px-6 sm:py-10 lg:px-10">
        <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-slate-100 sm:h-56 sm:rounded-3xl md:h-[34vh] lg:h-[550px]">
          <Image
            src="https://res.cloudinary.com/dvu9vmcqd/image/upload/v1788788929/ChatGPT_Image_Sep_7_2026_06_48_31_PM_lnxxbf.png"
            alt="Trade-In & Buy Back"
            fill
            sizes="100vw"
            className="object-cover"
          />

        </div>
      </section>

      {/* ================================================================ */}
      {/* USED PRODUCTS                                                     */}
      {/* ================================================================ */}

      <section className="border-y border-slate-200/80 bg-slate-100/70 py-8 sm:py-12 md:py-14">
        <div className="mx-auto max-w-[1536px] px-3 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col justify-between gap-4 md:mb-9 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-amber-600 sm:text-sm">
                Pre-Owned Collection
              </span>

              <h2 className="mb-2 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                Used Products.
              </h2>

              <p className="text-xs font-medium leading-relaxed text-slate-600 sm:text-base">
                Quality pre-owned and refurbished
                hardware at better prices.
              </p>
            </div>

            <div className="hidden md:block">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 border-b-2 border-transparent pb-1 text-sm font-bold text-slate-900 transition-colors hover:border-slate-900"
              >
                View All Products

                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {usedProductsTyped.length > 0 ? (
            <ProductLoadMore
              initialProducts={usedProductsTyped}
              initialTotal={usedProductCount}
              filter={usedFilter}
              pageSize={PAGE_SIZE}
            />
          ) : (
            <EmptyProductsState
              title="No used products found"
              description="There are no pre-owned products available in this category right now."
            />
          )}
        </div>
      </section>

      {/* ================================================================ */}
      {/* MOBILE CTA                                                        */}
      {/* ================================================================ */}

      <div className="mx-auto flex max-w-[1536px] justify-center px-4 py-6 sm:px-6 md:hidden">
        <Link
          href="/shop"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-xs font-bold text-slate-900 shadow-sm transition-colors hover:bg-slate-50 active:scale-[0.99]"
        >
          View Entire Collection

          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </main>
  )
}

/* -------------------------------------------------------------------------- */
/* EMPTY STATE                                                                */
/* -------------------------------------------------------------------------- */

function EmptyProductsState({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-5 py-10 sm:rounded-3xl">
      <div className="max-w-sm text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-slate-50 ring-1 ring-slate-100">
          <PackageOpen className="size-6 text-slate-400" />
        </div>

        <h3 className="text-lg font-black tracking-tight text-slate-900">
          {title}
        </h3>

        <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
          {description}
        </p>

        <Button
          render={
            <Link href="/shop" />
          }
          className="mt-5 h-10 rounded-xl bg-violet-500 px-5 text-xs font-bold text-white shadow-md shadow-violet-500/20 hover:bg-violet-600"
        >
          View All Hardware
          <ArrowRight className="ml-1.5 size-3.5" />
        </Button>
      </div>
    </div>
  )
}