"use client"

/**
 * @fileoverview Renders inventory items grouped by category.
 * Each category is a collapsible section. Items within each category are 
 * rendered via InventoryItem.
 * @author Joshua Couto
 * @version 1.0.0
 */

import { useState } from "react";
import CategorySection from "@/app/components/inventory/CategorySection";

export default function InventoryList({ items }) {
  const groupedByCategory = items.reduce((groups, item) => {
    const category = item.category || "Other";
    
    if (!groups[category]) group[category] = [];
    groups[category].push(item);
    return groups;
  }, {});

  return (
    <div className="space-y-4">
      {Object.entries(groupedByCategory).map(([category, categoryItems]) => (
        <CategorySection key={category} category={category} items={categoryItems} />
      ))}
    </div>
  );
}