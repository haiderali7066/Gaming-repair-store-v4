"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2, Minus, Plus, Search, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/helpers"

interface Product {
  _id: string
  name: string
  brand: string
  price: number
  stock: number
  image?: string
}

interface CartLine {
  productId: string
  name: string
  price: number
  stock: number
  image?: string
  quantity: number
}

/**
 * Multi-product cart builder for the in-shop POS flow. Search results come
 * from /api/admin/products/search; adding a product creates or increments a
 * cart line, capped at the product's live stock. The cart is mirrored into a
 * hidden JSON input (`items`) so it submits with the surrounding form, and
 * the running subtotal is shown for the cashier.
 */
export function ProductCartPicker({ name = "items" }: { name?: string }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [cart, setCart] = useState<CartLine[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const controller = new AbortController()
    const timeout = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/admin/products/search?q=${encodeURIComponent(query)}`, { signal: controller.signal })
        const data = await res.json()
        setResults(data.products || [])
      } catch {
        // Aborted or network error — leave previous results as-is.
      } finally {
        setLoading(false)
      }
    }, 250)
    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [query])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function addProduct(p: Product) {
    setCart((current) => {
      const existing = current.find((x) => x.productId === p._id)
      if (existing) {
        if (existing.quantity >= p.stock) return current
        return current.map((x) => (x.productId === p._id ? { ...x, quantity: x.quantity + 1 } : x))
      }
      if (p.stock <= 0) return current
      return [...current, { productId: p._id, name: p.name, price: p.price, stock: p.stock, image: p.image, quantity: 1 }]
    })
    setOpen(false)
    setQuery("")
  }

  function changeQuantity(productId: string, delta: number) {
    setCart((current) =>
      current
        .map((x) => (x.productId === productId ? { ...x, quantity: Math.min(x.stock, Math.max(1, x.quantity + delta)) } : x))
        .filter((x) => x.quantity > 0),
    )
  }

  function removeLine(productId: string) {
    setCart((current) => current.filter((x) => x.productId !== productId))
  }

  const subtotal = cart.reduce((sum, x) => sum + x.price * x.quantity, 0)

  return (
    <div className="space-y-4">
      <input
        type="hidden"
        name={name}
        value={JSON.stringify(cart.map((x) => ({ productId: x.productId, quantity: x.quantity })))}
      />

      <div ref={containerRef} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search products by name or brand..."
            className="pl-9"
          />
          {loading && <Loader2 className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />}
        </div>

        {open && (
          <div className="absolute z-10 mt-1.5 w-full overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10">
            {results.length === 0 ? (
              <div className="p-3 text-sm text-muted-foreground">{loading ? "Searching..." : "No products found."}</div>
            ) : (
              <ul className="max-h-64 overflow-y-auto py-1">
                {results.map((p) => (
                  <li key={p._id}>
                    <button
                      type="button"
                      disabled={p.stock <= 0}
                      onClick={() => addProduct(p)}
                      className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <img
                        src={p.image || "/placeholder.svg"}
                        alt={p.name}
                        className="h-10 w-10 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {p.brand} · {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                        </p>
                      </div>
                      <p className="text-sm font-semibold">{formatCurrency(p.price)}</p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="divide-y divide-border border border-border">
          {cart.map((line) => (
            <div key={line.productId} className="flex items-center gap-3 p-3">
              <img src={line.image || "/placeholder.svg"} alt={line.name} className="h-12 w-12 rounded object-cover" />
              <div className="flex-1">
                <p className="text-sm font-medium">{line.name}</p>
                <p className="text-xs text-muted-foreground">{formatCurrency(line.price)} each</p>
              </div>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" size="icon" className="size-7" onClick={() => changeQuantity(line.productId, -1)}>
                  <Minus className="size-3.5" />
                </Button>
                <span className="w-6 text-center text-sm font-semibold">{line.quantity}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-7"
                  disabled={line.quantity >= line.stock}
                  onClick={() => changeQuantity(line.productId, 1)}
                >
                  <Plus className="size-3.5" />
                </Button>
              </div>
              <p className="w-20 text-right text-sm font-semibold">{formatCurrency(line.price * line.quantity)}</p>
              <Button type="button" variant="ghost" size="icon" className="size-7 text-destructive" onClick={() => removeLine(line.productId)}>
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          ))}
          <div className="flex items-center justify-between p-3 bg-muted/40">
            <p className="text-sm font-semibold">Subtotal</p>
            <p className="text-lg font-bold">{formatCurrency(subtotal)}</p>
          </div>
        </div>
      )}

      {cart.length === 0 && (
        <p className="border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
          Search and add products to build the sale.
        </p>
      )}
    </div>
  )
}
