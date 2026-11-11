import { notFound } from "next/navigation"
import Script from "next/script"
import { Badge } from "@/components/ui/badge"
import { StatusForm } from "@/components/admin/StatusForm"
import { BuybackOfferForm } from "@/components/admin/BuybackOfferForm"
import { connectToDatabase } from "@/lib/mongodb"
import { formatCurrency, serialize } from "@/lib/helpers"
import { BuyBackRequest } from "@/models/BuyBackRequest"

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  reviewing: "bg-blue-100 text-blue-800",
  offered: "bg-violet-100 text-violet-800",
  accepted: "bg-emerald-100 text-emerald-800",
  completed: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-800",
  cancelled: "bg-red-100 text-red-800",
}

// Prints only #print-area, so any navbar/sidebar from the layout is hidden automatically.
// @page margin 0 removes the browser's own header/footer (site name, date, page URL).
const PRINT_CSS = `
@media print {
  html, body { background: #fff !important; }
  body * { visibility: hidden !important; }
  #print-area, #print-area * { visibility: visible !important; }
  #print-area {
    position: absolute; left: 0; top: 0; width: 100%;
    box-sizing: border-box; padding: 16mm 15mm;
    border: 0 !important; box-shadow: none !important; background: #fff !important;
    font-size: 12px; color: #111;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  #print-area section { break-inside: avoid; page-break-inside: avoid; }
  @page { size: A4; margin: 0; }
}`

function Field({ label, value }: { label: string; value?: string | number | null }) {
  const has = value !== undefined && value !== null && String(value).trim() !== ""
  return (
    <div className="min-w-0">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 break-words text-sm font-medium">{has ? value : "Not provided"}</dd>
    </div>
  )
}

function Block({
  title,
  children,
  className = "",
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={`border-b border-border px-6 py-6 sm:px-10 print:px-0 print:py-4 ${className}`}>
      <h2 className="text-base font-bold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

export default async function Detail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await connectToDatabase()

  const x: any = serialize(
    await BuyBackRequest.findById(id).populate("userId", "name email phone").lean()
  )
  if (!x) notFound()

  const phone = x.phone || x.userId?.phone
  const statusKey = String(x.status ?? "").toLowerCase()
  const ref = String(x._id).slice(-6).toUpperCase()
  const submitted = x.createdAt
    ? new Date(x.createdAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })
    : null

  return (
    <div className="mx-auto w-full max-w-6xl">
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />

      {/* Page toolbar (not printed) */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <p className="eyebrow">Trade-in detail</p>
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
          Print request
        </button>
        <Script id="print-handler" strategy="afterInteractive">
          {`document.addEventListener("click",function(e){var t=e.target;if(t&&t.closest&&t.closest("[data-print]"))window.print()})`}
        </Script>
      </div>

      {/* Printable document */}
      <div id="print-area" className="border border-border bg-card">
        {/* Header */}
        <header className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-foreground px-6 py-8 sm:px-10 print:px-0 print:py-4">
          <div>
            <p className="text-sm text-muted-foreground">Trade-in request · Ref {ref}</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl print:text-2xl">
              {x.brand} {x.model}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {x.deviceType}
              {submitted && <> · Submitted {submitted}</>}
            </p>
          </div>
          {x.status && (
            <Badge className={STATUS_STYLES[statusKey] ?? "bg-muted text-foreground"}>{x.status}</Badge>
          )}
        </header>

        {/* Customer */}
        <Block title="Customer">
          <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 print:grid-cols-4">
            <Field label="Full name" value={x.name || x.userId?.name} />
            <Field label="ID number" value={x.idNumber} />
            <Field label="Phone / WhatsApp" value={phone} />
            <Field label="Account email" value={x.userId?.email} />
          </dl>
        </Block>

        {/* Device */}
        <Block title="Device">
          <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 print:grid-cols-4">
            <Field label="Category" value={x.deviceType} />
            <Field label="Brand" value={x.brand} />
            <Field label="Model" value={x.model} />
            <Field label="Condition" value={x.condition} />
            <Field label="Service preference" value={x.servicePreference || "Not specified"} />
          </dl>
        </Block>

        {/* Specifications / description */}
        <section className="grid border-b border-border md:grid-cols-2 print:grid-cols-2">
          <div className="px-6 py-6 sm:px-10 md:border-r md:border-border print:px-0 print:py-4 print:pr-6">
            <h2 className="text-base font-bold">Specifications</h2>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
              {x.specifications || "No specifications provided."}
            </p>
          </div>
          <div className="border-t border-border px-6 py-6 sm:px-10 md:border-t-0 print:border-t-0 print:px-0 print:py-4 print:pl-6">
            <h2 className="text-base font-bold">Description</h2>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
              {x.description || "No description provided."}
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section className="px-6 py-6 sm:px-10 print:px-0 print:py-4">
          <h2 className="text-base font-bold">Pricing</h2>
          <dl className="mt-4 w-full text-sm">
            <div className="flex w-full items-center justify-between py-1">
              <dt className="text-muted-foreground">Customer expected</dt>
              <dd className="tabular-nums">{x.expectedPrice ? formatCurrency(x.expectedPrice) : "Not provided"}</dd>
            </div>
            <div className="mt-2 flex w-full items-center justify-between border-t border-border pt-3 text-xl font-bold">
              <dt>Current offer</dt>
              <dd className="tabular-nums">{x.offeredPrice ? formatCurrency(x.offeredPrice) : "No offer sent yet"}</dd>
            </div>
          </dl>
        </section>

        {/* Signatures (print only) */}
        <section className="hidden grid-cols-2 gap-16 pt-16 print:grid">
          <div className="border-t border-foreground pt-2 text-xs text-muted-foreground">Customer signature</div>
          <div className="border-t border-foreground pt-2 text-xs text-muted-foreground">Authorized by</div>
        </section>
      </div>

      {/* Images (not printed) */}
      {x.images && x.images.length > 0 && (
        <section className="mt-6 border border-border bg-card p-6 sm:px-10 print:hidden">
          <h2 className="text-base font-bold">Device images</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {x.images.map((image: string, index: number) => (
              <a
                key={`${image}-${index}`}
                href={image}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden border border-border bg-muted"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt={`${x.brand} ${x.model} - image ${index + 1}`}
                  className="aspect-square w-full object-cover"
                />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Actions (not printed) */}
      <div className="mt-6 grid gap-6 md:grid-cols-2 print:hidden">
        <section className="border border-border bg-card p-6 sm:px-10">
          <h2 className="text-base font-bold">Send offer</h2>
          <div className="mt-4">
            <BuybackOfferForm id={x._id} offeredPrice={x.offeredPrice} />
          </div>
        </section>

        <section className="border border-border bg-card p-6 sm:px-10">
          <h2 className="text-base font-bold">Update status</h2>
          <div className="mt-4">
            <StatusForm id={x._id} kind="buyback" current={x.status} />
          </div>
        </section>
      </div>
    </div>
  )
}