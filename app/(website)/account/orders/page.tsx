import Link from "next/link"
import { auth } from "@/auth"
import { connectToDatabase } from "@/lib/mongodb"
import { formatCurrency, formatDate, serialize } from "@/lib/helpers"
import { Order } from "@/models/Order"
import { Button } from "@/components/ui/button"

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  processing: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>
}) {
  const session = await auth()
  const { success } = await searchParams
  await connectToDatabase()

  const orders = serialize(
    await Order.find({ userId: session!.user.id })
      .sort({ createdAt: -1 })
      .lean()
  )

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1">Your Orders</h1>
        <p className="text-muted-foreground">View and track your purchases</p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm dark:bg-green-950/20 dark:border-green-900/30 dark:text-green-400">
          {success}
        </div>
      )}

      {/* Orders List */}
      {orders.length > 0 ? (
        <div className="space-y-3">
          {orders.map((order: any) => (
            <div key={order._id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-sm font-semibold text-primary mb-1">{order.orderNumber}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(order.createdAt)} • {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold mb-2">{formatCurrency(order.subtotal)}</div>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded text-xs font-medium ${
                      statusStyles[order.status as keyof typeof statusStyles] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
          <div className="text-muted-foreground mb-4">No orders yet</div>
          <Button render={<Link href="/shop" />} variant="outline">
            Start Shopping
          </Button>
        </div>
      )}
    </div>
  )
}
