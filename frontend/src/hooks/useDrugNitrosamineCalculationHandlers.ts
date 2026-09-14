import type {
  CalculationAssayNitrosamine,
  SampleInjectionNitrosamine,
} from "../preparation_models/drugs/Calculationassaynitrosamine";
import { createNewCalculationAssayNitrosamine } from "./drugWorksheetFactories";

export function useDrugNitrosamineCalculationHandlers(ctx: any) {
  const {
    setCalculationsAssayNitrosaminePerParam,
    samplePreparationNitrosaminePerParam,
    standardPreparationNitrosaminePerParam,
    nitrosamineWeightToMg,
    dilutionFactorFromNitrosamineSteps,
  } = ctx;

    // Nitrosamine Calculation Handlers
    const handleAddCalculationAssayNitrosamine = (parameterId: number) => {
      setCalculationsAssayNitrosaminePerParam((prev) => {
        const current = prev[parameterId] || [];
        return {
          ...prev,
          [parameterId]: [
            ...current,
            createNewCalculationAssayNitrosamine(current.length),
          ],
        };
      });
    };

    const handleRemoveCalculationAssayNitrosamine = (
      parameterId: number,
      calculationId: number,
    ) => {
      setCalculationsAssayNitrosaminePerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || [])
          .filter((c) => c.id !== calculationId)
          .map((c, i) => ({ ...c, label: `Calculation ${i + 1}` })),
      }));
    };

    const handleCalculationAssayNitrosamineFieldChange = (
      parameterId: number,
      calculationId: number,
      field: keyof CalculationAssayNitrosamine,
      value: string | number | null | SampleInjectionNitrosamine[],
    ) => {
      setCalculationsAssayNitrosaminePerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((calc) => {
          if (calc.id !== calculationId) return calc;

          // Selecting a Sample Preparation -> auto-fetch sample weight (unit-converted to mg) + ds
          if (field === "selectedSamplePreparationLabel") {
            const samplePreps = samplePreparationNitrosaminePerParam[parameterId] || [];
            const matchedSample = samplePreps.find((sp) => sp.label === value);
            const fetchedWu = matchedSample
              ? nitrosamineWeightToMg(matchedSample.sampleWeight, matchedSample.sampleWeightUnit)
              : NaN;
            const fetchedDs = matchedSample
              ? dilutionFactorFromNitrosamineSteps(matchedSample.steps)
              : NaN;
            return {
              ...calc,
              selectedSamplePreparationLabel: value as string | null,
              sampleWeight: !isNaN(fetchedWu) ? fetchedWu.toFixed(4) : calc.sampleWeight,
              sampleDilutionFactor: !isNaN(fetchedDs) ? fetchedDs.toString() : calc.sampleDilutionFactor,
            };
          }

          // Selecting a Standard Preparation -> auto-fetch weight taken (unit-converted to mg), purity, dst
          if (field === "selectedStandardPreparationLabel") {
            const standardPreps = standardPreparationNitrosaminePerParam[parameterId] || [];
            const matchedStandard = standardPreps.find((sp) => sp.label === value);
            const fetchedWSa = matchedStandard
              ? nitrosamineWeightToMg(matchedStandard.weightTaken, matchedStandard.weightTakenUnit)
              : NaN;
            const fetchedDst = matchedStandard
              ? dilutionFactorFromNitrosamineSteps(matchedStandard.steps)
              : NaN;
            return {
              ...calc,
              selectedStandardPreparationLabel: value as string | null,
              standardWeightTaken: !isNaN(fetchedWSa)
                ? fetchedWSa.toFixed(4)
                : calc.standardWeightTaken,
              purity: matchedStandard?.purity || calc.purity,
              standardDilutionFactor: !isNaN(fetchedDst)
                ? fetchedDst.toString()
                : calc.standardDilutionFactor,
            };
          }

          return { ...calc, [field]: value };
        }),
      }));
    };

  return {
    handleAddCalculationAssayNitrosamine,
    handleRemoveCalculationAssayNitrosamine,
    handleCalculationAssayNitrosamineFieldChange,
  };
}
