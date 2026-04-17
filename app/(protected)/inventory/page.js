"use client";

/**
 * @fileoverview Displays items organized by storage location. Tabs allow filtering
 * by location. Items are grouped together by category within each location. 
 * @author Joshua Couto
 * @version 1.0.2
 */

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useHousehold } from "@/context/HouseholdContext";
import { subscribeToInventory, addInventoryItem, deleteInventoryItem } from "@/services/inventoryService";
import InventoryTabs from "@/components/inventory/InventoryTabs";
import InventoryList from "@/components/inventory/InventoryList";
import InventoryAddModal from "@/components/inventory/InventoryAddModal";

const TABS = [ 
  { id: "all", label: "All" },
  { id: "fridge", label: "Fridge" },
  { id: "freezer", label: "Freezer" },
  { id: "pantry", label: "Pantry" },
];

export default function InventoryPage() {
  const { user } = useAuth();
  const { householdId } = useHousehold();
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Subscribe to real-time inventory updates
  useEffect(() => {
    if (!householdId) return;
    const unsubscribe = subscribeToInventory(householdId, (updatedItems) => {
      setItems(updatedItems);
    });
    return () => unsubscribe();
  }, [householdId]);

  async function handleAddItem(newItem) {
    try {
      await addInventoryItem(householdId, newItem);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  }

  async function handleDeleteItem(itemId) {
    try {
      await deleteInventoryItem(householdId, itemId);
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  }

  const filteredItems = 
    activeTab === "all"
    ? items
    : items.filter((item) => item.storageLocation === activeTab);

   return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#F5ECD9" }}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "#2F4A3A" }}>Inventory</h1>

        <InventoryTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

        <InventoryList items={filteredItems} onDelete={handleDeleteItem} />

        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 px-5 py-3 rounded-full text-sm font-medium shadow"
          style={{ backgroundColor: "#D7B98E", color: "#2F4A3A" }}
        >
          + Add Item
        </button>

        {isModalOpen && (
          <InventoryAddModal
            onConfirm={handleAddItem}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}