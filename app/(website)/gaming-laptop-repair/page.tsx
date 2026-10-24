"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Wrench,
  Monitor,
  Keyboard,
  Battery,
  Cpu,
  CircuitBoard,
  ShieldCheck,
  ArrowRight,
  Settings,
  CheckCircle2,
  Sparkles,
  PlugZap,
  type LucideIcon,
} from "lucide-react"

/* Every call-to-action on this page goes to the repair form */
const FORM = "/repair#repair-form"

/* Generated hero background — place the file in public/gaming-laptop/hero-bg.jpg */
const HERO_IMG = "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1792823872/Neon_Gaming_Laptop_Workspace_g3n3gi.png"

/* Same brand logos + colours as the services / gaming PC pages */
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
  { label: "Screen Replacement", icon: Monitor },
  { label: "Keyboard & Trackpad", icon: Keyboard },
  { label: "Battery Replacement", icon: Battery },
  { label: "Motherboard Repair", icon: CircuitBoard },
  { label: "Charging Port Repair", icon: PlugZap },
  { label: "OEM-Grade Parts", icon: ShieldCheck },
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
    id: "screen-replacement",
    icon: Monitor,
    eyebrow: "Screen",
    title: "Laptop Screen",
    accent: "Replacement",
    text: "A cracked, bleeding or dead-pixel display ruins the gaming experience. We replace damaged laptop panels with high-refresh-rate IPS, OLED or TN screens matching your exact model's specifications.",
    items: [
      "High refresh rate panel matching (144Hz/240Hz+)",
      "OLED and IPS panel replacements",
      "Hinge repair and display cable reseating",
      "Dead pixel and backlight bleed checks",
    ],
    cta: "Book Screen Repair",
    image:
      "https://images.ctfassets.net/16nm6vz43ids/6RcSRkvOaAIxxg75iAtqt4/4e019d76080f109dbac8af5b7500055c/Cracked_laptop_screen_repair.png?fm=webp&q=65",
    imageAlt: "Cracked laptop screen being repaired",
    chip: "Panel matched to your model",
    tone: "light",
  },
  {
    id: "keyboard-replacement",
    icon: Keyboard,
    eyebrow: "Keyboard & trackpad",
    title: "Keyboard & Trackpad",
    accent: "Replacement",
    text: "Liquid spills, heavy gaming wear and dust build-up can destroy a laptop's keyboard or trackpad. We replace entire palm rest assemblies and individual keyboard modules so you never miss a keystroke.",
    items: [
      "Spill damage cleanup and repair",
      "RGB lighting ribbon cable fixes",
      "Full palm rest assembly replacements",
      "Trackpad sensitivity restoration",
    ],
    cta: "Book Keyboard Repair",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtac3EpAz_DI2azTXZHRxzFL_zb6QxzSS8aTyiAG0YSfARxuQctrBfdKo&s=10",
    imageAlt: "Laptop keyboard replacement",
    chip: "Spill damage repair",
    tone: "violet",
    reverse: true,
  },
  {
    id: "battery-replacement",
    icon: Battery,
    eyebrow: "Battery",
    title: "Laptop Battery",
    accent: "Replacement",
    text: "If your gaming laptop dies the moment it's unplugged, or the battery is bulging and pushing up the trackpad, it's time for a replacement. We safely install high-capacity, OEM-grade batteries to keep you gaming on the go.",
    items: [
      "Swollen battery safe extraction & disposal",
      "OEM-grade lithium-ion cell replacements",
      "Charging port (DC jack) repair",
      "Power cycle testing and calibration",
    ],
    cta: "Book Battery Service",
    image:
      "https://thumbs.dreamstime.com/b/swollen-battery-broken-laptop-open-casing-closeup-heavy-damage-notebook-computer-diagnostics-repair-service-problem-pc-300236630.jpg",
    imageAlt: "Swollen laptop battery inside an opened laptop",
    chip: "OEM-grade cells",
    tone: "light",
  },
  {
    id: "motherboard-repair",
    icon: Cpu,
    eyebrow: "Motherboard",
    title: "Laptop Motherboard",
    accent: "Repair",
    text: "Laptops are prone to overheating and power surges that can fry motherboard components. Instead of replacing the whole expensive board, our micro-soldering experts repair burnt traces, faulty VRMs and shorted chips to save your machine.",
    items: [
      "Micro-soldering and SMD component replacement",
      "Liquid damage ultrasonic board cleaning",
      "Burnt trace and short-circuit repair",
      "Dedicated GPU (dGPU) reflowing/reballing",
    ],
    cta: "Book Motherboard Repair",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
    imageAlt: "Circuit board close-up",
    chip: "Micro-soldering",
    tone: "dark",
    reverse: true,
  },
]

/* Shared layout tokens (identical to the gaming PC page) */
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

export default function GamingLaptopRepairPage() {
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
        {/* dark on the text side, clear on the laptop side */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#050816] via-[#050816]/85 to-[#050816]/20 lg:via-[#050816]/70 lg:to-transparent" />

        <div
          className={`${wrap} flex flex-1 flex-col justify-center py-10 sm:py-14 lg:py-16`}
        >
          <div className="max-w-4xl">
            <p className="flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.4em] text-slate-200 sm:text-base">
              Expert
              <span className="h-px w-24 bg-gradient-to-r from-sky-400 to-transparent sm:w-40" />
            </p>

            <h1 className="mt-3 text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              <span className="block text-white">GAMING LAPTOP</span>
              <span className="block bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 bg-clip-text text-transparent">
                REPAIR &amp; REPLACEMENT
              </span>
            </h1>

            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-lg font-medium text-slate-300 sm:text-xl lg:text-2xl">
              <span>Restore</span>
              <span className="h-5 w-px bg-slate-500" />
              <span>Replace</span>
              <span className="h-5 w-px bg-slate-500" />
              <span>Play Anywhere</span>
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
                Get your laptop fixed today <ArrowRight className="size-5" />
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
              <Sparkles className="size-3.5" /> Gaming Laptop Services
            </span>
            <h2 className="mb-3 text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">
              Comprehensive Repair Solutions
            </h2>
            <p className="text-base text-slate-500 sm:text-lg">
              From screen and battery replacements to advanced motherboard
              micro-soldering, we handle the critical repairs your gaming
              laptop needs.
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