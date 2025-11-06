"use client";

import { ExternalLink } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function ClientSidebar() {
  return (
    <aside className="w-64 border-r p-6 md:block hidden bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1" />
        <ThemeToggle />
      </div>
      <div className="flex flex-col gap-4">
        <a
          href="https://www.stefanwille.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
        >
          Stefan Wille
          <ExternalLink className="h-4 w-4" />
        </a>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Software Developer
          <br />
          Berlin, Germany
        </p>
      </div>
    </aside>
  );
}
