import { auth } from "@/auth"
import { connectToDatabase } from "@/lib/mongodb"
import { User } from "@/models/User"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const user = await User.findById(session.user.id).lean()

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      idNumber: user.idNumber,
      photoUrl: user.photoUrl,
    })
  } catch (error) {
    console.error("[v0] Profile API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
