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
} from "lucide-react"

import { auth } from "@/auth"
import { UserMenu } from "./UserMenu"
import { CartButton } from "./CartButton"
import { AuthButtons } from "./AuthButtons"
import { MobileNavMenu } from "./MobileNavMenu"
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
  ]
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
  ]
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
    items: ["Pre-built Systems", "Custom Workstations", "Entry Level PCs"]
  },
  {
    title: "Laptops",
    icon: Laptop,
    items: ["Gaming Laptops", "Business Laptops", "Creator Laptops"]
  },
  {
    title: "Accessories",
    icon: Headphones,
    items: ["Mechanical Keyboards", "Gaming Mice", "Headsets & Audio"]
  }
]

const standardLinks = [
  { label: "Trade In", href: "/buy-back" },
  { label: "Contact", href: "/contact" },
]

export async function Navbar() {
  const session = await auth()
  
  // Fetch products from database
  const featuredProducts: ProductType[] = await getFeaturedProducts()
  const top6Products = featuredProducts?.slice(0, 6) || []

  return (
    // Fixed wrapper for the entire header (Top utility bar + Main Navbar)
    <header className="fixed top-0 left-0 right-0 z-50 w-full flex flex-col shadow-sm">
      
      {/* ================================================================== */}
      {/* TOP UTILITY BAR (Dark Theme)                                       */}
      {/* ================================================================== */}
      <div className="border-b border-purple-900/40 bg-[#0a0412] text-purple-100 relative z-[60]">
        <div className="mx-auto flex min-h-9 max-w-7xl items-center justify-between gap-4 px-4 text-[11px] sm:px-6 sm:text-xs lg:px-8">
          <div className="flex min-w-0 items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <MapPin className="size-3.5 shrink-0 text-violet-500" />
              <span className="hidden sm:inline">Abu Dhabi & Dubai, UAE</span>
              <span className="sm:hidden">UAE</span>
            </div>
            <a href="tel:+971501234567" className="flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-white">
              <Phone className="size-3.5 shrink-0 text-violet-500" />
              <span className="hidden md:inline">+971 50 123 4567</span>
              <span className="md:hidden">Call us</span>
            </a>
            <a href="mailto:info@aldanagaming.ae" className="hidden items-center gap-1.5 whitespace-nowrap transition-colors hover:text-white lg:flex">
              <Mail className="size-3.5 shrink-0 text-violet-500" />
              info@aldanagaming.ae
            </a>
          </div>
          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <Link href="/account/orders" className="flex items-center gap-1.5 font-medium transition-colors hover:text-white">
              <Wrench className="size-3.5 text-violet-500" />
              <span className="hidden xs:inline">Track Repair</span>
              <span className="xs:hidden">Track</span>
            </Link>
            <span className="hidden text-purple-800 sm:inline">/</span>
            <Link href="/contact" className="hidden font-medium transition-colors hover:text-white sm:inline">Support</Link>
            <div className="hidden items-center gap-1.5 border-l border-purple-800/60 pl-3 font-medium text-purple-300 lg:flex">
              <ShieldCheck className="size-3.5 text-violet-500" />
              Secure Shopping
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* MAIN NAVIGATION (Strict Light Theme)                               */}
      {/* ================================================================== */}
      <div className="bg-white/95 backdrop-blur-xl relative">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          
          {/* Brand / Logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-3">
            <div className="relative flex items-center justify-center size-12 overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-800 text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-105 z-0">
                <Gamepad2 className="size-6" />
              </div>
              <Image 
                src="/logo.jpeg" 
                alt="Al Dana Gaming Logo" 
                fill 
                className="object-cover z-10 transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
            <div className="hidden min-[430px]:block">
              <div className="flex items-center leading-none">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  AL DANA
                </span>
                <span className="ml-1.5 text-xl font-black tracking-tight text-violet-600">
                  GAMING
                </span>
              </div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Repairs & Gaming Hub
              </div>
            </div>
          </Link>

          {/* Desktop navigation - INCREASED FONT SIZES */}
          <nav className="hidden h-full items-center gap-2 lg:flex">
            
            {/* 1. HOME (Dark Mega Menu) */}
            <div className="group flex h-full items-center position-static">
              <Link href="/" className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-base font-bold text-slate-800 transition-all duration-200 hover:bg-violet-50 hover:text-violet-700">
                Home <ChevronDown className="w-4 h-4 opacity-60 group-hover:rotate-180 transition-transform" />
              </Link>
              <div className="absolute left-0 top-[72px] w-full h-[480px] bg-[#0a0412]/98 backdrop-blur-2xl border-t-2 border-violet-600/50 shadow-2xl opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden">
                <div className="mx-auto max-w-7xl px-8 py-10 h-full flex gap-12 items-center">
                  <div className="w-1/3 relative rounded-2xl overflow-hidden h-[360px] border border-violet-900/30 group/img">
                    <div className="absolute inset-0 bg-violet-900/20 z-10 mix-blend-overlay transition-opacity group-hover/img:opacity-0" />
                    <Image src={homeMenu.featuredImage} alt="Home" fill className="object-cover transition-transform duration-700 group-hover/img:scale-105" />
                  </div>
                  <div className="w-2/3 grid grid-cols-2 gap-x-8 gap-y-8 content-center">
                    {homeMenu.sections.map((item) => (
                      <Link key={item} href={`/#${toId(item)}`} className="text-base font-medium text-purple-200/70 hover:text-white transition-colors flex items-center gap-3 group/link">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-600/0 group-hover/link:bg-violet-500 transition-colors" />
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. ABOUT (Dark Mega Menu) */}
            <div className="group flex h-full items-center position-static">
              <Link href="/about" className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-base font-bold text-slate-800 transition-all duration-200 hover:bg-violet-50 hover:text-violet-700">
                About <ChevronDown className="w-4 h-4 opacity-60 group-hover:rotate-180 transition-transform" />
              </Link>
              <div className="absolute left-0 top-[72px] w-full h-[480px] bg-[#0a0412]/98 backdrop-blur-2xl border-t-2 border-violet-600/50 shadow-2xl opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden">
                <div className="mx-auto max-w-7xl px-8 py-10 h-full flex gap-12 items-center">
                  <div className="w-2/3 grid grid-cols-2 gap-x-8 gap-y-8 content-center pl-4">
                    {aboutMenu.sections.map((item) => (
                      <Link key={item} href={`/about#${toId(item)}`} className="text-base font-medium text-purple-200/70 hover:text-white transition-colors flex items-center gap-3 group/link">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-600/0 group-hover/link:bg-violet-500 transition-colors" />
                        {item}
                      </Link>
                    ))}
                  </div>
                  <div className="w-1/3 relative rounded-2xl overflow-hidden h-[360px] border border-violet-900/30 group/img">
                    <div className="absolute inset-0 bg-violet-900/20 z-10 mix-blend-overlay transition-opacity group-hover/img:opacity-0" />
                    <Image src={aboutMenu.featuredImage} alt="About Us" fill className="object-cover transition-transform duration-700 group-hover/img:scale-105" />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. SERVICES (Dark Mega Menu) */}
            <div className="group flex h-full items-center position-static">
              <Link href="/services" className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-base font-bold text-slate-800 transition-all duration-200 hover:bg-violet-50 hover:text-violet-700">
                Services <ChevronDown className="w-4 h-4 opacity-60 group-hover:rotate-180 transition-transform" />
              </Link>
              <div className="absolute left-0 top-[72px] w-full h-[480px] bg-[#0a0412]/98 backdrop-blur-2xl border-t-2 border-violet-600/50 shadow-2xl opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden">
                <div className="mx-auto max-w-7xl px-8 py-10 h-full flex items-center">
                  <div className="grid grid-cols-3 gap-12 w-full">
                    {serviceCategories.map((category) => (
                      <div key={category.title} className="flex flex-col group/cat">
                        <div className="relative w-full h-40 rounded-2xl overflow-hidden mb-6 border border-violet-900/40">
                          <Image src={category.image} alt={category.title} fill className="object-cover transition-transform duration-500 group-hover/cat:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0412] via-[#0a0412]/50 to-transparent opacity-90" />
                          <div className="absolute bottom-4 left-4 flex items-center gap-2">
                            <category.icon className="w-6 h-6 text-violet-400" />
                            <h3 className="text-base font-bold tracking-widest text-white uppercase shadow-sm">
                              {category.title}
                            </h3>
                          </div>
                        </div>
                        <ul className="space-y-3.5 px-2">
                          {category.items.map((item) => (
                            <li key={item}>
                              <Link href={`/services#${category.id}`} className="text-[14px] font-medium text-purple-200/70 hover:text-violet-300 transition-colors flex items-center gap-3 group/link">
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-700/50 group-hover/link:bg-violet-400 transition-colors" />
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

            {/* 4. SHOP (Dynamic Data Mega Menu) */}
            <div className="group flex h-full items-center position-static">
              <Link href="/shop" className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-base font-bold text-slate-800 transition-all duration-200 hover:bg-violet-50 hover:text-violet-700">
                Shop <ChevronDown className="w-4 h-4 opacity-60 group-hover:rotate-180 transition-transform" />
              </Link>
              <div className="absolute left-0 top-[72px] w-full h-[480px] bg-[#0a0412]/98 backdrop-blur-2xl border-t-2 border-violet-600/50 shadow-2xl opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden">
                <div className="mx-auto max-w-7xl px-8 py-10 h-full flex items-center gap-12">
                  
                  {/* Left: 6 Circular Featured Products from Database */}
                  <div className="w-3/5 flex flex-col h-full justify-center">
                    <div className="flex items-center justify-between mb-6 pr-4">
                      <span className="text-xs font-bold tracking-[0.2em] uppercase text-violet-500">Premium Selection</span>
                      <Link href="/shop" className="text-xs font-bold text-purple-300 hover:text-white flex items-center gap-1 transition-colors">
                        View All <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>
                    
                    {top6Products.length > 0 ? (
                      <div className="grid grid-cols-3 gap-x-6 gap-y-8">
                        {top6Products.map((product) => {
                          const imgSource = product.images?.length ? product.images[0] : product.image || "/placeholder.svg"
                          
                          return (
                            <Link key={product._id} href={`/shop/${product.slug}`} className="flex flex-col items-center group/prod text-center">
                              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-violet-900/30 shadow-lg mb-3 transition-all duration-500 group-hover/prod:border-violet-500 group-hover/prod:shadow-[0_0_25px_rgba(139,92,246,0.3)]">
                                <Image 
                                  src={imgSource} 
                                  alt={product.name} 
                                  fill 
                                  className="object-cover transition-transform duration-700 group-hover/prod:scale-110" 
                                />
                              </div>
                              <h4 className="text-sm font-bold text-white line-clamp-1 group-hover/prod:text-violet-300 transition-colors w-full px-2">
                                {product.name}
                              </h4>
                              <span className="text-xs font-semibold text-purple-400 mt-1">
                                {formatCurrency(product.price)}
                              </span>
                            </Link>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-purple-300/50 text-sm font-medium border border-dashed border-purple-900/40 rounded-2xl">
                        No featured products currently available.
                      </div>
                    )}
                  </div>
                  
                  {/* Right: Text Categories */}
                  <div className="w-2/5 border-l border-violet-900/30 pl-12 h-full flex flex-col justify-center gap-8">
                    {shopMenuCategories.map((cat) => (
                      <div key={cat.title}>
                        <Link href="/shop" className="flex items-center gap-2.5 mb-3 group/cathead">
                          <cat.icon className="w-5 h-5 text-violet-500 group-hover/cathead:text-violet-400 transition-colors" />
                          <h4 className="text-base font-bold tracking-wider text-white uppercase group-hover/cathead:text-violet-300 transition-colors">
                            {cat.title}
                          </h4>
                        </Link>
                        <ul className="space-y-2.5 pl-7">
                          {cat.items.map((item) => (
                            <li key={item}>
                              <Link href="/shop" className="text-[14px] font-medium text-purple-200/60 hover:text-white transition-colors block">
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

            {/* 5. OTHER STANDARD LINKS */}
            {standardLinks.map((link) => (
              <Link key={link.href} href={link.href} className="relative rounded-lg px-3 py-2 text-base font-bold text-slate-800 transition-all duration-200 hover:bg-violet-50 hover:text-violet-700">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="rounded-full transition-colors hover:bg-slate-100 p-1">
              <CartButton />
            </div>

            {session ? (
              <UserMenu session={session} />
            ) : (
              <AuthButtons />
            )}

            {/* Desktop CTA */}
            <Link
              href="/repair"
              className="group ml-2 hidden items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-700 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-violet-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-600/30 active:translate-y-0 sm:inline-flex"
            >
              <Wrench className="size-4" />
              <span>Book Repair</span>
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Mobile menu */}
            <div className="ml-1 lg:hidden">
              <MobileNavMenu
                links={[
                  { label: "Home", href: "/" },
                  { label: "About", href: "/about" },
                  { label: "Services", href: "/services" },
                  { label: "Shop", href: "/shop" },
                  ...standardLinks
                ].map(({ label, href }) => [label, href])}
                isAuthenticated={!!session}
              />
            </div>
          </div>
        </div>

        {/* Mobile brand strip */}
        <div className="border-t border-slate-100 bg-slate-50/80 px-4 py-2 min-[430px]:hidden">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
            <Gamepad2 className="size-3.5 text-violet-600" />
            Al Dana Gaming · UAE
          </div>
        </div>
      </div>
    </header>
  )
}