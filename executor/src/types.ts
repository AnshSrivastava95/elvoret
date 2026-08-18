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
   * Expected output for the supplied test.
   *
   * If present, the executor compares the
   * program's stdout against this value.
   */
  expectedOutput?: string;

  /*
   * Problem time limit in milliseconds.
   */
  timeLimitMs?: number;

  /*
   * Reserved for the future memory-limit layer.
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
   * Returned when the program produces
   * an incorrect answer.
   */
  expectedOutput?: string;

  /*
   * Optional system/execution message.
   */
  error?: string;
}