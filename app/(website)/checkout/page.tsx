"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createOrder } from "@/actions/orders";
import { getCheckoutProfile } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/helpers";

type Phase = "idle" | "placing" | "success";

const MIN_PLACING_MS = 1200; // keeps the animation from flashing on fast responses
const SUCCESS_MS = 2000; // how long the success screen shows before redirecting

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();
  const [error, setError] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [orderNumber, setOrderNumber] = useState("");
  const [fromProfile, setFromProfile] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  const pending = phase !== "idle";

  // Prefill from the logged-in user's profile (guests are left empty)
  useEffect(() => {
    let active = true;

    getCheckoutProfile()
      .then((profile) => {
        if (!active || !profile) return;

        // Only fill fields the user hasn't started typing in
        setForm((prev) => ({
          ...prev,
          fullName: prev.fullName || profile.fullName,
          phone: prev.phone || profile.phone,
          address: prev.address || profile.address,
        }));

        setFromProfile(
          Boolean(profile.fullName || profile.phone || profile.address),
        );
      })
      .catch(() => {
        // not logged in or profile unavailable: keep the empty form
      });

    return () => {
      active = false;
    };
  }, []);

  function update(field: keyof typeof form) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function submit(formData: FormData) {
    setPhase("placing");
    setError("");

    try {
      const [result] = await Promise.all([
        createOrder({
          ...Object.fromEntries(formData),
          items: items.map((x) => ({
            productId: x._id,
            quantity: x.quantity,
          })),
        }),
        wait(MIN_PLACING_MS),
      ]);

      if (!result.ok) {
        setError(result.error || "Could not create order");
        setPhase("idle");
        return;
      }

      clear();
      setOrderNumber(String(result.orderNumber));
      setPhase("success");

      await wait(SUCCESS_MS);

      router.push(
        `/account/orders?success=${encodeURIComponent(`Order ${result.orderNumber} placed`)}`,
      );
    } catch {
      setError("Could not create your order. Please check availability.");
      setPhase("idle");
    }
  }

  return (
    <main className="section-shell py-14">
      <style>{`
        @keyframes co-pop {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes co-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes co-rise {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes co-fill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes co-ring {
          0% { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes co-dot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
        .co-pop { animation: co-pop 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
        .co-check { stroke-dasharray: 1; stroke-dashoffset: 1; animation: co-draw 0.5s ease-out 0.35s forwards; }
        .co-rise { animation: co-rise 0.45s ease-out 0.5s both; }
        .co-fill { transform-origin: left; animation: co-fill ${SUCCESS_MS}ms linear forwards; }
        .co-ring { animation: co-ring 1.4s ease-out infinite; }
        .co-dot { animation: co-dot 1.1s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .co-pop, .co-rise, .co-ring, .co-dot { animation: none; }
          .co-check { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>

      <p className="eyebrow">Order request</p>
      <h1 className="mt-3 text-6xl font-extrabold">Checkout</h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <form action={submit} className="border border-border bg-card p-6">
          <FieldGroup>
            {fromProfile && (
              <p className="text-sm text-muted-foreground">
                We filled in your details from your profile. You can edit them
                for this order.
              </p>
            )}
            <div className="grid gap-5 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="fullName">Full name</FieldLabel>
                <Input
                  id="fullName"
                  name="fullName"
                  required
                  value={form.fullName}
                  onChange={update("fullName")}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <Input
                  id="phone"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={update("phone")}
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="address">Delivery address</FieldLabel>
              <Input
                id="address"
                name="address"
                required
                value={form.address}
                onChange={update("address")}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="city">City</FieldLabel>
              <Input
                id="city"
                name="city"
                required
                value={form.city}
                onChange={update("city")}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="notes">Notes</FieldLabel>
              <Textarea
                id="notes"
                name="notes"
                value={form.notes}
                onChange={update("notes")}
              />
            </Field>
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
            <Button
              type="submit"
              size="lg"
              disabled={pending || items.length === 0}
            >
              {pending ? "Placing request..." : "Place order request"}
            </Button>
          </FieldGroup>
        </form>
        <aside className="h-fit border border-border bg-card p-6">
          <h2 className="text-2xl font-bold">Summary</h2>
          <div className="mt-5 flex flex-col gap-3">
            {items.map((x) => (
              <div key={x._id} className="flex justify-between gap-4 text-sm">
                <span>
                  {x.quantity} × {x.name}
                </span>
                <span>{formatCurrency(x.price * x.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-between border-t border-border pt-5">
            <strong>Total</strong>
            <strong className="text-primary">{formatCurrency(subtotal)}</strong>
          </div>
        </aside>
      </div>

      {/* Order placing animation overlay */}
      {pending && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-6 backdrop-blur-sm"
        >
          <div className="w-full max-w-sm border border-border bg-card p-8 text-center shadow-2xl">
            {phase === "placing" ? (
              <>
                <div className="relative mx-auto flex size-20 items-center justify-center">
                  <span className="co-ring absolute inset-0 rounded-full border-2 border-primary/40" />
                  <span className="size-16 animate-spin rounded-full border-4 border-muted border-t-primary" />
                </div>

                <h2 className="mt-6 text-xl font-bold">
                  Placing your order
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Checking availability and confirming your items
                </p>

                <div className="mt-5 flex items-center justify-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="co-dot size-2 rounded-full bg-primary"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="co-pop mx-auto flex size-20 items-center justify-center rounded-full bg-emerald-500/15">
                  <svg
                    viewBox="0 0 52 52"
                    className="size-12 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path
                      className="co-check"
                      pathLength={1}
                      d="M14 27 L23 36 L39 17"
                    />
                  </svg>
                </div>

                <h2 className="co-rise mt-6 text-xl font-bold">
                  Order placed!
                </h2>

                <p className="co-rise mt-2 text-sm text-muted-foreground">
                  {orderNumber
                    ? `Your order ${orderNumber} has been received.`
                    : "Your order has been received."}
                </p>

                <p className="co-rise mt-1 text-xs text-muted-foreground">
                  Taking you to your orders...
                </p>

                <div className="mt-6 h-1 overflow-hidden rounded-full bg-muted">
                  <div className="co-fill h-full w-full rounded-full bg-emerald-500" />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}