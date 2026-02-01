import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased 
          bg-[#f7f5f0] 
          text-gray-800
        `}
      >
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <a
              href="/"
              className="text-2xl font-bold text-green-700 tracking-tight"
            >
              Masjid
            </a>

            <nav className="flex gap-6 text-sm font-semibold text-gray-700">
              <a href="/events" className="hover:text-green-700 transition">
                Events
              </a>
              <a href="/videos" className="hover:text-green-700 transition">
                Videos
              </a>
              <a href="/donations" className="hover:text-green-700 transition">
                Donations
              </a>
              <a href="/expenses" className="hover:text-green-700 transition">
                Expenses
              </a>
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
