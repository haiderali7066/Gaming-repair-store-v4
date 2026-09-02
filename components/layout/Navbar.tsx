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
  Info,
  PhoneCall,
  CheckCircle2,
  Layout,
} from "lucide-react"

import { auth } from "@/auth"
import { UserMenu } from "./UserMenu"
import { CartButton } from "./CartButton"
import { AuthButtons } from "./AuthButtons"
import { getFeaturedProducts } from "@/lib/data"
import { formatCurrency } from "@/lib/helpers"
import type { ProductType } from "@/types/product"

const toId = (text: string) => text.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")

// ----------------------------------------------------------------------
// DATA
// ----------------------------------------------------------------------

const homeData = {
  pages: [
    {
      title: "About Us",
      href: "/about",
      description: "Our story, mission, and the team behind the repairs.",
      icon: Info,
    },
    {
      title: "Contact Us",
      href: "/contact",
      description: "Reach out for support, quotes, or visit our center.",
      icon: PhoneCall,
    },
    {
      title: "Gaming Blog",
      href: "/blog",
      description: "Latest news, tech tips, and repair guides.",
      icon: Newspaper,
    },
  ],
  anchors: [
    "Our Services Overview",
    "Why Choose Us",
    "Popular Repairs",
    "How It Works",
    "Brands We Service",
    "Customer Reviews",
  ],
}

const serviceData = [
  {
    title: "Gaming PC Repair",
    href: "/gaming-pc-repair",
    description: "Custom builds, hardware fixes & performance tuning.",
    icon: Monitor,
    items: [
      { label: "Diagnostics", id: "diagnostics" },
      { label: "Hardware Repair", id: "hardware-repair" },
      { label: "Motherboard Repair", id: "motherboard-repair" },
      { label: "Power Supply Repair", id: "power-supply-repair" },
      { label: "Virus & Malware Removal", id: "virus-malware-removal" },
    ],
  },
  {
    title: "Gaming Laptop Repair",
    href: "/gaming-laptop-repair",
    description: "Screen, keyboard, battery & chip-level repairs.",
    icon: Laptop,
    items: [
      { label: "Screen Replacement", id: "screen-replacement" },
      { label: "Keyboard Replacement", id: "keyboard-replacement" },
      { label: "Battery Replacement", id: "battery-replacement" },
      { label: "Motherboard Repair", id: "motherboard-repair" },
    ],
  },
  {
    title: "iPad & Tablet Repair",
    href: "/ipad-repair",
    description: "Screens, ports, batteries & water damage recovery.",
    icon: Tablet,
    items: [
      { label: "Screen Replacement", id: "screen-replacement" },
      { label: "Battery Replacement", id: "battery-replacement" },
      { label: "Charging Port Repair", id: "charging-port-repair" },
      { label: "Water Damage Repair", id: "water-damage-repair" },
    ],
  },
  {
    title: "Deep Cleaning & Thermal",
    href: "/deep-cleaning",
    description: "Repasting, dust removal & thermal optimization.",
    icon: Cpu,
    items: [
      { label: "Thermal Paste Repaste", id: "thermal-paste-repaste" },
      { label: "Liquid Metal Service", id: "liquid-metal-service" },
      { label: "Dust & Debris Removal", id: "dust-debris-removal" },
      { label: "Fan Replacement", id: "fan-replacement" },
    ],
  },
]

