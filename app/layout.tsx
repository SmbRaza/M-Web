import type { Metadata } from "next";
import Link from "next/link";
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
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-bold text-green-700 tracking-tight"
            >
              Masjid
            </Link>

            <nav className="flex gap-6 text-sm font-semibold text-gray-700">
              <Link href="/events" className="hover:text-green-700 transition">
                Events
              </Link>
              <Link href="/videos" className="hover:text-green-700 transition">
                Videos
              </Link>
              <Link href="/donations" className="hover:text-green-700 transition">
                Donations
              </Link>
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
