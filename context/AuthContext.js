"use client"

/**
 * @fileoverview Manages Firebase authentication state and exposes the current user,
 * householdId, loading state, and sign-in/out methods to the entire application
 * via React Context. After auth confirms, fetches the user's householdId from
 * Firestore so all pages have access without redundant lookups.
 * @author Joshua Couto
 * @version 1.1.0
 */

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [householdId, setHouseholdId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(firebaseUser) => {
      if (firebaseUser) {
        // User is signed in - fetch their householdId from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            setHouseholdId(userDoc.data().householdId);
          }
      } catch (error) {
        console.error("Failed to fetch user document:", error);
      }
      setUser(firebaseUser);
    } else {
      // Usere signed out - clear everything
      setUser(null);
      setHouseholdId(null);
    }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google sign-in failed:", error);
      throw error;
    }
  }

  async function signOutUser() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign-out failed:", error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ user, householdId, loading, signInWithGoogle, signOutUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}