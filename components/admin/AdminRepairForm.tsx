"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, Loader2, Search,  UserRound } from "lucide-react"
import { createRepairForCustomer } from "@/actions/admin"
import { CustomerPicker } from "@/components/admin/CustomerPicker"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DEVICE_TYPES } from "@/lib/constants"

interface InitialCustomer {
  _id: string
  name: string
  email: string
  phone?: string
  photoUrl?: string
}

export function AdminRepairForm({ initialCustomer }: { initialCustomer?: InitialCustomer | null }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    if (!formData.get("customerId")) {
      setError("Please select a customer.")
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      const result = await createRepairForCustomer(formData)
      if (!result?.ok) {
        setError(result?.error ?? "Failed to create repair request.")
        setIsLoading(false)
        return
      }
      router.push(`/admin/repairs/${result.id}`)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create repair request.")
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

      <Card>
        <CardHeader>
          <CardTitle>Device & Problem</CardTitle>
          <CardDescription>Details of the device brought in for repair</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="deviceType">Device type</FieldLabel>
              <select id="deviceType" name="deviceType" className="h-10 border border-input bg-background px-3 text-sm">
                {DEVICE_TYPES.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="brand">Brand</FieldLabel>
                <Input id="brand" name="brand" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="model">Model</FieldLabel>
                <Input id="model" name="model" required />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="problem">Problem description</FieldLabel>
              <Textarea id="problem" name="problem" rows={4} required />
            </Field>
            <Field>
              <FieldLabel htmlFor="contact">Contact number (optional)</FieldLabel>
              <Input id="contact" name="contact" placeholder="Defaults to the customer's phone on file" />
            </Field>
            <Field>
              <FieldLabel htmlFor="image">Device image URL (optional)</FieldLabel>
              <Input id="image" name="image" type="url" />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isLoading} className="gap-2">
          {isLoading && <Loader2 className="size-4 animate-spin" />}
          Create Repair Order
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
