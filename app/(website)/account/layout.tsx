import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { AccountNav } from "@/components/account/AccountNav"

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect("/auth/login")

  return (
    <main className="section-shell py-12">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <div className="lg:sticky lg:top-6">
          <AccountNav />
        </div>

        {/* Main Content */}
        <div className="min-w-0">{children}</div>
      </div>
    </main>
  )
}
