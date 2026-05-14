import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Jersey Shop",
  description: "Premium Football Jersey Shop",

  manifest: "/manifest.json",

  themeColor: "#f97316",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}