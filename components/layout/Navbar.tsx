import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  ChevronDown,
  Gamepad2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Wrench,
  Laptop,
  Monitor,
  Tablet,
  Cpu,
  Headphones,
  ArrowUpRight,
  Menu,
  X,
  BookOpen,
} from "lucide-react"

import { auth } from "@/auth"
import { UserMenu } from "./UserMenu"
import { CartButton } from "./CartButton"
import { AuthButtons } from "./AuthButtons"
import { getFeaturedProducts } from "@/lib/data"
import { formatCurrency } from "@/lib/helpers"
import type { ProductType } from "@/types/product"

// Helper function to generate valid HTML IDs from text
const toId = (text: string) => text.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")

// ----------------------------------------------------------------------
// DATA STRUCTURES
// ----------------------------------------------------------------------
const homeMenu = {
  featuredImage: "/logo.jpeg",
  sections: [
    "Our Services Overview",
    "Why Choose Us",
    "Popular Repairs",
    "How It Works",
    "Brands We Service",
    "Customer Reviews",
  ],
}

const aboutMenu = {
  featuredImage: "/logo.jpeg",
  sections: [
    "Our Story",
    "Mission & Vision",
    "Why Choose Us",
    "Our Values",
    "Meet Our Team",
    "Our Achievements",
  ],
}

const serviceCategories = [
  {
    title: "LAPTOP REPAIR",
    id: "laptop-repair",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvvPgNjVLWTQJoiHOZxMuvAXk4ehvNIe9zKhdDMfrWGA&s=10",
    icon: Laptop,
    items: [
      "Screen Replacement",
      "Keyboard Replacement",
      "Battery Replacement",
      "Motherboard Repair",
      "Overheating Issues",
      "Data Recovery",
    ],
  },
  {
    title: "PC REPAIR",
    id: "pc-repair",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYJqPOcgYHepw8l8DpSjIsdCiVzEdb5VUvgefY0lU21y3Mjn78A2VAaso&s=10",
    icon: Monitor,
    items: [
      "Hardware Repair",
      "Motherboard Repair",
      "Power Supply Repair",
      "Virus & Malware Removal",
      "PC Upgrades",
      "Custom PC Building",
    ],
  },
  {
    title: "IPAD REPAIR",
    id: "ipad-repair",
    image: "https://cdn.technobezz.com/deals-branded/03af608c2b72a849_branded.jpg",
    icon: Tablet,
    items: [
      "Screen Replacement",
      "Battery Replacement",
      "Charging Port Repair",
      "Water Damage Repair",
      "Software Issues",
    ],
  },
]

const shopMenuCategories = [
  {
    title: "Gaming PCs",
    icon: Cpu,
    items: ["Pre-built Systems", "Custom Workstations", "Entry Level PCs"],
  },
  {
    title: "Laptops",
    icon: Laptop,
    items: ["Gaming Laptops", "Business Laptops", "Creator Laptops"],
  },
  {
    title: "Accessories",
    icon: Headphones,
    items: ["Mechanical Keyboards", "Gaming Mice", "Headsets & Audio"],
  },
]

