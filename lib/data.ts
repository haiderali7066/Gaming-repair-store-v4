"use server"
import { connectToDatabase } from "@/lib/mongodb"
import { serialize } from "@/lib/helpers"
import { Product } from "@/models/Product"

export async function getProducts(filter: Record<string, unknown> = {}) {
  await connectToDatabase()
  return serialize(
    await Product.find({ published: true, ...filter })
      .sort({ featured: -1, createdAt: -1 })
      .lean(),
  )
}

export async function getAllProducts() {
  await connectToDatabase()
  return serialize(await Product.find().sort({ createdAt: -1 }).lean())
}

export async function getProductBySlug(slug: string) {
  await connectToDatabase()
  return serialize(await Product.findOne({ slug, published: true }).lean())
}

export async function getProductById(id: string) {
  await connectToDatabase()
  return serialize(await Product.findById(id).lean())
}

export async function getFeaturedProducts(limit: number = 4) {
  await connectToDatabase()
  return serialize(
    await Product.find({ published: true, featured: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean(),
  )
}
