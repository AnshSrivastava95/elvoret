"use client";

import { useEffect, useState } from "react";
import { Article } from "@/lib/articles";

type Props = {
  article: Article;
};

export default function ArticleContent({ article }: Props) {
  const [copied, setCopied] = useState<number | null>(null);

  useEffect(() => {
    const codeBlocks = document.querySelectorAll("article pre");

    codeBlocks.forEach((pre, index) => {
      // Prevent duplicate buttons
      if (pre.querySelector("[data-copy-button]")) {
        return;
      }

      const button = document.createElement("button");

      button.setAttribute("data-copy-button", "true");
      button.type = "button";
      button.textContent = "Copy";

      button.className =
        "absolute right-3 top-3 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-700";

      pre.classList.add("relative");

      button.addEventListener("click", async () => {
        const code = pre.querySelector("code")?.textContent ?? "";

        try {
          await navigator.clipboard.writeText(code);

          setCopied(index);

          setTimeout(() => {
            setCopied((current) =>
              current === index ? null : current
            );
          }, 2000);
        } catch {
          console.error("Failed to copy code.");
        }
      });

      pre.appendChild(button);
    });

    return () => {
      document
        .querySelectorAll("[data-copy-button]")
        .forEach((button) => button.remove());
    };
  }, [article.contentHtml]);

  useEffect(() => {
    document.querySelectorAll("article pre").forEach((pre, index) => {
      const button = pre.querySelector(
        "[data-copy-button]"
      ) as HTMLButtonElement | null;

      if (button) {
        button.textContent = copied === index ? "Copied!" : "Copy";
      }
    });
  }, [copied]);

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

        prose-h2:mt-16
        prose-h2:mb-6
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
        prose-ol:my-6
        prose-li:my-2
        prose-li:leading-8

        prose-blockquote:border-l-4
        prose-blockquote:border-purple-600
        prose-blockquote:bg-purple-50
        prose-blockquote:px-6
        prose-blockquote:py-3
        prose-blockquote:italic
        prose-blockquote:text-gray-700

        prose-img:rounded-2xl
        prose-img:shadow-lg

        prose-table:w-full
        prose-table:overflow-x-auto

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

        prose-pre:relative
        prose-pre:overflow-x-auto
        prose-pre:rounded-2xl
        prose-pre:border
        prose-pre:border-slate-800
        prose-pre:bg-[#0f172a]
        prose-pre:p-6
        prose-pre:shadow-xl
        prose-pre:scrollbar-thin
      "
      dangerouslySetInnerHTML={{
        __html: article.contentHtml ?? "",
      }}
    />
  );
}