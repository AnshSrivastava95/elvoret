import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";


interface ArticleMeta {
  title: string;
  description: string;
  image:string
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  time: string;
  slug: string;
}


function getAllSystemDesignArticles(): ArticleMeta[] {
  const contentDirectory = path.join(process.cwd(), "content/system-design");
  
  
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(contentDirectory);

  const articles = filenames
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(contentDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug: filename.replace(/\.(mdx|md)$/, ""),
        title: data.title || "Untitled",
        description: data.description || "",
        image: data.image || "",
        level: data.level || "Beginner",
        category: data.category || "General",
        time: data.time || "5 min read",
      };
    });

  return articles;
}

export default function SystemDesignPage() {
  const articles = getAllSystemDesignArticles();

  
  const groupedArticles = articles.reduce((acc, article) => {
    if (!acc[article.category]) {
      acc[article.category] = [];
    }
    acc[article.category].push(article);
    return acc;
  }, {} as Record<string, ArticleMeta[]>);

  return (
    <div className="min-h-screen bg-white">
      
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full bg-purple-100 px-4 py-1.5 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-purple-700">
              Architecture & Scale
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            System Design <span className="text-purple-700">Mastery</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Learn how to design scalable, fault-tolerant, and high-performance distributed systems. New guides added as we build and learn.
          </p>
        </div>

        
        <div className="mt-12 space-y-16">
          {Object.keys(groupedArticles).length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 p-12 text-center">
              <p className="text-gray-500">No system design articles added yet. Drop an MDX file into <code className="bg-gray-100 px-2 py-1 rounded text-sm text-purple-800">content/system-design/</code> to get started!</p>
            </div>
          ) : (
            Object.entries(groupedArticles).map(([category, items], idx) => (
              <div key={idx} className="border-t border-gray-100 pt-10 first:border-0 first:pt-0">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((topic, topicIdx) => (
                    <Link
                      key={topicIdx}
                      href={`/system-design/${topic.slug}`}
                      className="group relative flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-purple-600 hover:shadow-md"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span
                            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              topic.level === "Beginner"
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : topic.level === "Intermediate"
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : "bg-purple-50 text-purple-700 border border-purple-200"
                            }`}
                          >
                            {topic.level}
                          </span>
                          <span className="text-xs text-gray-400 font-medium">{topic.time}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                          {topic.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500 line-clamp-2">{topic.description}</p>
                      </div>

                      <div className="mt-6 flex items-center text-sm font-semibold text-purple-700">
                        <span>Read Guide</span>
                        <span className="ml-1.5 transition-transform group-hover:translate-x-1">→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        
        <div className="mt-20 rounded-3xl bg-purple-900 px-6 py-10 sm:p-12 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to prep for interviews or scale your app?</h2>
          <p className="mt-2 text-purple-200 text-sm sm:text-base max-w-xl mx-auto">
            Explore our curated software engineering articles and interactive developer tools to complement your learning journey.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/articles"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-purple-900 shadow hover:bg-purple-50 transition"
            >
              Explore Articles
            </Link>
            <Link
              href="/tools"
              className="rounded-xl border border-purple-700 bg-purple-800 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition"
            >
              Try AI Tools
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}