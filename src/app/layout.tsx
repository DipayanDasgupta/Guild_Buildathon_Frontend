import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Turtlemint Advisor Dashboard",
  description: "Technology trusted by advisors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
