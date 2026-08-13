import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { connectToDatabase } from "@/lib/mongodb"
import { formatCurrency, formatDate, serialize } from "@/lib/helpers"
import { BuyBackRequest } from "@/models/BuyBackRequest"

export default async function BuyBackPage() {
  await connectToDatabase()
  const buybacks = serialize(
    await BuyBackRequest.find()
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 })
      .lean()
  )

  const statuses = {
    submitted: "bg-blue-100 text-blue-800",
    "under-review": "bg-purple-100 text-purple-800",
    quoted: "bg-cyan-100 text-cyan-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    completed: "bg-green-100 text-green-800",
  }

  const stats = {
    total: buybacks.length,
    pending: buybacks.filter((b: any) => b.status === "submitted").length,
    quoted: buybacks.filter((b: any) => b.status === "quoted").length,
    accepted: buybacks.filter((b: any) => b.status === "accepted").length,
    totalValue: buybacks
      .filter((b: any) => b.offeredPrice)
      .reduce((sum: number, b: any) => sum + (b.offeredPrice || 0), 0),
  }

  return (
    <main className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Device Trade-in</h1>
          <p className="text-muted-foreground">Manage customer device trade-in requests</p>
        </div>
        <Link href="/admin/buy-back/new">
          <Button className="gap-2">
            <Plus className="size-4" /> Create Trade-in Order
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quoted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-600">{stats.quoted}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Offered Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalValue)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Trade-in Requests</CardTitle>
          <CardDescription>Review device submissions and manage offers</CardDescription>
        </CardHeader>
        <CardContent>
          {buybacks.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">No trade-in requests yet</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Expected</TableHead>
                    <TableHead>Offered</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {buybacks.map((buyback: any) => (
                    <TableRow key={buyback._id}>
                      <TableCell className="font-medium">
                        {buyback.brand} {buyback.model}
                      </TableCell>
                      <TableCell className="text-sm capitalize">{buyback.condition}</TableCell>
                      <TableCell className="text-sm">{buyback.userId?.name || "Unknown"}</TableCell>
                      <TableCell className="text-sm">
                        {buyback.expectedPrice ? formatCurrency(buyback.expectedPrice) : "N/A"}
                      </TableCell>
                      <TableCell className="text-sm font-semibold">
                        {buyback.offeredPrice ? formatCurrency(buyback.offeredPrice) : "—"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            statuses[buyback.status as keyof typeof statuses] || "bg-gray-100"
                          }
                        >
                          {buyback.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{formatDate(buyback.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/admin/buy-back/${buyback._id}`}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
