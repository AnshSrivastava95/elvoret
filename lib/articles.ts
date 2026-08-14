import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { remark } from "remark";
import remarkGfm from "remark-gfm";

import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";

import { visit } from "unist-util-visit";
import remarkRehype from "remark-rehype";

const contentDirectory = path.join(process.cwd(), "content/articles_content");

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: string;
  featured: boolean;
  contentHtml?: string;
}

export function getAllArticles(): Article[] {
  const fileNames = fs
    .readdirSync(contentDirectory)
    .filter((file) => file.endsWith(".mdx"));

  const articles = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");

    const fullPath = path.join(contentDirectory, fileName);

    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      author: data.author,
      category: data.category,
      image: data.image,
      readTime: data.readTime,
      featured: data.featured ?? false,
    };
  });

  return articles.sort(
    (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getArticleBySlug(slug: string) {
  const fullPath = path.join(contentDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Article "${slug}" not found.`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  const processed = await remark()
    .use(remarkGfm)
    .use(() => (tree) => {
      visit(tree, "code", (node: any) => {
        if (!node.lang) node.lang = "text";
      });
    })
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
    })
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    author: data.author,
    category: data.category,
    image: data.image,
    readTime: data.readTime,
    featured: data.featured ?? false,
    contentHtml: processed.toString(),
  };
}