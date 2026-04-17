"use client"

/**
 * @fileoverview Recipes page — lists saved recipes as cardswith real-time
 * Firestore sync. Supports adding and deleting recipes.
 * @author Joshua Couto
 * @version 2.0.0
 */

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useHousehold } from "@/context/HouseholdContext";
import { subscribeToRecipes, addRecipe, deleteRecipe } from "@/services/recipeService";
import RecipeList from "@/components/recipes/RecipeList";
import AddRecipeModal from "@/components/recipes/AddRecipeModal";

export default function RecipesPage() {
  const { user } = useAuth();
  const { householdId } = useHousehold();
  const [recipes, setRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!householdId) return;
    const unsubscribe = subscribeToRecipes(householdId, (updatedRecipes) => {
      setRecipes(updatedRecipes);
    });
    return () => unsubscribe();
  }, [householdId]);

  async function handleAddRecipe(newRecipe) {
    try {
      await addRecipe(householdId, newRecipe);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add recipe:", error);
    }
  }

  async function handleDeleteRecipe(id) {
    try {
      await deleteRecipe(householdId, id);
    } catch (error) {
      console.error("Failed to delete recipe:", error);
    }
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