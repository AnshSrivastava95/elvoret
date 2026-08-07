import Image from "next/image";
import { Article } from "@/types/article";

type Props = {
    article: Article;
};

export default function ArticleHero({ article }: Props) {
    return (
        <section className="max-w-6xl mx-auto px-6 pt-16">

            <div className="mb-8">

                <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
                    {article.category}
                </span>

                <h1 className="mt-6 text-5xl font-bold leading-tight text-gray-900">
                    {article.title}
                </h1>

                <p className="mt-6 max-w-3xl text-xl leading-9 text-gray-600">
                    {article.description}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4 text-gray-500">

                    <span>{article.author}</span>

                    <span>•</span>

                    <span>{article.date}</span>

                    <span>•</span>

                    <span>{article.readTime}</span>

                </div>

            </div>

            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">

                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    priority
                    className="object-cover"
                />

            </div>

        </section>
    );
}