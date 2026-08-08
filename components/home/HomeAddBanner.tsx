export default function HomeAdBanner() {
  return (
    <section className="w-full py-4 sm:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="
            flex
            min-h-[90px]
            w-full
            items-center
            justify-center
            rounded-2xl
            border
            border-gray-200
            bg-gray-50
            sm:min-h-[110px]
          "
        >
          <span className="text-xs font-medium uppercase tracking-widest text-gray-400">
            Advertisement
          </span>
        </div>
      </div>
    </section>
  );
}