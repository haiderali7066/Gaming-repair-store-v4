"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mail, AlertCircle, CheckCircle } from "lucide-react"
import { updateProfileAction } from "@/actions/profile"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/profile")
        if (!res.ok) throw new Error("Failed to fetch profile")
        const data = await res.json()
        setUser(data)
        setName(data.name)
        setPhone(data.phone || "")
        setAddress(data.address || "")
      } catch (err) {
        setError("Failed to load profile")
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsSaving(true)

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("phone", phone)
      formData.append("address", address)

      const result = await updateProfileAction(formData)

      if (result.error) {
        setError(result.error)
      } else {
        // Sync local state from the server's confirmed values instead of
        // relying on router.refresh() (this page is fully client-rendered,
        // so refresh() alone would not update the `user` state below).
        if (result.user) {
          setUser((current: any) => ({ ...current, ...result.user }))
          setName(result.user.name)
          setPhone(result.user.phone)
          setAddress(result.user.address || "")
        }
        setSuccess(result.message || "Profile updated successfully")
        setIsEditing(false)
        setTimeout(() => setSuccess(""), 3000)
      }
    } catch (err) {
      setError("Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading...</div>
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1">Account Settings</h1>
        <p className="text-muted-foreground">Update your profile information</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex gap-3 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 dark:bg-red-950/20 dark:border-red-900/30 dark:text-red-400">
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="flex gap-3 bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700 dark:bg-green-950/20 dark:border-green-900/30 dark:text-green-400">
          <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <p>{success}</p>
        </div>
      )}

      {/* Verification photo + ID - read only, captured at registration */}
      {(user?.photoUrl || user?.idNumber) && (
        <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-4">
          {user?.photoUrl && (
            <img
              src={user.photoUrl || "/placeholder.svg"}
              alt="Your verification photo"
              className="h-16 w-16 rounded-full object-cover"
            />
          )}
          {user?.idNumber && (
            <div>
              <p className="text-xs font-medium text-muted-foreground">ID number</p>
              <p className="text-sm font-semibold">{user.idNumber}</p>
            </div>
          )}
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email - Read Only */}
        <div>
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg bg-muted/50">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <input
              type="email"
              value={user?.email}
              disabled
              className="flex-1 bg-transparent text-muted-foreground text-sm"
            />
            <span className="text-xs font-semibold text-green-600 dark:text-green-400">Verified</span>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm disabled:bg-muted/50 disabled:text-muted-foreground"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={!isEditing}
            placeholder="Enter your phone number"
            className="w-full px-3 py-2 border border-border rounded-lg text-sm disabled:bg-muted/50 disabled:text-muted-foreground"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium mb-2">Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={!isEditing}
            placeholder="Enter your address"
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm disabled:bg-muted/50 disabled:text-muted-foreground resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          {!isEditing ? (
            <Button type="button" onClick={() => setIsEditing(true)} className="w-full">
              Edit Profile
            </Button>
          ) : (
            <>
              <Button type="submit" disabled={isSaving} className="flex-1">
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false)
                  setName(user?.name)
                  setPhone(user?.phone || "")
                  setAddress(user?.address || "")
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  )
}
