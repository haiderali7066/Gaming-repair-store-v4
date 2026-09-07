"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { connectToDatabase } from "@/lib/mongodb"
import { slugify } from "@/lib/helpers"
import {
  adminBuyBackSchema,
  adminRepairSchema,
  posSaleSchema,
} from "@/lib/validators"

import { Product } from "@/models/Product"
import { Category } from "@/models/Category"
import { Order } from "@/models/Order"
import { RepairRequest } from "@/models/RepairRequest"
import { BuyBackRequest } from "@/models/BuyBackRequest"
import { User } from "@/models/User"

async function guard() {
  const session = await auth()

  if (session?.user?.role !== "admin") {
    throw new Error(
      "Unauthorized: admin access required. Please sign in with an admin account.",
    )
  }

  await connectToDatabase()
}

function revalidateAll(slug?: string) {
  revalidatePath("/")
  revalidatePath("/shop")
  revalidatePath("/admin/products")

  if (slug) {
    revalidatePath(`/shop/${slug}`)
  }
}

/* -------------------------------------------------------------------------- */
/* PRODUCT                                                                     */
/* -------------------------------------------------------------------------- */

export async function saveProduct(formData: FormData) {
  await guard()

  const id = String(formData.get("id") || "")
  const name = String(formData.get("name") || "").trim()

  if (!name) {
    return {
      ok: false,
      error: "Product name is required.",
    }
  }

  const category = String(
    formData.get("category") || "",
  ).trim()

  if (!category) {
    return {
      ok: false,
      error: "Category is required.",
    }
  }

  const specifications: Record<string, string> = {}

  for (const [key, value] of formData.entries()) {
    if (key.startsWith("spec_key_")) {
      const index = key.replace("spec_key_", "")

      const specValue = String(
        formData.get(`spec_val_${index}`) || "",
      ).trim()

      const specKey = String(value).trim()

      if (specKey && specValue) {
        specifications[specKey] = specValue
      }
    }
  }

  let images: string[] = []

  try {
    images = JSON.parse(
      String(formData.get("images") || "[]"),
    )

    if (!Array.isArray(images)) {
      images = []
    }

    images = images.filter(
      (image) =>
        typeof image === "string" &&
        image.trim().length > 0,
    )
  } catch {
    images = []
  }

  const price = Number(formData.get("price"))
  const stock = Number(formData.get("stock"))

  const slug = slugify(name)

  const data = {
    name,
    slug,
    category,

    brand: String(
      formData.get("brand") || "",
    ).trim(),

    price: Number.isFinite(price)
      ? Math.max(0, price)
      : 0,

    stock: Number.isFinite(stock)
      ? Math.max(0, stock)
      : 0,

    image: images[0] || "",
    images,

    description: String(
      formData.get("description") || "",
    ).trim(),

    published:
      formData.get("published") === "on",

    featured:
      formData.get("featured") === "on",

    used:
      formData.get("used") === "on",

    specifications,
  }

  if (!data.brand) {
    return {
      ok: false,
      error: "Brand is required.",
    }
  }

  if (images.length === 0) {
    return {
      ok: false,
      error: "Upload at least one product image.",
    }
  }

  if (!data.description) {
    return {
      ok: false,
      error: "Description is required.",
    }
  }

  try {
    if (id) {
      const existing = await Product.findById(id)
        .select("slug")
        .lean()

      const existingSlug = existing
        ? String(existing.slug)
        : ""

      const finalSlug =
        existing &&
        slugify(name) === slugify(existingSlug)
          ? existingSlug
          : slug

      await Product.findByIdAndUpdate(
        id,
        {
          ...data,
          slug: finalSlug,
        },
        {
          runValidators: true,
        },
      )

      revalidateAll(finalSlug)
    } else {
      const conflict = await Product.findOne({
        slug,
      }).lean()

      const finalSlug = conflict
        ? `${slug}-${Date.now()}`
        : slug

      await Product.create({
        ...data,
        slug: finalSlug,
      })

      revalidateAll(finalSlug)
    }
  } catch (err) {
    console.error(
      "[admin] saveProduct error:",
      err,
    )

    return {
      ok: false,
      error:
        "Failed to save product. Please try again.",
    }
  }

  return {
    ok: true,
  }
}

/* -------------------------------------------------------------------------- */
/* CATEGORIES                                                                  */
/* -------------------------------------------------------------------------- */

