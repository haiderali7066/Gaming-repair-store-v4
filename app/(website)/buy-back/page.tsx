"use client";

import Image from "next/image";
import { submitBuyBack } from "@/actions/requests";
import { useActionState, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  CheckCircle2,
  ClipboardList,
  Gamepad2,
  HandCoins,
  HelpCircle,
  ImagePlus,
  Laptop,
  MapPin,
  MessageCircle,
  Package,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Truck,
  Upload,
  User,
  X,
} from "lucide-react";

/* ================================================================== */
/* TYPES & DATA                                                       */
/* ================================================================== */

type BuyBackState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
};

const initialState: BuyBackState = {};

const FORM_ID = "trade-in-form";
const MAX_IMAGES = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

/* Hero background — swap for your own generated image if you like */
const HERO_IMG =
  "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1792820902/Modern_Apple_and_Gaming_Tech_Showcase_n0zmfa.png";

/* Headlines from "Unlock the Worth of Your Technology.docx" */
const headlines = [
  "Unlock the Worth of Your Technology",
  "Where Pre-Owned Technology Finds New Value",
  "Elevate Your Upgrade Through Intelligent Trading",
  "Transform Surplus Technology Into Lasting Value",
  "A Refined Approach to Technology Trade-Ins",
  "Turn Yesterday’s Devices Into Tomorrow’s Advantages",
  "Give Your Technology a Worthwhile Next Chapter",
  "Your Next Investment Begins With What You Own",
  "Redefine the Value of Your Old Electronics",
  "Trade With Confidence. Upgrade With Purpose.",
  "Discover the Potential Within Your Pre-Owned Devices",
  "Make Your Unused Technology Work for You",
  "From Retired Devices to Renewed Opportunities",
  "A Smarter Exchange for Modern Technology",
  "Realise More Value From Your Existing Technology",
  "Convert Unused Electronics Into New Possibilities",
  "Make Every Upgrade More Meaningful",
  "Extend the Value of Technology Beyond Its First Owner",
  "Your Technology Has Value Beyond Its First Use",
];

/* Same brand logos as the other service pages */
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

const heroPerks = [
  { label: "Fair Valuation", icon: BadgeCheck },
  { label: "Fast Payment", icon: Banknote },
  { label: "Free Pickup Option", icon: Truck },
  { label: "Secure & Verified", icon: ShieldCheck },
];

const steps = [
  {
    icon: ClipboardList,
    title: "Tell us about your device",
    text: "Fill in the short form below with your device details and a few photos.",
  },
  {
    icon: MessageCircle,
    title: "Get your offer",
    text: "Our team reviews your request and contacts you on WhatsApp with a quote.",
  },
  {
    icon: Package,
    title: "Hand it over",
    text: "Drop it off at our store, book a pickup, or send it by courier.",
  },
  {
    icon: HandCoins,
    title: "Get paid",
    text: "Once the device is verified, you receive your payment right away.",
  },
];

const reasons = [
  {
    icon: BadgeCheck,
    title: "Honest valuations",
    text: "Offers are based on real market value and the actual condition of your device.",
  },
  {
    icon: Banknote,
    title: "Quick payouts",
    text: "No waiting around. Get paid as soon as your device is checked and confirmed.",
  },
  {
    icon: Truck,
    title: "Flexible handover",
    text: "Visit our store, choose pickup & delivery, or use courier — whatever suits you.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & transparent",
    text: "ID verification protects both sides, and your details are never shared.",
  },
];

const faqs = [
  {
    q: "What devices do you buy?",
    a: "We buy gaming PCs, gaming laptops, MacBooks, iPads, mobile phones and iPhones, and other gaming or tech gear. If you're unsure, choose “Other Device” and describe it.",
  },
  {
    q: "Why do you need my ID number?",
    a: "ID details are required for buy-back verification. This keeps every trade-in safe and legitimate for both you and us.",
  },
  {
    q: "Do I have to accept the price I enter?",
    a: "No. The expected price just helps us understand your target. We'll send our own offer after reviewing your device, and you're free to decline.",
  },
  {
    q: "Does my device need to be in perfect condition?",
    a: "Not at all. We accept devices from Like New to Needs Repair — the condition simply affects the offer.",
  },
  {
    q: "How long does it take to get a reply?",
    a: "Our team usually responds shortly after your request is submitted. Adding clear photos and full specifications speeds things up.",
  },
];

