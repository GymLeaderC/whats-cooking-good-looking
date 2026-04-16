/**
 * @fileoverview Recipes page — lists saved recipes as cards.
 * @author Joshua Couto
 * @version 1.1.0
 */

import { useState } from "react";
import RecipeList from "@/components/recipes/RecipeList";
import AddRecipeModal from "@/components/recipes/AddRecipeModal";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleAddRecipe(newRecipe) {
    setRecipes(prev => [...prev, { ...newRecipe, id: Date.now().toString() }]);
    setIsModalOpen(false);
  }

  function handleDeleteRecipe(id) {
    setRecipes(prev => prev.filter(recipe => recipe.id !== id));
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#F5ECD9" }}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "#2F4A3A" }}>
          Recipes
        </h1>

        <RecipeList recipes={recipes} onDelete={handleDeleteRecipe} />

        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 px-5 py-3 rounded-full text-sm font-medium hover:opacity-80 transition shadow"
          style={{ backgroundColor: "#D7B98E", color: "#2F4A3A" }}
        >
          + Add Recipe
        </button>

        {isModalOpen && (
          <AddRecipeModal
            onConfirm={handleAddRecipe}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}