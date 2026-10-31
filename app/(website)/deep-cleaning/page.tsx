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
  ShieldCheck,
} from "lucide-react"

/* Every call-to-action on this page goes to the repair form */
const FORM = "/repair#repair-form"

/* Hero background */
const HERO_IMG = "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2000&auto=format&fit=crop"

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
  { label: "Thermal Paste Repaste", icon: Flame },
  { label: "Liquid Metal Service", icon: Cpu },
  { label: "Dust & Debris Removal", icon: Wind },
  { label: "Fan Replacement", icon: Fan },
  { label: "Temperature Testing", icon: Thermometer },
  { label: "Same-Day Available", icon: Clock },
]

type Tone = "light" | "dark" | "violet"

type Detail = {
  title: string
  intro: string
  blocks: { heading: string; body: string }[]
  listTitle?: string
  list?: string[]
}

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
  detail?: Detail
}

/* Section ids match the navbar mega-menu anchors */
const features: Feature[] = [
  {
    id: "thermal-paste-repaste",
    icon: Flame,
    eyebrow: "Thermal paste",
    title: "Thermal Paste",
    accent: "Repaste",
    text: "Over time, thermal paste dries out, causing high temperatures, frame drops and loud fans. We remove the old paste and apply high-performance compound to restore heat transfer.",
    items: ["High-performance compound", "Heatsink surface cleanup", "CPU & GPU stress testing", "Less thermal throttling"],
    cta: "Book Thermal Service",
    image:
      "https://gamemaxpc.com/static/upload/image/20250825/1756108686232681.png",
    imageAlt: "Thermal paste application on a CPU",
    chip: "Lower temperatures",
    tone: "light",
    detail: {
      title: "Thermal Paste Repaste Services",
      intro:
        "Over time, factory thermal paste dries out, leading to high CPU and GPU temperatures, sudden frame drops and loud fan noise. We remove the degraded paste and apply high-performance compound to restore optimal heat transfer, then test the result so you can see how the system behaves under load.",
      blocks: [
        {
          heading: "High-Performance Thermal Compound",
          body: "We clean away the old paste and apply a quality compound suited to your processor or graphics card. The goal is a thin, even layer that helps heat move from the chip to the heatsink.",
        },
        {
          heading: "Heatsink Surface Cleanup",
          body: "Old residue on the heatsink and chip can get in the way of good contact. We carefully clean and prepare the surfaces before the new compound is applied.",
        },
        {
          heading: "CPU and GPU Temperature Stress Testing",
          body: "After the repaste, we run stress tests and monitor temperatures, so we can check that the system is cooling as expected before it is returned to you.",
        },
        {
          heading: "Reduced Thermal Throttling",
          body: "When a processor or graphics card gets too hot, it slows itself down to protect itself. Better heat transfer helps your hardware keep its performance for longer during demanding games and applications.",
        },
      ],
    },
  },
  {
    id: "liquid-metal-service",
    icon: Cpu,
    eyebrow: "Liquid metal",
    title: "Liquid Metal",
    accent: "Service",
    text: "For high-end gaming rigs and enthusiast laptops, traditional paste may not be enough. We professionally apply liquid metal and carefully protect the surrounding components.",
    items: ["Pro-grade gallium alloy", "Non-conductive barrier protection", "Cooling for high-TDP CPUs", "Short-circuit prevention"],
    cta: "Book Liquid Metal Service",
    image:
      "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1000&auto=format&fit=crop",
    imageAlt: "Liquid metal service on a processor",
    chip: "Extreme cooling performance",
    tone: "dark",
    reverse: true,
    detail: {
      title: "Liquid Metal Services",
      intro:
        "For high-end gaming rigs and enthusiast laptops, traditional paste isn't always enough. We professionally apply a liquid metal gallium alloy for superior heat dissipation and carefully protect the surrounding components. Liquid metal is not suitable for every device, so we check your hardware first and tell you honestly whether it is a good fit.",
      blocks: [
        {
          heading: "Pro-Grade Gallium Alloy Application",
          body: "Liquid metal conducts heat very well, but it needs careful, precise application. Our technicians apply a pro-grade alloy in a controlled way and clean up any excess.",
        },
        {
          heading: "Non-Conductive Barrier Protection",
          body: "Liquid metal conducts electricity, so surrounding components must be protected. We use barriers around the chip area to help keep the alloy where it belongs.",
        },
        {
          heading: "Cooling for High-TDP CPUs",
          body: "Powerful processors that produce a lot of heat can benefit most from this service. We assess your cooling setup and explain whether liquid metal is likely to help your system.",
        },
        {
          heading: "Compatibility and Short-Circuit Prevention",
          body: "Not every heatsink material works with liquid metal, and some devices are better left with conventional paste. We check compatibility before any work, and we test the system afterwards.",
        },
      ],
    },
  },
  {
    id: "dust-debris-removal",
    icon: Wind,
    eyebrow: "Deep cleaning",
    title: "Dust & Debris",
    accent: "Removal",
    text: "Dust, pet hair and lint clog heatsink fins and trap heat inside your device. Our deep cleaning clears hidden buildup from vents, fans and internal components.",
    items: ["Full internal cleaning", "Heatsink fin clearing", "Port & board dust removal", "Better airflow"],
    cta: "Book Deep Cleaning",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROm6LZaznsb2T37fZhPrXCO4tt3D_bX4pqJ_MjPdz85RpkEeXeGqgxQGmW&s=10",
    imageAlt: "Deep cleaning dust from a laptop heatsink",
    chip: "Airflow restored",
    tone: "light",
    detail: {
      title: "Dust and Debris Removal Services",
      intro:
        "Dust, pet hair and lint clog heatsink fins and trap heat inside your device. Our deep cleaning opens up the chassis to clear hidden buildup from vents, fans and internal components, helping air move through your system the way it was designed to.",
      blocks: [
        {
          heading: "Full Internal Disassembly and Blowout",
          body: "Where needed, we open the device and clear dust from the inside, rather than only cleaning what can be seen from the outside.",
        },
        {
          heading: "Heatsink Fin Blockage Clearing",
          body: "Packed dust between heatsink fins is one of the most common causes of overheating. We clear the fins so air can pass through and carry heat away.",
        },
        {
          heading: "Port and Motherboard Dust Scrubbing",
          body: "Dust and debris can also build up around ports and across the motherboard. We carefully clean these areas as part of the service.",
        },
        {
          heading: "Better Passive and Active Cooling",
          body: "With vents, fans and heatsinks clear, your cooling system can work more effectively. Regular maintenance can also help you spot cooling problems early.",
        },
      ],
    },
  },
  {
    id: "fan-replacement",
    icon: Fan,
    eyebrow: "Cooling fans",
    title: "Fan",
    accent: "Replacement",
    text: "Is your fan buzzing, rattling or sounding like a jet engine? A failing fan means your system isn't being cooled properly. We replace worn-out fans with exact OEM-spec parts.",
    items: ["OEM-grade fan assemblies", "Bearing & alignment checks", "Noise elimination", "RPM curve testing"],
    cta: "Book Fan Replacement",
    image:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop",
    imageAlt: "Cooling fan replacement",
    chip: "Quiet, powerful airflow",
    tone: "dark",
    reverse: true,
    detail: {
      title: "Fan Replacement Services",
      intro:
        "Is your fan buzzing, rattling or sounding like a jet engine? A failing bearing or broken blade means your system isn't being cooled properly. We replace worn-out fans with exact OEM-spec parts and test the result to make sure your cooling is back to normal.",
      blocks: [
        {
          heading: "OEM-Grade Single and Dual Fan Assemblies",
          body: "We recommend fans that are compatible with your device and its cooling design, so airflow and fit match what the manufacturer intended.",
        },
        {
          heading: "Bearing Lubrication and Alignment Checks",
          body: "Sometimes a fan problem comes from a dry bearing or a misaligned part rather than a failed fan. We inspect first, so you only replace what actually needs replacing.",
        },
        {
          heading: "Rattle and High-Pitch Noise Elimination",
          body: "Unusual noises are often a sign of a cooling problem. We find the source of the rattle, whistle or buzz and recommend a suitable fix.",
        },
        {
          heading: "Fan RPM Curve Testing",
          body: "After the work, we check how the fan responds as temperatures rise, to confirm it speeds up and slows down as expected.",
        },
      ],
    },
  },
]

