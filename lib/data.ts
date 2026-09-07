"use server"

import { connectToDatabase } from "@/lib/mongodb"
import { serialize } from "@/lib/helpers"

import { Product } from "@/models/Product"
import { Category } from "@/models/Category"

/* -------------------------------------------------------------------------- */
/* PRODUCTS                                                                   */
/* -------------------------------------------------------------------------- */

export async function getProducts(
  filter: Record<string, unknown> = {},
  options: {
    limit?: number
    skip?: number
  } = {},
) {
  await connectToDatabase()

  const {
    limit,
    skip = 0,
  } = options

  let query = Product.find({
    published: true,
    ...filter,
  })
    .sort({
      featured: -1,
      createdAt: -1,
    })
    .skip(skip)

  if (limit) {
    query = query.limit(limit)
  }

  return serialize(
    await query.lean(),
  )
}

/* -------------------------------------------------------------------------- */
/* PRODUCT COUNT                                                              */
/* -------------------------------------------------------------------------- */

export async function getProductCount(
  filter: Record<string, unknown> = {},
) {
  await connectToDatabase()

  return Product.countDocuments({
    published: true,
    ...filter,
  })
}

/* -------------------------------------------------------------------------- */
/* ALL PRODUCTS                                                               */
/* -------------------------------------------------------------------------- */

export async function getAllProducts() {
  await connectToDatabase()

  return serialize(
    await Product.find()
      .sort({
        createdAt: -1,
      })
      .lean(),
  )
}

/* -------------------------------------------------------------------------- */
/* SINGLE PRODUCT                                                             */
/* -------------------------------------------------------------------------- */

export async function getProductBySlug(
  slug: string,
) {
  await connectToDatabase()

  return serialize(
    await Product.findOne({
      slug,
      published: true,
    }).lean(),
  )
}

export async function getProductById(
  id: string,
) {
  await connectToDatabase()

  return serialize(
    await Product.findById(id).lean(),
  )
}

/* -------------------------------------------------------------------------- */
/* FEATURED PRODUCTS                                                          */
/* -------------------------------------------------------------------------- */

export async function getFeaturedProducts(
  limit: number = 4,
) {
  await connectToDatabase()

  return serialize(
    await Product.find({
      published: true,
      featured: true,
    })
      .sort({
        createdAt: -1,
      })
      .limit(limit)
      .lean(),
  )
}

/* -------------------------------------------------------------------------- */
/* PUBLIC CATEGORIES                                                          */
/* -------------------------------------------------------------------------- */

export async function getCategories() {
  await connectToDatabase()

  return serialize(
    await Category.find({})
      .sort({
        name: 1,
      })
      .select("name slug")
      .lean(),
  )
}