"use client";

/**
 * @fileoverview A component which persists over top every element on the page.
 * The user can click on this button to add a grocery item to the list.
 * @author Joshua Couto
 * @version 1.0.0
 */

export default function GroceryAddButton({ onOpenModal }) {
  return (
    <button className="fixed bottom-6 right-6 w-14 h-14 rounded-full 
        bg-blue-500 text-white text-2xl shadow-lg hover:bg-blue-600"
      onClick={onOpenModal}>
      +
    </button>
  );
}