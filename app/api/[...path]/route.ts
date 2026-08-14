import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import { createClient } from "@/lib/supabase/server";

// ============================================================
// GET
// ============================================================

export async function GET(
  request: Request,
  props: { params: Promise<{ path?: string[] }> }
) {
  const params = await props.params;
  const routePath = params.path || [];
  const endpoint = routePath.join("/");

  // ==========================================================
  // 1. List all system design articles
  // GET /api/system-design
  // ==========================================================

  if (endpoint === "system-design") {
    try {
      const contentDirectory = path.join(
        process.cwd(),
        "content/system-design"
      );

      if (!fs.existsSync(contentDirectory)) {
        return NextResponse.json(
          {
            success: true,
            articles: [],
          },
          { status: 200 }
        );
      }

      const filenames = fs.readdirSync(contentDirectory);

      const articles = filenames
        .filter(
          (file) => file.endsWith(".mdx") || file.endsWith(".md")
        )
        .map((filename) => {
          const filePath = path.join(
            contentDirectory,
            filename
          );

          const fileContents = fs.readFileSync(
            filePath,
            "utf8"
          );

          const { data } = matter(fileContents);

          return {
            slug: filename.replace(/\.(mdx|md)$/, ""),
            title: data.title || "Untitled",
            description: data.description || "",
            image: data.image || "",
            level: data.level || "Beginner",
            category: data.category || "System Design",
            time: data.time || "5 min read",
          };
        });

      return NextResponse.json(
        {
          success: true,
          articles,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Failed to fetch articles:", error);

      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch articles",
        },
        { status: 500 }
      );
    }
  }

  // ==========================================================
  // 2. Get a single system design article
  // GET /api/system-design/[slug]
  // ==========================================================

  if (
    routePath.length === 2 &&
    routePath[0] === "system-design"
  ) {
    const slug = routePath[1];

    try {
      const contentDirectory = path.join(
        process.cwd(),
        "content/system-design"
      );

      const mdPath = path.join(
        contentDirectory,
        `${slug}.md`
      );

      const mdxPath = path.join(
        contentDirectory,
        `${slug}.mdx`
      );

      const filePath = fs.existsSync(mdPath)
        ? mdPath
        : fs.existsSync(mdxPath)
        ? mdxPath
        : null;

      if (!filePath) {
        return NextResponse.json(
          {
            success: false,
            error: "Article not found",
          },
          { status: 404 }
        );
      }

      const fileContents = fs.readFileSync(
        filePath,
        "utf8"
      );

      const { data, content } = matter(fileContents);

      // Serialize MDX with GFM
      const mdxSource = await serialize(content, {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      });

      return NextResponse.json(
        {
          success: true,
          article: {
            slug,
            title: data.title || "Untitled",
            description: data.description || "",
            source: mdxSource,
            level: data.level || "Beginner",
            category: data.category || "System Design",
            time: data.time || "5 min read",
          },
        },
        { status: 200 }
      );
    } catch (error) {
      console.error(
        "Failed to fetch article content:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch article content",
        },
        { status: 500 }
      );
    }
  }

  // ==========================================================
  // 3. Get logged-in user's article progress
  // GET /api/user/progress
  // ==========================================================

  if (endpoint === "user/progress") {
    try {
      const supabase = await createClient();

      // Get the currently logged-in user
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        return NextResponse.json(
          {
            success: false,
            error: "Unauthorized",
          },
          { status: 401 }
        );
      }

      // Get this user's progress
      const { data, error } = await supabase
        .from("article_progress")
        .select(
          "article_slug, progress, updated_at"
        )
        .eq("user_id", user.id)
        .order("updated_at", {
          ascending: false,
        });

      if (error) {
        console.error(
          "Failed to fetch user progress:",
          error
        );

        return NextResponse.json(
          {
            success: false,
            error: "Failed to fetch user progress",
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          progress: data || [],
        },
        { status: 200 }
      );
    } catch (error) {
      console.error(
        "Progress GET error:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch progress",
        },
        { status: 500 }
      );
    }
  }

  // ==========================================================
  // Unknown GET endpoint
  // ==========================================================

  return NextResponse.json(
    {
      success: false,
      error: "Endpoint not found",
    },
    { status: 404 }
  );
}

// ============================================================
// POST
// ============================================================

export async function POST(
  request: Request,
  props: { params: Promise<{ path?: string[] }> }
) {
  const params = await props.params;
  const routePath = params.path || [];
  const endpoint = routePath.join("/");

  // ==========================================================
  // Save logged-in user's article progress
  // POST /api/user/progress
  // ==========================================================

  if (endpoint === "user/progress") {
    try {
      const supabase = await createClient();

      // ------------------------------------------------------
      // 1. Get logged-in user
      // ------------------------------------------------------

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        return NextResponse.json(
          {
            success: false,
            error: "Unauthorized",
          },
          { status: 401 }
        );
      }

      // ------------------------------------------------------
      // 2. Read request body
      // ------------------------------------------------------

      const body = await request.json();

      const { slug, progress } = body;

      // ------------------------------------------------------
      // 3. Validate request
      // ------------------------------------------------------

      if (!slug || typeof slug !== "string") {
        return NextResponse.json(
          {
            success: false,
            error: "Article slug is required",
          },
          { status: 400 }
        );
      }

      if (
        typeof progress !== "number" ||
        Number.isNaN(progress)
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "Valid progress value is required",
          },
          { status: 400 }
        );
      }

      // Make sure progress is between 0 and 100
      const safeProgress = Math.max(
        0,
        Math.min(100, Math.round(progress))
      );

      // ------------------------------------------------------
      // 4. Insert or update progress
      // ------------------------------------------------------

      const { error } = await supabase
        .from("article_progress")
        .upsert(
          {
            user_id: user.id,
            article_slug: slug,
            progress: safeProgress,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict:
              "user_id,article_slug",
          }
        );

      if (error) {
        console.error(
          "Failed to save progress:",
          error
        );

        return NextResponse.json(
          {
            success: false,
            error: "Failed to save progress",
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message:
            "Progress updated successfully",
          progress: safeProgress,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error(
        "Progress POST error:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          error: "Failed to update progress",
        },
        { status: 500 }
      );
    }
  }

  // ==========================================================
  // Unknown POST endpoint
  // ==========================================================

  return NextResponse.json(
    {
      success: false,
      error: "Endpoint not found",
    },
    { status: 404 }
  );
}