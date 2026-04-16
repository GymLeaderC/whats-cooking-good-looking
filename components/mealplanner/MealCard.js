"use client";

/**
 * @fileoverview A card which renders a planned meal if a meal object is truthy.
 * @author Joshua Couto
 * @version 1.0.0
 */

export default function MealCard({ meal, onRemove }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium" style={{ color: "#2F4A3A" }}>
        {meal.recipeName}
      </span>
      <button
        onClick={onRemove}
        className="text-xs px-2 py-1 rounded hover:opacity-80 transition"
        style={{ backgroundColor: "#9FB3A6", color: "#2F4A3A" }}
      >
        Remove
      </button>
    </div>
  )
}