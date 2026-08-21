import Link from "next/link"
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Cpu,
  DollarSign,
  Package,
  RefreshCw,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Users,
  Wrench,
} from "lucide-react"

import { connectToDatabase } from "@/lib/mongodb"
import { formatCurrency, formatDate } from "@/lib/helpers"
import { Product } from "@/models/Product"
import { Order } from "@/models/Order"
import { User } from "@/models/User"
import { RepairRequest } from "@/models/RepairRequest"
import { BuyBackRequest } from "@/models/BuyBackRequest"

type MonthlyStats = {
  key: string
  label: string
  revenue: number
  orders: number
  repairs: number
  buybacks: number
}

type RecentOrder = {
  _id: string
  subtotal?: number
  createdAt: Date
  userId?: {
    name?: string
  }
}

type RecentRepair = {
  _id: string
  brand?: string
  model?: string
  status?: string
  createdAt: Date
  userId?: {
    name?: string
  }
}

type RecentBuyBack = {
  _id: string
  brand?: string
  model?: string
  status?: string
  offeredPrice?: number
  createdAt: Date
  userId?: {
    name?: string
  }
}

function getMonthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function getMonthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
}

function createLastSixMonths() {
  const current = getMonthStart(new Date())

  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date(
      current.getFullYear(),
      current.getMonth() - (5 - index),
      1,
    )

    return {
      key: getMonthKey(date),
      label: date.toLocaleDateString("en", {
        month: "short",
      }),
    }
  })
}

function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

