export type ParagraphBlock = {
    type: "paragraph";
    text: string;
};

export type HeadingBlock = {
    type: "heading";
    level: 2 | 3;
    text: string;
};

export type CodeBlock = {
    type: "code";
    language: string;
    text: string;
};

export type ListBlock = {
    type: "list";
    ordered?: boolean;
    items: string[];
};

export type QuoteBlock = {
    type: "quote";
    text: string;
    author?: string;
};

export type ImageBlock = {
    type: "image";
    src: string;
    alt: string;
    caption?: string;
};

export type CalloutBlock = {
    type: "callout";
    variant: "info" | "warning" | "success";
    title: string;
    text: string;
};

export type TableBlock = {
    type: "table";
    headers: string[];
    rows: string[][];
};

export type ContentBlock =
    | ParagraphBlock
    | HeadingBlock
    | CodeBlock
    | ListBlock
    | QuoteBlock
    | ImageBlock
    | CalloutBlock
    | TableBlock;

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