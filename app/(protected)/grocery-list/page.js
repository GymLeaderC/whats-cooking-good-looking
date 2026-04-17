"use client";

/**
 * @fileoverview Grocery List page — displays grocery items grouped by category.
 * Checking an item prompts for a storage location and writes it to inventory.
 * @author Joshua Couto
 * @version 1.0.1
 */

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useHousehold } from "@/context/HouseholdContext";
import { subscribeToGroceryList, addGroceryItem, checkGroceryItem, deleteGroceryItem } from "@/services/goceryService";
import { addInventoryItem } from "@/services/inventoryService";
import GroceryList from "@/components/grocerylist/GroceryList";
import GroceryAddButton from "@/components/grocerylist/GroceryAddButton";
import GroceryAddModal from "@/components/grocerylist/GroceryAddModal";
import GroceryLocationModal from "@/components/grocerylist/GroceryLocationModal";

export default function GroceryListPage() {
  const { user } = useAuth();
  const { householdId } = useHousehold();
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);

  useEffect(() => {
    if (!householdId) return;
    const unsubscribe = subscribeToGroceryList(householdId, (updatedItems) => {
      setItems(updatedItems);
    });
    return () => unsubscribe();
  }, [householdId]);

  // Called when user checks off an item.
  // Stores item as pending and opens location modal
  function handleCheck(item) {
    setPendingItem(item);
  }

  // Called when user picks a storage location for a checked item
  async function handleConfirmLocation(storageLocation) {
    try {
      // Write to inventory with the selected storage location
      await addInventoryItem(householdId, {
        name: pendingItem.name,
        quantity: pendingItem.quantity,
        unit: pendingItem.unit || "",
        category: pendingItem.category,
        storageLocation,
      });
      // Mark as checked on the grocery list
      await checkGroceryItem(householdId, pendingItem.id);
      setPendingItem(null);
    } catch (error) {
      console.error("Failed to confirm item location:", error);
    }
  }

  // Called when user clicks Remove. Filters item out of the list
  async function handleRemove(itemId) {
    try {
      await deleteGroceryItem(householdId, itemId);
    } catch (error) {
      console.error("Failed to remove grocery item:", error);
    }
  }

  // Called when user confirms a new item in the add modal
  async function handleAddItem(formData) {
    try {
      await addGroceryItem(householdId, {
        name: formData.name,
        quantity: formData.quantity,
        unit: formData.unit || "",
        category: formData.category,
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add grocery item:", error);
    }
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#F5ECD9" }}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "#2F4A3A" }}>Grocery List</h1>

        <GroceryList
          items={items}
          onCheck={handleCheck}
          onRemove={handleRemove}
        />

        <GroceryAddButton onOpenModal={() => setIsModalOpen(true)} />

        <GroceryAddModal
          isOpen={isModalOpen}
          onConfirm={handleAddItem}
          onCancel={() => setIsModalOpen(false)}
        />

        <GroceryLocationModal
          isOpen={pendingItem !== null}
          onLocationSelect={handleConfirmLocation}
          onCancel={() => setPendingItem(null)}
        />
      </div>
    </div>
  );
}