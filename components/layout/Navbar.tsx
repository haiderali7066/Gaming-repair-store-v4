import Link from "next/link"
import {
  ArrowRight,
  Gamepad2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react"

import { auth } from "@/auth"
import { UserMenu } from "./UserMenu"
import { CartButton } from "./CartButton"
import { AuthButtons } from "./AuthButtons"
import { MobileNavMenu } from "./MobileNavMenu"

const links = [
  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Repairs",
    href: "/repair",
  },
  {
    label: "Trade In",
    href: "/buy-back",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
]

export async function Navbar() {
  const session = await auth()

  return (
    <div className="w-full">
      {/* ================================================================== */}
      {/* TOP UTILITY BAR                                                     */}
      {/* ================================================================== */}
      <div className="border-b border-purple-900/40 bg-[#10061f] text-purple-100">
        <div className="mx-auto flex min-h-9 max-w-7xl items-center justify-between gap-4 px-4 text-[11px] sm:px-6 sm:text-xs lg:px-8">
          {/* Left information */}
          <div className="flex min-w-0 items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <MapPin className="size-3.5 shrink-0 text-purple-400" />

              <span className="hidden sm:inline">
                Abu Dhabi & Dubai, UAE
              </span>

              <span className="sm:hidden">
                UAE
              </span>
            </div>

            <a
              href="tel:+971501234567"
              className="flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-white"
            >
              <Phone className="size-3.5 shrink-0 text-purple-400" />
              <span className="hidden md:inline">
                +971 50 123 4567
              </span>
              <span className="md:hidden">
                Call us
              </span>
            </a>

            <a
              href="mailto:info@aldanagaming.ae"
              className="hidden items-center gap-1.5 whitespace-nowrap transition-colors hover:text-white lg:flex"
            >
              <Mail className="size-3.5 shrink-0 text-purple-400" />
              info@aldanagaming.ae
            </a>
          </div>

          {/* Right utility actions */}
          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <Link
              href="/account/orders"
              className="flex items-center gap-1.5 font-medium transition-colors hover:text-white"
            >
              <Wrench className="size-3.5" />
              <span className="hidden xs:inline">
                Track Repair
              </span>
              <span className="xs:hidden">
                Track
              </span>
            </Link>

            <span className="hidden text-purple-800 sm:inline">
              /
            </span>

            <Link
              href="/contact"
              className="hidden font-medium transition-colors hover:text-white sm:inline"
            >
              Support
            </Link>

            <div className="hidden items-center gap-1.5 border-l border-purple-800/60 pl-3 font-medium text-purple-300 lg:flex">
              <ShieldCheck className="size-3.5" />
              Secure Shopping
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* MAIN NAVIGATION                                                      */}
      {/* ================================================================== */}
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3"
          >
            <div className="relative">
              <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 text-white shadow-lg shadow-purple-600/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-purple-600/30">
                <Gamepad2 className="size-6" />
              </div>

              {/* Brand glow */}
              <div className="absolute -inset-1 -z-10 rounded-2xl bg-purple-500/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <div className="hidden min-[430px]:block">
              <div className="flex items-center leading-none">
                <span className="text-lg font-black tracking-tight text-foreground sm:text-xl">
                  AL DANA
                </span>

                <span className="ml-1.5 text-lg font-black tracking-tight text-purple-600 sm:text-xl">
                  GAMING
                </span>
              </div>

              <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Repairs & Gaming Hub
              </div>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="
                  relative rounded-lg px-3 py-2
                  text-sm font-medium text-muted-foreground
                  transition-all duration-200
                  hover:bg-muted/70
                  hover:text-foreground
                "
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Cart */}
            <div className="rounded-lg transition-colors hover:bg-muted/70">
              <CartButton />
            </div>

            {/* Auth */}
            {session ? (
              <div className="ml-0.5">
                <UserMenu session={session} />
              </div>
            ) : (
              <div className="ml-0.5">
                <AuthButtons />
              </div>
            )}

            {/* Desktop CTA */}
            <Link
              href="/repair"
              className="
                group ml-1 hidden items-center gap-2
                rounded-xl bg-gradient-to-r from-purple-600 to-violet-600
                px-4 py-2.5
                text-sm font-semibold text-white
                shadow-md shadow-purple-600/20
                transition-all duration-200
                hover:-translate-y-0.5
                hover:from-purple-700
                hover:to-violet-700
                hover:shadow-lg hover:shadow-purple-600/25
                active:translate-y-0
                sm:inline-flex
              "
            >
              <Wrench className="size-4" />

              <span>
                Book a Repair
              </span>

              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>

            {/* Mobile menu */}
            <div className="ml-1 lg:hidden">
              <MobileNavMenu
                links={links.map(({ label, href }) => [
                  label,
                  href,
                ])}
                isAuthenticated={!!session}
              />
            </div>
          </div>
        </div>

        {/* Mobile brand strip */}
        <div className="border-t border-border/60 bg-muted/20 px-4 py-2 min-[430px]:hidden">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <Gamepad2 className="size-3.5 text-purple-600" />
            Al Dana Gaming · UAE
          </div>
        </div>
      </header>
    </div>
  )
}