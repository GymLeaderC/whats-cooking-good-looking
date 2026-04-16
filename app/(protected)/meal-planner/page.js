"use client"

/**
 * @fileoverview Meal Planner page. Displays a 7-day weekly view where users can
 * assign recipes to specific dates. Week navigation moves forward and backward
 * by 7 days. Meal data is stored as an object keyed by date string.
 * @author Joshua Couto
 * @version 1.0.1
 */

import { useState } from "react";
import MealWeekNavigator from "@/components/mealplanner/MealWeekNavigator";
import MealDayCard from "@/components/mealplanner/MealDayCard";
import MealAddModal from "@/components/mealplanner/MealAddModal";

// Returns the Monday of the week containing the given date
function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Returns array of 7 date strings starting form weekStart
function getWeekDates(weekStart) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });
}

export default function MealPlannerPage() {
  const [weekStart, setWeekStart] = useState(getMonday(new Date()));
  const [mealPlan, setMealPlan] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const weekDates = getWeekDates(weekStart);

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

  function handleAddMeal(recipeName) {
    setMealPlan(prev => ({
      ...prev,
      [selectedDate]: { recipeName }
    }));
    setIsModalOpen(false);
    setSelectedDate(null);
  }

  function handleRemoveMeal(date) {
    setMealPlan(prev => {
      const updated = { ...prev };
      delete updated[date];
      return updated;
    });
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Meal Planner</h1>

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

      {/* TODO: Replace mock recipes with Firestore data (below) once wired */}
      {isModalOpen && (
        <MealAddModal
          selectedDate={selectedDate}
          recipes={[{ id: "1", name: "Pasta" }, { id: "2", name: "Butter Chicken" }]}
          onConfirm={handleAddMeal}
          onCancel={() => setIsModalOpen(false)}
        />
      )}

      {/* 
        {isModalOpen && (
          <MealAddModal
          date={selectedDate}
          onConfirm={handleAddMeal}
          onCancel={() => setIsModalOpen(false)}
          />
        )}
      */}
    </div>
  );
}