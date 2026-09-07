"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import {
  AlertCircle,
  Plus,
  Trash2,
  Loader2,
  FolderPlus,
  Package,
  BadgeCheck,
} from "lucide-react"

import {
  saveProduct,
  deleteProduct,
  createCategory,
  deleteCategory,
  getCategories,
} from "@/actions/admin"

import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"

import { Input } from "@/components/ui/input"

import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Switch } from "@/components/ui/switch"

import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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

    used?: boolean

    specifications?: Record<
      string,
      string
    >
  }
}

type CategoryOption = {
  name: string
  slug: string
}

export function ProductForm({
  product,
}: ProductFormProps) {
  const router = useRouter()

  const isEditing = Boolean(
    product?._id,
  )

  const [isLoading, setIsLoading] =
    useState(false)

  const [isDeleting, setIsDeleting] =
    useState(false)

  const [error, setError] =
    useState<string | null>(null)

  const [category, setCategory] =
    useState(
      product?.category ||
        "gaming-pcs",
    )

  const [categories, setCategories] =
    useState<CategoryOption[]>([])

  const [published, setPublished] =
    useState(
      product?.published ?? true,
    )

  const [featured, setFeatured] =
    useState(
      product?.featured ?? false,
    )

  const [used, setUsed] =
    useState(
      product?.used ?? false,
    )

  const [
    isCategoryDialogOpen,
    setIsCategoryDialogOpen,
  ] = useState(false)

  const [newCategory, setNewCategory] =
    useState("")

  const [
    isCategoryActionLoading,
    setIsCategoryActionLoading,
  ] = useState(false)

  const existingSpecs =
    product?.specifications
      ? Object.entries(
          product.specifications,
        )
      : []

  const [specs, setSpecs] =
    useState<[string, string][]>(
      existingSpecs.length > 0
        ? existingSpecs
        : [["", ""]],
    )

  /* ------------------------------------------------------------------------ */
  /* LOAD CATEGORIES                                                          */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    async function loadCategories() {
      try {
        const result =
          await getCategories()

        if (result?.ok) {
          setCategories(
            result.categories,
          )
        }
      } catch (err) {
        console.error(
          "[ProductForm] Failed to load categories:",
          err,
        )
      }
    }

    loadCategories()
  }, [])

  /* ------------------------------------------------------------------------ */
  /* CATEGORY OPTIONS                                                         */
  /* ------------------------------------------------------------------------ */

  const categoryOptions: CategoryOption[] =
    [
      ...Object.entries(
        PRODUCT_CATEGORY_LABELS,
      ).map(
        ([slug, name]) => ({
          slug,
          name,
        }),
      ),

      ...categories,
    ].filter(
      (item, index, array) =>
        array.findIndex(
          (x) =>
            x.slug === item.slug,
        ) === index,
    )

  /* ------------------------------------------------------------------------ */
  /* SPECIFICATIONS                                                           */
  /* ------------------------------------------------------------------------ */

  function addSpec() {
    setSpecs((prev) => [
      ...prev,
      ["", ""],
    ])
  }

  function removeSpec(
    index: number,
  ) {
    setSpecs((prev) =>
      prev.filter(
        (_, i) => i !== index,
      ),
    )
  }

  function updateSpec(
    index: number,
    field: 0 | 1,
    value: string,
  ) {
    setSpecs((prev) =>
      prev.map(
        (pair, i) =>
          i === index
            ? ([
                field === 0
                  ? value
                  : pair[0],

                field === 1
                  ? value
                  : pair[1],
              ] as [
                string,
                string,
              ])
            : pair,
      ),
    )
  }

  /* ------------------------------------------------------------------------ */
  /* CREATE CATEGORY                                                          */
  /* ------------------------------------------------------------------------ */

  async function handleCreateCategory() {
    const name =
      newCategory.trim()

    if (!name) {
      return
    }

    setIsCategoryActionLoading(
      true,
    )

    setError(null)

    try {
      const result =
        await createCategory(name)

      if (
        !result?.ok ||
        !result.category
      ) {
        setError(
          result?.error ||
            "Failed to create category.",
        )

        return
      }

      const createdCategory =
        result.category

      setCategories((prev) => [
        ...prev,
        createdCategory,
      ])

      setCategory(
        createdCategory.slug,
      )

      setNewCategory("")

      setIsCategoryDialogOpen(false)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create category.",
      )
    } finally {
      setIsCategoryActionLoading(
        false,
      )
    }
  }

  /* ------------------------------------------------------------------------ */
  /* DELETE CATEGORY                                                          */
  /* ------------------------------------------------------------------------ */

  async function handleDeleteCategory(
    item: CategoryOption,
  ) {
    const confirmed =
      window.confirm(
        `Delete "${item.name}"?\n\nThis category can only be deleted if no products are currently using it.`,
      )

    if (!confirmed) {
      return
    }

    setIsCategoryActionLoading(
      true,
    )

    setError(null)

    try {
      const result =
        await deleteCategory(
          item.slug,
        )

      if (!result?.ok) {
        setError(
          result?.error ||
            "Failed to delete category.",
        )

        return
      }

      setCategories((prev) =>
        prev.filter(
          (category) =>
            category.slug !==
            item.slug,
        ),
      )

      if (
        category === item.slug
      ) {
        setCategory(
          "gaming-pcs",
        )
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete category.",
      )
    } finally {
      setIsCategoryActionLoading(
        false,
      )
    }
  }

  /* ------------------------------------------------------------------------ */
  /* SAVE PRODUCT                                                             */
  /* ------------------------------------------------------------------------ */

  async function handleSubmit(
    formData: FormData,
  ) {
    setIsLoading(true)

    setError(null)

    formData.set(
      "category",
      category,
    )

    formData.set(
      "published",
      published
        ? "on"
        : "off",
    )

    formData.set(
      "featured",
      featured
        ? "on"
        : "off",
    )

    formData.set(
      "used",
      used
        ? "on"
        : "off",
    )

    try {
      const result =
        await saveProduct(
          formData,
        )

      if (!result?.ok) {
        setError(
          result?.error ||
            "Failed to save product. Please try again.",
        )

        setIsLoading(false)

        return
      }

      router.push(
        "/admin/products",
      )

      router.refresh()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save product. Please try again.",
      )

      setIsLoading(false)
    }
  }

  /* ------------------------------------------------------------------------ */
  /* DELETE PRODUCT                                                           */
  /* ------------------------------------------------------------------------ */

  async function handleDelete() {
    if (!product?._id) {
      return
    }

    const confirmed =
      window.confirm(
        "Delete this product? This cannot be undone.",
      )

    if (!confirmed) {
      return
    }

    setIsDeleting(true)

    setError(null)

    try {
      const formData =
        new FormData()

      formData.set(
        "id",
        product._id,
      )

      const result =
        await deleteProduct(
          formData,
        )

      if (!result?.ok) {
        setError(
          result?.error ||
            "Failed to delete product.",
        )

        setIsDeleting(false)

        return
      }

      router.push(
        "/admin/products",
      )

      router.refresh()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete product.",
      )

      setIsDeleting(false)
    }
  }

  /* ------------------------------------------------------------------------ */
  /* UI                                                                        */
  /* ------------------------------------------------------------------------ */

  return (
    <>
      <form
        action={handleSubmit}
        className="max-w-4xl space-y-5"
      >
        {isEditing && (
          <input
            type="hidden"
            name="id"
            value={product!._id}
          />
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="size-4" />

            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* BASIC INFORMATION                                                */}
        {/* ---------------------------------------------------------------- */}

        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-slate-50/70 px-5 py-4 sm:px-6">
            <CardTitle className="flex items-center gap-2 text-base">
              <Package className="size-4 text-violet-500" />

              Basic Information
            </CardTitle>

            <CardDescription className="text-xs">
              Product name, category,
              and brand details.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 p-5 sm:p-6">
            <div className="space-y-2">
              <Label htmlFor="name">
                Product Name *
              </Label>

              <Input
                id="name"
                name="name"
                placeholder="e.g. ASUS ROG Strix Gaming Laptop"
                defaultValue={
                  product?.name
                }
                required
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* CATEGORY */}

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="category">
                    Category *
                  </Label>

                  <button
                    type="button"
                    onClick={() =>
                      setIsCategoryDialogOpen(
                        true,
                      )
                    }
                    className="inline-flex items-center gap-1 text-xs font-bold text-violet-600 transition hover:text-violet-700"
                  >
                    <FolderPlus className="size-3.5" />

                    Manage
                  </button>
                </div>

                <Select
                  value={category}
                  onValueChange={
                    setCategory
                  }
                >
                  <SelectTrigger
                    id="category"
                    className="w-full"
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    {categoryOptions.map(
                      (item) => (
                        <SelectItem
                          key={
                            item.slug
                          }
                          value={
                            item.slug
                          }
                        >
                          {item.name}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* BRAND */}

              <div className="space-y-2">
                <Label htmlFor="brand">
                  Brand *
                </Label>

                <Input
                  id="brand"
                  name="brand"
                  placeholder="e.g. ASUS"
                  defaultValue={
                    product?.brand
                  }
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ---------------------------------------------------------------- */}
        {/* PRICING                                                          */}
        {/* ---------------------------------------------------------------- */}

        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-slate-50/70 px-5 py-4 sm:px-6">
            <CardTitle className="text-base">
              Pricing & Inventory
            </CardTitle>

            <CardDescription className="text-xs">
              Set the selling price
              and available quantity.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 p-5 sm:p-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">
                  Price (AED) *
                </Label>

                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-muted-foreground">
                    AED
                  </span>

                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-12"
                    defaultValue={
                      product?.price
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">
                  Stock Quantity *
                </Label>

                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  placeholder="0"
                  defaultValue={
                    product?.stock ??
                    0
                  }
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ---------------------------------------------------------------- */}
        {/* MEDIA                                                            */}
        {/* ---------------------------------------------------------------- */}

        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-slate-50/70 px-5 py-4 sm:px-6">
            <CardTitle className="text-base">
              Media & Description
            </CardTitle>

            <CardDescription className="text-xs">
              Upload product photos
              and add a useful
              description.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 p-5 sm:p-6">
            <div className="space-y-2">
              <Label>
                Product Images *
              </Label>

              <ImageUploader
                name="images"
                initialImages={
                  product?.images
                    ?.length
                    ? product.images
                    : product?.image
                      ? [
                          product.image,
                        ]
                      : []
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description *
              </Label>

              <Textarea
                id="description"
                name="description"
                rows={5}
                placeholder="Describe the product features, specifications, and benefits..."
                defaultValue={
                  product?.description
                }
                required
              />

              <p className="text-xs text-muted-foreground">
                Be descriptive to
                help customers
                understand the
                product.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ---------------------------------------------------------------- */}
        {/* SPECIFICATIONS                                                   */}
        {/* ---------------------------------------------------------------- */}

        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-slate-50/70 px-5 py-4 sm:px-6">
            <CardTitle className="text-base">
              Specifications
            </CardTitle>

            <CardDescription className="text-xs">
              Add key technical
              specifications.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 p-5 sm:p-6">
            <div className="space-y-3">
              {specs.map(
                (
                  [key, val],
                  index,
                ) => (
                  <div
                    key={index}
                    className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]"
                  >
                    <div className="space-y-1.5">
                      <Label
                        htmlFor={`spec-key-${index}`}
                        className="text-xs"
                      >
                        Key
                      </Label>

                      <Input
                        id={`spec-key-${index}`}
                        type="text"
                        name={`spec_key_${index}`}
                        placeholder="e.g. GPU"
                        value={key}
                        onChange={(e) =>
                          updateSpec(
                            index,
                            0,
                            e.target
                              .value,
                          )
                        }
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor={`spec-val-${index}`}
                        className="text-xs"
                      >
                        Value
                      </Label>

                      <Input
                        id={`spec-val-${index}`}
                        type="text"
                        name={`spec_val_${index}`}
                        placeholder="e.g. RTX 4080"
                        value={val}
                        onChange={(e) =>
                          updateSpec(
                            index,
                            1,
                            e.target
                              .value,
                          )
                        }
                      />
                    </div>

                    <Button
                      type="button"
                      onClick={() =>
                        removeSpec(
                          index,
                        )
                      }
                      variant="outline"
                      size="icon"
                      className="mt-auto shrink-0"
                      aria-label="Remove specification"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ),
              )}
            </div>

            <Button
              type="button"
              onClick={addSpec}
              variant="outline"
              size="sm"
              className="w-full gap-2"
            >
              <Plus className="size-4" />

              Add Specification
            </Button>
          </CardContent>
        </Card>

        {/* ---------------------------------------------------------------- */}
        {/* STATUS                                                           */}
        {/* ---------------------------------------------------------------- */}

        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-slate-50/70 px-5 py-4 sm:px-6">
            <CardTitle className="text-base">
              Product Status
            </CardTitle>

            <CardDescription className="text-xs">
              Control how this product
              is displayed in your
              store.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3 p-5 sm:p-6">
            {/* USED */}

            <div className="flex items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50/60 p-3.5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                  <BadgeCheck className="size-4" />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Used Product
                  </p>

                  <p className="text-xs leading-5 text-slate-500">
                    Mark this item as
                    pre-owned or
                    refurbished.
                  </p>
                </div>
              </div>

              <Switch
                checked={used}
                onCheckedChange={
                  setUsed
                }
                aria-label="Toggle used product"
              />
            </div>

            {/* PUBLISHED */}

            <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-3.5">
              <div>
                <p className="text-sm font-bold">
                  Published
                </p>

                <p className="text-xs text-muted-foreground">
                  Make this product
                  visible in your
                  store.
                </p>
              </div>

              <Switch
                checked={published}
                onCheckedChange={
                  setPublished
                }
                aria-label="Toggle published"
              />
            </div>

            {/* FEATURED */}

            <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-3.5">
              <div>
                <p className="text-sm font-bold">
                  Featured
                </p>

                <p className="text-xs text-muted-foreground">
                  Highlight this
                  product on your
                  store.
                </p>
              </div>

              <Switch
                checked={featured}
                onCheckedChange={
                  setFeatured
                }
                aria-label="Toggle featured"
              />
            </div>
          </CardContent>
        </Card>

        {/* ---------------------------------------------------------------- */}
        {/* ACTIONS                                                          */}
        {/* ---------------------------------------------------------------- */}

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Button
            type="submit"
            disabled={
              isLoading ||
              isDeleting
            }
            className="h-10 gap-2 rounded-xl bg-violet-600 px-5 text-xs font-bold hover:bg-violet-700"
          >
            {isLoading && (
              <Loader2 className="size-4 animate-spin" />
            )}

            {isEditing
              ? "Save Changes"
              : "Create Product"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              router.back()
            }
            disabled={
              isLoading ||
              isDeleting
            }
            className="h-10 rounded-xl px-5 text-xs font-bold"
          >
            Cancel
          </Button>

          {isEditing && (
            <Button
              type="button"
              variant="destructive"
              className="ml-auto h-10 gap-2 rounded-xl text-xs font-bold"
              disabled={
                isDeleting ||
                isLoading
              }
              onClick={
                handleDelete
              }
            >
              {isDeleting && (
                <Loader2 className="size-4 animate-spin" />
              )}

              Delete Product
            </Button>
          )}
        </div>
      </form>

      {/* ================================================================== */}
      {/* CATEGORY MANAGER MODAL                                             */}
      {/* ================================================================== */}

      <Dialog
        open={
          isCategoryDialogOpen
        }
        onOpenChange={
          setIsCategoryDialogOpen
        }
      >
        <DialogContent className="w-[calc(100%-2rem)] max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle>
              Manage Categories
            </DialogTitle>

            <DialogDescription>
              Create new categories
              or remove unused
              categories.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            {/* CREATE */}

            <div className="space-y-2">
              <Label htmlFor="new-category">
                New Category
              </Label>

              <div className="flex gap-2">
                <Input
                  id="new-category"
                  value={newCategory}
                  onChange={(e) =>
                    setNewCategory(
                      e.target.value,
                    )
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key ===
                      "Enter"
                    ) {
                      e.preventDefault()

                      handleCreateCategory()
                    }
                  }}
                  placeholder="e.g. Gaming Monitors"
                />

                <Button
                  type="button"
                  onClick={
                    handleCreateCategory
                  }
                  disabled={
                    isCategoryActionLoading ||
                    !newCategory.trim()
                  }
                  className="shrink-0 gap-2 bg-violet-600 hover:bg-violet-700"
                >
                  {isCategoryActionLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Plus className="size-4" />
                  )}

                  Add
                </Button>
              </div>
            </div>

            {/* CUSTOM CATEGORIES */}

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>
                  Custom Categories
                </Label>

                <span className="text-[10px] font-medium text-muted-foreground">
                  {
                    categories.length
                  }{" "}
                  categories
                </span>
              </div>

              <div className="max-h-64 space-y-2 overflow-y-auto rounded-xl border border-slate-200 p-2">
                {categories.length ===
                0 ? (
                  <div className="px-3 py-8 text-center">
                    <FolderPlus className="mx-auto size-7 text-slate-300" />

                    <p className="mt-2 text-sm font-semibold text-slate-600">
                      No custom
                      categories
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Create your
                      first
                      category
                      above.
                    </p>
                  </div>
                ) : (
                  categories.map(
                    (item) => (
                      <div
                        key={
                          item.slug
                        }
                        className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50/70 px-3 py-2.5"
                      >
                        <button
                          type="button"
                          disabled={
                            isCategoryActionLoading
                          }
                          onClick={() => {
                            setCategory(
                              item.slug,
                            )

                            setIsCategoryDialogOpen(
                              false,
                            )
                          }}
                          className="min-w-0 flex-1 text-left"
                        >
                          <p className="truncate text-sm font-semibold text-slate-800">
                            {
                              item.name
                            }
                          </p>

                          <p className="truncate text-[10px] text-slate-400">
                            {
                              item.slug
                            }
                          </p>
                        </button>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleDeleteCategory(
                              item,
                            )
                          }
                          disabled={
                            isCategoryActionLoading
                          }
                          className="size-8 shrink-0 text-slate-400 hover:bg-red-50 hover:text-red-600"
                          aria-label={`Delete ${item.name}`}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    ),
                  )
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setNewCategory("")

                setIsCategoryDialogOpen(
                  false,
                )
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}