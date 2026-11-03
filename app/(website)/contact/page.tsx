"use client"

import React, { useState } from "react"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  ArrowRight,
  Headset,
  Cpu,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"

/* Shared layout tokens (matched to the About page: compact spacing) */
const wrap = "mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10"
const sectionY = "py-3 sm:py-4 lg:py-5"
const anchor = "scroll-mt-28"

/* Darker placeholder + text for better contrast */
const fieldCls =
  "w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-500 outline-none transition focus:border-violet-600 focus:bg-white focus:ring-4 focus:ring-violet-600/15"

const quickContacts: {
  icon: LucideIcon
  label: string
  value: string
  href?: string
}[] = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+971 50 123 4567",
    href: "tel:+971501234567",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "support@aldana.com",
    href: "mailto:support@aldana.com",
  },
  {
    icon: MapPin,
    label: "Service Center",
    value: "Industrial Area 1, Dubai, UAE",
  },
  {
    icon: Clock,
    label: "Open Today",
    value: "See business hours",
    href: "#business-hours",
  },
]

const hours = [
  { day: "Monday - Friday", time: "9:00 AM - 8:00 PM", closed: false },
  { day: "Saturday", time: "10:00 AM - 6:00 PM", closed: false },
  { day: "Sunday", time: "Closed", closed: true },
]

const steps: {
  n: string
  icon: LucideIcon
  title: string
  text: string
  tone: "violet" | "fuchsia" | "dark"
}[] = [
  {
    n: "1",
    icon: MessageSquare,
    title: "Reach Out",
    text: "Submit the form above or drop by our service center. Tell us the symptoms your device is experiencing.",
    tone: "violet",
  },
  {
    n: "2",
    icon: Search,
    title: "Diagnostic & Quote",
    text: "We perform a standard 100 DHS diagnostic test to identify the exact fault and provide a clear, no-hidden-fees quote.",
    tone: "fuchsia",
  },
  {
    n: "3",
    icon: Cpu,
    title: "Repair & Return",
    text: "Upon your approval, we execute the repair using premium parts. Collect your revived device usually within 24-48 hours.",
    tone: "dark",
  },
]

const stepIcon = {
  violet: "bg-violet-100 text-violet-700",
  fuchsia: "bg-fuchsia-100 text-fuchsia-700",
  dark: "bg-slate-900 text-violet-300",
}

