import type { CalculationDisso } from "../preparation_models/drugs/CalculationDisso";
import type { CalculationDissoProfile } from "../preparation_models/drugs/CalculationDissoProfile";
import type { CalculationAssay } from "../preparation_models/drugs/CalculationAssay";
import type { CalculationLod } from "../preparation_models/drugs/CalculationLod";
import type { CalculationROI } from "../preparation_models/drugs/CalculationROI";
import type { CalculationSulphatedAsh } from "../preparation_models/drugs/CalculationSulphatedAsh";
import type { StandardPreparation } from "../preparation_models/drugs/StandardPreparation";
import type { SamplePreparation } from "../preparation_models/drugs/SamplePreparation";
import type { SamplePreparationLod } from "../preparation_models/drugs/SamplePreparationLod";
import type { SamplePreparationSulphatedAsh } from "../preparation_models/drugs/SamplePreparationSulphatedAsh";
import type { SamplePreparationROI } from "../preparation_models/drugs/SamplePreparationROI";
import type { SamplePreparationDisso } from "../preparation_models/drugs/SamplePreparationDisso";
import type { CalculationRS } from "../preparation_models/drugs/CalculationRS";
import type { CalculationRelatedSubstance } from "../preparation_models/drugs/CalculationRelatedSubstance";
import type { DissoMediaPreparation } from "../preparation_models/drugs/DissoMediaPreparation";
import type { BufferPreparation as BufferPreparationModel } from "../preparation_models/drugs/BufferPreparation";
import type { SamplePreparationTitration } from "../preparation_models/drugs/SamplePreparationTitration";
import type { CalculationAssayFerrousFumarate } from "../preparation_models/drugs/CalculationAssayFerrousFumarate";
import type { CalculationDissoFerrousFumarate } from "../preparation_models/drugs/CalculationDissoFerrousFumarate";
import type { SamplePreparationUC } from "../preparation_models/drugs/SamplePreparationUC";
import type { CalculationUC } from "../preparation_models/drugs/CalculationUC";
import type { StandardPreparationHypromellose } from "../preparation_models/drugs/Standardpreparationhypromellose";
import type { SamplePreparationHypromellose } from "../preparation_models/drugs/Samplepreparationhypromellose";
import type { CalculationAssayHypromellose } from "../preparation_models/drugs/Calculationassayhypromellose";
import type { StandardPreparationNitrosamine } from "../preparation_models/drugs/Standardpreparationnitrosamine";
import type { SamplePreparationNitrosamine } from "../preparation_models/drugs/Samplepreparationnitrosamine";
import type { CalculationAssayNitrosamine } from "../preparation_models/drugs/Calculationassaynitrosamine";
import type { SystemSuitability } from "../preparation_models/drugs/SystemSuitability";

// Factory functions for creating new preparation objects
export const createNewCalculationDisso = (index: number): CalculationDisso => ({
  id: Date.now() + index,
  label: `Calculation ${index + 1}`,
  selectedStandardPreparationLabel: null,
  selectedSamplePreparationLabel: null,
  areaOfSample1: "",
  areaOfSample2: "",
  areaOfSample3: "",
  areaOfSample4: "",
  areaOfSample5: "",
  areaOfSample6: "",
  areaOfStandard: "",
  mWBase: "",
  mWSalt: "",
  purity: "",
  calculationResult: null,
  calculationResultUnit: null,
  calculationResultTablet1: null,
  calculationResultTablet2: null,
  calculationResultTablet3: null,
  calculationResultTablet4: null,
  calculationResultTablet5: null,
  calculationResultTablet6: null,
  sw1: null,
  claim: null,
  mediaVol: null,
  v1: null,
  v2: null,
  v3: null,
  v4: null,
  v5: null,
  v6: null,
  v7: null,
  v8: null,
  v9: null,
  v10: null,
  v11: null,
  v12: null,
  v13: null,
  v14: null,
  acceptanceLimitMin: "",
  acceptanceLimitMax: "",
});

