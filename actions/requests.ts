"use server"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { connectToDatabase } from "@/lib/mongodb"
import { buyBackSchema, repairSchema } from "@/lib/validators"
import { BuyBackRequest } from "@/models/BuyBackRequest"
import { RepairRequest } from "@/models/RepairRequest"
async function userId() { const session = await auth(); if (!session?.user?.id) redirect("/auth/login"); return session.user.id }
export async function submitRepair(formData: FormData) { const parsed = repairSchema.safeParse(Object.fromEntries(formData)); if (!parsed.success) redirect(`/repair?error=${encodeURIComponent("Please complete all repair details")}`); await connectToDatabase(); await RepairRequest.create({ ...parsed.data, userId: await userId() }); redirect("/account/repairs?success=Repair request submitted") }
export async function submitBuyBack(formData: FormData) { const parsed = buyBackSchema.safeParse(Object.fromEntries(formData)); if (!parsed.success) redirect(`/buy-back?error=${encodeURIComponent("Please complete all device details")}`); await connectToDatabase(); await BuyBackRequest.create({ ...parsed.data, userId: await userId() }); redirect("/account/buy-back?success=Trade-in request submitted") }
