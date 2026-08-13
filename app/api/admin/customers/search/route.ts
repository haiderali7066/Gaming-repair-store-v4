import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { connectToDatabase } from "@/lib/mongodb"
import { serialize } from "@/lib/helpers"
import { User } from "@/models/User"

export async function GET(request: Request) {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const q = new URL(request.url).searchParams.get("q")?.trim() || ""
  await connectToDatabase()

  const filter: Record<string, unknown> = { role: "customer" }
  if (q) {
    // Escape regex special characters so a customer typing e.g. "+971 (5)..."
    // doesn't throw on an invalid pattern.
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    filter.$or = [
      { name: { $regex: escaped, $options: "i" } },
      { email: { $regex: escaped, $options: "i" } },
      { phone: { $regex: escaped, $options: "i" } },
    ]
  }

  const customers = serialize(
    await User.find(filter).select("name email phone photoUrl").sort({ name: 1 }).limit(8).lean(),
  )

  return NextResponse.json({ customers })
}
