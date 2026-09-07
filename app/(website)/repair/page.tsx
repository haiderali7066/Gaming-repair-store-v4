"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Laptop,
  Mail,
  MonitorCog,
  Phone,
  ShieldCheck,
  Tablet,
  Upload,
  User,
  Wrench,
} from "lucide-react";
import { useState } from "react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Secure Request",
    text: "Your information stays private",
  },
  {
    icon: Clock,
    title: "Fast Response",
    text: "Quick review from our team",
  },
  {
    icon: Wrench,
    title: "Expert Technicians",
    text: "Professional device care",
  },
];

export default function RepairPage() {
  const [contactMethod, setContactMethod] = useState("WhatsApp");

  return (
    <main className="min-h-screen overflow-hidden bg-slate-100 text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute right-[-10%] top-[-35%] h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[120px]" />
          <div className="absolute bottom-[-45%] left-[-10%] h-[450px] w-[450px] rounded-full bg-indigo-600/15 blur-[120px]" />

          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="relative mx-auto max-w-[96rem] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-18">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-violet-300 sm:text-xs">
                <Wrench className="size-3.5" />
                Professional Repair Center
              </div>

              <h1 className="mt-4 text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                Get your device
                <span className="block bg-gradient-to-r from-violet-400 via-violet-300 to-indigo-400 bg-clip-text text-transparent">
                  back in the game.
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7 lg:text-lg">
                Tell us what's wrong with your device and our repair team will
                review your request, diagnose the issue, and get back to you
                with the next steps.
              </p>

              <a
                href="#repair-form"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-violet-600 px-5 text-xs font-bold text-white shadow-xl shadow-violet-900/30 transition hover:bg-violet-500 sm:h-12 sm:text-sm"
              >
                Start Repair Request
                <ArrowRight className="ml-2 size-4" />
              </a>

              {/* Trust */}
              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-6 sm:gap-6">
                {trustItems.map(({ icon: Icon, title, text }) => (
                  <div key={title}>
                    <Icon className="size-4 text-violet-400 sm:size-5" />

                    <p className="mt-2 text-[10px] font-bold text-white sm:text-xs">
                      {title}
                    </p>

                    <p className="mt-0.5 hidden text-[10px] leading-4 text-slate-500 sm:block">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero side panel */}
            <div className="hidden lg:block">
              <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-400">
                      We repair
                    </p>
                    <h2 className="mt-1 text-xl font-black text-white">
                      Gaming Hardware
                    </h2>
                  </div>

                  <div className="flex size-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                    <MonitorCog className="size-5" />
                  </div>
                </div>

                <div className="mt-5 space-y-2.5">
                  {[
                    {
                      icon: MonitorCog,
                      title: "Gaming PCs",
                      text: "Hardware, cooling & components",
                    },
                    {
                      icon: Laptop,
                      title: "Gaming Laptops",
                      text: "Screens, batteries & boards",
                    },
                    {
                      icon: Tablet,
                      title: "iPad & Tablets",
                      text: "Displays, ports & batteries",
                    },
                  ].map(({ icon: Icon, title, text }) => (
                    <div
                      key={title}
                      className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.035] p-3"
                    >
                      <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                        <Icon className="size-5" />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-white">
                          {title}
                        </p>
                        <p className="mt-0.5 text-[10px] text-slate-500">
                          {text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-violet-500/10 bg-violet-500/5 p-4">
                  <div className="flex gap-2.5">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                    <div>
                      <p className="text-xs font-bold text-white">
                        Not sure what's wrong?
                      </p>
                      <p className="mt-1 text-[10px] leading-4 text-slate-500">
                        That's okay. Describe the symptoms and our technicians
                        will help identify the issue.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section
        id="repair-form"
        className="scroll-mt-10 border-b border-slate-200 bg-slate-100 py-8 sm:py-12 lg:py-16"
      >
        <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-10">
            {/* LEFT INFO */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-600 sm:text-xs">
                Repair request
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Tell us what happened.
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
                Complete the form and give us as much information as possible.
                It helps our technicians understand the problem before
                contacting you.
              </p>

              <div className="mt-6 space-y-2.5">
                {[
                  "Professional diagnosis",
                  "Transparent communication",
                  "Secure repair tracking",
                  "Experienced technicians",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5"
                  >
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
                    <span className="text-xs font-semibold text-slate-600">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* FORM */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
              {/* Form Header */}
              <div className="bg-slate-950 px-5 py-5 sm:px-7">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                    <Wrench className="size-5" />
                  </div>

                  <div>
                    <h3 className="text-base font-black text-white sm:text-lg">
                      Submit a repair request
                    </h3>

                    <p className="mt-0.5 text-[10px] text-slate-500 sm:text-xs">
                      Usually takes less than 2 minutes
                    </p>
                  </div>
                </div>
              </div>

              <form className="space-y-6 p-5 sm:p-7">
                {/* CUSTOMER DETAILS */}
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                      <User className="size-3.5" />
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-slate-900">
                        Your details
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        So we know how to reach you
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-xs font-bold text-slate-700"
                      >
                        Full name
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your full name"
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1.5 block text-xs font-bold text-slate-700"
                      >
                        Phone number
                      </label>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+92 300 1234567"
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/10"
                      />
                    </div>
                  </div>
                </div>

                {/* CONTACT METHOD */}
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    Preferred contact method
                  </label>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      {
                        name: "WhatsApp",
                        icon: Phone,
                      },
                      {
                        name: "Phone",
                        icon: Phone,
                      },
                      {
                        name: "Email",
                        icon: Mail,
                      },
                    ].map(({ name, icon: Icon }) => (
                      <label
                        key={name}
                        className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-bold transition ${
                          contactMethod === name
                            ? "border-violet-500 bg-violet-50 text-violet-600"
                            : "border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="contactMethod"
                          value={name}
                          checked={contactMethod === name}
                          onChange={() => setContactMethod(name)}
                          className="sr-only"
                        />

                        <Icon className="size-3.5" />
                        {name}
                      </label>
                    ))}
                  </div>
                </div>

                {/* DEVICE */}
                <div>
                  <div className="mb-4">
                    <h4 className="text-sm font-black text-slate-900">
                      Device information
                    </h4>
                    <p className="mt-0.5 text-[10px] text-slate-400">
                      Tell us what you're bringing in
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="device"
                        className="mb-1.5 block text-xs font-bold text-slate-700"
                      >
                        Device type
                      </label>

                      <select
                        id="device"
                        name="device"
                        required
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/10"
                      >
                        <option value="">Select device</option>
                        <option value="gaming-pc">Gaming PC</option>
                        <option value="gaming-laptop">
                          Gaming Laptop
                        </option>
                        <option value="ipad">iPad</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="model"
                        className="mb-1.5 block text-xs font-bold text-slate-700"
                      >
                        Brand / Model
                      </label>

                      <input
                        id="model"
                        name="model"
                        type="text"
                        placeholder="e.g. ASUS ROG G15"
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/10"
                      />
                    </div>
                  </div>
                </div>

                {/* ISSUE */}
                <div>
                  <label
                    htmlFor="issue"
                    className="mb-1.5 block text-xs font-bold text-slate-700"
                  >
                    Describe the problem
                  </label>

                  <textarea
                    id="issue"
                    name="issue"
                    required
                    rows={5}
                    placeholder="What happened? When did the problem start? Any unusual sounds, overheating, crashes, physical damage, or other symptoms?"
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm leading-5 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/10"
                  />

                  <p className="mt-1.5 text-[10px] text-slate-400">
                    More details help our technicians diagnose your device
                    faster.
                  </p>
                </div>

                {/* UPLOAD */}
                <div>
                  <label
                    htmlFor="attachment"
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 transition hover:border-violet-300 hover:bg-violet-50/50"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-violet-600 shadow-sm">
                      <Upload className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-700">
                        Add photos of the issue
                      </p>

                      <p className="mt-0.5 truncate text-[10px] text-slate-400">
                        Optional • JPG, PNG • Up to 10MB
                      </p>
                    </div>

                    <input
                      id="attachment"
                      name="attachment"
                      type="file"
                      accept="image/*"
                      multiple
                      className="sr-only"
                    />
                  </label>
                </div>

                {/* SUBMIT */}
                <div className="border-t border-slate-100 pt-5">
                  <button
                    type="submit"
                    className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-violet-600 px-5 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700 sm:h-12"
                  >
                    Submit Repair Request
                    <ArrowRight className="ml-2 size-4" />
                  </button>

                  <div className="mt-3 flex items-start justify-center gap-1.5 text-center text-[10px] leading-4 text-slate-400">
                    <ShieldCheck className="mt-0.5 size-3 shrink-0" />
                    Your information is securely handled and only used to
                    process your repair request.
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-slate-950 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-400">
            Need help first?
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Not sure which service you need?
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-slate-500 sm:text-sm">
            Don't worry. Explain the symptoms in your repair request and our
            technicians can help identify the right service.
          </p>

          <Link
            href="/"
            className="mt-5 inline-flex h-10 items-center rounded-xl border border-white/10 bg-white/5 px-5 text-xs font-bold text-white transition hover:bg-white/10"
          >
            Back to Home
            <ArrowRight className="ml-2 size-3.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}