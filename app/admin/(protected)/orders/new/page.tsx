import { connectToDatabase } from "@/lib/mongodb"
import { serialize } from "@/lib/helpers"
import { User } from "@/models/User"
import { PosSaleForm } from "@/components/admin/PosSaleForm"

export default async function NewOrderPage({
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
      <p className="eyebrow">Point of sale</p>
      <h1 className="mt-3 text-5xl font-extrabold">Sell Products</h1>
      <p className="mt-3 text-muted-foreground">Ring up an in-person purchase for a customer.</p>
      <div className="mt-8">
        <PosSaleForm initialCustomer={initialCustomer} />
      </div>
    </>
  )
}
