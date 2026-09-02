import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORY_LABELS } from "@/lib/constants";
import { getProducts } from "@/lib/data";
import type { ProductType } from "@/types/product";
import { Sparkles, SlidersHorizontal, PackageOpen } from "lucide-react";

export const metadata = { title: "Shop Hardware | Al Dana Gaming" };

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
    <main className="mx-auto max-w-[96rem] px-4 py-8 sm:px-6 lg:px-10">
      
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

      {/* Category Filter Pills Bar */}
      <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-slate-100 pb-6">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
          <SlidersHorizontal className="size-3.5" /> Filter:
        </span>
        <Button
          variant={!category ? "default" : "outline"}
          render={<Link href="/shop" />}
          className={
            !category
              ? "bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-xl shadow-sm shadow-violet-500/20"
              : "border-slate-200 text-slate-700 hover:bg-violet-50 hover:text-violet-500 font-semibold rounded-xl"
          }
        >
          All Hardware
        </Button>
        {Object.entries(PRODUCT_CATEGORY_LABELS).map(([slug, label]) => (
          <Button
            key={slug}
            variant={category === slug ? "default" : "outline"}
            render={<Link href={`/shop?category=${slug}`} />}
            className={
              category === slug
                ? "bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-xl shadow-sm shadow-violet-500/20"
                : "border-slate-200 text-slate-700 hover:bg-violet-50 hover:text-violet-500 font-semibold rounded-xl"
            }
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Product Grid or Professional Empty State */}
      {products.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-12 text-center">
          <PackageOpen className="mx-auto size-12 text-slate-400 mb-3" />
          <h3 className="text-base font-bold text-slate-900">No hardware found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            We couldn't find any items matching this category at the moment. Check back soon or explore our other categories.
          </p>
          <Button
            variant="default"
            render={<Link href="/shop" />}
            className="mt-5 bg-violet-500 hover:bg-violet-600 text-white text-xs font-bold rounded-xl shadow-md shadow-violet-500/20"
          >
            View All Hardware
          </Button>
        </div>
      )}
    </main>
  );
}