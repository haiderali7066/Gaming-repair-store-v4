import { CreateCustomerForm } from "@/components/admin/CreateCustomerForm"

export default function NewCustomerPage() {
  return (
    <>
      <p className="eyebrow">Customer database</p>
      <h1 className="mt-3 text-5xl font-extrabold">Add Customer</h1>
      <p className="mt-3 text-muted-foreground">Create a walk-in customer record on their behalf.</p>
      <div className="mt-8">
        <CreateCustomerForm />
      </div>
    </>
  )
}
