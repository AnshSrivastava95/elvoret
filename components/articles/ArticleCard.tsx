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
        <Link href={`/articles/${slug}`} className="block">
            <article className="group h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-purple-200 hover:shadow-xl">

                

                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">

                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                </div>


                <div className="flex h-[250px] flex-col p-6">

                    <span className="inline-flex w-fit rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                        {category}
                    </span>

                    <h3 className="mt-4 text-2xl font-bold leading-tight text-gray-900 transition-colors duration-300 group-hover:text-purple-700">
                        {title}
                    </h3>

                    <p className="mt-4 line-clamp-3 text-gray-600 leading-7">
                        {description}
                    </p>


                    <div className="mt-auto">

                        <div className="mt-6 flex items-center justify-between text-sm text-gray-500">

                            <span>{date}</span>

                            <span>{readTime}</span>

                        </div>

                    </div>

                </div>

            </article>
        </Link>
    );
}