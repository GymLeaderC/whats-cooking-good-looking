/**
 * @fileoverview Modal form for adding a new recipe. Accepts title, category,
 * and ingredients as inputs. Calls onConfirm with the new recipe object.
 * @author Joshua Couto
 * @version 1.0.0
 */

import { useState } from "react";

export default function AddRecipeModal({ onConfirm, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    ingredients: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleConfirm() {
    if (!formData.title) return;
    onConfirm({
      title: formData.title,
      category: formData.category,
      ingredients: formData.ingredients.split("\n").filter(i => i.trim() !== ""),
    });
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="rounded-lg p-6 w-80 space-y-4" style={{ backgroundColor: "#EEF1EA" }}>
        <h2 className="text-lg font-semibold" style={{ color: "#2F4A3A" }}>
          Add Recipe
        </h2>

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Recipe title"
          className="w-full border rounded p-2 text-sm focus:outline-none"
          style={{ borderColor: "#9FB3A6", backgroundColor: "#F5ECD9", color: "#2F4A3A" }}
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded p-2 text-sm focus:outline-none"
          style={{ borderColor: "#9FB3A6", backgroundColor: "#F5ECD9", color: "#2F4A3A" }}
        >
          <option value="">Select a category</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
          <option value="Dessert">Dessert</option>
          <option value="Other">Other</option>
        </select>

        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder={"One ingredient per line\ne.g. 2 cups flour"}
          rows={4}
          className="w-full border rounded p-2 text-sm focus:outline-none"
          style={{ borderColor: "#9FB3A6", backgroundColor: "#F5ECD9", color: "#2F4A3A" }}
        />

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
            disabled={!formData.title}
            className="px-4 py-2 text-sm rounded hover:opacity-80 transition disabled:opacity-40"
            style={{ backgroundColor: "#2F4A3A", color: "#EEF1EA" }}
          >
            Add Recipe
          </button>
        </div>
      </div>
    </div>
  );
}