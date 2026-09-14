// file: frontend/src/preparation_models/drugs/genericCalculationTemplates.ts
//
// This is where actual recipes live in code, for now. Once the database
// table (worksheet_calculation_templates) exists and has an admin screen,
// this file goes away and templates get fetched instead - but for the
// first template (Titration), keeping it in code lets us test the whole
// pipeline end-to-end before building that database/admin layer.

import type { GenericCalculationTemplate } from "./GenericCalculationTemplate";

export const ASSAY_TITRATION_TEMPLATE: GenericCalculationTemplate = {
  templateId: "assay_titration",
  templateName: "Assay by Titration",
  version: 1,

  fields: [
    { name: "molarity", label: "Actual Molarity of Titrant", type: "number", source: "input" },
    { name: "lod", label: "LOD (%)", type: "number", source: "input" },

    { name: "stdWeight", label: "Standard Weight", type: "number", source: "input", group: "standardization" },
    { name: "molecularWeight", label: "Molecular Weight", type: "number", source: "input", group: "standardization" },
    { name: "volumeDiff", label: "Volume Difference", type: "number", source: "input", group: "standardization" },
    {
      name: "factor",
      label: "Factor",
      type: "number",
      source: "computed",
      formula: "stdWeight / (volumeDiff * molecularWeight)",
      group: "standardization",
    },

    { name: "avgFactor", label: "Average", type: "number", source: "computed", formula: "AVERAGE(standardization.factor)" },
    { name: "stdevFactor", label: "Stdev", type: "number", source: "computed", formula: "STDEV(standardization.factor)" },
    { name: "rsdFactor", label: "%RSD", type: "number", source: "computed", formula: "stdevFactor / avgFactor * 100" },

    { name: "inflection", label: "Inflection", type: "number", source: "input", group: "replicate" },
    { name: "sampleWeight", label: "Weight", type: "number", source: "input", group: "replicate" },
    {
      name: "result",
      label: "Result",
      type: "number",
      source: "computed",
      // 0.03314 is fixed per the Piroxicam sheet - flagged earlier as
      // something to confirm: does this change per drug? If so, this
      // needs to become its own input field instead of a constant.
      formula: "(inflection * molarity * 0.03314 * 100 * 100) / (sampleWeight * 0.1 * (100 - lod))",
      group: "replicate",
    },
  ],

  groups: [
    { name: "standardization", label: "Standardization", repeat: "fixed", count: 3 },
    {
      name: "replicate",
      label: "Sample Analysis",
      repeat: "dynamic",
      minRows: 1,
      linksToStandardPreparation: true,
      linksToSamplePreparation: true,
    },
  ],
};

/**
 * The registry DrugWorksheet.tsx passes into ctx and the handlers hook.
 * Adding a future simple/medium template (once it exists as a recipe)
 * is just one more line here - no other file needs touching for that
 * template to start working, except the one-line addition to
 * KNOWN_GENERIC_TEMPLATE_IDS in useGenericCalculationRestorer.ts and the
 * PREPARATION_GROUPS entry + JSX block in drugWorksheetConfig.ts /
 * DrugPrimaryAnalysisGroupsCoordinator.tsx (see those files' comments).
 */
export const GENERIC_CALCULATION_TEMPLATES: Record<string, GenericCalculationTemplate> = {
  assayTitration: ASSAY_TITRATION_TEMPLATE,
};