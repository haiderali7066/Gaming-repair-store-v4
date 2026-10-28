"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Wrench,
  Cpu,
  Monitor,
  ShieldCheck,
  ArrowRight,
  Settings,
  CheckCircle2,
  Sparkles,
  MemoryStick,
  Fan,
  CircuitBoard,
  Bug,
  PlugZap,
  Search,
  type LucideIcon,
} from "lucide-react"

/* Every call-to-action on this page goes to the repair form */
const FORM = "/repair#repair-form"

/* Same brand logos + colours as the services page marquee */
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
  { label: "Hardware Diagnostics", icon: Wrench },
  { label: "CPU & GPU Repair", icon: Cpu },
  { label: "Graphics Card Servicing", icon: Monitor },
  { label: "Cooling & Thermal", icon: Fan },
  { label: "RAM & SSD Upgrades", icon: MemoryStick },
  { label: "Quality Parts", icon: ShieldCheck },
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
    id: "diagnostics",
    icon: Search,
    eyebrow: "Diagnostics",
    title: "Expert PC",
    accent: "Diagnostics",
    text: "We test the CPU, GPU, memory, storage, power and cooling to find the real cause of the problem before recommending any repair or replacement. You get a clear explanation and your options upfront.",
    items: ["Full component testing", "Temperature & stress tests", "Clear written findings", "Options explained upfront"],
    cta: "Book a Diagnostic",
    image: "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1793191307/img_uj0ubt.png",
    imageAlt: "Gaming PC setup with curved monitor",
    chip: "100 DHS diagnostic fee",
    tone: "light",
  },
  {
    id: "hardware-repair",
    icon: Cpu,
    eyebrow: "Hardware",
    title: "CPU, GPU & Graphics Card Repair",
    accent: ".",
    text: "Artifacts, crashes, overheating or no display? We service and repair graphics cards and processors with precision, and replace parts with quality components only when it is truly needed.",
    items: ["GPU & CPU repair", "Graphics card servicing", "Overheating fixes", "Quality replacement parts"],
    cta: "Repair My Hardware",
    image: "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1793192104/Neon_RGB_Triple-Fan_Graphics_Card_lhgeh0.png",
    imageAlt: "High-end graphics card",
    chip: "Quality parts",
    tone: "violet",
    reverse: true,
  },
  {
    id: "motherboard-repair",
    icon: CircuitBoard,
    eyebrow: "Motherboard",
    title: "Motherboard",
    accent: "Repair",
    text: "No power, no POST or dead ports? We trace the fault on the board and repair it where it makes sense, or advise on the best replacement when a repair is not worth it.",
    items: ["No-boot & no-POST faults", "Port & socket issues", "Component-level checks", "Replacement advice"],
    cta: "Fix My Motherboard",
    image: "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1793191780/Neon_Motherboard_Repair_Lab_ookkmf.png",
    imageAlt: "Motherboard with processor",
    chip: "Component-level repair",
    tone: "dark",
  },
  {
    id: "power-supply-repair",
    icon: PlugZap,
    eyebrow: "Power supply",
    title: "Power Supply",
    accent: "Repair",
    text: "An unstable or failing power supply can damage every other part in your rig. We test output, replace faulty units and make sure your PC gets clean, stable power.",
    items: ["PSU load testing", "Unit replacement", "Cable & connector checks", "Wattage advice for upgrades"],
    cta: "Check My Power Supply",
    image: "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1793191931/Neon_RGB_Power_Supply_Workbench_v8ds2r.png",
    imageAlt: "Gaming PC case with RGB fans",
    chip: "Stable power",
    tone: "dark",
    reverse: true,
  },
  // {
  //   id: "virus-malware-removal",
  //   icon: Bug,
  //   eyebrow: "Software",
  //   title: "Virus & Malware",
  //   accent: "Removal",
  //   text: "Slow performance, pop-ups or a hijacked browser? We clean the system, repair Windows where needed and harden it so your games and files stay safe.",
  //   items: ["Full malware scan & removal", "Windows repair & clean-up", "Startup & driver optimisation", "Security hardening advice"],
  //   cta: "Clean My PC",
  //   image: "https://s3.amazonaws.com/www.iobit.com/blog/20260626/1782472890304728.jpg",
  //   imageAlt: "RGB gaming keyboard",
  //   chip: "Safe & secure",
  //   tone: "dark",
  // },
  // {
  //   id: "upgrades",
  //   icon: Fan,
  //   eyebrow: "Upgrades & cooling",
  //   title: "RAM, SSD &",
  //   accent: "Thermal Upgrades",
  //   text: "Get more speed from the machine you already own. We upgrade memory and storage, refresh thermal paste, clear dust and replace fans so temperatures and noise drop.",
  //   items: ["RAM & SSD upgrades", "Thermal paste refresh", "Dust & debris removal", "Fan replacement"],
  //   cta: "Upgrade My PC",
  //   image: "https://nnlaptops.com/products/1tb-nvme-ssd-wd-blue-sn570-gen3-laptop-upgrade-1.webp?v=m1",
  //   imageAlt: "Custom gaming PC with RGB cooling",
  //   chip: "Maximize performance",
  //   tone: "dark",
  //   reverse: true,
  // },
]

