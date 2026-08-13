import Link from "next/link"
import { auth } from "@/auth"
import { connectToDatabase } from "@/lib/mongodb"
import { Order } from "@/models/Order"
import { RepairRequest } from "@/models/RepairRequest"
import { BuyBackRequest } from "@/models/BuyBackRequest"
import { Button } from "@/components/ui/button"
import { Wrench, RefreshCw } from "lucide-react"

export default async function AccountPage() {
  const session = await auth()
  await connectToDatabase()

  const [orders, repairs, buybacks] = await Promise.all([
    Order.countDocuments({ userId: session!.user.id }),
    RepairRequest.countDocuments({ userId: session!.user.id }),
    BuyBackRequest.countDocuments({ userId: session!.user.id }),
  ])

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1">
          Welcome back, {session!.user.name.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground">Manage your account and orders</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Link href="/account/orders" className="block">
          <div className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
            <div className="text-2xl font-bold text-primary">{orders}</div>
            <div className="text-sm text-muted-foreground mt-1">Orders</div>
          </div>
        </Link>
        <Link href="/account/repairs" className="block">
          <div className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
            <div className="text-2xl font-bold text-primary">{repairs}</div>
            <div className="text-sm text-muted-foreground mt-1">Repairs</div>
          </div>
        </Link>
        <Link href="/account/buy-back" className="block">
          <div className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
            <div className="text-2xl font-bold text-primary">{buybacks}</div>
            <div className="text-sm text-muted-foreground mt-1">Trade-ins</div>
          </div>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Quick Actions
        </h2>
        <div className="space-y-2">
          <Button
            render={<Link href="/repair-booking" />}
            className="w-full justify-start gap-2"
          >
            <Wrench className="h-4 w-4" />
            Request a Repair
          </Button>
          <Button
            render={<Link href="/trade-in" />}
            variant="outline"
            className="w-full justify-start gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Trade-in Device
          </Button>
        </div>
      </div>
    </div>
  )
}
