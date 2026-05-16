import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import "./globals.css";

import VisitorTracker from "@/components/VisitorTracker";

export const metadata: Metadata = {
  title: "NOVALO",
  description: "Premium Jersey Store",

  icons: {
    icon: "/favicon.png?v=999",
    shortcut: "/favicon.png?v=999",
    apple: "/favicon.png?v=999",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <VisitorTracker />

        {children}

        <Toaster position="top-center" />
      </body>
    </html>
  );
}