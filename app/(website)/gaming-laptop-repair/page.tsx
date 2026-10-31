"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import {
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

/* Hero background */
const HERO_IMG = "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1793453779/Neon_Dragon_Gaming_PC_Workshop_kp2rjp.png"

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
  { label: "Screen Replacement", icon: Monitor },
  { label: "Keyboard & Trackpad", icon: Keyboard },
  { label: "Battery Replacement", icon: Battery },
  { label: "Motherboard Repair", icon: CircuitBoard },
  { label: "Charging Port Repair", icon: PlugZap },
  { label: "OEM-Grade Parts", icon: ShieldCheck },
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
    id: "screen-replacement",
    icon: Monitor,
    eyebrow: "Screen",
    title: "Laptop Screen",
    accent: "Replacement",
    text: "A cracked, bleeding or dead-pixel display ruins the game. We replace damaged laptop panels with IPS, OLED or high-refresh screens matched to your exact model.",
    items: ["High refresh rate panels", "OLED & IPS replacement", "Hinge & cable repair", "Dead pixel & bleed checks"],
    cta: "Book Screen Repair",
    image:
      "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1793453582/Broken_to_Brilliant__Laptop_Screen_Repair_akgwkj.png",
    imageAlt: "Cracked laptop screen being repaired",
    chip: "Panel matched to your model",
    tone: "light",
    detail: {
      title: "Laptop Screen Replacement Services",
      intro:
        "A cracked, bleeding or dead-pixel display ruins the gaming experience. We replace damaged laptop panels with high-refresh-rate IPS, OLED or TN screens that match your exact model's specifications, and we check the related parts so the new screen works properly from the start.",
      blocks: [
        {
          heading: "Panel Matching",
          body: "We match the replacement panel to your laptop's size, resolution, refresh rate and connector type. Where available for your model, this includes high refresh rate options such as 144Hz and 240Hz or higher, along with OLED and IPS panels.",
        },
        {
          heading: "Cracks, Bleed and Dead Pixels",
          body: "Physical cracks, backlight bleed, flickering and dead pixels each have different causes. We inspect the display and its connections before recommending a replacement, so the repair matches the actual fault.",
        },
        {
          heading: "Hinge Repair and Display Cable Reseating",
          body: "Loose or damaged hinges and worn display cables can cause flickering or a blank screen. We check the hinges and display cable, and reseat or replace them where needed to support a stable picture.",
        },
        {
          heading: "Testing After Replacement",
          body: "After the new panel is fitted, we check brightness, colour, dead pixels and backlight bleed, and confirm the refresh rate is working as expected. If anything is not right, we explain the findings and the next steps.",
        },
      ],
    },
  },
  {
    id: "keyboard-replacement",
    icon: Keyboard,
    eyebrow: "Keyboard & trackpad",
    title: "Keyboard & Trackpad",
    accent: "Replacement",
    text: "Spills, heavy gaming wear and dust can wreck a keyboard or trackpad. We replace keyboard modules and full palm rest assemblies so you never miss a keystroke.",
    items: ["Spill damage cleanup", "RGB ribbon cable fixes", "Palm rest replacement", "Trackpad restoration"],
    cta: "Book Keyboard Repair",
    image:
      "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1793453790/keyboard_ciopso.png",
    imageAlt: "Laptop keyboard replacement",
    chip: "Spill damage repair",
    tone: "dark",
    reverse: true,
    detail: {
      title: "Keyboard and Trackpad Replacement Services",
      intro:
        "Liquid spills, heavy gaming wear and dust build-up can destroy a laptop's keyboard or trackpad. We replace entire palm rest assemblies and individual keyboard modules so you never miss a keystroke, and we explain the options before any work begins.",
      blocks: [
        {
          heading: "Spill Damage Cleanup and Repair",
          body: "Liquid on a keyboard can reach connectors and components beneath it. We inspect the affected area, clean what can be cleaned and advise whether a keyboard replacement is enough or further checks are needed.",
        },
        {
          heading: "RGB Lighting Ribbon Cable Fixes",
          body: "If keyboard lighting flickers, shows only some zones or stops working, a loose or damaged ribbon cable can be the cause. We inspect the connection and repair or replace it where practical.",
        },
        {
          heading: "Full Palm Rest Assembly Replacements",
          body: "On many laptops the keyboard and palm rest are one assembly. Where that is the case, we replace the full assembly and check that the keys, trackpad and connections work properly afterwards.",
        },
        {
          heading: "Trackpad Sensitivity Restoration",
          body: "A trackpad that jumps, ignores clicks or responds poorly may need cleaning, reconnecting or replacement. We test the trackpad and recommend a suitable fix based on what we find.",
        },
      ],
    },
  },
  {
    id: "battery-replacement",
    icon: Battery,
    eyebrow: "Battery",
    title: "Laptop Battery",
    accent: "Replacement",
    text: "If your laptop dies when unplugged or the battery is swelling, it's time for a replacement. We safely fit high-capacity, OEM-grade batteries so you can game on the go.",
    items: ["Safe swollen battery removal", "OEM-grade cell replacement", "DC jack repair", "Power cycle testing"],
    cta: "Book Battery Service",
    image:
      "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1793453788/battery_a7vegq.png",
    imageAlt: "Swollen laptop battery inside an opened laptop",
    chip: "OEM-grade cells",
    tone: "light",
    detail: {
      title: "Laptop Battery Replacement Services",
      intro:
        "If your gaming laptop dies the moment it's unplugged, or the battery is bulging and pushing up the trackpad, it's time for a replacement. We safely install high-capacity, OEM-grade batteries to keep you gaming on the go. If you notice a swollen battery, stop charging the laptop and bring it to us.",
      blocks: [
        {
          heading: "Swollen Battery Safe Extraction and Disposal",
          body: "A swollen battery should be handled with care. Our technicians remove it safely from the laptop and arrange suitable disposal, and we check the surrounding parts for signs of pressure damage.",
        },
        {
          heading: "OEM-Grade Lithium-Ion Replacements",
          body: "We recommend compatible, quality batteries that suit your laptop model and its power requirements. We explain the available options so you can choose with confidence.",
        },
        {
          heading: "Charging Port (DC Jack) Repair",
          body: "Sometimes the battery is not the real problem. A loose or damaged charging port can stop a laptop from charging, so we inspect it and repair or replace it where needed.",
        },
        {
          heading: "Power Cycle Testing and Calibration",
          body: "After installation, we test charging and discharging to confirm the laptop runs and charges as expected. This helps make sure the new battery is working properly before you take the laptop home.",
        },
      ],
    },
  },
  {
    id: "motherboard-repair",
    icon: Cpu,
    eyebrow: "Motherboard",
    title: "Laptop Motherboard",
    accent: "Repair",
    text: "Overheating and power surges can damage laptop boards. Instead of replacing the whole board, we micro-solder burnt traces, faulty VRMs and shorted chips to save your machine.",
    items: ["Micro-soldering & SMD work", "Liquid damage board cleaning", "Short-circuit repair", "dGPU reflow & reballing"],
    cta: "Book Motherboard Repair",
    image:
      "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1793454191/High-Tech_Laptop_Motherboard_Repair_Lab_xywnak.png",
    imageAlt: "Circuit board close-up",
    chip: "Micro-soldering",
    tone: "dark",
    reverse: true,
    detail: {
      title: "Laptop Motherboard Repair Services",
      intro:
        "Laptops are prone to overheating and power surges that can damage motherboard components. Instead of replacing the whole expensive board, our micro-soldering experts repair burnt traces, faulty VRMs and shorted chips where it makes sense. Not every board fault is worth repairing, so we explain the options and discuss the cost with you before proceeding.",
      blocks: [
        {
          heading: "Micro-Soldering and SMD Component Replacement",
          body: "Many board faults come down to a single damaged component. We locate the fault and replace surface-mount parts with careful micro-soldering, rather than replacing the whole board when it is not needed.",
        },
        {
          heading: "Liquid Damage Board Cleaning",
          body: "Liquid can corrode connectors and components on the board. We inspect and clean the affected areas using ultrasonic board cleaning, then test the board to see which faults remain.",
        },
        {
          heading: "Burnt Trace and Short-Circuit Repair",
          body: "Power surges and shorts can burn traces and damage nearby components. Our technicians trace the fault, repair what can be repaired and explain clearly if a section of the board is beyond practical repair.",
        },
        {
          heading: "Dedicated GPU (dGPU) Reflowing and Reballing",
          body: "Heat over time can affect the solder connections of a dedicated graphics chip, leading to artifacts or no display. Where suitable, we perform reflowing or reballing and test the result before returning your laptop.",
        },
      ],
    },
  },
]

