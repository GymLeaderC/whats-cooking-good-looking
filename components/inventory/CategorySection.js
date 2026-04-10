"use client";

/**
 * @fileoverview Renders a single category section (e.g., "Produce", "Meat").
 * Section header is clickable to collapse/expand the list of items.
 * Uses InventoryItem component to render individual items.
 * @author Joshua Couto
 * @version 1.0.0
 */

import { useState } from "react";
import InventoryItem from "@/components/inventory/InventoryItem";

export default function CategorySection({ category, items }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="border rounded-lg p-4">

      {/* Category header - clickable to toggle collapse */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full font-semibold text-lg"
      >
        <span>{category}</span>
        <span className="text-gray-500">{isExpanded ? "▼" : "▶"}</span>
      </button>

      {/* Items - rendered only if expanded */}
      {isExpanded && (
        <div className="mt-4 space-y-2">
          {items.map((item) => (
            <InventoryItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}