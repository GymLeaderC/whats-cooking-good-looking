"use client";

/**
 * @fileoverview Layout for all protected pages. Renders the persistent top Navbar 
 * above page content. All routes inside (protected)/ inherit this layout.
 * @author Joshua Couto
 * @version 1.0.0
 */

import Navbar from "@/components/layout/Navbar";

export default function NavbarLayout({ children }) {
  return (
    <>
      <Navbar/>
      <main>{children}</main>
    </>
  );
}