import Image from "next/image";
import { Article } from "@/lib/articles";

type Props = {
  article: Article;
};

export default function ArticleHero({ article }: Props) {
  return (
    <section className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">

      {/* Category */}

      <div className="mb-5">
        <span className="inline-flex w-fit max-w-full whitespace-nowrap rounded-full bg-purple-100 px-4 py-2 text-xs font-semibold text-purple-700 sm:text-sm">
          {article.category}
        </span>
      </div>

      {/* Title */}

      <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
        {article.title}
      </h1>

      {/* Description */}

      <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8 md:text-xl">
        {article.description}
      </p>

      {/* Meta */}

      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-500 sm:text-base">

        <span className="font-medium text-gray-700">
          {article.author}
        </span>

        <span>•</span>

        <time>{article.date}</time>

        <span>•</span>

        <span>{article.readTime}</span>

      </div>

      {/* Featured Image */}

      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-gray-200 shadow-sm sm:mt-10 sm:rounded-3xl">

        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          sizes="(max-width:768px) 100vw, 1200px"
          className="object-cover"
        />

      </div>

    </section>
  );
}