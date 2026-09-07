"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Monitor,
  Keyboard,
  Battery,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Settings,
  Laptop,
  Wrench,
} from "lucide-react";

const services = [
  {
    id: "screen-replacement",
    title: "Screen Replacement",
    subtitle: "Restore your visual clarity and refresh rates.",
    description:
      "A cracked, bleeding, or dead-pixel display ruins the gaming experience. We replace damaged laptop panels with genuine, high-refresh-rate IPS, OLED, or TN screens matching your exact model's specifications.",
    icon: Monitor,
    image:
      "https://images.ctfassets.net/16nm6vz43ids/6RcSRkvOaAIxxg75iAtqt4/4e019d76080f109dbac8af5b7500055c/Cracked_laptop_screen_repair.png?fm=webp&q=65",
    features: [
      "High refresh rate panel matching (144Hz/240Hz+)",
      "OLED and IPS panel replacements",
      "Hinge repair and display cable reseating",
      "Dead pixel and backlight bleed checks",
    ],
    ctaText: "Book Screen Repair",
  },
  {
    id: "keyboard-replacement",
    title: "Keyboard & Trackpad Replacement",
    subtitle: "Fix sticky keys and unresponsive inputs.",
    description:
      "Liquid spills, heavy gaming wear, and dust buildup can destroy a laptop's keyboard or trackpad. We replace entire palm rest assemblies and individual mechanical/membrane keyboard modules so you never miss a keystroke.",
    icon: Keyboard,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtac3EpAz_DI2azTXZHRxzFL_zb6QxzSS8aTyiAG0YSfARxuQctrBfdKo&s=10",
    features: [
      "Spill damage cleanup and repair",
      "RGB lighting ribbon cable fixes",
      "Full palm rest assembly replacements",
      "Trackpad sensitivity restoration",
    ],
    ctaText: "Book Keyboard Repair",
  },
  {
    id: "battery-replacement",
    title: "Battery Replacement",
    subtitle: "Reclaim your mobility and battery life.",
    description:
      "If your gaming laptop dies the moment it's unplugged or the battery is bulging and pushing up the trackpad, it's time for a replacement. We safely install high-capacity, OEM-grade batteries to keep you gaming on the go.",
    icon: Battery,
    image:
      "https://thumbs.dreamstime.com/b/swollen-battery-broken-laptop-open-casing-closeup-heavy-damage-notebook-computer-diagnostics-repair-service-problem-pc-300236630.jpg",
    features: [
      "Swollen battery safe extraction & disposal",
      "OEM-grade lithium-ion cell replacements",
      "Charging port (DC Jack) repair",
      "Power cycle testing and calibration",
    ],
    ctaText: "Book Battery Service",
  },
  {
    id: "motherboard-repair",
    title: "Laptop Motherboard Repair",
    subtitle: "Advanced micro-soldering for dead laptops.",
    description:
      "Laptops are prone to overheating and power surges that can fry motherboard components. Instead of replacing the whole expensive board, our micro-soldering experts repair burnt traces, faulty VRMs, and shorted chips to save your machine.",
    icon: Cpu,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Micro-soldering and SMD component replacement",
      "Liquid damage ultrasonic board cleaning",
      "Burnt trace and short-circuit repair",
      "Dedicated GPU (dGPU) reflowing/reballing",
    ],
    ctaText: "Book Motherboard Repair",
  },
];

