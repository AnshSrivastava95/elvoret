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

/*
 * Every MDX file represents an individual problem.
 *
 * The same problem can optionally belong to:
 *
 * 1. A DSA pattern
 * 2. A problem set
 * 3. A contest/preparation collection
 *
 * This means we do NOT need separate MDX files
 * for patterns or collections.
 */
export interface CPProblem {
  /*
   * Automatically generated from filename.
   *
   * Example:
   *
   * two-sum.mdx
   *
   * becomes:
   *
   * slug: "two-sum"
   */
  slug: string;

  title: string;

  difficulty: string;

  description?: string;

  source?: string;

  sourceId?: string | number;

  /*
   * General topics.
   *
   * Example:
   *
   * ["Arrays", "Hashing"]
   */
  topics: string[];

  /*
   * Main DSA pattern.
   *
   * Examples:
   *
   * Two Pointers
   * Sliding Window
   * Binary Search
   * Prefix Sum
   * Dynamic Programming
   */
  pattern?: string;

  /*
   * Problem collection.
   *
   * Examples:
   *
   * Codeforces
   * CodeChef
   * AtCoder
   * LeetCode
   * Interview Problems
   */
  problemSet?: string;

  /*
   * Contest / speed-training collection.
   *
   * Examples:
   *
   * Fast Solving
   * Codeforces Div 3 Practice
   * Beginner Contest Simulation
   * Previous Codeforces Round
   */
  contest?: string;

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
   GET ALL PROBLEMS
   ========================================================= */

/*
 * Automatically discovers every .mdx file
 * inside:
 *
 * content/cp/
 *
 * This means:
 *
 * Add MDX file
 *      ↓
 * Automatically discovered
 *      ↓
 * Automatically appears on /cp
 *
 * No hardcoded problem list required.
 */

export async function getAllCPProblems(): Promise<
  CPProblem[]
> {
  try {
    const files =
      await fs.readdir(
        CP_DIRECTORY
      );

    const mdxFiles =
      files.filter(
        (file) =>
          file.endsWith(".mdx")
      );

    const problems =
      await Promise.all(
        mdxFiles.map(
          async (file) => {
            const slug =
              file.replace(
                /\.mdx$/,
                ""
              );

            return getCPProblem(
              slug
            );
          }
        )
      );

    return problems
      .filter(
        (
          problem
        ): problem is CPProblem =>
          problem !== null
      )
      .sort(
        (a, b) =>
          a.title.localeCompare(
            b.title
          )
      );
  } catch (error) {
    console.error(
      "Failed to load CP problems:",
      error
    );

    return [];
  }
}

/* =========================================================
   GET INDIVIDUAL PROBLEM
   ========================================================= */

export async function getCPProblem(
  slug: string
): Promise<CPProblem | null> {
  try {
    const filePath =
      path.join(
        CP_DIRECTORY,
        `${slug}.mdx`
      );

    const raw =
      await fs.readFile(
        filePath,
        "utf8"
      );

    const {
      data,
      content,
    } = matter(raw);

    /*
     * Only process the public part.
     *
     * Anything after SOLUTION_START
     * stays hidden from the main problem HTML.
     */
    const publicContent =
      getPublicContent(
        content
      );

    const problemHtml =
      await markdownToHtml(
        publicContent
      );

    return {
      slug,

      title:
        String(
          data.title ?? ""
        ),

      difficulty:
        String(
          data.difficulty ??
            "Unknown"
        ),

      description:
        data.description
          ? String(
              data.description
            )
          : undefined,

      source:
        data.source
          ? String(
              data.source
            )
          : undefined,

      sourceId:
        data.sourceId !==
        undefined
          ? data.sourceId
          : undefined,

      topics:
        Array.isArray(
          data.topics
        )
          ? data.topics.map(
              String
            )
          : [],

      pattern:
        data.pattern
          ? String(
              data.pattern
            )
          : undefined,

      problemSet:
        data.problemSet
          ? String(
              data.problemSet
            )
          : undefined,

      contest:
        data.contest
          ? String(
              data.contest
            )
          : undefined,

      complexity:
        data.complexity
          ? {
              time:
                data.complexity
                  .time
                  ? String(
                      data
                        .complexity
                        .time
                    )
                  : undefined,

              space:
                data.complexity
                  .space
                  ? String(
                      data
                        .complexity
                        .space
                    )
                  : undefined,
            }
          : undefined,

      examples:
        Array.isArray(
          data.examples
        )
          ? data.examples.map(
              (
                example: any
              ) => ({
                input:
                  String(
                    example.input ??
                      ""
                  ),

                output:
                  String(
                    example.output ??
                      ""
                  ),
              })
            )
          : [],

      language:
        String(
          data.language ??
            "cpp"
        ),

      starterCode:
        String(
          data.starterCode ??
            ""
        ),

      hints:
        Array.isArray(
          data.hints
        )
          ? data.hints.map(
              String
            )
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
    const filePath =
      path.join(
        CP_DIRECTORY,
        `${slug}.mdx`
      );

    const raw =
      await fs.readFile(
        filePath,
        "utf8"
      );

    const {
      content,
    } = matter(raw);

    const solutionContent =
      getSolutionContent(
        content
      );

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
   * No solution section means
   * entire MDX body is public.
   */
  if (start === -1) {
    return content.trim();
  }

  return content
    .slice(
      0,
      start
    )
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