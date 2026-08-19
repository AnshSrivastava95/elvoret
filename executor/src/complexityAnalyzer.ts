import type {
  ComplexityInfo,
  ComplexityEstimate,
} from "./types.js";

/* =========================================================
   HELPERS
   ========================================================= */

function normalizeComplexity(
  value: string
): string {
  return value
    .replace(/\s+/g, "")
    .toUpperCase();
}

function countMatches(
  source: string,
  pattern: RegExp
): number {
  return (
    source.match(pattern) ??
    []
  ).length;
}

/* =========================================================
   BRACE MATCHING
   ========================================================= */

function findMatchingBrace(
  source: string,
  openIndex: number
): number {

  let depth = 0;

  for (
    let i = openIndex;
    i < source.length;
    i++
  ) {

    if (
      source[i] === "{"
    ) {
      depth++;
    }

    if (
      source[i] === "}"
    ) {
      depth--;

      if (
        depth === 0
      ) {
        return i;
      }
    }
  }

  return -1;
}

/* =========================================================
   LOOP ANALYSIS
   ========================================================= */

function analyzeLoops(
  source: string
): {
  exponent: number;
  notes: string[];
} {

  const notes: string[] = [];

  const loopPattern =
    /\b(for|while)\s*\(/g;

  let maxNestedLoops = 0;

  let match:
    RegExpExecArray | null;

  while (
    (
      match =
        loopPattern.exec(
          source
        )
    ) !== null
  ) {

    const loopStart =
      match.index;

    const bodyStart =
      source.indexOf(
        "{",
        loopStart
      );

    if (
      bodyStart === -1
    ) {
      continue;
    }

    const bodyEnd =
      findMatchingBrace(
        source,
        bodyStart
      );

    if (
      bodyEnd === -1
    ) {
      continue;
    }

    const body =
      source.slice(
        bodyStart,
        bodyEnd + 1
      );

    const nestedLoops =
      countMatches(
        body,
        /\b(for|while)\s*\(/g
      );

    /*
     * The current loop itself is one level.
     */
    const nesting =
      nestedLoops;

    maxNestedLoops =
      Math.max(
        maxNestedLoops,
        nesting
      );
  }

  if (
    maxNestedLoops >= 3
  ) {

    notes.push(
      "Detected three or more levels of loop nesting."
    );

    return {
      exponent: 3,
      notes,
    };
  }

  if (
    maxNestedLoops === 2
  ) {

    notes.push(
      "Detected nested loops."
    );

    return {
      exponent: 2,
      notes,
    };
  }

  if (
    maxNestedLoops === 1
  ) {

    notes.push(
      "Detected a linear loop."
    );

    return {
      exponent: 1,
      notes,
    };
  }

  return {
    exponent: 0,
    notes,
  };
}

/* =========================================================
   SORT / BINARY SEARCH
   ========================================================= */

function hasNLogNOperation(
  source: string
): boolean {

  return (
    /\b(sort|stable_sort)\s*\(/.test(
      source
    ) ||
    /\b(lower_bound|upper_bound|binary_search)\s*\(/.test(
      source
    )
  );
}

/* =========================================================
   HASH STRUCTURES
   ========================================================= */

function hasHashStructure(
  source: string
): boolean {

  return (
    /\bunordered_map\s*</.test(
      source
    ) ||
    /\bunordered_set\s*</.test(
      source
    ) ||
    /\bunordered_multimap\s*</.test(
      source
    ) ||
    /\bunordered_multiset\s*</.test(
      source
    )
  );
}

/* =========================================================
   ORDERED TREE STRUCTURES
   ========================================================= */

function hasOrderedStructure(
  source: string
): boolean {

  return (
    /\bmap\s*</.test(
      source
    ) ||
    /\bset\s*</.test(
      source
    ) ||
    /\bmultimap\s*</.test(
      source
    ) ||
    /\bmultiset\s*</.test(
      source
    )
  );
}

/* =========================================================
   RECURSION
   ========================================================= */

function hasRecursion(
  source: string
): boolean {

  const functionPattern =
    /\b(?:int|long long|double|float|bool|string|void|char|auto)\s+([A-Za-z_][A-Za-z0-9_]*)\s*\([^)]*\)\s*\{/g;

  let match:
    RegExpExecArray | null;

  while (
    (
      match =
        functionPattern.exec(
          source
        )
    ) !== null
  ) {

    const functionName =
      match[1];

    const bodyStart =
      source.indexOf(
        "{",
        match.index
      );

    if (
      bodyStart === -1
    ) {
      continue;
    }

    const bodyEnd =
      findMatchingBrace(
        source,
        bodyStart
      );

    if (
      bodyEnd === -1
    ) {
      continue;
    }

    const body =
      source.slice(
        bodyStart,
        bodyEnd + 1
      );

    const recursiveCall =
      new RegExp(
        `\\b${functionName}\\s*\\(`
      );

    if (
      recursiveCall.test(
        body
      )
    ) {
      return true;
    }
  }

  return false;
}

/* =========================================================
   SPACE ANALYSIS
   ========================================================= */

function analyzeSpace(
  source: string,
  recursive: boolean
): {
  value: string;
  notes: string[];
} {

  const notes: string[] = [];

  const hasDynamicContainer =
    /\b(vector|deque|list|set|map|unordered_map|unordered_set|queue|stack|priority_queue)\s*</.test(
      source
    );

  const hasDynamicArray =
    /\bnew\s+[\w:]+\s*\[/.test(
      source
    );

  if (
    hasDynamicContainer ||
    hasDynamicArray
  ) {

    notes.push(
      "Detected dynamic data structures or dynamic allocation."
    );

    if (
      recursive
    ) {
      notes.push(
        "Recursion may add call-stack space."
      );
    }

    return {
      value:
        "O(n)",

      notes,
    };
  }

  if (
    recursive
  ) {

    notes.push(
      "Detected recursion; stack depth may depend on input size."
    );

    return {
      value:
        "O(n)",

      notes,
    };
  }

  notes.push(
    "No input-sized dynamic storage was detected."
  );

  return {
    value:
      "O(1)",

    notes,
  };
}

/* =========================================================
   MAIN
   ========================================================= */

export function analyzeComplexity(
  source: string,
  target?: {
    time?: string;
    space?: string;
  }
): ComplexityInfo {

  /*
   * Remove ordinary comments before analyzing control flow.
   */
  const cleaned =
    source
      .replace(
        /\/\/.*$/gm,
        ""
      )
      .replace(
        /\/\*[\s\S]*?\*\//g,
        ""
      );

  const notes: string[] = [];

  /* =======================================================
     CONTROL FLOW
     ======================================================= */

  const loopInfo =
    analyzeLoops(
      cleaned
    );

  notes.push(
    ...loopInfo.notes
  );

  /* =======================================================
     OTHER PATTERNS
     ======================================================= */

  const nLogN =
    hasNLogNOperation(
      cleaned
    );

  const hash =
    hasHashStructure(
      cleaned
    );

  const ordered =
    hasOrderedStructure(
      cleaned
    );

  const recursive =
    hasRecursion(
      cleaned
    );

  if (
    nLogN
  ) {
    notes.push(
      "Detected sorting or binary-search style operations."
    );
  }

  if (
    hash
  ) {
    notes.push(
      "Detected hash-based container usage."
    );
  }

  if (
    ordered
  ) {
    notes.push(
      "Detected ordered map/set usage."
    );
  }

  if (
    recursive
  ) {
    notes.push(
      "Detected recursive function calls."
    );
  }

  /* =======================================================
     TIME
     ======================================================= */

  let estimatedTime =
    "O(1)";

  if (
    loopInfo.exponent >= 3
  ) {

    estimatedTime =
      "O(n³)";

  } else if (
    loopInfo.exponent === 2
  ) {

    estimatedTime =
      "O(n²)";

  } else if (
    nLogN
  ) {

    estimatedTime =
      "O(n log n)";

  } else if (
    loopInfo.exponent === 1
  ) {

    estimatedTime =
      "O(n)";

  } else if (
    recursive
  ) {

    estimatedTime =
      "O(n)";
  }

  /*
   * Ordered map/set operations generally imply log n.
   *
   * Do not override a stronger detected loop pattern.
   */
  if (
    loopInfo.exponent === 0 &&
    !nLogN &&
    ordered
  ) {

    estimatedTime =
      "O(log n)";
  }

  /* =======================================================
     SPACE
     ======================================================= */

  const spaceInfo =
    analyzeSpace(
      cleaned,
      recursive
    );

  /* =======================================================
     CONFIDENCE
     ======================================================= */

  let confidence:
    ComplexityEstimate["confidence"] =
    "low";

  if (
    !recursive &&
    loopInfo.exponent <= 2
  ) {
    confidence =
      "medium";
  }

  if (
    !recursive &&
    !nLogN &&
    loopInfo.exponent <= 1
  ) {
    confidence =
      "high";
  }

  if (
    nLogN ||
    ordered ||
    recursive
  ) {
    confidence =
      "medium";
  }

  const estimated:
    ComplexityEstimate = {
    time:
      estimatedTime,

    space:
      spaceInfo.value,

    confidence,

    notes: [
      ...notes,
      ...spaceInfo.notes,
    ],
  };

  /* =======================================================
     TARGET COMPARISON
     ======================================================= */

  let timeMatchesTarget:
    | boolean
    | undefined;

  let spaceMatchesTarget:
    | boolean
    | undefined;

  if (
    target?.time
  ) {

    timeMatchesTarget =
      normalizeComplexity(
        estimated.time
      ) ===
      normalizeComplexity(
        target.time
      );
  }

  if (
    target?.space
  ) {

    spaceMatchesTarget =
      normalizeComplexity(
        estimated.space
      ) ===
      normalizeComplexity(
        target.space
      );
  }

  return {
    estimated,

    target,

    timeMatchesTarget,

    spaceMatchesTarget,
  };
}