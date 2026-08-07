import ArticleCard from "./ArticleCard";

const articles = [
    {
        title: "Redis Explained Simply",
        description:
            "Learn how Redis works, why developers use it for caching, sessions, queues, and real-time applications.",
        image: "/featured.png",
        category: "Backend",
        date: "Aug 7, 2026",
        readTime: "8 min read",
        slug: "redis-explained-simply",
    },
    {
        title: "Understanding JWT Authentication",
        description:
            "A beginner-friendly guide to JWTs, access tokens, refresh tokens, and authentication in modern web apps.",
        image: "/jwt.png",
        category: "Backend",
        date: "Aug 6, 2026",
        readTime: "10 min read",
        slug: "jwt-authentication-guide",
    },
    {
        title: "Docker for Beginners",
        description:
            "Understand containers, images, volumes, and Docker Compose with practical examples.",
        image: "/docker.png",
        category: "DevOps",
        date: "Aug 5, 2026",
        readTime: "12 min read",
        slug: "docker-for-beginners",
    },
];

export default function ArticleGrid() {
    return (
        <section className="max-w-[1440px] mx-auto px-6 mt-16">

            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                        Latest Articles
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Fresh tutorials, guides and developer resources.
                    </p>
                </div>

            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                {articles.map((article) => (
                    <ArticleCard
                        key={article.slug}
                        {...article}
                    />
                ))}

            </div>

        </section>
    );
}