const DEVICE_TYPES = [
  {
    value: "Gaming PC",
    label: "Gaming PC",
    description: "Desktop gaming systems",
    icon: Gamepad2,
  },
  {
    value: "Gaming Laptop",
    label: "Gaming Laptop",
    description: "Gaming notebooks",
    icon: Laptop,
  },
  {
    value: "MacBook",
    label: "MacBook",
    description: "Apple MacBook notebooks",
    icon: Laptop,
  },
  {
    value: "iPad",
    label: "iPad",
    description: "Apple iPad devices",
    icon: Smartphone,
  },
  {
    value: "Mobile Phone",
    label: "Mobile / iPhone",
    description: "Smartphones & iPhones",
    icon: Smartphone,
  },
  {
    value: "Other",
    label: "Other Device",
    description: "Other gaming or tech gear",
    icon: Package,
  },
];

const CONDITIONS = ["Like New", "Excellent", "Good", "Fair", "Needs Repair"];

const SERVICE_OPTIONS = [
  {
    title: "Drop Off at Our Store",
    description: "Visit our store and drop off your device.",
    icon: MapPin,
  },
  {
    title: "Pickup & Delivery",
    description: "We will pick up your device from you.",
    icon: Truck,
  },
  {
    title: "Courier Service",
    description: "Send your device to us via courier.",
    icon: Package,
  },
];

/* Shared tokens (wider page, compact fields) */
const wrap = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-[1500px]";
const field =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-violet-600 focus:ring-4 focus:ring-violet-600/15";
const inputCls = `${field} h-11`;
const textareaCls = `${field} py-2.5 leading-relaxed resize-none`;

/* ================================================================== */
/* PAGE                                                               */
/* ================================================================== */

