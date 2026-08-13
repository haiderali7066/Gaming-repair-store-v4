"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  Check,
  Loader2,
  Plus,
  Search,
  UserPlus,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Customer {
  _id: string
  name: string
  email: string
  phone?: string
  photoUrl?: string
}

interface CustomerPickerProps {
  name?: string
  initialCustomer?: Customer | null
}

/**
 * Searchable customer picker for admin flows.
 *
 * Customers are loaded from:
 * /api/admin/customers/search
 *
 * Selecting a customer stores the customer id in a hidden input so
 * it submits naturally with the surrounding form.
 */
export function CustomerPicker({
  name = "customerId",
  initialCustomer = null,
}: CustomerPickerProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Customer[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Customer | null>(
    initialCustomer,
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  /* ---------------------------------------------------------------------- */
  /* Search                                                                  */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (selected) return

    const controller = new AbortController()

    const timeout = setTimeout(async () => {
      setLoading(true)

      try {
        const response = await fetch(
          `/api/admin/customers/search?q=${encodeURIComponent(query)}`,
          {
            signal: controller.signal,
          },
        )

        if (!response.ok) {
          throw new Error("Failed to search customers")
        }

        const data = await response.json()

        setResults(data.customers || [])
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return
        }

        // Keep the previous results on a normal request failure.
      } finally {
        setLoading(false)
      }
    }, 250)

    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [query, selected])

  /* ---------------------------------------------------------------------- */
  /* Close dropdown when clicking outside                                    */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  /* ---------------------------------------------------------------------- */
  /* Selection                                                               */
  /* ---------------------------------------------------------------------- */

  function selectCustomer(customer: Customer) {
    setSelected(customer)
    setOpen(false)
    setQuery("")
  }

  function clearCustomer() {
    setSelected(null)
    setQuery("")
    setOpen(true)

    requestAnimationFrame(() => {
      inputRef.current?.focus()
    })
  }

  function getInitials(name: string) {
    return (
      name
        ?.trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("") || "C"
    )
  }

  /* ---------------------------------------------------------------------- */
  /* Selected customer                                                       */
  /* ---------------------------------------------------------------------- */

  if (selected) {
    return (
      <div className="space-y-4">
        <input
          type="hidden"
          name={name}
          value={selected._id}
        />

        <div className="divide-y divide-border border border-border bg-background">
          <div className="flex items-center gap-3 p-3 sm:p-4">
            {/* Customer avatar */}
            {selected.photoUrl ? (
              <img
                src={selected.photoUrl}
                alt={selected.name}
                className="h-12 w-12 shrink-0 rounded object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-primary/10 text-sm font-semibold text-primary">
                {getInitials(selected.name)}
              </div>
            )}

            {/* Customer info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-medium">
                  {selected.name}
                </p>

                <span className="hidden shrink-0 text-[10px] font-semibold uppercase tracking-wide text-emerald-600 sm:inline dark:text-emerald-400">
                  Selected
                </span>
              </div>

              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {selected.email}
              </p>

              {selected.phone && (
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {selected.phone}
                </p>
              )}
            </div>

            {/* Change */}
            <button
              type="button"
              onClick={clearCustomer}
              className={cn(
                "inline-flex h-8 shrink-0 items-center gap-1.5 px-2.5",
                "text-xs font-medium text-muted-foreground",
                "transition-colors hover:bg-muted hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              <X className="size-3.5" />
              <span className="hidden sm:inline">Change</span>
            </button>
          </div>

          {/* Selected indicator */}
          <div className="flex items-center gap-2 bg-muted/40 px-3 py-2.5 text-xs text-muted-foreground sm:px-4">
            <Check className="size-3.5 text-emerald-500" />
            Customer selected for this transaction.
          </div>
        </div>
      </div>
    )
  }

  /* ---------------------------------------------------------------------- */
  /* Picker                                                                   */
  /* ---------------------------------------------------------------------- */

  return (
    <div className="space-y-4">
      <input
        type="hidden"
        name={name}
        value=""
      />

      <div
        ref={containerRef}
        className="relative"
      >
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-autocomplete="list"
            aria-controls="customer-picker-list"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search customers by name, email, or phone..."
            className={cn(
              "h-10 w-full rounded-md border border-input bg-background",
              "pl-9 pr-10 text-sm outline-none",
              "transition-colors",
              "placeholder:text-muted-foreground",
              "focus:border-ring focus:ring-2 focus:ring-ring/10",
            )}
          />

          {loading && (
            <Loader2 className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
          )}
        </div>

        {/* Dropdown */}
        {open && (
          <div
            id="customer-picker-list"
            className={cn(
              "absolute left-0 right-0 top-full z-50 mt-1.5",
              "overflow-hidden rounded-lg bg-popover",
              "text-popover-foreground",
              "shadow-md ring-1 ring-foreground/10",
            )}
          >
            {results.length === 0 ? (
              <div className="p-4">
                {loading ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="size-4 animate-spin" />
                    Searching...
                  </div>
                ) : query.trim() ? (
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">
                        No customers found.
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Try a different name, email, or phone number.
                      </p>
                    </div>

                    <Link
                      href="/admin/customers/new"
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-2 text-xs font-medium text-primary hover:underline"
                    >
                      <UserPlus className="size-3.5" />
                      Create new customer
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Search for a customer to continue.
                    </p>

                    <Link
                      href="/admin/customers/new"
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-2 text-xs font-medium text-primary hover:underline"
                    >
                      <Plus className="size-3.5" />
                      Create new customer
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <ul className="max-h-64 overflow-y-auto py-1">
                {results.map((customer) => (
                  <li key={customer._id}>
                    <button
                      type="button"
                      onClick={() => selectCustomer(customer)}
                      className={cn(
                        "flex w-full items-center gap-3 px-3 py-2.5",
                        "text-left text-sm",
                        "transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      {/* Avatar */}
                      {customer.photoUrl ? (
                        <img
                          src={customer.photoUrl}
                          alt={customer.name}
                          className="h-10 w-10 shrink-0 rounded object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-primary/10 text-xs font-semibold text-primary">
                          {getInitials(customer.name)}
                        </div>
                      )}

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">
                          {customer.name}
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                          {customer.email}
                          {customer.phone && ` · ${customer.phone}`}
                        </p>
                      </div>

                      <Check className="size-4 shrink-0 text-transparent transition-colors group-hover:text-primary" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Footer */}
            {results.length > 0 && (
              <div className="border-t border-border bg-muted/40 px-3 py-2">
                <Link
                  href="/admin/customers/new"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-xs font-medium text-primary hover:underline"
                >
                  <UserPlus className="size-3.5" />
                  Create new customer
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Empty state */}
      <p className="border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
        Search and select a customer to continue.
      </p>
    </div>
  )
}