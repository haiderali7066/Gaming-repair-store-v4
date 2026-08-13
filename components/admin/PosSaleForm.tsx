"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, Loader2, Package, Search, UserRound } from "lucide-react"
import { createPosSale } from "@/actions/admin"
import { CustomerPicker } from "@/components/admin/CustomerPicker"
import { ProductCartPicker } from "@/components/admin/ProductCartPicker"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PAYMENT_METHOD_LABELS, PAYMENT_METHODS } from "@/lib/constants"

interface InitialCustomer {
  _id: string
  name: string
  email: string
  phone?: string
  photoUrl?: string
}

export function PosSaleForm({ initialCustomer }: { initialCustomer?: InitialCustomer | null }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    if (!formData.get("customerId")) {
      setError("Please select a customer.")
      return
    }
    const items = JSON.parse(String(formData.get("items") || "[]"))
    if (items.length === 0) {
      setError("Add at least one product to the sale.")
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      const result = await createPosSale(formData)
      if (!result?.ok) {
        setError(result?.error ?? "Failed to complete sale.")
        setIsLoading(false)
        return
      }
      router.push(`/admin/orders/${result.id}`)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to complete sale.")
      setIsLoading(false)
    }
  }

  return (
    <form action={handleSubmit} className="max-w-2xl space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

        {/* ---------------------------------------------------------------- */}
      {/* Customer                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative z-30 overflow-visible rounded-2xl border bg-background shadow-sm">
        <div className="border-b bg-muted/20 px-5 py-5 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <UserRound className="size-4" />
            </div>

            <div className="min-w-0">
              <h3 className="text-base font-semibold">
                Customer information
              </h3>

              <p className="mt-1 max-w-xl text-sm leading-5 text-muted-foreground">
                Select the customer who is trading in the device.
              </p>
            </div>
          </div>
        </div>

        {/* Important: enough space + overflow-visible for dropdown */}
        <div className="relative min-h-[250px] overflow-visible p-5 sm:min-h-[280px] sm:p-6">
          <div className="relative z-50">
            <CustomerPicker
              initialCustomer={initialCustomer}
            />
          </div>

          <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-dashed bg-muted/30 px-3.5 py-3">
            <Search className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />

            <div>
              <p className="text-xs font-medium text-foreground">
                Find an existing customer
              </p>

              <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                Search by name, email address, or phone number.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
{/* Products                                                         */}
{/* ---------------------------------------------------------------- */}
<section className="relative z-20 overflow-visible rounded-2xl border bg-background shadow-sm">
  <div className="border-b bg-muted/20 px-5 py-5 sm:px-6">
    <div className="flex items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Package className="size-4" />
      </div>

      <div className="min-w-0">
        <h3 className="text-base font-semibold">
          Products
        </h3>

        <p className="mt-1 max-w-xl text-sm leading-5 text-muted-foreground">
          Add every item being sold in this transaction.
        </p>
      </div>
    </div>
  </div>

  {/* Important: enough space + overflow-visible for product dropdown */}
  <div className="relative min-h-[340px] overflow-visible p-5 sm:min-h-[380px] sm:p-6">
    <div className="relative z-50">
      <ProductCartPicker />
    </div>

    <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-dashed bg-muted/30 px-3.5 py-3">
      <Search className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />

      <div>
        <p className="text-xs font-medium text-foreground">
          Find products quickly
        </p>

        <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
          Search by product name or brand, then add items to the sale.
        </p>
      </div>
    </div>
  </div>
</section>

      <Card>
        <CardHeader>
          <CardTitle>Payment</CardTitle>
          <CardDescription>How the customer paid</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="paymentMethod">Payment method</FieldLabel>
              <select id="paymentMethod" name="paymentMethod" className="h-10 border border-input bg-background px-3 text-sm" required>
                {PAYMENT_METHODS.map((x) => (
                  <option key={x} value={x}>
                    {PAYMENT_METHOD_LABELS[x]}
                  </option>
                ))}
              </select>
            </Field>
            <Field>
              <FieldLabel htmlFor="paymentNote">Note (optional)</FieldLabel>
              <Input id="paymentNote" name="paymentNote" placeholder="e.g. reference number" />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isLoading} className="gap-2">
          {isLoading && <Loader2 className="size-4 animate-spin" />}
          Complete Sale
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
