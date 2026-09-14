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
  const computed = useGenericCalculationEngine(template, row);

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
              : row.values[field.name];
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
            </div>
          );
        })}
      </div>

      {/* One table per group, e.g. Standardization (fixed, 3 rows), Sample Analysis (dynamic) */}
      {template.groups.map((group) => {
        const fields = template.fields.filter((f) => f.group === group.name);
        const rows = row.groupValues[group.name] || [];
        const computedRows = computed.groupValues[group.name] || rows;

        return (
          <div key={group.name} className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">{group.label}</h4>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  {fields.map((f) => (
                    <th key={f.name} className="text-left text-xs font-medium text-gray-500 pb-2 pr-3">
                      {f.label}{f.unit ? ` (${f.unit})` : ""}
                    </th>
                  ))}
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
                            className={`w-full px-2 py-1 rounded-md border text-sm ${
                              field.source === "computed"
                                ? "bg-gray-50 border-gray-200 text-gray-600"
                                : "bg-white border-gray-300"
                            }`}
                          />
                        </td>
                      );
                    })}
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