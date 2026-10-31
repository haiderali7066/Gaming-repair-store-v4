"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Tablet,
  Battery,
  Zap,
  Droplets,
  PenTool,
  ShieldCheck,
  ArrowRight,
  Settings,
  CheckCircle2,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

/* Every call-to-action on this page goes to the repair form */
const FORM = "/repair#repair-form"

/* Hero background */
const HERO_IMG = "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1793458792/Neon_iPad_Repair_Workshop_setmdd.png"

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
  { label: "Screen & Digitizer", icon: Tablet },
  { label: "Battery Replacement", icon: Battery },
  { label: "Charging Port Repair", icon: Zap },
  { label: "Water Damage Repair", icon: Droplets },
  { label: "Apple Pencil Testing", icon: PenTool },
  { label: "Premium Parts", icon: ShieldCheck },
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
    icon: Tablet,
    eyebrow: "Screen & digitizer",
    title: "Screen & Digitizer",
    accent: "Replacement",
    text: "A shattered iPad screen is unsafe and ruins your productivity. We replace broken glass, digitizers and damaged panels to restore display quality and touch accuracy.",
    items: ["Glass & digitizer replacement", "LCD and OLED panel swaps", "True Tone restoration*", "Apple Pencil testing"],
    cta: "Book Screen Repair",
    image:
      "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1793458000/ipad_gcpexq.png",
    imageAlt: "iPad screen replacement",
    chip: "Touch accuracy restored",
    tone: "light",
    detail: {
      title: "iPad Screen and Digitizer Replacement Services",
      intro:
        "A shattered iPad screen is dangerous and ruins your productivity. We replace broken glass digitizers and damaged LCD or OLED panels with high-quality parts to restore display quality and touch accuracy. *True Tone restoration applies where the model and part allow it, and we explain what is possible for your device before work begins.",
      blocks: [
        {
          heading: "Broken Glass and Digitizer Replacement",
          body: "Cracked glass can affect touch response and may be unsafe to handle. We assess the damage and replace the glass and digitizer where needed, so the screen responds accurately again.",
        },
        {
          heading: "LCD and OLED Panel Swaps",
          body: "If the display itself is damaged, with lines, dark patches or colour problems, the panel may need replacing. We recommend a suitable replacement based on your iPad model and the condition of the display.",
        },
        {
          heading: "True Tone Restoration Where Applicable",
          body: "Some display features, such as True Tone, depend on the model and the replacement part. Where it is possible, we work to restore these features, and we are upfront about any limits for your device.",
        },
        {
          heading: "Apple Pencil Sensitivity Testing",
          body: "If you use an Apple Pencil, we test it with the repaired screen to check that touch and pen input respond properly before the device is returned to you.",
        },
      ],
    },
  },
  {
    id: "battery-replacement",
    icon: Battery,
    eyebrow: "Battery",
    title: "iPad Battery",
    accent: "Replacement",
    text: "If your iPad drains quickly, shuts down randomly or takes forever to charge, it's time for a new battery. We safely replace degraded cells with premium, high-capacity batteries.",
    items: ["Premium cell replacement", "Swollen battery safe removal", "Battery health testing", "Charging calibration"],
    cta: "Book Battery Service",
    image: "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1793457999/ipad_battery_sexezh.png",
    imageAlt: "iPad battery replacement",
    chip: "All-day battery life",
    tone: "dark",
    reverse: true,
    detail: {
      title: "iPad Battery Replacement Services",
      intro:
        "If your iPad is draining quickly, shutting down randomly or taking forever to charge, it's time for a new battery. We safely replace degraded cells with premium, high-capacity batteries and test the result before returning your device. If you notice the screen lifting or the case bulging, stop charging the iPad and bring it to us.",
      blocks: [
        {
          heading: "Premium Lithium-Ion Cell Replacement",
          body: "We recommend compatible, quality batteries that suit your iPad model. We explain the available options so you can choose with confidence.",
        },
        {
          heading: "Swollen Battery Safe Removal",
          body: "A swollen battery should be handled with care. Our technicians remove it safely and check the surrounding parts, such as the screen and case, for signs of pressure damage.",
        },
        {
          heading: "Battery Health and Cycle Testing",
          body: "Before recommending a replacement, we check the battery's condition and charge behaviour, so you know whether the battery really is the cause of the problem.",
        },
        {
          heading: "Optimal Charging Calibration",
          body: "After installation, we test charging and discharging to confirm the iPad charges and runs as expected before you take it home.",
        },
      ],
    },
  },
  {
    id: "charging-port-repair",
    icon: Zap,
    eyebrow: "Charging port",
    title: "Charging Port",
    accent: "Repair",
    text: "Dust, debris and wear can damage Lightning or USB-C ports. We clean, repair or micro-solder replacement ports to the logic board and test charging performance.",
    items: ["Lightning & USB-C replacement", "Debris extraction & cleaning", "Logic board micro-soldering", "Voltage & fast-charge tests"],
    cta: "Book Port Repair",
    image:
      "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1793457995/ipad_charging_fieygq.png",
    imageAlt: "iPad charging port repair",
    chip: "Fast-charge tested",
    tone: "light",
    detail: {
      title: "iPad Charging Port Repair Services",
      intro:
        "Dust, debris and physical wear can damage Lightning or USB-C ports. We clean, repair or micro-solder replacement ports directly to the logic board and test charging performance. We check the simple causes first, so you only get a more involved repair when it is really needed.",
      blocks: [
        {
          heading: "Lightning and USB-C Port Replacement",
          body: "If the port is loose, bent or damaged, charging and data connections can become unreliable. We replace the port where needed and check that cables connect firmly afterwards.",
        },
        {
          heading: "Debris Extraction and Deep Cleaning",
          body: "Lint and dust can build up inside the port and stop cables from connecting fully. We carefully clean the port and test charging before recommending anything further.",
        },
        {
          heading: "Micro-Soldering Logic Board Connections",
          body: "When a port is attached to the logic board, a repair may need careful micro-soldering. Our technicians inspect the connections and repair them where it is practical to do so.",
        },
        {
          heading: "Voltage and Fast-Charge Testing",
          body: "After the repair, we test the charging voltage and charging speed to confirm the iPad charges reliably.",
        },
      ],
    },
  },
  {
    id: "water-damage-repair",
    icon: Droplets,
    eyebrow: "Water damage",
    title: "Water & Liquid Damage",
    accent: "Repair",
    text: "Liquid damage needs quick attention. We open the device, clean the logic board, remove corrosion and check for short circuits and data recovery options.",
    items: ["Ultrasonic board cleaning", "Corrosion removal", "Short-circuit repair", "Data recovery assessment"],
    cta: "Book Water Damage Repair",
    image:
      "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1793457994/ipad_water_khjups.png",
    imageAlt: "Liquid damaged iPad logic board",
    chip: "Ultrasonic board cleaning",
    tone: "dark",
    reverse: true,
    detail: {
      title: "Water and Liquid Damage Repair Services",
      intro:
        "Liquid damage requires quick attention. If your iPad has been exposed to liquid, switch it off and avoid charging it, then bring it to us as soon as you can. We disassemble the device, perform ultrasonic logic board cleaning, remove corrosion, and assess the board for short circuits and data recovery. Results depend on the extent of the damage, and we explain what we find before going further.",
      blocks: [
        {
          heading: "Ultrasonic Logic Board Cleaning",
          body: "We remove the logic board and clean it using ultrasonic cleaning, which helps reach residue and liquid in places that are difficult to clean by hand.",
        },
        {
          heading: "Corrosion and Rust Elimination",
          body: "Corrosion can keep spreading and cause new faults over time. We inspect connectors and components, and remove corrosion where it can be safely treated.",
        },
        {
          heading: "Short-Circuit Detection and Repair",
          body: "Liquid can cause shorts that stop an iPad from turning on or charging. Our technicians locate the fault and repair what can be repaired, explaining clearly if a part is beyond practical repair.",
        },
        {
          heading: "Data Recovery Assessment",
          body: "If your data matters, tell us at the start. We assess whether the device can be brought back to a working state for data recovery, though we cannot promise a result in every case.",
        },
      ],
    },
  },
]

