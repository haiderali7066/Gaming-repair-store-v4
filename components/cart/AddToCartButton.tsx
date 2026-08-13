"use client"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/useCart"
import type { ProductType } from "@/types/product"
export function AddToCartButton({ product, className }: { product: ProductType; className?: string }) { const { addItem } = useCart(); return <Button className={className} disabled={product.stock < 1} onClick={() => addItem(product)}><ShoppingBag data-icon="inline-start" />{product.stock > 0 ? "Add to cart" : "Out of stock"}</Button> }
