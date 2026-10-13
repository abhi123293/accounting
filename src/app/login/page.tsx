
"use client";

import { useState, type FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/dashboard");
    } catch {
      setError("Unable to sign in. Check your email and password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-5 text-foreground">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm"
      >
        <div>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your accounting workspace.
          </p>
        </div>

        <label className="block space-y-2 text-sm font-medium">
          Email
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11 w-full rounded-lg border border-border bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <label className="block space-y-2 text-sm font-medium">
          Password
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-11 w-full rounded-lg border border-border bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="h-11 w-full rounded-lg bg-primary px-4 font-medium text-primary-foreground disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
