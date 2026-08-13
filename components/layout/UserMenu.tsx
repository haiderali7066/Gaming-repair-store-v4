"use client";

import { useState, useEffect, useRef } from "react";
import { Session } from "next-auth";
import Link from "next/link";
import { LogOut, User, ShoppingBag, ChevronDown } from "lucide-react";
import { logoutAction } from "@/actions/auth";
import { motion, AnimatePresence } from "framer-motion";

interface UserMenuProps {
  session: Session;
}

export function UserMenu({ session }: UserMenuProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close the custom dropdown
  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials =
    session.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  const firstName = session.user?.name?.split(" ")[0] || "";

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2.5 p-1 pr-3 rounded-full hover:bg-slate-100 transition-all duration-300 border border-transparent hover:border-slate-200 focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center shadow-sm">
          {initials}
        </div>
        {mounted && (
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-sm font-semibold text-slate-800">
              {firstName}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden z-50 origin-top-right"
          >
            {/* User Info Header */}
            <div className="px-4 py-3 bg-slate-50/50 border-b border-slate-100">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-0.5">
                Signed in as
              </p>
              <p className="text-sm font-semibold text-slate-900 truncate">
                {session.user?.email}
              </p>
            </div>

            {/* Navigation Links */}
            <div className="p-2 space-y-1">
              <Link
                href="/account"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-blue-50 transition-colors group"
              >
                <div className="bg-white border border-slate-100 p-1.5 rounded-lg group-hover:border-blue-200 group-hover:bg-blue-100 transition-colors">
                  <User className="h-4 w-4" />
                </div>
                My Profile
              </Link>
              <Link
                href="/account/orders"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-blue-50 transition-colors group"
              >
                <div className="bg-white border border-slate-100 p-1.5 rounded-lg group-hover:border-blue-200 group-hover:bg-blue-100 transition-colors">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                My Orders
              </Link>
            </div>

            <div className="h-px bg-slate-100 w-full" />

            {/* Sign Out Action */}
            <div className="p-2">
              <form action={logoutAction} id="logout-form">
                <button
                  type="submit"
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors group"
                >
                  <div className="bg-white border border-slate-100 p-1.5 rounded-lg group-hover:border-red-200 group-hover:bg-red-100 transition-colors">
                    <LogOut className="h-4 w-4" />
                  </div>
                  Sign Out
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}