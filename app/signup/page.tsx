'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      if (data?.session) {
        router.push('/');
        router.refresh();
      } else {
        setMessage('Registration successful! Please check your email to verify your account.');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-6 sm:p-8 shadow-xl border border-gray-100">
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-purple-900">Create an Account</h2>
          <p className="mt-1 text-sm text-gray-500">Join Elvoret today</p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        {message && (
          <div className="p-3 text-sm text-green-600 bg-green-50 rounded-lg border border-green-100">
            {message}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoCapitalize="none"
              autoComplete="email"
              className="mt-1 w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:border-purple-600 focus:bg-white transition text-base"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              className="mt-1 w-full p-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:border-purple-600 focus:bg-white transition text-base"
              placeholder="••••••••"
            />
            <p className="mt-1 text-xs text-gray-400">Must be at least 6 characters long</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-900 rounded-xl font-semibold text-white hover:bg-purple-800 transition disabled:opacity-50 active:scale-[0.99] cursor-pointer"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-purple-700 hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}