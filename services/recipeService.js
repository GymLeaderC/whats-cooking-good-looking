/**
 * @fileoverview Firestore service for recipe management.
 * All recipe reads and writes for a household go through this file.
 * @author Joshua Couto
 * @version 1.0.0
 */

import { db } from "@/lib/firebase";
import { collection, addDoc, deleteDoc, doc, onSnapshot, serverTimestamp } from "firebase/firestore";

/**
 * Subscribes to real-time recipe updates for a household.
 * @param {string} householdId
 * @param {function} callback - called with the updated recipes array
 * @returns {function} unsubscribe funciton
 */
export function subscribeToRecipes(householdId, callback) {
  const ref = collection(db, "households", householdId, "recipes");
  return onSnapshot(ref, (snapshot) => {
    const recipes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(recipes);
  });
}

/**
 * Adds a new recipe to the household.
 * @param {string} householdId
 * @param {object} recipe - { title, ingredients, instructions, services }
 */
export async function addRecipe(householdId, recipe) {
  const ref = collection(db, "households", householdId, "recipes");
  await addDoc(ref, {
    ...recipe,
    createdAt: serverTimestamp(),
  });
}

/**
 * Deletes a recipe by ID.
 * @param {string} householdId
 * @param {string} recipeId
 */
export async function deleteRecipe(householdId, recipeId) {
  const ref = doc(db, "households", householdId, "recipes", recipeId);
  await deleteDoc(ref);
}