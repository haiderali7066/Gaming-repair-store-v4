"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/actions/auth";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Wrench,
  Repeat,
  Boxes,
  BarChart3,
  LogOut,
  FileText,
} from "lucide-react";

const links = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Repairs", href: "/admin/repairs", icon: Wrench },
  { label: "Trade-in", href: "/admin/buy-back", icon: Repeat },
  { label: "Inventory", href: "/admin/inventory", icon: Boxes },
  { label: "Reports", href: "/admin/reports", icon: BarChart3 },
  { label: "Blogs", href: "/admin/blogs", icon: FileText },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 z-20 flex flex-col border-b border-violet-900/50 bg-violet-950 text-violet-100 shadow-2xl lg:h-screen lg:w-64 lg:border-b-0 lg:border-r">
      {/* Logo */}
      <div className="shrink-0 p-4 lg:mb-2 lg:p-6">
        <Link
          href="/admin/dashboard"
          className="group flex w-fit items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400 to-fuchsia-500 shadow-lg transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(167,139,250,0.5)]">
            <span className="text-base font-black text-white">A</span>
          </div>
          <span className="flex gap-1.5 text-lg font-bold tracking-wide text-white">
            AL DANA <span className="text-violet-400">OPS</span>
          </span>
        </Link>
      </div>

      {/* Links: horizontal scroll on mobile, vertical (own scroll if the screen is short) on desktop */}
      <nav className="no-scrollbar flex flex-row gap-1.5 overflow-x-auto px-4 pb-4 lg:min-h-0 lg:flex-1 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pb-4">
        {links.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`flex shrink-0 flex-1 items-center gap-3 whitespace-nowrap rounded-xl px-3.5 py-2.5 transition-all duration-200 lg:flex-none lg:shrink-0 ${
                isActive
                  ? "bg-violet-600/80 font-semibold text-white shadow-md shadow-violet-900/20 backdrop-blur-sm"
                  : "text-violet-300 hover:bg-violet-900/60 hover:text-white"
              }`}
            >
              <Icon
                strokeWidth={isActive ? 2.5 : 2}
                className={`h-5 w-5 ${isActive ? "text-white" : "text-violet-400/70"}`}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Sign out: always visible at the bottom on desktop */}
      <div className="mt-auto hidden shrink-0 border-t border-violet-900/50 p-4 lg:block">
        <form action={logoutAction}>
          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-2 rounded-xl border border-transparent bg-violet-900/30 px-4 py-3 font-semibold text-violet-300 transition-colors hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}