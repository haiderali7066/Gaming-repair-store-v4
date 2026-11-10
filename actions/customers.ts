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
 * Creates a customer record from the admin panel (e.g. a walk-in
 * customer at the counter). Name, email, phone and password are required;
 * address, ID number and verification photo are optional so the account
 * can be created right away and completed later.
 */
export async function createCustomerAction(formData: FormData) {
  await guard()

  // Blank optional fields arrive as "" — drop them so the schema treats them as missing.
  const raw: Record<string, FormDataEntryValue> = Object.fromEntries(formData)
  delete raw.photo
  if (!raw.idNumber?.toString().trim()) delete raw.idNumber
  if (!raw.address?.toString().trim()) delete raw.address

  const parsed = adminCreateCustomerSchema.safeParse(raw)
  if (!parsed.success) {
    return { ok: false, error: "Please check the customer details and try again." }
  }

  // Photo is optional: an empty file input still arrives as a File with size 0.
  const photo = formData.get("photo")
  const hasPhoto = photo instanceof File && photo.size > 0

  if (hasPhoto && !photo.type.startsWith("image/")) {
    return { ok: false, error: "Photo must be an image file." }
  }

  if (await User.exists({ email: parsed.data.email })) {
    return { ok: false, error: "A customer with this email is already registered." }
  }

  let photoUrl: string | undefined
  if (hasPhoto) {
    try {
      const buffer = Buffer.from(await photo.arrayBuffer())
      photoUrl = await uploadImageToCloudinary(buffer, "al-dana/customers")
    } catch (err) {
      console.error("[v0] createCustomerAction photo upload error:", err)
      return { ok: false, error: "Failed to upload photo. Please try again." }
    }
  }

  try {
    const passwordHash = await bcrypt.hash(parsed.data.password, 12)
    const customer = await User.create({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      address: parsed.data.address || undefined,
      idNumber: parsed.data.idNumber || undefined,
      photoUrl, // undefined when no photo, so the model default ("") applies
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