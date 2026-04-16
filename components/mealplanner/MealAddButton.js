"use client";

/**
 * @fileoverview A component which renders within a MealDayCard component, but
 * only if a meal has not been selected for that date. 
 * @author Joshua Couto
 * @version 1.0.0
 */

export default function MealAddButton({ onClick }) {
  return (
    <div>
      <button
        onClick={onClick}>
          Add Meal
      </button>
    </div>
  )
}