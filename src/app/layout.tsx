import type { Metadata } from "next";
// We no longer need globals.css, we link directly to the public css file
// import "./globals.css";

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
      <head>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
