"use client"

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
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 bg-white border-b border-gray-200">
        <span>What&apos;s Cooking</span>
        <button onClick={() => setDrawerOpen(true)}>☰</button>
      </header>

      {drawerOpen && (
        <>
          <div onClick={() => setDrawerOpen(false)} className="fixed inset-0 z-50 bg-black/40" />
          <div className="fixed top-0 right-0 z-50 h-full w-64 bg-white flex flex-col p-4">
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setDrawerOpen(false)}
                  className={pathname === link.href ? "font-bold" : "font-normal"}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <button onClick={handleSignOut} className="mt-auto">Sign Out</button>
          </div>
        </>
      )}
    </>
  );
}