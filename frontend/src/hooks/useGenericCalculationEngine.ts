// file: frontend/src/hooks/useGenericCalculationEngine.ts
//
// Generic recipe-driven calculation engine.
//
// Template #1 (Assay by Titration) used:
//   + - * / ( )
//   AVERAGE(group.field)
//   STDEV(group.field)
//   SUM(group.field)
//
// Betadex adds:
//   LOG(value)        -> base-10 logarithm, matching Excel LOG(value)
//   LN(value)         -> natural logarithm, matching Excel LN(value)
//   EXP(value)        -> e^value, matching Excel EXP(value)
//   TRUNC(value, digits) -> Excel-style truncation toward zero
//   ^                 -> exponent / power, matching Excel
//   CORREL(group.x, group.y)
//   SLOPE(group.y, group.x) -> Excel-style linear-regression slope
//   INTERCEPT(group.y, group.x) -> Excel-style linear-regression intercept
//   FIRST(group.field) -> first non-empty numeric value from another group
//
// Existing Titration behaviour is intentionally preserved.

import { useMemo } from "react";
import type {
  GenericCalculationTemplate,
  GenericCalculationField,
  CalculationGenericRow,
} from "../preparation_models/drugs/GenericCalculationTemplate";

// ---------------------------------------------------------------------
// Formula evaluation
// ---------------------------------------------------------------------

const SINGLE_AGGREGATE_PATTERN =
  /^(AVERAGE|STDEV|SUM)\(([A-Za-z0-9_]+)\.([A-Za-z0-9_]+)\)$/i;

const CORREL_PATTERN =
  /^CORREL\(\s*([A-Za-z0-9_]+)\.([A-Za-z0-9_]+)\s*,\s*([A-Za-z0-9_]+)\.([A-Za-z0-9_]+)\s*\)$/i;

const REGRESSION_PATTERN =
  /^(SLOPE|INTERCEPT)\(\s*([A-Za-z0-9_]+)\.([A-Za-z0-9_]+)\s*,\s*([A-Za-z0-9_]+)\.([A-Za-z0-9_]+)\s*\)$/i;

const FIRST_PATTERN =
  /FIRST\(\s*([A-Za-z0-9_]+)\.([A-Za-z0-9_]+)\s*\)/gi;

