import { connectToDatabase } from "@/lib/mongodb"
import { serialize } from "@/lib/helpers"
import { User } from "@/models/User"
import { AdminRepairForm } from "@/components/admin/AdminRepairForm"

export default async function NewRepairPage({
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
      <p className="eyebrow">Repair intake</p>
      <h1 className="mt-3 text-5xl font-extrabold">Create Repair Order</h1>
      <p className="mt-3 text-muted-foreground">Log a walk-in repair request on behalf of a customer.</p>
      <div className="mt-8">
        <AdminRepairForm initialCustomer={initialCustomer} />
      </div>
    </>
  )
}
