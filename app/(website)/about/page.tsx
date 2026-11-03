"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Star,
  Quote,
  ShieldCheck,
  Wrench,
  Cpu,
  Award,
  Monitor,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
  Settings,
  type LucideIcon,
} from "lucide-react"

/* Hero background — swap for your own image (e.g. a workshop / team photo) */
const HERO_IMG =
  "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1792816921/hero-bg_gqfshv.jpg"

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
]

const heroFeatures = [
  { label: "Expert Technicians", icon: Wrench },
  { label: "Genuine Parts", icon: ShieldCheck },
  { label: "Fast Turnaround", icon: Clock },
  { label: "Honest Pricing", icon: CheckCircle2 },
]

const reviews = [
  {
    name: "Ahmed K.",
    device: "Custom RTX 4090 Build",
    text: "My system was constantly crashing during heavy loads. They diagnosed a faulty PSU cable, replaced it, and re-pasted my CPU. Temps dropped by 15°C! Absolute legends.",
  },
  {
    name: "Tariq R.",
    device: "Alienware m15",
    text: "The deep cleaning and liquid metal application completely revived my laptop. It runs whisper quiet now even while playing Cyberpunk.",
  },
  {
    name: "Sarah M.",
    device: "MacBook Pro M2",
    text: "Apple told me I needed a completely new logic board for thousands of dirhams. Al Dana fixed the specific short on the board for a fraction of the price. Absolute lifesavers.",
  },
  {
    name: "Omar F.",
    device: "iPad Pro 12.9",
    text: "Shattered my screen dropping it on tile. They replaced it same-day, and the touch response is completely flawless. Looks and feels brand new.",
  },
]

const values = [
  {
    title: "Quality First",
    desc: "Uncompromising standards in every solder, screw, and thermal paste application.",
  },
  {
    title: "Absolute Trust",
    desc: "Your data is safe, your hardware is respected, and our advice is always honest.",
  },
  {
    title: "Master Craftsmanship",
    desc: "Driven by technical expertise and years of hands-on electronic engineering.",
  },
  {
    title: "Continuous Learning",
    desc: "As tech evolves, so do we. We stay ahead of the curve on the latest hardware.",
  },
  {
    title: "Fair Pricing",
    desc: "Premium service shouldn't mean predatory pricing. We believe in total fairness.",
  },
  {
    title: "Customer Centric",
    desc: "We don't just fix machines; we empower the people who use them.",
  },
]

const stats: { label: string; val: string; icon: LucideIcon }[] = [
  { label: "Devices Repaired", val: "15,000+", icon: Wrench },
  { label: "Custom Builds", val: "2,500+", icon: Cpu },
  { label: "Customer Satisfaction", val: "99%", icon: Star },
  { label: "Years Experience", val: "10+", icon: Clock },
]

/* Shared layout tokens (identical to the gaming PC page) */
const wrap = "mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10"
const sectionY = "py-3 sm:py-4 lg:py-5"
const anchor = "scroll-mt-32"

function Eyebrow({
  children,
  icon: Icon = Sparkles,
  dark,
}: {
  children: React.ReactNode
  icon?: LucideIcon
  dark?: boolean
}) {
  return (
    <span
      className={`mb-3 inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider ${
        dark ? "bg-white/20 text-white" : "bg-violet-100 text-violet-700"
      }`}
    >
      <Icon className="size-3.5" /> {children}
    </span>
  )
}

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  return (
    <figure className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md transition-colors duration-300 hover:bg-white/[0.1] sm:p-6">
      <div>
        <Quote className="mb-3 size-7 text-violet-300 opacity-80" />

        <div className="mb-3 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="size-4 fill-fuchsia-400 text-fuchsia-400" />
          ))}
        </div>

        <blockquote className="mb-4 text-sm font-medium leading-relaxed text-slate-100 sm:text-base">
          &ldquo;{review.text}&rdquo;
        </blockquote>
      </div>

      <figcaption>
        <div className="text-base font-black text-white sm:text-lg">{review.name}</div>
        <div className="mt-1 text-xs font-bold uppercase tracking-wider text-violet-300">
          {review.device}
        </div>
      </figcaption>
    </figure>
  )
}

