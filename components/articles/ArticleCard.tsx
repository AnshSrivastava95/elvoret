import Image from "next/image";
import Link from "next/link";

type Props = {
    article: {
        slug: string;
        title: string;
        description: string;
        image: string;
        category: string;
        date: string;
        readTime: string;
    };
};

export default function ArticleCard({ article }: Props) {
    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Image */}
            <Link href={`/articles/${article.slug}`}>
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">

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
            <div className="flex flex-1 flex-col p-7">

                {/* Category */}
                <span className="inline-flex w-fit rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                    {article.category}
                </span>

                {/* Title */}
                <Link href={`/articles/${article.slug}`}>
                    <h3 className="mt-5 line-clamp-2 text-3xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-purple-700">
                        {article.title}
                    </h3>
                </Link>

                {/* Description */}
                <p className="mt-4 line-clamp-3 text-lg leading-8 text-gray-600">
                    {article.description}
                </p>

                {/* Bottom Section */}
                <div className="mt-auto pt-8">

                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{article.date}</span>

                        <span>{article.readTime}</span>
                    </div>

                    <Link
                        href={`/articles/${article.slug}`}
                        className="mt-6 inline-flex items-center gap-2 font-semibold text-purple-700 transition-colors hover:text-purple-900"
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