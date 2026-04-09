/**
 * @fileoverview Renders a single inventory item as a row.
 * Displays name, quantity/unit, and category badge.
 * @author Joshua Couto
 * @version 1.0.0
 */

export default function InventoryItem({ item }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
      <div>
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-gray-600">
          {item.quantity} {item.unit}
        </p>
      </div>
      <span className="text-xs bg-gray-200 px-2 py-1 rounded">{items.category}</span>
    </div>
  );
}