export default function AboutPage() {
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
          className="-z-20 object-cover object-[70%_50%] lg:object-right"
        />
        {/* dark on the text side so every line stays readable, clearer on the image side */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#050816] via-[#050816]/90 to-[#050816]/45 lg:via-[#050816]/80 lg:to-[#050816]/10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#050816]/80 via-transparent to-[#050816]/30" />

        <div className={`${wrap} flex flex-1 flex-col justify-center py-8 sm:py-10 lg:py-8`}>
          <div className="max-w-4xl">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-100 sm:text-sm">
              About Al Dana
              <span className="h-px w-16 bg-gradient-to-r from-sky-400 to-transparent sm:w-28" />
            </p>

            <h1 className="mt-2 text-3xl font-black leading-[1.05] tracking-tight drop-shadow-[0_2px_12px_rgba(5,8,22,0.8)] sm:text-4xl lg:text-5xl xl:text-6xl">
              <span className="block text-white">PROFESSIONAL TECH REPAIR.</span>
              <span className="block bg-gradient-to-r from-fuchsia-400 via-violet-400 to-sky-300 bg-clip-text text-transparent">
                RELIABLE SOLUTIONS.
              </span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-200 sm:text-base lg:text-lg">
              We understand how important your devices are to your everyday
              life. From high-performance gaming rigs to essential work
              laptops, we deliver precision repairs that get you back in the
              game.
            </p>

            <ul className="mt-5 hidden max-w-3xl grid-cols-4 gap-2 sm:grid">
              {heroFeatures.map((f) => (
                <li
                  key={f.label}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2 py-2.5 text-center backdrop-blur"
                >
                  <f.icon className="size-5 text-violet-300" />
                  <span className="text-[10px] font-bold uppercase leading-tight tracking-wide text-slate-100">
                    {f.label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/repair#repair-form"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-violet-900/50 transition-transform hover:-translate-y-0.5"
              >
                Book a Repair <ArrowRight className="size-4" />
              </Link>
              <a
                href="#our-story"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/15"
              >
                <Settings className="size-4" /> Learn More
              </a>
            </div>
          </div>
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

      {/* ================= OUR STORY ================= */}
      <section id="our-story" className={`${sectionY} ${anchor} pt-5 sm:pt-6 lg:pt-8`}>
        <div className={wrap}>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <div className="grid lg:grid-cols-2">
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <Eyebrow icon={Award}>Our story</Eyebrow>
                <h2 className="mb-4 text-2xl font-black leading-tight text-slate-900 sm:text-3xl lg:text-4xl">
                  Our <span className="text-violet-600">Story</span>
                </h2>

                <div className="max-w-xl space-y-3 text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
                  <p>
                    Our journey began with a simple mission: to make premium
                    technology repair accessible, honest, and incredibly fast.
                  </p>
                  <p>
                    Starting out by fixing custom gaming PCs and high-end
                    laptops, our dedication to uncompromising quality quickly
                    turned us into a trusted repair hub for the UAE&apos;s tech
                    and gaming community.
                  </p>
                  <p>
                    Today, whether it&apos;s a burnt GPU, a shattered iPad, or a
                    massive system upgrade, we handle every job with the exact
                    same passion that started it all.
                  </p>
                </div>
              </div>

              {/* Precision engineering panel */}
              <div className="relative min-h-[260px] overflow-hidden bg-slate-900 sm:min-h-[320px] lg:min-h-[380px]">
                <div
                  className="absolute inset-0 opacity-[0.12]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)",
                    backgroundSize: "2.5rem 2.5rem",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-700/90 via-indigo-900/90 to-slate-900/95" />

                <div className="relative flex h-full min-h-[260px] flex-col items-center justify-center p-6 text-center sm:min-h-[320px] lg:min-h-[380px]">
                  <div className="relative mb-4 size-20 sm:size-24">
                    <div className="absolute inset-0 animate-ping rounded-full bg-violet-500 opacity-20 motion-reduce:animate-none" />
                    <div className="relative flex size-full items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
                      <Cpu className="size-9 text-white sm:size-10" />
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-white sm:text-2xl">
                    Precision Engineering
                  </h3>
                  <p className="mt-2 max-w-sm text-sm font-medium leading-relaxed text-violet-100 sm:text-base">
                    Utilizing state-of-the-art diagnostic tools and genuine
                    replacement components for absolute perfection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ACHIEVEMENTS ================= */}
      <section id="our-achievements" className={`${sectionY} ${anchor}`}>
        <div className={wrap}>
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((stat) => (
              <li
                key={stat.label}
                className="rounded-3xl border border-slate-200 bg-white px-4 py-5 text-center shadow-sm"
              >
                <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 sm:size-12">
                  <stat.icon className="size-5 sm:size-6" />
                </div>
                <div className="text-2xl font-black tracking-tight text-violet-700 sm:text-3xl lg:text-4xl">
                  {stat.val}
                </div>
                <div className="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-600 sm:text-xs">
                  {stat.label}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= WHY CHOOSE US (bento) ================= */}
      <section id="why-choose-us" className={`${sectionY} ${anchor}`}>
        <div className={wrap}>
          <div className="mx-auto mb-4 max-w-3xl text-center">
            <Eyebrow icon={ShieldCheck}>Why choose us</Eyebrow>
            <h2 className="mb-2 text-2xl font-black text-slate-900 sm:text-3xl lg:text-4xl">
              Why Choose Us?
            </h2>
            <p className="text-sm text-slate-600 sm:text-base">
              We don&apos;t just fix devices; we engineer peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {/* Expert Diagnostics */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1 sm:p-7 md:col-span-2">
              <Monitor className="absolute -right-8 -top-8 size-40 text-slate-900 opacity-[0.04] sm:size-52" />
              <div className="relative">
                <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                  <Monitor className="size-5" />
                </div>
                <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
                  Expert Diagnostics
                </h3>
                <p className="mt-2 max-w-md text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
                  We pinpoint the exact component failure before recommending a
                  fix, saving you money by avoiding unnecessary parts.
                </p>
              </div>
            </div>

            {/* Genuine Parts */}
            <div className="rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 p-5 text-white shadow-lg shadow-violet-500/20 transition-transform duration-300 hover:-translate-y-1 sm:p-7">
              <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-white/20">
                <ShieldCheck className="size-5" />
              </div>
              <h3 className="text-xl font-black text-white sm:text-2xl">Genuine Parts</h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-violet-50 sm:text-base">
                Only OEM or high-tier certified replacements are used to ensure
                maximum longevity.
              </p>
            </div>

            {/* Rapid Turnaround */}
            <div className="rounded-3xl bg-slate-900 p-5 text-white shadow-lg transition-transform duration-300 hover:-translate-y-1 sm:p-7">
              <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-white/10 text-fuchsia-300">
                <Clock className="size-5" />
              </div>
              <h3 className="text-xl font-black text-white sm:text-2xl">Rapid Turnaround</h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-200 sm:text-base">
                We know you hate downtime. Standard repairs are completed
                within 24-48 hours.
              </p>
            </div>

            {/* Transparent Pricing */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1 sm:p-7 md:col-span-2">
              <CheckCircle2 className="absolute -bottom-10 -right-8 size-44 text-slate-900 opacity-[0.04]" />
              <div className="relative">
                <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-fuchsia-100 text-fuchsia-600">
                  <CheckCircle2 className="size-5" />
                </div>
                <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
                  Transparent Pricing
                </h3>
                <p className="mt-2 max-w-md text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
                  No hidden fees, no surprises. You get a clear, honest quote
                  before we ever touch a screwdriver on your device.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section id="testimonials" className={`${sectionY} ${anchor}`}>
        <div className={wrap}>
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
            <div className="pointer-events-none absolute -right-40 -top-40 size-[400px] rounded-full bg-violet-600/20 blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-40 -left-40 size-[350px] rounded-full bg-fuchsia-600/10 blur-[120px]" />

            <div className="relative mx-auto mb-6 max-w-3xl text-center">
              <Eyebrow dark icon={Star}>Testimonials</Eyebrow>
              <h2 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl">
                Gamer <span className="text-fuchsia-300">Approved</span>
              </h2>
              <p className="mt-2 text-sm font-medium text-slate-200 sm:text-base">
                Don&apos;t just take our word for it. See what our community has
                to say.
              </p>
            </div>

            <div className="relative grid gap-3 md:grid-cols-2">
              {reviews.map((review) => (
                <ReviewCard key={review.name} review={review} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section id="our-values" className={`${sectionY} ${anchor}`}>
        <div className={wrap}>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
            <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-fuchsia-400/20 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-24 left-10 size-64 rounded-full bg-sky-400/20 blur-[90px]" />

            <div className="relative mx-auto mb-6 max-w-3xl text-center">
              <Eyebrow dark icon={Sparkles}>
                What drives us
              </Eyebrow>
              <h2 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl">
                Our Core Values
              </h2>
            </div>

            <div className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.16] sm:p-5"
                >
                  <h3 className="flex items-center gap-2 text-base font-black text-white sm:text-lg">
                    <Sparkles className="size-4 shrink-0 text-fuchsia-200" />
                    {value.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium leading-relaxed text-violet-50">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className={`${sectionY} pb-6 sm:pb-8 lg:pb-10`}>
        <div className={wrap}>
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-5 py-10 text-center sm:px-8 sm:py-12 lg:px-10">
            <div className="pointer-events-none absolute -left-16 -top-20 size-72 rounded-full bg-violet-600/30 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 right-10 size-72 rounded-full bg-indigo-500/25 blur-[100px]" />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)",
                backgroundSize: "3rem 3rem",
              }}
            />

            <div className="relative">
              <h2 className="mx-auto max-w-3xl text-2xl font-black leading-tight text-white sm:text-3xl lg:text-5xl">
                Ready to{" "}
                <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
                  revive your device?
                </span>
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-200 sm:text-base">
                Book your diagnostic session today or drop by our service
                center. Let&apos;s get your hardware running at absolute peak
                performance.
              </p>

              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/repair#repair-form"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-violet-700 shadow-xl transition-transform hover:-translate-y-0.5 sm:text-base"
                >
                  Book a Repair <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/15 sm:text-base"
                >
                  Contact Support
                </Link>
              </div>
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
    </div>
  )
}