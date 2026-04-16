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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

      {/* Modal box */}
      <div className="rounded-lg p-6 w-80 space-y-4" style={{ backgroundColor: "#EEF1EA" }}>
        <h2 className="text-lg font-semibold" style={{ color: "#2F4A3A" }}>Select Storage Location</h2>
        {/* Location buttons - 2x2 grid */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onLocationSelect("fridge")}
            className="px-4 py-2 text-sm rounded hover:opacity-80 transition"
            style={{ backgroundColor: "#2F4A3A", color: "#EEF1EA" }}
          >
            Fridge
          </button>
          <button
            onClick={() => onLocationSelect("freezer")}
            className="px-4 py-2 text-sm rounded hover:opacity-80 transition"
            style={{ backgroundColor: "#2F4A3A", color: "#EEF1EA" }}
          >
            Freezer
          </button>
          <button
            onClick={() => onLocationSelect("pantry")}
            className="px-4 py-2 text-sm rounded hover:opacity-80 transition"
            style={{ backgroundColor: "#2F4A3A", color: "#EEF1EA" }}
          >
            Pantry
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded hover:opacity-80 transition"
            style={{ backgroundColor: "#9FB3A6", color: "#2F4A3A" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}