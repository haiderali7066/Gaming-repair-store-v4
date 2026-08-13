import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { uploadImageToCloudinary } from "@/lib/cloudinary"

const MAX_FILES = 8
const MAX_SIZE_BYTES = 8 * 1024 * 1024 // 8MB per image

export async function POST(request: Request) {
  const session = await auth()
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await request.formData()
  const files = formData.getAll("files").filter((f): f is File => f instanceof File)

  if (files.length === 0) {
    return NextResponse.json({ error: "No files provided." }, { status: 400 })
  }
  if (files.length > MAX_FILES) {
    return NextResponse.json({ error: `You can upload up to ${MAX_FILES} images at once.` }, { status: 400 })
  }

  try {
    const urls = await Promise.all(
      files.map(async (file) => {
        if (!file.type.startsWith("image/")) {
          throw new Error(`"${file.name}" is not an image file.`)
        }
        if (file.size > MAX_SIZE_BYTES) {
          throw new Error(`"${file.name}" exceeds the 8MB size limit.`)
        }
        const buffer = Buffer.from(await file.arrayBuffer())
        return uploadImageToCloudinary(buffer)
      }),
    )
    return NextResponse.json({ urls })
  } catch (err) {
    console.error("[v0] admin upload error:", err)
    const message = err instanceof Error ? err.message : "Upload failed. Please try again."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
