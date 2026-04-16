"use client";

/**
 * @fileoverview Settings page — shows household name, members, and dietary preferences.
 * @author Joshua Couto
 * @version 1.1.0
 */

import { useAuth } from "@/context/AuthContext";
import { useHousehold } from "@/context/HouseholdContext";

export default function SettingsPage() {
  const { user } = useAuth();
  const { householdData } = useHousehold();

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#F5ECD9" }}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "#2F4A3A" }}>Settings</h1>

        {/* Household */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3" style={{ color: "#2F4A3A" }}>Household</h2>
          <div
            className="px-4 py-3 rounded-lg border"
            style={{ backgroundColor: "#EEF1EA", borderColor: "#9FB3A6" }}
          >
            <p className="text-sm font-medium" style={{ color: "#2F4A3A" }}>
              {householdData?.name ?? "—"}
            </p>
          </div>
        </div>

        {/* Members */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3" style={{ color: "#2F4A3A" }}>Members</h2>
          <div
            className="px-4 py-3 rounded-lg border"
            style={{ backgroundColor: "#EEF1EA", borderColor: "#9FB3A6" }}
          >
            <p className="text-sm" style={{ color: "#2F4A3A" }}>{user?.displayName}</p>
            <p className="text-sm" style={{ color: "#5F7C68" }}>{user?.email}</p>
          </div>
        </div>

        {/* Dietary Preferences */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3" style={{ color: "#2F4A3A" }}>Dietary Preferences</h2>
          {householdData?.dietaryPreferences?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {householdData.dietaryPreferences.map((pref) => (
                <span
                  key={pref}
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ backgroundColor: "#9FB3A6", color: "#2F4A3A" }}
                >
                  {pref}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm" style={{ color: "#5F7C68" }}>No preferences set.</p>
          )}
        </div>
      </div>
    </div>
  );
}
