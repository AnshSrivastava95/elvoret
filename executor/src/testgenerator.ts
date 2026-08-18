import type {
  ArrayGeneratorSpec,
  GeneratedTestCase,
  MatrixGeneratorSpec,
  NumberRange,
  StringGeneratorSpec,
  TestGeneratorSpec,
} from "./types.js";

/* =========================================================
   SEEDED RANDOM NUMBER GENERATOR
   ========================================================= */

/*
 * Mulberry32 gives us deterministic pseudo-random numbers.
 *
 * Same seed → same generated tests.
 */
function createRandom(
  seed: number
): () => number {

  let state =
    seed >>> 0;

  return () => {

    state +=
      0x6d2b79f5;

    let value =
      state;

    value =
      Math.imul(
        value ^
          (value >>> 15),
        value | 1
      );

    value ^=
      value +
      Math.imul(
        value ^
          (value >>> 7),
        value | 61
      );

    return (
      (
        value ^
        (value >>> 14)
      ) >>>
      0
    ) / 4294967296;
  };
}

/* =========================================================
   BASIC HELPERS
   ========================================================= */

function normalizeRange(
  range: NumberRange
): NumberRange {

  const min =
    Math.min(
      range.min,
      range.max
    );

  const max =
    Math.max(
      range.min,
      range.max
    );

  return {
    min,
    max,
  };
}

function randomInt(
  random: () => number,
  range: NumberRange
): number {

  const normalized =
    normalizeRange(
      range
    );

  return (
    Math.floor(
      random() *
        (
          normalized.max -
          normalized.min +
          1
        )
    ) +
    normalized.min
  );
}

function randomChoice<T>(
  random: () => number,
  values: T[]
): T {

  return values[
    Math.floor(
      random() *
        values.length
    )
  ];
}

function clampCount(
  count: number
): number {

  if (!Number.isFinite(count)) {
    return 1;
  }

  return Math.min(
    Math.max(
      Math.floor(count),
      1
    ),
    100
  );
}

function normalizeSeed(
  seed?: number
): number {

  if (
    typeof seed !== "number" ||
    !Number.isFinite(seed)
  ) {
    return 824913;
  }

  return (
    Math.floor(seed) >>>
    0
  );
}

/* =========================================================
   ARRAY GENERATOR
   ========================================================= */

function generateArrayTests(
  spec: ArrayGeneratorSpec
): GeneratedTestCase[] {

  const count =
    clampCount(
      spec.count
    );

  const seed =
    normalizeSeed(
      spec.seed
    );

  const random =
    createRandom(
      seed
    );

  const tests:
    GeneratedTestCase[] = [];

  const lengthRange =
    normalizeRange(
      spec.length
    );

  const valueRange =
    normalizeRange(
      spec.values
    );

  for (
    let index = 0;
    index < count;
    index++
  ) {

    const testSeed =
      (
        seed +
        index
      ) >>>
      0;

    let length =
      randomInt(
        random,
        lengthRange
      );

    /*
     * Edge-case generation.
     */
    if (
      spec.includeEdgeCases &&
      index === 0
    ) {
      length =
        lengthRange.min;
    }

    if (
      spec.includeEdgeCases &&
      index === 1
    ) {
      length =
        Math.min(
          lengthRange.max,
          Math.max(
            lengthRange.min,
            1
          )
        );
    }

    if (
      spec.includeEdgeCases &&
      index === 2
    ) {
      length =
        lengthRange.max;
    }

    const values: number[] =
      [];

    /*
     * Duplicate-heavy case.
     */
    const duplicateMode =
      spec.includeDuplicates &&
      index % 5 === 0;

    let duplicateValue =
      randomInt(
        random,
        valueRange
      );

    for (
      let i = 0;
      i < length;
      i++
    ) {

      if (
        duplicateMode
      ) {

        if (
          i === 0
        ) {
          duplicateValue =
            randomInt(
              random,
              valueRange
            );
        }

        values.push(
          duplicateValue
        );

      } else {

        values.push(
          randomInt(
            random,
            valueRange
          )
        );
      }
    }

    /*
     * Sorted cases.
     */
    if (
      spec.includeSorted &&
      index % 7 === 3
    ) {
      values.sort(
        (a, b) =>
          a - b
      );
    }

    /*
     * Reverse sorted cases.
     */
    if (
      spec.includeReverseSorted &&
      index % 7 === 4
    ) {
      values.sort(
        (a, b) =>
          b - a
      );
    }

    tests.push({
      input:
        `${length}\n${values.join(" ")}\n`,

      seed:
        testSeed,
    });
  }

  return tests;
}

