"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  DollarSign,
  Image as ImageIcon,
  Loader2,
  Package,
  Search,
  UserRound,
  X,
} from "lucide-react"

import { createBuyBackForCustomer } from "@/actions/admin"
import { CustomerPicker } from "@/components/admin/CustomerPicker"
import { BUY_BACK_TYPES } from "@/lib/constants"

interface InitialCustomer {
  _id: string
  name: string
  email: string
  phone?: string
  photoUrl?: string
}

interface AdminBuyBackFormProps {
  initialCustomer?: InitialCustomer | null
}

export function AdminBuyBackForm({
  initialCustomer,
}: AdminBuyBackFormProps) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    const customerId = formData.get("customerId")

    if (!customerId) {
      setError(
        "Please select a customer before creating the trade-in order.",
      )
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await createBuyBackForCustomer(formData)

      if (!result?.ok) {
        setError(
          result?.error ??
            "Failed to create the trade-in request.",
        )
        setIsLoading(false)
        return
      }

      router.push(`/admin/buy-back/${result.id}`)
      router.refresh()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while creating the trade-in request.",
      )
      setIsLoading(false)
    }
  }

  return (
    <form
      action={handleSubmit}
      className="w-full max-w-4xl space-y-6 pb-24"
    >
      {/* ---------------------------------------------------------------- */}
      {/* Page heading                                                       */}
      {/* ---------------------------------------------------------------- */}
      <div className="mb-2">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ClipboardList className="size-5" />
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Create Trade-in Order
            </h2>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Record the customer and device details to create a new
              buy-back request.
            </p>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Error                                                              */}
      {/* ---------------------------------------------------------------- */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-destructive"
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
            <AlertCircle className="size-4" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">
              Unable to create order
            </p>

            <p className="mt-1 text-sm text-destructive/80">
              {error}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setError(null)}
            className="rounded-md p-1 opacity-70 transition hover:bg-destructive/10 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive"
            aria-label="Dismiss error"
          >
            <X className="size-4" />
          </button>
        </div>
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
      {/* Device details                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative z-10 overflow-hidden rounded-2xl border bg-background shadow-sm">
        <div className="border-b bg-muted/20 px-5 py-5 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Package className="size-4" />
            </div>

            <div>
              <h3 className="text-base font-semibold">
                Device details
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Enter the device information and its current condition.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-5 sm:p-6">
          {/* Device category */}
          <div className="space-y-2">
            <label
              htmlFor="deviceType"
              className="text-sm font-medium"
            >
              Device category
              <span className="ml-1 text-destructive">
                *
              </span>
            </label>

            <div className="relative">
              <select
                id="deviceType"
                name="deviceType"
                required
                defaultValue={BUY_BACK_TYPES[0]}
                className="h-11 w-full appearance-none rounded-xl border border-input bg-background px-3.5 pr-10 text-sm outline-none transition focus:border-ring focus:ring-4 focus:ring-ring/10"
              >
                {BUY_BACK_TYPES.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          {/* Brand / Model */}
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              label="Brand"
              htmlFor="brand"
              required
              hint="Example: Apple, Samsung, ASUS"
            >
              <input
                id="brand"
                name="brand"
                required
                placeholder="Enter brand"
                className={inputClassName}
              />
            </FormField>

            <FormField
              label="Model"
              htmlFor="model"
              required
              hint="Example: iPhone 15 Pro, Galaxy S24"
            >
              <input
                id="model"
                name="model"
                required
                placeholder="Enter model"
                className={inputClassName}
              />
            </FormField>
          </div>

          {/* Specifications */}
          <FormField
            label="Specifications"
            htmlFor="specifications"
            required
            hint="Include storage, RAM, processor, GPU, display, or other important specifications."
          >
            <textarea
              id="specifications"
              name="specifications"
              required
              rows={4}
              placeholder="Example: 16GB RAM, 1TB SSD, RTX 4070, 15.6-inch display..."
              className={textareaClassName}
            />
          </FormField>

          {/* Condition */}
          <FormField
            label="Condition"
            htmlFor="condition"
            required
            hint="Describe the overall physical and functional condition."
          >
            <input
              id="condition"
              name="condition"
              required
              placeholder="Excellent, good, fair, needs repair..."
              className={inputClassName}
            />
          </FormField>

          {/* Description */}
          <FormField
            label="Device description"
            htmlFor="description"
            required
            hint="Mention visible damage, included accessories, faults, or anything staff should know."
          >
            <textarea
              id="description"
              name="description"
              required
              rows={5}
              placeholder="Describe the device condition, accessories, damage, and other relevant details..."
              className={textareaClassName}
            />
          </FormField>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Pricing                                                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative z-10 overflow-hidden rounded-2xl border bg-background shadow-sm">
        <div className="border-b bg-muted/20 px-5 py-5 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="size-4" />
            </div>

            <div>
              <h3 className="text-base font-semibold">
                Pricing
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Record the customer's expected value and any offer made.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <PriceField
              label="Customer's expected price"
              htmlFor="expectedPrice"
              name="expectedPrice"
              required
              placeholder="0"
              description="The amount the customer expects for the device."
            />

            <PriceField
              label="Offer made on the spot"
              htmlFor="offeredPrice"
              name="offeredPrice"
              placeholder="0"
              description="Optional amount offered by your staff."
            />
          </div>

          <div className="mt-5 rounded-xl border border-dashed bg-muted/30 p-4">
            <div className="flex gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background">
                <DollarSign className="size-3.5 text-muted-foreground" />
              </div>

              <div>
                <p className="text-xs font-semibold">
                  Currency
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  All trade-in prices are recorded in AED.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Image                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative z-10 overflow-hidden rounded-2xl border bg-background shadow-sm">
        <div className="border-b bg-muted/20 px-5 py-5 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ImageIcon className="size-4" />
            </div>

            <div>
              <h3 className="text-base font-semibold">
                Device image
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Add a URL to an image of the device. This is optional.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <FormField
            label="Image URL"
            htmlFor="image"
            hint="Paste a publicly accessible image URL."
          >
            <input
              id="image"
              name="image"
              type="url"
              placeholder="https://example.com/device-image.jpg"
              className={inputClassName}
            />
          </FormField>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Sticky action bar                                                  */}
      {/* ---------------------------------------------------------------- */}
      <div className="sticky bottom-0 z-40 -mx-1 border-t bg-background/95 px-1 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isLoading}
            className="inline-flex h-11 items-center justify-center rounded-xl border bg-background px-5 text-sm font-medium transition hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Creating trade-in...
              </>
            ) : (
              <>
                <CheckCircle2 className="size-4" />
                Create Trade-in Order
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}

