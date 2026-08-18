export type ExecutionStatus =
  | "ACCEPTED"
  | "WRONG_ANSWER"
  | "TIME_LIMIT_EXCEEDED"
  | "MEMORY_LIMIT_EXCEEDED"
  | "RUNTIME_ERROR"
  | "COMPILATION_ERROR"
  | "OUTPUT_LIMIT_EXCEEDED"
  | "SYSTEM_ERROR";

export interface ExecuteRequest {
  language: "cpp";

  code: string;

  /*
   * Input supplied to the program.
   */
  input?: string;

  /*
   * Expected output for this test.
   *
   * If omitted, the executor only checks whether
   * the program compiled and exited successfully.
   */
  expectedOutput?: string;

  /*
   * Problem execution limit.
   */
  timeLimitMs?: number;

  /*
   * Reserved for the memory-limiting layer.
   */
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
   * Present when the output does not match.
   */
  expectedOutput?: string;

  /*
   * Optional human-readable explanation.
   */
  error?: string;
}