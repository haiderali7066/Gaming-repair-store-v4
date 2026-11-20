import { notFound } from "next/navigation"
import Script from "next/script"
import { Badge } from "@/components/ui/badge"
import { StatusForm } from "@/components/admin/StatusForm"
import { connectToDatabase } from "@/lib/mongodb"
import { serialize } from "@/lib/helpers"
import { RepairRequest } from "@/models/RepairRequest"

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  received: "bg-blue-100 text-blue-800",
  diagnosing: "bg-blue-100 text-blue-800",
  "in progress": "bg-indigo-100 text-indigo-800",
  "in-progress": "bg-indigo-100 text-indigo-800",
  repaired: "bg-emerald-100 text-emerald-800",
  completed: "bg-emerald-100 text-emerald-800",
  delivered: "bg-emerald-100 text-emerald-800",
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

/**
 * Converts a typed phone number into the digits-only international format
 * that wa.me needs. Assumes Pakistan (+92) for local numbers.
 *   0300 1234567    -> 923001234567
 *   +92 300 1234567 -> 923001234567
 *   3001234567      -> 923001234567
 *   0092300...      -> 92300...
 */
function toWhatsAppNumber(raw?: string | number | null): string {
  if (raw === undefined || raw === null) return ""
  let digits = String(raw).replace(/\D/g, "")
  if (!digits) return ""

  if (digits.startsWith("00")) digits = digits.slice(2)
  else if (digits.startsWith("0")) digits = "92" + digits.slice(1)
  else if (digits.length === 10 && digits.startsWith("3")) digits = "92" + digits

  return digits.length >= 10 ? digits : ""
}

function Field({ label, value }: { label: string; value?: string | number | null }) {
  const has = value !== undefined && value !== null && String(value).trim() !== ""
  return (
    <div className="min-w-0">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 break-words text-sm font-medium">{has ? value : "Not provided"}</dd>
    </div>
  )
}

function PhoneField({ label, value }: { label: string; value?: string | number | null }) {
  const has = value !== undefined && value !== null && String(value).trim() !== ""
  const wa = toWhatsAppNumber(value)

  return (
    <div className="min-w-0">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 break-words text-sm font-medium">
        {has ? String(value) : "Not provided"}
      </dd>
      {wa && (
        <a
          href={`https://wa.me/${wa}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:underline print:hidden"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.08.54 4.1 1.58 5.9L0 24l6.4-1.68a11.8 11.8 0 0 0 5.64 1.44h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.37-8.44ZM12.05 21.77h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.8 1 1.02-3.7-.24-.38a9.9 9.9 0 0 1-1.52-5.26c0-5.47 4.45-9.92 9.93-9.92 2.65 0 5.14 1.03 7.01 2.9a9.85 9.85 0 0 1 2.9 7.02c0 5.47-4.45 9.93-9.89 9.93Zm5.44-7.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
          </svg>
          Chat on WhatsApp
        </a>
      )}
    </div>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-border px-6 py-6 sm:px-10 print:px-0 print:py-4">
      <h2 className="text-base font-bold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

export default async function Detail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await connectToDatabase()

  const x: any = serialize(
    await RepairRequest.findById(id).populate("userId", "name email phone").lean()
  )
  if (!x) notFound()

  // `contact` is the preferred contact METHOD (WhatsApp / Phone / Email), not a number.
  const CONTACT_METHODS = ["whatsapp", "phone", "email"]
  const contactMethod = CONTACT_METHODS.includes(String(x.contact ?? "").trim().toLowerCase())
    ? String(x.contact).trim()
    : null

  // Checks every place a number might be stored, first non-empty one wins
  const phone = [x.phone, x.whatsapp, x.contact, x.userId?.phone].find(
    (v) =>
      v !== undefined &&
      v !== null &&
      String(v).trim() !== "" &&
      !CONTACT_METHODS.includes(String(v).trim().toLowerCase())
  )
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
        <p className="eyebrow">Repair detail</p>
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
          {`if(!window.__printBound){window.__printBound=true;document.addEventListener("click",function(e){var t=e.target;if(t&&t.closest&&t.closest("[data-print]"))window.print()})}`}
        </Script>
      </div>

      {/* Printable document */}
      <div id="print-area" className="border border-border bg-card">
        {/* Header */}
        <header className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-foreground px-6 py-8 sm:px-10 print:px-0 print:py-4">
          <div>
            <p className="text-sm text-muted-foreground">Repair request · Ref {ref}</p>
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
          <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-3">
            <Field label="Full name" value={x.userId?.name} />
            <PhoneField label="Contact Number" value={phone} />
            <Field label="Preferred contact" value={contactMethod} />
            <Field label="Account email" value={x.userId?.email} />
          </dl>
        </Block>

        {/* Device */}
        <Block title="Device">
          <dl className="grid gap-5 sm:grid-cols-3 print:grid-cols-3">
            <Field label="Category" value={x.deviceType} />
            <Field label="Brand" value={x.brand} />
            <Field label="Model" value={x.model} />
          </dl>
        </Block>

        {/* Problem */}
        <section className="px-6 py-6 sm:px-10 print:px-0 print:py-4">
          <h2 className="text-base font-bold">Reported problem</h2>
          <p className="mt-4 max-w-3xl whitespace-pre-wrap text-sm leading-7">
            {x.problem || "No problem description provided."}
          </p>
        </section>

        {/* Signatures (print only) */}
        <section className="hidden grid-cols-2 gap-16 pt-16 print:grid">
          <div className="border-t border-foreground pt-2 text-xs text-muted-foreground">Customer signature</div>
          <div className="border-t border-foreground pt-2 text-xs text-muted-foreground">Authorized by</div>
        </section>
      </div>

      {/* Status (not printed) */}
      <section className="mt-6 border border-border bg-card p-6 sm:px-10 print:hidden">
        <h2 className="text-base font-bold">Update status</h2>
        <div className="mt-4 max-w-xl">
          <StatusForm id={x._id} kind="repair" current={x.status} />
        </div>
      </section>
    </div>
  )
}