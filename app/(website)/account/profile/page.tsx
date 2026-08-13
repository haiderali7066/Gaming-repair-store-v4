"use client";

import { useState, useEffect } from "react";
import { Mail, AlertCircle, CheckCircle, ShieldCheck, User, Phone, MapPin, Edit2, X, Save } from "lucide-react";
import { updateProfileAction } from "@/actions/profile";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/profile");
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setUser(data);
        setName(data.name);
        setPhone(data.phone || "");
        setAddress(data.address || "");
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("address", address);

      const result = await updateProfileAction(formData);

      if (result.error) {
        setError(result.error);
      } else {
        if (result.user) {
          setUser((current: any) => ({ ...current, ...result.user }));
          setName(result.user.name);
          setPhone(result.user.phone);
          setAddress(result.user.address || "");
        }
        setSuccess(result.message || "Profile updated successfully");
        setIsEditing(false); // Only lock the form again on a successful save
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl w-full space-y-8 animate-pulse">
        <div>
          <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg mb-3"></div>
          <div className="h-4 w-64 bg-slate-100 dark:bg-slate-800/50 rounded-md"></div>
        </div>
        <div className="h-24 w-full bg-slate-100 dark:bg-slate-900 rounded-2xl"></div>
        <div className="space-y-6">
          <div className="h-12 w-full bg-slate-100 dark:bg-slate-900 rounded-xl"></div>
          <div className="h-12 w-full bg-slate-100 dark:bg-slate-900 rounded-xl"></div>
          <div className="h-24 w-full bg-slate-100 dark:bg-slate-900 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
          Account Settings
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Manage your personal information and preferences.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 flex items-start gap-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-4 text-sm text-red-700 dark:text-red-400 shadow-sm">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <p className="font-medium leading-relaxed">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-6 flex items-start gap-3 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl p-4 text-sm text-green-700 dark:text-green-400 shadow-sm">
          <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <p className="font-medium leading-relaxed">{success}</p>
        </div>
      )}

      {/* Identity Verification Card (Read Only) */}
      {(user?.photoUrl || user?.idNumber) && (
        <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center gap-5 shadow-sm relative overflow-hidden">
          <ShieldCheck className="absolute -right-4 -bottom-4 w-32 h-32 text-slate-100 dark:text-slate-800/50 pointer-events-none" />
          {user?.photoUrl ? (
            <img
              src={user.photoUrl || "/placeholder.svg"}
              alt="Verified Identity"
              className="h-16 w-16 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-md relative z-10"
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center relative z-10">
              <User className="w-8 h-8" />
            </div>
          )}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black uppercase tracking-wider text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3" /> Identity Verified
              </span>
            </div>
            {user?.idNumber && (
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                ID: <span className="font-mono text-slate-500 dark:text-slate-400">{user.idNumber}</span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Main Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Email - Read Only */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Email Address
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-4 text-slate-400">
              <Mail className="h-5 w-5" />
            </div>
            <input
              type="email"
              value={user?.email}
              disabled
              className="w-full pl-12 pr-24 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 dark:text-slate-400 text-sm cursor-not-allowed font-medium"
            />
            <div className="absolute right-4 text-xs font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
               Verified
            </div>
          </div>
        </div>

        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Full Name
          </label>
          <div className="relative flex items-center">
            <div className={`absolute left-4 transition-colors ${isEditing ? 'text-violet-500' : 'text-slate-400'}`}>
              <User className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
              required
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent disabled:bg-slate-50 disabled:dark:bg-slate-900/50 disabled:text-slate-500 disabled:dark:text-slate-400 transition-all duration-200"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Phone Number
          </label>
          <div className="relative flex items-center">
            <div className={`absolute left-4 transition-colors ${isEditing ? 'text-violet-500' : 'text-slate-400'}`}>
              <Phone className="h-5 w-5" />
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!isEditing}
              placeholder="Enter your phone number"
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent disabled:bg-slate-50 disabled:dark:bg-slate-900/50 disabled:text-slate-500 disabled:dark:text-slate-400 transition-all duration-200"
            />
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Shipping Address
          </label>
          <div className="relative flex items-start">
            <div className={`absolute left-4 top-3.5 transition-colors ${isEditing ? 'text-violet-500' : 'text-slate-400'}`}>
              <MapPin className="h-5 w-5" />
            </div>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={!isEditing}
              placeholder="Enter your full shipping address"
              rows={3}
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent disabled:bg-slate-50 disabled:dark:bg-slate-900/50 disabled:text-slate-500 disabled:dark:text-slate-400 transition-all duration-200 resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row gap-3 border-t border-slate-200 dark:border-slate-800">
          {!isEditing ? (
            <button 
              type="button" 
              onClick={(e) => {
                e.preventDefault(); // <-- Prevents accidental form submission
                setIsEditing(true);
              }} 
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <>
              <button 
                type="submit" 
                disabled={isSaving} 
                className="w-full sm:w-auto flex-1 px-8 py-3.5 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Save Changes
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault(); // <-- Prevents accidental form submission
                  setIsEditing(false);
                  setName(user?.name);
                  setPhone(user?.phone || "");
                  setAddress(user?.address || "");
                  setError("");
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}