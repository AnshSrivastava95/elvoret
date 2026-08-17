import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

/* =========================================================
   CP TYPES
   ========================================================= */

export interface CPExample {
  input: string;
  output: string;
}

export interface CPComplexity {
  time?: string;
  space?: string;
}

export interface CPProblem {
  title: string;
  difficulty: string;

  description?: string;

  source?: string;
  sourceId?: string | number;

  topics: string[];

  pattern?: string;

  complexity?: CPComplexity;

  examples: CPExample[];

  language: string;

  starterCode: string;

  hints: string[];

  problemHtml: string;
}

/* =========================================================
   DIRECTORY
   ========================================================= */

const CP_DIRECTORY = path.join(
  process.cwd(),
  "content",
  "cp"
);

const SOLUTION_START =
  "<!-- SOLUTION_START -->";

const SOLUTION_END =
  "<!-- SOLUTION_END -->";

/* =========================================================
   GET PROBLEM
   ========================================================= */

export async function getCPProblem(
  slug: string
): Promise<CPProblem | null> {
  try {
    const filePath = path.join(
      CP_DIRECTORY,
      `${slug}.mdx`
    );

    const raw = await fs.readFile(
      filePath,
      "utf8"
    );

    const { data, content } =
      matter(raw);

    /*
     * Only process the public section.
     */

    const publicContent =
      getPublicContent(content);

    const problemHtml =
      await markdownToHtml(
        publicContent
      );

    /*
     * Explicitly construct the object.
     *
     * This is important because TypeScript now
     * knows exactly what problem contains.
     */

    return {
      title: String(
        data.title ?? ""
      ),

      difficulty: String(
        data.difficulty ?? "Unknown"
      ),

      description:
        data.description
          ? String(data.description)
          : undefined,

      source:
        data.source
          ? String(data.source)
          : undefined,

      sourceId:
        data.sourceId !== undefined
          ? data.sourceId
          : undefined,

      topics: Array.isArray(data.topics)
        ? data.topics.map(String)
        : [],

      pattern:
        data.pattern
          ? String(data.pattern)
          : undefined,

      complexity: data.complexity
        ? {
            time:
              data.complexity.time
                ? String(
                    data.complexity.time
                  )
                : undefined,

            space:
              data.complexity.space
                ? String(
                    data.complexity.space
                  )
                : undefined,
          }
        : undefined,

      examples: Array.isArray(
        data.examples
      )
        ? data.examples.map(
            (example: any) => ({
              input: String(
                example.input ?? ""
              ),

              output: String(
                example.output ?? ""
              ),
            })
          )
        : [],

      language: String(
        data.language ?? "cpp"
      ),

      starterCode: String(
        data.starterCode ?? ""
      ),

      hints: Array.isArray(
        data.hints
      )
        ? data.hints.map(String)
        : [],

      problemHtml,
    };

  } catch (error) {

    console.error(
      `Failed to load CP problem: ${slug}`,
      error
    );

    return null;
  }
}

/* =========================================================
   GET SOLUTION
   ========================================================= */

export async function getCPSolution(
  slug: string
): Promise<string | null> {
  try {

    const filePath = path.join(
      CP_DIRECTORY,
      `${slug}.mdx`
    );

    const raw = await fs.readFile(
      filePath,
      "utf8"
    );

    const { content } =
      matter(raw);

    const solutionContent =
      getSolutionContent(content);

    if (!solutionContent) {
      return null;
    }

    return await markdownToHtml(
      solutionContent
    );

  } catch (error) {

    console.error(
      `Failed to load CP solution: ${slug}`,
      error
    );

    return null;
  }
}

/* =========================================================
   PUBLIC CONTENT
   ========================================================= */

function getPublicContent(
  content: string
): string {

  const start =
    content.indexOf(
      SOLUTION_START
    );

  /*
   * No solution section.
   * Entire document is public.
   */

  if (start === -1) {
    return content.trim();
  }

  return content
    .slice(0, start)
    .trim();
}

/* =========================================================
   SOLUTION CONTENT
   ========================================================= */

function getSolutionContent(
  content: string
): string {

  const start =
    content.indexOf(
      SOLUTION_START
    );

  if (start === -1) {
    return "";
  }

  const solutionStart =
    start +
    SOLUTION_START.length;

  const end =
    content.indexOf(
      SOLUTION_END,
      solutionStart
    );

  const solutionEnd =
    end === -1
      ? content.length
      : end;

  return content
    .slice(
      solutionStart,
      solutionEnd
    )
    .trim();
}

/* =========================================================
   MARKDOWN → HTML
   ========================================================= */

async function markdownToHtml(
  markdown: string
): Promise<string> {

  const result =
    await remark()
      .use(html)
      .process(markdown);

  return result.toString();
}