export type ContentBlock =
    | {
          type: "heading";
          text: string;
      }
    | {
          type: "paragraph";
          text: string;
      }
    | {
          type: "code";
          language: string;
          text: string;
      };

export interface Article {
    slug: string;
    featured: boolean;

    title: string;
    description: string;

    image: string;
    category: string;

    author: string;
    role: string;

    date: string;
    readTime: string;

    content: ContentBlock[];
}