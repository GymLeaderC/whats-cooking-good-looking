"use client"

/**
 * @fileoverview Login page for the "/login" route. Renders the Google sign-in
 * button, handles authentication via AuthContext, and redirects authenticated
 * users to the dashboard.
 * @author Joshua Couto
 * @version 1.0.0
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user, router]);

  async function handleSignIn() {
    setIsLoading(true);
    setError(null);

    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (err) {
      setError("Couldn't sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h1>What&apos;s Cooking, Good Looking?</h1>
      <p>A Cooking Companion for Busy Homes</p>
        <button onClick={handleSignIn} disabled={isLoading}>
          {isLoading ? "Signing in..." : "Continue with Google"}
        </button>
        {error && <p>{error}</p>}
    </div>
  );
}