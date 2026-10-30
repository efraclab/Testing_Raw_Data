// file: frontend/src/components/sub-components/drugs/GenericCalculationDetail.tsx
//
// This is "the actual form". It reads a recipe (GenericCalculationTemplate)
// and one calculation entry (CalculationGenericRow), and draws:
//   - the top-level input boxes (e.g. molarity, LOD)
//   - a table for each group (e.g. the 3 standardization rows, or the
//     sample replicate rows - with an Add/Remove row button if the group
//     allows it)
//   - the computed results, shown read-only, recalculated live as the
//     analyst types (using useGenericCalculationEngine)
//
// This file does not know anything about Titration specifically - it just
// renders whatever the recipe describes. Titration, DCP, Ketotifen, etc.
// all use this exact same file.

import React, { useState } from "react";
import type { WorksheetStandard } from "../../../models/WorksheetStandard";

// Different templates use different preparation models under the hood
// (e.g. Titration uses SamplePreparationTitration, not the plain
// SamplePreparation others use). This component only ever needs the id
// and label to populate a dropdown, so it accepts this minimal shared
// shape instead of one specific preparation type - any preparation model
// in the project satisfies this automatically, no changes needed there.
export interface LabeledPreparation {
  id: number;
  label: string;
}
import type {
  GenericCalculationTemplate,
  CalculationGenericRow,
} from "../../../preparation_models/drugs/GenericCalculationTemplate";
import { useGenericCalculationEngine } from "../../../hooks/useGenericCalculationEngine";
import { Plus, Trash2 } from "../../shared/WorksheetUiHelpers";

const truncateDisplayTo4Decimals = (
  value: string | number | null | undefined,
): string => {
  if (value === null || value === undefined || value === "") return "";

  const num = Number(value);
  if (!Number.isFinite(num)) return String(value);

  const factor = 10000;

  // Truncate toward zero, do not round.
  const truncated =
    Math.trunc((num + Number.EPSILON * Math.sign(num)) * factor) / factor;

  return truncated.toFixed(4);
};

type LimitVerdict = "pass" | "fail" | "none";

const parseLimit = (value: unknown): number | null => {
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  if (text === "") return null;
  const n = Number(text);
  return Number.isFinite(n) ? n : null;
};

// Compares the value exactly as shown on screen (truncated to 4 decimals),
// so the verdict always matches what the analyst and reviewer can see.
// Limits are inclusive. Either limit may be left empty (e.g. NLT / NMT only).
const evaluateLimit = (
  rawValue: string | number | null | undefined,
  lower: number | null,
  upper: number | null,
): LimitVerdict => {
  if (lower === null && upper === null) return "none";
  if (lower !== null && upper !== null && lower > upper) return "none";

  const shown = truncateDisplayTo4Decimals(rawValue);
  if (shown === "") return "none";

  const value = Number(shown);
  if (!Number.isFinite(value)) return "none";

  if (lower !== null && value < lower) return "fail";
  if (upper !== null && value > upper) return "fail";
  return "pass";
};

