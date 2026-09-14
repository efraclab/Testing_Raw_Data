import type { SampleData } from "../../../models/SampleData";
import type { Instrument } from "../../../preparation_models/Instrument";
import type { Standard } from "../../../preparation_models/Standard";
import type { Chemical } from "../../../preparation_models/Chemical";
import type { WorksheetDetail } from "../../../models/WorksheetDetail";
import type { Analyst } from "../../../models/Analyst";
import type {
  WorksheetSidebarState,
  WorksheetSidebarActions,
} from "../../shared/WorksheetSidebar";

export interface DrugWorksheetProps {
  worksheetId: string;
  instruments: Instrument[];
  standards: Standard[];
  chemicals: Chemical[];
  isReferenceDataLoading: boolean;
  referenceDataError: string | null;
  employeeId: string;
  role: string;
  department: string;
  onPrint?: (
    info: WorksheetDetail,
    analysts: Analyst[],
    sampleData: SampleData,
  ) => void;
  onSidebarStateChange?: (state: WorksheetSidebarState) => void;
  onSidebarActionsReady?: (actions: WorksheetSidebarActions) => void;
}

export const PREPARATION_GROUPS = {
  assay: { id: "assay", label: "Preparations for Assay", color: "emerald" },
  lod: { id: "lod", label: "Preparations for LOD", color: "emerald" },
  roi: { id: "roi", label: "Preparations for ROI", color: "emerald" },
  sulphatedAsh: {
    id: "sulphatedAsh",
    label: "Preparations for Sulphated Ash",
    color: "emerald",
  },
  residualSolvent: {
    id: "residualSolvent",
    label: "Preparations for Residual Solvent",
    color: "emerald",
  },
  relatedSubstance: {
    id: "relatedSubstance",
    label: "Preparations for Related Substance",
    color: "emerald",
  },
  dissolution: {
    id: "dissolution",
    label: "Preparations for Dissolution",
    color: "emerald",
  },
  dissolutionProfile: {
    id: "dissolutionProfile",
    label: "Preparations for Dissolution (Profile)",
    color: "emerald",
  },
  uniformityOfContent: {
    id: "uniformityOfContent",
    label: "Preparations for Uniformity of Content",
    color: "emerald",
  },
  assayFerrousFumarate: {
    id: "assayFerrousFumarate",
    label: "Preparation for Assay (Ferrous Fumarate)",
    color: "emerald",
  },
  dissolutionFerrousFumarate: {
    id: "dissolutionFerrousFumarate",
    label: "Preparation for Dissolution (Ferrous Fumarate)",
    color: "emerald",
  },
  hypromellose: {
    id: "hypromellose",
    label: "Preparations for Assay (Hypromellose)",
    color: "emerald",
  },
  nitrosamine: {
    id: "nitrosamine",
    label: "Preparations for N-Nitrosamine Impurities",
    color: "teal",
  },
  mobilePhase: {
    id: "mobilePhase",
    label: "Mobile Phase Preparations",
    color: "emerald",
  },
  dissoMedia: {
    id: "dissoMedia",
    label: "Dissolution Media Preparations",
    color: "emerald",
  },
  blankPreparation: {
    id: "blankPreparation",
    label: "Blank Preparation",
    color: "emerald",
  },
  bufferPreparation: {
    id: "bufferPreparation",
    label: "Buffer Preparations",
    color: "emerald",
  },
  assayTitration: {
    id: "assayTitration",
    label: "Preparations for Assay (Titration)",
    color: "emerald",
  },
  betadexBatchAnalysis: {
    id: "betadexBatchAnalysis",
    label: "Preparations for Betadex Batch Analysis",
    color: "emerald",
  },
  standardizedTitrationAssay: {
    id: "standardizedTitrationAssay",
    label: "Preparations for Standardized Titration Assay",
    color: "emerald",
  },
  dibasicSodiumPhosphateAssay: {
    id: "dibasicSodiumPhosphateAssay",
    label: "Preparations for Dibasic Sodium Phosphate Assay",
    color: "emerald",
  },
  freeCarboxylGroups: {
    id: "freeCarboxylGroups",
    label: "Free Carboxyl Groups Calculation",
    color: "emerald",
  },
  glycerolBehenateFreeGlycerol: {
    id: "glycerolBehenateFreeGlycerol",
    label: "Glycerol Behenate - Free Glycerol",
    color: "emerald",
  },
  glycerolBehenateAssay: {
    id: "glycerolBehenateAssay",
    label: "Glycerol Behenate - Assay",
    color: "emerald",
  },
  hydrogenatedCastorOilComposition: {
    id: "hydrogenatedCastorOilComposition",
    label: "Hydrogenated Castor Oil - Composition",
    color: "emerald",
  },
  ketotifenHydrogenFumarateAssay: {
    id: "ketotifenHydrogenFumarateAssay",
    label: "Ketotifen Hydrogen Fumarate - Assay",
    color: "emerald",
  },
  lecithinSingleLinearity: {
    id: "lecithinSingleLinearity",
    label: "Lecithin - Single Linearity",
    color: "emerald",
  },
  lecithinBatchAnalysis: {
    id: "lecithinBatchAnalysis",
    label: "Lecithin - Batch Analysis",
    color: "emerald",
  },
  lipoidsAssay: {
    id: "lipoidsAssay",
    label: "Lipoids - Assay",
    color: "emerald",
  },
  lipoidsImpurity: {
    id: "lipoidsImpurity",
    label: "Lipoids - Impurity",
    color: "emerald",
  },
  logarithmicCalculation4Point: {
    id: "logarithmicCalculation4Point",
    label: "Logarithmic Calculation - 4 Point",
    color: "emerald",
  },
  ndmaValidationBatchAnalysis: {
    id: "ndmaValidationBatchAnalysis",
    label: "NDMA Validation - Batch Analysis",
    color: "emerald",
  },
  povidoneLimitOfAldehyde: {
    id: "povidoneLimitOfAldehyde",
    label: "Povidone - Limit of Aldehyde",
    color: "emerald",
  },
  prilocaineAssay: {
    id: "prilocaineAssay",
    label: "Prilocaine - Assay",
    color: "emerald",
  },
  castorOilFattyAcid: {
    id: "castorOilFattyAcid",
    label: "Castor Oil - Fatty Acid Composition",
    color: "emerald",
  },
  hecEthoxyContent: {
    id: "hecEthoxyContent",
    label: "HEC - Ethoxy Content",
    color: "emerald",
  },
  hpcAssay: {
    id: "hpcAssay",
    label: "HPC - Assay",
    color: "emerald",
  },
  lhpcHydroxypropoxyContent: {
    id: "lhpcHydroxypropoxyContent",
    label: "LHPC - Hydroxypropoxy Content",
    color: "emerald",
  },
  magnesiumStearateFattyAcid: {
    id: "magnesiumStearateFattyAcid",
    label: "Magnesium Stearate - Fatty Acid Composition",
    color: "emerald",
  },
  nefopamResidualSolvent: {
    id: "nefopamResidualSolvent",
    label: "Nefopam - Residual Solvent",
    color: "emerald",
  },
  polyoxyl35CastorOilGlycols: {
    id: "polyoxyl35CastorOilGlycols",
    label: "Polyoxyl 35 Castor Oil - EG / DEG / TEG",
    color: "emerald",
  },
} as const;