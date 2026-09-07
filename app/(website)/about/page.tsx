"use client"

import React from "react"
import {
  Star,
  Quote,
  ShieldCheck,
  Wrench,
  Cpu,
  Zap,
  Award,
  Monitor,
  Laptop,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react"

const brands = [
  { name: "ASUS", slug: "asus" },
  { name: "NVIDIA", slug: "nvidia" },
  { name: "Intel", slug: "intel" },
  { name: "AMD", slug: "amd" },
  { name: "Razer", slug: "razer" },
  { name: "Corsair", slug: "corsair" },
  { name: "Apple", slug: "apple" },
  { name: "Dell", slug: "dell" },
  { name: "HP", slug: "hp" },
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

const stats = [
  { label: "Devices Repaired", val: "15,000+", icon: Wrench },
  { label: "Custom Builds", val: "2,500+", icon: Cpu },
  { label: "Customer Satisfaction", val: "99%", icon: Star },
  { label: "Years Experience", val: "10+", icon: Clock },
]

function ReviewCard({
  review,
}: {
  review: (typeof reviews)[number]
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 sm:p-7 backdrop-blur-md transition-colors duration-300 hover:bg-white/[0.1]">
      <Quote className="mb-5 size-8 text-violet-400 opacity-70 sm:size-9" />

      <div className="mb-5 flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className="size-4 fill-fuchsia-500 text-fuchsia-500 sm:size-5"
          />
        ))}
      </div>

      <p className="mb-6 text-base font-medium leading-7 text-slate-200 sm:text-lg">
        "{review.text}"
      </p>

      <div>
        <div className="text-lg font-black text-white">{review.name}</div>
        <div className="mt-1 text-xs font-bold uppercase tracking-wider text-violet-400">
          {review.device}
        </div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <div
      className="min-h-screen overflow-hidden bg-[#F8FAFC] pb-12 font-sans text-slate-800 sm:pb-20"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      {/* ============================================================
          CUSTOM CSS
      ============================================================ */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes marquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }

            .animate-marquee {
              animation: marquee 35s linear infinite;
              display: flex;
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
          `,
        }}
      />

      {/* ============================================================
          HERO
          DARK ONLY
      ============================================================ */}
      <section className="relative overflow-hidden bg-slate-950">
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-violet-700/20 blur-[120px]" />
          <div className="absolute -right-32 top-1/2 h-[300px] w-[300px] rounded-full bg-fuchsia-600/10 blur-[100px]" />
          <div className="absolute -left-32 bottom-0 h-[300px] w-[300px] rounded-full bg-indigo-600/10 blur-[100px]" />
        </div>

        {/* Subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-[1440px] px-4 pb-12 pt-12 text-center sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-20">
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-violet-300 sm:mb-6 sm:px-5 sm:text-xs">
            <Zap className="size-3.5 sm:size-4" />
            About Al Dana Gaming
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[78px]">
            Professional Tech Repair.
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Reliable Solutions.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-sm font-medium leading-6 text-slate-400 sm:mt-6 sm:text-base sm:leading-7 md:text-lg">
            We understand how important your devices are to your everyday
            life. From high-performance gaming rigs to essential work laptops,
            we deliver precision repairs that get you back in the game.
          </p>

          {/* Hero actions */}
          <div className="mt-7 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-slate-950 shadow-xl transition-all hover:-translate-y-0.5 hover:bg-violet-50 sm:px-7 sm:py-3.5">
              Book a Repair
              <ArrowRight className="size-4" />
            </button>

            <button className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/10 sm:px-7 sm:py-3.5">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================
          BRANDS
          LIGHT
      ============================================================ */}
      <section className="relative overflow-hidden border-y border-slate-200/70 bg-white py-7 sm:py-9">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28" />

        <div className="animate-marquee items-center gap-12 px-6 sm:gap-16 sm:px-8">
          {[1, 2].map((loop) => (
            <React.Fragment key={loop}>
              {brands.map((brand, index) => (
                <div
                  key={`${loop}-${index}`}
                  className="flex shrink-0 items-center justify-center opacity-40 grayscale transition-all duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0"
                >
                  <img
                    src={`https://cdn.simpleicons.org/${brand.slug}/0F172A`}
                    alt={`${brand.name} logo`}
                    className="h-7 w-auto object-contain sm:h-9 md:h-10"
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ============================================================
          MAIN CONTENT
      ============================================================ */}
      <main className="mx-auto flex max-w-[1440px] flex-col gap-16 px-4 pt-12 sm:gap-20 sm:px-6 sm:pt-16 lg:gap-24 lg:px-8 lg:pt-20">

        {/* ==========================================================
            OUR STORY
        ========================================================== */}
        <section id="our-story">
          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-xl shadow-slate-200/40 sm:rounded-[2rem] sm:p-8 md:p-10 lg:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              
              <div>
                <div className="mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600 sm:mb-6 sm:size-14">
                  <Award className="size-6 sm:size-7" />
                </div>

                <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                  Our <span className="text-violet-600">Story</span>
                </h2>

                <div className="mt-5 space-y-4 text-base font-medium leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
                  <p>
                    Our journey began with a simple mission: to make premium
                    technology repair accessible, honest, and incredibly fast.
                  </p>

                  <p>
                    Starting out by fixing custom gaming PCs and high-end
                    laptops, our dedication to uncompromising quality quickly
                    turned us into a trusted repair hub for the UAE's tech and
                    gaming community.
                  </p>

                  <p>
                    Today, whether it's a burnt GPU, a shattered iPad, or a
                    massive system upgrade, we handle every job with the exact
                    same passion that started it all.
                  </p>
                </div>
              </div>

              {/* Precision Engineering */}
              <div className="relative min-h-[300px] overflow-hidden rounded-2xl bg-slate-900 sm:min-h-[400px] sm:rounded-3xl">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "url('https://www.transparenttextures.com/patterns/cubes.png')",
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-violet-700/90 via-indigo-900/90 to-slate-900/95" />

                <div className="relative flex min-h-[300px] flex-col items-center justify-center p-6 text-center sm:min-h-[400px] sm:p-10">
                  <div className="relative mb-5 size-20 sm:mb-7 sm:size-28">
                    <div className="absolute inset-0 animate-ping rounded-full bg-violet-500 opacity-20" />
                    <div className="relative flex size-full items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
                      <Cpu className="size-9 text-white sm:size-12" />
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-white sm:text-2xl md:text-3xl">
                    Precision Engineering
                  </h3>

                  <p className="mt-3 max-w-sm text-sm font-medium leading-6 text-violet-200 sm:text-base">
                    Utilizing state-of-the-art diagnostic tools and genuine
                    replacement components for absolute perfection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================
            WHY CHOOSE US
        ========================================================== */}
        <section id="why-choose-us">
          <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Why Choose Us?
            </h2>

            <p className="mt-3 text-base font-medium leading-6 text-slate-600 sm:mt-4 sm:text-lg sm:leading-7">
              We don't just fix devices; we engineer peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {/* Expert Diagnostics */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40 transition-transform duration-300 hover:-translate-y-1 md:col-span-2 sm:p-8">
              <Monitor className="absolute -right-8 -top-8 size-44 opacity-[0.035] sm:size-56" />

              <div className="relative z-10">
                <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <Monitor className="size-6" />
                </div>

                <h3 className="text-2xl font-black text-slate-900 sm:text-3xl">
                  Expert Diagnostics
                </h3>

                <p className="mt-3 max-w-md text-base font-medium leading-6 text-slate-600">
                  We pinpoint the exact component failure before recommending a
                  fix, saving you money by avoiding unnecessary parts.
                </p>
              </div>
            </div>

            {/* Genuine Parts */}
            <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-6 text-white shadow-lg shadow-violet-500/20 transition-transform duration-300 hover:-translate-y-1 sm:p-8">
              <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-white/15">
                <ShieldCheck className="size-6" />
              </div>

              <h3 className="text-2xl font-black">Genuine Parts</h3>

              <p className="mt-3 text-sm font-medium leading-6 text-violet-100 sm:text-base">
                Only OEM or high-tier certified replacements are used to
                ensure maximum longevity.
              </p>
            </div>

            {/* Rapid Turnaround */}
            <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-lg shadow-slate-900/20 transition-transform duration-300 hover:-translate-y-1 sm:p-8">
              <div className="mb-5 flex size-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-fuchsia-400">
                <Clock className="size-6" />
              </div>

              <h3 className="text-2xl font-black">Rapid Turnaround</h3>

              <p className="mt-3 text-sm font-medium leading-6 text-slate-400 sm:text-base">
                We know you hate downtime. Standard repairs are completed
                within 24-48 hours.
              </p>
            </div>

            {/* Transparent Pricing */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40 transition-transform duration-300 hover:-translate-y-1 md:col-span-2 sm:p-8">
              <CheckCircle2 className="absolute -bottom-10 -right-8 size-48 opacity-[0.035]" />

              <div className="relative z-10">
                <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-fuchsia-100 text-fuchsia-600">
                  <CheckCircle2 className="size-6" />
                </div>

                <h3 className="text-2xl font-black text-slate-900 sm:text-3xl">
                  Transparent Pricing
                </h3>

                <p className="mt-3 max-w-md text-base font-medium leading-6 text-slate-600">
                  No hidden fees, no surprises. You get a clear, honest quote
                  before we ever touch a screwdriver on your device.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================
            TESTIMONIALS
        ========================================================== */}
        <section
          id="testimonials"
          className="relative overflow-hidden rounded-3xl bg-slate-900 px-5 py-10 shadow-2xl sm:rounded-[2rem] sm:px-8 sm:py-14 lg:px-12"
        >
          <div className="pointer-events-none absolute -right-40 -top-40 size-[450px] rounded-full bg-violet-600/20 blur-[120px]" />

          <div className="relative z-10 mx-auto mb-8 max-w-2xl text-center sm:mb-10">
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
              Gamer Approved
            </h2>

            <p className="mt-3 text-base font-medium leading-6 text-slate-400 sm:text-lg">
              Don't just take our word for it. See what our community has to
              say.
            </p>
          </div>

          <div className="relative z-10 grid gap-4 md:grid-cols-2 md:gap-5">
            {reviews.map((review) => (
              <ReviewCard key={review.name} review={review} />
            ))}
          </div>
        </section>

        {/* ==========================================================
            CORE VALUES
        ========================================================== */}
        <section
          id="our-values"
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-900 via-violet-950 to-slate-950 shadow-2xl sm:rounded-[2rem]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-fuchsia-600/30 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-violet-500/20 via-transparent to-transparent" />

          <div className="relative px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
            <div className="mb-8 text-center sm:mb-10">
              <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
                Our Core Values
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.08] p-5 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.14] sm:p-6"
                >
                  <h4 className="flex items-center gap-2 text-lg font-black text-white sm:text-xl">
                    <Sparkles className="size-4 shrink-0 text-fuchsia-400 sm:size-5" />
                    {value.title}
                  </h4>

                  <p className="mt-2 text-sm font-medium leading-6 text-violet-100">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================================
            MEET THE TEAM
        ========================================================== */}
        <section id="meet-our-team">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Visual */}
            <div className="grid h-[340px] grid-cols-2 gap-3 sm:h-[460px] sm:gap-4">
              <div className="space-y-3 sm:space-y-4">
                <div className="relative h-[60%] overflow-hidden rounded-2xl bg-gradient-to-br from-violet-400 to-violet-600 shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Wrench className="size-10 text-white/50 sm:size-12" />
                  </div>
                </div>

                <div className="relative h-[40%] overflow-hidden rounded-2xl bg-slate-800 shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Laptop className="size-8 text-white/20 sm:size-10" />
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-8 sm:space-y-4 sm:pt-12">
                <div className="relative h-[40%] overflow-hidden rounded-2xl bg-fuchsia-100 shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Monitor className="size-8 text-fuchsia-300 sm:size-10" />
                  </div>
                </div>

                <div className="relative h-[60%] overflow-hidden rounded-2xl bg-gradient-to-tr from-fuchsia-500 to-purple-600 shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Cpu className="size-10 text-white/50 sm:size-12" />
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                Meet The <span className="text-violet-600">Experts</span>
              </h2>

              <div className="mt-5 space-y-4 text-base font-medium leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
                <p>
                  Behind every successful repair is a technician who treats
                  your device like their own. Our roster consists of certified
                  engineers, custom PC builders, and micro-soldering
                  specialists.
                </p>

                <p>
                  We combine decades of shared experience with a relentless
                  passion for hardware. When you hand over your rig, you're
                  placing it in the hands of absolute professionals who thrive
                  on solving the impossible.
                </p>
              </div>

              <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-black text-white shadow-lg transition-all hover:bg-violet-600 sm:mt-7 sm:px-7">
                Join Our Team
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ==========================================================
            ACHIEVEMENTS
        ========================================================== */}
        <section
          id="our-achievements"
          className="border-y border-dashed border-slate-200 py-10 sm:py-12"
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-violet-100 text-violet-600 sm:mb-4 sm:size-14">
                  <stat.icon className="size-6 sm:size-7" />
                </div>

                <div className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                  {stat.val}
                </div>

                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 sm:text-xs sm:tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================================
            CTA
        ========================================================== */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-2xl shadow-violet-500/20 sm:rounded-[2rem]">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')",
            }}
          />

          <div className="relative px-5 py-10 text-center sm:px-8 sm:py-14 lg:px-12">
            <h2 className="mx-auto max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Ready to revive your device?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-6 text-violet-100 sm:text-lg sm:leading-7">
              Book your diagnostic session today or drop by our service center.
              Let's get your hardware running at absolute peak performance.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row">
              <button className="rounded-full bg-white px-6 py-3.5 text-sm font-black text-violet-700 shadow-xl transition-all hover:-translate-y-0.5 hover:bg-slate-100 sm:px-7">
                Book a Repair
              </button>

              <button className="rounded-full border border-white/30 bg-transparent px-6 py-3.5 text-sm font-black text-white transition-all hover:bg-white/10 sm:px-7">
                Contact Support
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
