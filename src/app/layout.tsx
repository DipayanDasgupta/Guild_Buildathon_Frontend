import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import React from 'react'; // Import React

export const metadata: Metadata = {
  title: "Turtlemint Advisor Dashboard",
  description: "Technology trusted by advisors",
};

export default function RootLayout({
  children,
}: {
  // Explicitly type the children prop
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