/* Bottom-of-page article content */
const articleIntro = {
  eyebrow: "Professional Cleaning, Cooling and Thermal Service",
  title: "Complete Cooling Care for Your Device",
  paragraphs: [
    "Heat is one of the biggest enemies of computer hardware. Gaming PCs, desktops and laptops all rely on clear airflow, working fans and good thermal contact to stay stable, and when cooling falls behind, performance and reliability can suffer.",
    "We provide cleaning, cooling and thermal services to help customers restore performance and extend the life of their hardware. Whether your device is running hot, throttling, shutting down or simply sounds louder than it used to, our focus is on finding the cause and recommending the right solution.",
    "Our goal is to make maintenance simple and dependable through professional service and clear communication.",
  ],
}

const articleSections: { title: string; paragraphs: string[] }[] = [
  {
    title: "Why Heat Matters",
    paragraphs: [
      "Processors and graphics cards slow themselves down when they get too hot, which can show up as lower frame rates, stuttering and unexpected shutdowns.",
      "Over time, sustained high temperatures can also put extra stress on components. Keeping your cooling system in good condition helps protect your investment.",
    ],
  },
  {
    title: "Signs Your Device Needs Cooling Service",
    paragraphs: [
      "Common signs include high temperatures, loud or rattling fans, sudden performance drops, random restarts and hot air coming from vents.",
      "If you notice any of these, a proper inspection can help identify whether the cause is dust, old thermal paste, a failing fan or something else.",
    ],
  },
  {
    title: "Deep Cleaning and Maintenance",
    paragraphs: [
      "Dust buildup, restricted airflow and ageing components may affect performance over time. Regular maintenance helps reduce dust buildup and identify cooling problems before they become serious.",
      "Where necessary, we inspect fans, vents, airflow paths, heatsinks and thermal paste, and recommend practical solutions without unnecessary replacements.",
    ],
  },
  {
    title: "Thermal Paste and Thermal Compounds",
    paragraphs: [
      "Thermal paste does not last forever. As it dries out, heat transfer between the chip and the heatsink gets worse.",
      "We choose a compound that suits your hardware and explain the options, including when a more advanced solution such as liquid metal is, or is not, appropriate.",
    ],
  },
  {
    title: "Fan and Cooling System Health",
    paragraphs: [
      "Fans are moving parts, and they wear over time. Bearings, blades and connectors can all affect how well a fan cools your system.",
      "We check fan operation and recommend repair or replacement based on what we find, with compatible quality parts.",
    ],
  },
  {
    title: "Accurate Diagnostics and Testing",
    paragraphs: [
      "A reliable service starts with a proper diagnosis. High temperatures do not always mean that the most obvious component is the cause.",
      "After the work, we test temperatures under load where relevant, and we explain the findings in clear language so you understand what was done.",
    ],
  },
  {
    title: "Quality and Customer Confidence",
    paragraphs: [
      "We believe professional technical service should be built on honesty and clear communication. Before work begins, we explain the proposed solution and the estimated cost, and if additional work is required, we discuss it with you first.",
      "Every device is handled with appropriate care. We encourage customers to share information about previous repairs, liquid damage or known faults to help us assess the device accurately.",
    ],
  },
  {
    title: "A Service Experience Built Around You",
    paragraphs: [
      "Every customer has different needs. Some need help with an overheating problem, while others want routine maintenance to keep their system healthy.",
      "We aim to provide a service experience based on listening carefully, assessing the problem and explaining the available solutions. We value customer feedback and understand that trust is earned through dependable service and clear communication.",
    ],
  },
]

