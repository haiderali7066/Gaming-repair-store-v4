import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { connectToDatabase } from "@/lib/mongodb"
import { serialize } from "@/lib/helpers"
import { Product } from "@/models/Product"

export async function GET(request: Request) {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const q = new URL(request.url).searchParams.get("q")?.trim() || ""
  await connectToDatabase()

  const filter: Record<string, unknown> = {}
  if (q) {
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    filter.$or = [{ name: { $regex: escaped, $options: "i" } }, { brand: { $regex: escaped, $options: "i" } }]
  }

  // Staff can sell products that aren't published on the storefront (e.g.
  // clearance stock), so this intentionally doesn't filter on `published`.
  const products = serialize(
    await Product.find(filter).select("name brand price stock image").sort({ name: 1 }).limit(10).lean(),
  )

  return NextResponse.json({ products })
}