export const createNewCalculationDissoProfile = (
  index: number,
): CalculationDissoProfile => ({
  id: Date.now() + index,
  label: `Calculation ${index + 1}`,
  selectedStandardPreparationLabel: null,
  selectedSamplePreparationLabel: null,
  areaOfStandard: "",
  numberOfTimePoints: 2,
  volumeWithdraw: "",
  volumeReplaced: "",
  timePointDetail1: null,
  timePointDetail2: null,
  timePointDetail3: null,
  timePointDetail4: null,
  timePointDetail5: null,
  timePointDetail6: null,
  timePointDetail7: null,
  timePointDetail8: null,
  timePointDetail9: null,
  timePointDetail10: null,
  areaOfSampleT1S1: null,
  areaOfSampleT1S2: null,
  areaOfSampleT1S3: null,
  areaOfSampleT1S4: null,
  areaOfSampleT1S5: null,
  areaOfSampleT1S6: null,
  areaOfSampleT2S1: null,
  areaOfSampleT2S2: null,
  areaOfSampleT2S3: null,
  areaOfSampleT2S4: null,
  areaOfSampleT2S5: null,
  areaOfSampleT2S6: null,
  areaOfSampleT3S1: null,
  areaOfSampleT3S2: null,
  areaOfSampleT3S3: null,
  areaOfSampleT3S4: null,
  areaOfSampleT3S5: null,
  areaOfSampleT3S6: null,
  areaOfSampleT4S1: null,
  areaOfSampleT4S2: null,
  areaOfSampleT4S3: null,
  areaOfSampleT4S4: null,
  areaOfSampleT4S5: null,
  areaOfSampleT4S6: null,
  areaOfSampleT5S1: null,
  areaOfSampleT5S2: null,
  areaOfSampleT5S3: null,
  areaOfSampleT5S4: null,
  areaOfSampleT5S5: null,
  areaOfSampleT5S6: null,
  areaOfSampleT6S1: null,
  areaOfSampleT6S2: null,
  areaOfSampleT6S3: null,
  areaOfSampleT6S4: null,
  areaOfSampleT6S5: null,
  areaOfSampleT6S6: null,
  areaOfSampleT7S1: null,
  areaOfSampleT7S2: null,
  areaOfSampleT7S3: null,
  areaOfSampleT7S4: null,
  areaOfSampleT7S5: null,
  areaOfSampleT7S6: null,
  areaOfSampleT8S1: null,
  areaOfSampleT8S2: null,
  areaOfSampleT8S3: null,
  areaOfSampleT8S4: null,
  areaOfSampleT8S5: null,
  areaOfSampleT8S6: null,
  areaOfSampleT9S1: null,
  areaOfSampleT9S2: null,
  areaOfSampleT9S3: null,
  areaOfSampleT9S4: null,
  areaOfSampleT9S5: null,
  areaOfSampleT9S6: null,
  areaOfSampleT10S1: null,
  areaOfSampleT10S2: null,
  areaOfSampleT10S3: null,
  areaOfSampleT10S4: null,
  areaOfSampleT10S5: null,
  areaOfSampleT10S6: null,
  purity: "",
  mWSalt: "",
  mWBase: "",
  claim: "",
  claimUnit: "",
  sampleResultsT1: null,
  sampleResultsT2: null,
  sampleResultsT3: null,
  sampleResultsT4: null,
  sampleResultsT5: null,
  sampleResultsT6: null,
  sampleResultsT7: null,
  sampleResultsT8: null,
  sampleResultsT9: null,
  sampleResultsT10: null,
  correctionFactorsT2: null,
  correctionFactorsT3: null,
  correctionFactorsT4: null,
  correctionFactorsT5: null,
  correctionFactorsT6: null,
  correctionFactorsT7: null,
  correctionFactorsT8: null,
  correctionFactorsT9: null,
  correctionFactorsT10: null,
  resultsAfterCorrectionT2: null,
  resultsAfterCorrectionT3: null,
  resultsAfterCorrectionT4: null,
  resultsAfterCorrectionT5: null,
  resultsAfterCorrectionT6: null,
  resultsAfterCorrectionT7: null,
  resultsAfterCorrectionT8: null,
  resultsAfterCorrectionT9: null,
  resultsAfterCorrectionT10: null,
  minT1: null,
  avgT1: null,
  maxT1: null,
  minT2: null,
  avgT2: null,
  maxT2: null,
  minT3: null,
  avgT3: null,
  maxT3: null,
  minT4: null,
  avgT4: null,
  maxT4: null,
  minT5: null,
  avgT5: null,
  maxT5: null,
  minT6: null,
  avgT6: null,
  maxT6: null,
  minT7: null,
  avgT7: null,
  maxT7: null,
  minT8: null,
  avgT8: null,
  maxT8: null,
  minT9: null,
  avgT9: null,
  maxT9: null,
  minT10: null,
  avgT10: null,
  maxT10: null,
  sw1: null,
  v1: null,
  v2: null,
  v3: null,
  v4: null,
  v5: null,
  v6: null,
  v7: null,
  v8: null,
  v9: null,
  v10: null,
  v11: null,
  v12: null,
  v13: null,
  v14: null,
  v8TimePoint1: null,
  v8TimePoint2: null,
  v8TimePoint3: null,
  v8TimePoint4: null,
  v8TimePoint5: null,
  v8TimePoint6: null,
  v8TimePoint7: null,
  v8TimePoint8: null,
  v8TimePoint9: null,
  v8TimePoint10: null,
  acceptanceLimitMin1: null,
  acceptanceLimitMax1: null,
  acceptanceLimitMin2: null,
  acceptanceLimitMax2: null,
  acceptanceLimitMin3: null,
  acceptanceLimitMax3: null,
  acceptanceLimitMin4: null,
  acceptanceLimitMax4: null,
  acceptanceLimitMin5: null,
  acceptanceLimitMax5: null,
  acceptanceLimitMin6: null,
  acceptanceLimitMax6: null,
  acceptanceLimitMin7: null,
  acceptanceLimitMax7: null,
  acceptanceLimitMin8: null,
  acceptanceLimitMax8: null,
  acceptanceLimitMin9: null,
  acceptanceLimitMax9: null,
  acceptanceLimitMin10: null,
  acceptanceLimitMax10: null,
});

