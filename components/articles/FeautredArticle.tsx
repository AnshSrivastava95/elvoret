import Image from "next/image";
import Link from "next/link";

import { getAllArticles } from "@/lib/articles";

export default function FeaturedArticle() {
  const articles = getAllArticles();

  const article = articles.find((article) => article.featured);

  if (!article) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

        <div className="grid lg:grid-cols-2">

          {/* Image */}

          <div className="relative h-72 sm:h-96 lg:min-h-[520px] bg-gradient-to-br from-[#faf7ff] via-[#f7f3ff] to-[#efe8ff]">

            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-contain p-6 transition-transform duration-500 hover:scale-105"
            />

          </div>

          {/* Content */}

          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-14">

            <span className="inline-flex w-fit rounded-full bg-purple-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-purple-700 sm:text-sm">
              ⭐ Featured Article
            </span>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {article.title}
            </h2>

            <p className="mt-5 text-base leading-8 text-gray-600 sm:text-lg">
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
              className="group mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-purple-700 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-purple-800 hover:shadow-lg"
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