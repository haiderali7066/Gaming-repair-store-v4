"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const gallery = images.length ? images : ["/placeholder.svg"]
  const [active, setActive] = useState(0)

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden border border-border bg-card">
        <Image src={gallery[active] || "/placeholder.svg"} alt={name} fill priority className="object-cover" />
      </div>
      {gallery.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {gallery.map((url, index) => (
            <button
              key={url + index}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View image ${index + 1} of ${name}`}
              aria-current={active === index}
              className={cn(
                "relative aspect-square overflow-hidden border bg-card transition",
                active === index ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/50",
              )}
            >
              <Image src={url || "/placeholder.svg"} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
