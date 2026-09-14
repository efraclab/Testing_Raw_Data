// file: frontend/src/preparation_models/drugs/GenericCalculationTemplate.ts
//
// This is the "blueprint" for a calculation recipe. A recipe describes a
// whole calculation template (e.g. Assay by Titration) as data, so the
// generic engine + generic form can render and compute it without a
// developer writing a new component for it.
//
// This file does NOT contain any specific template's data (like Titration's
// actual fields) - that lives in the database, in the shape defined here.
// This file only defines what a valid recipe is allowed to look like.

export type FieldType = "number" | "text";

export type FieldSource = "input" | "computed";

export interface GenericCalculationField {
  /** Unique name used in formulas and in saved data, e.g. "stdWeight" */
  name: string;
  /** Label shown on screen, e.g. "Standard Weight" */
  label: string;
  type: FieldType;
  source: FieldSource;
  /**
   * Required when source is "computed". Written in terms of other field
   * names, e.g. "stdWeight / (volumeDiff * molecularWeight)".
   * Supported functions in v1: AVERAGE(...), STDEV(...), plus + - * / ().
   */
  formula?: string;
  /**
   * Which group this field belongs to. Omit for fields that appear once
   * at the top of the form (like molarity, LOD).
   */
  group?: string;
  unit?: string;
}

export interface GenericCalculationGroup {
  /** Matches the "group" value used on fields, e.g. "standardization" */
  name: string;
  label: string;
  /**
   * "fixed" groups always have the same number of rows (e.g. always 3
   * standardization rows). "dynamic" groups can have rows added/removed
   * by the analyst (e.g. sample replicates).
   */
  repeat: "fixed" | "dynamic";
  /** Required when repeat is "fixed". */
  count?: number;
  /** Required when repeat is "dynamic". Minimum rows to start with. */
  minRows?: number;
  /**
   * If true, this group's rows link back to a Standard/Sample Preparation
   * the same way existing calc types do (selectedStandardPreparationLabel /
   * selectedSamplePreparationLabel), instead of the analyst re-typing
   * values that already exist in the preparation.
   */
  linksToStandardPreparation?: boolean;
  linksToSamplePreparation?: boolean;
}

export interface GenericCalculationTemplate {
  /** Matches calculationType saved in worksheet_calculations, e.g. "assay_titration" */
  templateId: string;
  /** Shown in the UI, e.g. "Assay by Titration" */
  templateName: string;
  /** Bump this if the recipe changes shape after templates are already saved using it */
  version: number;
  fields: GenericCalculationField[];
  groups: GenericCalculationGroup[];
}

// ---------------------------------------------------------------------
// Per-row instance shape: what actually gets stored per calculation entry
// on a worksheet (one CalculationAssayGeneric per "Add Calculation" click,
// matching the pattern of CalculationAssay / CalculationLod / etc.)
// ---------------------------------------------------------------------

export interface CalculationGenericRow {
  id: number;
  label: string;
  templateId: string;
  selectedStandardPreparationLabel: string | null;
  selectedSamplePreparationLabel: string | null;
  /**
   * Values keyed by field name for top-level (non-grouped) fields,
   * e.g. { molarity: "0.1021", lod: "0.05" }
   */
  values: Record<string, string | null>;
  /**
   * Values for each repeatable group, keyed by group name, each an array
   * of rows keyed by field name, e.g.
   * groupValues.standardization[0] = { stdWeight: "350.02", ... }
   */
  groupValues: Record<string, Record<string, string | null>[]>;
}