"use client";

import { useEffect, useState } from "react";
import { Article } from "@/lib/articles";

type Props = {
  article: Article;
};

export default function ArticleContent({ article }: Props) {
  const [copied, setCopied] = useState<number | null>(null);

  useEffect(() => {
    const articleElement = document.querySelector("article");

    if (!articleElement) return;

    const codeBlocks = articleElement.querySelectorAll("pre");

    codeBlocks.forEach((pre, index) => {
      if (pre.parentElement?.dataset.codeWrapper === "true") {
        return;
      }

      

      const wrapper = document.createElement("div");

      wrapper.dataset.codeWrapper = "true";

      wrapper.className =
        "relative my-8 overflow-hidden rounded-2xl border border-slate-800 bg-[#0f172a] shadow-xl";


      pre.parentNode?.insertBefore(wrapper, pre);

      wrapper.appendChild(pre);

      const button = document.createElement("button");

      button.setAttribute("data-copy-button", "true");

      button.type = "button";

      button.textContent = "Copy";

      button.className = `
        absolute
        right-3
        top-3
        z-30
        rounded-lg
        border
        border-slate-600
        bg-slate-800
        px-3
        py-1.5
        text-xs
        font-semibold
        text-white
        shadow-md
        transition-all
        duration-200
        hover:bg-slate-700
        active:scale-95
      `;

      button.addEventListener("click", async () => {
        const code =
          pre.querySelector("code")?.textContent ??
          pre.textContent ??
          "";

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

      wrapper.appendChild(button);
    });

    return () => {
      articleElement
        .querySelectorAll("[data-code-wrapper]")
        .forEach((wrapper) => {
          const pre = wrapper.querySelector("pre");

          if (pre) {
            wrapper.parentNode?.insertBefore(pre, wrapper);
          }

          wrapper.remove();
        });
    };
  }, [article.contentHtml]);

  useEffect(() => {
    document
      .querySelectorAll("[data-copy-button]")
      .forEach((button, index) => {
        const copyButton = button as HTMLButtonElement;

        copyButton.textContent =
          copied === index ? "Copied!" : "Copy";
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

        prose-h1:text-3xl
        sm:prose-h1:text-4xl
        md:prose-h1:text-5xl

        prose-h2:mt-14
        prose-h2:mb-5
        prose-h2:text-2xl
        sm:prose-h2:text-3xl
        md:prose-h2:text-4xl

        prose-h3:mt-10
        prose-h3:mb-4
        prose-h3:text-xl
        sm:prose-h3:text-2xl

        prose-p:text-gray-700
        prose-p:leading-8

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
        prose-blockquote:px-5
        prose-blockquote:py-3
        prose-blockquote:italic
        prose-blockquote:text-gray-700

        prose-img:rounded-2xl
        prose-img:shadow-lg

        prose-table:block
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
        [&_pre_code]:bg-transparent
        [&_pre_code]:px-0
        [&_pre_code]:py-0

        prose-pre:m-0
        prose-pre:max-w-full
        prose-pre:overflow-x-auto
        prose-pre:rounded-none
        prose-pre:border-0
        prose-pre:bg-transparent
        prose-pre:p-4
        prose-pre:pt-14
        sm:prose-pre:p-6
        sm:prose-pre:pt-14
        prose-pre:shadow-none
        prose-pre:scrollbar-thin
        prose-pre:whitespace-pre
      "
      dangerouslySetInnerHTML={{
        __html: article.contentHtml ?? "",
      }}
    />
  );
}