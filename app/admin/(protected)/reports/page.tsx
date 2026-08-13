import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { connectToDatabase } from "@/lib/mongodb"
import { formatCurrency, formatDate } from "@/lib/helpers"
import { Order } from "@/models/Order"
import { Product } from "@/models/Product"
import { RepairRequest } from "@/models/RepairRequest"
import { BuyBackRequest } from "@/models/BuyBackRequest"

export default async function ReportsPage() {
  await connectToDatabase()

  const [
    revenueData,
    lowStockCount,
    openRepairs,
    openBuybacks,
    totalOrders,
    topProducts,
    ordersByStatus,
  ] = await Promise.all([
    Order.aggregate([
      { $match: { status: { $ne: "cancelled" } } },
      { $group: { _id: null, value: { $sum: "$subtotal" } } },
    ]),
    Product.countDocuments({ stock: { $lt: 5 } }),
    RepairRequest.countDocuments({ status: { $nin: ["completed", "rejected"] } }),
    BuyBackRequest.countDocuments({ status: { $nin: ["completed", "rejected"] } }),
    Order.countDocuments(),
    Product.find({ published: true })
      .sort({ stock: -1 })
      .limit(10)
      .select("name price stock category"),
    Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
  ])

  const totalRevenue = revenueData[0]?.value || 0
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  return (
    <main className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground">Detailed business metrics and performance data</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="mt-1 text-xs text-muted-foreground">All orders (excluding cancelled)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(averageOrderValue)}</div>
            <p className="mt-1 text-xs text-muted-foreground">Across {totalOrders} orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{lowStockCount}</div>
            <p className="mt-1 text-xs text-muted-foreground">Products below 5 units</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Open Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">
              {openRepairs + openBuybacks}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {openRepairs} repairs, {openBuybacks} trade-ins
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Order Status Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Order Status Breakdown</CardTitle>
          <CardDescription>Distribution of all orders by status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ordersByStatus.length === 0 ? (
              <p className="text-sm text-muted-foreground">No orders yet</p>
            ) : (
              ordersByStatus.map((item: any) => (
                <div key={item._id} className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Badge variant="outline" className="capitalize">
                      {item._id || "unknown"}
                    </Badge>
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-48 rounded bg-muted">
                      <div
                        className="h-full rounded bg-primary"
                        style={{
                          width: `${(item.count / totalOrders) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-right font-semibold">{item.count}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Products</CardTitle>
          <CardDescription>Products with highest current stock</CardDescription>
        </CardHeader>
        <CardContent>
          {topProducts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No products yet</p>
          ) : (
            <div className="space-y-2">
              {topProducts.map((product: any, idx: number) => (
                <div key={product._id} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-muted-foreground">#{idx + 1}</span>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(product.price)}</p>
                    <p className="text-xs text-muted-foreground">{product.stock} in stock</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Service Metrics */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Service Performance</CardTitle>
            <CardDescription>Repair and trade-in metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Open Repairs</span>
                <Badge className="bg-blue-100 text-blue-800">{openRepairs}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Open Trade-in Requests</span>
                <Badge className="bg-cyan-100 text-cyan-800">{openBuybacks}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Service Requests</span>
                <Badge variant="outline">{openRepairs + openBuybacks}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Health</CardTitle>
            <CardDescription>Stock level summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Low Stock (&lt;5)</span>
                <Badge className="bg-orange-100 text-orange-800">{lowStockCount}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Items to Reorder</span>
                <Badge className="bg-red-100 text-red-800">
                  {lowStockCount > 0 ? "Action needed" : "All good"}
                </Badge>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Monitor stock levels regularly to avoid stockouts and ensure smooth operations.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
