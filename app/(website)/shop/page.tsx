import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORY_LABELS } from "@/lib/constants";
import { getProducts } from "@/lib/data";
import type { ProductType } from "@/types/product";
import { SlidersHorizontal, PackageOpen, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Shop Hardware | Al Dana Gaming",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const products = (await getProducts(
    category ? { category } : {},
  )) as ProductType[];

  return (
    <main className="mx-auto w-full max-w-[96rem] px-4 py-5 sm:px-6 sm:py-8 lg:px-10">

      {/* Hero Banner Section: Full width/container width, half height with background image & overlay */}
      <div className="relative mb-10 overflow-hidden rounded-3xl ">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dvu9vmcqd/image/upload/v1788356744/2_rjhkea.png"
            alt="Gaming Hardware Banner"
            fill
            priority
            className="object-cover  mix-blend-overlay"
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-8 py-16 sm:px-12 lg:px-16 lg:py-24 h-[350px] sm:h-[420px] max-w-2xl">
          
        </div>
      </div>

      {/* =========================
          FILTER HEADER
      ========================== */}
      <section className="mb-6 sm:mb-8">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-900 sm:text-xl">
              Browse Hardware
            </h2>

            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
              Find the right gear for your setup
            </p>
          </div>

          <div className="hidden items-center gap-1.5 text-xs font-medium text-slate-400 sm:flex">
            <SlidersHorizontal className="size-3.5" />
            Filter
          </div>
        </div>

        {/* Mobile horizontal scroll */}
        <div className="-mx-4 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:px-0">
          <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
            <Button
              size="sm"
              variant={!category ? "default" : "outline"}
              render={<Link href="/shop" />}
              className={
                !category
                  ? "h-9 rounded-full bg-violet-500 px-4 text-xs font-bold text-white shadow-sm shadow-violet-500/20 hover:bg-violet-600"
                  : "h-9 rounded-full border-slate-200 bg-white px-4 text-xs font-semibold text-slate-600 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
              }
            >
              All Hardware
            </Button>

            {Object.entries(PRODUCT_CATEGORY_LABELS).map(
              ([slug, label]) => (
                <Button
                  key={slug}
                  size="sm"
                  variant={category === slug ? "default" : "outline"}
                  render={
                    <Link href={`/shop?category=${slug}`} />
                  }
                  className={
                    category === slug
                      ? "h-9 rounded-full bg-violet-500 px-4 text-xs font-bold text-white shadow-sm shadow-violet-500/20 hover:bg-violet-600"
                      : "h-9 rounded-full border-slate-200 bg-white px-4 text-xs font-semibold text-slate-600 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                  }
                >
                  {label}
                </Button>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =========================
          PRODUCT GRID
      ========================== */}
      {products.length > 0 ? (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-medium text-slate-400">
              {products.length}{" "}
              {products.length === 1 ? "product" : "products"}
            </p>

            {category && (
              <Link
                href="/shop"
                className="text-xs font-semibold text-violet-500 transition hover:text-violet-600"
              >
                Clear filter
              </Link>
            )}
          </div>

          <div
            className="
              grid
              grid-cols-2
              gap-3
              sm:grid-cols-2
              sm:gap-5
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        </section>
      ) : (
        /* =========================
           EMPTY STATE
        ========================== */
        <section className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-5 py-12 sm:rounded-3xl">
          <div className="max-w-sm text-center">
            <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
              <PackageOpen className="size-6 text-slate-400" />
            </div>

            <h3 className="text-lg font-black tracking-tight text-slate-900">
              No hardware found
            </h3>

            <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
              We couldn't find any products in this category right now.
              Explore all hardware to discover what's available.
            </p>

            <Button
              render={<Link href="/shop" />}
              className="mt-6 h-10 rounded-xl bg-violet-500 px-5 text-xs font-bold text-white shadow-md shadow-violet-500/20 hover:bg-violet-600"
            >
              View All Hardware
              <ArrowRight className="ml-1.5 size-3.5" />
            </Button>
          </div>
        </section>
      )}
    </main>
  );
}