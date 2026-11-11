import { notFound } from "next/navigation"
import Script from "next/script"
import { Badge } from "@/components/ui/badge"
import { StatusForm } from "@/components/admin/StatusForm"
import { connectToDatabase } from "@/lib/mongodb"
import { formatCurrency, serialize } from "@/lib/helpers"
import { Order } from "@/models/Order"

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-emerald-100 text-emerald-800",
  completed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-800",
}

// Prints only #print-area, so any navbar/sidebar from the layout is hidden automatically.
const PRINT_CSS = `
@media print {
  body * { visibility: hidden !important; }
  #print-area, #print-area * { visibility: visible !important; }
  #print-area { position: absolute; left: 0; top: 0; width: 100%; box-sizing: border-box; padding: 14mm; border: 0 !important; box-shadow: none !important; }
  /* margin 0 removes the browser's own header/footer (site name, date, page URL) */
  @page { margin: 0; }
}`

function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-muted-foreground">{title}</h3>
      <div className="mt-2 space-y-0.5 text-sm leading-6">{children}</div>
    </div>
  )
}

export default async function OrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await connectToDatabase()
  const x: any = serialize(await Order.findById(id).populate("userId", "name email").lean())
  if (!x) notFound()

  const itemCount = x.items.reduce((n: number, i: any) => n + i.quantity, 0)
  const placedOn = x.createdAt
    ? new Date(x.createdAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })
    : null
  const statusKey = String(x.status ?? "").toLowerCase()

  return (
    <div className="mx-auto w-full max-w-4xl">
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />

      {/* Page toolbar (not printed) */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <p className="eyebrow">Order detail</p>
        <button
          type="button"
          data-print
          className="inline-flex h-10 items-center gap-2 border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9V2h12v7" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          Print order
        </button>
        <Script id="print-handler" strategy="afterInteractive">
          {`document.addEventListener("click",function(e){var t=e.target;if(t&&t.closest&&t.closest("[data-print]"))window.print()})`}
        </Script>
      </div>

      {/* Printable document */}
      <section id="print-area" className="border border-border bg-card">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border p-6 sm:p-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{x.orderNumber}</h1>
            {placedOn && <p className="mt-1 text-sm text-muted-foreground">Placed {placedOn}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {x.source === "in-shop" && <Badge className="bg-purple-100 text-purple-800">In-shop sale</Badge>}
            {x.status && (
              <Badge className={STATUS_STYLES[statusKey] ?? "bg-muted text-foreground"}>{x.status}</Badge>
            )}
          </div>
        </div>

        {/* Customer / delivery */}
        <div className="grid gap-6 border-b border-border p-6 sm:grid-cols-2 sm:p-8">
          <InfoBlock title="Customer">
            <p className="font-medium">{x.userId?.name ?? "Walk-in customer"}</p>
            {x.userId?.email && <p className="text-muted-foreground">{x.userId.email}</p>}
            {x.shipping?.phone && <p className="text-muted-foreground">{x.shipping.phone}</p>}
          </InfoBlock>

          <InfoBlock title="Delivery address">
            <p>
              {x.shipping?.address}
              {x.shipping?.city && <>, {x.shipping.city}</>}
            </p>
            {x.shipping?.notes && <p className="text-muted-foreground">Note: {x.shipping.notes}</p>}
          </InfoBlock>
        </div>

        {/* Items */}
        <div className="p-6 sm:p-8">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-bold">Items</h2>
            <span className="text-sm text-muted-foreground">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">Product</th>
                  <th className="px-4 py-2 text-right font-medium">Qty</th>
                  <th className="px-4 py-2 text-right font-medium">Price</th>
                  <th className="py-2 pl-4 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {x.items.map((i: any) => (
                  <tr key={i._id} className="border-b border-border">
                    <td className="py-3 pr-4 font-medium">{i.name}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{i.quantity}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{formatCurrency(i.price)}</td>
                    <td className="py-3 pl-4 text-right tabular-nums">{formatCurrency(i.price * i.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals (full width: labels left, amounts right) */}
          <dl className="mt-6 w-full text-sm">
            <div className="flex w-full items-center justify-between py-1">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="tabular-nums">{formatCurrency(x.subtotal)}</dd>
            </div>
            <div className="mt-2 flex w-full items-center justify-between border-t border-border pt-3 text-lg font-bold">
              <dt>Total</dt>
              <dd className="tabular-nums">{formatCurrency(x.subtotal)}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Status (not printed) */}
      <section className="mt-6 border border-border bg-card p-6 print:hidden">
        <h2 className="text-lg font-bold">Update status</h2>
        <div className="mt-4">
          <StatusForm id={x._id} kind="order" current={x.status} />
        </div>
      </section>
    </div>
  )
}