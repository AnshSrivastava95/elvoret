import { Article } from "@/lib/articles";

type Props = {
  article: Article;
};

export default function ArticleContent({ article }: Props) {
  return (
    <article
      className="
        prose
        prose-gray
        prose-lg
        lg:prose-xl

        mx-auto
        max-w-4xl

        px-5
        py-10

        sm:px-6
        md:py-14
        lg:px-8
        lg:py-16

        prose-headings:scroll-mt-28
        prose-headings:font-bold
        prose-headings:tracking-tight
        prose-headings:text-gray-900

        prose-h1:text-4xl
        md:prose-h1:text-5xl

        prose-h2:mt-20
        prose-h2:mb-6
        prose-h2:border-t
        prose-h2:border-gray-200
        prose-h2:pt-10
        prose-h2:text-3xl
        md:prose-h2:text-4xl

        prose-h3:mt-12
        prose-h3:mb-4
        prose-h3:text-2xl

        prose-p:leading-8
        prose-p:text-gray-700

        prose-a:font-medium
        prose-a:text-purple-700
        prose-a:no-underline
        hover:prose-a:text-purple-900

        prose-strong:text-gray-900

        prose-ul:my-6
        prose-ul:list-disc
        prose-ul:pl-6

        prose-ol:my-6
        prose-ol:pl-6

        prose-li:my-2
        prose-li:leading-8

        prose-blockquote:border-l-4
        prose-blockquote:border-purple-600
        prose-blockquote:bg-purple-50
        prose-blockquote:px-6
        prose-blockquote:py-3
        prose-blockquote:italic
        prose-blockquote:text-gray-700
        prose-blockquote:rounded-r-xl

        prose-img:rounded-2xl
        prose-img:shadow-lg

        prose-table:block
        prose-table:w-full
        prose-table:overflow-x-auto
        prose-table:text-sm

        prose-th:border
        prose-th:bg-gray-100
        prose-th:px-4
        prose-th:py-3

        prose-td:border
        prose-td:px-4
        prose-td:py-3

        prose-code:rounded
        prose-code:bg-purple-50
        prose-code:px-1.5
        prose-code:py-0.5
        prose-code:text-purple-700
        prose-code:before:content-none
        prose-code:after:content-none

        prose-pre:overflow-x-auto
        prose-pre:rounded-2xl
        prose-pre:border
        prose-pre:border-slate-800
        prose-pre:bg-[#0f172a]
        prose-pre:p-6
        prose-pre:shadow-xl

        selection:bg-purple-200
        selection:text-gray-900
      "
      dangerouslySetInnerHTML={{
        __html: article.contentHtml ?? "",
      }}
    />
  );
}