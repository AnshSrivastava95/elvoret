import Image from "next/image";
import { Article } from "@/lib/articles";

type Props = {
  article: Article;
};

export default function ArticleHero({ article }: Props) {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-16 pb-12">

      {/* Category */}
      <div className="mb-6">
        <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
          {article.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        {article.title}
      </h1>

      {/* Description */}
      <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 md:text-xl">
        {article.description}
      </p>

      {/* Meta */}
      <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-gray-500 md:text-base">

        <span className="font-medium text-gray-700">
          {article.author}
        </span>

        <span>•</span>

        <time>{article.date}</time>

        <span>•</span>

        <span>{article.readTime}</span>

      </div>

      {/* Featured Image */}
      <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-3xl border border-gray-200 shadow-sm">

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