/* Shared layout tokens */
const wrap = "mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10"
const sectionY = "py-3 sm:py-4 lg:py-5"
const card = "rounded-3xl"
/* offsets anchor jumps from the sticky navbar mega menu links */
const anchor = "scroll-mt-32"

const toneCls: Record<Tone, { box: string; title: string; body: string; eyebrow: string; check: string; item: string; cta: string }> = {
  light: {
    box: "border border-slate-200 bg-white",
    title: "text-slate-900",
    body: "text-slate-500",
    eyebrow: "bg-violet-100 text-violet-700",
    check: "text-violet-500",
    item: "text-slate-700",
    cta: "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30",
  },
  dark: {
    box: "bg-slate-900",
    title: "text-white",
    body: "text-slate-300",
    eyebrow: "bg-violet-500/15 text-violet-300",
    check: "text-violet-400",
    item: "text-slate-100",
    cta: "bg-white text-slate-900 shadow-lg",
  },
  violet: {
    box: "bg-gradient-to-br from-violet-600 to-indigo-700",
    title: "text-white",
    body: "text-violet-100",
    eyebrow: "bg-white/15 text-white",
    check: "text-violet-200",
    item: "text-white",
    cta: "bg-white text-violet-700 shadow-lg",
  },
}

/* One reusable "text + image + CTA" section — every card has the same fixed height on desktop */
function FeatureSection({ f }: { f: Feature }) {
  const t = toneCls[f.tone]
  const dark = f.tone !== "light"

  return (
    <section id={f.id} className={`${sectionY} ${anchor}`}>
      <div className={wrap}>
        <div className={`overflow-hidden ${card} ${t.box} lg:h-[460px]`}>
          <div className="grid h-full lg:grid-cols-2">
            {/* text */}
            <div className={`flex flex-col justify-center p-6 sm:p-8 lg:p-10 ${f.reverse ? "lg:order-2" : ""}`}>
              <span className={`mb-3 inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider ${t.eyebrow}`}>
                <f.icon className="size-3.5" /> {f.eyebrow}
              </span>
              <h2 className={`mb-3 text-2xl font-black leading-tight sm:text-3xl lg:text-4xl ${t.title}`}>
                {f.title}{" "}
                <span className={dark ? "text-fuchsia-300" : "text-violet-600"}>{f.accent}</span>
              </h2>
              <p className={`mb-4 max-w-xl text-sm font-medium leading-relaxed sm:text-base ${t.body}`}>{f.text}</p>

              <ul className="mb-5 grid max-w-xl gap-2 sm:grid-cols-2">
                {f.items.map((item) => (
                  <li key={item} className={`flex items-center gap-2 text-sm font-semibold ${t.item}`}>
                    <CheckCircle2 className={`size-4 shrink-0 ${t.check}`} /> {item}
                  </li>
                ))}
              </ul>

              <div>
                <Link
                  href={FORM}
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5 sm:text-base ${t.cta}`}
                >
                  {f.cta} <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* image */}
            <div className={`relative h-[240px] sm:h-[300px] lg:h-full ${f.reverse ? "lg:order-1" : ""}`}>
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
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-slate-950/50 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur sm:text-sm">
                <f.icon className="size-4 text-violet-300" /> {f.chip}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function GamingPCRepairPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* ================= HERO (compact: about half the screen) ================= */}
      <section className="relative isolate flex min-h-[420px] flex-col overflow-hidden bg-[#050816] text-white lg:min-h-[60vh]">
        <Image
          src="https://res.cloudinary.com/dvu9vmcqd/image/upload/v1792816921/hero-bg_gqfshv.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[70%_50%] lg:object-right"
        />
        {/* dark on the text side, clear on the PC side */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#050816] via-[#050816]/85 to-[#050816]/20 lg:via-[#050816]/70 lg:to-transparent" />

        <div className={`${wrap} flex flex-1 flex-col justify-center py-8 sm:py-10 lg:py-8`}>
          <div className="max-w-4xl">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-200 sm:text-sm">
              Expert
              <span className="h-px w-16 bg-gradient-to-r from-sky-400 to-transparent sm:w-28" />
            </p>

            <h1 className="mt-2 text-3xl font-black leading-[1.02] tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
              <span className="block text-white">GAMING PC</span>
              <span className="block bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 bg-clip-text text-transparent">
                REPAIR &amp; UPGRADES
              </span>
            </h1>

            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-slate-300 sm:text-base lg:text-lg">
              <span>Restore</span>
              <span className="h-4 w-px bg-slate-500" />
              <span>Upgrade</span>
              <span className="h-4 w-px bg-slate-500" />
              <span>Maximize Performance</span>
            </p>

            <ul className="mt-5 hidden max-w-3xl grid-cols-3 gap-2 sm:grid xl:grid-cols-6">
              {heroFeatures.map((f) => (
                <li
                  key={f.label}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2 py-2.5 text-center backdrop-blur"
                >
                  <f.icon className="size-5 text-violet-400" />
                  <span className="text-[10px] font-bold uppercase leading-tight tracking-wide text-slate-100">{f.label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href={FORM}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-violet-900/50 transition-transform hover:-translate-y-0.5"
              >
                Get your PC fixed today <ArrowRight className="size-4" />
              </Link>
              <Link
                href={FORM}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/15"
              >
                <Settings className="size-4" /> Book a Diagnostic
              </Link>
            </div>
          </div>
        </div>

        {/* floating badge */}
        <div className="absolute bottom-4 right-6 hidden items-center gap-3 rounded-xl border border-violet-400/30 bg-[#050816]/70 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md xl:flex">
          <ShieldCheck className="size-5 text-sky-300" />
          <span className="leading-tight">
            Built for
            <br />
            better gaming
          </span>
        </div>
      </section>

      {/* ================= BRANDS MARQUEE (coloured logos) ================= */}
      <div className="relative overflow-hidden border-b border-slate-200 bg-white py-4">
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
                className="h-7 w-auto object-contain sm:h-9"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ================= INTRO + QUICK LINKS ================= */}
      <section id="services" className="pb-1 pt-5 sm:pt-6 lg:pt-8">
        <div className={wrap}>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-700">
              <Sparkles className="size-3.5" /> Gaming PC Services
            </span>
            <h2 className="mb-2 text-2xl font-black text-slate-900 sm:text-3xl lg:text-4xl">Everything Inside Your Rig</h2>
            <p className="text-sm text-slate-500 sm:text-base">
              From a PC that won&apos;t boot to a full performance upgrade, we diagnose first and repair with precision.
            </p>
          </div>

          <ul className="mt-4 flex flex-wrap justify-center gap-2">
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

      {/* ================= TEXT + IMAGE + CTA SECTIONS (all same height) ================= */}
      {features.map((f) => (
        <FeatureSection key={f.id} f={f} />
      ))}

      <div className="h-6 lg:h-8" />

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