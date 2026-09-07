
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";

import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductCard } from "@/components/shop/ProductCard";
import { Badge } from "@/components/ui/badge";

import { formatCurrency } from "@/lib/helpers";
import { PRODUCT_CATEGORY_LABELS } from "@/lib/constants";
import { getProductBySlug, getProducts } from "@/lib/data";
import type { ProductType } from "@/types/product";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = (await getProductBySlug(slug)) as ProductType | null;

  if (!product) notFound();

  const gallery = product.images?.length
    ? product.images
    : [product.image];

  // Same-category products
  const relatedProducts = (
    (await getProducts({
      category: product.category,
    })) as ProductType[]
  )
    .filter((item) => item._id !== product._id)
    .slice(0, 4);

  return (
    <main className="mx-auto w-full max-w-[96rem] px-4 py-5 sm:px-6 sm:py-8 lg:px-10">

      {/* Back */}
      <Link
        href="/shop"
        className="mb-5 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-violet-600 sm:mb-8"
      >
        <ArrowLeft className="size-3.5" />
        Back to shop
      </Link>

      {/* =========================
          PRODUCT
      ========================== */}
      <section className="grid gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">

        {/* Gallery */}
        <div>
          <ProductGallery
            images={gallery}
            name={product.name}
          />
        </div>

        {/* Product Information */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:rounded-3xl sm:p-7 lg:p-8">

            {/* Category */}
            <Badge
              variant="secondary"
              className="rounded-full bg-violet-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-600"
            >
              {PRODUCT_CATEGORY_LABELS[product.category]}
            </Badge>

            {/* Name */}
            <h1 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-5">
              <span className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                {formatCurrency(product.price)}
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-sm leading-6 text-slate-500">
              {product.description}
            </p>

            {/* Stock */}
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
              <CheckCircle2
                className={`size-4 ${
                  product.stock > 0
                    ? "text-emerald-500"
                    : "text-slate-400"
                }`}
              />

              <span className="text-xs font-semibold text-slate-600">
                {product.stock > 0
                  ? `${product.stock} units ready to order`
                  : "Currently unavailable"}
              </span>
            </div>

            {/* Cart */}
            <div className="mt-5">
              <AddToCartButton
                product={product}
                className="h-11 w-full rounded-xl text-sm font-bold sm:h-12"
              />
            </div>

            {/* Trust */}
            <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-5 text-[11px] font-medium text-slate-500">
              <ShieldCheck className="size-4 text-violet-500" />
              Quality gaming hardware • Secure ordering
            </div>

            {/* Specifications */}
            {Object.keys(product.specifications ?? {}).length > 0 && (
              <div className="mt-7 border-t border-slate-100 pt-6">
                <h2 className="text-base font-black text-slate-900 sm:text-lg">
                  Specifications
                </h2>

                <dl className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="grid grid-cols-[0.9fr_1.1fr] gap-4 border-b border-slate-100 px-3 py-3 last:border-0 sm:px-4"
                      >
                        <dt className="text-[11px] font-medium text-slate-400 sm:text-xs">
                          {key}
                        </dt>

                        <dd className="break-words text-right text-[11px] font-semibold text-slate-700 sm:text-xs">
                          {String(value)}
                        </dd>
                      </div>
                    ),
                  )}
                </dl>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================
          RELATED PRODUCTS
      ========================== */}
      {relatedProducts.length > 0 && (
        <section className="mt-14 border-t border-slate-100 pt-10 sm:mt-20 sm:pt-14">

          <div className="mb-5 flex items-end justify-between sm:mb-7">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-500">
                You may also like
              </p>

              <h2 className="mt-1 text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
                More from this category
              </h2>
            </div>

            <Link
              href={`/shop?category=${product.category}`}
              className="hidden items-center text-xs font-bold text-violet-500 hover:text-violet-600 sm:flex"
            >
              View all
              <ArrowLeft className="ml-1 size-3 rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard
                key={item._id}
                product={item}
              />
            ))}
          </div>

          {/* Mobile view all */}
          <Link
            href={`/shop?category=${product.category}`}
            className="mt-5 flex items-center justify-center rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-600 transition hover:border-violet-200 hover:text-violet-600 sm:hidden"
          >
            View all {PRODUCT_CATEGORY_LABELS[product.category]}
          </Link>
        </section>
      )}
    </main>
  );
}
