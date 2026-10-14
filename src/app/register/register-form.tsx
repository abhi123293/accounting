"use client";

import { useState, type FormEvent, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth, useRedirectIfAuthenticated } from "@/lib/auth-context";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Mail, Lock, User, Eye, EyeOff, Loader2, AlertCircle, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "cn";
import { Logo } from "@/components/ui/logo";
import { Wallet } from "lucide-react";

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { error: authError, success, clearError, clearSuccess, setSuccess, signIn } = useAuth();
  const redirect = searchParams.get("redirect") || "/dashboard";
  useRedirectIfAuthenticated();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Password criteria checks (exactly 6 chars, 1 uppercase, 1 number)
  const passwordChecks = {
    length: password.length === 6,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const passwordStrength = Object.values(passwordChecks).filter(Boolean).length;

  const getPasswordStrengthColor = (strength: number) => {
    if (strength === 0) return "bg-red-500";
    if (strength === 1) return "bg-red-500";
    if (strength === 2) return "bg-orange-500";
    return "bg-green-500";
  };

  const getPasswordStrengthWidth = (strength: number) => {
    if (strength === 0) return "0%";
    if (strength === 1) return "33.33%";
    if (strength === 2) return "66.66%";
    return "100%";
  };

  const getCriteriaColor = (met: boolean) => (met ? "text-green-600" : "text-orange-600");
  const getCriteriaIconColor = (met: boolean) => (met ? "text-green-600" : "text-orange-600");

  const validateName = (value: string) => {
    if (!value) return "Name is required";
    if (value.trim().length < 2) return "Name must be at least 2 characters";
    return "";
  };

  const validateEmail = (value: string) => {
    if (!value) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address (e.g., name@company.com)";
    return "";
  };

  const validatePassword = (value: string) => {
    if (!value) return "Password is required";
    if (value.length !== 6) return "Password must be exactly 6 characters";
    if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
    if (!/[0-9]/.test(value)) return "Password must contain at least one number";
    return "";
  };

  const validateConfirmPassword = (value: string) => {
    if (!value) return "Please confirm your password";
    if (value !== password) return "Passwords do not match";
    return "";
  };

  const handleBlur = (field: string, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "name") setErrors((prev) => ({ ...prev, name: validateName(value) }));
    if (field === "email") setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    if (field === "password") setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    if (field === "confirmPassword") setErrors((prev) => ({ ...prev, confirmPassword: validateConfirmPassword(value) }));
  };

  const handleChange = (field: string, value: string) => {
    if (field === "name") setName(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    if (field === "confirmPassword") setConfirmPassword(value);
    if (success) clearSuccess();
    if (touched[field]) {
      if (field === "name") setErrors((prev) => ({ ...prev, name: validateName(value) }));
      if (field === "email") setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
      if (field === "password") setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
      if (field === "confirmPassword") setErrors((prev) => ({ ...prev, confirmPassword: validateConfirmPassword(value) }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearError();
    clearSuccess();

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);

    if (nameError || emailError || passwordError || confirmPasswordError) {
      setErrors({
        name: nameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      setTouched({ name: true, email: true, password: true, confirmPassword: true });
      return;
    }

setLoading(true);
      try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name.trim() });
        await signIn(email, password);
        setSuccess("Account created successfully! Welcome to your dashboard.");
        router.replace(redirect);
        router.refresh();
      } catch (err) {
      const error = err as { code?: string; message?: string };
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrors({ email: "An account with this email already exists." });
          setTouched({ email: true });
          break;
        case "auth/invalid-email":
          setErrors({ email: "Please enter a valid email address." });
          setTouched({ email: true });
          break;
        case "auth/weak-password":
          setErrors({ password: "Password does not meet requirements." });
          setTouched({ password: true });
          break;
        default:
          setErrors({ form: error.message || "Unable to create account. Please try again." });
          setTouched({ form: true });
      }
    } finally {
      setLoading(false);
    }
  };

  const PasswordCriteria = ({ label, met }: { label: string; met: boolean }) => (
    <div className="flex items-center gap-2 text-sm">
      {met ? (
        <Check className={cn("h-4 w-4 flex-shrink-0", getCriteriaIconColor(met))} />
      ) : (
        <X className={cn("h-4 w-4 flex-shrink-0", getCriteriaIconColor(met))} />
      )}
      <span className={getCriteriaColor(met)}>
        {label}
      </span>
    </div>
  );

  if (!mounted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background p-5 text-foreground">
        <div className="w-full max-w-md">
          <div className="mx-auto mb-10 text-center">
            <Link href="/dashboard" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Wallet className="h-7 w-7" />
              </div>
            </Link>
          </div>
          <div className="space-y-6 rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="text-center space-y-2">
              <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground animate-pulse">Create Account</h2>
              <p className="text-base text-muted-foreground animate-pulse">Start managing your business finances today.</p>
            </div>
            <div className="space-y-4" aria-busy="true">
              <div className="h-12 w-full animate-pulse bg-muted rounded-lg" />
              <div className="h-12 w-full animate-pulse bg-muted rounded-lg" />
              <div className="h-12 w-full animate-pulse bg-muted rounded-lg" />
              <div className="h-12 w-full animate-pulse bg-muted rounded-lg" />
              <div className="h-12 w-full animate-pulse bg-muted rounded-lg" />
              <div className="h-12 w-full animate-pulse bg-muted rounded-lg" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-5 text-foreground">
      <div className="w-full max-w-md">
        <div className="mx-auto mb-10 text-center">
          <Link href="/dashboard" className="inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Wallet className="h-7 w-7" />
            </div>
          </Link>
        </div>

        <div className="space-y-6 rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground">Create an Account</h2>
            <p className="text-base text-muted-foreground">Start managing your business finances today.</p>
          </div>

          {authError && (
            <div
              role="alert"
              className="rounded-lg border border-orange-500/50 bg-orange-500/10 p-3 text-sm text-orange-700"
            >
              {authError}
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

          {errors.form && (
            <div
              role="alert"
              className="rounded-lg border border-orange-500/50 bg-orange-500/10 p-3 text-sm text-orange-700"
            >
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={(e) => handleBlur("name", e.target.value)}
                  className="pl-12 pr-3 w-full h-12 rounded-lg border border-border bg-background text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none disabled:bg-muted/50 disabled:cursor-not-allowed"
                  placeholder="John Doe"
                  aria-invalid={touched.name && !!errors.name}
                  aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                  disabled={loading}
                />
              </div>
              {touched.name && errors.name && (
                <p id="name-error" role="alert" className="text-sm text-orange-700">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={(e) => handleBlur("email", e.target.value)}
                  className="pl-12 pr-3 w-full h-12 rounded-lg border border-border bg-background text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none disabled:bg-muted/50 disabled:cursor-not-allowed"
                  placeholder="you@company.com"
                  aria-invalid={touched.email && !!errors.email}
                  aria-describedby={touched.email && errors.email ? "email-error" : "email-hint"}
                  disabled={loading}
                />
              </div>
              <p id="email-hint" className="text-xs text-muted-foreground">Format: name@company.com</p>
              {touched.email && errors.email && (
                <p id="email-error" role="alert" className="text-sm text-orange-700">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  onBlur={(e) => handleBlur("password", e.target.value)}
                  className="pl-12 pr-12 w-full h-12 rounded-lg border border-border bg-background text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none disabled:bg-muted/50 disabled:cursor-not-allowed"
                  placeholder="••••••••"
                  aria-invalid={touched.password && !!errors.password}
                  aria-describedby={touched.password && errors.password ? "password-error" : "password-hint"}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Password Criteria - 3 requirements */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs mt-3 p-3 rounded-lg bg-muted/50">
                <PasswordCriteria label="Exactly 6 chars" met={passwordChecks.length} />
                <PasswordCriteria label="Uppercase (A-Z)" met={passwordChecks.uppercase} />
                <PasswordCriteria label="Number (0-9)" met={passwordChecks.number} />
              </div>

              {/* Password Strength Bar - 3 levels */}
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all duration-300 rounded-full",
                    getPasswordStrengthColor(passwordStrength)
                  )}
                  style={{ width: getPasswordStrengthWidth(passwordStrength) }}
                />
              </div>

              {errors.password && (
                <p id="password-error" role="alert" className="text-sm text-orange-700">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  onBlur={(e) => handleBlur("confirmPassword", e.target.value)}
                  className="pl-12 pr-3 w-full h-12 rounded-lg border border-border bg-background text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none disabled:bg-muted/50 disabled:cursor-not-allowed"
                  placeholder="••••••••"
                  aria-invalid={touched.confirmPassword && !!errors.confirmPassword}
                  aria-describedby={touched.confirmPassword && errors.confirmPassword ? "confirm-error" : undefined}
                  disabled={loading}
                />
              </div>
              {errors.confirmPassword && (
                <p id="confirm-error" role="alert" className="text-sm text-orange-700">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary text-primary-foreground font-medium text-sm rounded-lg transition-all duration-150 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account…
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground/60">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="underline underline-offset-2 hover:text-foreground transition-colors">Terms of Service</Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground transition-colors">Privacy Policy</Link>
        </p>
      </div>
    </main>
  );
}