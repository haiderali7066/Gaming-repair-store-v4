import { ProductForm } from "@/components/admin/ProductForm"

export default function AddProductPage() {
  return (
    <main className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Product</h1>
        <p className="text-muted-foreground">Add a new product to your catalog</p>
      </div>
      <ProductForm />
    </main>
  )
}
