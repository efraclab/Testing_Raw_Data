// file: frontend/src/hooks/useGenericCalculationPayloadBuilder.ts
//
// This is the "packing" step - takes whatever the analyst has filled in
// for generic-template calculations (Titration, DCP, Ketotifen, etc.) and
// turns it into the exact same {label, calculationType, data} shape your
// backend already expects (see WorksheetRepository.cs - it treats this as
// a plain text blob, so this file is what makes the new system invisible
// to the backend).
//
// This plugs into useDrugFullParameterPayloadBuilder.ts: wherever that file
// builds its `calculations` array for a parameter, the array returned here
// gets spread into the same list, alongside assay/lod/roi/etc.

import type { CalculationGenericRow } from "../preparation_models/drugs/GenericCalculationTemplate";

export interface CalculationPayloadEntry {
  label: string;
  calculationType: string;
  data: string;
}

/**
 * Packs every generic-template calculation entry for ONE parameter into the
 * save payload shape. `calculationType` is the recipe's templateId (e.g.
 * "assay_titration"), so the same restorer logic can handle every
 * generic-template type by just reading that field back - no per-template
 * switch/case needed here, unlike the older hardcoded calc types.
 */
export function buildGenericCalculationPayload(
  paramId: number,
  calculationsGenericPerParam: Record<number, CalculationGenericRow[]>,
): CalculationPayloadEntry[] {
  const rows = calculationsGenericPerParam[paramId] || [];

  return rows.map((row) => {
    // Never spread the full row as-is into `data` without checking it -
    // strip anything that's purely local UI state if such fields get added
    // later (there are none today, but this keeps the same discipline as
    // useDrugFullParameterPayloadBuilder.ts, which explicitly deletes
    // selectedStandardPrepId/selectedSamplePrepId before saving).
    const d = { ...row } as any;

    return {
      label: row.label,
      calculationType: row.templateId,
      data: JSON.stringify(d),
    };
  });
}

/**
 * Convenience helper for wiring into useDrugFullParameterPayloadBuilder.ts:
 * call this once per parameter and spread the result into that file's
 * existing `calculations` array, e.g.:
 *
 *   const calculations = [
 *     ...(calculationsAssayPerParam[paramId] || []).map(...),
 *     ...buildGenericCalculationPayload(paramId, calculationsGenericPerParam),
 *   ];
 */
export function useGenericCalculationPayloadBuilder() {
  return { buildGenericCalculationPayload };
}