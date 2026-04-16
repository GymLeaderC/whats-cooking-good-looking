/**
 * @fileoverview Renders a single inventory item as a row.
 * Displays name, quantity/unit, and category badge.
 * @author Joshua Couto
 * @version 1.0.0
 */

export default function InventoryItem({ item }) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3 rounded-lg border"
      style={{ backgroundColor: "#EEF1EA", borderColor: "#9FB3A6" }}
    >
      <div>
        <p className="text-sm font-medium" style={{ color: "#2F4A3A" }}>{item.name}</p>
        <p className="text-sm" style={{ color: "#5F7C68" }}>
          {item.quantity} {item.unit}
        </p>
      </div>
      <span
        className="text-xs px-2 py-1 rounded"
        style={{ backgroundColor: "#9FB3A6", color: "#2F4A3A" }}
      >
        {item.category}
      </span>
    </div>
  );
}