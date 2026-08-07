import Image from "next/image";
import Link from "next/link";

import { getAllArticles } from "@/lib/articles";

export default function FeaturedArticle() {
  const articles = getAllArticles();

  const article = articles.find((article) => article.featured);

  if (!article) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">

        <div className="grid lg:grid-cols-5">

          {/* IMAGE */}

          <div className="relative h-72 bg-gradient-to-br from-[#faf7ff] via-[#f7f3ff] to-[#efe8ff] sm:h-[420px] lg:col-span-2 lg:h-auto">

            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 40vw"
              className="object-contain p-2 transition-transform duration-500 hover:scale-105 lg:p-4"
            />

          </div>

          {/* CONTENT */}

          <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-3 lg:p-12">

            <span className="inline-flex w-fit rounded-full bg-purple-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-purple-700">
              Featured Article
            </span>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-[3.25rem]">
              {article.title}
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-600 lg:text-lg">
              {article.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-500">

              <span className="font-medium text-gray-700">
                {article.author}
              </span>

              <span>•</span>

              <span>{article.date}</span>

              <span>•</span>

              <span>{article.readTime}</span>

            </div>

            <Link
              href={`/articles/${article.slug}`}
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-purple-700 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-purple-800 hover:shadow-lg"
            >
              Read Article →

            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}