/* ---- MAP (kept for later use) ---- */
const ADDRESS = "123 Tech Avenue, Industrial Area 1, Dubai, UAE"
export const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS
)}&output=embed`
export const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ADDRESS
)}`

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Simulate form submission (replace with your real submit / server action)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 font-sans text-slate-800">
      {/* ================= HERO (compact) ================= */}
      <section className="relative isolate overflow-hidden bg-[#050816] text-white">
        {/* ambient glows + grid */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[320px] w-[700px] -translate-x-1/2 rounded-full bg-violet-700/25 blur-[120px]" />
          <div className="absolute -right-32 top-1/2 size-[260px] rounded-full bg-fuchsia-600/15 blur-[100px]" />
          <div className="absolute -left-32 bottom-0 size-[260px] rounded-full bg-indigo-600/20 blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)",
              backgroundSize: "3rem 3rem",
            }}
          />
        </div>

        <div className={`${wrap} py-8 sm:py-10 lg:py-12`}>
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/30 bg-violet-500/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-violet-100">
              <Headset className="size-3.5" /> Support &amp; Inquiries
            </span>

            <h1 className="mt-3 text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
              <span className="block text-white">LET&apos;S GET YOUR TECH</span>
              <span className="block bg-gradient-to-r from-fuchsia-400 via-violet-400 to-sky-300 bg-clip-text text-transparent">
                BACK ON TRACK.
              </span>
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-200 sm:text-base lg:text-lg">
              Whether you need an urgent repair, want to check a trade-in
              valuation, or just have a technical question, our engineers are
              standing by to help.
            </p>

            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#contact-form"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-violet-900/50 transition-transform hover:-translate-y-0.5"
              >
                Send a message <ArrowRight className="size-4" />
              </a>
              <a
                href="tel:+971501234567"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/15"
              >
                <Phone className="size-4" /> Call us now
              </a>
            </div>
          </div>

          {/* quick contact tiles */}
          <ul className="mx-auto mt-7 grid max-w-6xl grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {quickContacts.map((c) => {
              const inner = (
                <>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-violet-200 transition-colors group-hover:bg-violet-600 group-hover:text-white">
                    <c.icon className="size-5" />
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                      {c.label}
                    </span>
                    <span className="block truncate text-sm font-bold text-white">
                      {c.value}
                    </span>
                  </span>
                </>
              )

              const cls =
                "group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur transition-colors hover:bg-white/10"

              return (
                <li key={c.label}>
                  {c.href ? (
                    <a href={c.href} className={cls}>
                      {inner}
                    </a>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ================= MAIN CONTACT GRID ================= */}
      <section
        id="contact-form"
        className={`${sectionY} ${anchor} pt-5 sm:pt-6 lg:pt-8`}
      >
        <div className={wrap}>
          <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            {/* ---------- FORM ---------- */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/50 sm:p-7 lg:p-8">
              <div className="relative">
                <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-violet-800">
                  <MessageSquare className="size-3.5" /> Contact form
                </span>

                <h2 className="mb-1.5 text-2xl font-black text-slate-900 sm:text-3xl lg:text-4xl">
                  Send us a message
                </h2>
                <p className="mb-5 text-sm font-medium text-slate-600 sm:text-base">
                  Fill out the form below and we&apos;ll get back to you within
                  1 business day.
                </p>

                {isSubmitted ? (
                  <div
                    role="status"
                    className="flex min-h-[320px] flex-col items-center justify-center space-y-3 text-center"
                  >
                    <div className="flex size-16 items-center justify-center rounded-full bg-green-100 text-green-700">
                      <CheckCircle2 className="size-8" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
                      Message Received!
                    </h3>
                    <p className="max-w-md text-sm font-medium text-slate-600 sm:text-base">
                      Thank you for reaching out. One of our lead technicians
                      will review your request and contact you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="mt-1 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition-colors hover:border-violet-400 hover:text-violet-700"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="name"
                          className="text-sm font-bold text-slate-800"
                        >
                          Full Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          autoComplete="name"
                          placeholder="John Doe"
                          className={fieldCls}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="email"
                          className="text-sm font-bold text-slate-800"
                        >
                          Email Address <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          autoComplete="email"
                          placeholder="john@example.com"
                          className={fieldCls}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="phone"
                          className="text-sm font-bold text-slate-800"
                        >
                          Phone Number <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="+971 50 000 0000"
                          className={fieldCls}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="device"
                          className="text-sm font-bold text-slate-800"
                        >
                          Device &amp; Issue / Subject{" "}
                          <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          id="device"
                          name="device"
                          required
                          placeholder="e.g., Alienware m15 R6 - Overheating"
                          className={fieldCls}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="message"
                        className="text-sm font-bold text-slate-800"
                      >
                        Detailed Description{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Please describe the issue, any physical damage, or prior repairs..."
                        className={`${fieldCls} resize-y`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition hover:-translate-y-0.5 hover:shadow-violet-600/40 sm:text-base"
                    >
                      Send Request{" "}
                      <Send className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                    </button>

                    <p className="flex items-start justify-center gap-2 text-center text-xs text-slate-600 sm:items-center">
                      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-violet-700 sm:mt-0" />
                      Your details are only used to respond to your request.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* ---------- INFO CARDS ---------- */}
            <div className="grid gap-4 lg:grid-rows-[auto_1fr]">
              {/* Direct contact */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 p-5 text-white shadow-lg shadow-violet-500/20 sm:p-6">
                <div className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-fuchsia-400/20 blur-[80px]" />

                <h3 className="relative mb-4 text-xl font-black sm:text-2xl">
                  Direct Contact
                </h3>

                <div className="relative space-y-4">
                  <a
                    href="tel:+971501234567"
                    className="group flex items-center gap-3"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:scale-110">
                      <Phone className="size-4" />
                    </span>
                    <span>
                      <span className="block text-xs font-medium text-violet-100">
                        Call Us
                      </span>
                      <span className="block text-base font-bold">
                        +971 50 123 4567
                      </span>
                    </span>
                  </a>

                  <a
                    href="mailto:support@aldana.com"
                    className="group flex items-center gap-3"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:scale-110">
                      <Mail className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-medium text-violet-100">
                        Email Us
                      </span>
                      <span className="block break-words text-base font-bold">
                        support@aldana.com
                      </span>
                    </span>
                  </a>

                  <div className="group flex items-start gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:scale-110">
                      <MapPin className="size-4" />
                    </span>
                    <span>
                      <span className="block text-xs font-medium text-violet-100">
                        Service Center
                      </span>
                      <span className="block text-base font-bold leading-snug">
                        123 Tech Avenue,
                        <br />
                        Industrial Area 1, Dubai, UAE
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Business hours */}
              <div
                id="business-hours"
                className={`${anchor} rounded-3xl bg-slate-900 p-5 text-white shadow-lg shadow-slate-900/20 sm:p-6`}
              >
                <div className="mb-4 flex items-center gap-2.5">
                  <Clock className="size-5 text-fuchsia-300" />
                  <h3 className="text-xl font-black sm:text-2xl">
                    Business Hours
                  </h3>
                </div>

                <ul className="space-y-2.5 text-sm font-medium text-slate-200 sm:text-base">
                  {hours.map((h, i) => (
                    <li
                      key={h.day}
                      className={`flex items-center justify-between gap-4 ${
                        i < hours.length - 1
                          ? "border-b border-white/10 pb-2.5"
                          : "pt-0.5"
                      }`}
                    >
                      <span>{h.day}</span>
                      <span
                        className={`font-bold ${
                          h.closed ? "text-fuchsia-300" : "text-white"
                        }`}
                      >
                        {h.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT HAPPENS NEXT ================= */}
      <section className={`${sectionY} ${anchor} pb-6 sm:pb-8 lg:pb-10`}>
        <div className={wrap}>
          <div className="mx-auto mb-5 max-w-3xl text-center">
            <h2 className="mb-2 text-2xl font-black text-slate-900 sm:text-3xl lg:text-4xl">
              What happens next?
            </h2>
            <p className="text-sm font-medium text-slate-600 sm:text-base">
              Our process is transparent, fast, and designed to get your
              hardware back in your hands as quickly as possible.
            </p>
          </div>

          <ol className="grid gap-3 md:grid-cols-3 md:gap-4">
            {steps.map((s) => (
              <li
                key={s.n}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg sm:p-6"
              >
                <span className="pointer-events-none absolute -right-1 -top-4 text-[6.5rem] font-black leading-none text-slate-100 transition-transform duration-500 group-hover:scale-110">
                  {s.n}
                </span>

                <div className="relative">
                  <div
                    className={`mb-4 flex size-11 items-center justify-center rounded-2xl ${stepIcon[s.tone]}`}
                  >
                    <s.icon className="size-5" />
                  </div>
                  <h3 className="mb-2 text-lg font-black text-slate-900 sm:text-xl">
                    {s.title}
                  </h3>
                  <p className="text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
                    {s.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  )
}