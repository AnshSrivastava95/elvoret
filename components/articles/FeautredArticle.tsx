import Image from "next/image";
import Link from "next/link";

export default function FeaturedArticle() {
    return (
        <section className="max-w-[1440px] mx-auto px-6 mt-8">
            <div className="grid grid-cols-[1.2fr_1fr] overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">

                
                <div className="relative h-[450px] overflow-hidden">
                    <Image
                        src="/featured.png"
                        alt="Redis Explained Simply"
                        fill
                        priority
                        className="object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                </div>

                
                <div className="flex flex-col justify-center p-12">

                    <span className="inline-flex w-fit rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
                        Featured Article
                    </span>

                    <h2 className="mt-5 max-w-md text-[44px] font-extrabold leading-tight text-gray-900">
                        Redis Explained Simply
                    </h2>

                    <p className="mt-5 max-w-lg text-lg leading-8 text-gray-600">
                        Learn how Redis works, why it's one of the fastest
                        databases, and how modern applications use it for
                        caching, sessions, queues, real-time analytics,
                        and high-performance applications.
                    </p>

                    <div className="mt-7 flex items-center gap-4 text-sm text-gray-500">
                        <span>By Ansh Srivastava</span>
                        <span>•</span>
                        <span>August 7, 2026</span>
                        <span>•</span>
                        <span>8 min read</span>
                    </div>

                    <Link
                        href="/articles/redis-explained-simply"
                        className="mt-8 w-fit rounded-xl bg-purple-700 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-purple-800 hover:scale-105"
                    >
                        Read Article →
                    </Link>

                </div>

            </div>
        </section>
    );
}