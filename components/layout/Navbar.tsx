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
  Newspaper,
  Sparkles,
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
  { label: "Blog", href: "/blog" },
  { label: "Trade In", href: "/buy-back" },
  { label: "Contact", href: "/contact" },
]

export async function Navbar() {
  const session = await auth()
  
  // Fetch products from database
  const featuredProducts: ProductType[] = await getFeaturedProducts()
  const top6Products = featuredProducts?.slice(0, 6) || []

  return (
    // Sticky wrapper takes space in flow on initial load (no page mt/pt hacks needed)
    <header className="sticky top-0 z-50 w-full flex flex-col shadow-lg shadow-violet-950/5 transition-all duration-300">
      
      {/* ================================================================== */}
      {/* TOP UTILITY BAR (Dark Theme)                                       */}
      {/* ================================================================== */}
      <div className="border-b border-purple-900/40 bg-[#07030e] text-purple-200/90 relative z-[60]">
        <div className="mx-auto flex min-h-9 max-w-7xl items-center justify-between gap-4 px-4 text-[11px] sm:px-6 sm:text-xs lg:px-8">
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
            <span className="hidden text-purple-800/80 sm:inline">/</span>
            <Link href="/contact" className="hidden font-medium transition-colors hover:text-white sm:inline">Support</Link>
            <div className="hidden items-center gap-1.5 border-l border-purple-800/60 pl-3 font-medium text-purple-300 lg:flex">
              <ShieldCheck className="size-3.5 text-violet-400" />
              Secure Shopping
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* MAIN NAVIGATION (Floating Glass Light Bar)                         */}
      {/* ================================================================== */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-slate-200/80 relative transition-all duration-300">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          
          {/* Brand / Logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-3 focus:outline-none">
            <div className="relative flex items-center justify-center size-11 sm:size-12 overflow-hidden rounded-2xl shadow-md shadow-violet-600/10">
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
              <div className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.22em] text-slate-500">
                Repairs & Gaming Hub
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden h-full items-center gap-1.5 lg:flex">
            
            {/* 1. HOME (Dark Mega Menu) */}
            <div className="group flex h-full items-center position-static">
              <Link href="/" className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[15px] font-bold text-slate-800 transition-all duration-200 hover:bg-violet-50 hover:text-violet-700">
                Home <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-violet-600 group-hover:rotate-180 transition-transform duration-300" />
              </Link>
              <div className="absolute left-0 top-[72px] w-full h-[460px] bg-[#090414]/98 backdrop-blur-2xl border-t-2 border-violet-600/60 shadow-2xl shadow-violet-950/40 opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden">
                <div className="mx-auto max-w-7xl px-8 py-9 h-full flex gap-12 items-center">
                  <div className="w-1/3 relative rounded-2xl overflow-hidden h-[340px] border border-violet-900/40 group/img shadow-lg">
                    <div className="absolute inset-0 bg-violet-900/20 z-10 mix-blend-overlay transition-opacity group-hover/img:opacity-0" />
                    <Image src={homeMenu.featuredImage} alt="Home" fill className="object-cover transition-transform duration-700 group-hover/img:scale-105" />
                  </div>
                  <div className="w-2/3 grid grid-cols-2 gap-x-8 gap-y-7 content-center">
                    {homeMenu.sections.map((item) => (
                      <Link key={item} href={`/#${toId(item)}`} className="text-base font-medium text-purple-200/80 hover:text-white transition-colors flex items-center gap-3 group/link">
                        <span className="w-2 h-2 rounded-full bg-violet-600/30 group-hover/link:bg-violet-400 group-hover/link:scale-125 transition-all" />
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. ABOUT (Dark Mega Menu) */}
            <div className="group flex h-full items-center position-static">
              <Link href="/about" className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[15px] font-bold text-slate-800 transition-all duration-200 hover:bg-violet-50 hover:text-violet-700">
                About <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-violet-600 group-hover:rotate-180 transition-transform duration-300" />
              </Link>
              <div className="absolute left-0 top-[72px] w-full h-[460px] bg-[#090414]/98 backdrop-blur-2xl border-t-2 border-violet-600/60 shadow-2xl shadow-violet-950/40 opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden">
                <div className="mx-auto max-w-7xl px-8 py-9 h-full flex gap-12 items-center">
                  <div className="w-2/3 grid grid-cols-2 gap-x-8 gap-y-7 content-center pl-4">
                    {aboutMenu.sections.map((item) => (
                      <Link key={item} href={`/about#${toId(item)}`} className="text-base font-medium text-purple-200/80 hover:text-white transition-colors flex items-center gap-3 group/link">
                        <span className="w-2 h-2 rounded-full bg-violet-600/30 group-hover/link:bg-violet-400 group-hover/link:scale-125 transition-all" />
                        {item}
                      </Link>
                    ))}
                  </div>
                  <div className="w-1/3 relative rounded-2xl overflow-hidden h-[340px] border border-violet-900/40 group/img shadow-lg">
                    <div className="absolute inset-0 bg-violet-900/20 z-10 mix-blend-overlay transition-opacity group-hover/img:opacity-0" />
                    <Image src={aboutMenu.featuredImage} alt="About Us" fill className="object-cover transition-transform duration-700 group-hover/img:scale-105" />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. SERVICES (Dark Mega Menu) */}
            <div className="group flex h-full items-center position-static">
              <Link href="/services" className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[15px] font-bold text-slate-800 transition-all duration-200 hover:bg-violet-50 hover:text-violet-700">
                Services <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-violet-600 group-hover:rotate-180 transition-transform duration-300" />
              </Link>
              <div className="absolute left-0 top-[72px] w-full h-[470px] bg-[#090414]/98 backdrop-blur-2xl border-t-2 border-violet-600/60 shadow-2xl shadow-violet-950/40 opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden">
                <div className="mx-auto max-w-7xl px-8 py-9 h-full flex items-center">
                  <div className="grid grid-cols-3 gap-10 w-full">
                    {serviceCategories.map((category) => (
                      <div key={category.title} className="flex flex-col group/cat">
                        <div className="relative w-full h-36 rounded-2xl overflow-hidden mb-5 border border-violet-900/40 shadow-md">
                          <Image src={category.image} alt={category.title} fill className="object-cover transition-transform duration-500 group-hover/cat:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#090414] via-[#090414]/60 to-transparent opacity-90" />
                          <div className="absolute bottom-3.5 left-4 flex items-center gap-2">
                            <category.icon className="w-5 h-5 text-violet-400" />
                            <h3 className="text-sm font-bold tracking-wider text-white uppercase">
                              {category.title}
                            </h3>
                          </div>
                        </div>
                        <ul className="space-y-3 px-1">
                          {category.items.map((item) => (
                            <li key={item}>
                              <Link href={`/services#${category.id}`} className="text-[14px] font-medium text-purple-200/70 hover:text-violet-300 transition-colors flex items-center gap-2.5 group/link">
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-600/40 group-hover/link:bg-violet-400 transition-colors" />
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

            {/* 4. SHOP (Dynamic Dynamic Data Mega Menu) */}
            <div className="group flex h-full items-center position-static">
              <Link href="/shop" className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[15px] font-bold text-slate-800 transition-all duration-200 hover:bg-violet-50 hover:text-violet-700">
                Shop <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-violet-600 group-hover:rotate-180 transition-transform duration-300" />
              </Link>
              <div className="absolute left-0 top-[72px] w-full h-[470px] bg-[#090414]/98 backdrop-blur-2xl border-t-2 border-violet-600/60 shadow-2xl shadow-violet-950/40 opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden">
                <div className="mx-auto max-w-7xl px-8 py-9 h-full flex items-center gap-12">
                  
                  {/* Left: Featured Products Grid */}
                  <div className="w-3/5 flex flex-col h-full justify-center">
                    <div className="flex items-center justify-between mb-5 pr-4">
                      <span className="text-xs font-bold tracking-[0.2em] uppercase text-violet-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Premium Selection
                      </span>
                      <Link href="/shop" className="text-xs font-bold text-purple-300 hover:text-white flex items-center gap-1 transition-colors">
                        View All <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>
                    
                    {top6Products.length > 0 ? (
                      <div className="grid grid-cols-3 gap-x-6 gap-y-7">
                        {top6Products.map((product) => {
                          const imgSource = product.images?.length ? product.images[0] : product.image || "/placeholder.svg"
                          
                          return (
                            <Link key={product._id} href={`/shop/${product.slug}`} className="flex flex-col items-center group/prod text-center">
                              <div className="relative size-24 sm:size-28 rounded-full overflow-hidden border-2 border-violet-800/40 bg-purple-950/20 shadow-lg mb-2.5 transition-all duration-300 group-hover/prod:border-violet-400 group-hover/prod:shadow-[0_0_20px_rgba(139,92,246,0.35)]">
                                <Image 
                                  src={imgSource} 
                                  alt={product.name} 
                                  fill 
                                  className="object-cover transition-transform duration-500 group-hover/prod:scale-110" 
                                />
                              </div>
                              <h4 className="text-xs font-bold text-slate-100 line-clamp-1 group-hover/prod:text-violet-300 transition-colors w-full px-1">
                                {product.name}
                              </h4>
                              <span className="text-[11px] font-semibold text-purple-400 mt-0.5">
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
                  
                  {/* Right: Category Links */}
                  <div className="w-2/5 border-l border-violet-900/40 pl-10 h-full flex flex-col justify-center gap-7">
                    {shopMenuCategories.map((cat) => (
                      <div key={cat.title}>
                        <Link href="/shop" className="flex items-center gap-2 mb-2 group/cathead">
                          <cat.icon className="w-4 h-4 text-violet-400 group-hover/cathead:text-violet-300 transition-colors" />
                          <h4 className="text-xs font-extrabold tracking-wider text-white uppercase group-hover/cathead:text-violet-300 transition-colors">
                            {cat.title}
                          </h4>
                        </Link>
                        <ul className="space-y-2 pl-6">
                          {cat.items.map((item) => (
                            <li key={item}>
                              <Link href="/shop" className="text-[13px] font-medium text-purple-200/60 hover:text-white transition-colors block">
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

            {/* 5. STANDARD LINKS (Includes Blog, Trade In, Contact) */}
            {standardLinks.map((link) => (
              <Link key={link.href} href={link.href} className="relative rounded-xl px-3.5 py-2 text-[15px] font-bold text-slate-800 transition-all duration-200 hover:bg-violet-50 hover:text-violet-700">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Trigger Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-full transition-colors hover:bg-slate-100 p-1">
              <CartButton />
            </div>

            {session ? (
              <UserMenu session={session} />
            ) : (
              <AuthButtons />
            )}

            {/* Book Repair Desktop CTA */}
            <Link
              href="/repair"
              className="group ml-1 hidden items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-700 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-violet-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-600/30 active:translate-y-0 sm:inline-flex"
            >
              <Wrench className="size-4" />
              <span>Book Repair</span>
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* ================================================================== */}
            {/* CSS-ONLY MOBILE NAVIGATION DRAWER                                  */}
            {/* ================================================================== */}
            <div className="ml-1 lg:hidden flex items-center">
              {/* Checkbox Hack for Stateful Toggle Without Client Components */}
              <input type="checkbox" id="mobile-menu-toggle" className="peer hidden" />
              
              {/* Hamburger Button Trigger */}
              <label 
                htmlFor="mobile-menu-toggle" 
                className="relative z-50 p-2 flex items-center justify-center rounded-xl bg-slate-100 text-slate-800 cursor-pointer transition-colors hover:bg-slate-200/80 active:scale-95"
              >
                <Menu className="w-6 h-6" />
              </label>

              {/* Drawer Overlay */}
              <div className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm opacity-0 invisible peer-checked:opacity-100 peer-checked:visible transition-all duration-300">
                <label htmlFor="mobile-menu-toggle" className="absolute inset-0 cursor-pointer"></label>
              </div>

              {/* Sidebar Menu Panel */}
              <div className="fixed top-0 right-0 z-[101] w-[88vw] max-w-sm h-[100dvh] bg-white shadow-2xl translate-x-full peer-checked:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col">
                
                {/* Header (Inside Drawer) */}
                <div className="flex items-center justify-between p-5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Gamepad2 className="w-6 h-6 text-violet-600" />
                    <span className="text-lg font-black tracking-tight text-slate-900">
                      AL DANA <span className="text-violet-600">GAMING</span>
                    </span>
                  </div>
                  <label htmlFor="mobile-menu-toggle" className="p-2 -mr-2 bg-slate-100 rounded-full cursor-pointer hover:bg-slate-200 transition-colors">
                    <X className="w-5 h-5 text-slate-600" />
                  </label>
                </div>

                {/* Mobile Links List */}
                <nav className="flex-1 overflow-y-auto p-5 space-y-4">
                  <Link href="/" className="block text-base font-bold text-slate-800 hover:text-violet-600 transition-colors">Home</Link>
                  <Link href="/about" className="block text-base font-bold text-slate-800 hover:text-violet-600 transition-colors">About</Link>
                  
                  {/* Services Accordion */}
                  <details className="group border-y border-slate-100 py-3">
                    <summary className="flex items-center justify-between text-base font-bold text-slate-800 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:text-violet-600 transition-colors">
                      Services
                      <ChevronDown className="w-4 h-4 text-slate-400 transition-transform group-open:-rotate-180" />
                    </summary>
                    <div className="mt-3 pl-3 space-y-4 border-l-2 border-violet-100">
                      {serviceCategories.map((cat) => (
                        <div key={cat.title}>
                          <p className="font-semibold text-violet-600 text-xs tracking-wide uppercase mb-1.5 flex items-center gap-2">
                            <cat.icon className="w-3.5 h-3.5" /> {cat.title}
                          </p>
                          <ul className="space-y-2 pl-5 text-sm text-slate-600 font-medium">
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
                  <details className="group border-b border-slate-100 pb-3">
                    <summary className="flex items-center justify-between text-base font-bold text-slate-800 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:text-violet-600 transition-colors">
                      Shop
                      <ChevronDown className="w-4 h-4 text-slate-400 transition-transform group-open:-rotate-180" />
                    </summary>
                    <div className="mt-3 pl-3 space-y-4 border-l-2 border-violet-100">
                      {shopMenuCategories.map((cat) => (
                        <div key={cat.title}>
                          <p className="font-semibold text-violet-600 text-xs tracking-wide uppercase mb-1.5 flex items-center gap-2">
                            <cat.icon className="w-3.5 h-3.5" /> {cat.title}
                          </p>
                          <ul className="space-y-2 pl-5 text-sm text-slate-600 font-medium">
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

                  {/* Standard Links (Blog, Trade In, Contact) */}
                  <Link href="/blog" className="flex items-center gap-2 text-base font-bold text-slate-800 hover:text-violet-600 transition-colors">
                    <Newspaper className="w-4 h-4 text-violet-600" /> Blog
                  </Link>
                  <Link href="/buy-back" className="block text-base font-bold text-slate-800 hover:text-violet-600 transition-colors">Trade In</Link>
                  <Link href="/contact" className="block text-base font-bold text-slate-800 hover:text-violet-600 transition-colors">Contact</Link>
                </nav>

                {/* Mobile Call to Action */}
                <div className="p-5 border-t border-slate-100 bg-slate-50">
                  <Link href="/repair" className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 px-6 py-3.5 text-base font-bold text-white shadow-md active:scale-95 transition-transform">
                    <Wrench className="size-5" />
                    <span>Book a Repair</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile brand strip */}
        <div className="border-t border-slate-100 bg-slate-50/90 px-4 py-1.5 min-[430px]:hidden">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
            <Gamepad2 className="size-3.5 text-violet-600" />
            Al Dana Gaming · UAE
          </div>
        </div>
      </div>
    </header>
  )
}