import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Bouquet",
  description: "Send a tiny bouquet with a short note."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#fff8fb] text-ink antialiased">
        <main className="min-h-screen bg-[#fff8fb]">{children}</main>
      </body>
    </html>
  );
}
