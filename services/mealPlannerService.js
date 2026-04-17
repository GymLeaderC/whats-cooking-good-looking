/**
 * @fileoverview Firestore service for meal plan management.
 * Meal plan is stored as individual documents keyed by date string.
 * @author Joshua Couto
 * @version 1.0.0
 */

import { db } from "@/lib/firebase";
import { collection, doc, setDoc, deleteDoc, onSnapshot } from "firebase/firestore";

/**
 * Subscribes to real-time meal plan updates for a household.
 * @param {string} householdId
 * @param {function} callback - called with meal plan object keyed by date string
 * @returns {function} unsubscribe function
 */
export function subscribeToMealPlan(householdId, callback) {
  const ref = collection(db, "households", householdId, "mealPlan");
  return onSnapshot(ref, (snapshot) => {
    const mealPlan = {};
    snapshot.docs.forEach((doc) => {
      mealPlan[doc.id] = doc.data();
    });
    callback(mealPlan);
  });
}

/**
 * Assigns a recipe to a specific date.
 * @param {string} householdId
 * @param {string} date - date string e.g. "2026-04-17"
 * @param {object} meal - { recipeName, recipeId }
 */
export async function setMeal(householdId, date, meal) {
  const ref = doc(db, "households", householdId, "mealPlan", date);
  await setDoc(ref, meal);
}

/**
 * Removes a meal from a specific date.
 * @param {string} setHouseholdId
 * @param {string} date - date string e.g. "2026-04-17"
 */
export async function removeMeal(householdId, date) {
  const ref = doc(db, "households", householdId, "mealPlan", date);
  await deleteDoc(ref);
}
