"use client";

/**
 * @fileoverview A component which displays the current week, and allows the
 * user to navigate to the next week or a previous week. 
 * @author Joshua Couto
 * @version 1.0.0
 */

export default function MealWeekNavigator({ weekStart, onPrev, onNext }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-lg" style={{ backgroundColor: "#5F7C68" }}>
      <button
        onClick={onPrev}
        className="text-white font-medium px-3 py-1 rounded hover:opacity-80 transition"
        style={{ backgroundColor: "#2F4A3A" }}
      >
        ← Prev
      </button>
      <span className="text-white font-semibold text-sm">
        Week of {weekStart.toLocaleDateString("en-CA", { month: "short", day: "numeric" })}
      </span>
      <button
        onClick={onNext}
        className="text-white font-medium px-3 py-1 rounded hover:opacity-80 transition"
        style={{ backgroundColor: "#2F4A3A" }}
      >
        Next →
      </button>
    </div>
  )
}