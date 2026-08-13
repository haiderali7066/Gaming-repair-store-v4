import Link from "next/link"
import { logoutAction } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { Home, ShoppingBag, Wrench, RefreshCw, User, LogOut } from "lucide-react"

const links = [
  { label: "Overview", href: "/account", icon: Home },
  { label: "Orders", href: "/account/orders", icon: ShoppingBag },
  { label: "Repairs", href: "/account/repairs", icon: Wrench },
  { label: "Trade-in", href: "/account/buy-back", icon: RefreshCw },
  { label: "Profile", href: "/account/profile", icon: User },
]

export function AccountNav() {
  return (
    <aside className="sticky top-6 h-fit">
      {/* Navigation */}
      <nav className="space-y-1 border-b border-border pb-4">
        {links.map(({ label, href, icon: Icon }) => (
          <Link key={href} href={href}>
            <div className="flex items-center gap-2 px-3 py-2.5 text-sm rounded hover:bg-muted transition-colors">
              <Icon className="h-4 w-4 text-muted-foreground" />
              <span>{label}</span>
            </div>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <form action={logoutAction} className="pt-4">
        <Button
          variant="ghost"
          className="justify-start gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground w-full"
          type="submit"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </Button>
      </form>
    </aside>
  )
}
