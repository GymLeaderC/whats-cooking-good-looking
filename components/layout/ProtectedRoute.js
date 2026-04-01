"use client";

/**
 * @fileoverview Wrapper component used to protect webpages which require 
 * authentication to view.
 * @author Joshua Couto
 * @version 1.0.0
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return children;
}