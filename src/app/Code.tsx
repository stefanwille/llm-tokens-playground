import type { ReactNode } from "react";

interface CodeProps {
  children: ReactNode;
}

export function Code({ children }: CodeProps) {
  return (
    <pre className="w-full md:w-[400px] -ml-0 inline-block overflow-auto whitespace-pre-wrap  bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded border border-gray-300 dark:border-gray-700 my-2">
      <code className="font-mono text-sm">{children}</code>
    </pre>
  );
}
