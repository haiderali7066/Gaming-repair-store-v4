"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AuthButtons() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex items-center gap-2">
      {mounted && (
        <Button
          variant="ghost"
          size="sm"
          render={<Link href="/auth/login" />}
          className="hidden sm:flex"
        >
          Sign In
        </Button>
      )}
      <Button size="sm" render={<Link href="/auth/register" />}>
        Sign Up
      </Button>
    </div>
  )
}