export async function getCategories() {
  await guard()

  try {
    const categories = await Category.find({})
      .sort({ name: 1 })
      .select("name slug")
      .lean()

    return {
      ok: true,

      categories: categories.map(
        (category) => ({
          name: category.name,
          slug: category.slug,
        }),
      ),
    }
  } catch (err) {
    console.error(
      "[admin] getCategories error:",
      err,
    )

    return {
      ok: false,
      categories: [],
      error: "Failed to load categories.",
    }
  }
}

/* -------------------------------------------------------------------------- */
/* CREATE CATEGORY                                                             */
/* -------------------------------------------------------------------------- */

export async function createCategory(
  name: string,
) {
  await guard()

  const cleanName = name.trim()

  if (!cleanName) {
    return {
      ok: false,
      error: "Category name is required.",
    }
  }

  if (cleanName.length < 2) {
    return {
      ok: false,
      error:
        "Category name must be at least 2 characters.",
    }
  }

  if (cleanName.length > 50) {
    return {
      ok: false,
      error:
        "Category name must be 50 characters or less.",
    }
  }

  const slug = slugify(cleanName)

  if (!slug) {
    return {
      ok: false,
      error: "Invalid category name.",
    }
  }

  try {
    const existingBySlug =
      await Category.findOne({
        slug,
      }).lean()

    if (existingBySlug) {
      return {
        ok: false,
        error:
          "A category with this name already exists.",
      }
    }

    const escapedName =
      cleanName.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&",
      )

    const existingByName =
      await Category.findOne({
        name: {
          $regex: `^${escapedName}$`,
          $options: "i",
        },
      }).lean()

    if (existingByName) {
      return {
        ok: false,
        error:
          "A category with this name already exists.",
      }
    }

    const category = await Category.create({
      name: cleanName,
      slug,
    })

    revalidatePath("/admin/products")
    revalidatePath("/shop")

    return {
      ok: true,

      category: {
        name: category.name,
        slug: category.slug,
      },
    }
  } catch (err) {
    console.error(
      "[admin] createCategory error:",
      err,
    )

    return {
      ok: false,
      error:
        "Failed to create category. Please try again.",
    }
  }
}

/* -------------------------------------------------------------------------- */
/* DELETE CATEGORY                                                             */
/* -------------------------------------------------------------------------- */

export async function deleteCategory(
  slug: string,
) {
  await guard()

  const cleanSlug = slug.trim()

  if (!cleanSlug) {
    return {
      ok: false,
      error: "Invalid category.",
    }
  }

  try {
    const category = await Category.findOne({
      slug: cleanSlug,
    }).lean()

    if (!category) {
      return {
        ok: false,
        error: "Category not found.",
      }
    }

    /*
     * Never allow deletion while products
     * are still assigned to this category.
     */
    const productCount =
      await Product.countDocuments({
        category: cleanSlug,
      })

    if (productCount > 0) {
      return {
        ok: false,
        error: `This category is being used by ${productCount} product${
          productCount === 1 ? "" : "s"
        }. Move those products to another category first.`,
      }
    }

    await Category.findOneAndDelete({
      slug: cleanSlug,
    })

    revalidatePath("/admin/products")
    revalidatePath("/shop")

    return {
      ok: true,
    }
  } catch (err) {
    console.error(
      "[admin] deleteCategory error:",
      err,
    )

    return {
      ok: false,
      error:
        "Failed to delete category. Please try again.",
    }
  }
}

/* -------------------------------------------------------------------------- */
/* DELETE PRODUCT                                                              */
/* -------------------------------------------------------------------------- */

export async function deleteProduct(
  formData: FormData,
) {
  await guard()

  const id = String(
    formData.get("id") || "",
  )

  if (!id) {
    return {
      ok: false,
      error: "Missing product id.",
    }
  }

  try {
    const product =
      (await Product.findById(id)
        .select("slug")
        .lean()) as {
        slug: string
      } | null

    await Product.findByIdAndDelete(id)

    revalidateAll(product?.slug)
  } catch (err) {
    console.error(
      "[admin] deleteProduct error:",
      err,
    )

    return {
      ok: false,
      error: "Failed to delete product.",
    }
  }

  return {
    ok: true,
  }
}

/* -------------------------------------------------------------------------- */
/* STATUS                                                                      */
/* -------------------------------------------------------------------------- */

