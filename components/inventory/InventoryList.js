"use client";

/**
 * @fileoverview Renders inventory items grouped by category.
 * Each category is a collapsible section. Items within each category are 
 * rendered via InventoryItem.
 * @author Joshua Couto
 * @version 1.0.1
 */

import InventoryCategorySection from "@/components/inventory/InventoryCategorySection";

export default function InventoryList({ items, onDelete }) {
  const groupedByCategory = items.reduce((groups, item) => {
    const category = item.category || "Other";
    
    if (!groups[category]) groups[category] = [];
    groups[category].push(item);
    return groups;
  }, {});

  return (
    <div className="space-y-4">
      {Object.entries(groupedByCategory).map(([category, categoryItems]) => (
        <InventoryCategorySection key={category} category={category} items={categoryItems} onDelete={onDelete} />
      ))}
    </div>
  );
}