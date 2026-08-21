import { AuthForm } from "@/components/forms/AuthForm";
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <AuthForm mode="login" error={error} />
    </main>
  );
}
