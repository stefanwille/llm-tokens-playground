import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ExternalLink } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LLM Tokens Playground | Stefan Wille, Berlin",
  description: "A playground that makes LLM tokens easier to understand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="w-64 border-r p-6 md:block hidden bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col gap-4 mt-4">
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

          {/* Main Content */}
          <main className="flex-1 p-4">
            {/* Navbar */}
            {/* Page content */}
            <div className="p-4">{children}</div>
          </main>
        </div>

        {/* Footer */}
        <footer className="border-t bg-gray-50 dark:bg-gray-900 py-6">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <a
                href="https://www.stefanwille.com/contact"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </a>
              <span className="text-gray-400 dark:text-gray-600">|</span>
              <a
                href="https://www.stefanwille.com/impressum"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Impress
              </a>
              <span className="text-gray-400 dark:text-gray-600">|</span>
              <a
                href="https://www.stefanwille.com/dataprotection"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Data Protection
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
