"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { GripVertical, Loader2, Star, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * Multi-image uploader for products. Files are uploaded directly to
 * Cloudinary through /api/admin/upload, and the resulting secure URLs are
 * kept in local state and mirrored into a hidden JSON input so the
 * surrounding <form action={saveProduct}> can read them on submit. The
 * first image in the list is always the product's cover photo.
 */
export function ImageUploader({ name, initialImages = [] }: { name: string; initialImages?: string[] }) {
  const [images, setImages] = useState<string[]>(initialImages)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return
    setError(null)
    setUploading(true)
    try {
      const body = new FormData()
      Array.from(fileList).forEach((file) => body.append("files", file))
      const res = await fetch("/api/admin/upload", { method: "POST", body })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Upload failed.")
      setImages((current) => [...current, ...json.urls])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.")
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  function removeImage(index: number) {
    setImages((current) => current.filter((_, i) => i !== index))
  }

  function makeCover(index: number) {
    setImages((current) => {
      const next = [...current]
      const [item] = next.splice(index, 1)
      next.unshift(item)
      return next
    })
  }

  function moveImage(index: number, direction: -1 | 1) {
    setImages((current) => {
      const next = [...current]
      const target = index + direction
      if (target < 0 || target >= next.length) return next
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={JSON.stringify(images)} />

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {images.map((url, index) => (
            <div key={url} className="group relative aspect-square overflow-hidden border border-border bg-muted">
              <Image src={url || "/placeholder.svg"} alt={`Product image ${index + 1}`} fill className="object-cover" unoptimized />
              {index === 0 && (
                <span className="absolute left-1 top-1 flex items-center gap-1 bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                  <Star className="size-3 fill-current" /> Cover
                </span>
              )}
              <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => makeCover(index)}
                    title="Set as cover"
                    className="rounded bg-background p-1.5 text-foreground hover:bg-primary hover:text-primary-foreground"
                  >
                    <Star className="size-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => moveImage(index, -1)}
                  title="Move left"
                  disabled={index === 0}
                  className="rounded bg-background p-1.5 text-foreground disabled:opacity-40 hover:bg-accent"
                >
                  <GripVertical className="size-3.5 rotate-90" />
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  title="Remove"
                  className="rounded bg-background p-1.5 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          id={`${name}-file-input`}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
          {uploading ? "Uploading..." : "Upload images"}
        </Button>
        <p className="mt-1 text-xs text-muted-foreground">
          Upload up to 8 photos. The first image is used as the cover photo — hover any image to set it as cover, reorder, or remove it.
        </p>
        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </div>
    </div>
  )
}