export const createNewCalculationAssay = (index: number): CalculationAssay => ({
  id: Date.now() + index,
  label: `Calculation ${index + 1}`,
  selectedStandardPreparationLabel: null,
  selectedSamplePreparationLabel: null,
  calculationFor: "",
  areaOfSample: "",
  areaOfStandard: "",
  avgWeight: "",
  mWSalt: "",
  mWBase: "",
  claim: "",
  labelClaim: "",
  lodWaterType: "",
  lodWaterValue: "",
  calculationResult: null,
  labelClaimPercent: null,
  lodWaterBasisResult: null,
  purity: "",
  avgWeightUnit: "mg",
  weightPerMl: "",
  weightPerMlUnit: "mg",
  claimUnit: "",
  calculationResultUnit: null,
  sw1: null,
  sw2: null,
  v1: null,
  v2: null,
  v3: null,
  v4: null,
  v5: null,
  v6: null,
  v7: null,
  v8: null,
  v9: null,
  v10: null,
  v11: null,
  v12: null,
  v13: null,
  v14: null,
  acceptanceLimitMin: "",
  acceptanceLimitMax: "",
});

export const createNewCalculationLod = (index: number): CalculationLod => ({
  id: Date.now() + index,
  label: `Calculation ${index + 1}`,
  selectedSamplePreparationLabel: null,
  w1_emptyDish: "",
  w2_dishWithSample: "",
  w3_dishAfterIgnition: "",
  calculationResult: null,
  calculationResultUnit: null,
  w1: null,
  w2: null,
  w3: null,
  acceptanceLimitMin: "",
  acceptanceLimitMax: "",
});

export const createNewCalculationROI = (index: number): CalculationROI => ({
  id: Date.now() + index,
  label: `Calculation ${index + 1}`,
  selectedSamplePreparationLabel: null,
  w1_emptyDish: "",
  w2_dishWithSample: "",
  w3_dishAfterIgnition: "",
  calculationResult: null,
  calculationResultUnit: null,
  w1: null,
  w2: null,
  w3: null,
  acceptanceLimitMin: "",
  acceptanceLimitMax: "",
});

export const createNewCalculationSulphatedAsh = (
  index: number,
): CalculationSulphatedAsh => ({
  id: Date.now() + index,
  label: `Calculation ${index + 1}`,
  selectedSamplePreparationLabel: null,
  w1_emptyCrucible: "",
  w2_crucibleWithSample: "",
  w3_crucibleAfterAsh: "",
  calculationResult: null,
  calculationResultUnit: null,
  w1: null,
  w2: null,
  w3: null,
  acceptanceLimitMin: "",
  acceptanceLimitMax: "",
});

