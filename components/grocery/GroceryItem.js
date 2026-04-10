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
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
      
      {/* Checkbox + item details */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={item.checked}
          onChange={() => onCheck(item)}
          className="w-4 h-4"
        />
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-sm text-gray-600">
            {item.quantity} {item.unit}
          </p>
        </div>  
      </div>
      
      {/* Remove button */}
      <button
        onClick={() => onRemove(item.id)}
        className="text-sm text-red-500 hover:text-red-700"
      >
        Remove
      </button>

    </div>
  );
}