"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Wrench,
  ShieldCheck,
  Zap,
  MonitorSmartphone,
  Cpu,
  Clock,
  CheckCircle2,
  ArrowRight,
  Star,
  MapPin,
  Phone,
  Mail,
  ShoppingCart,
  Gamepad2,
  ChevronDown,
  MessageSquare,
  Quote,
  Award,
  ThumbsUp,
  Sparkles,
  HandCoins,
  Settings,
  type LucideIcon,
} from "lucide-react";

/* ================================================================== */
/* DATA                                                               */
/* ================================================================== */

/* Same brand logos + colours as the service pages */
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
];

const stats = [
  { value: "4.9/5", label: "Customer rating" },
  { value: "90 Days", label: "Repair warranty" },
  { value: "24–48h", label: "Typical turnaround" },
  { value: "100%", label: "Upfront quotes" },
];

const services: { title: string; desc: string; icon: LucideIcon }[] = [
  {
    title: "Gaming PC Repair",
    desc: "Diagnostics, hardware faults, upgrades, overheating and performance issues.",
    icon: Cpu,
  },
  {
    title: "Gaming Laptop",
    desc: "Screen, battery, charging, keyboard, cooling and hardware repairs.",
    icon: MonitorSmartphone,
  },
  {
    title: "PC & Laptop",
    desc: "Hardware, software, Windows, storage, RAM and general troubleshooting.",
    icon: Wrench,
  },
  {
    title: "GPU Repair",
    desc: "Graphics card diagnostics, cooling and performance-related issues.",
    icon: Zap,
  },
  {
    title: "iPad & Console",
    desc: "Gaming console diagnostics, hardware and software services.",
    icon: Gamepad2,
  },
  {
    title: "Maintenance",
    desc: "Deep cleaning, thermal paste replacement and performance maintenance.",
    icon: CheckCircle2,
  },
];

const whyChooseUsItems: { title: string; desc: string; icon: LucideIcon }[] = [
  {
    title: "Certified Experts",
    desc: "Our technicians are specialized and experienced in high-end gaming hardware and complex board-level repairs.",
    icon: ShieldCheck,
  },
  {
    title: "Fast Turnaround",
    desc: "We value your gaming time. Most diagnostics and repairs are completed swiftly without compromising quality.",
    icon: Clock,
  },
  {
    title: "Genuine Parts",
    desc: "We use only high-grade, original, or premium manufacturer-approved replacement components.",
    icon: Award,
  },
  {
    title: "Transparent Pricing",
    desc: "No hidden costs. Upfront quotes provided and we only proceed after your complete approval.",
    icon: ThumbsUp,
  },
];

const processSteps = [
  {
    step: "01",
    title: "Book Repair",
    desc: "Tell us about your device and the issue online or in-store.",
  },
  {
    step: "02",
    title: "Diagnosis",
    desc: "Our technicians run deep diagnostics to pinpoint the exact fault.",
  },
  {
    step: "03",
    title: "Approval",
    desc: "We provide a clear quote and proceed only with your approval.",
  },
  {
    step: "04",
    title: "Fix & Test",
    desc: "Professional repair followed by rigorous stress testing.",
  },
  {
    step: "05",
    title: "Collection",
    desc: "Pick up your functional device, backed by our warranty.",
  },
];

const specialistList = [
  "Performance upgrades",
  "Thermal paste replacement",
  "RAM & SSD upgrades",
  "Cooling solutions",
  "GPU upgrades",
  "Windows & software setup",
  "CPU upgrades",
  "Gaming PC maintenance",
];

const shopCategories = [
  "Pre-Built Rigs",
  "Custom Builds",
  "Graphics Cards",
  "Processors",
  "Gaming Laptops",
  "Peripherals",
];

const testimonials = [
  {
    name: "Ahmed K.",
    role: "Esports Player",
    text: "My liquid cooler leaked and ruined my motherboard. Al Dana fixed it in 2 days and saved my GPU. Legends.",
  },
  {
    name: "Sarah M.",
    role: "Content Creator",
    text: "Traded in my old MSI laptop for a custom build. The buy-back price was fair, and the new PC runs Warzone flawlessly.",
  },
  {
    name: "Tariq R.",
    role: "Casual Gamer",
    text: "Fast, transparent, and fairly priced. They even cleaned up my cable management for free. Highly recommended shop.",
  },
];

