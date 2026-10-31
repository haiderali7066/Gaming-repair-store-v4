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
    id: "diagnostics",
    icon: Search,
    eyebrow: "Diagnostics",
    title: "Expert PC",
    accent: "Diagnostics",
    text: "We test the CPU, GPU, memory, storage, power and cooling to find the real cause of the problem before recommending any repair or replacement. You get a clear explanation and your options upfront.",
    items: ["Full component testing", "Temperature & stress tests", "Clear written findings", "Options explained upfront"],
    cta: "Book a Diagnostic",
    image: "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1793294889/Neon_RGB_Gaming_Setup_htjtt4.png",
    imageAlt: "Gaming PC setup with curved monitor",
    chip: "Diagnostic",
    tone: "light",
  },
  {
    id: "hardware-repair",
    icon: Cpu,
    eyebrow: "Hardware",
    title: "CPU, GPU & Graphics Card",
    accent: "Repair",
    text: "Artifacts, crashes, overheating or no display? We service and repair graphics cards and processors with precision, and replace parts with quality components only when it is truly needed.",
    items: ["GPU & CPU repair", "Graphics card servicing", "Overheating fixes", "Quality replacement parts"],
    cta: "Repair My Hardware",
    image: "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1793294181/Neon_PC_Repair_Workshop_iu4gun.png",
    imageAlt: "High-end graphics card",
    chip: "Quality parts",
    tone: "dark",
    reverse: true,
    detail: {
      title: "CPU, GPU and Graphics Card Repair",
      intro:
        "At our company we provide professional CPU, GPU and graphics card repair services to help your computer perform smoothly and reliably. If your gaming PC has display problems, unexpected crashes, overheating, low performance or graphics errors, our technicians inspect the system to identify the root cause before recommending a suitable solution.",
      blocks: [
        {
          heading: "Professional CPU and GPU Repair",
          body: "The CPU and GPU are essential components of your computer. A faulty processor or graphics card can affect gaming performance, system stability and everyday use. We diagnose common hardware problems and check important components to determine whether repair, servicing or replacement is the best option.",
        },
        {
          heading: "Graphics Card Servicing",
          body: "Graphics cards handle the demanding visual performance required for modern gaming and professional applications. If your graphics card shows visual artifacts, screen flickering, driver crashes or no display, we perform careful diagnostic checks to identify possible issues. Our servicing may include inspection, cleaning, cooling checks and troubleshooting related hardware problems.",
        },
        {
          heading: "Overheating and Cooling Solutions",
          body: "Excessive heat can reduce performance and cause unexpected shutdowns. We inspect cooling fans, airflow, heatsinks and thermal paste where required. Our team works to identify the cause of overheating and recommends suitable solutions to help maintain stable temperatures and improve system reliability.",
        },
        {
          heading: "Hardware Testing and Reliable Repairs",
          body: "Before recommending any replacement we assess the affected components and explain the available options. When a part cannot be repaired or replacement is the more practical solution, we discuss the expected cost with you before proceeding. We focus on suitable quality components and careful installation.",
        },
      ],
      listTitle: "Our Repair Services Include",
      list: [
        "CPU and GPU fault diagnosis",
        "Graphics card inspection and servicing",
        "Screen artifact and no display troubleshooting",
        "Overheating and cooling problem solutions",
        "Performance and system stability checks",
        "Component replacement when necessary",
      ],
    },
  },
  {
    id: "motherboard-repair",
    icon: CircuitBoard,
    eyebrow: "Motherboard",
    title: "Motherboard",
    accent: "Repair",
    text: "The motherboard connects your CPU, GPU, RAM, storage and power system. When it develops a fault, your PC may not start or may shut down unexpectedly. We trace the fault and repair it where it makes sense, or advise on the best replacement.",
    items: ["No power & no POST repairs", "Port & socket repair", "Component-level diagnosis", "Repair or replacement advice"],
    cta: "Fix My Motherboard",
    image: "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1793191780/Neon_Motherboard_Repair_Lab_ookkmf.png",
    imageAlt: "Motherboard with processor",
    chip: "Component-level repair",
    tone: "light",
    detail: {
      title: "Motherboard Repair Services",
      intro:
        "We provide professional motherboard repair services to help restore your computer's stability and performance. The motherboard connects important components such as the CPU, GPU, RAM, storage and power system. When it develops a fault, your computer may fail to start or experience unexpected shutdowns and hardware problems.",
      blocks: [
        {
          heading: "No Power and No POST Repairs",
          body: "If your PC does not turn on or starts without displaying anything, our technicians perform diagnostic checks to identify the possible cause. We inspect power connections and related components to determine whether the issue comes from the motherboard or another part of the system. We also troubleshoot no POST problems where the computer powers on but fails to complete its startup process.",
        },
        {
          heading: "Port and Socket Repair",
          body: "Damaged or faulty ports and sockets can affect the way your computer connects with other devices. We inspect common connection problems involving USB ports and other motherboard connections. Where practical, we assess whether the affected component can be repaired or requires replacement.",
        },
        {
          heading: "Component-Level Diagnosis",
          body: "Motherboard problems can be caused by damaged components, electrical faults, overheating or physical damage. Our technicians carefully inspect the board and test relevant areas to locate the fault. We explain the findings clearly and recommend a suitable repair based on the condition of the motherboard.",
        },
        {
          heading: "Repair or Replacement Advice",
          body: "Not every motherboard fault can be repaired economically. We assess the issue and explain the available options before proceeding with major work. If a repair is not practical, we can advise you on a suitable replacement based on your computer's specifications and requirements. Any recommended repair or replacement cost is discussed with you beforehand.",
        },
      ],
    },
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
    detail: {
      title: "Power Supply Services",
      intro:
        "We offer power supply services to help keep your gaming PC or desktop computer running safely and reliably. The power supply unit (PSU) delivers electricity to essential components including the motherboard, CPU, GPU and storage devices. A faulty or unstable power supply can cause unexpected shutdowns, startup failures and performance issues. Our technicians inspect the power system to identify problems and recommend the right solution for your computer.",
      blocks: [
        {
          heading: "PSU Testing and Diagnosis",
          body: "If your PC does not turn on, restarts unexpectedly or shuts down during gaming, our technicians check the power supply and related connections. We assess power delivery and perform appropriate diagnostic tests to identify signs of an unstable or failing unit. Our goal is to find the cause of the problem before recommending a replacement.",
        },
        {
          heading: "Power Supply Replacement",
          body: "A faulty power supply may need replacement to restore reliable operation. We help you choose a suitable PSU based on your computer specifications and power requirements, focusing on compatible quality units that provide adequate power for your components. For safety we recommend replacing a defective unit rather than attempting unsuitable internal repairs.",
        },
        {
          heading: "Cable and Connector Inspection",
          body: "Loose, damaged or incorrectly connected power cables can affect system stability. Our technicians inspect relevant cables and connectors to identify visible damage or connection problems. We also check that the power supply is properly connected to the motherboard, graphics card and other supported components.",
        },
        {
          heading: "Wattage Advice for Upgrades",
          body: "Planning to upgrade your graphics card, CPU or other hardware? We help you understand your system's power requirements and select an appropriate power supply. Choosing the correct wattage and suitable connectors helps support stable operation and future upgrades.",
        },
      ],
    },
  },
]

