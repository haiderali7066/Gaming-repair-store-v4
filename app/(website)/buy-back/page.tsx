"use client";

import { submitBuyBack } from "@/actions/requests";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  Gamepad2,
  ImagePlus,
  Laptop,
  MapPin,
  Package,
  ShieldCheck,
  Smartphone,
  Upload,
  User,
  X,
} from "lucide-react";

type BuyBackState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
};

const initialState: BuyBackState = {};

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

const CONDITIONS = [
  "Like New",
  "Excellent",
  "Good",
  "Fair",
  "Needs Repair",
];

const SERVICE_OPTIONS = [
  {
    title: "Drop Off at Our Store",
    description: "Visit our store and drop off your device.",
    icon: MapPin,
  },
  {
    title: "Pickup & Delivery",
    description: "We will pick up your device from you.",
    icon: Package,
  },
  {
    title: "Courier Service",
    description: "Send your device to us via courier.",
    icon: Package,
  },
];

export default function BuyBackPage() {
  const [state, formAction, isPending] = useActionState(
    submitBuyBack,
    initialState
  );

  const [deviceType, setDeviceType] = useState("Gaming PC");
  const [condition, setCondition] = useState("");
  const [servicePreference, setServicePreference] = useState(
    "Drop Off at Our Store"
  );

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  function handleFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);

    // Maximum 5 images
    const validFiles = files
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, 5);

    setSelectedFiles(validFiles);
  }

  function removeFile(index: number) {
    setSelectedFiles((current) =>
      current.filter((_, fileIndex) => fileIndex !== index)
    );
  }

  return (
    <main className="min-h-screen bg-background">
     {/* ============================================================ */}
      {/* HERO BANNER                                                  */}
      {/* ============================================================ */}

      <section className="w-full">
        <div className="relative h-48 sm:h-64 md:h-[65vh] w-full overflow-hidden bg-muted">
          <img
            src="https://res.cloudinary.com/dvu9vmcqd/image/upload/v1788373883/ChatGPT_Image_Sep_2_2026_11_28_49_PM_l8pzkw.png"
            alt="Trade-In & Buy Back"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* ============================================================ */}
      {/* FORM                                                         */}
      {/* ============================================================ */}

      <section className="section-shell py-10 md:py-14">
        <form action={formAction} className="mx-auto max-w-5xl space-y-5">
          {/* ======================================================== */}
          {/* SUCCESS MESSAGE                                          */}
          {/* ======================================================== */}

          {state?.success && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-5 text-green-700"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

              <div>
                <p className="font-bold">
                  Request submitted successfully
                </p>

                <p className="mt-1 text-sm leading-6">
                  {state.message ||
                    "Thank you. Our team will review your device and contact you shortly."}
                </p>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* ERROR MESSAGE                                            */}
          {/* ======================================================== */}

          {!state?.success && state?.message && (
            <div
              role="alert"
              className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"
            >
              {state.message}
            </div>
          )}

          {/* ======================================================== */}
          {/* 01 SELECT YOUR DEVICE                                    */}
          {/* ======================================================== */}

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-7">
            <SectionHeading number="1" title="Select your device" />

            <input
              type="hidden"
              name="deviceType"
              value={deviceType}
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DEVICE_TYPES.map((device) => {
                const Icon = device.icon;
                const active = deviceType === device.value;

                return (
                  <button
                    key={device.value}
                    type="button"
                    onClick={() => setDeviceType(device.value)}
                    className={`relative rounded-2xl border p-6 text-left transition-all duration-200 ${
                      active
                        ? "border-violet-600 bg-violet-50 ring-2 ring-violet-600/20"
                        : "border-border bg-background hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md"
                    }`}
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        active
                          ? "bg-violet-600 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <p className="mt-4 font-bold">{device.label}</p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {device.description}
                    </p>

                    {active && (
                      <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-white">
                        <CheckCircle2 className="h-4 w-4" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {state?.errors?.deviceType && (
              <ErrorText>{state.errors.deviceType}</ErrorText>
            )}
          </div>

          {/* ======================================================== */}
          {/* 02 DEVICE DETAILS                                        */}
          {/* ======================================================== */}

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-7">
            <SectionHeading number="2" title="Device details" />

            <div className="grid gap-5 md:grid-cols-2">
              {/* Brand */}
              <FormField
                label="Brand"
                required
                error={state?.errors?.brand}
              >
                <Input
                  name="brand"
                  required
                  placeholder="e.g. ASUS, Apple, Samsung, HP"
                  className="h-11 rounded-xl"
                />
              </FormField>

              {/* Model */}
              <FormField
                label="Model"
                required
                error={state?.errors?.model}
              >
                <Input
                  name="model"
                  required
                  placeholder="e.g. ROG Strix G16, MacBook Pro M3, iPhone 15 Pro"
                  className="h-11 rounded-xl"
                />
              </FormField>
            </div>

            {/* Condition */}
            <div className="mt-5">
              <FormField
                label="Device condition"
                required
                error={state?.errors?.condition}
              >
                <div className="relative">
                  <select
                    name="condition"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    required
                    className="h-11 w-full appearance-none rounded-xl border border-input bg-background px-3 pr-10 text-sm outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-600/20"
                  >
                    <option value="">Select condition</option>

                    {CONDITIONS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-muted-foreground" />
                </div>
              </FormField>
            </div>

            {/* Specifications */}
            <div className="mt-5">
              <FormField
                label="Specifications"
                required
                error={state?.errors?.specifications}
              >
                <Textarea
                  name="specifications"
                  required
                  rows={4}
                  placeholder="Processor, GPU, RAM, storage, screen size, battery health, etc."
                  className="rounded-xl"
                />
              </FormField>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 03 DEVICE INFORMATION                                    */}
          {/* ======================================================== */}

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-7">
            <SectionHeading number="3" title="Device information" />

            <div className="grid gap-6 md:grid-cols-2">
              {/* Description */}
              <FormField
                label="Tell us about your device"
                required
                error={state?.errors?.description}
              >
                <Textarea
                  name="description"
                  required
                  rows={8}
                  placeholder="Describe the device, its condition, any issues, accessories included, warranty status, etc."
                  className="rounded-xl"
                />

                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  Please provide as much detail as possible so we can
                  give you a more accurate valuation.
                </p>
              </FormField>

              {/* Images */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Upload photos{" "}
                  <span className="text-muted-foreground">
                    (Optional)
                  </span>
                </label>

                <label
                  htmlFor="images"
                  className="flex min-h-[210px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-violet-300 bg-violet-50/50 p-6 text-center transition hover:border-violet-600 hover:bg-violet-50"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-sm">
                    <Upload className="h-6 w-6" />
                  </div>

                  <p className="mt-4 text-sm font-bold">
                    Drag & drop or click to browse
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    JPG, PNG or WEBP — up to 5 images
                  </p>

                  <input
                    id="images"
                    name="images"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    className="sr-only"
                    onChange={handleFiles}
                  />
                </label>

                {/* Selected images */}
                {selectedFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="flex items-center justify-between rounded-xl border border-border bg-background px-3 py-2.5"
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                            <ImagePlus className="h-4 w-4" />
                          </div>

                          <span className="truncate text-xs font-medium">
                            {file.name}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="ml-3 rounded-lg p-1.5 text-muted-foreground transition hover:bg-red-50 hover:text-red-500"
                          aria-label={`Remove ${file.name}`}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {state?.errors?.images && (
                  <ErrorText>{state.errors.images}</ErrorText>
                )}
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 04 YOUR DETAILS                                          */}
          {/* ======================================================== */}

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-7">
            <SectionHeading number="4" title="Your details" />

            <div className="grid gap-5 md:grid-cols-2">
              {/* Name */}
              <FormField
                label="Full Name"
                required
                error={state?.errors?.name}
              >
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

                  <Input
                    name="name"
                    required
                    placeholder="Enter your full name"
                    className="h-11 rounded-xl pl-10"
                  />
                </div>
              </FormField>

              {/* ID */}
              <FormField
                label="ID Number"
                required
                error={state?.errors?.idNumber}
              >
                <Input
                  name="idNumber"
                  required
                  placeholder="Enter your Emirates ID / ID number"
                  className="h-11 rounded-xl"
                />

                <p className="mt-1.5 text-xs text-muted-foreground">
                  Required for buy-back verification.
                </p>
              </FormField>

              {/* Phone */}
              <FormField
                label="Phone / WhatsApp Number"
                required
                error={state?.errors?.phone}
              >
                <Input
                  name="phone"
                  type="tel"
                  required
                  placeholder="+971 50 123 4567"
                  className="h-11 rounded-xl"
                />
              </FormField>

              {/* Expected Price */}
              <FormField
                label="Expected Price (AED)"
                required
                error={state?.errors?.expectedPrice}
              >
                <Input
                  name="expectedPrice"
                  type="number"
                  min="1"
                  required
                  placeholder="e.g. 2500"
                  className="h-11 rounded-xl"
                />
              </FormField>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 05 SERVICE PREFERENCE                                    */}
          {/* ======================================================== */}

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-7">
            <SectionHeading number="5" title="Service preference" />

            <input
              type="hidden"
              name="servicePreference"
              value={servicePreference}
            />

            <div className="grid gap-4 md:grid-cols-3">
              {SERVICE_OPTIONS.map((item) => {
                const Icon = item.icon;
                const active = servicePreference === item.title;

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setServicePreference(item.title)}
                    className={`relative rounded-2xl border p-5 text-left transition-all ${
                      active
                        ? "border-violet-600 bg-violet-50 ring-2 ring-violet-600/20"
                        : "border-border hover:border-violet-300 hover:shadow-sm"
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                        active
                          ? "bg-violet-600 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <p className="mt-4 text-sm font-bold">
                      {item.title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {item.description}
                    </p>

                    {active && (
                      <CheckCircle2 className="absolute right-4 top-4 h-5 w-5 text-violet-600" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ======================================================== */}
          {/* SUBMIT                                                   */}
          {/* ======================================================== */}

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-7">
            <Button
              type="submit"
              size="lg"
              disabled={isPending}
              className="h-13 w-full rounded-xl bg-violet-600 text-base font-bold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700 hover:shadow-violet-600/30"
            >
              {isPending ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Submitting Request...
                </>
              ) : (
                "Submit Trade-In Request"
              )}
            </Button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-violet-600" />

              <span>
                Your information is secure and will only be used to
                process your trade-in request.
              </span>
            </div>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              <span className="text-red-500">*</span> Required fields
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}

/* ================================================================== */
/* COMPONENTS                                                         */
/* ================================================================== */

function SectionHeading({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-xs font-bold text-white shadow-sm">
        {number}
      </span>

      <h2 className="text-base font-bold uppercase tracking-wide">
        {title}
      </h2>
    </div>
  );
}

function FormField({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
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