import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { StatusForm } from "@/components/admin/StatusForm"
import { connectToDatabase } from "@/lib/mongodb"
import { formatCurrency, serialize } from "@/lib/helpers"
import { PAYMENT_METHOD_LABELS } from "@/lib/constants"
import { Order } from "@/models/Order"

export default async function OrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await connectToDatabase()
  const x: any = serialize(await Order.findById(id).populate("userId", "name email").lean())
  if (!x) notFound()

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <p className="eyebrow">Order detail</p>
        {x.source === "in-shop" && <Badge className="bg-purple-100 text-purple-800">In-shop sale</Badge>}
      </div>
      <h1 className="mt-3 text-5xl font-extrabold">{x.orderNumber}</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="border border-border bg-card p-6">
          <h2 className="text-2xl font-bold">Items</h2>
          <div className="mt-4 flex flex-col gap-3">
            {x.items.map((i: any) => (
              <div key={i._id} className="flex justify-between">
                <span>
                  {i.quantity} × {i.name}
                </span>
                <span>{formatCurrency(i.price * i.quantity)}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 border-t border-border pt-5 text-xl font-bold">{formatCurrency(x.subtotal)}</p>
          {x.paymentMethod && (
            <p className="mt-2 text-sm text-muted-foreground">Paid via {PAYMENT_METHOD_LABELS[x.paymentMethod]}</p>
          )}
        </section>
        <section className="border border-border bg-card p-6">
          <h2 className="text-2xl font-bold">Customer & delivery</h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            {x.userId?.name}
            <br />
            {x.userId?.email}
            <br />
            {x.shipping.phone}
            <br />
            {x.shipping.address}
            {x.shipping.city && <>, {x.shipping.city}</>}
          </p>
          {x.shipping.notes && <p className="mt-3 text-sm text-muted-foreground">Note: {x.shipping.notes}</p>}
          <div className="mt-6">
            <StatusForm id={x._id} kind="order" current={x.status} />
          </div>
        </section>
      </div>
    </>
  )
}
