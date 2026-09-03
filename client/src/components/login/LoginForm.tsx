import { AlertCircle, ArrowRight, LockKeyhole, Mail } from "lucide-react";
import useLogin from "@/hooks/useLogin";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleLogin,
  } = useLogin();

  return (
    <div className="surface-panel rounded-lg p-6 sm:p-7">
      <div className="mb-7">
        <p className="text-sm font-semibold text-primary">Welcome back</p>
        <h2 className="mt-2 text-2xl font-semibold text-foreground">
          Sign in to codemesh
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Continue discovering developers and managing your network.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleLogin}>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-foreground"
          >
            Email address
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="pl-9"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alice@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-foreground"
          >
            Password
          </label>
          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="pl-9"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="h-11 w-full cursor-pointer"
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-b-transparent" />
              Signing in
            </>
          ) : (
            <>
              Sign in
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-7 border-t border-border pt-5 text-center">
        <p className="text-sm text-muted-foreground">
          New to codemesh?{" "}
          <Link
            to="/register"
            className="font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
