"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Wrench,
  Cpu,
  Zap,
  Monitor,
  Laptop,
  Tablet,
  Wind,
  Search,
  RefreshCw,
  ShieldCheck,
  ArrowRight,
  Settings,
  CreditCard,
  CheckCircle2,
  Phone,
  Sparkles,
  Thermometer,
  HardDrive,
  BadgeCheck,
} from "lucide-react"

/* Logos render in each brand's own colours (no colour override in the URL). */
const brands = [
  { name: "Apple", slug: "apple" },
  { name: "Dell", slug: "dell" },
  { name: "HP", slug: "hp" },
  { name: "Lenovo", slug: "lenovo" },
  { name: "ASUS", slug: "asus" },
  { name: "Acer", slug: "acer" },
  { name: "MSI", slug: "msi" },
  { name: "Razer", slug: "razer" },
  { name: "Corsair", slug: "corsair" },
  { name: "NVIDIA", slug: "nvidia" },
  { name: "AMD", slug: "amd" },
]

const heroServices = [
  { label: "Laptop Repair", href: "/gaming-laptop-repair", icon: Laptop },
  { label: "Gaming PC Repair", href: "/gaming-pc-repair", icon: Monitor },
  { label: "iPad & Tablet Repair", href: "/ipad-repair", icon: Tablet },
  { label: "Maintenance & Upgrades", href: "/deep-cleaning", icon: Settings },
]

const expertCards = [
  {
    title: "Expert Technicians",
    text: "Skilled and certified professionals with years of hands-on experience.",
    icon: Wrench,
    cls: "bg-gradient-to-br from-indigo-500 to-violet-700 text-white",
    textCls: "text-violet-100",
    ring: "bg-white/15 ring-white/25",
  },
  {
    title: "Advanced Repair Solutions",
    text: "We handle complex repairs with precision and the latest technology.",
    icon: Monitor,
    cls: "bg-violet-50 text-slate-900 border border-violet-100",
    textCls: "text-slate-500",
    ring: "bg-violet-100 ring-violet-200 text-violet-700",
  },
  {
    title: "All Major Devices",
    text: "Laptops, desktops, consoles, smart devices and more.",
    icon: Laptop,
    cls: "bg-slate-900 text-white",
    textCls: "text-slate-300",
    ring: "bg-white/10 ring-white/20",
  },
  {
    title: "Original & Quality Parts",
    text: "We use high-quality parts to ensure long-lasting performance.",
    icon: Cpu,
    cls: "bg-gradient-to-br from-fuchsia-500 to-purple-700 text-white",
    textCls: "text-fuchsia-100",
    ring: "bg-white/15 ring-white/25",
  },
]