const brands = [
  "ALIENWARE",
  "RAZER",
  "ASUS ROG",
  "MSI",
  "LENOVO LEGION",
  "ACER PREDATOR",
  "HP OMEN",
  "GIGABYTE AORUS",
  "ALIENWARE",
  "RAZER",
  "ASUS ROG",
  "MSI",
  "LENOVO LEGION",
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

export default function GamingLaptopRepairPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-violet-200/50 blur-[90px] sm:h-[30rem] sm:w-[30rem]" />
          <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-indigo-100/70 blur-[90px] sm:h-[26rem] sm:w-[26rem]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[96rem] px-4 py-8 sm:px-6 sm:py-12 lg:px-10 lg:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-12">
            {/* Hero content */}
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-100 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-violet-700 sm:mb-5 sm:px-4 sm:py-2 sm:text-xs">
                <Laptop className="size-3.5 sm:size-4" />
                Professional Laptop Services
              </div>

              <h1 className="text-3xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl xl:text-7xl">
                Expert{" "}
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  Gaming Laptop
                </span>{" "}
                Repair.
              </h1>

              <p className="mt-4 max-w-xl text-sm font-medium leading-6 text-slate-600 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg">
                Is your portable rig suffering from a cracked screen, dead
                battery, or severe thermal throttling? Our technicians provide
                specialized hardware repairs to get your gaming laptop running
                like new.
              </p>

              <div className="mt-6 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:gap-3">
                <Link
                  href="/repair"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition-all hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-violet-600/30 active:scale-[0.98] sm:h-12 sm:rounded-full sm:px-8"
                >
                  Book a Repair
                  <ArrowRight className="size-4" />
                </Link>

                <a
                  href="#services-breakdown"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-800 transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] sm:h-12 sm:rounded-full sm:px-8"
                >
                  View Services
                </a>
              </div>

              {/* Trust */}
              <div className="mt-7 grid grid-cols-3 gap-2 border-t border-slate-200/80 pt-5 sm:mt-8 sm:gap-5 sm:pt-6">
                {trustItems.map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col items-center gap-1.5 text-center sm:flex-row sm:text-left"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
                      <item.icon className="size-4 text-violet-600" />
                    </div>

                    <span className="text-[9px] font-bold leading-3 text-slate-600 sm:text-xs sm:leading-4">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image */}
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-300/30 sm:rounded-3xl">
                <Image
                  src="https://images.priceoye.pk/asus-rog-strix-g513qm-gaming-laptop-amd-ryzen-9-5900hx-octa-core-processor-16gb-512gb-ssd-pakistan-priceoye-bof1q.jpg"
                  alt="Gaming laptop"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
              </div>

              <div className="absolute -inset-3 -z-10 rounded-3xl bg-[radial-gradient(#cbd5e1_1.5px,transparent_1.5px)] [background-size:16px_16px] opacity-60 sm:-inset-5" />
            </div>
          </div>
        </div>
      </section>

      {/* BRAND MARQUEE */}
      <section className="overflow-hidden border-b border-slate-800 bg-slate-950 py-5 sm:py-7">
        <p className="mb-4 px-4 text-center text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500 sm:mb-5 sm:text-xs">
          Authorized & Experienced with Premium Laptop Brands
        </p>

        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-slate-950 to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-slate-950 to-transparent sm:w-24" />

          <motion.div
            className="flex w-max items-center gap-8 px-4 sm:gap-12 sm:px-8 lg:gap-16"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30,
            }}
          >
            {brands.map((brand, index) => (
              <div
                key={`${brand}-${index}`}
                className="shrink-0 text-lg font-black tracking-tight text-slate-700 transition-colors hover:text-white sm:text-2xl lg:text-3xl"
              >
                {brand}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services-breakdown"
        className="scroll-mt-16 bg-white py-12 sm:py-16 lg:py-20"
      >
        <div className="mx-auto w-full max-w-[96rem] px-4 sm:px-6 lg:px-10">
          {/* Heading */}
          <div className="mx-auto mb-9 max-w-2xl text-center sm:mb-12 lg:mb-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-600">
              Laptop Repair Services
            </p>

            <h2 className="mt-1.5 text-2xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Comprehensive Repair Solutions
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
              From screen and battery replacements to advanced motherboard
              micro-soldering, we handle the critical repairs your gaming
              laptop needs.
            </p>
          </div>

          {/* Service list */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {services.map((service, index) => {
              const reversed = index % 2 !== 0;

              return (
                <article
                  key={service.id}
                  id={service.id}
                  className={`grid scroll-mt-20 items-center gap-7 lg:grid-cols-2 lg:gap-12 ${
                    reversed ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Content */}
                  <div className="max-w-xl">
                    <div className="mb-4 flex size-10 items-center justify-center rounded-xl border border-violet-100 bg-violet-50 text-violet-600 sm:size-12 sm:rounded-2xl">
                      <service.icon className="size-5 sm:size-6" />
                    </div>

                    <h3 className="text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                      {service.title}
                    </h3>

                    <p className="mt-2 text-sm font-bold text-violet-600 sm:text-base">
                      {service.subtitle}
                    </p>

                    <p className="mt-3 text-sm leading-6 text-slate-500 sm:mt-4 sm:text-base sm:leading-7">
                      {service.description}
                    </p>

                    <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-3">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-xs font-semibold leading-5 text-slate-700 sm:text-sm"
                        >
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-violet-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 border-t border-slate-100 pt-5">
                      <Link
                        href="/repair"
                        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-bold text-white transition-all hover:bg-violet-600 hover:shadow-lg hover:shadow-violet-600/20 active:scale-[0.98] sm:w-auto sm:rounded-full"
                      >
                        {service.ctaText}
                        <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="w-full">
                    <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-lg shadow-slate-200/30 sm:rounded-3xl">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-slate-950/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-slate-950 py-12 sm:py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0 bg-violet-900/20" />

        <div className="pointer-events-none absolute -right-20 -top-32 size-72 rounded-full bg-violet-600/25 blur-[100px] sm:size-96" />

        <div className="pointer-events-none absolute -bottom-32 -left-20 size-72 rounded-full bg-indigo-600/20 blur-[100px] sm:size-96" />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
          <div className="flex size-11 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-500/15 sm:size-14 sm:rounded-2xl">
            <Wrench className="size-5 text-violet-300 sm:size-6" />
          </div>

          <h2 className="mt-5 text-2xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to revive your rig?
          </h2>

          <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-violet-200/80 sm:text-base sm:leading-7">
            Drop off your laptop or schedule a pickup. We diagnose the issue
            and provide a transparent quote before any work begins.
          </p>

          <Link
            href="/repair"
            className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-6 text-sm font-bold text-white shadow-lg shadow-violet-500/20 transition-all hover:bg-violet-400 hover:shadow-violet-500/30 active:scale-[0.98] sm:mt-7 sm:h-12 sm:w-auto sm:rounded-full sm:px-8"
          >
            Book Your Repair Now
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}