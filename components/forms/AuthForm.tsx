"use client"

import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { loginAction, registerAction } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function AuthForm({ mode, error, admin = false }: { mode: "login" | "register"; error?: string; admin?: boolean }) {
  const [showPassword, setShowPassword] = useState(false)
  const register = mode === "register"
  const action = register ? registerAction : loginAction

  return (
    <Card className="w-full max-w-md border-border bg-card">
      <CardHeader>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          {admin ? "Admin access" : "Al Dana account"}
        </p>
        <CardTitle className="text-3xl font-bold">
          {register ? "Create your account" : "Welcome back"}
        </CardTitle>
        <CardDescription>
          {register
            ? "Track orders, repairs, and trade-ins in one place."
            : "Sign in securely to continue."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="auth-form" action={action}>
          <FieldGroup>
            {register && (
              <Field>
                <FieldLabel htmlFor="name">Full name</FieldLabel>
                <Input id="name" name="name" required />
              </Field>
            )}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
              />
            </Field>
            {register && (
              <Field>
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <Input id="phone" name="phone" type="tel" required autoComplete="tel" />
              </Field>
            )}
            {register && (
              <Field>
                <FieldLabel htmlFor="idNumber">ID number</FieldLabel>
                <Input id="idNumber" name="idNumber" required placeholder="Emirates ID / passport number" />
              </Field>
            )}
            {register && (
              <Field>
                <FieldLabel htmlFor="photo">Photo</FieldLabel>
                <Input id="photo" name="photo" type="file" accept="image/*" required />
                <p className="text-xs text-muted-foreground">Upload a clear photo of yourself for identity verification.</p>
              </Field>
            )}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  minLength={8}
                  required
                  autoComplete={register ? "new-password" : "current-password"}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </Field>
            {!register && (
              <input
                type="hidden"
                name="callbackUrl"
                value={admin ? "/admin/dashboard" : "/account"}
              />
            )}
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <Button form="auth-form" type="submit" className="w-full">
          {register ? "Create account" : "Sign in"}
        </Button>
        {!admin && (
          <p className="text-sm text-muted-foreground">
            {register ? "Already registered?" : "New to Al Dana?"}{" "}
            <Link
              className="font-semibold text-foreground underline"
              href={register ? "/auth/login" : "/auth/register"}
            >
              {register ? "Sign in" : "Create account"}
            </Link>
          </p>
        )}
      </CardFooter>
    </Card>
  )
}
