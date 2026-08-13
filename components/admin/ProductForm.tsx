"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, Plus, Trash2, Loader2 } from "lucide-react"
import { saveProduct, deleteProduct } from "@/actions/admin"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ImageUploader } from "@/components/admin/ImageUploader"
import { PRODUCT_CATEGORY_LABELS } from "@/lib/constants"

interface ProductFormProps {
  product?: {
    _id?: string
    name?: string
    category?: string
    brand?: string
    price?: number
    stock?: number
    image?: string
    images?: string[]
    description?: string
    published?: boolean
    featured?: boolean
    specifications?: Record<string, string>
  }
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter()
  const isEditing = Boolean(product?._id)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState(product?.category || "gaming-pcs")
  const [published, setPublished] = useState(product?.published ?? true)
  const [featured, setFeatured] = useState(product?.featured ?? false)

  const existingSpecs = product?.specifications
    ? Object.entries(product.specifications)
    : []

  const [specs, setSpecs] = useState<[string, string][]>(
    existingSpecs.length > 0 ? existingSpecs : [["", ""]],
  )

  function addSpec() {
    setSpecs((prev) => [...prev, ["", ""]])
  }

  function removeSpec(index: number) {
    setSpecs((prev) => prev.filter((_, i) => i !== index))
  }

  function updateSpec(index: number, field: 0 | 1, value: string) {
    setSpecs((prev) =>
      prev.map((pair, i) => (i === index ? ([field === 0 ? value : pair[0], field === 1 ? value : pair[1]] as [string, string]) : pair)),
    )
  }

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)

    // Controlled fields don't submit via native form attrs (Select/Switch), so set them explicitly.
    formData.set("category", category)
    formData.set("published", published ? "on" : "off")
    formData.set("featured", featured ? "on" : "off")

    try {
      const result = await saveProduct(formData)

      if (!result?.ok) {
        setError(result?.error ?? "Failed to save product. Please try again.")
        setIsLoading(false)
        return
      }

      router.push("/admin/products")
      router.refresh()
    } catch (err) {
      // guard() throws (e.g. session expired or not an admin) instead of returning a result
      setError(err instanceof Error ? err.message : "Failed to save product. Please try again.")
      setIsLoading(false)
    }
  }

  async function handleDelete() {
    if (!product?._id) return
    if (!confirm("Delete this product? This cannot be undone.")) return

    setIsDeleting(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.set("id", product._id)
      const result = await deleteProduct(formData)

      if (!result?.ok) {
        setError(result?.error ?? "Failed to delete product.")
        setIsDeleting(false)
        return
      }

      router.push("/admin/products")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product.")
      setIsDeleting(false)
    }
  }

  return (
    <form action={handleSubmit} className="max-w-4xl space-y-6">
      {isEditing && <input type="hidden" name="id" value={product!._id} />}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Product name, category, and brand details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g., ASUS ROG Strix Gaming Laptop"
              defaultValue={product?.name}
              required
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PRODUCT_CATEGORY_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand">Brand *</Label>
              <Input
                id="brand"
                name="brand"
                placeholder="e.g., ASUS"
                defaultValue={product?.brand}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing & Inventory */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing & Inventory</CardTitle>
          <CardDescription>Set price and manage stock levels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Price (AED) *</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-sm text-muted-foreground">AED</span>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="0.00"
                  className="pl-12"
                  defaultValue={product?.price}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity *</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                placeholder="0"
                defaultValue={product?.stock ?? 0}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media & Description */}
      <Card>
        <CardHeader>
          <CardTitle>Media & Description</CardTitle>
          <CardDescription>Upload product photos and write a detailed description</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label>Product Images *</Label>
            <ImageUploader name="images" initialImages={product?.images?.length ? product.images : product?.image ? [product.image] : []} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              rows={5}
              placeholder="Describe the product features, specifications, and benefits..."
              defaultValue={product?.description}
              required
            />
            <p className="text-xs text-muted-foreground">
              Be descriptive to help customers understand the product
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>Specifications</CardTitle>
          <CardDescription>Add key technical specifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {specs.map(([key, val], index) => (
              <div key={index} className="flex items-end gap-2">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`spec-key-${index}`} className="text-xs">
                    Key
                  </Label>
                  <Input
                    id={`spec-key-${index}`}
                    type="text"
                    name={`spec_key_${index}`}
                    placeholder="e.g., GPU"
                    value={key}
                    onChange={(e) => updateSpec(index, 0, e.target.value)}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`spec-val-${index}`} className="text-xs">
                    Value
                  </Label>
                  <Input
                    id={`spec-val-${index}`}
                    type="text"
                    name={`spec_val_${index}`}
                    placeholder="e.g., RTX 4080"
                    value={val}
                    onChange={(e) => updateSpec(index, 1, e.target.value)}
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => removeSpec(index)}
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                  aria-label="Remove specification"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button type="button" onClick={addSpec} variant="outline" size="sm" className="w-full gap-2">
            <Plus className="size-4" />
            Add Specification
          </Button>
        </CardContent>
      </Card>

      {/* Visibility */}
      <Card>
        <CardHeader>
          <CardTitle>Visibility & Status</CardTitle>
          <CardDescription>Control how this product appears in your store</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-input p-3">
            <div>
              <p className="text-sm font-medium">Published</p>
              <p className="text-xs text-muted-foreground">Make this product visible in your store</p>
            </div>
            <Switch checked={published} onCheckedChange={setPublished} aria-label="Toggle published" />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-input p-3">
            <div>
              <p className="text-sm font-medium">Featured</p>
              <p className="text-xs text-muted-foreground">Highlight on homepage and category pages</p>
            </div>
            <Switch checked={featured} onCheckedChange={setFeatured} aria-label="Toggle featured" />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isLoading} className="gap-2">
          {isLoading && <Loader2 className="size-4 animate-spin" />}
          {isEditing ? "Save Changes" : "Create Product"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading || isDeleting}>
          Cancel
        </Button>
        {isEditing && (
          <Button
            type="button"
            variant="destructive"
            className="ml-auto gap-2"
            disabled={isDeleting || isLoading}
            onClick={handleDelete}
          >
            {isDeleting && <Loader2 className="size-4 animate-spin" />}
            Delete Product
          </Button>
        )}
      </div>
    </form>
  )
}
