"use client"

/**
 * @fileoverview Renders a single Grocery item as a row.
 * Displays name and quantity/unit. Includes a check box for the user to
 * check items they have grabbed off of the list.
 * @author Joshua Couto
 * @version 1.0.0
 */

export default function GroceryItem({ item, onCheck, onRemove }) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3 rounded-lg border"
      style={{ backgroundColor: "#EEF1EA", borderColor: "#9FB3A6" }}
    >
      {/* Checkbox + item details */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={item.checked}
          onChange={() => onCheck(item)}
          className="w-4 h-4"
        />
        <div>
          <p
            className={`text-sm font-medium ${item.checked ? "line-through" : ""}`}
            style={{ color: item.checked ? "#9FB3A6" : "#2F4A3A" }}
          >
            {item.name}
          </p>
          <p className="text-sm" style={{ color: item.checked ? "#9FB3A6" : "#5F7C68" }}>
            {item.quantity} {item.unit}
          </p>
        </div>
      </div>

      {/* Remove button */}
      <button
        onClick={() => onRemove(item.id)}
        className="text-sm hover:opacity-70 transition"
        style={{ color: "#5F7C68" }}
      >
        Remove
      </button>
    </div>
  );
}