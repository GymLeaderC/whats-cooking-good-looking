/**
 * @fileoverview Firestore service for grocery list management.
 * @author Joshua Couto
 * @version 1.0.0
 */

import { db } from "@/lib/firebase";
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc, serverTimestamp } from "firebase/firestore";

/**
 * Subscribes to real-time grocery list updates for a household.
 * @param {string} householdId
 * @param {function} callback - called with the updated items array
 * @returns {function} unsubscribe function
 */
export function subscribeToGroceryList(householdId, callback) {
  const ref = collection(db, "households", householdId, "groceryList");
  return onSnapshot(ref, (snapshot) => {
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(items);
  });
}

/**
 * Adds a new item to the grocery list.
 * @param {string} householdId
 * @param {object} item - { name, quantity, unit, category }
 */
export async function addGroceryItem(householdId, item) {
  const ref = collection(db, "households", householdId, "groceryList");
  await addDoc(ref, { ...item, checked: false, createdAt: serverTimestamp() });
}

/**
 * Marks a grocery item as checked.
 * @param {string} householdId
 * @param {string} itemId
 */
export async function checkGroceryItem(householdId, itemId) {
  const ref = doc(db, "households", householdId, "groceryList", itemId);
  await updateDoc(ref, { checked: true });
}

/**
 * Deletes a grocery item by ID.
 * @param {string} householdId
 * @param {string} itemId
 */
export async function deleteGroceryItem(householdId, itemId) {
  const ref = doc(db, "households", householdId, "groceryList", itemId);
  await deleteDoc(ref);
}