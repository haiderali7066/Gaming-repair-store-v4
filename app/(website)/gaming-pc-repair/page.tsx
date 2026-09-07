
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Wrench,
  Search,
  Cpu,
  Zap,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Settings,
} from "lucide-react";

const services = [
  {
    id: "diagnostics",
    title: "Custom PC Diagnostics & Upgrades",
    subtitle: "Identify bottlenecks and boost your frames.",
    description:
      "Whether your PC is underperforming, crashing, or needs an upgrade, our diagnostic process tests every component under real-world and synthetic gaming loads to pinpoint the exact issue.",
    icon: Search,
    image:
      "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=1000&auto=format&fit=crop",
    features: [
      "CPU, GPU & RAM stress testing",
      "Thermal performance evaluation",
      "Hardware compatibility checks",
      "Bottleneck identification",
    ],
    ctaText: "Book Diagnostics",
  },
  {
    id: "hardware-repair",
    title: "Hardware Repair",
    subtitle: "Precision fixes for high-end components.",
    description:
      "From failing GPU fans to thermal issues, our technicians safely repair or replace damaged components using professional ESD-safe procedures.",
    icon: Wrench,
    image:
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1000&auto=format&fit=crop",
    features: [
      "GPU repasting & thermal pads",
      "AIO cooler diagnostics",
      "Storage cloning & recovery",
      "RAM testing & replacement",
    ],
    ctaText: "Book Hardware Repair",
  },
  {
    id: "motherboard-repair",
    title: "Motherboard Repair",
    subtitle: "Advanced board-level repair.",
    description:
      "A dead motherboard doesn't always mean a dead PC. Our technicians diagnose and repair damaged traces, capacitors, VRMs and other board-level components.",
    icon: Cpu,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
    features: [
      "CPU socket pin realignment",
      "Capacitor & VRM replacement",
      "Liquid damage cleaning",
      "BIOS flashing & reprogramming",
    ],
    ctaText: "Book Motherboard Repair",
  },
  {
    id: "power-supply-repair",
    title: "Power Supply Repair & Replacement",
    subtitle: "Stable power for maximum performance.",
    description:
      "Random shutdowns and instability can be caused by failing power delivery. We test your system and recommend the right replacement when necessary.",
    icon: Zap,
    image:
      "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Voltage rail testing",
      "Cable management",
      "Over-voltage diagnostics",
      "ATX 3.0 PSU upgrades",
    ],
    ctaText: "Book PSU Service",
  },
  {
    id: "virus-malware-removal",
    title: "Virus & Malware Removal",
    subtitle: "Secure your system and restore performance.",
    description:
      "Malware, background miners and unwanted software can seriously affect gaming performance. We remove threats and optimize your system without unnecessarily disturbing your game library.",
    icon: ShieldAlert,
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Rootkit & ransomware removal",
      "Gaming performance optimization",
      "OS integrity restoration",
      "Adware & bloatware cleanup",
    ],
    ctaText: "Book Malware Removal",
  },
];

const brands = [
  "NVIDIA",
  "AMD RYZEN",
  "INTEL CORE",
  "ASUS ROG",
  "MSI GAMING",
  "GIGABYTE AORUS",
  "CORSAIR",
  "NZXT",
  "RAZER",
  "LOGITECH G",
];

const trustItems = [
  {
    icon: ShieldCheck,
    title: "90-Day Warranty",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
  },
  {
    icon: Settings,
    title: "OEM Parts",
  },
];

