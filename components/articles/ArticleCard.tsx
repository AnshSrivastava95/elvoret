import Image from "next/image";
import Link from "next/link";

import { Article } from "@/lib/articles";

type Props = {
  article: Article;
};

export default function ArticleCard({ article }: Props) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      {/* Image */}

      <Link
        href={`/articles/${article.slug}`}
        className="block"
      >
        <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#faf7ff] via-[#f7f3ff] to-[#efe8ff] sm:h-56">

          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

        </div>
      </Link>

      {/* Content */}

      <div className="flex flex-1 flex-col p-5 sm:p-7">

        {/* Category */}

        <span className="inline-flex w-fit rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-purple-700">
          {article.category}
        </span>

        {/* Title */}

        <Link href={`/articles/${article.slug}`}>

          <h3 className="mt-5 line-clamp-2 text-xl font-bold leading-tight tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-purple-700 sm:text-2xl">
            {article.title}
          </h3>

        </Link>

        {/* Description */}

        <p className="mt-4 line-clamp-3 flex-1 text-base leading-7 text-gray-600">
          {article.description}
        </p>

        {/* Footer */}

        <div className="mt-8 border-t border-gray-100 pt-5">

          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-gray-500">

            <span>{article.date}</span>

            <span>{article.readTime}</span>

          </div>

          <Link
            href={`/articles/${article.slug}`}
            className="mt-5 inline-flex items-center gap-2 font-semibold text-purple-700 transition-colors duration-300 hover:text-purple-900"
          >
            Read Article

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>

          </Link>

        </div>

      </div>

    </article>
  );
}