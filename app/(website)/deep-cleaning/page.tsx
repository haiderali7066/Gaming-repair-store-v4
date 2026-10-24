"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Flame,
  Cpu,
  Wind,
  Fan,
  Thermometer,
  Clock,
  ArrowRight,
  Settings,
  CheckCircle2,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

/* Every call-to-action on this page goes to the repair form */
const FORM = "/repair#repair-form"

/* Hero background — swap for a generated image (e.g. public/thermal/hero-bg.jpg) */
const HERO_IMG =
  "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2000&auto=format&fit=crop"

/* Same brand logos + colours as the iPad / services / gaming PC pages */
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

const heroFeatures = [
  { label: "Thermal Paste Repaste", icon: Flame },
  { label: "Liquid Metal Service", icon: Cpu },
  { label: "Dust & Debris Removal", icon: Wind },
  { label: "Fan Replacement", icon: Fan },
  { label: "Temperature Testing", icon: Thermometer },
  { label: "Same-Day Available", icon: Clock },
]

type Tone = "light" | "dark" | "violet"

type Feature = {
  id: string
  icon: LucideIcon
  eyebrow: string
  title: string
  accent: string
  text: string
  items: string[]
  cta: string
  image: string
  imageAlt: string
  chip: string
  tone: Tone
  reverse?: boolean
}

/* Section ids match the navbar mega-menu anchors */
const features: Feature[] = [
  {
    id: "thermal-paste-repaste",
    icon: Flame,
    eyebrow: "Thermal paste",
    title: "Thermal Paste",
    accent: "Repaste",
    text: "Over time, factory thermal paste dries out, leading to high CPU and GPU temperatures, sudden frame drops and loud fan noise. We remove the degraded paste and apply high-performance compound to restore optimal heat transfer.",
    items: [
      "High-performance thermal compound",
      "Heatsink surface polishing & cleanup",
      "CPU & GPU temperature stress testing",
      "Reduced thermal throttling",
    ],
    cta: "Book Thermal Service",
    image:
      "https://gamemaxpc.com/static/upload/image/20250825/1756108686232681.png",
    imageAlt: "Thermal paste application on a CPU",
    chip: "Lower temperatures",
    tone: "light",
  },
  {
    id: "liquid-metal-service",
    icon: Cpu,
    eyebrow: "Liquid metal",
    title: "Liquid Metal",
    accent: "Service",
    text: "For high-end gaming rigs and enthusiast laptops, traditional paste isn't enough. We professionally apply a liquid metal gallium alloy for superior heat dissipation and carefully protect the surrounding components.",
    items: [
      "Pro-grade gallium alloy application",
      "Custom non-conductive barrier protection",
      "Maximum cooling for high-TDP CPUs",
      "Short-circuit prevention barriers",
    ],
    cta: "Book Liquid Metal Service",
    image:
      "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1000&auto=format&fit=crop",
    imageAlt: "Liquid metal service on a processor",
    chip: "Extreme cooling performance",
    tone: "violet",
    reverse: true,
  },
  {
    id: "dust-debris-removal",
    icon: Wind,
    eyebrow: "Deep cleaning",
    title: "Dust & Debris",
    accent: "Removal",
    text: "Dust, pet hair and lint clog heatsink fins and trap heat inside your device. Our deep cleaning strips down the chassis to clear hidden buildup from vents, fans and internal components.",
    items: [
      "Full internal disassembly & blowout",
      "Heatsink fin blockage clearing",
      "Port and motherboard dust scrubbing",
      "Better passive and active cooling",
    ],
    cta: "Book Deep Cleaning",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROm6LZaznsb2T37fZhPrXCO4tt3D_bX4pqJ_MjPdz85RpkEeXeGqgxQGmW&s=10",
    imageAlt: "Deep cleaning dust from a laptop heatsink",
    chip: "Airflow restored",
    tone: "light",
  },
  {
    id: "fan-replacement",
    icon: Fan,
    eyebrow: "Cooling fans",
    title: "Fan",
    accent: "Replacement",
    text: "Is your fan buzzing, rattling or sounding like a jet engine? A failing bearing or broken blade means your system isn't being cooled properly. We replace worn-out fans with exact OEM-spec parts.",
    items: [
      "OEM-grade single/dual fan assemblies",
      "Bearing lubrication & alignment checks",
      "Rattle and high-pitch noise elimination",
      "Fan RPM curve optimization & testing",
    ],
    cta: "Book Fan Replacement",
    image:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop",
    imageAlt: "Cooling fan replacement",
    chip: "Quiet, powerful airflow",
    tone: "dark",
    reverse: true,
  },
]

/* Shared layout tokens (identical to the iPad / gaming PC pages) */
const wrap = "mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10"
const sectionY = "py-5 sm:py-6 lg:py-8"
const card = "rounded-3xl"
/* offsets anchor jumps from the sticky navbar mega menu links */
const anchor = "scroll-mt-32"

const toneCls: Record<
  Tone,
  {
    box: string
    title: string
    body: string
    eyebrow: string
    icon: string
    check: string
    item: string
    cta: string
  }
> = {
  light: {
    box: "border border-slate-200 bg-white",
    title: "text-slate-900",
    body: "text-slate-500",
    eyebrow: "bg-violet-100 text-violet-700",
    icon: "bg-violet-50 text-violet-600",
    check: "text-violet-500",
    item: "text-slate-700",
    cta: "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30",
  },
  dark: {
    box: "bg-slate-900",
    title: "text-white",
    body: "text-slate-300",
    eyebrow: "bg-violet-500/15 text-violet-300",
    icon: "bg-white/10 text-white",
    check: "text-violet-400",
    item: "text-slate-100",
    cta: "bg-white text-slate-900 shadow-lg",
  },
  violet: {
    box: "bg-gradient-to-br from-violet-600 to-indigo-700",
    title: "text-white",
    body: "text-violet-100",
    eyebrow: "bg-white/15 text-white",
    icon: "bg-white/20 text-white",
    check: "text-violet-200",
    item: "text-white",
    cta: "bg-white text-violet-700 shadow-lg",
  },
}

