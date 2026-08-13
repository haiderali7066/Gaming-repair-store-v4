import Link from "next/link"
import { logoutAction } from "@/actions/auth"
import { Button } from "@/components/ui/button"
const links = [["Dashboard","/admin/dashboard"],["Products","/admin/products"],["Orders","/admin/orders"],["Customers","/admin/customers"],["Repairs","/admin/repairs"],["Trade-in","/admin/buy-back"],["Inventory","/admin/inventory"],["Reports","/admin/reports"]]
export function AdminSidebar() { return <aside className="border-b border-border bg-card p-4 lg:min-h-screen lg:border-b-0 lg:border-r"><Link href="/admin/dashboard" className="block px-3 py-4 font-bold">AL DANA <span className="text-primary">OPS</span></Link><nav className="mt-4 flex gap-1 overflow-x-auto lg:flex-col">{links.map(([label,href]) => <Button key={href} variant="ghost" className="shrink-0 justify-start" render={<Link href={href} />}>{label}</Button>)}</nav><form action={logoutAction} className="mt-6"><Button variant="outline" className="w-full" type="submit">Sign out</Button></form></aside> }
