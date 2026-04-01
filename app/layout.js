/**
 * @fileoverview Root layout for the Next.js App Router. Wraps the entire 
 * application in the AuthProvider so all pages have access to authentication 
 * state, and imports global styles.
 * @author Joshua Couto
 * @version 1.0.0
 */

import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "What's Cooking, Good Looking",
  description: "A Cooking Companion for Busy Homes"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}