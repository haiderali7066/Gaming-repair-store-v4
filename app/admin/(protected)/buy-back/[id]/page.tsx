import { notFound } from "next/navigation";
import { StatusForm } from "@/components/admin/StatusForm";
import { BuybackOfferForm } from "@/components/admin/BuybackOfferForm";
import { connectToDatabase } from "@/lib/mongodb";
import { formatCurrency, serialize } from "@/lib/helpers";
import { BuyBackRequest } from "@/models/BuyBackRequest";
import {
  CheckCircle2,
  CreditCard,
  FileText,
  Image as ImageIcon,
  MapPin,
  Phone,
  User,
} from "lucide-react";

export default async function Detail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectToDatabase();

  const x: any = serialize(
    await BuyBackRequest.findById(id)
      .populate("userId", "name email phone")
      .lean()
  );

  if (!x) notFound();

  return (
    <main className="max-w-6xl">
      {/* ============================================================ */}
      {/* HEADER                                                        */}
      {/* ============================================================ */}

      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-violet-600">
          Trade-in detail
        </p>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              {x.brand} {x.model}
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              {x.deviceType} · Submitted trade-in request
            </p>
          </div>

          {x.status && (
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
              <CheckCircle2 className="h-4 w-4" />
              {x.status}
            </div>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* MAIN GRID                                                     */}
      {/* ============================================================ */}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* ========================================================== */}
        {/* LEFT                                                        */}
        {/* ========================================================== */}

        <div className="space-y-6">
          {/* Device Information */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <SectionTitle
              icon={<FileText className="h-5 w-5" />}
              title="Device Information"
            />

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Info
                label="Device Category"
                value={x.deviceType}
              />

              <Info
                label="Brand"
                value={x.brand}
              />

              <Info
                label="Model"
                value={x.model}
              />

              <Info
                label="Condition"
                value={x.condition}
              />

              <Info
                label="Expected Price"
                value={
                  x.expectedPrice
                    ? formatCurrency(x.expectedPrice)
                    : "Not provided"
                }
                highlight
              />

              <Info
                label="Service Preference"
                value={
                  x.servicePreference || "Not specified"
                }
              />
            </div>
          </section>

          {/* Specifications */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <SectionTitle
              icon={<FileText className="h-5 w-5" />}
              title="Specifications"
            />

            <div className="mt-5 rounded-xl bg-muted/40 p-4">
              <p className="whitespace-pre-wrap text-sm leading-7">
                {x.specifications || "No specifications provided."}
              </p>
            </div>
          </section>

          {/* Description */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <SectionTitle
              icon={<FileText className="h-5 w-5" />}
              title="Device Description"
            />

            <div className="mt-5 rounded-xl bg-muted/40 p-4">
              <p className="whitespace-pre-wrap text-sm leading-7">
                {x.description || "No description provided."}
              </p>
            </div>
          </section>

          {/* Images */}
          {x.images && x.images.length > 0 && (
            <section className="rounded-2xl border border-border bg-card p-6">
              <SectionTitle
                icon={<ImageIcon className="h-5 w-5" />}
                title="Device Images"
              />

              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {x.images.map(
                  (image: string, index: number) => (
                    <a
                      key={`${image}-${index}`}
                      href={image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group overflow-hidden rounded-xl border border-border bg-muted"
                    >
                      <img
                        src={image}
                        alt={`${x.brand} ${x.model} - image ${
                          index + 1
                        }`}
                        className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    </a>
                  )
                )}
              </div>
            </section>
          )}

          {/* ======================================================== */}
          {/* OFFER                                                     */}
          {/* ======================================================== */}

          <section className="rounded-2xl border border-border bg-card p-6">
            <SectionTitle
              icon={<CreditCard className="h-5 w-5" />}
              title="Buy-Back Offer"
            />

            <div className="mt-5 rounded-xl bg-violet-50 p-5">
              <p className="text-sm font-medium text-muted-foreground">
                Customer expected
              </p>

              <p className="mt-1 text-2xl font-bold text-violet-700">
                {formatCurrency(x.expectedPrice)}
              </p>

              <div className="my-5 h-px bg-violet-200" />

              <p className="text-sm font-medium text-muted-foreground">
                Current offer
              </p>

              <p className="mt-1 text-2xl font-bold">
                {x.offeredPrice
                  ? formatCurrency(x.offeredPrice)
                  : "No offer sent yet"}
              </p>
            </div>

            <div className="mt-5">
              <BuybackOfferForm
                id={x._id}
                offeredPrice={x.offeredPrice}
              />
            </div>
          </section>

          {/* ======================================================== */}
          {/* STATUS                                                     */}
          {/* ======================================================== */}

          <section className="rounded-2xl border border-border bg-card p-6">
            <SectionTitle
              icon={<CheckCircle2 className="h-5 w-5" />}
              title="Request Status"
            />

            <div className="mt-5">
              <StatusForm
                id={x._id}
                kind="buyback"
                current={x.status}
              />
            </div>
          </section>
        </div>

        {/* ========================================================== */}
        {/* RIGHT SIDEBAR                                               */}
        {/* ========================================================== */}

        <aside className="space-y-6">
          {/* Customer */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <SectionTitle
              icon={<User className="h-5 w-5" />}
              title="Customer"
            />

            <div className="mt-5 space-y-5">
              <Info
                label="Full Name"
                value={x.name || x.userId?.name}
              />

              <Info
                label="ID Number"
                value={x.idNumber}
              />

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Phone / WhatsApp
                </p>

                <a
                  href={
                    x.phone
                      ? `tel:${x.phone}`
                      : x.userId?.phone
                      ? `tel:${x.userId.phone}`
                      : undefined
                  }
                  className="mt-1 flex items-center gap-2 text-sm font-semibold text-violet-600 hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  {x.phone || x.userId?.phone || "Not provided"}
                </a>
              </div>

              {/* If email exists from user account, show it */}
              {x.userId?.email && (
                <Info
                  label="Account Email"
                  value={x.userId.email}
                />
              )}
            </div>
          </section>

          {/* Service */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <SectionTitle
              icon={<MapPin className="h-5 w-5" />}
              title="Service Preference"
            />

            <div className="mt-5 rounded-xl bg-violet-50 p-4">
              <p className="font-semibold text-violet-700">
                {x.servicePreference || "Not specified"}
              </p>
            </div>
          </section>

          {/* Request summary */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Request Summary
            </p>

            <div className="mt-5 space-y-4">
              <Info
                label="Device"
                value={`${x.brand || ""} ${x.model || ""}`}
              />

              <Info
                label="Category"
                value={x.deviceType}
              />

              <Info
                label="Condition"
                value={x.condition}
              />

              <Info
                label="Expected Price"
                value={
                  x.expectedPrice
                    ? formatCurrency(x.expectedPrice)
                    : "Not provided"
                }
              />
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}

/* ================================================================== */
/* COMPONENTS                                                        */
/* ================================================================== */

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
        {icon}
      </div>

      <h2 className="text-lg font-bold">{title}</h2>
    </div>
  );
}

function Info({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value?: string | number | null;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>

      <p
        className={`mt-1.5 text-sm font-semibold ${
          highlight ? "text-violet-600" : ""
        }`}
      >
        {value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
          ? value
          : "Not provided"}
      </p>
    </div>
  );
}