export async function updateStatus(
  formData: FormData,
) {
  await guard()

  const kind = String(
    formData.get("kind"),
  )

  const id = String(
    formData.get("id"),
  )

  const status = String(
    formData.get("status"),
  )

  const Model =
    kind === "order"
      ? Order
      : kind === "repair"
        ? RepairRequest
        : BuyBackRequest

  await Model.findByIdAndUpdate(id, {
    status,
  })

  const adminPath =
    kind === "order"
      ? "orders"
      : kind === "repair"
        ? "repairs"
        : "buy-back"

  revalidatePath(`/admin/${adminPath}`)
  revalidatePath(
    `/admin/${adminPath}/${id}`,
  )
}

/* -------------------------------------------------------------------------- */
/* BUYBACK OFFER                                                               */
/* -------------------------------------------------------------------------- */

export async function setBuybackOffer(
  formData: FormData,
) {
  await guard()

  const id = String(
    formData.get("id") || "",
  )

  if (!id) {
    return {
      ok: false,
      error: "Missing request id.",
    }
  }

  const offeredPrice = Math.max(
    0,
    Number(
      formData.get("offeredPrice"),
    ),
  )

  if (
    !Number.isFinite(offeredPrice) ||
    offeredPrice <= 0
  ) {
    return {
      ok: false,
      error: "Enter a valid offer amount.",
    }
  }

  try {
    await BuyBackRequest.findByIdAndUpdate(
      id,
      {
        offeredPrice,
        status: "quoted",
      },
    )
  } catch (err) {
    console.error(
      "[admin] setBuybackOffer error:",
      err,
    )

    return {
      ok: false,
      error:
        "Failed to save offer. Please try again.",
    }
  }

  revalidatePath("/admin/buy-back")
  revalidatePath(
    `/admin/buy-back/${id}`,
  )

  return {
    ok: true,
  }
}

/* -------------------------------------------------------------------------- */
/* STOCK                                                                       */
/* -------------------------------------------------------------------------- */

export async function updateStock(
  formData: FormData,
) {
  await guard()

  const id = String(
    formData.get("id"),
  )

  const stock = Math.max(
    0,
    Number(formData.get("stock")),
  )

  const product =
    (await Product.findByIdAndUpdate(
      id,
      { stock },
      { new: true },
    )
      .select("slug")
      .lean()) as {
      slug: string
    } | null

  revalidatePath("/admin/inventory")
  revalidatePath("/shop")

  if (product?.slug) {
    revalidatePath(
      `/shop/${product.slug}`,
    )
  }
}

/* -------------------------------------------------------------------------- */
/* REPAIR                                                                      */
/* -------------------------------------------------------------------------- */

export async function createRepairForCustomer(
  formData: FormData,
) {
  await guard()

  const parsed =
    adminRepairSchema.safeParse(
      Object.fromEntries(formData),
    )

  if (!parsed.success) {
    return {
      ok: false,
      error:
        "Please complete all required repair details.",
    }
  }

  const customer =
    (await User.findById(
      parsed.data.customerId,
    )
      .select("phone")
      .lean()) as {
      phone?: string
    } | null

  if (!customer) {
    return {
      ok: false,
      error:
        "Selected customer was not found.",
    }
  }

  const contact =
    parsed.data.contact ||
    customer.phone

  if (!contact) {
    return {
      ok: false,
      error: "A contact number is required.",
    }
  }

  try {
    const repair =
      await RepairRequest.create({
        userId: parsed.data.customerId,
        deviceType: parsed.data.deviceType,
        brand: parsed.data.brand,
        model: parsed.data.model,
        problem: parsed.data.problem,
        contact,
        image:
          parsed.data.image ||
          undefined,
        source: "in-shop",
      })

    revalidatePath("/admin/repairs")

    return {
      ok: true,
      id: repair._id.toString(),
    }
  } catch (err) {
    console.error(
      "[admin] createRepairForCustomer error:",
      err,
    )

    return {
      ok: false,
      error:
        "Failed to create repair request. Please try again.",
    }
  }
}

/* -------------------------------------------------------------------------- */
/* BUYBACK                                                                     */
/* -------------------------------------------------------------------------- */

