import type { CalculationAssayHypromellose } from "../preparation_models/drugs/Calculationassayhypromellose";
import { createNewCalculationAssayHypromellose } from "./drugWorksheetFactories";

export function useDrugHypromelloseCalculationHandlers(ctx: any) {
  const {
    setCalculationsAssayHypromellosePerParam,
    samplePreparationHypromellosePerParam,
    standardPreparationHypromellosePerParam,
    hypromelloseWeightToMg,
    isMethylIodideStep,
    isIsopropylIodideStep,
  } = ctx;

    // Hypromellose Calculation Handlers
    const handleAddCalculationAssayHypromellose = (parameterId: number) => {
      setCalculationsAssayHypromellosePerParam((prev) => {
        const current = prev[parameterId] || [];
        return {
          ...prev,
          [parameterId]: [
            ...current,
            createNewCalculationAssayHypromellose(current.length),
          ],
        };
      });
    };

    const handleRemoveCalculationAssayHypromellose = (
      parameterId: number,
      calculationId: number,
    ) => {
      setCalculationsAssayHypromellosePerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || [])
          .filter((c) => c.id !== calculationId)
          .map((c, i) => ({ ...c, label: `Calculation ${i + 1}` })),
      }));
    };

    const handleCalculationAssayHypromelloseFieldChange = (
      parameterId: number,
      calculationId: number,
      field: keyof CalculationAssayHypromellose,
      value: string | number | null,
    ) => {
      setCalculationsAssayHypromellosePerParam((prev) => ({
        ...prev,
        [parameterId]: (prev[parameterId] || []).map((calc) => {
          if (calc.id !== calculationId) return calc;

          // Selecting a Sample Preparation -> auto-fetch Wu (Sample Weight)
          if (field === "selectedSamplePreparationLabel") {
            const samplePreps = samplePreparationHypromellosePerParam[parameterId] || [];
            const matchedSample = samplePreps.find((sp) => sp.label === value);
            const weighingStep = matchedSample?.steps.find(
              (s) => s.name === "Weighing (Sample)",
            );
            const fetchedWu = weighingStep
              ? hypromelloseWeightToMg(weighingStep.value1, weighingStep.unit1)
              : NaN;
            return {
              ...calc,
              selectedSamplePreparationLabel: value as string | null,
              sampleWeight: !isNaN(fetchedWu) ? fetchedWu.toFixed(2) : calc.sampleWeight,
            };
          }

          // Selecting a Standard Preparation -> auto-fetch WSa / WSb
          if (field === "selectedStandardPreparationLabel") {
            const standardPreps = standardPreparationHypromellosePerParam[parameterId] || [];
            const matchedStandard = standardPreps.find((sp) => sp.label === value);
            const miStep = matchedStandard?.steps.find((s) =>
              isMethylIodideStep(s.name),
            );
            const ipiStep = matchedStandard?.steps.find((s) =>
              isIsopropylIodideStep(s.name),
            );
            const fetchedWSa = miStep
              ? hypromelloseWeightToMg(miStep.value1, miStep.unit1)
              : NaN;
            const fetchedWSb = ipiStep
              ? hypromelloseWeightToMg(ipiStep.value1, ipiStep.unit1)
              : NaN;
            return {
              ...calc,
              selectedStandardPreparationLabel: value as string | null,
              methylIodideStdWt: !isNaN(fetchedWSa)
                ? fetchedWSa.toFixed(2)
                : calc.methylIodideStdWt,
              isopropylIodideStdWt: !isNaN(fetchedWSb)
                ? fetchedWSb.toFixed(2)
                : calc.isopropylIodideStdWt,
            };
          }

          return { ...calc, [field]: value };
        }),
      }));
    };

  return {
    handleAddCalculationAssayHypromellose,
    handleRemoveCalculationAssayHypromellose,
    handleCalculationAssayHypromelloseFieldChange,
  };
}