/* =========================================================
   STRING GENERATOR
   ========================================================= */

function generateStringTests(
  spec: StringGeneratorSpec
): GeneratedTestCase[] {

  const count =
    clampCount(
      spec.count
    );

  const seed =
    normalizeSeed(
      spec.seed
    );

  const random =
    createRandom(
      seed
    );

  const tests:
    GeneratedTestCase[] = [];

  const lengthRange =
    normalizeRange(
      spec.length
    );

  const alphabet =
    spec.alphabet &&
    spec.alphabet.length > 0
      ? spec.alphabet
      : "abcdefghijklmnopqrstuvwxyz";

  for (
    let index = 0;
    index < count;
    index++
  ) {

    const testSeed =
      (
        seed +
        index
      ) >>>
      0;

    let length =
      randomInt(
        random,
        lengthRange
      );

    /*
     * Edge cases.
     */

    if (
      spec.includeEdgeCases &&
      index === 0
    ) {
      length =
        lengthRange.min;
    }

    if (
      spec.includeEdgeCases &&
      index === 1
    ) {
      length =
        Math.min(
          lengthRange.max,
          Math.max(
            lengthRange.min,
            1
          )
        );
    }

    if (
      spec.includeEdgeCases &&
      index === 2
    ) {
      length =
        lengthRange.max;
    }

    let value =
      "";

    for (
      let i = 0;
      i < length;
      i++
    ) {

      value +=
        alphabet[
          Math.floor(
            random() *
              alphabet.length
          )
        ];
    }

    /*
     * Useful simple edge strings.
     */
    if (
      spec.includeEdgeCases &&
      index === 3
    ) {
      value =
        alphabet[0]
          .repeat(
            length
          );
    }

    if (
      spec.includeEdgeCases &&
      index === 4
    ) {

      value =
        alphabet
          .split("")
          .reverse()
          .join("")
          .slice(
            0,
            Math.max(
              length,
              1
            )
          );
    }

    tests.push({
      input:
        `${value}\n`,

      seed:
        testSeed,
    });
  }

  return tests;
}

/* =========================================================
   MATRIX GENERATOR
   ========================================================= */

function generateMatrixTests(
  spec: MatrixGeneratorSpec
): GeneratedTestCase[] {

  const count =
    clampCount(
      spec.count
    );

  const seed =
    normalizeSeed(
      spec.seed
    );

  const random =
    createRandom(
      seed
    );

  const tests:
    GeneratedTestCase[] = [];

  const rowRange =
    normalizeRange(
      spec.rows
    );

  const columnRange =
    normalizeRange(
      spec.columns
    );

  const valueRange =
    normalizeRange(
      spec.values
    );

  for (
    let index = 0;
    index < count;
    index++
  ) {

    const testSeed =
      (
        seed +
        index
      ) >>>
      0;

    let rows =
      randomInt(
        random,
        rowRange
      );

    let columns =
      randomInt(
        random,
        columnRange
      );

    /*
     * Edge cases.
     */

    if (
      spec.includeEdgeCases &&
      index === 0
    ) {
      rows =
        rowRange.min;

      columns =
        columnRange.min;
    }

    if (
      spec.includeEdgeCases &&
      index === 1
    ) {
      rows =
        rowRange.max;

      columns =
        columnRange.max;
    }

    const matrix:
      number[][] = [];

    for (
      let row = 0;
      row < rows;
      row++
    ) {

      const currentRow:
        number[] = [];

      for (
        let column = 0;
        column < columns;
        column++
      ) {

        currentRow.push(
          randomInt(
            random,
            valueRange
          )
        );
      }

      matrix.push(
        currentRow
      );
    }

    const matrixText =
      matrix
        .map(
          (row) =>
            row.join(" ")
        )
        .join("\n");

    tests.push({
      input:
        `${rows} ${columns}\n${matrixText}\n`,

      seed:
        testSeed,
    });
  }

  return tests;
}

/* =========================================================
   MAIN GENERATOR
   ========================================================= */

export function generateTests(
  spec: TestGeneratorSpec
): GeneratedTestCase[] {

  switch (
    spec.type
  ) {

    case "array":
      return generateArrayTests(
        spec
      );

    case "string":
      return generateStringTests(
        spec
      );

    case "matrix":
      return generateMatrixTests(
        spec
      );

    default:
      return [];
  }
}