export const createNewStandardPreparation = (index: number): StandardPreparation => ({
  id: Date.now() + index,
  label: `Standard Preparation ${index + 1}`,
  assignedStandardId: null,
  steps: [
    {
      name: "Weighing",
      value1: "",
      unit1: "mg",
      logBookID: "",
      solventChemical: "",
    },
    { name: "1st Dilution", value1: "", unit1: "ml", value2: "", unit2: "ml" },
    { name: "2nd Dilution", value1: "", unit1: "ml", value2: "", unit2: "ml" },
    { name: "3rd Dilution", value1: "", unit1: "ml", value2: "", unit2: "ml" },
    { name: "4th Dilution", value1: "", unit1: "ml", value2: "", unit2: "ml" },
    { name: "Filtration", value1: "", unit1: "micron" },
  ],
});

export const createNewSamplePreparation = (index: number): SamplePreparation => ({
  id: Date.now() + index,
  label: `Sample Preparation ${index + 1}`,
  steps: [
    {
      name: "Weighing",
      value1: "",
      unit1: "mg",
      logBookID: "",
      solventChemical: "",
    },
    { name: "1st Dilution", value1: "", unit1: "ml", value2: "", unit2: "ml" },
    { name: "2nd Dilution", value1: "", unit1: "ml", value2: "", unit2: "ml" },
    { name: "3rd Dilution", value1: "", unit1: "ml", value2: "", unit2: "ml" },
    { name: "4th Dilution", value1: "", unit1: "ml", value2: "", unit2: "ml" },
    { name: "Filtration", value1: "", unit1: "micron" },
  ],
});

export const createNewSamplePreparationLod = (
  index: number,
): SamplePreparationLod => ({
  id: Date.now() + index,
  label: `Sample Preparation ${index + 1}`,
  steps: [
    { name: "Weighing (Empty Bottle)", value1: "", unit1: "g", logBookID: "" },
    { name: "Weighing (Before Drying)", value1: "", unit1: "g", logBookID: "" },
    {
      name: "Drying",
      value1: "",
      unit1: "°C",
      value2: "",
      unit2: "min",
      logBookID: "",
    },
    { name: "Weighing (After Drying)", value1: "", unit1: "g", logBookID: "" },
  ],
});

export const createNewSamplePreparationSulphatedAsh = (
  index: number,
): SamplePreparationSulphatedAsh => ({
  id: Date.now() + index,
  label: `Sample Preparation ${index + 1}`,
  steps: [
    {
      name: "Weighing (Empty Crucible)",
      value1: "",
      unit1: "g",
      logBookID: "",
    },
    { name: "Weighing (Before Drying)", value1: "", unit1: "g", logBookID: "" },
    {
      name: "Drying",
      value1: "",
      unit1: "°C",
      value2: "",
      unit2: "min",
      logBookID: "",
    },
    { name: "Weighing (After Drying)", value1: "", unit1: "g", logBookID: "" },
  ],
});

export const createNewSamplePreparationROI = (
  index: number,
): SamplePreparationROI => ({
  id: Date.now() + index,
  label: `Sample Preparation ${index + 1}`,
  steps: [
    {
      name: "Weighing (Empty Crucible)",
      value1: "",
      unit1: "g",
      logBookID: "",
    },
    { name: "Weighing (Before Drying)", value1: "", unit1: "g", logBookID: "" },
    {
      name: "Drying",
      value1: "",
      unit1: "°C",
      value2: "",
      unit2: "min",
      logBookID: "",
    },
    { name: "Weighing (After Drying)", value1: "", unit1: "g", logBookID: "" },
  ],
});

export const createNewSamplePreparationDisso = (
  index: number,
): SamplePreparationDisso => ({
  id: Date.now() + index,
  label: `Sample Preparation ${index + 1}`,
  assignedStandardId: null,
  steps: [
    {
      name: "Instrument Details",
      id: "",
      value1: "",
      unit1: "rpm",
      value2: "",
      unit2: "°C",
    },
    {
      name: "Tablet Details",
      value1: "",
      unit1: "mg",
      value2: "",
      unit2: "ml",
      value3: "",
      unit3: "min",
    },
    { name: "1st Dilution", value1: "", unit1: "ml", value2: "", unit2: "ml" },
    { name: "2nd Dilution", value1: "", unit1: "ml", value2: "", unit2: "ml" },
    { name: "3rd Dilution", value1: "", unit1: "ml", value2: "", unit2: "ml" },
    { name: "Filtration", value1: "", unit1: "micron" },
  ],
});

