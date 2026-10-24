import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import {
  ArrowRight,
  ChevronDown,
  Cpu,
  Gamepad2,
  Info,
  Laptop,
  LogOut,
  Menu,
  Monitor,
  Newspaper,
  Package,
  PhoneCall,
  Search,
  ShoppingBag,
  Tablet,
  User,
  Wrench,
  X,
} from "lucide-react";

import { auth } from "@/auth";
import { logoutAction } from "@/actions/auth";
import { getFeaturedProducts } from "@/lib/data";
import { formatCurrency } from "@/lib/helpers";

const toId = (t: string) => t.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");

const homePages = [
  { label: "About Us", href: "/about", desc: "Our story, mission and team.", icon: Info },
  { label: "Contact Us", href: "/contact", desc: "Support, quotes and our location.", icon: PhoneCall },
  { label: "Blog", href: "/blog", desc: "News, tech tips and repair guides.", icon: Newspaper },
];

const homeSections = [
  "Our Services Overview",
  "Why Choose Us",
  "Popular Repairs",
  "How It Works",
  "Brands We Service",
  "Customer Reviews",
];

const services = [
  {
    label: "Gaming PC Repair",
    href: "/gaming-pc-repair",
    icon: Monitor,
    items: [
      ["Diagnostics", "diagnostics"],
      ["Hardware Repair", "hardware-repair"],
      ["Motherboard Repair", "motherboard-repair"],
      ["Power Supply Repair", "power-supply-repair"],
      ["Virus & Malware Removal", "virus-malware-removal"],
    ],
  },
  {
    label: "Gaming Laptop Repair",
    href: "/gaming-laptop-repair",
    icon: Laptop,
    items: [
      ["Screen Replacement", "screen-replacement"],
      ["Keyboard Replacement", "keyboard-replacement"],
      ["Battery Replacement", "battery-replacement"],
      ["Motherboard Repair", "motherboard-repair"],
    ],
  },
  {
    label: "iPad & Tablet Repair",
    href: "/ipad-repair",
    icon: Tablet,
    items: [
      ["Screen Replacement", "screen-replacement"],
      ["Battery Replacement", "battery-replacement"],
      ["Charging Port Repair", "charging-port-repair"],
      ["Water Damage Repair", "water-damage-repair"],
    ],
  },
  {
    label: "Deep Cleaning & Thermal",
    href: "/deep-cleaning",
    icon: Cpu,
    items: [
      ["Thermal Paste Repaste", "thermal-paste-repaste"],
      ["Liquid Metal Service", "liquid-metal-service"],
      ["Dust & Debris Removal", "dust-debris-removal"],
      ["Fan Replacement", "fan-replacement"],
    ],
  },
];

// nav link: bottom border indicator, highlights while its mega menu is open
const linkCls =
  "flex h-full items-center gap-1 border-b-2 border-transparent px-3.5 text-sm font-semibold text-slate-800 transition-colors hover:border-violet-600 hover:text-violet-600 group-hover:border-violet-600 group-hover:text-violet-600 focus-visible:outline-none focus-visible:border-violet-600 focus-visible:text-violet-600";
// every mega menu: full width, same fixed height
const dropCls =
  "drop absolute inset-x-0 top-full h-[360px] overflow-hidden invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200 bg-white border-t-2 border-violet-600 border-b border-b-slate-200 shadow-2xl shadow-slate-900/10 z-50";
const innerCls = "mx-auto h-full max-w-7xl px-8 py-7";
const labelCls = "mb-3 text-[11px] font-bold uppercase tracking-widest text-violet-600";

