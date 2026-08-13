import Link from "next/link"
import { UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { connectToDatabase } from "@/lib/mongodb"
import { formatDate, serialize } from "@/lib/helpers"
import { User } from "@/models/User"

export default async function Customers() {
  await connectToDatabase()
  const rows = serialize(await User.find({ role: "customer" }).sort({ createdAt: -1 }).lean())

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Customer database</p>
          <h1 className="mt-3 text-5xl font-extrabold">Customers</h1>
        </div>
        <Button render={<Link href="/admin/customers/new" />} className="gap-2">
          <UserPlus className="size-4" /> Add Customer
        </Button>
      </div>
      <div className="mt-8 border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((x: any) => (
              <TableRow key={x._id}>
                <TableCell>{x.name}</TableCell>
                <TableCell>{x.email}</TableCell>
                <TableCell>{x.phone}</TableCell>
                <TableCell>{formatDate(x.createdAt)}</TableCell>
                <TableCell>
                  <Button size="sm" variant="ghost" render={<Link href={`/admin/customers/${x._id}`} />}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
