"use client"

/**
 * @fileoverview Manages the household document in Firestore. On sign-in, checks
 * whether the current user already has a household. If not, creates one using
 * their uid as the householdId. Exposes householdId and householdData to the app.
 * @author Joshua Couto
 * @version 1.0.0
 */

import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

const HouseholdContext = createContext(null);

export function HouseholdProvider({ children }) {
  const { user } = useAuth();
  const [householdId, setHouseholdId] = useState(null);
  const [householdData, setHouseholdData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setHouseholdId(null);
      setHouseholdData(null);
      setLoading(false);
      return;
    }

    async function initializeHousehold() {
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          // Returning User Flow - load their existing household
          const { householdId } = userSnap.data();
          const householdRef = doc(db, "households", householdId);
          const householdSnap = await getDoc(householdRef);
          setHouseholdId(householdId);
          setHouseholdData(householdSnap.data());
        } else {
          // New User Flow - create user doc and household doc
          const newHouseholdId = user.uid;

          await setDoc(doc(db, "users", user.uid), {
            displayName: user.displayName,
            email: user.email,
            householdId: newHouseholdId,
          });

          const newHousehold = {
            name: `${user.displayName}'s Home`,
            memberIds: [user.uid],
            dietaryPreferences: [],
            createdAt: new Date(),
          };

          await setDoc(doc(db, "households", newHouseholdId), newHousehold);
          setHouseholdId(newHouseholdId);
          setHouseholdData(newHousehold);
        }
      } catch (error) {
        console.error("failed to initialize household:", error);
      } finally {
        setLoading(false);
      }
    }

    initializeHousehold();
  }, [user]);

  return (
    <HouseholdContext.Provider value={{ householdId, householdData, loading }}>
      {!loading && children}
    </HouseholdContext.Provider>
  );
}

export function useHousehold() {
  return useContext(HouseholdContext);
}