const VerdictBadge: React.FC<{ verdict: LimitVerdict }> = ({ verdict }) => {
  if (verdict === "none") {
    return <span className="text-xs text-gray-400">-</span>;
  }
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-md text-xs font-semibold ${
        verdict === "pass"
          ? "bg-emerald-100 text-emerald-800"
          : "bg-red-100 text-red-700"
      }`}
    >
      {verdict === "pass" ? "PASS" : "FAIL"}
    </span>
  );
};

interface GenericCalculationDetailProps {
  parameterId: number;
  template: GenericCalculationTemplate;
  row: CalculationGenericRow;
  standardPreparations: LabeledPreparation[];
  samplePreparations: LabeledPreparation[];
  assignedStandards: WorksheetStandard[];
  shouldDisableContent: boolean;
  isFullyLocked: boolean;
  onFieldChange: (fieldName: string, value: string | null) => void;
  onGroupFieldChange: (
    groupName: string,
    rowIndex: number,
    fieldName: string,
    value: string | null,
  ) => void;
  onAddGroupRow: (groupName: string) => void;
  onRemoveGroupRow: (groupName: string, rowIndex: number) => void;
  onSelectStandardPreparation: (label: string | null) => void;
  onSelectSamplePreparation: (label: string | null) => void;
  onCalculatedResults: (
    values: Record<string, string | null>,
    groupValues: Record<string, Record<string, string | null>[]>,
  ) => void;
  onRemove: () => void;
}

const GenericCalculationDetail: React.FC<GenericCalculationDetailProps> = ({
  template,
  row,
  standardPreparations,
  samplePreparations,
  shouldDisableContent,
  isFullyLocked,
  onFieldChange,
  onGroupFieldChange,
  onAddGroupRow,
  onRemoveGroupRow,
  onSelectStandardPreparation,
  onSelectSamplePreparation,
  onCalculatedResults,
  onRemove,
}) => {
  const disabled = shouldDisableContent || isFullyLocked;

  // The engine still evaluates the current row on render, but calculated
  // values are only exposed after the analyst explicitly clicks Calculate Result.
  // Fixed groups (e.g. Standardization, count: 3) must always show their rows,
  // even when the saved row has empty groupValues. Pad missing rows with {} so
  // both the form and the calculation engine see the full set of rows.
  const paddedRow = React.useMemo(() => {
    const groupValues = { ...(row.groupValues || {}) };
    template.groups.forEach((g) => {
      const min = g.repeat === "fixed" ? g.count ?? 1 : g.minRows ?? g.count ?? 1;
      const saved = groupValues[g.name] || [];
      if (saved.length < min) {
        groupValues[g.name] = [
          ...saved,
          ...Array.from({ length: min - saved.length }, () => ({})),
        ];
      }
    });
    return { ...row, groupValues };
  }, [row, template]);

  const computed = useGenericCalculationEngine(template, paddedRow);

  const hasSavedCalculatedResults = React.useMemo(() => {
    const topLevelHasComputed = template.fields.some(
      (field) =>
        field.source === "computed" &&
        !field.group &&
        row.values?.[field.name] !== null &&
        row.values?.[field.name] !== undefined &&
        row.values?.[field.name] !== "",
    );

    const groupHasComputed = template.fields.some((field) => {
      if (field.source !== "computed" || !field.group) return false;
      return (row.groupValues?.[field.group] || []).some(
        (groupRow) =>
          groupRow?.[field.name] !== null &&
          groupRow?.[field.name] !== undefined &&
          groupRow?.[field.name] !== "",
      );
    });

    return topLevelHasComputed || groupHasComputed;
  }, [template, row.values, row.groupValues]);

  const [showCalculatedResults, setShowCalculatedResults] =
    useState(hasSavedCalculatedResults);

  React.useEffect(() => {
    if (hasSavedCalculatedResults) {
      setShowCalculatedResults(true);
    }
  }, [hasSavedCalculatedResults]);

  const topLevelFields = template.fields.filter((f) => !f.group);
  const groupsThatLinkToStandard = template.groups.some(
    (g) => g.linksToStandardPreparation,
  );
  const groupsThatLinkToSample = template.groups.some(
    (g) => g.linksToSamplePreparation,
  );

  // ---- Acceptance limits ------------------------------------------------
  // Limits are stored in row.values (keys: limitLower / limitUpper), so they
  // are saved and restored with the calculation with no other plumbing.
  // Limits are available on every template that has a calculated value.
  // Candidates = results, plus final outputs (computed fields that no other
  // computed formula builds on). The analyst can pick which one the limits
  // apply to; the default is the recipe's limitField, else "result", else the
  // first result-like field, else the last final output in the recipe.
  const limitCandidates = React.useMemo(() => {
    const computedFields = template.fields.filter(
      (f) => f.source === "computed" && !!f.formula,
    );
    const usedByOthers = (name: string) => {
      // Field names are plain identifiers, so no escaping is needed.
      const re = new RegExp(`\\b${name}\\b`);
      return computedFields.some((o) => o.name !== name && re.test(o.formula as string));
    };
    return computedFields.filter(
      (f) => /^result/i.test(f.name) || f.name === template.limitField || !usedByOthers(f.name),
    );
  }, [template]);

  const defaultLimitFieldName: string | null = React.useMemo(() => {
    const names = limitCandidates.map((f) => f.name);
    if (template.limitField && names.includes(template.limitField)) return template.limitField;
    if (names.includes("result")) return "result";
    const resultLike = limitCandidates.find((f) => /^result/i.test(f.name));
    if (resultLike) return resultLike.name;
    return limitCandidates.length > 0 ? limitCandidates[limitCandidates.length - 1].name : null;
  }, [limitCandidates, template.limitField]);

  const savedLimitFieldName = row.values?.limitFieldName ?? null;
  const limitFieldName =
    savedLimitFieldName && limitCandidates.some((f) => f.name === savedLimitFieldName)
      ? savedLimitFieldName
      : defaultLimitFieldName;
  const limitField = limitFieldName
    ? limitCandidates.find((f) => f.name === limitFieldName) ?? null
    : null;

  const limitLowerText = row.values?.limitLower ?? "";
  const limitUpperText = row.values?.limitUpper ?? "";
  const lowerLimit = parseLimit(limitLowerText);
  const upperLimit = parseLimit(limitUpperText);
  const limitsInvalid =
    lowerLimit !== null && upperLimit !== null && lowerLimit > upperLimit;
  const limitsEntered = lowerLimit !== null || upperLimit !== null;

  const rowVerdicts: LimitVerdict[] = React.useMemo(() => {
    if (!limitField || !showCalculatedResults) return [];
    if (limitField.group) {
      return (computed.groupValues[limitField.group] || []).map((r) =>
        evaluateLimit(r?.[limitField.name], lowerLimit, upperLimit),
      );
    }
    return [evaluateLimit(computed.values[limitField.name], lowerLimit, upperLimit)];
  }, [limitField, showCalculatedResults, computed, lowerLimit, upperLimit]);

  // Top-level inputs the checked result formula uses directly but that are still
  // empty. The engine leaves a result blank when an input is missing, so name
  // the missing input instead of leaving the analyst with an unexplained blank.
  const missingResultInputs: string[] = React.useMemo(() => {
    if (!limitField?.formula) return [];
    const referenced = new Set(limitField.formula.match(/[A-Za-z_][A-Za-z0-9_]*/g) || []);
    return template.fields
      .filter(
        (f) =>
          !f.group &&
          f.source === "input" &&
          f.type === "number" &&
          referenced.has(f.name) &&
          (row.values?.[f.name] === null ||
            row.values?.[f.name] === undefined ||
            String(row.values?.[f.name]).trim() === ""),
      )
      .map((f) => f.label);
  }, [limitField, template.fields, row.values]);

  // Overall: any FAIL fails the calculation. PASS only if every row passes.
  const overallVerdict: LimitVerdict =
    rowVerdicts.includes("fail")
      ? "fail"
      : rowVerdicts.length > 0 && rowVerdicts.every((v) => v === "pass")
        ? "pass"
        : "none";

  return (
    <div className="p-6 rounded-xl border border-emerald-200/60 bg-white/70">
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          value={row.label}
          disabled={disabled}
          onChange={(e) => onFieldChange("label", e.target.value)}
          placeholder="Calculation label"
          className="text-sm font-medium px-3 py-1.5 rounded-lg border border-gray-200 bg-white"
        />
        {!disabled && (
          <button type="button" onClick={onRemove} className="text-red-500 hover:text-red-700">
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {(groupsThatLinkToStandard || groupsThatLinkToSample) && (
        <div className="flex gap-4 mb-4">
          {groupsThatLinkToStandard && (
            <select
              value={row.selectedStandardPreparationLabel ?? ""}
              disabled={disabled}
              onChange={(e) => onSelectStandardPreparation(e.target.value || null)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-sm"
            >
              <option value="">Select Standard Preparation</option>
              {standardPreparations.map((sp) => (
                <option key={sp.id} value={sp.label}>{sp.label}</option>
              ))}
            </select>
          )}
          {groupsThatLinkToSample && (
            <select
              value={row.selectedSamplePreparationLabel ?? ""}
              disabled={disabled}
              onChange={(e) => onSelectSamplePreparation(e.target.value || null)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-sm"
            >
              <option value="">Select Sample Preparation</option>
              {samplePreparations.map((sp) => (
                <option key={sp.id} value={sp.label}>{sp.label}</option>
              ))}
            </select>
          )}
        </div>
      )}

      {limitField && (
        <div className="mb-6 p-4 rounded-lg border border-gray-200 bg-gray-50/60">
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Lower Limit{limitField.unit ? ` (${limitField.unit})` : ""}
              </label>
              <input
                type="number"
                value={limitLowerText}
                disabled={disabled}
                onChange={(e) => {
                  onFieldChange("limitLower", e.target.value);
                  // Remember which field the limits apply to, so the printed
                  // report labels it "Result" and checks the right value.
                  onFieldChange("limitFieldName", limitField.name);
                }}
                className="w-36 px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Upper Limit{limitField.unit ? ` (${limitField.unit})` : ""}
              </label>
              <input
                type="number"
                value={limitUpperText}
                disabled={disabled}
                onChange={(e) => {
                  onFieldChange("limitUpper", e.target.value);
                  // Remember which field the limits apply to, so the printed
                  // report labels it "Result" and checks the right value.
                  onFieldChange("limitFieldName", limitField.name);
                }}
                className="w-36 px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Limits apply to
              </label>
              {limitCandidates.length > 1 ? (
                <select
                  value={limitField.name}
                  disabled={disabled}
                  onChange={(e) => onFieldChange("limitFieldName", e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-sm"
                >
                  {limitCandidates.map((f) => (
                    <option key={f.name} value={f.name}>
                      {f.label}
                      {f.unit ? ` (${f.unit})` : ""}
                      {f.group ? ` - ${template.groups.find((g) => g.name === f.group)?.label ?? f.group}` : ""}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="inline-block py-1.5 text-sm font-medium text-gray-700">
                  {limitField.label}
                </span>
              )}
            </div>
            {showCalculatedResults && limitsEntered && !limitsInvalid && (
              <div className="pb-1 flex items-center gap-2">
                <span className="text-xs text-gray-500">Overall</span>
                <VerdictBadge verdict={overallVerdict} />
              </div>
            )}
          </div>
          {limitsInvalid && (
            <p className="mt-2 text-xs text-red-600">
              Lower limit is greater than the upper limit. Pass/Fail is not shown until this is corrected.
            </p>
          )}
          {!limitsEntered && (
            <p className="mt-2 text-xs text-gray-500">
              Enter a lower and/or upper limit to see Pass/Fail after calculating. Limits are inclusive.
            </p>
          )}
        </div>
      )}

      {showCalculatedResults && missingResultInputs.length > 0 && (
        <p className="mb-4 text-xs text-red-600">
          Result cannot be calculated until this is entered: {missingResultInputs.join(", ")}.
        </p>
      )}

      {/* Top-level fields (inputs and computed), e.g. molarity, LOD, avgFactor, %RSD */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {topLevelFields.map((field) => {
          const value =
            field.source === "computed"
              ? (
                  showCalculatedResults
                    ? truncateDisplayTo4Decimals(computed.values[field.name])
                    : ""
                )
              : row.values?.[field.name];
          return (
            <div key={field.name}>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                {field.label}
                {field.unit ? ` (${field.unit})` : ""}
              </label>
              <input
                type={field.type === "number" ? "number" : "text"}
                value={value ?? ""}
                disabled={disabled || field.source === "computed"}
                onChange={(e) => onFieldChange(field.name, e.target.value)}
                className={`w-full px-3 py-1.5 rounded-lg border text-sm ${
                  field.source === "computed"
                    ? "bg-gray-50 border-gray-200 text-gray-600"
                    : "bg-white border-gray-300"
                }`}
              />
              {limitField && !limitField.group && field.name === limitField.name &&
                limitsEntered && !limitsInvalid && showCalculatedResults && (
                  <div className="mt-1">
                    <VerdictBadge verdict={rowVerdicts[0] ?? "none"} />
                  </div>
                )}
            </div>
          );
        })}
      </div>

      {/* One table per group, e.g. Standardization (fixed, 3 rows), Sample Analysis (dynamic) */}
      {template.groups.map((group) => {
        const fields = template.fields.filter((f) => f.group === group.name);
        const rows = paddedRow.groupValues[group.name] || [];
        const computedRows = computed.groupValues[group.name] || rows;

        return (
          <div key={group.name} className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">{group.label}</h4>
            <div className="overflow-x-auto pb-2">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr>
                  {fields.map((f) => (
                    <th key={f.name} className="text-left text-xs font-medium text-gray-500 pb-2 pr-3 whitespace-nowrap">
                      {f.label}{f.unit ? ` (${f.unit})` : ""}
                    </th>
                  ))}
                  {limitField?.group === group.name && limitsEntered && !limitsInvalid && (
                    <th className="text-left text-xs font-medium text-gray-500 pb-2 pr-3 whitespace-nowrap">
                      Limit Check
                    </th>
                  )}
                  {group.repeat === "dynamic" && !disabled && (
                    <th className="pb-2" />
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {fields.map((field) => {
                      const cellValue =
                        field.source === "computed"
                          ? (
                              showCalculatedResults
                                ? truncateDisplayTo4Decimals(
                                    computedRows[rowIndex]?.[field.name],
                                  )
                                : ""
                            )
                          : rows[rowIndex]?.[field.name];
                      return (
                        <td key={field.name} className="pr-3 pb-2">
                          <input
                            type={field.type === "number" ? "number" : "text"}
                            value={cellValue ?? ""}
                            disabled={disabled || field.source === "computed"}
                            onChange={(e) =>
                              onGroupFieldChange(group.name, rowIndex, field.name, e.target.value)
                            }
                            className={`w-full min-w-[6rem] px-2 py-1 rounded-md border text-sm ${
                              field.source === "computed"
                                ? "bg-gray-50 border-gray-200 text-gray-600"
                                : "bg-white border-gray-300"
                            }`}
                          />
                        </td>
                      );
                    })}
                    {limitField?.group === group.name && limitsEntered && !limitsInvalid && (
                      <td className="pr-3 pb-2">
                        <VerdictBadge
                          verdict={showCalculatedResults ? rowVerdicts[rowIndex] ?? "none" : "none"}
                        />
                      </td>
                    )}
                    {group.repeat === "dynamic" && !disabled && (
                      <td className="pb-2">
                        <button
                          type="button"
                          onClick={() => onRemoveGroupRow(group.name, rowIndex)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            </div>

            {group.repeat === "dynamic" && !disabled && (
              <button
                type="button"
                onClick={() => onAddGroupRow(group.name)}
                className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700 hover:text-emerald-800"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Row
              </button>
            )}
          </div>
        );
      })}

      {!disabled && (
        <div className="flex justify-end mt-2 pt-4 border-t border-emerald-100">
          <button
            type="button"
            onClick={() => {
              onCalculatedResults(computed.values, computed.groupValues);
              setShowCalculatedResults(true);
            }}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold shadow-sm hover:bg-emerald-700 transition-colors"
          >
            Calculate Result
          </button>
        </div>
      )}
    </div>
  );
};

export default GenericCalculationDetail;