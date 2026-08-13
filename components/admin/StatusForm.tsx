import { updateStatus } from "@/actions/admin"
import { Button } from "@/components/ui/button"

// Status options must match the badge-color maps and stat counters used on
// each admin list page (repairs and buy-back use different lifecycles).
const STATUS_OPTIONS = {
  order: ["pending", "confirmed", "processing", "ready", "completed", "cancelled"],
  repair: ["submitted", "in-progress", "completed", "cancelled"],
  buyback: ["submitted", "under-review", "quoted", "accepted", "rejected", "completed"],
} as const

export function StatusForm({ id, kind, current }: { id: string; kind: "order" | "repair" | "buyback"; current: string }) {
  const statuses = STATUS_OPTIONS[kind]
  return (
    <form action={updateStatus} className="flex items-center gap-2">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="kind" value={kind} />
      {/* Keying on `current` forces React to remount the select (instead of
          reusing the DOM node) whenever the server value changes, e.g. after
          setBuybackOffer() also sets status to "quoted" and the page is
          refreshed — otherwise defaultValue only applies on first mount and
          the dropdown would keep showing the stale status. */}
      <select key={current} name="status" defaultValue={current} className="h-9 border border-input bg-background px-2 text-sm">
        {statuses.map((x) => (
          <option key={x}>{x}</option>
        ))}
      </select>
      {/* The Button primitive defaults to type="button" (unlike a native
          <button>), so it must be set explicitly or clicking it never
          submits the form. */}
      <Button type="submit" size="sm" variant="outline">
        Update
      </Button>
    </form>
  )
}
