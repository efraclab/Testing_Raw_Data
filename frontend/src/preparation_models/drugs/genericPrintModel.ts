// file: frontend/src/preparation_models/drugs/genericPrintModel.ts
//
// Turns "a recipe + one saved generic calculation" into exactly what the
// printed report shows: top-level rows, one table per group, the "Result"
// naming, and the limit / PASS-FAIL line. Pure functions, no React, so it can
// be tested on its own.
//
// Why this exists: saved generic calculations store group rows nested
// (groupValues.replicate[0].result). The old report flattened them into keys
// like "replicate 1.result", which never match recipe field names, so grouped
// values (inputs included) were dropped whenever recipe metadata was present.

import { computeGenericCalculation } from "../../hooks/useGenericCalculationEngine";
import type {
  CalculationGenericRow,
  GenericCalculationField,
  GenericCalculationTemplate,
} from "./GenericCalculationTemplate";

export interface GenericPrintTopRow {
  label: string;
  value: string;
}
export interface GenericPrintTable {
  name: string;
  label: string;
  headers: string[];
  rows: string[][];
}
export interface GenericPrintLimit {
  /** Name of the checked field as printed, e.g. "Result" or "Coefficient of Correlation (R)". */
  label: string;
  display: string;
  verdict: "PASS" | "FAIL" | null;
}
export interface GenericPrintModel {
  top: GenericPrintTopRow[];
  tables: GenericPrintTable[];
  limit: GenericPrintLimit | null;
}

// Labels that must differ from the automatic "camelCase -> Title Case" label.
const TOP_LEVEL_LABEL_OVERRIDES: Record<string, Record<string, string>> = {
  logarithmic_calculation_4_point: { unknownReading: "Sample Reading" },
};

const isEmpty = (v: unknown) => v === null || v === undefined || v === "";

// Same wording rule the report has always used for top-level rows.
const prettifyKey = (key: string) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim()
    .replace(/(\d+)/g, " $1")
    .replace(/\s+/g, " ")
    .replace(/\bOf\b/g, "of");

// Same truncation the calculation screen uses (4 decimals, toward zero).
const truncate4 = (value: unknown): number | null => {
  if (isEmpty(value)) return null;
  const num = Number(value);
  if (!Number.isFinite(num)) return null;
  return Math.trunc((num + Number.EPSILON * Math.sign(num)) * 10000) / 10000;
};

// Result values print exactly as the calculation screen shows them:
// truncated (not rounded) to 4 decimal places.
const formatResult = (value: unknown): string => {
  if (isEmpty(value)) return "";
  const n = truncate4(value);
  return n === null ? String(value) : n.toFixed(4);
};

const toLimit = (value: unknown): number | null => {
  if (isEmpty(value)) return null;
  const n = Number(String(value).trim());
  return Number.isFinite(n) ? n : null;
};

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Decide which recipe fields print. See GenericCalculationField.printInReport. */
function getVisibleFields(
  recipe: GenericCalculationTemplate,
  isResultField: (f: GenericCalculationField) => boolean,
): Set<GenericCalculationField> {
  const fields = recipe.fields || [];
  const computed = fields.filter((f) => f.source === "computed" && f.formula);

  const referencedByOtherComputed = (name: string) => {
    const re = new RegExp(`\\b${escapeRe(name)}\\b`);
    return computed.some((other) => other.name !== name && re.test(other.formula!));
  };

  // group.field pairs that feed an AVERAGE / STDEV / SUM
  const aggregateRe = /(AVERAGE|STDEV|SUM)\(\s*([A-Za-z0-9_]+)\.([A-Za-z0-9_]+)\s*\)/gi;
  const aggregateInputs = new Set<string>();
  const aggregateOutputs = new Set<string>();
  computed.forEach((f) => {
    const matches = [...f.formula!.matchAll(aggregateRe)];
    matches.forEach((m) => aggregateInputs.add(`${m[2]}.${m[3]}`));
    if (matches.length > 0 && matches[0][0].trim() === f.formula!.trim()) {
      aggregateOutputs.add(f.name + "|" + (f.group || ""));
    }
  });

  const visible = new Set<GenericCalculationField>();
  for (const f of fields) {
    if (f.printInReport === false) continue;
    if (f.source !== "computed") {
      visible.add(f);
      continue;
    }
    if (f.printInReport === true) {
      visible.add(f);
      continue;
    }
    if (f.group) {
      // Computed columns inside a group table are what the analyst saw.
      visible.add(f);
      continue;
    }
    // A result is always printed, even if another computed field is built on it
    // (e.g. Result (%) feeding Result (ppm)).
    if (isResultField(f)) {
      visible.add(f);
      continue;
    }
    const isTerminal = !referencedByOtherComputed(f.name);
    const isStatistic = aggregateOutputs.has(f.name + "|");
    if (isTerminal || isStatistic) visible.add(f);
  }
  return visible;
}

function unitSuffix(field: GenericCalculationField | undefined): string {
  return field?.unit ? ` ${field.unit}` : "";
}

