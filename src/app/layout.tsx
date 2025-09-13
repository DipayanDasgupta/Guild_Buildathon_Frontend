import type { Metadata } from "next";
// This is the correct, modern way to import global CSS in Next.js
import "./globals.css";

export const metadata: Metadata = {
  title: "InsureAgent Dashboard",
  description: "Modern insurance agent dashboard for client and document management",
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
