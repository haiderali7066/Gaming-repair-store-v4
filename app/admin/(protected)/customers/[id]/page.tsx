import Link from "next/link"
import { notFound } from "next/navigation"
import { Wrench, RefreshCw, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { connectToDatabase } from "@/lib/mongodb"
import { User } from "@/models/User"
import { Order } from "@/models/Order"
import { RepairRequest } from "@/models/RepairRequest"
import { BuyBackRequest } from "@/models/BuyBackRequest"

export default async function Customer({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await connectToDatabase()
  const [user, orders, repairs, buybacks] = await Promise.all([
    User.findById(id).lean(),
    Order.countDocuments({ userId: id }),
    RepairRequest.countDocuments({ userId: id }),
    BuyBackRequest.countDocuments({ userId: id }),
  ])
  if (!user) notFound()
  const u: any = user

  return (
    <>
      <p className="eyebrow">Customer profile</p>
      <div className="mt-3 flex flex-wrap items-center gap-4">
        {u.photoUrl && (
          <img src={u.photoUrl || "/placeholder.svg"} alt={u.name} className="h-16 w-16 rounded-full object-cover" />
        )}
        <div>
          <h1 className="text-5xl font-extrabold">{u.name}</h1>
          <p className="mt-3 text-muted-foreground">
            {u.email} · {u.phone}
            {u.idNumber && <> · ID {u.idNumber}</>}
          </p>
          {u.address && <p className="mt-1 text-sm text-muted-foreground">{u.address}</p>}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button variant="outline" className="gap-2" render={<Link href={`/admin/repairs/new?customerId=${u._id}`} />}>
          <Wrench className="size-4" /> Create Repair Order
        </Button>
        <Button variant="outline" className="gap-2" render={<Link href={`/admin/buy-back/new?customerId=${u._id}`} />}>
          <RefreshCw className="size-4" /> Create Trade-in Order
        </Button>
        <Button variant="outline" className="gap-2" render={<Link href={`/admin/orders/new?customerId=${u._id}`} />}>
          <ShoppingBag className="size-4" /> Sell Products
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[[orders, "Orders"], [repairs, "Repairs"], [buybacks, "Trade-ins"]].map(([v, l]) => (
          <article key={String(l)} className="border border-border bg-card p-6">
            <p className="text-4xl font-bold text-primary">{v}</p>
            <h2 className="mt-2 text-xl font-bold">{String(l)}</h2>
          </article>
        ))}
      </div>
    </>
  )
}