const articleClosing = {
  title: "Your Cooling and Maintenance Partner",
  paragraphs: [
    "Whether you need a thermal paste refresh, a deep clean, a fan replacement or a more advanced cooling upgrade, our goal is to help you find a practical solution. We focus on careful assessment and professional service to keep your hardware running cooler and more reliably.",
    "We understand that your equipment is important to your work, entertainment and everyday activities. That is why we focus on responsible recommendations, transparent pricing discussions and attention to detail throughout the service process.",
    "Thank you for considering our services. We look forward to supporting your technology needs with professional care, reliable guidance and a commitment to customer satisfaction.",
  ],
  tagline: "Reliable Repairs. Professional Expertise. Technology You Can Depend On.",
}

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

/* Scroll-reveal wrapper: fades + slides/zooms children in once they enter the viewport */
type RevealDir = "up" | "left" | "right" | "zoom"
const hiddenCls: Record<RevealDir, string> = {
  up: "translate-y-8",
  left: "-translate-x-8",
  right: "translate-x-8",
  zoom: "scale-95",
}

function Reveal({
  children,
  className = "",
  dir = "up",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  dir?: RevealDir
  delay?: number
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [shown, setShown] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
        shown
          ? "translate-x-0 translate-y-0 scale-100 opacity-100"
          : `opacity-0 ${hiddenCls[dir]} motion-reduce:opacity-100`
      } ${className}`}
    >
      {children}
    </div>
  )
}

/* Written content shown under a feature card */
function DetailPanel({ d, icon: Icon }: { d: Detail; icon: LucideIcon }) {
  return (
    <Reveal className={`${wrap} mt-3 sm:mt-4`}>
      <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 lg:p-10">
        <div className="flex items-start gap-3 sm:gap-4">
          <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
            <Icon className="size-5" />
          </span>
          <div className="min-w-0">
            <h3 className="text-xl font-black leading-tight text-slate-900 sm:text-2xl lg:text-3xl">{d.title}</h3>
            <p className="mt-2 max-w-4xl text-sm leading-relaxed text-slate-600 sm:text-base">{d.intro}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:gap-5">
          {d.blocks.map((b, i) => (
            <Reveal key={b.heading} delay={(i % 2) * 120} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:p-5">
              <h4 className="mb-1.5 text-base font-bold text-slate-900 sm:text-lg">{b.heading}</h4>
              <p className="text-sm leading-relaxed text-slate-600">{b.body}</p>
            </Reveal>
          ))}
        </div>

        {d.list && (
          <div className="mt-6 rounded-2xl bg-slate-900 p-5 sm:p-6">
            <h4 className="mb-3 text-base font-bold text-white sm:text-lg">{d.listTitle}</h4>
            <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {d.list.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm font-semibold text-slate-100">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-violet-400" /> {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Reveal>
  )
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
            <Reveal dir={f.reverse ? "right" : "left"} className={`flex flex-col justify-center p-6 sm:p-8 lg:p-10 ${f.reverse ? "lg:order-2" : ""}`}>
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
            </Reveal>

            {/* image */}
            <Reveal dir="zoom" delay={150} className={`group relative h-[240px] overflow-hidden sm:h-[300px] lg:h-full ${f.reverse ? "lg:order-1" : ""}`}>
              <Image
                src={f.image}
                alt={f.imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                loading="lazy"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 motion-reduce:transition-none"
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
            </Reveal>
          </div>
        </div>
      </div>


      {f.detail && <DetailPanel d={f.detail} icon={f.icon} />}
    </section>
  )
}

/* Long-form content at the bottom of the page */
function BottomArticle() {
  return (
    <section id="thermal-support" className={`${sectionY} ${anchor}`}>
      <div className={wrap}>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 lg:p-12">
          {/* intro */}
          <Reveal className="mx-auto max-w-4xl text-center">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-700">
              <Sparkles className="size-3.5" /> {articleIntro.eyebrow}
            </span>
            <h2 className="mb-4 text-2xl font-black leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
              {articleIntro.title}
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {articleIntro.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>

          {/* sections */}
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:mt-10 lg:gap-6">
            {articleSections.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 120} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 sm:p-6">
                <h3 className="mb-3 text-lg font-black leading-snug text-slate-900 sm:text-xl">{s.title}</h3>
                <div className="space-y-3 text-sm leading-relaxed text-slate-600">
                  {s.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          {/* closing */}
          <Reveal dir="zoom" className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-6 text-center sm:p-8 lg:mt-10 lg:p-12">
            <h3 className="mb-4 text-xl font-black text-white sm:text-2xl lg:text-3xl">{articleClosing.title}</h3>
            <div className="mx-auto max-w-3xl space-y-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              {articleClosing.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-6 bg-gradient-to-r from-fuchsia-400 via-violet-400 to-sky-400 bg-clip-text text-base font-black text-transparent sm:text-lg lg:text-xl">
              {articleClosing.tagline}
            </p>
            <Link
              href={FORM}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-lg transition-transform hover:-translate-y-0.5 sm:text-base"
            >
              Book a Repair <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default function DeepCleaningThermalPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-800">
      {/* ================= HERO (compact: about half the screen) ================= */}
      <section className="relative isolate flex min-h-[420px] flex-col overflow-hidden bg-[#050816] text-white lg:min-h-[60vh]">
        <Image
          src={HERO_IMG}
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-hero-zoom -z-20 object-cover object-[70%_50%] lg:object-right"
        />
        {/* dark on the text side, clear on the image side */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#050816] via-[#050816]/85 to-[#050816]/20 lg:via-[#050816]/70 lg:to-transparent" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#050816]/80 via-transparent to-[#050816]/30" />

        <div className={`${wrap} flex flex-1 flex-col justify-center py-8 sm:py-10 lg:py-8`}>
          <div className="max-w-4xl">
            <p className="hero-in hero-d1 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-200 sm:text-sm">
              Expert
              <span className="h-px w-16 bg-gradient-to-r from-sky-400 to-transparent sm:w-28" />
            </p>

            <h1 className="hero-in hero-d2 mt-2 text-3xl font-black leading-[1.02] tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
              <span className="block text-white">DEEP CLEANING &amp;</span>
              <span className="block bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 bg-clip-text text-transparent">
                THERMAL SERVICE
              </span>
            </h1>

            <p className="hero-in hero-d3 mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-slate-300 sm:text-base lg:text-lg">
              <span>Clean</span>
              <span className="h-4 w-px bg-slate-500" />
              <span>Cool</span>
              <span className="h-4 w-px bg-slate-500" />
              <span>Perform Longer</span>
            </p>

            <ul className="hero-in hero-d4 mt-5 hidden max-w-3xl grid-cols-3 gap-2 sm:grid xl:grid-cols-6">
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

            <div className="hero-in hero-d5 mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href={FORM}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-violet-900/50 transition-transform hover:-translate-y-0.5"
              >
                Cool down your device today <ArrowRight className="size-4" />
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
            Run cooler,
            <br />
            last longer
          </span>
        </div>
      </section>

      {/* ================= BRANDS MARQUEE (coloured logos) ================= */}
      <div className="relative overflow-hidden border-b border-slate-200 bg-white py-4"><Link href={FORM}>
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
        </div></Link>
      </div>

      {/* ================= INTRO + QUICK LINKS ================= */}
      <section id="services" className="pb-1 pt-5 sm:pt-6 lg:pt-8">
        <div className={wrap}>
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-700">
              <Sparkles className="size-3.5" /> Thermal &amp; Maintenance Services
            </span>
            <h2 className="mb-2 text-2xl font-black text-slate-900 sm:text-3xl lg:text-4xl">Thermal &amp; Maintenance Solutions</h2>
            <p className="text-sm text-slate-500 sm:text-base">
              From deep dust extraction to extreme liquid metal cooling upgrades, we protect your hardware investment from heat damage.
            </p>
          </Reveal>

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

      {/* ================= BOTTOM CONTENT  ================= */}
      <BottomArticle />

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
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes heroZoom {
          from { transform: scale(1.08); }
          to { transform: scale(1); }
        }
        .hero-in { animation: heroIn 0.8s ease-out both; }
        .hero-d1 { animation-delay: 0.05s; }
        .hero-d2 { animation-delay: 0.15s; }
        .hero-d3 { animation-delay: 0.3s; }
        .hero-d4 { animation-delay: 0.45s; }
        .hero-d5 { animation-delay: 0.6s; }
        .animate-hero-zoom { animation: heroZoom 1.6s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee { animation: none; }
          .hero-in, .animate-hero-zoom { animation: none; }
        }
      `}</style>
    </div>
  )
}