/**
 * @fileoverview Firestore service for inventory management.
 * All inventory reads and writes for a household go through this file.
 * @author Joshua Couto
 * @version 1.0.0
 */

import { db } from "@/lib/firebase";
import { collection, addDoc, deleteDoc, doc, 
         onSnapshot, serverTimestamp } from "firebase/firestore";

/**
 * Subscribes to real-time inventory updates for a household.
 * @param {string} householdId
 * @param {function} callback - called with the updated items array
 * @returns {function} unsubscribe function — call this on component unmount
 */
export function subscribeToInventory(householdId, callback) {
  const ref = collection(db, "households", householdId, "inventory");
  return onSnapshot(ref, (snapshot) => {
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(items);
  });
}

/**
 * Adds a new item to the household inventory.
 * @param {string} householdId
 * @param {object} item - { name, quantity, unit, category, location }
 */
export async function addInventoryItem(householdId, item) {
  const ref = collection(db, "households", householdId, "inventory");
  await addDoc(ref, {
    ...item,
    createdAt: serverTimestamp(),
  });
}

/**
 * Deletes an inventory item by ID.
 * @param {string} householdId
 * @param {string} itemId
 */
export async function deleteInventoryItem(householdId, itemId) {
  const ref = doc(db, "households", householdId, "inventory", itemId);
  await deleteDoc(ref);
}