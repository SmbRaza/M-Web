import type { Metadata } from "next";
import HeaderNav from "./components/HeaderNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Masjid",
  description: "Masjid website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          antialiased 
          bg-[#f7f5f0] 
          text-gray-800
        `}
      >
        {/* Header */}
        <HeaderNav />

        {/* Page Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
