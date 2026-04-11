"use client";

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

export default function MealDayCard({ date, meal, onAddMeal }) {
  return (
    <div>
      {date}
      <div>
        {meal ? 
          <MealCard meal={meal} /> : 
          <MealAddButton onAddMeal={onAddMeal} />
        }
      </div>
    </div>
  )
}