"use client"
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import type { ProductType } from "@/types/product"

type CartItem = Pick<ProductType, "_id" | "name" | "slug" | "price" | "image" | "stock"> & { quantity: number }
type CartContextValue = { items: CartItem[]; addItem: (product: ProductType) => void; removeItem: (id: string) => void; updateQuantity: (id: string, quantity: number) => void; clear: () => void; count: number; subtotal: number }
const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = "al-dana-cart"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const hydrated = useRef(false)

  // Load any previously saved cart once on mount. Reading directly in
  // useState's initializer would run during SSR (no localStorage) and cause a
  // hydration mismatch, so this runs client-side only after mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {
      // Ignore corrupt/unavailable storage and start with an empty cart.
    } finally {
      hydrated.current = true
    }
  }, [])

  // Persist on every change, but skip the very first render before the saved
  // cart has been loaded so we don't overwrite it with an empty array.
  useEffect(() => {
    if (!hydrated.current) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Ignore storage write failures (e.g. private browsing quota limits).
    }
  }, [items])

  const addItem = useCallback((product: ProductType) => setItems((current) => { const item = current.find((x) => x._id === product._id); return item ? current.map((x) => x._id === product._id ? { ...x, quantity: Math.min(x.quantity + 1, x.stock) } : x) : [...current, { ...product, quantity: 1 }] }), [])
  const removeItem = useCallback((id: string) => setItems((current) => current.filter((x) => x._id !== id)), [])
  const updateQuantity = useCallback((id: string, quantity: number) => setItems((current) => current.map((x) => x._id === id ? { ...x, quantity: Math.max(1, Math.min(quantity, x.stock)) } : x)), [])
  const clear = useCallback(() => setItems([]), [])
  const value = useMemo(() => ({ items, addItem, removeItem, updateQuantity, clear, count: items.reduce((a, b) => a + b.quantity, 0), subtotal: items.reduce((a, b) => a + b.price * b.quantity, 0) }), [items, addItem, removeItem, updateQuantity, clear])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export function useCart() { const context = useContext(CartContext); if (!context) throw new Error("useCart must be used within CartProvider"); return context }
