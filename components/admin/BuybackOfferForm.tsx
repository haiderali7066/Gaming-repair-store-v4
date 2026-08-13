"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { setBuybackOffer } from "@/actions/admin"

export function BuybackOfferForm({ id, offeredPrice }: { id: string; offeredPrice?: number }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(formData: FormData) {
    setError(null)
    setIsSaving(true)
    try {
      const result = await setBuybackOffer(formData)
      if (!result?.ok) {
        setError(result?.error ?? "Failed to save offer.")
        setIsSaving(false)
        return
      }
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save offer.")
      setIsSaving(false)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <input type="hidden" name="id" value={id} />
      <label htmlFor="offeredPrice" className="text-sm font-medium text-muted-foreground sm:sr-only">
        Offer amount (AED)
      </label>
      {/* Keying on `offeredPrice` forces a remount so defaultValue picks up
          the newly-saved amount after router.refresh() — an uncontrolled
          input otherwise keeps whatever was typed/initial on first mount. */}
      <input
        key={offeredPrice ?? "new"}
        id="offeredPrice"
        name="offeredPrice"
        type="number"
        min="1"
        step="1"
        defaultValue={offeredPrice || ""}
        placeholder="Offer amount (AED)"
        className="h-9 w-full max-w-[220px] border border-input bg-background px-2 text-sm"
        required
      />
      <Button size="sm" type="submit" disabled={isSaving}>
        {isSaving ? "Saving..." : offeredPrice ? "Update Offer" : "Send Offer"}
      </Button>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </form>
  )
}