/* Bottom-of-page article content */
const articleIntro = {
  eyebrow: "Professional Technology Repair and Support",
  title: "Complete Technology Solutions for Modern Needs",
  paragraphs: [
    "Technology plays an important role in our daily lives. From high-performance gaming computers and professional workstations to laptops and tablets, we depend on our devices for work and entertainment. When a device develops a fault or fails to perform as expected, professional technical support can make all the difference.",
    "We provide reliable technology repair and maintenance services to help customers restore performance and extend the life of their devices. Our services cover gaming PCs and desktop computers along with laptops and iPads. Whether you are experiencing hardware problems, software issues or reduced system performance, our focus is on finding the cause and recommending the right solution.",
    "Our goal is to make technology repair simple and dependable through professional service and clear communication.",
  ],
}

const articleSections: { title: string; paragraphs: string[] }[] = [
  {
    title: "Professional Computer Repair Services",
    paragraphs: [
      "Computer problems can affect productivity and everyday use. Unexpected shutdowns, slow performance or startup failures may have several possible causes. Identifying the actual problem is an important part of delivering an effective repair.",
      "We provide diagnostic and repair services for desktop computers and gaming systems. Our technicians assess the reported issue and inspect the relevant components before recommending a suitable solution. Depending on the problem, the service may include hardware troubleshooting, component servicing or replacement of faulty parts.",
      "We also help customers improve their systems through suitable hardware upgrades. These may include memory upgrades, storage improvements or graphics card replacements. Every recommendation is based on system compatibility and the customer's needs.",
    ],
  },
  {
    title: "Gaming PC Maintenance and Performance",
    paragraphs: [
      "Gaming computers require proper cooling and stable power to perform reliably. Demanding games and applications can place additional pressure on the processor and graphics card.",
      "Our gaming PC services include system diagnostics and overheating troubleshooting along with graphics card inspection and motherboard fault investigation. We also check power supply problems and other issues that may cause unexpected crashes or reduced performance.",
      "Regular maintenance can help reduce dust buildup and identify cooling problems. Where necessary, we inspect fans, airflow, heatsinks and thermal paste. We recommend practical solutions that support reliable performance without unnecessary replacements.",
      "For customers planning an upgrade, we provide guidance on compatible components and power requirements. Our aim is to help you choose improvements that suit your system and budget.",
    ],
  },
  {
    title: "Laptop and iPad Repair Solutions",
    paragraphs: [
      "Laptops and iPads are essential for work, education and communication. A damaged screen, charging problem or battery fault can interrupt your daily routine.",
      "We provide repair assessments and technical support for laptops and iPads. Depending on the device and its condition, our services may include screen replacement, charging port inspection and battery diagnosis along with hardware troubleshooting and software support.",
      "Every device is assessed according to its specific requirements. We explain the available options and help customers understand whether repair or replacement is the better choice.",
      "Parts availability and compatibility can vary between models. For this reason our recommendations are based on the actual device and the issue reported.",
    ],
  },
  {
    title: "Accurate Diagnostics and Technical Expertise",
    paragraphs: [
      "A reliable repair starts with a proper diagnosis. Problems such as no power, a blank display or repeated crashes do not always mean that the most obvious component is faulty.",
      "Our diagnostic process focuses on the reported symptoms and the components related to the issue. Depending on the device, we may check power delivery, memory, storage, cooling systems and motherboard connections.",
      "After the assessment we explain the findings in clear language. Our goal is to help customers understand the problem and make an informed decision about the recommended repair.",
      "Not every component can be repaired economically. When replacement is the more practical option, we explain the reasons and discuss suitable alternatives before proceeding.",
    ],
  },
  {
    title: "Quality and Customer Confidence",
    paragraphs: [
      "We believe professional technical service should be built on honesty and clear communication. Customers deserve to understand what has been identified and what work is being recommended.",
      "Before major repair work begins, we explain the proposed solution and the estimated cost. If additional work is required, we discuss it with the customer before proceeding.",
      "We aim to avoid unnecessary repairs and focus on solutions that address the actual problem. When replacement parts are needed, we consider compatibility, suitability and quality before recommending available options.",
      "Every device is handled with appropriate care. Existing damage may be recorded during inspection where relevant. Customers are encouraged to share information about previous repairs, liquid damage or known faults to help us assess the device accurately.",
    ],
  },
  {
    title: "Maintenance and Hardware Upgrades",
    paragraphs: [
      "Regular maintenance can help keep compatible devices operating efficiently. Dust buildup, restricted airflow and ageing components may affect performance over time.",
      "Our maintenance services focus on identifying these problems and recommending suitable action. Depending on the device, this may include internal cleaning, cooling system inspection and thermal paste replacement when required.",
      "We also assist customers who want to upgrade their existing systems instead of replacing the entire computer. Before recommending an upgrade, we consider hardware compatibility, current specifications and the intended use of the device.",
      "This helps customers understand their options and make informed decisions about their investment.",
    ],
  },
  {
    title: "Trade-In and Buy-Back Services",
    paragraphs: [
      "As technology develops, customers may wish to sell or trade in equipment they no longer use. Our trade-in and buy-back services offer an option for customers who want to move on from eligible devices.",
      "Eligibility and valuation depend on the model, age, condition and functionality of the device. Any offer is subject to inspection and the applicable terms.",
      "Before handing over a device, customers should back up important information and remove personal accounts where appropriate. Trade-in arrangements should be confirmed with our team so that the process and relevant conditions are clear.",
    ],
  },
  {
    title: "A Service Experience Built Around You",
    paragraphs: [
      "Every customer has different needs. Some customers require help with an unexpected fault while others may need routine maintenance or a performance upgrade.",
      "We aim to provide a service experience based on listening carefully, assessing the problem and explaining the available solutions. Our priority is to make technical support easier to understand while maintaining a professional approach to every repair.",
      "We value customer feedback and understand that trust is earned through dependable service and clear communication.",
    ],
  },
]

