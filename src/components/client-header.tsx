"use client";

import { ThemeToggle } from "./theme-toggle";

export function ClientHeader() {
  return (
    <div className="flex justify-end md:hidden mb-4">
      <ThemeToggle />
    </div>
  );
}
