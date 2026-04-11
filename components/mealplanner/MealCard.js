"use client";

/**
 * @fileoverview A card which renders a planned meal if a meal object is truthy.
 * @author Joshua Couto
 * @version 1.0.0
 */

export default function MealCard({ meal, onRemove }) {
  return (
    <div>
      {meal.name}
      {meal.link}
      <button onClick={onRemove}>Remove</button>
    </div>
  )
}