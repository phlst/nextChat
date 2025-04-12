import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next Chat",
  description: "Extra fast chat with ee2e made by Peter Hajdu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`$ antialiased`}>{children}</body>
    </html>
  );
}
