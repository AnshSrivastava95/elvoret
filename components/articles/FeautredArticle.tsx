import Image from "next/image";
import Link from "next/link";

export default function FeaturedArticle() {
    return (
        <section className="max-w-[1440px] mx-auto px-6 mt-12">
            <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                <div className="relative h-[360px]">
                    <Image
                    src="/featured.jpg"
                    alt="Featured Article"
                    fill
                    className="object-cover"
                    />
                </div>
            </div>
            <div className="flex flex-col justify-center p-10">
                <span className="inline-flex w-fit rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
                    Featured Article
                </span>
            </div>
        </section>
    );
}