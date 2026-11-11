import Link from "next/link"
import { UserPlus } from "lucide-react"
import { connectToDatabase } from "@/lib/mongodb"
import { serialize } from "@/lib/helpers"
import { User } from "@/models/User"
import { AdminBuyBackForm } from "@/components/admin/AdminBuyBackForm"

export default async function NewBuyBackPage({
  searchParams,
}: {
  searchParams: Promise<{ customerId?: string }>
}) {
  const { customerId } = await searchParams
  let initialCustomer = null

  if (customerId) {
    await connectToDatabase()
    initialCustomer = serialize(
      await User.findById(customerId).select("name email phone photoUrl").lean()
    )
  }

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row  sm:items-center sm:justify-start">
        <div>
          <p className="eyebrow">Trade-in intake</p>
          <h1 className="mt-3 text-5xl font-extrabold">
            Create Trade-in Order
          </h1>
          <p className="mt-3 text-muted-foreground">
            Log a walk-in device trade-in on behalf of a customer.
          </p>
        </div>

        <Link
          href="/admin/customers/new"
          className="inline-flex sm:ml-20 shrink-0 items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
        >
          <UserPlus className="size-4" />
          Create New Customer
        </Link>
      </div>

      <div className="mt-8">
        <AdminBuyBackForm initialCustomer={initialCustomer} />
      </div>
    </>
  )
}