import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">

        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">

          {/* LEFT — BADGE, HEADING & DESCRIPTION */}

          <div className="lg:col-start-1 lg:row-start-1">

            {/* Badge */}

            <div className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1.5 sm:px-4 sm:py-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-purple-700 sm:text-sm">
                Elevate Your Tomorrow.
              </span>
            </div>

            {/* Heading */}

            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl lg:mt-6 lg:text-[56px] lg:leading-[1.02]">
              Everything a{" "}
              <span className="text-purple-700">
                Software Engineer
              </span>{" "}
              Needs
            </h1>

            {/* Description */}

            <p className="mt-4 max-w-xl text-base leading-7 text-gray-600 sm:mt-5 sm:text-lg sm:leading-8 lg:max-w-md">
              Learn, build, and grow with in-depth articles, AI tools,
              real-world projects, and the latest tech insights.
            </p>

          </div>

          {/* RIGHT — DASHBOARD */}

          <div className="mt-8 w-full lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0">

            <div className="w-full rounded-2xl border border-gray-100 bg-white p-1.5 shadow-xl sm:rounded-3xl sm:p-2 lg:shadow-2xl">

              <Image
                src="/hero.png"
                alt="Elvoret developer dashboard"
                width={1200}
                height={850}
                priority
                sizes="(max-width:1024px) 100vw, 55vw"
                className="h-auto w-full rounded-xl sm:rounded-2xl"
              />

            </div>

          </div>

          {/* LEFT — BUTTONS & COMMUNITY */}

          <div className="mt-6 lg:col-start-1 lg:row-start-2 lg:mt-5">

            {/* Buttons */}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">

              <Link
                href="/articles"
                className="inline-flex w-full items-center justify-center rounded-xl bg-purple-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-purple-800 sm:w-auto sm:text-base"
              >
                Explore Articles →
              </Link>

              <Link
                href="/tools"
                className="inline-flex w-full items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 transition-colors duration-200 hover:border-purple-700 hover:text-purple-700 sm:w-auto sm:text-base"
              >
                Explore AI Tools
              </Link>

            </div>

            {/* Community */}

            <div className="mt-8 sm:mt-10">

              <div className="flex items-center gap-3 sm:gap-4">

                {/* Avatars */}

                <div className="flex shrink-0 -space-x-3">

                  <div className="h-9 w-9 rounded-full border-2 border-white bg-purple-200 sm:h-10 sm:w-10" />

                  <div className="h-9 w-9 rounded-full border-2 border-white bg-purple-300 sm:h-10 sm:w-10" />

                  <div className="h-9 w-9 rounded-full border-2 border-white bg-purple-400 sm:h-10 sm:w-10" />

                  <div className="h-9 w-9 rounded-full border-2 border-white bg-purple-500 sm:h-10 sm:w-10" />

                </div>

                {/* Community text */}

                <div className="min-w-0">

                  <p className="text-sm font-semibold leading-5 text-gray-900 sm:text-base">
                    240+ developers already subscribed
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                    Join our growing software engineering community.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}