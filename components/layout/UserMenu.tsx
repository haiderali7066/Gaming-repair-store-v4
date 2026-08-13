"use client"

import { useState, useEffect } from "react"
import { Session } from "next-auth"
import Link from "next/link"
import { LogOut, User, ShoppingBag } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logoutAction } from "@/actions/auth"

interface UserMenuProps {
  session: Session
}

export function UserMenu({ session }: UserMenuProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const initials = session.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center gap-2 px-2 h-9 rounded-md hover:bg-accent transition-colors">
        <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center">
          {initials}
        </div>
        {mounted && <span className="hidden sm:inline text-sm">{session.user?.name?.split(" ")[0]}</span>}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {/* User Info */}
        <div className="px-2 py-1.5">
          <p className="text-xs font-medium text-muted-foreground">Signed in as</p>
          <p className="text-sm font-semibold truncate">{session.user?.email}</p>
        </div>
        <DropdownMenuSeparator />

        {/* Links */}
        <DropdownMenuItem render={<Link href="/account/profile" className="gap-2 cursor-pointer" />}>
          <User className="h-4 w-4" />
          <span>My Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/account/orders" className="gap-2 cursor-pointer" />}>
          <ShoppingBag className="h-4 w-4" />
          <span>My Orders</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {/* Sign Out — submitted via a real form so Next.js can handle the
            redirect() thrown by signOut() natively. A bare onClick handler
            that calls the server action directly leaves that redirect as an
            unhandled promise rejection. */}
        <form action={logoutAction} id="logout-form" className="hidden" />
        <DropdownMenuItem
          nativeButton
          render={
            <button
              type="submit"
              form="logout-form"
              className="gap-2 text-destructive focus:text-destructive cursor-pointer"
            />
          }
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
