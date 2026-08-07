import { Article } from "@/types/article";

export const articles: Article[] = [
  {
    slug: "redis-explained-simply",

    featured: true,

    title: "Redis Explained Simply",

    description:
      "Learn how Redis works, why it has become one of the fastest in-memory databases, and how developers use it.",

    image: "/featured.png",

    category: "Backend",

    author: "Ansh Srivastava",

    role: "Founder",

    date: "August 7, 2026",

    readTime: "8 min read",

    content: [
      {
        type: "heading",
        level: 2,
        text: "What is Redis?",
      },

      {
        type: "paragraph",
        text: "Redis is an open-source, in-memory data structure store used as a database, cache, message broker, and streaming engine. Because data is stored in memory instead of on disk, Redis is incredibly fast.",
      },

      {
        type: "heading",
        level: 2,
        text: "Why Developers Love Redis",
      },

      {
        type: "paragraph",
        text: "Redis powers caching, user sessions, real-time chat, leaderboards, queues, pub/sub messaging, and rate limiting in thousands of modern applications.",
      },

      {
        type: "code",
        language: "bash",
        text: `docker run -d --name redis -p 6379:6379 redis`,
      },

      {
        type: "paragraph",
        text: "The command above starts a Redis container using Docker.",
      },

      {
        type: "heading",
        level: 2,
        text: "Conclusion",
      },

      {
        type: "paragraph",
        text: "Redis is one of the easiest databases to learn and one of the most valuable technologies every backend developer should know.",
      },
    ],
  },
];