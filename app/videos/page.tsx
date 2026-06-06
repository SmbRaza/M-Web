type Video = {
  id: string;
  title: string;
  uploadedAt: string;
};

const videos: Video[] = [
  {
    id: "VIDEO_ID_1",
    title: "Latest Khutbah",
    uploadedAt: "2026-05-31",
  },
  {
    id: "VIDEO_ID_2",
    title: "Community Reminder",
    uploadedAt: "2026-05-24",
  },
  {
    id: "VIDEO_ID_3",
    title: "Weekly Class",
    uploadedAt: "2026-05-17",
  },
  {
    id: "VIDEO_ID_4",
    title: "Quran Reflection",
    uploadedAt: "2026-05-10",
  },
];

function YouTubeEmbed({ video }: { video: Video }) {
  return (
    <article className="min-w-0 overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="aspect-video w-full bg-gray-200">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${video.id}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="p-4">
        <h2 className="font-semibold text-gray-900 break-words">{video.title}</h2>
        <p className="mt-1 text-sm text-gray-500">
          Uploaded {new Date(video.uploadedAt).toLocaleDateString()}
        </p>
      </div>
    </article>
  );
}

export default function VideosPage() {
  const sortedVideos = [...videos].sort(
    (a, b) =>
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );
  const [latestVideo, ...recentVideos] = sortedVideos;

  return (
    <main className="min-h-screen bg-[#f7f5f0] px-4 sm:px-6 py-8 sm:py-10 text-gray-800">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Videos</h1>
          <p className="mt-2 text-gray-600">Latest talks, khutbahs, and updates.</p>
        </div>

        {latestVideo && (
          <div className="mb-10">
            <YouTubeEmbed video={latestVideo} />
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentVideos.slice(0, 5).map((video) => (
            <YouTubeEmbed key={video.id} video={video} />
          ))}
        </div>
      </section>
    </main>
  );
}
