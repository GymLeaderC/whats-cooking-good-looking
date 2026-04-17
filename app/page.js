/**
 * @fileoverview Temporary home page stub. Will be replaced with the
 * dashboard in the next session.
 * @author Joshua Couto
 * @version 1.0.0
 */

import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/login");
}
