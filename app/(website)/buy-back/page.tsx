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
    label: "Mobile Phone / iPhone",
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

/* Shared tokens */
const wrap = "mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10";
const field =
  "w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-violet-600 focus:ring-4 focus:ring-violet-600/15";
const inputCls = `${field} h-12`;
const textareaCls = `${field} py-3 leading-relaxed`;

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
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* ============================================================ */}
      {/* HERO                                                         */}
      {/* ============================================================ */}
      <section className="relative isolate flex min-h-[600px] flex-col overflow-hidden bg-[#050816] text-white lg:min-h-[680px]">
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
          className={`${wrap} flex flex-1 flex-col justify-center py-12 sm:py-16`}
        >
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-200 backdrop-blur">
              <Sparkles className="size-3.5" /> Trade-In &amp; Buy Back
            </span>

            <h1 className="mt-5 text-4xl font-black leading-[1] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
              <span className="block text-white">TURN YOUR OLD TECH</span>
              <span className="block bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-400 bg-clip-text text-transparent">
                INTO CASH
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-slate-300 sm:text-xl">
              Selling a gaming PC, laptop, MacBook, iPad or phone? Tell us about
              it in two minutes and get a fair, no-obligation offer.
            </p>

            <ul className="mt-8 grid max-w-3xl grid-cols-2 gap-3 lg:grid-cols-4">
              {heroPerks.map((p) => (
                <li
                  key={p.label}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2 py-4 text-center backdrop-blur"
                >
                  <p.icon className="size-7 text-violet-400" />
                  <span className="text-[11px] font-bold uppercase leading-tight tracking-wide text-slate-100">
                    {p.label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`#${FORM_ID}`}
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-violet-900/50 transition-transform hover:-translate-y-0.5 sm:text-base"
              >
                Get my offer <ArrowRight className="size-5" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/15 sm:text-base"
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
      <div className="relative overflow-hidden border-b border-slate-200 bg-white py-5">
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
      {/* HOW IT WORKS                                                 */}
      {/* ============================================================ */}
      <section
        id="how-it-works"
        className="scroll-mt-24 py-10 sm:py-14 lg:py-16"
      >
        <div className={wrap}>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-700">
              <Sparkles className="size-3.5" /> Simple Process
            </span>
            <h2 className="mb-3 text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">
              Sell your device in 4 easy steps
            </h2>
            <p className="text-base text-slate-500 sm:text-lg">
              No haggling, no hidden fees. Just a clear process from request to
              payment.
            </p>
          </div>

          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="absolute right-5 top-4 text-5xl font-black text-slate-100">
                  {i + 1}
                </span>
                <div className="relative flex size-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                  <s.icon className="size-6" />
                </div>
                <h3 className="relative mt-4 text-lg font-extrabold text-slate-900">
                  {s.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-slate-500">
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FORM                                                         */}
      {/* ============================================================ */}
      <section id={FORM_ID} className="scroll-mt-24 pb-10 sm:pb-14 lg:pb-16">
        <div className={wrap}>
          <div className="mx-auto mb-6 max-w-3xl text-center">
            <h2 className="mb-2 text-3xl font-black text-slate-900 sm:text-4xl">
              Request your trade-in offer
            </h2>
            <p className="text-base text-slate-500 sm:text-lg">
              It takes about two minutes. Fields marked{" "}
              <span className="font-bold text-red-500">*</span> are required.
            </p>
          </div>

          <form
            action={formAction}
            className="mx-auto max-w-7xl space-y-5"
          >
            {/* ---------- result messages ---------- */}
            <div ref={resultRef} className="scroll-mt-28 empty:hidden">
              {state?.success && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-5 text-green-800"
                >
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                  <div>
                    <p className="font-bold">Request submitted successfully</p>
                    <p className="mt-1 text-sm leading-6">
                      {state.message ||
                        "Thank you. Our team will review your device and contact you shortly."}
                    </p>
                  </div>
                </div>
              )}

              {!state?.success && state?.message && (
                <div
                  role="alert"
                  className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-700"
                >
                  {state.message}
                </div>
              )}
            </div>

            {/* ---------- 1. SELECT YOUR DEVICE ---------- */}
            <Card>
              <SectionHeading number="1" title="Select your device" />

              <input type="hidden" name="deviceType" value={deviceType} />

              <div
                role="radiogroup"
                aria-label="Device type"
                className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3"
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
                      onClick={() => setDeviceType(device.value)}
                      className={`relative flex flex-col rounded-2xl border p-4 text-left transition-all duration-200 sm:p-5 ${
                        active
                          ? "border-violet-600 bg-violet-50 ring-4 ring-violet-600/10"
                          : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md"
                      }`}
                    >
                      <span
                        className={`flex size-11 items-center justify-center rounded-xl sm:size-12 ${
                          active
                            ? "bg-violet-600 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <Icon className="size-5 sm:size-6" />
                      </span>

                      <span className="mt-3 text-sm font-bold text-slate-900 sm:text-base">
                        {device.label}
                      </span>
                      <span className="mt-0.5 text-xs text-slate-500">
                        {device.description}
                      </span>

                      {active && (
                        <CheckCircle2 className="absolute right-3 top-3 size-5 text-violet-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              {state?.errors?.deviceType && (
                <ErrorText>{state.errors.deviceType}</ErrorText>
              )}
            </Card>

            {/* ---------- 2. DEVICE DETAILS ---------- */}
            <Card>
              <SectionHeading number="2" title="Device details" />

              <div className="grid gap-5 md:grid-cols-2">
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
                    placeholder="e.g. ASUS, Apple, Samsung, HP"
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
                    placeholder="e.g. ROG Strix G16, MacBook Pro M3, iPhone 15 Pro"
                    className={inputCls}
                  />
                </FormField>
              </div>

              {/* Condition — tap-friendly chips */}
              <fieldset className="mt-5">
                <legend className="mb-2 block text-sm font-semibold text-slate-800">
                  Device condition
                  <span className="ml-1 text-red-500">*</span>
                </legend>

                <div className="flex flex-wrap gap-2">
                  {CONDITIONS.map((item) => (
                    <label key={item} className="cursor-pointer">
                      <input
                        type="radio"
                        name="condition"
                        value={item}
                        required
                        className="peer sr-only"
                      />
                      <span className="inline-flex h-11 items-center rounded-full border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-violet-300 peer-checked:border-violet-600 peer-checked:bg-violet-600 peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-violet-600/20">
                        {item}
                      </span>
                    </label>
                  ))}
                </div>

                {state?.errors?.condition && (
                  <ErrorText>{state.errors.condition}</ErrorText>
                )}
              </fieldset>

              <div className="mt-5">
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
                    placeholder="Processor, GPU, RAM, storage, screen size, battery health, etc."
                    className={textareaCls}
                  />
                </FormField>
              </div>
            </Card>

            {/* ---------- 3. DEVICE INFORMATION ---------- */}
            <Card>
              <SectionHeading number="3" title="Device information" />

              <div className="grid gap-6 md:grid-cols-2">
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
                    rows={8}
                    placeholder="Describe the device, its condition, any issues, accessories included, warranty status, etc."
                    className={textareaCls}
                  />
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Please provide as much detail as possible so we can give you
                    a more accurate valuation.
                  </p>
                </FormField>

                {/* Images */}
                <div>
                  <label
                    htmlFor="images"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Upload photos{" "}
                    <span className="font-normal text-slate-500">
                      (Optional)
                    </span>
                  </label>

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
                    className={`flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition ${
                      dragging
                        ? "border-violet-600 bg-violet-100"
                        : "border-violet-300 bg-violet-50/50 hover:border-violet-600 hover:bg-violet-50"
                    }`}
                  >
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-sm">
                      <Upload className="size-6" />
                    </span>

                    <span className="mt-4 text-sm font-bold text-slate-900">
                      Drag &amp; drop or tap to browse
                    </span>
                    <span className="mt-1 text-xs text-slate-500">
                      JPG, PNG or WEBP — up to {MAX_IMAGES} images
                    </span>

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
                    <p className="mt-2 text-xs font-medium text-amber-600">
                      {fileNote}
                    </p>
                  )}

                  {files.length > 0 && (
                    <>
                      <p className="mt-3 text-xs font-semibold text-slate-500">
                        {files.length} of {MAX_IMAGES} photos added
                      </p>

                      <ul className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-3 lg:grid-cols-5">
                        {files.map((file, index) => (
                          <li
                            key={`${file.name}-${file.size}`}
                            className="relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
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
                              className="absolute right-1 top-1 flex size-7 items-center justify-center rounded-full bg-slate-950/70 text-white backdrop-blur transition hover:bg-red-500"
                              aria-label={`Remove ${file.name}`}
                            >
                              <X className="size-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {state?.errors?.images && (
                    <ErrorText>{state.errors.images}</ErrorText>
                  )}
                </div>
              </div>
            </Card>

            {/* ---------- 4. YOUR DETAILS ---------- */}
            <Card>
              <SectionHeading number="4" title="Your details" />

              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  label="Full Name"
                  htmlFor="name"
                  required
                  error={state?.errors?.name}
                >
                  <div className="relative">
                    <User className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Enter your full name"
                      className={`${inputCls} pl-11`}
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
                    placeholder="Enter your Emirates ID / ID number"
                    className={inputCls}
                  />
                  <p className="mt-1.5 text-xs text-slate-500">
                    Required for buy-back verification.
                  </p>
                </FormField>

                <FormField
                  label="Phone / WhatsApp Number"
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
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
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
                      className={`${inputCls} pl-14`}
                    />
                  </div>
                </FormField>
              </div>
            </Card>

            {/* ---------- 5. SERVICE PREFERENCE ---------- */}
            <Card>
              <SectionHeading number="5" title="Service preference" />

              <input
                type="hidden"
                name="servicePreference"
                value={servicePreference}
              />

              <div
                role="radiogroup"
                aria-label="Service preference"
                className="grid gap-3 sm:gap-4 md:grid-cols-3"
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
                      className={`relative flex items-start gap-4 rounded-2xl border p-4 text-left transition-all md:flex-col md:gap-0 md:p-5 ${
                        active
                          ? "border-violet-600 bg-violet-50 ring-4 ring-violet-600/10"
                          : "border-slate-200 bg-white hover:border-violet-300 hover:shadow-sm"
                      }`}
                    >
                      <span
                        className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
                          active
                            ? "bg-violet-600 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <Icon className="size-5" />
                      </span>

                      <span className="min-w-0 pr-7 md:mt-4 md:pr-0">
                        <span className="block text-sm font-bold text-slate-900">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-slate-500">
                          {item.description}
                        </span>
                      </span>

                      {active && (
                        <CheckCircle2 className="absolute right-4 top-4 size-5 text-violet-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* ---------- SUBMIT ---------- */}
            <Card>
              <button
                type="submit"
                disabled={isPending}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-base font-bold text-white shadow-lg shadow-violet-600/25 transition hover:-translate-y-0.5 hover:shadow-violet-600/40 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
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

              <div className="mt-4 flex items-start justify-center gap-2 text-center text-xs text-slate-500 sm:items-center">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-violet-600 sm:mt-0" />
                <span>
                  Your information is secure and will only be used to process
                  your trade-in request.
                </span>
              </div>
            </Card>
          </form>
        </div>
      </section>

      {/* ============================================================ */}
      {/* WHY CHOOSE US                                                */}
      {/* ============================================================ */}
      <section className="py-5 sm:py-6 lg:py-8">
        <div className={wrap}>
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 p-7 sm:p-10 lg:p-14">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                Why trade in with us?
              </h2>
              <p className="mt-3 text-base font-medium text-violet-100 sm:text-lg">
                We make selling your tech simple, safe and fair.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {reasons.map((r) => (
                <div
                  key={r.title}
                  className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-white/20 text-white">
                    <r.icon className="size-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold text-white">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-violet-100">
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
      <section className="py-10 sm:py-14 lg:py-16">
        <div className={wrap}>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-700">
                <HelpCircle className="size-3.5" /> FAQ
              </span>
              <h2 className="text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">
                Questions? We&apos;ve got answers
              </h2>
            </div>

            <div className="mt-8 space-y-3">
              {faqs.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm open:border-violet-300"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-slate-900 [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-lg font-bold leading-none text-violet-700 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
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
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
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
    <div className="mb-6 flex items-center gap-3">
      <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-sm font-bold text-white shadow-sm">
        {number}
      </span>

      <h2 className="text-base font-extrabold uppercase tracking-wide text-slate-900 sm:text-lg">
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
        className="mb-2 block text-sm font-semibold text-slate-800"
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
    <p className="mt-1.5 text-xs font-medium text-red-500" role="alert">
      {children}
    </p>
  );
}