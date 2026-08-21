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
  FileText
} from "lucide-react";

// 1. Enhanced links array with relevant Lucide icons
const links = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Repairs", href: "/admin/repairs", icon: Wrench },
  { label: "Trade-in", href: "/admin/buy-back", icon: Repeat },
  { label: "Inventory", href: "/admin/inventory", icon: Boxes },
  { label: "Reports", href: "/admin/reports", icon: BarChart3 },
  {
  label: "Blogs",
  href: "/admin/blogs",
  icon: FileText,
}
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col bg-violet-950 text-violet-100 lg:min-h-screen lg:w-64 border-b lg:border-b-0 lg:border-r border-violet-900/50 shadow-2xl z-20 relative">
      
      {/* 2. Upgraded Logo Area */}
      <div className="p-4 lg:p-6 mb-2">
        <Link href="/admin/dashboard" className="flex items-center gap-3 group w-fit">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-400 to-fuchsia-500 flex items-center justify-center shadow-lg group-hover:shadow-[0_0_15px_rgba(167,139,250,0.5)] transition-all duration-300">
            <span className="font-black text-white text-base">A</span>
          </div>
          <span className="font-bold text-lg tracking-wide text-white flex gap-1.5">
            AL DANA <span className="text-violet-400">OPS</span>
          </span>
        </Link>
      </div>

      {/* 3. Navigation Links (Horizontal scroll on mobile, vertical on desktop) */}
      <nav className="flex flex-row lg:flex-col gap-1.5 px-4 pb-4 lg:pb-0 overflow-x-auto lg:overflow-visible flex-grow no-scrollbar">
        {links.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 lg:shrink flex-1 lg:flex-none ${
                isActive
                  ? "bg-violet-600/80 text-white shadow-md shadow-violet-900/20 font-semibold backdrop-blur-sm"
                  : "text-violet-300 hover:bg-violet-900/60 hover:text-white"
              }`}
            >
              <Icon 
                strokeWidth={isActive ? 2.5 : 2} 
                className={`w-5 h-5 ${isActive ? "text-white" : "text-violet-400/70"}`} 
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* 4. Logout Section (Pushed to bottom on desktop via mt-auto) */}
      <div className="p-4 mt-auto lg:border-t border-violet-900/50 hidden lg:block">
        <form action={logoutAction}>
          <button 
            type="submit"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-violet-300 bg-violet-900/30 hover:bg-red-500/10 hover:text-red-400 transition-colors font-semibold group border border-transparent hover:border-red-500/20"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Sign out
          </button>
        </form>
      </div>
      
    </aside>
  );
}