/* Bottom-of-page article content */
const articleIntro = {
  eyebrow: "Professional Gaming Laptop Repair and Support",
  title: "Complete Care for Your Gaming Laptop",
  paragraphs: [
    "A gaming laptop is built to be powerful and portable, but that combination puts a lot of pressure on its screen, keyboard, battery, cooling system and motherboard. When one part fails, the whole machine can be affected, and professional technical support can make all the difference.",
    "We provide reliable repair and maintenance services to help customers restore performance and extend the life of their laptops. Whether you are dealing with a broken screen, a dead battery, a damaged keyboard or a board-level fault, our focus is on finding the cause and recommending the right solution.",
    "Our goal is to make laptop repair simple and dependable through professional service and clear communication.",
  ],
}

const articleSections: { title: string; paragraphs: string[] }[] = [
  {
    title: "Professional Gaming Laptop Repair Services",
    paragraphs: [
      "Laptop problems can interrupt work, study and gaming. Identifying the actual cause of a fault is an important part of delivering an effective repair.",
      "Our technicians assess the reported issue and inspect the relevant components before recommending a suitable solution. Depending on the problem, the service may include component replacement, hardware troubleshooting or board-level repair.",
    ],
  },
  {
    title: "Cooling, Maintenance and Performance",
    paragraphs: [
      "Gaming laptops generate a lot of heat. Dust buildup, restricted airflow and ageing thermal paste can reduce performance and lead to unexpected shutdowns over time.",
      "Where necessary, we inspect fans, vents, heatsinks and thermal paste, and recommend practical solutions that support reliable performance without unnecessary replacements.",
    ],
  },
  {
    title: "Charging and Power Problems",
    paragraphs: [
      "If your laptop will not charge, loses power suddenly or only runs while plugged in, the cause may be the battery, the charger, the charging port or the board itself.",
      "We check each of these before recommending a repair, so the fix addresses the real problem rather than the most obvious part.",
    ],
  },
  {
    title: "Accurate Diagnostics and Technical Expertise",
    paragraphs: [
      "A reliable repair starts with a proper diagnosis. Problems such as no power, a blank display or repeated crashes do not always mean that the most obvious component is faulty.",
      "After the assessment, we explain the findings in clear language so you can make an informed decision. When replacement is the more practical option, we explain the reasons and discuss suitable alternatives before proceeding.",
    ],
  },
  {
    title: "Parts Availability and Compatibility",
    paragraphs: [
      "Parts availability and compatibility can vary between laptop models. For this reason, our recommendations are based on your actual device and the issue reported.",
      "When replacement parts are needed, we consider compatibility, suitability and quality before recommending the available options.",
    ],
  },
  {
    title: "Quality and Customer Confidence",
    paragraphs: [
      "We believe professional technical service should be built on honesty and clear communication. Before major repair work begins, we explain the proposed solution and the estimated cost, and if additional work is required, we discuss it with you first.",
      "Every device is handled with appropriate care. Existing damage may be recorded during inspection where relevant, and we encourage customers to share information about previous repairs, liquid damage or known faults.",
    ],
  },
  {
    title: "Upgrades and Maintenance",
    paragraphs: [
      "Regular maintenance can help keep your laptop operating efficiently. Depending on the model, this may include internal cleaning, cooling system inspection and thermal paste replacement when required.",
      "Where a model supports it, we can also advise on upgrades instead of replacing the entire laptop, based on hardware compatibility, current specifications and how you use the device.",
    ],
  },
  {
    title: "A Service Experience Built Around You",
    paragraphs: [
      "Every customer has different needs. Some need help with an unexpected fault, while others need routine maintenance or a performance upgrade.",
      "We aim to provide a service experience based on listening carefully, assessing the problem and explaining the available solutions. We value customer feedback and understand that trust is earned through dependable service and clear communication.",
    ],
  },
]

