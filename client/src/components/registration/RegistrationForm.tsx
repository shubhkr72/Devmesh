"use client";

import { AlertCircle, ArrowRight, LockKeyhole, Mail, User, AtSign } from "lucide-react";
import useRegistration from "@/hooks/useRegistration";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function RegistrationForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    username,
    setUsername,
    error,
    isLoading,
    handleRegistration,
  } = useRegistration();

  return (
    <div className="surface-panel rounded-lg p-6 sm:p-7">
      <div className="mb-7">
        <p className="text-sm font-semibold text-accent">Start here</p>
        <h2 className="mt-2 text-2xl font-semibold text-foreground">
          Create your account
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Set up the basics now and refine your developer profile after login.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleRegistration}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-foreground"
            >
              Full Name
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                type="text"
                className="pl-9"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alice"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-foreground"
            >
              Username
            </label>
            <div className="relative">
              <AtSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="username"
                name="username"
                type="text"
                className="pl-9"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="alice_dev"
              />
            </div>
          </div>
        </div>

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
              className="pl-9"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
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
              className="pl-9"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
            />
          </div>
          <p className="text-xs leading-5 text-muted-foreground">
            Use at least 8 characters with letters, numbers, and symbols.
          </p>
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
              Creating account
            </>
          ) : (
            <>
              Create account
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-7 border-t border-border pt-5 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
