"use client";

/**
 * @fileoverview A component which persists over top every element on the page.
 * The user can click on this button to add a grocery item to the list.
 * @author Joshua Couto
 * @version 1.0.0
 */

export default function GroceryAddButton({ onOpenModal }) {
  return (
    <button
      onClick={onOpenModal}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full text-2xl font-medium hover:opacity-80 transition"
      style={{ backgroundColor: "#D7B98E", color: "#2F4A3A" }}
    >
      +
    </button>
  );
}