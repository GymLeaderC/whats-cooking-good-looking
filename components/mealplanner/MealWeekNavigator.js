"use client";

/**
 * @fileoverview A component which displays the current week, and allows the
 * user to navigate to the next week or a previous week. 
 * @author Joshua Couto
 * @version 1.0.0
 */

export default function MealWeekNavigator({ weekStart, onPrevWeek, onNextWeek }) {
  return (
    <div>
      <button onClick={onPrevWeek}>Prev</button>
      {weekStart.toLocaleDateString("en-CA", { month: "short", day: "numeric"})}
      <button onClick={onNextWeek}>Next</button>
    </div>
  )
}