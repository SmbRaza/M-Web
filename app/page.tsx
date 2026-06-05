export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f5f0] text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"></div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-extrabold mb-4 text-gray-900">
          Welcome to Masjid
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          A place of worship, learning, and community. Join us for daily prayers,
          events, and initiatives that bring our community together.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/events"
            className="px-6 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition"
          >
            View Events
          </a>
        </div>
      </section>

      {/* Info Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-green-700 mb-2">
            Daily Prayers
          </h3>
          <p className="text-sm text-gray-600">
            Stay up to date with prayer times and congregation schedules.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-green-700 mb-2">
            Community Events
          </h3>
          <p className="text-sm text-gray-600">
            Educational programs, khutbahs, and community gatherings for all
            ages.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-green-700 mb-2">
            Support the Masjid
          </h3>
          <p className="text-sm text-gray-600">
            Your donations help maintain the masjid and support community
            services.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Masjid. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
