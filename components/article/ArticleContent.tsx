import { Article } from "@/types/article";

type Props = {
    article: Article;
};

export default function ArticleContent({ article }: Props) {
    return (
        <section className="max-w-4xl mx-auto px-6 py-16">

            {article.content.map((block, index) => {

                switch (block.type) {

                    case "heading":
                        return (
                            <h2
                                key={index}
                                className="mt-12 mb-6 text-3xl font-bold text-gray-900"
                            >
                                {block.text}
                            </h2>
                        );

                    case "paragraph":
                        return (
                            <p
                                key={index}
                                className="mb-6 text-lg leading-9 text-gray-700"
                            >
                                {block.text}
                            </p>
                        );

                    case "code":
                        return (
                            <pre
                                key={index}
                                className="my-8 overflow-x-auto rounded-2xl bg-gray-900 p-6 text-sm text-gray-100"
                            >
                                <code>{block.text}</code>
                            </pre>
                        );

                    default:
                        return null;
                }
            })}
        </section>
    );
}