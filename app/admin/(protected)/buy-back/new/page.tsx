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
    initialCustomer = serialize(await User.findById(customerId).select("name email phone photoUrl").lean())
  }

  return (
    <>
      <p className="eyebrow">Trade-in intake</p>
      <h1 className="mt-3 text-5xl font-extrabold">Create Trade-in Order</h1>
      <p className="mt-3 text-muted-foreground">Log a walk-in device trade-in on behalf of a customer.</p>
      <div className="mt-8">
        <AdminBuyBackForm initialCustomer={initialCustomer} />
      </div>
    </>
  )
}
