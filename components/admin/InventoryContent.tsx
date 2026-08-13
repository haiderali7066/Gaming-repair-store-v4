"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency } from "@/lib/helpers"

export interface InventoryProduct {
  _id: string
  name: string
  price: number
  stock: number
  category: string
  sku?: string
}

export function InventoryContent({
  products,
  stats,
}: {
  products: InventoryProduct[]
  stats: Record<string, number>
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [stockFilter, setStockFilter] = useState("all")

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())

    let matchesStock = true
    if (stockFilter === "low") matchesStock = p.stock < 5 && p.stock > 0
    if (stockFilter === "out") matchesStock = p.stock === 0
    if (stockFilter === "ok") matchesStock = p.stock >= 5

    return matchesSearch && matchesStock
  })

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-800" }
    if (stock < 5) return { label: "Low Stock", color: "bg-orange-100 text-orange-800" }
    return { label: "In Stock", color: "bg-green-100 text-green-800" }
  }

  return (
    <main className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
        <p className="text-muted-foreground">Track and manage product stock levels</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalItems}</div>
            <p className="mt-1 text-xs text-muted-foreground">In stock</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {formatCurrency(stats.totalValue)}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Total cost</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{stats.lowStock}</div>
            <p className="mt-1 text-xs text-muted-foreground">Below 5 units</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{stats.outOfStock}</div>
            <p className="mt-1 text-xs text-muted-foreground">Need reorder</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.categories}</div>
            <p className="mt-1 text-xs text-muted-foreground">Product types</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter & Search */}
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
          <CardDescription>Manage inventory and stock levels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Input
              placeholder="Search by product name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={stockFilter} onValueChange={(value) => setStockFilter(value || "all")}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="All stock levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="ok">In Stock (&ge;5)</SelectItem>
                <SelectItem value="low">Low Stock (&lt;5)</SelectItem>
                <SelectItem value="out">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              {products.length === 0 ? "No products yet" : "No products match your criteria"}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => {
                    const status = getStockStatus(product.stock)
                    return (
                      <TableRow key={product._id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell className="text-sm capitalize">{product.category}</TableCell>
                        <TableCell className="text-sm">{formatCurrency(product.price)}</TableCell>
                        <TableCell className="text-right font-semibold">{product.stock}</TableCell>
                        <TableCell>
                          <Badge className={status.color}>{status.label}</Badge>
                        </TableCell>
                        <TableCell className="text-right text-sm font-semibold">
                          {formatCurrency(product.price * product.stock)}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Alerts */}
      {(stats.lowStock > 0 || stats.outOfStock > 0) && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-900">Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-orange-900">
            {stats.outOfStock > 0 && (
              <p>
                <strong>{stats.outOfStock} product(s)</strong> are out of stock and need immediate
                reordering.
              </p>
            )}
            {stats.lowStock > 0 && (
              <p>
                <strong>{stats.lowStock} product(s)</strong> have low stock levels (below 5 units).
              </p>
            )}
            <p className="text-xs">Review your inventory regularly to maintain optimal stock levels.</p>
          </CardContent>
        </Card>
      )}
    </main>
  )
}
