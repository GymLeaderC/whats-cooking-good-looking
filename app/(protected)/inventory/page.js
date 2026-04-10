"use client";

/**
 * @fileoverview Displays items organized by storage location. Tabs allow filtering
 * by location. Items are grouped together by category within each location. 
 * @author Joshua Couto
 * @version 1.0.2
 */

import { useState } from "react";
import InventoryTabs from "@/components/inventory/InventoryTabs";
import InventoryList from "@/components/inventory/InventoryList";

// ^ STUB DATA - replace with Firestore query later
const MOCK_ITEMS = [
  { id: "1", name: "Chicken Breast", quantity: 2, unit: "lbs", category: "Meat", storageLocation: "freezer" },
  { id: "2", name: "Broccoli", quantity: 1, unit: "head", category: "Produce", storageLocation: "fridge" },
  { id: "3", name: "Milk", quantity: 1, unit: "gallon", category: "Dairy", storageLocation: "fridge" },
  { id: "4", name: "Butter", quantity: 1, unit: "stick", category: "Dairy", storageLocation: "fridge" },
  { id: "5", name: "Pasta", quantity: 1, unit: "box", category: "Pantry", storageLocation: "pantry" },
  { id: "6", name: "Frozen Peas", quantity: 1, unit: "bag", category: "Produce", storageLocation: "freezer" },
  { id: "7", name: "Ground Beef", quantity: 1.5, unit: "lbs", category: "Meat", storageLocation: "freezer" },
  { id: "8", name: "Cheddar Cheese", quantity: 0.5, unit: "lb", category: "Dairy", storageLocation: "fridge" },
];

const TABS = [ 
  { id: "all", label: "All" },
  { id: "fridge", label: "Fridge" },
  { id: "freezer", label: "Freezer" },
  { id: "pantry", label: "Pantry" },
];

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredItems = 
    activeTab === "all"
    ? MOCK_ITEMS
    : MOCK_ITEMS.filter((item) => item.storageLocation === activeTab);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Inventory</h1>

      {/* Tab Navigation */}
      <InventoryTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Items list grouped by category */}
      <InventoryList items={filteredItems} />
    </div>
  );
}