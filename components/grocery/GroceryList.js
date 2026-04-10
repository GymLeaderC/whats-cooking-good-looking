"use client";

/**
 * @fileoverview Renders Grocery items grouped by category.
 * Each category is a collapsible section. Items within each category are 
 * rendered via GroceryItem.
 * @author Joshua Couto
 * @version 1.0.0
 */

import GroceryCategorySection from "@/components/grocery/GroceryCategorySection";

export default function GroceryList({ items, onCheck, onRemove }) {
  const groupedByCategory = items.reduce((groups, item) => {
    const category = item.category || "Other";

    if (!groups[category]) groups[category] = [];
    groups[category].push(item);
    return groups;
  }, {});

  return (
    <div className="space-y-4">
      {Object.entries(groupedByCategory).map(([category, categoryItems]) => (
        <GroceryCategorySection 
          key={category} 
          category={category} 
          items={categoryItems}
          onCheck={onCheck} 
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}