/* One wide container + one vertical rhythm shared by every section */
const wrap = "mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10"
const sectionY = "py-5 sm:py-6 lg:py-8"
const card = "rounded-3xl"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* ================= HERO (image = full background) ================= */}
      <section className="relative isolate flex min-h-[640px] flex-col overflow-hidden bg-[#061238] text-white sm:min-h-[700px] lg:min-h-[760px] xl:min-h-[820px]">
        <Image
          src="https://res.cloudinary.com/dvu9vmcqd/image/upload/v1792815886/hero-bg_xvdyqy.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[50%_100%]"
        />
        {/* readability overlays: darker at the top for text, clear at the bottom for the devices */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#061238]/85 via-[#061238]/45 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_45%_at_50%_30%,rgba(6,18,56,0.55),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#061238]/90 to-transparent" />

        <div className={`${wrap} flex flex-1 flex-col items-center pt-12 text-center sm:pt-16 lg:pt-20`}>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-wider text-cyan-100 shadow-lg shadow-blue-950/30 backdrop-blur sm:text-sm">
            <Settings className="size-4" /> Our Services
          </span>

          <h1 className="mt-5 max-w-5xl text-4xl text-white leading-[1.04] tracking-tight drop-shadow-lg sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
            Professional Tech Repair.
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent">
              Reliable Solutions.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-blue-50 drop-shadow sm:text-lg lg:text-xl">
            Expert repair solutions for laptops, gaming PCs, iPads, tablets and more — fast, reliable and professionally
            handled.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/repair"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-slate-900 shadow-xl shadow-blue-950/40 transition-colors hover:bg-violet-100 sm:text-base"
            >
              Book a Repair <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/buy-back"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-8 py-3.5 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/20 sm:text-base"
            >
              Trade-In Offers <RefreshCw className="size-4" />
            </Link>
          </div>
        </div>

        {/* bottom glass bar: service shortcuts + trust */}
        <div className={`${wrap} relative pb-4 sm:pb-6`}>
          <div className="rounded-2xl border border-white/15 bg-[#061238]/60 p-2 shadow-2xl shadow-blue-950/50 backdrop-blur-md sm:p-3">
            <ul className="hidden grid-cols-2 gap-2 sm:grid lg:grid-cols-4">
              {heroServices.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="flex h-full items-center justify-center gap-2.5 rounded-xl px-3 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
                  >
                    <s.icon className="size-5 shrink-0 text-cyan-300" /> {s.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 px-2 py-2 text-[11px] font-bold uppercase tracking-wider text-blue-100 sm:mt-1 sm:border-t sm:border-white/10 sm:pt-3 sm:text-xs">
              <span className="flex items-center gap-1.5"><BadgeCheck className="size-4 text-cyan-300" /> Expert technicians</span>
              <span className="flex items-center gap-1.5"><BadgeCheck className="size-4 text-cyan-300" /> Quality parts</span>
              <span className="flex items-center gap-1.5"><BadgeCheck className="size-4 text-cyan-300" /> Fast turnaround</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BRANDS MARQUEE (coloured logos) ================= */}
      <div className="relative overflow-hidden border-b border-slate-200 bg-white py-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-40" />

        <div className="animate-marquee flex items-center gap-14 px-8 sm:gap-24">
          {[...brands, ...brands, ...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              className="flex shrink-0 cursor-default items-center justify-center transition-transform duration-300 hover:scale-110"
              title={brand.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/${brand.slug}`}
                alt={brand.name}
                loading="lazy"
                className="h-8 w-auto object-contain sm:h-10"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ================= CORE SERVICES ================= */}
      <section id="core-services" className={sectionY}>
        <div className={wrap}>
          <div className="mx-auto mb-6 max-w-3xl text-center">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-700">
              <Sparkles className="size-3.5" /> Expert Repairs
            </span>
            <h2 className="mb-3 text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">Core Repair Services</h2>
            <p className="text-base text-slate-500 sm:text-lg">
              We specialize in complete hardware and software restoration. Discover our technical solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:auto-rows-fr lg:grid-cols-12">
            {/* Gaming PC */}
            <div className={`group relative min-h-[340px] overflow-hidden bg-slate-900 p-7 sm:p-9 md:col-span-2 lg:col-span-7 lg:p-12 ${card}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1600&auto=format&fit=crop"
                alt="Gaming PC"
                className="absolute inset-0 h-full w-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/60" />
              <div className="relative z-10 flex h-full flex-col justify-center">
                <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur">
                  <Monitor className="size-6" />
                </div>
                <h3 className="mb-3 text-2xl font-black text-white sm:text-3xl">Gaming PC Repair & Upgrades</h3>
                <p className="mb-6 max-w-xl text-base font-medium text-slate-300">
                  Problems with graphics cards, cooling systems, or power supplies can ruin your experience. We fix it all
                  with expert precision.
                </p>
                <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {["Expert PC Diagnostics", "GPU & CPU Repair", "Overheating Solutions", "RAM & SSD Upgrades"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-base font-medium text-slate-200">
                      <CheckCircle2 className="size-5 shrink-0 text-violet-400" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* iPad */}
            <div className={`relative min-h-[340px] overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-700 p-7 text-white sm:p-9 lg:col-span-5 lg:p-12 ${card}`}>
              <div className="absolute -bottom-10 -right-10 opacity-10">
                <Tablet className="size-56" />
              </div>
              <div className="relative z-10 flex h-full flex-col justify-center">
                <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-white/20">
                  <Tablet className="size-6" />
                </div>
                <h3 className="mb-3 text-2xl font-black sm:text-3xl">iPad & Tablet Repair</h3>
                <p className="mb-6 max-w-md text-base font-medium text-violet-100">
                  Screen replacements, battery fixes, and charging port repairs with precision care.
                </p>
                <ul className="grid grid-cols-2 gap-2.5">
                  {["Screen Replacement", "Battery Fixes", "Charging Ports", "Water Damage"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-base text-violet-50">
                      <Zap className="size-4 shrink-0 text-violet-200" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CPU */}
            <div className={`group relative min-h-[340px] overflow-hidden border border-slate-200 bg-white p-7 transition-all hover:border-violet-200 hover:shadow-xl sm:p-9 lg:col-span-5 lg:p-12 ${card}`}>
              <div className="absolute -bottom-12 -right-12 opacity-[0.04] transition-opacity group-hover:opacity-[0.08]">
                <Cpu className="size-60" />
              </div>
              <div className="relative z-10 flex h-full flex-col justify-center">
                <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 transition-colors group-hover:bg-violet-600 group-hover:text-white">
                  <Cpu className="size-6" />
                </div>
                <h3 className="mb-3 text-2xl font-black text-slate-900 sm:text-3xl">CPU & Processor</h3>
                <p className="mb-6 max-w-md text-base font-medium text-slate-500">
                  We identify the real source of the problem before recommending any replacement.
                </p>
                <ul className="space-y-2.5">
                  {["CPU Diagnosis", "Overheating Fixes", "Processor Upgrades"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-base font-medium text-slate-700">
                      <Wrench className="size-4 shrink-0 text-slate-400" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Laptop */}
            <div className={`group relative min-h-[340px] overflow-hidden border border-slate-200 bg-white p-7 transition-all hover:border-violet-200 hover:shadow-xl sm:p-9 md:col-span-2 lg:col-span-7 lg:p-12 ${card}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=1600&auto=format&fit=crop"
                alt="Laptop Repair"
                className="absolute inset-0 h-full w-full object-cover opacity-10 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-white via-white/95 to-white/80" />
              <div className="relative z-10 flex h-full flex-col justify-center">
                <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 transition-colors group-hover:bg-violet-600 group-hover:text-white">
                  <Laptop className="size-6" />
                </div>
                <h3 className="mb-3 text-2xl font-black text-slate-900 sm:text-3xl">Laptop Repair Services</h3>
                <p className="mb-6 max-w-xl text-base font-medium text-slate-500">
                  When your laptop becomes slow, overheats, stops charging, or develops hardware faults, you need a service
                  you can depend on.
                </p>
                <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                  {[
                    "Screen & Display Repair",
                    "Battery & Charging",
                    "Keyboard & Touchpad",
                    "RAM & SSD Upgrades",
                    "Cooling Maintenance",
                    "Windows Support",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-base font-semibold text-slate-700">
                      <CheckCircle2 className="size-5 shrink-0 text-violet-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MEET THE EXPERTS ================= */}
      <section id="experts" className={sectionY}>
        <div className={`${wrap} grid gap-4 lg:grid-cols-12`}>
          {/* 2x2 feature cards, equal height with the photo panel */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-rows-2">
            {expertCards.map((c) => (
              <div
                key={c.title}
                className={`flex min-h-[220px] flex-col items-center justify-center p-7 text-center shadow-sm ${card} ${c.cls}`}
              >
                <span className={`mb-4 flex size-16 items-center justify-center rounded-full ring-1 ${c.ring}`}>
                  <c.icon className="size-7" />
                </span>
                <h3 className="text-xl font-extrabold">{c.title}</h3>
                <p className={`mt-2 text-sm font-medium leading-relaxed sm:text-base ${c.textCls}`}>{c.text}</p>
              </div>
            ))}
          </div>

          {/* Text over technician photo (image used as background) */}
          <div className={`relative min-h-[520px] overflow-hidden border border-slate-200 bg-white lg:col-span-7 ${card}`}>
            <Image
              src="https://res.cloudinary.com/dvu9vmcqd/image/upload/v1792815798/experts_kpnqhn.jpg"
              alt="Technician repairing a motherboard"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-[75%_20%] opacity-25 sm:object-right sm:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40 sm:via-white/90 sm:to-transparent" />

            <div className="relative z-10 flex h-full flex-col justify-center p-7 sm:max-w-[66%] sm:p-10 lg:p-12">
              <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl xl:text-6xl">
                Meet The <span className="text-violet-600">Experts</span>
              </h2>
              <span className="mb-5 mt-3 block h-1.5 w-44 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" />
              <p className="mb-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                Behind every successful repair is a technician who treats your device like their own. Our roster consists of
                certified engineers, custom PC builders, and micro-soldering specialists.
              </p>
              <p className="mb-6 text-base leading-relaxed text-slate-600 sm:text-lg">
                We combine decades of shared experience with a relentless passion for hardware. When you hand over your rig,
                you&apos;re placing it in the hands of absolute professionals who thrive on solving the impossible.
              </p>

              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-violet-600/30 transition-transform hover:-translate-y-0.5"
                >
                  Join Our Team <ArrowRight className="size-4" />
                </Link>
              </div>

              <ul className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-semibold text-slate-700 sm:text-base">
                <li className="flex items-center gap-2"><ShieldCheck className="size-6 text-indigo-600" /> Trusted Experts</li>
                <li className="flex items-center gap-2"><Settings className="size-6 text-indigo-600" /> Skilled Professionals</li>
                <li className="flex items-center gap-2"><Zap className="size-6 text-indigo-600" /> Fast &amp; Reliable Service</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DEEP CLEANING ================= */}
      <section id="deep-cleaning" className={sectionY}>
        <div className={wrap}>
          <div className={`overflow-hidden border border-slate-200 bg-white ${card}`}>
            <div className="grid lg:grid-cols-12">
              <div className="p-7 sm:p-10 lg:col-span-7 lg:p-14">
                <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                  <Wind className="size-6" />
                </div>
                <h2 className="mb-5 text-3xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  Deep Cleaning & <span className="text-violet-600">Thermal Paste</span>
                </h2>
                <div className="mb-7 max-w-2xl space-y-4 text-base font-medium leading-relaxed text-slate-500 sm:text-lg">
                  <p>
                    Dust buildup and old thermal paste drastically reduce cooling efficiency, causing higher temperatures,
                    loud fan noise, and unexpected shutdowns.
                  </p>
                  <p>
                    Our maintenance service restores cooling performance. We remove old thermal compound and apply premium
                    replacements using professional techniques.
                  </p>
                </div>

                <div className="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <h4 className="mb-1.5 text-base font-bold text-slate-900">Benefits</h4>
                    <p className="text-sm leading-relaxed text-slate-500">
                      Better airflow, maximized cooling efficiency, and lower operating temperatures.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <h4 className="mb-1.5 text-base font-bold text-slate-900">Testing</h4>
                    <p className="text-sm leading-relaxed text-slate-500">
                      Post-cleaning benchmarking to monitor and verify thermal performance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative h-72 min-h-[320px] sm:h-96 lg:col-span-5 lg:h-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://gamemaxpc.com/static/upload/image/20250825/1756108686232681.png"
                  alt="Motherboard"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-white/10 lg:via-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-center sm:p-10 lg:text-left">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur">
                    <Thermometer className="size-4 text-violet-300" />
                    <span className="text-sm font-bold text-white">Performance First</span>
                  </div>
                  <p className="max-w-sm text-base font-medium text-slate-100">
                    Ensuring every crucial component breathes easily and works together perfectly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= POLICIES & TRADE-INS ================= */}
      <section id="policies" className="mt-3 bg-slate-900 py-8 sm:py-10 lg:py-12">
        <div className={wrap}>
          <div className="mx-auto mb-7 max-w-3xl text-center">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-300">
              <ShieldCheck className="size-3.5" /> Policies
            </span>
            <h2 className="mb-3 text-3xl font-black text-white sm:text-4xl lg:text-5xl">Trade In Today. Upgrade Tomorrow.</h2>
            <p className="text-base text-slate-400 sm:text-lg">
              Transparent policies and clear explanations before we ever start working on your machine.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {/* Diagnosis */}
            <div className={`flex flex-col border border-white/10 bg-white/5 p-7 backdrop-blur transition-colors hover:border-violet-500/30 ${card}`}>
              <Search className="mb-5 size-9 text-violet-400" />
              <h3 className="mb-3 text-xl font-black text-white">Professional Diagnosis</h3>
              <p className="mb-5 text-base font-medium leading-relaxed text-slate-300">
                Every device is carefully inspected using professional testing methods to identify the root cause. We
                explain all available options clearly.
              </p>
              <div className="mt-auto">
                <div className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg">
                  <CreditCard className="size-4" /> 100 DHS Diagnostic Fee
                </div>
                <p className="mt-3 text-xs font-medium text-slate-500 sm:text-sm">
                  Covers professional technical assessment. Non-refundable once diagnostics begin.
                </p>
              </div>
            </div>

            {/* Trade-In */}
            <div className={`flex flex-col border border-white/10 bg-white/5 p-7 backdrop-blur transition-colors hover:border-violet-500/30 ${card}`}>
              <RefreshCw className="mb-5 size-9 text-violet-400" />
              <h3 className="mb-3 text-xl font-black text-white">Trade-In Policy</h3>
              <ul className="mb-5 space-y-3 text-base font-medium text-slate-300">
                {[
                  "Values based on model, specs, condition, and market value.",
                  "Final offers confirmed after physical testing by technicians.",
                  "Remove personal accounts and wipe data before handover.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <div className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-400" />
                    {t}
                  </li>
                ))}
              </ul>
              <Link href="/buy-back" className="mt-auto inline-flex items-center gap-1.5 text-base font-bold text-violet-400 transition-colors hover:text-white">
                Get a Valuation <ArrowRight className="size-4" />
              </Link>
            </div>

            {/* Refund */}
            <div className={`flex flex-col border border-white/10 bg-white/5 p-7 backdrop-blur transition-colors hover:border-violet-500/30 ${card}`}>
              <ShieldCheck className="mb-5 size-9 text-violet-400" />
              <h3 className="mb-3 text-xl font-black text-white">Refund & Return Policy</h3>
              <p className="text-base font-medium leading-relaxed text-slate-300">
                Once a repair is approved and completed, refunds are not accepted for change of mind. Replacement parts
                supplied by us are eligible for exchange if found defective under warranty terms.
              </p>
            </div>

            {/* Data & Collection */}
            <div className={`flex flex-col border border-white/10 bg-white/5 p-7 backdrop-blur transition-colors hover:border-violet-500/30 ${card}`}>
              <HardDrive className="mb-5 size-9 text-violet-400" />
              <h3 className="mb-3 text-xl font-black text-white">Data & Collection</h3>
              <p className="mb-5 text-base font-medium leading-relaxed text-slate-300">
                You are responsible for backing up important files prior to service. We are not liable for data loss.
              </p>
              <div className="mt-auto rounded-xl border-l-2 border-violet-500 bg-slate-950/50 p-4">
                <p className="text-sm font-medium leading-relaxed text-slate-400">
                  Collect your device within <span className="font-bold text-white">7 days</span> of completion notice.
                  Devices left over 30 days are no longer our responsibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className={sectionY}>
        <div className={wrap}>
          <div className={`relative overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-700 ${card}`}>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <div className="absolute -right-10 -top-10 size-80 rounded-full bg-white/10 blur-[90px]" />

            <div className="relative grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-12 lg:p-14">
              <div className="text-center lg:col-span-7 lg:text-left">
                <h2 className="mb-3 text-3xl font-black text-white sm:text-4xl lg:text-5xl">Experience Real Expertise.</h2>
                <p className="mx-auto max-w-xl text-base font-medium text-violet-100 sm:text-lg lg:mx-0">
                  Our goal is to provide dependable solutions that help your gaming PCs, laptops, and iPads perform at
                  maximum efficiency.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:col-span-5 lg:justify-end">
                <Link
                  href="/repair"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-violet-700 shadow-lg transition-colors hover:bg-slate-100"
                >
                  <Settings className="size-4" /> Book a Diagnostic
                </Link>
                <Link
                  href="/buy-back"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-slate-800"
                >
                  <RefreshCw className="size-4" /> Trade-In Device
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-transparent px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10"
                >
                  <Phone className="size-4" /> Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global marquee animation */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee { animation: none; }
        }
      `}</style>
    </div>
  )
}