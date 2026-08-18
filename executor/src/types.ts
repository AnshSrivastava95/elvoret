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

  /*
   * Number of generated tests.
   */
  count: number;

  /*
   * Deterministic seed.
   */
  seed?: number;

  /*
   * Array size.
   */
  length: NumberRange;

  /*
   * Element value range.
   */
  values: NumberRange;

  /*
   * Generate useful edge cases.
   */
  includeEdgeCases?: boolean;

  /*
   * If true, some generated arrays may be sorted.
   */
  includeSorted?: boolean;

  /*
   * If true, some generated arrays may be reverse sorted.
   */
  includeReverseSorted?: boolean;

  /*
   * If true, duplicate-heavy cases may be generated.
   */
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

  /*
   * Not exposed to the browser.
   */
  expectedOutput?: string;

  /*
   * Useful internally for debugging.
   */
  seed: number;
}

/* =========================================================
   TEST RESULT
   ========================================================= */

export interface TestCaseResult {
  testNumber: number;

  status: ExecutionStatus;

  /*
   * Input is kept internally.
   *
   * The production API can later omit it for hidden tests.
   */
  input: string;

  expectedOutput: string;

  stdout: string;

  stderr: string;

  executionTimeMs: number;

  exitCode: number | null;
}

/* =========================================================
   EXECUTE REQUEST
   ========================================================= */

export interface ExecuteRequest {
  language: "cpp";

  /*
   * Student source code.
   */
  code: string;

  /*
   * Official/reference solution.
   *
   * Required for generated tests.
   */
  referenceCode?: string;

  /*
   * Explicit manually supplied tests.
   */
  tests?: ExecuteTestCase[];

  /*
   * Generated test specification.
   */
  generator?: TestGeneratorSpec;

  /*
   * Backward-compatible single test.
   */
  input?: string;

  expectedOutput?: string;

  /*
   * Problem execution time.
   */
  timeLimitMs?: number;

  /*
   * Reserved for memory enforcement.
   */
  memoryLimitMb?: number;
}

/* =========================================================
   EXECUTE RESPONSE
   ========================================================= */

export interface ExecuteResponse {
  ok: boolean;

  status: ExecutionStatus;

  stdout: string;

  stderr: string;

  executionTimeMs: number;

  exitCode: number | null;

  /*
   * Results are useful for development.
   *
   * Later, for hidden tests, we should only expose
   * safe summary information to the client.
   */
  testResults?: TestCaseResult[];

  failedTest?: number;

  expectedOutput?: string;

  error?: string;
}