export const createNewCalculationRS = (index: number): CalculationRS => ({
  id: Date.now() + index,
  label: `Calculation ${index + 1}`,
  selectedStandardPreparationLabel: null,
  selectedSamplePreparationLabel: null,
  areaOfSample: "",
  areaOfStandard: "",
  purity: "",
  calculationResult: null,
  calculationResultUnit: null,
  sw1: null,
  sw2: null,
  v1: null,
  v2: null,
  v3: null,
  v4: null,
  v5: null,
  v6: null,
  acceptanceLimitMin: "",
  acceptanceLimitMax: "",
});

export const createNewCalculationRelatedSubstance = (
  index: number,
): CalculationRelatedSubstance => ({
  id: Date.now() + index,
  label: `Calculation ${index + 1}`,
  selectedStandardPreparationLabel: null,
  selectedSamplePreparationLabel: null,
  calculationFor: "",
  areaOfSample: "",
  areaOfStandard: "",
  purity: "",
  mWSalt: "",
  mWBase: "",
  responseFactor: "",
  avgWeight: "",
  avgWeightUnit: "mg",
  weightPerMl: "",
  weightPerMlUnit: "mg",
  doseVolume: "",
  doseVolumeUnit: "ml",
  calculationResult: null,
  calculationResultUnit: "%",
  sw1: null,
  sw2: null,
  v1: null,
  v2: null,
  v3: null,
  v4: null,
  v5: null,
  v6: null,
  v7: null,
  v8: null,
  v9: null,
  v10: null,
  v11: null,
  v12: null,
  v13: null,
  v14: null,
  responseFactorUnit: "mg",
  labelClaim: "",
  labelClaimUnit: "mg",
  acceptanceLimitMin: "",
  acceptanceLimitMax: "",
});

export const createNewDissoMediaPreparation = (
  index: number,
): DissoMediaPreparation => ({
  id: Date.now() + index,
  label: `Dissolution Media Preparation ${index + 1}`,
  steps: [
    {
      name: "Weighing/Measuring",
      value1: "",
      unit1: "g",
      logBookID: "",
      solventChemical: "",
    },
    { name: "PH", value1: "", unit1: "", logBookID: "" },
    { name: "Sonication", value1: "", unit1: "min" },
    { name: "Filtration", value1: "", unit1: "micron" },
  ],
});

export const createNewBufferPreparation = (index: number): BufferPreparationModel => ({
  id: Date.now() + index,
  label: `Buffer Preparation ${index + 1}`,
  steps: [
    {
      name: "Weighing/Measuring",
      value1: "",
      unit1: "g",
      logBookID: "",
      solventChemical: "",
    },
    { name: "PH", value1: "", unit1: "", logBookID: "" },
  ],
});

export const createNewSamplePreparationTitration = (
  index: number,
): SamplePreparationTitration => ({
  id: Date.now() + index,
  label: `Sample Preparation ${index + 1}`,
  steps: [
    {
      name: "Weighing",
      value1: "",
      unit1: "mg",
      logBookID: "",
      solventChemical: "",
    },
    {
      name: "Tablet Details",
      value1: "",
      unit1: "mg",
      value2: "",
      unit2: "ml",
      value3: "",
      unit3: "min",
      logBookID: "",
      solventChemical: "",
    },
    { name: "1st Dilution", value1: "", unit1: "ml" },
    { name: "End Point Determination", value1: "", unit1: "" },
  ],
});

export const createNewAssayCalculationFerrousFumarate = (
  index: number,
): CalculationAssayFerrousFumarate => ({
  id: Date.now() + index,
  label: `Calculation ${index + 1}`,
  selectedSamplePreparationLabel: null,
  calculationFor: "",
  buretteReading: "",
  theoreticalMolarity: "",
  actualMolarity: "",
  factor: "",
  avgWeight: "",
  labelClaim: "",
  lodWaterType: "water",
  lodWaterValue: "",
  calculationResult: null,
  calculationResultUnit: null,
  labelClaimPercent: null,
  lodWaterBasisResult: null,
  factorUnit: "mg",
  avgWeightUnit: "mg",
  labelClaimUnit: "mg",
  acceptanceLimitMin: "",
  acceptanceLimitMax: "",
  sampleWeight: null,
  sampleWeightUnit: "mg",
});

