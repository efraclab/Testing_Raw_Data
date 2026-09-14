import { useEffect } from "react";
import type { CalculationAssayHypromellose } from "../preparation_models/drugs/Calculationassayhypromellose";

export function useDrugHypromelloseCalculationSync(ctx: any) {
  const {
    setCalculationsAssayHypromellosePerParam,
    standardPreparationHypromellosePerParam,
    samplePreparationHypromellosePerParam,
    isMethylIodideStep,
    isIsopropylIodideStep,
    hypromelloseWeightToMg,
  } = ctx;

    // Keep Wu / WSa / WSb live-synced if the underlying preparation values are edited
    // AFTER a preparation has already been selected on a calculation.
    useEffect(() => {
      setCalculationsAssayHypromellosePerParam((prevCalcs) => {
        let changed = false;
        const updated: Record<number, CalculationAssayHypromellose[]> = {};

        Object.keys(prevCalcs).forEach((key) => {
          const parameterId = Number(key);
          const standardPreps = standardPreparationHypromellosePerParam[parameterId] || [];
          const samplePreps = samplePreparationHypromellosePerParam[parameterId] || [];

          updated[parameterId] = prevCalcs[parameterId].map((calc) => {
            let next = calc;

            if (calc.selectedStandardPreparationLabel) {
              const matchedStandard = standardPreps.find(
                (sp) => sp.label === calc.selectedStandardPreparationLabel,
              );
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
              const newWSa = !isNaN(fetchedWSa) ? fetchedWSa.toFixed(2) : next.methylIodideStdWt;
              const newWSb = !isNaN(fetchedWSb) ? fetchedWSb.toFixed(2) : next.isopropylIodideStdWt;
              if (newWSa !== next.methylIodideStdWt || newWSb !== next.isopropylIodideStdWt) {
                changed = true;
                next = { ...next, methylIodideStdWt: newWSa, isopropylIodideStdWt: newWSb };
              }
            }

            if (calc.selectedSamplePreparationLabel) {
              const matchedSample = samplePreps.find(
                (sp) => sp.label === calc.selectedSamplePreparationLabel,
              );
              const weighingStep = matchedSample?.steps.find(
                (s) => s.name === "Weighing (Sample)",
              );
              const fetchedWu = weighingStep
                ? hypromelloseWeightToMg(weighingStep.value1, weighingStep.unit1)
                : NaN;
              const newWu = !isNaN(fetchedWu) ? fetchedWu.toFixed(2) : next.sampleWeight;
              if (newWu !== next.sampleWeight) {
                changed = true;
                next = { ...next, sampleWeight: newWu };
              }
            }

            return next;
          });
        });

        return changed ? updated : prevCalcs;
      });
    }, [standardPreparationHypromellosePerParam, samplePreparationHypromellosePerParam]);
}
