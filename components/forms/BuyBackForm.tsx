"use client";

import { submitBuyBack } from "@/actions/requests";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BUY_BACK_TYPES } from "@/lib/constants";
import { useActionState, useState } from "react";
import {
  CheckCircle2,
  ImagePlus,
  MapPin,
  Package,
  Upload,
  X,
} from "lucide-react";

type BuyBackState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
};

const initialState: BuyBackState = {};

const SERVICE_OPTIONS = [
  {
    value: "Drop Off at Our Store",
    label: "Drop Off at Our Store",
    description: "Bring your device directly to our store.",
    icon: MapPin,
  },
  {
    value: "Pickup & Delivery",
    label: "Pickup & Delivery",
    description: "We arrange pickup from your location.",
    icon: Package,
  },
  {
    value: "Courier Service",
    label: "Courier Service",
    description: "Send your device to us by courier.",
    icon: Package,
  },
] as const;

export function BuyBackForm() {
  const [state, formAction, isPending] = useActionState(
    submitBuyBack,
    initialState
  );

  const [servicePreference, setServicePreference] = useState(
    "Drop Off at Our Store"
  );

  const [selectedFiles, setSelectedFiles] = useState<File[]>(
    []
  );

  function handleFiles(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(event.target.files || []);

    const validFiles = files
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, 5);

    setSelectedFiles(validFiles);
  }

  function removeFile(index: number) {
    setSelectedFiles((current) =>
      current.filter((_, i) => i !== index)
    );
  }

  return (
    <form
      action={formAction}
      encType="multipart/form-data"
      className="rounded-2xl border border-border bg-card p-6 md:p-8"
    >
      <FieldGroup className="gap-6">
        {/* ======================================================== */}
        {/* SUCCESS                                                   */}
        {/* ======================================================== */}

        {state?.success && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-4 text-sm text-green-700"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

            <div>
              <p className="font-semibold">
                Request submitted successfully
              </p>

              <p className="mt-1">
                {state.message ||
                  "Our team will review your request and contact you shortly."}
              </p>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* GENERAL ERROR                                             */}
        {/* ======================================================== */}

        {!state?.success && state?.message && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700"
          >
            {state.message}
          </div>
        )}

        {/* ======================================================== */}
        {/* CUSTOMER INFORMATION                                      */}
        {/* ======================================================== */}

        <div>
          <h2 className="text-lg font-bold">
            Your Information
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Please provide your contact details for the buy-back
            process.
          </p>
        </div>

        {/* Name + Phone */}
        <div className="grid gap-5 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="name">
              Full Name <span className="text-red-500">*</span>
            </FieldLabel>

            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              required
              className="h-11 rounded-xl"
              aria-invalid={!!state?.errors?.name}
            />

            {state?.errors?.name && (
              <p className="text-sm text-red-500">
                {state.errors.name}
              </p>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="phone">
              Phone / WhatsApp Number{" "}
              <span className="text-red-500">*</span>
            </FieldLabel>

            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+971 50 123 4567"
              required
              className="h-11 rounded-xl"
              aria-invalid={!!state?.errors?.phone}
            />

            {state?.errors?.phone && (
              <p className="text-sm text-red-500">
                {state.errors.phone}
              </p>
            )}
          </Field>
        </div>

        {/* ID Number */}
        <Field>
          <FieldLabel htmlFor="idNumber">
            ID Number <span className="text-red-500">*</span>
          </FieldLabel>

          <Input
            id="idNumber"
            name="idNumber"
            placeholder="Enter your Emirates ID / ID number"
            required
            autoComplete="off"
            className="h-11 rounded-xl"
            aria-invalid={!!state?.errors?.idNumber}
          />

          <p className="text-xs text-muted-foreground">
            Required for verification and buy-back processing.
          </p>

          {state?.errors?.idNumber && (
            <p className="text-sm text-red-500">
              {state.errors.idNumber}
            </p>
          )}
        </Field>

        {/* ======================================================== */}
        {/* DEVICE INFORMATION                                        */}
        {/* ======================================================== */}

        <div className="border-t border-border pt-6">
          <h2 className="text-lg font-bold">
            Device Information
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Tell us about the device you want to sell.
          </p>
        </div>

        {/* Device Category */}
        <Field>
          <FieldLabel htmlFor="deviceType">
            Device category{" "}
            <span className="text-red-500">*</span>
          </FieldLabel>

          <select
            id="deviceType"
            name="deviceType"
            required
            defaultValue=""
            className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-600/20"
          >
            <option value="" disabled>
              Select device category
            </option>

            {BUY_BACK_TYPES.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>

          {state?.errors?.deviceType && (
            <p className="text-sm text-red-500">
              {state.errors.deviceType}
            </p>
          )}
        </Field>

        {/* Brand + Model */}
        <div className="grid gap-5 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="brand">
              Brand <span className="text-red-500">*</span>
            </FieldLabel>

            <Input
              id="brand"
              name="brand"
              placeholder="e.g. ASUS, HP, Dell, Apple"
              required
              className="h-11 rounded-xl"
              aria-invalid={!!state?.errors?.brand}
            />

            {state?.errors?.brand && (
              <p className="text-sm text-red-500">
                {state.errors.brand}
              </p>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="model">
              Model <span className="text-red-500">*</span>
            </FieldLabel>

            <Input
              id="model"
              name="model"
              placeholder="e.g. ROG Strix G16"
              required
              className="h-11 rounded-xl"
              aria-invalid={!!state?.errors?.model}
            />

            {state?.errors?.model && (
              <p className="text-sm text-red-500">
                {state.errors.model}
              </p>
            )}
          </Field>
        </div>

        {/* Specifications */}
        <Field>
          <FieldLabel htmlFor="specifications">
            Specifications{" "}
            <span className="text-red-500">*</span>
          </FieldLabel>

          <Textarea
            id="specifications"
            name="specifications"
            placeholder="RAM, storage, processor, GPU, screen size, etc."
            required
            className="rounded-xl"
            aria-invalid={!!state?.errors?.specifications}
          />

          {state?.errors?.specifications && (
            <p className="text-sm text-red-500">
              {state.errors.specifications}
            </p>
          )}
        </Field>

        {/* Condition */}
        <Field>
          <FieldLabel htmlFor="condition">
            Condition <span className="text-red-500">*</span>
          </FieldLabel>

          <Input
            id="condition"
            name="condition"
            placeholder="Excellent, good, fair..."
            required
            className="h-11 rounded-xl"
            aria-invalid={!!state?.errors?.condition}
          />

          {state?.errors?.condition && (
            <p className="text-sm text-red-500">
              {state.errors.condition}
            </p>
          )}
        </Field>

        {/* Description */}
        <Field>
          <FieldLabel htmlFor="description">
            Device description{" "}
            <span className="text-red-500">*</span>
          </FieldLabel>

          <Textarea
            id="description"
            name="description"
            rows={5}
            placeholder="Tell us about the device, any damage, accessories included, warranty, etc."
            required
            className="rounded-xl"
            aria-invalid={!!state?.errors?.description}
          />

          {state?.errors?.description && (
            <p className="text-sm text-red-500">
              {state.errors.description}
            </p>
          )}
        </Field>

        {/* ======================================================== */}
        {/* IMAGES                                                    */}
        {/* ======================================================== */}

        <Field>
          <FieldLabel htmlFor="images">
            Device Photos{" "}
            <span className="text-muted-foreground">
              (optional)
            </span>
          </FieldLabel>

          <label
            htmlFor="images"
            className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-violet-300 bg-violet-50/50 px-6 py-10 text-center transition hover:border-violet-600 hover:bg-violet-50"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-600 text-white">
              <Upload className="h-6 w-6" />
            </div>

            <p className="mt-4 text-sm font-semibold">
              Upload device photos
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              JPG, PNG or WEBP · Maximum 5 images
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

          {selectedFiles.length > 0 && (
            <div className="mt-3 space-y-2">
              {selectedFiles.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between rounded-xl border border-border bg-background p-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                      <ImagePlus className="h-4 w-4" />
                    </div>

                    <span className="truncate text-sm">
                      {file.name}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="rounded-lg p-2 text-muted-foreground hover:bg-red-50 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {state?.errors?.images && (
            <p className="text-sm text-red-500">
              {state.errors.images}
            </p>
          )}
        </Field>

        {/* ======================================================== */}
        {/* EXPECTED PRICE                                            */}
        {/* ======================================================== */}

        <Field>
          <FieldLabel htmlFor="expectedPrice">
            Expected Price (AED){" "}
            <span className="text-red-500">*</span>
          </FieldLabel>

          <Input
            id="expectedPrice"
            name="expectedPrice"
            type="number"
            min="1"
            step="1"
            placeholder="e.g. 2500"
            required
            className="h-11 rounded-xl"
            aria-invalid={!!state?.errors?.expectedPrice}
          />

          {state?.errors?.expectedPrice && (
            <p className="text-sm text-red-500">
              {state.errors.expectedPrice}
            </p>
          )}
        </Field>

        {/* ======================================================== */}
        {/* SERVICE PREFERENCE                                        */}
        {/* ======================================================== */}

        <Field>
          <FieldLabel>
            Preferred Service{" "}
            <span className="text-red-500">*</span>
          </FieldLabel>

          {/* This is what actually gets submitted */}
          <input
            type="hidden"
            name="servicePreference"
            value={servicePreference}
          />

          <div className="grid gap-3 md:grid-cols-3">
            {SERVICE_OPTIONS.map((option) => {
              const Icon = option.icon;
              const active =
                servicePreference === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    setServicePreference(option.value)
                  }
                  className={`relative rounded-xl border p-4 text-left transition ${
                    active
                      ? "border-violet-600 bg-violet-50 ring-2 ring-violet-600/20"
                      : "border-border hover:border-violet-300"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      active
                        ? "bg-violet-600 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <p className="mt-3 text-sm font-bold">
                    {option.label}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {option.description}
                  </p>

                  {active && (
                    <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-violet-600" />
                  )}
                </button>
              );
            })}
          </div>

          {state?.errors?.servicePreference && (
            <p className="text-sm text-red-500">
              {state.errors.servicePreference}
            </p>
          )}
        </Field>

        {/* ======================================================== */}
        {/* NOTE + SUBMIT                                              */}
        {/* ======================================================== */}

        <p className="text-xs text-muted-foreground">
          <span className="text-red-500">*</span> Required fields
        </p>

        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="w-full rounded-xl bg-violet-600 text-white hover:bg-violet-700 md:w-auto"
        >
          {isPending
            ? "Submitting request..."
            : "Request a valuation"}
        </Button>
      </FieldGroup>
    </form>
  );
}