const standardLinks = [
  { label: "Trade In", href: "/buy-back" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export async function Navbar() {
  const session = await auth()

  // Fetch products from database
  const featuredProducts: ProductType[] = await getFeaturedProducts()
  const top6Products = featuredProducts?.slice(0, 6) || []

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      
      {/* ================================================================== */}
      {/* TOP UTILITY BAR                                                    */}
      {/* ================================================================== */}
      <div className="border-b border-purple-900/30 bg-[#08030f] text-purple-200/90">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-4 text-[11px] sm:px-6 sm:text-xs lg:px-8">
          <div className="flex min-w-0 items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <MapPin className="size-3.5 shrink-0 text-violet-400" />
              <span className="hidden sm:inline">Abu Dhabi & Dubai, UAE</span>
              <span className="sm:hidden">UAE</span>
            </div>
            <a href="tel:+971501234567" className="flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-white">
              <Phone className="size-3.5 shrink-0 text-violet-400" />
              <span className="hidden md:inline">+971 50 123 4567</span>
              <span className="md:hidden">Call us</span>
            </a>
            <a href="mailto:info@aldanagaming.ae" className="hidden items-center gap-1.5 whitespace-nowrap transition-colors hover:text-white lg:flex">
              <Mail className="size-3.5 shrink-0 text-violet-400" />
              info@aldanagaming.ae
            </a>
          </div>
          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <Link href="/account/orders" className="flex items-center gap-1.5 font-medium transition-colors hover:text-white">
              <Wrench className="size-3.5 text-violet-400" />
              <span className="hidden xs:inline">Track Repair</span>
              <span className="xs:hidden">Track</span>
            </Link>
            <span className="hidden text-purple-800 sm:inline">/</span>
            <Link href="/contact" className="hidden font-medium transition-colors hover:text-white sm:inline">Support</Link>
            <div className="hidden items-center gap-1.5 border-l border-purple-800/60 pl-3 font-medium text-purple-300/80 lg:flex">
              <ShieldCheck className="size-3.5 text-violet-400" />
              Secure Shopping
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* FLOATING MAIN NAVIGATION BAR                                      */}
      {/* ================================================================== */}
      <div className="mx-auto max-w-7xl px-3 py-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between rounded-2xl border border-slate-200/80 bg-white/90 px-3 shadow-lg shadow-purple-950/5 backdrop-blur-xl sm:px-6">
          
          {/* Brand / Logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-2.5 sm:gap-3">
            <div className="relative flex size-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-800 text-white shadow-md shadow-violet-600/20 sm:size-11">
              <Gamepad2 className="size-5 sm:size-6" />
              <Image 
                src="/logo.jpeg" 
                alt="Al Dana Gaming Logo" 
                fill 
                className="object-cover transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
            <div className="hidden min-[360px]:block">
              <div className="flex items-center leading-none">
                <span className="text-base font-black tracking-tight text-slate-900 sm:text-xl">
                  AL DANA
                </span>
                <span className="ml-1 text-base font-black tracking-tight text-violet-600 sm:ml-1.5 sm:text-xl">
                  GAMING
                </span>
              </div>
              <div className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.18em] text-slate-400 sm:text-[9px] sm:tracking-[0.2em]">
                Repairs & Gaming Hub
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden h-full items-center gap-1 lg:flex">
            
            {/* 1. HOME Mega Menu */}
            <div className="group static flex h-full items-center">
              <Link href="/" className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold text-slate-700 transition-all hover:bg-violet-50 hover:text-violet-700">
                Home <ChevronDown className="h-4 w-4 opacity-60 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="absolute inset-x-0 top-[68px] z-50 h-[440px] overflow-hidden rounded-2xl border border-violet-900/20 bg-[#0a0412]/98 shadow-2xl backdrop-blur-2xl transition-all duration-300 opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                <div className="mx-auto flex h-full max-w-7xl items-center gap-10 px-8 py-8">
                  <div className="group/img relative h-[320px] w-1/3 overflow-hidden rounded-2xl border border-violet-900/40">
                    <Image src={homeMenu.featuredImage} alt="Home" fill className="object-cover transition-transform duration-700 group-hover/img:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0412] via-transparent to-transparent" />
                  </div>
                  <div className="grid w-2/3 grid-cols-2 gap-6">
                    {homeMenu.sections.map((item) => (
                      <Link key={item} href={`/#${toId(item)}`} className="group/link flex items-center gap-3 text-sm font-semibold text-purple-200/70 transition-colors hover:text-white">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-600/0 transition-colors group-hover/link:bg-violet-400" />
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. ABOUT Mega Menu */}
            <div className="group static flex h-full items-center">
              <Link href="/about" className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold text-slate-700 transition-all hover:bg-violet-50 hover:text-violet-700">
                About <ChevronDown className="h-4 w-4 opacity-60 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="absolute inset-x-0 top-[68px] z-50 h-[440px] overflow-hidden rounded-2xl border border-violet-900/20 bg-[#0a0412]/98 shadow-2xl backdrop-blur-2xl transition-all duration-300 opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                <div className="mx-auto flex h-full max-w-7xl items-center gap-10 px-8 py-8">
                  <div className="grid w-2/3 grid-cols-2 gap-6 pl-4">
                    {aboutMenu.sections.map((item) => (
                      <Link key={item} href={`/about#${toId(item)}`} className="group/link flex items-center gap-3 text-sm font-semibold text-purple-200/70 transition-colors hover:text-white">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-600/0 transition-colors group-hover/link:bg-violet-400" />
                        {item}
                      </Link>
                    ))}
                  </div>
                  <div className="group/img relative h-[320px] w-1/3 overflow-hidden rounded-2xl border border-violet-900/40">
                    <Image src={aboutMenu.featuredImage} alt="About Us" fill className="object-cover transition-transform duration-700 group-hover/img:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0412] via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. SERVICES Mega Menu */}
            <div className="group static flex h-full items-center">
              <Link href="/services" className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold text-slate-700 transition-all hover:bg-violet-50 hover:text-violet-700">
                Services <ChevronDown className="h-4 w-4 opacity-60 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="absolute inset-x-0 top-[68px] z-50 h-[460px] overflow-hidden rounded-2xl border border-violet-900/20 bg-[#0a0412]/98 shadow-2xl backdrop-blur-2xl transition-all duration-300 opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                <div className="mx-auto flex h-full max-w-7xl items-center px-8 py-8">
                  <div className="grid w-full grid-cols-3 gap-8">
                    {serviceCategories.map((category) => (
                      <div key={category.title} className="group/cat flex flex-col">
                        <div className="relative mb-4 h-36 w-full overflow-hidden rounded-2xl border border-violet-900/40">
                          <Image src={category.image} alt={category.title} fill className="object-cover transition-transform duration-500 group-hover/cat:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0412] via-[#0a0412]/60 to-transparent" />
                          <div className="absolute bottom-3 left-3 flex items-center gap-2">
                            <category.icon className="h-5 w-5 text-violet-400" />
                            <h3 className="text-sm font-bold tracking-wider text-white uppercase">
                              {category.title}
                            </h3>
                          </div>
                        </div>
                        <ul className="space-y-2.5 px-1">
                          {category.items.map((item) => (
                            <li key={item}>
                              <Link href={`/services#${category.id}`} className="group/link flex items-center gap-2 text-xs font-medium text-purple-200/70 transition-colors hover:text-violet-300">
                                <span className="h-1 w-1 rounded-full bg-violet-600/50 transition-colors group-hover/link:bg-violet-400" />
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 4. SHOP Mega Menu */}
            <div className="group static flex h-full items-center">
              <Link href="/shop" className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold text-slate-700 transition-all hover:bg-violet-50 hover:text-violet-700">
                Shop <ChevronDown className="h-4 w-4 opacity-60 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="absolute inset-x-0 top-[68px] z-50 h-[460px] overflow-hidden rounded-2xl border border-violet-900/20 bg-[#0a0412]/98 shadow-2xl backdrop-blur-2xl transition-all duration-300 opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                <div className="mx-auto flex h-full max-w-7xl items-center gap-10 px-8 py-8">
                  <div className="flex h-full w-3/5 flex-col justify-center">
                    <div className="mb-4 flex items-center justify-between pr-4">
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400">Featured Hardware</span>
                      <Link href="/shop" className="flex items-center gap-1 text-xs font-bold text-purple-300 transition-colors hover:text-white">
                        View Store <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </div>
                    
                    {top6Products.length > 0 ? (
                      <div className="grid grid-cols-3 gap-x-4 gap-y-6">
                        {top6Products.map((product) => {
                          const imgSource = product.images?.length ? product.images[0] : product.image || "/placeholder.svg"
                          
                          return (
                            <Link key={product._id} href={`/shop/${product.slug}`} className="group/prod flex flex-col items-center text-center">
                              <div className="relative mb-2 h-24 w-24 overflow-hidden rounded-full border-2 border-violet-900/30 shadow-md transition-all duration-300 group-hover/prod:border-violet-500 group-hover/prod:shadow-violet-500/20">
                                <Image 
                                  src={imgSource} 
                                  alt={product.name} 
                                  fill 
                                  className="object-cover transition-transform duration-500 group-hover/prod:scale-110" 
                                />
                              </div>
                              <h4 className="w-full line-clamp-1 px-1 text-xs font-bold text-white transition-colors group-hover/prod:text-violet-300">
                                {product.name}
                              </h4>
                              <span className="mt-0.5 text-[11px] font-semibold text-purple-400">
                                {formatCurrency(product.price)}
                              </span>
                            </Link>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-purple-900/40 text-xs font-medium text-purple-300/50">
                        No featured products currently available.
                      </div>
                    )}
                  </div>
                  
                  <div className="flex h-full w-2/5 flex-col justify-center gap-6 border-l border-violet-900/30 pl-8">
                    {shopMenuCategories.map((cat) => (
                      <div key={cat.title}>
                        <Link href="/shop" className="group/cathead mb-2 flex items-center gap-2">
                          <cat.icon className="h-4 w-4 text-violet-400 transition-colors group-hover/cathead:text-violet-300" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-white transition-colors group-hover/cathead:text-violet-300">
                            {cat.title}
                          </h4>
                        </Link>
                        <ul className="space-y-1.5 pl-6">
                          {cat.items.map((item) => (
                            <li key={item}>
                              <Link href="/shop" className="text-xs font-medium text-purple-200/60 transition-colors hover:text-white">
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>

            {/* Standard Navigation Links */}
            {standardLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="rounded-xl px-3 py-2 text-sm font-bold text-slate-700 transition-all hover:bg-violet-50 hover:text-violet-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions & Visible Mobile/Desktop Book Button */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <div className="rounded-full p-0.5 transition-colors hover:bg-slate-100 sm:p-1">
              <CartButton />
            </div>

            {session ? (
              <UserMenu session={session} />
            ) : (
              <AuthButtons />
            )}

            {/* MAIN CTA BUTTON: Prominently aligned in header for BOTH Mobile & Desktop */}
            <Link
              href="/repair"
              className="group flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 px-3 py-2 text-xs font-bold text-white shadow-md shadow-violet-600/20 transition-all hover:shadow-lg hover:shadow-violet-600/30 active:scale-95 sm:px-4 sm:py-2.5"
            >
              <Wrench className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="whitespace-nowrap">Book Repair</span>
              <ArrowRight className="hidden h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 sm:inline" />
            </Link>

            {/* MOBILE MENU TOGGLE */}
            <div className="flex items-center lg:hidden">
              <input type="checkbox" id="mobile-menu-toggle" className="peer hidden" />
              
              <label 
                htmlFor="mobile-menu-toggle" 
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-slate-100 text-slate-800 transition-colors hover:bg-violet-100 hover:text-violet-700"
                aria-label="Toggle navigation menu"
              >
                <Menu className="h-5 w-5" />
              </label>

              <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm opacity-0 invisible transition-all duration-300 peer-checked:opacity-100 peer-checked:visible">
                <label htmlFor="mobile-menu-toggle" className="absolute inset-0 cursor-pointer"></label>
              </div>

              {/* Sliding Mobile Sidebar */}
              <div className="fixed top-0 right-0 z-[101] flex h-[100dvh] w-[88vw] max-w-sm translate-x-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out peer-checked:translate-x-0">
                
                {/* Mobile Drawer Header */}
                <div className="flex items-center justify-between border-b border-slate-100 p-4 bg-slate-50/50">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600 text-white shadow-md shadow-violet-600/20">
                      <Gamepad2 className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-black tracking-tight text-slate-900">
                      AL DANA <span className="text-violet-600">GAMING</span>
                    </span>
                  </div>
                  <label htmlFor="mobile-menu-toggle" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-200/60 text-slate-600 transition-colors hover:bg-slate-200">
                    <X className="h-4 w-4" />
                  </label>
                </div>

                {/* Mobile Drawer Content & Links */}
                <nav className="flex-1 overflow-y-auto p-5 space-y-4">
                  
                  {/* Top Mobile Quick CTA inside Drawer */}
                  <Link 
                    href="/repair" 
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 py-3 text-sm font-bold text-white shadow-md shadow-violet-600/20 active:scale-95 transition-transform"
                  >
                    <Wrench className="h-4 w-4" />
                    <span>Book a Repair</span>
                  </Link>

                  <div className="pt-2 border-t border-slate-100 space-y-3.5">
                    <Link href="/" className="block text-base font-bold text-slate-800 hover:text-violet-600 transition-colors">
                      Home
                    </Link>

                    <Link href="/about" className="block text-base font-bold text-slate-800 hover:text-violet-600 transition-colors">
                      About
                    </Link>
                    
                    {/* Services Accordion */}
                    <details className="group">
                      <summary className="flex cursor-pointer items-center justify-between text-base font-bold text-slate-800 list-none [&::-webkit-details-marker]:hidden hover:text-violet-600 transition-colors">
                        Services
                        <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open:-rotate-180" />
                      </summary>
                      <div className="mt-3 pl-3 space-y-4 border-l-2 border-violet-100">
                        {serviceCategories.map((cat) => (
                          <div key={cat.title}>
                            <p className="mb-1.5 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-violet-600">
                              <cat.icon className="h-3.5 w-3.5" /> {cat.title}
                            </p>
                            <ul className="space-y-2 pl-5 text-sm font-medium text-slate-600">
                              {cat.items.map((item) => (
                                <li key={item}>
                                  <Link href={`/services#${cat.id}`} className="block hover:text-violet-600 transition-colors">
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </details>

                    {/* Shop Accordion */}
                    <details className="group">
                      <summary className="flex cursor-pointer items-center justify-between text-base font-bold text-slate-800 list-none [&::-webkit-details-marker]:hidden hover:text-violet-600 transition-colors">
                        Shop
                        <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open:-rotate-180" />
                      </summary>
                      <div className="mt-3 pl-3 space-y-4 border-l-2 border-violet-100">
                        {shopMenuCategories.map((cat) => (
                          <div key={cat.title}>
                            <p className="mb-1.5 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-violet-600">
                              <cat.icon className="h-3.5 w-3.5" /> {cat.title}
                            </p>
                            <ul className="space-y-2 pl-5 text-sm font-medium text-slate-600">
                              {cat.items.map((item) => (
                                <li key={item}>
                                  <Link href="/shop" className="block hover:text-violet-600 transition-colors">
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </details>

                    <Link href="/buy-back" className="block text-base font-bold text-slate-800 hover:text-violet-600 transition-colors">
                      Trade In
                    </Link>

                    <Link href="/blog" className="flex items-center justify-between text-base font-bold text-slate-800 hover:text-violet-600 transition-colors">
                      <span className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-violet-600" /> Blog
                      </span>
                      <span className="rounded-md bg-violet-100 px-2 py-0.5 text-[10px] font-extrabold uppercase text-violet-700">New</span>
                    </Link>

                    <Link href="/contact" className="block text-base font-bold text-slate-800 hover:text-violet-600 transition-colors">
                      Contact
                    </Link>
                  </div>

                </nav>

              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  )
}