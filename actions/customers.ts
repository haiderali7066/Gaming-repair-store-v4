"use server"

import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { connectToDatabase } from "@/lib/mongodb"
import { uploadImageToCloudinary } from "@/lib/cloudinary"
import { adminCreateCustomerSchema } from "@/lib/validators"
import { User } from "@/models/User"

async function guard() {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized: admin access required. Please sign in with an admin account.")
  }
  await connectToDatabase()
}

/**
 * Creates a full customer record from the admin panel (e.g. a walk-in
 * customer at the counter). Mirrors registerAction's identity requirements —
 * name, email, phone, ID number, verification photo, and password — plus an
 * optional address, so the account is immediately usable for self-service
 * login and matches the shape self-registered customers have.
 */
export async function createCustomerAction(formData: FormData) {
  await guard()

  const parsed = adminCreateCustomerSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { ok: false, error: "Please check the customer details and try again." }
  }

  const photo = formData.get("photo")
  if (!(photo instanceof File) || photo.size === 0) {
    return { ok: false, error: "A verification photo is required." }
  }
  if (!photo.type.startsWith("image/")) {
    return { ok: false, error: "Photo must be an image file." }
  }

  if (await User.exists({ email: parsed.data.email })) {
    return { ok: false, error: "A customer with this email is already registered." }
  }

  let photoUrl: string
  try {
    const buffer = Buffer.from(await photo.arrayBuffer())
    photoUrl = await uploadImageToCloudinary(buffer, "al-dana/customers")
  } catch (err) {
    console.error("[v0] createCustomerAction photo upload error:", err)
    return { ok: false, error: "Failed to upload photo. Please try again." }
  }

  try {
    const passwordHash = await bcrypt.hash(parsed.data.password, 12)
    const customer = await User.create({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      address: parsed.data.address || undefined,
      idNumber: parsed.data.idNumber,
      photoUrl,
      passwordHash,
      role: "customer",
      createdByAdmin: true,
    })
    revalidatePath("/admin/customers")
    return { ok: true, customerId: customer._id.toString() }
  } catch (err) {
    console.error("[v0] createCustomerAction error:", err)
    return { ok: false, error: "Failed to create customer. Please try again." }
  }
}