export async function createBuyBackForCustomer(
  formData: FormData,
) {
  await guard()

  const parsed =
    adminBuyBackSchema.safeParse(
      Object.fromEntries(formData),
    )

  if (!parsed.success) {
    return {
      ok: false,
      error:
        "Please complete all required device details.",
    }
  }

  const customer =
    await User.exists({
      _id: parsed.data.customerId,
    })

  if (!customer) {
    return {
      ok: false,
      error:
        "Selected customer was not found.",
    }
  }

  try {
    const buyback =
      await BuyBackRequest.create({
        userId: parsed.data.customerId,
        deviceType: parsed.data.deviceType,
        brand: parsed.data.brand,
        model: parsed.data.model,
        specifications:
          parsed.data.specifications,
        condition: parsed.data.condition,
        description:
          parsed.data.description,
        expectedPrice:
          parsed.data.expectedPrice,
        offeredPrice:
          parsed.data.offeredPrice,
        image:
          parsed.data.image ||
          undefined,
        status:
          parsed.data.offeredPrice
            ? "quoted"
            : "submitted",
        source: "in-shop",
      })

    revalidatePath("/admin/buy-back")

    return {
      ok: true,
      id: buyback._id.toString(),
    }
  } catch (err) {
    console.error(
      "[admin] createBuyBackForCustomer error:",
      err,
    )

    return {
      ok: false,
      error:
        "Failed to create trade-in request. Please try again.",
    }
  }
}

/* -------------------------------------------------------------------------- */
/* POS SALE                                                                    */
/* -------------------------------------------------------------------------- */

export async function createPosSale(
  formData: FormData,
) {
  await guard()

  let itemsInput: unknown

  try {
    itemsInput = JSON.parse(
      String(
        formData.get("items") || "[]",
      ),
    )
  } catch {
    return {
      ok: false,
      error: "Invalid cart data.",
    }
  }

  const parsed =
    posSaleSchema.safeParse({
      customerId: String(
        formData.get("customerId") ||
          "",
      ),

      paymentMethod: String(
        formData.get("paymentMethod") ||
          "",
      ),

      paymentNote: String(
        formData.get("paymentNote") ||
          "",
      ),

      items: itemsInput,
    })

  if (!parsed.success) {
    return {
      ok: false,
      error:
        "Please select a customer, at least one product, and a payment method.",
    }
  }

  const customer =
    (await User.findById(
      parsed.data.customerId,
    )
      .select("name phone address")
      .lean()) as {
      name?: string
      phone?: string
      address?: string
    } | null

  if (!customer) {
    return {
      ok: false,
      error:
        "Selected customer was not found.",
    }
  }

  const ids = parsed.data.items.map(
    (item) => item.productId,
  )

  const products = await Product.find({
    _id: {
      $in: ids,
    },
  })

  const items = []

  for (const item of parsed.data.items) {
    const product = products.find(
      (product) =>
        product.id === item.productId,
    )

    if (!product) {
      return {
        ok: false,
        error:
          "One or more products could not be found.",
      }
    }

    if (
      product.stock < item.quantity
    ) {
      return {
        ok: false,
        error: `Not enough stock for "${product.name}" (${product.stock} available).`,
      }
    }

    items.push({
      productId: product._id,
      name: product.name,
      slug: product.slug,
      image: product.image,
      price: product.price,
      quantity: item.quantity,
    })
  }

  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      item.price *
        item.quantity,
    0,
  )

  try {
    const order =
      await Order.create({
        userId:
          parsed.data.customerId,

        items,

        subtotal,

        status: "completed",

        source: "in-shop",

        paymentMethod:
          parsed.data.paymentMethod,

        shipping: {
          fullName: customer.name,
          phone: customer.phone,
          address:
            customer.address ||
            "In-store pickup",
          city: "",
          notes:
            parsed.data.paymentNote ||
            undefined,
        },
      })

    await Promise.all(
      items.map((item) =>
        Product.updateOne(
          {
            _id: item.productId,
            stock: {
              $gte: item.quantity,
            },
          },
          {
            $inc: {
              stock:
                -item.quantity,
            },
          },
        ),
      ),
    )

    revalidatePath("/admin/orders")
    revalidatePath("/admin/inventory")
    revalidatePath("/shop")

    return {
      ok: true,

      orderNumber:
        order.orderNumber as string,

      id: order._id.toString(),
    }
  } catch (err) {
    console.error(
      "[admin] createPosSale error:",
      err,
    )

    return {
      ok: false,
      error:
        "Failed to complete sale. Please try again.",
    }
  }
}