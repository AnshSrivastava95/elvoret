export type ExecutionStatus =
  | "ACCEPTED"
  | "WRONG_ANSWER"
  | "TIME_LIMIT_EXCEEDED"
  | "MEMORY_LIMIT_EXCEEDED"
  | "RUNTIME_ERROR"
  | "COMPILATION_ERROR"
  | "OUTPUT_LIMIT_EXCEEDED"
  | "SYSTEM_ERROR"
  | "INVALID_TEST_SUITE";

/* =========================================================
   COMPLEXITY
   ========================================================= */

export interface ComplexityEstimate {
  time: string;

  space: string;

  confidence:
    | "low"
    | "medium"
    | "high";

  notes: string[];
}

export interface ComplexityInfo {
  estimated: ComplexityEstimate;

  target?: {
    time?: string;
    space?: string;
  };

  timeMatchesTarget?: boolean;

  spaceMatchesTarget?: boolean;
}

/* =========================================================
   MANUAL TEST CASE
   ========================================================= */

export interface ExecuteTestCase {
  input: string;

  expectedOutput: string;
}

/* =========================================================
   GENERATOR TYPES
   ========================================================= */

export interface NumberRange {
  min: number;
  max: number;
}

export interface ArrayGeneratorSpec {
  type: "array";

  count: number;

  seed?: number;

  length: NumberRange;

  values: NumberRange;

  includeEdgeCases?: boolean;

  includeSorted?: boolean;

  includeReverseSorted?: boolean;

  includeDuplicates?: boolean;
}

export interface StringGeneratorSpec {
  type: "string";

  count: number;

  seed?: number;

  length: NumberRange;

  alphabet?: string;

  includeEdgeCases?: boolean;
}

export interface MatrixGeneratorSpec {
  type: "matrix";

  count: number;

  seed?: number;

  rows: NumberRange;

  columns: NumberRange;

  values: NumberRange;

  includeEdgeCases?: boolean;
}

export type TestGeneratorSpec =
  | ArrayGeneratorSpec
  | StringGeneratorSpec
  | MatrixGeneratorSpec;

/* =========================================================
   GENERATED TEST
   ========================================================= */

export interface GeneratedTestCase {
  input: string;

  expectedOutput?: string;

  seed: number;
}

/* =========================================================
   TEST RESULT
   ========================================================= */

export interface TestCaseResult {
  testNumber: number;

  status: ExecutionStatus;

  input: string;

  expectedOutput: string;

  stdout: string;

  stderr: string;

  executionTimeMs: number;

  exitCode: number | null;
}

/* =========================================================
   REQUEST
   ========================================================= */

export interface ExecuteRequest {
  language: "cpp";

  /*
   * Student source code.
   */
  code: string;

  /*
   * Official reference solution.
   */
  referenceCode?: string;

  /*
   * Explicit manual tests.
   */
  tests?: ExecuteTestCase[];

  /*
   * Automatic test generator.
   */
  generator?: TestGeneratorSpec;

  /*
   * Raw execution input.
   */
  input?: string;

  /*
   * Legacy single-test expected output.
   */
  expectedOutput?: string;

  /*
   * Problem runtime limit.
   */
  timeLimitMs?: number;

  /*
   * Reserved for future memory enforcement.
   */
  memoryLimitMb?: number;

  /*
   * Target complexity from MDX.
   */
  targetComplexity?: {
    time?: string;
    space?: string;
  };
}

/* =========================================================
   RESPONSE
   ========================================================= */

export interface ExecuteResponse {
  ok: boolean;

  status: ExecutionStatus;

  stdout: string;

  stderr: string;

  executionTimeMs: number;

  exitCode: number | null;

  testResults?: TestCaseResult[];

  failedTest?: number;

  expectedOutput?: string;

  error?: string;

  /*
   * Static complexity analysis.
   */
  complexity?: ComplexityInfo;
}