function toNumber(value: string | null | undefined): number | null {
  if (value === null || value === undefined || value === "") return null;

  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function average(nums: number[]): number | null {
  if (nums.length === 0) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

// Excel STDEV / STDEV.S behaviour: sample standard deviation (n - 1).
function stdev(nums: number[]): number | null {
  if (nums.length < 2) return null;

  const avg = average(nums)!;
  const variance =
    nums.reduce((sum, n) => sum + (n - avg) ** 2, 0) / (nums.length - 1);

  return Math.sqrt(variance);
}

// Pearson correlation, matching Excel CORREL.
function correl(xs: number[], ys: number[]): number | null {
  if (xs.length !== ys.length || xs.length < 2) return null;

  const xAvg = average(xs);
  const yAvg = average(ys);

  if (xAvg === null || yAvg === null) return null;

  let numerator = 0;
  let xSq = 0;
  let ySq = 0;

  for (let i = 0; i < xs.length; i++) {
    const dx = xs[i] - xAvg;
    const dy = ys[i] - yAvg;

    numerator += dx * dy;
    xSq += dx * dx;
    ySq += dy * dy;
  }

  const denominator = Math.sqrt(xSq * ySq);
  if (denominator === 0) return null;

  const result = numerator / denominator;
  return Number.isFinite(result) ? result : null;
}


function regressionSlope(ys: number[], xs: number[]): number | null {
  if (xs.length !== ys.length || xs.length < 2) return null;

  const xAvg = average(xs);
  const yAvg = average(ys);

  if (xAvg === null || yAvg === null) return null;

  let numerator = 0;
  let denominator = 0;

  for (let i = 0; i < xs.length; i++) {
    const dx = xs[i] - xAvg;
    numerator += dx * (ys[i] - yAvg);
    denominator += dx * dx;
  }

  if (denominator === 0) return null;

  const result = numerator / denominator;
  return Number.isFinite(result) ? result : null;
}

function regressionIntercept(ys: number[], xs: number[]): number | null {
  const slope = regressionSlope(ys, xs);
  const xAvg = average(xs);
  const yAvg = average(ys);

  if (slope === null || xAvg === null || yAvg === null) return null;

  const result = yAvg - slope * xAvg;
  return Number.isFinite(result) ? result : null;
}

/**
 * Replaces FIRST(group.field) references with the first non-empty numeric
 * value found in that group. This is what Betadex needs when a Sample
 * Analysis row depends on values entered in the separate Standard table.
 *
 * Example:
 *   sampleConc / FIRST(standard.standardConc)
 */
function resolveFirstReferences(
  formula: string,
  groupValues: Record<string, Record<string, string | null>[]>,
): string | null {
  let failed = false;

  const resolved = formula.replace(
    FIRST_PATTERN,
    (_match, groupName: string, fieldName: string) => {
      const rows = groupValues[groupName] || [];

      for (const row of rows) {
        const value = toNumber(row?.[fieldName]);

        if (value !== null) {
          return `(${value})`;
        }
      }

      failed = true;
      return "0";
    },
  );

  return failed ? null : resolved;
}

/**
 * Evaluates a normal expression using named fields.
 *
 * Supported:
 *   concentration * 100
 *   sampleConc / standardConc
 *   LOG(area)
 *   EXP(logX)
 *   10 ^ x
 *   LOG(area) / LOG(concentration)
 *   sampleConc / FIRST(standard.standardConc)
 *
 * Important:
 * We only reject a null field when THAT FIELD is actually referenced by
 * the formula. An unrelated empty field no longer prevents calculation.
 */
function evaluateExpression(
  formula: string,
  scope: Record<string, number | null>,
  groupValues: Record<string, Record<string, string | null>[]>,
): number | null {
  const withFirstReferences = resolveFirstReferences(formula, groupValues);
  if (withFirstReferences === null) return null;

  let expr = withFirstReferences.trim();

  // Replace longer field names first so "area" does not partially replace
  // something such as "averageArea".
  const names = Object.keys(scope).sort((a, b) => b.length - a.length);

  for (const name of names) {
    const re = new RegExp(`\\b${name}\\b`, "g");

    // Ignore fields that are not referenced by this formula.
    if (!re.test(expr)) continue;

    const value = scope[name];
    if (value === null) return null;

    // RegExp with /g keeps state, so reset before replace.
    re.lastIndex = 0;
    expr = expr.replace(re, `(${value})`);
  }

  // Excel's ^ is exponentiation. JavaScript uses **.
  expr = expr.replace(/\^/g, "**");

  // After field substitution, only numeric arithmetic plus the explicitly
  // supported function names are allowed.
  const identifiers = expr.match(/[A-Za-z_][A-Za-z0-9_]*/g) || [];
  const allowedFunctions = new Set(["LOG", "LN", "EXP", "POW", "TRUNC"]);

  for (const identifier of identifiers) {
    if (!allowedFunctions.has(identifier.toUpperCase())) {
      return null;
    }
  }

  // No quotes, arrays, object access, semicolons, assignment, etc.
  if (!/^[0-9A-Za-z_+\-*/().,\s]+$/.test(expr)) {
    return null;
  }

  try {
    const LOG = (value: number) =>
      value > 0 && Number.isFinite(value) ? Math.log10(value) : NaN;

    const LN = (value: number) =>
      value > 0 && Number.isFinite(value) ? Math.log(value) : NaN;

    const EXP = (value: number) =>
      Number.isFinite(value) ? Math.exp(value) : NaN;

    const POW = (base: number, exponent: number) =>
      Number.isFinite(base) && Number.isFinite(exponent)
        ? Math.pow(base, exponent)
        : NaN;

    // Excel TRUNC(number, [num_digits]):
    // removes fractional digits without rounding and truncates toward zero.
    // Negative num_digits are also supported.
    const TRUNC = (value: number, digits: number = 0) => {
      if (!Number.isFinite(value) || !Number.isFinite(digits)) return NaN;

      const normalizedDigits = Math.trunc(digits);
      const factor = Math.pow(10, normalizedDigits);

      if (!Number.isFinite(factor) || factor == 0) return NaN;

      return Math.trunc(value * factor) / factor;
    };

    // eslint-disable-next-line no-new-func
    const fn = Function(
      "LOG",
      "LN",
      "EXP",
      "POW",
      "TRUNC",
      `"use strict"; return (${expr});`,
    );

    const result = fn(LOG, LN, EXP, POW, TRUNC);
    return typeof result === "number" && Number.isFinite(result)
      ? result
      : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------
// Aggregate helpers
// ---------------------------------------------------------------------

function computeSingleAggregate(
  fn: string,
  groupName: string,
  fieldName: string,
  groupValues: Record<string, Record<string, string | null>[]>,
): number | null {
  const rows = groupValues[groupName] || [];

  const nums = rows
    .map((row) => toNumber(row[fieldName]))
    .filter((n): n is number => n !== null);

  if (nums.length === 0) return null;

  switch (fn.toUpperCase()) {
    case "AVERAGE":
      return average(nums);
    case "STDEV":
      return stdev(nums);
    case "SUM":
      return nums.reduce((total, n) => total + n, 0);
    default:
      return null;
  }
}

function computeCorrelation(
  groupNameX: string,
  fieldNameX: string,
  groupNameY: string,
  fieldNameY: string,
  groupValues: Record<string, Record<string, string | null>[]>,
): number | null {
  // Betadex uses values from the same linearity table. Supporting two group
  // names costs nothing and keeps the recipe format reusable.
  const rowsX = groupValues[groupNameX] || [];
  const rowsY = groupValues[groupNameY] || [];

  const pairCount = Math.min(rowsX.length, rowsY.length);
  const xs: number[] = [];
  const ys: number[] = [];

  for (let i = 0; i < pairCount; i++) {
    const x = toNumber(rowsX[i]?.[fieldNameX]);
    const y = toNumber(rowsY[i]?.[fieldNameY]);

    // Excel CORREL requires paired observations. Skip an incomplete pair.
    if (x === null || y === null) continue;

    xs.push(x);
    ys.push(y);
  }

  return correl(xs, ys);
}


function computeRegression(
  fn: string,
  groupNameY: string,
  fieldNameY: string,
  groupNameX: string,
  fieldNameX: string,
  groupValues: Record<string, Record<string, string | null>[]>,
): number | null {
  const rowsY = groupValues[groupNameY] || [];
  const rowsX = groupValues[groupNameX] || [];

  const pairCount = Math.min(rowsY.length, rowsX.length);
  const ys: number[] = [];
  const xs: number[] = [];

  for (let i = 0; i < pairCount; i++) {
    const y = toNumber(rowsY[i]?.[fieldNameY]);
    const x = toNumber(rowsX[i]?.[fieldNameX]);

    if (x === null || y === null) continue;

    ys.push(y);
    xs.push(x);
  }

  return fn.toUpperCase() === "SLOPE"
    ? regressionSlope(ys, xs)
    : regressionIntercept(ys, xs);
}

// ---------------------------------------------------------------------
// Engine
// ---------------------------------------------------------------------

export interface ComputedCalculationResult {
  /** Computed top-level field values, keyed by field name */
  values: Record<string, string | null>;

  /** Computed per-row group values, keyed by group name then row index */
  groupValues: Record<string, Record<string, string | null>[]>;
}

function setComputedValue(
  target: Record<string, string | null>,
  fieldName: string,
  result: number | null,
): boolean {
  // IMPORTANT:
  // Keep full precision internally.
  // Display formatting/truncation is handled by GenericCalculationDetail.
  //
  // This prevents chained calculations from using already-truncated values.
  const newValue =
    result !== null && Number.isFinite(result)
      ? String(result)
      : null;

  if (target[fieldName] === newValue) {
    return false;
  }

  target[fieldName] = newValue;
  return true;
}

function computeOnce(
  template: GenericCalculationTemplate,
  values: Record<string, string | null>,
  groupValues: Record<string, Record<string, string | null>[]>,
): boolean {
  let madeProgress = false;

  for (const field of template.fields) {
    if (field.source !== "computed" || !field.formula) continue;

    const formula = field.formula.trim();

    // ---------------------------------------------------------------
    // Top-level AVERAGE(group.field) / STDEV(group.field) / SUM(group.field)
    // ---------------------------------------------------------------
    const aggregateMatch = formula.match(SINGLE_AGGREGATE_PATTERN);

    if (aggregateMatch && !field.group) {
      const [, fn, groupName, fieldName] = aggregateMatch;

      const result = computeSingleAggregate(
        fn,
        groupName,
        fieldName,
        groupValues,
      );

      if (result !== null) {
        madeProgress =
          setComputedValue(values, field.name, result) || madeProgress;
      }

      continue;
    }

    // ---------------------------------------------------------------
    // Top-level CORREL(group.x, group.y)
    // ---------------------------------------------------------------
    const correlationMatch = formula.match(CORREL_PATTERN);

    if (correlationMatch && !field.group) {
      const [, groupX, fieldX, groupY, fieldY] = correlationMatch;

      const result = computeCorrelation(
        groupX,
        fieldX,
        groupY,
        fieldY,
        groupValues,
      );

      if (result !== null) {
        madeProgress =
          setComputedValue(values, field.name, result) || madeProgress;
      }

      continue;
    }

    // ---------------------------------------------------------------
    // Top-level SLOPE(group.y, group.x) / INTERCEPT(group.y, group.x)
    // ---------------------------------------------------------------
    const regressionMatch = formula.match(REGRESSION_PATTERN);

    if (regressionMatch && !field.group) {
      const [, fn, groupY, fieldY, groupX, fieldX] = regressionMatch;

      const result = computeRegression(
        fn,
        groupY,
        fieldY,
        groupX,
        fieldX,
        groupValues,
      );

      if (result !== null) {
        madeProgress =
          setComputedValue(values, field.name, result) || madeProgress;
      }

      continue;
    }

    // ---------------------------------------------------------------
    // Computed field inside a repeatable group
    // ---------------------------------------------------------------
    if (field.group) {
      const rows = groupValues[field.group] || [];

      rows.forEach((row) => {
        const scope: Record<string, number | null> = {};

        // Same-row values take priority.
        for (const key of Object.keys(row)) {
          scope[key] = toNumber(row[key]);
        }

        // Top-level values are available to every group formula.
        for (const key of Object.keys(values)) {
          if (!(key in scope)) {
            scope[key] = toNumber(values[key]);
          }
        }

        const result = evaluateExpression(formula, scope, groupValues);

        madeProgress =
          setComputedValue(row, field.name, result) || madeProgress;
      });

      continue;
    }

    // ---------------------------------------------------------------
    // Normal top-level computed field
    // ---------------------------------------------------------------
    const scope: Record<string, number | null> = {};

    for (const key of Object.keys(values)) {
      scope[key] = toNumber(values[key]);
    }

    const result = evaluateExpression(formula, scope, groupValues);

    madeProgress =
      setComputedValue(values, field.name, result) || madeProgress;
  }

  return madeProgress;
}

/**
 * Runs one generic calculation row against its template.
 * Everything is evaluated on copies; caller state is never mutated.
 */
export function computeGenericCalculation(
  template: GenericCalculationTemplate,
  row: CalculationGenericRow,
): ComputedCalculationResult {
  const values: Record<string, string | null> = { ...row.values };

  const groupValues: Record<string, Record<string, string | null>[]> = {};

  for (const groupName of Object.keys(row.groupValues || {})) {
    groupValues[groupName] = (row.groupValues[groupName] || []).map((r) => ({
      ...r,
    }));
  }

  // Betadex has longer dependency chains:
  // area -> LOG(area) -> ln(x) -> EXP(ln(x)) -> 10^x -> final result.
  // Keep retrying until stable.
  const MAX_PASSES = 20;

  for (let pass = 0; pass < MAX_PASSES; pass++) {
    const progressed = computeOnce(template, values, groupValues);

    if (!progressed) break;
  }

  return { values, groupValues };
}

export function useGenericCalculationEngine(
  template: GenericCalculationTemplate | null,
  row: CalculationGenericRow | null,
): ComputedCalculationResult {
  return useMemo(() => {
    if (!template || !row) {
      return { values: {}, groupValues: {} };
    }

    return computeGenericCalculation(template, row);
  }, [template, row]);
}

export function getFieldsForGroup(
  template: GenericCalculationTemplate,
  groupName: string,
): GenericCalculationField[] {
  return template.fields.filter((field) => field.group === groupName);
}