const faqs = [
  {
    q: "How long does a typical gaming PC repair take?",
    a: "Most standard repairs and upgrades are completed within 24-48 hours. Complex motherboard or GPU component repairs might take 3-5 days depending on parts availability.",
  },
  {
    q: "Do you offer a warranty on your repairs?",
    a: "Yes, we offer a 90-day warranty on all repairs and replacement parts. If the same issue occurs within this period, we fix it free of charge.",
  },
  {
    q: "How does the Buy-Back program work?",
    a: "Simply bring your old device to our store or fill out the form online. We'll evaluate its condition and specifications, and offer you instant store credit or cash.",
  },
  {
    q: "Do you use original replacement parts?",
    a: "Absolutely. We source high-quality, original (OEM) or premium aftermarket parts designed specifically for high-performance gaming hardware.",
  },
];

/* ================================================================== */
/* SHARED TOKENS & ANIMATION                                          */
/* ================================================================== */

const wrap = "mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10";
const sectionY = "py-8 sm:py-12 lg:py-16";
const fieldCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-violet-600 focus:ring-4 focus:ring-violet-600/15";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

function Eyebrow({
  children,
  dark,
  icon: Icon = Sparkles,
}: {
  children: React.ReactNode;
  dark?: boolean;
  icon?: LucideIcon;
}) {
  return (
    <span
      className={`mb-3 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${
        dark
          ? "border border-violet-500/20 bg-violet-500/10 text-violet-300"
          : "bg-violet-100 text-violet-700"
      }`}
    >
      <Icon className="size-3.5" /> {children}
    </span>
  );
}

/* ================================================================== */
/* PAGE                                                               */
/* ================================================================== */

