import Image from "next/image";
import Link from "next/link";

export default function FeaturedArticle() {
    return (
        <section className="max-w-[1440px] mx-auto px-6 mt-10">
            <div className="grid overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm lg:grid-cols-2">

                {/* LEFT IMAGE */}

                <div className="relative flex min-h-[430px] items-center justify-center bg-[#F8F5FF]">
                    <Image
                        src="/featured.png"
                        alt="Redis Explained Simply"
                        fill
                        priority
                        className="object-contain p-8"
                    />
                </div>

                {/* RIGHT CONTENT */}

                <div className="flex flex-col justify-center p-12">

                    <span className="inline-flex w-fit rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
                        Featured Article
                    </span>

                    <h2 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight text-gray-900">
                        Redis Explained
                        <br />
                        Simply
                    </h2>

                    <p className="mt-6 text-lg leading-9 text-gray-600">
                        Learn how Redis works, why it has become one of the
                        fastest in-memory databases, and how developers use it
                        for caching, sessions, queues, and real-time
                        applications.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-gray-500">

                        <span className="font-medium text-gray-700">
                            By Ansh Srivastava
                        </span>

                        <span>•</span>

                        <span>August 7, 2026</span>

                        <span>•</span>

                        <span>8 min read</span>

                    </div>

                    <Link
                        href="/articles/redis-explained-simply"
                        className="mt-10 inline-flex w-fit items-center rounded-xl bg-purple-700 px-7 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-purple-800 hover:shadow-lg"
                    >
                        Read Article →
                    </Link>

                </div>

            </div>
        </section>
    );
}