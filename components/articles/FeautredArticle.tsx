import Image from "next/image";
import Link from "next/link";

export default function FeaturedArticle() {
    return (
        <section className="max-w-[1440px] mx-auto px-6 mt-10">

            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                <div className="grid lg:grid-cols-2">

                    {/* LEFT IMAGE */}

                    <div className="relative flex min-h-[480px] items-center justify-center bg-gradient-to-br from-[#faf7ff] via-[#f7f3ff] to-[#efe8ff]">

                        <Image
                            src="/featured.png"
                            alt="Redis Explained Simply"
                            fill
                            priority
                            className="object-contain object-center p-4 transition-transform duration-500 hover:scale-105"
                        />

                    </div>

                    {/* RIGHT CONTENT */}

                    <div className="flex flex-col justify-center px-14 py-12">

                        <span className="inline-flex w-fit rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
                            Featured Article
                        </span>

                        <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900">
                            Redis Explained
                            <br />
                            Simply
                        </h2>

                        <p className="mt-6 text-lg leading-9 text-gray-600">
                            Learn how Redis works, why it has become one of the
                            fastest in-memory databases, and how developers use
                            it for caching, sessions, queues, pub/sub messaging,
                            rate limiting, and real-time applications.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-gray-500">

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
                            className="group mt-10 inline-flex w-fit items-center gap-2 rounded-xl bg-purple-700 px-7 py-4 font-semibold text-white transition-all duration-300 hover:bg-purple-800 hover:shadow-lg"
                        >
                            Read Article

                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                →
                            </span>

                        </Link>

                    </div>

                </div>

            </div>

        </section>
    );
}