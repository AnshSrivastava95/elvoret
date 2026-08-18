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

export interface CPNumberRange {
  min: number;
  max: number;
}

export interface CPArrayGenerator {
  type: "array";
  count: number;
  seed?: number;

  length: CPNumberRange;

  values: CPNumberRange;

  includeEdgeCases?: boolean;
  includeSorted?: boolean;
  includeReverseSorted?: boolean;
  includeDuplicates?: boolean;
}

export interface CPStringGenerator {
  type: "string";
  count: number;
  seed?: number;

  length: CPNumberRange;

  alphabet?: string;

  includeEdgeCases?: boolean;
}

export interface CPMatrixGenerator {
  type: "matrix";
  count: number;
  seed?: number;

  rows: CPNumberRange;

  columns: CPNumberRange;

  values: CPNumberRange;

  includeEdgeCases?: boolean;
}

export type CPGenerator =
  | CPArrayGenerator
  | CPStringGenerator
  | CPMatrixGenerator;

export interface CPProblem {
  slug: string;

  title: string;

  difficulty: string;

  description?: string;

  source?: string;

  sourceId?: string | number;

  topics: string[];

  pattern?: string;

  problemSet?: string;

  contest?: string;

  complexity?: CPComplexity;

  /*
   * Problem time limit in seconds.
   *
   * Example:
   *
   * timeLimit: 2
   *
   * means 2 seconds.
   */
  timeLimit?: number;

  /*
   * Automatic hidden-test generator.
   */
  generator?: CPGenerator;

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

      timeLimit:
        data.timeLimit !==
        undefined
          ? Number(
              data.timeLimit
            )
          : undefined,

      generator:
        isValidGenerator(
          data.generator
        )
          ? data.generator
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
   GET RAW REFERENCE CODE
   ========================================================= */

/**
 * Reads the SOLUTION_START / SOLUTION_END section
 * and extracts the first fenced C++ code block.
 *
 * This function runs server-side only.
 *
 * The reference solution is NEVER sent to the browser.
 */
export async function getCPReferenceCode(
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

    if (
      !solutionContent
    ) {
      return null;
    }

    /*
     * Prefer a C++ fenced block.
     *
     * Supports:
     *
     * ```cpp
     * ```
     *
     * ```c++
     * ```
     *
     * ```cc
     * ```
     */
    const cppMatch =
      solutionContent.match(
        /```(?:cpp|c\+\+|cc|c)?\s*\n([\s\S]*?)```/i
      );

    if (
      cppMatch
    ) {
      return cppMatch[1].trim();
    }

    /*
     * If the solution section itself contains
     * raw code without Markdown fences, use it.
     */
    return solutionContent.trim();

  } catch (error) {
    console.error(
      `Failed to load CP reference solution: ${slug}`,
      error
    );

    return null;
  }
}

/* =========================================================
   GET SOLUTION HTML
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

    if (
      !solutionContent
    ) {
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
   VALIDATE GENERATOR
   ========================================================= */

function isValidGenerator(
  value: unknown
): value is CPGenerator {
  if (
    !value ||
    typeof value !==
      "object"
  ) {
    return false;
  }

  const generator =
    value as Record<
      string,
      unknown
    >;

  if (
    generator.type !==
      "array" &&
    generator.type !==
      "string" &&
    generator.type !==
      "matrix"
  ) {
    return false;
  }

  return true;
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

  if (
    start === -1
  ) {
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

  if (
    start === -1
  ) {
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
      .process(
        markdown
      );

  return result.toString();
}