/* One reusable "text + image + CTA" section */
function FeatureSection({ f }: { f: Feature }) {
  const t = toneCls[f.tone]
  const dark = f.tone !== "light"

  return (
    <section id={f.id} className={`${sectionY} ${anchor}`}>
      <div className={wrap}>
        <div className={`overflow-hidden ${card} ${t.box}`}>
          <div className="grid lg:grid-cols-2">
            {/* text */}
            <div
              className={`flex flex-col justify-center p-7 sm:p-10 lg:p-14 ${
                f.reverse ? "lg:order-2" : ""
              }`}
            >
              <span
                className={`mb-4 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${t.eyebrow}`}
              >
                <f.icon className="size-3.5" /> {f.eyebrow}
              </span>
              <h2
                className={`mb-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl ${t.title}`}
              >
                {f.title}{" "}
                <span className={dark ? "text-fuchsia-300" : "text-violet-600"}>
                  {f.accent}
                </span>
              </h2>
              <p
                className={`mb-6 max-w-xl text-base font-medium leading-relaxed sm:text-lg ${t.body}`}
              >
                {f.text}
              </p>

              <ul className="mb-8 grid max-w-xl gap-3 sm:grid-cols-2">
                {f.items.map((item) => (
                  <li
                    key={item}
                    className={`flex items-start gap-2.5 text-base font-semibold ${t.item}`}
                  >
                    <CheckCircle2
                      className={`mt-0.5 size-5 shrink-0 ${t.check}`}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div>
                <Link
                  href={FORM}
                  className={`inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-bold transition-transform hover:-translate-y-0.5 ${t.cta}`}
                >
                  {f.cta} <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* image */}
            <div
              className={`relative min-h-[300px] sm:min-h-[400px] lg:min-h-[480px] ${
                f.reverse ? "lg:order-1" : ""
              }`}
            >
              <Image
                src={f.image}
                alt={f.imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div
                className={`absolute inset-0 ${
                  f.reverse
                    ? "bg-gradient-to-t from-slate-950/60 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-slate-950/20"
                    : "bg-gradient-to-t from-slate-950/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-slate-950/20"
                }`}
              />
              <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-slate-950/50 px-4 py-2 text-sm font-bold text-white backdrop-blur">
                <f.icon className="size-4 text-violet-300" /> {f.chip}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function DeepCleaningThermalPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* ================= HERO (image = full background) ================= */}
      <section className="relative isolate flex min-h-[680px] flex-col overflow-hidden bg-[#050816] text-white lg:min-h-[760px] xl:min-h-[820px]">
        <Image
          src={HERO_IMG}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[70%_50%] lg:object-right"
        />
        {/* dark on the text side, clear on the image side */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#050816] via-[#050816]/85 to-[#050816]/20 lg:via-[#050816]/70 lg:to-transparent" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#050816]/80 via-transparent to-[#050816]/30" />

        <div
          className={`${wrap} flex flex-1 flex-col justify-center py-10 sm:py-14 lg:py-16`}
        >
          <div className="max-w-4xl">
            <p className="flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.4em] text-slate-200 sm:text-base">
              Expert
              <span className="h-px w-24 bg-gradient-to-r from-sky-400 to-transparent sm:w-40" />
            </p>

            <h1 className="mt-3 text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              <span className="block text-white">DEEP CLEANING &amp;</span>
              <span className="block bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 bg-clip-text text-transparent">
                THERMAL SERVICE
              </span>
            </h1>

            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-lg font-medium text-slate-300 sm:text-xl lg:text-2xl">
              <span>Clean</span>
              <span className="h-5 w-px bg-slate-500" />
              <span>Cool</span>
              <span className="h-5 w-px bg-slate-500" />
              <span>Perform Longer</span>
            </p>

            <ul className="mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
              {heroFeatures.map((f) => (
                <li
                  key={f.label}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2 py-4 text-center backdrop-blur"
                >
                  <f.icon className="size-7 text-violet-400" />
                  <span className="text-[11px] font-bold uppercase leading-tight tracking-wide text-slate-100">
                    {f.label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={FORM}
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-violet-900/50 transition-transform hover:-translate-y-0.5 sm:text-base"
              >
                Cool down your device today <ArrowRight className="size-5" />
              </Link>
              <Link
                href={FORM}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/15 sm:text-base"
              >
                <Settings className="size-4" /> Book a Diagnostic
              </Link>
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

      {/* ================= INTRO + QUICK LINKS ================= */}
      <section id="services" className="pb-1 pt-6 sm:pt-8 lg:pt-10">
        <div className={wrap}>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-700">
              <Sparkles className="size-3.5" /> Thermal &amp; Maintenance
              Services
            </span>
            <h2 className="mb-3 text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">
              Thermal &amp; Maintenance Solutions
            </h2>
            <p className="text-base text-slate-500 sm:text-lg">
              From deep dust extraction to extreme liquid metal cooling
              upgrades, we protect your hardware investment from heat damage.
            </p>
          </div>

          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {features.map((f) => (
              <li key={f.id}>
                <a
                  href={`#${f.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-violet-300 hover:text-violet-600"
                >
                  <f.icon className="size-4 text-violet-500" /> {f.eyebrow}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= TEXT + IMAGE + CTA SECTIONS ================= */}
      {features.map((f) => (
        <FeatureSection key={f.id} f={f} />
      ))}

      {/* Global marquee animation */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}