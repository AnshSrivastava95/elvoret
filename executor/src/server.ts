import express, {
  type Request,
  type Response,
} from "express";

import {
  executeCpp,
} from "./runner.js";

const app =
  express();

app.use(
  express.json({
    limit: "256kb",
  })
);

const PORT =
  Number(
    process.env.PORT
  ) || 10000;

const EXECUTOR_SECRET =
  process.env.EXECUTOR_SECRET;

/* =========================================================
   HEALTH
   ========================================================= */

app.get(
  "/health",
  (
    _req: Request,
    res: Response
  ) => {

    res.status(200).json({
      ok: true,

      service:
        "elvoret-executor",

      version:
        "1.0.0",
    });
  }
);

/* =========================================================
   EXECUTE
   ========================================================= */

app.post(
  "/execute",
  async (
    req: Request,
    res: Response
  ) => {

    /* =====================================================
       AUTH
       ===================================================== */

    const authorization =
      req.headers.authorization;

    if (
      !EXECUTOR_SECRET ||
      authorization !==
        `Bearer ${EXECUTOR_SECRET}`
    ) {

      return res.status(401).json({
        ok: false,

        error:
          "Unauthorized",
      });
    }

    /* =====================================================
       LANGUAGE
       ===================================================== */

    if (
      req.body?.language !==
      "cpp"
    ) {

      return res.status(400).json({
        ok: false,

        error:
          "Only C++ execution is currently supported.",
      });
    }

    /* =====================================================
       CODE
       ===================================================== */

    if (
      typeof req.body?.code !==
      "string"
    ) {

      return res.status(400).json({
        ok: false,

        error:
          "Code must be a string.",
      });
    }

    /* =====================================================
       EXECUTE
       ===================================================== */

    try {

      const result =
        await executeCpp({
          language:
            "cpp",

          code:
            req.body.code,

          input:
            typeof req.body.input ===
            "string"
              ? req.body.input
              : "",

          /*
           * IMPORTANT:
           *
           * Forward expectedOutput exactly as
           * received from Vercel.
           */
          expectedOutput:
            typeof req.body.expectedOutput ===
            "string"
              ? req.body.expectedOutput
              : undefined,

          timeLimitMs:
            req.body.timeLimitMs,

          memoryLimitMb:
            req.body.memoryLimitMb,
        });

      /*
       * Successful execution:
       * HTTP 200
       *
       * Wrong answer / TLE / runtime error:
       * HTTP 422
       *
       * This lets the frontend distinguish
       * infrastructure failure from a verdict.
       */
      return res
        .status(
          result.ok
            ? 200
            : 422
        )
        .json(result);

    } catch (error) {

      console.error(
        "Unexpected execution error:",
        error
      );

      return res.status(500).json({
        ok: false,

        status:
          "SYSTEM_ERROR",

        error:
          "Execution engine failure.",
      });
    }
  }
);

/* =========================================================
   START
   ========================================================= */

app.listen(
  PORT,
  "0.0.0.0",
  () => {

    console.log(
      `Elvoret executor listening on port ${PORT}`
    );
  }
);