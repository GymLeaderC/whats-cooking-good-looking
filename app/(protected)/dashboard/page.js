"use client";

/**
 * @fileoverview Dashboard / Home page. Welcomes the user by name and shows
 * summary cards linking to each main section of the app.
 * @author Joshua Couto
 * @version 1.1.0
 */

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useHousehold } from "@/context/HouseholdContext";

const SUMMARY_CARDS = [
  { href: "/inventory",    label: "Inventory",    subtitle: "Track what you have on hand" },
  { href: "/recipes",      label: "Recipes",      subtitle: "Browse and save your recipes" },
  { href: "/meal-planner", label: "Meal Planner", subtitle: "Plan meals for the week" },
  { href: "/grocery-list", label: "Grocery List", subtitle: "Build your shopping list" },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const { householdData } = useHousehold();

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#F5ECD9" }}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "#2F4A3A" }}>
          Welcome back, {user?.displayName?.split(" ")[0] ?? "there"}!
        </h1>
        {householdData?.name && (
          <p className="text-sm mb-6" style={{ color: "#5F7C68" }}>
            {householdData.name}
          </p>
        )}

        <div className="flex flex-col gap-3">
          {SUMMARY_CARDS.map((card) => (
            <Link key={card.href} href={card.href}>
              <div
                className="flex items-center justify-between px-4 py-3 rounded-lg border hover:opacity-90 transition"
                style={{ backgroundColor: "#EEF1EA", borderColor: "#9FB3A6" }}
              >
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#2F4A3A" }}>
                    {card.label}
                  </p>
                  <p className="text-sm" style={{ color: "#5F7C68" }}>
                    {card.subtitle}
                  </p>
                </div>
                <span style={{ color: "#9FB3A6" }}>›</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
