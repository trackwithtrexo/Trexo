export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        {/* Header skeleton */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-8 w-48 rounded bg-gray-800/60 animate-pulse" />
          <div className="flex gap-3">
            <div className="h-10 w-32 rounded bg-gray-800/60 animate-pulse" />
            <div className="h-10 w-28 rounded bg-gray-800/60 animate-pulse" />
          </div>
        </div>

        {/* Stats skeleton */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-800 bg-gray-900/70 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="h-4 w-24 rounded bg-gray-800/60 animate-pulse" />
                <div className="h-5 w-5 rounded-full bg-gray-800/60 animate-pulse" />
              </div>
              <div className="mt-4 h-6 w-32 rounded bg-gray-800/60 animate-pulse" />
            </div>
          ))}
        </div>

        {/* Content skeleton */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-lg border border-gray-800 bg-gray-900/70 p-4">
            <div className="h-5 w-40 rounded bg-gray-800/60 animate-pulse" />
            <ul className="mt-4 divide-y divide-gray-800">
              {Array.from({ length: 6 }).map((_, i) => (
                <li key={i} className="flex items-center justify-between py-3">
                  <div>
                    <div className="h-4 w-44 rounded bg-gray-800/60 animate-pulse" />
                    <div className="mt-2 h-3 w-28 rounded bg-gray-800/60 animate-pulse" />
                  </div>
                  <div className="h-4 w-16 rounded bg-gray-800/60 animate-pulse" />
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-gray-800 bg-gray-900/70 p-4">
            <div className="h-5 w-32 rounded bg-gray-800/60 animate-pulse" />
            <div className="mt-4 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="h-4 w-24 rounded bg-gray-800/60 animate-pulse" />
                  <div className="h-4 w-16 rounded bg-gray-800/60 animate-pulse" />
                </div>
              ))}
              <div className="pt-2">
                <div className="h-10 w-full rounded bg-gray-800/60 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        <div className="sr-only" role="status" aria-live="polite">
          Loading dashboard…
        </div>
      </div>
    </div>
  );
}
