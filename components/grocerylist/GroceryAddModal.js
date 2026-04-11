"use client";

/**
 * @fileoverview A modal which appears after the user has clicked on the 
 * GroceryAddButton. This modal will allow the user to add a new item to
 * the grocery list by entering the item name, quantity, and category
 * @author Joshua Couto
 * @version 1.0.0
 */

import { useState } from "react";

export default function GroceryAddModal({ isOpen, onConfirm, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    category: "",
  });

  if (!isOpen) return null;
  
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value}));
  }

  function handleConfirm() {
    onConfirm(formData);
    setFormData({ name: "", quantity: "", category: "" });
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

      {/* Modal Box */}
      <div className="bg-white rounded-lg p-6 w-80 space-y-4">
        <h2 className="text-lg font-semibold">Add Grocery Item</h2>

        {/* Item Name Input */}
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Item Name"
          className="w-full border rounded p-2"
        />

        {/* Quantity Input */}
        <input
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="w-full border rounded p-2"
        />

        {/* Category Input */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="">Select a category</option>
          <option value="Produce">Produce</option>
          <option value="Meat">Meat</option>
          <option value="Dairy">Dairy</option>
          <option value="Bakery">Bakery</option>
          <option value="Dry Goods">Dry Goods</option>
          <option value="Canned Goods">Canned Goods</option>
          <option value="Frozen">Frozen</option>
          <option value="Snacks">Snacks</option>
          <option value="Beverages">Beverages</option>
          <option value="Household">Household</option>
          <option value="Other">Other</option>

        </select>

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
            Add item
          </button>
        </div>
      </div>
    </div>
  );
}