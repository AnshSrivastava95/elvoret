import Image from "next/image";
import Link from "next/link";

export default function FeaturedArticle() {
    return (
        <section className="max-w-[1440px] mx-auto px-6 mt-8">
            <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

                {/* Left Image */}
                <div className="relative h-[420px]">
                    <Image
                        src="/featured.jpg"
                        alt="Featured Article"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Right Content */}
                <div className="flex flex-col justify-center p-12">

                    <span className="inline-flex w-fit rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
                        Featured Article
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-gray-900 leading-tight">
                        Redis Explained Simply
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Learn how Redis works, why it is one of the fastest
                        databases, and how modern applications use it for
                        caching, sessions, queues, and real-time performance.
                    </p>

                    <div className="mt-8 flex items-center gap-5 text-sm text-gray-500">
                        <span>By Ansh Srivastava</span>
                        <span>•</span>
                        <span>August 7, 2026</span>
                        <span>•</span>
                        <span>8 min read</span>
                    </div>

                    <Link
                        href="/articles/redis-explained-simply"
                        className="mt-10 w-fit rounded-xl bg-purple-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-800"
                    >
                        Read Article →
                    </Link>

                </div>
            </div>
        </section>
    );
}