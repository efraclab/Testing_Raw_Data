// file: frontend/src/hooks/useGenericCalculationHandlers.ts
//
// This is the missing piece between "the data" and "the screen": it wraps
// the raw useState for generic-template calculations into the same
// add/remove/change functions every other calc type has (see
// useDrugAssayPreparationHandlers.ts for the pattern this follows).
//
// DrugWorksheet.tsx calls this ONE hook, and it works for every
// simple/medium template (Titration, DCP, Ketotifen, ...) at once - unlike
// the older pattern where each calc type needs its own dedicated hook file.

import { useCallback } from "react";
import type {
  CalculationGenericRow,
  GenericCalculationTemplate,
} from "../preparation_models/drugs/GenericCalculationTemplate";

interface UseGenericCalculationHandlersArgs {
  calculationsGenericPerParam: Record<number, CalculationGenericRow[]>;
  setCalculationsGenericPerParam: React.Dispatch<
    React.SetStateAction<Record<number, CalculationGenericRow[]>>
  >;
  genericTemplates: Record<string, GenericCalculationTemplate>;
}

function emptyRowFor(template: GenericCalculationTemplate, index: number): CalculationGenericRow {
  const groupValues: Record<string, Record<string, string | null>[]> = {};

  for (const group of template.groups) {
    const rowCount = group.repeat === "fixed" ? group.count ?? 0 : group.minRows ?? 1;
    const fieldsInGroup = template.fields.filter((f) => f.group === group.name);
    groupValues[group.name] = Array.from({ length: rowCount }, () =>
      Object.fromEntries(fieldsInGroup.map((f) => [f.name, null])),
    );
  }

  const topLevelFields = template.fields.filter((f) => !f.group);
  const values = Object.fromEntries(topLevelFields.map((f) => [f.name, null]));

  return {
    id: Date.now() + index,
    label: template.templateName,
    templateId: template.templateId,
    selectedStandardPreparationLabel: null,
    selectedSamplePreparationLabel: null,
    values,
    groupValues,
  };
}

export function useGenericCalculationHandlers({
  setCalculationsGenericPerParam,
  genericTemplates,
}: UseGenericCalculationHandlersArgs) {
  const handleAddCalculationGeneric = useCallback(
    (parameterId: number, templateId: string) => {
      // Look up by the template's own templateId field, not by object key -
      // genericTemplates is keyed by camelCase group id (e.g. "assayTitration")
      // but templateId here is the snake_case value used for saving
      // (e.g. "assay_titration"). Searching by field avoids depending on
      // those two naming conventions ever staying in sync.
      const template = Object.values(genericTemplates).find(
        (t) => t.templateId === templateId,
      );
      if (!template) {
        console.warn(`No generic template registered for "${templateId}"`);
        return;
      }
      setCalculationsGenericPerParam((prev) => {
        const current = prev[parameterId] || [];
        return {
          ...prev,
          [parameterId]: [...current, emptyRowFor(template, current.length)],
        };
      });
    },
    [genericTemplates, setCalculationsGenericPerParam],
  );

  const handleRemoveCalculationGeneric = useCallback(
    (parameterId: number, calculationId: number) => {
      setCalculationsGenericPerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).filter(
          (c) => c.id !== calculationId,
        ),
      }));
    },
    [setCalculationsGenericPerParam],
  );

  const handleGenericFieldChange = useCallback(
    (
      parameterId: number,
      calculationId: number,
      fieldName: string,
      value: string | null,
    ) => {
      setCalculationsGenericPerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((c) => {
          if (c.id !== calculationId) return c;
          // "label" is a top-level property on the row itself, not inside
          // `values` - every other field goes into `values`.
          if (fieldName === "label") {
            return { ...c, label: value ?? "" };
          }
          return { ...c, values: { ...c.values, [fieldName]: value } };
        }),
      }));
    },
    [setCalculationsGenericPerParam],
  );

  const handleGenericGroupFieldChange = useCallback(
    (
      parameterId: number,
      calculationId: number,
      groupName: string,
      rowIndex: number,
      fieldName: string,
      value: string | null,
    ) => {
      setCalculationsGenericPerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((c) => {
          if (c.id !== calculationId) return c;
          const groupRows = [...(c.groupValues[groupName] || [])];
          groupRows[rowIndex] = { ...groupRows[rowIndex], [fieldName]: value };
          return {
            ...c,
            groupValues: { ...c.groupValues, [groupName]: groupRows },
          };
        }),
      }));
    },
    [setCalculationsGenericPerParam],
  );

  const handleAddGenericGroupRow = useCallback(
    (parameterId: number, calculationId: number, groupName: string) => {
      setCalculationsGenericPerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((c) => {
          if (c.id !== calculationId) return c;
          const template = Object.values(genericTemplates).find(
            (t) => t.templateId === c.templateId,
          );
          const fieldsInGroup = (template?.fields || []).filter(
            (f) => f.group === groupName,
          );
          const newRow = Object.fromEntries(
            fieldsInGroup.map((f) => [f.name, null]),
          );
          return {
            ...c,
            groupValues: {
              ...c.groupValues,
              [groupName]: [...(c.groupValues[groupName] || []), newRow],
            },
          };
        }),
      }));
    },
    [genericTemplates, setCalculationsGenericPerParam],
  );

  const handleRemoveGenericGroupRow = useCallback(
    (
      parameterId: number,
      calculationId: number,
      groupName: string,
      rowIndex: number,
    ) => {
      setCalculationsGenericPerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((c) => {
          if (c.id !== calculationId) return c;
          const groupRows = (c.groupValues[groupName] || []).filter(
            (_, i) => i !== rowIndex,
          );
          return {
            ...c,
            groupValues: { ...c.groupValues, [groupName]: groupRows },
          };
        }),
      }));
    },
    [setCalculationsGenericPerParam],
  );

  const handleSelectGenericStandardPreparation = useCallback(
    (parameterId: number, calculationId: number, label: string | null) => {
      setCalculationsGenericPerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((c) =>
          c.id === calculationId
            ? { ...c, selectedStandardPreparationLabel: label }
            : c,
        ),
      }));
    },
    [setCalculationsGenericPerParam],
  );

  const handleSelectGenericSamplePreparation = useCallback(
    (parameterId: number, calculationId: number, label: string | null) => {
      setCalculationsGenericPerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((c) =>
          c.id === calculationId
            ? { ...c, selectedSamplePreparationLabel: label }
            : c,
        ),
      }));
    },
    [setCalculationsGenericPerParam],
  );

  return {
    handleAddCalculationGeneric,
    handleRemoveCalculationGeneric,
    handleGenericFieldChange,
    handleGenericGroupFieldChange,
    handleAddGenericGroupRow,
    handleRemoveGenericGroupRow,
    handleSelectGenericStandardPreparation,
    handleSelectGenericSamplePreparation,
  };
}