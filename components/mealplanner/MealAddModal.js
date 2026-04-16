"use client";

/**
 * @fileoverview A modal which appears after the user has clicked on the 
 * MealAddButton. This modal will allow the user to add a new meal to
 * the weekly meal plan by entering the meal name, and a link to the website
 * the meal can be found at. The date will be passed to this Modal so the app
 * knows which recipe is planned for each date.
 * @author Joshua Couto
 * @version 1.0.0
 */

import { useState } from "react";

export default function MealAddModal({ selectedDate, recipes, onConfirm, onCancel }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  function handleConfirm() {
    onConfirm(selectedRecipe);
    setSelectedRecipe(null);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="rounded-lg p-6 w-80 space-y-3" style={{ backgroundColor: "#EEF1EA" }}>
        
        <h2 className="text-lg font-semibold" style={{ color: "#2F4A3A" }}>
          Add Meal for {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-CA", { month: "short", day: "numeric" })}
        </h2>

        <div className="flex flex-col gap-2">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className="px-4 py-2 rounded cursor-pointer text-sm font-medium transition"
              style={{
                backgroundColor: selectedRecipe?.id === recipe.id ? "#2F4A3A" : "#9FB3A6",
                color: selectedRecipe?.id === recipe.id ? "#EEF1EA" : "#2F4A3A",
              }}
            >
              {recipe.name}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded hover:opacity-80 transition"
            style={{ backgroundColor: "#9FB3A6", color: "#2F4A3A" }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedRecipe}
            className="px-4 py-2 text-sm rounded hover:opacity-80 transition disabled:opacity-40"
            style={{ backgroundColor: "#2F4A3A", color: "#EEF1EA" }}
          >
            Add Meal
          </button>
        </div>

      </div>
    </div>
  );
}