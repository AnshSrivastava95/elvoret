import Image from "next/image";
import { Article } from "@/lib/articles";

type Props = {
  article: Article;
};

export default function ArticleHero({ article }: Props) {
  return (
    <section className="mx-auto max-w-5xl px-5 pt-10 pb-8 sm:px-6 lg:px-8 lg:pt-16 lg:pb-12">

      {/* Category */}

      <div className="mb-5">
        <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-purple-700 sm:text-sm">
          {article.category}
        </span>
      </div>

      {/* Title */}

      <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-6xl">
        {article.title}
      </h1>

      {/* Description */}

      <p className="mt-6 max-w-3xl text-base leading-8 text-gray-600 sm:text-lg lg:text-xl">
        {article.description}
      </p>

      {/* Meta */}

      <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-gray-500">

        <span className="font-medium text-gray-900">
          {article.author}
        </span>

        <span>•</span>

        <time>{article.date}</time>

        <span>•</span>

        <span>{article.readTime}</span>

      </div>

      {/* Featured Image */}

      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-gray-200 shadow-sm sm:mt-12">

        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          sizes="(max-width:768px) 100vw, 1200px"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />

      </div>

    </section>
  );
}