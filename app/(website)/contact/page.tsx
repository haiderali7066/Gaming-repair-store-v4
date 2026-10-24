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
  HelpCircle,
  Navigation,
  type LucideIcon,
} from "lucide-react"

/* Shared layout tokens (identical to the other redesigned pages) */
const wrap = "mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10"
const sectionY = "py-5 sm:py-6 lg:py-8"
const anchor = "scroll-mt-28"

const fieldCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base font-medium text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-violet-600 focus:bg-white focus:ring-4 focus:ring-violet-600/15"

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
  violet: "bg-violet-100 text-violet-600",
  fuchsia: "bg-fuchsia-100 text-fuchsia-600",
  dark: "bg-slate-900 text-violet-400",
}

/* ---- MAP ----
   Change ADDRESS to your exact address or Google Maps place name
   (e.g. "Al Dana , Industrial Area 1, Dubai") and the embed + the
   "Get Directions" link both update. Or paste the src from
   Google Maps > Share > Embed a map into MAP_EMBED directly. */
const ADDRESS = "123 Tech Avenue, Industrial Area 1, Dubai, UAE"
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS
)}&output=embed`
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ADDRESS
)}`

const faqs = [
  {
    q: "How quickly will you reply to my message?",
    a: "We aim to get back to you within 1 business day. For anything urgent, call us during business hours and we'll help right away.",
  },
  {
    q: "Do I need an appointment to visit the service center?",
    a: "No appointment is necessary. You can bring your device in for an immediate visual inspection by our counter technicians during business hours.",
  },
  {
    q: "How much does a diagnostic cost?",
    a: "We perform a standard 100 DHS diagnostic test to identify the exact fault, and then provide a clear quote with no hidden fees before any repair begins.",
  },
  {
    q: "How long does a repair usually take?",
    a: "Once you approve the quote, most repairs are completed using premium parts and your device is usually ready to collect within 24-48 hours.",
  },
  {
    q: "What should I include in my message?",
    a: "Tell us your device model, the symptoms you're seeing, any physical damage and any previous repairs. The more detail you give us, the faster we can pinpoint the problem.",
  },
  {
    q: "What are your business hours?",
    a: "We're open Monday to Friday from 9:00 AM to 8:00 PM and Saturday from 10:00 AM to 6:00 PM. We're closed on Sundays.",
  },
]

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Simulate form submission (replace with your real submit / server action)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 font-sans text-slate-800">
      {/* ================= HERO (no image) ================= */}
      <section className="relative isolate overflow-hidden bg-[#050816] text-white">
        {/* ambient glows + grid */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[420px] w-[800px] -translate-x-1/2 rounded-full bg-violet-700/25 blur-[130px]" />
          <div className="absolute -right-32 top-1/2 size-[320px] rounded-full bg-fuchsia-600/15 blur-[110px]" />
          <div className="absolute -left-32 bottom-0 size-[320px] rounded-full bg-indigo-600/20 blur-[110px]" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)",
              backgroundSize: "3rem 3rem",
            }}
          />
        </div>

        <div className={`${wrap} py-14 sm:py-20 lg:py-24`}>
          <div className="mx-auto max-w-5xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-300 sm:text-sm">
              <Headset className="size-4" /> Support &amp; Inquiries
            </span>

            <h1 className="mt-6 text-5xl font-black leading-[1] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              <span className="block text-white">LET&apos;S GET YOUR TECH</span>
              <span className="block bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 bg-clip-text text-transparent">
                BACK ON TRACK.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base font-medium leading-relaxed text-slate-300 sm:text-xl">
              Whether you need an urgent repair, want to check a trade-in
              valuation, or just have a technical question, our engineers are
              standing by to help.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#contact-form"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-violet-900/50 transition-transform hover:-translate-y-0.5 sm:text-base"
              >
                Send a message <ArrowRight className="size-5" />
              </a>
              <a
                href="tel:+971501234567"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/15 sm:text-base"
              >
                <Phone className="size-4" /> Call us now
              </a>
            </div>
          </div>

          {/* quick contact tiles */}
          <ul className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickContacts.map((c) => {
              const inner = (
                <>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-violet-300 transition-colors group-hover:bg-violet-600 group-hover:text-white">
                    <c.icon className="size-5" />
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {c.label}
                    </span>
                    <span className="block truncate text-sm font-bold text-white sm:text-base">
                      {c.value}
                    </span>
                  </span>
                </>
              )

              const cls =
                "group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition-colors hover:bg-white/10"

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
      <section id="contact-form" className={`${sectionY} ${anchor} pt-6 sm:pt-8`}>
        <div className={wrap}>
          <div className="grid gap-5 lg:grid-cols-3 xl:grid-cols-[1.9fr_1fr]">
            {/* ---------- FORM ---------- */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10 lg:col-span-2 lg:p-12 xl:col-span-1">
              <div className="relative">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-700">
                  <MessageSquare className="size-3.5" /> Contact form
                </span>

                <h2 className="mb-2 text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">
                  Send us a message
                </h2>
                <p className="mb-8 text-base font-medium text-slate-500 sm:text-lg">
                  Fill out the form below and we&apos;ll get back to you within
                  1 business day.
                </p>

                {isSubmitted ? (
                  <div
                    role="status"
                    className="flex min-h-[420px] flex-col items-center justify-center space-y-4 text-center"
                  >
                    <div className="flex size-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <CheckCircle2 className="size-10" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 sm:text-3xl">
                      Message Received!
                    </h3>
                    <p className="max-w-md font-medium text-slate-600">
                      Thank you for reaching out. One of our lead technicians
                      will review your request and contact you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="mt-2 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition-colors hover:border-violet-300 hover:text-violet-600"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-sm font-bold text-slate-800"
                        >
                          Full Name <span className="text-red-500">*</span>
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

                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-bold text-slate-800"
                        >
                          Email Address <span className="text-red-500">*</span>
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

                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="text-sm font-bold text-slate-800"
                        >
                          Phone Number <span className="text-red-500">*</span>
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

                      <div className="space-y-2">
                        <label
                          htmlFor="device"
                          className="text-sm font-bold text-slate-800"
                        >
                          Device &amp; Issue / Subject{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="device"
                          name="device"
                          required
                          placeholder="e.g., Alienware m15 R6 - Overheating and random shutdowns"
                          className={fieldCls}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-bold text-slate-800"
                      >
                        Detailed Description{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        placeholder="Please describe the issue, any physical damage, or prior repairs..."
                        className={`${fieldCls} resize-y`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="group flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-base font-bold text-white shadow-lg shadow-violet-600/25 transition hover:-translate-y-0.5 hover:shadow-violet-600/40 sm:text-lg"
                    >
                      Send Request{" "}
                      <Send className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                    </button>

                    <p className="flex items-start justify-center gap-2 text-center text-xs text-slate-500 sm:items-center">
                      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-violet-600 sm:mt-0" />
                      Your details are only used to respond to your request.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* ---------- INFO CARDS ---------- */}
            <div className="grid gap-5 lg:col-span-1 lg:grid-rows-[auto_1fr] xl:col-span-1">
              {/* Direct contact */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 p-7 text-white shadow-xl shadow-violet-500/20 sm:p-9">
                <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-fuchsia-400/20 blur-[80px]" />

                <h3 className="relative mb-6 text-2xl font-black sm:text-3xl">
                  Direct Contact
                </h3>

                <div className="relative space-y-5">
                  <a
                    href="tel:+971501234567"
                    className="group flex items-center gap-4"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:scale-110">
                      <Phone className="size-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-violet-200">
                        Call Us
                      </span>
                      <span className="block text-lg font-bold">
                        +971 50 123 4567
                      </span>
                    </span>
                  </a>

                  <a
                    href="mailto:support@aldana.com"
                    className="group flex items-center gap-4"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:scale-110">
                      <Mail className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-violet-200">
                        Email Us
                      </span>
                      <span className="block break-words text-lg font-bold">
                        support@aldana.com
                      </span>
                    </span>
                  </a>

                  <div className="group flex items-start gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:scale-110">
                      <MapPin className="size-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-violet-200">
                        Service Center
                      </span>
                      <span className="block text-lg font-bold leading-snug">
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
                className={`${anchor} rounded-3xl bg-slate-900 p-7 text-white shadow-xl shadow-slate-900/20 sm:p-9`}
              >
                <div className="mb-6 flex items-center gap-3">
                  <Clock className="size-6 text-fuchsia-400" />
                  <h3 className="text-2xl font-black sm:text-3xl">
                    Business Hours
                  </h3>
                </div>

                <ul className="space-y-3 font-medium text-slate-300">
                  {hours.map((h, i) => (
                    <li
                      key={h.day}
                      className={`flex items-center justify-between gap-4 ${
                        i < hours.length - 1
                          ? "border-b border-white/10 pb-3"
                          : "pt-1"
                      }`}
                    >
                      <span>{h.day}</span>
                      <span
                        className={`font-bold ${
                          h.closed ? "text-fuchsia-400" : "text-white"
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
      <section className={`${sectionY} ${anchor}`}>
        <div className={wrap}>
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <h2 className="mb-3 text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">
              What happens next?
            </h2>
            <p className="text-base font-medium text-slate-500 sm:text-lg">
              Our process is transparent, fast, and designed to get your
              hardware back in your hands as quickly as possible.
            </p>
          </div>

          <ol className="grid gap-4 md:grid-cols-3 md:gap-5">
            {steps.map((s) => (
              <li
                key={s.n}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg sm:p-9"
              >
                <span className="pointer-events-none absolute -right-2 -top-6 text-[9rem] font-black leading-none text-slate-100 transition-transform duration-500 group-hover:scale-110">
                  {s.n}
                </span>

                <div className="relative">
                  <div
                    className={`mb-6 flex size-14 items-center justify-center rounded-2xl ${stepIcon[s.tone]}`}
                  >
                    <s.icon className="size-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-black text-slate-900 sm:text-2xl">
                    {s.title}
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-slate-500">
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