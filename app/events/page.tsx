import Calendar from '../components/Calendar';

export default function EventsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-neutral-900 text-white">
      <h1 className="text-3xl font-bold mb-2">Events</h1>
      <p className="mb-6 text-gray-600">Upcoming events and programs</p>

      <div className="w-full flex flex-col items-center gap-8">
        <Calendar />
      </div>
    </main>
  );
}
