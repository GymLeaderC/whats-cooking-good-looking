/**
 * @fileoverview Displays a single recipe as a card with title and category.
 * @author Joshua Couto
 * @version 1.0.0
 */

export default function RecipeCard({ recipe, onDelete }) {
  return (
    <div
     className="flex items-center justify-between px-4 py-3 rounded-lg border"
     style={{ backgroundColor: "#EEF1EA", borderColor: "#9FB3A6"}}
    >
      <div>
        <p className="text-sm font-semibold" style={{ color: "#2F4A3A" }}>
          {recipe.title}
        </p>
      </div>
      <button
        onClick={onDelete}
        className="text-xs px-2 py-1 rounded hover:oopacity-80 transition"
        style={{ backgroundColor: "#9FB3A6", color: "#2F4A3A"}}
      >
        Remove
      </button>
    </div>
  );
}