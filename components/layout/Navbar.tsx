"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  Search,
  BookOpen,
  Brain,
  Network,
  Wrench,
  Newspaper,
  Menu,
  X,
  Trophy,
  Code2,
  LogIn,
  User,
  BookMarked,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { supabase } from "@/lib/supabase/supabase";

const navItems = [
  {
    name: "Articles",
    href: "/articles",
    icon: BookOpen,
  },
  {
    name: "AI",
    href: "/ai",
    icon: Brain,
  },
  {
    name: "System Design",
    href: "/system-design",
    icon: Network,
  },
  {
    name: "CP",
    href: "/cp",
    icon: Trophy,
  },
  {
    name: "Tools",
    href: "/tools",
    icon: Wrench,
  },
  {
    name: "News",
    href: "/news",
    icon: Newspaper,
  },
  {
    name: "Playground",
    href: "/playground",
    icon: Code2,
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [user, setUser] = useState<any>(null);

  const [accountOpen, setAccountOpen] = useState(false);

  const accountRef = useRef<HTMLDivElement>(null);

  // ==========================================================
  // Get currently logged-in user
  // ==========================================================

  useEffect(() => {
    let mounted = true;

    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (mounted) {
        setUser(user);
      }
    }

    getUser();

    // Listen for login/logout/session changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (mounted) {
          setUser(session?.user ?? null);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // ==========================================================
  // Close account dropdown when clicking outside
  // ==========================================================

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setAccountOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ==========================================================
  // Close mobile menu
  // ==========================================================

  const closeMenu = () => {
    setIsOpen(false);
  };

  // ==========================================================
  // Sign out
  // ==========================================================

  const handleSignOut = async () => {
    await supabase.auth.signOut();

    setAccountOpen(false);
    setIsOpen(false);

    window.location.href = "/";
  };

  // ==========================================================
  // User information
  // ==========================================================

  const userEmail = user?.email || "User";

  const userName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "User";

  const avatarLetter = userName.charAt(0).toUpperCase();

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ================================================== */}
        {/* Logo */}
        {/* ================================================== */}

        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt="Elvoret Logo"
            width={36}
            height={36}
            priority
          />

          <span className="text-lg font-bold tracking-wide text-purple-900 sm:text-xl">
            ELVORET
          </span>
        </Link>

        {/* ================================================== */}
        {/* Desktop Navigation */}
        {/* ================================================== */}

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className="
                  group
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  px-3
                  py-2.5
                  text-sm
                  font-medium
                  text-gray-700
                  transition-all
                  duration-200
                  hover:bg-purple-50
                  hover:text-purple-700
                  lg:px-4
                "
              >
                <Icon
                  size={17}
                  strokeWidth={1.8}
                  className="
                    shrink-0
                    transition-transform
                    duration-200
                    group-hover:-translate-y-0.5
                  "
                />

                <span className="whitespace-nowrap">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* ================================================== */}
        {/* Desktop Right Side */}
        {/* ================================================== */}

        <div className="hidden items-center gap-2 md:flex">

          {/* Search */}

          <Link
            href="/search"
            aria-label="Search Elvoret"
            className="
              rounded-xl
              p-2.5
              text-gray-700
              transition-colors
              duration-200
              hover:bg-purple-50
              hover:text-purple-700
            "
          >
            <Search
              size={21}
              strokeWidth={1.8}
            />
          </Link>

          {/* ================================================= */}
          {/* Logged In User */}
          {/* ================================================= */}

          {user ? (
            <div
              ref={accountRef}
              className="relative"
            >

              {/* Avatar Button */}

              <button
                type="button"
                onClick={() =>
                  setAccountOpen(
                    (previous) => !previous
                  )
                }
                aria-label="Open account menu"
                aria-expanded={accountOpen}
                className="
                  flex
                  items-center
                  gap-1.5
                  rounded-xl
                  p-1.5
                  transition-colors
                  duration-200
                  hover:bg-purple-50
                "
              >

                {/* Avatar */}

                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-purple-900
                    text-sm
                    font-bold
                    text-white
                  "
                >
                  {avatarLetter}
                </div>

                <ChevronDown
                  size={16}
                  className={`
                    text-gray-500
                    transition-transform
                    duration-200
                    ${
                      accountOpen
                        ? "rotate-180"
                        : ""
                    }
                  `}
                />

              </button>

              {/* ================================================= */}
              {/* Account Dropdown */}
              {/* ================================================= */}

              {accountOpen && (
                <div
                  className="
                    absolute
                    right-0
                    top-12
                    z-50
                    w-72
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    shadow-xl
                  "
                >

                  {/* User Header */}

                  <div className="border-b border-gray-100 px-4 py-4">

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-purple-900
                          text-base
                          font-bold
                          text-white
                        "
                      >
                        {avatarLetter}
                      </div>

                      <div className="min-w-0">

                        <p className="truncate text-sm font-semibold text-gray-900">
                          {userName}
                        </p>

                        <p className="truncate text-xs text-gray-500">
                          {userEmail}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* Menu */}

                  <div className="p-2">

                    {/* Profile */}

                    <Link
                      href="/profile"
                      onClick={() =>
                        setAccountOpen(false)
                      }
                      className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-2.5
                        text-sm
                        font-medium
                        text-gray-700
                        transition-colors
                        hover:bg-purple-50
                        hover:text-purple-700
                      "
                    >
                      <User
                        size={18}
                        strokeWidth={1.8}
                      />

                      <span>
                        Profile
                      </span>
                    </Link>

                    {/* My Progress */}

                    <Link
                      href="/system-design"
                      onClick={() =>
                        setAccountOpen(false)
                      }
                      className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-2.5
                        text-sm
                        font-medium
                        text-gray-700
                        transition-colors
                        hover:bg-purple-50
                        hover:text-purple-700
                      "
                    >
                      <BookMarked
                        size={18}
                        strokeWidth={1.8}
                      />

                      <span>
                        My Progress
                      </span>
                    </Link>

                    {/* Settings */}

                    <Link
                      href="/settings"
                      onClick={() =>
                        setAccountOpen(false)
                      }
                      className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-2.5
                        text-sm
                        font-medium
                        text-gray-700
                        transition-colors
                        hover:bg-purple-50
                        hover:text-purple-700
                      "
                    >
                      <Settings
                        size={18}
                        strokeWidth={1.8}
                      />

                      <span>
                        Settings
                      </span>
                    </Link>

                  </div>

                  {/* Sign Out */}

                  <div className="border-t border-gray-100 p-2">

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-2.5
                        text-sm
                        font-medium
                        text-red-600
                        transition-colors
                        hover:bg-red-50
                      "
                    >
                      <LogOut
                        size={18}
                        strokeWidth={1.8}
                      />

                      <span>
                        Sign Out
                      </span>
                    </button>

                  </div>

                </div>
              )}

            </div>
          ) : (

            /* ================================================= */
            /* Not Logged In */
            /* ================================================= */

            <Link
              href="/Login"
              className="
                rounded-xl
                bg-purple-900
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                transition-colors
                duration-200
                hover:bg-purple-800
              "
            >
              Sign In
            </Link>

          )}

        </div>

        {/* ================================================== */}
        {/* Mobile Menu Button */}
        {/* ================================================== */}

        <button
          type="button"
          aria-label={
            isOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={isOpen}
          onClick={() =>
            setIsOpen(
              (previous) => !previous
            )
          }
          className="
            flex
            rounded-xl
            p-2
            text-gray-700
            transition-colors
            duration-200
            hover:bg-purple-50
            hover:text-purple-700
            md:hidden
          "
        >
          {isOpen ? (
            <X
              size={27}
              strokeWidth={2}
            />
          ) : (
            <Menu
              size={27}
              strokeWidth={2}
            />
          )}
        </button>

      </div>

      {/* ==================================================== */}
      {/* Mobile Navigation */}
      {/* ==================================================== */}

      <div
        className={`
          overflow-hidden
          border-t
          border-gray-100
          bg-white
          transition-all
          duration-300
          ease-in-out
          md:hidden
          ${
            isOpen
              ? "max-h-[1000px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >

        <div className="px-4 py-3 sm:px-6">

          {/* ================================================= */}
          {/* Mobile Account */}
          {/* ================================================= */}

          {user && (
            <div className="mb-3 rounded-2xl border border-purple-100 bg-purple-50 p-4">

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-purple-900
                    text-base
                    font-bold
                    text-white
                  "
                >
                  {avatarLetter}
                </div>

                <div className="min-w-0">

                  <p className="truncate text-sm font-semibold text-gray-900">
                    {userName}
                  </p>

                  <p className="truncate text-xs text-gray-500">
                    {userEmail}
                  </p>

                </div>

              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">

                <Link
                  href="/profile"
                  onClick={closeMenu}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-white
                    px-3
                    py-2.5
                    text-xs
                    font-semibold
                    text-gray-700
                    transition-colors
                    hover:bg-purple-100
                  "
                >
                  <User size={16} />
                  Profile
                </Link>

                <Link
                  href="/system-design"
                  onClick={closeMenu}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-white
                    px-3
                    py-2.5
                    text-xs
                    font-semibold
                    text-gray-700
                    transition-colors
                    hover:bg-purple-100
                  "
                >
                  <BookMarked size={16} />
                  Progress
                </Link>

              </div>

              <button
                type="button"
                onClick={handleSignOut}
                className="
                  mt-2
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  px-3
                  py-2.5
                  text-xs
                  font-semibold
                  text-red-600
                  transition-colors
                  hover:bg-red-100
                "
              >
                <LogOut size={16} />
                Sign Out
              </button>

            </div>
          )}

          {/* ================================================= */}
          {/* Navigation Links */}
          {/* ================================================= */}

          <div className="flex flex-col gap-1">

            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMenu}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3.5
                    text-base
                    font-medium
                    text-gray-700
                    transition-colors
                    duration-200
                    hover:bg-purple-50
                    hover:text-purple-700
                  "
                >
                  <Icon
                    size={20}
                    strokeWidth={1.8}
                    className="shrink-0"
                  />

                  <span>
                    {item.name}
                  </span>
                </Link>
              );
            })}

            {/* ================================================= */}
            {/* Mobile Search */}
            {/* ================================================= */}

            <Link
              href="/search"
              onClick={closeMenu}
              className="
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3.5
                text-base
                font-medium
                text-gray-700
                transition-colors
                duration-200
                hover:bg-purple-50
                hover:text-purple-700
              "
            >
              <Search
                size={20}
                strokeWidth={1.8}
              />

              <span>
                Search
              </span>
            </Link>

            {/* ================================================= */}
            {/* Mobile Sign In */}
            {/* ================================================= */}

            {!user && (
              <Link
                href="/Login"
                onClick={closeMenu}
                className="
                  mt-2
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-purple-900
                  px-4
                  py-3.5
                  text-base
                  font-semibold
                  text-white
                  transition-colors
                  duration-200
                  hover:bg-purple-800
                "
              >
                <LogIn
                  size={20}
                  strokeWidth={1.8}
                />

                <span>
                  Sign In
                </span>
              </Link>
            )}

          </div>

        </div>

      </div>

    </nav>
  );
}