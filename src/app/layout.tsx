import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { AiChatbot } from "@/components/AiChatbot"; // Import the new component
import React from 'react';

export const metadata: Metadata = {
  title: "Insure-Agent AI Dashboard",
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
        <link rel="stylesheet" href="/style.css" />
        {/* Required for react-chatbot-kit styles */}
        <link rel="stylesheet" href="https://unpkg.com/react-chatbot-kit/build/main.css" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {/* The AI Chatbot is placed here so it appears on every page */}
          <AiChatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}