export const createNewCalculationDissoFerrousFumarate = (
  index: number,
): CalculationDissoFerrousFumarate => ({
  id: Date.now() + index,
  label: `Calculation ${index + 1}`,
  selectedSamplePreparationLabel: null,
  buretteReading1: "",
  buretteReading2: "",
  buretteReading3: "",
  buretteReading4: "",
  buretteReading5: "",
  buretteReading6: "",
  theoreticalMolarity: "",
  actualMolarity: "",
  factor: "",
  dissoMediaVolume: "",
  labelClaim: "",
  calculationResultTablet1: null,
  calculationResultTablet2: null,
  calculationResultTablet3: null,
  calculationResultTablet4: null,
  calculationResultTablet5: null,
  calculationResultTablet6: null,
  calculationResult: null,
  calculationResultUnit: null,
  sampleTaken: null,
  factorUnit: "mg",
  acceptanceLimitMin: "",
  acceptanceLimitMax: "",
  dissoMediaVolumeUnit: "mg",
  labelClaimUnit: "mg",
  sampleTakenUnit: "ml",
});

export const createNewSamplePreparationUC = (index: number): SamplePreparationUC => ({
  id: Date.now() + index,
  label: `Sample Preparation ${index + 1}`,
  assignedStandardId: null,
  steps: [
    {
      name: "1 Tablets/Capsules",
      value1: "",
      unit1: "mg",
      value2: "",
      unit2: "ml",
    },
    { name: "1st Dilution", value1: "", unit1: "ml", value2: "", unit2: "ml" },
    { name: "2nd Dilution", value1: "", unit1: "ml", value2: "", unit2: "ml" },
    { name: "3rd Dilution", value1: "", unit1: "ml", value2: "", unit2: "ml" },
    { name: "4th Dilution", value1: "", unit1: "ml", value2: "", unit2: "ml" },
    { name: "Filtration", value1: "", unit1: "micron" },
  ],
});

export const createNewCalculationUC = (index: number): CalculationUC => ({
  id: Date.now() + index,
  label: `Calculation ${index + 1}`,
  selectedStandardPreparationLabel: null,
  selectedSamplePreparationLabel: null,
  areaOfStandard: null,
  areaOfSample1: null,
  areaOfSample2: null,
  areaOfSample3: null,
  areaOfSample4: null,
  areaOfSample5: null,
  areaOfSample6: null,
  areaOfSample7: null,
  areaOfSample8: null,
  areaOfSample9: null,
  areaOfSample10: null,
  purity: "",
  mWBase: "",
  mWSalt: "",
  calculationResultUnit: null,
  calculationResultTablet1: null,
  calculationResultTablet2: null,
  calculationResultTablet3: null,
  calculationResultTablet4: null,
  calculationResultTablet5: null,
  calculationResultTablet6: null,
  calculationResultTablet7: null,
  calculationResultTablet8: null,
  calculationResultTablet9: null,
  calculationResultTablet10: null,
  sw1: null,
  claim: null,
  v1: null,
  v2: null,
  v3: null,
  v4: null,
  v5: null,
  v6: null,
  v7: null,
  v8: null,
  v9: null,
  v10: null,
  v11: null,
  v12: null,
  v13: null,
  v14: null,
  mgPerTabletResultTablet1: null,
  mgPerTabletResultTablet2: null,
  mgPerTabletResultTablet3: null,
  mgPerTabletResultTablet4: null,
  mgPerTabletResultTablet5: null,
  mgPerTabletResultTablet6: null,
  mgPerTabletResultTablet7: null,
  mgPerTabletResultTablet8: null,
  mgPerTabletResultTablet9: null,
  mgPerTabletResultTablet10: null,
  mgPerTabletResultUnit: "mg",
  acceptanceLimitMin: "",
  acceptanceLimitMax: "",
});

const hypromelloseWeightToMg = (value: string | null | undefined, unit: string | null | undefined): number => {
  const num = parseFloat(value ?? "");
  if (isNaN(num)) return NaN;
  return (unit || "").toLowerCase() === "g" ? num * 1000 : num;
};

// Step naming has changed over time; match on any historical variant so
// existing saved preparations keep auto-fetching correctly.
const isMethylIodideStep = (name: string) =>
  name === "Weight of Methyl Iodide" ||
  name === "Methyl Iodide - in Weight" ||
  name === "Methyl Iodide - By Difference";

