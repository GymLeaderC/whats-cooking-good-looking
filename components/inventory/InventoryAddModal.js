"use client";

/**
 * @fileoverview Modal form for adding a new inventory item.
 * Collects name, quantity, unit, category, and storage location.
 * Calls onConfirm with the new item object, or onCancel to close.
 * @author Joshua Couto
 * @version 1.0.0
 */

import { useState } from "react";

const CATEGORIES = ["Meat", "Produce", "Dairy", "Pantry", "Frozen", "Bakery", "Beverages", "Snacks", "Other"];
const LOCATIONS = ["fridge", "freezer", "pantry"];

export default function AddItemModal({ onConfirm, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    unit: "",
    category: "",
    storageLocation: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleConfirm() {
    if (!formData.name || !formData.storageLocation) return;
    onConfirm(formData);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 space-y-4">
        <h2 className="text-lg font-semibold" style={{ color: "#2F4A3A" }}>Add Item</h2>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Item name *"
          className="w-full border rounded p-2 text-sm"
        />

        <div className="flex gap-2">
          <input
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Qty"
            className="w-1/2 border rounded p-2 text-sm"
          />
          <input
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            placeholder="Unit (lbs, bag...)"
            className="w-1/2 border rounded p-2 text-sm"
          />
        </div>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded p-2 text-sm"
        >
          <option value="">Select category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          name="storageLocation"
          value={formData.storageLocation}
          onChange={handleChange}
          className="w-full border rounded p-2 text-sm"
        >
          <option value="">Select location</option>
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>{loc.charAt(0).toUpperCase() + loc.slice(1)}</option>
          ))}
        </select>

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onCancel} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-sm rounded font-medium"
            style={{ backgroundColor: "#D7B98E", color: "#2F4A3A" }}
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
}