// file: frontend/src/hooks/useGenericCalculationRestorer.ts
//
// This is the reverse of useGenericCalculationPayloadBuilder.ts. When a
// worksheet is reopened, the backend hands back a flat list of
// {label, calculationType, data} entries for every calculation on the
// parameter - old hardcoded ones (assay, lod, roi...) mixed in with any
// generic-template ones (assay_titration, dcp, etc.) all together.
//
// This file's job is narrow on purpose: look at that flat list, pull out
// only the entries whose calculationType matches a known generic-template
// recipe, and turn them back into CalculationGenericRow objects. Anything
// it doesn't recognise, it leaves alone - the existing switch/case in
// useDrugWorksheetStateRestorer.ts keeps handling every old calc type
// exactly as it does today.

import type { CalculationGenericRow } from "../preparation_models/drugs/GenericCalculationTemplate";

/** Shape of one entry as it comes back from the backend (matches CalculationData.ts). */
interface RestoredCalculationEntry {
  label: string;
  calculationType: string;
  data: string | Record<string, unknown>;
}

/**
 * Every generic-template recipe's templateId needs to be listed here (or
 * passed in) so the restorer knows which calculationType values are
 * "generic" ones versus the older hardcoded types. As new simple/medium
 * templates get added later (just as database recipes, no new code), their
 * templateId needs adding to this list once.
 */
export const KNOWN_GENERIC_TEMPLATE_IDS = new Set<string>([
  "assay_titration",
  "betadex_batch_analysis",
  "standardized_titration_assay",
  "dibasic_sodium_phosphate_assay",
  "free_carboxyl_groups",
  "glycerol_behenate_free_glycerol",
  "glycerol_behenate_assay",
  "hydrogenated_castor_oil_composition",
  "ketotifen_hydrogen_fumarate_assay",
  "lecithin_single_linearity",
  "lecithin_batch_analysis",
  "lipoids_assay",
  "lipoids_impurity",
  "logarithmic_calculation_4_point",
  "ndma_validation_batch_analysis",
  "povidone_limit_of_aldehyde",
  "prilocaine_assay",
  "castor_oil_fatty_acid",
  "hec_ethoxy_content",
  "hpc_assay",
  "lhpc_hydroxypropoxy_content",
  "magnesium_stearate_fatty_acid",
  "nefopam_residual_solvent",
  "polyoxyl_35_castor_oil_glycols",
  // future simple/medium templates get added here, e.g. "dcp", "ketotifen"
]);

function parseData(data: string | Record<string, unknown>): Record<string, any> | null {
  if (typeof data !== "string") return data as Record<string, any>;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

/**
 * Pulls every generic-template calculation entry out of one parameter's
 * flat calculation list and rebuilds it as a CalculationGenericRow.
 *
 * Call this once per parameter inside the existing restore loop in
 * useDrugWorksheetStateRestorer.ts, alongside (not replacing) the existing
 * per-type filters like `c.calculationType === "assay_ferrous_fumarate"`.
 */
export function extractGenericCalculationsForParam(
  calculations: RestoredCalculationEntry[],
  knownTemplateIds: Set<string> = KNOWN_GENERIC_TEMPLATE_IDS,
): CalculationGenericRow[] {
  const results: CalculationGenericRow[] = [];

  for (const entry of calculations) {
    if (!knownTemplateIds.has(entry.calculationType)) continue;

    const parsed = parseData(entry.data);
    if (!parsed) {
      console.warn(
        `Could not parse generic calculation data for "${entry.label}" (${entry.calculationType})`,
      );
      continue;
    }

    // Defensive defaults so a slightly malformed saved row doesn't crash
    // the whole worksheet load - matches the general caution used
    // elsewhere in useDrugWorksheetStateRestorer.ts around JSON.parse.
    results.push({
      id: parsed.id ?? Date.now() + Math.floor(Math.random() * 1000),
      label: parsed.label ?? entry.label,
      templateId: parsed.templateId ?? entry.calculationType,
      selectedStandardPreparationLabel: parsed.selectedStandardPreparationLabel ?? null,
      selectedSamplePreparationLabel: parsed.selectedSamplePreparationLabel ?? null,
      values: parsed.values ?? {},
      groupValues: parsed.groupValues ?? {},
    });
  }

  return results;
}

/**
 * Builds the full calculationsGenericPerParam map (paramId -> rows) for
 * every parameter on the worksheet in one pass - convenience wrapper for
 * the top of the restorer where all per-param maps get built together.
 */
export function buildGenericCalculationsPerParam(
  paramsWithCalculations: { id: number; calculations: RestoredCalculationEntry[] }[],
  knownTemplateIds: Set<string> = KNOWN_GENERIC_TEMPLATE_IDS,
): Record<number, CalculationGenericRow[]> {
  const perParam: Record<number, CalculationGenericRow[]> = {};

  for (const param of paramsWithCalculations) {
    const rows = extractGenericCalculationsForParam(
      param.calculations || [],
      knownTemplateIds,
    );
    if (rows.length > 0) {
      perParam[param.id] = rows;
    }
  }

  return perParam;
}