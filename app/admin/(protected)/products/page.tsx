import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getAllProducts } from "@/lib/data"
import { formatCurrency } from "@/lib/helpers"
import { DeleteProductButton } from "@/components/admin/DeleteProductButton"

export const dynamic = "force-dynamic"

export default async function ProductsPage() {
  const products = (await getAllProducts()) as {
    _id: string
    name: string
    category: string
    stock: number
    price: number
    published: boolean
    featured: boolean
  }[]

  const stats = {
    total: products.length,
    published: products.filter((p) => p.published).length,
    draft: products.filter((p) => !p.published).length,
    lowStock: products.filter((p) => p.stock < 5 && p.stock > 0).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
  }

  return (
    <main className="flex flex-col gap-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Catalog</h1>
          <p className="text-muted-foreground">Create, edit, and manage your product inventory</p>
        </div>
        <Button render={<Link href="/admin/products/add" />} className="shrink-0">
          Add Product
        </Button>
      </div>

      {/* Stats */}
      {products.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.published}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{stats.draft}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.lowStock}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.outOfStock}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
          <CardDescription>
            {products.length === 0
              ? "No products yet. Start by adding your first product."
              : `${products.length} product${products.length !== 1 ? "s" : ""} in your catalog`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <div className="py-12 text-center">
              <p className="mb-4 text-lg font-medium">No products yet</p>
              <p className="mb-6 text-muted-foreground">
                Start building your catalog by adding your first product.
              </p>
              <Button render={<Link href="/admin/products/add" />}>Add First Product</Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Featured</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="capitalize text-sm">{product.category}</TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            product.stock === 0
                              ? "font-bold text-red-600"
                              : product.stock < 5
                                ? "font-bold text-orange-600"
                                : "text-green-600"
                          }
                        >
                          {product.stock}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(product.price)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            product.published
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          }
                        >
                          {product.published ? "Live" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {product.featured ? (
                          <Badge className="bg-blue-100 text-blue-800">★ Featured</Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/products/edit/${product._id}`}>
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                          </Link>
                          <DeleteProductButton id={product._id} name={product.name} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
