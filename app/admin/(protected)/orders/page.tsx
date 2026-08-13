import Link from "next/link"
import {
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  Eye,
  Package,
  Plus,
  ShoppingCart,
  Users,
} from "lucide-react"

import { StatusForm } from "@/components/admin/StatusForm"
import { connectToDatabase } from "@/lib/mongodb"
import {
  formatCurrency,
  formatDate,
  serialize,
} from "@/lib/helpers"
import { Order } from "@/models/Order"

type OrderRow = {
  _id: string
  orderNumber?: string
  subtotal?: number
  status?: string
  createdAt: string
  userId?: {
    _id?: string
    name?: string
    email?: string
  }
}

function getInitials(name?: string) {
  if (!name) return "?"

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
}

function formatStatus(status?: string) {
  if (!status) return "Unknown"

  return status
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function getStatusClasses(status?: string) {
  switch (status) {
    case "completed":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"

    case "processing":
    case "in-progress":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400"

    case "cancelled":
    case "canceled":
      return "bg-rose-500/10 text-rose-600 dark:text-rose-400"

    case "shipped":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400"

    case "delivered":
      return "bg-violet-500/10 text-violet-600 dark:text-violet-400"

    case "pending":
      return "bg-slate-500/10 text-slate-600 dark:text-slate-400"

    default:
      return "bg-muted text-muted-foreground"
  }
}

function StatCard({
  label,
  value,
  description,
  icon: Icon,
  iconClass,
}: {
  label: string
  value: string
  description: string
  icon: typeof ShoppingCart
  iconClass: string
}) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight">
            {value}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            {description}
          </p>
        </div>

        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon className="size-4" />
        </div>
      </div>
    </div>
  )
}

function MobileOrderCard({
  order,
}: {
  order: OrderRow
}) {
  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {getInitials(order.userId?.name)}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              {order.userId?.name || "Unknown customer"}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {order.userId?.email || "No email available"}
            </p>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
            order.status,
          )}`}
        >
          {formatStatus(order.status)}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-muted/40 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            Order
          </p>

          <p className="mt-1 truncate text-sm font-semibold">
            {order.orderNumber || `#${String(order._id).slice(-8)}`}
          </p>
        </div>

        <div className="rounded-xl bg-muted/40 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            Total
          </p>

          <p className="mt-1 text-sm font-semibold">
            {formatCurrency(order.subtotal || 0)}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5" />
          {formatDate(order.createdAt)}
        </div>

        <Link
          href={`/admin/orders/${order._id}`}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary/10"
        >
          View
          <ChevronRight className="size-3.5" />
        </Link>
      </div>

      <div className="mt-3 border-t pt-3">
        <StatusForm
          id={order._id}
          kind="order"
          current={order.status}
        />
      </div>
    </div>
  )
}

