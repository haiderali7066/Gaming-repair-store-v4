import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { AdminSidebar } from "@/components/layout/AdminSidebar"
export default async function AdminLayout({ children }: { children: React.ReactNode }) { const session = await auth(); if (session?.user.role !== "admin") redirect("/admin/login"); return <div className="min-h-screen bg-background lg:grid lg:grid-cols-[240px_1fr]"><AdminSidebar /><main className="min-w-0 p-5 md:p-8">{children}</main></div> }
