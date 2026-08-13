"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react"
import { createCustomerAction } from "@/actions/customers"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function CreateCustomerForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)
    try {
      const result = await createCustomerAction(formData)
      if (!result?.ok) {
        setError(result?.error ?? "Failed to create customer. Please try again.")
        setIsLoading(false)
        return
      }
      router.push(`/admin/customers/${result.customerId}`)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create customer. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <form action={handleSubmit} className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
          <CardDescription>
            Capture the same identity details as self-registration so the customer can sign in later.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-5">
              <AlertCircle className="size-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full name</FieldLabel>
              <Input id="name" name="name" required />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" name="email" type="email" required autoComplete="email" />
              </Field>
              <Field>
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <Input id="phone" name="phone" type="tel" required autoComplete="tel" />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="idNumber">ID number</FieldLabel>
              <Input id="idNumber" name="idNumber" required placeholder="Emirates ID / passport number" />
            </Field>
            <Field>
              <FieldLabel htmlFor="address">Address (optional)</FieldLabel>
              <Textarea id="address" name="address" rows={2} />
            </Field>
            <Field>
              <FieldLabel htmlFor="photo">Verification photo</FieldLabel>
              <Input id="photo" name="photo" type="file" accept="image/*" required />
              <p className="text-xs text-muted-foreground">Upload a clear photo of the customer for identity verification.</p>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Initial password</FieldLabel>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  minLength={8}
                  required
                  autoComplete="new-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">The customer can change this later from their account settings.</p>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <div className="mt-6 flex items-center gap-3">
        <Button type="submit" disabled={isLoading} className="gap-2">
          {isLoading && <Loader2 className="size-4 animate-spin" />}
          Create Customer
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
