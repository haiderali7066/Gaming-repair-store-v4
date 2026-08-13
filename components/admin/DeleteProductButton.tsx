"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { deleteProduct } from "@/actions/admin"
import { Button } from "@/components/ui/button"

export function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleDelete() {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    setError(null)
    const formData = new FormData()
    formData.set("id", id)
    startTransition(async () => {
      try {
        const result = await deleteProduct(formData)
        if (!result?.ok) {
          setError(result?.error ?? "Failed to delete product.")
          return
        }
        router.refresh()
      } catch (err) {
        // guard() throws (e.g. session expired or not an admin) instead of returning a result
        setError(err instanceof Error ? err.message : "Failed to delete product.")
      }
    })
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <Button size="sm" variant="destructive" disabled={isPending} onClick={handleDelete} type="button">
        {isPending ? "Deleting..." : "Delete"}
      </Button>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
