"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const supabase = createClient();

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const { error } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (error) {
        setError(error.message);
        return;
      }

      /*
       * The @supabase/ssr browser client now stores
       * the authentication session using cookies.
       *
       * The Next.js Proxy can therefore see the
       * same session on the server.
       */

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      setError(
        "Something went wrong while signing in."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8">

        {/* Header */}

        <div className="text-center">
          <h2 className="text-2xl font-bold text-purple-900">
            Welcome Back
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Sign in to your Elvoret account
          </p>
        </div>

        {/* Error */}

        {error && (
          <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >

          {/* Email */}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              autoCapitalize="none"
              autoComplete="email"
              className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-base text-gray-900 transition focus:border-purple-600 focus:bg-white focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              autoComplete="current-password"
              className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-base text-gray-900 transition focus:border-purple-600 focus:bg-white focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-xl bg-purple-900 py-3 font-semibold text-white transition hover:bg-purple-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Signing in..."
              : "Sign In"}
          </button>

        </form>

        {/* Signup */}

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}

          <Link
            href="/signup"
            className="font-medium text-purple-700 hover:underline"
          >
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}