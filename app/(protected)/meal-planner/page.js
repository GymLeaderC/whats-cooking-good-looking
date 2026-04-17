"use client"

/**
 * @fileoverview Meal Planner page. Displays a 7-day weekly view where users can
 * assign recipes to specific dates. Week navigation moves forward and backward
 * by 7 days. Meal data is stored as an object keyed by date string.
 * @author Joshua Couto
 * @version 2.0.0
 */

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { subscribeToMealPlan, setMeal, removeMeal } from "@/services/mealPlannerService";
import { subscribeToRecipes } from "@/services/recipeService";
import MealWeekNavigator from "@/components/mealplanner/MealWeekNavigator";
import MealDayCard from "@/components/mealplanner/MealDayCard";
import MealAddModal from "@/components/mealplanner/MealAddModal";

function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getWeekDates(weekStart) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });
}

export default function MealPlannerPage() {
  const { householdId } = useAuth();
  const [weekStart, setWeekStart] = useState(getMonday(new Date()));
  const [mealPlan, setMealPlan] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const weekDates = getWeekDates(weekStart);

  // Subscribe to meal plan
  useEffect(() => {
    if (!householdId) return;
    const unsubscribe = subscribeToMealPlan(householdId, (updatedPlan) => {
      setMealPlan(updatedPlan);
    });
    return () => unsubscribe();
  }, [householdId]);

  // Subscribe to recipes so the modal has real options
  useEffect(() => {
    if (!householdId) return;
    const unsubscribe = subscribeToRecipes(householdId, (updatedRecipes) => {
      setRecipes(updatedRecipes);
    });
    return () => unsubscribe();
  }, [householdId]);

  function handlePrevWeek() {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7);
    setWeekStart(d);
  }

  function handleNextWeek() {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    setWeekStart(d);
  }

  function handleOpenModal(date) {
    setSelectedDate(date);
    setIsModalOpen(true);
  }

  async function handleAddMeal(recipe) {
    try {
      await setMeal(householdId, selectedDate, { recipeName: recipe.title, recipeId: recipe.id });
      setIsModalOpen(false);
      setSelectedDate(null);
    } catch (error) {
      console.error("Failed to set meal:", error);
    }
  }

  async function handleRemoveMeal(date) {
    try {
      await removeMeal(householdId, date);
    } catch (error) {
      console.error("Failed to remove meal:", error);
    }
  }

 return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#F5ECD9" }}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "#2F4A3A" }}>
          Meal Planner
        </h1>

        <MealWeekNavigator
          weekStart={weekStart}
          onPrev={handlePrevWeek}
          onNext={handleNextWeek}
        />

        <div className="flex flex-col gap-3 mt-4">
          {weekDates.map(date => (
            <MealDayCard
              key={date}
              date={date}
              meal={mealPlan[date] || null}
              onAddMeal={() => handleOpenModal(date)}
              onRemove={() => handleRemoveMeal(date)}
            />
          ))}
        </div>

        {isModalOpen && (
          <MealAddModal
            selectedDate={selectedDate}
            recipes={recipes}
            onConfirm={handleAddMeal}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}