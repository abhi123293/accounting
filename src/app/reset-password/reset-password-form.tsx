"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth, useRedirectIfAuthenticated } from "@/lib/auth-context";
import { Mail, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { AuthLayout, AuthFormHeader, AuthFormFooter } from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "cn";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { resetPassword, error: authError, success, clearError, clearSuccess } = useAuth();
  const prefilledEmail = searchParams.get("email") || "";
  useRedirectIfAuthenticated();

  const [email, setEmail] = useState(prefilledEmail);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateEmail = (value: string) => {
    if (!value) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
    return "";
  };

  const handleBlur = (field: string, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "email") setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handleChange = (field: string, value: string) => {
    if (field === "email") setEmail(value);
    if (success) clearSuccess();
    if (touched[field]) {
      if (field === "email") setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearError();
    clearSuccess();

    const emailError = validateEmail(email);

    if (emailError) {
      setErrors({ email: emailError });
      setTouched({ email: true });
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      // Success handled by auth context
    } catch {
      // Error handled by auth context
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    clearSuccess();
    setErrors({});
    setTouched({});
  };

  return (
    <AuthLayout
      brandHeadline="Precision in Every Transaction."
      brandSubtext="Simplify your accounting, gain clarity, and make better business decisions."
    >
      <AuthFormHeader
        title={success ? "Check Your Email" : "Reset your password"}
        description={success
          ? "We've sent a password reset link to your email address."
          : "Enter your email and we'll send you a link to reset your password."}
      />

      {authError && !success && (
        <div
          role="alert"
          className="mb-6 flex items-center gap-3 p-4 rounded-[8px] border border-orange-500/50 bg-orange-500/10 p-3 text-sm text-orange-700"
        >
          <AlertCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          <p className="text-sm">{authError}</p>
        </div>
      )}

      {success && (
        <div
          role="status"
          className="mb-6 flex items-center gap-3 p-4 rounded-[8px] border border-black/10 bg-black/5"
        >
          <CheckCircle className="h-5 w-5 flex-shrink-0 text-black" aria-hidden="true" />
          <div>
            <p className="font-medium text-black">Reset email sent!</p>
            <p className="text-sm text-gray-600">
              Check your inbox at <strong className="text-black">{email}</strong> for instructions.
            </p>
          </div>
        </div>
      )}

      {success && (
        <div
          role="status"
          className="rounded-lg border border-green-500/50 bg-green-500/10 p-3 text-sm text-green-700"
        >
          {success}
        </div>
      )}

      {!success && (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-black">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={(e) => handleBlur("email", e.target.value)}
                className={cn(
                  "auth-input pl-12",
                  touched.email && errors.email && "auth-input-error"
                )}
                placeholder="you@company.com"
                aria-invalid={touched.email && !!errors.email}
                aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                aria-label="Email address"
                disabled={loading}
              />
            </div>
            {touched.email && errors.email && (
              <p id="email-error" role="alert" className="text-sm text-orange-700 flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                {errors.email}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={cn(
              "auth-button",
              loading && "opacity-70 cursor-wait"
            )}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      )}

      {success && (
        <div className="space-y-3 mt-2">
          <button
            type="button"
            onClick={handleResend}
            className="auth-button-outline"
          >
            Resend Email
          </button>
          <AuthFormFooter
            text=""
            linkText="Back to Sign In"
            href="/login"
          />
        </div>
      )}

      {!success && (
        <AuthFormFooter
          text="Remember your password?"
          linkText="Sign in"
          href="/login"
        />
      )}

      <p className="mt-10 text-center text-xs text-gray-400">
        By signing in, you agree to our{" "}
        <Link href="/terms" className="underline underline-offset-2 hover:text-gray-600 transition-colors duration-150">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-gray-600 transition-colors duration-150">
          Privacy Policy
        </Link>
      </p>
    </AuthLayout>
  );
}