const articleClosing = {
  title: "Your Technology Support Partner",
  paragraphs: [
    "Whether you need help with a gaming PC, desktop computer, laptop or iPad, our goal is to help you find a practical solution. We focus on careful assessment and professional service to address technical problems and support the reliable use of your devices.",
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
    <section id="technology-repair-support" className={`${sectionY} ${anchor}`}>
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

export default function GamingPCRepairPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-800">
      {/* ================= HERO (compact: about half the screen) ================= */}
      <section className="relative isolate flex min-h-[420px] flex-col overflow-hidden bg-[#050816] text-white lg:min-h-[60vh]">
        <Image
          src="https://res.cloudinary.com/dvu9vmcqd/image/upload/v1792816921/hero-bg_gqfshv.jpg"
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
              <span className="block text-white">GAMING PC</span>
              <span className="block bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 bg-clip-text text-transparent">
                REPAIR &amp; UPGRADES
              </span>
            </h1>

            <p className="hero-in hero-d3 mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-slate-300 sm:text-base lg:text-lg">
              <span>Restore</span>
              <span className="h-4 w-px bg-slate-500" />
              <span>Upgrade</span>
              <span className="h-4 w-px bg-slate-500" />
              <span>Maximize Performance</span>
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
              <Sparkles className="size-3.5" /> Gaming PC Services
            </span>
            <h2 className="mb-2 text-2xl font-black text-slate-900 sm:text-3xl lg:text-4xl">Everything Inside Your Rig</h2>
            <p className="text-sm text-slate-500 sm:text-base">
              From a PC that won&apos;t boot to a full performance upgrade, we diagnose first and repair with precision.
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