/* -------------------------------------------------------------------------- */
/* Reusable form components                                                    */
/* -------------------------------------------------------------------------- */

const inputClassName = [
  "h-11 w-full rounded-xl border border-input bg-background px-3.5",
  "text-sm outline-none transition",
  "placeholder:text-muted-foreground",
  "focus:border-ring focus:ring-4 focus:ring-ring/10",
  "disabled:cursor-not-allowed disabled:opacity-50",
].join(" ")

const textareaClassName = [
  "w-full rounded-xl border border-input bg-background px-3.5 py-3",
  "text-sm outline-none transition",
  "placeholder:text-muted-foreground",
  "focus:border-ring focus:ring-4 focus:ring-ring/10",
  "resize-y",
  "disabled:cursor-not-allowed disabled:opacity-50",
].join(" ")

interface FormFieldProps {
  label: string
  htmlFor: string
  children: React.ReactNode
  required?: boolean
  hint?: string
}

function FormField({
  label,
  htmlFor,
  children,
  required = false,
  hint,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium"
      >
        {label}

        {required && (
          <span className="ml-1 text-destructive">*</span>
        )}
      </label>

      {children}

      {hint && (
        <p className="text-xs leading-5 text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  )
}

interface PriceFieldProps {
  label: string
  htmlFor: string
  name: string
  description: string
  required?: boolean
  placeholder?: string
}

function PriceField({
  label,
  htmlFor,
  name,
  description,
  required = false,
  placeholder = "0",
}: PriceFieldProps) {
  return (
    <div className="rounded-xl border bg-muted/20 p-4">
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium"
      >
        {label}

        {required && (
          <span className="ml-1 text-destructive">*</span>
        )}
      </label>

      <div className="relative mt-3">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">
          AED
        </span>

        <input
          id={htmlFor}
          name={name}
          type="number"
          min="1"
          step="0.01"
          placeholder={placeholder}
          required={required}
          className={cnLocal(
            "h-12 w-full rounded-xl border border-input bg-background pl-14 pr-4",
            "text-base font-medium tabular-nums outline-none transition",
            "placeholder:text-muted-foreground",
            "focus:border-ring focus:ring-4 focus:ring-ring/10",
          )}
        />
      </div>

      <p className="mt-2 text-xs leading-5 text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

function cnLocal(
  ...classes: Array<string | false | null | undefined>
) {
  return classes.filter(Boolean).join(" ")
}