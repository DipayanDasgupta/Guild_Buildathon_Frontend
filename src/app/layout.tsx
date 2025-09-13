import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";

// We DO NOT import globals.css here.
// The stylesheet is linked directly in the <head> tag below.

export const metadata: Metadata = {
  title: "Turtlemint Advisor Dashboard",
  description: "Technology trusted by advisors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* This is the correct way to link a stylesheet from the public folder */}
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
