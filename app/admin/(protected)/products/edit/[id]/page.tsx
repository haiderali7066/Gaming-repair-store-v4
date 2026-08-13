import { notFound } from "next/navigation"
import { ProductForm } from "@/components/admin/ProductForm"
import { connectToDatabase } from "@/lib/mongodb"
import { serialize } from "@/lib/helpers"
import { Product } from "@/models/Product"

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  await connectToDatabase()
  const product = serialize(await Product.findById(id).lean())

  if (!product) notFound()

  return (
    <main className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
        <p className="text-muted-foreground">Update product information and inventory</p>
      </div>
      <ProductForm product={product} />
    </main>
  )
}
