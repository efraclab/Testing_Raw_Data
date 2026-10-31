export interface DrugPreparationGroupOption {
  id: string;
  label: string;
  color: string;
}

export const DRUG_PREPARATION_GROUP_OPTIONS: DrugPreparationGroupOption[] = [
      { id: "assay", label: "Preparations for Assay", color: "emerald" },
      { id: "lod", label: "Preparations for LOD", color: "emerald" },
      { id: "roi", label: "Preparations for ROI", color: "emerald" },
      {
        id: "sulphatedAsh",
        label: "Preparations for Sulphated Ash",
        color: "emerald",
      },
      {
        id: "residualSolvent",
        label: "Preparations for Residual Solvent",
        color: "emerald",
      },
      {
        id: "relatedSubstance",
        label: "Preparations for Related Substance",
        color: "emerald",
      },
      {
        id: "dissolution",
        label: "Preparations for Dissolution",
        color: "emerald",
      },
      {
        id: "dissolutionProfile",
        label: "Preparations for Dissolution (Profile)",
        color: "emerald",
      },
      {
        id: "uniformityOfContent",
        label: "Preparations for Uniformity of Content",
        color: "emerald",
      },
      {
        id: "assayFerrousFumarate",
        label: "Preparation for Assay (Ferrous Fumarate)",
        color: "emerald",
      },
      {
        id: "dissolutionFerrousFumarate",
        label: "Preparation for Dissolution (Ferrous Fumarate)",
        color: "emerald",
      },
      {
        id: "hypromellose",
        label: "Preparations for Assay (Hypromellose)",
        color: "emerald",
      },
      {
        id: "nitrosamine",
        label: "Preparations for N-Nitrosamine Impurities",
        color: "teal",
      },
      {
        id: "blankPreparation",
        label: "Blank Preparation",
        color: "emerald",
      },
      {
        id: "assayTitration",
        label: "Preparations for Assay (Titration)",
        color: "emerald",
      },
      {
        id: "betadexBatchAnalysis",
        label: "Preparations for Betadex Batch Analysis",
        color: "emerald",
      },
      {
        id: "standardizedTitrationAssay",
        label: "Preparations for Standardized Titration Assay",
        color: "emerald",
      },
      {
        id: "dibasicSodiumPhosphateAssay",
        label: "Preparations for Dibasic Sodium Phosphate Assay",
        color: "emerald",
      },
      {
        id: "freeCarboxylGroups",
        label: "Free Carboxyl Groups Calculation",
        color: "emerald",
      },
      {
        id: "glycerolBehenateFreeGlycerol",
        label: "Glycerol Behenate - Free Glycerol",
        color: "emerald",
      },
      {
        id: "glycerolBehenateAssay",
        label: "Glycerol Behenate - Assay",
        color: "emerald",
      },
      {
        id: "hydrogenatedCastorOilComposition",
        label: "Hydrogenated Castor Oil - Composition",
        color: "emerald",
      },
      {
        id: "ketotifenHydrogenFumarateAssay",
        label: "Ketotifen Hydrogen Fumarate - Assay",
        color: "emerald",
      },
      {
        id: "lecithinSingleLinearity",
        label: "Lecithin - Single Linearity",
        color: "emerald",
      },
      {
        id: "lecithinBatchAnalysis",
        label: "Lecithin - Batch Analysis",
        color: "emerald",
      },
      {
        id: "lipoidsAssay",
        label: "Lipoids - Assay",
        color: "emerald",
      },
      {
        id: "lipoidsImpurity",
        label: "Lipoids - Impurity",
        color: "emerald",
      },
      {
        id: "logarithmicCalculation4Point",
        label: "Logarithmic Calculation - 4 Point",
        color: "emerald",
      },
      {
        id: "ndmaValidationBatchAnalysis",
        label: "NDMA Validation - Batch Analysis",
        color: "emerald",
      },
      {
        id: "povidoneLimitOfAldehyde",
        label: "Povidone - Limit of Aldehyde",
        color: "emerald",
      },
      {
        id: "prilocaineAssay",
        label: "Prilocaine - Assay",
        color: "emerald",
      },
      {
        id: "castorOilFattyAcid",
        label: "Castor Oil - Fatty Acid Composition",
        color: "emerald",
      },
      {
        id: "hecEthoxyContent",
        label: "HEC - Ethoxy Content",
        color: "emerald",
      },
      {
        id: "hpcAssay",
        label: "HPC - Assay",
        color: "emerald",
      },
      {
        id: "lhpcHydroxypropoxyContent",
        label: "LHPC - Hydroxypropoxy Content",
        color: "emerald",
      },
      {
        id: "magnesiumStearateFattyAcid",
        label: "Magnesium Stearate - Fatty Acid Composition",
        color: "emerald",
      },
      {
        id: "nefopamResidualSolvent",
        label: "Nefopam - Residual Solvent",
        color: "emerald",
      },
      {
        id: "polyoxyl35CastorOilGlycols",
        label: "Polyoxyl 35 Castor Oil - EG / DEG / TEG",
        color: "emerald",
      },
    ];

export const getDrugPreparationGroupOptions = () =>
  DRUG_PREPARATION_GROUP_OPTIONS;