import Link from "next/link"
import { ProductCard } from "@/components/shop/ProductCard"
import { Button } from "@/components/ui/button"
import { PRODUCT_CATEGORY_LABELS } from "@/lib/constants"
import { getProducts } from "@/lib/data"
import type { ProductType } from "@/types/product"
export const metadata = { title: "Shop" }
export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) { const { category } = await searchParams; const products = await getProducts(category ? { category } : {}) as ProductType[]; return <main className="section-shell py-14"><p className="eyebrow">Current inventory</p><h1 className="mt-3 text-6xl font-extrabold md:text-8xl">Shop hardware</h1><p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">Hand-picked gaming systems, mobile devices, and accessories. Every item shows current stock.</p><div className="mt-8 flex flex-wrap gap-2"><Button variant={!category ? "default" : "outline"} render={<Link href="/shop" />}>All</Button>{Object.entries(PRODUCT_CATEGORY_LABELS).map(([slug,label]) => <Button key={slug} variant={category === slug ? "default" : "outline"} render={<Link href={`/shop?category=${slug}`} />}>{label}</Button>)}</div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{products.map((p) => <ProductCard key={p._id} product={p} />)}</div></main> }
