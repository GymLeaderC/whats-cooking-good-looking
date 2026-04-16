/**
 * @fileoverview A card which renders a planned meal for any given day. It 
 * accepts three props; date, meal, and onAddMeal. This card will is the parent
 * to two other components, MealCard and MealAddButton. If a meal object is 
 * truthy, show MealCard. If falsy, render MealAddButton. 
 * @author Joshua Couto
 * @version 1.0.0
 */

import MealCard from "@/components/mealplanner/MealCard";
import MealAddButton from "@/components/mealplanner/MealAddButton"

export default function MealDayCard({ date, meal, onAddMeal, onRemove }) {
  const displayDate = new Date(date + "T00:00:00").toLocaleDateString("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-lg border" style={{ backgroundColor: "#9FB3A6", borderColor: "#9FB3A6" }}>
      <span className="text-sm font-semibold w-24" style={{ color: "#2F4A3A" }}>
        {displayDate}
      </span>
      <div className="flex-1 ml-4">
        {meal ?
          <MealCard meal={meal} onRemove={onRemove} /> :
          <MealAddButton onClick={onAddMeal} />
        }
      </div>
    </div>
  )
}