"use server"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { connectToDatabase } from "@/lib/mongodb"
import { slugify } from "@/lib/helpers"
import { adminBuyBackSchema, adminRepairSchema, posSaleSchema } from "@/lib/validators"
import { Product } from "@/models/Product"
import { Order } from "@/models/Order"
import { RepairRequest } from "@/models/RepairRequest"
import { BuyBackRequest } from "@/models/BuyBackRequest"
import { User } from "@/models/User"

async function guard() {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized: admin access required. Please sign in with an admin account.")
  }
  await connectToDatabase()
}

function revalidateAll(slug?: string) {
  revalidatePath("/")
  revalidatePath("/shop")
  revalidatePath("/admin/products")
  if (slug) revalidatePath(`/shop/${slug}`)
}

export async function saveProduct(formData: FormData) {
  await guard()
  const id = String(formData.get("id") || "")
  const name = String(formData.get("name") || "").trim()
  if (!name) return { ok: false, error: "Product name is required." }

  // Parse key-value specifications from form entries like spec_key_0, spec_val_0
  const specifications: Record<string, string> = {}
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("spec_key_")) {
      const index = key.replace("spec_key_", "")
      const val = String(formData.get(`spec_val_${index}`) || "").trim()
      const k = String(value).trim()
      if (k && val) specifications[k] = val
    }
  }

  // Gallery images are uploaded to Cloudinary client-side and passed down as
  // a JSON-encoded array of secure URLs; the first image is the cover photo
  // stored separately in `image` for pages that only need a single thumbnail.
  let images: string[] = []
  try {
    images = JSON.parse(String(formData.get("images") || "[]"))
    if (!Array.isArray(images)) images = []
    images = images.filter((x) => typeof x === "string" && x.trim())
  } catch {
    images = []
  }

  const slug = slugify(name)
  const data = {
    name,
    slug,
    category: String(formData.get("category")),
    brand: String(formData.get("brand") || "").trim(),
    price: Math.max(0, Number(formData.get("price"))),
    stock: Math.max(0, Number(formData.get("stock"))),
    image: images[0] || "",
    images,
    description: String(formData.get("description") || "").trim(),
    published: formData.get("published") === "on",
    featured: formData.get("featured") === "on",
    specifications,
  }

  if (!data.brand) return { ok: false, error: "Brand is required." }
  if (images.length === 0) return { ok: false, error: "Upload at least one product image." }
  if (!data.description) return { ok: false, error: "Description is required." }

  try {
    if (id) {
      // Preserve slug if name changed to something with the same slug
      const existing = await Product.findById(id).select("slug").lean()
      const finalSlug = existing ? (slugify(name) === slugify((existing as { slug: string }).slug) ? (existing as { slug: string }).slug : slug) : slug
      await Product.findByIdAndUpdate(id, { ...data, slug: finalSlug })
      revalidateAll(finalSlug)
    } else {
      // Check slug uniqueness
      const conflict = await Product.findOne({ slug }).lean()
      const finalSlug = conflict ? `${slug}-${Date.now()}` : slug
      await Product.create({ ...data, slug: finalSlug })
      revalidateAll(finalSlug)
    }
  } catch (err) {
    console.error("[v0] saveProduct error:", err)
    return { ok: false, error: "Failed to save product. Please try again." }
  }

  return { ok: true }
}

export async function deleteProduct(formData: FormData) {
  await guard()
  const id = String(formData.get("id") || "")
  if (!id) return { ok: false, error: "Missing product id." }
  try {
    const product = await Product.findById(id).select("slug").lean() as { slug: string } | null
    await Product.findByIdAndDelete(id)
    revalidateAll(product?.slug)
  } catch (err) {
    console.error("[v0] deleteProduct error:", err)
    return { ok: false, error: "Failed to delete product." }
  }
  return { ok: true }
}

export async function updateStatus(formData: FormData) {
  await guard()
  const kind = String(formData.get("kind"))
  const id = String(formData.get("id"))
  const status = String(formData.get("status"))
  const Model =
    kind === "order" ? Order : kind === "repair" ? RepairRequest : BuyBackRequest
  await Model.findByIdAndUpdate(id, { status })
  revalidatePath(`/admin/${kind === "order" ? "orders" : kind === "repair" ? "repairs" : "buy-back"}`)
  revalidatePath(`/admin/${kind === "order" ? "orders" : kind === "repair" ? "repairs" : "buy-back"}/${id}`)
}

export async function setBuybackOffer(formData: FormData) {
  await guard()
  const id = String(formData.get("id") || "")
  if (!id) return { ok: false, error: "Missing request id." }
  const offeredPrice = Math.max(0, Number(formData.get("offeredPrice")))
  if (!Number.isFinite(offeredPrice) || offeredPrice <= 0) {
    return { ok: false, error: "Enter a valid offer amount." }
  }
  try {
    // Quoting an offer also moves the request to "quoted" so its status
    // reflects that the customer now has a price to review.
    await BuyBackRequest.findByIdAndUpdate(id, { offeredPrice, status: "quoted" })
  } catch (err) {
    console.error("[v0] setBuybackOffer error:", err)
    return { ok: false, error: "Failed to save offer. Please try again." }
  }
  revalidatePath("/admin/buy-back")
  revalidatePath(`/admin/buy-back/${id}`)
  return { ok: true }
}