function formatStatus(value?: string) {
  if (!value) return "Unknown"

  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function getStatusClasses(status?: string) {
  switch (status) {
    case "completed":
    case "accepted":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"

    case "in-progress":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400"

    case "quoted":
      return "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"

    case "submitted":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400"

    default:
      return "bg-muted text-muted-foreground"
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

function MiniBarChart({
  values,
  labels,
}: {
  values: number[]
  labels: string[]
}) {
  const max = Math.max(...values, 1)

  return (
    <div className="flex h-56 items-end gap-3">
      {values.map((value, index) => {
        const height = Math.max((value / max) * 100, value > 0 ? 8 : 2)

        return (
          <div
            key={`${labels[index]}-${index}`}
            className="group flex min-w-0 flex-1 flex-col items-center justify-end gap-2"
          >
            <div className="relative flex h-44 w-full items-end justify-center">
              <div className="pointer-events-none absolute bottom-full mb-2 scale-95 rounded-lg border bg-background px-2 py-1 text-[10px] font-semibold opacity-0 shadow-sm transition-all group-hover:scale-100 group-hover:opacity-100">
                {formatCompactNumber(value)}
              </div>

              <div
                className="w-full max-w-8 rounded-t-lg bg-primary/80 transition-all duration-500 group-hover:bg-primary"
                style={{ height: `${height}%` }}
              />
            </div>

            <span className="text-[11px] font-medium text-muted-foreground">
              {labels[index]}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function RevenueChart({ data }: { data: MonthlyStats[] }) {
  const width = 760
  const height = 280
  const padding = {
    top: 24,
    right: 24,
    bottom: 42,
    left: 68,
  }

  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  const values = data.map((item) => item.revenue)
  const max = Math.max(...values, 1)

  const points = data.map((item, index) => {
    const x =
      padding.left +
      (index / Math.max(data.length - 1, 1)) * chartWidth

    const y =
      padding.top +
      chartHeight -
      (item.revenue / max) * chartHeight

    return {
      x,
      y,
      value: item.revenue,
    }
  })

  const linePath = points
    .map((point, index) => {
      return `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
    })
    .join(" ")

  const areaPath = [
    `M ${points[0].x} ${padding.top + chartHeight}`,
    ...points.map((point) => `L ${point.x} ${point.y}`),
    `L ${points[points.length - 1].x} ${padding.top + chartHeight}`,
    "Z",
  ].join(" ")

  const gridLines = [0, 0.25, 0.5, 0.75, 1]

  return (
    <div className="w-full overflow-hidden">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-label="Revenue over the last six months"
      >
        {gridLines.map((ratio) => {
          const y =
            padding.top + chartHeight - ratio * chartHeight

          const amount = max * ratio

          return (
            <g key={ratio}>
              <line
                x1={padding.left}
                x2={width - padding.right}
                y1={y}
                y2={y}
                stroke="currentColor"
                className="text-border"
                strokeDasharray="4 4"
              />

              <text
                x={padding.left - 12}
                y={y + 4}
                textAnchor="end"
                className="fill-muted-foreground text-[11px]"
              >
                {formatCompactNumber(amount)}
              </text>
            </g>
          )
        })}

        <path
          d={areaPath}
          className="fill-primary/[0.07]"
        />

        <path
          d={linePath}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        />

        {points.map((point, index) => (
          <g key={data[index].key}>
            <circle
              cx={point.x}
              cy={point.y}
              r="7"
              className="fill-background"
            />

            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              className="fill-primary"
            />

            <text
              x={point.x}
              y={height - 12}
              textAnchor="middle"
              className="fill-muted-foreground text-[11px]"
            >
              {data[index].label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

function DonutChart({
  items,
}: {
  items: {
    label: string
    value: number
    className: string
  }[]
}) {
  const total = items.reduce((sum, item) => sum + item.value, 0)

  let offset = 0

  return (
    <div className="flex items-center gap-6">
      <div className="relative size-36 shrink-0">
        <svg
          viewBox="0 0 100 100"
          className="-rotate-90"
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-muted"
          />

          {total > 0 &&
            items.map((item) => {
              const percentage = item.value / total
              const dash = percentage * 238.76

              const circle = (
                <circle
                  key={item.label}
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeDasharray={`${dash} 238.76`}
                  strokeDashoffset={-offset}
                  strokeLinecap="butt"
                  className={item.className}
                />
              )

              offset += dash

              return circle
            })}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">{total}</span>
          <span className="text-[10px] text-muted-foreground">
            Total
          </span>
        </div>
      </div>

      <div className="min-w-0 flex-1 space-y-3">
        {items.map((item) => {
          const percentage =
            total > 0
              ? Math.round((item.value / total) * 100)
              : 0

          return (
            <div
              key={item.label}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className={`size-2.5 shrink-0 rounded-full ${item.className}`}
                />

                <span className="truncate text-sm text-muted-foreground">
                  {item.label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">
                  {item.value}
                </span>

                <span className="text-[11px] text-muted-foreground">
                  {percentage}%
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default async function DashboardPage() {
  await connectToDatabase()

  const sixMonths = createLastSixMonths()

  const sixMonthStart = new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 5,
    1,
  )

  const [
    productCount,
    orderCount,
    customerCount,
    repairCount,
    buybackCount,
    orders,
    repairs,
    buybacks,
    monthlyOrders,
    monthlyRepairs,
    monthlyBuybacks,
  ] = await Promise.all([
    Product.countDocuments({ published: true }),

    Order.countDocuments(),

    User.countDocuments({
      role: "customer",
    }),

    RepairRequest.countDocuments(),

    BuyBackRequest.countDocuments(),

    Order.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .populate("userId", "name")
      .lean(),

    RepairRequest.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .populate("userId", "name")
      .lean(),

    BuyBackRequest.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .populate("userId", "name")
      .lean(),

    Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: sixMonthStart,
          },
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },
            month: {
              $month: "$createdAt",
            },
          },
          revenue: {
            $sum: {
              $ifNull: ["$subtotal", 0],
            },
          },
          orders: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]),

    RepairRequest.aggregate([
      {
        $match: {
          createdAt: {
            $gte: sixMonthStart,
          },
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },
            month: {
              $month: "$createdAt",
            },
          },
          repairs: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]),

    BuyBackRequest.aggregate([
      {
        $match: {
          createdAt: {
            $gte: sixMonthStart,
          },
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },
            month: {
              $month: "$createdAt",
            },
          },
          buybacks: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]),
  ])

  const totalRevenue = (orders as RecentOrder[]).reduce(
    (sum, order) => sum + (order.subtotal || 0),
    0,
  )

  const repairsByStatus = {
    submitted: repairs.filter(
      (repair: any) => repair.status === "submitted",
    ).length,
    inProgress: repairs.filter(
      (repair: any) => repair.status === "in-progress",
    ).length,
    completed: repairs.filter(
      (repair: any) => repair.status === "completed",
    ).length,
  }

  const buybackByStatus = {
    submitted: buybacks.filter(
      (buyback: any) => buyback.status === "submitted",
    ).length,
    quoted: buybacks.filter(
      (buyback: any) => buyback.status === "quoted",
    ).length,
    accepted: buybacks.filter(
      (buyback: any) => buyback.status === "accepted",
    ).length,
  }

  const monthlyStats: MonthlyStats[] = sixMonths.map((month) => {
    const orderData = monthlyOrders.find(
      (item: any) =>
        `${item._id.year}-${String(item._id.month).padStart(2, "0")}` ===
        month.key,
    )

    const repairData = monthlyRepairs.find(
      (item: any) =>
        `${item._id.year}-${String(item._id.month).padStart(2, "0")}` ===
        month.key,
    )

    const buybackData = monthlyBuybacks.find(
      (item: any) =>
        `${item._id.year}-${String(item._id.month).padStart(2, "0")}` ===
        month.key,
    )

    return {
      key: month.key,
      label: month.label,
      revenue: orderData?.revenue || 0,
      orders: orderData?.orders || 0,
      repairs: repairData?.repairs || 0,
      buybacks: buybackData?.buybacks || 0,
    }
  })

  const sixMonthRevenue = monthlyStats.reduce(
    (sum, item) => sum + item.revenue,
    0,
  )

  const currentMonth = monthlyStats[monthlyStats.length - 1]
  const previousMonth = monthlyStats[monthlyStats.length - 2]

  const revenueChange =
    previousMonth.revenue > 0
      ? ((currentMonth.revenue - previousMonth.revenue) /
          previousMonth.revenue) *
        100
      : currentMonth.revenue > 0
        ? 100
        : 0

  const orderChange =
    previousMonth.orders > 0
      ? ((currentMonth.orders - previousMonth.orders) /
          previousMonth.orders) *
        100
      : currentMonth.orders > 0
        ? 100
        : 0

  const repairChange =
    previousMonth.repairs > 0
      ? ((currentMonth.repairs - previousMonth.repairs) /
          previousMonth.repairs) *
        100
      : currentMonth.repairs > 0
        ? 100
        : 0

  const buybackChange =
    previousMonth.buybacks > 0
      ? ((currentMonth.buybacks - previousMonth.buybacks) /
          previousMonth.buybacks) *
        100
      : currentMonth.buybacks > 0
        ? 100
        : 0

  const activityValues = monthlyStats.map(
    (item) =>
      item.orders +
      item.repairs +
      item.buybacks,
  )

  const activityLabels = monthlyStats.map((item) => item.label)

  const firstName =
    (orders[0] as RecentOrder[] | undefined)?.[0]?.userId?.name?.split(
      " ",
    )[0] || "there"

  return (
    <main className="min-h-screen space-y-8 pb-10">
      {/* ---------------------------------------------------------------- */}
      {/* Header                                                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/[0.08] via-background to-background p-6 shadow-sm sm:p-8">
        <div className="absolute -right-24 -top-24 size-64 rounded-full bg-primary/[0.06] blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="size-3.5 text-primary" />
              Business overview
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Good morning, {firstName}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Monitor sales, repairs, customers, and trade-ins from one
              place.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/orders"
              className="inline-flex h-10 items-center gap-2 rounded-xl border bg-background px-4 text-sm font-medium shadow-sm transition hover:bg-muted"
            >
              <ShoppingCart className="size-4" />
              View orders
            </Link>

            <Link
              href="/admin/buy-back/new"
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              <RefreshCw className="size-4" />
              New trade-in
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* KPI cards                                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <DashboardMetric
          label="Active Products"
          value={productCount}
          description="Published products"
          icon={Package}
          iconClass="bg-blue-500/10 text-blue-600 dark:text-blue-400"
        />

        <DashboardMetric
          label="Total Orders"
          value={orderCount}
          description="All-time orders"
          icon={ShoppingCart}
          iconClass="bg-violet-500/10 text-violet-600 dark:text-violet-400"
        />

        <DashboardMetric
          label="Customers"
          value={customerCount}
          description="Registered customers"
          icon={Users}
          iconClass="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        />

        <DashboardMetric
          label="Repair Requests"
          value={repairCount}
          description="Service requests"
          icon={Wrench}
          iconClass="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        />

        <DashboardMetric
          label="Trade-ins"
          value={buybackCount}
          description="Buy-back requests"
          icon={RefreshCw}
          iconClass="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
        />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Revenue + summary                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="grid gap-5 xl:grid-cols-[1.65fr_1fr]">
        <DashboardSection
          title="Revenue overview"
          description="Revenue generated from orders over the last six months"
          icon={BarChart3}
          action={
            <div className="rounded-lg bg-emerald-500/10 px-2.5 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {revenueChange >= 0 ? "+" : ""}
              {revenueChange.toFixed(1)}%
            </div>
          }
        >
          <div className="mb-5 grid gap-4 sm:grid-cols-3">
            <SummaryStat
              label="This month"
              value={formatCurrency(currentMonth.revenue)}
              icon={DollarSign}
            />

            <SummaryStat
              label="Previous month"
              value={formatCurrency(previousMonth.revenue)}
              icon={Clock3}
            />

            <SummaryStat
              label="6 month total"
              value={formatCurrency(sixMonthRevenue)}
              icon={BarChart3}
            />
          </div>

          <RevenueChart data={monthlyStats} />
        </DashboardSection>

        <DashboardSection
          title="Quick health"
          description="Current operational snapshot"
          icon={Sparkles}
        >
          <div className="space-y-4">
            <HealthRow
              label="Repair completion"
              value={
                repairCount > 0
                  ? `${Math.round(
                      (repairsByStatus.completed / repairCount) * 100,
                    )}%`
                  : "0%"
              }
              current={repairsByStatus.completed}
              total={Math.max(repairCount, 1)}
              className="bg-emerald-500"
            />

            <HealthRow
              label="Trade-in acceptance"
              value={
                buybackCount > 0
                  ? `${Math.round(
                      (buybackByStatus.accepted / buybackCount) * 100,
                    )}%`
                  : "0%"
              }
              current={buybackByStatus.accepted}
              total={Math.max(buybackCount, 1)}
              className="bg-cyan-500"
            />

            <HealthRow
              label="Current month orders"
              value={String(currentMonth.orders)}
              current={currentMonth.orders}
              total={Math.max(
                ...monthlyStats.map((item) => item.orders),
                1,
              )}
              className="bg-primary"
            />

            <div className="rounded-xl border bg-muted/30 p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-4" />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Operations status
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Your dashboard data is up to date.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DashboardSection>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Activity chart + status charts                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="grid gap-5 xl:grid-cols-[1.35fr_1fr]">
        <DashboardSection
          title="Business activity"
          description="Orders, repairs, and trade-ins by month"
          icon={BarChart3}
        >
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <LegendItem
              label="Orders"
              className="bg-primary"
            />

            <LegendItem
              label="Repairs"
              className="bg-amber-500"
            />

            <LegendItem
              label="Trade-ins"
              className="bg-cyan-500"
            />
          </div>

          <MiniBarChart
            values={activityValues}
            labels={activityLabels}
          />

          <div className="mt-5 grid grid-cols-3 gap-3">
            <MiniStat
              label="Orders"
              value={currentMonth.orders}
              change={orderChange}
              icon={ShoppingCart}
            />

            <MiniStat
              label="Repairs"
              value={currentMonth.repairs}
              change={repairChange}
              icon={Wrench}
            />

            <MiniStat
              label="Trade-ins"
              value={currentMonth.buybacks}
              change={buybackChange}
              icon={RefreshCw}
            />
          </div>
        </DashboardSection>

        <DashboardSection
          title="Service status"
          description="Current repair workflow"
          icon={Wrench}
        >
          <DonutChart
            items={[
              {
                label: "Submitted",
                value: repairsByStatus.submitted,
                className: "text-blue-500",
              },
              {
                label: "In progress",
                value: repairsByStatus.inProgress,
                className: "text-amber-500",
              },
              {
                label: "Completed",
                value: repairsByStatus.completed,
                className: "text-emerald-500",
              },
            ]}
          />

          <div className="mt-6 grid grid-cols-3 gap-2">
            <StatusTile
              label="Submitted"
              value={repairsByStatus.submitted}
              className="bg-blue-500/10 text-blue-600 dark:text-blue-400"
            />

            <StatusTile
              label="Progress"
              value={repairsByStatus.inProgress}
              className="bg-amber-500/10 text-amber-600 dark:text-amber-400"
            />

            <StatusTile
              label="Done"
              value={repairsByStatus.completed}
              className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            />
          </div>
        </DashboardSection>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Recent activity                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="grid gap-5 xl:grid-cols-3">
        <ActivityPanel
          title="Recent orders"
          description="Latest customer purchases"
          icon={ShoppingCart}
          href="/admin/orders"
        >
          {orders.length === 0 ? (
            <EmptyState message="No orders yet." />
          ) : (
            <div className="space-y-1">
              {(orders as RecentOrder[]).map((order) => (
                <div
                  key={String(order._id)}
                  className="flex items-center gap-3 rounded-xl px-2 py-3 transition hover:bg-muted/50"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {getInitials(order.userId?.name)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {order.userId?.name || "Unknown customer"}
                    </p>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold">
                      {formatCurrency(order.subtotal || 0)}
                    </p>

                    <span className="text-[10px] text-muted-foreground">
                      Order
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ActivityPanel>

        <ActivityPanel
          title="Recent repairs"
          description="Latest service requests"
          icon={Wrench}
          href="/admin/repairs"
        >
          {repairs.length === 0 ? (
            <EmptyState message="No repair requests yet." />
          ) : (
            <div className="space-y-1">
              {(repairs as RecentRepair[]).map((repair) => (
                <div
                  key={String(repair._id)}
                  className="flex items-center gap-3 rounded-xl px-2 py-3 transition hover:bg-muted/50"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <Wrench className="size-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {repair.brand || "Device"}{" "}
                      {repair.model || ""}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {repair.userId?.name || "Unknown customer"}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
                      repair.status,
                    )}`}
                  >
                    {formatStatus(repair.status)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </ActivityPanel>

        <ActivityPanel
          title="Recent trade-ins"
          description="Latest device submissions"
          icon={RefreshCw}
          href="/admin/buy-back"
        >
          {buybacks.length === 0 ? (
            <EmptyState message="No trade-in requests yet." />
          ) : (
            <div className="space-y-1">
              {(buybacks as RecentBuyBack[]).map((buyback) => (
                <div
                  key={String(buyback._id)}
                  className="flex items-center gap-3 rounded-xl px-2 py-3 transition hover:bg-muted/50"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                    <Smartphone className="size-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {buyback.brand || "Device"}{" "}
                      {buyback.model || ""}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {buyback.userId?.name || "Unknown customer"}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold">
                      {buyback.offeredPrice
                        ? formatCurrency(buyback.offeredPrice)
                        : "—"}
                    </p>

                    <p
                      className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${getStatusClasses(
                        buyback.status,
                      )}`}
                    >
                      {formatStatus(buyback.status)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ActivityPanel>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Bottom insights                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="grid gap-5 md:grid-cols-3">
        <InsightCard
          icon={DollarSign}
          title="Revenue momentum"
          value={formatCurrency(currentMonth.revenue)}
          description={
            revenueChange >= 0
              ? `Revenue is up ${revenueChange.toFixed(1)}% compared with last month.`
              : `Revenue is down ${Math.abs(revenueChange).toFixed(1)}% compared with last month.`
          }
          positive={revenueChange >= 0}
        />

        <InsightCard
          icon={Cpu}
          title="Customer demand"
          value={String(currentMonth.orders)}
          description={
            orderChange >= 0
              ? `Orders increased ${orderChange.toFixed(1)}% compared with last month.`
              : `Orders decreased ${Math.abs(orderChange).toFixed(1)}% compared with last month.`
          }
          positive={orderChange >= 0}
        />

        <InsightCard
          icon={Wrench}
          title="Service workload"
          value={String(currentMonth.repairs)}
          description={`${currentMonth.repairs} repair requests were created this month.`}
          positive
        />
      </section>
    </main>
  )
}

/* ========================================================================== */
/* Local UI components                                                        */
/* ========================================================================== */

function DashboardMetric({
  label,
  value,
  description,
  icon: Icon,
  iconClass,
}: {
  label: string
  value: number
  description: string
  icon: typeof Package
  iconClass: string
}) {
  return (
    <div className="rounded-2xl border bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {label}
          </p>

          <p className="mt-3 text-3xl font-bold tracking-tight">
            {value.toLocaleString()}
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

function DashboardSection({
  title,
  description,
  icon: Icon,
  action,
  children,
}: {
  title: string
  description: string
  icon: typeof BarChart3
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border bg-background shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-4" />
          </div>

          <div>
            <h2 className="text-sm font-semibold">
              {title}
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        {action}
      </div>

      <div className="p-5 sm:p-6">
        {children}
      </div>
    </section>
  )
}

function SummaryStat({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: typeof DollarSign
}) {
  return (
    <div className="rounded-xl border bg-muted/20 p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground">
          {label}
        </span>

        <Icon className="size-3.5 text-muted-foreground" />
      </div>

      <p className="mt-2 text-lg font-bold">
        {value}
      </p>
    </div>
  )
}

function HealthRow({
  label,
  value,
  current,
  total,
  className,
}: {
  label: string
  value: string
  current: number
  total: number
  className: string
}) {
  const width = Math.min(
    Math.max((current / Math.max(total, 1)) * 100, 3),
    100,
  )

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="text-sm text-muted-foreground">
          {label}
        </span>

        <span className="text-sm font-semibold">
          {value}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${className}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

function LegendItem({
  label,
  className,
}: {
  label: string
  className: string
}) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span className={`size-2.5 rounded-full ${className}`} />
      {label}
    </div>
  )
}

function MiniStat({
  label,
  value,
  change,
  icon: Icon,
}: {
  label: string
  value: number
  change: number
  icon: typeof ShoppingCart
}) {
  const positive = change >= 0

  return (
    <div className="rounded-xl border bg-muted/20 p-3">
      <div className="flex items-center gap-2">
        <Icon className="size-3.5 text-muted-foreground" />
        <span className="text-[11px] text-muted-foreground">
          {label}
        </span>
      </div>

      <div className="mt-2 flex items-end justify-between gap-2">
        <span className="text-lg font-bold">
          {value}
        </span>

        <span
          className={
            positive
              ? "text-[10px] font-semibold text-emerald-600 dark:text-emerald-400"
              : "text-[10px] font-semibold text-rose-600 dark:text-rose-400"
          }
        >
          {positive ? "+" : ""}
          {change.toFixed(0)}%
        </span>
      </div>
    </div>
  )
}

function StatusTile({
  label,
  value,
  className,
}: {
  label: string
  value: number
  className: string
}) {
  return (
    <div className={`rounded-xl p-3 ${className}`}>
      <p className="text-[10px] font-medium opacity-80">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold">
        {value}
      </p>
    </div>
  )
}

function ActivityPanel({
  title,
  description,
  icon: Icon,
  href,
  children,
}: {
  title: string
  description: string
  icon: typeof ShoppingCart
  href: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border bg-background shadow-sm">
      <div className="flex items-start justify-between border-b px-5 py-5">
        <div className="flex items-start gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Icon className="size-4" />
          </div>

          <div>
            <h2 className="text-sm font-semibold">
              {title}
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        <Link
          href={href}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          View all
          <ChevronRight className="size-3" />
        </Link>
      </div>

      <div className="p-4">
        {children}
      </div>
    </section>
  )
}

function EmptyState({
  message,
}: {
  message: string
}) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-5 text-center">
      <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
        <Package className="size-4 text-muted-foreground" />
      </div>

      <p className="mt-3 text-sm font-medium">
        {message}
      </p>

      <p className="mt-1 text-xs text-muted-foreground">
        New activity will appear here.
      </p>
    </div>
  )
}

function InsightCard({
  icon: Icon,
  title,
  value,
  description,
  positive,
}: {
  icon: typeof DollarSign
  title: string
  value: string
  description: string
  positive: boolean
}) {
  return (
    <div className="rounded-2xl border bg-background p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className={
            positive
              ? "flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "flex size-9 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400"
          }
        >
          <Icon className="size-4" />
        </div>

        <p className="text-sm font-semibold">
          {title}
        </p>
      </div>

      <p className="mt-4 text-2xl font-bold">
        {value}
      </p>

      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {description}
      </p>

      <div
        className={
          positive
            ? "mt-4 flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400"
            : "mt-4 flex items-center gap-1 text-xs font-medium text-rose-600 dark:text-rose-400"
        }
      >
        {positive ? (
          <ArrowUpRight className="size-3.5" />
        ) : (
          <ArrowDownRight className="size-3.5" />
        )}

        <span>
          {positive ? "Positive trend" : "Needs attention"}
        </span>
      </div>
    </div>
  )
}