export default function BuyBackPage() {
  const [state, formAction, isPending] = useActionState(
    submitBuyBack,
    initialState
  );

  const [deviceType, setDeviceType] = useState("Gaming PC");
  const [servicePreference, setServicePreference] = useState(
    "Drop Off at Our Store"
  );

  /* ---------- rotating headline ---------- */
  const [headlineIdx, setHeadlineIdx] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setHeadlineIdx((i) => (i + 1) % headlines.length),
      4000
    );
    return () => clearInterval(id);
  }, []);

  /* ---------- image upload (drag & drop, previews, max 5) ---------- */
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [fileNote, setFileNote] = useState("");
  const [dragging, setDragging] = useState(false);

  /* keep the real <input> in sync so the form submits exactly these files */
  function commitFiles(next: File[]) {
    setFiles(next);
    if (fileInputRef.current) {
      const dt = new DataTransfer();
      next.forEach((f) => dt.items.add(f));
      fileInputRef.current.files = dt.files;
    }
  }

  function addFiles(list: FileList | File[] | null) {
    if (!list) return;
    const incoming = Array.from(list);
    const images = incoming.filter((f) => ALLOWED_TYPES.includes(f.type));
    let note = "";

    if (images.length < incoming.length) {
      note = "Only JPG, PNG or WEBP images are accepted.";
    }

    const merged = [...files];
    for (const img of images) {
      const duplicate = merged.some(
        (f) => f.name === img.name && f.size === img.size
      );
      if (!duplicate) merged.push(img);
    }

    if (merged.length > MAX_IMAGES) {
      note = `You can upload up to ${MAX_IMAGES} photos.`;
    }

    setFileNote(note);
    commitFiles(merged.slice(0, MAX_IMAGES));
  }

  function removeFile(index: number) {
    setFileNote("");
    commitFiles(files.filter((_, i) => i !== index));
  }

  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [files]);

  /* ---------- bring the result message into view after submit ---------- */
  const resultRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (state?.success || state?.message) {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [state]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-800">
      {/* ============================================================ */}
      {/* HERO                                                         */}
      {/* ============================================================ */}
      <section className="relative isolate flex min-h-[400px] flex-col sm:min-h-[440px] overflow-hidden bg-[#050816] text-white lg:min-h-[500px]">
        <Image
          src={HERO_IMG}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[70%_50%] lg:object-right"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#050816] via-[#050816]/85 to-[#050816]/25 lg:via-[#050816]/70 lg:to-transparent" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#050816]/80 via-transparent to-[#050816]/30" />

        <div
          className={`${wrap} flex flex-1 flex-col justify-center py-10 sm:py-12`}
        >
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-200 backdrop-blur">
              <Sparkles className="size-3.5" /> Trade-In &amp; Buy Back
            </span>

            <h1 className="mt-4 text-3xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block text-white">TURN YOUR OLD TECH</span>
              <span className="block bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 bg-clip-text text-transparent">
                INTO CASH
              </span>
            </h1>

            {/* Rotating tagline */}
            <p
              key={headlineIdx}
              aria-live="polite"
              className="mt-4 min-h-[1.75rem] text-base font-bold text-violet-300 animate-in fade-in duration-500 sm:text-lg"
            >
              {headlines[headlineIdx]}
            </p>

            <p className="mt-2 max-w-xl text-sm font-medium leading-relaxed text-slate-300 sm:text-base">
              Selling a gaming PC, laptop, MacBook, iPad or phone? Tell us about
              it in two minutes and get a fair, no-obligation offer.
            </p>

            <ul className="mt-6 grid max-w-2xl grid-cols-2 gap-2.5 lg:grid-cols-4">
              {heroPerks.map((p) => (
                <li
                  key={p.label}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2 py-3 text-center backdrop-blur"
                >
                  <p.icon className="size-6 text-violet-400" />
                  <span className="text-[10px] font-bold uppercase leading-tight tracking-wide text-slate-100">
                    {p.label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={`#${FORM_ID}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-violet-900/50 transition-transform hover:-translate-y-0.5"
              >
                Get my offer <ArrowRight className="size-4" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/15"
              >
                How it works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* BRAND MARQUEE                                                */}
      {/* ============================================================ */}
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

      {/* ============================================================ */}
      {/* HOW IT WORKS                                                 */}
      {/* ============================================================ */}
      <section
        id="how-it-works"
        className="scroll-mt-20 pb-6 pt-8 sm:pt-10"
      >
        <div className={wrap}>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-violet-700">
              <Sparkles className="size-3.5" /> Simple Process
            </span>
            <h2 className="mb-2 text-2xl font-black text-slate-900 sm:text-3xl lg:text-4xl">
              Sell your device in 4 easy steps
            </h2>
            <p className="text-sm text-slate-500 sm:text-base">
              No haggling, no hidden fees. Just a clear process from request to
              payment.
            </p>
          </div>

          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <span className="absolute right-4 top-3 text-4xl font-black text-slate-100">
                  {i + 1}
                </span>
                <div className="relative flex size-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <s.icon className="size-5" />
                </div>
                <h3 className="relative mt-3 text-base font-extrabold text-slate-900">
                  {s.title}
                </h3>
                <p className="relative mt-1.5 text-sm leading-relaxed text-slate-500">
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FORM — wide, two-column, fits one screen on desktop          */}
      {/* ============================================================ */}
      <section
        id={FORM_ID}
        className="scroll-mt-4 py-6 sm:py-8"
      >
        <div className={wrap}>
          <div className="mb-3 flex flex-col gap-0.5 text-center lg:flex-row lg:items-baseline lg:justify-between lg:text-left">
            <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
              Request your trade-in offer
            </h2>
            <p className="text-xs text-slate-500 sm:text-sm">
              Takes about two minutes. Fields marked{" "}
              <span className="font-bold text-red-500">*</span> are required.
            </p>
          </div>

          <form action={formAction} className="w-full space-y-4">
            {/* ---------- result messages ---------- */}
            <div ref={resultRef} className="scroll-mt-28 empty:hidden">
              {state?.success && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-3 text-green-800"
                >
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                  <div>
                    <p className="font-bold">Request submitted successfully</p>
                    <p className="mt-0.5 text-sm leading-6">
                      {state.message ||
                        "Thank you. Our team will review your device and contact you shortly."}
                    </p>
                  </div>
                </div>
              )}

              {!state?.success && state?.message && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700"
                >
                  {state.message}
                </div>
              )}
            </div>

            <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-5">
              {/* ============ LEFT COLUMN ============ */}
              <div className="space-y-4">
                {/* ---------- 1. SELECT YOUR DEVICE ---------- */}
                <Card>
                  <SectionHeading number="1" title="Select your device" />

                  <input type="hidden" name="deviceType" value={deviceType} />

                  <div
                    role="radiogroup"
                    aria-label="Device type"
                    className="grid grid-cols-2 gap-2 sm:grid-cols-3"
                  >
                    {DEVICE_TYPES.map((device) => {
                      const Icon = device.icon;
                      const active = deviceType === device.value;

                      return (
                        <button
                          key={device.value}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          title={device.description}
                          onClick={() => setDeviceType(device.value)}
                          className={`relative flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left transition-all duration-200 ${
                            active
                              ? "border-violet-600 bg-violet-50 ring-4 ring-violet-600/10"
                              : "border-slate-200 bg-white hover:border-violet-300 hover:shadow-sm"
                          }`}
                        >
                          <span
                            className={`flex size-9 shrink-0 items-center justify-center rounded-md ${
                              active
                                ? "bg-violet-600 text-white"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            <Icon className="size-4" />
                          </span>

                          <span className="min-w-0 text-[13px] font-bold leading-tight text-slate-900 sm:text-sm">
                            {device.label}
                          </span>

                          {active && (
                            <CheckCircle2 className="absolute right-1.5 top-1.5 size-3.5 text-violet-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {state?.errors?.deviceType && (
                    <ErrorText>{state.errors.deviceType}</ErrorText>
                  )}
                </Card>

                {/* ---------- 4. YOUR DETAILS ---------- */}
                <Card>
                  <SectionHeading number="2" title="Your details" />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <FormField
                      label="Full Name"
                      htmlFor="name"
                      required
                      error={state?.errors?.name}
                    >
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                        <input
                          id="name"
                          name="name"
                          required
                          autoComplete="name"
                          placeholder="Enter your full name"
                          className={`${inputCls} pl-9`}
                        />
                      </div>
                    </FormField>

                    <FormField
                      label="ID Number"
                      htmlFor="idNumber"
                      required
                      error={state?.errors?.idNumber}
                    >
                      <input
                        id="idNumber"
                        name="idNumber"
                        required
                        placeholder="Emirates ID / ID number"
                        className={inputCls}
                      />
                    </FormField>

                    <FormField
                      label="Phone / WhatsApp"
                      htmlFor="phone"
                      required
                      error={state?.errors?.phone}
                    >
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="+971 50 123 4567"
                        className={inputCls}
                      />
                    </FormField>

                    <FormField
                      label="Expected Price (AED)"
                      htmlFor="expectedPrice"
                      required
                      error={state?.errors?.expectedPrice}
                    >
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                          AED
                        </span>
                        <input
                          id="expectedPrice"
                          name="expectedPrice"
                          type="number"
                          inputMode="numeric"
                          min="1"
                          required
                          placeholder="e.g. 2500"
                          className={`${inputCls} pl-11`}
                        />
                      </div>
                    </FormField>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    ID is required for buy-back verification only.
                  </p>
                </Card>

                {/* ---------- 5. SERVICE PREFERENCE ---------- */}
                <Card>
                  <SectionHeading number="3" title="Service preference" />

                  <input
                    type="hidden"
                    name="servicePreference"
                    value={servicePreference}
                  />

                  <div
                    role="radiogroup"
                    aria-label="Service preference"
                    className="grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3"
                  >
                    {SERVICE_OPTIONS.map((item) => {
                      const Icon = item.icon;
                      const active = servicePreference === item.title;

                      return (
                        <button
                          key={item.title}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => setServicePreference(item.title)}
                          className={`relative flex items-start gap-2.5 rounded-lg border p-3 text-left transition-all sm:flex-col sm:gap-2 lg:flex-row xl:flex-col ${
                            active
                              ? "border-violet-600 bg-violet-50 ring-4 ring-violet-600/10"
                              : "border-slate-200 bg-white hover:border-violet-300 hover:shadow-sm"
                          }`}
                        >
                          <span
                            className={`flex size-9 shrink-0 items-center justify-center rounded-md ${
                              active
                                ? "bg-violet-600 text-white"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            <Icon className="size-4" />
                          </span>

                          <span className="min-w-0 pr-5 sm:pr-0 lg:pr-5 xl:pr-0">
                            <span className="block text-sm font-bold leading-tight text-slate-900">
                              {item.title}
                            </span>
                            <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                              {item.description}
                            </span>
                          </span>

                          {active && (
                            <CheckCircle2 className="absolute right-2 top-2 size-3.5 text-violet-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </Card>
              </div>

              {/* ============ RIGHT COLUMN ============ */}
              <div className="space-y-4">
                {/* ---------- DEVICE DETAILS ---------- */}
                <Card>
                  <SectionHeading number="4" title="Device details" />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <FormField
                      label="Brand"
                      htmlFor="brand"
                      required
                      error={state?.errors?.brand}
                    >
                      <input
                        id="brand"
                        name="brand"
                        required
                        placeholder="e.g. ASUS, Apple, HP"
                        className={inputCls}
                      />
                    </FormField>

                    <FormField
                      label="Model"
                      htmlFor="model"
                      required
                      error={state?.errors?.model}
                    >
                      <input
                        id="model"
                        name="model"
                        required
                        placeholder="e.g. ROG Strix G16"
                        className={inputCls}
                      />
                    </FormField>
                  </div>

                  {/* Condition — tap-friendly chips */}
                  <fieldset className="mt-3">
                    <legend className="mb-1 block text-sm font-semibold text-slate-800">
                      Device condition
                      <span className="ml-1 text-red-500">*</span>
                    </legend>

                    <div className="flex flex-wrap gap-1.5">
                      {CONDITIONS.map((item) => (
                        <label key={item} className="cursor-pointer">
                          <input
                            type="radio"
                            name="condition"
                            value={item}
                            required
                            className="peer sr-only"
                          />
                          <span className="inline-flex h-9 items-center rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-violet-300 peer-checked:border-violet-600 peer-checked:bg-violet-600 peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-violet-600/20 sm:text-sm">
                            {item}
                          </span>
                        </label>
                      ))}
                    </div>

                    {state?.errors?.condition && (
                      <ErrorText>{state.errors.condition}</ErrorText>
                    )}
                  </fieldset>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <FormField
                      label="Specifications"
                      htmlFor="specifications"
                      required
                      error={state?.errors?.specifications}
                    >
                      <textarea
                        id="specifications"
                        name="specifications"
                        required
                        rows={4}
                        placeholder="CPU, GPU, RAM, storage, screen, battery health…"
                        className={textareaCls}
                      />
                    </FormField>

                    <FormField
                      label="Tell us about your device"
                      htmlFor="description"
                      required
                      error={state?.errors?.description}
                    >
                      <textarea
                        id="description"
                        name="description"
                        required
                        rows={4}
                        placeholder="Issues, accessories included, warranty status…"
                        className={textareaCls}
                      />
                    </FormField>
                  </div>
                </Card>

                {/* ---------- PHOTOS ---------- */}
                <Card>
                  <SectionHeading number="5" title="Photos (optional)" />

                  <label
                    htmlFor="images"
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragging(false);
                      addFiles(e.dataTransfer.files);
                    }}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed p-4 transition ${
                      dragging
                        ? "border-violet-600 bg-violet-100"
                        : "border-violet-300 bg-violet-50/50 hover:border-violet-600 hover:bg-violet-50"
                    }`}
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-violet-600 text-white shadow-sm">
                      <Upload className="size-5" />
                    </span>

                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-slate-900">
                        Drag &amp; drop or tap to browse
                      </span>
                      <span className="block text-xs text-slate-500">
                        JPG, PNG or WEBP — up to {MAX_IMAGES} images
                      </span>
                    </span>

                    {files.length > 0 && (
                      <span className="ml-auto shrink-0 text-xs font-semibold text-slate-500">
                        {files.length}/{MAX_IMAGES}
                      </span>
                    )}

                    <input
                      ref={fileInputRef}
                      id="images"
                      name="images"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      className="sr-only"
                      onChange={(e) => addFiles(e.target.files)}
                    />
                  </label>

                  {fileNote && (
                    <p className="mt-1.5 text-xs font-medium text-amber-600">
                      {fileNote}
                    </p>
                  )}

                  {files.length > 0 && (
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {files.map((file, index) => (
                        <li
                          key={`${file.name}-${file.size}`}
                          className="relative size-16 overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
                        >
                          {previews[index] ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={previews[index]}
                              alt={file.name}
                              className="size-full object-cover"
                            />
                          ) : (
                            <span className="flex size-full items-center justify-center text-violet-500">
                              <ImagePlus className="size-5" />
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute right-0.5 top-0.5 flex size-5 items-center justify-center rounded-full bg-slate-950/70 text-white backdrop-blur transition hover:bg-red-500"
                            aria-label={`Remove ${file.name}`}
                          >
                            <X className="size-3" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {state?.errors?.images && (
                    <ErrorText>{state.errors.images}</ErrorText>
                  )}
                </Card>

                {/* ---------- SUBMIT ---------- */}
                <Card>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition hover:-translate-y-0.5 hover:shadow-violet-600/40 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {isPending ? (
                      <>
                        <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Submitting Request...
                      </>
                    ) : (
                      <>
                        Submit Trade-In Request <ArrowRight className="size-5" />
                      </>
                    )}
                  </button>

                  <div className="mt-2 flex items-center justify-center gap-2 text-center text-xs text-slate-500">
                    <ShieldCheck className="size-3.5 shrink-0 text-violet-600" />
                    <span>
                      Your information is secure and only used to process your
                      trade-in request.
                    </span>
                  </div>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* ============================================================ */}
      {/* VALUE HEADLINES (new content)                                */}
      {/* ============================================================ */}
      <section className="py-6 sm:py-8">
        <div className={wrap}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl lg:text-4xl">
              Unlock the Worth of Your Technology
            </h2>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Your old devices still have value. Here&apos;s how we see it.
            </p>
          </div>

          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {headlines.slice(1).map((line) => (
              <li
                key={line}
                className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-violet-600" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================================================ */}
      {/* WHY CHOOSE US                                                */}
      {/* ============================================================ */}
      <section className="py-3 sm:py-4">
        <div className={wrap}>
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 p-6 sm:p-8 lg:p-10">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl">
                Why trade in with us?
              </h2>
              <p className="mt-2 text-sm font-medium text-violet-100 sm:text-base">
                We make selling your tech simple, safe and fair.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {reasons.map((r) => (
                <div
                  key={r.title}
                  className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur"
                >
                  <div className="flex size-10 items-center justify-center rounded-xl bg-white/20 text-white">
                    <r.icon className="size-5" />
                  </div>
                  <h3 className="mt-3 text-base font-extrabold text-white">
                    {r.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-violet-100">
                    {r.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FAQ                                                          */}
      {/* ============================================================ */}
      <section className="py-6 sm:py-8">
        <div className={wrap}>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-violet-700">
                <HelpCircle className="size-3.5" /> FAQ
              </span>
              <h2 className="text-2xl font-black text-slate-900 sm:text-3xl lg:text-4xl">
                Questions? We&apos;ve got answers
              </h2>
            </div>

            <div className="mt-6 space-y-2.5">
              {faqs.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-slate-200 bg-white px-5 py-3.5 shadow-sm open:border-violet-300"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-slate-900 sm:text-base [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-lg font-bold leading-none text-violet-700 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                    {item.a}
                  </p>
                </details>
              ))}
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

/* ================================================================== */
/* COMPONENTS                                                         */
/* ================================================================== */

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:p-5">
      {children}
    </div>
  );
}

function SectionHeading({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-xs font-bold text-white shadow-sm">
        {number}
      </span>

      <h2 className="text-sm font-extrabold uppercase tracking-wide text-slate-900 sm:text-base">
        {title}
      </h2>
    </div>
  );
}

function FormField({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1 block text-sm font-semibold text-slate-800"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {children}

      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1 text-xs font-medium text-red-500" role="alert">
      {children}
    </p>
  );
}