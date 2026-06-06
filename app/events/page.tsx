import Calendar from '../components/Calendar';
import Link from 'next/link';

export default function EventsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start md:justify-center px-4 py-6 sm:py-8 bg-[#f7f5f0] text-gray-800">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">Events</h1>
      <p className="mb-6 text-center text-gray-600">Upcoming events and programs</p>

      <div className="w-full flex flex-col items-center gap-8">
        <Calendar />
        
        <Link
          href="/events/add"
          className="min-h-11 w-full max-w-xs sm:w-auto px-6 py-3 text-center bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg transition-colors"
        >
          Add an Event
        </Link>
      </div>
    </main>
  );
}