export default async function OrdersAdmin() {
  await connectToDatabase()

  const rows = serialize(
    await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .lean(),
  ) as OrderRow[]

  const totalOrders = rows.length

  const totalRevenue = rows.reduce(
    (sum, order) => sum + Number(order.subtotal || 0),
    0,
  )

  const pendingOrders = rows.filter(
    (order) =>
      order.status === "pending" ||
      order.status === "processing" ||
      order.status === "in-progress",
  ).length

  const completedOrders = rows.filter(
    (order) =>
      order.status === "completed" ||
      order.status === "delivered",
  ).length

  const averageOrderValue =
    totalOrders > 0 ? totalRevenue / totalOrders : 0

  return (
    <main className="space-y-8 pb-10">
      {/* --------------------------------------------------------------- */}
      {/* Header                                                            */}
      {/* --------------------------------------------------------------- */}
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/[0.08] via-background to-background p-6 shadow-sm sm:p-8">
        <div className="absolute -right-20 -top-20 size-56 rounded-full bg-primary/[0.06] blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
              <ShoppingCart className="size-3.5 text-primary" />
              Fulfillment
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Orders
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Manage customer orders, monitor fulfillment, and keep track
              of your sales activity.
            </p>
          </div>

          <Link
            href="/admin/orders/new"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            <Plus className="size-4" />
            Sell Products
          </Link>
        </div>
      </section>

      {/* --------------------------------------------------------------- */}
      {/* Stats                                                             */}
      {/* --------------------------------------------------------------- */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total orders"
          value={totalOrders.toLocaleString()}
          description="All orders in the system"
          icon={ShoppingCart}
          iconClass="bg-blue-500/10 text-blue-600 dark:text-blue-400"
        />

        <StatCard
          label="Revenue"
          value={formatCurrency(totalRevenue)}
          description="Total order value"
          icon={CircleDollarSign}
          iconClass="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        />

        <StatCard
          label="In progress"
          value={pendingOrders.toLocaleString()}
          description="Orders needing attention"
          icon={Package}
          iconClass="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        />

        <StatCard
          label="Completed"
          value={completedOrders.toLocaleString()}
          description={`${formatCurrency(averageOrderValue)} avg. order`}
          icon={Users}
          iconClass="bg-violet-500/10 text-violet-600 dark:text-violet-400"
        />
      </section>

      {/* --------------------------------------------------------------- */}
      {/* Orders section                                                     */}
      {/* --------------------------------------------------------------- */}
      <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 border-b px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-base font-semibold">
              All orders
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              {totalOrders === 0
                ? "No orders have been created yet."
                : `${totalOrders.toLocaleString()} orders found`}
            </p>
          </div>

          {totalOrders > 0 && (
            <div className="flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
              <ArrowUpRight className="size-3.5" />
              Latest orders appear first
            </div>
          )}
        </div>

        {/* Empty state */}
        {rows.length === 0 ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center px-5 text-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-muted">
              <ShoppingCart className="size-7 text-muted-foreground" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              No orders yet
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Orders created through your admin sales flow will appear
              here. Start by creating your first order.
            </p>

            <Link
              href="/admin/orders/new"
              className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              <Plus className="size-4" />
              Create first order
            </Link>
          </div>
        ) : (
          <>
            {/* --------------------------------------------------------- */}
            {/* Desktop table                                               */}
            {/* --------------------------------------------------------- */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b bg-muted/20 text-left">
                    <th className="whitespace-nowrap px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Order
                    </th>

                    <th className="whitespace-nowrap px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Customer
                    </th>

                    <th className="whitespace-nowrap px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Date
                    </th>

                    <th className="whitespace-nowrap px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Total
                    </th>

                    <th className="whitespace-nowrap px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Status
                    </th>

                    <th className="w-20 px-6 py-3.5" />
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {rows.map((order) => (
                    <tr
                      key={order._id}
                      className="group transition-colors hover:bg-muted/30"
                    >
                      {/* Order */}
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/orders/${order._id}`}
                          className="group/order inline-flex items-center gap-2"
                        >
                          <span className="font-semibold">
                            {order.orderNumber ||
                              `#${String(order._id).slice(-8)}`}
                          </span>

                          <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover/order:opacity-100" />
                        </Link>
                      </td>

                      {/* Customer */}
                      <td className="px-6 py-4">
                        <div className="flex min-w-[220px] items-center gap-3">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {getInitials(order.userId?.name)}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate font-medium">
                              {order.userId?.name ||
                                "Unknown customer"}
                            </p>

                            <p className="mt-0.5 truncate text-xs text-muted-foreground">
                              {order.userId?.email ||
                                "No email available"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CalendarDays className="size-3.5" />
                          <span className="text-xs">
                            {formatDate(order.createdAt)}
                          </span>
                        </div>
                      </td>

                      {/* Total */}
                      <td className="whitespace-nowrap px-6 py-4">
                        <div>
                          <p className="font-semibold">
                            {formatCurrency(
                              Number(order.subtotal || 0),
                            )}
                          </p>

                          <p className="mt-0.5 text-[10px] text-muted-foreground">
                            Order total
                          </p>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <StatusForm
                          id={order._id}
                          kind="order"
                          current={order.status}
                        />
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/orders/${order._id}`}
                          className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                          aria-label={`View order ${
                            order.orderNumber || order._id
                          }`}
                        >
                          <Eye className="size-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* --------------------------------------------------------- */}
            {/* Mobile / tablet cards                                      */}
            {/* --------------------------------------------------------- */}
            <div className="space-y-3 p-4 lg:hidden">
              {rows.map((order) => (
                <MobileOrderCard
                  key={order._id}
                  order={order}
                />
              ))}
            </div>
          </>
        )}

        {/* Footer */}
        {rows.length > 0 && (
          <div className="flex flex-col gap-3 border-t bg-muted/20 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-xs text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {rows.length}
              </span>{" "}
              orders
            </p>

            <Link
              href="/admin/orders/new"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              Create another order
              <ChevronRight className="size-3.5" />
            </Link>
          </div>
        )}
      </section>
    </main>
  )
}