const shopCategories = [
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

const navLinks = [
  { label: "Trade In", href: "/buy-back" },
]

// ----------------------------------------------------------------------
// COMPONENT
// ----------------------------------------------------------------------

export async function Navbar() {
  const session = await auth()
  const featuredProducts: ProductType[] = await getFeaturedProducts()
  const top6Products = featuredProducts?.slice(0, 6) || []

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col">
      
      {/* ==================== TOP BAR ==================== */}
      <div className="border-b border-violet-900/30 bg-[#0b0518] text-purple-200/90 relative z-[60]">
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
              <span className="hidden sm:inline">Track Repair</span>
              <span className="sm:hidden">Track</span>
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

      {/* ==================== MAIN NAV ==================== */}
      <div className="bg-white border-b border-slate-200/90 relative shadow-sm">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-3 focus:outline-none">
            <div className="relative flex items-center justify-center size-11 sm:size-12 overflow-hidden rounded-2xl shadow-md shadow-violet-500/10 border border-violet-100">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-700 text-white flex items-center justify-center z-0">
                <Gamepad2 className="size-6" />
              </div>
              <Image src="/logo.jpeg" alt="Al Dana Gaming Logo" fill className="object-cover z-10" />
            </div>
            <div className="hidden min-[430px]:block">
              <div className="flex items-center leading-none">
                <span className="text-xl font-black tracking-tight text-slate-900">AL DANA</span>
                <span className="ml-1.5 text-xl font-black tracking-tight text-violet-600">GAMING</span>
              </div>
              <div className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.22em] text-violet-600">
                Repairs & Gaming Hub
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden h-full items-center gap-0.5 lg:flex">
            
            {/* HOME DROPDOWN */}
            <div className="group flex h-full items-center">
              <Link href="/" className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[15px] font-bold text-slate-800 transition-all hover:bg-violet-50 hover:text-violet-600">
                Home
                <ChevronDown className="size-4 text-slate-400 group-hover:text-violet-600 group-hover:rotate-180 transition-transform duration-300" />
              </Link>
              
              <div className="absolute left-0 top-full w-full bg-white border-t-2 border-violet-500 shadow-2xl shadow-slate-200/50 opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden">
                <div className="mx-auto max-w-7xl px-8 py-8">
                  <div className="grid grid-cols-12 gap-8">
                    
                    {/* Left: Page Cards */}
                    <div className="col-span-5 flex flex-col gap-3">
                      <span className="text-[11px] font-bold tracking-widest text-violet-600 uppercase mb-1 flex items-center gap-1.5">
                        <Sparkles className="size-3.5" /> Explore
                      </span>
                      {homeData.pages.map((page) => (
                        <Link
                          key={page.title}
                          href={page.href}
                          className="flex items-start gap-3.5 p-3.5 rounded-xl border border-slate-100 bg-slate-50/40 hover:bg-violet-50/60 hover:border-violet-200 transition-all group/item"
                        >
                          <div className="p-2.5 rounded-lg bg-violet-100 text-violet-600 group-hover/item:bg-violet-500 group-hover/item:text-white transition-colors shrink-0">
                            <page.icon className="size-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-bold text-slate-900 group-hover/item:text-violet-600 transition-colors flex items-center gap-1">
                              {page.title}
                              <ArrowUpRight className="size-3.5 text-slate-400 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{page.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Right: Quick Anchors */}
                    <div className="col-span-7 border-l border-slate-100 pl-8">
                      <span className="text-[11px] font-bold tracking-widest text-violet-600 uppercase mb-4 block">
                        Quick Home Sections
                      </span>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                        {homeData.anchors.map((item) => (
                          <Link
                            key={item}
                            href={`/#${toId(item)}`}
                            className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors flex items-center gap-2.5 group/link py-1"
                          >
                            <span className="size-1.5 rounded-full bg-violet-300 group-hover/link:bg-violet-500 group-hover/link:scale-125 transition-all" />
                            {item}
                          </Link>
                        ))}
                      </div>

                      <div className="mt-6 p-4 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-between">
                        <div className="text-sm text-violet-900 font-semibold">Want to trade your old gear?</div>
                        <Link href="/buy-back" className="text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 px-3 py-2 rounded-lg transition-colors flex items-center gap-1">
                          Trade In <ArrowRight className="size-3" />
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* SERVICES DROPDOWN */}
            <div className="group flex h-full items-center">
              <Link href="/services" className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[15px] font-bold text-slate-800 transition-all hover:bg-violet-50 hover:text-violet-600">
                Services
                <ChevronDown className="size-4 text-slate-400 group-hover:text-violet-600 group-hover:rotate-180 transition-transform duration-300" />
              </Link>
              
              <div className="absolute left-0 top-full w-full bg-white border-t-2 border-violet-500 shadow-2xl shadow-slate-200/50 opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden">
                <div className="mx-auto max-w-7xl px-8 py-8">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-violet-100 text-violet-600">
                        <Layout className="size-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-slate-900">Expert Repair Services</h3>
                        <p className="text-xs text-slate-500">Professional diagnostics, repair & maintenance with warranty.</p>
                      </div>
                    </div>
                    <Link href="/services" className="text-xs font-bold text-violet-600 hover:text-white hover:bg-violet-600 bg-violet-50 px-4 py-2.5 rounded-lg transition-all flex items-center gap-1.5 border border-violet-200">
                      All Services <ArrowRight className="size-3.5" />
                    </Link>
                  </div>

                  {/* 4-Column Symmetrical Grid */}
                  <div className="grid grid-cols-4 gap-5">
                    {serviceData.map((service) => (
                      <div key={service.href} className="flex flex-col p-5 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-violet-200 hover:bg-violet-50/30 transition-all group/card h-full">
                        <Link href={service.href} className="block mb-3">
                          <div className="flex items-center gap-2.5 mb-2">
                            <div className="p-2 rounded-lg bg-violet-500 text-white shadow-sm shadow-violet-500/25">
                              <service.icon className="size-4" />
                            </div>
                            <h4 className="text-sm font-extrabold text-slate-900 group-hover/card:text-violet-600 transition-colors leading-tight">
                              {service.title}
                            </h4>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed">{service.description}</p>
                        </Link>

                        <ul className="space-y-2 pt-3 border-t border-slate-200/60 mt-auto">
                          {service.items.map((item) => (
                            <li key={item.id}>
                              <Link
                                href={`${service.href}#${item.id}`}
                                className="text-xs font-medium text-slate-600 hover:text-violet-600 transition-colors flex items-center gap-2 py-0.5"
                              >
                                <CheckCircle2 className="size-3 text-violet-500 shrink-0" />
                                <span className="truncate">{item.label}</span>
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

            {/* SHOP DROPDOWN */}
            <div className="group flex h-full items-center">
              <Link href="/shop" className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[15px] font-bold text-slate-800 transition-all hover:bg-violet-50 hover:text-violet-600">
                Shop
                <ChevronDown className="size-4 text-slate-400 group-hover:text-violet-600 group-hover:rotate-180 transition-transform duration-300" />
              </Link>
              
              <div className="absolute left-0 top-full w-full bg-white border-t-2 border-violet-500 shadow-2xl shadow-slate-200/50 opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden">
                <div className="mx-auto max-w-7xl px-8 py-8">
                  <div className="grid grid-cols-12 gap-8">
                    
                    {/* Left: Circular Featured Products */}
                    <div className="col-span-7">
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-[11px] font-bold tracking-widest uppercase text-violet-600 flex items-center gap-1.5">
                          <Sparkles className="size-3.5" /> Featured Gaming Hardware
                        </span>
                        <Link href="/shop" className="text-xs font-bold text-violet-600 hover:text-violet-700 flex items-center gap-1 transition-colors">
                          Browse All <ArrowUpRight className="size-3" />
                        </Link>
                      </div>
                      
                      {top6Products.length > 0 ? (
                        <div className="grid grid-cols-3 gap-5">
                          {top6Products.map((product) => {
                            const imgSource = product.images?.length ? product.images[0] : product.image || "/placeholder.svg"
                            return (
                              <Link 
                                key={product._id} 
                                href={`/shop/${product.slug}`} 
                                className="flex flex-col items-center text-center group/prod p-3 rounded-xl border border-transparent hover:border-violet-100 hover:bg-violet-50/30 transition-all"
                              >
                                <div className="relative size-24 rounded-full overflow-hidden border-[3px] border-slate-100 group-hover/prod:border-violet-300 transition-colors shadow-sm mb-3 bg-white">
                                  <Image 
                                    src={imgSource} 
                                    alt={product.name} 
                                    fill 
                                    className="object-cover group-hover/prod:scale-110 transition-transform duration-500" 
                                  />
                                </div>
                                <h4 className="text-xs font-bold text-slate-900 group-hover/prod:text-violet-600 transition-colors line-clamp-1 w-full px-2">
                                  {product.name}
                                </h4>
                                <span className="text-[11px] font-bold text-violet-600 mt-1">
                                  {formatCurrency(product.price)}
                                </span>
                              </Link>
                            )
                          })}
                        </div>
                      ) : (
                        <div className="p-10 text-center text-slate-400 text-sm font-medium border border-dashed border-slate-200 rounded-2xl">
                          No featured products available.
                        </div>
                      )}
                    </div>

                    {/* Right: Categories */}
                    <div className="col-span-5 border-l border-slate-100 pl-8 flex flex-col justify-center gap-6">
                      {shopCategories.map((cat) => (
                        <div key={cat.title}>
                          <Link href="/shop" className="flex items-center gap-2 mb-2 group/cathead">
                            <cat.icon className="size-4 text-violet-600" />
                            <h4 className="text-xs font-extrabold tracking-wider text-slate-900 uppercase group-hover/cathead:text-violet-600 transition-colors">
                              {cat.title}
                            </h4>
                          </Link>
                          <ul className="space-y-2 pl-6">
                            {cat.items.map((item) => (
                              <li key={item}>
                                <Link href="/shop" className="text-xs font-medium text-slate-600 hover:text-violet-600 transition-colors block py-0.5">
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
            </div>

            {/* Standard Links */}
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-xl px-3.5 py-2 text-[15px] font-bold text-slate-800 transition-all hover:bg-violet-50 hover:text-violet-600">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-full transition-colors hover:bg-slate-100 p-1">
              <CartButton />
            </div>

            {session ? <UserMenu session={session} /> : <AuthButtons />}

            {/* Desktop CTA */}
            <Link
              href="/repair"
              className="group ml-1 hidden items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-700 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-violet-500/20 transition-all hover:-translate-y-0.5 sm:inline-flex"
            >
              <Wrench className="size-4" />
              <span>Book Repair</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* ==================== MOBILE DRAWER ==================== */}
            <div className="ml-1 lg:hidden flex items-center">
              <input type="checkbox" id="mobile-menu-toggle" className="peer hidden" />
              
              <label 
                htmlFor="mobile-menu-toggle" 
                className="relative z-50 p-2 flex items-center justify-center rounded-xl bg-slate-100 text-slate-800 cursor-pointer hover:bg-slate-200/80 active:scale-95 transition-all"
              >
                <Menu className="size-6" />
              </label>

              {/* Overlay */}
              <div className="fixed inset-0 z-[100] bg-slate-950/50 backdrop-blur-sm opacity-0 invisible peer-checked:opacity-100 peer-checked:visible transition-all duration-300">
                <label htmlFor="mobile-menu-toggle" className="absolute inset-0 cursor-pointer" />
              </div>

              {/* Sidebar */}
              <div className="fixed top-0 right-0 z-[101] w-[88vw] max-w-sm h-[100dvh] bg-white shadow-2xl translate-x-full peer-checked:translate-x-0 transition-transform duration-300 ease-out flex flex-col">
                
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-5 border-b border-slate-100 shrink-0">
                  <div className="flex items-center gap-2">
                    <Gamepad2 className="size-6 text-violet-600" />
                    <span className="text-lg font-black tracking-tight text-slate-900">
                      AL DANA <span className="text-violet-600">GAMING</span>
                    </span>
                  </div>
                  <label htmlFor="mobile-menu-toggle" className="p-2 bg-slate-100 rounded-full cursor-pointer hover:bg-slate-200 transition-colors">
                    <X className="size-5 text-slate-600" />
                  </label>
                </div>

                {/* Scrollable Content */}
                <nav className="flex-1 overflow-y-auto p-5 space-y-1">
                  
                  {/* Home Section */}
                  <div className="mb-2">
                    <Link href="/" className="block text-base font-bold text-slate-800 hover:text-violet-600 transition-colors py-2">Home</Link>
                    <div className="pl-3 space-y-1 border-l-2 border-violet-100 ml-1">
                      {homeData.pages.map((page) => (
                        <Link 
                          key={page.href} 
                          href={page.href} 
                          className="flex items-center gap-2 py-2 text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors"
                        >
                          <page.icon className="size-3.5 text-violet-500" />
                          {page.title}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Services Accordion */}
                  <details className="group border-y border-slate-100 py-1">
                    <summary className="flex items-center justify-between text-base font-bold text-slate-800 cursor-pointer list-none hover:text-violet-600 transition-colors py-2">
                      Services
                      <ChevronDown className="size-4 text-slate-400 transition-transform group-open:-rotate-180" />
                    </summary>
                    <div className="mt-2 pl-3 space-y-4 border-l-2 border-violet-100 ml-1 pb-2">
                      <Link href="/services" className="block text-xs font-bold text-violet-600 uppercase tracking-wide">View All Services →</Link>
                      {serviceData.map((cat) => (
                        <div key={cat.href}>
                          <Link href={cat.href} className="font-bold text-slate-900 text-xs tracking-wide uppercase mb-1.5 flex items-center gap-2 hover:text-violet-600 transition-colors">
                            <cat.icon className="size-3.5 text-violet-600" /> {cat.title}
                          </Link>
                          <ul className="space-y-1 pl-5 text-xs text-slate-600 font-medium">
                            {cat.items.map((item) => (
                              <li key={item.id}>
                                <Link href={`${cat.href}#${item.id}`} className="block hover:text-violet-600 py-0.5 transition-colors">
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </details>

                  {/* Shop Accordion */}
                  <details className="group border-b border-slate-100 py-1">
                    <summary className="flex items-center justify-between text-base font-bold text-slate-800 cursor-pointer list-none hover:text-violet-600 transition-colors py-2">
                      Shop
                      <ChevronDown className="size-4 text-slate-400 transition-transform group-open:-rotate-180" />
                    </summary>
                    <div className="mt-2 pl-3 space-y-4 border-l-2 border-violet-100 ml-1 pb-2">
                      {shopCategories.map((cat) => (
                        <div key={cat.title}>
                          <p className="font-bold text-violet-600 text-xs tracking-wide uppercase mb-1.5 flex items-center gap-2">
                            <cat.icon className="size-3.5" /> {cat.title}
                          </p>
                          <ul className="space-y-1 pl-5 text-xs text-slate-600 font-medium">
                            {cat.items.map((item) => (
                              <li key={item}>
                                <Link href="/shop" className="block hover:text-violet-600 py-0.5 transition-colors">{item}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </details>

                  <Link href="/buy-back" className="block text-base font-bold text-slate-800 hover:text-violet-600 transition-colors py-2">Trade In</Link>
                </nav>

                {/* Mobile CTA */}
                <div className="p-5 border-t border-slate-100 bg-slate-50 shrink-0">
                  <Link href="/repair" className="flex items-center justify-center gap-2 w-full rounded-xl bg-violet-600 text-white font-bold py-3.5 text-sm shadow-lg shadow-violet-500/20 active:scale-95 transition-transform">
                    <Wrench className="size-4" />
                    <span>Book a Repair</span>
                  </Link>
                  <p className="text-center text-[11px] text-slate-400 mt-2.5 font-medium">
                    Fast & reliable service across UAE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sub-bar */}
        <div className="border-t border-slate-100 bg-slate-50 px-4 py-1.5 min-[430px]:hidden">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            <Gamepad2 className="size-3.5 text-violet-600" />
            Al Dana Gaming · UAE
          </div>
        </div>
      </div>
    </header>
  )
}