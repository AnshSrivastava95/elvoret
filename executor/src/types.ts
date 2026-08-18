export type ExecutionStatus =
  | "ACCEPTED"
  | "WRONG_ANSWER"
  | "TIME_LIMIT_EXCEEDED"
  | "MEMORY_LIMIT_EXCEEDED"
  | "RUNTIME_ERROR"
  | "COMPILATION_ERROR"
  | "OUTPUT_LIMIT_EXCEEDED"
  | "SYSTEM_ERROR";

export interface ExecuteTestCase {
  input: string;
  expectedOutput: string;
}

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

export interface ExecuteRequest {
  language: "cpp";

  code: string;

  /*
   * New multi-test format.
   *
   * The executor compiles the program once,
   * then runs it against every test.
   */
  tests?: ExecuteTestCase[];

  /*
   * Kept for backward compatibility with
   * our current single-test API.
   */
  input?: string;

  expectedOutput?: string;

  timeLimitMs?: number;

  memoryLimitMb?: number;
}

export interface ExecuteResponse {
  ok: boolean;

  status: ExecutionStatus;

  stdout: string;

  stderr: string;

  executionTimeMs: number;

  exitCode: number | null;

  /*
   * Results from individual test cases.
   */
  testResults?: TestCaseResult[];

  /*
   * Which test caused the failure.
   */
  failedTest?: number;

  /*
   * Expected output for the failing test.
   */
  expectedOutput?: string;

  error?: string;
}