const articleClosing = {
  title: "Your Gaming Laptop Support Partner",
  paragraphs: [
    "Whether you need a new screen, a fresh battery, a keyboard replacement or a motherboard repair, our goal is to help you find a practical solution. We focus on careful assessment and professional service to address technical problems and support the reliable use of your laptop.",
    "We understand that your laptop is important to your work, entertainment and everyday activities. That is why we focus on responsible recommendations, transparent pricing discussions and attention to detail throughout the service process.",
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
    <section id="laptop-repair-support" className={`${sectionY} ${anchor}`}>
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

export default function GamingLaptopRepairPage() {
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
        {/* dark on the text side, clear on the PC side */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#050816] via-[#050816]/85 to-[#050816]/20 lg:via-[#050816]/70 lg:to-transparent" />

        <div className={`${wrap} flex flex-1 flex-col justify-center py-8 sm:py-10 lg:py-8`}>
          <div className="max-w-4xl">
            <p className="hero-in hero-d1 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-200 sm:text-sm">
              Expert
              <span className="h-px w-16 bg-gradient-to-r from-sky-400 to-transparent sm:w-28" />
            </p>

            <h1 className="hero-in hero-d2 mt-2 text-3xl font-black leading-[1.02] tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
              <span className="block text-white">GAMING LAPTOP</span>
              <span className="block bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 bg-clip-text text-transparent">
                REPAIR &amp; REPLACEMENT
              </span>
            </h1>

            <p className="hero-in hero-d3 mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-slate-300 sm:text-base lg:text-lg">
              <span>Restore</span>
              <span className="h-4 w-px bg-slate-500" />
              <span>Replace</span>
              <span className="h-4 w-px bg-slate-500" />
              <span>Play Anywhere</span>
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
                Get your laptop fixed today <ArrowRight className="size-4" />
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
              <Sparkles className="size-3.5" /> Gaming Laptop Services
            </span>
            <h2 className="mb-2 text-2xl font-black text-slate-900 sm:text-3xl lg:text-4xl">Comprehensive Repair Solutions</h2>
            <p className="text-sm text-slate-500 sm:text-base">
              From screen and battery replacements to advanced motherboard micro-soldering, we handle the critical repairs your gaming laptop needs.
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