/**
 * Build the printable model for one generic calculation.
 * `recipe` may be null when no recipe could be found; the model then falls
 * back to printing every saved value with automatic labels.
 */
export function buildGenericPrintModel(
  recipe: GenericCalculationTemplate | null,
  calcData: any,
): GenericPrintModel {
  const savedValues: Record<string, any> = calcData?.values || {};
  const savedGroups: Record<string, Record<string, any>[]> = calcData?.groupValues || {};
  const templateId: string = calcData?.templateId || recipe?.templateId || "";
  const overrides = TOP_LEVEL_LABEL_OVERRIDES[templateId] || {};

  // ---- recipe-less fallback ------------------------------------------------
  if (!recipe) {
    const top: GenericPrintTopRow[] = Object.entries(savedValues)
      .filter(([k, v]) => !isEmpty(v) && !["limitLower", "limitUpper", "limitFieldName"].includes(k))
      .map(([k, v]) => ({ label: overrides[k] || prettifyKey(k), value: String(v) }));
    const tables: GenericPrintTable[] = Object.entries(savedGroups).map(([name, rows]) => {
      const cols = Array.from(new Set((rows || []).flatMap((r) => Object.keys(r || {}))));
      return {
        name,
        label: prettifyKey(name),
        headers: cols.map(prettifyKey),
        rows: (rows || [])
          .map((r) => cols.map((c) => (isEmpty(r?.[c]) ? "" : String(r[c]))))
          .filter((cells) => cells.some((c) => c !== "")),
      };
    });
    return { top, tables: tables.filter((t) => t.rows.length > 0), limit: null };
  }

  // ---- recompute only to fill blanks --------------------------------------
  // Stored values always win. The engine is used only when a computed value
  // was never saved, so the report is not left empty.
  const rowForEngine: CalculationGenericRow = {
    id: 0,
    label: "",
    templateId,
    selectedStandardPreparationLabel: null,
    selectedSamplePreparationLabel: null,
    values: { ...savedValues },
    groupValues: JSON.parse(JSON.stringify(savedGroups)),
  };
  let recomputed: ReturnType<typeof computeGenericCalculation> | null = null;
  try {
    recomputed = computeGenericCalculation(recipe, rowForEngine);
  } catch {
    recomputed = null;
  }
  const valueOf = (name: string) =>
    !isEmpty(savedValues[name]) ? savedValues[name] : recomputed?.values?.[name];
  const cellOf = (group: string, rowIndex: number, name: string) => {
    const stored = savedGroups[group]?.[rowIndex]?.[name];
    return !isEmpty(stored) ? stored : recomputed?.groupValues?.[group]?.[rowIndex]?.[name];
  };

  // ---- which fields are "the Result" --------------------------------------
  const designated: string | null =
    (typeof savedValues.limitFieldName === "string" && savedValues.limitFieldName) ||
    recipe.limitField ||
    null;
  // Only result-like names print as "Result". A field the analyst chose for the
  // limits (for example a correlation coefficient) keeps its own name.
  const isResultField = (f: GenericCalculationField) =>
    f.source === "computed" && /^result/i.test(f.name);

  // The field the limits apply to prints like a result (4 decimals, truncated)
  // so the printed value always agrees with the PASS / FAIL beside it.
  const printsAsResult = (f: GenericCalculationField) =>
    isResultField(f) || (f.source === "computed" && f.name === designated);

  // Every calculated number prints as the calculation screen shows it
  // (4 decimals, truncated), so a printed value never differs from what the
  // analyst and reviewer saw. Inputs print exactly as entered.
  const isCalculatedNumber = (f: GenericCalculationField) =>
    f.source === "computed" && f.type !== "text";

  const visible = getVisibleFields(recipe, printsAsResult);
  const topFields = recipe.fields.filter((f) => !f.group && visible.has(f));

  // Within one table (or the top level) several result-like fields must stay
  // distinguishable. Different units are enough; otherwise add the recipe label.
  const resultLabelFor = (f: GenericCalculationField, scopeFields: GenericCalculationField[]) => {
    const peers = scopeFields.filter(isResultField);
    if (peers.length <= 1) return "Result";
    const units = peers.map((p) => p.unit || "");
    const unitsDistinct = units.every((u) => u !== "") && new Set(units).size === units.length;
    return unitsDistinct ? "Result" : `Result (${f.label || prettifyKey(f.name)})`;
  };

  // ---- top-level rows ------------------------------------------------------
  const top: GenericPrintTopRow[] = [];
  for (const f of topFields) {
    const v = valueOf(f.name);
    if (isEmpty(v)) continue;
    const resultRow = isResultField(f);
    top.push({
      label: resultRow ? resultLabelFor(f, topFields) : overrides[f.name] || prettifyKey(f.name),
      value: isCalculatedNumber(f)
        ? `${formatResult(v)}${printsAsResult(f) ? unitSuffix(f) : ""}`
        : String(v),
    });
  }

  // ---- one table per group -------------------------------------------------
  const tables: GenericPrintTable[] = [];
  for (const group of recipe.groups || []) {
    const cols = recipe.fields.filter((f) => f.group === group.name && visible.has(f));
    const rowCount = Math.max(
      savedGroups[group.name]?.length || 0,
      recomputed?.groupValues?.[group.name]?.length || 0,
    );
    const rows: string[][] = [];
    for (let i = 0; i < rowCount; i++) {
      const cells = cols.map((c) => {
        const v = cellOf(group.name, i, c.name);
        if (isEmpty(v)) return "";
        return isCalculatedNumber(c) ? formatResult(v) : String(v);
      });
      if (cells.some((c) => c !== "")) rows.push(cells);
    }
    if (rows.length === 0) continue;

    // Drop columns that are empty in every printed row.
    const keep = cols.map((_, ci) => rows.some((r) => r[ci] !== ""));
    tables.push({
      name: group.name,
      label: group.label || prettifyKey(group.name),
      headers: cols
        .map((c) => {
          if (isResultField(c)) {
            const base = resultLabelFor(c, cols);
            // Several results told apart by unit: show the unit in the header.
            const needsUnit = base === "Result" && !!c.unit && cols.filter(isResultField).length > 1;
            return needsUnit ? `${base} (${c.unit})` : base;
          }
          const label = c.label || prettifyKey(c.name);
          // Don't repeat a unit the label already shows, e.g. "% Content" + "%".
          const labelHasUnit =
            /\([^)]*\)\s*$/.test(label) ||
            (!!c.unit && label.toLowerCase().includes(c.unit.toLowerCase()));
          return c.unit && !labelHasUnit ? `${label} (${c.unit})` : label;
        })
        .filter((_, ci) => keep[ci]),
      rows: rows.map((r) => r.filter((_, ci) => keep[ci])),
    });
  }

  // ---- limits and PASS / FAIL ---------------------------------------------
  let limit: GenericPrintLimit | null = null;
  const lower = toLimit(savedValues.limitLower);
  const upper = toLimit(savedValues.limitUpper);
  if (lower !== null || upper !== null) {
    // Which field is checked: the saved one, else the recipe's, else the only result-like field.
    const resultFields = recipe.fields.filter(isResultField);
    const checkedName =
      designated ||
      (new Set(resultFields.map((f) => f.name)).size === 1 ? resultFields[0].name : null);
    const checkedField = recipe.fields.find((f) => f.name === checkedName && f.source === "computed");
    const checkedLabel = checkedField
      ? isResultField(checkedField)
        ? "Result"
        : (checkedField.label || prettifyKey(checkedField.name)).replace(/\s*\([^)]*\)\s*$/, "") || prettifyKey(checkedField.name)
      : "Result";

    const display =
      lower !== null && upper !== null
        ? `${lower} ≤ ${checkedLabel} ≤ ${upper}`
        : lower !== null
          ? `${lower} ≤ ${checkedLabel}`
          : `${checkedLabel} ≤ ${upper}`;

    let verdict: "PASS" | "FAIL" | null = null;
    const invalid = lower !== null && upper !== null && lower > upper;

    if (!invalid && checkedField) {
      const raw: unknown[] = checkedField.group
        ? Array.from({ length: Math.max(savedGroups[checkedField.group]?.length || 0, recomputed?.groupValues?.[checkedField.group]?.length || 0) }, (_, i) =>
            cellOf(checkedField.group!, i, checkedField.name),
          )
        : [valueOf(checkedField.name)];
      const nums = raw.map(truncate4).filter((n): n is number => n !== null);
      if (nums.length > 0) {
        const failed = nums.some(
          (n) => (lower !== null && n < lower) || (upper !== null && n > upper),
        );
        verdict = failed ? "FAIL" : "PASS";
      }
    }
    limit = { label: checkedLabel, display, verdict };
  }

  return { top, tables, limit };
}

/**
 * Find a recipe for a saved calculation. Prefers one that arrived with the
 * API response, otherwise looks it up in the templates the app already fetched.
 */
export function resolveRecipe(
  templateId: string | undefined,
  inlineCandidates: unknown[],
  fetchedTemplates: Record<string, GenericCalculationTemplate> | undefined,
): GenericCalculationTemplate | null {
  const asRecipe = (v: unknown): GenericCalculationTemplate | null => {
    let value: any = v;
    if (typeof value === "string") {
      try {
        value = JSON.parse(value);
      } catch {
        return null;
      }
    }
    return value && typeof value === "object" && Array.isArray(value.fields)
      ? (value as GenericCalculationTemplate)
      : null;
  };
  for (const c of inlineCandidates) {
    const r = asRecipe(c);
    if (r && (!templateId || !r.templateId || r.templateId === templateId)) return r;
  }
  if (templateId && fetchedTemplates) {
    const found = Object.values(fetchedTemplates).find((t) => t.templateId === templateId);
    if (found) return found;
  }
  return null;
}