const isIsopropylIodideStep = (name: string) =>
  name === "Weight of Isopropyl Iodide" ||
  name === "Isopropyl Iodide - in Weight" ||
  name === "Isopropyl Iodide - By Difference";

export const createNewStandardPreparationHypromellose = (
  index: number,
): StandardPreparationHypromellose => ({
  id: Date.now() + index,
  label: `Standard Preparation ${index + 1}`,
  assignedStandardId: null,
  steps: [
    { name: "Weighing (Adipic Acid)", value1: "", unit1: "mg" },
    { name: "Hydriodic Acid", value1: "", unit1: "ml" },
    { name: "Internal Standard Solution", value1: "", unit1: "ml" },
    {
      name: "Weight of Isopropyl Iodide",
      value1: "",
      unit1: "mg",
    },
    {
      name: "Weight of Methyl Iodide",
      value1: "",
      unit1: "mg",
    },
  ],
});

export const createNewSamplePreparationHypromellose = (
  index: number,
): SamplePreparationHypromellose => ({
  id: Date.now() + index,
  label: `Sample Preparation ${index + 1}`,
  steps: [
    { name: "Weighing (Sample)", value1: "", unit1: "g" },
    { name: "Weighing (Adipic Acid)", value1: "", unit1: "mg" },
    { name: "Internal Standard Solution", value1: "", unit1: "ml" },
    { name: "Hydriodic Acid", value1: "", unit1: "ml" },
    { name: "Heating", value1: "130", unit1: "°C", value2: "60", unit2: "min" },
  ],
});

export const createNewCalculationAssayHypromellose = (
  index: number,
): CalculationAssayHypromellose => ({
  id: Date.now() + index,
  label: `Calculation ${index + 1}`,
  selectedStandardPreparationLabel: null,
  selectedSamplePreparationLabel: null,
  methylIodideBatchNo: "",
  isopropylIodideBatchNo: "",
  methylIodidePurity: "",
  isopropylIodidePurity: "",
  methylIodideStdWt: "",
  isopropylIodideStdWt: "",
  sampleWeight: "",
  lodPercent: "",
  areaOfMI1: "",
  areaOfMI2: "",
  areaOfMI3: "",
  areaOfMI4: "",
  areaOfMI5: "",
  areaOfMI6: "",
  areaOfIPI1: "",
  areaOfIPI2: "",
  areaOfIPI3: "",
  areaOfIPI4: "",
  areaOfIPI5: "",
  areaOfIPI6: "",
  internalStandardArea1: "",
  internalStandardArea2: "",
  internalStandardArea3: "",
  internalStandardArea4: "",
  internalStandardArea5: "",
  internalStandardArea6: "",
  areaRatioMIMean: null,
  areaRatioMISD: null,
  areaRatioMIRSD: null,
  areaRatioIPIMean: null,
  areaRatioIPISD: null,
  areaRatioIPIRSD: null,
  sampleAreaOfMI1: "",
  sampleAreaOfMI2: "",
  sampleAreaOfMI3: "",
  sampleAreaOfMI4: "",
  sampleAreaOfMI5: "",
  sampleAreaOfMI6: "",
  sampleAreaOfIPI1: "",
  sampleAreaOfIPI2: "",
  sampleAreaOfIPI3: "",
  sampleAreaOfIPI4: "",
  sampleAreaOfIPI5: "",
  sampleAreaOfIPI6: "",
  sampleInternalStandardArea1: "",
  sampleInternalStandardArea2: "",
  sampleInternalStandardArea3: "",
  sampleInternalStandardArea4: "",
  sampleInternalStandardArea5: "",
  sampleInternalStandardArea6: "",
  areaRatioSampleMIMean: null,
  areaRatioSampleMISD: null,
  areaRatioSampleMIRSD: null,
  areaRatioSampleIPIMean: null,
  areaRatioSampleIPISD: null,
  areaRatioSampleIPIRSD: null,
  stdAreaOfMI: "",
  stdAreaOfIPI: "",
  stdInternalStandardArea: "",
  areaRatioQSa: null,
  areaRatioQSb: null,
  sampleAreaOfMI: "",
  sampleAreaOfIPI: "",
  sampleInternalStandardArea: "",
  areaRatioQTa: null,
  areaRatioQTb: null,
  methoxyResultAsIs: null,
  methoxyResultDried: null,
  methoxyResultUnit: null,
  methoxyLimitMin: "",
  methoxyLimitMax: "",
  hydroxypropoxyResultAsIs: null,
  hydroxypropoxyResultDried: null,
  hydroxypropoxyResultUnit: null,
  hydroxypropoxyLimitMin: "",
  hydroxypropoxyLimitMax: "",
});

