"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Gamepad2 } from "lucide-react"

interface MobileNavMenuProps {
  links: [string, string][]
  isAuthenticated: boolean
}

export function MobileNavMenu({ links, isAuthenticated }: MobileNavMenuProps) {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent body scroll when mobile menu is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!mounted) return null

  return (
    <>
      {/* Menu Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-colors lg:hidden"
        aria-label="Open navigation menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Backdrop Overlay (Dark theme overlay to match mega menus) */}
      <div
        className={`fixed inset-0 z-[100] bg-[#0a0412]/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sliding Side Panel (Strict Light Theme) */}
      <div
        className={`fixed top-0 right-0 z-[110] flex h-full w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-800 text-white shadow-md">
              <Gamepad2 className="h-5 w-5" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-black tracking-tight text-slate-900">
                AL DANA <span className="text-violet-600">GAMING</span>
              </span>
              <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Menu
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar">
          <nav className="flex flex-col gap-2">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-bold text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-all duration-200"
              >
                {label}
                <div className="h-1.5 w-1.5 rounded-full bg-violet-600/0 transition-colors group-hover:bg-violet-500" />
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          {!isAuthenticated && (
            <div className="mt-8 flex flex-col gap-3 pt-8 border-t border-slate-100">
              <Link
                href="/auth/login"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center rounded-xl border-2 border-slate-100 px-4 py-3.5 text-sm font-bold text-slate-700 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 transition-all duration-200"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-violet-600/20 hover:shadow-lg hover:shadow-violet-600/30 transition-all duration-200"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}