export async function Navbar() {
  const session = await auth();
  const all = ((await getFeaturedProducts()) ?? []).slice(0, 8);
  const featured = all.slice(0, 4);
  const recent = all.length > 4 ? all.slice(4, 8) : featured;

  // Always 4 rotation slots (3s each, 12s loop) so there is never a blank gap,
  // even when there are fewer than 4 products.
  const slots =
    recent.length > 1 ? Array.from({ length: 4 }, (_, i) => recent[i % recent.length]) : recent;

  const img = (p: (typeof all)[number]) => p.images?.[0] || p.image || "/placeholder.svg";
  const initials =
    session?.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <style>{`
        @keyframes nav-rotate { 0%,22% {opacity:1;visibility:visible;transform:none} 27%,100% {opacity:0;visibility:hidden;transform:translateX(8px)} }
        @keyframes nav-dot { 0%,22% {background:#7c3aed;width:18px} 27%,100% {background:#cbd5e1;width:6px} }
        .nav-rotate { opacity:0; visibility:hidden; animation: nav-rotate 12s linear infinite; }
        .nav-dot { animation: nav-dot 12s linear infinite; }
        .rot:hover .nav-rotate, .rot:hover .nav-dot { animation-play-state: paused; }
        .nav-solo { opacity:1; visibility:visible; animation:none; }

        /* Force-close a mega menu after a click, even if the link still has focus */
        .mm[data-closed] .drop { visibility:hidden !important; opacity:0 !important; pointer-events:none !important; transition:none !important; }
        .mm[data-closed] .chev { transform:none !important; }
        .mm[data-closed] > a { border-color:transparent !important; color:#1e293b !important; }

        /* Lock page scroll while the mobile drawer is open */
        body:has(#nav-toggle:checked) { overflow:hidden; }

        @media (prefers-reduced-motion: reduce) {
          .nav-rotate, .nav-dot { animation:none; }
          .nav-rotate:first-child { opacity:1; visibility:visible; }
          .drop { transition:none !important; }
        }
      `}</style>

      {/*
        Menu behaviour (runs once):
        - click on any link  -> close its mega menu, drop focus, close mobile drawer / user menu
        - pointer moves away -> re-arm the menu so hover opens it again
        - Escape             -> close everything
        - Tab                -> re-arm so keyboard focus can open menus
      */}
      <Script id="nav-autoclose" strategy="afterInteractive">{`
        (function () {
          if (window.__navBound) return;
          window.__navBound = true;

          function closeMenus() {
            document.querySelectorAll(".mm").forEach(function (m) { m.setAttribute("data-closed", ""); });
          }
          function rearm(except) {
            document.querySelectorAll(".mm[data-closed]").forEach(function (m) {
              if (!except || !m.contains(except)) m.removeAttribute("data-closed");
            });
          }
          function closeDrawer() {
            var t = document.getElementById("nav-toggle");
            if (t) t.checked = false;
          }
          function closeUserMenus(target, force) {
            document.querySelectorAll("details.um[open]").forEach(function (d) {
              if (force || !d.contains(target)) d.removeAttribute("open");
            });
          }

          document.addEventListener("click", function (e) {
            var target = e.target;
            if (!target || !target.closest) return;
            var a = target.closest("a");
            var btn = target.closest("button");

            if (a) {
              var group = a.closest(".mm");
              if (group) {
                group.setAttribute("data-closed", "");
                // focus-within would keep the menu open otherwise
                if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
              }
              if (a.closest("aside")) closeDrawer();
            }

            // user dropdown: close on outside click or when an item inside is used
            closeUserMenus(target, !!(a || btn));
          });

          // pointer left the closed menu -> allow hover to open it again
          document.addEventListener("mouseover", function (e) { rearm(e.target); });
          document.addEventListener("mouseout", function (e) { if (!e.relatedTarget) rearm(null); });
          document.addEventListener("touchstart", function (e) { rearm(e.target); }, { passive: true });

          document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
              closeMenus();
              closeDrawer();
              closeUserMenus(null, true);
              if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
            } else if (e.key === "Tab") {
              rearm(null);
            }
          });
        })();
      `}</Script>

      {/* Top bar */}
      <div className="bg-[#0b0518] text-xs text-purple-200">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <span>Fast &amp; reliable repairs across UAE</span>
          <Link href="/account/orders" className="flex items-center gap-1.5 hover:text-white">
            <Wrench className="size-3.5" /> Track Repair
          </Link>
        </div>
      </div>

      {/* Main bar (relative = mega menus span the full width of this bar) */}
      <div className="relative">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" aria-label="Al Dana home" className="flex shrink-0 items-center gap-2.5">
            <span className="relative flex size-9 items-center justify-center overflow-hidden rounded-md bg-violet-600 text-white">
              <Gamepad2 className="size-5" />
              <Image src="/logo.jpeg" alt="Al Dana" fill sizes="36px" className="object-cover" />
            </span>
            <span className="text-xl font-black leading-none tracking-tight text-slate-900">
              AL <span className="text-violet-600">DANA</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main" className="ml-4 hidden h-full items-center lg:flex">
            {/* HOME */}
            <div className="mm group flex h-full items-center">
              <Link href="/" className={linkCls}>
                Home <ChevronDown className="chev size-4 text-slate-400 transition-transform group-hover:rotate-180" />
              </Link>
              <div className={dropCls}>
                <div className={`${innerCls} grid grid-cols-12 gap-10`}>
                  <div className="col-span-5">
                    <p className={labelCls}>Pages</p>
                    <div className="space-y-2">
                      {homePages.map((p) => (
                        <Link key={p.href} href={p.href} className="group/c flex items-center gap-3 rounded-md border border-slate-200 p-3 transition-colors hover:border-violet-300 hover:bg-violet-50">
                          <span className="rounded-md bg-violet-100 p-2 text-violet-600 transition-colors group-hover/c:bg-violet-600 group-hover/c:text-white">
                            <p.icon className="size-4" />
                          </span>
                          <span>
                            <span className="block text-sm font-bold text-slate-900">{p.label}</span>
                            <span className="text-xs text-slate-500">{p.desc}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-7 border-l border-slate-100 pl-10">
                    <p className={labelCls}>Home Sections</p>
                    <div className="grid grid-cols-2 gap-x-6">
                      {homeSections.map((s) => (
                        <Link key={s} href={`/#${toId(s)}`} className="flex items-center gap-2 py-2 text-sm text-slate-700 hover:text-violet-600">
                          <span className="size-1.5 rounded-full bg-violet-300" /> {s}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center justify-between rounded-md border border-violet-100 bg-violet-50 p-4">
                      <span className="text-sm font-semibold text-violet-900">Something broken? We&apos;ll fix it.</span>
                      <Link href="/repair" className="inline-flex items-center gap-2 rounded-md bg-violet-600 px-4 py-2 text-sm font-bold text-white hover:bg-violet-700">
                        <Wrench className="size-4" /> Book Repair
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SERVICES */}
            <div className="mm group flex h-full items-center">
              <Link href="/services" className={linkCls}>
                Services <ChevronDown className="chev size-4 text-slate-400 transition-transform group-hover:rotate-180" />
              </Link>
              <div className={dropCls}>
                <div className={innerCls}>
                  <div className="grid grid-cols-4 gap-6">
                    {services.map((s) => (
                      <div key={s.href} className="rounded-md border border-slate-100 bg-slate-50/60 p-4">
                        <Link href={s.href} className="flex items-center gap-2 text-sm font-extrabold text-slate-900 hover:text-violet-600">
                          <span className="rounded-md bg-violet-600 p-1.5 text-white">
                            <s.icon className="size-4" />
                          </span>
                          {s.label}
                        </Link>
                        <ul className="mt-3 space-y-0.5 border-t border-slate-200 pt-3">
                          {s.items.map(([label, id]) => (
                            <li key={id}>
                              <Link href={`${s.href}#${id}`} className="block py-1 text-sm text-slate-600 hover:text-violet-600">
                                {label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <Link href="/services" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-violet-600 hover:underline">
                    All services <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* SHOP */}
            <div className="mm group flex h-full items-center">
              <Link href="/shop" className={linkCls}>
                Shop <ChevronDown className="chev size-4 text-slate-400 transition-transform group-hover:rotate-180" />
              </Link>
              <div className={dropCls}>
                <div className={`${innerCls} grid grid-cols-12 gap-10`}>
                  {/* Left: featured products */}
                  <div className="col-span-7">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-violet-600">Featured Products</p>
                      <Link href="/shop" className="text-xs font-bold text-violet-600 hover:underline">Browse all →</Link>
                    </div>
                    {featured.length ? (
                      <div className="grid grid-cols-2 gap-3">
                        {featured.map((p) => (
                          <Link key={p._id} href={`/shop/${p.slug}`} className="flex items-center gap-3 rounded-md border border-slate-200 p-2.5 transition-colors hover:border-violet-300 hover:bg-violet-50">
                            <span className="relative size-20 shrink-0 overflow-hidden rounded bg-slate-100">
                              <Image src={img(p)} alt={p.name} fill sizes="80px" className="object-cover" />
                            </span>
                            <span className="min-w-0">
                              <span className="line-clamp-2 block text-sm font-bold text-slate-900">{p.name}</span>
                              <span className="text-sm font-bold text-violet-600">{formatCurrency(p.price)}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-400">No featured products yet.</p>
                    )}
                  </div>

                  {/* Right: rotating recent products (pauses on hover) */}
                  <div className="rot col-span-5 border-l border-slate-100 pl-10">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-violet-600">New Arrivals</p>
                      {slots.length > 1 && recent.length >= 4 && (
                        <div className="flex items-center gap-1" aria-hidden="true">
                          {slots.map((_, i) => (
                            <span key={i} className="nav-dot h-1.5 w-1.5 rounded-full bg-slate-300" style={{ animationDelay: `${i * 3}s` }} />
                          ))}
                        </div>
                      )}
                    </div>
                    {slots.length ? (
                      <div className="relative h-[240px]">
                        {slots.map((p, i) => (
                          <Link
                            key={`${p._id}-${i}`}
                            href={`/shop/${p.slug}`}
                            className={`nav-rotate absolute inset-0 flex gap-4 ${slots.length === 1 ? "nav-solo" : ""}`}
                            style={slots.length > 1 ? { animationDelay: `${i * 3}s` } : undefined}
                          >
                            <span className="relative block h-full w-1/2 overflow-hidden rounded-md bg-slate-100">
                              <Image src={img(p)} alt={p.name} fill sizes="220px" className="object-cover" />
                            </span>
                            <span className="flex w-1/2 flex-col justify-center">
                              <span className="mb-2 w-fit rounded-sm bg-violet-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-700">New</span>
                              <span className="line-clamp-3 text-base font-extrabold text-slate-900">{p.name}</span>
                              <span className="mt-1 text-base font-bold text-violet-600">{formatCurrency(p.price)}</span>
                              <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-violet-600">
                                View <ArrowRight className="size-4" />
                              </span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-400">No products yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Link href="/buy-back" className={linkCls}>Trade In</Link>
          </nav>

          {/* Search */}
          <form action="/shop" role="search" className="ml-auto hidden max-w-xs flex-1 xl:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                name="q"
                type="search"
                aria-label="Search products"
                placeholder="Search products..."
                className="h-9 w-full rounded-md border border-slate-300 pl-9 pr-3 text-sm outline-none focus:border-violet-500"
              />
            </div>
          </form>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-1 sm:gap-2 xl:ml-0">
            <Link href="/cart" aria-label="Cart" className="rounded-md p-2 text-slate-800 hover:bg-slate-100">
              <ShoppingBag className="size-5" />
            </Link>

            {session ? (
              <details className="um relative">
                <summary
                  aria-label="Account menu"
                  className="flex size-9 cursor-pointer list-none items-center justify-center rounded-md bg-violet-600 text-xs font-bold text-white [&::-webkit-details-marker]:hidden"
                >
                  {initials}
                </summary>
                <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-md border border-slate-200 bg-white py-1 shadow-xl">
                  <p className="truncate border-b border-slate-100 px-4 py-2 text-xs text-slate-500">{session.user?.email}</p>
                  <Link href="/account" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-50">
                    <User className="size-4" /> My Profile
                  </Link>
                  <Link href="/account/orders" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-50">
                    <Package className="size-4" /> My Orders
                  </Link>
                  <form action={logoutAction}>
                    <button type="submit" className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      <LogOut className="size-4" /> Sign Out
                    </button>
                  </form>
                </div>
              </details>
            ) : (
              <>
                <Link href="/auth/login" className="hidden px-3 py-2 text-sm font-semibold text-slate-800 hover:text-violet-600 sm:block">
                  Sign In
                </Link>
                <Link href="/auth/register" className="rounded-md border border-violet-600 px-3.5 py-2 text-sm font-semibold text-violet-600 hover:bg-violet-50">
                  Sign Up
                </Link>
              </>
            )}

            <Link href="/repair" className="hidden items-center gap-2 rounded-md bg-violet-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-violet-700 lg:inline-flex">
              <Wrench className="size-4" /> Book Repair
            </Link>

            {/* Mobile drawer */}
            <div className="lg:hidden">
              <input type="checkbox" id="nav-toggle" className="peer hidden" />
              <label htmlFor="nav-toggle" aria-label="Open menu" className="flex cursor-pointer rounded-md p-2 text-slate-800 hover:bg-slate-100">
                <Menu className="size-6" />
              </label>

              <label
                htmlFor="nav-toggle"
                className="invisible fixed inset-0 z-[60] bg-black/50 opacity-0 transition-opacity peer-checked:visible peer-checked:opacity-100"
              />

              <aside className="fixed right-0 top-0 z-[70] flex h-dvh w-[85vw] max-w-sm translate-x-full flex-col bg-white shadow-2xl transition-transform duration-300 peer-checked:translate-x-0">
                <div className="flex items-center justify-between border-b border-slate-200 p-4">
                  <span className="text-lg font-black text-slate-900">
                    AL <span className="text-violet-600">DANA</span>
                  </span>
                  <label htmlFor="nav-toggle" aria-label="Close menu" className="cursor-pointer rounded-md p-2 hover:bg-slate-100">
                    <X className="size-5" />
                  </label>
                </div>

                <form action="/shop" role="search" className="border-b border-slate-200 p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <input
                      name="q"
                      type="search"
                      aria-label="Search products"
                      placeholder="Search products..."
                      className="h-10 w-full rounded-md border border-slate-300 pl-9 pr-3 text-sm outline-none focus:border-violet-500"
                    />
                  </div>
                </form>

                <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain p-4 text-sm font-semibold text-slate-800">
                  <details>
                    <summary className="flex cursor-pointer list-none items-center justify-between py-2.5 [&::-webkit-details-marker]:hidden">
                      Home <ChevronDown className="size-4 text-slate-400" />
                    </summary>
                    <div className="mb-2 ml-1 space-y-1 border-l-2 border-violet-100 pl-3 font-medium text-slate-600">
                      <Link href="/" className="block py-1.5">Home</Link>
                      {homePages.map((p) => (
                        <Link key={p.href} href={p.href} className="block py-1.5">{p.label}</Link>
                      ))}
                    </div>
                  </details>

                  <details className="border-t border-slate-100">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-2.5 [&::-webkit-details-marker]:hidden">
                      Services <ChevronDown className="size-4 text-slate-400" />
                    </summary>
                    <div className="mb-2 ml-1 space-y-3 border-l-2 border-violet-100 pl-3 font-medium text-slate-600">
                      {services.map((s) => (
                        <div key={s.href}>
                          <Link href={s.href} className="block py-1 font-bold text-slate-900">{s.label}</Link>
                          {s.items.map(([label, id]) => (
                            <Link key={id} href={`${s.href}#${id}`} className="block py-1 pl-3 text-xs">{label}</Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </details>

                  <details className="border-t border-slate-100">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-2.5 [&::-webkit-details-marker]:hidden">
                      Shop <ChevronDown className="size-4 text-slate-400" />
                    </summary>
                    <div className="mb-2 ml-1 space-y-1 border-l-2 border-violet-100 pl-3 font-medium text-slate-600">
                      <Link href="/shop" className="block py-1.5 font-bold text-violet-600">Shop all →</Link>
                      {featured.map((p) => (
                        <Link key={p._id} href={`/shop/${p.slug}`} className="block py-1.5">{p.name}</Link>
                      ))}
                    </div>
                  </details>

                  <Link href="/buy-back" className="block border-t border-slate-100 py-2.5">Trade In</Link>
                </nav>

                <div className="border-t border-slate-200 p-4">
                  <Link href="/repair" className="flex items-center justify-center gap-2 rounded-md bg-violet-600 py-3 text-sm font-bold text-white hover:bg-violet-700">
                    <Wrench className="size-4" /> Book a Repair
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}