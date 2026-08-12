import Image from "next/image";
import Link from "next/link";

import { getAllArticles } from "@/lib/articles";

export default function FeaturedArticle() {
  const articles = getAllArticles();

  const article = articles.find((article) => article.featured);

  if (!article) return null;

  return (
    <section className="mx-auto w-full px-0 py-0 sm:py-8">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">

        <div className="grid lg:grid-cols-5">

          {/* IMAGE */}

          <Link
            href={`/articles/${article.slug}`}
            className="relative block h-72 overflow-hidden bg-[#f7f3ff] sm:h-72 lg:col-span-2 lg:min-h-[280px]"
          >
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 40vw"
              className="object-contain object-center transition-transform duration-500 hover:scale-105"
            />
          </Link>

          {/* CONTENT */}

          <div className="flex flex-col justify-center p-5 sm:p-6 lg:col-span-3 lg:px-9 lg:py-6">

            {/* Featured Label */}

            <span className="inline-flex w-fit rounded-full bg-purple-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-purple-700">
              ⭐ Featured Article
            </span>

            {/* Title */}

            <Link href={`/articles/${article.slug}`}>
              <h2 className="mt-3 line-clamp-2 text-2xl font-extrabold leading-tight tracking-tight text-gray-900 transition-colors hover:text-purple-700 sm:text-3xl">
                {article.title}
              </h2>
            </Link>

            {/* Description */}

            <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-6 text-gray-600">
              {article.description}
            </p>

            {/* Metadata */}

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 sm:text-sm">

              <span className="font-medium text-gray-800">
                {article.author}
              </span>

              <span>•</span>

              <span>{article.date}</span>

              <span>•</span>

              <span>{article.readTime}</span>

            </div>

            {/* Read Article */}

            <Link
              href={`/articles/${article.slug}`}
              className="group mt-4 inline-flex w-fit items-center gap-2 text-sm font-semibold text-purple-700 transition-colors hover:text-purple-900"
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