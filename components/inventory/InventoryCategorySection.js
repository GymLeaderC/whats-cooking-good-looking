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

export default function InventoryCategorySection({ category, items }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-4">
      {/* Category header - clickable to toggle collapse */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-sm font-semibold uppercase tracking-wide mb-2"
        style={{ color: "#5F7C68" }}
      >
        <span>{category}</span>
        <span>{isExpanded ? "▼" : "▶"}</span>
      </button>

      {/* Items - rendered only if expanded */}
      {isExpanded && (
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <InventoryItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}