export async function updateStock(formData: FormData) {
  await guard()
  const id = String(formData.get("id"))
  const stock = Math.max(0, Number(formData.get("stock")))
  const product = await Product.findByIdAndUpdate(id, { stock }, { new: true }).select("slug").lean() as { slug: string } | null
  revalidatePath("/admin/inventory")
  revalidatePath("/shop")
  if (product?.slug) revalidatePath(`/shop/${product.slug}`)
}

// Staff logging a repair intake in person (e.g. a customer walks in with a
// broken device). Requires an existing customer record — use the customer
// picker to find or create one first.
export async function createRepairForCustomer(formData: FormData) {
  await guard()
  const parsed = adminRepairSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { ok: false, error: "Please complete all required repair details." }

  const customer = await User.findById(parsed.data.customerId).select("phone").lean() as { phone?: string } | null
  if (!customer) return { ok: false, error: "Selected customer was not found." }

  const contact = parsed.data.contact || customer.phone
  if (!contact) return { ok: false, error: "A contact number is required." }

  try {
    const repair = await RepairRequest.create({
      userId: parsed.data.customerId,
      deviceType: parsed.data.deviceType,
      brand: parsed.data.brand,
      model: parsed.data.model,
      problem: parsed.data.problem,
      contact,
      image: parsed.data.image || undefined,
      source: "in-shop",
    })
    revalidatePath("/admin/repairs")
    return { ok: true, id: repair._id.toString() }
  } catch (err) {
    console.error("[v0] createRepairForCustomer error:", err)
    return { ok: false, error: "Failed to create repair request. Please try again." }
  }
}

// Staff logging a trade-in intake in person. If an offer is agreed on the
// spot, `offeredPrice` is set and the request starts at "quoted" instead of
// "submitted" so it doesn't sit in the review queue unnecessarily.
export async function createBuyBackForCustomer(formData: FormData) {
  await guard()
  const parsed = adminBuyBackSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { ok: false, error: "Please complete all required device details." }

  const customer = await User.exists({ _id: parsed.data.customerId })
  if (!customer) return { ok: false, error: "Selected customer was not found." }

  try {
    const buyback = await BuyBackRequest.create({
      userId: parsed.data.customerId,
      deviceType: parsed.data.deviceType,
      brand: parsed.data.brand,
      model: parsed.data.model,
      specifications: parsed.data.specifications,
      condition: parsed.data.condition,
      description: parsed.data.description,
      expectedPrice: parsed.data.expectedPrice,
      offeredPrice: parsed.data.offeredPrice,
      image: parsed.data.image || undefined,
      status: parsed.data.offeredPrice ? "quoted" : "submitted",
      source: "in-shop",
    })
    revalidatePath("/admin/buy-back")
    return { ok: true, id: buyback._id.toString() }
  } catch (err) {
    console.error("[v0] createBuyBackForCustomer error:", err)
    return { ok: false, error: "Failed to create trade-in request. Please try again." }
  }
}

// Point-of-sale checkout for an in-person purchase. Recomputes prices from
// the database (never trusts client-sent prices), validates stock, decrements
// it, and marks the order "completed" immediately since payment has already
// changed hands at the counter.
export async function createPosSale(formData: FormData) {
  await guard()

  let itemsInput: unknown
  try {
    itemsInput = JSON.parse(String(formData.get("items") || "[]"))
  } catch {
    return { ok: false, error: "Invalid cart data." }
  }

  const parsed = posSaleSchema.safeParse({
    customerId: String(formData.get("customerId") || ""),
    paymentMethod: String(formData.get("paymentMethod") || ""),
    paymentNote: String(formData.get("paymentNote") || ""),
    items: itemsInput,
  })
  if (!parsed.success) return { ok: false, error: "Please select a customer, at least one product, and a payment method." }

  const customer = await User.findById(parsed.data.customerId).select("name phone address").lean() as { name?: string; phone?: string; address?: string } | null
  if (!customer) return { ok: false, error: "Selected customer was not found." }

  const ids = parsed.data.items.map((x) => x.productId)
  const products = await Product.find({ _id: { $in: ids } })

  const items = []
  for (const item of parsed.data.items) {
    const p = products.find((x) => x.id === item.productId)
    if (!p) return { ok: false, error: "One or more products could not be found." }
    if (p.stock < item.quantity) return { ok: false, error: `Not enough stock for "${p.name}" (${p.stock} available).` }
    items.push({ productId: p._id, name: p.name, slug: p.slug, image: p.image, price: p.price, quantity: item.quantity })
  }

  const subtotal = items.reduce((sum, x) => sum + x.price * x.quantity, 0)

  try {
    const order = await Order.create({
      userId: parsed.data.customerId,
      items,
      subtotal,
      status: "completed",
      source: "in-shop",
      paymentMethod: parsed.data.paymentMethod,
      shipping: {
        fullName: customer.name,
        phone: customer.phone,
        address: customer.address || "In-store pickup",
        city: "",
        notes: parsed.data.paymentNote || undefined,
      },
    })
    await Promise.all(
      items.map((x) => Product.updateOne({ _id: x.productId, stock: { $gte: x.quantity } }, { $inc: { stock: -x.quantity } })),
    )
    revalidatePath("/admin/orders")
    revalidatePath("/admin/inventory")
    revalidatePath("/shop")
    return { ok: true, orderNumber: order.orderNumber as string, id: order._id.toString() }
  } catch (err) {
    console.error("[v0] createPosSale error:", err)
    return { ok: false, error: "Failed to complete sale. Please try again." }
  }
}