/* Bottom-of-page article content */
const articleIntro = {
  eyebrow: "Professional iPad and Tablet Repair and Support",
  title: "Complete Care for Your iPad and Tablet",
  paragraphs: [
    "iPads and tablets are essential for work, education, creativity and entertainment. A damaged screen, a failing battery or a faulty charging port can interrupt your daily routine, and professional technical support can make all the difference.",
    "We provide reliable repair services to help customers restore performance and extend the life of their devices. Whether you are dealing with a shattered screen, short battery life, a port that will not charge or liquid damage, our focus is on finding the cause and recommending the right solution.",
    "Our goal is to make tablet repair simple and dependable through professional service and clear communication.",
  ],
}

const articleSections: { title: string; paragraphs: string[] }[] = [
  {
    title: "Professional iPad and Tablet Repair Services",
    paragraphs: [
      "Tablet problems can affect productivity and everyday use. Identifying the actual cause of a fault is an important part of delivering an effective repair.",
      "Our technicians assess the reported issue and inspect the relevant components before recommending a suitable solution. Depending on the device and its condition, the service may include screen replacement, battery diagnosis, charging port inspection and hardware troubleshooting.",
    ],
  },
  {
    title: "Screen, Touch and Display Problems",
    paragraphs: [
      "Cracked glass, unresponsive touch, lines on the display or dark patches can all have different causes. We inspect the device before recommending a repair, so the solution matches the actual fault.",
      "After a screen repair, we test touch accuracy and, where relevant, Apple Pencil response, so you can be confident the device works as expected.",
    ],
  },
  {
    title: "Battery and Charging Problems",
    paragraphs: [
      "If your tablet will not charge, loses power quickly or shuts down unexpectedly, the cause may be the battery, the charging port or the logic board.",
      "We check each of these before recommending a repair, so the fix addresses the real problem rather than the most obvious part.",
    ],
  },
  {
    title: "Accurate Diagnostics and Technical Expertise",
    paragraphs: [
      "A reliable repair starts with a proper diagnosis. Problems such as no power, a blank display or repeated restarts do not always mean that the most obvious component is faulty.",
      "After the assessment, we explain the findings in clear language so you can make an informed decision. When replacement is the more practical option, we explain the reasons and discuss suitable alternatives before proceeding.",
    ],
  },
  {
    title: "Parts Availability and Compatibility",
    paragraphs: [
      "Parts availability and compatibility can vary between iPad and tablet models. For this reason, our recommendations are based on your actual device and the issue reported.",
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
    title: "Data, Backups and Privacy",
    paragraphs: [
      "Your tablet often holds personal files, photos and accounts. Where possible, back up important information before handing over your device.",
      "Please discuss any concerns about your data with our team before the repair begins, so the process and any relevant conditions are clear.",
    ],
  },
  {
    title: "A Service Experience Built Around You",
    paragraphs: [
      "Every customer has different needs. Some need help with an unexpected fault, while others need routine maintenance or a performance improvement.",
      "We aim to provide a service experience based on listening carefully, assessing the problem and explaining the available solutions. We value customer feedback and understand that trust is earned through dependable service and clear communication.",
    ],
  },
]

const articleClosing = {
  title: "Your iPad and Tablet Support Partner",
  paragraphs: [
    "Whether you need a new screen, a fresh battery, a charging port repair or help after liquid damage, our goal is to help you find a practical solution. We focus on careful assessment and professional service to address technical problems and support the reliable use of your device.",
    "We understand that your tablet is important to your work, learning, creativity and everyday activities. That is why we focus on responsible recommendations, transparent pricing discussions and attention to detail throughout the service process.",
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
    <section id="ipad-repair-support" className={`${sectionY} ${anchor}`}>
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

export default function IPadRepairPage() {
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
        {/* dark on the text side, clear on the iPad side */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#050816] via-[#050816]/85 to-[#050816]/20 lg:via-[#050816]/70 lg:to-transparent" />
       

        <div className={`${wrap} flex flex-1 flex-col justify-center py-8 sm:py-10 lg:py-8`}>
          <div className="max-w-4xl">
            <p className="hero-in hero-d1 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-200 sm:text-sm">
              Expert
              <span className="h-px w-16 bg-gradient-to-r from-sky-400 to-transparent sm:w-28" />
            </p>

            <h1 className="hero-in hero-d2 mt-2 text-3xl font-black leading-[1.02] tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
              <span className="block text-white">iPAD &amp; TABLET</span>
              <span className="block bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 bg-clip-text text-transparent">
                REPAIR SERVICES
              </span>
            </h1>

            <p className="hero-in hero-d3 mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-slate-300 sm:text-base lg:text-lg">
              <span>Restore</span>
              <span className="h-4 w-px bg-slate-500" />
              <span>Replace</span>
              <span className="h-4 w-px bg-slate-500" />
              <span>Create Anywhere</span>
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
                Get your iPad fixed today <ArrowRight className="size-4" />
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
            Create
            <br />
            anywhere
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
              <Sparkles className="size-3.5" /> iPad &amp; Tablet Services
            </span>
            <h2 className="mb-2 text-2xl font-black text-slate-900 sm:text-3xl lg:text-4xl">Comprehensive Repair Solutions</h2>
            <p className="text-sm text-slate-500 sm:text-base">
              From shattered glass and battery replacement to charging and liquid damage repair, we use professional tools and proven techniques to restore your device.
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