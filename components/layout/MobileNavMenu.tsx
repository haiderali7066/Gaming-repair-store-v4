"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface MobileNavMenuProps {
  links: [string, string][]
  isAuthenticated: boolean
}

export function MobileNavMenu({ links, isAuthenticated }: MobileNavMenuProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Sheet>
      <SheetTrigger className="inline-flex items-center justify-center rounded-md hover:bg-accent transition-colors h-10 w-10 lg:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open navigation</span>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Al Dana Gaming</SheetTitle>
          <SheetDescription>Shop, repair, and trade in.</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-1 mt-6">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="block px-3 py-2 text-sm rounded hover:bg-muted transition-colors"
            >
              {label}
            </Link>
          ))}
          {!isAuthenticated && (
            <>
              <div className="h-px bg-border my-2" />
              <Link
                href="/auth/login"
                className="block px-3 py-2 text-sm rounded border border-border hover:bg-muted transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="block px-3 py-2 text-sm rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