export function HomeSecondarySections() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-800 selection:bg-violet-600 selection:text-white">
      {/* ============================================================ */}
      {/* BRANDS MARQUEE                                               */}
      {/* ============================================================ */}
      <div className="relative overflow-hidden border-y border-slate-200 bg-white py-5">
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

     

      {/* ============================================================ */}
      {/* WHAT WE REPAIR                                               */}
      {/* ============================================================ */}
      <section id="popular-repairs" className={sectionY}>
        <div className={wrap}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mx-auto mb-8 max-w-3xl text-center sm:mb-10"
          >
            <Eyebrow icon={Wrench}>Repair Services</Eyebrow>
            <h2 className="mb-3 text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">
              What We Repair
            </h2>
            <p className="text-base font-medium text-slate-500 sm:text-lg">
              Professional repair and upgrade services for gaming systems,
              laptops and electronics.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
          >
            {services.map((service) => (
              <motion.div key={service.title} variants={fadeUp}>
                <Link
                  href="/repair"
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-600/10 sm:p-7"
                >
                  <div className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-violet-100 transition-transform duration-500 group-hover:scale-150" />

                  <div className="relative flex size-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 transition-colors duration-300 group-hover:bg-violet-600 group-hover:text-white">
                    <service.icon className="size-7" />
                  </div>

                  <h3 className="relative mt-5 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                    {service.title}
                  </h3>
                  <p className="relative mt-2 flex-grow text-sm font-medium leading-relaxed text-slate-500 sm:text-base">
                    {service.desc}
                  </p>

                  <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-bold text-violet-600 transition-all group-hover:gap-3">
                    Learn more <ArrowRight className="size-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 text-center">
            <Link
              href="/repair"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-3.5 text-base font-bold text-white shadow-md transition-colors hover:bg-violet-600"
            >
              View All Repair Services <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>


      {/* ============================================================ */}
      {/* WHY CHOOSE US                                                */}
      {/* ============================================================ */}
      <section id="why-choose-us" className={sectionY}>
        <div className={wrap}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mx-auto mb-8 max-w-3xl text-center sm:mb-10"
          >
            <Eyebrow icon={ShieldCheck}>Why Choose Us</Eyebrow>
            <h2 className="mb-3 text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">
              The Al Dana Advantage
            </h2>
            <p className="text-base font-medium text-slate-500 sm:text-lg">
              Discover why gamers across the region trust us with their
              high-performance equipment.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
          >
            {whyChooseUsItems.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-600 transition-colors duration-300 group-hover:bg-violet-600 group-hover:text-white">
                  <item.icon className="size-6" />
                </div>
                <h3 className="mt-4 text-lg font-black tracking-tight text-slate-900 sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* HOW IT WORKS                                                 */}
      {/* ============================================================ */}
      <section
        id="how-it-works"
        className="relative overflow-hidden bg-slate-950 py-12 text-white sm:py-16 lg:py-20"
      >
        <div className="pointer-events-none absolute left-1/4 top-0 size-72 rounded-full bg-violet-900/30 blur-[100px] md:size-96" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 size-72 rounded-full bg-fuchsia-900/20 blur-[100px] md:size-96" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)",
            backgroundSize: "3rem 3rem",
          }}
        />

        <div className={`${wrap} relative z-10`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-10 text-center sm:mb-14"
          >
            <Eyebrow dark>How It Works</Eyebrow>
            <h2 className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl lg:text-5xl">
              Simple. Transparent. Reliable.
            </h2>
          </motion.div>

          <div className="relative mx-auto max-w-7xl">
            {/* desktop connector */}
            <div className="absolute left-[10%] right-[10%] top-8 hidden h-[2px] bg-gradient-to-r from-transparent via-violet-600/50 to-transparent lg:block" />

            <ol className="relative flex flex-col gap-4 sm:gap-5 lg:flex-row lg:gap-4">
              {/* mobile connector */}
              <div className="pointer-events-none absolute bottom-6 left-6 top-6 w-[2px] bg-gradient-to-b from-transparent via-violet-600/50 to-transparent lg:hidden" />

              {processSteps.map((step) => (
                <motion.li
                  key={step.step}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="group relative z-10 flex w-full items-stretch text-left lg:flex-1 lg:flex-col lg:items-center lg:text-center"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-slate-700 bg-slate-900 text-base font-black text-slate-300 shadow-md transition-all duration-300 group-hover:border-violet-500 group-hover:bg-violet-700 group-hover:text-white sm:size-14 lg:size-16">
                    {step.step}
                  </div>

                  <div className="ml-4 flex w-full flex-1 sm:ml-6 lg:ml-0 lg:mt-6 lg:flex-none">
                    <div className="flex min-h-[110px] w-full flex-col rounded-2xl border border-white/5 bg-white/[0.03] p-4 backdrop-blur-md transition-all duration-300 group-hover:border-violet-500/30 sm:p-5 lg:h-[160px]">
                      <h3 className="mb-1 text-base font-bold text-slate-100 transition-colors group-hover:text-violet-300 sm:text-lg">
                        {step.title}
                      </h3>
                      <p className="text-xs font-medium leading-relaxed text-slate-400 sm:text-sm">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* GAMING SPECIALISTS                                           */}
      {/* ============================================================ */}
      <section className={sectionY}>
        <div className={wrap}>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <div className="grid items-center lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative min-h-[280px] sm:min-h-[400px] lg:min-h-[520px] lg:h-full"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://res.cloudinary.com/dvu9vmcqd/image/upload/v1792822108/Neon_Gaming_Laptop_Showcase_gox4ci.png"
                  alt="Gaming specialist setup"
                  className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950/10" />
                <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-slate-950/50 px-4 py-2 text-sm font-bold text-white backdrop-blur">
                  <Cpu className="size-4 text-violet-300" /> Built for performance
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-7 sm:p-10 lg:p-14"
              >
                <Eyebrow icon={Gamepad2}>Gaming Specialists</Eyebrow>
                <h2 className="mb-4 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
                  We keep your gaming setup running at its best.
                </h2>
                <p className="mb-6 text-base font-medium leading-relaxed text-slate-500 sm:text-lg">
                  Whether your gaming PC is overheating, your laptop is slowing
                  down, or you&apos;re looking for a massive performance upgrade,
                  Al Dana Gaming provides fast, professional solutions.
                </p>

                <ul className="mb-8 grid gap-3 sm:grid-cols-2">
                  {specialistList.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-base font-semibold text-slate-700"
                    >
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-violet-500" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-violet-600/30 transition-transform hover:-translate-y-0.5"
                >
                  Learn More About Us <ArrowRight className="size-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* HARDWARE STORE PROMO                                         */}
      {/* ============================================================ */}
      <section>
        <div className={wrap}>
          <div className="relative overflow-hidden rounded-3xl bg-slate-950">
            <div className="pointer-events-none absolute -right-20 -top-24 size-96 rounded-full bg-violet-600/25 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 size-96 rounded-full bg-cyan-600/20 blur-[100px]" />

            <div className="relative grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-2 lg:gap-12 lg:p-14">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-xl"
              >
                <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-300">
                  <ShoppingCart className="size-3.5" /> Premium Hardware Store
                </span>

                <h2 className="mb-4 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
                  Upgrade Your{" "}
                  <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                    Reality.
                  </span>
                </h2>

                <p className="mb-6 border-l-4 border-violet-500 pl-4 text-base font-medium leading-relaxed text-slate-300 sm:text-lg">
                  Explore our curated collection of ultimate performance gaming
                  PCs, high-end components, and cutting-edge accessories.
                </p>

                <div className="mb-8 flex flex-wrap gap-2">
                  {shopCategories.map((cat) => (
                    <Link
                      key={cat}
                      href="/shop"
                      className="rounded-full border border-slate-700/60 bg-slate-900/60 px-4 py-2 text-xs font-bold text-slate-200 transition-all hover:border-violet-500/60 hover:bg-violet-600/20 hover:text-white sm:text-sm"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/shop"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:from-violet-500 hover:to-fuchsia-500 sm:w-auto"
                >
                  Shop The Collection <ArrowRight className="size-5" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative flex min-h-[260px] items-center justify-center sm:min-h-[360px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://res.cloudinary.com/dvu9vmcqd/image/upload/v1792822110/Screen_Shot_2026-10-06_at_3.11.56_PM_apaghp.png"
                  alt="Premium gaming hardware"
                  className="relative z-10 max-h-[350px] max-w-full object-contain drop-shadow-2xl sm:max-h-[450px]"
                />

                <div className="absolute right-0 top-0 z-20 flex items-center gap-2.5 rounded-xl border border-white/10 bg-slate-900/90 p-2.5 shadow-lg backdrop-blur-md sm:p-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-violet-500/20 sm:size-10">
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm font-black leading-none text-white">
                      4.9/5
                    </p>
                    <p className="mt-0.5 text-xs font-bold text-slate-400">
                      Reviews
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 z-20 flex items-center gap-2.5 rounded-xl border border-white/10 bg-slate-900/90 p-2.5 shadow-lg backdrop-blur-md sm:p-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-cyan-500/20 sm:size-10">
                    <Zap className="size-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm font-black leading-none text-white">
                      In Stock
                    </p>
                    <p className="mt-0.5 text-xs font-bold text-slate-400">
                      Ready to Ship
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      
      {/* ============================================================ */}
      {/* TRADE-IN BANNER                                              */}
      {/* ============================================================ */}
      <section className="pt-6 sm:pt-8">
        <div className={wrap}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 p-7 sm:p-10 lg:p-14"
          >
            <div className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full bg-fuchsia-400/20 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-24 left-10 size-72 rounded-full bg-sky-400/20 blur-[90px]" />

            <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                  <HandCoins className="size-3.5" /> Trade-In &amp; Buy Back
                </span>
                <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                  Turn your old tech into cash or store credit.
                </h2>
                <p className="mt-3 text-base font-medium text-violet-100 sm:text-lg">
                  Gaming PCs, laptops, MacBooks, iPads and phones — get a fair
                  offer in minutes.
                </p>
              </div>

              <Link
                href="/buy-back"
                className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-violet-700 shadow-lg transition-transform hover:-translate-y-0.5 sm:w-auto"
              >
                Get my offer <ArrowRight className="size-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TESTIMONIALS                                                 */}
      {/* ============================================================ */}
      <section id="customer-reviews" className={sectionY}>
        <div className={wrap}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mx-auto mb-8 max-w-3xl text-center sm:mb-10"
          >
            <Eyebrow icon={Star}>Testimonials</Eyebrow>
            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">
              Trusted by Gamers in UAE
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-4 sm:gap-5 md:grid-cols-3"
          >
            {testimonials.map((review) => (
              <motion.figure
                key={review.name}
                variants={fadeUp}
                className="relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <Quote className="absolute right-6 top-6 size-9 rotate-180 text-violet-100" />

                <div>
                  <div className="mb-3 flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mb-6 text-sm font-medium leading-relaxed text-slate-700 sm:text-base">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>
                </div>

                <figcaption className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-black text-white">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {review.name}
                    </p>
                    <p className="text-xs font-medium text-slate-500">
                      {review.role}
                    </p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FAQ                                                          */}
      {/* ============================================================ */}
      <section className="pb-8 sm:pb-12 lg:pb-16">
        <div className={wrap}>
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 p-7 sm:p-10 lg:p-14">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mx-auto mb-8 max-w-3xl text-center sm:mb-10"
            >
              <span className="mb-3 inline-flex items-center rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-700 shadow-sm">
                FAQ
              </span>
              <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-base font-medium leading-relaxed text-violet-100">
                Find answers to the most common questions about our services,
                process, pricing and support.
              </p>
            </motion.div>

            <div className="mx-auto max-w-4xl space-y-3 sm:space-y-4">
              {faqs.map((faq, idx) => {
                const open = openFaqIndex === idx;

                return (
                  <motion.div
                    key={faq.q}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                      open
                        ? "border-violet-300 shadow-lg shadow-violet-950/10"
                        : "border-slate-200 shadow-sm hover:border-violet-200"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(open ? null : idx)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500 sm:px-7 sm:py-6"
                    >
                      <span className="text-base font-bold leading-snug text-slate-900 sm:text-lg">
                        {faq.q}
                      </span>

                      <span
                        className={`flex size-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          open
                            ? "bg-violet-600 text-white"
                            : "bg-violet-50 text-violet-600"
                        }`}
                      >
                        <ChevronDown
                          className={`size-5 transition-transform duration-300 ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-6 sm:px-7">
                            <div className="mb-4 h-px bg-slate-100" />
                            <p className="text-base font-medium leading-7 text-slate-600">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>



      
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
    </main>
  );
}