import Image from "next/image";
import Link from "next/link";

type ArticleCardProps = {
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
};

export default function ArticleCard({
  title,
  description,
  image,
  category,
  date,
  readTime,
  slug,
}: ArticleCardProps) {
  return (
    <Link href={`/articles/${slug}`} className="group block">
      <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

        {/* Image */}
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-6">

          {/* Category */}
          <span className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
            {category}
          </span>

          {/* Title */}
          <h3 className="mt-4 text-3xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-purple-700">
            {title}
          </h3>

          {/* Description */}
          <p className="mt-4 line-clamp-3 text-base leading-7 text-gray-600">
            {description}
          </p>

          {/* Meta */}
          <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
            <span>{date}</span>
            <span>{readTime}</span>
          </div>

          {/* Read More */}
          <div className="mt-6">
            <span className="font-semibold text-purple-700 transition-all group-hover:translate-x-1 inline-flex items-center gap-2">
              Read Article
              <span>→</span>
            </span>
          </div>

        </div>
      </article>
    </Link>
  );
}