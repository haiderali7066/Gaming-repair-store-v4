import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { connectToDatabase } from "@/lib/mongodb"
import { formatDate, serialize } from "@/lib/helpers"
import { RepairRequest } from "@/models/RepairRequest"

export default async function RepairsPage() {
  await connectToDatabase()
  const repairs = serialize(
    await RepairRequest.find()
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 })
      .lean()
  )

  const statuses = {
    submitted: "bg-blue-100 text-blue-800",
    "in-progress": "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  }

  const stats = {
    total: repairs.length,
    pending: repairs.filter((r: any) => r.status === "submitted").length,
    inProgress: repairs.filter((r: any) => r.status === "in-progress").length,
    completed: repairs.filter((r: any) => r.status === "completed").length,
  }

  return (
    <main className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Repair Requests</h1>
          <p className="text-muted-foreground">Manage customer repair requests and track progress</p>
        </div>
        <Link href="/admin/repairs/new">
          <Button className="gap-2">
            <Plus className="size-4" /> Create Repair Order
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Repairs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Repair Requests</CardTitle>
          <CardDescription>View and manage customer device repairs</CardDescription>
        </CardHeader>
        <CardContent>
          {repairs.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">No repair requests yet</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead>Problem</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {repairs.map((repair: any) => (
                    <TableRow key={repair._id}>
                      <TableCell className="font-medium">
                        {repair.brand} {repair.model}
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-sm">{repair.problem}</TableCell>
                      <TableCell className="text-sm">{repair.userId?.name || "Unknown"}</TableCell>
                      <TableCell className="text-sm">{repair.contact}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            statuses[repair.status as keyof typeof statuses] || "bg-gray-100"
                          }
                        >
                          {repair.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{formatDate(repair.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/admin/repairs/${repair._id}`}>
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
