export interface SampleInjectionNitrosamine {
  id: number;
  area: string;
  weight: string; // optional per-injection weight override; blank = use sampleWeight
  found: string | null;
}

export interface CalculationAssayNitrosamine {
  id: number;
  label: string;
  selectedStandardPreparationLabel: string | null;
  selectedSamplePreparationLabel: string | null;

  // Reference / method inputs
  analyteName: string;
  purity: string; // Purity (%)
  standardWeightTaken: string; // Weight Taken (mg) -- auto-fetched from Standard Prep
  sampleWeight: string; // Wu, mg -- auto-fetched from Sample Prep
  standardDilutionFactor: string | null; // dst -- auto-fetched, derived from Standard Prep steps
  sampleDilutionFactor: string | null; // ds -- auto-fetched, derived from Sample Prep steps

  // Optional label-claim scaling (leave blank to default to 1)
  averageWeight: string;
  labelClaim: string;

  // Unit + rounding
  unitConversionFactor: string; // "100" | "1000000" | "1000000000"
  roundingMode: "round" | "trunc"; // ROUND (ppm worksheets) | TRUNC (% worksheets)

  // Standard system-suitability replicates (usually 6 injections)
  standardArea1: string;
  standardArea2: string;
  standardArea3: string;
  standardArea4: string;
  standardArea5: string;
  standardArea6: string;

  // Computed replicate stats (persisted results)
  standardAverageArea: string | null;
  standardStdev: string | null;
  standardPercentRSD: string | null;

  // Optional bracketing standard
  bracketingArea: string;
  bracketingPercentRSD: string | null;

  // Sample Solution — dynamic list, add as many as needed
  sampleInjections: SampleInjectionNitrosamine[];

  // Computed average of sample injection areas (raw, before Found calc) + average Found
  sampleAverageArea: string | null;
  averageFound: string | null;
  resultUnit: string | null; // "%" | "ppm" | "ppb"

  // Acceptance limits (from monograph/STP; drive Pass/Fail only, not calculated)
  acceptanceLimitMin: string;
  acceptanceLimitMax: string;
}