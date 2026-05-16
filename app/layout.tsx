import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}