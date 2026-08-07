import { Article } from "@/types/article";

import CodeBlock from "@/components/articles/CodeBlock";
import Callout from "@/components/articles/Callout";
import ImageBlock from "@/components/articles/ImageBlock";
import TableBlock from "@/components/articles/TableBlock";

type Props = {
    article: Article;
};

export default function ArticleContent({ article }: Props) {
    return (
        <article className="mx-auto max-w-4xl px-6 py-16">

            {article.content.map((block, index) => {

                switch (block.type) {

                    case "heading":
                        if (block.level === 2) {
                            return (
                                <h2
                                    key={index}
                                    className="mt-14 mb-6 text-4xl font-bold tracking-tight text-gray-900"
                                >
                                    {block.text}
                                </h2>
                            );
                        }

                        return (
                            <h3
                                key={index}
                                className="mt-10 mb-5 text-2xl font-semibold text-gray-900"
                            >
                                {block.text}
                            </h3>
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
                            <CodeBlock
                                key={index}
                                language={block.language}
                                code={block.text}
                            />
                        );

                    case "list":

                        if (block.ordered) {
                            return (
                                <ol
                                    key={index}
                                    className="mb-8 ml-8 list-decimal space-y-3 text-lg leading-8 text-gray-700"
                                >
                                    {block.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ol>
                            );
                        }

                        return (
                            <ul
                                key={index}
                                className="mb-8 ml-8 list-disc space-y-3 text-lg leading-8 text-gray-700"
                            >
                                {block.items.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        );

                    case "quote":
                        return (
                            <blockquote
                                key={index}
                                className="my-10 border-l-4 border-purple-600 bg-purple-50 py-4 pl-6 italic text-gray-700"
                            >
                                <p>{block.text}</p>

                                {block.author && (
                                    <footer className="mt-4 font-semibold text-purple-700">
                                        — {block.author}
                                    </footer>
                                )}
                            </blockquote>
                        );

                    case "image":
                        return (
                            <ImageBlock
                                key={index}
                                src={block.src}
                                alt={block.alt}
                                caption={block.caption}
                            />
                        );

                    case "callout":
                        return (
                            <Callout
                                key={index}
                                variant={block.variant}
                                title={block.title}
                                text={block.text}
                            />
                        );

                    case "table":
                        return (
                            <TableBlock
                                key={index}
                                headers={block.headers}
                                rows={block.rows}
                            />
                        );

                    default:
                        return null;
                }

            })}

        </article>
    );
}