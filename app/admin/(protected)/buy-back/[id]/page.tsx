import { notFound } from "next/navigation"
import { StatusForm } from "@/components/admin/StatusForm"
import { BuybackOfferForm } from "@/components/admin/BuybackOfferForm"
import { connectToDatabase } from "@/lib/mongodb"
import { formatCurrency, serialize } from "@/lib/helpers"
import { BuyBackRequest } from "@/models/BuyBackRequest"

export default async function Detail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await connectToDatabase()
  const x: any = serialize(await BuyBackRequest.findById(id).populate("userId", "name email phone").lean())
  if (!x) notFound()
  return (
    <>
      <p className="eyebrow">Trade-in detail</p>
      <h1 className="mt-3 text-5xl font-extrabold">
        {x.brand} {x.model}
      </h1>
      <section className="mt-8 max-w-3xl border border-border bg-card p-6">
        <p className="leading-7 text-muted-foreground">
          {x.deviceType} · {x.condition}
          <br />
          {x.userId?.name} · {x.userId?.email}
        </p>
        <h2 className="mt-6 text-2xl font-bold">{formatCurrency(x.expectedPrice)} expected</h2>
        <p className="mt-3 leading-relaxed">
          {x.specifications}
          <br />
          {x.description}
        </p>
        <div className="mt-6 space-y-4">
          <div>
            <p className="mb-2 text-sm font-semibold">
              {x.offeredPrice ? `Offered: ${formatCurrency(x.offeredPrice)}` : "No offer sent yet"}
            </p>
            <BuybackOfferForm id={x._id} offeredPrice={x.offeredPrice} />
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold">Status</p>
            <StatusForm id={x._id} kind="buyback" current={x.status} />
          </div>
        </div>
      </section>
    </>
  )
}
