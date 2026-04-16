/**
 * @fileoverview Recipes page — lists saved recipes as cards.
 * @author Joshua Couto
 * @version 1.1.0
 */

export default function RecipesPage() {
  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#F5ECD9" }}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "#2F4A3A" }}>Recipes</h1>

        <div className="flex flex-col gap-3">
          {/* Recipe cards will be rendered here */}
        </div>

        <button
          className="fixed bottom-6 right-6 px-5 py-3 rounded-full text-sm font-medium hover:opacity-80 transition shadow"
          style={{ backgroundColor: "#D7B98E", color: "#2F4A3A" }}
        >
          + Add Recipe
        </button>
      </div>
    </div>
  );
}
