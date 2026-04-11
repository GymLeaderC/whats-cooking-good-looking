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

export default function MealAddModal({ isOpen, selectedDate, recipes, onConfirm, onCancel }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  if (!isOpen) return null;

  function handleConfirm() {
    onConfirm(selectedRecipe);
    setSelectedRecipe(null);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

      {/* Modal Box */}
      <div className="bg-white rounded-lg p-6 w-80 space-y-4">
        <h2 className="text-lg font-semibold"
        >
          Add Meal for {selectedDate.toLocaleDateString("en-CA", { month: "short", day: "numeric"})}
        </h2>

        {recipes.map((recipe) => (
          <div key={recipe.id} onClick={() => setSelectedRecipe(recipe)}>
            {recipe.name}
          </div>
        ))}

        {/* Confirm and Cancel Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Meal
          </button>
        </div>
      </div>
    </div>
  )
}