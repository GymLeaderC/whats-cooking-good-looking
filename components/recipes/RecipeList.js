"use client"

/**
 * @fileoverview Renders a list of RecipeCard components.
 * @author Joshua Couto
 * @version 1.0.0
 */

import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes, onDelete }) {
  if (recipes.length === 0) {
    return (
      <p className="text-sm" style={{ color: "#5F7C68"}}>
        No recipes yet. Add one to get started!
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onDelete={() => onDelete(recipe.id)}
        />
      ))}
    </div>
  );
}