const nitrosamineWeightToMg = (
  value: string | null | undefined,
  unit: string | null | undefined,
): number => {
  const num = parseFloat(value ?? "");
  if (isNaN(num)) return NaN;
  return (unit || "").toLowerCase() === "g" ? num * 1000 : num;
};

// Dilution factor from a serial-dilution step chain (dst for Standard, ds for
// Sample). Excel pattern: DF = firstDilutedTo * product(dilutedTo / mlTaken)
// for each subsequent stage. Verified against both real worksheets used to
// build this template (Mifepristone -> dst = 12,048,192.771; Busulfan -> dst = 50,000).
const dilutionFactorFromNitrosamineSteps = (
  steps: { value1?: string; value2?: string }[],
): number => {
  let df = 1;
  let pendingMl: number | null = null;
  for (const step of steps) {
    const mlTaken = step.value1 ? parseFloat(step.value1) : null;
    const dilutedTo = step.value2 ? parseFloat(step.value2) : null;
    if (mlTaken != null && !isNaN(mlTaken)) pendingMl = mlTaken;
    if (dilutedTo != null && !isNaN(dilutedTo)) {
      df = pendingMl == null ? df * dilutedTo : (df / pendingMl) * dilutedTo;
      pendingMl = null;
    }
  }
  return df;
};

export const createNewStandardPreparationNitrosamine = (
  index: number,
): StandardPreparationNitrosamine => ({
  id: Date.now() + index,
  label: `Standard Preparation ${index + 1}`,
  assignedStandardId: null,
  batchNo: "",
  purity: "",
  weightTaken: "",
  weightTakenUnit: "mg",
  steps: [
    { name: "Dilution 1", value2: "" },
    { name: "Dilution 2", value1: "", value2: "" },
    { name: "Dilution 3", value1: "", value2: "" },
  ],
});

export const createNewSamplePreparationNitrosamine = (
  index: number,
): SamplePreparationNitrosamine => ({
  id: Date.now() + index,
  label: `Sample Preparation ${index + 1}`,
  sampleWeight: "",
  sampleWeightUnit: "mg",
  steps: [
    { name: "Dilution 1", value2: "" },
    { name: "Dilution 2", value1: "", value2: "" },
  ],
});

export const createNewCalculationAssayNitrosamine = (
  index: number,
): CalculationAssayNitrosamine => ({
  id: Date.now() + index,
  label: `Calculation ${index + 1}`,
  selectedStandardPreparationLabel: null,
  selectedSamplePreparationLabel: null,
  analyteName: "",
  purity: "",
  standardWeightTaken: "",
  sampleWeight: "",
  standardDilutionFactor: null,
  sampleDilutionFactor: null,
  averageWeight: "",
  labelClaim: "",
  unitConversionFactor: "1000000",
  roundingMode: "trunc",
  standardArea1: "",
  standardArea2: "",
  standardArea3: "",
  standardArea4: "",
  standardArea5: "",
  standardArea6: "",
  standardAverageArea: null,
  standardStdev: null,
  standardPercentRSD: null,
  bracketingArea: "",
  bracketingPercentRSD: null,
  sampleInjections: [
    { id: Date.now() + 1, area: "", weight: "", found: null },
  ],
  sampleAverageArea: null,
  averageFound: null,
  resultUnit: null,
  acceptanceLimitMin: "",
  acceptanceLimitMax: "",
});

export const createNewSystemSuitability = (index: number): SystemSuitability => ({
  id: Date.now() + index,
  label: `System Suitability ${index + 1}`,
  steps: [
    { name: "RSD Area", value1: "", value2: "", value3: "", value4: "" },
    { name: "RSD Retention time", value1: "", value2: "", value3: "", value4: "" },
    { name: "Tailing factor", value1: "", value2: "", value3: "", value4: "" },
    { name: "Resolution", value1: "", value2: "", value3: "", value4: "" },
    { name: "Theorital Plate count", value1: "", value2: "", value3: "", value4: "" },
    { name: "Peak to Valley ratio", value1: "", value2: "", value3: "", value4: "" },
  ],
});
