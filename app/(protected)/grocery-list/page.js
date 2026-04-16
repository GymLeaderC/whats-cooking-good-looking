"use client";

/**
 * @fileoverview Grocery List page — displays grocery items grouped by aisle.
 * Users can check off items (triggering an inventory add flow), manually add
 * items, and remove items from the list.
 * @author Joshua Couto
 * @version 1.0.1
 */

import { useState } from "react";
import GroceryList from "@/components/grocerylist/GroceryList";
import GroceryAddButton from "@/components/grocerylist/GroceryAddButton";
import GroceryAddModal from "@/components/grocerylist/GroceryAddModal";
import GroceryLocationModal from "@/components/grocerylist/GroceryLocationModal";

// ^ STUB DATA - replace with Firestore query later
const MOCK_ITEMS = [
  { id: "1", name: "Chicken Breast", quantity: 2, unit: "lbs", category: "Meat", checked: false },
  { id: "2", name: "Broccoli", quantity: 1, unit: "head", category: "Produce", checked: false },
  { id: "3", name: "Milk", quantity: 1, unit: "gallon", category: "Dairy", checked: false },
  { id: "4", name: "Butter", quantity: 1, unit: "stick", category: "Dairy", checked: false },
  { id: "5", name: "Pasta", quantity: 1, unit: "box", category: "Pantry", checked: false },
  { id: "6", name: "Frozen Peas", quantity: 1, unit: "bag", category: "Produce", checked: false },
  { id: "7", name: "Ground Beef", quantity: 1.5, unit: "lbs", category: "Meat", checked: false },
  { id: "8", name: "Cheddar Cheese", quantity: 0.5, unit: "lb", category: "Dairy", checked: false }
]

export default function GroceryListPage() {
  const [items, setItems] = useState(MOCK_ITEMS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);

  // Called when user checks off an item.
  // Stores item as pending and opens location modal
  function handleCheck(item) {
    setPendingItem(item);
  }

  // Called when user picks a storage location for a checked item
  function handleConfirmLocation(storageLocation) {
    // TODO: Write pendingItem to Firestore inventory with storageLocation
    // Marks item as pending while user is selecting a storage location
    setItems((prev) =>
      prev.map((item) =>
        item.id === pendingItem.id ? { ...item, checked: true } : item
      )
    );
    // Clear the pending item (also closes the modal)
    setPendingItem(null);
  }

  // Called when user clicks Remove. Filters item out of the list
  function handleRemove(itemId) {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }

  // Called when user confirms a new item in the add modal
  function handleAddItem(formData) {
    const newItem = {
      id: Date.now().toString(),
      name: formData.name,
      quantity: formData.quantity,
      category: formData.category,
      checked: false,
    };
    setItems((prev) => [...prev, newItem]);
    setIsModalOpen(false);
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#F5ECD9" }}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "#2F4A3A" }}>Grocery List</h1>

        {/* Grouped grocery items */}
        <GroceryList
          items={items}
          onCheck={handleCheck}
          onRemove={handleRemove}
        />

        {/* Floating add button */}
        <GroceryAddButton onOpenModal={() => setIsModalOpen(true)} />

        {/* Add item modal */}
        <GroceryAddModal
          isOpen={isModalOpen}
          onConfirm={handleAddItem}
          onCancel={() => setIsModalOpen(false)}
        />

        {/* Storage Location Modal */}
        <GroceryLocationModal
          isOpen={pendingItem !== null}
          onLocationSelect={handleConfirmLocation}
          onCancel={() => setPendingItem(null)}
        />
      </div>
    </div>
  );
}
