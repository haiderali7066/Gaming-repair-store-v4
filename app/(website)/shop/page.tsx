import Link from "next/link"

import {
  ArrowRight,
  ChevronRight,
  PackageOpen,
  Search,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProductLoadMore } from "@/components/shop/ProductLoadMore"

import { PRODUCT_CATEGORY_LABELS } from "@/lib/constants"

import {
  getCategories,
  getProductCount,
  getProducts,
} from "@/lib/data"

import type { ProductType } from "@/types/product"

export const metadata = {
  title: "Shop Hardware | Al Dana",
}

/* Initial products per section (and per "load more" batch). */
const PAGE_SIZE = 12

const escapeRegex = (text: string) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string
    q?: string
  }>
}) {
  const { category, q: rawQuery } = await searchParams

  const q = (rawQuery ?? "").trim().slice(0, 80)

  const categoryFilter = category ? { category } : {}

  /* Case-insensitive search on name / description (plain objects only,
     so the filter can be passed to the client "load more" component). */
  const searchFilter = q
    ? {
        $or: [
          { name: { $regex: escapeRegex(q), $options: "i" } },
          { description: { $regex: escapeRegex(q), $options: "i" } },
        ],
      }
    : {}

  /* Products without a `used` field are treated as NEW. */
  const newFilter = {
    ...categoryFilter,
    ...searchFilter,
    used: { $ne: true },
  }

  const preLovedFilter = {
    ...categoryFilter,
    ...searchFilter,
    used: true,
  }

  const [
    newProducts,
    newProductCount,
    preLovedProducts,
    preLovedProductCount,
    databaseCategories,
  ] = await Promise.all([
    getProducts(newFilter, { limit: PAGE_SIZE, skip: 0 }),
    getProductCount(newFilter),
    getProducts(preLovedFilter, { limit: PAGE_SIZE, skip: 0 }),
    getProductCount(preLovedFilter),
    getCategories(),
  ])

  const newProductsTyped = newProducts as ProductType[]
  const preLovedProductsTyped = preLovedProducts as ProductType[]

  /* Built-in categories + admin-created categories */
  const allCategories = [
    ...Object.entries(PRODUCT_CATEGORY_LABELS).map(([slug, name]) => ({
      slug,
      name,
    })),
    ...(databaseCategories as { slug: string; name: string }[]),
  ].filter(
    (item, index, array) =>
      array.findIndex((x) => x.slug === item.slug) === index,
  )

  const activeCategoryName = allCategories.find(
    (c) => c.slug === category,
  )?.name

  /* Category links keep the current search */
  const chipHref = (slug?: string) => {
    const params = new URLSearchParams()
    if (slug) params.set("category", slug)
    if (q) params.set("q", q)
    const qs = params.toString()
    return qs ? `/shop?${qs}` : "/shop"
  }

  const chipCls = (active: boolean) =>
    active
      ? "h-9 rounded-md bg-slate-900 px-4 text-xs font-semibold text-white hover:bg-slate-800"
      : "h-9 rounded-md border-slate-200 bg-white px-4 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"

  const totalResults = newProductCount + preLovedProductCount

  return (
    <main className="w-full bg-white text-slate-900">
      <style>{`html{scroll-behavior:smooth}`}</style>

      {/* ================================================================ */}
      {/* PAGE HEADER                                                       */}
      {/* ================================================================ */}

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto w-full max-w-[96rem] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex items-center gap-1.5 text-xs font-medium text-slate-500"
          >
            <Link href="/" className="hover:text-slate-900">
              Home
            </Link>
            <ChevronRight className="size-3.5 text-slate-300" />
            <Link
              href="/shop"
              className={
                category || q
                  ? "hover:text-slate-900"
                  : "text-slate-900"
              }
            >
              Shop
            </Link>
            {activeCategoryName && (
              <>
                <ChevronRight className="size-3.5 text-slate-300" />
                <span className="text-slate-900">{activeCategoryName}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                {activeCategoryName ?? "Shop Hardware"}
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
                Gaming PCs, laptops and accessories — brand new and
                pre-loved, all in one place.
              </p>
            </div>

            {/* Search */}
            <form action="/shop" className="relative w-full lg:max-w-md">
              {category && (
                <input type="hidden" name="category" value={category} />
              )}
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                name="q"
                type="search"
                defaultValue={q}
                placeholder="Search products..."
                className="h-11 w-full rounded-md border border-slate-300 bg-white pl-10 pr-24 text-sm shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 h-8 -translate-y-1/2 rounded bg-violet-600 px-4 text-xs font-bold text-white transition-colors hover:bg-violet-700"
              >
                Search
              </button>
            </form>
          </div>

          {/* Category chips */}
          <div className="-mx-4 mt-6 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:px-0">
            <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
              <Button
                size="sm"
                variant={!category ? "default" : "outline"}
                render={<Link href={chipHref()} />}
                className={chipCls(!category)}
              >
                All Hardware
              </Button>

              {allCategories.map((item) => (
                <Button
                  key={item.slug}
                  size="sm"
                  variant={category === item.slug ? "default" : "outline"}
                  render={<Link href={chipHref(item.slug)} />}
                  className={chipCls(category === item.slug)}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* SECTION SWITCHER + RESULT SUMMARY                                  */}
      {/* ================================================================ */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-[96rem] flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <div className="inline-flex w-full overflow-hidden rounded-md border border-slate-200 sm:w-auto">
            <a
              href="#new-products"
              className="flex flex-1 items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:flex-none"
            >
              New Products
              <span className="rounded bg-violet-100 px-1.5 py-0.5 text-xs font-bold text-violet-700">
                {newProductCount}
              </span>
            </a>
            <a
              href="#pre-loved"
              className="flex flex-1 items-center justify-center gap-2 border-l border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:flex-none"
            >
              Pre-Loved Products
              <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs font-bold text-amber-700">
                {preLovedProductCount}
              </span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
            <span>
              <strong className="font-bold text-slate-900">
                {totalResults}
              </strong>{" "}
              {totalResults === 1 ? "product" : "products"}
              {q && (
                <>
                  {" "}
                  for <strong className="text-slate-900">“{q}”</strong>
                </>
              )}
            </span>

            {(q || category) && (
              <Link
                href="/shop"
                className="inline-flex items-center gap-1 font-semibold text-violet-600 hover:underline"
              >
                <X className="size-3.5" /> Clear filters
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* NEW PRODUCTS                                                      */}
      {/* ================================================================ */}

      <section
        id="new-products"
        className="scroll-mt-28 bg-white py-10 sm:py-14"
      >
        <div className="mx-auto w-full max-w-[96rem] px-4 sm:px-6 lg:px-10">
          <SectionHeader
            eyebrow="Brand New"
            eyebrowCls="text-violet-600"
            title="New Products"
            description="Fresh gaming hardware and accessories, straight from the box."
            shown={newProductsTyped.length}
            total={newProductCount}
            linkHref="#pre-loved"
            linkLabel="Pre-loved products"
          />

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
              description={
                q
                  ? `No new products match “${q}”.`
                  : "There are no new products available in this category right now."
              }
            />
          )}
        </div>
      </section>

      {/* ================================================================ */}
      {/* PRE-LOVED PRODUCTS                                                */}
      {/* ================================================================ */}

      <section
        id="pre-loved"
        className="scroll-mt-28 border-t border-slate-200 bg-slate-50 py-10 sm:py-14"
      >
        <div className="mx-auto w-full max-w-[96rem] px-4 sm:px-6 lg:px-10">
          <SectionHeader
            eyebrow="Pre-Loved Collection"
            eyebrowCls="text-amber-600"
            title="Pre-Loved Products"
            description="Quality pre-owned and refurbished hardware at better prices."
            shown={preLovedProductsTyped.length}
            total={preLovedProductCount}
            linkHref="#new-products"
            linkLabel="New products"
          />

          {preLovedProductsTyped.length > 0 ? (
            <ProductLoadMore
              initialProducts={preLovedProductsTyped}
              initialTotal={preLovedProductCount}
              filter={preLovedFilter}
              pageSize={PAGE_SIZE}
            />
          ) : (
            <EmptyProductsState
              title="No pre-loved products found"
              description={
                q
                  ? `No pre-loved products match “${q}”.`
                  : "There are no pre-loved products available in this category right now."
              }
            />
          )}
        </div>
      </section>
    </main>
  )
}

/* -------------------------------------------------------------------------- */
/* SECTION HEADER                                                             */
/* -------------------------------------------------------------------------- */

function SectionHeader({
  eyebrow,
  eyebrowCls,
  title,
  description,
  shown,
  total,
  linkHref,
  linkLabel,
}: {
  eyebrow: string
  eyebrowCls: string
  title: string
  description: string
  shown: number
  total: number
  linkHref: string
  linkLabel: string
}) {
  return (
    <div className="mb-7 flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <span
          className={`mb-1 block text-[11px] font-bold uppercase tracking-widest ${eyebrowCls}`}
        >
          {eyebrow}
        </span>
        <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h2>
        <p className="mt-1.5 text-sm text-slate-600">{description}</p>
      </div>

      <div className="flex items-center gap-5 text-sm">
        <span className="text-slate-500">
          Showing{" "}
          <strong className="font-bold text-slate-900">{shown}</strong> of{" "}
          <strong className="font-bold text-slate-900">{total}</strong>
        </span>
        <a
          href={linkHref}
          className="inline-flex items-center gap-1 font-semibold text-violet-600 hover:underline"
        >
          {linkLabel} <ArrowRight className="size-3.5" />
        </a>
      </div>
    </div>
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
    <div className="flex min-h-[240px] items-center justify-center rounded-md border border-dashed border-slate-300 bg-white px-5 py-10">
      <div className="max-w-sm text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-md bg-slate-100">
          <PackageOpen className="size-6 text-slate-400" />
        </div>

        <h3 className="text-base font-bold text-slate-900">{title}</h3>

        <p className="mt-1.5 text-sm leading-6 text-slate-500">
          {description}
        </p>

        <Button
          render={<Link href="/shop" />}
          className="mt-5 h-10 rounded-md bg-violet-600 px-5 text-xs font-bold text-white hover:bg-violet-700"
        >
          View All Hardware
          <ArrowRight className="ml-1.5 size-3.5" />
        </Button>
      </div>
    </div>
  )
}