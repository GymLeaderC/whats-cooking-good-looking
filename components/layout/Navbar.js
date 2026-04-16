"use client";

/**
 * @fileoverview A navigation bar component which persists across the entire application
 * @author Joshua Couto
 * @version 1.0.0
 */

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/inventory", label: "Inventory" },
  { href: "/recipes", label: "Recipes" },
  { href: "/meal-planner", label: "Meal Planner" },
  { href: "/grocery-list", label: "Grocery List" },
  { href: "/settings", label: "Settings" }
]

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOutUser } = useAuth();

  async function handleSignOut() {
    await signOutUser();
    router.push("/login");
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14"
        style={{ backgroundColor: "#2F4A3A" }}
      >
        <span className="font-bold" style={{ color: "#EEF1EA" }}>What&apos;s Cooking, Good Looking?</span>
        <button onClick={() => setDrawerOpen(true)} style={{ color: "#EEF1EA" }}>☰</button>
      </header>

      {drawerOpen && (
        <>
          <div onClick={() => setDrawerOpen(false)} className="fixed inset-0 z-50 bg-black bg-opacity-40" />
          <div
            className="fixed top-0 right-0 z-50 h-full w-64 flex flex-col p-4"
            style={{ backgroundColor: "#2F4A3A" }}
          >
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                  className={`px-2 py-1 rounded text-sm transition hover:opacity-90 ${
                    pathname === link.href ? "font-semibold" : "font-normal"
                  }`}
                  style={{
                    color: pathname === link.href ? "#D7B98E" : "#9FB3A6",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <button
              onClick={handleSignOut}
              className="mt-auto px-4 py-2 text-sm rounded hover:opacity-80 transition"
              style={{ backgroundColor: "#9FB3A6", color: "#2F4A3A" }}
            >
              Sign Out
            </button>
          </div>
        </>
      )}
    </>
  );
}