export default function GamingPCRepairPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">

        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-32 size-[360px] rounded-full bg-violet-200/50 blur-[100px] sm:size-[500px]" />
          <div className="absolute -bottom-40 -left-32 size-[300px] rounded-full bg-indigo-100/60 blur-[90px] sm:size-[450px]" />
        </div>

        <div className="relative mx-auto max-w-[90rem] px-4 py-8 sm:px-6 sm:py-12 lg:px-10 lg:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-12">

            {/* Hero Content */}
            <div className="max-w-2xl">

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-violet-700 sm:mb-5 sm:px-4 sm:py-2 sm:text-xs">
                <Wrench className="size-3.5 sm:size-4" />
                Professional PC Services
              </div>

              <h1 className="text-3xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Expert{" "}
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  Gaming PC
                </span>{" "}
                Repair & Upgrades
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg">
                Professional diagnostics, hardware repair, upgrades and
                malware removal to get your gaming rig performing at its best.
              </p>

              {/* Buttons */}
              <div className="mt-6 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:gap-3">
                <Link
                  href="/repair"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700 hover:shadow-violet-600/30 active:scale-[0.98] sm:h-12 sm:px-7"
                >
                  Book a Repair
                  <ArrowRight className="size-4" />
                </Link>

                <a
                  href="#services-breakdown"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 active:scale-[0.98] sm:h-12 sm:px-7"
                >
                  Explore Services
                </a>
              </div>

              {/* Trust */}
              <div className="mt-7 grid grid-cols-3 gap-2 border-t border-slate-200 pt-5 sm:mt-8 sm:gap-5 sm:pt-6">
                {trustItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex items-center gap-1.5 sm:gap-2.5"
                    >
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-100 sm:size-9">
                        <Icon className="size-3.5 text-violet-600 sm:size-4" />
                      </div>

                      <span className="text-[9px] font-bold leading-3 text-slate-600 sm:text-xs sm:leading-4">
                        {item.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">

              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-300/30 sm:rounded-3xl">
                <Image
                  src="https://res.cloudinary.com/dvu9vmcqd/image/upload/v1786215933/setup2_ylsx6s.png"
                  alt="Gaming PC repair and custom hardware"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
              </div>

              {/* Decorative pattern */}
              <div className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl bg-[radial-gradient(#cbd5e1_1.5px,transparent_1.5px)] [background-size:16px_16px] opacity-60 sm:-inset-5 sm:[background-size:20px_20px]" />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BRANDS
      ====================================================== */}
      <section className="overflow-hidden border-b border-slate-800 bg-slate-950 py-6 sm:py-8">

        <p className="mb-4 text-center text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500 sm:mb-5 sm:text-xs">
          Trusted experience across premium gaming brands
        </p>

        <div className="relative overflow-hidden">

          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-950 to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-950 to-transparent sm:w-24" />

          <motion.div
            className="flex w-max items-center gap-8 whitespace-nowrap sm:gap-12 md:gap-16"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 28,
            }}
          >
            {[...brands, ...brands].map((brand, index) => (
              <span
                key={`${brand}-${index}`}
                className="text-base font-black tracking-tight text-slate-700 transition-colors hover:text-white sm:text-xl md:text-2xl"
              >
                {brand}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ====================================================== */}
      <section
        id="services-breakdown"
        className="scroll-mt-16 bg-white py-12 sm:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">

          {/* Heading */}
          <div className="mb-10 max-w-2xl sm:mb-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-600 sm:text-xs">
              Our services
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
              Complete PC repair solutions
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
              From routine upgrades to advanced board-level repairs, our
              technicians handle the hardware and software issues that matter.
            </p>
          </div>

          {/* Service List */}
          <div className="space-y-10 sm:space-y-14 lg:space-y-20">

            {services.map((service, index) => {
              const Icon = service.icon;
              const reversed = index % 2 !== 0;

              return (
                <article
                  key={service.id}
                  id={service.id}
                  className={`scroll-mt-20 grid items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12 ${
                    reversed ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >

                  {/* Image */}
                  <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 sm:rounded-3xl">

                    <div className="relative aspect-[16/10]">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-slate-950/35 via-transparent to-transparent" />
                    </div>

                    {/* Number */}
                    <span className="absolute left-3 top-3 flex size-8 items-center justify-center rounded-lg bg-white/90 text-xs font-black text-slate-900 shadow-sm backdrop-blur sm:left-4 sm:top-4 sm:size-9">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="max-w-xl">

                    <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-violet-100 sm:mb-5 sm:size-12 sm:rounded-2xl">
                      <Icon className="size-5 sm:size-6" />
                    </div>

                    <h3 className="text-xl font-black leading-tight tracking-tight text-slate-950 sm:text-2xl md:text-3xl">
                      {service.title}
                    </h3>

                    <p className="mt-2 text-sm font-bold text-violet-600 sm:text-base">
                      {service.subtitle}
                    </p>

                    <p className="mt-3 text-sm leading-6 text-slate-500 sm:mt-4 sm:text-base sm:leading-7">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-3">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-violet-500" />

                          <span className="text-xs font-semibold leading-5 text-slate-700 sm:text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="mt-5 sm:mt-6">
                      <Link
                        href="/repair"
                        className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-xs font-bold text-white transition hover:bg-violet-600 sm:h-11 sm:w-auto sm:text-sm"
                      >
                        {service.ctaText}
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="relative overflow-hidden bg-slate-950">

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 top-1/2 size-80 -translate-y-1/2 rounded-full bg-violet-700/20 blur-[100px]" />
          <div className="absolute -left-32 bottom-0 size-72 rounded-full bg-indigo-700/20 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:py-20">

          <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 sm:size-14">
            <Wrench className="size-6 text-violet-300 sm:size-7" />
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
            Ready to revive your rig?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
            Bring your system to our service center or schedule a pickup.
            We diagnose the issue and provide a transparent quote before
            starting any work.
          </p>

          <Link
            href="/repair"
            className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-6 text-sm font-bold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400 hover:shadow-violet-500/30 active:scale-[0.98] sm:mt-7 sm:h-12 sm:w-auto sm:px-8"
          >
            Book Your Repair
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
