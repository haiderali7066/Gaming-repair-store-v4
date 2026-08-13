"use server"

import { auth } from "@/auth"
import { connectToDatabase } from "@/lib/mongodb"
import { User } from "@/models/User"

export async function updateProfileAction(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { error: "Not authenticated" }
    }

    await connectToDatabase()

    const name = formData.get("name")?.toString()?.trim()
    const phone = formData.get("phone")?.toString()?.trim()
    const address = formData.get("address")?.toString()?.trim()

    if (!name) {
      return { error: "Name is required" }
    }

    if (name.length < 2) {
      return { error: "Name must be at least 2 characters" }
    }

    // phone is required on the User model, so it can't be cleared to empty
    if (!phone || phone.length < 5) {
      return { error: "A valid phone number is required" }
    }

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      {
        name,
        phone,
        address: address || "",
      },
      { new: true, runValidators: true }
    ).lean()

    if (!updatedUser) {
      return { error: "User not found" }
    }

    const u = updatedUser as unknown as { name: string; phone: string; address?: string; email: string; idNumber?: string; photoUrl?: string }

    return {
      success: true,
      message: "Profile updated successfully",
      user: { name: u.name, phone: u.phone, address: u.address || "", email: u.email, idNumber: u.idNumber, photoUrl: u.photoUrl },
    }
  } catch (error) {
    console.error("[v0] Profile update error:", error)
    return { error: "Failed to update profile. Please try again." }
  }
}
