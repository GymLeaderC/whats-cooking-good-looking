"use client";

/**
 * @fileoverview A modal which appears after the user has checked a grocery item
 * off of the list. This modal will prompt the user to select a storage location
 * for the grocery item added. Items will automatically appear in the inventory
 * onLocationSelect.
 * @author Joshua Couto
 * @version 1.0.0
 */

export default function GroceryLocationModal({ isOpen, onLocationSelect, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

      {/* Modal box */}
      <div className="bg-white rounded-lg p-6 w-80 space-y-4">
        <h2 className="text-lg font-semibold">Select Storage Location</h2>
        {/* Location buttons - 2x2 grid */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onLocationSelect("fridge")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Fridge
          </button>
          <button
            onClick={() => onLocationSelect("freezer")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Freezer
          </button>
          <button
            onClick={() => onLocationSelect("pantry")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Pantry
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}