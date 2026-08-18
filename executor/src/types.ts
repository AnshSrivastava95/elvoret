export type ExecutionStatus =
  | "ACCEPTED"
  | "TIME_LIMIT_EXCEEDED"
  | "MEMORY_LIMIT_EXCEEDED"
  | "RUNTIME_ERROR"
  | "COMPILATION_ERROR"
  | "OUTPUT_LIMIT_EXCEEDED"
  | "SYSTEM_ERROR";

export interface ExecuteRequest {
  language: "cpp";
  code: string;
  input?: string;

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

  error?: string;
}