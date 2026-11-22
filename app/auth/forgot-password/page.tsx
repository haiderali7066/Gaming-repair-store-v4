import type { Metadata } from "next"
import { ForgotPasswordForm } from "@/components/forms/ForgotPasswordForm"

export const metadata: Metadata = {
  title: "Reset your password",
  robots: { index: false },
}

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <ForgotPasswordForm />
    </main>
  )
}
