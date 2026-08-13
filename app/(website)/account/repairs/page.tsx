import Link from "next/link"
import { auth } from "@/auth"
import { connectToDatabase } from "@/lib/mongodb"
import { formatDate, serialize } from "@/lib/helpers"
import { RepairRequest } from "@/models/RepairRequest"
import { Button } from "@/components/ui/button"

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  in_progress: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  hold: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
}

export default async function RepairsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>
}) {
  const session = await auth()
  const { success } = await searchParams
  await connectToDatabase()

  const repairs = serialize(
    await RepairRequest.find({ userId: session!.user.id })
      .sort({ createdAt: -1 })
      .lean()
  )

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1">Repairs</h1>
        <p className="text-muted-foreground">Track your device repairs</p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm dark:bg-green-950/20 dark:border-green-900/30 dark:text-green-400">
          {success}
        </div>
      )}

      {/* Repairs List */}
      {repairs.length > 0 ? (
        <div className="space-y-3">
          {repairs.map((repair: any) => (
            <div key={repair._id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold mb-1">
                    {repair.brand} {repair.model}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {repair.deviceType} • {formatDate(repair.createdAt)}
                  </div>
                  <div className="text-sm text-foreground line-clamp-2">{repair.problem}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded text-xs font-medium whitespace-nowrap ${
                      statusStyles[repair.status as keyof typeof statusStyles] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {repair.status === "in_progress" ? "In Progress" : repair.status.charAt(0).toUpperCase() + repair.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
          <div className="text-muted-foreground mb-4">No repair requests yet</div>
          <Button render={<Link href="/repair-booking" />} variant="outline">
            Request a Repair
          </Button>
        </div>
      )}
    </div>
  )
}
