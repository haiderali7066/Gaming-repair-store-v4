"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/actions/auth";
import { 
  Home, 
  ShoppingBag, 
  Wrench, 
  RefreshCw, 
  User, 
  LogOut,
  ChevronRight
} from "lucide-react";

const links = [
  { label: "Overview", href: "/account", icon: Home },
  { label: "Orders", href: "/account/orders", icon: ShoppingBag },
  { label: "Repairs", href: "/account/repairs", icon: Wrench },
  { label: "Trade-in", href: "/account/buy-back", icon: RefreshCw },
  { label: "Profile", href: "/account/profile", icon: User },
];

export function AccountNav() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-8 flex flex-col bg-violet-950 border border-violet-900/50 rounded-3xl shadow-2xl overflow-hidden h-fit relative z-10">
      
      {/* Optional: Premium Header Area for the Card */}
      <div className="px-6 py-5 border-b border-violet-900/50 bg-violet-900/20">
        <h2 className="text-lg font-black text-white tracking-wide">
          My Account
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col p-3 gap-1">
        {links.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                isActive
                  ? "bg-violet-600 text-white shadow-md shadow-violet-900/20 font-bold"
                  : "text-violet-300 hover:bg-violet-900/50 hover:text-white font-medium"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon 
                  strokeWidth={isActive ? 2.5 : 2} 
                  className={`w-5 h-5 ${isActive ? "text-white" : "text-violet-400/70 group-hover:text-violet-300"}`} 
                />
                <span>{label}</span>
              </div>
              
              {/* Active Indicator Arrow */}
              {isActive && (
                <ChevronRight className="w-4 h-4 text-violet-200" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Section */}
      <div className="p-3 mt-2 border-t border-violet-900/50 bg-violet-900/10">
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-violet-300 hover:bg-red-500/10 hover:text-red-400 transition-colors font-semibold group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>

    </aside>
  );
}