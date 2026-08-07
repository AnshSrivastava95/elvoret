import { Article } from "@/lib/articles";

type Props = {
  article: Article;
};

export default function ArticleContent({ article }: Props) {
  return (
    <article
      className="
        prose
        prose-lg
        lg:prose-xl
        max-w-4xl
        mx-auto
        px-6
        py-16

        prose-headings:font-bold
        prose-headings:text-gray-900
        prose-headings:tracking-tight

        prose-h1:text-5xl
        prose-h2:text-4xl
        prose-h3:text-3xl

        prose-p:text-gray-700
        prose-p:leading-8

        prose-a:text-purple-700
        hover:prose-a:text-purple-800

        prose-strong:text-gray-900

        prose-code:text-purple-700
        prose-code:before:content-none
        prose-code:after:content-none

        prose-pre:bg-[#0f172a]
        prose-pre:text-white
        prose-pre:rounded-2xl

        prose-img:rounded-2xl

        prose-blockquote:border-purple-600
        prose-blockquote:text-gray-700

        prose-table:w-full
      "
      dangerouslySetInnerHTML={{
        __html: article.contentHtml ?? "",
      }}
    />
  );
}