export default function EventsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Events</h1>
      <p className="mb-6 text-gray-600">Upcoming events and programs</p>

      <div className="w-full flex justify-center">
        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FToronto&showPrint=0&src=c3llZG11aGFtbWFkYmFxaXJyYXphMTZAZ21haWwuY29t&src=ZW4tZ2IucGsjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y2xhc3Nyb29tMTA2NDc2MjkzMzEzNDY0MDE5Mjc4QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039be5&color=%230b8043&color=%231967d2"
          width={800}
          height={600}
          className="border border-gray-300 rounded-lg"
          frameBorder={0}
          scrolling="no"
        />
      </div>
    </main>
  );
}
